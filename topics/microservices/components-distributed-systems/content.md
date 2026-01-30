# Components Used in Microservices & Distributed Systems

## Overview

Building microservices requires a rich ecosystem of components that handle service discovery, communication, data management, observability, and resilience. This guide covers all essential components needed to build production-ready distributed systems.

**Tags:** Infrastructure, Components, Distributed Systems

---

## Architecture Component Map

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 18px; text-align: center;">MICROSERVICES INFRASTRUCTURE</h3>
  <!-- Edge Layer -->
<div style="background: linear-gradient(135deg, #6e7681 0%, #8b949e 100%); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
<div style="color: #fff; font-weight: bold; font-size: 12px; text-align: center; margin-bottom: 12px;">EDGE LAYER</div>
<div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px;">CDN</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px;">WAF</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px;">DDoS Protection</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px;">Rate Limiter</div>
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin: 8px 0;">↓</div>
  <!-- API Gateway Layer -->
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
<div style="color: #fff; font-weight: bold; font-size: 12px; text-align: center; margin-bottom: 8px;">API GATEWAY LAYER</div>
<div style="color: rgba(255,255,255,0.9); font-size: 11px; text-align: center;">
      Kong / AWS API GW / Nginx / Envoy<br/>
<span style="opacity: 0.8;">Auth | Routing | Rate Limiting | Transformation</span>
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin: 8px 0;">↓</div>
  <!-- Service Mesh Layer -->
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
<div style="color: #fff; font-weight: bold; font-size: 12px; text-align: center; margin-bottom: 8px;">SERVICE MESH LAYER</div>
<div style="color: rgba(255,255,255,0.9); font-size: 11px; text-align: center;">
      Istio / Linkerd / Consul Connect<br/>
<span style="opacity: 0.8;">mTLS | Traffic Management | Observability</span>
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin: 8px 0;">↓</div>
  <!-- Service Layer -->
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
<div style="color: #fff; font-weight: bold; font-size: 12px; text-align: center; margin-bottom: 12px;">SERVICE LAYER</div>
<div style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 12px; color: #fff; font-size: 10px;">User Service</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 12px; color: #fff; font-size: 10px;">Order Service</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 12px; color: #fff; font-size: 10px;">Payment Service</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 12px; color: #fff; font-size: 10px;">Inventory Service</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 12px; color: #fff; font-size: 10px;">Search Service</div>
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin: 8px 0;">↓</div>
  <!-- Data Layer -->
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 12px; padding: 16px;">
<div style="color: #fff; font-weight: bold; font-size: 12px; text-align: center; margin-bottom: 12px;">DATA LAYER</div>
<div style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 12px; color: #fff; font-size: 10px;">PostgreSQL</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 12px; color: #fff; font-size: 10px;">MongoDB</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 12px; color: #fff; font-size: 10px;">Redis</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 12px; color: #fff; font-size: 10px;">Kafka</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 12px; color: #fff; font-size: 10px;">Elasticsearch</div>
</div>
</div>
</div>

---

## 1. API Gateway

The **single entry point** for all client requests to backend services.

### Key Functions

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 14px; text-align: center;">API GATEWAY FUNCTIONS</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 16px; color: #fff;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">ROUTING</div>
<div style="font-size: 11px; opacity: 0.9;">/users → UserSvc<br/>/orders → OrderSvc</div>
</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 8px; padding: 16px; color: #fff;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">AUTHENTICATION</div>
<div style="font-size: 11px; opacity: 0.9;">JWT Validation<br/>OAuth2/OIDC</div>
</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 16px; color: #fff;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">RATE LIMITING</div>
<div style="font-size: 11px; opacity: 0.9;">100 req/min<br/>Token Bucket</div>
</div>
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 8px; padding: 16px; color: #fff;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">LOAD BALANCING</div>
<div style="font-size: 11px; opacity: 0.9;">Round Robin<br/>Weighted</div>
</div>
<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); border-radius: 8px; padding: 16px; color: #fff;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">TRANSFORMATION</div>
<div style="font-size: 11px; opacity: 0.9;">Request/Response<br/>Protocol Convert</div>
</div>
<div style="background: linear-gradient(135deg, #6e7681 0%, #8b949e 100%); border-radius: 8px; padding: 16px; color: #fff;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">CACHING</div>
<div style="font-size: 11px; opacity: 0.9;">Response Cache<br/>CDN Integration</div>
</div>
</div>
</div>

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 12px; padding: 20px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 13px; margin-bottom: 16px; text-align: center;">CLIENT-SIDE DISCOVERY</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
<div style="display: flex; align-items: center; gap: 16px; width: 100%;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 10px 14px; color: #fff; font-size: 10px; text-align: center; flex: 1;">Client<br/>Service</div>
<div style="color: #7ee787; font-size: 10px; text-align: center;">1. Query →<br/>← 2. IPs</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 8px; padding: 10px 14px; color: #fff; font-size: 10px; text-align: center; flex: 1;">Service<br/>Registry</div>
</div>
<div style="color: #58a6ff;">↓ 3. Direct Call</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 10px 20px; color: #fff; font-size: 10px;">Target Service</div>
</div>
</div>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 12px; padding: 20px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 13px; margin-bottom: 16px; text-align: center;">SERVER-SIDE DISCOVERY</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 10px 14px; color: #fff; font-size: 10px; text-align: center;">Client<br/>Service</div>
<div style="color: #7ee787; font-size: 10px;">→ 1. Request →</div>
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 8px; padding: 10px 14px; color: #fff; font-size: 10px; text-align: center;">Load<br/>Balancer</div>
</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="color: #58a6ff; font-size: 10px;">2. Query ↔</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 8px; padding: 8px 12px; color: #fff; font-size: 10px;">Registry</div>
</div>
<div style="color: #58a6ff;">↓ 3. Route</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 10px 20px; color: #fff; font-size: 10px;">Target Service</div>
</div>
</div>
</div>
</div>

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 14px; text-align: center;">LOAD BALANCING ALGORITHMS</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 8px; padding: 16px;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">ROUND ROBIN</div>
<div style="display: flex; gap: 8px; margin-bottom: 8px;">
<div style="background: #238636; border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 11px;">1</div>
<div style="background: #238636; border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 11px;">2</div>
<div style="background: #238636; border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 11px;">3</div>
</div>
<div style="color: #64748b; font-size: 10px;">1→2→3→1→2→3</div>
</div>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 8px; padding: 16px;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">WEIGHTED ROUND ROBIN</div>
<div style="display: flex; gap: 8px; margin-bottom: 8px;">
<div style="background: #1f6feb; border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 11px;">1:3</div>
<div style="background: #1f6feb; border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 11px;">2:2</div>
<div style="background: #1f6feb; border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 11px;">3:1</div>
</div>
<div style="color: #64748b; font-size: 10px;">1→1→1→2→2→3→1→1→1</div>
</div>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 8px; padding: 16px;">
<div style="color: #f0883e; font-weight: bold; font-size: 12px; margin-bottom: 12px;">LEAST CONNECTIONS</div>
<div style="display: flex; gap: 8px; margin-bottom: 8px;">
<div style="background: #8957e5; border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 11px;">2</div>
<div style="background: #8957e5; border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 11px;">5</div>
<div style="background: #7ee787; border-radius: 4px; padding: 6px 10px; color: #0d1117; font-size: 11px; font-weight: bold;">1</div>
</div>
<div style="color: #64748b; font-size: 10px;">Next → Server 3</div>
</div>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 8px; padding: 16px;">
<div style="color: #f0883e; font-weight: bold; font-size: 12px; margin-bottom: 12px;">IP HASH</div>
<div style="display: flex; gap: 8px; margin-bottom: 8px;">
<div style="background: #6e7681; border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 11px;">S1</div>
<div style="background: #6e7681; border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 11px;">S2</div>
<div style="background: #6e7681; border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 11px;">S3</div>
</div>
<div style="color: #64748b; font-size: 10px;">hash(IP) % servers</div>
</div>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 8px; padding: 16px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 12px;">LEAST RESPONSE TIME</div>
<div style="display: flex; gap: 8px; margin-bottom: 8px;">
<div style="background: #da3633; border-radius: 4px; padding: 6px 8px; color: #fff; font-size: 10px;">50ms</div>
<div style="background: #da3633; border-radius: 4px; padding: 6px 8px; color: #fff; font-size: 10px;">100ms</div>
<div style="background: #7ee787; border-radius: 4px; padding: 6px 8px; color: #0d1117; font-size: 10px; font-weight: bold;">30ms</div>
</div>
<div style="color: #64748b; font-size: 10px;">Next → Server 3</div>
</div>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 8px; padding: 16px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 12px;">RANDOM</div>
<div style="display: flex; gap: 8px; margin-bottom: 8px;">
<div style="background: #6e7681; border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 11px;">?</div>
<div style="background: #6e7681; border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 11px;">?</div>
<div style="background: #6e7681; border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 11px;">?</div>
</div>
<div style="color: #64748b; font-size: 10px;">Random selection</div>
</div>
</div>
</div>

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 14px; text-align: center;">MESSAGE BROKER PATTERNS</h4>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">POINT-TO-POINT (Queue)</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 16px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 6px; padding: 8px 14px; color: #fff; font-size: 11px;">Producer</div>
<div style="color: #7ee787;">→</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 6px; padding: 8px 14px; color: #fff; font-size: 11px; text-align: center;">Queue<br/><span style="font-size: 10px;">[1|2|3|4]</span></div>
<div style="color: #7ee787;">→</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 6px; padding: 8px 14px; color: #fff; font-size: 11px;">Consumer</div>
</div>
<div style="color: #64748b; font-size: 10px; text-align: center; margin-top: 8px;">(one consumer receives)</div>
</div>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
<div style="color: #f0883e; font-weight: bold; font-size: 12px; margin-bottom: 12px;">PUBLISH-SUBSCRIBE (Topic)</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 16px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 6px; padding: 8px 14px; color: #fff; font-size: 11px;">Publisher</div>
<div style="color: #f0883e;">→</div>
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 6px; padding: 12px 20px; color: #fff; font-size: 11px;">Topic</div>
<div style="display: flex; flex-direction: column; gap: 4px;">
<div style="display: flex; align-items: center; gap: 8px;"><span style="color: #f0883e;">→</span><div style="background: #8957e5; border-radius: 4px; padding: 4px 10px; color: #fff; font-size: 10px;">Consumer 1</div></div>
<div style="display: flex; align-items: center; gap: 8px;"><span style="color: #f0883e;">→</span><div style="background: #8957e5; border-radius: 4px; padding: 4px 10px; color: #fff; font-size: 10px;">Consumer 2</div></div>
<div style="display: flex; align-items: center; gap: 8px;"><span style="color: #f0883e;">→</span><div style="background: #8957e5; border-radius: 4px; padding: 4px 10px; color: #fff; font-size: 10px;">Consumer 3</div></div>
</div>
</div>
<div style="color: #64748b; font-size: 10px; text-align: center; margin-top: 8px;">(all receive)</div>
</div>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 12px; padding: 20px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 12px;">FAN-OUT</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 16px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 6px; padding: 8px 14px; color: #fff; font-size: 11px;">Producer</div>
<div style="color: #58a6ff;">→</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 6px; padding: 12px 16px; color: #fff; font-size: 11px; text-align: center;">Exchange<br/>(fanout)</div>
<div style="display: flex; flex-direction: column; gap: 4px;">
<div style="display: flex; align-items: center; gap: 8px;"><span style="color: #58a6ff;">→</span><div style="background: #6e7681; border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 10px;">Queue A</div><span style="color: #58a6ff;">→</span><div style="background: #8957e5; border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 10px;">Consumer A</div></div>
<div style="display: flex; align-items: center; gap: 8px;"><span style="color: #58a6ff;">→</span><div style="background: #6e7681; border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 10px;">Queue B</div><span style="color: #58a6ff;">→</span><div style="background: #8957e5; border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 10px;">Consumer B</div></div>
</div>
</div>
</div>
</div>

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 14px; text-align: center;">CACHING PATTERNS</h4>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">CACHE-ASIDE (Lazy Loading)</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 16px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 6px; padding: 12px 20px; color: #fff; font-size: 11px;">App</div>
<div style="display: flex; flex-direction: column; gap: 4px; color: #7ee787; font-size: 10px;">
<div>1. Read →</div>
<div>← Miss</div>
<div>3. Write →</div>
</div>
<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); border-radius: 6px; padding: 12px 16px; color: #fff; font-size: 11px;">Cache</div>
<div style="color: #58a6ff; font-size: 10px;">2. Read ↔</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 6px; padding: 12px 16px; color: #fff; font-size: 11px;">DB</div>
</div>
</div>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
<div style="color: #f0883e; font-weight: bold; font-size: 12px; margin-bottom: 12px;">WRITE-THROUGH</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 6px; padding: 10px 16px; color: #fff; font-size: 11px;">App</div>
<div style="color: #f0883e; font-size: 10px;">1. Write →</div>
<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); border-radius: 6px; padding: 10px 16px; color: #fff; font-size: 11px;">Cache</div>
<div style="color: #f0883e; font-size: 10px;">2. Write →</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 6px; padding: 10px 16px; color: #fff; font-size: 11px;">DB</div>
</div>
</div>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 12px; padding: 20px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 12px;">WRITE-BEHIND (Write-Back)</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 6px; padding: 10px 16px; color: #fff; font-size: 11px;">App</div>
<div style="color: #58a6ff; font-size: 10px;">1. Write →</div>
<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); border-radius: 6px; padding: 10px 16px; color: #fff; font-size: 11px;">Cache</div>
<div style="color: #64748b; font-size: 10px; border-bottom: 1px dashed #8b949e;">Async →</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 6px; padding: 10px 16px; color: #fff; font-size: 11px;">DB</div>
</div>
<div style="color: #64748b; font-size: 10px; text-align: center; margin-top: 8px;">(batched)</div>
</div>
</div>

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 14px; text-align: center;">DATABASE PER SERVICE PATTERN</h4>
<div style="display: flex; justify-content: center; gap: 24px; margin-bottom: 24px; flex-wrap: wrap;">
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-size: 11px; font-weight: bold;">User Service</div>
<div style="color: #58a6ff; margin: 8px 0;">↓</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 8px; padding: 10px 14px; color: #fff; font-size: 10px;"><div style="font-weight: bold;">PostgreSQL</div><div style="opacity: 0.8;">(ACID)</div></div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-size: 11px; font-weight: bold;">Order Service</div>
<div style="color: #58a6ff; margin: 8px 0;">↓</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 10px 14px; color: #fff; font-size: 10px;"><div style="font-weight: bold;">MongoDB</div><div style="opacity: 0.8;">(Flexible)</div></div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-size: 11px; font-weight: bold;">Search Service</div>
<div style="color: #58a6ff; margin: 8px 0;">↓</div>
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 8px; padding: 10px 14px; color: #fff; font-size: 10px;"><div style="font-weight: bold;">Elasticsearch</div><div style="opacity: 0.8;">(Search)</div></div>
</div>
</div>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 12px; padding: 16px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 12px;">WHY DIFFERENT DATABASES?</div>
<div style="color: #1e293b; font-size: 11px; display: grid; gap: 6px;">
<div>• User data needs strong consistency <span style="color: #58a6ff;">(PostgreSQL)</span></div>
<div>• Orders have complex nested structures <span style="color: #a371f7;">(MongoDB)</span></div>
<div>• Search needs full-text indexing <span style="color: #ffa657;">(Elasticsearch)</span></div>
<div>• Sessions need fast access <span style="color: #f85149;">(Redis)</span></div>
<div>• Analytics need columnar storage <span style="color: #7ee787;">(ClickHouse)</span></div>
</div>
</div>
</div>

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 14px; text-align: center;">OBSERVABILITY PILLARS</h4>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 20px; color: #fff; text-align: center;">
<div style="font-weight: bold; font-size: 14px; margin-bottom: 8px;">LOGS</div>
<div style="font-size: 11px; opacity: 0.9; margin-bottom: 12px;">What happened?</div>
<div style="display: flex; gap: 6px; justify-content: center; flex-wrap: wrap;">
<span style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; font-size: 10px;">ELK/EFK</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; font-size: 10px;">Loki</span>
</div>
</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 20px; color: #fff; text-align: center;">
<div style="font-weight: bold; font-size: 14px; margin-bottom: 8px;">METRICS</div>
<div style="font-size: 11px; opacity: 0.9; margin-bottom: 12px;">How much happening?</div>
<div style="display: flex; gap: 6px; justify-content: center; flex-wrap: wrap;">
<span style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; font-size: 10px;">Prometheus</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; font-size: 10px;">Datadog</span>
</div>
</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 20px; color: #fff; text-align: center;">
<div style="font-weight: bold; font-size: 14px; margin-bottom: 8px;">TRACES</div>
<div style="font-size: 11px; opacity: 0.9; margin-bottom: 12px;">Where it happened?</div>
<div style="display: flex; gap: 6px; justify-content: center; flex-wrap: wrap;">
<span style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; font-size: 10px;">Jaeger</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; font-size: 10px;">Zipkin</span>
</div>
</div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 12px; padding: 16px; display: inline-block;">
<div style="color: #fff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">VISUALIZATION</div>
<div style="display: flex; gap: 8px;">
<span style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 4px; color: #fff; font-size: 11px;">Grafana</span>
<span style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 4px; color: #fff; font-size: 11px;">Kibana</span>
</div>
</div>
</div>
</div>

### Distributed Tracing

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 14px; text-align: center;">DISTRIBUTED TRACE</h4>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 16px;">Trace ID: abc123</div>
<div style="font-family: monospace; font-size: 11px; color: #1e293b;">
<div style="margin-left: 0px;">├── <span style="color: #58a6ff;">Span: API Gateway</span> <span style="color: #f0883e;">(50ms)</span></div>
<div style="margin-left: 20px;">└── <span style="color: #58a6ff;">Span: Auth Service</span> <span style="color: #f0883e;">(10ms)</span></div>
<div style="margin-left: 0px;">├── <span style="color: #7ee787;">Span: Order Service</span> <span style="color: #f0883e;">(200ms)</span></div>
<div style="margin-left: 20px;">├── <span style="color: #7ee787;">Span: User Service</span> <span style="color: #f0883e;">(30ms)</span></div>
<div style="margin-left: 20px;">├── <span style="color: #7ee787;">Span: Inventory Service</span> <span style="color: #f0883e;">(50ms)</span></div>
<div style="margin-left: 20px;">└── <span style="color: #7ee787;">Span: Database Query</span> <span style="color: #f0883e;">(80ms)</span></div>
<div style="margin-left: 0px;">└── <span style="color: #a371f7;">Span: Payment Service</span> <span style="color: #f0883e;">(150ms)</span></div>
<div style="margin-left: 20px;">└── <span style="color: #a371f7;">Span: External Payment API</span> <span style="color: #f0883e;">(120ms)</span></div>
</div>
</div>
<div style="color: #64748b; font-size: 11px; margin-bottom: 12px;">Timeline:</div>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 8px; padding: 16px; position: relative;">
<div style="display: flex; justify-content: space-between; color: #64748b; font-size: 10px; margin-bottom: 12px;">
<span>0ms</span><span>100ms</span><span>200ms</span><span>300ms</span><span>400ms</span>
</div>
<div style="display: flex; flex-direction: column; gap: 4px;">
<div style="background: #1f6feb; height: 16px; width: 12%; border-radius: 2px; display: flex; align-items: center; padding-left: 4px; color: #fff; font-size: 9px;">API GW</div>
<div style="background: #58a6ff; height: 12px; width: 5%; margin-left: 2%; border-radius: 2px;"></div>
<div style="background: #238636; height: 16px; width: 50%; margin-left: 12%; border-radius: 2px; display: flex; align-items: center; padding-left: 4px; color: #fff; font-size: 9px;">Order Service</div>
<div style="background: #2ea043; height: 12px; width: 8%; margin-left: 14%; border-radius: 2px;"></div>
<div style="background: #2ea043; height: 12px; width: 12%; margin-left: 24%; border-radius: 2px;"></div>
<div style="background: #2ea043; height: 12px; width: 20%; margin-left: 36%; border-radius: 2px;"></div>
<div style="background: #8957e5; height: 16px; width: 38%; margin-left: 56%; border-radius: 2px; display: flex; align-items: center; padding-left: 4px; color: #fff; font-size: 9px;">Payment</div>
<div style="background: #a371f7; height: 12px; width: 30%; margin-left: 60%; border-radius: 2px;"></div>
</div>
</div>
</div>

---

## 8. Service Mesh

Handles **service-to-service communication** at the infrastructure layer.

### Service Mesh Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 14px; text-align: center;">SERVICE MESH ARCHITECTURE</h4>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
<div style="color: #fff; font-weight: bold; font-size: 12px; text-align: center; margin-bottom: 12px;">CONTROL PLANE</div>
<div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 10px 16px; color: #fff; text-align: center;"><div style="font-weight: bold; font-size: 11px;">Pilot</div><div style="font-size: 9px; opacity: 0.8;">(Discovery)</div></div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 10px 16px; color: #fff; text-align: center;"><div style="font-weight: bold; font-size: 11px;">Citadel</div><div style="font-size: 9px; opacity: 0.8;">(Certs)</div></div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 10px 16px; color: #fff; text-align: center;"><div style="font-weight: bold; font-size: 11px;">Galley</div><div style="font-size: 9px; opacity: 0.8;">(Config)</div></div>
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin: 12px 0;">↓</div>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 12px; padding: 20px;">
<div style="color: #64748b; font-size: 12px; text-align: center; margin-bottom: 16px;">DATA PLANE</div>
<div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;">
<div style="background: rgba(59, 130, 246, 0.08); border: 2px dashed #cbd5e1; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #64748b; font-size: 10px; margin-bottom: 8px;">Pod A</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 6px; padding: 8px 14px; color: #fff; font-size: 10px; margin-bottom: 8px;">Sidecar (Envoy)</div>
<div style="color: #58a6ff; font-size: 10px;">↕</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 6px; padding: 8px 14px; color: #fff; font-size: 10px;">Service A</div>
</div>
<div style="display: flex; align-items: center; color: #7ee787; font-size: 11px;">← mTLS →</div>
<div style="background: rgba(59, 130, 246, 0.08); border: 2px dashed #cbd5e1; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #64748b; font-size: 10px; margin-bottom: 8px;">Pod B</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 6px; padding: 8px 14px; color: #fff; font-size: 10px; margin-bottom: 8px;">Sidecar (Envoy)</div>
<div style="color: #58a6ff; font-size: 10px;">↕</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 6px; padding: 8px 14px; color: #fff; font-size: 10px;">Service B</div>
</div>
</div>
</div>
</div>

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 14px; text-align: center;">KUBERNETES CLUSTER</h4>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
<div style="color: #fff; font-weight: bold; font-size: 12px; text-align: center; margin-bottom: 12px;">CONTROL PLANE</div>
<div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 12px; color: #fff; text-align: center; font-size: 10px;"><div style="font-weight: bold;">API Server</div></div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 12px; color: #fff; text-align: center; font-size: 10px;"><div style="font-weight: bold;">Controller</div><div style="opacity: 0.8;">Manager</div></div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 12px; color: #fff; text-align: center; font-size: 10px;"><div style="font-weight: bold;">Scheduler</div></div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 12px; color: #fff; text-align: center; font-size: 10px;"><div style="font-weight: bold;">etcd</div></div>
</div>
</div>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 12px; padding: 20px;">
<div style="color: #64748b; font-size: 12px; text-align: center; margin-bottom: 16px;">WORKER NODES</div>
<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
<div style="background: rgba(59, 130, 246, 0.08); border: 2px dashed #cbd5e1; border-radius: 8px; padding: 16px;">
<div style="color: #7ee787; font-weight: bold; font-size: 11px; text-align: center; margin-bottom: 12px;">Node 1</div>
<div style="display: flex; gap: 8px; margin-bottom: 12px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 10px;">Pod 1</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 10px;">Pod 2</div>
</div>
<div style="background: rgba(255,255,255,0.1); border-radius: 4px; padding: 8px; font-size: 9px; color: #1e293b; text-align: center;">kubelet | kube-proxy</div>
</div>
<div style="background: rgba(59, 130, 246, 0.08); border: 2px dashed #cbd5e1; border-radius: 8px; padding: 16px;">
<div style="color: #7ee787; font-weight: bold; font-size: 11px; text-align: center; margin-bottom: 12px;">Node 2</div>
<div style="display: flex; gap: 8px; margin-bottom: 12px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 10px;">Pod 3</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 10px;">Pod 4</div>
</div>
<div style="background: rgba(255,255,255,0.1); border-radius: 4px; padding: 8px; font-size: 9px; color: #1e293b; text-align: center;">kubelet | kube-proxy</div>
</div>
</div>
</div>
</div>

---

## 10. CI/CD Pipeline

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 14px; text-align: center;">MICROSERVICES CI/CD PIPELINE</h4>
<div style="display: flex; justify-content: center; align-items: center; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #6e7681 0%, #8b949e 100%); border-radius: 8px; padding: 12px 20px; color: #fff; font-weight: bold; font-size: 12px;">Code</div>
<div style="color: #58a6ff; font-size: 16px;">→</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 8px; padding: 12px 20px; color: #fff; font-weight: bold; font-size: 12px;">Build</div>
<div style="color: #58a6ff; font-size: 16px;">→</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 12px 20px; color: #fff; font-weight: bold; font-size: 12px;">Test</div>
<div style="color: #58a6ff; font-size: 16px;">→</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 12px 20px; color: #fff; font-weight: bold; font-size: 12px;">Deploy</div>
<div style="color: #58a6ff; font-size: 16px;">→</div>
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 8px; padding: 12px 20px; color: #fff; font-weight: bold; font-size: 12px;">Monitor</div>
</div>
<div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 24px; text-align: center;">
<div style="color: #64748b; font-size: 10px;"><div>Git Push</div><div>PR Review</div></div>
<div style="color: #64748b; font-size: 10px;"><div>Docker Build</div><div>Push Registry</div></div>
<div style="color: #64748b; font-size: 10px;"><div>Unit/Integration</div><div>E2E/Contract</div></div>
<div style="color: #64748b; font-size: 10px;"><div>Staging</div><div>Production</div><div>Canary</div></div>
<div style="color: #64748b; font-size: 10px;"><div>Prometheus</div><div>Grafana</div><div>PagerDuty</div></div>
</div>
<div style="background: rgba(59, 130, 246, 0.08); border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 12px;">TOOLS:</div>
<div style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 6px 12px; border-radius: 4px; font-size: 10px;">GitHub Actions</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 6px 12px; border-radius: 4px; font-size: 10px;">Jenkins</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 6px 12px; border-radius: 4px; font-size: 10px;">GitLab CI</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 6px 12px; border-radius: 4px; font-size: 10px;">ArgoCD</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 6px 12px; border-radius: 4px; font-size: 10px;">Flux</span>
</div>
</div>
</div>

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
