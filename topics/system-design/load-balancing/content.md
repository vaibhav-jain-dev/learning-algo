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

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">Round Robin Distribution</h3>

  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: rgba(88, 166, 255, 0.2); border: 1px solid #58a6ff; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center;">
        <span style="color: #58a6ff; font-size: 13px;">Request 1</span>
      </div>
      <div style="flex: 1; height: 2px; background: linear-gradient(90deg, #58a6ff, #238636);"></div>
      <span style="color: #58a6ff;">→</span>
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 8px 20px; border-radius: 6px;">
        <span style="color: white; font-weight: 600;">Server A</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: rgba(88, 166, 255, 0.2); border: 1px solid #58a6ff; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center;">
        <span style="color: #58a6ff; font-size: 13px;">Request 2</span>
      </div>
      <div style="flex: 1; height: 2px; background: linear-gradient(90deg, #58a6ff, #1f6feb);"></div>
      <span style="color: #58a6ff;">→</span>
      <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 8px 20px; border-radius: 6px;">
        <span style="color: white; font-weight: 600;">Server B</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: rgba(88, 166, 255, 0.2); border: 1px solid #58a6ff; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center;">
        <span style="color: #58a6ff; font-size: 13px;">Request 3</span>
      </div>
      <div style="flex: 1; height: 2px; background: linear-gradient(90deg, #58a6ff, #8957e5);"></div>
      <span style="color: #58a6ff;">→</span>
      <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 8px 20px; border-radius: 6px;">
        <span style="color: white; font-weight: 600;">Server C</span>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: rgba(240, 136, 62, 0.2); border: 1px solid #f0883e; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center;">
        <span style="color: #f0883e; font-size: 13px;">Request 4</span>
      </div>
      <div style="flex: 1; height: 2px; background: linear-gradient(90deg, #f0883e, #238636);"></div>
      <span style="color: #f0883e;">→</span>
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 8px 20px; border-radius: 6px;">
        <span style="color: white; font-weight: 600;">Server A</span>
      </div>
      <span style="color: #8b949e; font-size: 12px; font-style: italic;">(cycle repeats)</span>
    </div>
  </div>
</div>

**Pros**: Simple, even distribution
**Cons**: Doesn't consider server load or capacity

### 2. Weighted Round Robin

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Weighted Distribution</h3>
  <div style="color: #8b949e; text-align: center; margin-bottom: 24px; font-size: 14px;">A=3, B=2, C=1</div>

  <div style="display: flex; flex-direction: column; gap: 20px;">
    <!-- Server A -->
    <div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="color: #7ee787; font-weight: 600;">Server A (weight: 3)</span>
        <span style="color: #7ee787;">50% of traffic</span>
      </div>
      <div style="background: #21262d; border-radius: 8px; height: 24px; overflow: hidden;">
        <div style="background: linear-gradient(90deg, #238636, #2ea043); width: 100%; height: 100%; border-radius: 8px;"></div>
      </div>
    </div>

    <!-- Server B -->
    <div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="color: #58a6ff; font-weight: 600;">Server B (weight: 2)</span>
        <span style="color: #58a6ff;">33% of traffic</span>
      </div>
      <div style="background: #21262d; border-radius: 8px; height: 24px; overflow: hidden;">
        <div style="background: linear-gradient(90deg, #1f6feb, #388bfd); width: 66%; height: 100%; border-radius: 8px;"></div>
      </div>
    </div>

    <!-- Server C -->
    <div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="color: #a371f7; font-weight: 600;">Server C (weight: 1)</span>
        <span style="color: #a371f7;">17% of traffic</span>
      </div>
      <div style="background: #21262d; border-radius: 8px; height: 24px; overflow: hidden;">
        <div style="background: linear-gradient(90deg, #8957e5, #a371f7); width: 33%; height: 100%; border-radius: 8px;"></div>
      </div>
    </div>
  </div>
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

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">Consistent Hashing Ring</h3>

  <div style="display: flex; gap: 40px; align-items: flex-start; flex-wrap: wrap; justify-content: center;">
    <!-- Ring visualization -->
    <div style="position: relative; width: 200px; height: 200px;">
      <!-- Circle -->
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; border: 3px solid #30363d; border-radius: 50%;"></div>

      <!-- Degree markers -->
      <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); color: #8b949e; font-size: 12px;">0</div>
      <div style="position: absolute; top: 50%; right: -25px; transform: translateY(-50%); color: #8b949e; font-size: 12px;">90</div>
      <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); color: #8b949e; font-size: 12px;">180</div>
      <div style="position: absolute; top: 50%; left: -30px; transform: translateY(-50%); color: #8b949e; font-size: 12px;">270</div>

      <!-- Server nodes -->
      <div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); background: #238636; width: 12px; height: 12px; border-radius: 50%;"></div>
      <div style="position: absolute; top: 10px; left: 50%; transform: translateX(20px); color: #7ee787; font-size: 11px;">Server A</div>

      <div style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: #1f6feb; width: 12px; height: 12px; border-radius: 50%;"></div>
      <div style="position: absolute; top: 50%; right: -50px; transform: translateY(-50%); color: #58a6ff; font-size: 11px;">Server B</div>

      <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); background: #8957e5; width: 12px; height: 12px; border-radius: 50%;"></div>
      <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(20px); color: #a371f7; font-size: 11px;">Server C</div>

      <div style="position: absolute; top: 50%; left: 10px; transform: translateY(-50%); background: #f0883e; width: 12px; height: 12px; border-radius: 50%;"></div>
      <div style="position: absolute; top: 50%; left: -50px; transform: translateY(-50%); color: #f0883e; font-size: 11px;">Server D</div>
    </div>

    <!-- Key routing examples -->
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="background: rgba(88, 166, 255, 0.1); border: 1px solid rgba(88, 166, 255, 0.3); border-radius: 8px; padding: 12px 16px;">
        <div style="color: #c9d1d9; font-size: 13px;">Key <span style="color: #f0883e;">"user:123"</span> hashes to 45</div>
        <div style="color: #58a6ff; font-size: 13px; margin-top: 4px;">→ Routes to <span style="font-weight: 600;">Server B</span></div>
      </div>

      <div style="background: rgba(240, 136, 62, 0.1); border: 1px solid rgba(240, 136, 62, 0.3); border-radius: 8px; padding: 12px 16px;">
        <div style="color: #c9d1d9; font-size: 13px;">Key <span style="color: #a371f7;">"user:456"</span> hashes to 200</div>
        <div style="color: #f0883e; font-size: 13px; margin-top: 4px;">→ Routes to <span style="font-weight: 600;">Server D</span></div>
      </div>

      <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.3); border-radius: 8px; padding: 12px 16px;">
        <div style="color: #7ee787; font-weight: 600; font-size: 13px; margin-bottom: 4px;">When Server B removed:</div>
        <div style="color: #c9d1d9; font-size: 12px;">- Only keys between A and B move to C</div>
        <div style="color: #c9d1d9; font-size: 12px;">- Other keys stay put!</div>
      </div>
    </div>
  </div>
</div>

**Best for**: Distributed caches, databases - minimizes redistribution when nodes change

---

## Layer 4 vs Layer 7 Load Balancing

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">LAYER 4 vs LAYER 7 LOAD BALANCING</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <!-- Layer 4 -->
    <div style="background: rgba(31, 111, 235, 0.1); border: 1px solid rgba(31, 111, 235, 0.3); border-radius: 12px; padding: 20px;">
      <h4 style="color: #58a6ff; margin: 0 0 16px 0; font-size: 16px;">LAYER 4 (Transport)</h4>

      <div style="margin-bottom: 16px;">
        <div style="color: #c9d1d9; font-weight: 600; margin-bottom: 8px; font-size: 13px;">Routes based on:</div>
        <div style="color: #8b949e; font-size: 13px;">- IP address</div>
        <div style="color: #8b949e; font-size: 13px;">- TCP/UDP port</div>
      </div>

      <!-- TCP Packet visualization -->
      <div style="background: #21262d; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
        <div style="color: #8b949e; font-size: 12px; margin-bottom: 8px;">TCP Packet</div>
        <div style="background: rgba(126, 231, 135, 0.2); border: 1px solid #7ee787; padding: 6px 10px; border-radius: 4px; margin-bottom: 6px;">
          <span style="color: #7ee787; font-size: 12px;">IP:Port</span>
          <span style="color: #7ee787; font-size: 10px; margin-left: 8px;">← Looks here</span>
        </div>
        <div style="background: rgba(248, 81, 73, 0.2); border: 1px solid #f85149; padding: 6px 10px; border-radius: 4px;">
          <span style="color: #f85149; font-size: 12px;">Payload</span>
          <span style="color: #f85149; font-size: 10px; margin-left: 8px;">X Can't see</span>
        </div>
      </div>

      <div style="margin-bottom: 12px;">
        <div style="color: #8b949e; font-size: 12px;">Examples: AWS NLB, HAProxy TCP</div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
        <div>
          <div style="color: #7ee787; font-weight: 600; margin-bottom: 4px;">Pros:</div>
          <div style="color: #8b949e;">- Very fast</div>
          <div style="color: #8b949e;">- Low latency</div>
          <div style="color: #8b949e;">- Simple</div>
        </div>
        <div>
          <div style="color: #f85149; font-weight: 600; margin-bottom: 4px;">Cons:</div>
          <div style="color: #8b949e;">- No content inspection</div>
          <div style="color: #8b949e;">- Limited routing</div>
        </div>
      </div>
    </div>

    <!-- Layer 7 -->
    <div style="background: rgba(137, 87, 229, 0.1); border: 1px solid rgba(137, 87, 229, 0.3); border-radius: 12px; padding: 20px;">
      <h4 style="color: #a371f7; margin: 0 0 16px 0; font-size: 16px;">LAYER 7 (Application)</h4>

      <div style="margin-bottom: 16px;">
        <div style="color: #c9d1d9; font-weight: 600; margin-bottom: 8px; font-size: 13px;">Routes based on:</div>
        <div style="color: #8b949e; font-size: 13px;">- URL path, HTTP headers</div>
        <div style="color: #8b949e; font-size: 13px;">- Cookies, Request content</div>
      </div>

      <!-- HTTP Request visualization -->
      <div style="background: #21262d; border-radius: 8px; padding: 12px; margin-bottom: 16px; font-family: monospace; font-size: 11px;">
        <div style="color: #7ee787;">GET /api/users HTTP/1.1</div>
        <div style="color: #58a6ff;">Host: example.com</div>
        <div style="color: #f0883e;">Cookie: session=abc123</div>
        <div style="color: #8b949e; margin: 4px 0;">---</div>
        <div style="color: #a371f7;">{"user_id": 42}</div>
        <div style="color: #7ee787; font-size: 10px; margin-top: 6px;">↑ Looks at everything</div>
      </div>

      <div style="margin-bottom: 12px;">
        <div style="color: #8b949e; font-size: 12px;">Examples: AWS ALB, Nginx, HAProxy HTTP</div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
        <div>
          <div style="color: #7ee787; font-weight: 600; margin-bottom: 4px;">Pros:</div>
          <div style="color: #8b949e;">- Content-aware</div>
          <div style="color: #8b949e;">- SSL termination</div>
          <div style="color: #8b949e;">- A/B testing</div>
        </div>
        <div>
          <div style="color: #f85149; font-weight: 600; margin-bottom: 4px;">Cons:</div>
          <div style="color: #8b949e;">- Higher latency</div>
          <div style="color: #8b949e;">- More resources</div>
        </div>
      </div>
    </div>
  </div>
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

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">HEALTH CHECK FLOW</h3>

  <!-- Flow diagram -->
  <div style="display: flex; align-items: center; justify-content: center; gap: 24px; margin-bottom: 32px;">
    <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 16px 24px; border-radius: 10px; text-align: center;">
      <div style="color: white; font-weight: 600;">Load Balancer</div>
      <div style="color: rgba(255,255,255,0.7); font-size: 11px; margin-top: 4px;">Every 5s: GET /health</div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center;">
      <span style="color: #7ee787; font-size: 20px;">← → → →</span>
      <span style="color: #8b949e; font-size: 11px;">Response</span>
    </div>
    <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 16px 24px; border-radius: 10px; text-align: center;">
      <div style="color: white; font-weight: 600;">Server</div>
      <div style="color: rgba(255,255,255,0.7); font-size: 11px; margin-top: 4px;">Status</div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <!-- Health Check Types -->
    <div>
      <div style="color: #58a6ff; font-weight: 600; margin-bottom: 16px;">Health Check Types:</div>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="background: rgba(35, 134, 54, 0.1); border: 1px solid rgba(35, 134, 54, 0.3); border-radius: 8px; padding: 12px;">
          <div style="color: #7ee787; font-weight: 600; font-size: 13px;">1. TCP Check</div>
          <div style="color: #8b949e; font-size: 12px; margin-top: 4px;">→ Can establish TCP connection?</div>
          <div style="color: #7ee787; font-size: 12px; margin-left: 16px;">→ Yes = Healthy</div>
        </div>

        <div style="background: rgba(31, 111, 235, 0.1); border: 1px solid rgba(31, 111, 235, 0.3); border-radius: 8px; padding: 12px;">
          <div style="color: #58a6ff; font-weight: 600; font-size: 13px;">2. HTTP Check</div>
          <div style="color: #8b949e; font-size: 12px; margin-top: 4px;">→ Returns 2xx/3xx status?</div>
          <div style="color: #7ee787; font-size: 12px; margin-left: 16px;">→ GET /health → 200 OK = Healthy</div>
        </div>

        <div style="background: rgba(137, 87, 229, 0.1); border: 1px solid rgba(137, 87, 229, 0.3); border-radius: 8px; padding: 12px;">
          <div style="color: #a371f7; font-weight: 600; font-size: 13px;">3. Custom Check</div>
          <div style="color: #8b949e; font-size: 12px; margin-top: 4px;">→ Application-specific endpoint</div>
          <div style="color: #8b949e; font-size: 12px; margin-left: 16px;">→ Check DB, disk space, etc.</div>
        </div>
      </div>
    </div>

    <!-- Failure Handling -->
    <div>
      <div style="color: #f0883e; font-weight: 600; margin-bottom: 16px;">Failure Handling:</div>

      <div style="background: rgba(240, 136, 62, 0.1); border: 1px solid rgba(240, 136, 62, 0.3); border-radius: 8px; padding: 16px;">
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="background: #f85149; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600;">fail=3</span>
            <span style="color: #c9d1d9; font-size: 13px;">Mark unhealthy after 3 failed checks</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="background: #238636; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600;">rise=2</span>
            <span style="color: #c9d1d9; font-size: 13px;">Mark healthy after 2 successful checks</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="background: #1f6feb; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600;">interval=5s</span>
            <span style="color: #c9d1d9; font-size: 13px;">Check every 5 seconds</span>
          </div>
        </div>
      </div>
    </div>
  </div>
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
