# Load Balancing

## Overview

Load balancing is a technique used to distribute incoming network traffic across multiple servers to ensure no single server becomes overwhelmed. It improves application availability, scalability, and performance.

## Key Concepts

### Why Load Balancing?

1. **High Availability**: If one server fails, traffic is redirected to healthy servers
2. **Scalability**: Easily add or remove servers based on demand
3. **Performance**: Distribute load to prevent any single server from becoming a bottleneck
4. **Redundancy**: Eliminates single points of failure

### Types of Load Balancers

#### 1. Hardware Load Balancers
- Dedicated physical devices (F5, Citrix)
- High performance but expensive
- Less flexible for cloud environments

#### 2. Software Load Balancers
- Run on commodity hardware (HAProxy, Nginx, Envoy)
- More flexible and cost-effective
- Easier to scale and configure

#### 3. Cloud Load Balancers
- AWS ELB/ALB, Google Cloud Load Balancer, Azure Load Balancer
- Fully managed, auto-scaling
- Pay-per-use pricing

## Load Balancing Algorithms

### 1. Round Robin
Distributes requests sequentially across servers.

```
Request 1 → Server A
Request 2 → Server B
Request 3 → Server C
Request 4 → Server A (cycle repeats)
```

**Pros**: Simple, even distribution
**Cons**: Doesn't consider server load or capacity

### 2. Weighted Round Robin
Assigns weights to servers based on capacity.

```
Server A (weight: 3) → 3 requests
Server B (weight: 2) → 2 requests
Server C (weight: 1) → 1 request
```

### 3. Least Connections
Routes to server with fewest active connections.

**Best for**: Long-lived connections, varying request complexity

### 4. Weighted Least Connections
Combines least connections with server weights.

### 5. IP Hash
Routes based on client IP address hash.

```python
server_index = hash(client_ip) % num_servers
```

**Best for**: Session persistence without cookies

### 6. Consistent Hashing
Minimizes redistribution when servers are added/removed.

**Best for**: Distributed caches, databases

## Layer 4 vs Layer 7 Load Balancing

### Layer 4 (Transport Layer)
- Routes based on IP and TCP/UDP port
- Fast, low overhead
- No content inspection
- Examples: AWS NLB, HAProxy TCP mode

### Layer 7 (Application Layer)
- Routes based on HTTP headers, URL path, cookies
- Content-aware routing
- SSL termination
- Examples: AWS ALB, Nginx, HAProxy HTTP mode

```
Layer 7 Example:
/api/* → API Servers
/static/* → CDN/Static Servers
/admin/* → Admin Servers
```

## Health Checks

Load balancers continuously monitor server health:

### Types of Health Checks

1. **TCP Check**: Can establish TCP connection?
2. **HTTP Check**: Returns 2xx/3xx status code?
3. **Custom Check**: Application-specific endpoint

```yaml
# HAProxy health check example
backend servers
    option httpchk GET /health
    server web1 192.168.1.1:80 check inter 5s fall 3 rise 2
    server web2 192.168.1.2:80 check inter 5s fall 3 rise 2
```

## Session Persistence (Sticky Sessions)

Ensures a user's requests go to the same server:

### Methods:
1. **Cookie-based**: Load balancer sets a cookie
2. **IP-based**: Route by client IP
3. **Application-based**: Application manages session ID

```
# Nginx sticky session
upstream backend {
    ip_hash;
    server backend1.example.com;
    server backend2.example.com;
}
```

## Implementation Example

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

## Common Interview Questions

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

## Best Practices

1. **Use health checks** - Configure appropriate check intervals and thresholds
2. **Enable connection draining** - Allow existing connections to complete before removing servers
3. **Configure timeouts properly** - Balance between user experience and server protection
4. **Monitor and log** - Track metrics like latency, error rates, connection counts
5. **Plan for failure** - Have multiple load balancers in different availability zones
6. **Use SSL termination** - Offload SSL processing to the load balancer

## Related Topics

- [Caching](/topic/system-design/caching)
- [CDN](/topic/system-design/cdn)
- [Rate Limiting](/topic/system-design/rate-limiting)
