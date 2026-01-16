# Essential Microservices Patterns

## Overview

This comprehensive guide covers the essential design patterns you need to know when working with microservices. These patterns address common challenges like data management, communication, resilience, and observability.

**Tags:** Patterns, Architecture, Design, Best Practices

---

## Pattern Categories

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MICROSERVICES PATTERN CATEGORIES                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐           │
│  │  DECOMPOSITION   │  │  DATA MANAGEMENT │  │  COMMUNICATION   │           │
│  │                  │  │                  │  │                  │           │
│  │  • By Business   │  │  • Database per  │  │  • API Gateway   │           │
│  │    Capability    │  │    Service       │  │  • BFF           │           │
│  │  • By Subdomain  │  │  • Saga Pattern  │  │  • Async Messaging│          │
│  │  • Strangler Fig │  │  • CQRS          │  │  • Service Mesh  │           │
│  │                  │  │  • Event Sourcing│  │                  │           │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘           │
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐           │
│  │   RESILIENCE     │  │  OBSERVABILITY   │  │   DEPLOYMENT     │           │
│  │                  │  │                  │  │                  │           │
│  │  • Circuit Breaker│ │  • Log Aggregation│ │  • Blue-Green    │           │
│  │  • Bulkhead      │  │  • Distributed   │  │  • Canary        │           │
│  │  • Retry         │  │    Tracing       │  │  • Feature Flags │           │
│  │  • Timeout       │  │  • Health Check  │  │  • Sidecar       │           │
│  │                  │  │                  │  │                  │           │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Database Per Service Pattern

```
┌─────────────────────────────────────────────────────────────────┐
│  PATTERN: DATABASE PER SERVICE                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PROBLEM:                                                       │
│  How to manage data in a microservices architecture while       │
│  maintaining loose coupling between services?                   │
│                                                                  │
│  SOLUTION:                                                      │
│  Each service has its own private database.                     │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │    │
│  │  │ User Service│    │Order Service│    │Product Svc  │  │    │
│  │  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘  │    │
│  │         │                  │                  │          │    │
│  │         ▼                  ▼                  ▼          │    │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │    │
│  │  │  PostgreSQL │    │   MongoDB   │    │ Elasticsearch│  │    │
│  │  │  (Users)    │    │  (Orders)   │    │ (Products)  │  │    │
│  │  └─────────────┘    └─────────────┘    └─────────────┘  │    │
│  │                                                          │    │
│  │  Each service:                                           │    │
│  │  • Owns its data exclusively                             │    │
│  │  • Can choose appropriate database type                  │    │
│  │  • Cannot directly access other service's database       │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  BENEFITS:                                                      │
│  ✓ Loose coupling                                               │
│  ✓ Independent scaling                                          │
│  ✓ Polyglot persistence                                         │
│  ✓ Fault isolation                                              │
│                                                                  │
│  DRAWBACKS:                                                     │
│  ✗ No ACID across services                                      │
│  ✗ Complex queries across services                              │
│  ✗ Data duplication                                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Saga Pattern

```
┌─────────────────────────────────────────────────────────────────┐
│  PATTERN: SAGA                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PROBLEM:                                                       │
│  How to maintain data consistency across services without       │
│  distributed transactions (2PC)?                                │
│                                                                  │
│  SOLUTION:                                                      │
│  Implement a saga - a sequence of local transactions with       │
│  compensating transactions for rollback.                        │
│                                                                  │
│  TYPE 1: CHOREOGRAPHY (Event-Driven)                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  Order      order.created    Inventory    inventory      │    │
│  │  Service ─────────────────▶  Service  ────────────────▶  │    │
│  │                              │           .reserved       │    │
│  │                              │                           │    │
│  │  Payment   payment.completed │                           │    │
│  │  Service ◀──────────────────┘  (subscribes)              │    │
│  │     │                                                    │    │
│  │     │ payment.completed                                  │    │
│  │     ▼                                                    │    │
│  │  Order Service (updates status to CONFIRMED)             │    │
│  │                                                          │    │
│  │  On FAILURE (e.g., payment fails):                       │    │
│  │  Payment Service publishes payment.failed                │    │
│  │  Inventory Service compensates: release reserved stock   │    │
│  │  Order Service updates status to FAILED                  │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  TYPE 2: ORCHESTRATION (Central Coordinator)                    │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │                  ┌────────────────────┐                  │    │
│  │                  │   Saga Orchestrator │                  │    │
│  │                  │   (Order Saga)      │                  │    │
│  │                  └──────────┬─────────┘                  │    │
│  │                             │                             │    │
│  │          ┌──────────────────┼──────────────────┐         │    │
│  │          │                  │                  │         │    │
│  │          ▼                  ▼                  ▼         │    │
│  │   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   │    │
│  │   │  Inventory  │   │   Payment   │   │   Order     │   │    │
│  │   │  Service    │   │   Service   │   │   Service   │   │    │
│  │   └─────────────┘   └─────────────┘   └─────────────┘   │    │
│  │                                                          │    │
│  │  Orchestrator controls the flow:                         │    │
│  │  1. Call Inventory Service → Reserve stock               │    │
│  │  2. Call Payment Service → Process payment               │    │
│  │  3. On success: Call Order Service → Confirm order       │    │
│  │  4. On failure: Call compensating actions in reverse     │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  COMPARISON:                                                    │
│  ┌───────────────────┬───────────────────────────────────┐     │
│  │  Choreography     │  Orchestration                     │     │
│  ├───────────────────┼───────────────────────────────────┤     │
│  │  ✓ Loose coupling │  ✓ Easier to understand           │     │
│  │  ✓ Simple services│  ✓ Centralized error handling     │     │
│  │  ✗ Hard to track  │  ✗ Single point of failure        │     │
│  │  ✗ Cyclic deps    │  ✗ Tight coupling to orchestrator │     │
│  └───────────────────┴───────────────────────────────────┘     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. CQRS (Command Query Responsibility Segregation)

```
┌─────────────────────────────────────────────────────────────────┐
│  PATTERN: CQRS                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PROBLEM:                                                       │
│  How to handle complex queries that span multiple services      │
│  efficiently?                                                   │
│                                                                  │
│  SOLUTION:                                                      │
│  Separate read and write models.                                │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │               ┌─────────────────────────┐                │    │
│  │               │       APPLICATION       │                │    │
│  │               └───────────┬─────────────┘                │    │
│  │                           │                               │    │
│  │           ┌───────────────┴───────────────┐              │    │
│  │           │                               │              │    │
│  │           ▼                               ▼              │    │
│  │   ┌───────────────┐               ┌───────────────┐     │    │
│  │   │    COMMAND    │               │     QUERY     │     │    │
│  │   │    (Write)    │               │    (Read)     │     │    │
│  │   │               │               │               │     │    │
│  │   │  CreateOrder  │    Events     │  GetOrders    │     │    │
│  │   │  UpdateOrder  │ ────────────▶ │  OrderHistory │     │    │
│  │   │  CancelOrder  │               │  OrderStats   │     │    │
│  │   └───────┬───────┘               └───────┬───────┘     │    │
│  │           │                               │              │    │
│  │           ▼                               ▼              │    │
│  │   ┌───────────────┐               ┌───────────────┐     │    │
│  │   │  Write Model  │               │  Read Model   │     │    │
│  │   │  (PostgreSQL) │               │  (Elasticsearch)   │    │
│  │   │               │               │  (Redis)      │     │    │
│  │   │  Normalized   │               │  Denormalized │     │    │
│  │   │  Transactional│               │  Fast queries │     │    │
│  │   └───────────────┘               └───────────────┘     │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  WHEN TO USE:                                                   │
│  ✓ Read and write workloads have different requirements         │
│  ✓ Complex queries across aggregates                            │
│  ✓ Need to scale reads and writes independently                 │
│  ✓ Event sourcing is used                                       │
│                                                                  │
│  WHEN NOT TO USE:                                               │
│  ✗ Simple CRUD applications                                     │
│  ✗ Strong consistency is required                               │
│  ✗ Team unfamiliar with eventual consistency                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Event Sourcing

```
┌─────────────────────────────────────────────────────────────────┐
│  PATTERN: EVENT SOURCING                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PROBLEM:                                                       │
│  How to maintain an audit log of all changes and enable         │
│  rebuilding state from history?                                 │
│                                                                  │
│  SOLUTION:                                                      │
│  Store state changes as a sequence of events, not current state.│
│                                                                  │
│  TRADITIONAL (State Storage):                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  orders table:                                           │    │
│  │  ┌─────────────────────────────────────────────────┐     │    │
│  │  │ id     │ status    │ total  │ updated_at        │     │    │
│  │  ├────────┼───────────┼────────┼───────────────────┤     │    │
│  │  │ ORD-1  │ DELIVERED │ 150.00 │ 2024-01-15 10:30  │     │    │
│  │  └─────────────────────────────────────────────────┘     │    │
│  │                                                          │    │
│  │  Lost information: How did it become DELIVERED?          │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  EVENT SOURCING:                                                │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  order_events table:                                     │    │
│  │  ┌───────────────────────────────────────────────────┐   │    │
│  │  │ event_id │ aggregate_id │ event_type    │ data    │   │    │
│  │  ├──────────┼──────────────┼───────────────┼─────────┤   │    │
│  │  │ 1        │ ORD-1        │ OrderCreated  │ {...}   │   │    │
│  │  │ 2        │ ORD-1        │ OrderPaid     │ {...}   │   │    │
│  │  │ 3        │ ORD-1        │ OrderShipped  │ {...}   │   │    │
│  │  │ 4        │ ORD-1        │ OrderDelivered│ {...}   │   │    │
│  │  └───────────────────────────────────────────────────┘   │    │
│  │                                                          │    │
│  │  Current state = replay(all events for ORD-1)            │    │
│  │                                                          │    │
│  │  Benefits:                                               │    │
│  │  • Complete audit trail                                  │    │
│  │  • Can rebuild state at any point in time                │    │
│  │  • Natural fit for CQRS                                  │    │
│  │  • Can derive new read models from existing events       │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  EVENT STORE STRUCTURE:                                         │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  {                                                       │    │
│  │    "event_id": "evt-123",                                │    │
│  │    "aggregate_type": "Order",                            │    │
│  │    "aggregate_id": "ORD-1",                              │    │
│  │    "event_type": "OrderShipped",                         │    │
│  │    "version": 3,                                         │    │
│  │    "timestamp": "2024-01-15T10:30:00Z",                  │    │
│  │    "data": {                                             │    │
│  │      "tracking_number": "TRK-456",                       │    │
│  │      "carrier": "FedEx"                                  │    │
│  │    },                                                    │    │
│  │    "metadata": {                                         │    │
│  │      "user_id": "user-789",                              │    │
│  │      "correlation_id": "req-abc"                         │    │
│  │    }                                                     │    │
│  │  }                                                       │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. API Gateway Pattern

```
┌─────────────────────────────────────────────────────────────────┐
│  PATTERN: API GATEWAY                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PROBLEM:                                                       │
│  How should clients access individual microservices?            │
│                                                                  │
│  SOLUTION:                                                      │
│  Single entry point that handles cross-cutting concerns.        │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  ┌─────────────────────────────────────────────────────┐│    │
│  │  │                    CLIENTS                          ││    │
│  │  │   Web App    Mobile App    Partner API    Admin     ││    │
│  │  └─────────────────────────┬───────────────────────────┘│    │
│  │                            │                             │    │
│  │                            ▼                             │    │
│  │  ┌─────────────────────────────────────────────────────┐│    │
│  │  │                   API GATEWAY                        ││    │
│  │  │                                                      ││    │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   ││    │
│  │  │  │  Auth   │ │Rate Limit│ │ Routing │ │  Cache  │   ││    │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   ││    │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   ││    │
│  │  │  │Transform│ │ Circuit │ │  Load   │ │ Monitor │   ││    │
│  │  │  │ Request │ │ Breaker │ │ Balance │ │  /Log   │   ││    │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   ││    │
│  │  └─────────────────────────┬───────────────────────────┘│    │
│  │                            │                             │    │
│  │          ┌─────────────────┼─────────────────┐          │    │
│  │          ▼                 ▼                 ▼          │    │
│  │   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐  │    │
│  │   │ User Service│   │Order Service│   │Product Svc  │  │    │
│  │   └─────────────┘   └─────────────┘   └─────────────┘  │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  RESPONSIBILITIES:                                              │
│  • Authentication & Authorization                               │
│  • Rate limiting & Throttling                                   │
│  • Request/Response transformation                              │
│  • Load balancing                                               │
│  • Caching                                                      │
│  • Circuit breaking                                             │
│  • Monitoring & Logging                                         │
│  • API versioning                                               │
│                                                                  │
│  POPULAR IMPLEMENTATIONS:                                       │
│  • Kong, AWS API Gateway, Nginx, Envoy, Traefik                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Backend for Frontend (BFF)

```
┌─────────────────────────────────────────────────────────────────┐
│  PATTERN: BACKEND FOR FRONTEND (BFF)                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PROBLEM:                                                       │
│  Different clients (web, mobile, IoT) have different data needs.│
│  A single API is either over-fetching or under-fetching.        │
│                                                                  │
│  SOLUTION:                                                      │
│  Create separate backend for each frontend type.                │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │      Web App              Mobile App           IoT       │    │
│  │         │                     │                 │        │    │
│  │         ▼                     ▼                 ▼        │    │
│  │   ┌───────────┐         ┌───────────┐     ┌─────────┐   │    │
│  │   │  Web BFF  │         │Mobile BFF │     │ IoT BFF │   │    │
│  │   │           │         │           │     │         │   │    │
│  │   │ • Full    │         │ • Minimal │     │• Compact│   │    │
│  │   │   data    │         │   payload │     │  data   │   │    │
│  │   │ • Rich    │         │ • Offline │     │• Batch  │   │    │
│  │   │   UI data │         │   support │     │  updates│   │    │
│  │   └─────┬─────┘         └─────┬─────┘     └────┬────┘   │    │
│  │         │                     │                │        │    │
│  │         └──────────────┬──────┴────────────────┘        │    │
│  │                        │                                 │    │
│  │         ┌──────────────┼──────────────────┐             │    │
│  │         ▼              ▼                  ▼             │    │
│  │  ┌─────────────┐ ┌─────────────┐  ┌─────────────┐      │    │
│  │  │User Service │ │Order Service│  │Product Svc  │      │    │
│  │  └─────────────┘ └─────────────┘  └─────────────┘      │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  EXAMPLE: Mobile BFF vs Web BFF                                 │
│  ┌──────────────────┬─────────────────────────────────────┐    │
│  │  Mobile BFF      │  Web BFF                             │    │
│  ├──────────────────┼─────────────────────────────────────┤    │
│  │  Smaller payload │  Full payload                        │    │
│  │  Image thumbnails│  High-res images                     │    │
│  │  Paginated lists │  Infinite scroll                     │    │
│  │  Offline-first   │  Real-time updates                   │    │
│  │  Push notif ready│  WebSocket ready                     │    │
│  └──────────────────┴─────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Circuit Breaker Pattern

```
┌─────────────────────────────────────────────────────────────────┐
│  PATTERN: CIRCUIT BREAKER                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PROBLEM:                                                       │
│  How to prevent cascade failures when a service is unavailable? │
│                                                                  │
│  SOLUTION:                                                      │
│  Implement a circuit breaker that stops requests when failures  │
│  exceed a threshold.                                            │
│                                                                  │
│  STATE MACHINE:                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │                     failure threshold                    │    │
│  │                       exceeded                           │    │
│  │         ┌──────────────────────────────────┐            │    │
│  │         │                                  │            │    │
│  │         ▼                                  │            │    │
│  │   ┌──────────┐    timeout    ┌──────────────┐          │    │
│  │   │  CLOSED  │ ◀──────────── │    OPEN      │          │    │
│  │   │          │               │              │          │    │
│  │   │ (Normal) │               │ (Fast fail)  │          │    │
│  │   └────┬─────┘               └──────┬───────┘          │    │
│  │        │                            │                   │    │
│  │        │                            │ timer expires     │    │
│  │        │                            ▼                   │    │
│  │        │                    ┌──────────────┐           │    │
│  │        │    success         │  HALF-OPEN   │           │    │
│  │        └───────────────────▶│              │           │    │
│  │                             │ (Test mode)  │           │    │
│  │                             └──────┬───────┘           │    │
│  │                                    │                    │    │
│  │                           failure  │                    │    │
│  │                             ───────┘                    │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  IMPLEMENTATION EXAMPLE (Go):                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  breaker := gobreaker.NewCircuitBreaker(gobreaker.Settings{│  │
│  │      Name:        "payment-service",                     │    │
│  │      MaxRequests: 5,           // Requests in half-open  │    │
│  │      Interval:    10 * time.Second, // Clear counts      │    │
│  │      Timeout:     30 * time.Second, // Time in open      │    │
│  │      ReadyToTrip: func(counts gobreaker.Counts) bool {   │    │
│  │          return counts.ConsecutiveFailures > 3           │    │
│  │      },                                                  │    │
│  │  })                                                      │    │
│  │                                                          │    │
│  │  result, err := breaker.Execute(func() (interface{}, error) {│ │
│  │      return paymentClient.ProcessPayment(ctx, payment)   │    │
│  │  })                                                      │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  CONFIGURATION:                                                 │
│  • Failure threshold: 50% failures in 10 seconds                │
│  • Open duration: 30 seconds before trying again                │
│  • Half-open: Allow 3 test requests                             │
│  • Reset: Full reset after 10 consecutive successes             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. Bulkhead Pattern

```
┌─────────────────────────────────────────────────────────────────┐
│  PATTERN: BULKHEAD                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PROBLEM:                                                       │
│  How to isolate failures to prevent total system failure?       │
│                                                                  │
│  SOLUTION:                                                      │
│  Partition resources into isolated pools (like ship bulkheads). │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  WITHOUT BULKHEAD:                                       │    │
│  │  ┌─────────────────────────────────────────────────┐    │    │
│  │  │              SHARED THREAD POOL (100)            │    │    │
│  │  │  ┌───────────────────────────────────────────┐  │    │    │
│  │  │  │ All requests share same pool               │  │    │    │
│  │  │  │ Slow service exhausts all threads          │  │    │    │
│  │  │  │ ALL services affected                      │  │    │    │
│  │  │  └───────────────────────────────────────────┘  │    │    │
│  │  └─────────────────────────────────────────────────┘    │    │
│  │                                                          │    │
│  │  WITH BULKHEAD:                                          │    │
│  │  ┌─────────────────────────────────────────────────┐    │    │
│  │  │                                                  │    │    │
│  │  │  ┌──────────────┐ ┌──────────────┐ ┌──────────┐│    │    │
│  │  │  │ User Pool    │ │ Order Pool   │ │Payment   ││    │    │
│  │  │  │ (30 threads) │ │ (40 threads) │ │Pool (30) ││    │    │
│  │  │  │              │ │              │ │          ││    │    │
│  │  │  │ If exhausted │ │ If exhausted │ │ Isolated ││    │    │
│  │  │  │ only users   │ │ only orders  │ │          ││    │    │
│  │  │  │ affected     │ │ affected     │ │          ││    │    │
│  │  │  └──────────────┘ └──────────────┘ └──────────┘│    │    │
│  │  │                                                  │    │    │
│  │  └─────────────────────────────────────────────────┘    │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  TYPES OF BULKHEADS:                                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                                                           │   │
│  │  1. Thread Pool Isolation                                 │   │
│  │     • Separate thread pools per dependency                │   │
│  │     • Slow dependency can't exhaust all threads           │   │
│  │                                                           │   │
│  │  2. Semaphore Isolation                                   │   │
│  │     • Limit concurrent calls to dependency                │   │
│  │     • Lower overhead than thread pools                    │   │
│  │                                                           │   │
│  │  3. Connection Pool Isolation                             │   │
│  │     • Separate DB connection pools per service            │   │
│  │     • Prevents DB connection exhaustion                   │   │
│  │                                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. Sidecar Pattern

```
┌─────────────────────────────────────────────────────────────────┐
│  PATTERN: SIDECAR                                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PROBLEM:                                                       │
│  How to add common functionality (logging, monitoring, proxy)   │
│  to services without modifying them?                            │
│                                                                  │
│  SOLUTION:                                                      │
│  Deploy helper functionality as a separate container alongside  │
│  the main application container.                                │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │                        POD                               │    │
│  │  ┌────────────────────────────────────────────────────┐ │    │
│  │  │                                                     │ │    │
│  │  │  ┌──────────────────┐    ┌──────────────────┐      │ │    │
│  │  │  │                  │    │                  │      │ │    │
│  │  │  │   Application    │◀──▶│    Sidecar       │      │ │    │
│  │  │  │   Container      │    │    Container     │      │ │    │
│  │  │  │                  │    │                  │      │ │    │
│  │  │  │  • Business logic│    │  • Logging       │      │ │    │
│  │  │  │  • No infra code │    │  • Monitoring    │      │ │    │
│  │  │  │                  │    │  • Proxy         │      │ │    │
│  │  │  │                  │    │  • Config sync   │      │ │    │
│  │  │  └──────────────────┘    └──────────────────┘      │ │    │
│  │  │                                                     │ │    │
│  │  │  Shared:                                           │ │    │
│  │  │  • Network namespace (localhost communication)     │ │    │
│  │  │  • Volumes                                         │ │    │
│  │  │  • Lifecycle                                       │ │    │
│  │  │                                                     │ │    │
│  │  └────────────────────────────────────────────────────┘ │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  COMMON SIDECAR USE CASES:                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                                                           │   │
│  │  • Envoy Proxy - Service mesh sidecar (Istio)             │   │
│  │  • Fluent Bit - Log forwarding                            │   │
│  │  • Vault Agent - Secret injection                         │   │
│  │  • CloudSQL Proxy - Database connection proxy             │   │
│  │  • Prometheus Exporter - Metrics collection               │   │
│  │                                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. Strangler Fig Pattern

```
┌─────────────────────────────────────────────────────────────────┐
│  PATTERN: STRANGLER FIG                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PROBLEM:                                                       │
│  How to migrate from monolith to microservices incrementally?   │
│                                                                  │
│  SOLUTION:                                                      │
│  Gradually replace monolith functionality with new services,    │
│  like a strangler fig tree grows around and replaces its host.  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  PHASE 1: Add facade                                     │    │
│  │  ┌─────────────┐         ┌─────────────────────────┐    │    │
│  │  │   Clients   │ ───────▶│       Facade/Proxy      │    │    │
│  │  └─────────────┘         └───────────┬─────────────┘    │    │
│  │                                      │                   │    │
│  │                                      ▼                   │    │
│  │                          ┌─────────────────────────┐    │    │
│  │                          │       MONOLITH          │    │    │
│  │                          │  [All functionality]    │    │    │
│  │                          └─────────────────────────┘    │    │
│  │                                                          │    │
│  │  PHASE 2: Extract first service                          │    │
│  │  ┌─────────────┐         ┌─────────────────────────┐    │    │
│  │  │   Clients   │ ───────▶│       Facade/Proxy      │    │    │
│  │  └─────────────┘         └───────────┬─────────────┘    │    │
│  │                               ┌──────┴──────┐           │    │
│  │                               ▼             ▼           │    │
│  │                    ┌───────────────┐ ┌─────────────────┐│    │
│  │                    │ User Service  │ │    MONOLITH     ││    │
│  │                    │   (New)       │ │ [Less features] ││    │
│  │                    └───────────────┘ └─────────────────┘│    │
│  │                                                          │    │
│  │  PHASE 3: Continue extraction                            │    │
│  │  ┌─────────────┐         ┌─────────────────────────┐    │    │
│  │  │   Clients   │ ───────▶│       Facade/Proxy      │    │    │
│  │  └─────────────┘         └───────────┬─────────────┘    │    │
│  │                    ┌─────────┬───────┴───┬─────────┐    │    │
│  │                    ▼         ▼           ▼         ▼    │    │
│  │              ┌─────────┐┌─────────┐┌─────────┐┌───────┐ │    │
│  │              │  User   ││  Order  ││ Payment ││Monolith│ │    │
│  │              │ Service ││ Service ││ Service ││(Legacy)│ │    │
│  │              └─────────┘└─────────┘└─────────┘└───────┘ │    │
│  │                                                          │    │
│  │  PHASE 4: Decommission monolith                          │    │
│  │  ┌─────────────┐         ┌─────────────────────────┐    │    │
│  │  │   Clients   │ ───────▶│      API Gateway        │    │    │
│  │  └─────────────┘         └───────────┬─────────────┘    │    │
│  │                    ┌─────────┬───────┴───┬─────────┐    │    │
│  │                    ▼         ▼           ▼         ▼    │    │
│  │              ┌─────────┐┌─────────┐┌─────────┐┌───────┐ │    │
│  │              │  User   ││  Order  ││ Payment ││ ...   │ │    │
│  │              │ Service ││ Service ││ Service ││       │ │    │
│  │              └─────────┘└─────────┘└─────────┘└───────┘ │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Pattern Selection Guide

| Problem | Pattern | When to Use |
|---------|---------|-------------|
| Cross-service transactions | **Saga** | Multiple services need to coordinate |
| Complex queries | **CQRS** | Read/write patterns differ significantly |
| Audit trail needed | **Event Sourcing** | Need complete history of changes |
| Client-specific APIs | **BFF** | Different clients have different needs |
| Prevent cascade failures | **Circuit Breaker** | Service dependencies can fail |
| Resource isolation | **Bulkhead** | Need to contain failures |
| Cross-cutting concerns | **Sidecar** | Add functionality without code changes |
| Incremental migration | **Strangler Fig** | Moving from monolith |

---

## Key Takeaways

1. **No pattern is universally applicable** - Choose based on specific problem
2. **Patterns can be combined** - CQRS + Event Sourcing, Saga + Circuit Breaker
3. **Start simple** - Add patterns as complexity demands
4. **Understand trade-offs** - Every pattern has costs
5. **Team familiarity matters** - Complex patterns need experienced teams
