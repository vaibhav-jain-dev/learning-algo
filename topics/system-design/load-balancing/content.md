# Load Balancing

## Overview

Load balancing is the process of distributing incoming network traffic across multiple servers to ensure no single server becomes overwhelmed. Think of it like a traffic officer directing cars at a busy intersection - without proper direction, all cars would pile up in one lane while others remain empty.

At its core, a load balancer sits between clients and servers, acting as a reverse proxy that decides which server should handle each incoming request. This simple concept enables some of the most critical capabilities in modern systems: high availability, horizontal scaling, and fault tolerance.

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

## How Load Balancing Works

### High-Level Architecture

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Load Balancer Architecture</h4>
<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
<div style="display: flex; gap: 12px;">
<div style="background: #dbeafe; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: 600;">Client 1</div>
</div>
<div style="background: #dbeafe; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: 600;">Client 2</div>
</div>
<div style="background: #dbeafe; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: 600;">Client 3</div>
</div>
</div>
<div style="color: #64748b; font-size: 24px;">|</div>
<div style="background: #fef3c7; padding: 20px 40px; border-radius: 12px; border: 2px solid #f59e0b;">
<div style="color: #92400e; font-weight: 700; text-align: center;">Load Balancer</div>
<div style="color: #78716c; font-size: 12px; text-align: center; margin-top: 4px;">Health Checks | Routing | SSL</div>
</div>
<div style="color: #64748b; font-size: 24px;">|</div>
<div style="display: flex; gap: 12px;">
<div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #166534; font-weight: 600;">Server 1</div>
<div style="color: #16a34a; font-size: 11px;">Healthy</div>
</div>
<div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #166534; font-weight: 600;">Server 2</div>
<div style="color: #16a34a; font-size: 11px;">Healthy</div>
</div>
<div style="background: #fee2e2; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #991b1b; font-weight: 600;">Server 3</div>
<div style="color: #dc2626; font-size: 11px;">Unhealthy</div>
</div>
</div>
</div>
</div>

### Types of Load Balancers

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
<table style="width: 100%; border-collapse: collapse;">
<tr style="background: #f1f5f9;">
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #cbd5e1;">Type</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #cbd5e1;">Examples</th>
<th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #cbd5e1;">Best For</th>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Hardware</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">F5 BIG-IP, Citrix ADC</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">High performance, enterprise</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Software</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">HAProxy, Nginx, Envoy</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Flexibility, cost-effective</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b;"><strong>Cloud</strong></td>
<td style="padding: 12px; color: #475569;">AWS ALB/NLB, GCP LB</td>
<td style="padding: 12px; color: #475569;">Managed, auto-scaling</td>
</tr>
</table>
</div>

---

## Load Balancing Algorithms

### Algorithm Comparison

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
<tr style="background: #f1f5f9;">
<th style="padding: 12px; text-align: left; color: #1e293b;">Algorithm</th>
<th style="padding: 12px; text-align: left; color: #1e293b;">How It Works</th>
<th style="padding: 12px; text-align: left; color: #1e293b;">Best For</th>
<th style="padding: 12px; text-align: left; color: #1e293b;">Drawback</th>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Round Robin</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Sequential distribution</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Equal capacity servers</td>
<td style="padding: 12px; color: #dc2626; border-bottom: 1px solid #e2e8f0;">Ignores server load</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Weighted Round Robin</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Based on server capacity</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Mixed capacity servers</td>
<td style="padding: 12px; color: #dc2626; border-bottom: 1px solid #e2e8f0;">Static weights</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Least Connections</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Fewest active connections</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Long-lived connections</td>
<td style="padding: 12px; color: #dc2626; border-bottom: 1px solid #e2e8f0;">More computation</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>IP Hash</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Hash of client IP</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Session persistence</td>
<td style="padding: 12px; color: #dc2626; border-bottom: 1px solid #e2e8f0;">Uneven if IPs cluster</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b;"><strong>Consistent Hashing</strong></td>
<td style="padding: 12px; color: #475569;">Minimal redistribution</td>
<td style="padding: 12px; color: #475569;">Distributed caches</td>
<td style="padding: 12px; color: #dc2626;">Complex setup</td>
</tr>
</table>
</div>

### Round Robin Visualization

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Round Robin Distribution</h4>
<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #dbeafe; border: 1px solid #3b82f6; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center;">
<span style="color: #1e40af; font-size: 13px;">Request 1</span>
</div>
<div style="flex: 1; height: 2px; background: linear-gradient(90deg, #3b82f6, #22c55e);"></div>
<div style="background: #dcfce7; padding: 8px 20px; border-radius: 6px; border: 1px solid #22c55e;">
<span style="color: #166534; font-weight: 600;">Server A</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #dbeafe; border: 1px solid #3b82f6; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center;">
<span style="color: #1e40af; font-size: 13px;">Request 2</span>
</div>
<div style="flex: 1; height: 2px; background: linear-gradient(90deg, #3b82f6, #3b82f6);"></div>
<div style="background: #dbeafe; padding: 8px 20px; border-radius: 6px; border: 1px solid #3b82f6;">
<span style="color: #1e40af; font-weight: 600;">Server B</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #dbeafe; border: 1px solid #3b82f6; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center;">
<span style="color: #1e40af; font-size: 13px;">Request 3</span>
</div>
<div style="flex: 1; height: 2px; background: linear-gradient(90deg, #3b82f6, #a855f7);"></div>
<div style="background: #f3e8ff; padding: 8px 20px; border-radius: 6px; border: 1px solid #a855f7;">
<span style="color: #7c3aed; font-weight: 600;">Server C</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center;">
<span style="color: #92400e; font-size: 13px;">Request 4</span>
</div>
<div style="flex: 1; height: 2px; background: linear-gradient(90deg, #f59e0b, #22c55e);"></div>
<div style="background: #dcfce7; padding: 8px 20px; border-radius: 6px; border: 1px solid #22c55e;">
<span style="color: #166534; font-weight: 600;">Server A</span>
</div>
<span style="color: #64748b; font-size: 12px; font-style: italic;">(cycle repeats)</span>
</div>
</div>
</div>

### Consistent Hashing

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Consistent Hashing Ring</h4>
<div style="display: flex; gap: 40px; align-items: flex-start; flex-wrap: wrap; justify-content: center;">
<div style="position: relative; width: 200px; height: 200px;">
<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; border: 3px solid #cbd5e1; border-radius: 50%;"></div>
<div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); color: #64748b; font-size: 12px;">0</div>
<div style="position: absolute; top: 50%; right: -25px; transform: translateY(-50%); color: #64748b; font-size: 12px;">90</div>
<div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); color: #64748b; font-size: 12px;">180</div>
<div style="position: absolute; top: 50%; left: -30px; transform: translateY(-50%); color: #64748b; font-size: 12px;">270</div>
<div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); background: #22c55e; width: 12px; height: 12px; border-radius: 50%;"></div>
<div style="position: absolute; top: 10px; left: 50%; transform: translateX(20px); color: #166534; font-size: 11px;">Server A</div>
<div style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: #3b82f6; width: 12px; height: 12px; border-radius: 50%;"></div>
<div style="position: absolute; top: 50%; right: -50px; transform: translateY(-50%); color: #1e40af; font-size: 11px;">Server B</div>
<div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); background: #a855f7; width: 12px; height: 12px; border-radius: 50%;"></div>
<div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(20px); color: #7c3aed; font-size: 11px;">Server C</div>
</div>
<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 16px;">
<div style="color: #1e293b; font-size: 13px;">Key <span style="color: #ea580c;">"user:123"</span> hashes to 45</div>
<div style="color: #1e40af; font-size: 13px; margin-top: 4px;">Routes to <span style="font-weight: 600;">Server B</span></div>
</div>
<div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px;">
<div style="color: #166534; font-weight: 600; font-size: 13px;">When Server B removed:</div>
<div style="color: #1e293b; font-size: 12px; margin-top: 4px;">Only keys between A and B move to C</div>
<div style="color: #1e293b; font-size: 12px;">Other keys stay put!</div>
</div>
</div>
</div>
</div>

---

## Layer 4 vs Layer 7 Load Balancing

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Layer 4 vs Layer 7 Comparison</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 20px;">
<h5 style="color: #1e40af; margin: 0 0 16px 0;">Layer 4 (Transport)</h5>
<div style="margin-bottom: 16px;">
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px; font-size: 13px;">Routes based on:</div>
<div style="color: #475569; font-size: 13px;">- IP address</div>
<div style="color: #475569; font-size: 13px;">- TCP/UDP port</div>
</div>
<div style="background: #f8fafc; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
<div style="color: #64748b; font-size: 12px; margin-bottom: 8px;">TCP Packet:</div>
<div style="background: #dcfce7; border: 1px solid #22c55e; padding: 6px 10px; border-radius: 4px; margin-bottom: 6px;">
<span style="color: #166534; font-size: 12px;">IP:Port - Looks here</span>
</div>
<div style="background: #fee2e2; border: 1px solid #ef4444; padding: 6px 10px; border-radius: 4px;">
<span style="color: #991b1b; font-size: 12px;">Payload - Cannot see</span>
</div>
</div>
<div style="color: #64748b; font-size: 12px; margin-bottom: 12px;">Examples: AWS NLB, HAProxy TCP</div>
<div style="font-size: 12px;">
<div style="color: #166534; margin-bottom: 4px;">+ Very fast, low latency</div>
<div style="color: #991b1b;">- No content inspection</div>
</div>
</div>
<div style="background: #f3e8ff; border: 1px solid #d8b4fe; border-radius: 12px; padding: 20px;">
<h5 style="color: #7c3aed; margin: 0 0 16px 0;">Layer 7 (Application)</h5>
<div style="margin-bottom: 16px;">
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px; font-size: 13px;">Routes based on:</div>
<div style="color: #475569; font-size: 13px;">- URL path, HTTP headers</div>
<div style="color: #475569; font-size: 13px;">- Cookies, Request content</div>
</div>
<div style="background: #f8fafc; border-radius: 8px; padding: 12px; margin-bottom: 16px; font-family: monospace; font-size: 11px;">
<div style="color: #166534;">GET /api/users HTTP/1.1</div>
<div style="color: #1e40af;">Host: example.com</div>
<div style="color: #ea580c;">Cookie: session=abc123</div>
<div style="color: #7c3aed;">{"user_id": 42}</div>
</div>
<div style="color: #64748b; font-size: 12px; margin-bottom: 12px;">Examples: AWS ALB, Nginx</div>
<div style="font-size: 12px;">
<div style="color: #166534; margin-bottom: 4px;">+ Content-aware routing</div>
<div style="color: #991b1b;">- Higher latency</div>
</div>
</div>
</div>
</div>

### Layer 7 Routing Example

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border: 1px solid #bbf7d0;">
<pre style="margin: 0; color: #166534; font-size: 14px;">
/api/*     --> API Servers (high CPU)
/static/*  --> CDN/Static Servers (high bandwidth)
/admin/*   --> Admin Servers (restricted access)
/ws/*      --> WebSocket Servers (persistent connections)
</pre>
</div>

---

## Health Checks

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Health Check Flow</h4>
<div style="display: flex; align-items: center; justify-content: center; gap: 24px; margin-bottom: 32px;">
<div style="background: #dbeafe; padding: 16px 24px; border-radius: 10px; text-align: center; border: 1px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 600;">Load Balancer</div>
<div style="color: #64748b; font-size: 11px; margin-top: 4px;">Every 5s: GET /health</div>
</div>
<div style="color: #22c55e; font-size: 20px;">----></div>
<div style="background: #dcfce7; padding: 16px 24px; border-radius: 10px; text-align: center; border: 1px solid #22c55e;">
<div style="color: #166534; font-weight: 600;">Server</div>
<div style="color: #64748b; font-size: 11px; margin-top: 4px;">Returns status</div>
</div>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<div style="color: #1e40af; font-weight: 600; margin-bottom: 16px;">Health Check Types:</div>
<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px;">
<div style="color: #166534; font-weight: 600; font-size: 13px;">1. TCP Check</div>
<div style="color: #475569; font-size: 12px; margin-top: 4px;">Can establish TCP connection? Yes = Healthy</div>
</div>
<div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px;">
<div style="color: #1e40af; font-weight: 600; font-size: 13px;">2. HTTP Check</div>
<div style="color: #475569; font-size: 12px; margin-top: 4px;">GET /health returns 200 OK = Healthy</div>
</div>
<div style="background: #f3e8ff; border: 1px solid #d8b4fe; border-radius: 8px; padding: 12px;">
<div style="color: #7c3aed; font-weight: 600; font-size: 13px;">3. Custom Check</div>
<div style="color: #475569; font-size: 12px; margin-top: 4px;">Application-specific (DB, disk space)</div>
</div>
</div>
</div>
<div>
<div style="color: #ea580c; font-weight: 600; margin-bottom: 16px;">Configuration:</div>
<div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 16px;">
<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="display: flex; align-items: center; gap: 12px;">
<span style="background: #ef4444; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600;">fail=3</span>
<span style="color: #1e293b; font-size: 13px;">Mark unhealthy after 3 failures</span>
</div>
<div style="display: flex; align-items: center; gap: 12px;">
<span style="background: #22c55e; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600;">rise=2</span>
<span style="color: #1e293b; font-size: 13px;">Mark healthy after 2 successes</span>
</div>
<div style="display: flex; align-items: center; gap: 12px;">
<span style="background: #3b82f6; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600;">interval=5s</span>
<span style="color: #1e293b; font-size: 13px;">Check every 5 seconds</span>
</div>
</div>
</div>
</div>
</div>
</div>

---

## Session Persistence (Sticky Sessions)

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
<tr style="background: #f1f5f9;">
<th style="padding: 12px; text-align: left; color: #1e293b;">Method</th>
<th style="padding: 12px; text-align: left; color: #1e293b;">How It Works</th>
<th style="padding: 12px; text-align: left; color: #1e293b;">Pros</th>
<th style="padding: 12px; text-align: left; color: #1e293b;">Cons</th>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Cookie-based</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">LB sets SERVERID cookie</td>
<td style="padding: 12px; color: #166534; border-bottom: 1px solid #e2e8f0;">Most reliable</td>
<td style="padding: 12px; color: #dc2626; border-bottom: 1px solid #e2e8f0;">Requires cookies</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>IP-based</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Route by client IP</td>
<td style="padding: 12px; color: #166534; border-bottom: 1px solid #e2e8f0;">No cookies needed</td>
<td style="padding: 12px; color: #dc2626; border-bottom: 1px solid #e2e8f0;">NAT issues</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b;"><strong>Application</strong></td>
<td style="padding: 12px; color: #475569;">App manages session ID</td>
<td style="padding: 12px; color: #166534;">Full control</td>
<td style="padding: 12px; color: #dc2626;">More complex</td>
</tr>
</table>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<h5 style="color: #991b1b; margin: 0 0 8px 0;">Better Alternative: Externalize Sessions</h5>
<p style="color: #1e293b; margin: 0;">Store sessions in Redis/Memcached so any server can handle any request. This enables true horizontal scaling without sticky session problems.</p>
</div>

---

## Common Pitfalls

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #fecaca;">
<h4 style="color: #991b1b; margin-top: 0;">Mistakes to Avoid</h4>
<div style="display: flex; flex-direction: column; gap: 12px; color: #1e293b;">
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>Single Load Balancer:</strong> Your LB becomes a single point of failure. Always deploy in pairs with failover.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>No Health Checks:</strong> Without health checks, traffic routes to dead servers causing user errors.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>Ignoring Connection Draining:</strong> Removing servers without draining connections drops active requests.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>Wrong Algorithm Choice:</strong> Using round robin for WebSocket connections ignores server load entirely.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>No Monitoring:</strong> Without metrics on latency and error rates, you cannot detect degradation.
</div>
</div>
</div>

---

## Interview Questions

<div style="background: #f3e8ff; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #d8b4fe;">
<h4 style="color: #7c3aed; margin-top: 0;">Common Interview Questions</h4>
<div style="display: flex; flex-direction: column; gap: 16px; color: #1e293b;">

<div>
<strong>1. How would you design a load balancer for a global application?</strong>
<ul style="margin: 8px 0 0 0; color: #475569;">
<li>Use DNS-based load balancing (GeoDNS) for global distribution</li>
<li>Regional load balancers for local traffic distribution</li>
<li>Consider latency-based routing to nearest healthy region</li>
<li>Implement anycast for automatic failover</li>
</ul>
</div>

<div>
<strong>2. How do you handle session state with load balancing?</strong>
<ul style="margin: 8px 0 0 0; color: #475569;">
<li>Externalize sessions to Redis/Memcached (preferred)</li>
<li>Use sticky sessions via cookies or IP hash</li>
<li>Implement stateless architecture with JWT tokens</li>
<li>Store session in encrypted cookies client-side</li>
</ul>
</div>

<div>
<strong>3. What happens when a server fails during a request?</strong>
<ul style="margin: 8px 0 0 0; color: #475569;">
<li>Connection timeout triggers retry on another server</li>
<li>Implement circuit breakers to prevent cascade failures</li>
<li>Use idempotency keys for safe retries</li>
<li>Configure appropriate timeout values</li>
</ul>
</div>

<div>
<strong>4. How do you scale the load balancer itself?</strong>
<ul style="margin: 8px 0 0 0; color: #475569;">
<li>DNS round robin across multiple load balancers</li>
<li>Active-passive failover with health monitoring</li>
<li>Cloud managed load balancers auto-scale</li>
<li>Use anycast to distribute to nearest LB</li>
</ul>
</div>

</div>
</div>

---

## Code Examples

### Python - Round Robin Load Balancer

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

### Go - Least Connections Load Balancer

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
    URL          *url.URL
    Alive        bool
    Connections  int64
    mux          sync.RWMutex
    ReverseProxy *httputil.ReverseProxy
}

func (s *Server) IsAlive() bool {
    s.mux.RLock()
    defer s.mux.RUnlock()
    return s.Alive
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
    minConns := int64(^uint64(0) >> 1)

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

### Nginx Configuration

```nginx
upstream backend {
    least_conn;
    server backend1.example.com:8080 weight=3;
    server backend2.example.com:8080 weight=2;
    server backend3.example.com:8080 weight=1;

    keepalive 32;
}

server {
    listen 80;

    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;

        # Health check
        health_check interval=5s fails=3 passes=2;
    }
}
```

---

## Best Practices

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #bbf7d0;">
<h4 style="color: #166534; margin-top: 0;">Production Checklist</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; color: #1e293b;">
<div>
<strong style="color: #166534;">Health Checks</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Configure appropriate intervals</li>
<li>Set reasonable thresholds</li>
<li>Include deep health checks</li>
</ul>
</div>
<div>
<strong style="color: #166534;">Connection Draining</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Allow existing connections to complete</li>
<li>Set appropriate drain timeout</li>
</ul>
</div>
<div>
<strong style="color: #166534;">Monitoring</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Track latency percentiles</li>
<li>Monitor error rates</li>
<li>Alert on anomalies</li>
</ul>
</div>
<div>
<strong style="color: #166534;">SSL/TLS</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Terminate SSL at load balancer</li>
<li>Use modern cipher suites</li>
</ul>
</div>
</div>
</div>

---

## Related Topics

- [Caching](/topic/system-design/caching)
- [CDN](/topic/system-design/cdn)
- [Rate Limiting](/topic/system-design/rate-limiting)
- [Microservices](/topic/system-design/microservices)
