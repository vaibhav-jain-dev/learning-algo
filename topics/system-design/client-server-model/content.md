# Client-Server Model

## Overview

The client-server model is a distributed application structure that partitions tasks between providers of a resource or service (servers) and service requesters (clients). This fundamental architecture pattern underpins most modern networked applications.

**Tags:** Architecture, Networking, Client-Server, Distributed Systems

---

## What is Client-Server Architecture?

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">CLIENT-SERVER MODEL</h4>
<div style="display: flex; align-items: center; justify-content: center; gap: 40px;">
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); width: 120px; height: 80px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px;">
<span style="color: #fff; font-weight: bold;">CLIENT</span>
</div>
<div style="color: #8b949e; font-size: 12px;">Requests services</div>
<div style="color: #7ee787; font-size: 11px; margin-top: 4px;">Browser, Mobile App, Desktop</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="color: #58a6ff; font-size: 14px;">Request →</div>
<div style="background: #21262d; padding: 8px 16px; border-radius: 6px;">
<span style="color: #8b949e; font-size: 12px;">Network</span>
</div>
<div style="color: #7ee787; font-size: 14px;">← Response</div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); width: 120px; height: 80px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px;">
<span style="color: #fff; font-weight: bold;">SERVER</span>
</div>
<div style="color: #8b949e; font-size: 12px;">Provides services</div>
<div style="color: #58a6ff; font-size: 11px; margin-top: 4px;">Web Server, API, Database</div>
</div>
</div>
</div>

### Key Characteristics

| Aspect | Client | Server |
|--------|--------|--------|
| **Role** | Initiates requests | Responds to requests |
| **Quantity** | Many | Few (often one logical) |
| **Resources** | Limited | Powerful, shared |
| **State** | Often stateful | Ideally stateless |
| **Examples** | Browser, mobile app | Nginx, Express, Django |

---

## Request-Response Cycle

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">REQUEST-RESPONSE LIFECYCLE</h4>
<div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px; margin: 0 auto;">
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #238636; color: #fff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>
<div style="flex: 1; background: #21262d; padding: 12px 16px; border-radius: 8px;">
<div style="color: #7ee787; font-weight: bold;">Client sends request</div>
<div style="color: #8b949e; font-size: 12px;">HTTP GET /api/users/123</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #1f6feb; color: #fff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>
<div style="flex: 1; background: #21262d; padding: 12px 16px; border-radius: 8px;">
<div style="color: #58a6ff; font-weight: bold;">DNS resolution</div>
<div style="color: #8b949e; font-size: 12px;">api.example.com → 93.184.216.34</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #8957e5; color: #fff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</div>
<div style="flex: 1; background: #21262d; padding: 12px 16px; border-radius: 8px;">
<div style="color: #a371f7; font-weight: bold;">TCP connection established</div>
<div style="color: #8b949e; font-size: 12px;">Three-way handshake (SYN, SYN-ACK, ACK)</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f0883e; color: #fff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</div>
<div style="flex: 1; background: #21262d; padding: 12px 16px; border-radius: 8px;">
<div style="color: #f0883e; font-weight: bold;">Server processes request</div>
<div style="color: #8b949e; font-size: 12px;">Query database, apply business logic</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #da3633; color: #fff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">5</div>
<div style="flex: 1; background: #21262d; padding: 12px 16px; border-radius: 8px;">
<div style="color: #f85149; font-weight: bold;">Server sends response</div>
<div style="color: #8b949e; font-size: 12px;">HTTP 200 OK + JSON payload</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #7ee787; color: #0d1117; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">6</div>
<div style="flex: 1; background: #21262d; padding: 12px 16px; border-radius: 8px;">
<div style="color: #7ee787; font-weight: bold;">Client renders response</div>
<div style="color: #8b949e; font-size: 12px;">Display data to user</div>
</div>
</div>
</div>
</div>

---

## Types of Clients

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">CLIENT TYPES</h4>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 12px;">Thin Client</div>
<div style="color: #8b949e; font-size: 13px; margin-bottom: 12px;">Minimal processing, relies on server for most logic</div>
<div style="background: rgba(126,231,135,0.1); border-radius: 6px; padding: 12px;">
<div style="color: #c9d1d9; font-size: 12px;">Examples:</div>
<ul style="color: #8b949e; font-size: 11px; margin: 4px 0 0 0; padding-left: 16px;">
<li>Web browsers (traditional)</li>
<li>Terminal clients</li>
<li>Streaming devices</li>
</ul>
</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Thick Client</div>
<div style="color: #8b949e; font-size: 13px; margin-bottom: 12px;">Significant local processing and storage</div>
<div style="background: rgba(88,166,255,0.1); border-radius: 6px; padding: 12px;">
<div style="color: #c9d1d9; font-size: 12px;">Examples:</div>
<ul style="color: #8b949e; font-size: 11px; margin: 4px 0 0 0; padding-left: 16px;">
<li>Desktop applications</li>
<li>Mobile apps</li>
<li>Gaming clients</li>
</ul>
</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">Hybrid Client</div>
<div style="color: #8b949e; font-size: 13px; margin-bottom: 12px;">Balance between thin and thick</div>
<div style="background: rgba(240,136,62,0.1); border-radius: 6px; padding: 12px;">
<div style="color: #c9d1d9; font-size: 12px;">Examples:</div>
<ul style="color: #8b949e; font-size: 11px; margin: 4px 0 0 0; padding-left: 16px;">
<li>SPAs (React, Vue)</li>
<li>PWAs</li>
<li>Electron apps</li>
</ul>
</div>
</div>
</div>
</div>

---

## Server Types

### Web Servers

Handle HTTP requests and serve static content or proxy to application servers.

```
Client Request → Web Server → Static Files (HTML, CSS, JS, Images)
                     ↓
              Application Server → Dynamic Content
```

**Examples:** Nginx, Apache, Caddy

### Application Servers

Execute business logic and generate dynamic responses.

```python
# Example: Flask Application Server
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/users/<int:user_id>')
def get_user(user_id):
    user = database.find_user(user_id)
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email
    })
```

**Examples:** Node.js, Gunicorn, Tomcat, uWSGI

### Database Servers

Store, retrieve, and manage persistent data.

```sql
-- Database server processes queries
SELECT id, name, email
FROM users
WHERE id = 123;
```

**Examples:** PostgreSQL, MySQL, MongoDB, Redis

---

## Multi-Tier Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">THREE-TIER ARCHITECTURE</h4>
<div style="display: flex; flex-direction: column; gap: 16px; max-width: 500px; margin: 0 auto;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 20px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 16px;">PRESENTATION TIER</div>
<div style="color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 8px;">Client Interface (Browser, Mobile App)</div>
<div style="color: rgba(255,255,255,0.6); font-size: 11px; margin-top: 4px;">HTML, CSS, JavaScript, React, Flutter</div>
</div>
<div style="text-align: center; color: #58a6ff; font-size: 20px;">↕</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 20px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 16px;">APPLICATION TIER</div>
<div style="color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 8px;">Business Logic (API Server)</div>
<div style="color: rgba(255,255,255,0.6); font-size: 11px; margin-top: 4px;">Node.js, Python, Java, Go</div>
</div>
<div style="text-align: center; color: #58a6ff; font-size: 20px;">↕</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 20px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 16px;">DATA TIER</div>
<div style="color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 8px;">Data Storage (Database)</div>
<div style="color: rgba(255,255,255,0.6); font-size: 11px; margin-top: 4px;">PostgreSQL, MongoDB, Redis</div>
</div>
</div>
</div>

### Benefits of Multi-Tier

| Benefit | Description |
|---------|-------------|
| **Separation of concerns** | Each tier has a specific responsibility |
| **Independent scaling** | Scale each tier based on demand |
| **Security** | Database not directly exposed to internet |
| **Maintainability** | Update one tier without affecting others |
| **Technology flexibility** | Use best tool for each tier |

---

## Stateless vs Stateful Servers

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">STATELESS vs STATEFUL</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 24px; border: 1px solid rgba(126,231,135,0.3);">
<div style="color: #7ee787; font-weight: bold; font-size: 16px; margin-bottom: 16px;">STATELESS SERVER</div>
<div style="color: #8b949e; font-size: 13px; margin-bottom: 16px;">Each request contains all information needed. Server doesn't remember previous requests.</div>
<div style="background: #0d1117; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="font-family: monospace; font-size: 12px; color: #c9d1d9;">
GET /api/orders<br>
Authorization: Bearer eyJhbG...<br>
<span style="color: #8b949e;"># Token contains user identity</span>
</div>
</div>
<div style="color: #7ee787; font-size: 13px;">
<div>✓ Easy to scale horizontally</div>
<div>✓ Any server can handle any request</div>
<div>✓ Simple load balancing</div>
<div>✓ Better fault tolerance</div>
</div>
</div>
<div style="background: rgba(248,81,73,0.1); border-radius: 12px; padding: 24px; border: 1px solid rgba(248,81,73,0.3);">
<div style="color: #f85149; font-weight: bold; font-size: 16px; margin-bottom: 16px;">STATEFUL SERVER</div>
<div style="color: #8b949e; font-size: 13px; margin-bottom: 16px;">Server maintains session data between requests. Client must connect to same server.</div>
<div style="background: #0d1117; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="font-family: monospace; font-size: 12px; color: #c9d1d9;">
GET /api/orders<br>
Cookie: session_id=abc123<br>
<span style="color: #8b949e;"># Server looks up session</span>
</div>
</div>
<div style="color: #f85149; font-size: 13px;">
<div>✗ Harder to scale</div>
<div>✗ Requires sticky sessions</div>
<div>✗ Complex load balancing</div>
<div>✗ Session replication needed</div>
</div>
</div>
</div>
</div>

### Moving State Out of Servers

```
STATEFUL (Bad for scaling):
┌─────────────────────────────────────┐
│         Application Server          │
│  ┌─────────────────────────────┐   │
│  │    Session: user_id=123     │   │
│  │    Cart: [item1, item2]     │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘

STATELESS (Good for scaling):
┌──────────────┐     ┌──────────────┐
│   Server 1   │     │   Server 2   │
│  (stateless) │     │  (stateless) │
└──────┬───────┘     └───────┬──────┘
       │                     │
       └──────────┬──────────┘
                  ▼
         ┌──────────────┐
         │    Redis     │
         │ Session Store│
         └──────────────┘
```

---

## Communication Patterns

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">COMMUNICATION PATTERNS</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 12px;">Request-Response</div>
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
<div style="background: #238636; padding: 8px; border-radius: 4px; color: #fff; font-size: 11px;">Client</div>
<div style="color: #7ee787;">→ Request →</div>
<div style="background: #1f6feb; padding: 8px; border-radius: 4px; color: #fff; font-size: 11px;">Server</div>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<div style="background: #238636; padding: 8px; border-radius: 4px; color: #fff; font-size: 11px;">Client</div>
<div style="color: #58a6ff;">← Response ←</div>
<div style="background: #1f6feb; padding: 8px; border-radius: 4px; color: #fff; font-size: 11px;">Server</div>
</div>
<div style="color: #8b949e; font-size: 12px; margin-top: 12px;">Synchronous, HTTP/REST</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Publish-Subscribe</div>
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<div style="background: #238636; padding: 8px; border-radius: 4px; color: #fff; font-size: 11px;">Publisher</div>
<div style="color: #7ee787;">→</div>
<div style="background: #f0883e; padding: 8px; border-radius: 4px; color: #fff; font-size: 11px;">Topic</div>
<div style="color: #58a6ff;">→</div>
<div style="background: #1f6feb; padding: 8px; border-radius: 4px; color: #fff; font-size: 11px;">Sub 1</div>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<div style="width: 60px;"></div>
<div style="width: 12px;"></div>
<div style="background: #f0883e; padding: 8px; border-radius: 4px; color: #fff; font-size: 11px; visibility: hidden;">Topic</div>
<div style="color: #58a6ff;">→</div>
<div style="background: #1f6feb; padding: 8px; border-radius: 4px; color: #fff; font-size: 11px;">Sub 2</div>
</div>
<div style="color: #8b949e; font-size: 12px; margin-top: 12px;">Async, Kafka, RabbitMQ</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">Push (Server-Sent)</div>
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<div style="background: #1f6feb; padding: 8px; border-radius: 4px; color: #fff; font-size: 11px;">Server</div>
<div style="color: #f0883e;">→ Event →</div>
<div style="background: #238636; padding: 8px; border-radius: 4px; color: #fff; font-size: 11px;">Client</div>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<div style="background: #1f6feb; padding: 8px; border-radius: 4px; color: #fff; font-size: 11px;">Server</div>
<div style="color: #f0883e;">→ Event →</div>
<div style="background: #238636; padding: 8px; border-radius: 4px; color: #fff; font-size: 11px;">Client</div>
</div>
<div style="color: #8b949e; font-size: 12px; margin-top: 12px;">SSE, WebSocket</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 12px;">Bidirectional</div>
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<div style="background: #238636; padding: 8px; border-radius: 4px; color: #fff; font-size: 11px;">Client</div>
<div style="color: #a371f7;">↔</div>
<div style="background: #1f6feb; padding: 8px; border-radius: 4px; color: #fff; font-size: 11px;">Server</div>
</div>
<div style="color: #8b949e; font-size: 12px; margin-top: 24px;">WebSocket, gRPC streams</div>
</div>
</div>
</div>

---

## Load Balancing Multiple Servers

When a single server can't handle all requests, we use multiple servers with a load balancer:

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">LOAD BALANCED ARCHITECTURE</h4>
<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
<div style="display: flex; gap: 16px;">
<div style="background: #238636; padding: 12px 20px; border-radius: 8px; color: #fff; font-size: 12px;">Client 1</div>
<div style="background: #238636; padding: 12px 20px; border-radius: 8px; color: #fff; font-size: 12px;">Client 2</div>
<div style="background: #238636; padding: 12px 20px; border-radius: 8px; color: #fff; font-size: 12px;">Client 3</div>
</div>
<div style="color: #58a6ff;">↓ ↓ ↓</div>
<div style="background: linear-gradient(135deg, #f0883e 0%, #d29922 100%); padding: 16px 40px; border-radius: 8px; color: #fff; font-weight: bold;">LOAD BALANCER</div>
<div style="display: flex; gap: 8px; color: #58a6ff;">
<span>↙</span>
<span>↓</span>
<span>↘</span>
</div>
<div style="display: flex; gap: 16px;">
<div style="background: #1f6feb; padding: 12px 20px; border-radius: 8px; color: #fff; font-size: 12px;">Server 1</div>
<div style="background: #1f6feb; padding: 12px 20px; border-radius: 8px; color: #fff; font-size: 12px;">Server 2</div>
<div style="background: #1f6feb; padding: 12px 20px; border-radius: 8px; color: #fff; font-size: 12px;">Server 3</div>
</div>
</div>
</div>

### Load Balancing Algorithms

| Algorithm | Description | Best For |
|-----------|-------------|----------|
| **Round Robin** | Rotate through servers | Equal capacity servers |
| **Least Connections** | Send to server with fewest active connections | Varying request duration |
| **IP Hash** | Same client IP always goes to same server | Sticky sessions (when needed) |
| **Weighted** | Distribute based on server capacity | Mixed hardware |

---

## Client-Side vs Server-Side Rendering

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">RENDERING STRATEGIES</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 16px;">Server-Side Rendering (SSR)</div>
<div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
<div style="background: #238636; padding: 8px; border-radius: 4px; text-align: center; color: #fff; font-size: 11px;">Browser requests page</div>
<div style="text-align: center; color: #58a6ff;">↓</div>
<div style="background: #1f6feb; padding: 8px; border-radius: 4px; text-align: center; color: #fff; font-size: 11px;">Server renders HTML</div>
<div style="text-align: center; color: #58a6ff;">↓</div>
<div style="background: #238636; padding: 8px; border-radius: 4px; text-align: center; color: #fff; font-size: 11px;">Browser displays HTML</div>
</div>
<div style="font-size: 12px;">
<div style="color: #7ee787;">✓ Fast initial load</div>
<div style="color: #7ee787;">✓ SEO friendly</div>
<div style="color: #f85149;">✗ Higher server load</div>
<div style="color: #f85149;">✗ Full page reloads</div>
</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 16px;">Client-Side Rendering (CSR)</div>
<div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
<div style="background: #238636; padding: 8px; border-radius: 4px; text-align: center; color: #fff; font-size: 11px;">Browser downloads JS</div>
<div style="text-align: center; color: #58a6ff;">↓</div>
<div style="background: #238636; padding: 8px; border-radius: 4px; text-align: center; color: #fff; font-size: 11px;">JS fetches data via API</div>
<div style="text-align: center; color: #58a6ff;">↓</div>
<div style="background: #238636; padding: 8px; border-radius: 4px; text-align: center; color: #fff; font-size: 11px;">JS renders HTML</div>
</div>
<div style="font-size: 12px;">
<div style="color: #7ee787;">✓ Rich interactions</div>
<div style="color: #7ee787;">✓ Lower server load</div>
<div style="color: #f85149;">✗ Slower initial load</div>
<div style="color: #f85149;">✗ SEO challenges</div>
</div>
</div>
</div>
</div>

---

## Security Considerations

### Common Security Measures

```
CLIENT-SERVER SECURITY LAYERS:

┌──────────────────────────────────────────────────────────────┐
│                         HTTPS/TLS                            │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                   Authentication                        │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │                 Authorization                     │  │  │
│  │  │  ┌────────────────────────────────────────────┐  │  │  │
│  │  │  │            Input Validation                 │  │  │  │
│  │  │  │  ┌──────────────────────────────────────┐  │  │  │  │
│  │  │  │  │         Rate Limiting                 │  │  │  │  │
│  │  │  │  │  ┌────────────────────────────────┐  │  │  │  │  │
│  │  │  │  │  │       Application Code         │  │  │  │  │  │
│  │  │  │  │  └────────────────────────────────┘  │  │  │  │  │
│  │  │  │  └──────────────────────────────────────┘  │  │  │  │
│  │  │  └────────────────────────────────────────────┘  │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

| Security Layer | Purpose | Implementation |
|---------------|---------|----------------|
| **HTTPS/TLS** | Encrypt data in transit | SSL certificates |
| **Authentication** | Verify identity | JWT, OAuth, sessions |
| **Authorization** | Control access | RBAC, permissions |
| **Input Validation** | Prevent injection | Sanitization, parameterized queries |
| **Rate Limiting** | Prevent abuse | Token bucket, sliding window |

---

## Summary

The client-server model is foundational to modern distributed systems:

1. **Clear separation** between requesters (clients) and providers (servers)
2. **Stateless design** enables horizontal scaling
3. **Multi-tier architecture** separates concerns
4. **Load balancing** distributes traffic across servers
5. **Security** must be implemented at multiple layers

---

## Related Topics

- [Network Protocols](/topic/system-design/network-protocols)
- [Load Balancing](/topic/system-design/load-balancing)
- [API Design](/topic/system-design/api-design)
- [Caching](/topic/system-design/caching)
