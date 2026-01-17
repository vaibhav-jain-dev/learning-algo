# Essential Microservices Patterns

## Overview

This comprehensive guide covers the essential design patterns you need to know when working with microservices. These patterns address common challenges like data management, communication, resilience, and observability.

**Tags:** Patterns, Architecture, Design, Best Practices

---

## Pattern Categories

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h3 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Microservices Pattern Categories</h3>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px;">
<!-- Decomposition -->
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 16px;">
<div style="color: #fff; font-weight: bold; font-size: 13px; margin-bottom: 12px; text-align: center;">🔧 DECOMPOSITION</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #a5d6ff; font-size: 11px; margin-bottom: 4px;">• By Business Capability</div>
<div style="color: #a5d6ff; font-size: 11px; margin-bottom: 4px;">• By Subdomain (DDD)</div>
<div style="color: #a5d6ff; font-size: 11px;">• Strangler Fig</div>
</div>
</div>
<!-- Data Management -->
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 16px;">
<div style="color: #fff; font-weight: bold; font-size: 13px; margin-bottom: 12px; text-align: center;">🗄️ DATA MANAGEMENT</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #d1f5d3; font-size: 11px; margin-bottom: 4px;">• Database per Service</div>
<div style="color: #d1f5d3; font-size: 11px; margin-bottom: 4px;">• Saga Pattern</div>
<div style="color: #d1f5d3; font-size: 11px; margin-bottom: 4px;">• CQRS</div>
<div style="color: #d1f5d3; font-size: 11px;">• Event Sourcing</div>
</div>
</div>
<!-- Communication -->
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 16px;">
<div style="color: #fff; font-weight: bold; font-size: 13px; margin-bottom: 12px; text-align: center;">📡 COMMUNICATION</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #eddeff; font-size: 11px; margin-bottom: 4px;">• API Gateway</div>
<div style="color: #eddeff; font-size: 11px; margin-bottom: 4px;">• Backend for Frontend</div>
<div style="color: #eddeff; font-size: 11px; margin-bottom: 4px;">• Async Messaging</div>
<div style="color: #eddeff; font-size: 11px;">• Service Mesh</div>
</div>
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
<!-- Resilience -->
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 12px; padding: 16px;">
<div style="color: #fff; font-weight: bold; font-size: 13px; margin-bottom: 12px; text-align: center;">🛡️ RESILIENCE</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #ffe2cc; font-size: 11px; margin-bottom: 4px;">• Circuit Breaker</div>
<div style="color: #ffe2cc; font-size: 11px; margin-bottom: 4px;">• Bulkhead</div>
<div style="color: #ffe2cc; font-size: 11px; margin-bottom: 4px;">• Retry with Backoff</div>
<div style="color: #ffe2cc; font-size: 11px;">• Timeout</div>
</div>
</div>
<!-- Observability -->
<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); border-radius: 12px; padding: 16px;">
<div style="color: #fff; font-weight: bold; font-size: 13px; margin-bottom: 12px; text-align: center;">👁️ OBSERVABILITY</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #ffd1cc; font-size: 11px; margin-bottom: 4px;">• Log Aggregation</div>
<div style="color: #ffd1cc; font-size: 11px; margin-bottom: 4px;">• Distributed Tracing</div>
<div style="color: #ffd1cc; font-size: 11px; margin-bottom: 4px;">• Health Checks</div>
<div style="color: #ffd1cc; font-size: 11px;">• Metrics Collection</div>
</div>
</div>
<!-- Deployment -->
<div style="background: linear-gradient(135deg, #6e7681 0%, #8b949e 100%); border-radius: 12px; padding: 16px;">
<div style="color: #fff; font-weight: bold; font-size: 13px; margin-bottom: 12px; text-align: center;">🚀 DEPLOYMENT</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #e6edf3; font-size: 11px; margin-bottom: 4px;">• Blue-Green</div>
<div style="color: #e6edf3; font-size: 11px; margin-bottom: 4px;">• Canary Releases</div>
<div style="color: #e6edf3; font-size: 11px; margin-bottom: 4px;">• Feature Flags</div>
<div style="color: #e6edf3; font-size: 11px;">• Sidecar Pattern</div>
</div>
</div>
</div>
</div>

---

## 1. Database Per Service Pattern

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h3 style="color: #58a6ff; margin: 0 0 8px 0; font-size: 16px;">PATTERN: DATABASE PER SERVICE</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f0883e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #c9d1d9; font-size: 13px;">How to manage data in a microservices architecture while maintaining loose coupling between services?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #c9d1d9; font-size: 13px;">Each service has its own private database.</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
<div style="display: flex; justify-content: space-around; gap: 16px; margin-bottom: 24px;">
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 12px 20px; color: #fff; font-weight: bold; font-size: 12px;">User Service</div>
<div style="color: #58a6ff; font-size: 20px; margin: 8px 0;">↓</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 8px; padding: 12px 16px; color: #fff; font-size: 11px;"><div style="font-weight: bold;">PostgreSQL</div><div style="opacity: 0.8;">(Users)</div></div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 12px 20px; color: #fff; font-weight: bold; font-size: 12px;">Order Service</div>
<div style="color: #58a6ff; font-size: 20px; margin: 8px 0;">↓</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 12px 16px; color: #fff; font-size: 11px;"><div style="font-weight: bold;">MongoDB</div><div style="opacity: 0.8;">(Orders)</div></div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 12px 20px; color: #fff; font-weight: bold; font-size: 12px;">Product Svc</div>
<div style="color: #58a6ff; font-size: 20px; margin: 8px 0;">↓</div>
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 8px; padding: 12px 16px; color: #fff; font-size: 11px;"><div style="font-weight: bold;">Elasticsearch</div><div style="opacity: 0.8;">(Products)</div></div>
</div>
</div>
<div style="color: #8b949e; font-size: 12px;">
<div style="margin-bottom: 4px;">Each service:</div>
<div style="margin-left: 12px; color: #c9d1d9;">• Owns its data exclusively</div>
<div style="margin-left: 12px; color: #c9d1d9;">• Can choose appropriate database type</div>
<div style="margin-left: 12px; color: #c9d1d9;">• Cannot directly access other service's database</div>
</div>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 8px;">BENEFITS:</div>
<div style="color: #7ee787; font-size: 12px; margin-left: 8px;">
<div>✓ Loose coupling</div>
<div>✓ Independent scaling</div>
<div>✓ Polyglot persistence</div>
<div>✓ Fault isolation</div>
</div>
</div>
<div>
<div style="color: #f85149; font-weight: bold; font-size: 13px; margin-bottom: 8px;">DRAWBACKS:</div>
<div style="color: #f85149; font-size: 12px; margin-left: 8px;">
<div>✗ No ACID across services</div>
<div>✗ Complex queries across services</div>
<div>✗ Data duplication</div>
</div>
</div>
</div>
</div>

---

## 2. Saga Pattern

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h3 style="color: #58a6ff; margin: 0 0 8px 0; font-size: 16px;">PATTERN: SAGA</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f0883e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #c9d1d9; font-size: 13px;">How to maintain data consistency across services without distributed transactions (2PC)?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #c9d1d9; font-size: 13px;">Implement a saga - a sequence of local transactions with compensating transactions for rollback.</div>
</div>
<div style="color: #58a6ff; font-weight: bold; font-size: 14px; margin-bottom: 12px;">TYPE 1: CHOREOGRAPHY (Event-Driven)</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
<div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; margin-bottom: 16px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">Order Service</div>
<div style="color: #7ee787; font-size: 12px;">→ order.created →</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">Inventory Service</div>
<div style="color: #7ee787; font-size: 12px;">→ inventory.reserved →</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">Payment Service</div>
</div>
<div style="text-align: center; color: #7ee787; font-size: 12px; margin-bottom: 12px;">↓ payment.completed</div>
<div style="text-align: center; background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 8px 16px; color: #fff; font-size: 11px; display: inline-block; margin: 0 auto;">Order Service (updates status to CONFIRMED)</div>
<div style="margin-top: 16px; padding: 12px; background: rgba(248,81,73,0.1); border-radius: 8px; border-left: 3px solid #f85149;">
<div style="color: #f85149; font-weight: bold; font-size: 12px; margin-bottom: 8px;">On FAILURE (e.g., payment fails):</div>
<div style="color: #c9d1d9; font-size: 11px;">
<div>• Payment Service publishes payment.failed</div>
<div>• Inventory Service compensates: release reserved stock</div>
<div>• Order Service updates status to FAILED</div>
</div>
</div>
</div>
<div style="color: #58a6ff; font-weight: bold; font-size: 14px; margin-bottom: 12px;">TYPE 2: ORCHESTRATION (Central Coordinator)</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
<div style="text-align: center; margin-bottom: 20px;">
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 8px; padding: 12px 24px; color: #fff; font-weight: bold; font-size: 13px; display: inline-block;">Saga Orchestrator (Order Saga)</div>
</div>
<div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 16px;">
<div style="color: #58a6ff;">↓</div>
<div style="color: #58a6ff;">↓</div>
<div style="color: #58a6ff;">↓</div>
</div>
<div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 20px;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px; text-align: center;">Inventory<br/>Service</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px; text-align: center;">Payment<br/>Service</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px; text-align: center;">Order<br/>Service</div>
</div>
<div style="color: #8b949e; font-size: 11px;">
<div style="margin-bottom: 4px; color: #c9d1d9;">Orchestrator controls the flow:</div>
<div style="color: #7ee787;">1. Call Inventory Service → Reserve stock</div>
<div style="color: #7ee787;">2. Call Payment Service → Process payment</div>
<div style="color: #7ee787;">3. On success: Call Order Service → Confirm order</div>
<div style="color: #f85149;">4. On failure: Call compensating actions in reverse</div>
</div>
</div>
<div style="color: #58a6ff; font-weight: bold; font-size: 14px; margin-bottom: 12px;">COMPARISON:</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 16px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 12px; text-align: center;">Choreography</div>
<div style="color: #7ee787; font-size: 11px;">✓ Loose coupling</div>
<div style="color: #7ee787; font-size: 11px;">✓ Simple services</div>
<div style="color: #f85149; font-size: 11px;">✗ Hard to track</div>
<div style="color: #f85149; font-size: 11px;">✗ Cyclic dependencies</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 16px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 12px; text-align: center;">Orchestration</div>
<div style="color: #7ee787; font-size: 11px;">✓ Easier to understand</div>
<div style="color: #7ee787; font-size: 11px;">✓ Centralized error handling</div>
<div style="color: #f85149; font-size: 11px;">✗ Single point of failure</div>
<div style="color: #f85149; font-size: 11px;">✗ Tight coupling to orchestrator</div>
</div>
</div>
</div>

---

## 3. CQRS (Command Query Responsibility Segregation)

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h3 style="color: #58a6ff; margin: 0 0 8px 0; font-size: 16px;">PATTERN: CQRS</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f0883e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #c9d1d9; font-size: 13px;">How to handle complex queries that span multiple services efficiently?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #c9d1d9; font-size: 13px;">Separate read and write models.</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
<div style="text-align: center; margin-bottom: 20px;">
<div style="background: linear-gradient(135deg, #6e7681 0%, #8b949e 100%); border-radius: 8px; padding: 12px 32px; color: #fff; font-weight: bold; font-size: 13px; display: inline-block;">APPLICATION</div>
</div>
<div style="text-align: center; color: #58a6ff; margin-bottom: 16px;">↓</div>
<div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 24px; align-items: start;">
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 16px; color: #fff; margin-bottom: 8px;">
<div style="font-weight: bold; font-size: 13px;">COMMAND (Write)</div>
<div style="font-size: 11px; opacity: 0.9; margin-top: 8px;">CreateOrder<br/>UpdateOrder<br/>CancelOrder</div>
</div>
<div style="color: #58a6ff; margin: 8px 0;">↓</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 8px; padding: 12px; color: #fff;">
<div style="font-weight: bold; font-size: 12px;">Write Model</div>
<div style="font-size: 10px; opacity: 0.8;">(PostgreSQL)</div>
<div style="font-size: 10px; margin-top: 4px;">Normalized<br/>Transactional</div>
</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding-top: 40px;">
<div style="color: #7ee787; font-size: 12px; font-weight: bold;">Events</div>
<div style="color: #7ee787; font-size: 16px;">→→→</div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 16px; color: #fff; margin-bottom: 8px;">
<div style="font-weight: bold; font-size: 13px;">QUERY (Read)</div>
<div style="font-size: 11px; opacity: 0.9; margin-top: 8px;">GetOrders<br/>OrderHistory<br/>OrderStats</div>
</div>
<div style="color: #58a6ff; margin: 8px 0;">↓</div>
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 8px; padding: 12px; color: #fff;">
<div style="font-weight: bold; font-size: 12px;">Read Model</div>
<div style="font-size: 10px; opacity: 0.8;">(Elasticsearch, Redis)</div>
<div style="font-size: 10px; margin-top: 4px;">Denormalized<br/>Fast queries</div>
</div>
</div>
</div>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 8px;">WHEN TO USE:</div>
<div style="color: #7ee787; font-size: 12px; margin-left: 8px;">
<div>✓ Read and write workloads have different requirements</div>
<div>✓ Complex queries across aggregates</div>
<div>✓ Need to scale reads and writes independently</div>
<div>✓ Event sourcing is used</div>
</div>
</div>
<div>
<div style="color: #f85149; font-weight: bold; font-size: 13px; margin-bottom: 8px;">WHEN NOT TO USE:</div>
<div style="color: #f85149; font-size: 12px; margin-left: 8px;">
<div>✗ Simple CRUD applications</div>
<div>✗ Strong consistency is required</div>
<div>✗ Team unfamiliar with eventual consistency</div>
</div>
</div>
</div>
</div>

---

## 4. Event Sourcing

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h3 style="color: #58a6ff; margin: 0 0 8px 0; font-size: 16px;">PATTERN: EVENT SOURCING</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f0883e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #c9d1d9; font-size: 13px;">How to maintain an audit log of all changes and enable rebuilding state from history?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #c9d1d9; font-size: 13px;">Store state changes as a sequence of events, not current state.</div>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
<div style="background: rgba(248,81,73,0.1); border-radius: 12px; padding: 20px; border: 1px solid rgba(248,81,73,0.3);">
<div style="color: #f85149; font-weight: bold; font-size: 13px; margin-bottom: 12px;">TRADITIONAL (State Storage):</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; font-family: monospace; font-size: 11px; color: #c9d1d9; margin-bottom: 12px;">
<div style="color: #8b949e; margin-bottom: 8px;">orders table:</div>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; text-align: center;">
<div style="color: #58a6ff; font-weight: bold;">id</div>
<div style="color: #58a6ff; font-weight: bold;">status</div>
<div style="color: #58a6ff; font-weight: bold;">total</div>
<div style="color: #58a6ff; font-weight: bold;">updated_at</div>
<div>ORD-1</div>
<div>DELIVERED</div>
<div>150.00</div>
<div>2024-01-15</div>
</div>
</div>
<div style="color: #f85149; font-size: 11px; font-style: italic;">Lost information: How did it become DELIVERED?</div>
</div>
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 20px; border: 1px solid rgba(126,231,135,0.3);">
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 12px;">EVENT SOURCING:</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; font-family: monospace; font-size: 10px; color: #c9d1d9; margin-bottom: 12px;">
<div style="color: #8b949e; margin-bottom: 8px;">order_events table:</div>
<div style="display: grid; grid-template-columns: 1fr 2fr 2fr 1fr; gap: 4px; text-align: center;">
<div style="color: #58a6ff; font-weight: bold; font-size: 9px;">event_id</div>
<div style="color: #58a6ff; font-weight: bold; font-size: 9px;">aggregate_id</div>
<div style="color: #58a6ff; font-weight: bold; font-size: 9px;">event_type</div>
<div style="color: #58a6ff; font-weight: bold; font-size: 9px;">data</div>
<div>1</div><div>ORD-1</div><div style="color: #7ee787;">OrderCreated</div><div>{...}</div>
<div>2</div><div>ORD-1</div><div style="color: #7ee787;">OrderPaid</div><div>{...}</div>
<div>3</div><div>ORD-1</div><div style="color: #7ee787;">OrderShipped</div><div>{...}</div>
<div>4</div><div>ORD-1</div><div style="color: #7ee787;">OrderDelivered</div><div>{...}</div>
</div>
</div>
<div style="color: #7ee787; font-size: 11px;">Current state = replay(all events for ORD-1)</div>
</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 12px;">Benefits:</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; color: #c9d1d9; font-size: 12px;">
<div>• Complete audit trail</div>
<div>• Natural fit for CQRS</div>
<div>• Can rebuild state at any point in time</div>
<div>• Can derive new read models from existing events</div>
</div>
</div>
<div style="color: #58a6ff; font-weight: bold; font-size: 13px; margin-bottom: 12px;">EVENT STORE STRUCTURE:</div>
<div style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 16px; font-family: monospace; font-size: 11px; color: #c9d1d9;">
<div>{</div>
<div style="margin-left: 16px;"><span style="color: #7ee787;">"event_id"</span>: <span style="color: #a5d6ff;">"evt-123"</span>,</div>
<div style="margin-left: 16px;"><span style="color: #7ee787;">"aggregate_type"</span>: <span style="color: #a5d6ff;">"Order"</span>,</div>
<div style="margin-left: 16px;"><span style="color: #7ee787;">"aggregate_id"</span>: <span style="color: #a5d6ff;">"ORD-1"</span>,</div>
<div style="margin-left: 16px;"><span style="color: #7ee787;">"event_type"</span>: <span style="color: #a5d6ff;">"OrderShipped"</span>,</div>
<div style="margin-left: 16px;"><span style="color: #7ee787;">"version"</span>: <span style="color: #f78166;">3</span>,</div>
<div style="margin-left: 16px;"><span style="color: #7ee787;">"timestamp"</span>: <span style="color: #a5d6ff;">"2024-01-15T10:30:00Z"</span>,</div>
<div style="margin-left: 16px;"><span style="color: #7ee787;">"data"</span>: { <span style="color: #a5d6ff;">"tracking_number"</span>: <span style="color: #a5d6ff;">"TRK-456"</span>, <span style="color: #a5d6ff;">"carrier"</span>: <span style="color: #a5d6ff;">"FedEx"</span> },</div>
<div style="margin-left: 16px;"><span style="color: #7ee787;">"metadata"</span>: { <span style="color: #a5d6ff;">"user_id"</span>: <span style="color: #a5d6ff;">"user-789"</span>, <span style="color: #a5d6ff;">"correlation_id"</span>: <span style="color: #a5d6ff;">"req-abc"</span> }</div>
<div>}</div>
</div>
</div>

---

## 5. API Gateway Pattern

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h3 style="color: #58a6ff; margin: 0 0 8px 0; font-size: 16px;">PATTERN: API GATEWAY</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f0883e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #c9d1d9; font-size: 13px;">How should clients access individual microservices?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #c9d1d9; font-size: 13px;">Single entry point that handles cross-cutting concerns.</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
<div style="text-align: center; margin-bottom: 20px;">
<div style="color: #8b949e; font-size: 12px; margin-bottom: 8px;">CLIENTS</div>
<div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #6e7681 0%, #8b949e 100%); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px;">Web App</div>
<div style="background: linear-gradient(135deg, #6e7681 0%, #8b949e 100%); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px;">Mobile App</div>
<div style="background: linear-gradient(135deg, #6e7681 0%, #8b949e 100%); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px;">Partner API</div>
<div style="background: linear-gradient(135deg, #6e7681 0%, #8b949e 100%); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px;">Admin</div>
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin-bottom: 16px;">↓</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
<div style="color: #fff; font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 16px;">API GATEWAY</div>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 10px;">Auth</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 10px;">Rate Limit</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 10px;">Routing</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 10px;">Cache</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 10px;">Transform</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 10px;">Circuit Breaker</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 10px;">Load Balance</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 10px;">Monitor/Log</div>
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin-bottom: 16px;">↓</div>
<div style="display: flex; justify-content: center; gap: 16px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">User Service</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">Order Service</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">Product Svc</div>
</div>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<div style="color: #58a6ff; font-weight: bold; font-size: 13px; margin-bottom: 8px;">RESPONSIBILITIES:</div>
<div style="color: #c9d1d9; font-size: 12px; margin-left: 8px;">
<div>• Authentication & Authorization</div>
<div>• Rate limiting & Throttling</div>
<div>• Request/Response transformation</div>
<div>• Load balancing</div>
<div>• Caching</div>
<div>• Circuit breaking</div>
<div>• Monitoring & Logging</div>
<div>• API versioning</div>
</div>
</div>
<div>
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 8px;">POPULAR IMPLEMENTATIONS:</div>
<div style="display: flex; flex-wrap: wrap; gap: 8px;">
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 4px 8px; border-radius: 4px; font-size: 11px;">Kong</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 4px 8px; border-radius: 4px; font-size: 11px;">AWS API Gateway</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 4px 8px; border-radius: 4px; font-size: 11px;">Nginx</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 4px 8px; border-radius: 4px; font-size: 11px;">Envoy</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 4px 8px; border-radius: 4px; font-size: 11px;">Traefik</span>
</div>
</div>
</div>
</div>

---

## 6. Backend for Frontend (BFF)

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h3 style="color: #58a6ff; margin: 0 0 8px 0; font-size: 16px;">PATTERN: BACKEND FOR FRONTEND (BFF)</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f0883e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #c9d1d9; font-size: 13px;">Different clients (web, mobile, IoT) have different data needs. A single API is either over-fetching or under-fetching.</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #c9d1d9; font-size: 13px;">Create separate backend for each frontend type.</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px;">
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #6e7681 0%, #8b949e 100%); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px; margin-bottom: 8px;">Web App</div>
<div style="color: #58a6ff; margin-bottom: 8px;">↓</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 8px; padding: 12px; color: #fff;">
<div style="font-weight: bold; font-size: 12px;">Web BFF</div>
<div style="font-size: 10px; opacity: 0.8; margin-top: 4px;">• Full data<br/>• Rich UI data</div>
</div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #6e7681 0%, #8b949e 100%); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px; margin-bottom: 8px;">Mobile App</div>
<div style="color: #58a6ff; margin-bottom: 8px;">↓</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 12px; color: #fff;">
<div style="font-weight: bold; font-size: 12px;">Mobile BFF</div>
<div style="font-size: 10px; opacity: 0.8; margin-top: 4px;">• Minimal payload<br/>• Offline support</div>
</div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #6e7681 0%, #8b949e 100%); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px; margin-bottom: 8px;">IoT</div>
<div style="color: #58a6ff; margin-bottom: 8px;">↓</div>
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 8px; padding: 12px; color: #fff;">
<div style="font-weight: bold; font-size: 12px;">IoT BFF</div>
<div style="font-size: 10px; opacity: 0.8; margin-top: 4px;">• Compact data<br/>• Batch updates</div>
</div>
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin-bottom: 16px;">↓ ↓ ↓</div>
<div style="display: flex; justify-content: center; gap: 16px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">User Service</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">Order Service</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">Product Svc</div>
</div>
</div>
<div style="color: #58a6ff; font-weight: bold; font-size: 13px; margin-bottom: 12px;">EXAMPLE: Mobile BFF vs Web BFF</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: rgba(137,87,229,0.1); border-radius: 8px; padding: 16px; border: 1px solid rgba(137,87,229,0.3);">
<div style="color: #a371f7; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Mobile BFF</div>
<div style="color: #c9d1d9; font-size: 11px;">
<div>• Smaller payload</div>
<div>• Image thumbnails</div>
<div>• Paginated lists</div>
<div>• Offline-first</div>
<div>• Push notif ready</div>
</div>
</div>
<div style="background: rgba(31,111,235,0.1); border-radius: 8px; padding: 16px; border: 1px solid rgba(31,111,235,0.3);">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Web BFF</div>
<div style="color: #c9d1d9; font-size: 11px;">
<div>• Full payload</div>
<div>• High-res images</div>
<div>• Infinite scroll</div>
<div>• Real-time updates</div>
<div>• WebSocket ready</div>
</div>
</div>
</div>
</div>

---

## 7. Circuit Breaker Pattern

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h3 style="color: #58a6ff; margin: 0 0 8px 0; font-size: 16px;">PATTERN: CIRCUIT BREAKER</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f0883e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #c9d1d9; font-size: 13px;">How to prevent cascade failures when a service is unavailable?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #c9d1d9; font-size: 13px;">Implement a circuit breaker that stops requests when failures exceed a threshold.</div>
</div>
<div style="color: #58a6ff; font-weight: bold; font-size: 13px; margin-bottom: 12px;">STATE MACHINE:</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
<div style="display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap;">
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 11px; flex-direction: column;">
<div>CLOSED</div>
<div style="font-size: 9px; opacity: 0.8;">(Normal)</div>
</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
<div style="color: #f85149; font-size: 10px;">failure threshold exceeded</div>
<div style="color: #f85149; font-size: 16px;">→→→</div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 11px; flex-direction: column;">
<div>OPEN</div>
<div style="font-size: 9px; opacity: 0.8;">(Fast fail)</div>
</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
<div style="color: #f0883e; font-size: 10px;">timer expires</div>
<div style="color: #f0883e; font-size: 16px;">→→→</div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 11px; flex-direction: column;">
<div>HALF-OPEN</div>
<div style="font-size: 9px; opacity: 0.8;">(Test mode)</div>
</div>
</div>
</div>
<div style="display: flex; justify-content: center; gap: 40px; margin-top: 16px; font-size: 11px;">
<div style="color: #7ee787;">← success → CLOSED</div>
<div style="color: #f85149;">← failure → OPEN</div>
</div>
</div>
<div style="color: #58a6ff; font-weight: bold; font-size: 13px; margin-bottom: 12px;">IMPLEMENTATION EXAMPLE (Go):</div>
<div style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 16px; font-family: monospace; font-size: 11px; color: #c9d1d9; margin-bottom: 24px; overflow-x: auto;">
<div><span style="color: #ff7b72;">breaker</span> := gobreaker.NewCircuitBreaker(gobreaker.Settings{</div>
<div style="margin-left: 16px;">Name:        <span style="color: #a5d6ff;">"payment-service"</span>,</div>
<div style="margin-left: 16px;">MaxRequests: <span style="color: #f78166;">5</span>,           <span style="color: #8b949e;">// Requests in half-open</span></div>
<div style="margin-left: 16px;">Interval:    <span style="color: #f78166;">10</span> * time.Second, <span style="color: #8b949e;">// Clear counts</span></div>
<div style="margin-left: 16px;">Timeout:     <span style="color: #f78166;">30</span> * time.Second, <span style="color: #8b949e;">// Time in open</span></div>
<div style="margin-left: 16px;">ReadyToTrip: <span style="color: #ff7b72;">func</span>(counts) <span style="color: #ff7b72;">bool</span> { <span style="color: #ff7b72;">return</span> counts.ConsecutiveFailures > <span style="color: #f78166;">3</span> },</div>
<div>})</div>
<div style="margin-top: 8px;"><span style="color: #ff7b72;">result</span>, err := breaker.Execute(<span style="color: #ff7b72;">func</span>() { <span style="color: #ff7b72;">return</span> paymentClient.ProcessPayment(ctx, payment) })</div>
</div>
<div style="color: #58a6ff; font-weight: bold; font-size: 13px; margin-bottom: 8px;">CONFIGURATION:</div>
<div style="color: #c9d1d9; font-size: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
<div>• Failure threshold: 50% failures in 10 seconds</div>
<div>• Open duration: 30 seconds before trying again</div>
<div>• Half-open: Allow 3 test requests</div>
<div>• Reset: Full reset after 10 consecutive successes</div>
</div>
</div>

---

## 8. Bulkhead Pattern

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h3 style="color: #58a6ff; margin: 0 0 8px 0; font-size: 16px;">PATTERN: BULKHEAD</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f0883e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #c9d1d9; font-size: 13px;">How to isolate failures to prevent total system failure?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #c9d1d9; font-size: 13px;">Partition resources into isolated pools (like ship bulkheads).</div>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
<div style="background: rgba(248,81,73,0.1); border-radius: 12px; padding: 20px; border: 1px solid rgba(248,81,73,0.3);">
<div style="color: #f85149; font-weight: bold; font-size: 13px; margin-bottom: 12px;">WITHOUT BULKHEAD:</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #c9d1d9; font-weight: bold; font-size: 12px; margin-bottom: 8px;">SHARED THREAD POOL (100)</div>
<div style="color: #f85149; font-size: 11px;">
<div>All requests share same pool</div>
<div>Slow service exhausts all threads</div>
<div style="font-weight: bold;">ALL services affected!</div>
</div>
</div>
</div>
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 20px; border: 1px solid rgba(126,231,135,0.3);">
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 12px;">WITH BULKHEAD:</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 8px; padding: 12px; color: #fff; text-align: center;">
<div style="font-weight: bold; font-size: 10px;">User Pool</div>
<div style="font-size: 9px; opacity: 0.8;">(30 threads)</div>
<div style="font-size: 9px; margin-top: 4px;">If exhausted:<br/>only users affected</div>
</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 12px; color: #fff; text-align: center;">
<div style="font-weight: bold; font-size: 10px;">Order Pool</div>
<div style="font-size: 9px; opacity: 0.8;">(40 threads)</div>
<div style="font-size: 9px; margin-top: 4px;">If exhausted:<br/>only orders affected</div>
</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 12px; color: #fff; text-align: center;">
<div style="font-weight: bold; font-size: 10px;">Payment Pool</div>
<div style="font-size: 9px; opacity: 0.8;">(30 threads)</div>
<div style="font-size: 9px; margin-top: 4px;">Isolated</div>
</div>
</div>
</div>
</div>
<div style="color: #58a6ff; font-weight: bold; font-size: 13px; margin-bottom: 12px;">TYPES OF BULKHEADS:</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 16px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">1. Thread Pool Isolation</div>
<div style="color: #c9d1d9; font-size: 11px;">
<div>• Separate thread pools per dependency</div>
<div>• Slow dependency can't exhaust all threads</div>
</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 16px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">2. Semaphore Isolation</div>
<div style="color: #c9d1d9; font-size: 11px;">
<div>• Limit concurrent calls to dependency</div>
<div>• Lower overhead than thread pools</div>
</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 16px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">3. Connection Pool Isolation</div>
<div style="color: #c9d1d9; font-size: 11px;">
<div>• Separate DB connection pools per service</div>
<div>• Prevents DB connection exhaustion</div>
</div>
</div>
</div>
</div>

---

## 9. Sidecar Pattern

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h3 style="color: #58a6ff; margin: 0 0 8px 0; font-size: 16px;">PATTERN: SIDECAR</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f0883e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #c9d1d9; font-size: 13px;">How to add common functionality (logging, monitoring, proxy) to services without modifying them?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #c9d1d9; font-size: 13px;">Deploy helper functionality as a separate container alongside the main application container.</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
<div style="color: #8b949e; font-size: 12px; text-align: center; margin-bottom: 16px;">POD</div>
<div style="background: rgba(0,0,0,0.3); border: 2px dashed #30363d; border-radius: 12px; padding: 20px;">
<div style="display: flex; justify-content: center; gap: 24px; margin-bottom: 20px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 16px; color: #fff; text-align: center; min-width: 140px;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">Application Container</div>
<div style="font-size: 10px; opacity: 0.9;">• Business logic<br/>• No infra code</div>
</div>
<div style="display: flex; align-items: center; color: #58a6ff; font-size: 20px;">⟷</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 16px; color: #fff; text-align: center; min-width: 140px;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">Sidecar Container</div>
<div style="font-size: 10px; opacity: 0.9;">• Logging<br/>• Monitoring<br/>• Proxy<br/>• Config sync</div>
</div>
</div>
<div style="color: #8b949e; font-size: 11px; text-align: center;">
<span style="color: #58a6ff; font-weight: bold;">Shared:</span> Network namespace (localhost) | Volumes | Lifecycle
</div>
</div>
</div>
<div style="color: #58a6ff; font-weight: bold; font-size: 13px; margin-bottom: 12px;">COMMON SIDECAR USE CASES:</div>
<div style="display: flex; flex-wrap: wrap; gap: 8px;">
<span style="background: rgba(137,87,229,0.2); color: #a371f7; padding: 6px 12px; border-radius: 6px; font-size: 11px;">Envoy Proxy - Service mesh (Istio)</span>
<span style="background: rgba(137,87,229,0.2); color: #a371f7; padding: 6px 12px; border-radius: 6px; font-size: 11px;">Fluent Bit - Log forwarding</span>
<span style="background: rgba(137,87,229,0.2); color: #a371f7; padding: 6px 12px; border-radius: 6px; font-size: 11px;">Vault Agent - Secret injection</span>
<span style="background: rgba(137,87,229,0.2); color: #a371f7; padding: 6px 12px; border-radius: 6px; font-size: 11px;">CloudSQL Proxy - DB connection</span>
<span style="background: rgba(137,87,229,0.2); color: #a371f7; padding: 6px 12px; border-radius: 6px; font-size: 11px;">Prometheus Exporter - Metrics</span>
</div>
</div>

---

## 10. Strangler Fig Pattern

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h3 style="color: #58a6ff; margin: 0 0 8px 0; font-size: 16px;">PATTERN: STRANGLER FIG</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f0883e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #c9d1d9; font-size: 13px;">How to migrate from monolith to microservices incrementally?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #c9d1d9; font-size: 13px;">Gradually replace monolith functionality with new services, like a strangler fig tree grows around and replaces its host.</div>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 16px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 12px;">PHASE 1: Add Facade</div>
<div style="text-align: center;">
<div style="background: #6e7681; border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px; display: inline-block; margin-bottom: 8px;">Clients</div>
<div style="color: #58a6ff;">↓</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px; display: inline-block; margin: 8px 0;">Facade/Proxy</div>
<div style="color: #58a6ff;">↓</div>
<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); border-radius: 4px; padding: 8px 16px; color: #fff; font-size: 10px; display: inline-block; margin-top: 8px;">MONOLITH<br/><span style="opacity: 0.8;">[All functionality]</span></div>
</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 16px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 12px;">PHASE 2: Extract First Service</div>
<div style="text-align: center;">
<div style="background: #6e7681; border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px; display: inline-block; margin-bottom: 8px;">Clients</div>
<div style="color: #58a6ff;">↓</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px; display: inline-block; margin: 8px 0;">Facade/Proxy</div>
<div style="display: flex; justify-content: center; gap: 8px; margin-top: 8px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 9px;">User Service<br/>(New)</div>
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 9px;">MONOLITH<br/>[Less features]</div>
</div>
</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 16px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 12px;">PHASE 3: Continue Extraction</div>
<div style="text-align: center;">
<div style="background: #6e7681; border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px; display: inline-block; margin-bottom: 8px;">Clients</div>
<div style="color: #58a6ff;">↓</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px; display: inline-block; margin: 8px 0;">Facade/Proxy</div>
<div style="display: flex; justify-content: center; gap: 6px; margin-top: 8px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 8px;">User</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 8px;">Order</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 8px;">Payment</div>
<div style="background: linear-gradient(135deg, #6e7681 0%, #8b949e 100%); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 8px;">Legacy</div>
</div>
</div>
</div>
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 16px; border: 1px solid rgba(126,231,135,0.3);">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">PHASE 4: Decommission Monolith</div>
<div style="text-align: center;">
<div style="background: #6e7681; border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px; display: inline-block; margin-bottom: 8px;">Clients</div>
<div style="color: #7ee787;">↓</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px; display: inline-block; margin: 8px 0;">API Gateway</div>
<div style="display: flex; justify-content: center; gap: 6px; margin-top: 8px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 8px;">User</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 8px;">Order</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 8px;">Payment</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 8px;">...</div>
</div>
</div>
</div>
</div>
</div>

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
