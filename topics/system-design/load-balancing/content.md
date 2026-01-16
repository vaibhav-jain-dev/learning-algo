# Load Balancing

## Overview

Load balancing is a technique used to distribute incoming network traffic across multiple servers to ensure no single server becomes overwhelmed. It improves application availability, scalability, and performance.

## Key Concepts

### Why Load Balancing?

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

1. **High Availability**: If one server fails, traffic is redirected to healthy servers
2. **Scalability**: Easily add or remove servers based on demand
3. **Performance**: Distribute load to prevent any single server from becoming a bottleneck
4. **Redundancy**: Eliminates single points of failure

</div>

### Types of Load Balancers

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 20px;">

#### Hardware LB
- Dedicated physical devices (F5, Citrix)
- High performance but expensive
- Less flexible for cloud

</div>

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 20px;">

#### Software LB
- Run on commodity hardware
- HAProxy, Nginx, Envoy
- More flexible & cost-effective

</div>

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 20px;">

#### Cloud LB
- AWS ELB/ALB, GCP, Azure
- Fully managed, auto-scaling
- Pay-per-use pricing

</div>

</div>

---

## Load Balancing Algorithms

### High-Level Architecture

<div class="diagram-section">
  <div class="lb-architecture">
    <div class="lb-clients">
      <div class="client-box">👤 Client 1</div>
      <div class="client-box">👤 Client 2</div>
      <div class="client-box">👤 Client 3</div>
      <div class="client-box">...</div>
    </div>

    <div class="lb-arrow">↓</div>

    <div class="lb-balancer">
      <div class="balancer-title">⚖️ Load Balancer</div>
      <div class="balancer-features">
        <div class="feature">Health Checks</div>
        <div class="feature">Session Mgmt</div>
        <div class="feature">SSL Term.</div>
        <div class="feature">Routing</div>
      </div>
    </div>

    <div class="lb-arrow">↓</div>

    <div class="lb-servers">
      <div class="server-box healthy">
        <div class="server-icon">🖥️</div>
        <div class="server-name">Server 1</div>
        <div class="server-status">✓ Healthy</div>
      </div>
      <div class="server-box healthy">
        <div class="server-icon">🖥️</div>
        <div class="server-name">Server 2</div>
        <div class="server-status">✓ Healthy</div>
      </div>
      <div class="server-box healthy">
        <div class="server-icon">🖥️</div>
        <div class="server-name">Server 3</div>
        <div class="server-status">✓ Healthy</div>
      </div>
      <div class="server-box unhealthy">
        <div class="server-icon">🖥️</div>
        <div class="server-name">Server 4</div>
        <div class="server-status">✗ Down</div>
      </div>
    </div>
  </div>
</div>

### Algorithm Comparison

<div style="background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

| Algorithm | How It Works | Best For | Drawback |
|-----------|--------------|----------|----------|
| **Round Robin** | Sequential distribution | Equal capacity servers | Ignores server load |
| **Weighted Round Robin** | Based on server capacity | Mixed capacity | Static weights |
| **Least Connections** | Fewest active connections | Long-lived connections | More computation |
| **IP Hash** | Hash of client IP | Session persistence | Uneven if IPs cluster |
| **Consistent Hashing** | Minimal redistribution | Distributed caches | Complex setup |
| **Random** | Random selection | Simple scenarios | Can cause imbalance |

</div>

### 1. Round Robin Visualization

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
Round Robin Distribution:

Request 1 ───────────────────► Server A
Request 2 ───────────────────► Server B
Request 3 ───────────────────► Server C
Request 4 ───────────────────► Server A  (cycle repeats)
Request 5 ───────────────────► Server B
Request 6 ───────────────────► Server C
         ...                     ...
</pre>
</div>

**Pros**: Simple, even distribution
**Cons**: Doesn't consider server load or capacity

### 2. Weighted Round Robin

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
Weighted Distribution (A=3, B=2, C=1):

┌───────────────────────────────────────────────────────────┐
│                                                           │
│  Server A (weight: 3)                                     │
│  ████████████████████████████████████ 50% of traffic      │
│                                                           │
│  Server B (weight: 2)                                     │
│  ████████████████████████ 33% of traffic                  │
│                                                           │
│  Server C (weight: 1)                                     │
│  ████████████ 17% of traffic                              │
│                                                           │
└───────────────────────────────────────────────────────────┘
</pre>
</div>

### 3. Least Connections

Routes to server with fewest active connections - best for **long-lived connections** and **varying request complexity**.

### 4. IP Hash

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">

```
server_index = hash(client_ip) % num_servers
```

**Best for**: Session persistence without cookies
- Same client always hits same server
- No session state sharing needed

</div>

### 5. Consistent Hashing

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
Consistent Hashing Ring:

                    0°
                    │
           Server A ●─────────● Server B
                   ╱           ╲
                  ╱             ╲
        270° ───●               ●─── 90°
                 ╲             ╱
                  ╲           ╱
           Server D ●─────────● Server C
                    │
                   180°

Key "user:123" hashes to 45° → Routes to Server B
Key "user:456" hashes to 200° → Routes to Server D

When Server B removed:
- Only keys between A and B move to C
- Other keys stay put!
</pre>
</div>

**Best for**: Distributed caches, databases - minimizes redistribution when nodes change

---

## Layer 4 vs Layer 7 Load Balancing

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                    LAYER 4 vs LAYER 7 LOAD BALANCING                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  LAYER 4 (Transport)              │  LAYER 7 (Application)                  │
│  ─────────────────────            │  ──────────────────────                 │
│                                   │                                          │
│  Routes based on:                 │  Routes based on:                        │
│  • IP address                     │  • URL path                              │
│  • TCP/UDP port                   │  • HTTP headers                          │
│                                   │  • Cookies                               │
│  ┌─────────────┐                  │  • Request content                       │
│  │ TCP Packet  │                  │                                          │
│  │ ┌─────────┐ │                  │  ┌────────────────────────────────┐      │
│  │ │ IP:Port │ │ ← Looks here    │  │ GET /api/users HTTP/1.1        │      │
│  │ └─────────┘ │                  │  │ Host: example.com              │      │
│  │ ┌─────────┐ │                  │  │ Cookie: session=abc123         │      │
│  │ │ Payload │ │ ✗ Can't see     │  │ ─────────────────────────      │      │
│  │ └─────────┘ │                  │  │ {"user_id": 42}                │      │
│  └─────────────┘                  │  └────────────────────────────────┘      │
│                                   │           ↑                              │
│  Examples:                        │      Looks at everything                 │
│  • AWS NLB                        │                                          │
│  • HAProxy TCP mode               │  Examples:                               │
│                                   │  • AWS ALB                               │
│  Pros:                            │  • Nginx                                 │
│  • Very fast                      │  • HAProxy HTTP mode                     │
│  • Low latency                    │                                          │
│  • Simple                         │  Pros:                                   │
│                                   │  • Content-aware routing                 │
│  Cons:                            │  • SSL termination                       │
│  • No content inspection          │  • A/B testing support                   │
│  • Limited routing options        │                                          │
│                                   │  Cons:                                   │
│                                   │  • Higher latency                        │
│                                   │  • More resource intensive               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

### Layer 7 Routing Example

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 20px; margin: 16px 0;">

```
/api/*     → API Servers (high CPU)
/static/*  → CDN/Static Servers (high bandwidth)
/admin/*   → Admin Servers (restricted access)
/ws/*      → WebSocket Servers (persistent connections)
```

</div>

---

## Health Checks

Load balancers continuously monitor server health:

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                           HEALTH CHECK FLOW                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Load Balancer                                                               │
│       │                                                                      │
│       │ Every 5 seconds: GET /health                                        │
│       ▼                                                                      │
│  ┌─────────┐     Response     ┌─────────┐                                   │
│  │ Server  │ ◄──────────────► │  Status │                                   │
│  └─────────┘                  └─────────┘                                   │
│                                                                              │
│  Health Check Types:                                                         │
│  ────────────────────                                                        │
│                                                                              │
│  1. TCP Check                                                                │
│     └─► Can establish TCP connection?                                        │
│         └─► Yes = Healthy                                                    │
│                                                                              │
│  2. HTTP Check                                                               │
│     └─► Returns 2xx/3xx status?                                             │
│         └─► GET /health → 200 OK = Healthy                                  │
│                                                                              │
│  3. Custom Check                                                             │
│     └─► Application-specific endpoint                                        │
│         └─► Check DB connection, disk space, etc.                           │
│                                                                              │
│  Failure Handling:                                                           │
│  ─────────────────                                                           │
│  • fail=3: Mark unhealthy after 3 failed checks                             │
│  • rise=2: Mark healthy after 2 successful checks                           │
│  • interval=5s: Check every 5 seconds                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

---

## Session Persistence (Sticky Sessions)

Ensures a user's requests go to the same server:

<div style="background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

| Method | How It Works | Pros | Cons |
|--------|--------------|------|------|
| **Cookie-based** | LB sets `SERVERID` cookie | Most reliable | Requires cookies |
| **IP-based** | Route by client IP | No cookies needed | NAT issues |
| **Application** | App manages session ID | Full control | More complex |

</div>

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ff6b6b;">

**Better Alternative**: Externalize sessions to Redis/Memcached
- Any server can handle any request
- True horizontal scaling
- No sticky session issues

</div>

---

## Common Interview Questions

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

1. **How would you design a load balancer for a global application?**
   - Use DNS-based load balancing (GeoDNS) for global distribution
   - Regional load balancers for local traffic
   - Consider latency-based routing

2. **How do you handle session state with load balancing?**
   - Externalize sessions (Redis, Memcached)
   - Sticky sessions (less preferred)
   - Stateless architecture with JWT tokens

3. **What happens when a server fails during a request?**
   - Connection timeout → retry on another server
   - Implement circuit breakers
   - Graceful degradation

4. **How do you scale a load balancer itself?**
   - DNS round robin across multiple load balancers
   - Active-passive failover
   - Cloud managed load balancers (auto-scale)

</div>

---

## Best Practices

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

1. **Use health checks** - Configure appropriate check intervals and thresholds
2. **Enable connection draining** - Allow existing connections to complete before removing servers
3. **Configure timeouts properly** - Balance between user experience and server protection
4. **Monitor and log** - Track metrics like latency, error rates, connection counts
5. **Plan for failure** - Have multiple load balancers in different availability zones
6. **Use SSL termination** - Offload SSL processing to the load balancer

</div>

---

## Related Topics

- [Caching](/topic/system-design/caching)
- [CDN](/topic/system-design/cdn)
- [Rate Limiting](/topic/system-design/rate-limiting)

---

## Implementation

### Python - Simple Round Robin Load Balancer

```python
import itertools
from typing import List
import requests

class LoadBalancer:
    def __init__(self, servers: List[str]):
        self.servers = servers
        self.server_cycle = itertools.cycle(servers)
        self.healthy_servers = set(servers)

    def get_next_server(self) -> str:
        """Round robin selection of healthy servers"""
        for _ in range(len(self.servers)):
            server = next(self.server_cycle)
            if server in self.healthy_servers:
                return server
        raise Exception("No healthy servers available")

    def health_check(self, server: str) -> bool:
        """Check if server is healthy"""
        try:
            response = requests.get(f"{server}/health", timeout=5)
            return response.status_code == 200
        except:
            return False

    def update_health(self):
        """Update healthy server list"""
        for server in self.servers:
            if self.health_check(server):
                self.healthy_servers.add(server)
            else:
                self.healthy_servers.discard(server)

    def forward_request(self, path: str, method: str = "GET", **kwargs):
        """Forward request to next available server"""
        server = self.get_next_server()
        url = f"{server}{path}"
        return requests.request(method, url, **kwargs)


# Usage
lb = LoadBalancer([
    "http://server1:8080",
    "http://server2:8080",
    "http://server3:8080"
])

response = lb.forward_request("/api/users")
print(response.json())
```

### Go - Load Balancer with Least Connections

```go
package main

import (
	"net/http"
	"net/http/httputil"
	"net/url"
	"sync"
	"sync/atomic"
)

type Server struct {
	URL         *url.URL
	Alive       bool
	Connections int64
	mux         sync.RWMutex
	ReverseProxy *httputil.ReverseProxy
}

func (s *Server) IsAlive() bool {
	s.mux.RLock()
	defer s.mux.RUnlock()
	return s.Alive
}

func (s *Server) SetAlive(alive bool) {
	s.mux.Lock()
	defer s.mux.Unlock()
	s.Alive = alive
}

type LoadBalancer struct {
	servers []*Server
}

func NewLoadBalancer(serverURLs []string) *LoadBalancer {
	var servers []*Server
	for _, serverURL := range serverURLs {
		u, _ := url.Parse(serverURL)
		proxy := httputil.NewSingleHostReverseProxy(u)
		servers = append(servers, &Server{
			URL:          u,
			Alive:        true,
			ReverseProxy: proxy,
		})
	}
	return &LoadBalancer{servers: servers}
}

// LeastConnections returns server with minimum active connections
func (lb *LoadBalancer) LeastConnections() *Server {
	var selected *Server
	minConns := int64(^uint64(0) >> 1) // Max int64

	for _, server := range lb.servers {
		if server.IsAlive() && server.Connections < minConns {
			minConns = server.Connections
			selected = server
		}
	}
	return selected
}

func (lb *LoadBalancer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	server := lb.LeastConnections()
	if server == nil {
		http.Error(w, "No servers available", http.StatusServiceUnavailable)
		return
	}

	atomic.AddInt64(&server.Connections, 1)
	defer atomic.AddInt64(&server.Connections, -1)

	server.ReverseProxy.ServeHTTP(w, r)
}

func main() {
	lb := NewLoadBalancer([]string{
		"http://localhost:8081",
		"http://localhost:8082",
		"http://localhost:8083",
	})

	http.ListenAndServe(":8080", lb)
}
```

### HAProxy Configuration Example

```yaml
# HAProxy health check example
backend servers
    option httpchk GET /health
    server web1 192.168.1.1:80 check inter 5s fall 3 rise 2
    server web2 192.168.1.2:80 check inter 5s fall 3 rise 2
```

### Nginx Sticky Session Config

```nginx
# Nginx sticky session
upstream backend {
    ip_hash;
    server backend1.example.com;
    server backend2.example.com;
}
```
