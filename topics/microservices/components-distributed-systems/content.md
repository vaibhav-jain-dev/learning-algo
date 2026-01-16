# Components Used in Microservices & Distributed Systems

## Overview

Building microservices requires a rich ecosystem of components that handle service discovery, communication, data management, observability, and resilience. This guide covers all essential components needed to build production-ready distributed systems.

**Tags:** Infrastructure, Components, Distributed Systems

---

## Architecture Component Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MICROSERVICES INFRASTRUCTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         EDGE LAYER                                   │    │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐        │    │
│  │  │    CDN    │  │   WAF     │  │   DDoS    │  │Rate Limiter│        │    │
│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│  ┌─────────────────────────────────▼───────────────────────────────────┐    │
│  │                      API GATEWAY LAYER                               │    │
│  │  ┌───────────────────────────────────────────────────────────┐      │    │
│  │  │  API Gateway (Kong/AWS API GW/Nginx/Envoy)                │      │    │
│  │  │  - Authentication/Authorization                            │      │    │
│  │  │  - Request Routing                                        │      │    │
│  │  │  - Rate Limiting                                          │      │    │
│  │  │  - Request/Response Transformation                        │      │    │
│  │  └───────────────────────────────────────────────────────────┘      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│  ┌─────────────────────────────────▼───────────────────────────────────┐    │
│  │                      SERVICE MESH LAYER                              │    │
│  │  ┌───────────────────────────────────────────────────────────┐      │    │
│  │  │  Service Mesh (Istio/Linkerd/Consul Connect)              │      │    │
│  │  │  - Service-to-Service Authentication (mTLS)                │      │    │
│  │  │  - Traffic Management                                      │      │    │
│  │  │  - Observability                                          │      │    │
│  │  └───────────────────────────────────────────────────────────┘      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│  ┌─────────────────────────────────▼───────────────────────────────────┐    │
│  │                      SERVICE LAYER                                   │    │
│  │                                                                      │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │    │
│  │  │ User    │ │ Order   │ │ Payment │ │Inventory│ │ Search  │       │    │
│  │  │ Service │ │ Service │ │ Service │ │ Service │ │ Service │       │    │
│  │  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘       │    │
│  │       │           │           │           │           │             │    │
│  └───────┼───────────┼───────────┼───────────┼───────────┼─────────────┘    │
│          │           │           │           │           │                   │
│  ┌───────▼───────────▼───────────▼───────────▼───────────▼─────────────┐    │
│  │                      DATA LAYER                                      │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │    │
│  │  │PostgreSQL│ │ MongoDB │ │  Redis  │ │  Kafka  │ │Elastic  │       │    │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. API Gateway

The **single entry point** for all client requests to backend services.

### Key Functions

```
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY FUNCTIONS                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐    ┌─────────────────┐                     │
│  │   ROUTING       │    │  AUTHENTICATION │                     │
│  │  /users → UserSvc│    │  JWT Validation │                     │
│  │  /orders→OrderSvc│    │  OAuth2/OIDC    │                     │
│  └─────────────────┘    └─────────────────┘                     │
│                                                                  │
│  ┌─────────────────┐    ┌─────────────────┐                     │
│  │  RATE LIMITING  │    │   LOAD BALANCING│                     │
│  │  100 req/min    │    │  Round Robin    │                     │
│  │  Token Bucket   │    │  Weighted       │                     │
│  └─────────────────┘    └─────────────────┘                     │
│                                                                  │
│  ┌─────────────────┐    ┌─────────────────┐                     │
│  │  TRANSFORMATION │    │   CACHING       │                     │
│  │  Request/Response│    │  Response Cache │                     │
│  │  Protocol Convert│    │  CDN Integration│                     │
│  └─────────────────┘    └─────────────────┘                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Popular API Gateways

| Gateway | Best For | Key Features |
|---------|----------|--------------|
| **Kong** | Flexibility, plugins | 100+ plugins, Lua scripting |
| **AWS API Gateway** | AWS ecosystem | Serverless, managed |
| **Nginx** | Performance | High throughput, reverse proxy |
| **Envoy** | Service mesh | Cloud-native, observability |
| **Traefik** | Kubernetes | Auto-discovery, Let's Encrypt |

### Example: Kong Configuration

```yaml
# Kong Service Configuration
services:
  - name: user-service
    url: http://user-service:8080
    routes:
      - name: user-route
        paths:
          - /api/users
    plugins:
      - name: rate-limiting
        config:
          minute: 100
      - name: jwt
        config:
          secret_is_base64: false
```

---

## 2. Service Discovery

Enables services to **find and communicate** with each other dynamically.

### Service Discovery Patterns

```
┌─────────────────────────────────────────────────────────────────┐
│                   CLIENT-SIDE DISCOVERY                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐      1. Query       ┌──────────────┐              │
│  │  Client  │ ───────────────────▶│   Service    │              │
│  │ Service  │                     │   Registry   │              │
│  │          │◀─────────────────── │ (Consul/Eureka)             │
│  └────┬─────┘   2. Return IPs     └──────────────┘              │
│       │                                                          │
│       │ 3. Direct Call                                          │
│       ▼                                                          │
│  ┌──────────┐                                                   │
│  │  Target  │                                                   │
│  │ Service  │                                                   │
│  └──────────┘                                                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   SERVER-SIDE DISCOVERY                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐      1. Request     ┌──────────────┐              │
│  │  Client  │ ───────────────────▶│    Load      │              │
│  │ Service  │                     │   Balancer   │              │
│  └──────────┘                     └───────┬──────┘              │
│                                           │                      │
│                    2. Query    ┌──────────▼──────┐              │
│                    ┌──────────▶│    Service      │              │
│                    │           │    Registry     │              │
│                    │           └─────────────────┘              │
│                    │                                             │
│                    │ 3. Route to healthy instance               │
│                    ▼                                             │
│              ┌──────────┐                                       │
│              │  Target  │                                       │
│              │ Service  │                                       │
│              └──────────┘                                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Popular Service Discovery Tools

| Tool | Type | Key Features |
|------|------|--------------|
| **Consul** | Both | Health checks, KV store, service mesh |
| **Eureka** | Client-side | Spring Cloud native, Netflix OSS |
| **etcd** | Server-side | Distributed KV, Kubernetes native |
| **Zookeeper** | Server-side | Strong consistency, leader election |
| **Kubernetes DNS** | Server-side | Native K8s service discovery |

### Example: Consul Service Registration

```json
{
  "service": {
    "name": "user-service",
    "id": "user-service-1",
    "port": 8080,
    "tags": ["v1", "primary"],
    "check": {
      "http": "http://localhost:8080/health",
      "interval": "10s",
      "timeout": "5s"
    }
  }
}
```

---

## 3. Load Balancer

Distributes traffic across multiple service instances.

### Load Balancing Strategies

```
┌─────────────────────────────────────────────────────────────────┐
│                   LOAD BALANCING ALGORITHMS                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ROUND ROBIN                    WEIGHTED ROUND ROBIN             │
│  ┌───┐ ┌───┐ ┌───┐              ┌───┐ ┌───┐ ┌───┐              │
│  │ 1 │ │ 2 │ │ 3 │              │1:3│ │2:2│ │3:1│              │
│  └───┘ └───┘ └───┘              └───┘ └───┘ └───┘              │
│  1→2→3→1→2→3                    1→1→1→2→2→3→1→1→1               │
│                                                                  │
│  LEAST CONNECTIONS              IP HASH                          │
│  ┌───┐ ┌───┐ ┌───┐              ┌───┐ ┌───┐ ┌───┐              │
│  │ 2 │ │ 5 │ │ 1 │              │   │ │   │ │   │              │
│  └───┘ └───┘ └───┘              └───┘ └───┘ └───┘              │
│  Next → Server 3                hash(IP) % servers              │
│                                                                  │
│  LEAST RESPONSE TIME            RANDOM                          │
│  ┌───┐ ┌───┐ ┌───┐              ┌───┐ ┌───┐ ┌───┐              │
│  │50ms│100ms│ 30ms│              │   │ │   │ │   │              │
│  └───┘ └───┘ └───┘              └───┘ └───┘ └───┘              │
│  Next → Server 3                Random selection                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Layer 4 vs Layer 7 Load Balancing

| Aspect | Layer 4 (Transport) | Layer 7 (Application) |
|--------|--------------------|-----------------------|
| **Based on** | IP, TCP/UDP port | HTTP headers, cookies, URL |
| **Performance** | Faster | Slower (inspects content) |
| **Features** | Basic routing | Advanced routing, SSL termination |
| **Use case** | High throughput | Content-based routing |
| **Examples** | HAProxy, AWS NLB | Nginx, AWS ALB, Envoy |

---

## 4. Message Broker / Event Bus

Enables **asynchronous communication** between services.

### Message Broker Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    MESSAGE BROKER PATTERNS                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  POINT-TO-POINT (Queue)                                         │
│  ┌──────────┐    ┌─────────────┐    ┌──────────┐               │
│  │ Producer │───▶│    Queue    │───▶│ Consumer │               │
│  └──────────┘    │  ┌─┬─┬─┬─┐  │    └──────────┘               │
│                  │  │1│2│3│4│  │    (one consumer)              │
│                  │  └─┴─┴─┴─┘  │                                │
│                  └─────────────┘                                │
│                                                                  │
│  PUBLISH-SUBSCRIBE (Topic)                                      │
│  ┌──────────┐    ┌─────────────┐    ┌──────────┐               │
│  │ Publisher│───▶│    Topic    │───▶│Consumer 1│               │
│  └──────────┘    │             │───▶│Consumer 2│               │
│                  │             │───▶│Consumer 3│               │
│                  └─────────────┘    └──────────┘               │
│                                     (all receive)               │
│                                                                  │
│  FAN-OUT                                                        │
│  ┌──────────┐    ┌─────────────┐    ┌──────────┐               │
│  │ Producer │───▶│  Exchange   │───▶│ Queue A  │───▶Consumer A │
│  └──────────┘    │  (fanout)   │───▶│ Queue B  │───▶Consumer B │
│                  └─────────────┘    └──────────┘               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Message Broker Comparison

| Broker | Best For | Throughput | Ordering | Persistence |
|--------|----------|------------|----------|-------------|
| **Kafka** | Event streaming, logs | Very High (millions/sec) | Partition-level | Yes |
| **RabbitMQ** | Task queues, RPC | High (100K/sec) | Queue-level | Yes |
| **Redis Streams** | Real-time, caching | Very High | Stream-level | Optional |
| **AWS SQS** | Serverless, AWS | High | FIFO optional | Yes |
| **NATS** | IoT, edge computing | Very High | No guarantee | Optional |

### Example: Kafka Topic Configuration

```yaml
# Kafka Topic for Order Events
topics:
  - name: order-events
    partitions: 12
    replication-factor: 3
    config:
      retention.ms: 604800000  # 7 days
      cleanup.policy: delete
      min.insync.replicas: 2
```

---

## 5. Cache Layer

Reduces latency and database load through **data caching**.

### Caching Strategies

```
┌─────────────────────────────────────────────────────────────────┐
│                    CACHING PATTERNS                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  CACHE-ASIDE (Lazy Loading)                                     │
│  ┌──────────┐  1.Read  ┌───────┐                               │
│  │   App    │─────────▶│ Cache │ Miss                          │
│  │          │◀─────────│       │                               │
│  │          │  2.Read  ┌───────┐                               │
│  │          │─────────▶│  DB   │                               │
│  │          │◀─────────│       │                               │
│  │          │  3.Write ┌───────┐                               │
│  │          │─────────▶│ Cache │                               │
│  └──────────┘          └───────┘                               │
│                                                                  │
│  WRITE-THROUGH                                                  │
│  ┌──────────┐  1.Write ┌───────┐  2.Write  ┌───────┐          │
│  │   App    │─────────▶│ Cache │──────────▶│  DB   │          │
│  └──────────┘          └───────┘           └───────┘          │
│                                                                  │
│  WRITE-BEHIND (Write-Back)                                     │
│  ┌──────────┐  1.Write ┌───────┐  Async    ┌───────┐          │
│  │   App    │─────────▶│ Cache │ ·········▶│  DB   │          │
│  └──────────┘          └───────┘           └───────┘          │
│                         (batched)                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Cache Solutions

| Cache | Type | Use Case | Features |
|-------|------|----------|----------|
| **Redis** | In-memory | Session, rate limiting | Pub/Sub, Lua scripting, clustering |
| **Memcached** | In-memory | Simple key-value | Multi-threaded, high performance |
| **Hazelcast** | Distributed | Distributed computing | Java native, IMDG |
| **CDN (CloudFlare)** | Edge | Static assets, API | Global distribution |

---

## 6. Database Layer

### Database Per Service Pattern

```
┌─────────────────────────────────────────────────────────────────┐
│               DATABASE PER SERVICE PATTERN                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │ User Service│    │Order Service│    │Search Service│         │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘         │
│         │                  │                  │                  │
│         ▼                  ▼                  ▼                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │  PostgreSQL │    │   MongoDB   │    │Elasticsearch│         │
│  │  (ACID)     │    │  (Flexible) │    │  (Search)   │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│                                                                  │
│  WHY DIFFERENT DATABASES?                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ • User data needs strong consistency (PostgreSQL)        │   │
│  │ • Orders have complex nested structures (MongoDB)        │   │
│  │ • Search needs full-text indexing (Elasticsearch)        │   │
│  │ • Sessions need fast access (Redis)                      │   │
│  │ • Analytics need columnar storage (ClickHouse)           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Polyglot Persistence

| Service | Database | Reason |
|---------|----------|--------|
| User Management | PostgreSQL | ACID, relations |
| Product Catalog | MongoDB | Flexible schema |
| Search | Elasticsearch | Full-text search |
| Session Store | Redis | Fast key-value |
| Analytics | ClickHouse | Columnar, aggregations |
| Time Series | InfluxDB | Time-based queries |
| Graph Relations | Neo4j | Complex relationships |

---

## 7. Observability Stack

### Three Pillars of Observability

```
┌─────────────────────────────────────────────────────────────────┐
│                    OBSERVABILITY PILLARS                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │    LOGS       │  │   METRICS     │  │    TRACES     │       │
│  │               │  │               │  │               │       │
│  │  What         │  │  How much     │  │  Where        │       │
│  │  happened?    │  │  happening?   │  │  it happened? │       │
│  │               │  │               │  │               │       │
│  │  ┌─────────┐  │  │  ┌─────────┐  │  │  ┌─────────┐  │       │
│  │  │ ELK/EFK │  │  │  │Prometheus│  │  │  │ Jaeger  │  │       │
│  │  │ Loki    │  │  │  │ Datadog │  │  │  │ Zipkin  │  │       │
│  │  └─────────┘  │  │  └─────────┘  │  │  └─────────┘  │       │
│  └───────────────┘  └───────────────┘  └───────────────┘       │
│                                                                  │
│              ┌─────────────────────────────┐                    │
│              │      VISUALIZATION          │                    │
│              │  ┌─────────┐  ┌─────────┐   │                    │
│              │  │ Grafana │  │ Kibana  │   │                    │
│              │  └─────────┘  └─────────┘   │                    │
│              └─────────────────────────────┘                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Distributed Tracing

```
┌─────────────────────────────────────────────────────────────────┐
│                    DISTRIBUTED TRACE                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Trace ID: abc123                                               │
│  ├── Span: API Gateway (50ms)                                   │
│  │   └── Span: Auth Service (10ms)                              │
│  ├── Span: Order Service (200ms)                                │
│  │   ├── Span: User Service (30ms)                              │
│  │   ├── Span: Inventory Service (50ms)                         │
│  │   └── Span: Database Query (80ms)                            │
│  └── Span: Payment Service (150ms)                              │
│       └── Span: External Payment API (120ms)                    │
│                                                                  │
│  Timeline:                                                      │
│  0ms        100ms       200ms       300ms       400ms           │
│  |──────────|──────────|──────────|──────────|                  │
│  [API GW    ]                                                   │
│    [Auth]                                                       │
│          [────────Order Service────────────]                    │
│            [User]                                               │
│                  [Inventory]                                    │
│                         [DB Query]                              │
│                              [──Payment Service──]              │
│                                [External API]                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. Service Mesh

Handles **service-to-service communication** at the infrastructure layer.

### Service Mesh Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    SERVICE MESH ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    CONTROL PLANE                         │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │   │
│  │  │   Pilot     │  │   Citadel   │  │   Galley    │      │   │
│  │  │ (Discovery) │  │   (Certs)   │  │  (Config)   │      │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                     DATA PLANE                           │   │
│  │                                                          │   │
│  │  ┌─────────────────┐         ┌─────────────────┐        │   │
│  │  │     Pod A       │         │     Pod B       │        │   │
│  │  │ ┌─────────────┐ │  mTLS   │ ┌─────────────┐ │        │   │
│  │  │ │   Sidecar   │─┼─────────┼─│   Sidecar   │ │        │   │
│  │  │ │   (Envoy)   │ │         │ │   (Envoy)   │ │        │   │
│  │  │ └──────┬──────┘ │         │ └──────┬──────┘ │        │   │
│  │  │        │        │         │        │        │        │   │
│  │  │ ┌──────▼──────┐ │         │ ┌──────▼──────┐ │        │   │
│  │  │ │  Service A  │ │         │ │  Service B  │ │        │   │
│  │  │ └─────────────┘ │         │ └─────────────┘ │        │   │
│  │  └─────────────────┘         └─────────────────┘        │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Service Mesh Features

| Feature | Description |
|---------|-------------|
| **mTLS** | Automatic encryption between services |
| **Traffic Management** | Canary, blue-green, traffic splitting |
| **Observability** | Automatic metrics, traces, logs |
| **Resilience** | Retries, timeouts, circuit breakers |
| **Policy Enforcement** | Access control, rate limiting |

---

## 9. Container Orchestration

### Kubernetes Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    KUBERNETES CLUSTER                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                   CONTROL PLANE                         │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │    │
│  │  │API Server│ │Controller│ │Scheduler │ │   etcd   │   │    │
│  │  │          │ │ Manager  │ │          │ │          │   │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                    WORKER NODES                         │    │
│  │                                                         │    │
│  │  ┌─────────────────┐    ┌─────────────────┐            │    │
│  │  │     Node 1      │    │     Node 2      │            │    │
│  │  │ ┌─────┐ ┌─────┐ │    │ ┌─────┐ ┌─────┐ │            │    │
│  │  │ │Pod 1│ │Pod 2│ │    │ │Pod 3│ │Pod 4│ │            │    │
│  │  │ └─────┘ └─────┘ │    │ └─────┘ └─────┘ │            │    │
│  │  │                 │    │                 │            │    │
│  │  │ ┌─────────────┐ │    │ ┌─────────────┐ │            │    │
│  │  │ │   kubelet   │ │    │ │   kubelet   │ │            │    │
│  │  │ │  kube-proxy │ │    │ │  kube-proxy │ │            │    │
│  │  │ └─────────────┘ │    │ └─────────────┘ │            │    │
│  │  └─────────────────┘    └─────────────────┘            │    │
│  │                                                         │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. CI/CD Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                MICROSERVICES CI/CD PIPELINE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐     │
│  │ Code │───▶│Build │───▶│ Test │───▶│Deploy│───▶│Monitor│     │
│  └──────┘    └──────┘    └──────┘    └──────┘    └──────┘     │
│                                                                  │
│  Git Push    Docker     Unit        Staging    Prometheus       │
│  PR Review   Build      Integration Production Grafana          │
│              Push to    E2E         Canary     Alerting         │
│              Registry   Contract               PagerDuty        │
│                                                                  │
│  TOOLS:                                                         │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ GitHub Actions │ Jenkins │ GitLab CI │ ArgoCD │ Flux   │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Selection Guide

| Need | Recommended Components |
|------|----------------------|
| **API Management** | Kong + Redis (rate limiting) |
| **Service Discovery** | Consul or Kubernetes DNS |
| **Messaging** | Kafka (events) + RabbitMQ (tasks) |
| **Caching** | Redis Cluster |
| **Observability** | Prometheus + Grafana + Jaeger |
| **Service Mesh** | Istio or Linkerd |
| **Container Orchestration** | Kubernetes (EKS/GKE/AKS) |
| **CI/CD** | GitHub Actions + ArgoCD |

---

## Key Takeaways

1. **Start simple** - Don't add components until you need them
2. **Choose managed services** when possible to reduce operational burden
3. **Standardize** on a core set of components across teams
4. **Observability first** - You can't fix what you can't see
5. **Automate everything** - Manual processes don't scale
