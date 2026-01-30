# Client-Server Model

## Overview

The <span style="color: #22c55e; font-weight: 600;">Client-Server Model</span> is the foundational architecture pattern for distributed computing. It divides computing tasks between <span style="color: #22c55e; font-weight: 600;">service providers (servers)</span> that host resources and <span style="color: #22c55e; font-weight: 600;">service requesters (clients)</span> that consume them. This simple yet powerful paradigm underpins virtually every internet application from web browsing to mobile apps to IoT devices.

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #3b82f6;">
<h4 style="color: #1e40af; margin-top: 0;">Why This Matters in Interviews</h4>
<div style="display: flex; flex-wrap: wrap; gap: 24px;">
<div style="flex: 1; min-width: 200px;">
<div style="color: #475569; font-size: 13px; margin-bottom: 8px;">Surface-level answer:</div>
<div style="color: #1e293b; font-size: 14px;">"Client sends requests, server responds"</div>
</div>
<div style="flex: 1; min-width: 200px;">
<div style="color: #475569; font-size: 13px; margin-bottom: 8px;">Interview-winning answer:</div>
<div style="color: #1e293b; font-size: 14px;">"Understanding the trade-offs between REST's statelessness enabling horizontal scaling versus WebSocket's persistent connections for real-time features, and when to use SSE for unidirectional server push"</div>
</div>
</div>
</div>

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 20px; font-weight: 600;">CLIENT-SERVER MODEL</h3>
<div style="display: flex; align-items: center; justify-content: center; gap: 40px; flex-wrap: wrap;">
<div style="text-align: center;">
<div style="background: #dcfce7; border: 2px solid #22c55e; width: 140px; height: 90px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px;">
<span style="color: #166534; font-weight: 700; font-size: 16px;">CLIENT</span>
</div>
<div style="color: #64748b; font-size: 12px;">Initiates requests</div>
<div style="color: #22c55e; font-size: 11px; margin-top: 4px;">Browser, Mobile App</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="color: #3b82f6; font-size: 14px;">Request --></div>
<div style="background: #f1f5f9; padding: 8px 16px; border-radius: 6px; border: 1px solid #e2e8f0;">
<span style="color: #64748b; font-size: 12px;">Network</span>
</div>
<div style="color: #22c55e; font-size: 14px;"><-- Response</div>
</div>
<div style="text-align: center;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; width: 140px; height: 90px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px;">
<span style="color: #1e40af; font-weight: 700; font-size: 16px;">SERVER</span>
</div>
<div style="color: #64748b; font-size: 12px;">Provides services</div>
<div style="color: #3b82f6; font-size: 11px; margin-top: 4px;">API, Database</div>
</div>
</div>
</div>

**The Simple Explanation**: Think of it like a restaurant. You (the client) make requests ("I'll have the pasta"), and the kitchen (the server) processes your request and returns what you asked for. The waiter is like the network - carrying messages back and forth. You don't need to know how to cook; the kitchen doesn't need to know who you are beyond your order.

---

## Why It Matters: Real Company Examples

The client-server model is so fundamental that every tech company uses it:

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">CLIENT-SERVER IN THE REAL WORLD</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
<div style="background: #ecfdf5; border-radius: 12px; padding: 20px; border-left: 4px solid #10b981;">
<div style="color: #065f46; font-weight: 700; margin-bottom: 8px;">Google Search</div>
<div style="color: #047857; font-size: 13px;">Your browser (client) sends a search query. Google's servers process billions of web pages and return ranked results in milliseconds.</div>
</div>
<div style="background: #eff6ff; border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; margin-bottom: 8px;">Instagram</div>
<div style="color: #1d4ed8; font-size: 13px;">Mobile app (thick client) stores images locally, communicates with servers for feed, likes, and comments. Servers handle storage and social graph.</div>
</div>
<div style="background: #fef3c7; border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: 700; margin-bottom: 8px;">Slack</div>
<div style="color: #b45309; font-size: 13px;">Desktop/mobile clients maintain WebSocket connections for real-time messaging. Servers coordinate message delivery across thousands of organizations.</div>
</div>
<div style="background: #f3e8ff; border-radius: 12px; padding: 20px; border-left: 4px solid #a855f7;">
<div style="color: #6b21a8; font-weight: 700; margin-bottom: 8px;">Stripe</div>
<div style="color: #7c3aed; font-size: 13px;">Your application (client) calls Stripe's API (server) to process payments. Stripe handles PCI compliance, fraud detection, and bank connections.</div>
</div>
</div>
</div>

---

## Request-Response Model Deep Dive

The <span style="color: #22c55e; font-weight: 600;">request-response model</span> is the fundamental interaction pattern in client-server architectures. Understanding its mechanics is crucial for designing performant, reliable systems.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 16px; font-weight: 600;">REQUEST-RESPONSE LIFECYCLE</h3>
<div style="display: flex; flex-direction: column; gap: 12px; max-width: 600px; margin: 0 auto;">
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #22c55e; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">1</div>
<div style="flex: 1; background: #f1f5f9; padding: 12px 16px; border-radius: 8px;">
<div style="color: #166534; font-weight: 600;">Client initiates request</div>
<div style="color: #64748b; font-size: 12px;">HTTP GET /api/users/123</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">2</div>
<div style="flex: 1; background: #f1f5f9; padding: 12px 16px; border-radius: 8px;">
<div style="color: #1e40af; font-weight: 600;">DNS resolves hostname</div>
<div style="color: #64748b; font-size: 12px;">api.example.com -> 93.184.216.34</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #a855f7; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">3</div>
<div style="flex: 1; background: #f1f5f9; padding: 12px 16px; border-radius: 8px;">
<div style="color: #6b21a8; font-weight: 600;">TCP connection established</div>
<div style="color: #64748b; font-size: 12px;">Three-way handshake (SYN, SYN-ACK, ACK)</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f59e0b; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">4</div>
<div style="flex: 1; background: #f1f5f9; padding: 12px 16px; border-radius: 8px;">
<div style="color: #92400e; font-weight: 600;">Server processes request</div>
<div style="color: #64748b; font-size: 12px;">Query database, apply business logic</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #ef4444; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">5</div>
<div style="flex: 1; background: #f1f5f9; padding: 12px 16px; border-radius: 8px;">
<div style="color: #dc2626; font-weight: 600;">Server sends response</div>
<div style="color: #64748b; font-size: 12px;">HTTP 200 OK + JSON payload</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #166534; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">6</div>
<div style="flex: 1; background: #dcfce7; padding: 12px 16px; border-radius: 8px;">
<div style="color: #166534; font-weight: 600;">Client processes response</div>
<div style="color: #15803d; font-size: 12px;">Display data to user</div>
</div>
</div>
</div>
</div>

### Latency Breakdown

Understanding where time is spent in a request helps optimize performance. See [[Latency and Throughput]](/topics/system-design/latency-throughput) for deeper analysis.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Request Latency Components</h4>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="display: flex; align-items: center; gap: 12px;">
<div style="width: 140px; font-size: 13px; color: #475569; font-weight: 500;">DNS Lookup</div>
<div style="background: #dbeafe; height: 24px; border-radius: 4px; width: 60px; display: flex; align-items: center; padding-left: 8px;">
<span style="color: #1e40af; font-size: 11px;">~50ms</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="width: 140px; font-size: 13px; color: #475569; font-weight: 500;">TCP Handshake</div>
<div style="background: #fce7f3; height: 24px; border-radius: 4px; width: 80px; display: flex; align-items: center; padding-left: 8px;">
<span style="color: #be185d; font-size: 11px;">~1 RTT</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="width: 140px; font-size: 13px; color: #475569; font-weight: 500;">TLS Handshake</div>
<div style="background: #fef3c7; height: 24px; border-radius: 4px; width: 100px; display: flex; align-items: center; padding-left: 8px;">
<span style="color: #b45309; font-size: 11px;">~2 RTT (TLS 1.2)</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="width: 140px; font-size: 13px; color: #475569; font-weight: 500;">Request Transfer</div>
<div style="background: #dcfce7; height: 24px; border-radius: 4px; width: 50px; display: flex; align-items: center; padding-left: 8px;">
<span style="color: #166534; font-size: 11px;">~10ms</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="width: 140px; font-size: 13px; color: #475569; font-weight: 500;">Server Processing</div>
<div style="background: #f3e8ff; height: 24px; border-radius: 4px; width: 120px; display: flex; align-items: center; padding-left: 8px;">
<span style="color: #7c3aed; font-size: 11px;">Variable (10-500ms)</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="width: 140px; font-size: 13px; color: #475569; font-weight: 500;">Response Transfer</div>
<div style="background: #fee2e2; height: 24px; border-radius: 4px; width: 80px; display: flex; align-items: center; padding-left: 8px;">
<span style="color: #dc2626; font-size: 11px;">Size dependent</span>
</div>
</div>
</div>
<div style="background: #f0fdf4; border-radius: 8px; padding: 12px; margin-top: 16px;">
<div style="color: #166534; font-size: 13px;"><strong>Optimization:</strong> HTTP/2 multiplexing, TLS 1.3 (1 RTT), connection pooling, and CDN caching reduce these costs significantly.</div>
</div>
</div>

### Request Methods and Semantics

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">HTTP Methods Deep Dive</h4>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
<div style="background: #dcfce7; border-radius: 8px; padding: 16px; border: 1px solid #22c55e;">
<div style="color: #166534; font-weight: 700; margin-bottom: 8px;">GET</div>
<div style="color: #15803d; font-size: 12px; margin-bottom: 8px;">Safe, Idempotent, Cacheable</div>
<div style="color: #166534; font-size: 11px; background: #f0fdf4; padding: 8px; border-radius: 4px;">Retrieve resource without side effects. Can be cached by browsers and CDNs.</div>
</div>
<div style="background: #dbeafe; border-radius: 8px; padding: 16px; border: 1px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; margin-bottom: 8px;">POST</div>
<div style="color: #1d4ed8; font-size: 12px; margin-bottom: 8px;">Not Safe, Not Idempotent</div>
<div style="color: #1e40af; font-size: 11px; background: #eff6ff; padding: 8px; border-radius: 4px;">Create new resources. Multiple calls create multiple resources.</div>
</div>
<div style="background: #fef3c7; border-radius: 8px; padding: 16px; border: 1px solid #f59e0b;">
<div style="color: #92400e; font-weight: 700; margin-bottom: 8px;">PUT</div>
<div style="color: #b45309; font-size: 12px; margin-bottom: 8px;">Not Safe, Idempotent</div>
<div style="color: #92400e; font-size: 11px; background: #fefce8; padding: 8px; border-radius: 4px;">Replace entire resource. Same request yields same result.</div>
</div>
<div style="background: #f3e8ff; border-radius: 8px; padding: 16px; border: 1px solid #a855f7;">
<div style="color: #6b21a8; font-weight: 700; margin-bottom: 8px;">PATCH</div>
<div style="color: #7c3aed; font-size: 12px; margin-bottom: 8px;">Not Safe, Not Idempotent*</div>
<div style="color: #6b21a8; font-size: 11px; background: #faf5ff; padding: 8px; border-radius: 4px;">Partial update. Semantics depend on implementation.</div>
</div>
<div style="background: #fee2e2; border-radius: 8px; padding: 16px; border: 1px solid #ef4444;">
<div style="color: #dc2626; font-weight: 700; margin-bottom: 8px;">DELETE</div>
<div style="color: #b91c1c; font-size: 12px; margin-bottom: 8px;">Not Safe, Idempotent</div>
<div style="color: #dc2626; font-size: 11px; background: #fef2f2; padding: 8px; border-radius: 4px;">Remove resource. Deleting twice should not fail.</div>
</div>
</div>
</div>

---

## Client Types

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">CLIENT TYPES</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;">
<div style="background: #dcfce7; border-radius: 12px; padding: 20px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 700; margin-bottom: 12px;">Thin Client</div>
<div style="color: #15803d; font-size: 13px; margin-bottom: 12px;">Minimal processing, relies on server for most logic</div>
<div style="background: #f0fdf4; border-radius: 6px; padding: 12px;">
<div style="color: #166534; font-size: 12px; font-weight: 600;">Examples:</div>
<ul style="color: #15803d; font-size: 11px; margin: 4px 0 0 0; padding-left: 16px;">
<li>Traditional web browsers</li>
<li>Terminal clients</li>
<li>Streaming devices</li>
</ul>
</div>
</div>
<div style="background: #dbeafe; border-radius: 12px; padding: 20px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; margin-bottom: 12px;">Thick Client</div>
<div style="color: #1d4ed8; font-size: 13px; margin-bottom: 12px;">Significant local processing and storage capabilities</div>
<div style="background: #eff6ff; border-radius: 6px; padding: 12px;">
<div style="color: #1e40af; font-size: 12px; font-weight: 600;">Examples:</div>
<ul style="color: #1d4ed8; font-size: 11px; margin: 4px 0 0 0; padding-left: 16px;">
<li>Desktop applications</li>
<li>Mobile apps (offline-capable)</li>
<li>Gaming clients</li>
</ul>
</div>
</div>
<div style="background: #fef3c7; border-radius: 12px; padding: 20px; border: 2px solid #f59e0b;">
<div style="color: #92400e; font-weight: 700; margin-bottom: 12px;">Hybrid Client (SPA)</div>
<div style="color: #b45309; font-size: 13px; margin-bottom: 12px;">Best of both worlds - rich UI with server data</div>
<div style="background: #fefce8; border-radius: 6px; padding: 12px;">
<div style="color: #92400e; font-size: 12px; font-weight: 600;">Examples:</div>
<ul style="color: #b45309; font-size: 11px; margin: 4px 0 0 0; padding-left: 16px;">
<li>React/Vue applications</li>
<li>Progressive Web Apps</li>
<li>Electron apps</li>
</ul>
</div>
</div>
</div>
</div>

---

## Server Types and Multi-Tier Architecture

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">THREE-TIER ARCHITECTURE</h3>
<div style="display: flex; flex-direction: column; gap: 16px; max-width: 500px; margin: 0 auto;">
<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; padding: 20px; text-align: center;">
<div style="color: #166534; font-weight: 700; font-size: 16px;">PRESENTATION TIER</div>
<div style="color: #15803d; font-size: 12px; margin-top: 8px;">Client Interface (Browser, Mobile App)</div>
<div style="color: #22c55e; font-size: 11px; margin-top: 4px;">HTML, CSS, JavaScript, React, Flutter</div>
</div>
<div style="text-align: center; color: #64748b; font-size: 14px;">HTTP / HTTPS</div>
<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; padding: 20px; text-align: center;">
<div style="color: #1e40af; font-weight: 700; font-size: 16px;">APPLICATION TIER</div>
<div style="color: #1d4ed8; font-size: 12px; margin-top: 8px;">Business Logic (API Server)</div>
<div style="color: #3b82f6; font-size: 11px; margin-top: 4px;">Node.js, Python, Java, Go</div>
</div>
<div style="text-align: center; color: #64748b; font-size: 14px;">SQL / Internal APIs</div>
<div style="background: #f3e8ff; border: 2px solid #a855f7; border-radius: 12px; padding: 20px; text-align: center;">
<div style="color: #6b21a8; font-weight: 700; font-size: 16px;">DATA TIER</div>
<div style="color: #7c3aed; font-size: 12px; margin-top: 8px;">Data Storage (Database)</div>
<div style="color: #a855f7; font-size: 11px; margin-top: 4px;">PostgreSQL, MongoDB, Redis</div>
</div>
</div>
</div>

### Benefits of Multi-Tier Architecture

| Benefit | Description |
|---------|-------------|
| **Separation of concerns** | Each tier has specific responsibility |
| **Independent scaling** | Scale each tier based on demand |
| **Security** | Database not directly exposed to internet |
| **Maintainability** | Update one tier without affecting others |
| **Technology flexibility** | Use best tool for each tier |

---

## Stateless vs Stateful Servers

Understanding <span style="color: #22c55e; font-weight: 600;">stateless</span> vs <span style="color: #22c55e; font-weight: 600;">stateful</span> server design is crucial for building scalable systems. This directly impacts your ability to implement [[Load Balancing]](/topics/system-design/load-balancing) and horizontal scaling.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">STATELESS vs STATEFUL</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
<div style="background: #dcfce7; border-radius: 12px; padding: 24px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 700; font-size: 16px; margin-bottom: 16px;">STATELESS SERVER (Recommended)</div>
<div style="color: #15803d; font-size: 13px; margin-bottom: 16px;">Each request contains all information needed. Server does not remember previous requests.</div>
<div style="background: #f0fdf4; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 12px; color: #166534; margin-bottom: 16px;">
        GET /api/orders<br>
        Authorization: Bearer eyJhbG...<br>
<span style="color: #15803d;"># Token contains user identity</span>
</div>
<div style="color: #166534; font-size: 13px;">
<div>+ Easy to scale horizontally</div>
  <div>+ Any server can handle any request</div>
    <div>+ Simple load balancing</div>
      <div>+ Better fault tolerance</div>
      </div>
    </div>
    <div style="background: #fef2f2; border-radius: 12px; padding: 24px; border: 2px solid #ef4444;">
    <div style="color: #dc2626; font-weight: 700; font-size: 16px; margin-bottom: 16px;">STATEFUL SERVER (Avoid)</div>
    <div style="color: #b91c1c; font-size: 13px; margin-bottom: 16px;">Server maintains session data between requests. Client must connect to same server.</div>
    <div style="background: #fef2f2; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 12px; color: #dc2626; margin-bottom: 16px;">
    GET /api/orders<br>
    Cookie: session_id=abc123<br>
    <span style="color: #b91c1c;"># Server looks up session</span>
  </div>
  <div style="color: #dc2626; font-size: 13px;">
  <div>- Harder to scale</div>
    <div>- Requires sticky sessions</div>
      <div>- Complex load balancing</div>
        <div>- Session replication needed</div>
        </div>
      </div>
    </div>
  </div>

  ### Critical Assumption

  <div style="background: #fffbeb; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <h4 style="color: #b45309; margin-top: 0;">When Stateful is Acceptable</h4>
  <div style="color: #1e293b;">
  Stateful servers are appropriate when: (1) <span style="color: #22c55e; font-weight: 600;">Connection state is inherent</span> to the protocol (WebSockets, gaming servers), (2) <span style="color: #22c55e; font-weight: 600;">Session affinity</span> provides significant performance benefits (in-memory caching of user data), or (3) <span style="color: #22c55e; font-weight: 600;">Coordination overhead</span> of external state stores exceeds the complexity of sticky sessions.
</div>
</div>

### Externalizing State

```python
# STATEFUL (Hard to scale)
class StatefulServer:
    def __init__(self):
        self.sessions = {}  # State stored in memory

    def handle_request(self, session_id, data):
        if session_id in self.sessions:
            return self.sessions[session_id]
        return None

# STATELESS (Easy to scale)
class StatelessServer:
    def __init__(self, redis_client):
        self.redis = redis_client  # External state store

    def handle_request(self, token, data):
        # Validate token (contains user info)
        user = jwt.decode(token)

        # Get any needed state from external store
        session = self.redis.get(f"session:{user.id}")

        return process_request(user, session, data)
```

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">
<h4 style="color: #166534; margin-top: 0;">State Externalization Strategies</h4>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 12px;">
<div>
  <div style="color: #166534; font-weight: 600; margin-bottom: 4px;">Redis/Memcached</div>
  <div style="color: #15803d; font-size: 13px;">Session storage, caching</div>
</div>
<div>
  <div style="color: #166534; font-weight: 600; margin-bottom: 4px;">JWT Tokens</div>
  <div style="color: #15803d; font-size: 13px;">Self-contained auth state</div>
</div>
<div>
  <div style="color: #166534; font-weight: 600; margin-bottom: 4px;">Database</div>
  <div style="color: #15803d; font-size: 13px;">Persistent state storage</div>
</div>
<div>
  <div style="color: #166534; font-weight: 600; margin-bottom: 4px;">Message Queues</div>
  <div style="color: #15803d; font-size: 13px;">Async state coordination</div>
</div>
</div>
</div>

---

## REST Architecture Deep Dive

<span style="color: #22c55e; font-weight: 600;">REST (Representational State Transfer)</span> is the dominant architectural style for web APIs. Understanding its constraints is essential for [[API Design]](/topics/system-design/api-design).

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">REST ARCHITECTURAL CONSTRAINTS</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
<div style="background: #dcfce7; border-radius: 12px; padding: 20px; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: 700; margin-bottom: 8px;">1. Client-Server Separation</div>
<div style="color: #15803d; font-size: 13px;">UI concerns separate from data storage. Enables independent evolution and improved scalability.</div>
</div>
<div style="background: #dbeafe; border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; margin-bottom: 8px;">2. Statelessness</div>
<div style="color: #1d4ed8; font-size: 13px;">Each request contains all context needed. No session state on server. Enables horizontal scaling.</div>
</div>
<div style="background: #fef3c7; border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: 700; margin-bottom: 8px;">3. Cacheability</div>
<div style="color: #b45309; font-size: 13px;">Responses must declare themselves cacheable or not. Enables CDNs and client caching.</div>
</div>
<div style="background: #f3e8ff; border-radius: 12px; padding: 20px; border-left: 4px solid #a855f7;">
<div style="color: #6b21a8; font-weight: 700; margin-bottom: 8px;">4. Uniform Interface</div>
<div style="color: #7c3aed; font-size: 13px;">Standardized resource identification, manipulation through representations, self-descriptive messages.</div>
</div>
<div style="background: #fee2e2; border-radius: 12px; padding: 20px; border-left: 4px solid #ef4444;">
<div style="color: #dc2626; font-weight: 700; margin-bottom: 8px;">5. Layered System</div>
<div style="color: #b91c1c; font-size: 13px;">Client cannot tell if connected directly to server or intermediary. Enables load balancers, proxies.</div>
</div>
<div style="background: #e0e7ff; border-radius: 12px; padding: 20px; border-left: 4px solid #6366f1;">
<div style="color: #4338ca; font-weight: 700; margin-bottom: 8px;">6. Code on Demand (Optional)</div>
<div style="color: #4f46e5; font-size: 13px;">Servers can extend client functionality by transferring executable code (JavaScript).</div>
</div>
</div>
</div>

### REST Maturity Model (Richardson)

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">REST Maturity Levels</h4>
<div style="display: flex; flex-direction: column; gap: 12px; max-width: 600px; margin: 0 auto;">
<div style="display: flex; align-items: stretch; gap: 16px;">
<div style="background: #fee2e2; width: 80px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #dc2626;">Level 0</div>
<div style="flex: 1; background: #fef2f2; padding: 16px; border-radius: 8px;">
<div style="color: #dc2626; font-weight: 600;">The Swamp of POX</div>
<div style="color: #7f1d1d; font-size: 12px;">Single endpoint, HTTP as transport only. POST /api with action in body.</div>
</div>
</div>
<div style="display: flex; align-items: stretch; gap: 16px;">
<div style="background: #fef3c7; width: 80px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #b45309;">Level 1</div>
<div style="flex: 1; background: #fefce8; padding: 16px; border-radius: 8px;">
<div style="color: #92400e; font-weight: 600;">Resources</div>
<div style="color: #78350f; font-size: 12px;">Individual resources with unique URIs. POST /users, POST /orders.</div>
</div>
</div>
<div style="display: flex; align-items: stretch; gap: 16px;">
<div style="background: #dbeafe; width: 80px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #1e40af;">Level 2</div>
<div style="flex: 1; background: #eff6ff; padding: 16px; border-radius: 8px;">
<div style="color: #1e40af; font-weight: 600;">HTTP Verbs</div>
<div style="color: #1e3a8a; font-size: 12px;">Proper use of GET, POST, PUT, DELETE. Status codes for responses.</div>
</div>
</div>
<div style="display: flex; align-items: stretch; gap: 16px;">
<div style="background: #dcfce7; width: 80px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #166534;">Level 3</div>
<div style="flex: 1; background: #f0fdf4; padding: 16px; border-radius: 8px;">
<div style="color: #166534; font-weight: 600;">Hypermedia Controls (HATEOAS)</div>
<div style="color: #14532d; font-size: 12px;">Responses include links to related actions. Self-documenting API.</div>
</div>
</div>
</div>
</div>

### REST API Example

```python
from flask import Flask, request, jsonify
from functools import wraps
import jwt

app = Flask(__name__)

# RESTful resource: Users
# Follows REST constraints: stateless, uniform interface, cacheable

@app.route('/api/v1/users', methods=['GET'])
def list_users():
    """GET collection - retrieve all users (paginated)"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)

    users = User.query.paginate(page=page, per_page=per_page)

    return jsonify({
        'data': [u.to_dict() for u in users.items],
        'meta': {
            'page': page,
            'per_page': per_page,
            'total': users.total,
            'pages': users.pages
        },
        'links': {
            'self': f'/api/v1/users?page={page}',
            'next': f'/api/v1/users?page={page+1}' if users.has_next else None,
            'prev': f'/api/v1/users?page={page-1}' if users.has_prev else None
        }
    }), 200, {'Cache-Control': 'private, max-age=60'}

@app.route('/api/v1/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """GET resource - retrieve single user"""
    user = User.query.get_or_404(user_id)

    response = jsonify({
        'data': user.to_dict(),
        'links': {
            'self': f'/api/v1/users/{user_id}',
            'orders': f'/api/v1/users/{user_id}/orders',
            'update': {'href': f'/api/v1/users/{user_id}', 'method': 'PUT'},
            'delete': {'href': f'/api/v1/users/{user_id}', 'method': 'DELETE'}
        }
    })
    response.headers['ETag'] = user.etag
    response.headers['Cache-Control'] = 'private, max-age=300'
    return response

@app.route('/api/v1/users', methods=['POST'])
def create_user():
    """POST collection - create new user"""
    data = request.get_json()

    user = User(
        name=data['name'],
        email=data['email']
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({
        'data': user.to_dict(),
        'links': {'self': f'/api/v1/users/{user.id}'}
    }), 201, {'Location': f'/api/v1/users/{user.id}'}

@app.route('/api/v1/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """PUT resource - replace entire user"""
    user = User.query.get_or_404(user_id)

    # Optimistic locking with ETag
    if_match = request.headers.get('If-Match')
    if if_match and if_match != user.etag:
        return jsonify({'error': 'Resource modified'}), 412

    data = request.get_json()
    user.name = data['name']
    user.email = data['email']
    db.session.commit()

    return jsonify({'data': user.to_dict()})

@app.route('/api/v1/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """DELETE resource - remove user"""
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    return '', 204  # No content
```

---

## WebSockets Deep Dive

<span style="color: #22c55e; font-weight: 600;">WebSockets</span> provide full-duplex communication channels over a single TCP connection. Unlike HTTP's request-response model, WebSockets allow both client and server to send messages independently at any time.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">WEBSOCKET CONNECTION LIFECYCLE</h3>
<div style="display: flex; justify-content: center; gap: 40px; flex-wrap: wrap;">
<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="background: #dcfce7; border: 2px solid #22c55e; width: 100px; height: 200px; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding-top: 12px;">
<span style="color: #166534; font-weight: 700; font-size: 14px;">CLIENT</span>
</div>
</div>
<div style="display: flex; flex-direction: column; gap: 8px; padding-top: 50px;">
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #3b82f6; font-size: 12px; width: 120px; text-align: center;">HTTP Upgrade --></span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #22c55e; font-size: 12px; width: 120px; text-align: center;"><-- 101 Switching</span>
</div>
<div style="background: #f0fdf4; padding: 8px; border-radius: 6px; margin: 8px 0;">
<span style="color: #166534; font-size: 11px; font-weight: 600;">Persistent Connection</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #a855f7; font-size: 12px; width: 120px; text-align: center;">Message <--></span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #a855f7; font-size: 12px; width: 120px; text-align: center;">Message <--></span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #ef4444; font-size: 12px; width: 120px; text-align: center;">Close --></span>
</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; width: 100px; height: 200px; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding-top: 12px;">
<span style="color: #1e40af; font-weight: 700; font-size: 14px;">SERVER</span>
</div>
</div>
</div>
</div>

### WebSocket Handshake

```http
# Client Request (HTTP Upgrade)
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
Origin: http://example.com

# Server Response
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

### WebSocket vs HTTP Comparison

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">HTTP vs WebSocket</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #dbeafe; border-radius: 12px; padding: 20px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; text-align: center; margin-bottom: 16px;">HTTP (Request-Response)</div>
<ul style="color: #1d4ed8; font-size: 13px; margin: 0; padding-left: 20px;">
<li>Half-duplex communication</li>
<li>New connection per request*</li>
<li>Headers sent with each request</li>
<li>Stateless by design</li>
<li>Easy to cache and scale</li>
<li>Works with CDNs, proxies</li>
</ul>
<div style="background: #eff6ff; border-radius: 6px; padding: 12px; margin-top: 12px; font-size: 12px; color: #1e40af;">
        *HTTP/2 uses multiplexing over single connection
</div>
</div>
<div style="background: #dcfce7; border-radius: 12px; padding: 20px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 700; text-align: center; margin-bottom: 16px;">WebSocket (Bidirectional)</div>
<ul style="color: #15803d; font-size: 13px; margin: 0; padding-left: 20px;">
<li>Full-duplex communication</li>
<li>Persistent connection</li>
<li>Minimal per-message overhead</li>
<li>Inherently stateful</li>
<li>Complex to scale horizontally</li>
<li>Requires sticky sessions or pub/sub</li>
</ul>
<div style="background: #f0fdf4; border-radius: 6px; padding: 12px; margin-top: 12px; font-size: 12px; color: #166534;">
        Ideal for: chat, gaming, live data, collaborative editing
</div>
</div>
</div>
</div>

### WebSocket Server Implementation

```python
import asyncio
import websockets
import json
import redis.asyncio as redis

class WebSocketServer:
    def __init__(self):
        self.connections = {}  # user_id -> websocket
        self.redis = None

    async def start(self):
        # Connect to Redis for cross-server messaging
        self.redis = await redis.from_url("redis://localhost")

        # Subscribe to messages from other servers
        pubsub = self.redis.pubsub()
        await pubsub.subscribe("broadcast")
        asyncio.create_task(self.redis_listener(pubsub))

        # Start WebSocket server
        async with websockets.serve(self.handler, "localhost", 8765):
            await asyncio.Future()  # Run forever

    async def handler(self, websocket, path):
        """Handle individual WebSocket connection"""
        user_id = None
        try:
            # Authenticate on connect
            auth_message = await websocket.recv()
            user_id = await self.authenticate(auth_message)

            if not user_id:
                await websocket.close(1008, "Unauthorized")
                return

            # Register connection
            self.connections[user_id] = websocket
            await self.redis.sadd("online_users", user_id)

            # Handle messages
            async for message in websocket:
                await self.handle_message(user_id, message)

        except websockets.ConnectionClosed:
            pass
        finally:
            # Cleanup on disconnect
            if user_id:
                del self.connections[user_id]
                await self.redis.srem("online_users", user_id)

    async def handle_message(self, sender_id, raw_message):
        """Process incoming message"""
        message = json.loads(raw_message)

        if message['type'] == 'direct':
            # Send to specific user
            await self.send_to_user(
                message['recipient_id'],
                {
                    'type': 'message',
                    'from': sender_id,
                    'content': message['content'],
                    'timestamp': time.time()
                }
            )
        elif message['type'] == 'broadcast':
            # Broadcast to all users via Redis
            await self.redis.publish("broadcast", json.dumps({
                'from': sender_id,
                'content': message['content']
            }))

    async def send_to_user(self, user_id, message):
        """Send message to user (local or remote)"""
        if user_id in self.connections:
            # User on this server
            await self.connections[user_id].send(json.dumps(message))
        else:
            # User on different server - route via Redis
            await self.redis.publish(f"user:{user_id}", json.dumps(message))

    async def redis_listener(self, pubsub):
        """Listen for messages from other servers"""
        async for message in pubsub.listen():
            if message['type'] == 'message':
                data = json.loads(message['data'])
                # Broadcast to all local connections
                for ws in self.connections.values():
                    await ws.send(json.dumps(data))
```

### JavaScript WebSocket Client

```javascript
class WebSocketClient {
    constructor(url) {
        this.url = url;
        this.ws = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.messageHandlers = new Map();
    }

    connect(authToken) {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url);

            this.ws.onopen = () => {
                console.log('WebSocket connected');
                this.reconnectAttempts = 0;

                // Send authentication
                this.send({ type: 'auth', token: authToken });
                resolve();
            };

            this.ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                this.handleMessage(message);
            };

            this.ws.onclose = (event) => {
                console.log('WebSocket closed:', event.code, event.reason);
                if (!event.wasClean) {
                    this.reconnect(authToken);
                }
            };

            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                reject(error);
            };
        });
    }

    reconnect(authToken) {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnection attempts reached');
            return;
        }

        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
        this.reconnectAttempts++;

        console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
        setTimeout(() => this.connect(authToken), delay);
    }

    send(message) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        } else {
            console.warn('WebSocket not connected');
        }
    }

    on(type, handler) {
        this.messageHandlers.set(type, handler);
    }

    handleMessage(message) {
        const handler = this.messageHandlers.get(message.type);
        if (handler) {
            handler(message);
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close(1000, 'Client disconnect');
        }
    }
}

// Usage
const ws = new WebSocketClient('wss://api.example.com/ws');
await ws.connect(authToken);

ws.on('message', (msg) => {
    console.log('New message:', msg.content);
});

ws.send({ type: 'direct', recipient_id: '456', content: 'Hello!' });
```

### Scaling WebSockets

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">WebSocket Scaling Architecture</h4>
<div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px; margin: 0 auto;">
<div style="display: flex; justify-content: center; gap: 12px;">
<div style="background: #dcfce7; border: 2px solid #22c55e; padding: 12px 16px; border-radius: 8px;">
<span style="color: #166534; font-size: 12px;">Client 1</span>
</div>
<div style="background: #dcfce7; border: 2px solid #22c55e; padding: 12px 16px; border-radius: 8px;">
<span style="color: #166534; font-size: 12px;">Client 2</span>
</div>
<div style="background: #dcfce7; border: 2px solid #22c55e; padding: 12px 16px; border-radius: 8px;">
<span style="color: #166534; font-size: 12px;">Client 3</span>
</div>
<div style="background: #dcfce7; border: 2px solid #22c55e; padding: 12px 16px; border-radius: 8px;">
<span style="color: #166534; font-size: 12px;">Client 4</span>
</div>
</div>
<div style="text-align: center; color: #64748b;">Persistent WS Connections</div>
<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 16px; text-align: center;">
<span style="color: #92400e; font-weight: 600;">Load Balancer (Sticky Sessions / IP Hash)</span>
</div>
<div style="display: flex; justify-content: center; gap: 24px;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; padding: 16px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: 600; font-size: 13px;">WS Server 1</div>
<div style="color: #3b82f6; font-size: 11px;">Clients 1,2</div>
</div>
<div style="background: #dbeafe; border: 2px solid #3b82f6; padding: 16px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: 600; font-size: 13px;">WS Server 2</div>
<div style="color: #3b82f6; font-size: 11px;">Clients 3,4</div>
</div>
</div>
<div style="text-align: center; color: #64748b;">Pub/Sub for Cross-Server Messaging</div>
<div style="background: #f3e8ff; border: 2px solid #a855f7; border-radius: 12px; padding: 16px; text-align: center;">
<span style="color: #6b21a8; font-weight: 600;">Redis Pub/Sub</span>
</div>
</div>
</div>

See [[Message Queues]](/topics/system-design/message-queues) for more on pub/sub patterns.

---

## Server-Sent Events (SSE)

<span style="color: #22c55e; font-weight: 600;">Server-Sent Events (SSE)</span> provide a lightweight mechanism for servers to push data to clients over HTTP. Unlike WebSockets, SSE is unidirectional (server to client only) but simpler to implement and works over standard HTTP.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">COMMUNICATION PATTERNS COMPARISON</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
<div style="background: #dcfce7; border-radius: 12px; padding: 20px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 700; margin-bottom: 12px;">HTTP Polling</div>
<div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px;">
<div style="display: flex; align-items: center; gap: 8px;">
<span style="background: #22c55e; padding: 4px 8px; border-radius: 4px; color: white; font-size: 10px;">C</span>
<span style="color: #166534; font-size: 12px;">--></span>
<span style="background: #3b82f6; padding: 4px 8px; border-radius: 4px; color: white; font-size: 10px;">S</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="background: #22c55e; padding: 4px 8px; border-radius: 4px; color: white; font-size: 10px;">C</span>
<span style="color: #3b82f6; font-size: 12px;"><--</span>
<span style="background: #3b82f6; padding: 4px 8px; border-radius: 4px; color: white; font-size: 10px;">S</span>
</div>
</div>
<div style="color: #15803d; font-size: 11px;">Repeated requests at intervals. Simple but inefficient.</div>
</div>
<div style="background: #fef3c7; border-radius: 12px; padding: 20px; border: 2px solid #f59e0b;">
<div style="color: #92400e; font-weight: 700; margin-bottom: 12px;">Long Polling</div>
<div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px;">
<div style="display: flex; align-items: center; gap: 8px;">
<span style="background: #22c55e; padding: 4px 8px; border-radius: 4px; color: white; font-size: 10px;">C</span>
<span style="color: #166534; font-size: 12px;">--> (hold)</span>
<span style="background: #3b82f6; padding: 4px 8px; border-radius: 4px; color: white; font-size: 10px;">S</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="background: #22c55e; padding: 4px 8px; border-radius: 4px; color: white; font-size: 10px;">C</span>
<span style="color: #3b82f6; font-size: 12px;"><-- (when ready)</span>
<span style="background: #3b82f6; padding: 4px 8px; border-radius: 4px; color: white; font-size: 10px;">S</span>
</div>
</div>
<div style="color: #b45309; font-size: 11px;">Server holds request until data available. Fallback option.</div>
</div>
<div style="background: #dbeafe; border-radius: 12px; padding: 20px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; margin-bottom: 12px;">SSE</div>
<div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px;">
<div style="display: flex; align-items: center; gap: 8px;">
<span style="background: #22c55e; padding: 4px 8px; border-radius: 4px; color: white; font-size: 10px;">C</span>
<span style="color: #166534; font-size: 12px;">--> (subscribe)</span>
<span style="background: #3b82f6; padding: 4px 8px; border-radius: 4px; color: white; font-size: 10px;">S</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="background: #22c55e; padding: 4px 8px; border-radius: 4px; color: white; font-size: 10px;">C</span>
<span style="color: #3b82f6; font-size: 12px;"><-- stream</span>
<span style="background: #3b82f6; padding: 4px 8px; border-radius: 4px; color: white; font-size: 10px;">S</span>
</div>
</div>
<div style="color: #1d4ed8; font-size: 11px;">Server pushes events. Auto-reconnect. Text-based.</div>
</div>
<div style="background: #f3e8ff; border-radius: 12px; padding: 20px; border: 2px solid #a855f7;">
<div style="color: #6b21a8; font-weight: 700; margin-bottom: 12px;">WebSocket</div>
<div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px;">
<div style="display: flex; align-items: center; gap: 8px;">
<span style="background: #22c55e; padding: 4px 8px; border-radius: 4px; color: white; font-size: 10px;">C</span>
<span style="color: #a855f7; font-size: 12px;"><--></span>
<span style="background: #3b82f6; padding: 4px 8px; border-radius: 4px; color: white; font-size: 10px;">S</span>
</div>
</div>
<div style="color: #7c3aed; font-size: 11px;">Full duplex. Binary/text. Lowest latency.</div>
</div>
</div>
</div>

### When to Use SSE vs WebSocket

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">SSE vs WebSocket Decision Guide</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
  <div style="color: #1e40af; font-weight: 700; margin-bottom: 12px;">Use SSE When:</div>
  <ul style="color: #1d4ed8; font-size: 13px; margin: 0; padding-left: 20px;">
  <li>Server-to-client only (notifications, feeds)</li>
  <li>Need auto-reconnection with last-event-id</li>
  <li>Want to use standard HTTP infrastructure</li>
  <li>Text/JSON data only is sufficient</li>
  <li>Simplicity is more important than features</li>
</ul>
<div style="background: #dbeafe; border-radius: 8px; padding: 12px; margin-top: 12px;">
<div style="color: #1e40af; font-size: 12px;"><strong>Examples:</strong> Live stock prices, social media feeds, notifications, live scores</div>
</div>
</div>
<div>
  <div style="color: #6b21a8; font-weight: 700; margin-bottom: 12px;">Use WebSocket When:</div>
  <ul style="color: #7c3aed; font-size: 13px; margin: 0; padding-left: 20px;">
  <li>Bidirectional communication needed</li>
  <li>Binary data transfer required</li>
  <li>Lowest possible latency critical</li>
  <li>High message frequency (gaming)</li>
  <li>Need custom protocols</li>
</ul>
<div style="background: #f3e8ff; border-radius: 8px; padding: 12px; margin-top: 12px;">
<div style="color: #6b21a8; font-size: 12px;"><strong>Examples:</strong> Chat apps, multiplayer games, collaborative editors, trading platforms</div>
</div>
</div>
</div>
</div>

### SSE Server Implementation

```python
from flask import Flask, Response, request
import json
import time
import queue
import threading

app = Flask(__name__)

# Per-user message queues
user_queues = {}

def event_stream(user_id):
    """Generator that yields SSE events"""
    q = queue.Queue()
    user_queues[user_id] = q

    try:
        while True:
            # Block until message available or timeout
            try:
                message = q.get(timeout=30)
                yield format_sse(message)
            except queue.Empty:
                # Send heartbeat to keep connection alive
                yield format_sse({'type': 'heartbeat'}, event='ping')
    finally:
        # Cleanup on disconnect
        del user_queues[user_id]

def format_sse(data, event=None, id=None, retry=None):
    """Format data as SSE message"""
    lines = []
    if id:
        lines.append(f'id: {id}')
    if event:
        lines.append(f'event: {event}')
    if retry:
        lines.append(f'retry: {retry}')
    lines.append(f'data: {json.dumps(data)}')
    return '\n'.join(lines) + '\n\n'

@app.route('/api/events')
def sse_stream():
    """SSE endpoint for real-time updates"""
    user_id = get_current_user_id()

    response = Response(
        event_stream(user_id),
        mimetype='text/event-stream',
        headers={
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'X-Accel-Buffering': 'no'  # Disable nginx buffering
        }
    )
    return response

@app.route('/api/notify', methods=['POST'])
def send_notification():
    """Send notification to user via SSE"""
    data = request.get_json()
    user_id = data['user_id']

    if user_id in user_queues:
        user_queues[user_id].put({
            'type': 'notification',
            'title': data['title'],
            'body': data['body'],
            'timestamp': time.time()
        })
        return {'status': 'sent'}
    return {'status': 'user_offline'}, 404
```

### SSE Client Implementation

```javascript
class SSEClient {
    constructor(url) {
        this.url = url;
        this.eventSource = null;
        this.handlers = new Map();
    }

    connect(authToken) {
        // SSE doesn't support custom headers, use query param or cookies
        const urlWithAuth = `${this.url}?token=${authToken}`;

        this.eventSource = new EventSource(urlWithAuth);

        this.eventSource.onopen = () => {
            console.log('SSE connected');
        };

        // Default message handler
        this.eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleEvent('message', data);
        };

        // Named event handlers
        this.eventSource.addEventListener('notification', (event) => {
            const data = JSON.parse(event.data);
            this.handleEvent('notification', data);
        });

        this.eventSource.addEventListener('ping', (event) => {
            // Heartbeat received, connection is alive
        });

        this.eventSource.onerror = (error) => {
            console.error('SSE error:', error);
            // EventSource will auto-reconnect
            // Use Last-Event-ID header to resume from last event
        };
    }

    on(eventType, handler) {
        this.handlers.set(eventType, handler);
    }

    handleEvent(type, data) {
        const handler = this.handlers.get(type);
        if (handler) {
            handler(data);
        }
    }

    disconnect() {
        if (this.eventSource) {
            this.eventSource.close();
        }
    }
}

// Usage
const sse = new SSEClient('/api/events');
sse.connect(authToken);

sse.on('notification', (data) => {
    showNotification(data.title, data.body);
});
```

---

## Communication Patterns Summary

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">CHOOSING THE RIGHT PATTERN</h3>
<table style="width: 100%; border-collapse: collapse; font-size: 13px;">
<thead>
  <tr style="background: #e2e8f0;">
  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Pattern</th>
  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Direction</th>
  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Latency</th>
  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Complexity</th>
  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Best For</th>
  </tr>
</thead>
<tbody>
  <tr style="background: #f8fafc;">
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #166534;">REST</td>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Request-Response</td>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Medium</td>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Low</td>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">CRUD APIs, cacheable resources</td>
  </tr>
  <tr>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e40af;">HTTP Polling</td>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Client-initiated</td>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">High</td>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Low</td>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Infrequent updates, simplicity</td>
  </tr>
  <tr style="background: #f8fafc;">
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #92400e;">Long Polling</td>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Server-timed response</td>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Medium</td>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Medium</td>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Fallback when SSE/WS unavailable</td>
  </tr>
  <tr>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #6b21a8;">SSE</td>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Server-to-Client</td>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Low</td>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Low</td>
  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Live feeds, notifications</td>
  </tr>
  <tr style="background: #f8fafc;">
  <td style="padding: 12px; font-weight: 600; color: #dc2626;">WebSocket</td>
  <td style="padding: 12px;">Bidirectional</td>
  <td style="padding: 12px;">Lowest</td>
  <td style="padding: 12px;">High</td>
  <td style="padding: 12px;">Chat, gaming, collaboration</td>
  </tr>
</tbody>
</table>
</div>

---

## Common Pitfalls

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
<div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">1. Storing Session in Server Memory</div>
<div style="color: #7f1d1d; font-size: 14px;">Storing sessions in server memory prevents horizontal scaling. When you add servers, sessions are not shared. Use external stores like Redis. See [[Caching]](/topics/system-design/caching) for session storage patterns.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
<div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">2. Tight Coupling Between Client and Server</div>
<div style="color: #7f1d1d; font-size: 14px;">Changing server response structure breaks clients. Use API versioning (v1, v2) and maintain backward compatibility. Consider GraphQL for flexibility. See [[API Design]](/topics/system-design/api-design) for versioning strategies.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
<div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">3. No Timeout Handling</div>
<div style="color: #7f1d1d; font-size: 14px;">Clients should always set timeouts. Server may be slow or unresponsive. Without timeouts, clients hang indefinitely, degrading user experience. Implement [[Circuit Breaker]](/topics/system-design/circuit-breaker) patterns for resilience.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
<div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">4. Ignoring Network Failures</div>
<div style="color: #7f1d1d; font-size: 14px;">Network requests can fail. Clients should implement retry logic with exponential backoff. Show meaningful error messages to users.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
<div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">5. WebSocket Connection Leaks</div>
<div style="color: #7f1d1d; font-size: 14px;">Not properly closing WebSocket connections leads to resource exhaustion. Implement heartbeats to detect dead connections and clean up resources on disconnect.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
<div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">6. SSE Without Heartbeats</div>
<div style="color: #7f1d1d; font-size: 14px;">Proxies and load balancers may close idle SSE connections. Send periodic heartbeat events to keep connections alive.</div>
</div>

---

## 3-Level Interview Questions

### Level 1: Fundamentals

<div style="background: #dcfce7; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

**Q1: What is the difference between stateless and stateful servers?**

<span style="color: #22c55e; font-weight: 600;">A:</span> A <span style="color: #22c55e; font-weight: 600;">stateless server</span> does not store any client session information between requests - each request must contain all information needed to process it (typically via tokens). A <span style="color: #22c55e; font-weight: 600;">stateful server</span> maintains session data between requests, requiring clients to connect to the same server (sticky sessions).

**Why does this matter?** Stateless servers enable horizontal scaling because any server can handle any request. Load balancers can use simple round-robin. Stateful servers require sticky sessions or session replication, making scaling complex.

<details>
<summary style="color: #166534; cursor: pointer; font-weight: 600;">Follow-up L1.1: How do stateless servers handle user authentication?</summary>
<div style="margin-top: 12px; padding: 12px; background: #f0fdf4; border-radius: 8px;">

**A:** Stateless servers use <span style="color: #22c55e; font-weight: 600;">self-contained tokens</span> (JWT) that include user identity and claims. The token is signed by the server, so any server can validate it without querying a central session store. Each request includes the token in the Authorization header.

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

<details>
<summary style="color: #166534; cursor: pointer; font-weight: 600;">Follow-up L1.1.1: What are the security trade-offs of JWT vs server-side sessions?</summary>
<div style="margin-top: 12px; padding: 12px; background: #ecfdf5; border-radius: 8px;">

**A:**
- **JWT Pros**: Stateless, no database lookup, works across services
- **JWT Cons**: Cannot be revoked until expiry (unless using blocklist), token size larger than session ID, secrets must be managed carefully
- **Server-side sessions Pros**: Instant revocation, smaller cookie size, can store arbitrary data
- **Server-side sessions Cons**: Requires shared storage (Redis), database lookup per request, harder to scale

**Best Practice**: Use short-lived JWTs (15 min) with refresh tokens stored server-side. This balances scalability with revocation capability.
</div>
</details>

</div>
</details>

<details>
<summary style="color: #166534; cursor: pointer; font-weight: 600;">Follow-up L1.2: When is stateful acceptable?</summary>
<div style="margin-top: 12px; padding: 12px; background: #f0fdf4; border-radius: 8px;">

**A:** Stateful is acceptable when:
1. **Connection state is inherent** - WebSocket connections, game servers, streaming
2. **Performance justifies complexity** - In-memory caching of user data provides significant speedup
3. **Coordination overhead exceeds benefits** - External state stores add latency that matters

<details>
<summary style="color: #166534; cursor: pointer; font-weight: 600;">Follow-up L1.2.1: How do you scale stateful WebSocket servers?</summary>
<div style="margin-top: 12px; padding: 12px; background: #ecfdf5; border-radius: 8px;">

**A:** Use a <span style="color: #22c55e; font-weight: 600;">pub/sub layer</span> (Redis Pub/Sub, Kafka) to coordinate between servers:
1. Each server maintains connections to its clients
2. When a message needs to reach a user on another server, publish to a channel
3. All servers subscribe and deliver messages to their local clients
4. Use sticky sessions at the load balancer (IP hash or cookie) to maintain connection affinity
5. Store connection metadata (user -> server mapping) in Redis for routing
</div>
</details>

</div>
</details>

</div>

<div style="background: #dcfce7; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

**Q2: Explain the REST architectural constraints.**

<span style="color: #22c55e; font-weight: 600;">A:</span> REST (Representational State Transfer) has six constraints:
1. **Client-Server** - Separation of concerns between UI and data
2. **Stateless** - Each request contains all context needed
3. **Cacheable** - Responses must define cacheability
4. **Uniform Interface** - Standardized resource identification and manipulation
5. **Layered System** - Client doesn't know if connected directly to server
6. **Code on Demand** (optional) - Server can send executable code

<details>
<summary style="color: #166534; cursor: pointer; font-weight: 600;">Follow-up L1.1: What is HATEOAS and why is it rarely implemented?</summary>
<div style="margin-top: 12px; padding: 12px; background: #f0fdf4; border-radius: 8px;">

**A:** <span style="color: #22c55e; font-weight: 600;">HATEOAS</span> (Hypermedia as the Engine of Application State) means responses include links to related actions, making APIs self-documenting and discoverable.

```json
{
  "order_id": 123,
  "status": "pending",
  "_links": {
    "self": "/orders/123",
    "cancel": {"href": "/orders/123", "method": "DELETE"},
    "pay": {"href": "/orders/123/payment", "method": "POST"}
  }
}
```

**Why rarely implemented:**
- Adds response size and complexity
- Most clients are tightly coupled anyway (mobile apps)
- GraphQL provides similar flexibility differently
- Caching becomes harder with dynamic links

<details>
<summary style="color: #166534; cursor: pointer; font-weight: 600;">Follow-up L1.1.1: How does GraphQL solve the problems HATEOAS addresses?</summary>
<div style="margin-top: 12px; padding: 12px; background: #ecfdf5; border-radius: 8px;">

**A:** GraphQL addresses discoverability and flexibility differently:
- **Schema introspection** replaces HATEOAS links for discoverability
- **Client-specified queries** let clients request exactly what they need
- **Single endpoint** with typed schema vs multiple REST endpoints
- **Strong typing** provides compile-time validation

However, GraphQL has trade-offs: harder to cache at HTTP level, complexity in authorization, potential for expensive queries (N+1 problems without DataLoader).
</div>
</details>

</div>
</details>

</div>

### Level 2: Design & Trade-offs

<div style="background: #dbeafe; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

**Q3: When would you choose WebSocket over SSE?**

<span style="color: #3b82f6; font-weight: 600;">A:</span> Choose <span style="color: #22c55e; font-weight: 600;">WebSocket</span> when you need:
- **Bidirectional communication** (chat, gaming)
- **Binary data transfer** (file sharing, video)
- **Lowest possible latency** (trading, gaming)
- **High message frequency** in both directions

Choose <span style="color: #22c55e; font-weight: 600;">SSE</span> when:
- Server-to-client push is sufficient (notifications, feeds)
- You want built-in reconnection with last-event-id
- Standard HTTP infrastructure compatibility matters
- Simplicity is preferred

<details>
<summary style="color: #1e40af; cursor: pointer; font-weight: 600;">Follow-up L2.1: How does SSE handle reconnection and missed messages?</summary>
<div style="margin-top: 12px; padding: 12px; background: #eff6ff; border-radius: 8px;">

**A:** SSE has built-in reconnection support:

1. **Auto-reconnect**: Browser automatically reconnects on disconnect
2. **Last-Event-ID**: Server assigns IDs to events; on reconnect, browser sends `Last-Event-ID` header
3. **Server resumes**: Server queries stored events after that ID and resends

```python
def format_sse(data, event_id):
    return f"id: {event_id}\ndata: {json.dumps(data)}\n\n"

# On reconnect, client sends: Last-Event-ID: 12345
last_id = request.headers.get('Last-Event-ID')
if last_id:
    missed = Event.query.filter(Event.id > last_id).all()
    for event in missed:
        yield format_sse(event.data, event.id)
```

<details>
<summary style="color: #1e40af; cursor: pointer; font-weight: 600;">Follow-up L2.1.1: What are the challenges of implementing this at scale?</summary>
<div style="margin-top: 12px; padding: 12px; background: #dbeafe; border-radius: 8px;">

**A:** Challenges at scale:
1. **Event storage**: Must persist events for replay window (Redis with TTL, or dedicated event store)
2. **Ordering**: Events must be globally ordered across servers (use Redis atomic increment for IDs)
3. **Memory**: Long replay windows increase storage requirements
4. **Cleanup**: Need efficient event expiration
5. **Load balancer affinity**: May not be needed since reconnection includes last-event-id

**Solutions:**
- Use Kafka for ordered, persistent event storage with consumer offset tracking
- Implement sliding window (last N events or time-based)
- Use consistent hashing for event storage partitioning
</div>
</details>

</div>
</details>

<details>
<summary style="color: #1e40af; cursor: pointer; font-weight: 600;">Follow-up L2.2: What infrastructure considerations differ between SSE and WebSocket?</summary>
<div style="margin-top: 12px; padding: 12px; background: #eff6ff; border-radius: 8px;">

**A:** Key infrastructure differences:

| Aspect | SSE | WebSocket |
|--------|-----|-----------|
| Load Balancer | Standard HTTP, no special config | Needs WS support, sticky sessions |
| Proxy/CDN | Works with HTTP proxies | May need configuration |
| Firewalls | Port 80/443, rarely blocked | May be blocked by corporate firewalls |
| TLS | Standard HTTPS | WSS requires similar setup |
| Connection limits | HTTP/2 multiplexing helps | Each connection is separate |

<details>
<summary style="color: #1e40af; cursor: pointer; font-weight: 600;">Follow-up L2.2.1: How do you handle WebSocket connections behind corporate proxies that don't support upgrades?</summary>
<div style="margin-top: 12px; padding: 12px; background: #dbeafe; border-radius: 8px;">

**A:** Strategies for WebSocket fallback:
1. **Long polling fallback**: Libraries like Socket.IO auto-fallback to HTTP long polling
2. **HTTPS WebSocket**: WSS (port 443) is less likely to be blocked than WS (port 80)
3. **Tunneling**: Wrap WebSocket in HTTPS CONNECT tunnel
4. **Alternative ports**: Some proxies allow WebSocket on non-standard ports

**Socket.IO example:**
```javascript
const io = require('socket.io')(server, {
  transports: ['websocket', 'polling'],  // Try WS first, fallback to polling
  upgrade: true  // Upgrade polling to WS when possible
});
```
</div>
</details>

</div>
</details>

</div>

<div style="background: #dbeafe; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

**Q4: Design a notification system that delivers messages in real-time but also handles offline users.**

<span style="color: #3b82f6; font-weight: 600;">A:</span> This requires combining <span style="color: #22c55e; font-weight: 600;">real-time delivery</span> with <span style="color: #22c55e; font-weight: 600;">persistent storage</span>:

1. **Dual write**: When notification created, write to database AND publish to real-time channel
2. **Online users**: Receive via WebSocket/SSE immediately
3. **Offline users**: On next connection, query database for unread notifications
4. **Read receipts**: Mark delivered when user acknowledges

<details>
<summary style="color: #1e40af; cursor: pointer; font-weight: 600;">Follow-up L2.1: How do you ensure exactly-once delivery?</summary>
<div style="margin-top: 12px; padding: 12px; background: #eff6ff; border-radius: 8px;">

**A:** True exactly-once is impossible in distributed systems; achieve <span style="color: #22c55e; font-weight: 600;">effectively-once</span> through:

1. **Idempotent delivery**: Include notification ID, client deduplicates
2. **Acknowledgment**: Client ACKs receipt, server marks delivered
3. **Outbox pattern**: Write notification + outbox entry in same transaction, separate process publishes

```python
# Outbox pattern
with db.transaction():
    notification = Notification.create(user_id, content)
    OutboxEvent.create(
        aggregate_id=notification.id,
        event_type='notification.created',
        payload=notification.to_dict()
    )

# Separate publisher reads outbox, publishes, marks processed
```

<details>
<summary style="color: #1e40af; cursor: pointer; font-weight: 600;">Follow-up L2.1.1: How does the outbox pattern prevent duplicates when the publisher crashes?</summary>
<div style="margin-top: 12px; padding: 12px; background: #dbeafe; border-radius: 8px;">

**A:** The outbox pattern provides at-least-once semantics:

1. Publisher processes outbox entries in order
2. For each entry: publish to message queue, mark as processed
3. If crash between publish and mark, entry reprocessed on restart
4. Consumers must be idempotent (dedupe by ID)

**Preventing duplicates at consumer:**
```python
def handle_notification(event):
    # Idempotent check
    if Delivery.exists(event.id):
        return  # Already processed

    # Process
    deliver_to_user(event)

    # Mark processed (last, so crash causes redelivery)
    Delivery.create(event.id)
```

**Ordering guarantee**: Single partition per user ensures order within user's notifications.
</div>
</details>

</div>
</details>

</div>

### Level 3: Advanced Architecture

<div style="background: #f3e8ff; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #a855f7;">

**Q5: Design the client-server architecture for a real-time collaborative document editor like Google Docs.**

<span style="color: #6b21a8; font-weight: 600;">A:</span> This is a complex system requiring:

1. **Real-time sync**: WebSockets for bidirectional communication
2. **Conflict resolution**: Operational Transformation (OT) or CRDTs
3. **Persistence**: Database for document storage, change log
4. **Presence**: Show who's viewing/editing where

<details>
<summary style="color: #6b21a8; cursor: pointer; font-weight: 600;">Follow-up L3.1: How would you implement operational transformation at scale?</summary>
<div style="margin-top: 12px; padding: 12px; background: #faf5ff; border-radius: 8px;">

**A:** <span style="color: #22c55e; font-weight: 600;">Operational Transformation (OT)</span> transforms concurrent operations to maintain consistency:

1. **Client sends operation** with base version
2. **Server transforms** operation against any concurrent operations
3. **Server broadcasts** transformed operation to other clients
4. **Clients transform** their pending operations against received operations

**At scale:**
- **Single document owner**: Route all ops for a document to same server (consistent hashing)
- **Operation log**: Store operation history for transformation and replay
- **Checkpointing**: Periodically snapshot document state to limit replay

<details>
<summary style="color: #6b21a8; cursor: pointer; font-weight: 600;">Follow-up L3.1.1: What are the trade-offs between OT and CRDTs for this use case?</summary>
<div style="margin-top: 12px; padding: 12px; background: #f3e8ff; border-radius: 8px;">

**A:**

| Aspect | OT | CRDT |
|--------|-----|------|
| **Complexity** | Complex transformation logic | Complex data structures |
| **Server requirement** | Needs central server for ordering | Can work peer-to-peer |
| **Latency** | Server round-trip for confirmation | Immediate local application |
| **Memory** | Store operation log | Metadata per element |
| **Consistency** | Strong (with server) | Eventual |

**Google Docs uses OT** because:
- Central server already needed for auth/storage
- Strong consistency preferred for documents
- Well-understood implementation from Wave

**CRDTs better for:**
- Peer-to-peer apps (offline-first)
- Eventually consistent systems
- When server coordination is expensive
</div>
</details>

</div>
</details>

<details>
<summary style="color: #6b21a8; cursor: pointer; font-weight: 600;">Follow-up L3.2: How do you handle offline editing?</summary>
<div style="margin-top: 12px; padding: 12px; background: #faf5ff; border-radius: 8px;">

**A:** Offline editing requires:

1. **Local storage**: IndexedDB stores document and operation queue
2. **Operation queue**: Collect operations while offline
3. **Sync on reconnect**: Send queued operations, receive missed operations
4. **Conflict resolution**: Transform queued ops against received ops

```javascript
class OfflineManager {
    async queueOperation(op) {
        await this.operationQueue.add(op);
        this.applyLocally(op);  // Optimistic local update
    }

    async onReconnect() {
        const queued = await this.operationQueue.getAll();
        const serverVersion = await this.fetchServerVersion();

        // Transform queued ops against server state
        const transformed = this.transformAgainst(queued, serverVersion);

        // Send transformed operations
        await this.sendOperations(transformed);
        await this.operationQueue.clear();
    }
}
```

<details>
<summary style="color: #6b21a8; cursor: pointer; font-weight: 600;">Follow-up L3.2.1: How do you handle the case where two users make conflicting edits to the same paragraph offline?</summary>
<div style="margin-top: 12px; padding: 12px; background: #f3e8ff; border-radius: 8px;">

**A:** This is the hardest case. Options:

1. **Automatic merge** (OT/CRDT): Both edits preserved, may result in nonsensical text
2. **Last-write-wins**: Lose one user's changes (bad UX)
3. **Branch and merge**: Create conflict branches, prompt user to resolve
4. **Paragraph-level locking**: Warn when both editing same section

**Best practice for documents:**
- Use character-level OT (Google Docs approach)
- Both edits merge character by character
- Result may be weird but no data lost
- Show "concurrent edit" notification
- Keep undo history for recovery

```
User A (offline): "Hello World" -> "Hello Beautiful World"
User B (offline): "Hello World" -> "Hello Big World"

After sync (character-level merge):
"Hello Beautiful Big World" or "Hello Big Beautiful World"
(depends on operation ordering)
```
</div>
</details>

</div>
</details>

</div>

<div style="background: #f3e8ff; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #a855f7;">

**Q6: How would you design a system that needs to handle 10 million concurrent WebSocket connections?**

<span style="color: #6b21a8; font-weight: 600;">A:</span> This requires careful architecture across multiple dimensions:

1. **Connection handling**: ~100K connections per server, need 100+ servers
2. **Message routing**: Pub/sub layer (Redis Cluster, Kafka)
3. **State management**: External store for session data
4. **Load balancing**: Layer 4 (TCP) for WebSocket, sticky sessions

<details>
<summary style="color: #6b21a8; cursor: pointer; font-weight: 600;">Follow-up L3.1: How do you handle the memory requirements for 100K connections per server?</summary>
<div style="margin-top: 12px; padding: 12px; background: #faf5ff; border-radius: 8px;">

**A:** Memory optimization strategies:

1. **Event-driven architecture**: Use epoll/kqueue, not thread-per-connection
2. **Minimize per-connection state**: Store only connection ID and user ID in memory
3. **Buffer management**: Small read/write buffers, expand on demand
4. **Language choice**: Go/Rust/C++ for lower memory footprint than JVM/Node

**Calculation:**
- Base connection: ~10KB (TCP buffers + metadata)
- 100K connections: ~1GB
- Application state: +2KB per connection = +200MB
- Safety margin: 2x = ~2.5GB per 100K connections

<details>
<summary style="color: #6b21a8; cursor: pointer; font-weight: 600;">Follow-up L3.1.1: How do you handle graceful shutdown without dropping 100K connections?</summary>
<div style="margin-top: 12px; padding: 12px; background: #f3e8ff; border-radius: 8px;">

**A:** Graceful shutdown strategy:

1. **Stop accepting new connections**: Remove from load balancer pool
2. **Drain existing connections**:
   - Send "reconnect" message to clients with alternate server
   - Wait for clients to disconnect (timeout: 30s)
3. **Force close**: Remaining connections closed
4. **Health checks**: Load balancer detects draining status

```go
func gracefulShutdown(server *WebSocketServer) {
    // 1. Stop accepting new
    server.StopAccepting()

    // 2. Notify clients
    server.BroadcastReconnect("ws://other-server:8080")

    // 3. Wait for drain
    deadline := time.After(30 * time.Second)
    for server.ConnectionCount() > 0 {
        select {
        case <-deadline:
            log.Warn("Forcing shutdown with %d connections",
                     server.ConnectionCount())
            return
        case <-time.After(100 * time.Millisecond):
            continue
        }
    }
}
```

**Client-side**: Clients should handle reconnect messages gracefully, reconnecting with backoff.
</div>
</details>

</div>
</details>

<details>
<summary style="color: #6b21a8; cursor: pointer; font-weight: 600;">Follow-up L3.2: How do you route a message to a specific user when they could be on any of 100 servers?</summary>
<div style="margin-top: 12px; padding: 12px; background: #faf5ff; border-radius: 8px;">

**A:** Two main approaches:

**1. User-Server Registry (Redis)**
```python
# On connect
redis.set(f"user:{user_id}:server", server_id, ex=connection_timeout)

# To send message
server_id = redis.get(f"user:{user_id}:server")
if server_id:
    redis.publish(f"server:{server_id}", message)
```

**2. Pub/Sub Per-User Channel**
```python
# Each server subscribes to its user channels
async def on_connect(user_id, websocket):
    await redis.subscribe(f"user:{user_id}")

# To send message (no lookup needed)
await redis.publish(f"user:{user_id}", message)
# Server subscribed to that user's channel receives and delivers
```

<details>
<summary style="color: #6b21a8; cursor: pointer; font-weight: 600;">Follow-up L3.2.1: What are the trade-offs of Redis Pub/Sub vs Kafka for this use case?</summary>
<div style="margin-top: 12px; padding: 12px; background: #f3e8ff; border-radius: 8px;">

**A:**

| Aspect | Redis Pub/Sub | Kafka |
|--------|--------------|-------|
| **Delivery** | Fire-and-forget | Persistent, replayable |
| **Ordering** | Per connection | Per partition |
| **Scale** | Single node limit ~1M msgs/s | Horizontal scale, millions msgs/s |
| **Memory** | Messages in memory briefly | Disk-based log |
| **Offline users** | Message lost | Can replay from offset |
| **Complexity** | Simple | Complex (topics, partitions, consumers) |

**Recommendation:**
- **Redis Pub/Sub**: Real-time only, offline handled separately
- **Kafka**: Need persistence, ordering, replay (chat history, audit)
- **Hybrid**: Kafka for persistence, Redis for real-time routing

For 10M connections with reliable delivery:
1. Write message to Kafka (persistent)
2. Publish to Redis (real-time delivery attempt)
3. On reconnect, consumer reads Kafka from last offset
</div>
</details>

</div>
</details>

</div>

---

## Client-Server vs Alternatives

| Architecture | Description | When to Use |
|-------------|-------------|-------------|
| **Client-Server** | Clear client/server roles | Most web/mobile apps |
| **Peer-to-Peer** | All nodes equal | File sharing, blockchain |
| **Serverless** | No managed servers | Event-driven, sporadic traffic |
| **Edge Computing** | Processing at network edge | IoT, low-latency needs |

---

## Related Topics

- [[Load Balancing]](/topics/system-design/load-balancing) - Distributing requests across servers
- [[API Design]](/topics/system-design/api-design) - REST, GraphQL, and API patterns
- [[API Gateway]](/topics/system-design/api-gateway) - Central entry point for microservices
- [[Caching]](/topics/system-design/caching) - Reducing server load and latency
- [[Network Protocols]](/topics/system-design/network-protocols) - TCP, UDP, HTTP/2, QUIC
- [[Message Queues]](/topics/system-design/message-queues) - Async communication patterns
- [[Circuit Breaker]](/topics/system-design/circuit-breaker) - Handling failures gracefully
- [[Rate Limiting]](/topics/system-design/rate-limiting) - Protecting servers from overload
- [[Connection Pooling]](/topics/system-design/connection-pooling) - Efficient resource management
