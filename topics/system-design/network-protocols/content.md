# Network Protocols

## Overview

Network protocols are the rules and conventions that govern how devices communicate over a network. Think of them like languages - just as humans need a common language to communicate, computers need agreed-upon protocols to exchange data reliably.

Understanding protocols is essential for system design because every distributed system relies on network communication. The protocol you choose affects latency, reliability, bandwidth usage, and complexity.

---

## Why Network Protocols Matter

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">
<h4 style="color: #166534; margin-top: 0;">Real-World Impact</h4>
<div style="color: #1e293b;">

**Google** switched from HTTP/1.1 to HTTP/2 internally and saw 50% reduction in page load times. Protocol choice directly impacts user experience.

**Discord** uses UDP for voice chat because low latency matters more than perfect reliability - a slight audio glitch is better than delayed audio.

**Stripe** uses gRPC between microservices for high-performance communication, achieving sub-millisecond latency for internal API calls while using REST for external APIs.

</div>
</div>

---

## The OSI Model

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">OSI Model Layers</h4>
<div style="display: flex; flex-direction: column; gap: 8px; max-width: 600px; margin: 0 auto;">
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #fef2f2; color: #991b1b; padding: 12px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold; border: 1px solid #fecaca;">7. Application</div>
<div style="color: #475569; font-size: 13px;">HTTP, gRPC, WebSocket, SMTP</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #fff7ed; color: #9a3412; padding: 12px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold; border: 1px solid #fed7aa;">6. Presentation</div>
<div style="color: #475569; font-size: 13px;">SSL/TLS, Encryption, Compression</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #fefce8; color: #854d0e; padding: 12px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold; border: 1px solid #fef08a;">5. Session</div>
<div style="color: #475569; font-size: 13px;">Connection management</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f0fdf4; color: #166534; padding: 12px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold; border: 1px solid #bbf7d0;">4. Transport</div>
<div style="color: #475569; font-size: 13px;">TCP, UDP - Reliability, ports</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #eff6ff; color: #1e40af; padding: 12px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold; border: 1px solid #bfdbfe;">3. Network</div>
<div style="color: #475569; font-size: 13px;">IP - Routing, addressing</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f3e8ff; color: #7c3aed; padding: 12px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold; border: 1px solid #d8b4fe;">2. Data Link</div>
<div style="color: #475569; font-size: 13px;">Ethernet, MAC addresses</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f1f5f9; color: #475569; padding: 12px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold; border: 1px solid #cbd5e1;">1. Physical</div>
<div style="color: #475569; font-size: 13px;">Cables, signals, bits</div>
</div>
</div>
<div style="text-align: center; margin-top: 16px; color: #64748b; font-size: 13px;">
Higher layers = More abstraction | Lower layers = Closer to hardware
</div>
</div>

---

## TCP vs UDP

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Transport Layer Protocols</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; border: 1px solid #bbf7d0;">
<h5 style="color: #166534; margin: 0 0 16px 0;">TCP (Transmission Control Protocol)</h5>
<div style="color: #475569; font-size: 13px; margin-bottom: 16px;">Connection-oriented, reliable delivery</div>
<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="color: #166534; font-size: 12px; font-weight: bold; margin-bottom: 8px;">Three-Way Handshake:</div>
<div style="font-family: monospace; font-size: 11px; color: #1e293b;">
Client --> SYN --> Server<br>
Client <-- SYN-ACK <-- Server<br>
Client --> ACK --> Server<br>
<span style="color: #166534;">Connection established!</span>
</div>
</div>
<div style="font-size: 13px;">
<div style="color: #166534; margin-bottom: 4px;">+ Guaranteed delivery</div>
<div style="color: #166534; margin-bottom: 4px;">+ Ordered packets</div>
<div style="color: #166534; margin-bottom: 4px;">+ Error checking</div>
<div style="color: #166534; margin-bottom: 8px;">+ Flow control</div>
<div style="color: #dc2626; margin-bottom: 4px;">- Higher latency</div>
<div style="color: #dc2626;">- More overhead</div>
</div>
</div>
<div style="background: #eff6ff; border-radius: 12px; padding: 24px; border: 1px solid #bfdbfe;">
<h5 style="color: #1e40af; margin: 0 0 16px 0;">UDP (User Datagram Protocol)</h5>
<div style="color: #475569; font-size: 13px; margin-bottom: 16px;">Connectionless, best-effort delivery</div>
<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="color: #1e40af; font-size: 12px; font-weight: bold; margin-bottom: 8px;">No Handshake:</div>
<div style="font-family: monospace; font-size: 11px; color: #1e293b;">
Client --> Data --> Server<br>
Client --> Data --> Server<br>
Client --> Data --> Server<br>
<span style="color: #1e40af;">Fire and forget!</span>
</div>
</div>
<div style="font-size: 13px;">
<div style="color: #166534; margin-bottom: 4px;">+ Low latency</div>
<div style="color: #166534; margin-bottom: 4px;">+ Less overhead</div>
<div style="color: #166534; margin-bottom: 4px;">+ Broadcast/multicast</div>
<div style="color: #166534; margin-bottom: 8px;">+ Simple</div>
<div style="color: #dc2626; margin-bottom: 4px;">- No delivery guarantee</div>
<div style="color: #dc2626;">- No ordering</div>
</div>
</div>
</div>
</div>

### When to Use Each

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
<tr style="background: #f1f5f9;">
<th style="padding: 12px; text-align: left; color: #1e293b;">Use Case</th>
<th style="padding: 12px; text-align: center; color: #1e293b;">TCP</th>
<th style="padding: 12px; text-align: center; color: #1e293b;">UDP</th>
<th style="padding: 12px; text-align: left; color: #1e293b;">Why</th>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">Web browsing</td>
<td style="padding: 12px; text-align: center; color: #166534; border-bottom: 1px solid #e2e8f0;">Yes</td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0;"></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Need complete, ordered data</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">File transfer</td>
<td style="padding: 12px; text-align: center; color: #166534; border-bottom: 1px solid #e2e8f0;">Yes</td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0;"></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Cannot lose any bytes</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">Video streaming</td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0;"></td>
<td style="padding: 12px; text-align: center; color: #1e40af; border-bottom: 1px solid #e2e8f0;">Yes</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Latency matters more than perfection</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">Online gaming</td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0;"></td>
<td style="padding: 12px; text-align: center; color: #1e40af; border-bottom: 1px solid #e2e8f0;">Yes</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Real-time > reliability</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">VoIP calls</td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0;"></td>
<td style="padding: 12px; text-align: center; color: #1e40af; border-bottom: 1px solid #e2e8f0;">Yes</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Delayed audio is worse than glitchy</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b;">DNS queries</td>
<td style="padding: 12px; text-align: center;"></td>
<td style="padding: 12px; text-align: center; color: #1e40af;">Yes</td>
<td style="padding: 12px; color: #475569;">Small, stateless lookups</td>
</tr>
</table>
</div>

---

## HTTP Protocol

### HTTP Request/Response

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">HTTP Request/Response</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<div style="color: #166534; font-weight: bold; margin-bottom: 12px;">REQUEST</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 12px;">
<span style="color: #166534;">GET</span> <span style="color: #1e40af;">/api/users/123</span> <span style="color: #64748b;">HTTP/1.1</span><br>
<span style="color: #ea580c;">Host:</span> api.example.com<br>
<span style="color: #ea580c;">Authorization:</span> Bearer eyJhbG...<br>
<span style="color: #ea580c;">Accept:</span> application/json<br>
<br>
<span style="color: #64748b;">{"name": "John"}</span>
</div>
</div>
<div>
<div style="color: #1e40af; font-weight: bold; margin-bottom: 12px;">RESPONSE</div>
<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 12px;">
<span style="color: #64748b;">HTTP/1.1</span> <span style="color: #166534;">200 OK</span><br>
<span style="color: #ea580c;">Content-Type:</span> application/json<br>
<span style="color: #ea580c;">Content-Length:</span> 82<br>
<span style="color: #ea580c;">Cache-Control:</span> max-age=3600<br>
<br>
<span style="color: #64748b;">{"id": 123, "name": "John Doe"}</span>
</div>
</div>
</div>
</div>

### HTTP Methods

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
<div style="background: #f0fdf4; border-radius: 8px; padding: 16px; text-align: center; border: 1px solid #bbf7d0;">
<div style="background: #22c55e; color: white; padding: 4px 12px; border-radius: 4px; display: inline-block; font-weight: bold; margin-bottom: 8px;">GET</div>
<div style="color: #1e293b; font-size: 12px;">Read resource</div>
<div style="color: #166534; font-size: 11px; margin-top: 4px;">Safe, Idempotent</div>
</div>
<div style="background: #eff6ff; border-radius: 8px; padding: 16px; text-align: center; border: 1px solid #bfdbfe;">
<div style="background: #3b82f6; color: white; padding: 4px 12px; border-radius: 4px; display: inline-block; font-weight: bold; margin-bottom: 8px;">POST</div>
<div style="color: #1e293b; font-size: 12px;">Create resource</div>
<div style="color: #ea580c; font-size: 11px; margin-top: 4px;">Not idempotent</div>
</div>
<div style="background: #fff7ed; border-radius: 8px; padding: 16px; text-align: center; border: 1px solid #fed7aa;">
<div style="background: #f97316; color: white; padding: 4px 12px; border-radius: 4px; display: inline-block; font-weight: bold; margin-bottom: 8px;">PUT</div>
<div style="color: #1e293b; font-size: 12px;">Replace resource</div>
<div style="color: #166534; font-size: 11px; margin-top: 4px;">Idempotent</div>
</div>
<div style="background: #fef2f2; border-radius: 8px; padding: 16px; text-align: center; border: 1px solid #fecaca;">
<div style="background: #ef4444; color: white; padding: 4px 12px; border-radius: 4px; display: inline-block; font-weight: bold; margin-bottom: 8px;">DELETE</div>
<div style="color: #1e293b; font-size: 12px;">Remove resource</div>
<div style="color: #166534; font-size: 11px; margin-top: 4px;">Idempotent</div>
</div>
</div>
</div>

### HTTP Status Codes

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
<tr style="background: #f1f5f9;">
<th style="padding: 12px; text-align: left; color: #1e293b;">Range</th>
<th style="padding: 12px; text-align: left; color: #1e293b;">Category</th>
<th style="padding: 12px; text-align: left; color: #1e293b;">Common Codes</th>
</tr>
<tr>
<td style="padding: 12px; color: #64748b; border-bottom: 1px solid #e2e8f0;"><strong>1xx</strong></td>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">Informational</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">100 Continue, 101 Switching Protocols</td>
</tr>
<tr>
<td style="padding: 12px; color: #166534; border-bottom: 1px solid #e2e8f0;"><strong>2xx</strong></td>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">Success</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">200 OK, 201 Created, 204 No Content</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e40af; border-bottom: 1px solid #e2e8f0;"><strong>3xx</strong></td>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">Redirection</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">301 Moved Permanently, 304 Not Modified</td>
</tr>
<tr>
<td style="padding: 12px; color: #ea580c; border-bottom: 1px solid #e2e8f0;"><strong>4xx</strong></td>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">Client Error</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">400 Bad Request, 401 Unauthorized, 404 Not Found</td>
</tr>
<tr>
<td style="padding: 12px; color: #dc2626;"><strong>5xx</strong></td>
<td style="padding: 12px; color: #1e293b;">Server Error</td>
<td style="padding: 12px; color: #475569;">500 Internal Error, 502 Bad Gateway, 503 Unavailable</td>
</tr>
</table>
</div>

---

## HTTP/1.1 vs HTTP/2 vs HTTP/3

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">HTTP Version Comparison</h4>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
<div style="background: #fff7ed; border-radius: 12px; padding: 20px; border: 1px solid #fed7aa;">
<h5 style="color: #9a3412; margin: 0 0 16px 0;">HTTP/1.1 (1997)</h5>
<div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px;">
<div style="background: #fdba74; height: 8px; border-radius: 2px;"></div>
<div style="height: 8px; border-radius: 2px; border: 1px dashed #fdba74;"></div>
<div style="background: #fdba74; height: 8px; border-radius: 2px;"></div>
<div style="color: #64748b; font-size: 10px; text-align: center; margin-top: 4px;">Sequential requests</div>
</div>
<ul style="color: #475569; font-size: 12px; margin: 0; padding-left: 16px;">
<li>One request at a time</li>
<li>Head-of-line blocking</li>
<li>Text-based headers</li>
<li>No server push</li>
</ul>
</div>
<div style="background: #eff6ff; border-radius: 12px; padding: 20px; border: 1px solid #bfdbfe;">
<h5 style="color: #1e40af; margin: 0 0 16px 0;">HTTP/2 (2015)</h5>
<div style="display: flex; gap: 4px; margin-bottom: 12px;">
<div style="display: flex; flex-direction: column; gap: 2px; flex: 1;">
<div style="background: #60a5fa; height: 8px; border-radius: 2px;"></div>
<div style="background: #4ade80; height: 8px; border-radius: 2px;"></div>
<div style="background: #c084fc; height: 8px; border-radius: 2px;"></div>
</div>
<div style="color: #64748b; font-size: 10px; writing-mode: vertical-rl;">Multiplexed</div>
</div>
<ul style="color: #475569; font-size: 12px; margin: 0; padding-left: 16px;">
<li>Multiple streams</li>
<li>Binary framing</li>
<li>Header compression</li>
<li>Server push</li>
</ul>
</div>
<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; border: 1px solid #bbf7d0;">
<h5 style="color: #166534; margin: 0 0 16px 0;">HTTP/3 (2022)</h5>
<div style="display: flex; gap: 4px; margin-bottom: 12px;">
<div style="display: flex; flex-direction: column; gap: 2px; flex: 1;">
<div style="background: #4ade80; height: 8px; border-radius: 2px;"></div>
<div style="background: #60a5fa; height: 8px; border-radius: 2px;"></div>
<div style="background: #fb923c; height: 8px; border-radius: 2px;"></div>
</div>
<div style="color: #64748b; font-size: 10px; writing-mode: vertical-rl;">QUIC/UDP</div>
</div>
<ul style="color: #475569; font-size: 12px; margin: 0; padding-left: 16px;">
<li>Built on QUIC (UDP)</li>
<li>No HOL blocking</li>
<li>Faster connection</li>
<li>Better for mobile</li>
</ul>
</div>
</div>
</div>

---

## WebSocket

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">WebSocket vs HTTP</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #fff7ed; border-radius: 12px; padding: 20px; border: 1px solid #fed7aa;">
<h5 style="color: #9a3412; margin: 0 0 16px 0;">HTTP (Half-Duplex)</h5>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="display: flex; align-items: center; gap: 8px;">
<div style="background: #22c55e; padding: 6px 12px; border-radius: 4px; color: white; font-size: 11px;">Client</div>
<div style="color: #ea580c;">--> Request --></div>
<div style="background: #3b82f6; padding: 6px 12px; border-radius: 4px; color: white; font-size: 11px;">Server</div>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<div style="background: #22c55e; padding: 6px 12px; border-radius: 4px; color: white; font-size: 11px;">Client</div>
<div style="color: #3b82f6;"><-- Response <--</div>
<div style="background: #3b82f6; padding: 6px 12px; border-radius: 4px; color: white; font-size: 11px;">Server</div>
</div>
<div style="color: #64748b; font-size: 11px; margin-top: 8px; text-align: center;">New connection each time</div>
</div>
</div>
<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; border: 1px solid #bbf7d0;">
<h5 style="color: #166534; margin: 0 0 16px 0;">WebSocket (Full-Duplex)</h5>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="display: flex; align-items: center; gap: 8px;">
<div style="background: #22c55e; padding: 6px 12px; border-radius: 4px; color: white; font-size: 11px;">Client</div>
<div style="color: #166534;"><--> Persistent <--></div>
<div style="background: #3b82f6; padding: 6px 12px; border-radius: 4px; color: white; font-size: 11px;">Server</div>
</div>
<div style="color: #64748b; font-size: 11px; margin-top: 8px; text-align: center;">Single persistent connection<br>Both sides can send anytime</div>
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

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
<tr style="background: #f1f5f9;">
<th style="padding: 12px; text-align: left; color: #1e293b;">Use Case</th>
<th style="padding: 12px; text-align: left; color: #1e293b;">Why WebSocket</th>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">Chat applications</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Real-time message delivery, both ways</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">Live sports scores</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Instant server-push updates</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">Collaborative editing</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Sync changes between users instantly</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">Gaming</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Low-latency bidirectional communication</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b;">Stock tickers</td>
<td style="padding: 12px; color: #475569;">Real-time price updates</td>
</tr>
</table>
</div>

---

## gRPC Protocol

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">gRPC Architecture</h4>
<div style="display: flex; align-items: center; justify-content: center; gap: 40px; flex-wrap: wrap;">
<div style="text-align: center;">
<div style="background: #dcfce7; padding: 20px; border-radius: 12px; border: 1px solid #22c55e; min-width: 120px;">
<div style="color: #166534; font-weight: bold;">gRPC Client</div>
<div style="color: #64748b; font-size: 11px; margin-top: 8px;">Generated Stub</div>
</div>
<div style="color: #64748b; font-size: 11px; margin-top: 8px;">Python, Go, Java</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="color: #1e40af; font-size: 12px;">HTTP/2</div>
<div style="display: flex; align-items: center; gap: 4px;">
<div style="color: #64748b;">--></div>
<div style="background: #f3e8ff; padding: 8px 16px; border-radius: 6px; color: #7c3aed; font-size: 11px; border: 1px solid #d8b4fe;">Protobuf</div>
<div style="color: #64748b;">--></div>
</div>
<div style="color: #64748b; font-size: 11px;">Binary serialization</div>
</div>
<div style="text-align: center;">
<div style="background: #dbeafe; padding: 20px; border-radius: 12px; border: 1px solid #3b82f6; min-width: 120px;">
<div style="color: #1e40af; font-weight: bold;">gRPC Server</div>
<div style="color: #64748b; font-size: 11px; margin-top: 8px;">Implementation</div>
</div>
<div style="color: #64748b; font-size: 11px; margin-top: 8px;">Python, Go, Java</div>
</div>
</div>
</div>

### Protocol Buffers (Protobuf)

```protobuf
syntax = "proto3";
package user;

service UserService {
  rpc GetUser (GetUserRequest) returns (User);
  rpc ListUsers (ListUsersRequest) returns (stream User);
  rpc CreateUser (User) returns (User);
}

message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
  repeated string roles = 4;
}

message GetUserRequest {
  int32 id = 1;
}
```

### gRPC Streaming Types

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">gRPC Communication Patterns</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; border: 1px solid #bbf7d0;">
<h5 style="color: #166534; margin: 0 0 12px 0;">Unary RPC</h5>
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<div style="background: #22c55e; padding: 6px; border-radius: 4px; color: white; font-size: 10px;">C</div>
<div style="color: #166534; font-size: 12px;">--> 1 Request --></div>
<div style="background: #3b82f6; padding: 6px; border-radius: 4px; color: white; font-size: 10px;">S</div>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<div style="background: #22c55e; padding: 6px; border-radius: 4px; color: white; font-size: 10px;">C</div>
<div style="color: #1e40af; font-size: 12px;"><-- 1 Response <--</div>
<div style="background: #3b82f6; padding: 6px; border-radius: 4px; color: white; font-size: 10px;">S</div>
</div>
<div style="color: #64748b; font-size: 11px; margin-top: 8px;">Single request, single response</div>
</div>
<div style="background: #eff6ff; border-radius: 12px; padding: 20px; border: 1px solid #bfdbfe;">
<h5 style="color: #1e40af; margin: 0 0 12px 0;">Server Streaming</h5>
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<div style="background: #22c55e; padding: 6px; border-radius: 4px; color: white; font-size: 10px;">C</div>
<div style="color: #166534; font-size: 12px;">--> 1 Request --></div>
<div style="background: #3b82f6; padding: 6px; border-radius: 4px; color: white; font-size: 10px;">S</div>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<div style="background: #22c55e; padding: 6px; border-radius: 4px; color: white; font-size: 10px;">C</div>
<div style="color: #1e40af; font-size: 12px;"><-- N Responses <--</div>
<div style="background: #3b82f6; padding: 6px; border-radius: 4px; color: white; font-size: 10px;">S</div>
</div>
<div style="color: #64748b; font-size: 11px; margin-top: 8px;">Stream of responses from server</div>
</div>
<div style="background: #fff7ed; border-radius: 12px; padding: 20px; border: 1px solid #fed7aa;">
<h5 style="color: #9a3412; margin: 0 0 12px 0;">Client Streaming</h5>
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<div style="background: #22c55e; padding: 6px; border-radius: 4px; color: white; font-size: 10px;">C</div>
<div style="color: #166534; font-size: 12px;">--> N Requests --></div>
<div style="background: #3b82f6; padding: 6px; border-radius: 4px; color: white; font-size: 10px;">S</div>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<div style="background: #22c55e; padding: 6px; border-radius: 4px; color: white; font-size: 10px;">C</div>
<div style="color: #1e40af; font-size: 12px;"><-- 1 Response <--</div>
<div style="background: #3b82f6; padding: 6px; border-radius: 4px; color: white; font-size: 10px;">S</div>
</div>
<div style="color: #64748b; font-size: 11px; margin-top: 8px;">Stream of requests from client</div>
</div>
<div style="background: #f3e8ff; border-radius: 12px; padding: 20px; border: 1px solid #d8b4fe;">
<h5 style="color: #7c3aed; margin: 0 0 12px 0;">Bidirectional Streaming</h5>
<div style="display: flex; align-items: center; gap: 8px;">
<div style="background: #22c55e; padding: 6px; border-radius: 4px; color: white; font-size: 10px;">C</div>
<div style="color: #7c3aed; font-size: 12px;"><--> N Messages <--></div>
<div style="background: #3b82f6; padding: 6px; border-radius: 4px; color: white; font-size: 10px;">S</div>
</div>
<div style="color: #64748b; font-size: 11px; margin-top: 8px;">Both sides stream independently</div>
</div>
</div>
</div>

### gRPC vs REST

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
<tr style="background: #f1f5f9;">
<th style="padding: 12px; text-align: left; color: #1e293b;">Feature</th>
<th style="padding: 12px; text-align: left; color: #1e293b;">gRPC</th>
<th style="padding: 12px; text-align: left; color: #1e293b;">REST</th>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Protocol</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">HTTP/2</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">HTTP/1.1 or HTTP/2</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Format</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Protobuf (binary)</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">JSON (text)</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Contract</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Required (.proto)</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Optional (OpenAPI)</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Streaming</strong></td>
<td style="padding: 12px; color: #166534; border-bottom: 1px solid #e2e8f0;">Native support</td>
<td style="padding: 12px; color: #ea580c; border-bottom: 1px solid #e2e8f0;">Limited</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Browser</strong></td>
<td style="padding: 12px; color: #ea580c; border-bottom: 1px solid #e2e8f0;">Requires proxy</td>
<td style="padding: 12px; color: #166534; border-bottom: 1px solid #e2e8f0;">Native</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b;"><strong>Performance</strong></td>
<td style="padding: 12px; color: #166534;">Faster</td>
<td style="padding: 12px; color: #ea580c;">Slower</td>
</tr>
</table>
</div>

---

## Common Pitfalls

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #fecaca;">
<h4 style="color: #991b1b; margin-top: 0;">Mistakes to Avoid</h4>
<div style="display: flex; flex-direction: column; gap: 12px; color: #1e293b;">
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>Using TCP for Real-time:</strong> TCP's guaranteed delivery adds latency. For live video/gaming, UDP is often better even with some packet loss.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>HTTP Polling for Real-time:</strong> Polling wastes bandwidth and adds latency. Use WebSocket or SSE for real-time updates.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>gRPC for Public APIs:</strong> Browsers cannot natively call gRPC. Use REST or gRPC-Web for browser clients.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>Ignoring HTTP/2:</strong> Many benefits (multiplexing, header compression) come free with HTTP/2. Enable it where possible.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>Not Handling Connection Drops:</strong> WebSocket connections can drop. Implement reconnection logic with exponential backoff.
</div>
</div>
</div>

---

## Protocol Selection Guide

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Which Protocol to Use?</h4>
<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="display: flex; align-items: center; gap: 16px; background: #f0fdf4; padding: 16px; border-radius: 8px; border: 1px solid #bbf7d0;">
<div style="background: #22c55e; color: white; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: bold;">REST</div>
<div style="color: #1e293b; font-size: 13px;">CRUD APIs, public APIs, browser clients, simple integrations</div>
</div>
<div style="display: flex; align-items: center; gap: 16px; background: #eff6ff; padding: 16px; border-radius: 8px; border: 1px solid #bfdbfe;">
<div style="background: #3b82f6; color: white; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: bold;">gRPC</div>
<div style="color: #1e293b; font-size: 13px;">Microservices, high performance, streaming, polyglot systems</div>
</div>
<div style="display: flex; align-items: center; gap: 16px; background: #f3e8ff; padding: 16px; border-radius: 8px; border: 1px solid #d8b4fe;">
<div style="background: #a855f7; color: white; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: bold;">WebSocket</div>
<div style="color: #1e293b; font-size: 13px;">Real-time bidirectional, chat, gaming, collaborative apps</div>
</div>
<div style="display: flex; align-items: center; gap: 16px; background: #fff7ed; padding: 16px; border-radius: 8px; border: 1px solid #fed7aa;">
<div style="background: #f97316; color: white; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: bold;">SSE</div>
<div style="color: #1e293b; font-size: 13px;">Server push only, notifications, live feeds, simple streaming</div>
</div>
<div style="display: flex; align-items: center; gap: 16px; background: #fef2f2; padding: 16px; border-radius: 8px; border: 1px solid #fecaca;">
<div style="background: #ef4444; color: white; padding: 8px 16px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: bold;">UDP</div>
<div style="color: #1e293b; font-size: 13px;">Video streaming, gaming, VoIP, when some loss is acceptable</div>
</div>
</div>
</div>

---

## Interview Questions

<div style="background: #f3e8ff; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #d8b4fe;">
<h4 style="color: #7c3aed; margin-top: 0;">Common Interview Questions</h4>
<div style="display: flex; flex-direction: column; gap: 16px; color: #1e293b;">

<div>
<strong>1. TCP vs UDP - when would you use each?</strong>
<ul style="margin: 8px 0 0 0; color: #475569;">
<li><strong>TCP:</strong> When you need guaranteed delivery and ordering (web, file transfer, databases)</li>
<li><strong>UDP:</strong> When latency matters more than reliability (video, gaming, VoIP)</li>
<li>Consider application-level reliability on top of UDP for best of both worlds</li>
</ul>
</div>

<div>
<strong>2. How does HTTP/2 improve over HTTP/1.1?</strong>
<ul style="margin: 8px 0 0 0; color: #475569;">
<li>Multiplexing: Multiple requests on single connection</li>
<li>Header compression: Reduces redundant header data</li>
<li>Server push: Server can send resources proactively</li>
<li>Binary framing: More efficient parsing</li>
</ul>
</div>

<div>
<strong>3. When would you choose WebSocket over REST?</strong>
<ul style="margin: 8px 0 0 0; color: #475569;">
<li>Real-time bidirectional communication needed</li>
<li>Server needs to push updates to client</li>
<li>High-frequency updates (more than 1-2/second)</li>
<li>Low-latency is critical</li>
</ul>
</div>

<div>
<strong>4. gRPC vs REST - tradeoffs?</strong>
<ul style="margin: 8px 0 0 0; color: #475569;">
<li><strong>gRPC:</strong> Better performance, type-safe, streaming - but harder to debug, no browser support</li>
<li><strong>REST:</strong> Universal, easy to test/debug, browser-native - but slower, no built-in streaming</li>
<li>Use gRPC internally, REST for public APIs</li>
</ul>
</div>

<div>
<strong>5. What is the three-way handshake?</strong>
<ul style="margin: 8px 0 0 0; color: #475569;">
<li>SYN: Client sends connection request</li>
<li>SYN-ACK: Server acknowledges and sends its own request</li>
<li>ACK: Client acknowledges - connection established</li>
<li>Purpose: Ensure both sides are ready and agree on sequence numbers</li>
</ul>
</div>

</div>
</div>

---

## Code Examples

### WebSocket Server (Node.js)

```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        // Broadcast to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    // Send welcome message
    ws.send(JSON.stringify({ type: 'welcome', message: 'Connected!' }));
});

console.log('WebSocket server running on ws://localhost:8080');
```

### gRPC Service (Go)

```go
package main

import (
    "context"
    "log"
    "net"

    "google.golang.org/grpc"
    pb "path/to/your/proto"
)

type userServer struct {
    pb.UnimplementedUserServiceServer
    users map[int32]*pb.User
}

func (s *userServer) GetUser(ctx context.Context, req *pb.GetUserRequest) (*pb.User, error) {
    if user, ok := s.users[req.Id]; ok {
        return user, nil
    }
    return nil, status.Errorf(codes.NotFound, "user not found")
}

func (s *userServer) ListUsers(req *pb.ListUsersRequest, stream pb.UserService_ListUsersServer) error {
    for _, user := range s.users {
        if err := stream.Send(user); err != nil {
            return err
        }
    }
    return nil
}

func main() {
    lis, err := net.Listen("tcp", ":50051")
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }

    s := grpc.NewServer()
    pb.RegisterUserServiceServer(s, &userServer{
        users: make(map[int32]*pb.User),
    })

    log.Println("gRPC server running on :50051")
    if err := s.Serve(lis); err != nil {
        log.Fatalf("failed to serve: %v", err)
    }
}
```

---

## Best Practices

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #bbf7d0;">
<h4 style="color: #166534; margin-top: 0;">Production Checklist</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; color: #1e293b;">
<div>
<strong style="color: #166534;">HTTP APIs</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Use appropriate status codes</li>
<li>Enable HTTP/2 where possible</li>
<li>Implement proper caching headers</li>
</ul>
</div>
<div>
<strong style="color: #166534;">WebSocket</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Implement heartbeat/ping-pong</li>
<li>Handle reconnection gracefully</li>
<li>Consider connection limits</li>
</ul>
</div>
<div>
<strong style="color: #166534;">gRPC</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Use deadlines/timeouts</li>
<li>Implement proper error handling</li>
<li>Version your proto files</li>
</ul>
</div>
<div>
<strong style="color: #166534;">General</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Always use TLS in production</li>
<li>Implement retry with backoff</li>
<li>Monitor latency and errors</li>
</ul>
</div>
</div>
</div>

---

## Related Topics

- [Client-Server Model](/topic/system-design/client-server-model)
- [API Design](/topic/system-design/api-design)
- [Load Balancing](/topic/system-design/load-balancing)
- [Message Queues](/topic/system-design/message-queues)
