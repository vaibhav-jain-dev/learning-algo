# Content Delivery Network (CDN)

## Overview

A Content Delivery Network (CDN) is a geographically distributed network of servers that caches content closer to end users. By serving content from nearby edge locations instead of a distant origin server, CDNs dramatically reduce latency, decrease bandwidth costs, and improve availability.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 20px; font-weight: 600;">HOW CDN IMPROVES PERFORMANCE</h3>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <div style="color: #dc2626; font-weight: 600; margin-bottom: 12px;">Without CDN:</div>
      <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: center;">
        <div style="background: #dbeafe; padding: 12px 20px; border-radius: 8px; border: 2px solid #3b82f6;">
          <div style="color: #1e40af; font-weight: 600;">User (Tokyo)</div>
        </div>
        <div style="flex: 1; min-width: 100px; max-width: 200px; text-align: center;">
          <div style="background: #fef2f2; height: 4px; border-radius: 2px;"></div>
          <div style="color: #dc2626; font-size: 12px; margin-top: 4px;">~200ms latency</div>
        </div>
        <div style="background: #f3e8ff; padding: 12px 20px; border-radius: 8px; border: 2px solid #a855f7;">
          <div style="color: #6b21a8; font-weight: 600;">Origin (New York)</div>
        </div>
      </div>
    </div>
    <div>
      <div style="color: #16a34a; font-weight: 600; margin-bottom: 12px;">With CDN:</div>
      <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: center;">
        <div style="background: #dbeafe; padding: 12px 20px; border-radius: 8px; border: 2px solid #3b82f6;">
          <div style="color: #1e40af; font-weight: 600;">User (Tokyo)</div>
        </div>
        <div style="text-align: center; min-width: 60px;">
          <div style="background: #dcfce7; height: 4px; border-radius: 2px;"></div>
          <div style="color: #16a34a; font-size: 12px; margin-top: 4px;">~20ms</div>
        </div>
        <div style="background: #dcfce7; padding: 12px 20px; border-radius: 8px; border: 2px solid #22c55e;">
          <div style="color: #166534; font-weight: 600;">Edge (Tokyo)</div>
        </div>
        <div style="text-align: center; min-width: 60px;">
          <div style="color: #64748b; font-size: 11px;">cache miss only</div>
        </div>
        <div style="background: #f1f5f9; padding: 12px 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <div style="color: #64748b; font-weight: 600;">Origin</div>
        </div>
      </div>
    </div>
  </div>
  <div style="background: #dcfce7; border-radius: 8px; padding: 12px 20px; margin-top: 20px; text-align: center;">
    <span style="color: #166534; font-weight: 600;">Result: 10x faster page loads for global users</span>
  </div>
</div>

**The Simple Explanation**: Think of a CDN like a chain of local warehouses for an online retailer. Instead of shipping every order from a central warehouse in New York, Amazon pre-stocks popular items at local fulfillment centers near customers. When you order, it ships from the nearest warehouse, arriving much faster.

---

## Why It Matters: Real Company Examples

Every major internet company relies on CDNs as critical infrastructure:

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">CDN IN PRODUCTION</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
    <div style="background: #fef2f2; border-radius: 12px; padding: 20px; border-left: 4px solid #ef4444;">
      <div style="color: #dc2626; font-weight: 700; margin-bottom: 8px;">Netflix</div>
      <div style="color: #7f1d1d; font-size: 13px;">Serves 15% of global internet traffic. Open Connect CDN caches video content at ISP locations to avoid network congestion.</div>
    </div>
    <div style="background: #eff6ff; border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6;">
      <div style="color: #1e40af; font-weight: 700; margin-bottom: 8px;">Shopify</div>
      <div style="color: #1d4ed8; font-size: 13px;">Uses Cloudflare to serve millions of storefronts. Fast page loads directly impact conversion rates - every 100ms delay costs 1% in sales.</div>
    </div>
    <div style="background: #ecfdf5; border-radius: 12px; padding: 20px; border-left: 4px solid #10b981;">
      <div style="color: #065f46; font-weight: 700; margin-bottom: 8px;">Airbnb</div>
      <div style="color: #047857; font-size: 13px;">CDN serves listing images globally. Image optimization at the edge reduces bandwidth by 40% while maintaining quality.</div>
    </div>
    <div style="background: #fef3c7; border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 700; margin-bottom: 8px;">GitHub</div>
      <div style="color: #b45309; font-size: 13px;">Fastly CDN delivers assets and provides DDoS protection. Instant cache purging enables rapid deployments.</div>
    </div>
  </div>
</div>

**Interview Insight**: CDN questions frequently appear in system design interviews. "How would you design a video streaming service?" or "How would you serve static assets for a global e-commerce site?" both require understanding CDN architecture.

---

## How It Works: CDN Architecture

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">CDN ARCHITECTURE</h3>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
    <div style="background: #f3e8ff; padding: 20px 40px; border-radius: 12px; border: 2px solid #a855f7; text-align: center;">
      <div style="color: #6b21a8; font-weight: 700; font-size: 16px;">Origin Server</div>
      <div style="color: #7c3aed; font-size: 12px;">Primary content source</div>
    </div>
    <div style="color: #64748b; font-size: 20px;">|</div>
    <div style="display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div style="background: #dcfce7; padding: 16px 24px; border-radius: 10px; border: 2px solid #22c55e; text-align: center;">
          <div style="color: #166534; font-weight: 600;">Edge PoP</div>
          <div style="color: #15803d; font-size: 12px;">North America</div>
        </div>
        <div style="color: #22c55e; font-size: 12px;">|</div>
        <div style="color: #64748b; font-size: 12px;">US Users</div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div style="background: #dcfce7; padding: 16px 24px; border-radius: 10px; border: 2px solid #22c55e; text-align: center;">
          <div style="color: #166534; font-weight: 600;">Edge PoP</div>
          <div style="color: #15803d; font-size: 12px;">Europe</div>
        </div>
        <div style="color: #22c55e; font-size: 12px;">|</div>
        <div style="color: #64748b; font-size: 12px;">EU Users</div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div style="background: #dcfce7; padding: 16px 24px; border-radius: 10px; border: 2px solid #22c55e; text-align: center;">
          <div style="color: #166534; font-weight: 600;">Edge PoP</div>
          <div style="color: #15803d; font-size: 12px;">Asia Pacific</div>
        </div>
        <div style="color: #22c55e; font-size: 12px;">|</div>
        <div style="color: #64748b; font-size: 12px;">APAC Users</div>
      </div>
    </div>
  </div>
  <div style="background: #f1f5f9; border-radius: 8px; padding: 12px 20px; margin-top: 20px; text-align: center;">
    <span style="color: #475569;">PoP = Point of Presence (edge data center with cache servers)</span>
  </div>
</div>

### Request Flow

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 16px; font-weight: 600;">CDN REQUEST LIFECYCLE</h3>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px; margin: 0 auto;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">1</div>
      <div style="flex: 1; background: #f1f5f9; padding: 12px 16px; border-radius: 8px;">
        <div style="color: #1e293b; font-weight: 600;">User requests cdn.example.com/image.jpg</div>
        <div style="color: #64748b; font-size: 12px;">DNS resolves to nearest edge server</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">2</div>
      <div style="flex: 1; background: #f1f5f9; padding: 12px 16px; border-radius: 8px;">
        <div style="color: #1e293b; font-weight: 600;">Edge server checks local cache</div>
        <div style="color: #64748b; font-size: 12px;">Cache HIT? Return immediately (fast!)</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">3</div>
      <div style="flex: 1; background: #f1f5f9; padding: 12px 16px; border-radius: 8px;">
        <div style="color: #1e293b; font-weight: 600;">Cache MISS: Fetch from origin</div>
        <div style="color: #64748b; font-size: 12px;">Store in cache for future requests</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #22c55e; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">4</div>
      <div style="flex: 1; background: #dcfce7; padding: 12px 16px; border-radius: 8px;">
        <div style="color: #166534; font-weight: 600;">Return content to user</div>
        <div style="color: #15803d; font-size: 12px;">Next request serves from cache</div>
      </div>
    </div>
  </div>
</div>

---

## Caching Strategies

### Pull CDN (Lazy Loading)

Content is fetched from origin on first request, then cached at the edge.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">PULL CDN</h3>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 500px; margin: 0 auto;">
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
      <span style="color: #1e293b; min-width: 100px;">First request:</span>
      <div style="flex: 1; display: flex; align-items: center; gap: 8px;">
        <span style="background: #dbeafe; padding: 4px 12px; border-radius: 4px; color: #1e40af; font-size: 13px;">User</span>
        <span style="color: #64748b;">-></span>
        <span style="background: #fef3c7; padding: 4px 12px; border-radius: 4px; color: #92400e; font-size: 13px;">Edge (MISS)</span>
        <span style="color: #64748b;">-></span>
        <span style="background: #f3e8ff; padding: 4px 12px; border-radius: 4px; color: #6b21a8; font-size: 13px;">Origin</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
      <span style="color: #1e293b; min-width: 100px;">Next requests:</span>
      <div style="flex: 1; display: flex; align-items: center; gap: 8px;">
        <span style="background: #dbeafe; padding: 4px 12px; border-radius: 4px; color: #1e40af; font-size: 13px;">User</span>
        <span style="color: #64748b;">-></span>
        <span style="background: #dcfce7; padding: 4px 12px; border-radius: 4px; color: #166534; font-size: 13px;">Edge (HIT)</span>
      </div>
    </div>
  </div>
  <div style="margin-top: 16px; display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
    <div style="color: #16a34a; font-size: 13px;">+ Simple setup</div>
    <div style="color: #16a34a; font-size: 13px;">+ Only caches popular content</div>
    <div style="color: #dc2626; font-size: 13px;">- First request is slow</div>
  </div>
</div>

**Best for**: Most websites, APIs, dynamic content with varying popularity

### Push CDN (Proactive Loading)

Origin proactively uploads content to edge servers before any requests.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">PUSH CDN</h3>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 500px; margin: 0 auto;">
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
      <span style="color: #1e293b; min-width: 100px;">Deploy time:</span>
      <div style="flex: 1; display: flex; align-items: center; gap: 8px;">
        <span style="background: #f3e8ff; padding: 4px 12px; border-radius: 4px; color: #6b21a8; font-size: 13px;">Origin</span>
        <span style="color: #64748b;">-> push -></span>
        <span style="background: #dcfce7; padding: 4px 12px; border-radius: 4px; color: #166534; font-size: 13px;">All Edges</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
      <span style="color: #1e293b; min-width: 100px;">All requests:</span>
      <div style="flex: 1; display: flex; align-items: center; gap: 8px;">
        <span style="background: #dbeafe; padding: 4px 12px; border-radius: 4px; color: #1e40af; font-size: 13px;">User</span>
        <span style="color: #64748b;">-></span>
        <span style="background: #dcfce7; padding: 4px 12px; border-radius: 4px; color: #166534; font-size: 13px;">Edge (HIT)</span>
      </div>
    </div>
  </div>
  <div style="margin-top: 16px; display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
    <div style="color: #16a34a; font-size: 13px;">+ Every request is fast</div>
    <div style="color: #16a34a; font-size: 13px;">+ Predictable latency</div>
    <div style="color: #dc2626; font-size: 13px;">- More storage needed</div>
    <div style="color: #dc2626; font-size: 13px;">- Complex deployment</div>
  </div>
</div>

**Best for**: Video streaming (Netflix), large file downloads, content you know will be popular

---

## Cache Control Headers

Understanding HTTP cache headers is essential for CDN configuration:

```http
# Cache publicly for 1 hour
Cache-Control: public, max-age=3600

# Cache for 1 day, CDN can cache longer than browser
Cache-Control: public, max-age=60, s-maxage=86400

# Private cache only (user-specific, not CDN)
Cache-Control: private, max-age=600

# No caching at all
Cache-Control: no-store

# Serve stale while revalidating in background
Cache-Control: public, max-age=60, stale-while-revalidate=300
```

<div style="background: #f8fafc; border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 20px 0; font-size: 16px; font-weight: 600;">CACHE HEADER CHEATSHEET</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
    <div style="background: #dcfce7; padding: 16px; border-radius: 8px;">
      <div style="color: #166534; font-weight: 600; margin-bottom: 8px;">public</div>
      <div style="color: #15803d; font-size: 13px;">CDN and browser can cache</div>
    </div>
    <div style="background: #fef3c7; padding: 16px; border-radius: 8px;">
      <div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">private</div>
      <div style="color: #b45309; font-size: 13px;">Only browser caches (user data)</div>
    </div>
    <div style="background: #dbeafe; padding: 16px; border-radius: 8px;">
      <div style="color: #1e40af; font-weight: 600; margin-bottom: 8px;">max-age</div>
      <div style="color: #1d4ed8; font-size: 13px;">Seconds until cache expires</div>
    </div>
    <div style="background: #f3e8ff; padding: 16px; border-radius: 8px;">
      <div style="color: #6b21a8; font-weight: 600; margin-bottom: 8px;">s-maxage</div>
      <div style="color: #7c3aed; font-size: 13px;">CDN-specific max-age</div>
    </div>
    <div style="background: #fef2f2; padding: 16px; border-radius: 8px;">
      <div style="color: #dc2626; font-weight: 600; margin-bottom: 8px;">no-store</div>
      <div style="color: #b91c1c; font-size: 13px;">Never cache this response</div>
    </div>
    <div style="background: #ecfdf5; padding: 16px; border-radius: 8px;">
      <div style="color: #065f46; font-weight: 600; margin-bottom: 8px;">stale-while-revalidate</div>
      <div style="color: #047857; font-size: 13px;">Serve stale, update in background</div>
    </div>
  </div>
</div>

---

## Cache Invalidation Strategies

Cache invalidation is famously one of the two hard problems in computer science. Here are the main approaches:

### 1. Time-Based Expiration (TTL)

```python
# Set TTL based on content type
def get_cache_ttl(content_type: str) -> int:
    ttl_map = {
        "static_assets": 31536000,  # 1 year (versioned files)
        "images": 86400,            # 1 day
        "api_responses": 300,       # 5 minutes
        "html_pages": 3600,         # 1 hour
    }
    return ttl_map.get(content_type, 3600)
```

### 2. Versioned URLs (Cache Busting)

```python
import hashlib

def get_versioned_url(file_path: str) -> str:
    """Include content hash in URL - no purging needed!"""
    with open(file_path, 'rb') as f:
        content_hash = hashlib.md5(f.read()).hexdigest()[:8]

    # /static/app.js -> /static/app.a1b2c3d4.js
    name, ext = file_path.rsplit('.', 1)
    return f"{name}.{content_hash}.{ext}"

# When file changes, URL changes -> new cache entry
# Old cached version naturally expires
```

### 3. Cache Tags (Surrogate Keys)

```python
class CDNClient:
    def serve_product_page(self, product_id: int):
        product = get_product(product_id)

        return Response(
            content=render_product(product),
            headers={
                "Cache-Control": "public, max-age=3600",
                "Cache-Tag": f"product-{product_id}, category-{product.category_id}"
            }
        )

    def on_product_update(self, product_id: int):
        """Purge all pages containing this product."""
        self.cdn_api.purge_tag(f"product-{product_id}")
```

---

## Code Examples

### Python - Edge Caching Logic

```python
import time
import hashlib
from dataclasses import dataclass
from typing import Optional, Dict
import requests

@dataclass
class CacheEntry:
    content: bytes
    content_type: str
    etag: str
    expires_at: float
    cache_tags: list

class EdgeServer:
    """Simulates CDN edge server behavior."""

    def __init__(self, origin_url: str):
        self.origin_url = origin_url
        self.cache: Dict[str, CacheEntry] = {}

    def handle_request(self, path: str, headers: dict) -> tuple:
        """Handle incoming request with caching logic."""
        cache_key = path

        # Check if we have a valid cached entry
        if cache_key in self.cache:
            entry = self.cache[cache_key]

            # Check expiration
            if time.time() < entry.expires_at:
                # Check ETag for conditional request
                if headers.get("If-None-Match") == entry.etag:
                    return 304, None, {"X-Cache": "HIT"}

                return 200, entry.content, {
                    "Content-Type": entry.content_type,
                    "ETag": entry.etag,
                    "X-Cache": "HIT",
                    "Cache-Control": f"max-age={int(entry.expires_at - time.time())}"
                }

        # Cache miss - fetch from origin
        response = requests.get(f"{self.origin_url}{path}")

        # Parse cache control
        ttl = self._parse_cache_control(response.headers.get("Cache-Control", ""))

        if ttl > 0:
            # Calculate ETag
            etag = hashlib.md5(response.content).hexdigest()

            # Store in cache
            self.cache[cache_key] = CacheEntry(
                content=response.content,
                content_type=response.headers.get("Content-Type", ""),
                etag=etag,
                expires_at=time.time() + ttl,
                cache_tags=self._parse_cache_tags(response.headers)
            )

        return response.status_code, response.content, {
            "Content-Type": response.headers.get("Content-Type", ""),
            "X-Cache": "MISS"
        }

    def _parse_cache_control(self, header: str) -> int:
        """Extract max-age from Cache-Control header."""
        if "no-store" in header or "private" in header:
            return 0

        for directive in header.split(","):
            directive = directive.strip()
            if directive.startswith("s-maxage="):
                return int(directive.split("=")[1])
            if directive.startswith("max-age="):
                return int(directive.split("=")[1])

        return 0

    def _parse_cache_tags(self, headers: dict) -> list:
        """Extract cache tags for invalidation."""
        tags = headers.get("Cache-Tag", "")
        return [t.strip() for t in tags.split(",") if t.strip()]

    def purge_by_tag(self, tag: str):
        """Invalidate all entries with given tag."""
        keys_to_remove = [
            key for key, entry in self.cache.items()
            if tag in entry.cache_tags
        ]
        for key in keys_to_remove:
            del self.cache[key]
        return len(keys_to_remove)

    def purge_by_path(self, path: str):
        """Invalidate specific path."""
        if path in self.cache:
            del self.cache[path]
            return True
        return False
```

### Go - CDN Edge Server

```go
package cdn

import (
    "crypto/md5"
    "encoding/hex"
    "io"
    "net/http"
    "strings"
    "sync"
    "time"
)

type CacheEntry struct {
    Content     []byte
    ContentType string
    ETag        string
    ExpiresAt   time.Time
    CacheTags   []string
}

type EdgeServer struct {
    cache     map[string]*CacheEntry
    mu        sync.RWMutex
    originURL string
    client    *http.Client
}

func NewEdgeServer(originURL string) *EdgeServer {
    return &EdgeServer{
        cache:     make(map[string]*CacheEntry),
        originURL: originURL,
        client: &http.Client{
            Timeout: 30 * time.Second,
        },
    }
}

func (e *EdgeServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    path := r.URL.Path

    // Check cache
    e.mu.RLock()
    entry, exists := e.cache[path]
    e.mu.RUnlock()

    if exists && time.Now().Before(entry.ExpiresAt) {
        // Cache HIT
        if r.Header.Get("If-None-Match") == entry.ETag {
            w.WriteHeader(http.StatusNotModified)
            return
        }

        w.Header().Set("Content-Type", entry.ContentType)
        w.Header().Set("ETag", entry.ETag)
        w.Header().Set("X-Cache", "HIT")
        w.Write(entry.Content)
        return
    }

    // Cache MISS - fetch from origin
    resp, err := e.client.Get(e.originURL + path)
    if err != nil {
        http.Error(w, "Origin unavailable", http.StatusBadGateway)
        return
    }
    defer resp.Body.Close()

    content, _ := io.ReadAll(resp.Body)

    // Calculate ETag
    hash := md5.Sum(content)
    etag := hex.EncodeToString(hash[:])

    // Parse TTL and cache if allowed
    ttl := e.parseTTL(resp.Header.Get("Cache-Control"))
    if ttl > 0 {
        e.mu.Lock()
        e.cache[path] = &CacheEntry{
            Content:     content,
            ContentType: resp.Header.Get("Content-Type"),
            ETag:        etag,
            ExpiresAt:   time.Now().Add(ttl),
            CacheTags:   e.parseCacheTags(resp.Header.Get("Cache-Tag")),
        }
        e.mu.Unlock()
    }

    w.Header().Set("Content-Type", resp.Header.Get("Content-Type"))
    w.Header().Set("ETag", etag)
    w.Header().Set("X-Cache", "MISS")
    w.Write(content)
}

func (e *EdgeServer) parseTTL(cacheControl string) time.Duration {
    if strings.Contains(cacheControl, "no-store") {
        return 0
    }
    if strings.Contains(cacheControl, "private") {
        return 0
    }

    // Parse s-maxage or max-age
    for _, directive := range strings.Split(cacheControl, ",") {
        directive = strings.TrimSpace(directive)
        if strings.HasPrefix(directive, "s-maxage=") {
            seconds := parseSeconds(directive[9:])
            return time.Duration(seconds) * time.Second
        }
        if strings.HasPrefix(directive, "max-age=") {
            seconds := parseSeconds(directive[8:])
            return time.Duration(seconds) * time.Second
        }
    }

    return time.Hour // Default
}

func (e *EdgeServer) PurgeByTag(tag string) int {
    e.mu.Lock()
    defer e.mu.Unlock()

    count := 0
    for key, entry := range e.cache {
        for _, t := range entry.CacheTags {
            if t == tag {
                delete(e.cache, key)
                count++
                break
            }
        }
    }
    return count
}
```

---

## Common Pitfalls

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">1. Caching User-Specific Content</div>
  <div style="color: #7f1d1d; font-size: 14px;">Never cache responses that contain user-specific data (profiles, shopping carts) without proper Vary headers. One user could see another user's data!</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">2. Forgetting Query String Variations</div>
  <div style="color: #7f1d1d; font-size: 14px;">/page.html and /page.html?utm_source=google are often cached separately. This can bloat cache and reduce hit rates. Configure which query params to include in cache key.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">3. Long TTL Without Versioning</div>
  <div style="color: #7f1d1d; font-size: 14px;">Setting max-age=31536000 (1 year) is great for performance but makes updates impossible unless you version URLs. Always use content hashes in filenames for static assets.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">4. Not Testing Cache Behavior</div>
  <div style="color: #7f1d1d; font-size: 14px;">Check X-Cache headers in responses. Many developers assume caching is working but never verify. A misconfigured Vary header can cause 0% cache hit rate.</div>
</div>

---

## Interview Questions

### Conceptual Questions

**Q1: What is the difference between Push and Pull CDN?**

A: Pull CDN fetches content from origin on first request (lazy loading). Push CDN requires you to upload content proactively before requests arrive. Pull is simpler but has cold cache penalty. Push guarantees fast first requests but requires more operational complexity.

**Q2: How do you handle cache invalidation for frequently updated content?**

A: Multiple strategies depending on use case:
- **Versioned URLs**: For static assets, include content hash in filename
- **Short TTL + stale-while-revalidate**: For API responses
- **Cache tags**: For content that changes when related data changes
- **Instant purge**: For critical updates (news sites, pricing)

**Q3: What happens when a CDN edge server goes down?**

A: Modern CDNs use Anycast routing - multiple edge servers share the same IP. DNS automatically routes to the next closest healthy server. Users experience momentary increase in latency but no downtime.

### Design Questions

**Q4: "Design a video streaming service like Netflix. How would you use CDN?"**

Key points:
- Use Push CDN to pre-position popular content at edges before premiere
- Implement adaptive bitrate streaming (HLS/DASH) with multiple quality levels cached
- Use regional origin shields to reduce load on main origin
- Implement predictive caching based on viewing patterns
- Consider putting CDN servers inside ISP networks (like Netflix Open Connect)

**Q5: "Your e-commerce site is slow for international users. How do you fix it?"**

Answer framework:
1. Add CDN for static assets (images, CSS, JS) - immediate win
2. Cache product catalog API responses at edge with short TTL
3. Use edge computing for personalization (A/B testing, geo-pricing)
4. Consider multi-region origin deployment for truly dynamic content
5. Implement connection pre-warming and HTTP/2 server push

---

## CDN Provider Comparison

| Provider | Strength | Best For | Notable Feature |
|----------|----------|----------|-----------------|
| **Cloudflare** | Security, Workers | General purpose | Free tier, DDoS protection |
| **AWS CloudFront** | AWS integration | AWS users | Lambda@Edge |
| **Fastly** | Instant purge | Real-time content | VCL customization |
| **Akamai** | Global reach | Enterprise, media | Largest network |
| **Bunny CDN** | Price | Cost-sensitive | Simple pricing |

---

## Related Topics

- [Caching Strategies](/topic/system-design/caching)
- [Load Balancing](/topic/system-design/load-balancing)
- [DNS](/topic/system-design/dns)
- [HTTP Protocol](/topic/system-design/http-protocol)
