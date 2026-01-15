# Load Balancing

## Overview

Load balancing is a technique used to distribute incoming network traffic across multiple servers to ensure no single server becomes overwhelmed. It improves application availability, scalability, and performance.

**Difficulty:** Intermediate to Advanced
**Critical For:** Any system handling >100 RPS
**Companies That Ask:** Everyone - AWS, Google, Meta, Netflix, Stripe

---

## Intuitive Understanding

<div class="metaphor-card">
  <div class="metaphor-icon">🎫</div>
  <div class="metaphor-title">Think of a Bank with Multiple Tellers</div>
  <div class="metaphor-description">
    You walk into a busy bank. Instead of everyone crowding one teller:
    - A greeter (load balancer) directs you to an available teller
    - If a teller goes on break (server fails), others handle the load
    - VIP customers might get express lanes (weighted routing)
    - Complex requests go to senior tellers (content-based routing)

    The greeter doesn't process your request - they just decide WHO will.
  </div>
  <div class="metaphor-mapping">
    <div class="mapping-item">
      <span class="real">Bank greeter</span>
      <span class="arrow">→</span>
      <span class="concept">Load balancer</span>
    </div>
    <div class="mapping-item">
      <span class="real">Bank tellers</span>
      <span class="arrow">→</span>
      <span class="concept">Backend servers</span>
    </div>
    <div class="mapping-item">
      <span class="real">"Next available!"</span>
      <span class="arrow">→</span>
      <span class="concept">Round robin</span>
    </div>
    <div class="mapping-item">
      <span class="real">"Shortest line"</span>
      <span class="arrow">→</span>
      <span class="concept">Least connections</span>
    </div>
    <div class="mapping-item">
      <span class="real">Teller goes on break</span>
      <span class="arrow">→</span>
      <span class="concept">Health check failure</span>
    </div>
  </div>
</div>

### The 20-Year Insight

**Novice thinks:** "Load balancer just distributes traffic evenly"

**Expert knows:** "Load balancing is about **intelligent traffic management**. The algorithm is the easy part. The hard parts are:
- Health checking without false positives
- Connection draining during deployments
- Handling thundering herds after outages
- Session persistence vs scalability trade-offs
- DNS caching causing uneven distribution
- Maintaining backend connection pools"

```
┌────────────────────────────────────────────────────────────────────┐
│  The Hidden Complexity of Production Load Balancing                │
│                                                                    │
│  What tutorials show:                                              │
│    Client → Load Balancer → Server                                 │
│                                                                    │
│  What production looks like:                                       │
│    Client → DNS → Edge LB → Regional LB → Service LB → Server      │
│              │       │            │            │           │       │
│              ↓       ↓            ↓            ↓           ↓       │
│           GeoDNS  DDoS        Health      Connection   Graceful   │
│           routing protect     checks      draining     shutdown    │
│           caching firewall    timeouts    keep-alive   readiness   │
│                                                                    │
│  Each layer has different failure modes and configuration needs    │
└────────────────────────────────────────────────────────────────────┘
```

---

## Load Balancing Algorithms Deep Dive

### 1. Round Robin

Distributes requests sequentially across servers.

```
Request 1 → Server A
Request 2 → Server B
Request 3 → Server C
Request 4 → Server A (cycle repeats)
```

**Implementation:**

```python
class RoundRobinBalancer:
    def __init__(self, servers):
        self.servers = servers
        self.index = 0
        self.lock = threading.Lock()

    def next(self):
        with self.lock:
            server = self.servers[self.index]
            self.index = (self.index + 1) % len(self.servers)
            return server
```

**Pros:** Simple, predictable, no state to maintain
**Cons:** Ignores server load, all servers treated equally

**Best for:** Homogeneous server fleet, stateless requests

### 2. Weighted Round Robin

Assigns weights to servers based on capacity.

```
Servers: A(weight=5), B(weight=3), C(weight=2)

Distribution over 10 requests:
A: 5 requests (50%)
B: 3 requests (30%)
C: 2 requests (20%)
```

**Implementation:**

```python
class WeightedRoundRobinBalancer:
    def __init__(self, servers_weights):
        """
        servers_weights = [("server_a", 5), ("server_b", 3), ("server_c", 2)]
        """
        self.servers = []
        self.weights = []
        self.current_weights = []
        self.total_weight = 0

        for server, weight in servers_weights:
            self.servers.append(server)
            self.weights.append(weight)
            self.current_weights.append(0)
            self.total_weight += weight

        self.lock = threading.Lock()

    def next(self):
        """
        Smooth Weighted Round Robin (Nginx algorithm)
        Distributes requests more evenly than naive approach
        """
        with self.lock:
            # Increase all current weights by their original weight
            for i in range(len(self.servers)):
                self.current_weights[i] += self.weights[i]

            # Select server with highest current weight
            max_idx = 0
            max_weight = self.current_weights[0]
            for i in range(1, len(self.servers)):
                if self.current_weights[i] > max_weight:
                    max_weight = self.current_weights[i]
                    max_idx = i

            # Reduce selected server's weight by total
            self.current_weights[max_idx] -= self.total_weight

            return self.servers[max_idx]
```

### 3. Least Connections

Routes to server with fewest active connections.

```python
class LeastConnectionsBalancer:
    def __init__(self, servers):
        self.servers = {s: 0 for s in servers}  # server -> connection count
        self.lock = threading.Lock()

    def acquire(self):
        """Get server and increment connection count"""
        with self.lock:
            # Find server with minimum connections
            server = min(self.servers, key=self.servers.get)
            self.servers[server] += 1
            return server

    def release(self, server):
        """Decrement connection count when request completes"""
        with self.lock:
            self.servers[server] = max(0, self.servers[server] - 1)

    @contextmanager
    def get_server(self):
        """Context manager for automatic release"""
        server = self.acquire()
        try:
            yield server
        finally:
            self.release(server)
```

**Best for:** Long-lived connections, varying request complexity

### 4. Least Response Time

Routes to server with fastest recent response times.

```python
import time
from collections import deque

class LeastResponseTimeBalancer:
    def __init__(self, servers, window_size=100):
        self.servers = servers
        self.response_times = {s: deque(maxlen=window_size) for s in servers}
        self.lock = threading.Lock()

    def get_avg_response_time(self, server):
        times = self.response_times[server]
        if not times:
            return 0  # No data, assume fast
        return sum(times) / len(times)

    def next(self):
        with self.lock:
            return min(self.servers, key=self.get_avg_response_time)

    def record_response(self, server, duration):
        with self.lock:
            self.response_times[server].append(duration)

    @contextmanager
    def timed_request(self):
        """Context manager that tracks response time"""
        server = self.next()
        start = time.time()
        try:
            yield server
        finally:
            duration = time.time() - start
            self.record_response(server, duration)
```

### 5. IP Hash / Consistent Hashing

Routes based on client IP hash for session affinity.

```python
import hashlib
import bisect

class ConsistentHashBalancer:
    """
    Consistent hashing minimizes redistribution when servers change.
    Uses virtual nodes for better distribution.
    """

    def __init__(self, servers, virtual_nodes=150):
        self.ring = []
        self.server_map = {}
        self.virtual_nodes = virtual_nodes

        for server in servers:
            self.add_server(server)

    def _hash(self, key):
        return int(hashlib.md5(key.encode()).hexdigest(), 16)

    def add_server(self, server):
        """Add server with virtual nodes to the ring"""
        for i in range(self.virtual_nodes):
            virtual_key = f"{server}:vn{i}"
            hash_val = self._hash(virtual_key)
            bisect.insort(self.ring, hash_val)
            self.server_map[hash_val] = server

    def remove_server(self, server):
        """Remove server and its virtual nodes"""
        for i in range(self.virtual_nodes):
            virtual_key = f"{server}:vn{i}"
            hash_val = self._hash(virtual_key)
            self.ring.remove(hash_val)
            del self.server_map[hash_val]

    def get_server(self, key):
        """Get server for given key (e.g., client IP)"""
        if not self.ring:
            return None

        hash_val = self._hash(key)

        # Find first server with hash >= key hash
        idx = bisect.bisect_left(self.ring, hash_val)
        if idx == len(self.ring):
            idx = 0  # Wrap around

        return self.server_map[self.ring[idx]]
```

### 6. Adaptive / Machine Learning Based

```python
class AdaptiveBalancer:
    """
    Combines multiple signals for intelligent routing:
    - Current connections
    - Response time (P50, P99)
    - Error rate
    - CPU/Memory metrics (if available)
    """

    def __init__(self, servers):
        self.servers = servers
        self.metrics = {s: ServerMetrics() for s in servers}
        self.lock = threading.Lock()

    def calculate_score(self, server):
        """Lower score = better choice"""
        m = self.metrics[server]

        score = 0

        # Factor 1: Connection count (weight: 30%)
        score += m.active_connections * 0.3

        # Factor 2: Response time P99 in ms (weight: 40%)
        score += m.response_time_p99 * 0.4

        # Factor 3: Error rate (weight: 30%)
        score += m.error_rate * 100 * 0.3  # Heavily penalize errors

        return score

    def next(self):
        with self.lock:
            return min(self.servers, key=self.calculate_score)
```

---

## Layer 4 vs Layer 7 Load Balancing

### Layer 4 (Transport Layer)

```
┌──────────────────────────────────────────────────────────────────┐
│  Layer 4 Load Balancing                                          │
│                                                                  │
│  Client ──TCP/UDP──→ [Load Balancer] ──TCP/UDP──→ Server         │
│                            │                                     │
│                      Routes based on:                            │
│                      • Source IP                                 │
│                      • Destination IP                            │
│                      • Source Port                               │
│                      • Destination Port                          │
│                                                                  │
│  Cannot see:                                                     │
│  • HTTP headers, URLs, cookies                                   │
│  • Request body content                                          │
│  • TLS-encrypted data (before termination)                       │
└──────────────────────────────────────────────────────────────────┘
```

**Examples:** AWS NLB, HAProxy TCP mode, IPVS

**Use when:**
- Maximum performance needed (millions of connections)
- Non-HTTP protocols (databases, game servers)
- TLS passthrough to backends

### Layer 7 (Application Layer)

```
┌──────────────────────────────────────────────────────────────────┐
│  Layer 7 Load Balancing                                          │
│                                                                  │
│  Client ──HTTPS──→ [Load Balancer] ──HTTP──→ Server              │
│                          │                                       │
│                    Routes based on:                              │
│                    • URL path (/api/*, /static/*)                │
│                    • HTTP headers (Host, User-Agent)             │
│                    • Cookies (session ID)                        │
│                    • Request body (GraphQL operation)            │
│                    • Query parameters                            │
│                                                                  │
│  Additional features:                                            │
│  • SSL termination                                               │
│  • Request/response modification                                 │
│  • Caching                                                       │
│  • Compression                                                   │
│  • Authentication                                                │
└──────────────────────────────────────────────────────────────────┘
```

**Examples:** AWS ALB, Nginx, HAProxy HTTP mode, Envoy

**Content-Based Routing Example:**

```nginx
# Nginx Layer 7 routing
upstream api_servers {
    server api1.example.com:8080;
    server api2.example.com:8080;
}

upstream web_servers {
    server web1.example.com:80;
    server web2.example.com:80;
}

upstream admin_servers {
    server admin1.example.com:8080;
}

server {
    listen 443 ssl;

    # API traffic
    location /api/ {
        proxy_pass http://api_servers;
    }

    # Admin traffic (internal only)
    location /admin/ {
        allow 10.0.0.0/8;
        deny all;
        proxy_pass http://admin_servers;
    }

    # Static content
    location /static/ {
        proxy_pass http://web_servers;
        proxy_cache_valid 200 1h;
    }

    # Default
    location / {
        proxy_pass http://web_servers;
    }
}
```

---

## Health Checks Deep Dive

### Types of Health Checks

```python
class HealthChecker:
    """Production health check implementation with multiple check types."""

    def __init__(
        self,
        check_interval: int = 5,      # Seconds between checks
        healthy_threshold: int = 2,   # Consecutive successes to mark healthy
        unhealthy_threshold: int = 3, # Consecutive failures to mark unhealthy
        timeout: int = 3              # Seconds to wait for response
    ):
        self.check_interval = check_interval
        self.healthy_threshold = healthy_threshold
        self.unhealthy_threshold = unhealthy_threshold
        self.timeout = timeout

        self.server_status = {}  # server -> HealthStatus

    def tcp_check(self, host: str, port: int) -> bool:
        """Layer 4: Can we establish TCP connection?"""
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(self.timeout)
            sock.connect((host, port))
            sock.close()
            return True
        except (socket.timeout, socket.error):
            return False

    def http_check(self, url: str, expected_codes: list = [200]) -> bool:
        """Layer 7: Does HTTP endpoint return expected status?"""
        try:
            response = requests.get(url, timeout=self.timeout)
            return response.status_code in expected_codes
        except requests.RequestException:
            return False

    def http_content_check(self, url: str, expected_content: str) -> bool:
        """Deep check: Does response contain expected content?"""
        try:
            response = requests.get(url, timeout=self.timeout)
            return response.status_code == 200 and expected_content in response.text
        except requests.RequestException:
            return False

    def custom_check(self, url: str) -> bool:
        """
        Application-level health check.

        Expects JSON response:
        {
            "status": "healthy",
            "checks": {
                "database": "ok",
                "cache": "ok",
                "queue": "ok"
            }
        }
        """
        try:
            response = requests.get(url, timeout=self.timeout)
            if response.status_code != 200:
                return False

            data = response.json()
            if data.get("status") != "healthy":
                return False

            # All sub-checks must pass
            checks = data.get("checks", {})
            return all(v == "ok" for v in checks.values())

        except (requests.RequestException, ValueError):
            return False
```

### Health Check Anti-Patterns

<div class="warning-box">
  <div class="warning-title">⚠️ Health Check Mistakes</div>
  <div class="warning-content">
    <ul>
      <li><strong>Too aggressive:</strong> 1-second intervals can mask transient issues and cause flapping</li>
      <li><strong>No depth:</strong> TCP check passes but app can't connect to database</li>
      <li><strong>No graceful degradation:</strong> Health check fails if any dependency is slow</li>
      <li><strong>Thundering herd:</strong> All servers return healthy simultaneously after outage</li>
      <li><strong>Health endpoint does real work:</strong> Under load, health checks fail first</li>
    </ul>
  </div>
</div>

### Production Health Endpoint Pattern

```python
# Good health endpoint implementation
@app.route('/health')
def health_check():
    """
    Lightweight check for load balancer.
    Returns quickly, doesn't do real work.
    """
    return {"status": "ok"}, 200

@app.route('/health/ready')
def readiness_check():
    """
    Deep check for orchestrator (K8s).
    Verifies all dependencies are accessible.
    """
    checks = {}

    # Database check (with timeout)
    try:
        db.execute("SELECT 1")
        checks["database"] = "ok"
    except Exception as e:
        checks["database"] = f"error: {str(e)}"

    # Cache check
    try:
        redis_client.ping()
        checks["cache"] = "ok"
    except Exception as e:
        checks["cache"] = f"error: {str(e)}"

    # Check all passed
    all_ok = all(v == "ok" for v in checks.values())

    return {
        "status": "healthy" if all_ok else "unhealthy",
        "checks": checks,
        "version": APP_VERSION,
        "uptime_seconds": time.time() - START_TIME
    }, 200 if all_ok else 503

@app.route('/health/live')
def liveness_check():
    """
    Is the process alive and not deadlocked?
    Used by K8s to decide whether to restart.
    """
    # Just return if we can process requests
    return {"status": "alive"}, 200
```

---

## Connection Draining and Graceful Shutdown

### The Problem

```
┌──────────────────────────────────────────────────────────────────┐
│  Without Connection Draining:                                    │
│                                                                  │
│  Time 0: Server A handling 100 requests                          │
│  Time 1: Deploy new version, kill Server A                       │
│  Result: 100 requests get CONNECTION RESET errors                │
│                                                                  │
│  With Connection Draining:                                       │
│                                                                  │
│  Time 0: Server A handling 100 requests                          │
│  Time 1: Mark Server A "draining" (stop NEW requests)            │
│  Time 2: Wait for 100 requests to complete                       │
│  Time 3: Safely kill Server A (0 active requests)                │
└──────────────────────────────────────────────────────────────────┘
```

### Implementation

```python
import signal
import threading
import time

class GracefulServer:
    def __init__(self):
        self.is_shutting_down = False
        self.active_requests = 0
        self.lock = threading.Lock()
        self.drain_timeout = 30  # seconds

        # Register signal handlers
        signal.signal(signal.SIGTERM, self._handle_shutdown)
        signal.signal(signal.SIGINT, self._handle_shutdown)

    def _handle_shutdown(self, signum, frame):
        """Called when process receives SIGTERM"""
        print("Received shutdown signal, starting graceful shutdown...")
        self.is_shutting_down = True

        # Wait for active requests to complete
        deadline = time.time() + self.drain_timeout
        while self.active_requests > 0 and time.time() < deadline:
            print(f"Waiting for {self.active_requests} requests to complete...")
            time.sleep(1)

        if self.active_requests > 0:
            print(f"Timeout! Force closing {self.active_requests} connections")

        print("Shutdown complete")
        sys.exit(0)

    @contextmanager
    def request_context(self):
        """Track active requests"""
        if self.is_shutting_down:
            raise ServiceUnavailable("Server is shutting down")

        with self.lock:
            self.active_requests += 1

        try:
            yield
        finally:
            with self.lock:
                self.active_requests -= 1

    def handle_request(self, request):
        with self.request_context():
            # Process request...
            return process(request)

    def health_check(self):
        """Return unhealthy when draining so LB stops sending traffic"""
        if self.is_shutting_down:
            return {"status": "draining"}, 503
        return {"status": "healthy"}, 200
```

### HAProxy Connection Draining

```haproxy
backend web_servers
    # Enable connection draining
    option httpchk GET /health
    http-check expect status 200

    # Wait up to 30s for connections to drain
    server web1 192.168.1.1:80 check drain

    # Or: soft-stop (stops accepting but finishes existing)
    server web2 192.168.1.2:80 check weight 100
```

---

## Production War Stories

<div class="war-story">
  <div class="war-story-header">
    <span class="war-story-icon">💥</span>
    <span class="war-story-title">The Thundering Herd That Crashed Everything</span>
  </div>
  <div class="war-story-content">
    <p><strong>Company:</strong> High-traffic e-commerce site</p>
    <p><strong>The Setup:</strong> Database went down for 2 minutes. All 50 servers marked unhealthy. Database recovered.</p>
    <p><strong>The Bug:</strong> All 50 servers passed health checks simultaneously. Load balancer sent them all traffic at once. Each server opened 100 database connections. Database got 5000 simultaneous connection attempts → crashed again.</p>

```python
# BEFORE: All servers recover at same time
def health_check():
    try:
        db.ping()
        return True  # All servers return True together!
    except:
        return False

# AFTER: Staggered recovery with jitter
def health_check():
    if not self.is_marked_healthy:
        # Random delay before first healthy response
        delay = random.uniform(0, 10)  # 0-10 seconds
        time.sleep(delay)
        self.is_marked_healthy = True

    try:
        db.ping()
        return True
    except:
        self.is_marked_healthy = False
        return False
```

    <p><strong>Lesson:</strong> Add jitter/randomness to health check recovery. Implement database connection limits per server.</p>
  </div>
</div>

<div class="war-story">
  <div class="war-story-header">
    <span class="war-story-icon">🔥</span>
    <span class="war-story-title">The Health Check That Took Down Production</span>
  </div>
  <div class="war-story-content">
    <p><strong>The Setup:</strong> Health check endpoint called a "simple" database query.</p>
    <p><strong>The Problem:</strong> Under heavy load, the health check query got slow (database overloaded). Health checks started timing out → servers marked unhealthy → remaining servers got MORE traffic → more health check failures → cascade failure.</p>

```python
# BEFORE: Health check competes with real traffic
@app.route('/health')
def health():
    # This query competes with real queries!
    db.execute("SELECT COUNT(*) FROM users")
    return "OK"

# AFTER: Dedicated connection pool for health checks
health_check_pool = create_pool(min=1, max=2)  # Tiny, dedicated pool

@app.route('/health')
def health():
    with health_check_pool.connection() as conn:
        conn.execute("SELECT 1")  # Trivial query
    return "OK"

# Or: Don't hit database at all
@app.route('/health')
def health():
    # Just verify process is alive and can respond
    return "OK"
```

    <p><strong>Lesson:</strong> Health checks should be lightweight and not compete with real traffic. Use separate connection pools or skip database entirely.</p>
  </div>
</div>

<div class="war-story">
  <div class="war-story-header">
    <span class="war-story-icon">⚡</span>
    <span class="war-story-title">DNS Caching Disaster</span>
  </div>
  <div class="war-story-content">
    <p><strong>The Setup:</strong> Used DNS round-robin for load balancing to load balancers.</p>
    <p><strong>The Bug:</strong> Client DNS caching was set to 24 hours. When one LB failed, 25% of clients kept hitting dead endpoint for 24 hours.</p>

```python
# BEFORE: Long DNS TTL
# DNS: lb.example.com TTL=86400 (24 hours!)
#      → 1.2.3.4 (LB-1)
#      → 1.2.3.5 (LB-2)
#      → 1.2.3.6 (LB-3)
#      → 1.2.3.7 (LB-4)

# LB-2 dies... clients cache 1.2.3.5 for 24 hours!

# AFTER: Short TTL with retries
# DNS: lb.example.com TTL=60 (1 minute)

# Plus: Client-side retry logic
class ResilientClient:
    def __init__(self, endpoints):
        self.endpoints = endpoints
        self.current_idx = 0

    def request(self, path, max_retries=3):
        for attempt in range(max_retries):
            try:
                endpoint = self.endpoints[self.current_idx]
                response = requests.get(f"{endpoint}{path}", timeout=5)
                return response
            except requests.RequestException:
                # Try next endpoint
                self.current_idx = (self.current_idx + 1) % len(self.endpoints)

        raise AllEndpointsFailed()
```

    <p><strong>Lesson:</strong> Use short DNS TTLs (30-60s). Implement client-side retry with failover. Consider service mesh for automatic retries.</p>
  </div>
</div>

---

## Global Load Balancing

### Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│                     Global Load Balancing                          │
│                                                                    │
│                        ┌─────────┐                                 │
│                        │  GeoDNS │                                 │
│                        └────┬────┘                                 │
│               ┌─────────────┼─────────────┐                        │
│               ↓             ↓             ↓                        │
│        ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│        │ US-East  │  │  EU-West │  │ AP-South │                   │
│        │   LB     │  │    LB    │  │    LB    │                   │
│        └────┬─────┘  └────┬─────┘  └────┬─────┘                   │
│             ↓             ↓             ↓                          │
│        ┌────────┐    ┌────────┐    ┌────────┐                     │
│        │Servers │    │Servers │    │Servers │                     │
│        └────────┘    └────────┘    └────────┘                     │
│                                                                    │
│  Routing strategies:                                               │
│  • Latency-based (route to lowest latency region)                  │
│  • Geographic (route to nearest region)                            │
│  • Weighted (70% US, 20% EU, 10% AP)                               │
│  • Failover (primary → secondary → tertiary)                       │
└────────────────────────────────────────────────────────────────────┘
```

### Implementation with AWS Route 53

```python
# Terraform configuration for global load balancing
"""
resource "aws_route53_record" "global" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "api.example.com"
  type    = "A"

  # Latency-based routing
  latency_routing_policy {
    region = "us-east-1"
  }

  set_identifier = "us-east-1"
  alias {
    name                   = aws_lb.us_east.dns_name
    zone_id                = aws_lb.us_east.zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "global_eu" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "api.example.com"
  type    = "A"

  latency_routing_policy {
    region = "eu-west-1"
  }

  set_identifier = "eu-west-1"
  alias {
    name                   = aws_lb.eu_west.dns_name
    zone_id                = aws_lb.eu_west.zone_id
    evaluate_target_health = true
  }
}
"""
```

---

## Implementation Examples

### Go - Production Load Balancer

```go
package main

import (
	"context"
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
	"sync"
	"sync/atomic"
	"time"
)

type ServerStatus int32

const (
	StatusHealthy ServerStatus = iota
	StatusUnhealthy
	StatusDraining
)

type Backend struct {
	URL            *url.URL
	ReverseProxy   *httputil.ReverseProxy
	Connections    int64
	status         int32
	ResponseTimes  *RollingAverage
	FailedChecks   int32
	SuccessChecks  int32
	mu             sync.RWMutex
}

func (b *Backend) GetStatus() ServerStatus {
	return ServerStatus(atomic.LoadInt32(&b.status))
}

func (b *Backend) SetStatus(status ServerStatus) {
	atomic.StoreInt32(&b.status, int32(status))
}

func (b *Backend) IsAvailable() bool {
	return b.GetStatus() == StatusHealthy
}

type RollingAverage struct {
	values []float64
	idx    int
	sum    float64
	mu     sync.Mutex
}

func NewRollingAverage(size int) *RollingAverage {
	return &RollingAverage{
		values: make([]float64, size),
	}
}

func (r *RollingAverage) Add(value float64) {
	r.mu.Lock()
	defer r.mu.Unlock()

	r.sum -= r.values[r.idx]
	r.values[r.idx] = value
	r.sum += value
	r.idx = (r.idx + 1) % len(r.values)
}

func (r *RollingAverage) Average() float64 {
	r.mu.Lock()
	defer r.mu.Unlock()

	return r.sum / float64(len(r.values))
}

type LoadBalancer struct {
	backends         []*Backend
	algorithm        string
	healthCheckPath  string
	healthInterval   time.Duration
	healthyThreshold int32
	unhealthyThresh  int32
	drainTimeout     time.Duration
	ctx              context.Context
	cancel           context.CancelFunc

	// Metrics
	totalRequests int64
	failedRequests int64
}

func NewLoadBalancer(serverURLs []string, algorithm string) *LoadBalancer {
	ctx, cancel := context.WithCancel(context.Background())

	lb := &LoadBalancer{
		backends:         make([]*Backend, 0),
		algorithm:        algorithm,
		healthCheckPath:  "/health",
		healthInterval:   5 * time.Second,
		healthyThreshold: 2,
		unhealthyThresh:  3,
		drainTimeout:     30 * time.Second,
		ctx:              ctx,
		cancel:           cancel,
	}

	for _, serverURL := range serverURLs {
		u, err := url.Parse(serverURL)
		if err != nil {
			continue
		}

		proxy := httputil.NewSingleHostReverseProxy(u)

		// Custom error handler
		proxy.ErrorHandler = func(w http.ResponseWriter, r *http.Request, err error) {
			atomic.AddInt64(&lb.failedRequests, 1)
			http.Error(w, "Service Unavailable", http.StatusServiceUnavailable)
		}

		backend := &Backend{
			URL:           u,
			ReverseProxy:  proxy,
			status:        int32(StatusHealthy),
			ResponseTimes: NewRollingAverage(100),
		}

		lb.backends = append(lb.backends, backend)
	}

	return lb
}

func (lb *LoadBalancer) Start() {
	// Start health checks
	go lb.healthCheckLoop()
}

func (lb *LoadBalancer) Stop() {
	lb.cancel()
}

func (lb *LoadBalancer) healthCheckLoop() {
	ticker := time.NewTicker(lb.healthInterval)
	defer ticker.Stop()

	for {
		select {
		case <-lb.ctx.Done():
			return
		case <-ticker.C:
			lb.checkAllBackends()
		}
	}
}

func (lb *LoadBalancer) checkAllBackends() {
	for _, backend := range lb.backends {
		go lb.checkBackend(backend)
	}
}

func (lb *LoadBalancer) checkBackend(backend *Backend) {
	client := http.Client{Timeout: 3 * time.Second}
	checkURL := backend.URL.String() + lb.healthCheckPath

	resp, err := client.Get(checkURL)

	if err != nil || resp.StatusCode >= 500 {
		// Failed check
		fails := atomic.AddInt32(&backend.FailedChecks, 1)
		atomic.StoreInt32(&backend.SuccessChecks, 0)

		if fails >= lb.unhealthyThresh && backend.GetStatus() == StatusHealthy {
			backend.SetStatus(StatusUnhealthy)
			fmt.Printf("Backend %s marked unhealthy\n", backend.URL)
		}
	} else {
		// Successful check
		successes := atomic.AddInt32(&backend.SuccessChecks, 1)
		atomic.StoreInt32(&backend.FailedChecks, 0)

		if successes >= lb.healthyThreshold && backend.GetStatus() == StatusUnhealthy {
			backend.SetStatus(StatusHealthy)
			fmt.Printf("Backend %s marked healthy\n", backend.URL)
		}

		if resp != nil {
			resp.Body.Close()
		}
	}
}

func (lb *LoadBalancer) getNextBackend() *Backend {
	switch lb.algorithm {
	case "least_connections":
		return lb.leastConnections()
	case "least_response_time":
		return lb.leastResponseTime()
	case "round_robin":
		fallthrough
	default:
		return lb.roundRobin()
	}
}

func (lb *LoadBalancer) roundRobin() *Backend {
	// Simple round-robin among healthy backends
	for _, backend := range lb.backends {
		if backend.IsAvailable() {
			return backend
		}
	}
	return nil
}

func (lb *LoadBalancer) leastConnections() *Backend {
	var selected *Backend
	minConns := int64(^uint64(0) >> 1)

	for _, backend := range lb.backends {
		if backend.IsAvailable() {
			conns := atomic.LoadInt64(&backend.Connections)
			if conns < minConns {
				minConns = conns
				selected = backend
			}
		}
	}

	return selected
}

func (lb *LoadBalancer) leastResponseTime() *Backend {
	var selected *Backend
	minRT := float64(^uint64(0) >> 1)

	for _, backend := range lb.backends {
		if backend.IsAvailable() {
			rt := backend.ResponseTimes.Average()
			if rt < minRT {
				minRT = rt
				selected = backend
			}
		}
	}

	return selected
}

func (lb *LoadBalancer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	atomic.AddInt64(&lb.totalRequests, 1)

	backend := lb.getNextBackend()
	if backend == nil {
		atomic.AddInt64(&lb.failedRequests, 1)
		http.Error(w, "No healthy backends", http.StatusServiceUnavailable)
		return
	}

	// Track connection
	atomic.AddInt64(&backend.Connections, 1)
	start := time.Now()

	defer func() {
		atomic.AddInt64(&backend.Connections, -1)
		backend.ResponseTimes.Add(float64(time.Since(start).Milliseconds()))
	}()

	backend.ReverseProxy.ServeHTTP(w, r)
}

func (lb *LoadBalancer) GetMetrics() map[string]interface{} {
	backendStats := make([]map[string]interface{}, 0)

	for _, b := range lb.backends {
		backendStats = append(backendStats, map[string]interface{}{
			"url":           b.URL.String(),
			"status":        b.GetStatus(),
			"connections":   atomic.LoadInt64(&b.Connections),
			"avg_response":  b.ResponseTimes.Average(),
		})
	}

	return map[string]interface{}{
		"total_requests":  atomic.LoadInt64(&lb.totalRequests),
		"failed_requests": atomic.LoadInt64(&lb.failedRequests),
		"backends":        backendStats,
	}
}

func main() {
	lb := NewLoadBalancer([]string{
		"http://localhost:8081",
		"http://localhost:8082",
		"http://localhost:8083",
	}, "least_connections")

	lb.Start()
	defer lb.Stop()

	// Metrics endpoint
	http.HandleFunc("/lb/metrics", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "%+v\n", lb.GetMetrics())
	})

	// All other traffic goes through load balancer
	http.Handle("/", lb)

	fmt.Println("Load balancer listening on :8080")
	http.ListenAndServe(":8080", nil)
}
```

---

## Expert-Level FAQs

<details>
<summary><strong>Q: How do you handle WebSocket connections with load balancing?</strong></summary>

**A:** WebSockets are long-lived, so session persistence is critical:

```python
# Option 1: Sticky sessions based on connection ID
upstream websocket_servers {
    ip_hash;  # Route based on client IP
    server ws1:8080;
    server ws2:8080;
}

# Option 2: External state store
# All servers connect to same Redis pub/sub
# Client can connect to any server, messages routed via Redis

# Option 3: Service mesh with sticky routing
# Istio/Envoy maintain connection affinity
```
</details>

<details>
<summary><strong>Q: How do you test load balancer failover?</strong></summary>

**A:** Chaos engineering approach:

```python
# Use tools like:
# - Chaos Monkey (Netflix)
# - Gremlin
# - Litmus (Kubernetes)

# Manual testing script
class FailoverTest:
    def test_single_backend_failure(self):
        # 1. Send traffic to load balancer
        # 2. Kill one backend
        # 3. Verify no errors returned
        # 4. Verify traffic redistributed

    def test_all_backends_fail(self):
        # 1. Send traffic
        # 2. Kill all backends
        # 3. Verify 503 returned
        # 4. Bring one backend up
        # 5. Verify traffic flows again

    def test_slow_backend(self):
        # 1. Make one backend slow (tc qdisc add delay)
        # 2. Verify least-response-time shifts traffic
        # 3. Verify overall latency stays acceptable
```
</details>

<details>
<summary><strong>Q: How do you handle load balancer as single point of failure?</strong></summary>

**A:** Multiple layers of redundancy:

```
┌─────────────────────────────────────────────────────────────────┐
│  High Availability Load Balancing                               │
│                                                                 │
│  Option 1: Active-Passive with VIP                              │
│  ┌─────────┐ ┌─────────┐                                       │
│  │   LB1   │ │   LB2   │  ← Heartbeat between                  │
│  │ (active)│ │(standby)│     LB1 fails → VIP moves to LB2      │
│  └────┬────┘ └────┬────┘                                       │
│       └────┬──────┘                                             │
│            ↓                                                    │
│       Virtual IP                                                │
│       (floats)                                                  │
│                                                                 │
│  Option 2: DNS + Multiple LBs                                   │
│  DNS → [LB1, LB2, LB3] (Round Robin)                           │
│  Each LB is independent, DNS health checks remove failed LBs   │
│                                                                 │
│  Option 3: Cloud Managed (Preferred)                            │
│  AWS ALB/NLB, GCP LB, Azure LB                                  │
│  Automatically HA, multi-AZ                                     │
└─────────────────────────────────────────────────────────────────┘
```
</details>

---

## Interview Deep-Dive Questions

**For Senior/Staff Level:**

1. "Walk me through how you'd design load balancing for a globally distributed real-time gaming system."

2. "How would you implement blue-green deployments with zero-downtime using load balancers?"

3. "Describe a production incident involving load balancers and how you resolved it."

4. "How do you handle the thundering herd problem when backends recover from an outage?"

5. "Compare L4 vs L7 load balancing for a gRPC microservices architecture."

---

## Related Topics

- [Caching](/topic/system-design/caching)
- [CDN](/topic/system-design/cdn)
- [Rate Limiting](/topic/system-design/rate-limiting)
- [Circuit Breaker](/topic/machine-coding/circuit-breaker)
- [Service Mesh](/topic/system-design/microservices)
