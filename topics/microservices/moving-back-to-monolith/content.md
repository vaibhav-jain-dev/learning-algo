# Why Services Are Moving Back to Monolith

## Overview

After years of microservices adoption, many companies are reconsidering their architecture choices. This guide explores why some organizations are moving back to monolithic architectures, the circumstances that lead to this decision, and lessons learned from the microservices journey.

**Tags:** Architecture, Monolith, Migration, Case Studies

---

## The Microservices Pendulum

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    THE ARCHITECTURE PENDULUM                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                              Peak Microservices                              │
│                                     Hype                                     │
│                                      ▲                                       │
│                                     /│\                                      │
│                                    / │ \                                     │
│                                   /  │  \                                    │
│                                  /   │   \                                   │
│                                 /    │    \                                  │
│                                /     │     \                                 │
│        Monolith Era          /      │      \        Return to               │
│        (2000-2010)          /       │       \       Monolith?               │
│             ▲              /        │        \           ▲                   │
│              \            /         │         \         /                    │
│               \          /          │          \       /                     │
│                \        /           │           \     /                      │
│                 \______/            │            \___/                       │
│                                     │                                        │
│         2005        2010         2015         2020         2025             │
│                                                                              │
│  What happened:                                                              │
│  • Netflix, Amazon success stories inspired microservices adoption          │
│  • Many companies adopted without Netflix-scale problems                     │
│  • Complexity became apparent in practice                                   │
│  • "Modular monolith" emerges as middle ground                              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Real-World Examples of Moving Back

### 1. Amazon Prime Video (2023)

```
┌─────────────────────────────────────────────────────────────────┐
│  CASE STUDY: AMAZON PRIME VIDEO MONITORING                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  BEFORE: Serverless Microservices                               │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  Video Stream ─▶ Lambda ─▶ S3 ─▶ Lambda ─▶ Step Function│    │
│  │                                                          │    │
│  │  Problems:                                               │    │
│  │  • High costs from S3 tier transitions                   │    │
│  │  • 5% of processing was actual work (95% orchestration)  │    │
│  │  • Complex debugging across services                     │    │
│  │  • Limited by Step Functions scale limits                │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  AFTER: Monolithic Architecture                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  Video Stream ─▶ ECS Service (Monolith)                  │    │
│  │                  └─ All processing in single process     │    │
│  │                                                          │    │
│  │  Results:                                                │    │
│  │  • 90% cost reduction                                    │    │
│  │  • Better scaling characteristics                        │    │
│  │  • Simplified debugging                                  │    │
│  │  • Higher throughput                                     │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  KEY INSIGHT:                                                   │
│  "Serverless and microservices aren't always the right choice.  │
│   The architecture should match the problem, not industry hype."│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2. Segment (2017-2018)

```
┌─────────────────────────────────────────────────────────────────┐
│  CASE STUDY: SEGMENT'S MICROSERVICES TO MONOREPO                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  BEFORE: 140+ Microservices                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  • One microservice per integration (Google Ads, FB, etc)│    │
│  │  • Each had its own repo, CI/CD, deployment              │    │
│  │  • 140+ services to maintain                             │    │
│  │                                                          │    │
│  │  Problems:                                               │    │
│  │  • Operational overhead was unsustainable                │    │
│  │  • Most services had same structure (boilerplate)        │    │
│  │  • Difficult to make cross-cutting changes               │    │
│  │  • 3-person team couldn't manage 140 services            │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  AFTER: Monorepo with Centrifuge                                │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  • Single Go binary with all integrations                │    │
│  │  • One deployment pipeline                               │    │
│  │  • Shared code and testing infrastructure                │    │
│  │  • Plugin architecture for integrations                  │    │
│  │                                                          │    │
│  │  Results:                                                │    │
│  │  • 10x faster development                                │    │
│  │  • Single CI/CD pipeline                                 │    │
│  │  • Easy cross-cutting changes                            │    │
│  │  • One service to monitor                                │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  KEY INSIGHT:                                                   │
│  "Team size must match architecture complexity.                  │
│   A 3-person team cannot manage 140 microservices."             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3. Kelsey Hightower's Perspective (Kubernetes Co-Creator)

```
┌─────────────────────────────────────────────────────────────────┐
│  INDUSTRY LEADER PERSPECTIVE                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Kelsey Hightower (2023):                                       │
│                                                                  │
│  "I think the mass migration to microservices is something that │
│   a lot of people are going to regret...                        │
│                                                                  │
│   Most organizations cannot afford the complexity. You need:    │
│   • Strong platform teams                                       │
│   • Excellent observability                                     │
│   • Mature DevOps practices                                     │
│                                                                  │
│   A well-designed monolith deployed to production beats a       │
│   distributed system designed on a whiteboard every time."      │
│                                                                  │
│  His recommendation:                                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  START WITH:      EVOLVE TO:       ONLY IF NEEDED:       │    │
│  │  ┌─────────┐      ┌─────────┐      ┌─────────────┐      │    │
│  │  │Monolith │ ───▶ │ Modular │ ───▶ │Microservices│      │    │
│  │  │         │      │Monolith │      │             │      │    │
│  │  └─────────┘      └─────────┘      └─────────────┘      │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Primary Reasons for Moving Back

### 1. Operational Complexity Exceeds Benefits

```
┌─────────────────────────────────────────────────────────────────┐
│  REASON 1: OPERATIONAL COMPLEXITY                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  COMPLEXITY GROWTH:                                             │
│                                                                  │
│  Number of    |  Complexity                                     │
│  Services     |                                                  │
│               |                              * *                 │
│     50        |                           *                     │
│               |                        *                        │
│     40        |                     *                           │
│               |                  *                              │
│     30        |               *                                 │
│               |            *                                    │
│     20        |         *                                       │
│               |      *                                          │
│     10        |   *                                             │
│               | *                                               │
│       0       |*──────────────────────────────────              │
│               1    2    3    4    5    6    7    8              │
│               └─────────────────────────────────▶               │
│                    Number of Services                           │
│                                                                  │
│  With microservices you need to manage:                         │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Per service:                                            │    │
│  │  • CI/CD pipeline                                        │    │
│  │  • Monitoring dashboards                                 │    │
│  │  • Alerts                                                │    │
│  │  • Logging configuration                                 │    │
│  │  • Security scanning                                     │    │
│  │  • Dependency updates                                    │    │
│  │  • Documentation                                         │    │
│  │                                                          │    │
│  │  Cross-service:                                          │    │
│  │  • Service mesh                                          │    │
│  │  • API gateway                                           │    │
│  │  • Distributed tracing                                   │    │
│  │  • Contract testing                                      │    │
│  │  • Data consistency                                      │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  WHEN TO CONSOLIDATE:                                           │
│  • Operational burden exceeds development velocity gains        │
│  • Team spends more time on infrastructure than features        │
│  • Incident response is frequently "which service broke?"       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2. Team Size Doesn't Justify Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  REASON 2: TEAM SIZE MISMATCH                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Conway's Law in reverse:                                       │
│  "Architecture should match team structure"                     │
│                                                                  │
│  NETFLIX MODEL (Works)          STARTUP MODEL (Doesn't Work)    │
│  ┌─────────────────────┐        ┌─────────────────────┐         │
│  │                     │        │                     │         │
│  │  2000+ engineers    │        │  10 engineers       │         │
│  │  ───────────────    │        │  ───────────────    │         │
│  │                     │        │                     │         │
│  │  Team A: Auth       │        │  Same 10 people     │         │
│  │  Team B: Streaming  │        │  manage 20+         │         │
│  │  Team C: Payments   │        │  microservices      │         │
│  │  Team D: ...        │        │                     │         │
│  │                     │        │  Context switching  │         │
│  │  Each team owns     │        │  is constant        │         │
│  │  their services     │        │                     │         │
│  │                     │        │                     │         │
│  └─────────────────────┘        └─────────────────────┘         │
│                                                                  │
│  RULE OF THUMB:                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  Services per engineer ratio:                            │    │
│  │                                                          │    │
│  │  • Healthy: 1-3 services per engineer                    │    │
│  │  • Warning: 4-6 services per engineer                    │    │
│  │  • Danger:  7+ services per engineer                     │    │
│  │                                                          │    │
│  │  If you have 10 engineers and 40 microservices,          │    │
│  │  consider consolidation.                                 │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3. Latency and Performance Issues

```
┌─────────────────────────────────────────────────────────────────┐
│  REASON 3: PERFORMANCE DEGRADATION                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  MONOLITH REQUEST:                                              │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  Request ─▶ Process ─▶ Response                          │    │
│  │                                                          │    │
│  │  Total latency: ~50ms                                    │    │
│  │  (in-process function calls)                             │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  MICROSERVICES REQUEST:                                         │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  Request ─▶ API GW ─▶ Service A ─▶ Service B ─▶ ...     │    │
│  │         (10ms)    (30ms)     (30ms)     (30ms)           │    │
│  │                                                          │    │
│  │  Total latency: ~150ms+ (network + serialization)        │    │
│  │                                                          │    │
│  │  Each hop adds:                                          │    │
│  │  • Network latency (1-10ms)                              │    │
│  │  • Serialization/Deserialization (1-5ms)                 │    │
│  │  • Connection overhead                                   │    │
│  │  • Potential retries                                     │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  IMPACT:                                                        │
│  • User-facing latency increases                                │
│  • p99 latencies can be 5-10x higher                            │
│  • Mobile users on slow networks suffer most                    │
│                                                                  │
│  WHEN TO CONSOLIDATE:                                           │
│  • Latency is a competitive disadvantage                        │
│  • Most calls are in hot paths                                  │
│  • Services are tightly coupled anyway                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4. Debugging and Incident Response Nightmare

```
┌─────────────────────────────────────────────────────────────────┐
│  REASON 4: DEBUGGING COMPLEXITY                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  MONOLITH DEBUGGING:                                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  1. Check logs (one place)                               │    │
│  │  2. Set breakpoint                                       │    │
│  │  3. Reproduce issue                                      │    │
│  │  4. Step through code                                    │    │
│  │  5. Fix and deploy                                       │    │
│  │                                                          │    │
│  │  Time to resolution: Minutes to hours                    │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  MICROSERVICES DEBUGGING:                                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  1. Which service is the problem? (check all dashboards) │    │
│  │  2. Find correlation ID across logs                      │    │
│  │  3. Check distributed trace                              │    │
│  │  4. Identify failing service                             │    │
│  │  5. Check that service's logs                            │    │
│  │  6. Is it this service or a dependency?                  │    │
│  │  7. Reproduce in isolation (hard)                        │    │
│  │  8. Fix and deploy that service                          │    │
│  │  9. Verify fix didn't break others                       │    │
│  │                                                          │    │
│  │  Time to resolution: Hours to days                       │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  COMMON INCIDENT PATTERNS:                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  "It's not my service"  ←─┐                              │    │
│  │         │                 │                              │    │
│  │         ▼                 │                              │    │
│  │  "Check service B"        │                              │    │
│  │         │                 │                              │    │
│  │         ▼                 │                              │    │
│  │  "Service B blames C" ────┘                              │    │
│  │                                                          │    │
│  │  Result: Hours of finger-pointing                        │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5. Services That Shouldn't Have Been Split

```
┌─────────────────────────────────────────────────────────────────┐
│  REASON 5: WRONG SERVICE BOUNDARIES                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ANTI-PATTERN: DISTRIBUTED MONOLITH                             │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  Signs you have a distributed monolith:                  │    │
│  │                                                          │    │
│  │  • Can't deploy Service A without Service B              │    │
│  │  • Every request touches 5+ services                     │    │
│  │  • Shared database between services                      │    │
│  │  • Circular dependencies                                 │    │
│  │  • Same data replicated everywhere                       │    │
│  │                                                          │    │
│  │  You have:                                               │    │
│  │  ┌───────┐  ┌───────┐  ┌───────┐                        │    │
│  │  │ Svc A │◀─▶│ Svc B │◀─▶│ Svc C │                        │    │
│  │  └───┬───┘  └───┬───┘  └───┬───┘                        │    │
│  │      │          │          │                             │    │
│  │      └──────────▼──────────┘                             │    │
│  │           Shared Database                                │    │
│  │                                                          │    │
│  │  This is WORSE than a monolith:                          │    │
│  │  • All the coupling of a monolith                        │    │
│  │  • Plus network overhead                                 │    │
│  │  • Plus deployment complexity                            │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  BETTER: Merge into monolith, then properly refactor later      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## When Monolith Is Actually Better

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 SCENARIOS FAVORING MONOLITH                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. EARLY STAGE STARTUP                                                     │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │  • Requirements changing rapidly                                  │    │
│     │  • Need to ship features fast                                     │    │
│     │  • Team is small (< 10)                                           │    │
│     │  • Don't know the domain boundaries yet                           │    │
│     │                                                                   │    │
│     │  → Build a modular monolith, extract later if needed             │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  2. DATA-INTENSIVE APPLICATIONS                                             │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │  • Heavy data processing                                          │    │
│     │  • Complex queries across entities                                │    │
│     │  • Need for ACID transactions                                     │    │
│     │  • Analytics and reporting                                        │    │
│     │                                                                   │    │
│     │  → Monolith with powerful database is simpler                    │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  3. LATENCY-CRITICAL SYSTEMS                                                │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │  • Real-time gaming                                               │    │
│     │  • High-frequency trading                                         │    │
│     │  • Video processing pipelines                                     │    │
│     │                                                                   │    │
│     │  → In-process calls beat network calls                           │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  4. SMALL TO MEDIUM TEAMS                                                   │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │  • 5-20 engineers                                                 │    │
│     │  • Single product focus                                           │    │
│     │  • Limited DevOps resources                                       │    │
│     │                                                                   │    │
│     │  → Can't afford microservices overhead                           │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  5. STRONG CONSISTENCY REQUIREMENTS                                         │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │  • Financial applications                                         │    │
│     │  • Inventory management                                           │    │
│     │  • Booking systems                                                │    │
│     │                                                                   │    │
│     │  → ACID transactions are easier in monolith                      │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## The Middle Ground: Modular Monolith

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MODULAR MONOLITH                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Best of both worlds:                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │                    MODULAR MONOLITH                                 │    │
│  │  ┌────────────────────────────────────────────────────────────┐    │    │
│  │  │                                                             │    │    │
│  │  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │    │    │
│  │  │  │    User      │  │    Order     │  │   Payment    │     │    │    │
│  │  │  │   Module     │  │   Module     │  │   Module     │     │    │    │
│  │  │  │              │  │              │  │              │     │    │    │
│  │  │  │ • Public API │  │ • Public API │  │ • Public API │     │    │    │
│  │  │  │ • Internal   │  │ • Internal   │  │ • Internal   │     │    │    │
│  │  │  │   logic      │  │   logic      │  │   logic      │     │    │    │
│  │  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │    │    │
│  │  │         │                 │                 │              │    │    │
│  │  │  ┌──────▼─────────────────▼─────────────────▼───────────┐ │    │    │
│  │  │  │              SHARED INFRASTRUCTURE                    │ │    │    │
│  │  │  │  (Database, Logging, Metrics, Auth)                   │ │    │    │
│  │  │  └──────────────────────────────────────────────────────┘ │    │    │
│  │  │                                                             │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                      │    │
│  │  RULES:                                                              │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │  1. Modules communicate through defined interfaces only      │    │    │
│  │  │  2. No direct database access across modules                 │    │    │
│  │  │  3. Each module has clear public API                         │    │    │
│  │  │  4. Modules can be extracted to services later               │    │    │
│  │  │  5. Single deployment, but logical separation                │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  BENEFITS:                                                                   │
│  • Simple deployment (like monolith)                                        │
│  • Clear boundaries (like microservices)                                    │
│  • Fast in-process communication                                            │
│  • Can extract modules later when needed                                    │
│  • Single database (simpler consistency)                                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## How to Migrate Back to Monolith

### Step-by-Step Migration

```
┌─────────────────────────────────────────────────────────────────┐
│             MICROSERVICES TO MONOLITH MIGRATION                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PHASE 1: ANALYZE                                               │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  1. Map all service dependencies                         │    │
│  │  2. Identify tightly coupled services                    │    │
│  │  3. Measure communication patterns                       │    │
│  │  4. Calculate operational cost per service               │    │
│  │  5. Identify candidates for consolidation                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  PHASE 2: CONSOLIDATE DATA                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  1. Design unified database schema                       │    │
│  │  2. Create data migration scripts                        │    │
│  │  3. Run dual-write to both old and new databases         │    │
│  │  4. Validate data consistency                            │    │
│  │  5. Switch reads to new database                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  PHASE 3: MERGE CODE                                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  1. Create monolith project structure                    │    │
│  │  2. Import service code as modules                       │    │
│  │  3. Replace HTTP calls with direct function calls        │    │
│  │  4. Maintain module boundaries (interfaces)              │    │
│  │  5. Update tests                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  PHASE 4: DEPLOY                                                │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  1. Deploy monolith alongside microservices              │    │
│  │  2. Route small percentage of traffic to monolith        │    │
│  │  3. Compare metrics (latency, errors, resources)         │    │
│  │  4. Gradually increase traffic to monolith               │    │
│  │  5. Decommission old microservices                       │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Takeaways

1. **Microservices are not always the answer** - They solve specific problems for specific scales
2. **Team size matters** - Don't adopt Netflix architecture with a 10-person team
3. **Operational maturity is required** - Strong DevOps, observability, and platform engineering
4. **Modular monolith is underrated** - Gets you 80% of the benefits with 20% of the complexity
5. **It's OK to consolidate** - Moving back isn't admitting failure; it's pragmatic engineering
6. **Match architecture to context** - Stage of company, team size, domain complexity all matter
