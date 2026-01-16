# Monolith to Microservices: Real-World Case Studies

## Overview

This guide presents detailed case studies of companies that successfully migrated from monolithic to microservices architectures. Each case study covers the motivation, approach, challenges, and lessons learned.

**Tags:** Case Studies, Migration, Real-World, Architecture

---

## Case Study 1: Amazon (2001-2006)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  CASE STUDY: AMAZON'S MICROSERVICES TRANSFORMATION                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  TIMELINE: 2001-2006                                                         │
│  SCALE: Millions of customers → Billions in revenue                         │
│                                                                              │
│  THE PROBLEM (2001):                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  "Obidos" Monolith:                                                  │    │
│  │  • Single C++ application handling everything                        │    │
│  │  • All teams worked on same codebase                                 │    │
│  │  • 2-week deployment cycles                                          │    │
│  │  • Single failure could take down entire site                        │    │
│  │  • Couldn't scale individual components                              │    │
│  │                                                                      │    │
│  │  Pain Points:                                                        │    │
│  │  • Feature releases took months                                      │    │
│  │  • Deployments required coordinated downtime                         │    │
│  │  • Database was single point of failure                              │    │
│  │  • Team conflicts over shared code                                   │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  THE MANDATE (2002):                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Jeff Bezos API Mandate:                                             │    │
│  │                                                                      │    │
│  │  1. All teams will expose their data and functionality through       │    │
│  │     service interfaces                                               │    │
│  │                                                                      │    │
│  │  2. Teams must communicate with each other through these interfaces  │    │
│  │                                                                      │    │
│  │  3. There will be no other form of inter-process communication:      │    │
│  │     no direct linking, no direct reads of another team's data store, │    │
│  │     no shared-memory model                                           │    │
│  │                                                                      │    │
│  │  4. It doesn't matter what technology they use                       │    │
│  │                                                                      │    │
│  │  5. All service interfaces must be designed to be externalizable     │    │
│  │                                                                      │    │
│  │  6. Anyone who doesn't do this will be fired                         │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  THE APPROACH:                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Phase 1: Define Service Boundaries                                  │    │
│  │  • Product catalog                                                   │    │
│  │  • Customer data                                                     │    │
│  │  • Orders                                                            │    │
│  │  • Payments                                                          │    │
│  │  • Inventory                                                         │    │
│  │  • Recommendations                                                   │    │
│  │                                                                      │    │
│  │  Phase 2: Extract Services (Strangler Pattern)                       │    │
│  │  • Start with low-risk services                                      │    │
│  │  • Build API layer in front of monolith                              │    │
│  │  • Gradually route traffic to new services                           │    │
│  │  • Keep monolith running until service proven                        │    │
│  │                                                                      │    │
│  │  Phase 3: Scale and Iterate                                          │    │
│  │  • Two-pizza teams (6-10 people) own services                        │    │
│  │  • Teams choose their own technology                                 │    │
│  │  • Services can have their own databases                             │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  RESULTS (2006):                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Before (2001)          │  After (2006)                              │    │
│  │  ─────────────────────────┼─────────────────────────                 │    │
│  │  1 monolith             │  100+ services                            │    │
│  │  2-week deployments     │  Multiple deploys/day                     │    │
│  │  Coordinated releases   │  Independent releases                     │    │
│  │  Single database        │  Database per service                     │    │
│  │  All-or-nothing scaling │  Service-level scaling                    │    │
│  │                                                                      │    │
│  │  Bonus: AWS was born from this infrastructure!                       │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  KEY LESSONS:                                                                │
│  • Strong mandate from leadership is essential                              │
│  • Service boundaries should align with business domains                     │
│  • Small, autonomous teams work best                                        │
│  • Design APIs as if they'll be public                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Case Study 2: Netflix (2008-2016)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  CASE STUDY: NETFLIX CLOUD MIGRATION                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  TIMELINE: 2008-2016                                                         │
│  SCALE: 8M → 130M+ subscribers                                              │
│                                                                              │
│  THE CATALYST (2008):                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Major database corruption caused 3-day outage                       │    │
│  │  • DVD shipping stopped                                              │    │
│  │  • Massive revenue loss                                              │    │
│  │  • Customer trust damaged                                            │    │
│  │                                                                      │    │
│  │  Leadership decision:                                                │    │
│  │  "We need to move to the cloud and become a distributed system"      │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  THE BEFORE STATE:                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  • Vertically scaled data center                                     │    │
│  │  • Oracle database (single point of failure)                         │    │
│  │  • Java monolith                                                     │    │
│  │  • Tight coupling between DVD and streaming                          │    │
│  │  • Manual scaling                                                    │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  MIGRATION STRATEGY (8 years):                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Year 1-2: Foundation                                                │    │
│  │  ┌─────────────────────────────────────────────────────────┐        │    │
│  │  │  • Moved non-critical systems to AWS first               │        │    │
│  │  │  • Video encoding (stateless, easy to migrate)           │        │    │
│  │  │  • Built Netflix OSS tools (Eureka, Hystrix, Zuul)       │        │    │
│  │  │  • Learned cloud patterns                                │        │    │
│  │  └─────────────────────────────────────────────────────────┘        │    │
│  │                                                                      │    │
│  │  Year 3-4: Core Systems                                              │    │
│  │  ┌─────────────────────────────────────────────────────────┐        │    │
│  │  │  • Decomposed monolith into services                     │        │    │
│  │  │  • Member service, Video service, Playback service       │        │    │
│  │  │  • Moved from Oracle to Cassandra/DynamoDB               │        │    │
│  │  │  • Built custom streaming infrastructure                 │        │    │
│  │  └─────────────────────────────────────────────────────────┘        │    │
│  │                                                                      │    │
│  │  Year 5-6: Full Migration                                            │    │
│  │  ┌─────────────────────────────────────────────────────────┐        │    │
│  │  │  • Migrated customer-facing APIs                         │        │    │
│  │  │  • Moved billing and payments                            │        │    │
│  │  │  • Closed data center                                    │        │    │
│  │  │  • 100% on AWS                                           │        │    │
│  │  └─────────────────────────────────────────────────────────┘        │    │
│  │                                                                      │    │
│  │  Year 7-8: Optimization                                              │    │
│  │  ┌─────────────────────────────────────────────────────────┐        │    │
│  │  │  • Chaos Engineering (Chaos Monkey)                      │        │    │
│  │  │  • Multi-region deployment                               │        │    │
│  │  │  • Full active-active                                    │        │    │
│  │  └─────────────────────────────────────────────────────────┘        │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  NETFLIX OSS CONTRIBUTIONS:                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Tool           │  Purpose                                           │    │
│  │  ────────────────┼────────────────────────────────────               │    │
│  │  Eureka         │  Service discovery                                 │    │
│  │  Zuul           │  API Gateway                                       │    │
│  │  Hystrix        │  Circuit breaker                                   │    │
│  │  Ribbon         │  Client-side load balancing                        │    │
│  │  Chaos Monkey   │  Failure injection                                 │    │
│  │  Spinnaker      │  Continuous deployment                             │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  RESULTS:                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Before (2008)          │  After (2016)                              │    │
│  │  ─────────────────────────┼─────────────────────────────             │    │
│  │  Data center            │  100% AWS                                 │    │
│  │  Oracle DB              │  Cassandra, DynamoDB                      │    │
│  │  1 monolith             │  700+ microservices                       │    │
│  │  Hours to deploy        │  Thousands of deploys/day                 │    │
│  │  Single region          │  Multi-region active-active               │    │
│  │  99.9% availability     │  99.99% availability                      │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  KEY LESSONS:                                                                │
│  • Migration takes years, not months                                        │
│  • Build tools as you go (then open source them)                            │
│  • Start with stateless services                                            │
│  • Invest heavily in observability                                          │
│  • Embrace failure as normal (Chaos Engineering)                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Case Study 3: Uber (2014-2018)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  CASE STUDY: UBER'S MICROSERVICES JOURNEY                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  TIMELINE: 2014-2018                                                         │
│  SCALE: $0 → $11B revenue, 3 cities → 600+ cities                           │
│                                                                              │
│  THE BEFORE STATE (2014):                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Two Python monoliths:                                               │    │
│  │  • API (dispatch, user management, trips)                            │    │
│  │  • Dispatch (matching riders with drivers)                           │    │
│  │                                                                      │    │
│  │  Problems:                                                           │    │
│  │  • Deployment took 1 hour, frequent rollbacks                        │    │
│  │  • All engineers worked on same codebase                             │    │
│  │  • Dispatch changes could break payments                             │    │
│  │  • Couldn't scale dispatch independently                             │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  DOMAIN-DRIVEN DECOMPOSITION:                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Identified Business Domains:                                        │    │
│  │                                                                      │    │
│  │  ┌─────────────────────────────────────────────────────────┐        │    │
│  │  │                                                          │        │    │
│  │  │  MARKETPLACE                      PLATFORM               │        │    │
│  │  │  ├─ Dispatch                      ├─ Geospatial          │        │    │
│  │  │  ├─ Pricing                       ├─ Maps                │        │    │
│  │  │  ├─ Surge                         ├─ Notifications       │        │    │
│  │  │  └─ Matching                      └─ Communications      │        │    │
│  │  │                                                          │        │    │
│  │  │  PAYMENTS                         IDENTITY               │        │    │
│  │  │  ├─ Billing                       ├─ User Management     │        │    │
│  │  │  ├─ Invoicing                     ├─ Authentication      │        │    │
│  │  │  └─ Fraud Detection               └─ Authorization       │        │    │
│  │  │                                                          │        │    │
│  │  │  TRIPS                            DRIVER                 │        │    │
│  │  │  ├─ Trip Service                  ├─ Driver Onboarding   │        │    │
│  │  │  ├─ Tracking                      ├─ Earnings            │        │    │
│  │  │  └─ Rating                        └─ Vehicle Management  │        │    │
│  │  │                                                          │        │    │
│  │  └─────────────────────────────────────────────────────────┘        │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  TECHNOLOGY CHOICES:                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  • Go for most services (performance, simplicity)                    │    │
│  │  • Java for data-intensive services                                  │    │
│  │  • Node.js for real-time features                                    │    │
│  │  • Python for ML services                                            │    │
│  │                                                                      │    │
│  │  Infrastructure:                                                     │    │
│  │  • gRPC for service communication                                    │    │
│  │  • Kafka for event streaming                                         │    │
│  │  • Cassandra, MySQL, Redis for data                                  │    │
│  │  • Kubernetes for orchestration                                      │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  THE PROBLEMS THAT EMERGED:                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  By 2018, Uber had:                                                  │    │
│  │  • 2,200+ microservices                                              │    │
│  │  • Dependency hell                                                   │    │
│  │  • "Service sprawl"                                                  │    │
│  │  • Inconsistent patterns across services                             │    │
│  │  • Debugging nightmares                                              │    │
│  │                                                                      │    │
│  │  Quote from Uber engineer:                                           │    │
│  │  "We went from 2 services everyone understood to 2000 services       │    │
│  │   nobody understood"                                                 │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  THE CORRECTION (2018+):                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  DOMA (Domain-Oriented Microservice Architecture):                   │    │
│  │                                                                      │    │
│  │  1. Group services into domains                                      │    │
│  │  2. Each domain has gateway service                                  │    │
│  │  3. External communication only through gateway                      │    │
│  │  4. Domain teams own entire domain                                   │    │
│  │                                                                      │    │
│  │  ┌─────────────────────────────────────────────────────────┐        │    │
│  │  │                                                          │        │    │
│  │  │  External Request                                        │        │    │
│  │  │        │                                                 │        │    │
│  │  │        ▼                                                 │        │    │
│  │  │  ┌──────────────┐                                       │        │    │
│  │  │  │   PAYMENTS   │◀──── Domain Gateway                   │        │    │
│  │  │  │   DOMAIN     │                                       │        │    │
│  │  │  │ ┌──────────┐ │                                       │        │    │
│  │  │  │ │ Billing  │ │◀──── Internal services               │        │    │
│  │  │  │ │ Invoice  │ │      (hidden from outside)           │        │    │
│  │  │  │ │ Fraud    │ │                                       │        │    │
│  │  │  │ └──────────┘ │                                       │        │    │
│  │  │  └──────────────┘                                       │        │    │
│  │  │                                                          │        │    │
│  │  └─────────────────────────────────────────────────────────┘        │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  KEY LESSONS:                                                                │
│  • More services ≠ better architecture                                      │
│  • Domain boundaries matter more than service boundaries                    │
│  • Standardization across services is essential                             │
│  • Ownership should be at domain level, not service level                   │
│  • Course correction is normal and expected                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Case Study 4: Shopify (2016-2020)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  CASE STUDY: SHOPIFY'S MODULAR MONOLITH                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  TIMELINE: 2016-2020                                                         │
│  SCALE: Powering 1M+ stores, handling $300B+ GMV                            │
│                                                                              │
│  THE DECISION: NOT TO DO MICROSERVICES                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  In 2016, Shopify evaluated microservices and decided against them.  │    │
│  │                                                                      │    │
│  │  Reasons:                                                            │    │
│  │  • Ruby on Rails monolith was working well                           │    │
│  │  • Team was productive in monolith                                   │    │
│  │  • Operational complexity of microservices was too high              │    │
│  │  • Data consistency requirements were strong                         │    │
│  │                                                                      │    │
│  │  Instead, they chose: MODULAR MONOLITH                               │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  THE APPROACH:                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  1. COMPONENT-BASED ARCHITECTURE                                     │    │
│  │  ┌─────────────────────────────────────────────────────────┐        │    │
│  │  │                                                          │        │    │
│  │  │                    SHOPIFY MONOLITH                      │        │    │
│  │  │  ┌────────────────────────────────────────────────────┐ │        │    │
│  │  │  │                                                     │ │        │    │
│  │  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │ │        │    │
│  │  │  │  │  Shop   │ │Checkout │ │ Orders  │ │Products │  │ │        │    │
│  │  │  │  │Component│ │Component│ │Component│ │Component│  │ │        │    │
│  │  │  │  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘  │ │        │    │
│  │  │  │       │           │           │           │        │ │        │    │
│  │  │  │       │     PUBLIC INTERFACES ONLY       │        │ │        │    │
│  │  │  │       │           │           │           │        │ │        │    │
│  │  │  │  ┌────▼───────────▼───────────▼───────────▼────┐  │ │        │    │
│  │  │  │  │              SHARED DATABASE                 │  │ │        │    │
│  │  │  │  └──────────────────────────────────────────────┘  │ │        │    │
│  │  │  │                                                     │ │        │    │
│  │  │  └─────────────────────────────────────────────────────┘ │        │    │
│  │  │                                                          │        │    │
│  │  └─────────────────────────────────────────────────────────┘        │    │
│  │                                                                      │    │
│  │  Rules:                                                              │    │
│  │  • Components communicate through defined public interfaces          │    │
│  │  • No reaching into another component's internals                    │    │
│  │  • Database tables are owned by components                           │    │
│  │  • Violations are caught by automated tools                          │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  PACKWERK: THE ENFORCEMENT TOOL                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Shopify built Packwerk to enforce component boundaries:             │    │
│  │                                                                      │    │
│  │  # package.yml in each component                                     │    │
│  │  enforce_privacy: true                                               │    │
│  │  enforce_dependencies: true                                          │    │
│  │                                                                      │    │
│  │  dependencies:                                                       │    │
│  │    - shop                   # Can depend on shop component           │    │
│  │    - products               # Can depend on products component       │    │
│  │                                                                      │    │
│  │  public_path: app/public/   # Only this folder is accessible        │    │
│  │                                                                      │    │
│  │  CI fails if:                                                        │    │
│  │  • Code accesses private methods of other components                 │    │
│  │  • Code depends on undeclared components                             │    │
│  │  • Circular dependencies are introduced                              │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  SELECTIVE EXTRACTION:                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Some components were extracted as services when it made sense:      │    │
│  │                                                                      │    │
│  │  Extracted to service:          Reason:                              │    │
│  │  ─────────────────────────────────────────────────────               │    │
│  │  • Storefront Renderer        Different scaling needs                │    │
│  │  • Identity                   Security isolation                     │    │
│  │  • Payments                   PCI compliance                         │    │
│  │  • Analytics                  Different data patterns                │    │
│  │                                                                      │    │
│  │  Kept in monolith:                                                   │    │
│  │  • Shop, Products, Orders, Checkout, Inventory                       │    │
│  │  • (Core business logic that needs strong consistency)               │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  RESULTS:                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  • 3M+ lines of Ruby code, well-organized                            │    │
│  │  • 500+ engineers working productively                               │    │
│  │  • Handles Black Friday traffic (biggest day of year)                │    │
│  │  • Fast deployments (multiple per day)                               │    │
│  │  • Simple debugging (one codebase)                                   │    │
│  │                                                                      │    │
│  │  Quote from Shopify:                                                 │    │
│  │  "The modular monolith gives us the benefits of microservices        │    │
│  │   (clear boundaries, team ownership) without the costs               │    │
│  │   (network latency, distributed transactions)"                       │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  KEY LESSONS:                                                                │
│  • Microservices are not the only path to scaling                           │
│  • Modular monolith can handle massive scale                                │
│  • Enforce boundaries with tooling, not just convention                     │
│  • Extract services selectively based on real needs                         │
│  • Consistency is easier with shared database                               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Migration Pattern Summary

| Company | Original | Target | Duration | Key Pattern |
|---------|----------|--------|----------|-------------|
| **Amazon** | Monolith | Microservices | 5 years | Mandate from top, API-first |
| **Netflix** | Data center | Cloud + Microservices | 8 years | Strangler fig, OSS tooling |
| **Uber** | 2 monoliths | 2000+ services → DOMA | 4 years | Over-decomposed, then domain-grouped |
| **Shopify** | Monolith | Modular Monolith | Ongoing | Enforced boundaries, selective extraction |

---

## Key Takeaways

1. **There's no one-size-fits-all** - Amazon, Netflix chose microservices; Shopify chose modular monolith
2. **Migrations take years** - Netflix took 8 years, Amazon took 5 years
3. **Over-decomposition is common** - Uber went from 2 to 2000 services, then reorganized
4. **Tooling is essential** - Netflix built OSS tools, Shopify built Packwerk
5. **Leadership support is crucial** - Amazon's mandate, Netflix's cloud commitment
6. **Course correction is normal** - Uber's DOMA restructuring
7. **Start with the end in mind** - Define domains before decomposing
