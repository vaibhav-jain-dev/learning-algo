# Managing and Removing Single Dependency Bottlenecks

## Overview

In microservices architectures, bottlenecks emerge when a single service or resource becomes a constraint that limits overall system performance. This guide covers strategies to identify, manage, and eliminate these bottlenecks.

**Tags:** Performance, Bottleneck, Scaling, Architecture

---

## Understanding Bottlenecks

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TYPES OF BOTTLENECKS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. SERVICE BOTTLENECK                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Service A ──┐                                                       │    │
│  │              │     ┌───────────────┐                                │    │
│  │  Service B ──┼────▶│  Auth Service │────▶ [Overwhelmed]              │    │
│  │              │     │  (Bottleneck) │                                │    │
│  │  Service C ──┘     └───────────────┘                                │    │
│  │                                                                      │    │
│  │  Symptom: All services slow down when Auth Service is busy          │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  2. DATABASE BOTTLENECK                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  ┌─────────────┐                                                    │    │
│  │  │ Service A   │──┐                                                 │    │
│  │  └─────────────┘  │     ┌───────────────┐                          │    │
│  │  ┌─────────────┐  ├────▶│   Database    │ [Connection exhausted]    │    │
│  │  │ Service B   │──┤     │ (Bottleneck)  │ [Lock contention]         │    │
│  │  └─────────────┘  │     └───────────────┘ [Query slow]              │    │
│  │  ┌─────────────┐  │                                                 │    │
│  │  │ Service C   │──┘                                                 │    │
│  │  └─────────────┘                                                    │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  3. NETWORK BOTTLENECK                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Service A ─────────────────────────────────────────▶ Service B     │    │
│  │            └── High latency, Bandwidth saturation ──┘               │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  4. EXTERNAL DEPENDENCY BOTTLENECK                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Your Service ────────▶ External API (Rate limited, Slow, Unreliable)   │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Strategy 1: Horizontal Scaling

```
┌─────────────────────────────────────────────────────────────────┐
│  STRATEGY: HORIZONTAL SCALING                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  BEFORE:                                                        │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  All traffic ────────▶ ┌───────────────┐                │    │
│  │                        │ Single Instance│                │    │
│  │                        │  (Overloaded) │                │    │
│  │                        └───────────────┘                │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  AFTER:                                                         │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │                    ┌───────────────┐                     │    │
│  │                ┌──▶│  Instance 1   │                     │    │
│  │                │   └───────────────┘                     │    │
│  │  All traffic ──┼── ┌───────────────┐                     │    │
│  │  (Load Balancer)   │  Instance 2   │                     │    │
│  │                │   └───────────────┘                     │    │
│  │                └──▶┌───────────────┐                     │    │
│  │                    │  Instance 3   │                     │    │
│  │                    └───────────────┘                     │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  REQUIREMENTS FOR HORIZONTAL SCALING:                           │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  1. Stateless services                                   │    │
│  │     • No in-memory session state                         │    │
│  │     • Use external store (Redis) for sessions            │    │
│  │                                                          │    │
│  │  2. Shared nothing architecture                          │    │
│  │     • No local file dependencies                         │    │
│  │     • Use object storage (S3) for files                  │    │
│  │                                                          │    │
│  │  3. Idempotent operations                                │    │
│  │     • Requests can be safely retried                     │    │
│  │     • No duplicate side effects                          │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  KUBERNETES AUTO-SCALING:                                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  apiVersion: autoscaling/v2                              │    │
│  │  kind: HorizontalPodAutoscaler                           │    │
│  │  metadata:                                               │    │
│  │    name: auth-service-hpa                                │    │
│  │  spec:                                                   │    │
│  │    scaleTargetRef:                                       │    │
│  │      apiVersion: apps/v1                                 │    │
│  │      kind: Deployment                                    │    │
│  │      name: auth-service                                  │    │
│  │    minReplicas: 3                                        │    │
│  │    maxReplicas: 50                                       │    │
│  │    metrics:                                              │    │
│  │    - type: Resource                                      │    │
│  │      resource:                                           │    │
│  │        name: cpu                                         │    │
│  │        target:                                           │    │
│  │          type: Utilization                               │    │
│  │          averageUtilization: 70                          │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Strategy 2: Caching

```
┌─────────────────────────────────────────────────────────────────┐
│  STRATEGY: CACHING                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  MULTI-LEVEL CACHING:                                           │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  Client ─▶ CDN ─▶ API Gateway ─▶ Service ─▶ Redis ─▶ DB │    │
│  │            │          │            │          │          │    │
│  │            │          │            │          │          │    │
│  │     L1: Edge    L2: Gateway   L3: App    L4: Redis      │    │
│  │     Cache       Cache         Cache      Cache          │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  CACHE-ASIDE PATTERN:                                           │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  func GetUser(userID string) (*User, error) {            │    │
│  │      // 1. Check cache                                   │    │
│  │      user, err := cache.Get(ctx, "user:"+userID)         │    │
│  │      if err == nil {                                     │    │
│  │          return user, nil  // Cache hit                  │    │
│  │      }                                                   │    │
│  │                                                          │    │
│  │      // 2. Cache miss - fetch from DB                    │    │
│  │      user, err = db.GetUser(ctx, userID)                 │    │
│  │      if err != nil {                                     │    │
│  │          return nil, err                                 │    │
│  │      }                                                   │    │
│  │                                                          │    │
│  │      // 3. Populate cache                                │    │
│  │      cache.Set(ctx, "user:"+userID, user, 1*time.Hour)   │    │
│  │      return user, nil                                    │    │
│  │  }                                                       │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  CACHE INVALIDATION STRATEGIES:                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  1. Time-based (TTL)                                     │    │
│  │     cache.Set("user:123", user, 5*time.Minute)           │    │
│  │                                                          │    │
│  │  2. Event-based                                          │    │
│  │     On user.updated event → cache.Delete("user:123")     │    │
│  │                                                          │    │
│  │  3. Write-through                                        │    │
│  │     Update cache and DB together                         │    │
│  │                                                          │    │
│  │  4. Cache-busting keys                                   │    │
│  │     "user:123:v2" → increment version on update          │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  CACHE HIT RATIO TARGET: > 90% for read-heavy workloads         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Strategy 3: Asynchronous Processing

```
┌─────────────────────────────────────────────────────────────────┐
│  STRATEGY: ASYNC PROCESSING                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  BEFORE (Synchronous):                                          │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  Client ───▶ Order Service ───▶ Email Service (slow)    │    │
│  │              │                        │                  │    │
│  │              │◀───────────────────────┘                  │    │
│  │              │  (waiting for email to send)              │    │
│  │  Client ◀───┘                                            │    │
│  │                                                          │    │
│  │  Total response time: 2000ms (500ms + 1500ms email)      │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  AFTER (Asynchronous):                                          │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  Client ───▶ Order Service ───▶ Message Queue            │    │
│  │              │                        │                  │    │
│  │  Client ◀───┘ (200ms)                │                  │    │
│  │                                       │                  │    │
│  │                                       ▼                  │    │
│  │                              Email Service (async)       │    │
│  │                                                          │    │
│  │  Response time: 200ms (email sent later)                 │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  WHEN TO USE ASYNC:                                             │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  ✓ Non-critical operations (emails, notifications)       │    │
│  │  ✓ Long-running tasks (report generation, exports)       │    │
│  │  ✓ External API calls with high latency                  │    │
│  │  ✓ Operations that can be retried                        │    │
│  │                                                          │    │
│  │  ✗ Operations requiring immediate response               │    │
│  │  ✗ Operations user is waiting for                        │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  IMPLEMENTATION:                                                │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  // Producer (Order Service)                             │    │
│  │  func CreateOrder(order *Order) error {                  │    │
│  │      // Save order                                       │    │
│  │      err := db.SaveOrder(order)                          │    │
│  │      if err != nil {                                     │    │
│  │          return err                                      │    │
│  │      }                                                   │    │
│  │                                                          │    │
│  │      // Publish event (non-blocking)                     │    │
│  │      kafka.Publish("order.created", OrderCreatedEvent{   │    │
│  │          OrderID: order.ID,                              │    │
│  │          Email:   order.CustomerEmail,                   │    │
│  │      })                                                  │    │
│  │                                                          │    │
│  │      return nil  // Return immediately                   │    │
│  │  }                                                       │    │
│  │                                                          │    │
│  │  // Consumer (Email Service)                             │    │
│  │  func HandleOrderCreated(event OrderCreatedEvent) {      │    │
│  │      // Send email (takes 1500ms)                        │    │
│  │      sendEmail(event.Email, "Order Confirmation", ...)   │    │
│  │  }                                                       │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Strategy 4: Database Optimization

```
┌─────────────────────────────────────────────────────────────────┐
│  STRATEGY: DATABASE OPTIMIZATION                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. READ REPLICAS                                               │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │           Writes                      Reads              │    │
│  │              │                          │                │    │
│  │              ▼                          ▼                │    │
│  │     ┌─────────────────┐        ┌─────────────────┐      │    │
│  │     │    Primary      │   ───▶ │   Replica 1     │      │    │
│  │     │   (Write DB)    │  Sync  │   (Read DB)     │      │    │
│  │     └─────────────────┘        └─────────────────┘      │    │
│  │              │                                           │    │
│  │              │                 ┌─────────────────┐      │    │
│  │              └────────────────▶│   Replica 2     │      │    │
│  │                                │   (Read DB)     │      │    │
│  │                                └─────────────────┘      │    │
│  │                                                          │    │
│  │  Write/Read ratio: 1:10 typical in most applications     │    │
│  │  Scale reads by adding replicas                          │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  2. CONNECTION POOLING                                          │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  WITHOUT POOLING:                                        │    │
│  │  Request 1 → Open connection → Query → Close connection  │    │
│  │  Request 2 → Open connection → Query → Close connection  │    │
│  │  (Connection overhead: ~50ms each)                       │    │
│  │                                                          │    │
│  │  WITH POOLING:                                           │    │
│  │  ┌─────────────────────────────────────────────┐        │    │
│  │  │             CONNECTION POOL                  │        │    │
│  │  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐        │        │    │
│  │  │  │Conn│ │Conn│ │Conn│ │Conn│ │Conn│        │        │    │
│  │  │  │ 1  │ │ 2  │ │ 3  │ │ 4  │ │ 5  │        │        │    │
│  │  │  └────┘ └────┘ └────┘ └────┘ └────┘        │        │    │
│  │  └─────────────────────────────────────────────┘        │    │
│  │  Request 1 → Borrow conn → Query → Return conn           │    │
│  │  (No connection overhead)                                │    │
│  │                                                          │    │
│  │  Pool configuration:                                     │    │
│  │  • min_connections: 10                                   │    │
│  │  • max_connections: 50                                   │    │
│  │  • max_idle_time: 30s                                    │    │
│  │  • connection_timeout: 5s                                │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  3. QUERY OPTIMIZATION                                          │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  • Add indexes for frequently queried columns            │    │
│  │  • Use EXPLAIN ANALYZE to identify slow queries          │    │
│  │  • Avoid SELECT * - fetch only needed columns            │    │
│  │  • Batch operations instead of individual queries        │    │
│  │  • Use prepared statements                               │    │
│  │                                                          │    │
│  │  BATCH EXAMPLE:                                          │    │
│  │                                                          │    │
│  │  // Bad: N+1 queries                                     │    │
│  │  for _, orderID := range orderIDs {                      │    │
│  │      order, _ := db.GetOrder(orderID)  // 100 queries    │    │
│  │  }                                                       │    │
│  │                                                          │    │
│  │  // Good: Single query                                   │    │
│  │  orders, _ := db.GetOrders(orderIDs)   // 1 query        │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Strategy 5: Circuit Breaker + Fallback

```
┌─────────────────────────────────────────────────────────────────┐
│  STRATEGY: CIRCUIT BREAKER WITH FALLBACK                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  When a dependency is the bottleneck, fail fast and use fallback│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  func GetProductWithFallback(productID string) *Product { │   │
│  │                                                          │    │
│  │      result, err := circuitBreaker.Execute(func() (*Product, error) {│
│  │          // Try primary: Product Service                 │    │
│  │          return productClient.GetProduct(productID)      │    │
│  │      })                                                  │    │
│  │                                                          │    │
│  │      if err != nil {                                     │    │
│  │          // Circuit open or call failed                  │    │
│  │                                                          │    │
│  │          // Fallback 1: Try cache                        │    │
│  │          if cached, ok := cache.Get(productID); ok {     │    │
│  │              return cached                               │    │
│  │          }                                               │    │
│  │                                                          │    │
│  │          // Fallback 2: Return degraded response         │    │
│  │          return &Product{                                │    │
│  │              ID:          productID,                     │    │
│  │              Name:        "Product information unavailable",│  │
│  │              Price:       0,                             │    │
│  │              Available:   false,                         │    │
│  │          }                                               │    │
│  │      }                                                   │    │
│  │                                                          │    │
│  │      return result                                       │    │
│  │  }                                                       │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  FALLBACK STRATEGIES:                                           │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  1. Cached data (slightly stale is OK)                   │    │
│  │  2. Default value                                        │    │
│  │  3. Alternative service (backup provider)                │    │
│  │  4. Degraded functionality (hide feature)                │    │
│  │  5. Queue for later processing                           │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Strategy 6: Service Decomposition

```
┌─────────────────────────────────────────────────────────────────┐
│  STRATEGY: SERVICE DECOMPOSITION                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Split overloaded service into smaller, specialized services    │
│                                                                  │
│  BEFORE: Monolithic User Service (Bottleneck)                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │              ┌─────────────────────────────┐             │    │
│  │              │      USER SERVICE           │             │    │
│  │              │                             │             │    │
│  │              │  • Authentication           │             │    │
│  │              │  • Profile management       │             │    │
│  │              │  • Preferences              │             │    │
│  │              │  • Activity history         │             │    │
│  │              │  • Friend connections       │             │    │
│  │              │                             │             │    │
│  │              │  [All on single database]   │             │    │
│  │              └─────────────────────────────┘             │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  AFTER: Decomposed Services                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │    │
│  │  │    Auth     │  │   Profile   │  │   Social    │      │    │
│  │  │   Service   │  │   Service   │  │   Service   │      │    │
│  │  │             │  │             │  │             │      │    │
│  │  │ • Login     │  │ • Profile   │  │ • Friends   │      │    │
│  │  │ • Tokens    │  │ • Prefs     │  │ • Activity  │      │    │
│  │  │ • Sessions  │  │ • Settings  │  │ • Feed      │      │    │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘      │    │
│  │         │                │                │              │    │
│  │         ▼                ▼                ▼              │    │
│  │     ┌───────┐        ┌───────┐        ┌───────┐         │    │
│  │     │ Redis │        │Postgres│        │ Neo4j │         │    │
│  │     │(Fast) │        │ (ACID) │        │(Graph)│         │    │
│  │     └───────┘        └───────┘        └───────┘         │    │
│  │                                                          │    │
│  │  Each service:                                           │    │
│  │  • Scales independently                                  │    │
│  │  • Uses optimal database                                 │    │
│  │  • Has focused responsibility                            │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  DECOMPOSITION CRITERIA:                                        │
│  • Different scaling requirements                               │
│  • Different data access patterns                               │
│  • Different update frequencies                                 │
│  • Different team ownership                                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Strategy 7: Request Coalescing

```
┌─────────────────────────────────────────────────────────────────┐
│  STRATEGY: REQUEST COALESCING                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Combine multiple requests into one to reduce backend load      │
│                                                                  │
│  BEFORE (Thundering Herd Problem):                              │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  User 1 ─┐                  ┌─────────────────┐          │    │
│  │          │──get product─────▶                 │          │    │
│  │  User 2 ─┤                  │    Database     │          │    │
│  │          │──get product─────▶   (Same query   │          │    │
│  │  User 3 ─┤                  │    100 times!)  │          │    │
│  │          │──get product─────▶                 │          │    │
│  │  ...     │                  └─────────────────┘          │    │
│  │  User 100─┘                                              │    │
│  │                                                          │    │
│  │  Result: 100 identical queries to database               │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  AFTER (Request Coalescing):                                    │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  User 1 ─┐                                               │    │
│  │          │                  ┌─────────────────┐          │    │
│  │  User 2 ─┼──▶ Coalescer ───▶│    Database     │          │    │
│  │          │   (1 request)    │   (1 query!)    │          │    │
│  │  User 3 ─┤                  └────────┬────────┘          │    │
│  │          │◀─────────────────────────┘                   │    │
│  │  ...     │      (broadcast result to all)               │    │
│  │  User 100─┘                                              │    │
│  │                                                          │    │
│  │  Result: 1 query, result shared with 100 users           │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  IMPLEMENTATION (Go with singleflight):                         │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  import "golang.org/x/sync/singleflight"                 │    │
│  │                                                          │    │
│  │  var group singleflight.Group                            │    │
│  │                                                          │    │
│  │  func GetProduct(productID string) (*Product, error) {   │    │
│  │      // All concurrent requests for same productID       │    │
│  │      // will share the same database call                │    │
│  │                                                          │    │
│  │      result, err, _ := group.Do(productID, func() (interface{}, error) {│
│  │          // This function runs only ONCE                 │    │
│  │          // even if called 100 times concurrently        │    │
│  │          return db.GetProduct(productID)                 │    │
│  │      })                                                  │    │
│  │                                                          │    │
│  │      if err != nil {                                     │    │
│  │          return nil, err                                 │    │
│  │      }                                                   │    │
│  │      return result.(*Product), nil                       │    │
│  │  }                                                       │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  USE CASES:                                                     │
│  • Cache miss stampede prevention                               │
│  • Hot key access                                               │
│  • Popular product pages                                        │
│  • Rate limited external APIs                                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Bottleneck Identification Checklist

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    BOTTLENECK IDENTIFICATION CHECKLIST                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  MONITORING METRICS:                                                         │
│  ☐ Service latency (p50, p95, p99)                                          │
│  ☐ Error rates per service                                                  │
│  ☐ CPU/Memory utilization                                                   │
│  ☐ Database connection pool usage                                           │
│  ☐ Queue depths                                                             │
│  ☐ Network bandwidth                                                        │
│                                                                              │
│  TOOLS:                                                                      │
│  • Distributed tracing (Jaeger, Zipkin) → Find slow services                │
│  • APM (Datadog, New Relic) → Service dependencies                          │
│  • Database profiler → Slow queries                                         │
│  • Load testing (k6, Gatling) → Find breaking points                        │
│                                                                              │
│  RED FLAGS:                                                                  │
│  ⚠ One service appears in most slow traces                                  │
│  ⚠ Database CPU at 100%                                                     │
│  ⚠ Connection pool exhausted                                                │
│  ⚠ High error rate from single dependency                                   │
│  ⚠ Requests timing out at same service                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Key Takeaways

1. **Identify before optimizing** - Use tracing and metrics to find real bottlenecks
2. **Cache aggressively** - Most reads can be cached
3. **Go async when possible** - Don't block on non-critical operations
4. **Scale horizontally** - Add instances, not bigger machines
5. **Fail fast with fallbacks** - Circuit breakers protect the system
6. **Decompose when needed** - Split overloaded services
7. **Coalesce requests** - Combine duplicate work
