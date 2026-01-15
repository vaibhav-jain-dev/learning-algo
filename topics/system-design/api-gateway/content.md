# API Gateway

## Overview

An API Gateway is a server that acts as a single entry point for all client requests to backend services. It handles cross-cutting concerns like authentication, rate limiting, request routing, and protocol translation.

## Key Concepts

### Why API Gateway?

```
Without Gateway:
┌────────┐     ┌─────────────┐
│        │────→│User Service │
│        │     └─────────────┘
│ Client │     ┌─────────────┐
│        │────→│Order Service│
│        │     └─────────────┘
│        │     ┌─────────────┐
│        │────→│Product Svc  │
└────────┘     └─────────────┘

With Gateway:
┌────────┐     ┌──────────┐     ┌─────────────┐
│        │     │          │────→│User Service │
│ Client │────→│   API    │     └─────────────┘
│        │     │ Gateway  │────→│Order Service│
│        │     │          │     └─────────────┘
└────────┘     └──────────┘────→│Product Svc  │
                                └─────────────┘
```

### Core Functions

1. **Request Routing**: Route requests to appropriate services
2. **Authentication/Authorization**: Validate tokens, check permissions
3. **Rate Limiting**: Prevent abuse, ensure fair usage
4. **Load Balancing**: Distribute traffic across instances
5. **Caching**: Cache responses to reduce backend load
6. **Request/Response Transformation**: Modify headers, body
7. **Circuit Breaking**: Handle service failures gracefully
8. **Logging/Monitoring**: Centralized observability

## Gateway Patterns

### 1. Simple Reverse Proxy

```python
from flask import Flask, request
import requests

app = Flask(__name__)

SERVICES = {
    '/users': 'http://user-service:8080',
    '/orders': 'http://order-service:8080',
    '/products': 'http://product-service:8080'
}

@app.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy(path):
    # Find matching service
    for prefix, service_url in SERVICES.items():
        if f'/{path}'.startswith(prefix):
            target_url = f"{service_url}/{path}"

            # Forward request
            response = requests.request(
                method=request.method,
                url=target_url,
                headers={k: v for k, v in request.headers if k != 'Host'},
                data=request.get_data(),
                params=request.args
            )

            return response.content, response.status_code, response.headers.items()

    return {'error': 'Service not found'}, 404
```

### 2. Backend for Frontend (BFF)

Different gateways for different clients.

```
┌───────────┐     ┌─────────────┐
│ Mobile App│────→│ Mobile BFF  │───┐
└───────────┘     └─────────────┘   │     ┌──────────┐
                                    ├────→│ Services │
┌───────────┐     ┌─────────────┐   │     └──────────┘
│  Web App  │────→│   Web BFF   │───┘
└───────────┘     └─────────────┘
```

```python
# Mobile BFF - Optimized for mobile
class MobileBFF:
    def get_dashboard(self, user_id):
        # Aggregate data for mobile with minimal payload
        user = user_service.get_user(user_id)
        orders = order_service.get_recent(user_id, limit=5)

        return {
            'user': {'name': user['name'], 'avatar': user['avatar_small']},
            'recent_orders': [{'id': o['id'], 'total': o['total']} for o in orders]
        }

# Web BFF - Full data for desktop
class WebBFF:
    def get_dashboard(self, user_id):
        user = user_service.get_user(user_id)
        orders = order_service.get_all(user_id)
        recommendations = product_service.get_recommendations(user_id)

        return {
            'user': user,
            'orders': orders,
            'recommendations': recommendations
        }
```

### 3. Aggregation Gateway

Combine multiple service calls into single response.

```python
import asyncio
import aiohttp

class AggregationGateway:
    async def get_order_details(self, order_id):
        async with aiohttp.ClientSession() as session:
            # Parallel requests to multiple services
            order_task = self.fetch(session, f'/orders/{order_id}')

            order = await order_task

            # Get related data in parallel
            user_task = self.fetch(session, f'/users/{order["user_id"]}')
            products_task = self.fetch_products(session, order['items'])

            user, products = await asyncio.gather(user_task, products_task)

            # Aggregate response
            return {
                'order': order,
                'customer': {
                    'name': user['name'],
                    'email': user['email']
                },
                'products': products
            }

    async def fetch(self, session, path):
        async with session.get(f'http://internal{path}') as resp:
            return await resp.json()

    async def fetch_products(self, session, items):
        tasks = [self.fetch(session, f'/products/{item["product_id"]}') for item in items]
        return await asyncio.gather(*tasks)
```

## Implementation Features

### Authentication Middleware

```python
from functools import wraps
import jwt

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')

        if not token:
            return {'error': 'No token provided'}, 401

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            request.user = payload
        except jwt.ExpiredSignatureError:
            return {'error': 'Token expired'}, 401
        except jwt.InvalidTokenError:
            return {'error': 'Invalid token'}, 401

        return f(*args, **kwargs)
    return decorated

@app.route('/api/orders')
@require_auth
def get_orders():
    user_id = request.user['sub']
    return order_service.get_orders(user_id)
```

### Rate Limiting

```python
import time
from collections import defaultdict

class RateLimiter:
    def __init__(self, requests_per_minute=60):
        self.requests_per_minute = requests_per_minute
        self.requests = defaultdict(list)

    def is_allowed(self, client_id):
        now = time.time()
        minute_ago = now - 60

        # Clean old requests
        self.requests[client_id] = [
            t for t in self.requests[client_id] if t > minute_ago
        ]

        if len(self.requests[client_id]) >= self.requests_per_minute:
            return False

        self.requests[client_id].append(now)
        return True

rate_limiter = RateLimiter(requests_per_minute=100)

@app.before_request
def check_rate_limit():
    client_id = request.headers.get('X-API-Key') or request.remote_addr

    if not rate_limiter.is_allowed(client_id):
        return {'error': 'Rate limit exceeded'}, 429
```

### Request Transformation

```python
class RequestTransformer:
    def transform_request(self, request, route_config):
        # Add internal headers
        headers = dict(request.headers)
        headers['X-Request-ID'] = str(uuid.uuid4())
        headers['X-Forwarded-For'] = request.remote_addr

        # Transform body if needed
        body = request.get_json()
        if route_config.get('transform'):
            body = self.apply_transform(body, route_config['transform'])

        return headers, body

    def transform_response(self, response, route_config):
        # Remove internal headers
        headers = {k: v for k, v in response.headers.items()
                   if not k.startswith('X-Internal-')}

        # Transform response body
        body = response.json()
        if route_config.get('response_transform'):
            body = self.apply_transform(body, route_config['response_transform'])

        return headers, body
```

### Caching

```python
import hashlib
import redis

class ResponseCache:
    def __init__(self, redis_client):
        self.redis = redis_client

    def cache_key(self, request):
        key_parts = [
            request.method,
            request.path,
            str(sorted(request.args.items()))
        ]
        return hashlib.md5('|'.join(key_parts).encode()).hexdigest()

    def get(self, request):
        if request.method != 'GET':
            return None

        key = self.cache_key(request)
        cached = self.redis.get(f"cache:{key}")

        if cached:
            return json.loads(cached)
        return None

    def set(self, request, response, ttl=60):
        if request.method != 'GET':
            return

        key = self.cache_key(request)
        self.redis.setex(f"cache:{key}", ttl, json.dumps(response))

cache = ResponseCache(redis.Redis())

@app.route('/<path:path>')
def proxy(path):
    # Check cache first
    cached = cache.get(request)
    if cached:
        return cached

    # Forward request
    response = forward_request(path)

    # Cache response
    cache.set(request, response)

    return response
```

## Complete Implementation

### Go - Production API Gateway

```go
package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"sync"
	"time"

	"github.com/gorilla/mux"
	"golang.org/x/time/rate"
)

// Route configuration
type Route struct {
	Path        string
	ServiceURL  string
	Methods     []string
	RateLimit   int
	CacheTTL    time.Duration
	RequireAuth bool
}

// Rate limiter per client
type ClientRateLimiter struct {
	limiters map[string]*rate.Limiter
	mu       sync.RWMutex
	rate     rate.Limit
	burst    int
}

func NewClientRateLimiter(rps int) *ClientRateLimiter {
	return &ClientRateLimiter{
		limiters: make(map[string]*rate.Limiter),
		rate:     rate.Limit(rps),
		burst:    rps * 2,
	}
}

func (c *ClientRateLimiter) GetLimiter(clientID string) *rate.Limiter {
	c.mu.Lock()
	defer c.mu.Unlock()

	limiter, exists := c.limiters[clientID]
	if !exists {
		limiter = rate.NewLimiter(c.rate, c.burst)
		c.limiters[clientID] = limiter
	}

	return limiter
}

// Cache
type Cache struct {
	data map[string]CacheEntry
	mu   sync.RWMutex
}

type CacheEntry struct {
	Response  []byte
	Headers   http.Header
	ExpiresAt time.Time
}

func NewCache() *Cache {
	return &Cache{data: make(map[string]CacheEntry)}
}

func (c *Cache) Get(key string) (CacheEntry, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	entry, exists := c.data[key]
	if !exists || time.Now().After(entry.ExpiresAt) {
		return CacheEntry{}, false
	}
	return entry, true
}

func (c *Cache) Set(key string, entry CacheEntry) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.data[key] = entry
}

// API Gateway
type APIGateway struct {
	routes      []Route
	rateLimiter *ClientRateLimiter
	cache       *Cache
}

func NewAPIGateway(routes []Route) *APIGateway {
	return &APIGateway{
		routes:      routes,
		rateLimiter: NewClientRateLimiter(100),
		cache:       NewCache(),
	}
}

func (gw *APIGateway) findRoute(path string) *Route {
	for _, route := range gw.routes {
		if len(path) >= len(route.Path) && path[:len(route.Path)] == route.Path {
			return &route
		}
	}
	return nil
}

// Middleware: Logging
func (gw *APIGateway) loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("[%s] %s %s %v", r.Method, r.URL.Path, r.RemoteAddr, time.Since(start))
	})
}

// Middleware: Rate Limiting
func (gw *APIGateway) rateLimitMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		clientID := r.Header.Get("X-API-Key")
		if clientID == "" {
			clientID = r.RemoteAddr
		}

		limiter := gw.rateLimiter.GetLimiter(clientID)
		if !limiter.Allow() {
			http.Error(w, `{"error": "Rate limit exceeded"}`, http.StatusTooManyRequests)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// Middleware: Authentication
func (gw *APIGateway) authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		route := gw.findRoute(r.URL.Path)
		if route == nil || !route.RequireAuth {
			next.ServeHTTP(w, r)
			return
		}

		token := r.Header.Get("Authorization")
		if token == "" {
			http.Error(w, `{"error": "Unauthorized"}`, http.StatusUnauthorized)
			return
		}

		// Validate token (simplified)
		if !validateToken(token) {
			http.Error(w, `{"error": "Invalid token"}`, http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func validateToken(token string) bool {
	// Implement JWT validation
	return len(token) > 10
}

// Middleware: Caching
func (gw *APIGateway) cacheMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "GET" {
			next.ServeHTTP(w, r)
			return
		}

		cacheKey := r.URL.String()
		if entry, found := gw.cache.Get(cacheKey); found {
			for k, v := range entry.Headers {
				w.Header()[k] = v
			}
			w.Header().Set("X-Cache", "HIT")
			w.Write(entry.Response)
			return
		}

		// Capture response
		rec := &responseRecorder{ResponseWriter: w, body: []byte{}}
		next.ServeHTTP(rec, r)

		// Cache successful responses
		if rec.statusCode == http.StatusOK {
			route := gw.findRoute(r.URL.Path)
			ttl := time.Minute
			if route != nil && route.CacheTTL > 0 {
				ttl = route.CacheTTL
			}

			gw.cache.Set(cacheKey, CacheEntry{
				Response:  rec.body,
				Headers:   rec.Header(),
				ExpiresAt: time.Now().Add(ttl),
			})
		}
	})
}

type responseRecorder struct {
	http.ResponseWriter
	statusCode int
	body       []byte
}

func (r *responseRecorder) WriteHeader(code int) {
	r.statusCode = code
	r.ResponseWriter.WriteHeader(code)
}

func (r *responseRecorder) Write(b []byte) (int, error) {
	r.body = append(r.body, b...)
	return r.ResponseWriter.Write(b)
}

// Main handler
func (gw *APIGateway) proxyHandler(w http.ResponseWriter, r *http.Request) {
	route := gw.findRoute(r.URL.Path)
	if route == nil {
		http.Error(w, `{"error": "Not found"}`, http.StatusNotFound)
		return
	}

	targetURL, _ := url.Parse(route.ServiceURL)
	proxy := httputil.NewSingleHostReverseProxy(targetURL)

	// Add headers
	r.Header.Set("X-Request-ID", generateRequestID())
	r.Header.Set("X-Forwarded-For", r.RemoteAddr)

	proxy.ServeHTTP(w, r)
}

func generateRequestID() string {
	return time.Now().Format("20060102150405.000000")
}

// Health check
func healthHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]string{"status": "healthy"})
}

func main() {
	routes := []Route{
		{Path: "/users", ServiceURL: "http://user-service:8080", RequireAuth: true},
		{Path: "/orders", ServiceURL: "http://order-service:8080", RequireAuth: true},
		{Path: "/products", ServiceURL: "http://product-service:8080", CacheTTL: 5 * time.Minute},
		{Path: "/public", ServiceURL: "http://content-service:8080", CacheTTL: time.Hour},
	}

	gw := NewAPIGateway(routes)

	r := mux.NewRouter()
	r.HandleFunc("/health", healthHandler)
	r.PathPrefix("/").HandlerFunc(gw.proxyHandler)

	// Apply middleware chain
	handler := gw.loggingMiddleware(
		gw.rateLimitMiddleware(
			gw.authMiddleware(
				gw.cacheMiddleware(r),
			),
		),
	)

	srv := &http.Server{
		Addr:         ":8080",
		Handler:      handler,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
	}

	log.Println("API Gateway starting on :8080")
	log.Fatal(srv.ListenAndServe())
}
```

## Popular API Gateway Solutions

| Gateway | Type | Best For |
|---------|------|----------|
| **Kong** | Open Source | Full-featured, plugin ecosystem |
| **Nginx** | Open Source | High performance, simple routing |
| **AWS API Gateway** | Managed | AWS integration, serverless |
| **Envoy** | Open Source | Service mesh, gRPC support |
| **Traefik** | Open Source | Container-native, auto-discovery |
| **Azure API Management** | Managed | Azure ecosystem |

## Common Interview Questions

1. **How do you handle service discovery in API Gateway?**
   - DNS-based discovery
   - Service registry (Consul, etcd)
   - Kubernetes services

2. **How do you ensure high availability of the gateway?**
   - Multiple gateway instances
   - Load balancer in front
   - Health checks and auto-scaling

3. **How do you handle large file uploads through the gateway?**
   - Streaming (don't buffer entire file)
   - Direct upload to storage (presigned URLs)
   - Chunked uploads

4. **What's the difference between API Gateway and Service Mesh?**
   - Gateway: Edge proxy (north-south traffic)
   - Mesh: Service-to-service (east-west traffic)

## Best Practices

1. **Keep gateway stateless** - Scale horizontally
2. **Implement circuit breakers** - Handle downstream failures
3. **Use async for long operations** - Don't block on slow requests
4. **Centralize logging** - Correlation IDs across services
5. **Version your APIs** - Support multiple versions
6. **Monitor latency** - Gateway shouldn't add significant delay

## Related Topics

- [Microservices](/topic/system-design/microservices)
- [Load Balancing](/topic/system-design/load-balancing)
- [Rate Limiting](/topic/system-design/rate-limiting)
