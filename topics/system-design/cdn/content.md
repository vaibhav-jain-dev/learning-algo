# Content Delivery Network (CDN)

## Overview

A Content Delivery Network (CDN) is a geographically distributed network of proxy servers that cache content closer to end users. CDNs reduce latency, decrease origin server load, and improve availability for static and dynamic content.

## Key Concepts

### How CDN Works

```
Without CDN:
User (Tokyo) ──────────────────────────→ Origin (New York)
                    ~200ms latency

With CDN:
User (Tokyo) ───→ Edge (Tokyo) ───→ Origin (New York)
                    ~20ms           (only on cache miss)
```

### CDN Architecture

```
                    ┌─────────────────┐
                    │  Origin Server  │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
        ┌─────┴─────┐  ┌─────┴─────┐  ┌─────┴─────┐
        │ Edge PoP  │  │ Edge PoP  │  │ Edge PoP  │
        │  (USA)    │  │ (Europe)  │  │  (Asia)   │
        └─────┬─────┘  └─────┬─────┘  └─────┬─────┘
              │              │              │
         Users USA      Users EU       Users Asia
```

### CDN Benefits

1. **Reduced Latency**: Content served from nearby edge servers
2. **Decreased Bandwidth Costs**: Cache reduces origin traffic
3. **Increased Availability**: Distributed infrastructure handles failures
4. **DDoS Protection**: Edge absorbs attack traffic
5. **Improved SEO**: Faster sites rank better

## Caching Strategies

### Pull CDN

Edge servers fetch content from origin on demand.

```python
class PullCDN:
    def __init__(self, origin_url):
        self.origin_url = origin_url
        self.cache = {}

    def get(self, path):
        cache_key = path

        # Check cache
        if cache_key in self.cache:
            entry = self.cache[cache_key]
            if not entry.is_expired():
                return entry.content

        # Fetch from origin
        response = requests.get(f"{self.origin_url}{path}")

        # Cache response
        ttl = self.parse_cache_control(response.headers)
        self.cache[cache_key] = CacheEntry(
            content=response.content,
            expires_at=time.time() + ttl
        )

        return response.content

    def parse_cache_control(self, headers):
        cc = headers.get('Cache-Control', '')
        if 'max-age=' in cc:
            return int(cc.split('max-age=')[1].split(',')[0])
        return 3600  # Default 1 hour
```

### Push CDN

Origin proactively pushes content to edge servers.

```python
class PushCDN:
    def __init__(self, edge_servers):
        self.edge_servers = edge_servers

    def publish(self, path, content, ttl=3600):
        """Push content to all edge servers"""
        for edge in self.edge_servers:
            edge.store(path, content, ttl)

    def invalidate(self, path):
        """Remove content from all edges"""
        for edge in self.edge_servers:
            edge.delete(path)

    def purge_all(self):
        """Clear all cached content"""
        for edge in self.edge_servers:
            edge.clear()
```

## Cache Headers

### Cache-Control

```http
# Cache for 1 hour, allow CDN caching
Cache-Control: public, max-age=3600

# Cache for 1 day, but revalidate
Cache-Control: public, max-age=86400, must-revalidate

# Private cache only (browser, not CDN)
Cache-Control: private, max-age=600

# No caching at all
Cache-Control: no-store

# CDN can cache for longer than browser
Cache-Control: public, max-age=60, s-maxage=3600
```

### ETags for Validation

```python
import hashlib

class ContentServer:
    def serve(self, request, content):
        etag = hashlib.md5(content).hexdigest()

        # Check if client has current version
        if_none_match = request.headers.get('If-None-Match')
        if if_none_match == etag:
            return Response(status=304)  # Not Modified

        return Response(
            content=content,
            headers={
                'ETag': etag,
                'Cache-Control': 'public, max-age=3600'
            }
        )
```

## Cache Invalidation

### Purge by URL

```python
class CDNClient:
    def __init__(self, cdn_api_key):
        self.api_key = cdn_api_key
        self.api_url = "https://api.cdn.example.com"

    def purge_url(self, url):
        """Purge specific URL from cache"""
        response = requests.post(
            f"{self.api_url}/purge",
            headers={"Authorization": f"Bearer {self.api_key}"},
            json={"url": url}
        )
        return response.ok

    def purge_pattern(self, pattern):
        """Purge URLs matching pattern"""
        response = requests.post(
            f"{self.api_url}/purge",
            headers={"Authorization": f"Bearer {self.api_key}"},
            json={"pattern": pattern}  # e.g., "/images/*"
        )
        return response.ok

    def purge_tag(self, tag):
        """Purge all content with cache tag"""
        response = requests.post(
            f"{self.api_url}/purge",
            headers={"Authorization": f"Bearer {self.api_key}"},
            json={"tag": tag}  # e.g., "product-123"
        )
        return response.ok
```

### Cache Tags

```python
# When serving content, add cache tags
def serve_product_page(product_id):
    product = get_product(product_id)
    category = get_category(product.category_id)

    return Response(
        content=render_template('product.html', product=product),
        headers={
            'Cache-Control': 'public, max-age=3600',
            'Cache-Tag': f'product-{product_id}, category-{category.id}'
        }
    )

# When product is updated, purge by tag
def update_product(product_id, data):
    save_product(product_id, data)
    cdn.purge_tag(f'product-{product_id}')
```

### Versioned URLs

```python
# Include version in URL - no purging needed
def get_asset_url(path):
    version = get_file_hash(path)[:8]
    return f"/static/{path}?v={version}"

# Or use content hash in filename
def get_asset_url(path):
    content = read_file(path)
    hash = hashlib.md5(content).hexdigest()[:8]
    name, ext = os.path.splitext(path)
    return f"/static/{name}.{hash}{ext}"
```

## Edge Computing

### Edge Functions

```javascript
// Cloudflare Worker example
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // A/B testing at edge
  const variant = request.headers.get('Cookie')?.includes('variant=b') ? 'b' : 'a'
  url.pathname = `/variants/${variant}${url.pathname}`

  // Fetch from origin with modified URL
  const response = await fetch(url.toString())

  // Modify response headers
  const newResponse = new Response(response.body, response)
  newResponse.headers.set('X-Variant', variant)

  return newResponse
}
```

### Dynamic Content at Edge

```javascript
// Personalization at edge
async function handleRequest(request) {
  const country = request.headers.get('CF-IPCountry')
  const cache = caches.default

  // Try country-specific cache
  const cacheKey = `${request.url}:${country}`
  let response = await cache.match(cacheKey)

  if (!response) {
    // Fetch and customize for country
    response = await fetch(request)
    const html = await response.text()

    const customized = html.replace(
      '{{currency}}',
      getCurrency(country)
    )

    response = new Response(customized, response)
    response.headers.set('Cache-Control', 'public, max-age=3600')

    await cache.put(cacheKey, response.clone())
  }

  return response
}
```

## Implementation Example

### Go - CDN Edge Server

```go
package main

import (
	"crypto/md5"
	"encoding/hex"
	"io"
	"net/http"
	"sync"
	"time"
)

type CacheEntry struct {
	Content     []byte
	ContentType string
	ETag        string
	ExpiresAt   time.Time
}

type EdgeServer struct {
	cache     map[string]*CacheEntry
	mu        sync.RWMutex
	originURL string
}

func NewEdgeServer(originURL string) *EdgeServer {
	edge := &EdgeServer{
		cache:     make(map[string]*CacheEntry),
		originURL: originURL,
	}

	// Background cleanup
	go edge.cleanup()

	return edge
}

func (e *EdgeServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	// Check cache
	e.mu.RLock()
	entry, exists := e.cache[path]
	e.mu.RUnlock()

	if exists && time.Now().Before(entry.ExpiresAt) {
		// Check If-None-Match for 304
		if r.Header.Get("If-None-Match") == entry.ETag {
			w.WriteHeader(http.StatusNotModified)
			return
		}

		w.Header().Set("Content-Type", entry.ContentType)
		w.Header().Set("ETag", entry.ETag)
		w.Header().Set("X-Cache", "HIT")
		w.Header().Set("Cache-Control", "public, max-age=3600")
		w.Write(entry.Content)
		return
	}

	// Fetch from origin
	resp, err := http.Get(e.originURL + path)
	if err != nil {
		http.Error(w, "Origin unavailable", http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	content, _ := io.ReadAll(resp.Body)

	// Calculate ETag
	hash := md5.Sum(content)
	etag := hex.EncodeToString(hash[:])

	// Parse Cache-Control
	ttl := e.parseTTL(resp.Header.Get("Cache-Control"))

	// Store in cache
	e.mu.Lock()
	e.cache[path] = &CacheEntry{
		Content:     content,
		ContentType: resp.Header.Get("Content-Type"),
		ETag:        etag,
		ExpiresAt:   time.Now().Add(ttl),
	}
	e.mu.Unlock()

	// Serve response
	w.Header().Set("Content-Type", resp.Header.Get("Content-Type"))
	w.Header().Set("ETag", etag)
	w.Header().Set("X-Cache", "MISS")
	w.Header().Set("Cache-Control", resp.Header.Get("Cache-Control"))
	w.Write(content)
}

func (e *EdgeServer) parseTTL(cacheControl string) time.Duration {
	// Simplified parsing
	return time.Hour // Default 1 hour
}

func (e *EdgeServer) cleanup() {
	ticker := time.NewTicker(5 * time.Minute)
	for range ticker.C {
		e.mu.Lock()
		now := time.Now()
		for key, entry := range e.cache {
			if now.After(entry.ExpiresAt) {
				delete(e.cache, key)
			}
		}
		e.mu.Unlock()
	}
}

func (e *EdgeServer) Purge(path string) {
	e.mu.Lock()
	delete(e.cache, path)
	e.mu.Unlock()
}

func main() {
	edge := NewEdgeServer("https://origin.example.com")

	// Purge endpoint
	http.HandleFunc("/cdn-purge/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		path := r.URL.Path[len("/cdn-purge"):]
		edge.Purge(path)
		w.WriteHeader(http.StatusOK)
	})

	// Serve content
	http.Handle("/", edge)

	http.ListenAndServe(":8080", nil)
}
```

### Python - CDN Configuration Manager

```python
from dataclasses import dataclass
from typing import Dict, List, Optional
import re

@dataclass
class CacheRule:
    pattern: str
    ttl: int  # seconds
    cache_key_include: List[str] = None  # query params to include in cache key
    cache_key_exclude: List[str] = None
    headers_to_cache: List[str] = None

class CDNConfiguration:
    def __init__(self):
        self.rules: List[CacheRule] = []
        self.default_ttl = 3600
        self.origin_url = ""
        self.custom_headers: Dict[str, str] = {}

    def add_rule(self, rule: CacheRule):
        self.rules.append(rule)

    def get_cache_config(self, path: str, query_params: Dict[str, str]) -> dict:
        for rule in self.rules:
            if re.match(rule.pattern, path):
                cache_key = self._build_cache_key(path, query_params, rule)
                return {
                    'ttl': rule.ttl,
                    'cache_key': cache_key,
                    'headers': rule.headers_to_cache or []
                }

        return {
            'ttl': self.default_ttl,
            'cache_key': path,
            'headers': []
        }

    def _build_cache_key(self, path: str, params: Dict, rule: CacheRule) -> str:
        cache_key = path

        if rule.cache_key_include:
            relevant_params = {k: v for k, v in params.items() if k in rule.cache_key_include}
        elif rule.cache_key_exclude:
            relevant_params = {k: v for k, v in params.items() if k not in rule.cache_key_exclude}
        else:
            relevant_params = {}

        if relevant_params:
            sorted_params = sorted(relevant_params.items())
            cache_key += '?' + '&'.join(f'{k}={v}' for k, v in sorted_params)

        return cache_key


# Usage
config = CDNConfiguration()
config.origin_url = "https://origin.example.com"

# Static assets - long cache
config.add_rule(CacheRule(
    pattern=r'^/static/.*\.(js|css|png|jpg)$',
    ttl=31536000,  # 1 year
))

# API responses - short cache, vary by auth
config.add_rule(CacheRule(
    pattern=r'^/api/products.*$',
    ttl=300,  # 5 minutes
    cache_key_include=['category', 'sort'],
    headers_to_cache=['Authorization']
))

# HTML pages - medium cache
config.add_rule(CacheRule(
    pattern=r'^/.*\.html$',
    ttl=3600,
    cache_key_exclude=['utm_source', 'utm_medium']
))

# Get config for request
cache_config = config.get_cache_config(
    '/api/products',
    {'category': 'electronics', 'page': '1', 'utm_source': 'google'}
)
print(cache_config)
# {'ttl': 300, 'cache_key': '/api/products?category=electronics', 'headers': ['Authorization']}
```

## Popular CDN Providers

| Provider | Best For | Notable Features |
|----------|----------|------------------|
| **Cloudflare** | General use, security | Edge computing, DDoS protection |
| **AWS CloudFront** | AWS integration | Lambda@Edge, S3 origin |
| **Akamai** | Enterprise, media | Largest network, video streaming |
| **Fastly** | Real-time purging | Instant purge, VCL customization |
| **Google Cloud CDN** | GCP integration | Global load balancing |

## Common Interview Questions

1. **How do you handle cache invalidation for dynamic content?**
   - Short TTLs with stale-while-revalidate
   - Cache tags for group invalidation
   - Versioned URLs for assets

2. **How does a CDN handle origin server failure?**
   - Serve stale content (stale-if-error)
   - Failover to secondary origin
   - Edge caching extends availability

3. **How do you decide what to cache at the edge?**
   - Static assets: Always cache
   - Dynamic public content: Short TTL
   - Personalized content: Don't cache or use edge computing

4. **How do you handle regional content differences?**
   - Vary header by country
   - Separate cache keys per region
   - Edge functions for customization

## Best Practices

1. **Set appropriate cache headers** - Be explicit about cacheability
2. **Use versioned assets** - Avoid purging for static files
3. **Implement cache tags** - Simplify invalidation logic
4. **Monitor cache hit rates** - Target 90%+ for static content
5. **Use stale-while-revalidate** - Better performance during updates
6. **Compress at edge** - Gzip/Brotli for text content

## Related Topics

- [Caching](/topic/system-design/caching)
- [Load Balancing](/topic/system-design/load-balancing)
- [API Gateway](/topic/system-design/api-gateway)
