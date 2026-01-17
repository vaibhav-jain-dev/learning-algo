# Network Protocols

## Overview

Network protocols define rules for communication between devices. Understanding protocols is essential for designing efficient, reliable distributed systems. This guide covers protocols from low-level TCP/UDP to application-level HTTP, WebSocket, and gRPC.

**Tags:** Networking, Protocols, HTTP, gRPC, TCP, WebSocket

---

## The OSI Model

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">OSI MODEL LAYERS</h4>
<div style="display: flex; flex-direction: column; gap: 8px; max-width: 600px; margin: 0 auto;">
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f85149; color: #fff; padding: 12px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold;">7. Application</div>
<div style="color: #8b949e; font-size: 13px;">HTTP, gRPC, WebSocket, SMTP</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f0883e; color: #fff; padding: 12px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold;">6. Presentation</div>
<div style="color: #8b949e; font-size: 13px;">SSL/TLS, Encryption, Compression</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #d29922; color: #fff; padding: 12px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold;">5. Session</div>
<div style="color: #8b949e; font-size: 13px;">Connection management</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #238636; color: #fff; padding: 12px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold;">4. Transport</div>
<div style="color: #8b949e; font-size: 13px;">TCP, UDP - Reliability, ports</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #1f6feb; color: #fff; padding: 12px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold;">3. Network</div>
<div style="color: #8b949e; font-size: 13px;">IP - Routing, addressing</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #8957e5; color: #fff; padding: 12px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold;">2. Data Link</div>
<div style="color: #8b949e; font-size: 13px;">Ethernet, MAC addresses</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #6e40c9; color: #fff; padding: 12px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold;">1. Physical</div>
<div style="color: #8b949e; font-size: 13px;">Cables, signals, bits</div>
</div>
</div>
</div>

---

## TCP vs UDP

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">TRANSPORT LAYER PROTOCOLS</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 24px; border: 1px solid rgba(126,231,135,0.3);">
<div style="color: #7ee787; font-weight: bold; font-size: 18px; margin-bottom: 16px;">TCP (Transmission Control Protocol)</div>
<div style="color: #8b949e; font-size: 13px; margin-bottom: 16px;">Connection-oriented, reliable delivery</div>
<div style="background: #0d1117; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="color: #7ee787; font-size: 12px; font-weight: bold; margin-bottom: 8px;">Three-Way Handshake:</div>
<div style="font-family: monospace; font-size: 11px; color: #c9d1d9;">
Client → SYN → Server<br>
Client ← SYN-ACK ← Server<br>
Client → ACK → Server<br>
<span style="color: #7ee787;">Connection established!</span>
</div>
</div>
<div style="font-size: 13px;">
<div style="color: #7ee787;">✓ Guaranteed delivery</div>
<div style="color: #7ee787;">✓ Ordered packets</div>
<div style="color: #7ee787;">✓ Error checking</div>
<div style="color: #7ee787;">✓ Flow control</div>
<div style="color: #f85149; margin-top: 8px;">✗ Higher latency</div>
<div style="color: #f85149;">✗ More overhead</div>
</div>
</div>
<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 24px; border: 1px solid rgba(88,166,255,0.3);">
<div style="color: #58a6ff; font-weight: bold; font-size: 18px; margin-bottom: 16px;">UDP (User Datagram Protocol)</div>
<div style="color: #8b949e; font-size: 13px; margin-bottom: 16px;">Connectionless, best-effort delivery</div>
<div style="background: #0d1117; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="color: #58a6ff; font-size: 12px; font-weight: bold; margin-bottom: 8px;">No Handshake:</div>
<div style="font-family: monospace; font-size: 11px; color: #c9d1d9;">
Client → Data → Server<br>
Client → Data → Server<br>
Client → Data → Server<br>
<span style="color: #58a6ff;">Fire and forget!</span>
</div>
</div>
<div style="font-size: 13px;">
<div style="color: #7ee787;">✓ Low latency</div>
<div style="color: #7ee787;">✓ Less overhead</div>
<div style="color: #7ee787;">✓ Broadcast/multicast</div>
<div style="color: #7ee787;">✓ Simple</div>
<div style="color: #f85149; margin-top: 8px;">✗ No delivery guarantee</div>
<div style="color: #f85149;">✗ No ordering</div>
</div>
</div>
</div>
</div>

### When to Use Each

| Use Case | TCP | UDP |
|----------|-----|-----|
| Web browsing | ✓ | |
| Email | ✓ | |
| File transfer | ✓ | |
| Video streaming | | ✓ |
| Online gaming | | ✓ |
| VoIP calls | | ✓ |
| DNS queries | | ✓ |
| IoT sensors | | ✓ |

---

## HTTP Protocol

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">HTTP REQUEST/RESPONSE</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<div style="color: #7ee787; font-weight: bold; margin-bottom: 12px;">REQUEST</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 12px;">
<span style="color: #7ee787;">GET</span> <span style="color: #58a6ff;">/api/users/123</span> <span style="color: #8b949e;">HTTP/1.1</span><br>
<span style="color: #f0883e;">Host:</span> api.example.com<br>
<span style="color: #f0883e;">Authorization:</span> Bearer eyJhbG...<br>
<span style="color: #f0883e;">Accept:</span> application/json<br>
<span style="color: #f0883e;">Content-Type:</span> application/json<br>
<br>
<span style="color: #8b949e;">{"name": "John"}</span>
</div>
</div>
<div>
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">RESPONSE</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 12px;">
<span style="color: #8b949e;">HTTP/1.1</span> <span style="color: #7ee787;">200 OK</span><br>
<span style="color: #f0883e;">Content-Type:</span> application/json<br>
<span style="color: #f0883e;">Content-Length:</span> 82<br>
<span style="color: #f0883e;">Cache-Control:</span> max-age=3600<br>
<br>
<span style="color: #8b949e;">{<br>
  "id": 123,<br>
  "name": "John Doe",<br>
  "email": "john@example.com"<br>
}</span>
</div>
</div>
</div>
</div>

### HTTP Methods

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 1px solid #30363d;">
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
<div style="background: #21262d; border-radius: 8px; padding: 16px; text-align: center;">
<div style="background: #238636; color: #fff; padding: 4px 12px; border-radius: 4px; display: inline-block; font-weight: bold; margin-bottom: 8px;">GET</div>
<div style="color: #8b949e; font-size: 12px;">Read resource</div>
<div style="color: #7ee787; font-size: 11px; margin-top: 4px;">Safe, Idempotent</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px; text-align: center;">
<div style="background: #1f6feb; color: #fff; padding: 4px 12px; border-radius: 4px; display: inline-block; font-weight: bold; margin-bottom: 8px;">POST</div>
<div style="color: #8b949e; font-size: 12px;">Create resource</div>
<div style="color: #f0883e; font-size: 11px; margin-top: 4px;">Not idempotent</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px; text-align: center;">
<div style="background: #f0883e; color: #fff; padding: 4px 12px; border-radius: 4px; display: inline-block; font-weight: bold; margin-bottom: 8px;">PUT</div>
<div style="color: #8b949e; font-size: 12px;">Replace resource</div>
<div style="color: #7ee787; font-size: 11px; margin-top: 4px;">Idempotent</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px; text-align: center;">
<div style="background: #da3633; color: #fff; padding: 4px 12px; border-radius: 4px; display: inline-block; font-weight: bold; margin-bottom: 8px;">DELETE</div>
<div style="color: #8b949e; font-size: 12px;">Remove resource</div>
<div style="color: #7ee787; font-size: 11px; margin-top: 4px;">Idempotent</div>
</div>
</div>
</div>

### HTTP Status Codes

| Range | Category | Common Codes |
|-------|----------|--------------|
| **1xx** | Informational | 100 Continue, 101 Switching Protocols |
| **2xx** | Success | 200 OK, 201 Created, 204 No Content |
| **3xx** | Redirection | 301 Moved Permanently, 304 Not Modified |
| **4xx** | Client Error | 400 Bad Request, 401 Unauthorized, 404 Not Found |
| **5xx** | Server Error | 500 Internal Error, 502 Bad Gateway, 503 Unavailable |

---

## HTTP/1.1 vs HTTP/2 vs HTTP/3

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">HTTP VERSION COMPARISON</h4>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 16px;">HTTP/1.1 (1997)</div>
<div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px;">
<div style="background: #f0883e; height: 8px; border-radius: 2px; width: 100%;"></div>
<div style="background: #21262d; height: 8px; border-radius: 2px; width: 100%; border: 1px dashed #f0883e;"></div>
<div style="background: #f0883e; height: 8px; border-radius: 2px; width: 100%;"></div>
<div style="color: #8b949e; font-size: 10px; text-align: center;">Sequential requests</div>
</div>
<ul style="color: #8b949e; font-size: 12px; margin: 0; padding-left: 16px;">
<li>One request at a time per connection</li>
<li>Head-of-line blocking</li>
<li>Text-based headers</li>
<li>No server push</li>
</ul>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 16px;">HTTP/2 (2015)</div>
<div style="display: flex; gap: 4px; margin-bottom: 12px;">
<div style="display: flex; flex-direction: column; gap: 2px; flex: 1;">
<div style="background: #58a6ff; height: 8px; border-radius: 2px;"></div>
<div style="background: #7ee787; height: 8px; border-radius: 2px;"></div>
<div style="background: #a371f7; height: 8px; border-radius: 2px;"></div>
</div>
<div style="color: #8b949e; font-size: 10px; writing-mode: vertical-rl; text-orientation: mixed;">Multiplexed</div>
</div>
<ul style="color: #8b949e; font-size: 12px; margin: 0; padding-left: 16px;">
<li>Multiple streams per connection</li>
<li>Binary framing</li>
<li>Header compression (HPACK)</li>
<li>Server push</li>
</ul>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 16px;">HTTP/3 (2022)</div>
<div style="display: flex; gap: 4px; margin-bottom: 12px;">
<div style="display: flex; flex-direction: column; gap: 2px; flex: 1;">
<div style="background: #7ee787; height: 8px; border-radius: 2px;"></div>
<div style="background: #58a6ff; height: 8px; border-radius: 2px;"></div>
<div style="background: #f0883e; height: 8px; border-radius: 2px;"></div>
</div>
<div style="color: #8b949e; font-size: 10px; writing-mode: vertical-rl; text-orientation: mixed;">QUIC/UDP</div>
</div>
<ul style="color: #8b949e; font-size: 12px; margin: 0; padding-left: 16px;">
<li>Built on QUIC (UDP-based)</li>
<li>No head-of-line blocking</li>
<li>Faster connection setup</li>
<li>Better for mobile</li>
</ul>
</div>
</div>
</div>

---

## WebSocket

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">WEBSOCKET vs HTTP</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 16px;">HTTP (Half-Duplex)</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="display: flex; align-items: center; gap: 8px;">
<div style="background: #238636; padding: 6px 12px; border-radius: 4px; color: #fff; font-size: 11px;">Client</div>
<div style="color: #f0883e;">→ Request →</div>
<div style="background: #1f6feb; padding: 6px 12px; border-radius: 4px; color: #fff; font-size: 11px;">Server</div>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<div style="background: #238636; padding: 6px 12px; border-radius: 4px; color: #fff; font-size: 11px;">Client</div>
<div style="color: #58a6ff;">← Response ←</div>
<div style="background: #1f6feb; padding: 6px 12px; border-radius: 4px; color: #fff; font-size: 11px;">Server</div>
</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 8px; text-align: center;">New connection each time</div>
</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 16px;">WebSocket (Full-Duplex)</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="display: flex; align-items: center; gap: 8px;">
<div style="background: #238636; padding: 6px 12px; border-radius: 4px; color: #fff; font-size: 11px;">Client</div>
<div style="color: #7ee787;">↔ Persistent ↔</div>
<div style="background: #1f6feb; padding: 6px 12px; border-radius: 4px; color: #fff; font-size: 11px;">Server</div>
</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 8px; text-align: center;">Single persistent connection<br>Both sides can send anytime</div>
</div>
</div>
</div>
</div>

### WebSocket Handshake

```http
# Client Request (HTTP Upgrade)
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13

# Server Response
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

### WebSocket Use Cases

| Use Case | Why WebSocket |
|----------|---------------|
| Chat applications | Real-time message delivery |
| Live sports scores | Instant updates |
| Collaborative editing | Sync changes instantly |
| Gaming | Low-latency bidirectional |
| Stock tickers | Real-time price updates |
| Notifications | Server-initiated messages |

---

## gRPC Protocol

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">gRPC ARCHITECTURE</h4>
<div style="display: flex; align-items: center; justify-content: center; gap: 40px;">
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); width: 140px; padding: 20px; border-radius: 12px; margin-bottom: 12px;">
<div style="color: #fff; font-weight: bold;">gRPC Client</div>
<div style="color: rgba(255,255,255,0.7); font-size: 11px; margin-top: 8px;">Generated Stub</div>
</div>
<div style="color: #8b949e; font-size: 11px;">Python, Go, Java, etc.</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="color: #58a6ff; font-size: 12px;">HTTP/2</div>
<div style="display: flex; gap: 4px;">
<div style="color: #7ee787;">→</div>
<div style="background: #a371f7; padding: 8px 16px; border-radius: 6px; color: #fff; font-size: 11px;">Protobuf</div>
<div style="color: #7ee787;">→</div>
</div>
<div style="color: #8b949e; font-size: 11px;">Binary serialization</div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); width: 140px; padding: 20px; border-radius: 12px; margin-bottom: 12px;">
<div style="color: #fff; font-weight: bold;">gRPC Server</div>
<div style="color: rgba(255,255,255,0.7); font-size: 11px; margin-top: 8px;">Service Implementation</div>
</div>
<div style="color: #8b949e; font-size: 11px;">Python, Go, Java, etc.</div>
</div>
</div>
</div>

### Protocol Buffers (Protobuf)

```protobuf
// user.proto - Define service and messages
syntax = "proto3";

package user;

// Service definition
service UserService {
  rpc GetUser (GetUserRequest) returns (User);
  rpc ListUsers (ListUsersRequest) returns (stream User);
  rpc CreateUser (User) returns (User);
  rpc UpdateUser (stream User) returns (stream User);
}

// Message definitions
message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
  repeated string roles = 4;
}

message GetUserRequest {
  int32 id = 1;
}

message ListUsersRequest {
  int32 page_size = 1;
  string page_token = 2;
}
```

### gRPC Communication Patterns

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">gRPC STREAMING TYPES</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 12px;">Unary RPC</div>
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<div style="background: #238636; padding: 6px; border-radius: 4px; color: #fff; font-size: 10px;">C</div>
<div style="color: #7ee787; font-size: 12px;">→ 1 Request →</div>
<div style="background: #1f6feb; padding: 6px; border-radius: 4px; color: #fff; font-size: 10px;">S</div>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<div style="background: #238636; padding: 6px; border-radius: 4px; color: #fff; font-size: 10px;">C</div>
<div style="color: #58a6ff; font-size: 12px;">← 1 Response ←</div>
<div style="background: #1f6feb; padding: 6px; border-radius: 4px; color: #fff; font-size: 10px;">S</div>
</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 8px;">Single request, single response</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Server Streaming</div>
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<div style="background: #238636; padding: 6px; border-radius: 4px; color: #fff; font-size: 10px;">C</div>
<div style="color: #7ee787; font-size: 12px;">→ 1 Request →</div>
<div style="background: #1f6feb; padding: 6px; border-radius: 4px; color: #fff; font-size: 10px;">S</div>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<div style="background: #238636; padding: 6px; border-radius: 4px; color: #fff; font-size: 10px;">C</div>
<div style="color: #58a6ff; font-size: 12px;">← N Responses ←</div>
<div style="background: #1f6feb; padding: 6px; border-radius: 4px; color: #fff; font-size: 10px;">S</div>
</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 8px;">Stream of responses from server</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">Client Streaming</div>
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<div style="background: #238636; padding: 6px; border-radius: 4px; color: #fff; font-size: 10px;">C</div>
<div style="color: #7ee787; font-size: 12px;">→ N Requests →</div>
<div style="background: #1f6feb; padding: 6px; border-radius: 4px; color: #fff; font-size: 10px;">S</div>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<div style="background: #238636; padding: 6px; border-radius: 4px; color: #fff; font-size: 10px;">C</div>
<div style="color: #58a6ff; font-size: 12px;">← 1 Response ←</div>
<div style="background: #1f6feb; padding: 6px; border-radius: 4px; color: #fff; font-size: 10px;">S</div>
</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 8px;">Stream of requests from client</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 12px;">Bidirectional Streaming</div>
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<div style="background: #238636; padding: 6px; border-radius: 4px; color: #fff; font-size: 10px;">C</div>
<div style="color: #a371f7; font-size: 12px;">↔ N Messages ↔</div>
<div style="background: #1f6feb; padding: 6px; border-radius: 4px; color: #fff; font-size: 10px;">S</div>
</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 8px;">Both sides stream independently</div>
</div>
</div>
</div>

### gRPC vs REST

| Feature | gRPC | REST |
|---------|------|------|
| **Protocol** | HTTP/2 | HTTP/1.1 or HTTP/2 |
| **Format** | Protobuf (binary) | JSON (text) |
| **Contract** | Required (.proto) | Optional (OpenAPI) |
| **Streaming** | Native support | Limited |
| **Browser** | Requires proxy | Native |
| **Performance** | Faster | Slower |
| **Debugging** | Harder | Easier |
| **Code gen** | Built-in | External tools |

---

## Server-Sent Events (SSE)

One-way streaming from server to client over HTTP:

```javascript
// Client-side JavaScript
const eventSource = new EventSource('/api/events');

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

eventSource.onerror = (error) => {
  console.error('SSE Error:', error);
};
```

```python
# Server-side Python (Flask)
@app.route('/api/events')
def events():
    def generate():
        while True:
            data = get_latest_update()
            yield f"data: {json.dumps(data)}\n\n"
            time.sleep(1)

    return Response(
        generate(),
        mimetype='text/event-stream'
    )
```

### SSE vs WebSocket

| Aspect | SSE | WebSocket |
|--------|-----|-----------|
| Direction | Server → Client only | Bidirectional |
| Protocol | HTTP | Custom over TCP |
| Reconnection | Automatic | Manual |
| Binary data | No | Yes |
| Browser support | Excellent | Excellent |
| Complexity | Simple | More complex |

---

## Protocol Selection Guide

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">WHICH PROTOCOL TO USE?</h4>
<div style="display: grid; gap: 16px;">
<div style="display: flex; align-items: center; gap: 16px; background: #21262d; padding: 16px; border-radius: 8px;">
<div style="background: #238636; color: #fff; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: bold;">REST</div>
<div style="color: #8b949e; font-size: 13px;">CRUD APIs, public APIs, browser clients, simple integrations</div>
</div>
<div style="display: flex; align-items: center; gap: 16px; background: #21262d; padding: 16px; border-radius: 8px;">
<div style="background: #1f6feb; color: #fff; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: bold;">gRPC</div>
<div style="color: #8b949e; font-size: 13px;">Microservices, high performance, streaming, polyglot systems</div>
</div>
<div style="display: flex; align-items: center; gap: 16px; background: #21262d; padding: 16px; border-radius: 8px;">
<div style="background: #8957e5; color: #fff; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: bold;">WebSocket</div>
<div style="color: #8b949e; font-size: 13px;">Real-time bidirectional, chat, gaming, collaborative apps</div>
</div>
<div style="display: flex; align-items: center; gap: 16px; background: #21262d; padding: 16px; border-radius: 8px;">
<div style="background: #f0883e; color: #fff; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: bold;">SSE</div>
<div style="color: #8b949e; font-size: 13px;">Server push only, notifications, live feeds, simple streaming</div>
</div>
<div style="display: flex; align-items: center; gap: 16px; background: #21262d; padding: 16px; border-radius: 8px;">
<div style="background: #da3633; color: #fff; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: bold;">UDP</div>
<div style="color: #8b949e; font-size: 13px;">Video streaming, gaming, VoIP, when some loss is acceptable</div>
</div>
</div>
</div>

---

## Summary

Understanding network protocols helps you choose the right tool:

1. **TCP** for reliable delivery, **UDP** for low latency
2. **HTTP/REST** for simple APIs, **gRPC** for performance-critical microservices
3. **WebSocket** for real-time bidirectional, **SSE** for server push
4. **HTTP/2** and **HTTP/3** improve on HTTP/1.1 with multiplexing

---

## Related Topics

- [Client-Server Model](/topic/system-design/client-server-model)
- [API Design](/topic/system-design/api-design)
- [Load Balancing](/topic/system-design/load-balancing)
- [Message Queues](/topic/system-design/message-queues)
