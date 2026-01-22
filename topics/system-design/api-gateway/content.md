# API Gateway

## Overview

An API Gateway is a single entry point that sits between clients and backend services. Think of it as a smart receptionist in a large office building - instead of visitors wandering around trying to find different departments, they check in at one desk that directs them appropriately, handles security, and ensures they follow the rules.

In simple terms: **API Gateway = Router + Bouncer + Translator + Observer**

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">What API Gateway Does</h4>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
    <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <strong style="color: #1e293b;">Request Routing</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Directs traffic to the right service based on path, headers, or content</p>
    </div>
    <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981;">
      <strong style="color: #1e293b;">Authentication</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Validates tokens, API keys, and user credentials before forwarding</p>
    </div>
    <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <strong style="color: #1e293b;">Rate Limiting</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Protects services from abuse and ensures fair usage</p>
    </div>
    <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
      <strong style="color: #1e293b;">Observability</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Centralized logging, metrics, and tracing for all API traffic</p>
    </div>
  </div>
</div>

---

## Why This Matters

### Real Company Examples

**Netflix** processes over 2 billion API requests daily through their Zuul gateway. Without it, their mobile apps would need to know the addresses of hundreds of microservices and handle authentication logic themselves.

**Amazon** uses API Gateway to expose their internal services to third-party sellers. The gateway handles authentication, throttling, and transforms internal data formats to public API contracts.

**Uber** routes millions of ride requests through their API Gateway, which decides whether to send traffic to their pricing service, matching service, or payment service based on the request type.

**Stripe** uses API Gateway to version their APIs, allowing them to maintain backward compatibility while evolving their internal systems.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Without vs With API Gateway</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div>
      <div style="color: #dc2626; font-weight: 600; margin-bottom: 12px;">Without Gateway</div>
      <div style="background: #fef2f2; padding: 16px; border-radius: 8px; border: 1px solid #fecaca;">
        <ul style="color: #1e293b; margin: 0; padding-left: 20px; font-size: 14px;">
          <li>Client must know all service URLs</li>
          <li>Auth logic duplicated everywhere</li>
          <li>No centralized rate limiting</li>
          <li>Hard to change service topology</li>
          <li>CORS handled per service</li>
        </ul>
      </div>
    </div>
    <div>
      <div style="color: #16a34a; font-weight: 600; margin-bottom: 12px;">With Gateway</div>
      <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; border: 1px solid #bbf7d0;">
        <ul style="color: #1e293b; margin: 0; padding-left: 20px; font-size: 14px;">
          <li>Single URL for all APIs</li>
          <li>Centralized authentication</li>
          <li>Unified rate limiting</li>
          <li>Services can move freely</li>
          <li>CORS handled once</li>
        </ul>
      </div>
    </div>
  </div>
</div>

---

## How It Works

### Request Flow Through API Gateway

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Step-by-Step Request Processing</h4>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>
      <div style="flex: 1; background: #eff6ff; padding: 12px 16px; border-radius: 8px;">
        <strong style="color: #1e293b;">Request Arrives</strong>
        <span style="color: #475569; font-size: 14px;"> - Client sends HTTPS request to gateway endpoint</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>
      <div style="flex: 1; background: #eff6ff; padding: 12px 16px; border-radius: 8px;">
        <strong style="color: #1e293b;">Authentication</strong>
        <span style="color: #475569; font-size: 14px;"> - Gateway validates JWT token or API key</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</div>
      <div style="flex: 1; background: #eff6ff; padding: 12px 16px; border-radius: 8px;">
        <strong style="color: #1e293b;">Rate Limiting</strong>
        <span style="color: #475569; font-size: 14px;"> - Check if client has exceeded their quota</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</div>
      <div style="flex: 1; background: #eff6ff; padding: 12px 16px; border-radius: 8px;">
        <strong style="color: #1e293b;">Request Routing</strong>
        <span style="color: #475569; font-size: 14px;"> - Match path/method to backend service</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">5</div>
      <div style="flex: 1; background: #eff6ff; padding: 12px 16px; border-radius: 8px;">
        <strong style="color: #1e293b;">Request Transform</strong>
        <span style="color: #475569; font-size: 14px;"> - Add headers, modify body, translate protocols</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">6</div>
      <div style="flex: 1; background: #eff6ff; padding: 12px 16px; border-radius: 8px;">
        <strong style="color: #1e293b;">Forward to Service</strong>
        <span style="color: #475569; font-size: 14px;"> - Send request to backend (with circuit breaker)</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">7</div>
      <div style="flex: 1; background: #eff6ff; padding: 12px 16px; border-radius: 8px;">
        <strong style="color: #1e293b;">Response Transform</strong>
        <span style="color: #475569; font-size: 14px;"> - Modify response, add CORS headers</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">8</div>
      <div style="flex: 1; background: #eff6ff; padding: 12px 16px; border-radius: 8px;">
        <strong style="color: #1e293b;">Log & Return</strong>
        <span style="color: #475569; font-size: 14px;"> - Record metrics and send response to client</span>
      </div>
    </div>
  </div>
</div>

### Gateway Patterns

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Common Gateway Patterns</h4>
  <div style="display: grid; gap: 16px;">
    <div style="background: #f1f5f9; padding: 16px; border-radius: 8px;">
      <strong style="color: #1e293b;">Backend for Frontend (BFF)</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Separate gateways for mobile, web, and third-party APIs. Each gateway is optimized for its client type.</p>
    </div>
    <div style="background: #f1f5f9; padding: 16px; border-radius: 8px;">
      <strong style="color: #1e293b;">Aggregation Gateway</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Combines multiple service calls into a single response. Reduces client round trips.</p>
    </div>
    <div style="background: #f1f5f9; padding: 16px; border-radius: 8px;">
      <strong style="color: #1e293b;">Edge Gateway</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Deployed at CDN edge locations for geographic distribution and reduced latency.</p>
    </div>
  </div>
</div>

---

## Real-Life Failure Story

### The Netflix Zuul Outage (2015)

**What Happened:** Netflix's API Gateway (Zuul) became the single point of failure when a memory leak caused cascading failures across all services.

**The Timeline:**
1. A code change introduced a memory leak in the request logging module
2. Gateway instances started running out of heap memory
3. Garbage collection pauses caused request timeouts
4. Health checks failed, causing instances to be killed
5. New instances launched but immediately hit the same memory issue
6. All streaming traffic was affected for 45 minutes

**Root Cause:** The logging middleware was storing entire request bodies in memory for debugging, without size limits.

**How They Fixed It:**
1. **Immediate:** Rolled back the logging change
2. **Short-term:** Added memory limits and circuit breakers in the gateway
3. **Long-term:** Implemented "chaos engineering" to regularly test gateway failures

**Key Lesson:** The gateway must be the most reliable component. If it goes down, everything goes down.

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #92400e; margin-top: 0;">Warning Signs They Missed</h4>
  <ul style="color: #78350f; margin: 0; padding-left: 20px;">
    <li>Memory usage trending upward over days</li>
    <li>GC pause times increasing gradually</li>
    <li>Request latency P99 creeping higher</li>
    <li>No load testing with production-size payloads</li>
  </ul>
</div>

---

## Implementation

### Python - Production API Gateway

```python
import asyncio
import aiohttp
import time
import hashlib
import jwt
from dataclasses import dataclass
from typing import Dict, Optional, List, Callable
from collections import defaultdict
from functools import wraps
import logging

logger = logging.getLogger(__name__)


@dataclass
class Route:
    """Route configuration for API Gateway."""
    path_prefix: str
    service_url: str
    methods: List[str]
    require_auth: bool = True
    rate_limit: int = 100  # requests per minute
    timeout: float = 30.0
    cache_ttl: int = 0  # seconds, 0 = no cache


@dataclass
class RateLimitInfo:
    """Rate limit tracking info."""
    count: int
    window_start: float


class TokenBucketRateLimiter:
    """Token bucket rate limiter with Redis-like interface."""

    def __init__(self, rate: int, capacity: int):
        self.rate = rate  # tokens per second
        self.capacity = capacity
        self.buckets: Dict[str, tuple] = {}  # key -> (tokens, last_update)

    def is_allowed(self, key: str) -> tuple[bool, int]:
        """Check if request is allowed. Returns (allowed, remaining)."""
        now = time.time()

        if key not in self.buckets:
            self.buckets[key] = (self.capacity - 1, now)
            return True, self.capacity - 1

        tokens, last_update = self.buckets[key]
        elapsed = now - last_update

        # Add tokens based on elapsed time
        tokens = min(self.capacity, tokens + elapsed * self.rate)

        if tokens >= 1:
            self.buckets[key] = (tokens - 1, now)
            return True, int(tokens - 1)

        self.buckets[key] = (tokens, now)
        return False, 0


class CircuitBreaker:
    """Circuit breaker for backend services."""

    def __init__(self, failure_threshold: int = 5,
                 recovery_timeout: float = 30.0):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failures: Dict[str, int] = defaultdict(int)
        self.last_failure_time: Dict[str, float] = {}
        self.state: Dict[str, str] = defaultdict(lambda: "closed")

    def is_open(self, service: str) -> bool:
        """Check if circuit is open (blocking requests)."""
        if self.state[service] == "closed":
            return False

        if self.state[service] == "open":
            # Check if recovery timeout has passed
            if time.time() - self.last_failure_time[service] > self.recovery_timeout:
                self.state[service] = "half-open"
                return False
            return True

        return False  # half-open allows one request

    def record_success(self, service: str):
        """Record successful request."""
        self.failures[service] = 0
        self.state[service] = "closed"

    def record_failure(self, service: str):
        """Record failed request."""
        self.failures[service] += 1
        self.last_failure_time[service] = time.time()

        if self.failures[service] >= self.failure_threshold:
            self.state[service] = "open"
            logger.warning(f"Circuit opened for service: {service}")


class ResponseCache:
    """Simple in-memory response cache."""

    def __init__(self):
        self.cache: Dict[str, tuple] = {}  # key -> (response, expiry)

    def get(self, key: str) -> Optional[dict]:
        """Get cached response if not expired."""
        if key in self.cache:
            response, expiry = self.cache[key]
            if time.time() < expiry:
                return response
            del self.cache[key]
        return None

    def set(self, key: str, response: dict, ttl: int):
        """Cache response with TTL."""
        if ttl > 0:
            self.cache[key] = (response, time.time() + ttl)

    def make_key(self, method: str, path: str, query: str) -> str:
        """Generate cache key."""
        return hashlib.md5(f"{method}:{path}:{query}".encode()).hexdigest()


class APIGateway:
    """Production-ready API Gateway implementation."""

    def __init__(self, routes: List[Route], jwt_secret: str):
        self.routes = routes
        self.jwt_secret = jwt_secret
        self.rate_limiters: Dict[str, TokenBucketRateLimiter] = {}
        self.circuit_breaker = CircuitBreaker()
        self.cache = ResponseCache()
        self.metrics = defaultdict(int)

        # Initialize rate limiters for each route
        for route in routes:
            rate_per_second = route.rate_limit / 60
            self.rate_limiters[route.path_prefix] = TokenBucketRateLimiter(
                rate=rate_per_second,
                capacity=route.rate_limit
            )

    def find_route(self, path: str) -> Optional[Route]:
        """Find matching route for path."""
        for route in self.routes:
            if path.startswith(route.path_prefix):
                return route
        return None

    def authenticate(self, auth_header: Optional[str]) -> Optional[dict]:
        """Validate JWT token and return user claims."""
        if not auth_header or not auth_header.startswith("Bearer "):
            return None

        token = auth_header[7:]  # Remove "Bearer " prefix

        try:
            payload = jwt.decode(token, self.jwt_secret, algorithms=["HS256"])
            return payload
        except jwt.ExpiredSignatureError:
            logger.warning("Expired token received")
            return None
        except jwt.InvalidTokenError as e:
            logger.warning(f"Invalid token: {e}")
            return None

    def check_rate_limit(self, route: Route, client_id: str) -> tuple[bool, int]:
        """Check if request passes rate limit."""
        key = f"{client_id}:{route.path_prefix}"
        limiter = self.rate_limiters[route.path_prefix]
        return limiter.is_allowed(key)

    async def forward_request(
        self,
        route: Route,
        method: str,
        path: str,
        headers: dict,
        body: Optional[bytes],
        query_string: str
    ) -> dict:
        """Forward request to backend service."""

        # Check circuit breaker
        if self.circuit_breaker.is_open(route.service_url):
            self.metrics["circuit_breaker_rejections"] += 1
            return {
                "status": 503,
                "body": {"error": "Service temporarily unavailable"},
                "headers": {}
            }

        # Build target URL
        backend_path = path[len(route.path_prefix):]
        target_url = f"{route.service_url}{backend_path}"
        if query_string:
            target_url += f"?{query_string}"

        # Prepare headers (remove hop-by-hop headers)
        forward_headers = {
            k: v for k, v in headers.items()
            if k.lower() not in ["host", "connection", "keep-alive"]
        }
        forward_headers["X-Request-ID"] = str(time.time_ns())
        forward_headers["X-Forwarded-For"] = headers.get("X-Real-IP", "unknown")

        try:
            async with aiohttp.ClientSession() as session:
                async with session.request(
                    method=method,
                    url=target_url,
                    headers=forward_headers,
                    data=body,
                    timeout=aiohttp.ClientTimeout(total=route.timeout)
                ) as response:
                    response_body = await response.json()

                    self.circuit_breaker.record_success(route.service_url)
                    self.metrics["successful_requests"] += 1

                    return {
                        "status": response.status,
                        "body": response_body,
                        "headers": dict(response.headers)
                    }

        except asyncio.TimeoutError:
            self.circuit_breaker.record_failure(route.service_url)
            self.metrics["timeout_errors"] += 1
            return {
                "status": 504,
                "body": {"error": "Gateway timeout"},
                "headers": {}
            }
        except Exception as e:
            self.circuit_breaker.record_failure(route.service_url)
            self.metrics["backend_errors"] += 1
            logger.error(f"Backend error: {e}")
            return {
                "status": 502,
                "body": {"error": "Bad gateway"},
                "headers": {}
            }

    async def handle_request(
        self,
        method: str,
        path: str,
        headers: dict,
        body: Optional[bytes] = None,
        query_string: str = ""
    ) -> dict:
        """Main request handler."""
        start_time = time.time()
        self.metrics["total_requests"] += 1

        # Find route
        route = self.find_route(path)
        if not route:
            return {"status": 404, "body": {"error": "Not found"}, "headers": {}}

        # Check method
        if method not in route.methods:
            return {"status": 405, "body": {"error": "Method not allowed"}, "headers": {}}

        # Authentication
        user = None
        if route.require_auth:
            user = self.authenticate(headers.get("Authorization"))
            if not user:
                self.metrics["auth_failures"] += 1
                return {"status": 401, "body": {"error": "Unauthorized"}, "headers": {}}

        # Rate limiting
        client_id = user.get("sub") if user else headers.get("X-Real-IP", "unknown")
        allowed, remaining = self.check_rate_limit(route, client_id)

        rate_headers = {
            "X-RateLimit-Limit": str(route.rate_limit),
            "X-RateLimit-Remaining": str(remaining)
        }

        if not allowed:
            self.metrics["rate_limit_rejections"] += 1
            return {
                "status": 429,
                "body": {"error": "Rate limit exceeded"},
                "headers": rate_headers
            }

        # Check cache for GET requests
        if method == "GET" and route.cache_ttl > 0:
            cache_key = self.cache.make_key(method, path, query_string)
            cached = self.cache.get(cache_key)
            if cached:
                self.metrics["cache_hits"] += 1
                cached["headers"].update(rate_headers)
                cached["headers"]["X-Cache"] = "HIT"
                return cached

        # Forward request
        response = await self.forward_request(
            route, method, path, headers, body, query_string
        )

        # Cache successful GET responses
        if method == "GET" and response["status"] == 200 and route.cache_ttl > 0:
            cache_key = self.cache.make_key(method, path, query_string)
            self.cache.set(cache_key, response, route.cache_ttl)

        # Add gateway headers
        response["headers"].update(rate_headers)
        response["headers"]["X-Response-Time"] = f"{(time.time() - start_time) * 1000:.2f}ms"

        return response

    def get_metrics(self) -> dict:
        """Return gateway metrics."""
        return dict(self.metrics)


# Example usage and routes configuration
def create_gateway() -> APIGateway:
    routes = [
        Route(
            path_prefix="/api/users",
            service_url="http://user-service:8080",
            methods=["GET", "POST", "PUT", "DELETE"],
            require_auth=True,
            rate_limit=100
        ),
        Route(
            path_prefix="/api/products",
            service_url="http://product-service:8080",
            methods=["GET"],
            require_auth=False,
            rate_limit=1000,
            cache_ttl=300  # 5 minutes
        ),
        Route(
            path_prefix="/api/orders",
            service_url="http://order-service:8080",
            methods=["GET", "POST"],
            require_auth=True,
            rate_limit=50
        ),
        Route(
            path_prefix="/public",
            service_url="http://static-service:8080",
            methods=["GET"],
            require_auth=False,
            rate_limit=10000,
            cache_ttl=3600  # 1 hour
        ),
    ]

    return APIGateway(routes=routes, jwt_secret="your-secret-key")


# ASGI application wrapper (for use with uvicorn)
async def app(scope, receive, send):
    """ASGI application for the API Gateway."""
    if scope["type"] != "http":
        return

    gateway = create_gateway()

    # Read request body
    body = b""
    while True:
        message = await receive()
        body += message.get("body", b"")
        if not message.get("more_body"):
            break

    # Handle request
    response = await gateway.handle_request(
        method=scope["method"],
        path=scope["path"],
        headers={k.decode(): v.decode() for k, v in scope["headers"]},
        body=body if body else None,
        query_string=scope["query_string"].decode()
    )

    # Send response
    await send({
        "type": "http.response.start",
        "status": response["status"],
        "headers": [(k.encode(), str(v).encode()) for k, v in response["headers"].items()]
    })

    import json
    await send({
        "type": "http.response.body",
        "body": json.dumps(response["body"]).encode()
    })
```

---

## Interview Questions

### Q1: What's the difference between API Gateway and Load Balancer?

**Answer:**
- **Load Balancer** distributes traffic across identical server instances. It operates at Layer 4 (TCP) or Layer 7 (HTTP) but doesn't understand API semantics.
- **API Gateway** understands API structure and provides features like authentication, rate limiting, request transformation, and routing to different services based on path/content.

Think of it this way: Load balancer asks "which server should handle this?", while API Gateway asks "what kind of request is this, is it allowed, and which service owns this functionality?"

### Q2: How do you handle API Gateway being a single point of failure?

**Answer:**
1. **Multiple instances** behind a load balancer
2. **Health checks** with automatic instance replacement
3. **Stateless design** - no session data in gateway
4. **Circuit breakers** to prevent cascade failures
5. **Rate limiting** stored in distributed cache (Redis)
6. **Graceful degradation** - return cached responses when backend fails

### Q3: How would you implement request aggregation?

**Answer:**
```python
async def aggregate_order_details(order_id: str) -> dict:
    """Aggregate data from multiple services into single response."""
    async with aiohttp.ClientSession() as session:
        # Parallel requests
        order_task = fetch(session, f"/orders/{order_id}")

        order = await order_task

        # Dependent parallel requests
        user_task = fetch(session, f"/users/{order['user_id']}")
        products_task = fetch_many(session,
            [f"/products/{item['product_id']}" for item in order['items']])

        user, products = await asyncio.gather(user_task, products_task)

        return {
            "order": order,
            "customer": {"name": user["name"], "email": user["email"]},
            "products": products
        }
```

### Q4: API Gateway vs Service Mesh - when to use each?

**Answer:**
- **API Gateway**: North-South traffic (external clients to services). Handles authentication, external rate limiting, protocol translation.
- **Service Mesh** (like Istio): East-West traffic (service-to-service). Handles mTLS, internal load balancing, observability between services.

Many systems use both: Gateway at the edge, service mesh internally.

### Q5: How do you version APIs through a gateway?

**Answer:**
Three common approaches:
1. **URL versioning**: `/v1/users`, `/v2/users` - route to different services
2. **Header versioning**: `Accept: application/vnd.api+json;version=2` - transform requests
3. **Query param**: `/users?version=2` - flexible but less clean

The gateway can transform v1 requests to v2 format if the underlying service only supports v2.

---

## Common Mistakes

<div style="background: #fef2f2; border: 2px solid #fecaca; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #991b1b; margin-top: 0;">Mistakes to Avoid</h4>
  <div style="display: grid; gap: 12px;">
    <div style="background: white; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">Putting business logic in gateway</strong>
      <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">Gateway should only handle cross-cutting concerns, not domain logic</p>
    </div>
    <div style="background: white; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">No circuit breaker</strong>
      <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">One slow service can exhaust gateway connections and affect all services</p>
    </div>
    <div style="background: white; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">Buffering large payloads</strong>
      <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">Stream large file uploads directly to storage service</p>
    </div>
    <div style="background: white; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">Synchronous service calls</strong>
      <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">Use async I/O to handle many concurrent connections</p>
    </div>
    <div style="background: white; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">Tight coupling to backend contracts</strong>
      <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">Use transformation layer to decouple public API from internal services</p>
    </div>
  </div>
</div>

---

## Quick Reference Card

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">API Gateway Cheat Sheet</h4>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div>
      <h5 style="color: #334155; margin-bottom: 8px;">Core Functions</h5>
      <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
        <li>Request routing</li>
        <li>Authentication/Authorization</li>
        <li>Rate limiting</li>
        <li>Request/Response transformation</li>
        <li>Caching</li>
        <li>Circuit breaking</li>
        <li>Logging & monitoring</li>
      </ul>
    </div>
    <div>
      <h5 style="color: #334155; margin-bottom: 8px;">Popular Solutions</h5>
      <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
        <li><strong>Kong</strong> - Plugin ecosystem</li>
        <li><strong>AWS API Gateway</strong> - Serverless</li>
        <li><strong>Nginx</strong> - High performance</li>
        <li><strong>Envoy</strong> - Service mesh ready</li>
        <li><strong>Traefik</strong> - Container native</li>
      </ul>
    </div>
  </div>

  <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
    <h5 style="color: #334155; margin-bottom: 8px;">Key Metrics to Monitor</h5>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; font-size: 13px;">
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px; text-align: center;">
        <strong style="color: #1e293b;">Latency</strong><br>
        <span style="color: #64748b;">P50, P95, P99</span>
      </div>
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px; text-align: center;">
        <strong style="color: #1e293b;">Error Rate</strong><br>
        <span style="color: #64748b;">4xx, 5xx %</span>
      </div>
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px; text-align: center;">
        <strong style="color: #1e293b;">Throughput</strong><br>
        <span style="color: #64748b;">RPS</span>
      </div>
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px; text-align: center;">
        <strong style="color: #1e293b;">Saturation</strong><br>
        <span style="color: #64748b;">CPU, Connections</span>
      </div>
    </div>
  </div>

  <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
    <h5 style="color: #334155; margin-bottom: 8px;">Golden Rules</h5>
    <ol style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
      <li>Keep gateway stateless for horizontal scaling</li>
      <li>Implement circuit breakers for all backend calls</li>
      <li>Use correlation IDs for distributed tracing</li>
      <li>Set aggressive timeouts (fail fast)</li>
      <li>Gateway latency should be &lt;10ms overhead</li>
    </ol>
  </div>
</div>

---

## Related Topics

- [Rate Limiting](/topic/system-design/rate-limiting)
- [Load Balancing](/topic/system-design/load-balancing)
- [Circuit Breaker](/topic/design-patterns/circuit-breaker)
- [Microservices](/topic/system-design/microservices)
