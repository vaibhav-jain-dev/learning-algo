# Client-Server Model

## Overview

The Client-Server Model is the foundational architecture pattern for distributed computing. It divides computing tasks between service providers (servers) that host resources and service requesters (clients) that consume them. This simple yet powerful paradigm underpins virtually every internet application from web browsing to mobile apps to IoT devices.

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

**Interview Insight**: Understanding client-server architecture is prerequisite knowledge for any system design interview. When asked "Design Twitter," you're essentially designing how clients and servers will communicate.

---

## How It Works: Request-Response Cycle

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

---

## Communication Patterns

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">COMMUNICATION PATTERNS</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
    <div style="background: #dcfce7; border-radius: 12px; padding: 20px; border: 2px solid #22c55e;">
      <div style="color: #166534; font-weight: 700; margin-bottom: 12px;">Request-Response</div>
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="background: #22c55e; padding: 6px 12px; border-radius: 4px; color: white; font-size: 11px;">Client</span>
        <span style="color: #166534;">--></span>
        <span style="background: #3b82f6; padding: 6px 12px; border-radius: 4px; color: white; font-size: 11px;">Server</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="background: #22c55e; padding: 6px 12px; border-radius: 4px; color: white; font-size: 11px;">Client</span>
        <span style="color: #3b82f6;"><--</span>
        <span style="background: #3b82f6; padding: 6px 12px; border-radius: 4px; color: white; font-size: 11px;">Server</span>
      </div>
      <div style="color: #15803d; font-size: 12px; margin-top: 12px;">Synchronous, HTTP/REST</div>
    </div>
    <div style="background: #dbeafe; border-radius: 12px; padding: 20px; border: 2px solid #3b82f6;">
      <div style="color: #1e40af; font-weight: 700; margin-bottom: 12px;">Server Push (SSE)</div>
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="background: #3b82f6; padding: 6px 12px; border-radius: 4px; color: white; font-size: 11px;">Server</span>
        <span style="color: #1e40af;">--></span>
        <span style="background: #22c55e; padding: 6px 12px; border-radius: 4px; color: white; font-size: 11px;">Client</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="background: #3b82f6; padding: 6px 12px; border-radius: 4px; color: white; font-size: 11px;">Server</span>
        <span style="color: #1e40af;">--></span>
        <span style="background: #22c55e; padding: 6px 12px; border-radius: 4px; color: white; font-size: 11px;">Client</span>
      </div>
      <div style="color: #1d4ed8; font-size: 12px; margin-top: 12px;">Server-Sent Events, Push</div>
    </div>
    <div style="background: #f3e8ff; border-radius: 12px; padding: 20px; border: 2px solid #a855f7;">
      <div style="color: #6b21a8; font-weight: 700; margin-bottom: 12px;">Bidirectional</div>
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="background: #22c55e; padding: 6px 12px; border-radius: 4px; color: white; font-size: 11px;">Client</span>
        <span style="color: #6b21a8;"><--></span>
        <span style="background: #3b82f6; padding: 6px 12px; border-radius: 4px; color: white; font-size: 11px;">Server</span>
      </div>
      <div style="color: #7c3aed; font-size: 12px; margin-top: 24px;">WebSocket, gRPC streams</div>
    </div>
    <div style="background: #fef3c7; border-radius: 12px; padding: 20px; border: 2px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 700; margin-bottom: 12px;">Pub-Sub</div>
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="background: #22c55e; padding: 6px 10px; border-radius: 4px; color: white; font-size: 10px;">Pub</span>
        <span style="color: #92400e;">--></span>
        <span style="background: #f59e0b; padding: 6px 10px; border-radius: 4px; color: white; font-size: 10px;">Topic</span>
        <span style="color: #92400e;">--></span>
        <span style="background: #3b82f6; padding: 6px 10px; border-radius: 4px; color: white; font-size: 10px;">Subs</span>
      </div>
      <div style="color: #b45309; font-size: 12px; margin-top: 24px;">Kafka, Redis Pub/Sub</div>
    </div>
  </div>
</div>

---

## Code Examples

### Python - Simple HTTP Server

```python
from flask import Flask, request, jsonify
from dataclasses import dataclass
from typing import Optional
import jwt

app = Flask(__name__)

# Stateless design - no in-memory state
# All data comes from request or external stores

@app.route('/api/users/<int:user_id>')
def get_user(user_id: int):
    """Stateless endpoint - all info from request + database."""
    # Authenticate from header (stateless)
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    try:
        claims = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Unauthorized'}), 401

    # Get data from database (external state)
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Authorization check
    if claims['user_id'] != user_id and not claims.get('is_admin'):
        return jsonify({'error': 'Forbidden'}), 403

    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email
    })


@app.route('/api/orders', methods=['POST'])
def create_order():
    """Stateless order creation."""
    # All data from request body
    data = request.get_json()

    # Validate
    if not data.get('items'):
        return jsonify({'error': 'Items required'}), 400

    # Create order in database
    order = Order(
        user_id=get_current_user_id(),
        items=data['items'],
        total=calculate_total(data['items'])
    )
    db.add(order)
    db.commit()

    return jsonify({
        'id': order.id,
        'status': 'created'
    }), 201
```

### Go - HTTP Server with Middleware

```go
package main

import (
    "context"
    "encoding/json"
    "net/http"
    "strings"
)

// Stateless server - no in-memory session storage
type Server struct {
    db    *Database
    redis *Redis
}

func (s *Server) GetUser(w http.ResponseWriter, r *http.Request) {
    // Get user from context (set by auth middleware)
    claims := r.Context().Value("claims").(*Claims)

    // Parse path parameter
    userID := r.PathValue("id")

    // Query external database
    user, err := s.db.GetUser(r.Context(), userID)
    if err != nil {
        http.Error(w, "User not found", http.StatusNotFound)
        return
    }

    // Authorization
    if claims.UserID != userID && !claims.IsAdmin {
        http.Error(w, "Forbidden", http.StatusForbidden)
        return
    }

    json.NewEncoder(w).Encode(user)
}

// Middleware for authentication
func (s *Server) AuthMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Get token from header
        auth := r.Header.Get("Authorization")
        token := strings.TrimPrefix(auth, "Bearer ")

        // Validate token (stateless - no session lookup)
        claims, err := ValidateJWT(token)
        if err != nil {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }

        // Add claims to context
        ctx := context.WithValue(r.Context(), "claims", claims)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}

func main() {
    server := &Server{
        db:    NewDatabase(),
        redis: NewRedis(),
    }

    mux := http.NewServeMux()

    // Protected routes
    protected := server.AuthMiddleware(mux)

    mux.HandleFunc("GET /api/users/{id}", server.GetUser)
    mux.HandleFunc("POST /api/orders", server.CreateOrder)

    http.ListenAndServe(":8080", protected)
}
```

### JavaScript - Client-Side Implementation

```javascript
class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.token = localStorage.getItem('auth_token');
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        // Include auth token in every request (stateless)
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            if (response.status === 401) {
                // Token expired - redirect to login
                this.handleUnauthorized();
                throw new Error('Unauthorized');
            }

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Request failed');
            }

            return response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // GET request
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    // POST request
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // Set auth token
    setToken(token) {
        this.token = token;
        localStorage.setItem('auth_token', token);
    }

    handleUnauthorized() {
        this.token = null;
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
    }
}

// Usage
const api = new APIClient('https://api.example.com');

// Fetch user
const user = await api.get('/users/123');

// Create order
const order = await api.post('/orders', {
    items: [{ productId: 1, quantity: 2 }]
});
```

---

## Common Pitfalls

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">1. Storing Session in Server Memory</div>
  <div style="color: #7f1d1d; font-size: 14px;">Storing sessions in server memory prevents horizontal scaling. When you add servers, sessions are not shared. Use external stores like Redis.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">2. Tight Coupling Between Client and Server</div>
  <div style="color: #7f1d1d; font-size: 14px;">Changing server response structure breaks clients. Use API versioning (v1, v2) and maintain backward compatibility. Consider GraphQL for flexibility.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">3. No Timeout Handling</div>
  <div style="color: #7f1d1d; font-size: 14px;">Clients should always set timeouts. Server may be slow or unresponsive. Without timeouts, clients hang indefinitely, degrading user experience.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">4. Ignoring Network Failures</div>
  <div style="color: #7f1d1d; font-size: 14px;">Network requests can fail. Clients should implement retry logic with exponential backoff. Show meaningful error messages to users.</div>
</div>

---

## Interview Questions

### Conceptual Questions

**Q1: What makes a server "stateless"?**

A: A stateless server does not store any client session information between requests. Each request must contain all information needed to process it (typically via tokens or cookies that the client stores). Benefits include easier horizontal scaling, better fault tolerance, and simpler load balancing.

**Q2: When would you choose thick client over thin client?**

A: Choose thick client when:
- Offline functionality is required (mobile apps)
- Complex local processing needed (video editing, games)
- Reduced server load is important
- Low-latency interactions needed (no round-trip)

Choose thin client when:
- Easy updates/deployment needed
- Security concerns (no local code execution)
- Minimal client hardware
- Cross-platform compatibility

**Q3: What is the purpose of the application tier in three-tier architecture?**

A: The application tier (middle tier) handles business logic, authentication, data validation, and orchestration. It acts as an intermediary between presentation and data tiers, providing:
- Security boundary (database not exposed to internet)
- Business rule enforcement
- Data transformation and aggregation
- API contracts for clients

### Design Questions

**Q4: "Design the client-server architecture for a real-time chat application."**

Key points:
- WebSocket for bidirectional real-time communication
- Stateless API servers (any server can handle any user)
- Redis Pub/Sub for message distribution across servers
- Message queue for offline message delivery
- Connection state externalized (not in server memory)

**Q5: "How would you scale a client-server application to handle 10x traffic?"**

Answer framework:
1. Ensure servers are stateless (externalize session to Redis)
2. Add load balancer in front of servers
3. Horizontally scale application tier (add more servers)
4. Add database read replicas for read scaling
5. Implement caching (CDN for static, Redis for dynamic)
6. Consider connection pooling for database efficiency
7. Monitor and identify bottlenecks

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

- [Load Balancing](/topic/system-design/load-balancing)
- [API Design](/topic/system-design/api-design)
- [Caching](/topic/system-design/caching)
- [Network Protocols](/topic/system-design/network-protocols)
- [Microservices](/topic/system-design/microservices)
