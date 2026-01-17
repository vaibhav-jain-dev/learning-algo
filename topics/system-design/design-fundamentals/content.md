# System Design Fundamentals

## Overview

System design is the process of defining the architecture, components, modules, interfaces, and data flow of a system to satisfy specified requirements. Understanding fundamentals is crucial for building scalable, reliable, and maintainable systems.

**Tags:** System Design, Architecture, Fundamentals, Scalability

---

## What is System Design?

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">SYSTEM DESIGN OVERVIEW</h4>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
<div style="background: #21262d; border-radius: 12px; padding: 20px; text-align: center;">
<div style="font-size: 32px; margin-bottom: 12px;">🏗️</div>
<div style="color: #7ee787; font-weight: bold; margin-bottom: 8px;">Architecture</div>
<div style="color: #8b949e; font-size: 13px;">High-level structure and organization of system components</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px; text-align: center;">
<div style="font-size: 32px; margin-bottom: 12px;">📊</div>
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 8px;">Scalability</div>
<div style="color: #8b949e; font-size: 13px;">Ability to handle growth in users, data, and traffic</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px; text-align: center;">
<div style="font-size: 32px; margin-bottom: 12px;">🛡️</div>
<div style="color: #f0883e; font-weight: bold; margin-bottom: 8px;">Reliability</div>
<div style="color: #8b949e; font-size: 13px;">System's ability to function correctly under failures</div>
</div>
</div>
</div>

System design involves making decisions about:
- **Components**: What building blocks make up the system?
- **Interactions**: How do components communicate?
- **Data**: How is data stored, processed, and moved?
- **Trade-offs**: What compromises are acceptable?

---

## Core Concepts Map

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">SYSTEM DESIGN CONCEPT MAP</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<div style="color: #7ee787; font-weight: bold; margin-bottom: 16px; font-size: 14px;">FOUNDATIONAL CONCEPTS</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="background: rgba(126,231,135,0.1); padding: 12px; border-radius: 8px; border-left: 3px solid #7ee787;">
<div style="color: #c9d1d9; font-weight: 600;">Client-Server Model</div>
<div style="color: #8b949e; font-size: 12px;">Request-response communication pattern</div>
</div>
<div style="background: rgba(126,231,135,0.1); padding: 12px; border-radius: 8px; border-left: 3px solid #7ee787;">
<div style="color: #c9d1d9; font-weight: 600;">Network Protocols</div>
<div style="color: #8b949e; font-size: 12px;">HTTP, TCP/UDP, WebSocket, gRPC</div>
</div>
<div style="background: rgba(126,231,135,0.1); padding: 12px; border-radius: 8px; border-left: 3px solid #7ee787;">
<div style="color: #c9d1d9; font-weight: 600;">Storage Systems</div>
<div style="color: #8b949e; font-size: 12px;">Databases, file systems, caches</div>
</div>
</div>
</div>
<div>
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 16px; font-size: 14px;">PERFORMANCE METRICS</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="background: rgba(88,166,255,0.1); padding: 12px; border-radius: 8px; border-left: 3px solid #58a6ff;">
<div style="color: #c9d1d9; font-weight: 600;">Latency</div>
<div style="color: #8b949e; font-size: 12px;">Time to complete a single operation</div>
</div>
<div style="background: rgba(88,166,255,0.1); padding: 12px; border-radius: 8px; border-left: 3px solid #58a6ff;">
<div style="color: #c9d1d9; font-weight: 600;">Throughput</div>
<div style="color: #8b949e; font-size: 12px;">Number of operations per time unit</div>
</div>
<div style="background: rgba(88,166,255,0.1); padding: 12px; border-radius: 8px; border-left: 3px solid #58a6ff;">
<div style="color: #c9d1d9; font-weight: 600;">Availability</div>
<div style="color: #8b949e; font-size: 12px;">Percentage of time system is operational</div>
</div>
</div>
</div>
</div>
<div style="margin-top: 24px;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 16px; font-size: 14px;">SCALING STRATEGIES</div>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
<div style="background: rgba(163,113,247,0.1); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #a371f7; font-weight: 600; font-size: 13px;">Load Balancing</div>
</div>
<div style="background: rgba(163,113,247,0.1); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #a371f7; font-weight: 600; font-size: 13px;">Caching</div>
</div>
<div style="background: rgba(163,113,247,0.1); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #a371f7; font-weight: 600; font-size: 13px;">Sharding</div>
</div>
<div style="background: rgba(163,113,247,0.1); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #a371f7; font-weight: 600; font-size: 13px;">Replication</div>
</div>
</div>
</div>
</div>

---

## Horizontal vs Vertical Scaling

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">SCALING STRATEGIES</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 24px; border: 1px solid rgba(126,231,135,0.3);">
<div style="color: #7ee787; font-weight: bold; font-size: 16px; margin-bottom: 16px;">VERTICAL SCALING (Scale Up)</div>
<div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 16px;">
<div style="background: #238636; width: 60px; height: 40px; border-radius: 6px; margin-bottom: 8px;"></div>
<div style="color: #58a6ff;">↓</div>
<div style="background: #238636; width: 80px; height: 60px; border-radius: 6px; margin-top: 8px;"></div>
</div>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 20px;">
<li>Add more CPU, RAM, storage</li>
<li>Simple to implement</li>
<li>Hardware limits exist</li>
<li>Single point of failure</li>
<li>Expensive at scale</li>
</ul>
</div>
<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 24px; border: 1px solid rgba(88,166,255,0.3);">
<div style="color: #58a6ff; font-weight: bold; font-size: 16px; margin-bottom: 16px;">HORIZONTAL SCALING (Scale Out)</div>
<div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 16px;">
<div style="background: #1f6feb; width: 40px; height: 40px; border-radius: 6px;"></div>
<div style="color: #58a6ff; align-self: center;">→</div>
<div style="background: #1f6feb; width: 40px; height: 40px; border-radius: 6px;"></div>
<div style="background: #1f6feb; width: 40px; height: 40px; border-radius: 6px;"></div>
<div style="background: #1f6feb; width: 40px; height: 40px; border-radius: 6px;"></div>
</div>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 20px;">
<li>Add more machines</li>
<li>Better fault tolerance</li>
<li>Theoretically unlimited</li>
<li>More complex architecture</li>
<li>Requires load balancing</li>
</ul>
</div>
</div>
</div>

### When to Use Each

| Aspect | Vertical Scaling | Horizontal Scaling |
|--------|------------------|-------------------|
| **Cost** | Expensive hardware | Commodity hardware |
| **Complexity** | Low | High |
| **Downtime** | Required for upgrades | Zero downtime possible |
| **Limit** | Hardware ceiling | Virtually unlimited |
| **Best for** | Databases, legacy apps | Stateless services, web apps |

---

## Key Non-Functional Requirements

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">NON-FUNCTIONAL REQUIREMENTS (NFRs)</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
<div style="background: #21262d; border-radius: 8px; padding: 16px;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 8px;">Scalability</div>
<div style="color: #8b949e; font-size: 13px;">Can the system handle 10x, 100x growth?</div>
<div style="color: #58a6ff; font-size: 12px; margin-top: 8px;">Metrics: Users, requests/sec, data size</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 8px;">Reliability</div>
<div style="color: #8b949e; font-size: 13px;">Does the system work correctly under failures?</div>
<div style="color: #58a6ff; font-size: 12px; margin-top: 8px;">Metrics: MTBF, error rate, data integrity</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 8px;">Availability</div>
<div style="color: #8b949e; font-size: 13px;">What percentage of time is the system up?</div>
<div style="color: #58a6ff; font-size: 12px; margin-top: 8px;">Metrics: Uptime %, SLA (99.9%, 99.99%)</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 8px;">Performance</div>
<div style="color: #8b949e; font-size: 13px;">How fast does the system respond?</div>
<div style="color: #58a6ff; font-size: 12px; margin-top: 8px;">Metrics: Latency (p50, p95, p99), throughput</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 8px;">Security</div>
<div style="color: #8b949e; font-size: 13px;">Is data protected from unauthorized access?</div>
<div style="color: #58a6ff; font-size: 12px; margin-top: 8px;">Metrics: Encryption, auth, audit logs</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px;">
<div style="color: #d29922; font-weight: bold; margin-bottom: 8px;">Maintainability</div>
<div style="color: #8b949e; font-size: 13px;">How easy is it to update and debug?</div>
<div style="color: #58a6ff; font-size: 12px; margin-top: 8px;">Metrics: Deployment frequency, MTTR</div>
</div>
</div>
</div>

---

## The Design Process

### Step-by-Step Approach

```
1. UNDERSTAND THE PROBLEM
   ├── Clarify functional requirements
   ├── Identify non-functional requirements
   ├── Define scope and constraints
   └── Ask clarifying questions

2. ESTIMATE SCALE
   ├── Users (DAU, MAU, peak concurrent)
   ├── Data size (storage needs)
   ├── Traffic (requests per second)
   └── Growth projections

3. DESIGN HIGH-LEVEL ARCHITECTURE
   ├── Identify major components
   ├── Define data flow
   ├── Choose communication patterns
   └── Consider trade-offs

4. DEEP DIVE INTO COMPONENTS
   ├── Database schema design
   ├── API design
   ├── Caching strategy
   └── Handle edge cases

5. ADDRESS BOTTLENECKS
   ├── Identify single points of failure
   ├── Plan for scaling
   ├── Consider failure scenarios
   └── Discuss monitoring & alerting
```

---

## Back-of-the-Envelope Calculations

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">QUICK REFERENCE NUMBERS</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<div style="color: #7ee787; font-weight: bold; margin-bottom: 12px;">TIME</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 13px;">
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #8b949e;">L1 cache</span><span style="color: #7ee787;">0.5 ns</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #8b949e;">L2 cache</span><span style="color: #7ee787;">7 ns</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #8b949e;">RAM access</span><span style="color: #7ee787;">100 ns</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #8b949e;">SSD read</span><span style="color: #58a6ff;">150 µs</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #8b949e;">HDD seek</span><span style="color: #f0883e;">10 ms</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #8b949e;">Same datacenter RTT</span><span style="color: #58a6ff;">0.5 ms</span></div>
<div style="display: flex; justify-content: space-between;"><span style="color: #8b949e;">Cross-continent RTT</span><span style="color: #f85149;">150 ms</span></div>
</div>
</div>
<div>
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">DATA SIZE</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 13px;">
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #8b949e;">1 KB</span><span style="color: #7ee787;">1,000 bytes</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #8b949e;">1 MB</span><span style="color: #7ee787;">1,000 KB</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #8b949e;">1 GB</span><span style="color: #7ee787;">1,000 MB</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #8b949e;">1 TB</span><span style="color: #58a6ff;">1,000 GB</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #8b949e;">1 PB</span><span style="color: #f0883e;">1,000 TB</span></div>
<div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="color: #8b949e;">Seconds/day</span><span style="color: #a371f7;">86,400</span></div>
<div style="display: flex; justify-content: space-between;"><span style="color: #8b949e;">Seconds/month</span><span style="color: #a371f7;">~2.5M</span></div>
</div>
</div>
</div>
</div>

### Example Calculation: Twitter-like Service

```
Given:
- 500 million users
- 200 million daily active users (DAU)
- Each user posts 2 tweets/day on average
- Each user reads 200 tweets/day on average
- Tweet size: 280 chars + metadata = ~500 bytes

Calculations:

Write Traffic:
- Tweets/day = 200M × 2 = 400M tweets/day
- Tweets/second = 400M / 86,400 ≈ 4,600 tweets/sec
- Peak (2x average) ≈ 9,200 tweets/sec

Read Traffic:
- Reads/day = 200M × 200 = 40B reads/day
- Reads/second = 40B / 86,400 ≈ 460,000 reads/sec
- Read:Write ratio = 100:1 (read-heavy!)

Storage (5 years):
- Daily storage = 400M × 500 bytes = 200 GB/day
- 5 years = 200 GB × 365 × 5 = 365 TB
- With replication (3x) = ~1 PB
```

---

## Common Architecture Patterns

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">ARCHITECTURE PATTERNS</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 12px;">Monolithic</div>
<div style="background: #238636; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #fff; font-size: 12px; text-align: center;">All Components in One</div>
</div>
<div style="color: #8b949e; font-size: 12px;">
<div>✓ Simple to develop & deploy</div>
<div>✓ Easy debugging</div>
<div>✗ Hard to scale independently</div>
<div>✗ Single point of failure</div>
</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Microservices</div>
<div style="display: flex; gap: 8px; margin-bottom: 12px;">
<div style="background: #1f6feb; border-radius: 4px; padding: 8px; flex: 1; text-align: center; color: #fff; font-size: 10px;">Svc A</div>
<div style="background: #1f6feb; border-radius: 4px; padding: 8px; flex: 1; text-align: center; color: #fff; font-size: 10px;">Svc B</div>
<div style="background: #1f6feb; border-radius: 4px; padding: 8px; flex: 1; text-align: center; color: #fff; font-size: 10px;">Svc C</div>
</div>
<div style="color: #8b949e; font-size: 12px;">
<div>✓ Independent scaling</div>
<div>✓ Technology flexibility</div>
<div>✗ Network complexity</div>
<div>✗ Distributed debugging</div>
</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">Event-Driven</div>
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
<div style="background: #f0883e; border-radius: 4px; padding: 8px; color: #fff; font-size: 10px;">Producer</div>
<div style="color: #f0883e;">→</div>
<div style="background: #21262d; border: 2px solid #f0883e; border-radius: 4px; padding: 8px; color: #f0883e; font-size: 10px;">Queue</div>
<div style="color: #f0883e;">→</div>
<div style="background: #f0883e; border-radius: 4px; padding: 8px; color: #fff; font-size: 10px;">Consumer</div>
</div>
<div style="color: #8b949e; font-size: 12px;">
<div>✓ Loose coupling</div>
<div>✓ Async processing</div>
<div>✗ Eventual consistency</div>
<div>✗ Complex debugging</div>
</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 12px;">Layered (N-Tier)</div>
<div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px;">
<div style="background: #a371f7; border-radius: 4px; padding: 6px; text-align: center; color: #fff; font-size: 10px;">Presentation</div>
<div style="background: #8957e5; border-radius: 4px; padding: 6px; text-align: center; color: #fff; font-size: 10px;">Business Logic</div>
<div style="background: #6e40c9; border-radius: 4px; padding: 6px; text-align: center; color: #fff; font-size: 10px;">Data Access</div>
</div>
<div style="color: #8b949e; font-size: 12px;">
<div>✓ Separation of concerns</div>
<div>✓ Easy to understand</div>
<div>✗ Can become rigid</div>
<div>✗ Potential for tight coupling</div>
</div>
</div>
</div>
</div>

---

## Trade-offs in System Design

<div style="background: rgba(248,81,73,0.1); border-left: 4px solid #f85149; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #f85149;">Key Principle:</strong> There are no perfect solutions in system design - only trade-offs. Understanding these trade-offs is crucial for making informed decisions.
</div>

### Common Trade-offs

| Trade-off | Option A | Option B | Decision Factors |
|-----------|----------|----------|-----------------|
| **Consistency vs Availability** | Strong consistency | High availability | CAP theorem, use case |
| **Latency vs Throughput** | Low latency | High throughput | User expectations |
| **Complexity vs Flexibility** | Simple, rigid | Complex, flexible | Team size, timeline |
| **Cost vs Performance** | Budget hardware | Premium hardware | Business requirements |
| **SQL vs NoSQL** | ACID, relations | Scale, flexibility | Data model, query patterns |

---

## Interview Framework

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">SYSTEM DESIGN INTERVIEW FRAMEWORK</h4>
<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #238636; color: #fff; padding: 8px 16px; border-radius: 6px; min-width: 140px; text-align: center; font-weight: bold;">1. Requirements</div>
<div style="color: #8b949e; font-size: 13px;">Ask clarifying questions. Define functional and non-functional requirements. (3-5 min)</div>
</div>
<div style="text-align: center; color: #58a6ff;">↓</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #1f6feb; color: #fff; padding: 8px 16px; border-radius: 6px; min-width: 140px; text-align: center; font-weight: bold;">2. Estimation</div>
<div style="color: #8b949e; font-size: 13px;">Calculate scale: users, storage, bandwidth, QPS. (3-5 min)</div>
</div>
<div style="text-align: center; color: #58a6ff;">↓</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #8957e5; color: #fff; padding: 8px 16px; border-radius: 6px; min-width: 140px; text-align: center; font-weight: bold;">3. High-Level</div>
<div style="color: #8b949e; font-size: 13px;">Draw main components, data flow, APIs. (10-15 min)</div>
</div>
<div style="text-align: center; color: #58a6ff;">↓</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f0883e; color: #fff; padding: 8px 16px; border-radius: 6px; min-width: 140px; text-align: center; font-weight: bold;">4. Deep Dive</div>
<div style="color: #8b949e; font-size: 13px;">Detail specific components, database schema, algorithms. (15-20 min)</div>
</div>
<div style="text-align: center; color: #58a6ff;">↓</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #da3633; color: #fff; padding: 8px 16px; border-radius: 6px; min-width: 140px; text-align: center; font-weight: bold;">5. Wrap Up</div>
<div style="color: #8b949e; font-size: 13px;">Discuss bottlenecks, scaling, monitoring, future improvements. (5 min)</div>
</div>
</div>
</div>

---

## Summary

System design fundamentals provide the foundation for building scalable, reliable systems:

1. **Understand requirements** before designing
2. **Estimate scale** to make informed decisions
3. **Know the trade-offs** - no perfect solutions exist
4. **Start simple**, then optimize
5. **Consider failure modes** from the beginning

---

## Related Topics

- [Client-Server Model](/topic/system-design/client-server-model)
- [Network Protocols](/topic/system-design/network-protocols)
- [Storage](/topic/system-design/storage)
- [Latency and Throughput](/topic/system-design/latency-throughput)
- [Availability](/topic/system-design/availability)
- [Caching](/topic/system-design/caching)
