# Load Balancing

## Overview

Load balancing is the process of distributing incoming network traffic across multiple servers to ensure no single server becomes overwhelmed. Think of it like a traffic officer directing cars at a busy intersection - without proper direction, all cars would pile up in one lane while others remain empty.

At its core, a load balancer sits between clients and servers, acting as a reverse proxy that decides which server should handle each incoming request. This simple concept enables some of the most critical capabilities in modern systems: high availability, horizontal scaling, and fault tolerance.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #3b82f6;">
<h4 style="margin-top: 0; color: #1e40af; font-size: 18px;">Core Equation</h4>
<div style="font-family: 'Courier New', monospace; font-size: 16px; background: #eff6ff; padding: 16px; border-radius: 8px; text-align: center; color: #1e293b; border: 1px solid #3b82f6;">
    Load Balancer = Traffic Distribution + Health Monitoring + Session Management + Failover Automation
</div>
</div>

<span style="color: #166534; font-weight: 600;">**Critical Assumption:**</span> Load balancing assumes backend servers are interchangeable for the same request type. If servers have different capabilities or data, you need content-aware routing or session affinity, which complicates the balancing strategy.

<span style="color: #166534; font-weight: 600;">**Key Trade-off:**</span> Simplicity vs Intelligence. Simple algorithms (round-robin) are fast but may route to overloaded servers. Intelligent algorithms (least connections, adaptive) make better decisions but add latency and complexity.

---

## Why Load Balancing Matters

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">
<h4 style="color: #166534; margin-top: 0;">Real-World Impact</h4>
<div style="color: #1e293b;">

    **Netflix** handles over 400 million streaming hours daily using load balancers to distribute requests across thousands of servers globally. Without load balancing, a single popular show release could crash their entire service.

    **Amazon** reported that every 100ms of latency costs them 1% in sales. Load balancing helps maintain sub-100ms response times by routing requests to the fastest available server.

    **GitHub** uses load balancing to handle millions of git operations daily. During peak hours, their load balancers distribute traffic across multiple data centers to maintain availability.

</div>
</div>

### Key Benefits

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
<div style="background: #eff6ff; padding: 16px; border-radius: 8px;">
<h5 style="color: #1e40af; margin: 0 0 8px 0;">High Availability</h5>
<p style="color: #1e293b; margin: 0; font-size: 14px;">If one server fails, traffic automatically routes to healthy servers. Users never notice the failure.</p>
</div>
<div style="background: #f0fdf4; padding: 16px; border-radius: 8px;">
<h5 style="color: #166534; margin: 0 0 8px 0;">Horizontal Scaling</h5>
<p style="color: #1e293b; margin: 0; font-size: 14px;">Add more servers to handle increased load. Scale out is often cheaper than scale up.</p>
</div>
<div style="background: #fefce8; padding: 16px; border-radius: 8px;">
<h5 style="color: #854d0e; margin: 0 0 8px 0;">Performance</h5>
<p style="color: #1e293b; margin: 0; font-size: 14px;">Distribute load evenly to prevent any single server from becoming a bottleneck.</p>
</div>
<div style="background: #fdf4ff; padding: 16px; border-radius: 8px;">
<h5 style="color: #86198f; margin: 0 0 8px 0;">Flexibility</h5>
<p style="color: #1e293b; margin: 0; font-size: 14px;">Perform maintenance on servers without downtime by draining connections gracefully.</p>
</div>
</div>
</div>

---

## Section 1: Layer 4 vs Layer 7 Load Balancing

### Deep Mechanics

The OSI model distinction between Layer 4 (Transport) and Layer 7 (Application) load balancing fundamentally changes what information is available for routing decisions and the performance characteristics of the load balancer.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Layer 4 vs Layer 7 Architecture</h4>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 20px;">
<h5 style="color: #1e40af; margin: 0 0 16px 0;">Layer 4 (Transport Layer)</h5>

<div style="background: white; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="color: #1e293b; font-weight: 600; margin-bottom: 12px; font-size: 13px;">Operates On:</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="background: #dbeafe; padding: 8px 12px; border-radius: 6px; font-size: 13px;">
<span style="color: #1e40af; font-weight: 600;">TCP/UDP Headers</span>
</div>
<div style="background: #dbeafe; padding: 8px 12px; border-radius: 6px; font-size: 13px;">
<span style="color: #1e40af;">Source/Destination IP</span>
</div>
<div style="background: #dbeafe; padding: 8px 12px; border-radius: 6px; font-size: 13px;">
<span style="color: #1e40af;">Source/Destination Port</span>
</div>
</div>
</div>

<div style="background: #f8fafc; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
<div style="color: #64748b; font-size: 12px; margin-bottom: 8px;">What L4 Sees:</div>
<div style="font-family: monospace; font-size: 11px;">
<div style="background: #dcfce7; border: 1px solid #22c55e; padding: 6px 10px; border-radius: 4px; margin-bottom: 4px;">
<span style="color: #166534;">SRC: 192.168.1.100:54321</span>
</div>
<div style="background: #dcfce7; border: 1px solid #22c55e; padding: 6px 10px; border-radius: 4px; margin-bottom: 4px;">
<span style="color: #166534;">DST: 10.0.0.1:443</span>
</div>
<div style="background: #fee2e2; border: 1px solid #ef4444; padding: 6px 10px; border-radius: 4px;">
<span style="color: #991b1b;">Payload: [encrypted blob]</span>
</div>
</div>
</div>

<div style="font-size: 13px;">
<div style="color: #166534; margin-bottom: 4px;">+ Very fast (no payload parsing)</div>
<div style="color: #166534; margin-bottom: 4px;">+ Protocol agnostic</div>
<div style="color: #166534; margin-bottom: 4px;">+ Lower resource usage</div>
<div style="color: #991b1b; margin-bottom: 4px;">- No content-based routing</div>
<div style="color: #991b1b;">- Cannot modify requests</div>
</div>

<div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #bfdbfe;">
<div style="color: #64748b; font-size: 12px;">Examples:</div>
<div style="color: #1e40af; font-size: 13px;">AWS NLB, HAProxy TCP mode, F5 BIG-IP LTM</div>
</div>
</div>

<div style="background: #f3e8ff; border: 2px solid #a855f7; border-radius: 12px; padding: 20px;">
<h5 style="color: #7c3aed; margin: 0 0 16px 0;">Layer 7 (Application Layer)</h5>

<div style="background: white; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="color: #1e293b; font-weight: 600; margin-bottom: 12px; font-size: 13px;">Operates On:</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="background: #e9d5ff; padding: 8px 12px; border-radius: 6px; font-size: 13px;">
<span style="color: #7c3aed; font-weight: 600;">HTTP Headers & Body</span>
</div>
<div style="background: #e9d5ff; padding: 8px 12px; border-radius: 6px; font-size: 13px;">
<span style="color: #7c3aed;">URL Path & Query Params</span>
</div>
<div style="background: #e9d5ff; padding: 8px 12px; border-radius: 6px; font-size: 13px;">
<span style="color: #7c3aed;">Cookies & Sessions</span>
</div>
</div>
</div>

<div style="background: #f8fafc; border-radius: 8px; padding: 12px; margin-bottom: 16px; font-family: monospace; font-size: 11px;">
<div style="color: #166534;">GET /api/users/123 HTTP/1.1</div>
<div style="color: #1e40af;">Host: api.example.com</div>
<div style="color: #ea580c;">Cookie: session=abc123</div>
<div style="color: #7c3aed;">X-Tenant-ID: acme-corp</div>
<div style="color: #64748b;">Authorization: Bearer eyJ...</div>
</div>

<div style="font-size: 13px;">
<div style="color: #166534; margin-bottom: 4px;">+ Content-aware routing</div>
<div style="color: #166534; margin-bottom: 4px;">+ Can modify/transform requests</div>
<div style="color: #166534; margin-bottom: 4px;">+ SSL termination capabilities</div>
<div style="color: #991b1b; margin-bottom: 4px;">- Higher latency</div>
<div style="color: #991b1b;">- More resource intensive</div>
</div>

<div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #d8b4fe;">
<div style="color: #64748b; font-size: 12px;">Examples:</div>
<div style="color: #7c3aed; font-size: 13px;">AWS ALB, Nginx, HAProxy HTTP, Envoy</div>
</div>
</div>
</div>
</div>

### Layer 7 Routing Capabilities

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #166534; margin-top: 0;">Content-Based Routing Examples</h4>
<div style="display: grid; gap: 12px;">
<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
<strong style="color: #166534;">Path-Based Routing</strong>
<pre style="margin: 8px 0 0 0; color: #166534; font-size: 14px; background: #dcfce7; padding: 12px; border-radius: 6px;">/api/*     --> API Servers (high CPU, low memory)
  /static/*  --> CDN/Static Servers (high bandwidth)
  /admin/*   --> Admin Servers (restricted network)
/ws/*      --> WebSocket Servers (persistent connections)</pre>
</div>
<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #16a34a;">
<strong style="color: #166534;">Header-Based Routing</strong>
<pre style="margin: 8px 0 0 0; color: #166534; font-size: 14px; background: #dcfce7; padding: 12px; border-radius: 6px;">X-API-Version: v2  --> V2 API Servers
  Accept: application/grpc --> gRPC Servers
X-Tenant-ID: premium --> Premium Tier Servers</pre>
</div>
<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #15803d;">
<strong style="color: #166534;">Cookie-Based Routing (A/B Testing)</strong>
<pre style="margin: 8px 0 0 0; color: #166534; font-size: 14px; background: #dcfce7; padding: 12px; border-radius: 6px;">experiment=control  --> Production Servers (90%)
experiment=variant  --> Experiment Servers (10%)</pre>
</div>
</div>
</div>

### When to Choose L4 vs L7

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #92400e; margin-top: 0;">Decision Framework</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div style="background: white; padding: 16px; border-radius: 8px;">
<strong style="color: #1e40af;">Choose Layer 4 When:</strong>
<ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
<li>Maximum throughput is critical (millions of connections)</li>
<li>Protocol is not HTTP (database connections, game servers)</li>
<li>End-to-end encryption required (TLS passthrough)</li>
<li>Simple round-robin or IP-hash is sufficient</li>
<li>Backend servers are homogeneous</li>
</ul>
</div>
<div style="background: white; padding: 16px; border-radius: 8px;">
<strong style="color: #7c3aed;">Choose Layer 7 When:</strong>
<ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
<li>Content-based routing needed (path, headers)</li>
<li>SSL termination at load balancer</li>
<li>Request/response transformation needed</li>
<li>Advanced health checks (HTTP status codes)</li>
<li>WebSocket protocol upgrade handling</li>
<li>[[API Gateway]](/topic/system-design/api-gateway) functionality</li>
</ul>
</div>
</div>

<div style="background: #fef9c3; padding: 16px; border-radius: 8px; margin-top: 16px;">
<span style="color: #166534; font-weight: 600;">**Trade-off:**</span> Many architectures use both - L4 at the edge for high-throughput TCP distribution, then L7 internally for intelligent HTTP routing. This is called "two-tier load balancing."
</div>
</div>

### L4 vs L7 Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: What is the difference between Layer 4 and Layer 7 load balancing?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Layer 4 load balancing operates at the transport layer, making routing decisions based on IP addresses and TCP/UDP ports without inspecting packet contents. Layer 7 operates at the application layer, inspecting HTTP headers, URLs, cookies, and request bodies to make intelligent routing decisions. L4 is faster but less flexible; L7 is more capable but adds latency.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: How does SSL/TLS handling differ between L4 and L7 load balancers?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> L4 load balancers can either pass through encrypted traffic (TLS passthrough) or terminate TLS. With passthrough, the load balancer cannot inspect content but maintains end-to-end encryption. L7 load balancers must terminate TLS to inspect HTTP content, then optionally re-encrypt for backend communication (TLS re-encryption). <span style="color: #166534; font-weight: 600;">**Trade-off:**</span> TLS termination at L7 enables content inspection and caching but means traffic between LB and backend may be unencrypted unless re-encrypted. For compliance requirements (PCI-DSS), you may need TLS passthrough or re-encryption. See [[network-protocols]](/topic/system-design/network-protocols) for TLS details.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: You're designing a system that needs to handle 10 million concurrent WebSocket connections. How do you architect the load balancing layer?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> This requires a hybrid approach. (1) <strong>Edge layer (L4):</strong> Use L4 load balancers (AWS NLB or dedicated hardware) to distribute TCP connections across multiple L7 instances. L4 handles millions of connections with minimal overhead. (2) <strong>Protocol layer (L7):</strong> L7 load balancers handle the WebSocket upgrade (HTTP -> WS) and route based on path/headers. Use consistent hashing by client ID so reconnections go to the same backend. (3) <strong>Backend awareness:</strong> WebSockets are stateful, so backends must handle connection state. Options: sticky sessions via consistent hashing, or externalize state to [[Redis]](/topic/system-design/caching) so any backend can handle any message. (4) <strong>Health checking:</strong> L4 uses TCP health checks; L7 can send WebSocket ping frames. (5) <strong>Connection draining:</strong> On backend shutdown, send WebSocket close frame with reconnect hint before TCP termination. <span style="color: #166534; font-weight: 600;">**Assumption:**</span> This assumes backends can horizontally scale. If backends have per-connection state, you need either sticky sessions or a pub/sub layer ([[message-queues]](/topic/system-design/message-queues)) to route messages to the correct backend.</p>
</div>
</div>
</div>

---

## Section 2: Load Balancing Algorithms

### Algorithm Deep Dive

The choice of load balancing algorithm fundamentally affects how traffic is distributed and how the system behaves under various conditions.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Algorithm Comparison Matrix</h4>
<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
<tr style="background: #f1f5f9;">
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #cbd5e1;">Algorithm</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #cbd5e1;">How It Works</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #cbd5e1;">Time Complexity</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #cbd5e1;">Best For</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #cbd5e1;">Drawback</th>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Round Robin</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Sequential rotation through servers</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">O(1)</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Homogeneous servers, short requests</td>
<td style="padding: 12px; color: #dc2626; border-bottom: 1px solid #e2e8f0;">Ignores server load completely</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Weighted Round Robin</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">RR with capacity-based weights</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">O(1)</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Heterogeneous server capacities</td>
<td style="padding: 12px; color: #dc2626; border-bottom: 1px solid #e2e8f0;">Static weights don't adapt</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Least Connections</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Route to server with fewest active connections</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">O(n) or O(log n) with heap</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Long-lived connections (WebSocket, DB)</td>
<td style="padding: 12px; color: #dc2626; border-bottom: 1px solid #e2e8f0;">Doesn't account for request complexity</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Least Response Time</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Combine connections + response latency</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Latency-sensitive applications</td>
<td style="padding: 12px; color: #dc2626; border-bottom: 1px solid #e2e8f0;">Requires latency tracking</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>IP Hash</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Hash client IP to determine server</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">O(1)</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Basic session persistence</td>
<td style="padding: 12px; color: #dc2626; border-bottom: 1px solid #e2e8f0;">Uneven if IPs cluster (NAT)</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b;"><strong>Consistent Hashing</strong></td>
<td style="padding: 12px; color: #475569;">Minimal key redistribution on changes</td>
<td style="padding: 12px; color: #475569;">O(log n)</td>
<td style="padding: 12px; color: #475569;">Distributed caches, stateful services</td>
<td style="padding: 12px; color: #dc2626;">Complex implementation, requires virtual nodes</td>
</tr>
</table>
</div>
</div>

### Round Robin Deep Dive

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Round Robin Distribution Pattern</h4>

<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; padding: 12px 20px; border-radius: 8px; min-width: 120px; text-align: center;">
<span style="color: #1e40af; font-weight: 600;">Request 1</span>
</div>
<div style="flex: 1; height: 3px; background: linear-gradient(90deg, #3b82f6, #22c55e); border-radius: 2px;"></div>
<div style="background: #dcfce7; padding: 12px 24px; border-radius: 8px; border: 2px solid #22c55e;">
<span style="color: #166534; font-weight: 600;">Server A</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; padding: 12px 20px; border-radius: 8px; min-width: 120px; text-align: center;">
<span style="color: #1e40af; font-weight: 600;">Request 2</span>
</div>
<div style="flex: 1; height: 3px; background: linear-gradient(90deg, #3b82f6, #3b82f6); border-radius: 2px;"></div>
<div style="background: #dbeafe; padding: 12px 24px; border-radius: 8px; border: 2px solid #3b82f6;">
<span style="color: #1e40af; font-weight: 600;">Server B</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; padding: 12px 20px; border-radius: 8px; min-width: 120px; text-align: center;">
<span style="color: #1e40af; font-weight: 600;">Request 3</span>
</div>
<div style="flex: 1; height: 3px; background: linear-gradient(90deg, #3b82f6, #a855f7); border-radius: 2px;"></div>
<div style="background: #f3e8ff; padding: 12px 24px; border-radius: 8px; border: 2px solid #a855f7;">
<span style="color: #7c3aed; font-weight: 600;">Server C</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 12px 20px; border-radius: 8px; min-width: 120px; text-align: center;">
<span style="color: #92400e; font-weight: 600;">Request 4</span>
</div>
<div style="flex: 1; height: 3px; background: linear-gradient(90deg, #f59e0b, #22c55e); border-radius: 2px;"></div>
<div style="background: #dcfce7; padding: 12px 24px; border-radius: 8px; border: 2px solid #22c55e;">
<span style="color: #166534; font-weight: 600;">Server A</span>
</div>
<span style="color: #64748b; font-size: 12px; font-style: italic;">(cycle repeats)</span>
</div>
</div>

<div style="margin-top: 24px; padding: 16px; background: #fef3c7; border-radius: 8px;">
<span style="color: #166534; font-weight: 600;">**Assumption:**</span> Round robin assumes all requests have similar processing cost and all servers have equal capacity. If Server A is processing a 10-second report while Server B just finished instantly, the next request still goes to Server B, leaving Server A potentially overloaded.
</div>
</div>

### Least Connections Implementation

```python
import heapq
from dataclasses import dataclass, field
from typing import List, Optional
import threading

@dataclass(order=True)
class Server:
    """Server with connection tracking for least-connections algorithm."""
    connections: int = field(compare=True)
    server_id: str = field(compare=False)
    address: str = field(compare=False)
    weight: int = field(default=1, compare=False)

    @property
    def weighted_connections(self) -> float:
        """Connections normalized by weight for weighted least connections."""
        return self.connections / self.weight


class LeastConnectionsBalancer:
    """
    Least Connections Load Balancer with O(log n) selection.

    Why heap-based:
    - Finding minimum is O(1)
    - Updating after selection is O(log n)
    - Better than O(n) linear scan for large server pools

    Thread Safety:
    - Lock protects heap integrity during concurrent access
    - Consider lock-free structures for ultra-high throughput
    """

    def __init__(self):
        self._heap: List[Server] = []
        self._server_map: dict = {}  # server_id -> Server
        self._lock = threading.Lock()

    def add_server(self, server_id: str, address: str, weight: int = 1):
        """Add server to the pool."""
        with self._lock:
            server = Server(
                connections=0,
                server_id=server_id,
                address=address,
                weight=weight
            )
            heapq.heappush(self._heap, server)
            self._server_map[server_id] = server

    def get_server(self) -> Optional[Server]:
        """
        Select server with least connections.

        Edge Cases:
        - Empty pool: Return None, caller must handle
        - All servers at max: Still returns least loaded
        - Server removed during selection: Handled by lock
        """
        with self._lock:
            if not self._heap:
                return None

            # Get server with minimum connections
            server = heapq.heappop(self._heap)

            # Increment connection count
            server.connections += 1

            # Re-insert with updated count
            heapq.heappush(self._heap, server)

            return server

    def release_connection(self, server_id: str):
        """
        Called when request completes.

        Critical: Must be called for every get_server() call,
        otherwise connection counts drift and balancing fails.
        """
        with self._lock:
            if server_id in self._server_map:
                server = self._server_map[server_id]
                server.connections = max(0, server.connections - 1)
                # Heap property may be violated - reheapify
                heapq.heapify(self._heap)

    def remove_server(self, server_id: str):
        """Remove unhealthy server from pool."""
        with self._lock:
            if server_id in self._server_map:
                server = self._server_map.pop(server_id)
                self._heap.remove(server)
                heapq.heapify(self._heap)
```

### Consistent Hashing Deep Dive

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Consistent Hashing Ring with Virtual Nodes</h4>

<div style="display: flex; gap: 40px; align-items: flex-start; flex-wrap: wrap; justify-content: center;">
<div style="position: relative; width: 280px; height: 280px;">
<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; border: 4px solid #cbd5e1; border-radius: 50%;"></div>

  <!-- Hash positions -->
<div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); color: #64748b; font-size: 11px; font-weight: 600;">0</div>
<div style="position: absolute; top: 50%; right: -20px; transform: translateY(-50%); color: #64748b; font-size: 11px; font-weight: 600;">2^31</div>
<div style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); color: #64748b; font-size: 11px; font-weight: 600;">2^32</div>
<div style="position: absolute; top: 50%; left: -25px; transform: translateY(-50%); color: #64748b; font-size: 11px; font-weight: 600;">3*2^31</div>

  <!-- Server A virtual nodes (green) -->
<div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); background: #22c55e; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>
<div style="position: absolute; top: 80px; right: 25px; background: #22c55e; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>
<div style="position: absolute; bottom: 60px; left: 20px; background: #22c55e; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>

  <!-- Server B virtual nodes (blue) -->
<div style="position: absolute; top: 50%; right: 15px; transform: translateY(-50%); background: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>
<div style="position: absolute; top: 40px; left: 35px; background: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>
<div style="position: absolute; bottom: 25px; right: 60px; background: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>

  <!-- Server C virtual nodes (purple) -->
<div style="position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%); background: #a855f7; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>
<div style="position: absolute; top: 50%; left: 15px; transform: translateY(-50%); background: #a855f7; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>
<div style="position: absolute; top: 60px; right: 70px; background: #a855f7; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>

  <!-- Key point -->
<div style="position: absolute; top: 30px; right: 55px; background: #ef4444; width: 10px; height: 10px; border-radius: 50%;"></div>
</div>

<div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
<div style="display: flex; gap: 12px; align-items: center;">
<div style="background: #22c55e; width: 16px; height: 16px; border-radius: 50%;"></div>
<span style="color: #166534; font-size: 13px;">Server A (3 virtual nodes)</span>
</div>
<div style="display: flex; gap: 12px; align-items: center;">
<div style="background: #3b82f6; width: 16px; height: 16px; border-radius: 50%;"></div>
<span style="color: #1e40af; font-size: 13px;">Server B (3 virtual nodes)</span>
</div>
<div style="display: flex; gap: 12px; align-items: center;">
<div style="background: #a855f7; width: 16px; height: 16px; border-radius: 50%;"></div>
<span style="color: #7c3aed; font-size: 13px;">Server C (3 virtual nodes)</span>
</div>
<div style="display: flex; gap: 12px; align-items: center;">
<div style="background: #ef4444; width: 10px; height: 10px; border-radius: 50%;"></div>
<span style="color: #dc2626; font-size: 13px;">Key "user:123" (hash position)</span>
</div>

<div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px; margin-top: 8px;">
<div style="color: #1e293b; font-size: 13px;"><strong>Routing:</strong> Key hashes to position</div>
<div style="color: #1e40af; font-size: 13px; margin-top: 4px;">Walk clockwise to find nearest server node</div>
<div style="color: #1e40af; font-size: 13px;">Key "user:123" --> Server A</div>
</div>

<div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px;">
<div style="color: #166534; font-weight: 600; font-size: 13px;">When Server B removed:</div>
<div style="color: #1e293b; font-size: 12px; margin-top: 4px;">Only keys between B's nodes and next clockwise node move</div>
<div style="color: #1e293b; font-size: 12px;">~1/N keys remapped (not all keys!)</div>
</div>
</div>
</div>
</div>

### Consistent Hashing Implementation

```python
import hashlib
import bisect
from typing import Dict, List, Optional, Any

class ConsistentHashRing:
    """
    Consistent hashing with virtual nodes for even distribution.

    Why Virtual Nodes:
    - Physical nodes may hash to adjacent positions (clustering)
    - Virtual nodes spread each server across the ring
    - More virtual nodes = more even distribution
    - Trade-off: More memory, slower lookups (O(log(n*v)))

    Production Considerations:
    - Use 100-200 virtual nodes per server for good distribution
    - xxhash is faster than MD5/SHA for non-cryptographic hashing
    - Consider jump consistent hash for better performance
    """

    def __init__(self, virtual_nodes: int = 150):
        self.virtual_nodes = virtual_nodes
        self.ring: Dict[int, str] = {}  # hash -> server_id
        self.sorted_keys: List[int] = []
        self.servers: Dict[str, Any] = {}  # server_id -> metadata

    def _hash(self, key: str) -> int:
        """
        Generate hash for key.

        Using MD5 for consistent cross-platform hashing.
        In production, consider xxhash for 10x speed improvement.
        """
        return int(hashlib.md5(key.encode()).hexdigest(), 16)

    def add_server(self, server_id: str, metadata: Any = None):
        """
        Add server with virtual nodes to the ring.

        Virtual node naming: "server_id:vnode_index"
        This ensures deterministic placement across restarts.
        """
        self.servers[server_id] = metadata

        for i in range(self.virtual_nodes):
            virtual_key = f"{server_id}:vnode:{i}"
            hash_value = self._hash(virtual_key)

            self.ring[hash_value] = server_id
            bisect.insort(self.sorted_keys, hash_value)

    def remove_server(self, server_id: str):
        """
        Remove server and all its virtual nodes.

        Keys previously mapped to this server will automatically
        route to the next clockwise server.
        """
        if server_id not in self.servers:
            return

        del self.servers[server_id]

        for i in range(self.virtual_nodes):
            virtual_key = f"{server_id}:vnode:{i}"
            hash_value = self._hash(virtual_key)

            if hash_value in self.ring:
                del self.ring[hash_value]
                self.sorted_keys.remove(hash_value)

    def get_server(self, key: str) -> Optional[str]:
        """
        Get server for given key using consistent hashing.

        Algorithm:
        1. Hash the key
        2. Binary search for position in sorted ring
        3. Return server at that position (or wrap to first)

        Time Complexity: O(log(n * virtual_nodes))
        """
        if not self.ring:
            return None

        hash_value = self._hash(key)

        # Binary search for first hash >= key_hash
        idx = bisect.bisect_left(self.sorted_keys, hash_value)

        # Wrap around if past the end
        if idx >= len(self.sorted_keys):
            idx = 0

        server_hash = self.sorted_keys[idx]
        return self.ring[server_hash]

    def get_n_servers(self, key: str, n: int) -> List[str]:
        """
        Get N distinct servers for replication.

        Use case: Store data on primary + N-1 replicas.
        Walks clockwise collecting distinct server IDs.
        """
        if not self.ring or n <= 0:
            return []

        hash_value = self._hash(key)
        idx = bisect.bisect_left(self.sorted_keys, hash_value)

        servers = []
        seen = set()

        for _ in range(len(self.sorted_keys)):
            if idx >= len(self.sorted_keys):
                idx = 0

            server_id = self.ring[self.sorted_keys[idx]]

            if server_id not in seen:
                servers.append(server_id)
                seen.add(server_id)

                if len(servers) >= n:
                    break

            idx += 1

        return servers


# Usage example
ring = ConsistentHashRing(virtual_nodes=150)

# Add servers
ring.add_server("server-1", {"address": "10.0.0.1:8080"})
ring.add_server("server-2", {"address": "10.0.0.2:8080"})
ring.add_server("server-3", {"address": "10.0.0.3:8080"})

# Route requests
server = ring.get_server("user:12345")  # Consistent mapping
replicas = ring.get_n_servers("user:12345", n=3)  # For replication
```

### Algorithm Selection Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: When would you choose Least Connections over Round Robin?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Choose Least Connections when requests have highly variable processing times. Round robin assumes all requests complete quickly and evenly, but if some requests take 100ms and others take 10 seconds, round robin can overload servers with slow requests. Least connections naturally routes new requests to servers that have finished previous work, adapting to actual server load.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: What's the problem with basic IP hashing for session persistence, and how does consistent hashing solve it?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Basic IP hashing uses `hash(IP) % N` to select a server. When servers are added/removed (N changes), almost all keys remap to different servers, invalidating caches and breaking sessions. Consistent hashing places servers on a ring; when a server is removed, only keys between it and its predecessor move to the next server clockwise - roughly 1/N keys instead of all keys. <span style="color: #166534; font-weight: 600;">**Trade-off:**</span> Consistent hashing requires more memory (ring structure) and has O(log N) lookup vs O(1) for modular hashing. For small, stable server pools, simple hashing may be sufficient. See [[database-sharding]](/topic/system-design/database-sharding) for similar concepts.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: You're building a distributed cache where cache effectiveness depends on request locality (same user hitting same cache server). How do you handle the cold-start problem when adding new cache servers?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> Adding a server to a consistent hash ring causes ~1/N keys to remap, but those keys will initially have cache misses (cold cache). Solutions: (1) <strong>Warm-up period:</strong> Add new server with zero weight, gradually increase weight over minutes as cache populates from backend fetches. (2) <strong>Cache copying:</strong> Before enabling new server, have it subscribe to writes going to servers whose key ranges it will absorb. Pre-populate hot keys using access logs. (3) <strong>Two-tier hashing:</strong> Hash to a logical partition first, then hash partitions to servers. Adding a server moves whole partitions, allowing batch pre-warming. (4) <strong>Bounded load consistent hashing:</strong> Google's algorithm caps maximum load per server; when a server is "full," keys overflow to next server, naturally spreading hot keys across multiple servers. <span style="color: #166534; font-weight: 600;">**Assumption:**</span> This assumes cache misses going to backend is acceptable during transition. For truly zero-downtime, you need cache replication, which adds complexity and memory cost. See [[caching]](/topic/system-design/caching) for cache warming strategies.</p>
</div>
</div>
</div>

---

## Section 3: Health Checks

### Deep Mechanics

Health checks are the nervous system of load balancing - they detect failed or degraded servers and automatically route traffic away before users experience errors.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Health Check Architecture</h4>

<div style="display: flex; flex-direction: column; gap: 24px;">
<div style="display: flex; align-items: center; justify-content: center; gap: 32px;">
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 20px 32px; border-radius: 12px; text-align: center; color: white;">
<div style="font-weight: 700; font-size: 16px;">Load Balancer</div>
<div style="font-size: 12px; opacity: 0.9; margin-top: 4px;">Health Check Engine</div>
</div>

<div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
<div style="color: #22c55e; font-size: 16px;">---> TCP SYN</div>
<div style="color: #22c55e; font-size: 16px;"><--- TCP ACK</div>
<div style="color: #3b82f6; font-size: 12px;">Every 5 seconds</div>
</div>

<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="background: #dcfce7; padding: 12px 20px; border-radius: 8px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 600;">Server 1</div>
<div style="color: #16a34a; font-size: 11px;">Healthy</div>
</div>
<div style="background: #dcfce7; padding: 12px 20px; border-radius: 8px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 600;">Server 2</div>
<div style="color: #16a34a; font-size: 11px;">Healthy</div>
</div>
<div style="background: #fee2e2; padding: 12px 20px; border-radius: 8px; border: 2px solid #ef4444;">
<div style="color: #991b1b; font-weight: 600;">Server 3</div>
<div style="color: #dc2626; font-size: 11px;">Unhealthy (3 failures)</div>
</div>
</div>
</div>
</div>
</div>

### Health Check Types

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Health Check Comparison</h4>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 20px;">
<h5 style="color: #166534; margin: 0 0 12px 0;">TCP Health Check</h5>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">
  Attempts TCP connection to port. Success = server is listening.
</div>
<div style="background: white; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px;">
<div style="color: #166534;">SYN --></div>
<div style="color: #166534;"><-- SYN-ACK</div>
<div style="color: #166534;">ACK --></div>
<div style="color: #64748b; margin-top: 4px;">(3-way handshake)</div>
</div>
<div style="margin-top: 12px; font-size: 12px;">
<div style="color: #166534;">+ Very fast (~1ms)</div>
<div style="color: #166534;">+ Works with any TCP service</div>
<div style="color: #991b1b;">- Can't detect app-level issues</div>
</div>
</div>

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 20px;">
<h5 style="color: #1e40af; margin: 0 0 12px 0;">HTTP Health Check</h5>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">
  Sends HTTP request, validates response status code.
</div>
<div style="background: white; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px;">
<div style="color: #1e40af;">GET /health HTTP/1.1</div>
<div style="color: #64748b;">Host: backend:8080</div>
<div style="color: #166534; margin-top: 8px;">HTTP/1.1 200 OK</div>
<div style="color: #166534;">{"status": "healthy"}</div>
</div>
<div style="margin-top: 12px; font-size: 12px;">
<div style="color: #166534;">+ Can check app health</div>
<div style="color: #166534;">+ Validates HTTP stack</div>
<div style="color: #991b1b;">- Slower than TCP</div>
</div>
</div>

<div style="background: #f3e8ff; border: 2px solid #a855f7; border-radius: 12px; padding: 20px;">
<h5 style="color: #7c3aed; margin: 0 0 12px 0;">Deep Health Check</h5>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">
  Application checks dependencies (DB, cache, external APIs).
</div>
<div style="background: white; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 11px;">
<div style="color: #7c3aed;">GET /health/deep</div>
<div style="color: #166534; margin-top: 8px;">{"status": "healthy",</div>
<div style="color: #166534;"> "db": "connected",</div>
<div style="color: #166534;"> "redis": "connected",</div>
<div style="color: #166534;"> "latency_ms": 12}</div>
</div>
<div style="margin-top: 12px; font-size: 12px;">
<div style="color: #166534;">+ Detects dependency failures</div>
<div style="color: #166534;">+ Can include latency metrics</div>
<div style="color: #991b1b;">- Expensive to run frequently</div>
</div>
</div>
</div>
</div>

### Health Check Configuration

<div style="background: #fff7ed; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #92400e; margin-top: 0;">Critical Configuration Parameters</h4>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
<div style="background: white; padding: 16px; border-radius: 8px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<span style="background: #3b82f6; color: white; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600;">interval</span>
<span style="color: #1e293b; font-weight: 600;">= 5s</span>
</div>
<div style="color: #475569; font-size: 13px;">
  Time between health checks. Too short = overhead. Too long = slow detection.
<div style="margin-top: 8px; padding: 8px; background: #f0fdf4; border-radius: 4px;">
<span style="color: #166534; font-weight: 600;">**Trade-off:**</span> 5s interval means up to 5s of traffic to failing server before detection.
</div>
</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<span style="background: #ef4444; color: white; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600;">unhealthy_threshold</span>
<span style="color: #1e293b; font-weight: 600;">= 3</span>
</div>
<div style="color: #475569; font-size: 13px;">
  Consecutive failures before marking unhealthy. Prevents flapping from transient failures.
<div style="margin-top: 8px; padding: 8px; background: #fef2f2; border-radius: 4px;">
<span style="color: #991b1b;">Detection time = interval × threshold = 15s</span>
</div>
</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<span style="background: #22c55e; color: white; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600;">healthy_threshold</span>
<span style="color: #1e293b; font-weight: 600;">= 2</span>
</div>
<div style="color: #475569; font-size: 13px;">
  Consecutive successes before marking healthy again. Prevents thundering herd on recovery.
<div style="margin-top: 8px; padding: 8px; background: #f0fdf4; border-radius: 4px;">
<span style="color: #166534;">Recovery time = interval × threshold = 10s</span>
</div>
</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<span style="background: #f59e0b; color: white; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600;">timeout</span>
<span style="color: #1e293b; font-weight: 600;">= 2s</span>
</div>
<div style="color: #475569; font-size: 13px;">
  Max time to wait for health check response. Must be less than interval.
<div style="margin-top: 8px; padding: 8px; background: #fef3c7; border-radius: 4px;">
<span style="color: #92400e;">Timeout counts as failure toward threshold.</span>
</div>
</div>
</div>
</div>
</div>

### Health Check Edge Cases

<div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #991b1b; margin-top: 0;">Critical Health Check Failures</h4>

<div style="display: grid; gap: 16px;">
<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
<strong style="color: #991b1b;">Flapping Servers</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Server oscillates between healthy/unhealthy, causing traffic shifts. <strong>Solution:</strong> Increase thresholds, add exponential backoff before re-adding, investigate root cause (memory pressure, GC pauses).</p>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
<strong style="color: #991b1b;">Health Check Passing But App Failing</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Basic `/health` returns 200 but app is returning 500s for real requests. <strong>Solution:</strong> Deep health checks that test actual functionality. Include database queries, cache reads, external API calls in health endpoint. Related: [[circuit-breaker]](/topic/system-design/circuit-breaker) for detecting runtime failures.</p>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
<strong style="color: #991b1b;">Cascading Health Check Failures</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Database goes down, all servers fail deep health checks simultaneously. <strong>Solution:</strong> Separate liveness (is process running?) from readiness (can handle traffic?). Don't kill pods for dependency failures. Use [[circuit-breaker]](/topic/system-design/circuit-breaker) to degrade gracefully.</p>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
<strong style="color: #991b1b;">Health Check Endpoint Crashes App</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Expensive health check under load causes server to become unresponsive. <strong>Solution:</strong> Keep health endpoint cheap. Cache dependency check results. Use separate lightweight liveness endpoint.</p>
</div>
</div>
</div>

### Health Check Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: What types of health checks should a load balancer perform?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Load balancers typically perform three types of health checks: (1) <strong>TCP checks</strong> - verify the port is accepting connections, (2) <strong>HTTP checks</strong> - verify the application returns expected status code (usually 200), and (3) <strong>Deep/Custom checks</strong> - verify the application can perform its function (database connectivity, cache access). TCP is fastest but least informative; deep checks are most thorough but expensive.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you balance between fast failure detection and avoiding false positives?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> This is tuned through the interval and threshold parameters. Shorter intervals detect failures faster but increase load and network traffic. Higher failure thresholds prevent marking servers unhealthy due to transient issues (network hiccup, GC pause) but slow detection of real failures. <span style="color: #166534; font-weight: 600;">**Trade-off:**</span> A common configuration is 5s interval with 3 failure threshold (15s detection) and 2 success threshold (10s recovery). For critical low-latency systems, consider 2s interval with 2 failure threshold (4s detection) but monitor for flapping. Also implement passive health checking - if real requests are failing, mark unhealthy immediately without waiting for active checks.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: Your system has 1000 servers and health checks are causing network congestion. How do you scale health checking?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> Several strategies: (1) <strong>Hierarchical health checking:</strong> Instead of central LB checking all servers, use regional health aggregators that report to the LB. Each aggregator checks 50-100 servers. (2) <strong>Push-based health:</strong> Servers push their health status to a central registry (Consul, etcd). LB watches registry instead of polling all servers. (3) <strong>Sampling:</strong> For homogeneous server pools, check a random sample (10-20%) and assume others in same state. If sample shows failures, expand checking. (4) <strong>Staggered intervals:</strong> Randomize check timing to avoid synchronous health check storms. (5) <strong>Passive health:</strong> Track success/failure of real requests; use active checks only for servers not receiving traffic. (6) <strong>Connection reuse:</strong> Keep persistent connections to servers for health checks instead of new TCP handshake each time. <span style="color: #166534; font-weight: 600;">**Assumption:**</span> This assumes servers are relatively homogeneous. If servers have different criticality, implement tiered checking - critical servers get frequent checks, others get infrequent. Related: [[microservices]](/topic/system-design/microservices) service discovery patterns.</p>
</div>
</div>
</div>

---

## Section 4: Session Persistence (Sticky Sessions)

### Deep Mechanics

Session persistence ensures that requests from the same client are routed to the same backend server. This is necessary when servers maintain client state that isn't shared across the cluster.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Sticky Session Mechanisms</h4>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 20px;">
<h5 style="color: #1e40af; margin: 0 0 12px 0;">Cookie-Based</h5>
<div style="background: white; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 11px; margin-bottom: 12px;">
<div style="color: #64748b;">Response Header:</div>
<div style="color: #1e40af;">Set-Cookie: SERVERID=srv1;</div>
<div style="color: #1e40af;">  Path=/; HttpOnly</div>
<div style="color: #64748b; margin-top: 8px;">Subsequent Request:</div>
<div style="color: #166534;">Cookie: SERVERID=srv1</div>
</div>
<div style="font-size: 12px;">
<div style="color: #166534;">+ Most reliable</div>
<div style="color: #166534;">+ Survives IP changes</div>
<div style="color: #991b1b;">- Requires cookie support</div>
<div style="color: #991b1b;">- Cookie size limits</div>
</div>
</div>

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 20px;">
<h5 style="color: #166534; margin: 0 0 12px 0;">IP-Based (Source Hash)</h5>
<div style="background: white; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 11px; margin-bottom: 12px;">
<div style="color: #64748b;">Algorithm:</div>
<div style="color: #166534;">hash(client_ip) % num_servers</div>
<div style="color: #64748b; margin-top: 8px;">Example:</div>
<div style="color: #166534;">192.168.1.100 --> Server 2</div>
<div style="color: #166534;">192.168.1.100 --> Server 2</div>
</div>
<div style="font-size: 12px;">
<div style="color: #166534;">+ No cookies needed</div>
<div style="color: #166534;">+ Works for non-HTTP</div>
<div style="color: #991b1b;">- NAT breaks stickiness</div>
<div style="color: #991b1b;">- Mobile IP changes</div>
</div>
</div>

<div style="background: #f3e8ff; border: 2px solid #a855f7; border-radius: 12px; padding: 20px;">
<h5 style="color: #7c3aed; margin: 0 0 12px 0;">Application-Generated</h5>
<div style="background: white; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 11px; margin-bottom: 12px;">
<div style="color: #64748b;">URL Parameter:</div>
<div style="color: #7c3aed;">/checkout?sid=abc123</div>
<div style="color: #64748b; margin-top: 8px;">LB Route Table:</div>
<div style="color: #7c3aed;">abc123 --> Server 3</div>
</div>
<div style="font-size: 12px;">
<div style="color: #166534;">+ Full control</div>
<div style="color: #166534;">+ Can encode metadata</div>
<div style="color: #991b1b;">- Requires app changes</div>
<div style="color: #991b1b;">- URL leakage risk</div>
</div>
</div>
</div>
</div>

### Problems with Sticky Sessions

<div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #991b1b; margin-top: 0;">Why Sticky Sessions Are Problematic</h4>

<div style="display: grid; gap: 16px;">
<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
<strong style="color: #991b1b;">Uneven Load Distribution</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Power users with many requests all go to same server. One "whale" customer can overload a server while others sit idle. Load balancing benefits are negated.</p>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
<strong style="color: #991b1b;">Session Loss on Server Failure</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">When sticky server dies, all its sessions are lost. Users experience errors or must re-authenticate. Defeats the purpose of having multiple servers for reliability.</p>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
<strong style="color: #991b1b;">Scaling Difficulties</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Adding new servers doesn't help existing sessions. Removing servers requires draining connections or breaking sessions. Auto-scaling becomes complex.</p>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
<strong style="color: #991b1b;">Deployment Complexity</strong>
<p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Rolling deployments must wait for sessions to drain. Blue-green deployments break existing sessions. Cannot quickly rollback if sessions are tied to new version.</p>
</div>
</div>
</div>

### Better Alternative: Externalized Session State

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #166534; margin-top: 0;">Externalized Session Architecture</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">
<div style="display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap;">
<div style="background: #dbeafe; padding: 16px 24px; border-radius: 10px; text-align: center; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 600;">Client</div>
<div style="color: #64748b; font-size: 11px;">Session ID in cookie</div>
</div>

<div style="color: #22c55e; font-size: 20px;">---></div>

<div style="background: #fef3c7; padding: 16px 24px; border-radius: 10px; text-align: center; border: 2px solid #f59e0b;">
<div style="color: #92400e; font-weight: 600;">Load Balancer</div>
<div style="color: #64748b; font-size: 11px;">Any algorithm (no stickiness)</div>
</div>

<div style="color: #22c55e; font-size: 20px;">---></div>

<div style="background: #dcfce7; padding: 16px 24px; border-radius: 10px; text-align: center; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 600;">Any Server</div>
<div style="color: #64748b; font-size: 11px;">Stateless application</div>
</div>
</div>

<div style="display: flex; justify-content: center;">
<div style="color: #22c55e; font-size: 20px;">|</div>
</div>

<div style="display: flex; justify-content: center;">
<div style="background: #fee2e2; padding: 16px 32px; border-radius: 10px; text-align: center; border: 2px solid #ef4444;">
<div style="color: #991b1b; font-weight: 600;">Redis/Memcached</div>
<div style="color: #64748b; font-size: 11px;">Shared session store</div>
</div>
</div>
</div>

<div style="margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: white; padding: 16px; border-radius: 8px;">
<strong style="color: #166534;">Benefits:</strong>
<ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
<li>Any server can handle any request</li>
<li>Server failures don't lose sessions</li>
<li>True horizontal scaling</li>
<li>Zero-downtime deployments</li>
</ul>
</div>
<div style="background: white; padding: 16px; border-radius: 8px;">
<strong style="color: #166534;">Implementation:</strong>
<ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
<li>Store sessions in [[Redis]](/topic/system-design/caching) with TTL</li>
<li>Use Redis Cluster for HA</li>
<li>Encrypt sensitive session data</li>
<li>Consider JWT for truly stateless auth</li>
</ul>
</div>
</div>
</div>

### Session Persistence Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: What is session persistence in load balancing and when is it needed?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Session persistence (sticky sessions) ensures requests from the same client always go to the same backend server. It's needed when servers maintain client-specific state that isn't shared, such as shopping carts in memory, file upload progress, or WebSocket connections. Without persistence, users could lose their state when routed to a different server.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you handle sticky sessions when the target server becomes unhealthy?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> When a sticky server fails, there are several strategies: (1) <strong>Fail to another server:</strong> Route to next server in pool; session state is lost but user can re-authenticate. (2) <strong>Session replication:</strong> Synchronously replicate sessions to backup server; expensive but preserves state. (3) <strong>External session store:</strong> Store sessions in Redis/database; any server can retrieve. (4) <strong>Client-side sessions:</strong> Encode session in encrypted cookie (JWT pattern); server is truly stateless. <span style="color: #166534; font-weight: 600;">**Trade-off:**</span> Session replication adds latency to every write. External stores add network hop but provide best reliability. Client-side sessions have size limits and can't be revoked server-side. Most modern systems use external stores + JWT for authentication tokens.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: You're migrating a legacy application with in-memory sessions to Kubernetes. How do you handle session persistence during the transition?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> This requires a phased migration: (1) <strong>Phase 1 - External session store:</strong> Add Redis session storage alongside in-memory. Configure app to write to both, read from external first, fallback to local. This is "write-through" dual-write pattern. (2) <strong>Phase 2 - Sticky sessions with backup:</strong> Configure K8s Ingress for cookie-based sticky sessions. If pod dies, traffic goes to another pod which reads from Redis. Users don't notice pod restarts. (3) <strong>Phase 3 - Remove local sessions:</strong> Once confident in Redis reliability, remove in-memory session code. Now pods are stateless. (4) <strong>Phase 4 - Remove sticky sessions:</strong> With truly stateless pods, disable sticky sessions for better load distribution. <span style="color: #166534; font-weight: 600;">**Assumption:**</span> This assumes you can modify application code. If not, consider sidecar pattern - run Redis session proxy as sidecar that intercepts session calls. For K8s specifically, use StatefulSets during transition if pods need stable identity, then migrate to Deployments when stateless. Monitor session Redis carefully - it becomes a critical dependency. See [[database-replication]](/topic/system-design/database-replication) for Redis HA patterns.</p>
</div>
</div>
</div>

---

## Section 5: Connection Draining and Graceful Shutdown

### Deep Mechanics

Connection draining allows in-flight requests to complete before a server is removed from the pool, preventing request failures during deployments or scale-down events.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Connection Draining Timeline</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #3b82f6; color: white; min-width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">1</div>
<div style="flex: 1; background: #eff6ff; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
<strong style="color: #1e40af;">Drain Initiated</strong>
<div style="color: #475569; font-size: 13px; margin-top: 4px;">Server marked for removal. Load balancer stops sending NEW requests.</div>
</div>
<div style="color: #64748b; font-size: 12px; min-width: 60px;">t=0s</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f59e0b; color: white; min-width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">2</div>
<div style="flex: 1; background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b;">
<strong style="color: #92400e;">Draining</strong>
<div style="color: #475569; font-size: 13px; margin-top: 4px;">Existing connections continue processing. Server completes in-flight requests.</div>
</div>
<div style="color: #64748b; font-size: 12px; min-width: 60px;">t=0-30s</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #22c55e; color: white; min-width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">3</div>
<div style="flex: 1; background: #f0fdf4; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
<strong style="color: #166534;">Drained</strong>
<div style="color: #475569; font-size: 13px; margin-top: 4px;">All connections closed gracefully. Server safe to terminate.</div>
</div>
<div style="color: #64748b; font-size: 12px; min-width: 60px;">t=30s</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #ef4444; color: white; min-width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">4</div>
<div style="flex: 1; background: #fef2f2; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
<strong style="color: #991b1b;">Timeout (if not drained)</strong>
<div style="color: #475569; font-size: 13px; margin-top: 4px;">Force close remaining connections. Some requests may fail.</div>
</div>
<div style="color: #64748b; font-size: 12px; min-width: 60px;">t=60s</div>
</div>
</div>
</div>

---

## Common Pitfalls

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #fecaca;">
<h4 style="color: #991b1b; margin-top: 0;">Mistakes to Avoid</h4>
<div style="display: flex; flex-direction: column; gap: 12px; color: #1e293b;">
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>Single Load Balancer:</strong> Your LB becomes a single point of failure. Always deploy in pairs with failover. Use DNS failover or floating IP for LB high availability.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>No Health Checks:</strong> Without health checks, traffic routes to dead servers causing user errors. Implement both active (polling) and passive (track real request failures) health checking.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>Ignoring Connection Draining:</strong> Removing servers without draining connections drops active requests. Configure drain timeout to allow in-flight requests to complete.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>Wrong Algorithm Choice:</strong> Using round robin for WebSocket connections ignores server load entirely. Use least connections for long-lived connections.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>No Monitoring:</strong> Without metrics on latency and error rates, you cannot detect degradation. Monitor RED metrics (Rate, Errors, Duration) per backend server.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>Sticky Sessions Without Fallback:</strong> Sessions break when sticky server fails. Always have externalized session backup or accept session loss gracefully.
</div>
</div>
</div>

---

## Code Examples

### Go - Complete Load Balancer with Health Checks

```go
package main

import (
    "context"
    "net/http"
    "net/http/httputil"
    "net/url"
    "sync"
    "sync/atomic"
    "time"
)

// Server represents a backend server with health tracking
type Server struct {
    URL              *url.URL
    Alive            int32  // atomic bool: 1 = alive, 0 = dead
    ActiveConns      int64  // atomic counter
    ReverseProxy     *httputil.ReverseProxy
    Weight           int
    ConsecutiveFails int32  // atomic counter for health check failures
}

// IsAlive returns server health status atomically
func (s *Server) IsAlive() bool {
    return atomic.LoadInt32(&s.Alive) == 1
}

// SetAlive updates server health status atomically
func (s *Server) SetAlive(alive bool) {
    if alive {
        atomic.StoreInt32(&s.Alive, 1)
    } else {
        atomic.StoreInt32(&s.Alive, 0)
    }
}

// LoadBalancer implements various load balancing strategies
type LoadBalancer struct {
    servers         []*Server
    current         uint64  // for round robin
    mu              sync.RWMutex
    healthCheckURL  string
    strategy        string
}

// NewLoadBalancer creates a load balancer with the specified strategy
func NewLoadBalancer(serverURLs []string, strategy string) *LoadBalancer {
    lb := &LoadBalancer{
        healthCheckURL: "/health",
        strategy:       strategy,
    }

    for _, serverURL := range serverURLs {
        u, err := url.Parse(serverURL)
        if err != nil {
            continue
        }

        proxy := httputil.NewSingleHostReverseProxy(u)

        // Custom error handler for failover
        proxy.ErrorHandler = func(w http.ResponseWriter, r *http.Request, err error) {
            // Find and mark server as unhealthy
            for _, s := range lb.servers {
                if s.URL.String() == u.String() {
                    s.SetAlive(false)
                    break
                }
            }
            // Retry on another server
            lb.ServeHTTP(w, r)
        }

        lb.servers = append(lb.servers, &Server{
            URL:          u,
            Alive:        1,
            ReverseProxy: proxy,
            Weight:       1,
        })
    }

    return lb
}

// GetNextServer selects a server based on configured strategy
func (lb *LoadBalancer) GetNextServer() *Server {
    switch lb.strategy {
    case "least_connections":
        return lb.leastConnections()
    case "weighted_round_robin":
        return lb.weightedRoundRobin()
    default:
        return lb.roundRobin()
    }
}

// roundRobin cycles through servers sequentially
func (lb *LoadBalancer) roundRobin() *Server {
    serverCount := uint64(len(lb.servers))

    // Try all servers to find a healthy one
    for i := uint64(0); i < serverCount; i++ {
        next := atomic.AddUint64(&lb.current, 1)
        idx := next % serverCount

        if lb.servers[idx].IsAlive() {
            return lb.servers[idx]
        }
    }

    return nil
}

// leastConnections returns server with minimum active connections
func (lb *LoadBalancer) leastConnections() *Server {
    lb.mu.RLock()
    defer lb.mu.RUnlock()

    var selected *Server
    minConns := int64(^uint64(0) >> 1) // Max int64

    for _, server := range lb.servers {
        if server.IsAlive() {
            conns := atomic.LoadInt64(&server.ActiveConns)
            if conns < minConns {
                minConns = conns
                selected = server
            }
        }
    }

    return selected
}

// weightedRoundRobin implements smooth weighted round robin
func (lb *LoadBalancer) weightedRoundRobin() *Server {
    // Simplified: uses standard round robin with weight consideration
    // Full implementation would track effective weights
    return lb.roundRobin()
}

// ServeHTTP handles incoming requests
func (lb *LoadBalancer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    server := lb.GetNextServer()

    if server == nil {
        http.Error(w, "Service Unavailable", http.StatusServiceUnavailable)
        return
    }

    // Track connection count for least connections algorithm
    atomic.AddInt64(&server.ActiveConns, 1)
    defer atomic.AddInt64(&server.ActiveConns, -1)

    server.ReverseProxy.ServeHTTP(w, r)
}

// HealthCheck performs periodic health checks on all servers
func (lb *LoadBalancer) HealthCheck(ctx context.Context, interval time.Duration) {
    ticker := time.NewTicker(interval)
    defer ticker.Stop()

    for {
        select {
        case <-ctx.Done():
            return
        case <-ticker.C:
            lb.checkAllServers()
        }
    }
}

func (lb *LoadBalancer) checkAllServers() {
    for _, server := range lb.servers {
        go lb.checkServer(server)
    }
}

func (lb *LoadBalancer) checkServer(server *Server) {
    healthURL := server.URL.String() + lb.healthCheckURL

    client := &http.Client{
        Timeout: 2 * time.Second,
    }

    resp, err := client.Get(healthURL)

    if err != nil || resp.StatusCode != http.StatusOK {
        // Increment failure counter
        fails := atomic.AddInt32(&server.ConsecutiveFails, 1)

        // Mark unhealthy after 3 consecutive failures
        if fails >= 3 {
            server.SetAlive(false)
        }
    } else {
        // Reset failures and mark healthy
        atomic.StoreInt32(&server.ConsecutiveFails, 0)
        server.SetAlive(true)
    }

    if resp != nil {
        resp.Body.Close()
    }
}

func main() {
    lb := NewLoadBalancer([]string{
        "http://localhost:8081",
        "http://localhost:8082",
        "http://localhost:8083",
    }, "least_connections")

    // Start health checking
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()
    go lb.HealthCheck(ctx, 5*time.Second)

    // Start load balancer
    http.ListenAndServe(":8080", lb)
}
```

### Nginx Configuration - Production Load Balancing

```nginx
# Upstream configuration with health checks and load balancing
upstream api_backend {
    # Least connections algorithm
    least_conn;

    # Server pool with weights and health parameters
    server backend1.example.com:8080 weight=5 max_fails=3 fail_timeout=30s;
    server backend2.example.com:8080 weight=3 max_fails=3 fail_timeout=30s;
    server backend3.example.com:8080 weight=2 max_fails=3 fail_timeout=30s;

    # Backup server (only used when all primary servers are down)
    server backup.example.com:8080 backup;

    # Keep connections alive to reduce TCP handshake overhead
    keepalive 32;
    keepalive_timeout 60s;
}

# Upstream for WebSocket with consistent hashing
upstream websocket_backend {
    # Consistent hashing by client IP for session persistence
    hash $remote_addr consistent;

    server ws1.example.com:8080;
    server ws2.example.com:8080;
    server ws3.example.com:8080;
}

server {
    listen 80;
    listen 443 ssl http2;

    server_name api.example.com;

    # SSL configuration
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    # API endpoints
    location /api/ {
        proxy_pass http://api_backend;

        # HTTP/1.1 for keepalive
        proxy_http_version 1.1;
        proxy_set_header Connection "";

        # Forward client information
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_connect_timeout 5s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # Retry on failure (idempotent methods only)
        proxy_next_upstream error timeout http_502 http_503;
        proxy_next_upstream_tries 3;
        proxy_next_upstream_timeout 10s;
    }

    # WebSocket endpoints
    location /ws/ {
        proxy_pass http://websocket_backend;

        # WebSocket upgrade
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Longer timeouts for persistent connections
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }

    # Health check endpoint (for upstream health checks)
    location /health {
        access_log off;
        return 200 "OK\n";
        add_header Content-Type text/plain;
    }
}
```

---

## Best Practices

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #bbf7d0;">
<h4 style="color: #166534; margin-top: 0;">Production Checklist</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; color: #1e293b;">
<div>
<strong style="color: #166534;">High Availability</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Deploy load balancers in pairs (active-passive or active-active)</li>
<li>Use DNS failover or floating IP for LB redundancy</li>
<li>Distribute across availability zones</li>
</ul>
</div>
<div>
<strong style="color: #166534;">Health Checks</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Configure appropriate intervals (5-10s)</li>
<li>Set reasonable thresholds (2-3 failures)</li>
<li>Include deep health checks for dependencies</li>
</ul>
</div>
<div>
<strong style="color: #166534;">Connection Management</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Enable connection draining (30-60s timeout)</li>
<li>Use connection pooling with keepalive</li>
<li>Set appropriate timeouts per endpoint type</li>
</ul>
</div>
<div>
<strong style="color: #166534;">Monitoring</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Track RED metrics (Rate, Errors, Duration)</li>
<li>Monitor connection counts and queue depths</li>
<li>Alert on backend health state changes</li>
</ul>
</div>
<div>
<strong style="color: #166534;">Security</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Terminate TLS at load balancer</li>
<li>Re-encrypt for backend if required</li>
<li>Implement [[rate-limiting]](/topic/system-design/rate-limiting)</li>
</ul>
</div>
<div>
<strong style="color: #166534;">Scaling</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Externalize session state to [[Redis]](/topic/system-design/caching)</li>
<li>Use stateless backends when possible</li>
<li>Consider [[CDN]](/topic/system-design/cdn) for static content</li>
</ul>
</div>
</div>
</div>

---

## Related Topics

- [[API Gateway]](/topic/system-design/api-gateway) - Layer 7 routing with authentication and transformation
- [[Rate Limiting]](/topic/system-design/rate-limiting) - Protecting backends from overload
- [[Circuit Breaker]](/topic/system-design/circuit-breaker) - Failing fast when backends are unhealthy
- [[Caching]](/topic/system-design/caching) - Reducing backend load with Redis/Memcached
- [[CDN]](/topic/system-design/cdn) - Edge caching and global load distribution
- [[Database Sharding]](/topic/system-design/database-sharding) - Consistent hashing for data distribution
- [[Message Queues]](/topic/system-design/message-queues) - Asynchronous load handling
- [[Microservices]](/topic/system-design/microservices) - Service discovery and inter-service communication
