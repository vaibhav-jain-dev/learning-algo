# Content Delivery Network (CDN)

## Overview

A Content Delivery Network is a globally distributed network of proxy servers that caches content at edge locations to minimize the distance between users and the content they request. Beyond simple caching, modern CDNs perform TLS termination, DDoS mitigation, edge computing, request routing, and real-time content optimization.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #cbd5e1;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 20px; font-weight: 600;">CDN ARCHITECTURE DEEP DIVE</h3>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div style="display: flex; justify-content: center;">
      <div style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); padding: 16px 32px; border-radius: 12px; text-align: center; border: 2px solid #7c3aed;">
        <div style="color: #5b21b6; font-weight: 700;">Origin Server</div>
        <div style="color: #7c3aed; font-size: 12px;">Source of truth</div>
      </div>
    </div>
    <div style="display: flex; justify-content: center; gap: 8px; align-items: center;">
      <div style="width: 2px; height: 24px; background: #94a3b8;"></div>
    </div>
    <div style="display: flex; justify-content: center;">
      <div style="background: linear-gradient(135deg, #ecfeff 0%, #cffafe 100%); padding: 16px 32px; border-radius: 12px; text-align: center; border: 2px solid #06b6d4;">
        <div style="color: #0e7490; font-weight: 700;">Origin Shield</div>
        <div style="color: #0891b2; font-size: 12px;">Mid-tier cache aggregator</div>
      </div>
    </div>
    <div style="display: flex; justify-content: center; gap: 8px; align-items: center;">
      <div style="width: 2px; height: 24px; background: #94a3b8;"></div>
    </div>
    <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 14px 24px; border-radius: 10px; text-align: center; border: 2px solid #22c55e;">
        <div style="color: #166534; font-weight: 600; font-size: 14px;">Edge PoP</div>
        <div style="color: #15803d; font-size: 11px;">Americas</div>
      </div>
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 14px 24px; border-radius: 10px; text-align: center; border: 2px solid #22c55e;">
        <div style="color: #166534; font-weight: 600; font-size: 14px;">Edge PoP</div>
        <div style="color: #15803d; font-size: 11px;">EMEA</div>
      </div>
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 14px 24px; border-radius: 10px; text-align: center; border: 2px solid #22c55e;">
        <div style="color: #166534; font-weight: 600; font-size: 14px;">Edge PoP</div>
        <div style="color: #15803d; font-size: 11px;">APAC</div>
      </div>
    </div>
    <div style="display: flex; justify-content: center; gap: 8px; align-items: center;">
      <div style="width: 2px; height: 24px; background: #94a3b8;"></div>
    </div>
    <div style="display: flex; justify-content: center;">
      <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 14px 48px; border-radius: 10px; text-align: center; border: 2px solid #3b82f6;">
        <div style="color: #1e40af; font-weight: 600;">End Users</div>
        <div style="color: #2563eb; font-size: 11px;">Connected via Anycast DNS</div>
      </div>
    </div>
  </div>
</div>

<span style="background: linear-gradient(90deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 8px; border-radius: 4px; font-weight: 500;">Key assumption: CDN effectiveness depends on content being cacheable. Highly personalized or real-time content benefits minimally from edge caching.</span>

---

## Edge Caching Internals

Edge caching is the foundational mechanism of CDNs, storing content copies at geographically distributed Points of Presence (PoPs). Understanding the internal mechanics is crucial for optimizing CDN behavior.

### Cache Key Construction

The cache key uniquely identifies content in the edge cache. <span style="background: linear-gradient(90deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 8px; border-radius: 4px; font-weight: 500;">Design choice: Cache key composition directly impacts hit rates and storage efficiency.</span>

```python
class CacheKeyBuilder:
    """
    Demonstrates how CDNs construct cache keys.
    Understanding this is critical for debugging cache behavior.
    """

    def __init__(self, config: dict):
        self.include_query_params = config.get('include_query_params', True)
        self.query_param_whitelist = config.get('query_param_whitelist', None)
        self.include_headers = config.get('vary_headers', [])
        self.normalize_path = config.get('normalize_path', True)

    def build_key(self, request) -> str:
        """
        Build cache key from request components.

        Default: scheme://host/path?sorted_query_params
        With Vary: Above + hash(specified_header_values)
        """
        components = []

        # 1. Host normalization (www.example.com == example.com?)
        host = request.host.lower()
        if self.normalize_path:
            host = host.lstrip('www.')
        components.append(host)

        # 2. Path normalization
        path = request.path
        if self.normalize_path:
            # /foo//bar -> /foo/bar
            path = re.sub(r'/+', '/', path)
            # Trailing slash handling (configurable)
            path = path.rstrip('/')
        components.append(path)

        # 3. Query parameter handling - critical for hit rates
        if self.include_query_params and request.query_params:
            params = request.query_params

            # Whitelist filtering (ignore tracking params like utm_*)
            if self.query_param_whitelist:
                params = {k: v for k, v in params.items()
                         if k in self.query_param_whitelist}

            # Sort for consistency: ?b=2&a=1 == ?a=1&b=2
            sorted_params = sorted(params.items())
            query_string = urlencode(sorted_params)
            if query_string:
                components.append(f"?{query_string}")

        # 4. Vary header inclusion
        if self.include_headers:
            vary_hash = self._hash_vary_headers(request)
            components.append(f"#vary={vary_hash}")

        return ''.join(components)

    def _hash_vary_headers(self, request) -> str:
        """Hash header values specified in Vary response header."""
        header_values = []
        for header in sorted(self.include_headers):
            value = request.headers.get(header, '')
            header_values.append(f"{header}:{value}")

        return hashlib.sha256('|'.join(header_values).encode()).hexdigest()[:16]
```

### Cache Storage Tiers

Modern edge servers implement multi-tier storage for optimal performance:

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">EDGE SERVER STORAGE HIERARCHY</h3>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); padding: 12px 20px; border-radius: 8px; min-width: 140px; text-align: center;">
        <div style="color: white; font-weight: 700;">L1: RAM Cache</div>
      </div>
      <div style="flex: 1; background: #fef2f2; padding: 12px 16px; border-radius: 8px;">
        <div style="color: #991b1b; font-size: 13px;"><strong>~1ms latency</strong> | Hot objects | LRU eviction | 64-256GB per server</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: linear-gradient(135deg, #ea580c 0%, #f97316 100%); padding: 12px 20px; border-radius: 8px; min-width: 140px; text-align: center;">
        <div style="color: white; font-weight: 700;">L2: NVMe SSD</div>
      </div>
      <div style="flex: 1; background: #fff7ed; padding: 12px 16px; border-radius: 8px;">
        <div style="color: #9a3412; font-size: 13px;"><strong>~5ms latency</strong> | Warm objects | 2-8TB per server | Handles 90%+ of requests</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: linear-gradient(135deg, #ca8a04 0%, #eab308 100%); padding: 12px 20px; border-radius: 8px; min-width: 140px; text-align: center;">
        <div style="color: white; font-weight: 700;">L3: HDD Array</div>
      </div>
      <div style="flex: 1; background: #fefce8; padding: 12px 16px; border-radius: 8px;">
        <div style="color: #854d0e; font-size: 13px;"><strong>~20ms latency</strong> | Cold objects | 50-200TB | Long-tail content</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); padding: 12px 20px; border-radius: 8px; min-width: 140px; text-align: center;">
        <div style="color: white; font-weight: 700;">L4: Origin Shield</div>
      </div>
      <div style="flex: 1; background: #ecfeff; padding: 12px 16px; border-radius: 8px;">
        <div style="color: #155e75; font-size: 13px;"><strong>~50-100ms</strong> | Regional aggregation | Reduces origin load by 90%+</div>
      </div>
    </div>
  </div>
</div>

### Cache Admission Policies

<span style="background: linear-gradient(90deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 8px; border-radius: 4px; font-weight: 500;">Trade-off: Caching everything wastes storage on one-hit-wonders; being too selective reduces hit rates.</span>

```python
class CacheAdmissionController:
    """
    Controls which objects are admitted to cache.
    Prevents cache pollution from one-hit-wonders.
    """

    def __init__(self, policy: str = "lru"):
        self.policy = policy
        self.bloom_filter = BloomFilter(size=10_000_000, fp_rate=0.01)
        self.request_counts = LRUCache(max_size=1_000_000)
        self.admission_threshold = 2  # Require N requests before caching

    def should_cache(self, cache_key: str, response) -> bool:
        """
        Determine if response should be admitted to cache.

        Policies:
        - LRU: Cache everything (let eviction handle it)
        - TinyLFU: Track frequency, only cache frequently accessed items
        - Size-aware: Prioritize smaller objects for better hit rates
        """
        # Never cache non-cacheable responses
        if not self._is_cacheable(response):
            return False

        if self.policy == "lru":
            return True

        elif self.policy == "tinylfu":
            # TinyLFU: Only cache items seen multiple times
            # Uses bloom filter for memory-efficient frequency tracking

            if self.bloom_filter.contains(cache_key):
                # Seen before - increment counter
                count = self.request_counts.get(cache_key, 0) + 1
                self.request_counts.set(cache_key, count)

                return count >= self.admission_threshold
            else:
                # First time seeing this key
                self.bloom_filter.add(cache_key)
                return False

        elif self.policy == "size_aware":
            # Prefer smaller objects (more objects cached = higher hit rate)
            size = len(response.content)

            # Objects under 64KB always admitted
            if size < 65536:
                return True

            # Larger objects need higher request frequency
            count = self.request_counts.get(cache_key, 0)
            size_factor = math.log2(size / 65536) + 1
            required_count = int(self.admission_threshold * size_factor)

            return count >= required_count

        return True

    def _is_cacheable(self, response) -> bool:
        """Check if response can be cached per HTTP semantics."""
        # Check status code
        cacheable_statuses = {200, 203, 204, 206, 300, 301, 308, 404, 410}
        if response.status_code not in cacheable_statuses:
            return False

        cache_control = response.headers.get('Cache-Control', '')

        # Explicit no-store directive
        if 'no-store' in cache_control:
            return False

        # Private responses (user-specific)
        if 'private' in cache_control:
            return False

        # Check for Set-Cookie (usually shouldn't cache)
        if 'Set-Cookie' in response.headers:
            return False

        return True
```

### Interview Questions: Edge Caching (3 Levels Deep)

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <div style="color: #1e40af; font-weight: 700; margin-bottom: 16px; font-size: 16px;">Level 1: "How does an edge cache decide what to store?"</div>
  <div style="color: #1e3a8a; font-size: 14px; margin-bottom: 12px;">
    <strong>Answer:</strong> Edge caches use HTTP Cache-Control headers from the origin to determine cacheability. The response must have a cacheable status code (200, 301, etc.), not contain <code>no-store</code> or <code>private</code> directives, and ideally specify <code>max-age</code> or <code>s-maxage</code>. The cache key is typically constructed from the URL, with query parameters sorted for consistency.
  </div>
</div>

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <div style="color: #92400e; font-weight: 700; margin-bottom: 16px; font-size: 16px;">Level 2: "How would you prevent cache pollution from bot traffic or one-hit-wonders?"</div>
  <div style="color: #78350f; font-size: 14px; margin-bottom: 12px;">
    <strong>Answer:</strong> Implement admission control policies like TinyLFU that require objects to be requested multiple times before admission. Use bloom filters for memory-efficient frequency tracking. Configure size-aware policies that apply higher admission thresholds to larger objects. Additionally, implement bot detection to either deny caching for bot requests or use separate cache partitions.
  </div>
</div>

<div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ec4899;">
  <div style="color: #9d174d; font-weight: 700; margin-bottom: 16px; font-size: 16px;">Level 3: "Your CDN has 90% hit rate but P99 latency is still high. Diagnose and fix."</div>
  <div style="color: #831843; font-size: 14px;">
    <strong>Answer:</strong> High hit rate with high P99 suggests the 10% misses are disproportionately slow. Analyze miss patterns:
    <br><br>
        (1) <strong>Origin latency</strong>: If origin is slow, implement origin shield to reduce origin requests and add connection pooling with keep-alive.
        <br><br>
            (2) <strong>Cache tier misses</strong>: If L1 RAM misses hit slow HDD tier, increase RAM allocation or implement SSD-only policy for latency-sensitive content.
            <br><br>
                (3) <strong>Request coalescing</strong>: For cache misses on popular content, multiple concurrent requests hit origin. Implement request coalescing (collapsed forwarding) where the first request fetches while others wait.
                <br><br>
                    (4) <strong>Geographic routing</strong>: Check if some users route to distant PoPs. Implement better Anycast tuning or add PoPs in underserved regions.
                    <br><br>
                        (5) <strong>Vary header explosion</strong>: Check if <code>Vary: *</code> or high-cardinality Vary headers cause cache fragmentation, storing same content multiple times.
                      </div>
                    </div>

                    ---

                    ## Cache Invalidation Strategies

                    Cache invalidation is one of the two hard problems in computer science. Understanding invalidation mechanisms deeply is essential for maintaining cache coherence without sacrificing performance.

                    ### Time-Based Expiration (TTL)

                    <span style="background: linear-gradient(90deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 8px; border-radius: 4px; font-weight: 500;">Trade-off: Short TTLs ensure freshness but reduce hit rates; long TTLs improve performance but serve stale content.</span>

                    ```python
                    class TTLStrategy:
                    """
                    TTL-based invalidation - the simplest approach.
                    Content automatically expires after specified duration.
                    """

                    # Industry-standard TTL guidelines by content type
                    TTL_GUIDELINES = {
                    # Immutable content (versioned with content hash in URL)
                    'static_versioned': 31536000,     # 1 year

                    # Static assets without versioning
                    'static_unversioned': 86400,      # 1 day

                    # Dynamic but infrequently changing
                    'product_catalog': 3600,          # 1 hour
                    'blog_posts': 86400,              # 1 day

                    # Frequently updating content
                    'news_articles': 300,             # 5 minutes
                    'stock_prices': 60,               # 1 minute
                    'live_scores': 10,                # 10 seconds

                    # User-generated content
                    'comments': 300,                  # 5 minutes
                    'user_profiles': 600,             # 10 minutes (with Vary: Cookie)

                    # API responses
                    'api_list': 60,                   # 1 minute
                    'api_detail': 300,                # 5 minutes

                    # Never cache
                    'checkout': 0,
                    'authentication': 0,
                    'real_time_data': 0,
                    }

                    def get_cache_headers(self, content_type: str,
                    is_authenticated: bool = False) -> dict:
                    """Generate appropriate cache headers."""

                    if is_authenticated:
                    # User-specific content
                    return {
                    'Cache-Control': 'private, max-age=0, must-revalidate',
                    'Vary': 'Cookie, Authorization'
                    }

                    ttl = self.TTL_GUIDELINES.get(content_type, 3600)

                    if ttl == 0:
                    return {'Cache-Control': 'no-store'}

                    # Stale-while-revalidate: serve stale while fetching fresh
                    swr = min(ttl, 3600)  # Cap at 1 hour

                    return {
                    'Cache-Control': f'public, max-age={ttl}, stale-while-revalidate={swr}',
                    's-maxage': str(ttl * 2)  # CDN can cache longer than browser
                    }
                    ```

                    ### Purge-Based Invalidation

                    ```python
                    class PurgeOrchestrator:
                    """
                    Coordinates cache purges across global CDN infrastructure.
                    Critical for instant updates when content changes.
                    """

                    def __init__(self, cdn_regions: List[str]):
                    self.regions = cdn_regions
                    self.purge_queue = asyncio.Queue()
                    self.purge_status = {}  # Track purge propagation

                    async def purge_url(self, url: str,
                    soft_purge: bool = False) -> str:
                    """
                    Purge specific URL from all edge caches.

                    soft_purge=True: Mark stale but serve while revalidating
                    soft_purge=False: Immediately remove, next request fetches from origin
                    """
                    purge_id = str(uuid.uuid4())

                    self.purge_status[purge_id] = {
                    'url': url,
                    'initiated_at': time.time(),
                    'regions': {r: 'pending' for r in self.regions}
                    }

                    # Fan-out purge requests to all regions
                    tasks = []
                    for region in self.regions:
                    task = self._purge_region(purge_id, region, url, soft_purge)
                    tasks.append(task)

                    # Wait for all regions with timeout
                    results = await asyncio.gather(*tasks, return_exceptions=True)

                    # Aggregate results
                    success_count = sum(1 for r in results if r is True)

                    return {
                    'purge_id': purge_id,
                    'success_rate': success_count / len(self.regions),
                    'propagation_time_ms': self._calculate_propagation_time(purge_id)
                    }

                    async def purge_by_tag(self, tag: str) -> dict:
                    """
                    Purge all objects with specific cache tag.

                    Example: Purge all product pages when inventory updates
                    tag="product:12345" purges all URLs tagged with that product
                    """
                    # Surrogate-Key based invalidation
                    # Much more efficient than purging individual URLs

                    purge_id = str(uuid.uuid4())

                    tasks = []
                    for region in self.regions:
                    task = self._purge_tag_region(purge_id, region, tag)
                    tasks.append(task)

                    results = await asyncio.gather(*tasks, return_exceptions=True)

                    # Count objects invalidated per region
                    total_purged = sum(r.get('count', 0) for r in results
                    if isinstance(r, dict))

                    return {
                    'purge_id': purge_id,
                    'tag': tag,
                    'objects_purged': total_purged,
                    'regions_completed': sum(1 for r in results if r is not None)
                    }

                    async def purge_by_prefix(self, path_prefix: str) -> dict:
                    """
                    Purge all URLs matching prefix.

                    Example: purge_by_prefix("/images/products/") clears all product images

                    Warning: Expensive operation on large caches. Use tags when possible.
                    """
                    # Prefix purge requires iterating cache index
                    # Much slower than tag-based purge

                    purge_id = str(uuid.uuid4())

                    tasks = []
                    for region in self.regions:
                    task = self._purge_prefix_region(purge_id, region, path_prefix)
                    tasks.append(task)

                    results = await asyncio.gather(*tasks, return_exceptions=True)

                    return {
                    'purge_id': purge_id,
                    'prefix': path_prefix,
                    'objects_purged': sum(r.get('count', 0) for r in results
                    if isinstance(r, dict))
                    }
                    ```

                    ### Versioned URLs (Cache Busting)

                    <span style="background: linear-gradient(90deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 8px; border-radius: 4px; font-weight: 500;">Design choice: Versioned URLs eliminate invalidation complexity but require updating all references when content changes.</span>

                    ```python
                    class ContentVersioning:
                    """
                    Version content by embedding content hash in URL.
                    Eliminates need for explicit invalidation.
                    """

                    def __init__(self, base_url: str = "/static"):
                    self.base_url = base_url
                    self.manifest = {}  # filename -> versioned_filename

                    def generate_versioned_path(self, file_path: str) -> str:
                    """
                    Generate versioned URL from file content.

                    /static/app.js -> /static/app.a1b2c3d4.js

                    When content changes, URL changes, so:
                    - Old cached version naturally expires
                    - New version is fetched fresh
                    - No purge required
                    """
                    with open(file_path, 'rb') as f:
                    content = f.read()

                    # Use first 8 chars of content hash
                    content_hash = hashlib.sha256(content).hexdigest()[:8]

                    # Insert hash before extension
                    path_parts = file_path.rsplit('.', 1)
                    if len(path_parts) == 2:
                    versioned_path = f"{path_parts[0]}.{content_hash}.{path_parts[1]}"
                    else:
                    versioned_path = f"{file_path}.{content_hash}"

                    # Store mapping for runtime lookup
                    original_name = os.path.basename(file_path)
                    versioned_name = os.path.basename(versioned_path)
                    self.manifest[original_name] = versioned_name

                    return versioned_path

                    def generate_asset_manifest(self, static_dir: str) -> dict:
                    """
                    Generate manifest mapping original names to versioned names.
                    Used by templates to reference correct versioned URLs.
                    """
                    manifest = {}

                    for root, dirs, files in os.walk(static_dir):
                    for file in files:
                    if file.endswith(('.js', '.css', '.png', '.jpg', '.woff2')):
                    full_path = os.path.join(root, file)
                    versioned = self.generate_versioned_path(full_path)

                    rel_path = os.path.relpath(full_path, static_dir)
                    versioned_rel = os.path.relpath(versioned, static_dir)

                    manifest[rel_path] = versioned_rel

                    return manifest

                    def rewrite_css_urls(self, css_content: str, manifest: dict) -> str:
                    """
                    Rewrite url() references in CSS to versioned paths.

                    url('../images/logo.png') -> url('../images/logo.a1b2c3d4.png')
                    """
                    def replace_url(match):
                    original_url = match.group(1).strip('"\'')

                    # Find in manifest
                    for original, versioned in manifest.items():
                    if original_url.endswith(original):
                    return f"url('{original_url.replace(original, versioned)}')"

                    return match.group(0)

                    return re.sub(r'url\(([^)]+)\)', replace_url, css_content)
                    ```

                    ### Stale-While-Revalidate Pattern

                    ```python
                    class StaleWhileRevalidateCache:
                    """
                    Implements stale-while-revalidate pattern.

                    Serves stale content immediately while asynchronously
                    fetching fresh content in the background.

                    Best of both worlds: instant response + fresh content.
                    """

                    def __init__(self, origin_client):
                    self.origin = origin_client
                    self.cache = {}
                    self.revalidation_in_progress = set()

                    async def get(self, cache_key: str, request) -> Response:
                    """
                    Get with stale-while-revalidate semantics.

                    Cache-Control: max-age=60, stale-while-revalidate=300

                    0-60s: Serve from cache (fresh)
                    60-360s: Serve stale immediately, revalidate in background
                    >360s: Cache miss, fetch synchronously
                    """
                    entry = self.cache.get(cache_key)

                    if entry is None:
                    # Cache miss - synchronous fetch
                    return await self._fetch_and_cache(cache_key, request)

                    now = time.time()

                    if now < entry.fresh_until:
                    # Fresh - serve directly
                    return self._build_response(entry, cache_status='HIT')

                    if now < entry.stale_until:
                    # Stale but within SWR window
                    # Serve stale immediately
                    response = self._build_response(entry, cache_status='STALE')

                    # Trigger background revalidation (if not already in progress)
                    if cache_key not in self.revalidation_in_progress:
                    asyncio.create_task(
                    self._background_revalidate(cache_key, request)
                    )

                    return response

                    # Too stale - synchronous fetch
                    return await self._fetch_and_cache(cache_key, request)

                    async def _background_revalidate(self, cache_key: str, request):
                    """Revalidate cache entry in background."""
                    self.revalidation_in_progress.add(cache_key)

                    try:
                    await self._fetch_and_cache(cache_key, request)
                    except Exception as e:
                    # Failed to revalidate - entry remains stale
                    # Could implement exponential backoff here
                    logger.warning(f"Background revalidation failed: {cache_key}: {e}")
                    finally:
                    self.revalidation_in_progress.discard(cache_key)
                    ```

                    ### Interview Questions: Cache Invalidation (3 Levels Deep)

                    <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                      <div style="color: #1e40af; font-weight: 700; margin-bottom: 16px; font-size: 16px;">Level 1: "What are the main cache invalidation strategies?"</div>
                      <div style="color: #1e3a8a; font-size: 14px;">
                        <strong>Answer:</strong> Three primary strategies:
                        <br><br>
                            (1) <strong>Time-based (TTL)</strong>: Content expires after a set duration. Simple but can serve stale content.
                            <br><br>
                                (2) <strong>Event-driven purge</strong>: Explicitly invalidate when content changes. Immediate freshness but requires coordination infrastructure.
                                <br><br>
                                    (3) <strong>Versioned URLs</strong>: Embed content hash in URL. New content = new URL = no invalidation needed. Eliminates stale content but requires updating all references.
                                  </div>
                                </div>

                                <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                                  <div style="color: #92400e; font-weight: 700; margin-bottom: 16px; font-size: 16px;">Level 2: "How do cache tags (surrogate keys) work and when should you use them?"</div>
                                  <div style="color: #78350f; font-size: 14px;">
                                    <strong>Answer:</strong> Cache tags are metadata labels attached to cached objects. When content changes, purge by tag instead of URL.
                                    <br><br>
                                        <strong>Example:</strong> A product page at <code>/products/123</code> is tagged with <code>product:123</code>, <code>category:electronics</code>, <code>brand:apple</code>. When the product price changes, purge <code>product:123</code> to invalidate all pages showing that product (detail page, search results, recommendations).
                                        <br><br>
                                            <strong>Use when:</strong> Content relationships are complex (one data change affects many URLs), you need instant invalidation, and you don't control all URL references. <strong>Avoid when:</strong> Content is versioned or TTL-based invalidation is acceptable.
                                          </div>
                                        </div>

                                        <div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ec4899;">
                                          <div style="color: #9d174d; font-weight: 700; margin-bottom: 16px; font-size: 16px;">Level 3: "Design a cache invalidation system for a news site where breaking news must appear within 30 seconds globally."</div>
                                          <div style="color: #831843; font-size: 14px;">
                                            <strong>Answer:</strong> Multi-layered approach:
                                            <br><br>
                                                (1) <strong>Tag-based instant purge</strong>: Each article tagged with <code>article:{id}</code>, <code>section:{name}</code>, <code>homepage</code>. CMS publishes purge event to message queue on save.
                                                <br><br>
                                                    (2) <strong>Purge propagation</strong>: Regional purge coordinators subscribe to queue. Fan-out purges to edge servers with parallel requests. Target &lt;5 second purge propagation.
                                                    <br><br>
                                                        (3) <strong>Short TTL fallback</strong>: Set <code>max-age=30, stale-while-revalidate=60</code> as safety net. Even without explicit purge, content refreshes within 30-90 seconds.
                                                        <br><br>
                                                            (4) <strong>Homepage special handling</strong>: Homepage has shortest TTL (10-15s) since it aggregates all breaking news. Consider edge-side includes (ESI) to cache static shell separately from dynamic content blocks.
                                                            <br><br>
                                                                (5) <strong>Monitoring</strong>: Track purge latency percentiles per region. Alert if P95 exceeds 15 seconds. Dashboard showing content freshness lag across PoPs.
                                                                <br><br>
                                                                    (6) <strong>Push notifications</strong>: For truly instant breaking news, bypass cache entirely with push notifications to client apps, which then fetch latest.
                                                                  </div>
                                                                </div>

                                                                ---

                                                                ## Origin Shield

                                                                Origin shield is a mid-tier caching layer between edge servers and the origin. It consolidates requests from multiple edge PoPs, dramatically reducing origin load.

                                                                <div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
                                                                  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">REQUEST FLOW: WITH vs WITHOUT ORIGIN SHIELD</h3>
                                                                  <div style="display: flex; flex-direction: column; gap: 32px;">
                                                                    <div>
                                                                      <div style="color: #dc2626; font-weight: 600; margin-bottom: 16px; text-align: center;">Without Origin Shield (Cache Miss Storm)</div>
                                                                      <div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
                                                                        <div style="display: flex; flex-direction: column; gap: 4px;">
                                                                          <div style="background: #dcfce7; padding: 8px 12px; border-radius: 6px; font-size: 12px; color: #166534;">Edge NYC</div>
                                                                          <div style="background: #dcfce7; padding: 8px 12px; border-radius: 6px; font-size: 12px; color: #166534;">Edge LAX</div>
                                                                          <div style="background: #dcfce7; padding: 8px 12px; border-radius: 6px; font-size: 12px; color: #166534;">Edge LON</div>
                                                                          <div style="background: #dcfce7; padding: 8px 12px; border-radius: 6px; font-size: 12px; color: #166534;">Edge TYO</div>
                                                                        </div>
                                                                        <div style="color: #64748b; font-size: 20px;">--></div>
                                                                        <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); padding: 16px 24px; border-radius: 8px; text-align: center;">
                                                                          <div style="color: white; font-weight: 700;">Origin</div>
                                                                          <div style="color: #fecaca; font-size: 11px;">4 concurrent requests</div>
                                                                          <div style="color: #fecaca; font-size: 11px;">for same content!</div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                    <div>
                                                                      <div style="color: #16a34a; font-weight: 600; margin-bottom: 16px; text-align: center;">With Origin Shield (Consolidated Requests)</div>
                                                                      <div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
                                                                        <div style="display: flex; flex-direction: column; gap: 4px;">
                                                                          <div style="background: #dcfce7; padding: 8px 12px; border-radius: 6px; font-size: 12px; color: #166534;">Edge NYC</div>
                                                                          <div style="background: #dcfce7; padding: 8px 12px; border-radius: 6px; font-size: 12px; color: #166534;">Edge LAX</div>
                                                                          <div style="background: #dcfce7; padding: 8px 12px; border-radius: 6px; font-size: 12px; color: #166534;">Edge LON</div>
                                                                          <div style="background: #dcfce7; padding: 8px 12px; border-radius: 6px; font-size: 12px; color: #166534;">Edge TYO</div>
                                                                        </div>
                                                                        <div style="color: #64748b; font-size: 20px;">--></div>
                                                                        <div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); padding: 16px 24px; border-radius: 8px; text-align: center;">
                                                                          <div style="color: white; font-weight: 700;">Origin Shield</div>
                                                                          <div style="color: #cffafe; font-size: 11px;">Coalesces requests</div>
                                                                        </div>
                                                                        <div style="color: #64748b; font-size: 20px;">--></div>
                                                                        <div style="background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%); padding: 16px 24px; border-radius: 8px; text-align: center;">
                                                                          <div style="color: white; font-weight: 700;">Origin</div>
                                                                          <div style="color: #dcfce7; font-size: 11px;">1 request only!</div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>

                                                                <span style="background: linear-gradient(90deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 8px; border-radius: 4px; font-weight: 500;">Trade-off: Origin shield adds one network hop latency (~20-50ms) but can reduce origin traffic by 70-90% during cache misses.</span>

                                                                ### Origin Shield Implementation

                                                                ```python
                                                                class OriginShield:
                                                                """
                                                                Mid-tier cache that sits between edge servers and origin.

                                                                Key responsibilities:
                                                                1. Request coalescing (collapse concurrent requests for same resource)
                                                                2. Connection pooling to origin (reduce TLS handshakes)
                                                                3. Additional cache layer (catch requests that miss at edge)
                                                                4. Bandwidth reduction (single fetch serves all edges)
                                                                """

                                                                def __init__(self, origin_client, cache_size_gb: int = 500):
                                                                self.origin = origin_client
                                                                self.cache = LRUCache(max_size_bytes=cache_size_gb * 1024**3)

                                                                # Request coalescing state
                                                                self.pending_requests = {}  # cache_key -> Future
                                                                self.pending_locks = {}     # cache_key -> Lock

                                                                # Connection pooling
                                                                self.connection_pool = ConnectionPool(
                                                                origin_host=origin_client.host,
                                                                max_connections=100,
                                                                keepalive_timeout=30
                                                                )

                                                                # Metrics
                                                                self.metrics = ShieldMetrics()

                                                                async def fetch(self, cache_key: str, request) -> Response:
                                                                """
                                                                Fetch with request coalescing.

                                                                If multiple edge servers request the same uncached content
                                                                simultaneously, only one request goes to origin.
                                                                """
                                                                # Check local cache first
                                                                cached = self.cache.get(cache_key)
                                                                if cached and not cached.is_expired():
                                                                self.metrics.record_hit()
                                                                return cached.response

                                                                # Implement request coalescing
                                                                # Only first request actually fetches; others wait for result

                                                                if cache_key not in self.pending_locks:
                                                                self.pending_locks[cache_key] = asyncio.Lock()

                                                                async with self.pending_locks[cache_key]:
                                                                # Double-check cache (another request may have populated it)
                                                                cached = self.cache.get(cache_key)
                                                                if cached and not cached.is_expired():
                                                                self.metrics.record_hit()
                                                                return cached.response

                                                                # Check if another coroutine is already fetching
                                                                if cache_key in self.pending_requests:
                                                                # Wait for existing fetch to complete
                                                                self.metrics.record_coalesced()
                                                                return await self.pending_requests[cache_key]

                                                                # We're the first - initiate fetch
                                                                future = asyncio.Future()
                                                                self.pending_requests[cache_key] = future

                                                                try:
                                                                # Fetch from origin
                                                                self.metrics.record_miss()
                                                                response = await self._fetch_from_origin(request)

                                                                # Cache the response
                                                                if self._is_cacheable(response):
                                                                ttl = self._extract_ttl(response)
                                                                self.cache.set(cache_key, CacheEntry(response, ttl))

                                                                # Notify waiting requests
                                                                future.set_result(response)
                                                                return response

                                                                except Exception as e:
                                                                future.set_exception(e)
                                                                raise
                                                                finally:
                                                                # Cleanup
                                                                self.pending_requests.pop(cache_key, None)

                                                                async def _fetch_from_origin(self, request) -> Response:
                                                                """
                                                                Fetch from origin with connection pooling and retry.
                                                                """
                                                                # Get pooled connection (reuses existing TCP/TLS)
                                                                conn = await self.connection_pool.get_connection()

                                                                try:
                                                                # Forward request to origin
                                                                response = await conn.request(
                                                                method=request.method,
                                                                path=request.path,
                                                                headers=self._filter_headers(request.headers),
                                                                body=request.body
                                                                )

                                                                return response

                                                                finally:
                                                                # Return connection to pool
                                                                await self.connection_pool.release(conn)

                                                                def _filter_headers(self, headers: dict) -> dict:
                                                                """
                                                                Filter headers before forwarding to origin.
                                                                Remove hop-by-hop headers, add shield identification.
                                                                """
                                                                filtered = {}

                                                                hop_by_hop = {'connection', 'keep-alive', 'proxy-authenticate',
                                                                'proxy-authorization', 'te', 'trailer',
                                                                'transfer-encoding', 'upgrade'}

                                                                for key, value in headers.items():
                                                                if key.lower() not in hop_by_hop:
                                                                filtered[key] = value

                                                                # Add shield identification
                                                                filtered['X-Origin-Shield'] = 'true'
                                                                filtered['X-Shield-Region'] = self.region

                                                                # Preserve client IP for origin logging
                                                                client_ip = headers.get('X-Forwarded-For', '')
                                                                if client_ip:
                                                                filtered['X-Original-Client-IP'] = client_ip.split(',')[0].strip()

                                                                return filtered
                                                                ```

                                                                ### Multi-Region Shield Architecture

                                                                ```python
                                                                class MultiRegionShieldRouter:
                                                                """
                                                                Routes edge requests to optimal origin shield.

                                                                Architecture:
                                                                - Multiple origin shields in different regions
                                                                - Edge servers route to nearest shield
                                                                - Shields coordinate to avoid redundant origin fetches
                                                                """

                                                                SHIELD_REGIONS = {
                                                                'us-east': {
                                                                'location': 'Virginia',
                                                                'serves': ['us-east', 'us-central', 'sa-east'],
                                                                'origin_latency_ms': 5
                                                                },
                                                                'eu-west': {
                                                                'location': 'Ireland',
                                                                'serves': ['eu-west', 'eu-central', 'af-south'],
                                                                'origin_latency_ms': 80
                                                                },
                                                                'ap-northeast': {
                                                                'location': 'Tokyo',
                                                                'serves': ['ap-northeast', 'ap-southeast', 'oc-australia'],
                                                                'origin_latency_ms': 150
                                                                }
                                                                }

                                                                def __init__(self, edge_region: str):
                                                                self.edge_region = edge_region
                                                                self.primary_shield = self._determine_primary_shield()
                                                                self.fallback_shields = self._determine_fallbacks()

                                                                def _determine_primary_shield(self) -> str:
                                                                """Find the shield region that serves this edge."""
                                                                for shield, config in self.SHIELD_REGIONS.items():
                                                                if self.edge_region in config['serves']:
                                                                return shield

                                                                # Default to us-east (closest to most origins)
                                                                return 'us-east'

                                                                async def fetch_through_shield(self, request) -> Response:
                                                                """
                                                                Fetch through origin shield with failover.
                                                                """
                                                                # Try primary shield
                                                                try:
                                                                shield = self.shields[self.primary_shield]
                                                                return await asyncio.wait_for(
                                                                shield.fetch(request),
                                                                timeout=5.0  # 5 second timeout
                                                                )
                                                                except (asyncio.TimeoutError, ConnectionError) as e:
                                                                logger.warning(f"Primary shield {self.primary_shield} failed: {e}")

                                                                # Try fallback shields
                                                                for fallback_region in self.fallback_shields:
                                                                try:
                                                                shield = self.shields[fallback_region]
                                                                return await asyncio.wait_for(
                                                                shield.fetch(request),
                                                                timeout=5.0
                                                                )
                                                                except (asyncio.TimeoutError, ConnectionError):
                                                                continue

                                                                # All shields failed - go direct to origin
                                                                logger.error("All shields failed, falling back to direct origin")
                                                                return await self.direct_origin_fetch(request)
                                                                ```

                                                                ### Interview Questions: Origin Shield (3 Levels Deep)

                                                                <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                                                                  <div style="color: #1e40af; font-weight: 700; margin-bottom: 16px; font-size: 16px;">Level 1: "What is an origin shield and why use one?"</div>
                                                                  <div style="color: #1e3a8a; font-size: 14px;">
                                                                    <strong>Answer:</strong> An origin shield is a regional caching layer between edge servers and the origin. When multiple edge PoPs have cache misses for the same content, requests are consolidated at the shield rather than all hitting the origin. Benefits include: (1) reduced origin load by 70-90%, (2) better cache hit rates due to larger cache pool, (3) connection pooling reduces TLS overhead, (4) single point for request coalescing. The trade-off is added latency (one extra hop) for cache misses.
                                                                  </div>
                                                                </div>

                                                                <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                                                                  <div style="color: #92400e; font-weight: 700; margin-bottom: 16px; font-size: 16px;">Level 2: "How does request coalescing work at the origin shield?"</div>
                                                                  <div style="color: #78350f; font-size: 14px;">
                                                                    <strong>Answer:</strong> Request coalescing (or collapsed forwarding) ensures that when multiple requests arrive for the same uncached resource, only one request goes to origin:
                                                                    <br><br>
                                                                        (1) First request acquires a lock for that cache key and initiates origin fetch.
                                                                        <br><br>
                                                                            (2) Subsequent requests for same key find the lock held and wait on a shared Future/Promise.
                                                                            <br><br>
                                                                                (3) When origin responds, the first request populates cache and resolves the Future.
                                                                                <br><br>
                                                                                    (4) All waiting requests receive the same response simultaneously.
                                                                                    <br><br>
                                                                                        Critical implementation detail: Use double-checked locking to handle race conditions where cache is populated between check and lock acquisition. Also implement timeouts to prevent indefinite waits if the origin request hangs.
                                                                                      </div>
                                                                                    </div>

                                                                                    <div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ec4899;">
                                                                                      <div style="color: #9d174d; font-weight: 700; margin-bottom: 16px; font-size: 16px;">Level 3: "Your origin shield is causing higher latency during cache warming. How do you optimize?"</div>
                                                                                      <div style="color: #831843; font-size: 14px;">
                                                                                        <strong>Answer:</strong> Cache warming through shield adds latency because content must traverse: Origin -> Shield -> Edge -> User. Optimization strategies:
                                                                                        <br><br>
                                                                                            (1) <strong>Shield bypass for known-cold requests</strong>: For first request after deploy or purge, edge can fetch directly from origin while simultaneously warming shield. Subsequent requests use shield.
                                                                                            <br><br>
                                                                                                (2) <strong>Proactive shield warming</strong>: Push content to shields before edges need it. Trigger warming when content is published, not when first user requests.
                                                                                                <br><br>
                                                                                                    (3) <strong>Tiered warming</strong>: Warm only primary shield region, let secondary shields pull on-demand. Reduces warming time and bandwidth.
                                                                                                    <br><br>
                                                                                                        (4) <strong>Shield selection by content type</strong>: High-latency origins (overseas) benefit from shield; low-latency origins (same region) may skip shield for warming requests.
                                                                                                        <br><br>
                                                                                                            (5) <strong>Predictive prefetch</strong>: Analyze traffic patterns. If content X is often requested after content Y, prefetch X to shield when Y is requested.
                                                                                                          </div>
                                                                                                        </div>

                                                                                                        ---

                                                                                                        ## Geographic Routing

                                                                                                        Geographic routing directs users to the nearest or best-performing edge server. This involves [[DNS]](/topic/system-design/dns)-based routing, Anycast networking, and performance-based selection.

                                                                                                        ### DNS-Based Geographic Routing

                                                                                                        <span style="background: linear-gradient(90deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 8px; border-radius: 4px; font-weight: 500;">Assumption: DNS resolution happens at the user's configured resolver, which may not be geographically close to the user (e.g., Google DNS 8.8.8.8).</span>

                                                                                                        ```python
                                                                                                        class GeoDNSResolver:
                                                                                                        """
                                                                                                        DNS-based geographic routing for CDN.

                                                                                                        Returns different IP addresses based on:
                                                                                                        1. Client IP geolocation (via EDNS Client Subnet)
                                                                                                        2. DNS resolver location (fallback)
                                                                                                        3. Real-time server health and capacity
                                                                                                        """

                                                                                                        def __init__(self):
                                                                                                        self.edge_servers = self._load_edge_servers()
                                                                                                        self.geoip_db = GeoIPDatabase()
                                                                                                        self.health_checker = HealthChecker()

                                                                                                        def resolve(self, hostname: str, client_ip: str = None,
                                                                                                        ecs_subnet: str = None) -> List[str]:
                                                                                                        """
                                                                                                        Resolve hostname to optimal edge server IPs.

                                                                                                        Priority:
                                                                                                        1. EDNS Client Subnet (actual client location)
                                                                                                        2. Client IP (DNS resolver location)
                                                                                                        3. Default to largest/closest PoP
                                                                                                        """
                                                                                                        # Determine client location
                                                                                                        if ecs_subnet:
                                                                                                        # EDNS Client Subnet provides actual user subnet
                                                                                                        location = self.geoip_db.lookup(ecs_subnet)
                                                                                                        elif client_ip:
                                                                                                        # Fall back to resolver location
                                                                                                        location = self.geoip_db.lookup(client_ip)
                                                                                                        else:
                                                                                                        # Default location (usually US)
                                                                                                        location = GeoLocation(lat=37.7749, lon=-122.4194)

                                                                                                        # Find optimal edge servers
                                                                                                        candidates = self._find_candidates(location)

                                                                                                        # Filter by health
                                                                                                        healthy = [c for c in candidates
                                                                                                        if self.health_checker.is_healthy(c['id'])]

                                                                                                        if not healthy:
                                                                                                        # All nearby servers unhealthy - fallback to any healthy server
                                                                                                        healthy = self._get_global_fallbacks()

                                                                                                        # Sort by score (distance, load, performance)
                                                                                                        scored = self._score_candidates(healthy, location)

                                                                                                        # Return top 4 IPs (standard DNS response)
                                                                                                        return [c['ip'] for c in scored[:4]]

                                                                                                        def _find_candidates(self, location: GeoLocation) -> List[dict]:
                                                                                                        """Find edge servers within reasonable distance."""
                                                                                                        candidates = []

                                                                                                        for server in self.edge_servers:
                                                                                                        distance = self._haversine_distance(
                                                                                                        location, server['location']
                                                                                                        )

                                                                                                        # Include servers within 5000km
                                                                                                        if distance < 5000:
                                                                                                        server['distance'] = distance
                                                                                                        candidates.append(server)

                                                                                                        return candidates

                                                                                                        def _score_candidates(self, candidates: List[dict],
                                                                                                        location: GeoLocation) -> List[dict]:
                                                                                                        """
                                                                                                        Score candidates based on multiple factors.

                                                                                                        Factors:
                                                                                                        - Distance (lower is better)
                                                                                                        - Current load (lower is better)
                                                                                                        - Historical performance (RTT, error rate)
                                                                                                        - Server capacity
                                                                                                        """
                                                                                                        for candidate in candidates:
                                                                                                        distance_score = 100 - (candidate['distance'] / 50)  # 0-100

                                                                                                        load = self.health_checker.get_load(candidate['id'])
                                                                                                        load_score = 100 - load  # 0-100 (0% load = 100 score)

                                                                                                        perf = self.health_checker.get_performance(candidate['id'])
                                                                                                        perf_score = 100 - (perf['p50_latency_ms'] / 5)  # Lower latency = higher score

                                                                                                        # Weighted combination
                                                                                                        candidate['score'] = (
                                                                                                        distance_score * 0.4 +
                                                                                                        load_score * 0.3 +
                                                                                                        perf_score * 0.3
                                                                                                        )

                                                                                                        return sorted(candidates, key=lambda x: x['score'], reverse=True)
                                                                                                        ```

                                                                                                        ### Anycast Routing

                                                                                                        <div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
                                                                                                          <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">ANYCAST vs UNICAST ROUTING</h3>
                                                                                                          <div style="display: flex; flex-direction: column; gap: 24px;">
                                                                                                            <div style="background: #fef2f2; padding: 20px; border-radius: 12px;">
                                                                                                              <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">Unicast: One IP = One Server</div>
                                                                                                              <div style="color: #7f1d1d; font-size: 14px;">Each server has unique IP. DNS must return different IPs per region. Failover requires DNS TTL expiration (minutes to hours). Single point of failure per region.</div>
                                                                                                            </div>
                                                                                                            <div style="background: #dcfce7; padding: 20px; border-radius: 12px;">
                                                                                                              <div style="color: #16a34a; font-weight: 700; margin-bottom: 12px;">Anycast: One IP = Many Servers</div>
                                                                                                              <div style="color: #166534; font-size: 14px;">Same IP announced from multiple locations via BGP. Network automatically routes to nearest server. Instant failover (BGP convergence ~30-90 seconds). Natural load distribution. Used by Cloudflare, Google, major CDNs.</div>
                                                                                                            </div>
                                                                                                          </div>
                                                                                                        </div>

                                                                                                        ```python
                                                                                                        class AnycastRoutingSimulator:
                                                                                                        """
                                                                                                        Simulates Anycast BGP routing behavior.

                                                                                                        In reality, Anycast is implemented at network layer via BGP.
                                                                                                        This simulates the routing decisions for understanding.
                                                                                                        """

                                                                                                        def __init__(self):
                                                                                                        # Each PoP announces same IP prefix
                                                                                                        self.anycast_ip = "198.41.128.0/24"

                                                                                                        self.pops = {
                                                                                                        'nyc': {
                                                                                                        'location': 'New York',
                                                                                                        'bgp_asn': 13335,
                                                                                                        'peering_partners': ['Cogent', 'Level3', 'Hurricane'],
                                                                                                        'capacity_gbps': 100
                                                                                                        },
                                                                                                        'lax': {
                                                                                                        'location': 'Los Angeles',
                                                                                                        'bgp_asn': 13335,
                                                                                                        'peering_partners': ['Cogent', 'NTT', 'Telia'],
                                                                                                        'capacity_gbps': 80
                                                                                                        },
                                                                                                        'ams': {
                                                                                                        'location': 'Amsterdam',
                                                                                                        'bgp_asn': 13335,
                                                                                                        'peering_partners': ['AMS-IX', 'LINX', 'DE-CIX'],
                                                                                                        'capacity_gbps': 120
                                                                                                        },
                                                                                                        'sin': {
                                                                                                        'location': 'Singapore',
                                                                                                        'bgp_asn': 13335,
                                                                                                        'peering_partners': ['SGIX', 'Equinix', 'Telia'],
                                                                                                        'capacity_gbps': 60
                                                                                                        }
                                                                                                        }

                                                                                                        def simulate_routing(self, client_asn: int,
                                                                                                        client_location: str) -> str:
                                                                                                        """
                                                                                                        Simulate which PoP a client would be routed to.

                                                                                                        BGP routing is based on:
                                                                                                        1. AS path length (fewer hops preferred)
                                                                                                        2. Direct peering relationships
                                                                                                        3. Network policies
                                                                                                        4. Geographic proximity (often correlated with above)
                                                                                                        """
                                                                                                        best_pop = None
                                                                                                        best_score = float('inf')

                                                                                                        for pop_id, pop in self.pops.items():
                                                                                                        # Simulate AS path calculation
                                                                                                        path_length = self._calculate_as_path(client_asn, pop['bgp_asn'])

                                                                                                        # Bonus for direct peering
                                                                                                        peering_bonus = -2 if self._has_direct_peering(
                                                                                                        client_asn, pop['peering_partners']
                                                                                                        ) else 0

                                                                                                        # Geographic component
                                                                                                        geo_distance = self._estimate_network_distance(
                                                                                                        client_location, pop['location']
                                                                                                        )

                                                                                                        score = path_length + peering_bonus + (geo_distance / 1000)

                                                                                                        if score < best_score:
                                                                                                        best_score = score
                                                                                                        best_pop = pop_id

                                                                                                        return best_pop

                                                                                                        def simulate_failover(self, failed_pop: str,
                                                                                                        client_asn: int) -> tuple:
                                                                                                        """
                                                                                                        Simulate Anycast failover when a PoP goes down.

                                                                                                        When a PoP stops announcing routes:
                                                                                                        1. BGP withdraws the route
                                                                                                        2. Network reconverges (~30-90 seconds)
                                                                                                        3. Traffic automatically shifts to next-best PoP
                                                                                                        """
                                                                                                        # Remove failed PoP from consideration
                                                                                                        available_pops = {k: v for k, v in self.pops.items()
                                                                                                        if k != failed_pop}

                                                                                                        # Find new best route
                                                                                                        new_pop = self._find_best_route(available_pops, client_asn)

                                                                                                        # Estimate convergence time based on network distance
                                                                                                        convergence_time_s = random.uniform(30, 90)

                                                                                                        return new_pop, convergence_time_s
                                                                                                        ```

                                                                                                        ### Performance-Based Routing

                                                                                                        ```python
                                                                                                        class PerformanceBasedRouter:
                                                                                                        """
                                                                                                        Route based on real-time performance measurements.

                                                                                                        Goes beyond geographic proximity to consider:
                                                                                                        - Actual latency (which varies with network conditions)
                                                                                                        - Server load and capacity
                                                                                                        - Error rates
                                                                                                        - Network congestion
                                                                                                        """

                                                                                                        def __init__(self):
                                                                                                        self.latency_history = defaultdict(lambda: deque(maxlen=100))
                                                                                                        self.error_rates = defaultdict(float)
                                                                                                        self.rum_data = RealUserMonitoring()

                                                                                                        def select_edge_server(self, client_region: str,
                                                                                                        content_type: str) -> str:
                                                                                                        """
                                                                                                        Select optimal edge server based on performance data.
                                                                                                        """
                                                                                                        candidates = self._get_candidates_for_region(client_region)

                                                                                                        scores = {}
                                                                                                        for server_id in candidates:
                                                                                                        scores[server_id] = self._calculate_performance_score(
                                                                                                        server_id, client_region, content_type
                                                                                                        )

                                                                                                        # Weighted random selection (not always best)
                                                                                                        # Allows exploration and prevents thundering herd
                                                                                                        return self._weighted_random_select(scores)

                                                                                                        def _calculate_performance_score(self, server_id: str,
                                                                                                        client_region: str,
                                                                                                        content_type: str) -> float:
                                                                                                        """
                                                                                                        Calculate composite performance score.
                                                                                                        """
                                                                                                        # Real User Monitoring data (most accurate)
                                                                                                        rum_latency = self.rum_data.get_p50_latency(
                                                                                                        server_id, client_region
                                                                                                        )

                                                                                                        # Synthetic monitoring (always available)
                                                                                                        synthetic_latency = self._get_synthetic_latency(
                                                                                                        server_id, client_region
                                                                                                        )

                                                                                                        # Blend RUM and synthetic (prefer RUM when available)
                                                                                                        if rum_latency:
                                                                                                        latency = rum_latency * 0.8 + synthetic_latency * 0.2
                                                                                                        else:
                                                                                                        latency = synthetic_latency

                                                                                                        # Error rate penalty
                                                                                                        error_rate = self.error_rates[server_id]
                                                                                                        error_penalty = error_rate * 100  # 1% error = 100ms penalty

                                                                                                        # Load penalty
                                                                                                        load = self._get_server_load(server_id)
                                                                                                        load_penalty = 0 if load < 0.7 else (load - 0.7) * 200

                                                                                                        # Content-type specific adjustments
                                                                                                        if content_type == 'video' and self._has_video_cache(server_id):
                                                                                                        content_bonus = -20  # Prefer servers with video cache
                                                                                                        else:
                                                                                                        content_bonus = 0

                                                                                                        # Lower score is better
                                                                                                        return latency + error_penalty + load_penalty + content_bonus

                                                                                                        def _weighted_random_select(self, scores: Dict[str, float]) -> str:
                                                                                                        """
                                                                                                        Select server with probability inversely proportional to score.

                                                                                                        Why not always pick the best?
                                                                                                        1. Prevents thundering herd to "best" server
                                                                                                        2. Allows discovery of improving servers
                                                                                                        3. Distributes load more evenly
                                                                                                        4. Handles measurement noise
                                                                                                        """
                                                                                                        # Convert scores to weights (inverse)
                                                                                                        max_score = max(scores.values())
                                                                                                        weights = {k: max_score - v + 1 for k, v in scores.items()}

                                                                                                        # Normalize
                                                                                                        total = sum(weights.values())
                                                                                                        probabilities = {k: v/total for k, v in weights.items()}

                                                                                                        # Random selection
                                                                                                        r = random.random()
                                                                                                        cumulative = 0
                                                                                                        for server_id, prob in probabilities.items():
                                                                                                        cumulative += prob
                                                                                                        if r <= cumulative:
                                                                                                        return server_id

                                                                                                        return list(scores.keys())[0]  # Fallback
                                                                                                        ```

                                                                                                        ### Interview Questions: Geographic Routing (3 Levels Deep)

                                                                                                        <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                                                                                                          <div style="color: #1e40af; font-weight: 700; margin-bottom: 16px; font-size: 16px;">Level 1: "How do CDNs route users to the nearest edge server?"</div>
                                                                                                          <div style="color: #1e3a8a; font-size: 14px;">
                                                                                                            <strong>Answer:</strong> Two primary methods:
                                                                                                            <br><br>
                                                                                                                (1) <strong>GeoDNS</strong>: DNS server returns different IP addresses based on the requester's location. Uses GeoIP databases to map IP to location. Challenge: DNS resolver may not be near the user.
                                                                                                                <br><br>
                                                                                                                    (2) <strong>Anycast</strong>: Same IP address is announced from multiple global locations via BGP. Network routing automatically directs packets to the nearest announcement point. Provides automatic failover. Used by Cloudflare (1.1.1.1), Google (8.8.8.8), and most major CDNs.
                                                                                                                  </div>
                                                                                                                </div>

                                                                                                                <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                                                                                                                  <div style="color: #92400e; font-weight: 700; margin-bottom: 16px; font-size: 16px;">Level 2: "What is EDNS Client Subnet (ECS) and why is it important for CDNs?"</div>
                                                                                                                  <div style="color: #78350f; font-size: 14px;">
                                                                                                                    <strong>Answer:</strong> ECS is a DNS extension that includes the client's subnet in DNS queries. Without ECS, GeoDNS only sees the DNS resolver's IP (e.g., 8.8.8.8 in California), not the actual user's location (e.g., user in Tokyo using Google DNS).
                                                                                                                    <br><br>
                                                                                                                        <strong>How it works:</strong> Recursive resolver includes client subnet (e.g., 203.0.113.0/24) in query to authoritative DNS. Authoritative server uses this subnet for geographic routing decisions instead of resolver IP.
                                                                                                                        <br><br>
                                                                                                                            <strong>Trade-offs:</strong> Privacy concern (leaks partial client IP), additional DNS traffic (more unique queries = lower cache hit rate at resolvers), but significantly improves routing accuracy for users with geographically distant DNS resolvers.
                                                                                                                          </div>
                                                                                                                        </div>

                                                                                                                        <div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ec4899;">
                                                                                                                          <div style="color: #9d174d; font-weight: 700; margin-bottom: 16px; font-size: 16px;">Level 3: "Users in Southeast Asia report higher latency than users in Europe, despite having a closer PoP. Diagnose."</div>
                                                                                                                          <div style="color: #831843; font-size: 14px;">
                                                                                                                            <strong>Answer:</strong> Multiple potential causes to investigate:
                                                                                                                            <br><br>
                                                                                                                                (1) <strong>BGP routing issues</strong>: SEA traffic may be routing through US or EU due to BGP path selection. Check AS path from major SEA ISPs. May need better peering arrangements in SEA.
                                                                                                                                <br><br>
                                                                                                                                    (2) <strong>Undersea cable congestion</strong>: SEA to APAC cables may be congested. Traffic could be taking longer paths. Check for recent cable cuts or maintenance.
                                                                                                                                    <br><br>
                                                                                                                                        (3) <strong>PoP capacity</strong>: SEA PoP may be overloaded, causing processing delays. Check server load and queue depths.
                                                                                                                                        <br><br>
                                                                                                                                            (4) <strong>Cache hit rate</strong>: Lower traffic in SEA = colder cache = more origin fetches. Implement regional origin shield or proactive warming for SEA.
                                                                                                                                            <br><br>
                                                                                                                                                (5) <strong>DNS resolver misconfiguration</strong>: SEA users might be using non-local DNS resolvers. Verify ECS support. Check if ISP DNS is routing correctly.
                                                                                                                                                <br><br>
                                                                                                                                                    (6) <strong>Origin location</strong>: If origin is in EU, cache misses from SEA PoP traverse full distance. Add origin shield in APAC region.
                                                                                                                                                    <br><br>
                                                                                                                                                        <strong>Diagnostics:</strong> Run traceroutes from SEA locations, analyze RUM data by region, check cache hit rates by PoP, measure origin-to-shield-to-edge latency breakdown.
                                                                                                                                                      </div>
                                                                                                                                                    </div>

                                                                                                                                                    ---

                                                                                                                                                    ## Cache Warming

                                                                                                                                                    Cache warming is the proactive population of caches before user requests arrive. This eliminates cold-cache latency penalties and ensures consistent performance from the first request.

                                                                                                                                                    <span style="background: linear-gradient(90deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 8px; border-radius: 4px; font-weight: 500;">Trade-off: Warming consumes bandwidth and origin resources. Over-warming wastes resources on content that's never requested; under-warming causes cold-cache latency spikes.</span>

                                                                                                                                                    ### Cache Warming Strategies

                                                                                                                                                    ```python
                                                                                                                                                    class CacheWarmingOrchestrator:
                                                                                                                                                    """
                                                                                                                                                    Orchestrates cache warming across CDN edge servers.

                                                                                                                                                    Strategies:
                                                                                                                                                    1. Deployment warming: Pre-warm after code/content deploys
                                                                                                                                                    2. Predictive warming: Warm content likely to be requested
                                                                                                                                                    3. Time-based warming: Warm before traffic peaks
                                                                                                                                                    4. Event-driven warming: Warm when related events occur
                                                                                                                                                    """

                                                                                                                                                    def __init__(self, cdn_client, analytics_client):
                                                                                                                                                    self.cdn = cdn_client
                                                                                                                                                    self.analytics = analytics_client
                                                                                                                                                    self.warming_queue = asyncio.PriorityQueue()

                                                                                                                                                    async def warm_after_deployment(self, deployed_paths: List[str],
                                                                                                                                                    priority_regions: List[str] = None):
                                                                                                                                                    """
                                                                                                                                                    Warm caches after deployment.

                                                                                                                                                    Order of warming:
                                                                                                                                                    1. Priority regions (highest traffic)
                                                                                                                                                    2. Origin shield (benefits all edges)
                                                                                                                                                    3. Remaining edge PoPs
                                                                                                                                                    """
                                                                                                                                                    # Get historical traffic data to prioritize URLs
                                                                                                                                                    url_traffic = await self.analytics.get_url_traffic(
                                                                                                                                                    paths=deployed_paths,
                                                                                                                                                    lookback_hours=24
                                                                                                                                                    )

                                                                                                                                                    # Sort by traffic (warm popular content first)
                                                                                                                                                    sorted_urls = sorted(
                                                                                                                                                    url_traffic.items(),
                                                                                                                                                    key=lambda x: x[1],
                                                                                                                                                    reverse=True
                                                                                                                                                    )

                                                                                                                                                    # Warm origin shields first
                                                                                                                                                    await self._warm_origin_shields(
                                                                                                                                                    [url for url, _ in sorted_urls[:100]]  # Top 100 URLs
                                                                                                                                                    )

                                                                                                                                                    # Warm priority regions
                                                                                                                                                    if priority_regions:
                                                                                                                                                    for region in priority_regions:
                                                                                                                                                    await self._warm_region(region, sorted_urls[:500])

                                                                                                                                                    # Warm remaining regions with lower priority
                                                                                                                                                    remaining_regions = set(self.cdn.regions) - set(priority_regions or [])
                                                                                                                                                    await asyncio.gather(*[
                                                                                                                                                    self._warm_region(region, sorted_urls[:100])
                                                                                                                                                    for region in remaining_regions
                                                                                                                                                    ])

                                                                                                                                                    async def warm_predictively(self):
                                                                                                                                                    """
                                                                                                                                                    Predict and warm content before it's needed.

                                                                                                                                                    Signals for prediction:
                                                                                                                                                    - Time patterns (warm morning content at 5 AM)
                                                                                                                                                    - Navigation patterns (warm page B when page A is viewed)
                                                                                                                                                    - External events (warm product pages before marketing email)
                                                                                                                                                    """
                                                                                                                                                    # Time-based predictions
                                                                                                                                                    current_hour = datetime.now().hour
                                                                                                                                                    predicted_urls = await self.analytics.predict_popular_urls(
                                                                                                                                                    hour=current_hour + 1,  # Predict for next hour
                                                                                                                                                    lookback_days=7
                                                                                                                                                    )

                                                                                                                                                    for url, confidence in predicted_urls:
                                                                                                                                                    if confidence > 0.7:  # Only warm high-confidence predictions
                                                                                                                                                    priority = int((1 - confidence) * 100)  # Higher confidence = lower priority number
                                                                                                                                                    await self.warming_queue.put((priority, url))

                                                                                                                                                    # Process warming queue
                                                                                                                                                    await self._process_warming_queue()

                                                                                                                                                    async def warm_for_event(self, event_type: str,
                                                                                                                                                    event_data: dict):
                                                                                                                                                    """
                                                                                                                                                    Event-driven cache warming.

                                                                                                                                                    Events:
                                                                                                                                                    - Marketing email send -> warm linked product pages
                                                                                                                                                    - Flash sale start -> warm sale category pages
                                                                                                                                                    - Breaking news -> warm news article and related content
                                                                                                                                                    - New content publish -> warm content and related pages
                                                                                                                                                    """
                                                                                                                                                    if event_type == 'email_campaign':
                                                                                                                                                    # Extract URLs from email content
                                                                                                                                                    urls = self._extract_urls_from_email(event_data['template'])

                                                                                                                                                    # Warm before email delivery starts
                                                                                                                                                    send_time = event_data['scheduled_time']
                                                                                                                                                    warm_at = send_time - timedelta(minutes=15)

                                                                                                                                                    await self._schedule_warming(urls, warm_at)

                                                                                                                                                    elif event_type == 'flash_sale':
                                                                                                                                                    # Warm all products in sale category
                                                                                                                                                    category_id = event_data['category_id']
                                                                                                                                                    product_urls = await self.analytics.get_category_urls(category_id)

                                                                                                                                                    sale_start = event_data['start_time']
                                                                                                                                                    warm_at = sale_start - timedelta(minutes=30)

                                                                                                                                                    await self._schedule_warming(product_urls, warm_at)

                                                                                                                                                    elif event_type == 'content_publish':
                                                                                                                                                    # Warm the content and related navigation pages
                                                                                                                                                    content_url = event_data['url']
                                                                                                                                                    related_urls = await self._get_related_urls(content_url)

                                                                                                                                                    # Warm immediately
                                                                                                                                                    await self._warm_urls([content_url] + related_urls)

                                                                                                                                                    async def _warm_region(self, region: str,
                                                                                                                                                    urls: List[tuple]):
                                                                                                                                                    """Warm specific region's edge caches."""
                                                                                                                                                    edge_servers = self.cdn.get_edge_servers(region)

                                                                                                                                                    for url, _ in urls:
                                                                                                                                                    # Send warming request through region's edge
                                                                                                                                                    for server in edge_servers[:2]:  # Warm at least 2 servers
                                                                                                                                                    try:
                                                                                                                                                    await self.cdn.send_warming_request(
                                                                                                                                                    server_id=server['id'],
                                                                                                                                                    url=url,
                                                                                                                                                    headers={
                                                                                                                                                    'X-Cache-Warm': 'true',
                                                                                                                                                    'X-Priority': 'background'
                                                                                                                                                    }
                                                                                                                                                    )
                                                                                                                                                    except Exception as e:
                                                                                                                                                    logger.warning(f"Warming failed for {url} at {server['id']}: {e}")

                                                                                                                                                    # Rate limit to avoid overwhelming origin
                                                                                                                                                    await asyncio.sleep(0.05)  # 20 requests/second
                                                                                                                                                    ```

                                                                                                                                                    ### Tiered Warming Architecture

                                                                                                                                                    <div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
                                                                                                                                                      <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">TIERED CACHE WARMING</h3>
                                                                                                                                                      <div style="display: flex; flex-direction: column; gap: 16px;">
                                                                                                                                                        <div style="display: flex; align-items: center; gap: 16px;">
                                                                                                                                                          <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 12px 24px; border-radius: 8px; min-width: 100px; text-align: center;">
                                                                                                                                                            <div style="color: white; font-weight: 700; font-size: 14px;">Tier 1</div>
                                                                                                                                                          </div>
                                                                                                                                                          <div style="flex: 1; background: #f3e8ff; padding: 12px 16px; border-radius: 8px;">
                                                                                                                                                            <div style="color: #6b21a8; font-weight: 600;">Origin Shield</div>
                                                                                                                                                            <div style="color: #7c3aed; font-size: 13px;">Warm first. Single fetch benefits all edges. 100% of popular content.</div>
                                                                                                                                                          </div>
                                                                                                                                                        </div>
                                                                                                                                                        <div style="display: flex; align-items: center; gap: 16px;">
                                                                                                                                                          <div style="background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); padding: 12px 24px; border-radius: 8px; min-width: 100px; text-align: center;">
                                                                                                                                                            <div style="color: white; font-weight: 700; font-size: 14px;">Tier 2</div>
                                                                                                                                                          </div>
                                                                                                                                                          <div style="flex: 1; background: #dbeafe; padding: 12px 16px; border-radius: 8px;">
                                                                                                                                                            <div style="color: #1e40af; font-weight: 600;">High-Traffic PoPs</div>
                                                                                                                                                            <div style="color: #2563eb; font-size: 13px;">NYC, LAX, LON, TYO. Top 50% of content by traffic. Warm during off-peak.</div>
                                                                                                                                                          </div>
                                                                                                                                                        </div>
                                                                                                                                                        <div style="display: flex; align-items: center; gap: 16px;">
                                                                                                                                                          <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 12px 24px; border-radius: 8px; min-width: 100px; text-align: center;">
                                                                                                                                                            <div style="color: white; font-weight: 700; font-size: 14px;">Tier 3</div>
                                                                                                                                                          </div>
                                                                                                                                                          <div style="flex: 1; background: #dcfce7; padding: 12px 16px; border-radius: 8px;">
                                                                                                                                                            <div style="color: #166534; font-weight: 600;">All Other PoPs</div>
                                                                                                                                                            <div style="color: #15803d; font-size: 13px;">On-demand from shield. Only warm for known high-traffic events.</div>
                                                                                                                                                          </div>
                                                                                                                                                        </div>
                                                                                                                                                      </div>
                                                                                                                                                    </div>

                                                                                                                                                    ```python
                                                                                                                                                    class TieredWarmingStrategy:
                                                                                                                                                    """
                                                                                                                                                    Implements tiered warming to balance coverage vs resource usage.
                                                                                                                                                    """

                                                                                                                                                    TIER_CONFIG = {
                                                                                                                                                    'origin_shield': {
                                                                                                                                                    'warm_percentage': 100,  # Warm all popular content
                                                                                                                                                    'content_threshold': 10,  # >10 requests/day
                                                                                                                                                    'priority': 1
                                                                                                                                                    },
                                                                                                                                                    'high_traffic_pops': {
                                                                                                                                                    'warm_percentage': 50,   # Top 50% of content
                                                                                                                                                    'content_threshold': 100, # >100 requests/day at this PoP
                                                                                                                                                    'priority': 2,
                                                                                                                                                    'pops': ['nyc', 'lax', 'lon', 'ams', 'tyo', 'sin']
                                                                                                                                                    },
                                                                                                                                                    'medium_traffic_pops': {
                                                                                                                                                    'warm_percentage': 20,   # Top 20% only
                                                                                                                                                    'content_threshold': 50,
                                                                                                                                                    'priority': 3,
                                                                                                                                                    'pops': ['dfw', 'ord', 'fra', 'syd', 'hkg']
                                                                                                                                                    },
                                                                                                                                                    'low_traffic_pops': {
                                                                                                                                                    'warm_percentage': 0,    # On-demand only
                                                                                                                                                    'priority': 4
                                                                                                                                                    }
                                                                                                                                                    }

                                                                                                                                                    async def execute_tiered_warming(self, content_manifest: List[dict]):
                                                                                                                                                    """
                                                                                                                                                    Execute warming in tier order.
                                                                                                                                                    """
                                                                                                                                                    # Sort content by popularity
                                                                                                                                                    sorted_content = sorted(
                                                                                                                                                    content_manifest,
                                                                                                                                                    key=lambda x: x['daily_requests'],
                                                                                                                                                    reverse=True
                                                                                                                                                    )

                                                                                                                                                    # Tier 1: Origin shield
                                                                                                                                                    tier1_content = [
                                                                                                                                                    c for c in sorted_content
                                                                                                                                                    if c['daily_requests'] >= self.TIER_CONFIG['origin_shield']['content_threshold']
                                                                                                                                                    ]
                                                                                                                                                    await self._warm_tier('origin_shield', tier1_content)

                                                                                                                                                    # Tier 2: High-traffic PoPs
                                                                                                                                                    tier2_content = sorted_content[:int(len(sorted_content) * 0.5)]
                                                                                                                                                    for pop in self.TIER_CONFIG['high_traffic_pops']['pops']:
                                                                                                                                                    await self._warm_pop(pop, tier2_content)

                                                                                                                                                    # Tier 3: Medium-traffic PoPs
                                                                                                                                                    tier3_content = sorted_content[:int(len(sorted_content) * 0.2)]
                                                                                                                                                    for pop in self.TIER_CONFIG['medium_traffic_pops']['pops']:
                                                                                                                                                    await self._warm_pop(pop, tier3_content)

                                                                                                                                                    # Tier 4: Low-traffic PoPs - skip (on-demand)
                                                                                                                                                    logger.info("Low-traffic PoPs will warm on-demand via origin shield")

                                                                                                                                                    def calculate_warming_cost(self, content_manifest: List[dict]) -> dict:
                                                                                                                                                    """
                                                                                                                                                    Calculate bandwidth and origin load for warming strategy.
                                                                                                                                                    """
                                                                                                                                                    total_size = sum(c['size_bytes'] for c in content_manifest)

                                                                                                                                                    costs = {
                                                                                                                                                    'full_warming': {
                                                                                                                                                    'bandwidth_gb': (total_size * len(self.cdn.pops)) / 1e9,
                                                                                                                                                    'origin_requests': len(content_manifest) * len(self.cdn.pops),
                                                                                                                                                    'estimated_time_minutes': len(content_manifest) * len(self.cdn.pops) / 1000
                                                                                                                                                    },
                                                                                                                                                    'tiered_warming': {
                                                                                                                                                    'bandwidth_gb': self._calculate_tiered_bandwidth(content_manifest),
                                                                                                                                                    'origin_requests': self._calculate_tiered_requests(content_manifest),
                                                                                                                                                    'estimated_time_minutes': self._calculate_tiered_time(content_manifest)
                                                                                                                                                    }
                                                                                                                                                    }

                                                                                                                                                    costs['savings'] = {
                                                                                                                                                    'bandwidth_reduction': 1 - (costs['tiered_warming']['bandwidth_gb'] /
                                                                                                                                                    costs['full_warming']['bandwidth_gb']),
                                                                                                                                                    'request_reduction': 1 - (costs['tiered_warming']['origin_requests'] /
                                                                                                                                                    costs['full_warming']['origin_requests'])
                                                                                                                                                    }

                                                                                                                                                    return costs
                                                                                                                                                    ```

                                                                                                                                                    ### Interview Questions: Cache Warming (3 Levels Deep)

                                                                                                                                                    <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                                                                                                                                                      <div style="color: #1e40af; font-weight: 700; margin-bottom: 16px; font-size: 16px;">Level 1: "What is cache warming and when should you use it?"</div>
                                                                                                                                                      <div style="color: #1e3a8a; font-size: 14px;">
                                                                                                                                                        <strong>Answer:</strong> Cache warming is proactively populating caches before user requests arrive, eliminating cold-cache latency. Use it when:
                                                                                                                                                        <br><br>
                                                                                                                                                            (1) After deployments that invalidate cache
                                                                                                                                                            (2) Before predictable traffic spikes (marketing campaigns, sales events)
                                                                                                                                                            (3) When launching in new geographic regions
                                                                                                                                                            (4) For latency-sensitive content where even one slow request is unacceptable
                                                                                                                                                            <br><br>
                                                                                                                                                                Avoid for: Long-tail content with low request probability, highly dynamic content, resource-constrained environments.
                                                                                                                                                              </div>
                                                                                                                                                            </div>

                                                                                                                                                            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                                                                                                                                                              <div style="color: #92400e; font-weight: 700; margin-bottom: 16px; font-size: 16px;">Level 2: "How do you decide which content to warm vs let populate on-demand?"</div>
                                                                                                                                                              <div style="color: #78350f; font-size: 14px;">
                                                                                                                                                                <strong>Answer:</strong> Use data-driven selection based on:
                                                                                                                                                                <br><br>
                                                                                                                                                                    (1) <strong>Historical traffic analysis</strong>: Content requested >N times/day is worth warming. Below threshold, let populate on-demand.
                                                                                                                                                                    <br><br>
                                                                                                                                                                        (2) <strong>Content importance</strong>: Homepage, top navigation, landing pages for campaigns should always be warm regardless of current traffic.
                                                                                                                                                                        <br><br>
                                                                                                                                                                            (3) <strong>Cost-benefit calculation</strong>: Warming cost (bandwidth, origin load) vs latency penalty (P99 impact, conversion rate). If content is 1MB and requested 10 times/day, warming 100 PoPs costs 1GB for saving 10 cold requests.
                                                                                                                                                                            <br><br>
                                                                                                                                                                                (4) <strong>Tiered approach</strong>: Warm 100% at origin shield (serves all edges), 50% at high-traffic PoPs, 20% at medium, 0% at low-traffic (pull from shield on-demand).
                                                                                                                                                                              </div>
                                                                                                                                                                            </div>

                                                                                                                                                                            <div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ec4899;">
                                                                                                                                                                              <div style="color: #9d174d; font-weight: 700; margin-bottom: 16px; font-size: 16px;">Level 3: "Design a cache warming system for a streaming service launching a highly anticipated show globally at midnight."</div>
                                                                                                                                                                              <div style="color: #831843; font-size: 14px;">
                                                                                                                                                                                <strong>Answer:</strong> Multi-phase warming strategy:
                                                                                                                                                                                <br><br>
                                                                                                                                                                                    (1) <strong>Pre-launch (T-24h to T-2h)</strong>: Push all video segments to origin shields. Verify integrity with checksums. This is 80% of the work.
                                                                                                                                                                                    <br><br>
                                                                                                                                                                                        (2) <strong>Regional warming (T-2h to T-30m)</strong>: Warm high-traffic PoPs in each timezone. Start with regions where midnight arrives first (Pacific Islands -> Asia -> Europe -> Americas). Prioritize first 3 episodes (most will start there).
                                                                                                                                                                                        <br><br>
                                                                                                                                                                                            (3) <strong>Edge warming (T-30m)</strong>: Final push to all edge PoPs. Focus on first episode, first 10 minutes (initial segments). Use adaptive bitrate - warm all quality levels for first segments, only highest quality for later segments.
                                                                                                                                                                                            <br><br>
                                                                                                                                                                                                (4) <strong>Predictive pre-fetching (T-0 onwards)</strong>: As users start watching, proactively fetch next segments before they're requested. Analyze viewing patterns in real-time to predict drops/binge behavior.
                                                                                                                                                                                                <br><br>
                                                                                                                                                                                                    (5) <strong>Overflow handling</strong>: Have direct-to-origin fallback for cache misses. Pre-scale origin capacity. Implement request coalescing to prevent stampede.
                                                                                                                                                                                                    <br><br>
                                                                                                                                                                                                        (6) <strong>Monitoring</strong>: Real-time dashboard showing cache hit rate by region, buffer ratio, error rates. Automated alerts if hit rate drops below 95% in any major PoP.
                                                                                                                                                                                                      </div>
                                                                                                                                                                                                    </div>

                                                                                                                                                                                                    ---

                                                                                                                                                                                                    ## Edge Computing and Dynamic Content

                                                                                                                                                                                                    Modern CDNs extend beyond caching static content to running compute at the edge, enabling dynamic content generation closer to users.

                                                                                                                                                                                                    <div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
                                                                                                                                                                                                      <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">EDGE COMPUTING PLATFORMS</h3>
                                                                                                                                                                                                      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
                                                                                                                                                                                                        <div style="background: linear-gradient(135deg, #f97316 0%, #fb923c 100%); padding: 20px; border-radius: 12px;">
                                                                                                                                                                                                          <div style="color: white; font-weight: 700; margin-bottom: 8px;">Cloudflare Workers</div>
                                                                                                                                                                                                          <div style="color: #ffedd5; font-size: 13px;">V8 isolates, JavaScript/WASM, 200+ PoPs, 0ms cold start</div>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                        <div style="background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); padding: 20px; border-radius: 12px;">
                                                                                                                                                                                                          <div style="color: white; font-weight: 700; margin-bottom: 8px;">AWS Lambda@Edge</div>
                                                                                                                                                                                                          <div style="color: #fef3c7; font-size: 13px;">Node.js/Python, CloudFront integration, viewer/origin triggers</div>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                        <div style="background: linear-gradient(135deg, #84cc16 0%, #a3e635 100%); padding: 20px; border-radius: 12px;">
                                                                                                                                                                                                          <div style="color: white; font-weight: 700; margin-bottom: 8px;">Fastly Compute@Edge</div>
                                                                                                                                                                                                          <div style="color: #ecfccb; font-size: 13px;">WASM-based, Rust/Go/JS, VCL for routing</div>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                        <div style="background: linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%); padding: 20px; border-radius: 12px;">
                                                                                                                                                                                                          <div style="color: white; font-weight: 700; margin-bottom: 8px;">Vercel Edge Functions</div>
                                                                                                                                                                                                          <div style="color: #cffafe; font-size: 13px;">Built on Cloudflare, Next.js optimized, ISR support</div>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                      </div>
                                                                                                                                                                                                    </div>

                                                                                                                                                                                                    ### Edge-Side Includes (ESI)

                                                                                                                                                                                                    ```python
                                                                                                                                                                                                    class ESIProcessor:
                                                                                                                                                                                                    """
                                                                                                                                                                                                    Edge-Side Includes: Compose pages from cached fragments at the edge.

                                                                                                                                                                                                    Use case: Page with static shell + dynamic components
                                                                                                                                                                                                    - Header/footer: Cache 1 day
                                                                                                                                                                                                    - Product info: Cache 1 hour
                                                                                                                                                                                                    - User cart widget: Cache 0 (always fresh)
                                                                                                                                                                                                    - Recommendations: Cache 5 minutes
                                                                                                                                                                                                    """

                                                                                                                                                                                                    ESI_PATTERN = re.compile(
                                                                                                                                                                                                    r'<esi:include\s+src="([^"]+)"(?:\s+ttl="(\d+)")?(?:\s+onerror="([^"]+)")?\s*/?>',
                                                                                                                                                                                                      re.IGNORECASE
                                                                                                                                                                                                      )

                                                                                                                                                                                                      async def process_response(self, response: Response,
                                                                                                                                                                                                      request: Request) -> Response:
                                                                                                                                                                                                      """
                                                                                                                                                                                                      Process ESI tags in response, replacing with fragment content.
                                                                                                                                                                                                      """
                                                                                                                                                                                                      if 'text/html' not in response.headers.get('Content-Type', ''):
                                                                                                                                                                                                      return response

                                                                                                                                                                                                      content = response.content.decode('utf-8')

                                                                                                                                                                                                      if '<esi:' not in content:
                                                                                                                                                                                                      return response

                                                                                                                                                                                                      # Find all ESI includes
                                                                                                                                                                                                      includes = self.ESI_PATTERN.findall(content)

                                                                                                                                                                                                      if not includes:
                                                                                                                                                                                                      return response

                                                                                                                                                                                                      # Fetch all fragments in parallel
                                                                                                                                                                                                      fragments = await self._fetch_fragments(includes, request)

                                                                                                                                                                                                      # Replace ESI tags with fragment content
                                                                                                                                                                                                      for (src, ttl, onerror), fragment_content in fragments.items():
                                                                                                                                                                                                      tag = f'<esi:include src="{src}"'
                                                                                                                                                                                                      if ttl:
                                                                                                                                                                                                      tag += f' ttl="{ttl}"'
                                                                                                                                                                                                      if onerror:
                                                                                                                                                                                                      tag += f' onerror="{onerror}"'
                                                                                                                                                                                                      tag += '/>'

                                                                                                                                                                                                      content = content.replace(tag, fragment_content)

                                                                                                                                                                                                      # Recalculate cache TTL (minimum of all fragments)
                                                                                                                                                                                                      min_ttl = self._calculate_composite_ttl(fragments)

                                                                                                                                                                                                      new_response = Response(
                                                                                                                                                                                                      content=content.encode('utf-8'),
                                                                                                                                                                                                      headers={
                                                                                                                                                                                                      **response.headers,
                                                                                                                                                                                                      'Cache-Control': f'public, max-age={min_ttl}',
                                                                                                                                                                                                      'X-ESI-Fragments': str(len(fragments))
                                                                                                                                                                                                      }
                                                                                                                                                                                                      )

                                                                                                                                                                                                      return new_response

                                                                                                                                                                                                      async def _fetch_fragments(self, includes: List[tuple],
                                                                                                                                                                                                      original_request: Request) -> dict:
                                                                                                                                                                                                      """Fetch all ESI fragments in parallel."""
                                                                                                                                                                                                      async def fetch_one(src: str, ttl: str, onerror: str):
                                                                                                                                                                                                      try:
                                                                                                                                                                                                      # Check fragment cache
                                                                                                                                                                                                      cached = await self.fragment_cache.get(src)
                                                                                                                                                                                                      if cached:
                                                                                                                                                                                                      return (src, ttl, onerror), cached

                                                                                                                                                                                                      # Fetch fragment
                                                                                                                                                                                                      fragment_response = await self.http_client.get(
                                                                                                                                                                                                      src,
                                                                                                                                                                                                      headers={
                                                                                                                                                                                                      'Cookie': original_request.headers.get('Cookie', ''),
                                                                                                                                                                                                      'X-ESI-Fragment': 'true'
                                                                                                                                                                                                      }
                                                                                                                                                                                                      )

                                                                                                                                                                                                      content = fragment_response.content.decode('utf-8')

                                                                                                                                                                                                      # Cache fragment if cacheable
                                                                                                                                                                                                      if int(ttl or 0) > 0:
                                                                                                                                                                                                      await self.fragment_cache.set(src, content, ttl=int(ttl))

                                                                                                                                                                                                      return (src, ttl, onerror), content

                                                                                                                                                                                                      except Exception as e:
                                                                                                                                                                                                      if onerror == 'continue':
                                                                                                                                                                                                      return (src, ttl, onerror), ''  # Silent failure
                                                                                                                                                                                                      raise

                                                                                                                                                                                                      tasks = [fetch_one(src, ttl, onerror) for src, ttl, onerror in includes]
                                                                                                                                                                                                      results = await asyncio.gather(*tasks, return_exceptions=True)

                                                                                                                                                                                                      return dict(r for r in results if not isinstance(r, Exception))
                                                                                                                                                                                                      ```

                                                                                                                                                                                                      ### A/B Testing at the Edge

                                                                                                                                                                                                      ```python
                                                                                                                                                                                                      class EdgeABTesting:
                                                                                                                                                                                                      """
                                                                                                                                                                                                      Perform A/B testing at the edge for instant personalization.

                                                                                                                                                                                                      Benefits:
                                                                                                                                                                                                      - No round-trip to origin for variant selection
                                                                                                                                                                                                      - Consistent variant assignment (sticky sessions)
                                                                                                                                                                                                      - Cacheable variants (separate cache keys per variant)
                                                                                                                                                                                                      """

                                                                                                                                                                                                      def __init__(self, experiments_config: dict):
                                                                                                                                                                                                      self.experiments = experiments_config
                                                                                                                                                                                                      self.kv_store = EdgeKVStore()  # Distributed KV at edge

                                                                                                                                                                                                      async def assign_variant(self, request: Request,
                                                                                                                                                                                                      experiment_id: str) -> str:
                                                                                                                                                                                                      """
                                                                                                                                                                                                      Assign user to experiment variant.

                                                                                                                                                                                                      Assignment strategy:
                                                                                                                                                                                                      1. Check for existing assignment (sticky)
                                                                                                                                                                                                      2. Hash user ID for deterministic assignment
                                                                                                                                                                                                      3. Fall back to random assignment
                                                                                                                                                                                                      """
                                                                                                                                                                                                      experiment = self.experiments.get(experiment_id)
                                                                                                                                                                                                      if not experiment:
                                                                                                                                                                                                      return 'control'

                                                                                                                                                                                                      # Get user identifier
                                                                                                                                                                                                      user_id = self._get_user_id(request)

                                                                                                                                                                                                      # Check for existing assignment
                                                                                                                                                                                                      cache_key = f"ab:{experiment_id}:{user_id}"
                                                                                                                                                                                                      existing = await self.kv_store.get(cache_key)
                                                                                                                                                                                                      if existing:
                                                                                                                                                                                                      return existing

                                                                                                                                                                                                      # Deterministic assignment based on user ID hash
                                                                                                                                                                                                      hash_value = int(hashlib.md5(
                                                                                                                                                                                                      f"{experiment_id}:{user_id}".encode()
                                                                                                                                                                                                      ).hexdigest(), 16)

                                                                                                                                                                                                      # Assign based on traffic allocation
                                                                                                                                                                                                      position = hash_value % 100
                                                                                                                                                                                                      cumulative = 0

                                                                                                                                                                                                      for variant, allocation in experiment['variants'].items():
                                                                                                                                                                                                      cumulative += allocation
                                                                                                                                                                                                      if position < cumulative:
                                                                                                                                                                                                      # Store assignment for consistency
                                                                                                                                                                                                      await self.kv_store.set(
                                                                                                                                                                                                      cache_key,
                                                                                                                                                                                                      variant,
                                                                                                                                                                                                      ttl=experiment.get('duration_days', 30) * 86400
                                                                                                                                                                                                      )
                                                                                                                                                                                                      return variant

                                                                                                                                                                                                      return 'control'

                                                                                                                                                                                                      async def modify_request(self, request: Request,
                                                                                                                                                                                                      experiment_id: str) -> Request:
                                                                                                                                                                                                      """
                                                                                                                                                                                                      Modify request based on variant assignment.

                                                                                                                                                                                                      Common modifications:
                                                                                                                                                                                                      - Add variant header for origin
                                                                                                                                                                                                      - Rewrite URL to variant-specific path
                                                                                                                                                                                                      - Add cookie for client-side tracking
                                                                                                                                                                                                      """
                                                                                                                                                                                                      variant = await self.assign_variant(request, experiment_id)

                                                                                                                                                                                                      # Add variant to cache key (prevents serving wrong variant)
                                                                                                                                                                                                      request.headers['X-AB-Variant'] = variant

                                                                                                                                                                                                      # Option 1: Header-based (origin handles variant)
                                                                                                                                                                                                      request.headers['X-Experiment-Variant'] = f"{experiment_id}:{variant}"

                                                                                                                                                                                                      # Option 2: URL rewrite (separate cached versions)
                                                                                                                                                                                                      if self.experiments[experiment_id].get('url_rewrite'):
                                                                                                                                                                                                      original_path = request.path
                                                                                                                                                                                                      request.path = f"/{variant}{original_path}"

                                                                                                                                                                                                      return request

                                                                                                                                                                                                      def _get_user_id(self, request: Request) -> str:
                                                                                                                                                                                                      """Extract or generate user identifier."""
                                                                                                                                                                                                      # Priority: Logged-in user ID > Cookie > IP + UA hash

                                                                                                                                                                                                      if auth_header := request.headers.get('Authorization'):
                                                                                                                                                                                                      # Extract user ID from JWT
                                                                                                                                                                                                      return self._extract_user_from_jwt(auth_header)

                                                                                                                                                                                                      if visitor_cookie := request.cookies.get('visitor_id'):
                                                                                                                                                                                                      return visitor_cookie

                                                                                                                                                                                                      # Generate deterministic ID from request properties
                                                                                                                                                                                                      fingerprint = f"{request.client_ip}:{request.headers.get('User-Agent', '')}"
                                                                                                                                                                                                      return hashlib.sha256(fingerprint.encode()).hexdigest()[:16]
                                                                                                                                                                                                      ```

                                                                                                                                                                                                      ---

                                                                                                                                                                                                      ## Production Considerations

                                                                                                                                                                                                      ### Monitoring and Observability

                                                                                                                                                                                                      ```python
                                                                                                                                                                                                      class CDNMetrics:
                                                                                                                                                                                                      """
                                                                                                                                                                                                      Key metrics for CDN monitoring.
                                                                                                                                                                                                      """

                                                                                                                                                                                                      CRITICAL_METRICS = {
                                                                                                                                                                                                      'cache_hit_rate': {
                                                                                                                                                                                                      'description': 'Percentage of requests served from cache',
                                                                                                                                                                                                      'healthy_threshold': 0.85,
                                                                                                                                                                                                      'critical_threshold': 0.70,
                                                                                                                                                                                                      'aggregation': 'avg'
                                                                                                                                                                                                      },
                                                                                                                                                                                                      'origin_latency_p99': {
                                                                                                                                                                                                      'description': '99th percentile origin response time',
                                                                                                                                                                                                      'healthy_threshold': 500,  # ms
                                                                                                                                                                                                      'critical_threshold': 2000,
                                                                                                                                                                                                      'aggregation': 'percentile_99'
                                                                                                                                                                                                      },
                                                                                                                                                                                                      'edge_latency_p50': {
                                                                                                                                                                                                      'description': 'Median edge response time',
                                                                                                                                                                                                      'healthy_threshold': 50,  # ms
                                                                                                                                                                                                      'critical_threshold': 200,
                                                                                                                                                                                                      'aggregation': 'percentile_50'
                                                                                                                                                                                                      },
                                                                                                                                                                                                      'error_rate': {
                                                                                                                                                                                                      'description': '5xx error percentage',
                                                                                                                                                                                                      'healthy_threshold': 0.001,  # 0.1%
                                                                                                                                                                                                      'critical_threshold': 0.01,   # 1%
                                                                                                                                                                                                      'aggregation': 'avg'
                                                                                                                                                                                                      },
                                                                                                                                                                                                      'bandwidth_utilization': {
                                                                                                                                                                                                      'description': 'Edge server bandwidth usage',
                                                                                                                                                                                                      'healthy_threshold': 0.70,
                                                                                                                                                                                                      'critical_threshold': 0.90,
                                                                                                                                                                                                      'aggregation': 'max'
                                                                                                                                                                                                      },
                                                                                                                                                                                                      'purge_latency_p95': {
                                                                                                                                                                                                      'description': '95th percentile purge propagation time',
                                                                                                                                                                                                      'healthy_threshold': 5000,  # ms
                                                                                                                                                                                                      'critical_threshold': 30000,
                                                                                                                                                                                                      'aggregation': 'percentile_95'
                                                                                                                                                                                                      }
                                                                                                                                                                                                      }

                                                                                                                                                                                                      def create_dashboard(self) -> dict:
                                                                                                                                                                                                      """Generate dashboard configuration."""
                                                                                                                                                                                                      return {
                                                                                                                                                                                                      'panels': [
                                                                                                                                                                                                      {
                                                                                                                                                                                                      'title': 'Cache Hit Rate by PoP',
                                                                                                                                                                                                      'type': 'heatmap',
                                                                                                                                                                                                      'metric': 'cache_hit_rate',
                                                                                                                                                                                                      'dimensions': ['pop', 'content_type']
                                                                                                                                                                                                      },
                                                                                                                                                                                                      {
                                                                                                                                                                                                      'title': 'Latency Distribution',
                                                                                                                                                                                                      'type': 'histogram',
                                                                                                                                                                                                      'metrics': ['edge_latency', 'origin_latency'],
                                                                                                                                                                                                      'buckets': [10, 25, 50, 100, 250, 500, 1000, 2500]
                                                                                                                                                                                                      },
                                                                                                                                                                                                      {
                                                                                                                                                                                                      'title': 'Error Rate Timeline',
                                                                                                                                                                                                      'type': 'timeseries',
                                                                                                                                                                                                      'metric': 'error_rate',
                                                                                                                                                                                                      'dimensions': ['pop', 'status_code']
                                                                                                                                                                                                      },
                                                                                                                                                                                                      {
                                                                                                                                                                                                      'title': 'Origin Load',
                                                                                                                                                                                                      'type': 'gauge',
                                                                                                                                                                                                      'metrics': ['origin_rps', 'origin_bandwidth'],
                                                                                                                                                                                                      'thresholds': ['healthy', 'warning', 'critical']
                                                                                                                                                                                                      }
                                                                                                                                                                                                      ],
                                                                                                                                                                                                      'alerts': [
                                                                                                                                                                                                      {
                                                                                                                                                                                                      'name': 'Low Cache Hit Rate',
                                                                                                                                                                                                      'condition': 'cache_hit_rate < 0.70 for 5m',
                                                                                                                                                                                                      'severity': 'critical'
                                                                                                                                                                                                      },
                                                                                                                                                                                                      {
                                                                                                                                                                                                      'name': 'High Origin Latency',
                                                                                                                                                                                                      'condition': 'origin_latency_p99 > 2000 for 3m',
                                                                                                                                                                                                      'severity': 'warning'
                                                                                                                                                                                                      },
                                                                                                                                                                                                      {
                                                                                                                                                                                                      'name': 'Purge Propagation Slow',
                                                                                                                                                                                                      'condition': 'purge_latency_p95 > 30000',
                                                                                                                                                                                                      'severity': 'warning'
                                                                                                                                                                                                      }
                                                                                                                                                                                                      ]
                                                                                                                                                                                                      }
                                                                                                                                                                                                      ```

                                                                                                                                                                                                      ### Security Considerations

                                                                                                                                                                                                      <div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
                                                                                                                                                                                                        <div style="color: #dc2626; font-weight: 700; margin-bottom: 16px;">Security Checklist for CDN Configuration</div>
                                                                                                                                                                                                        <div style="color: #7f1d1d; font-size: 14px;">
                                                                                                                                                                                                          <strong>1. Origin Protection</strong><br>
                                                                                                                                                                                                            - Whitelist CDN IPs at origin firewall<br>
                                                                                                                                                                                                              - Use origin pull authentication headers<br>
                                                                                                                                                                                                                - Never expose origin IP publicly<br><br>

                                                                                                                                                                                                                    <strong>2. Cache Poisoning Prevention</strong><br>
                                                                                                                                                                                                                      - Validate Host header matches expected domains<br>
                                                                                                                                                                                                                        - Sanitize or exclude dangerous headers from cache key<br>
                                                                                                                                                                                                                          - Be careful with Vary headers (can cause key explosion)<br><br>

                                                                                                                                                                                                                              <strong>3. Sensitive Data Protection</strong><br>
                                                                                                                                                                                                                                - Never cache responses with Set-Cookie<br>
                                                                                                                                                                                                                                  - Use <code>Cache-Control: private</code> for user-specific data<br>
                                                                                                                                                                                                                                    - Audit cached content for PII regularly<br><br>

                                                                                                                                                                                                                                        <strong>4. DDoS Mitigation</strong><br>
                                                                                                                                                                                                                                          - Enable rate limiting at edge<br>
                                                                                                                                                                                                                                            - Configure challenge pages for suspicious traffic<br>
                                                                                                                                                                                                                                              - Use Anycast for traffic distribution
                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                          </div>

                                                                                                                                                                                                                                          ---

                                                                                                                                                                                                                                          ## Related Topics

                                                                                                                                                                                                                                          - [[Caching Strategies]](/topic/system-design/caching) - Detailed caching patterns and eviction policies
                                                                                                                                                                                                                                          - [[Load Balancing]](/topic/system-design/load-balancing) - Traffic distribution and health checking
                                                                                                                                                                                                                                          - [[DNS]](/topic/system-design/dns) - Domain resolution and geographic routing
                                                                                                                                                                                                                                          - [[Distributed Systems]](/topic/system-design/distributed-systems) - Consistency and partition tolerance
                                                                                                                                                                                                                                          - [[Rate Limiting]](/topic/system-design/rate-limiting) - Traffic control at the edge

                                                                                                                                                                                                                                          ---

                                                                                                                                                                                                                                          ## Summary

                                                                                                                                                                                                                                          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #86efac;">
                                                                                                                                                                                                                                            <h3 style="color: #166534; margin: 0 0 16px 0; font-size: 18px;">Key Takeaways for Interviews</h3>
                                                                                                                                                                                                                                            <div style="color: #15803d; font-size: 14px; line-height: 1.8;">
                                                                                                                                                                                                                                              <strong>1. Edge Caching</strong>: Cache key construction, admission policies, and storage tiers determine effectiveness. TinyLFU prevents pollution; multi-tier storage optimizes for different access patterns.<br><br>
                                                                                                                                                                                                                                                  <strong>2. Cache Invalidation</strong>: TTL for simple cases, versioned URLs for static assets, cache tags for complex relationships. Stale-while-revalidate provides best UX during updates.<br><br>
                                                                                                                                                                                                                                                      <strong>3. Origin Shield</strong>: Mid-tier cache that consolidates edge requests. Request coalescing prevents stampedes. Trade-off is added latency for cache misses.<br><br>
                                                                                                                                                                                                                                                          <strong>4. Geographic Routing</strong>: Anycast + GeoDNS with ECS. Performance-based routing beats pure geographic for optimal latency.<br><br>
                                                                                                                                                                                                                                                              <strong>5. Cache Warming</strong>: Proactive for deployments and events. Tiered approach balances coverage vs resource usage. Predictive warming based on traffic patterns.
                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                          </div>
