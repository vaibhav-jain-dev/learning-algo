# Essential Microservices Patterns

## Overview

This comprehensive guide covers the essential design patterns you need to know when working with microservices. These patterns address common challenges like data management, communication, resilience, and observability.

**Tags:** Patterns, Architecture, Design, Best Practices

---

## Pattern Categories

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #3b82f6; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Microservices Pattern Categories</h3>
<div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 16px;">
    <!-- Decomposition -->
<div style="flex: 1; min-width: 200px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 12px; padding: 16px;">
<div style="color: #fff; font-weight: bold; font-size: 13px; margin-bottom: 12px; text-align: center;">DECOMPOSITION</div>
<div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 12px;">
<div style="color: #dbeafe; font-size: 11px; margin-bottom: 4px;">- By Business Capability</div>
<div style="color: #dbeafe; font-size: 11px; margin-bottom: 4px;">- By Subdomain (DDD)</div>
<div style="color: #dbeafe; font-size: 11px;">- Strangler Fig</div>
</div>
</div>
    <!-- Data Management -->
<div style="flex: 1; min-width: 200px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 12px; padding: 16px;">
<div style="color: #fff; font-weight: bold; font-size: 13px; margin-bottom: 12px; text-align: center;">DATA MANAGEMENT</div>
<div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 12px;">
<div style="color: #dcfce7; font-size: 11px; margin-bottom: 4px;">- Database per Service</div>
<div style="color: #dcfce7; font-size: 11px; margin-bottom: 4px;">- Saga Pattern</div>
<div style="color: #dcfce7; font-size: 11px; margin-bottom: 4px;">- CQRS</div>
<div style="color: #dcfce7; font-size: 11px;">- Event Sourcing</div>
</div>
</div>
    <!-- Communication -->
<div style="flex: 1; min-width: 200px; background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); border-radius: 12px; padding: 16px;">
<div style="color: #fff; font-weight: bold; font-size: 13px; margin-bottom: 12px; text-align: center;">COMMUNICATION</div>
<div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 12px;">
<div style="color: #f3e8ff; font-size: 11px; margin-bottom: 4px;">- API Gateway</div>
<div style="color: #f3e8ff; font-size: 11px; margin-bottom: 4px;">- Backend for Frontend</div>
<div style="color: #f3e8ff; font-size: 11px; margin-bottom: 4px;">- Async Messaging</div>
<div style="color: #f3e8ff; font-size: 11px;">- Service Mesh</div>
</div>
</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <!-- Resilience -->
<div style="flex: 1; min-width: 200px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 12px; padding: 16px;">
<div style="color: #fff; font-weight: bold; font-size: 13px; margin-bottom: 12px; text-align: center;">RESILIENCE</div>
<div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 12px;">
<div style="color: #ffedd5; font-size: 11px; margin-bottom: 4px;">- Circuit Breaker</div>
<div style="color: #ffedd5; font-size: 11px; margin-bottom: 4px;">- Bulkhead</div>
<div style="color: #ffedd5; font-size: 11px; margin-bottom: 4px;">- Retry with Backoff</div>
<div style="color: #ffedd5; font-size: 11px;">- Timeout</div>
</div>
</div>
    <!-- Observability -->
<div style="flex: 1; min-width: 200px; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-radius: 12px; padding: 16px;">
<div style="color: #fff; font-weight: bold; font-size: 13px; margin-bottom: 12px; text-align: center;">OBSERVABILITY</div>
<div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 12px;">
<div style="color: #fef2f2; font-size: 11px; margin-bottom: 4px;">- Log Aggregation</div>
<div style="color: #fef2f2; font-size: 11px; margin-bottom: 4px;">- Distributed Tracing</div>
<div style="color: #fef2f2; font-size: 11px; margin-bottom: 4px;">- Health Checks</div>
<div style="color: #fef2f2; font-size: 11px;">- Metrics Collection</div>
</div>
</div>
    <!-- Deployment -->
<div style="flex: 1; min-width: 200px; background: linear-gradient(135deg, #64748b 0%, #475569 100%); border-radius: 12px; padding: 16px;">
<div style="color: #fff; font-weight: bold; font-size: 13px; margin-bottom: 12px; text-align: center;">DEPLOYMENT</div>
<div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 12px;">
<div style="color: #f1f5f9; font-size: 11px; margin-bottom: 4px;">- Blue-Green</div>
<div style="color: #f1f5f9; font-size: 11px; margin-bottom: 4px;">- Canary Releases</div>
<div style="color: #f1f5f9; font-size: 11px; margin-bottom: 4px;">- Feature Flags</div>
<div style="color: #f1f5f9; font-size: 11px;">- Sidecar Pattern</div>
</div>
</div>
</div>
</div>

---

## 1. Database Per Service Pattern

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #3b82f6; margin: 0 0 8px 0; font-size: 16px;">PATTERN: DATABASE PER SERVICE</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f97316; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #1e293b; font-size: 13px;">How to manage data in a microservices architecture while maintaining loose coupling between services?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #1e293b; font-size: 13px;">Each service has its own private database.</div>
</div>
<div style="background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
<div style="display: flex; justify-content: space-around; gap: 16px; margin-bottom: 24px; flex-wrap: wrap;">
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px; padding: 12px 20px; color: #fff; font-weight: bold; font-size: 12px;">User Service</div>
<div style="color: #3b82f6; font-size: 20px; margin: 8px 0;">v</div>
<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 8px; padding: 12px 16px; color: #fff; font-size: 11px;"><div style="font-weight: bold;">PostgreSQL</div><div style="opacity: 0.8;">(Users)</div></div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px; padding: 12px 20px; color: #fff; font-weight: bold; font-size: 12px;">Order Service</div>
<div style="color: #3b82f6; font-size: 20px; margin: 8px 0;">v</div>
<div style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); border-radius: 8px; padding: 12px 16px; color: #fff; font-size: 11px;"><div style="font-weight: bold;">MongoDB</div><div style="opacity: 0.8;">(Orders)</div></div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px; padding: 12px 20px; color: #fff; font-weight: bold; font-size: 12px;">Product Svc</div>
<div style="color: #3b82f6; font-size: 20px; margin: 8px 0;">v</div>
<div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 8px; padding: 12px 16px; color: #fff; font-size: 11px;"><div style="font-weight: bold;">Elasticsearch</div><div style="opacity: 0.8;">(Products)</div></div>
</div>
</div>
<div style="color: #475569; font-size: 12px;">
<div style="margin-bottom: 4px;">Each service:</div>
<div style="margin-left: 12px; color: #1e293b;">- Owns its data exclusively</div>
<div style="margin-left: 12px; color: #1e293b;">- Can choose appropriate database type</div>
<div style="margin-left: 12px; color: #1e293b;">- Cannot directly access other service's database</div>
</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 24px;">
<div style="flex: 1; min-width: 200px;">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">BENEFITS:</div>
<div style="color: #22c55e; font-size: 12px; margin-left: 8px;">
<div>+ Loose coupling</div>
<div>+ Independent scaling</div>
<div>+ Polyglot persistence</div>
<div>+ Fault isolation</div>
</div>
</div>
<div style="flex: 1; min-width: 200px;">
<div style="color: #dc2626; font-weight: bold; font-size: 13px; margin-bottom: 8px;">DRAWBACKS:</div>
<div style="color: #dc2626; font-size: 12px; margin-left: 8px;">
<div>- No ACID across services</div>
<div>- Complex queries across services</div>
<div>- Data duplication</div>
</div>
</div>
</div>
</div>

  ---

  ## 2. Saga Pattern

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #3b82f6; margin: 0 0 8px 0; font-size: 16px;">PATTERN: SAGA</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f97316; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #1e293b; font-size: 13px;">How to maintain data consistency across services without distributed transactions (2PC)?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #1e293b; font-size: 13px;">Implement a saga - a sequence of local transactions with compensating transactions for rollback.</div>
</div>
<div style="color: #3b82f6; font-weight: bold; font-size: 14px; margin-bottom: 12px;">TYPE 1: CHOREOGRAPHY (Event-Driven)</div>
<div style="background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
<div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; margin-bottom: 16px;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">Order Service</div>
<div style="color: #22c55e; font-size: 12px;">-> order.created -></div>
<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">Inventory Service</div>
<div style="color: #22c55e; font-size: 12px;">-> inventory.reserved -></div>
<div style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">Payment Service</div>
</div>
<div style="text-align: center; color: #22c55e; font-size: 12px; margin-bottom: 12px;">v payment.completed</div>
<div style="text-align: center; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px; padding: 8px 16px; color: #fff; font-size: 11px; display: inline-block; margin: 0 auto;">Order Service (updates status to CONFIRMED)</div>
<div style="margin-top: 16px; padding: 12px; background: rgba(220,38,38,0.1); border-radius: 8px; border-left: 3px solid #dc2626;">
<div style="color: #dc2626; font-weight: bold; font-size: 12px; margin-bottom: 8px;">On FAILURE (e.g., payment fails):</div>
<div style="color: #1e293b; font-size: 11px;">
<div>- Payment Service publishes payment.failed</div>
<div>- Inventory Service compensates: release reserved stock</div>
<div>- Order Service updates status to FAILED</div>
</div>
</div>
</div>
<div style="color: #3b82f6; font-weight: bold; font-size: 14px; margin-bottom: 12px;">TYPE 2: ORCHESTRATION (Central Coordinator)</div>
<div style="background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
<div style="text-align: center; margin-bottom: 20px;">
<div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 8px; padding: 12px 24px; color: #fff; font-weight: bold; font-size: 13px; display: inline-block;">Saga Orchestrator (Order Saga)</div>
</div>
<div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 16px;">
<div style="color: #3b82f6;">v</div>
<div style="color: #3b82f6;">v</div>
<div style="color: #3b82f6;">v</div>
</div>
<div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 20px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px; text-align: center;">Inventory<br/>Service</div>
<div style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px; text-align: center;">Payment<br/>Service</div>
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px; text-align: center;">Order<br/>Service</div>
</div>
<div style="color: #475569; font-size: 11px;">
<div style="margin-bottom: 4px; color: #1e293b;">Orchestrator controls the flow:</div>
<div style="color: #22c55e;">1. Call Inventory Service -> Reserve stock</div>
<div style="color: #22c55e;">2. Call Payment Service -> Process payment</div>
<div style="color: #22c55e;">3. On success: Call Order Service -> Confirm order</div>
<div style="color: #dc2626;">4. On failure: Call compensating actions in reverse</div>
</div>
</div>
<div style="color: #3b82f6; font-weight: bold; font-size: 14px; margin-bottom: 12px;">COMPARISON:</div>
<div style="display: flex; flex-wrap: wrap; gap: 16px;">
<div style="flex: 1; min-width: 200px; background: #fff; border-radius: 8px; padding: 16px; border: 1px solid #e2e8f0;">
<div style="color: #3b82f6; font-weight: bold; font-size: 12px; margin-bottom: 12px; text-align: center;">Choreography</div>
<div style="color: #22c55e; font-size: 11px;">+ Loose coupling</div>
<div style="color: #22c55e; font-size: 11px;">+ Simple services</div>
<div style="color: #dc2626; font-size: 11px;">- Hard to track</div>
<div style="color: #dc2626; font-size: 11px;">- Cyclic dependencies</div>
</div>
<div style="flex: 1; min-width: 200px; background: #fff; border-radius: 8px; padding: 16px; border: 1px solid #e2e8f0;">
<div style="color: #3b82f6; font-weight: bold; font-size: 12px; margin-bottom: 12px; text-align: center;">Orchestration</div>
<div style="color: #22c55e; font-size: 11px;">+ Easier to understand</div>
<div style="color: #22c55e; font-size: 11px;">+ Centralized error handling</div>
<div style="color: #dc2626; font-size: 11px;">- Single point of failure</div>
<div style="color: #dc2626; font-size: 11px;">- Tight coupling to orchestrator</div>
</div>
</div>
</div>

---

## 3. CQRS (Command Query Responsibility Segregation)

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #3b82f6; margin: 0 0 8px 0; font-size: 16px;">PATTERN: CQRS</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f97316; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #1e293b; font-size: 13px;">How to handle complex queries that span multiple services efficiently?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #1e293b; font-size: 13px;">Separate read and write models.</div>
</div>
<div style="background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
<div style="text-align: center; margin-bottom: 20px;">
<div style="background: linear-gradient(135deg, #64748b 0%, #475569 100%); border-radius: 8px; padding: 12px 32px; color: #fff; font-weight: bold; font-size: 13px; display: inline-block;">APPLICATION</div>
</div>
<div style="text-align: center; color: #3b82f6; margin-bottom: 16px;">v</div>
<div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: start; justify-content: center;">
<div style="flex: 1; min-width: 180px; text-align: center;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px; padding: 16px; color: #fff; margin-bottom: 8px;">
<div style="font-weight: bold; font-size: 13px;">COMMAND (Write)</div>
<div style="font-size: 11px; opacity: 0.9; margin-top: 8px;">CreateOrder<br/>UpdateOrder<br/>CancelOrder</div>
</div>
<div style="color: #3b82f6; margin: 8px 0;">v</div>
<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 8px; padding: 12px; color: #fff;">
<div style="font-weight: bold; font-size: 12px;">Write Model</div>
<div style="font-size: 10px; opacity: 0.8;">(PostgreSQL)</div>
<div style="font-size: 10px; margin-top: 4px;">Normalized<br/>Transactional</div>
</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding-top: 40px;">
<div style="color: #22c55e; font-size: 12px; font-weight: bold;">Events</div>
<div style="color: #22c55e; font-size: 16px;">-></div>
</div>
<div style="flex: 1; min-width: 180px; text-align: center;">
<div style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); border-radius: 8px; padding: 16px; color: #fff; margin-bottom: 8px;">
<div style="font-weight: bold; font-size: 13px;">QUERY (Read)</div>
<div style="font-size: 11px; opacity: 0.9; margin-top: 8px;">GetOrders<br/>OrderHistory<br/>OrderStats</div>
</div>
<div style="color: #3b82f6; margin: 8px 0;">v</div>
<div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 8px; padding: 12px; color: #fff;">
<div style="font-weight: bold; font-size: 12px;">Read Model</div>
<div style="font-size: 10px; opacity: 0.8;">(Elasticsearch, Redis)</div>
<div style="font-size: 10px; margin-top: 4px;">Denormalized<br/>Fast queries</div>
</div>
</div>
</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 24px;">
<div style="flex: 1; min-width: 200px;">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">WHEN TO USE:</div>
<div style="color: #22c55e; font-size: 12px; margin-left: 8px;">
<div>+ Read and write workloads have different requirements</div>
<div>+ Complex queries across aggregates</div>
<div>+ Need to scale reads and writes independently</div>
<div>+ Event sourcing is used</div>
</div>
</div>
<div style="flex: 1; min-width: 200px;">
<div style="color: #dc2626; font-weight: bold; font-size: 13px; margin-bottom: 8px;">WHEN NOT TO USE:</div>
<div style="color: #dc2626; font-size: 12px; margin-left: 8px;">
<div>- Simple CRUD applications</div>
<div>- Strong consistency is required</div>
<div>- Team unfamiliar with eventual consistency</div>
</div>
</div>
</div>
</div>

  ---

  ## 4. Event Sourcing

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #3b82f6; margin: 0 0 8px 0; font-size: 16px;">PATTERN: EVENT SOURCING</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f97316; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #1e293b; font-size: 13px;">How to maintain an audit log of all changes and enable rebuilding state from history?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #1e293b; font-size: 13px;">Store state changes as a sequence of events, not current state.</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 24px; margin-bottom: 24px;">
<div style="flex: 1; min-width: 250px; background: rgba(220,38,38,0.05); border-radius: 12px; padding: 20px; border: 1px solid rgba(220,38,38,0.2);">
<div style="color: #dc2626; font-weight: bold; font-size: 13px; margin-bottom: 12px;">TRADITIONAL (State Storage):</div>
<div style="background: #1e293b; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 11px; color: #e2e8f0; margin-bottom: 12px;">
<div style="color: #94a3b8; margin-bottom: 8px;">orders table:</div>
<div style="display: flex; flex-wrap: wrap; gap: 4px; text-align: center;">
<div style="color: #3b82f6; font-weight: bold; flex: 1; min-width: 50px;">id</div>
<div style="color: #3b82f6; font-weight: bold; flex: 1; min-width: 50px;">status</div>
<div style="color: #3b82f6; font-weight: bold; flex: 1; min-width: 50px;">total</div>
<div style="color: #3b82f6; font-weight: bold; flex: 1; min-width: 60px;">updated_at</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 4px; text-align: center; margin-top: 4px;">
<div style="flex: 1; min-width: 50px;">ORD-1</div>
<div style="flex: 1; min-width: 50px;">DELIVERED</div>
<div style="flex: 1; min-width: 50px;">150.00</div>
<div style="flex: 1; min-width: 60px;">2024-01-15</div>
</div>
</div>
<div style="color: #dc2626; font-size: 11px; font-style: italic;">Lost information: How did it become DELIVERED?</div>
</div>
<div style="flex: 1; min-width: 250px; background: rgba(34,197,94,0.05); border-radius: 12px; padding: 20px; border: 1px solid rgba(34,197,94,0.2);">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; margin-bottom: 12px;">EVENT SOURCING:</div>
<div style="background: #1e293b; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 10px; color: #e2e8f0; margin-bottom: 12px;">
<div style="color: #94a3b8; margin-bottom: 8px;">order_events table:</div>
<div style="display: flex; flex-wrap: wrap; gap: 4px; text-align: center;">
<div style="color: #3b82f6; font-weight: bold; font-size: 9px; flex: 1; min-width: 40px;">event_id</div>
<div style="color: #3b82f6; font-weight: bold; font-size: 9px; flex: 1; min-width: 50px;">aggregate_id</div>
<div style="color: #3b82f6; font-weight: bold; font-size: 9px; flex: 1; min-width: 60px;">event_type</div>
<div style="color: #3b82f6; font-weight: bold; font-size: 9px; flex: 1; min-width: 30px;">data</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 4px; text-align: center; margin-top: 4px; font-size: 9px;">
<div style="flex: 1; min-width: 40px;">1</div><div style="flex: 1; min-width: 50px;">ORD-1</div><div style="flex: 1; min-width: 60px; color: #22c55e;">OrderCreated</div><div style="flex: 1; min-width: 30px;">{...}</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 4px; text-align: center; margin-top: 2px; font-size: 9px;">
<div style="flex: 1; min-width: 40px;">2</div><div style="flex: 1; min-width: 50px;">ORD-1</div><div style="flex: 1; min-width: 60px; color: #22c55e;">OrderPaid</div><div style="flex: 1; min-width: 30px;">{...}</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 4px; text-align: center; margin-top: 2px; font-size: 9px;">
<div style="flex: 1; min-width: 40px;">3</div><div style="flex: 1; min-width: 50px;">ORD-1</div><div style="flex: 1; min-width: 60px; color: #22c55e;">OrderShipped</div><div style="flex: 1; min-width: 30px;">{...}</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 4px; text-align: center; margin-top: 2px; font-size: 9px;">
<div style="flex: 1; min-width: 40px;">4</div><div style="flex: 1; min-width: 50px;">ORD-1</div><div style="flex: 1; min-width: 60px; color: #22c55e;">OrderDelivered</div><div style="flex: 1; min-width: 30px;">{...}</div>
</div>
</div>
<div style="color: #22c55e; font-size: 11px;">Current state = replay(all events for ORD-1)</div>
</div>
</div>
<div style="background: #fff; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; margin-bottom: 12px;">Benefits:</div>
<div style="display: flex; flex-wrap: wrap; gap: 8px; color: #1e293b; font-size: 12px;">
<div style="flex: 1; min-width: 200px;">- Complete audit trail</div>
<div style="flex: 1; min-width: 200px;">- Natural fit for CQRS</div>
<div style="flex: 1; min-width: 200px;">- Can rebuild state at any point in time</div>
<div style="flex: 1; min-width: 200px;">- Can derive new read models from existing events</div>
</div>
</div>
<div style="color: #3b82f6; font-weight: bold; font-size: 13px; margin-bottom: 12px;">EVENT STORE STRUCTURE:</div>
<div style="background: #1e293b; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 11px; color: #e2e8f0;">
<div>{</div>
<div style="margin-left: 16px;"><span style="color: #22c55e;">"event_id"</span>: <span style="color: #93c5fd;">"evt-123"</span>,</div>
<div style="margin-left: 16px;"><span style="color: #22c55e;">"aggregate_type"</span>: <span style="color: #93c5fd;">"Order"</span>,</div>
<div style="margin-left: 16px;"><span style="color: #22c55e;">"aggregate_id"</span>: <span style="color: #93c5fd;">"ORD-1"</span>,</div>
<div style="margin-left: 16px;"><span style="color: #22c55e;">"event_type"</span>: <span style="color: #93c5fd;">"OrderShipped"</span>,</div>
<div style="margin-left: 16px;"><span style="color: #22c55e;">"version"</span>: <span style="color: #f97316;">3</span>,</div>
<div style="margin-left: 16px;"><span style="color: #22c55e;">"timestamp"</span>: <span style="color: #93c5fd;">"2024-01-15T10:30:00Z"</span>,</div>
<div style="margin-left: 16px;"><span style="color: #22c55e;">"data"</span>: { <span style="color: #93c5fd;">"tracking_number"</span>: <span style="color: #93c5fd;">"TRK-456"</span>, <span style="color: #93c5fd;">"carrier"</span>: <span style="color: #93c5fd;">"FedEx"</span> },</div>
<div style="margin-left: 16px;"><span style="color: #22c55e;">"metadata"</span>: { <span style="color: #93c5fd;">"user_id"</span>: <span style="color: #93c5fd;">"user-789"</span>, <span style="color: #93c5fd;">"correlation_id"</span>: <span style="color: #93c5fd;">"req-abc"</span> }</div>
<div>}</div>
</div>
</div>

---

## 5. API Gateway Pattern

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #3b82f6; margin: 0 0 8px 0; font-size: 16px;">PATTERN: API GATEWAY</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f97316; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #1e293b; font-size: 13px;">How should clients access individual microservices?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #1e293b; font-size: 13px;">Single entry point that handles cross-cutting concerns.</div>
</div>
<div style="background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
<div style="text-align: center; margin-bottom: 20px;">
<div style="color: #475569; font-size: 12px; margin-bottom: 8px;">CLIENTS</div>
<div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #64748b 0%, #475569 100%); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px;">Web App</div>
<div style="background: linear-gradient(135deg, #64748b 0%, #475569 100%); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px;">Mobile App</div>
<div style="background: linear-gradient(135deg, #64748b 0%, #475569 100%); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px;">Partner API</div>
<div style="background: linear-gradient(135deg, #64748b 0%, #475569 100%); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px;">Admin</div>
</div>
</div>
<div style="text-align: center; color: #3b82f6; margin-bottom: 16px;">v</div>
<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
<div style="color: #fff; font-weight: bold; font-size: 14px; text-align: center; margin-bottom: 16px;">API GATEWAY</div>
<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
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
<div style="text-align: center; color: #3b82f6; margin-bottom: 16px;">v</div>
<div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">User Service</div>
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">Order Service</div>
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">Product Svc</div>
</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 24px;">
<div style="flex: 1; min-width: 200px;">
<div style="color: #3b82f6; font-weight: bold; font-size: 13px; margin-bottom: 8px;">RESPONSIBILITIES:</div>
<div style="color: #1e293b; font-size: 12px; margin-left: 8px;">
<div>- Authentication & Authorization</div>
<div>- Rate limiting & Throttling</div>
<div>- Request/Response transformation</div>
<div>- Load balancing</div>
<div>- Caching</div>
<div>- Circuit breaking</div>
<div>- Monitoring & Logging</div>
<div>- API versioning</div>
</div>
</div>
<div style="flex: 1; min-width: 200px;">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">POPULAR IMPLEMENTATIONS:</div>
<div style="display: flex; flex-wrap: wrap; gap: 8px;">
<span style="background: rgba(34,197,94,0.1); color: #22c55e; padding: 4px 8px; border-radius: 4px; font-size: 11px; border: 1px solid #86efac;">Kong</span>
<span style="background: rgba(34,197,94,0.1); color: #22c55e; padding: 4px 8px; border-radius: 4px; font-size: 11px; border: 1px solid #86efac;">AWS API Gateway</span>
<span style="background: rgba(34,197,94,0.1); color: #22c55e; padding: 4px 8px; border-radius: 4px; font-size: 11px; border: 1px solid #86efac;">Nginx</span>
<span style="background: rgba(34,197,94,0.1); color: #22c55e; padding: 4px 8px; border-radius: 4px; font-size: 11px; border: 1px solid #86efac;">Envoy</span>
<span style="background: rgba(34,197,94,0.1); color: #22c55e; padding: 4px 8px; border-radius: 4px; font-size: 11px; border: 1px solid #86efac;">Traefik</span>
</div>
</div>
</div>
</div>

    ---

    ## 6. Backend for Frontend (BFF)

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #3b82f6; margin: 0 0 8px 0; font-size: 16px;">PATTERN: BACKEND FOR FRONTEND (BFF)</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f97316; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #1e293b; font-size: 13px;">Different clients (web, mobile, IoT) have different data needs. A single API is either over-fetching or under-fetching.</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #1e293b; font-size: 13px;">Create separate backend for each frontend type.</div>
</div>
<div style="background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
<div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 24px; justify-content: center;">
<div style="flex: 1; min-width: 120px; text-align: center;">
<div style="background: linear-gradient(135deg, #64748b 0%, #475569 100%); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px; margin-bottom: 8px;">Web App</div>
<div style="color: #3b82f6; margin-bottom: 8px;">v</div>
<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 8px; padding: 12px; color: #fff;">
<div style="font-weight: bold; font-size: 12px;">Web BFF</div>
<div style="font-size: 10px; opacity: 0.8; margin-top: 4px;">- Full data<br/>- Rich UI data</div>
</div>
</div>
<div style="flex: 1; min-width: 120px; text-align: center;">
<div style="background: linear-gradient(135deg, #64748b 0%, #475569 100%); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px; margin-bottom: 8px;">Mobile App</div>
<div style="color: #3b82f6; margin-bottom: 8px;">v</div>
<div style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); border-radius: 8px; padding: 12px; color: #fff;">
<div style="font-weight: bold; font-size: 12px;">Mobile BFF</div>
<div style="font-size: 10px; opacity: 0.8; margin-top: 4px;">- Minimal payload<br/>- Offline support</div>
</div>
</div>
<div style="flex: 1; min-width: 120px; text-align: center;">
<div style="background: linear-gradient(135deg, #64748b 0%, #475569 100%); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 11px; margin-bottom: 8px;">IoT</div>
<div style="color: #3b82f6; margin-bottom: 8px;">v</div>
<div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 8px; padding: 12px; color: #fff;">
<div style="font-weight: bold; font-size: 12px;">IoT BFF</div>
<div style="font-size: 10px; opacity: 0.8; margin-top: 4px;">- Compact data<br/>- Batch updates</div>
</div>
</div>
</div>
<div style="text-align: center; color: #3b82f6; margin-bottom: 16px;">v v v</div>
<div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">User Service</div>
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">Order Service</div>
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-weight: bold; font-size: 11px;">Product Svc</div>
</div>
</div>
<div style="color: #3b82f6; font-weight: bold; font-size: 13px; margin-bottom: 12px;">EXAMPLE: Mobile BFF vs Web BFF</div>
<div style="display: flex; flex-wrap: wrap; gap: 16px;">
<div style="flex: 1; min-width: 200px; background: rgba(124,58,237,0.05); border-radius: 8px; padding: 16px; border: 1px solid rgba(124,58,237,0.2);">
<div style="color: #7c3aed; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Mobile BFF</div>
<div style="color: #1e293b; font-size: 11px;">
<div>- Smaller payload</div>
<div>- Image thumbnails</div>
<div>- Paginated lists</div>
<div>- Offline-first</div>
<div>- Push notif ready</div>
</div>
</div>
<div style="flex: 1; min-width: 200px; background: rgba(59,130,246,0.05); border-radius: 8px; padding: 16px; border: 1px solid rgba(59,130,246,0.2);">
<div style="color: #3b82f6; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Web BFF</div>
<div style="color: #1e293b; font-size: 11px;">
<div>- Full payload</div>
<div>- High-res images</div>
<div>- Infinite scroll</div>
<div>- Real-time updates</div>
<div>- WebSocket ready</div>
</div>
</div>
</div>
</div>

        ---

        ## 7. Circuit Breaker Pattern

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #3b82f6; margin: 0 0 8px 0; font-size: 16px;">PATTERN: CIRCUIT BREAKER</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f97316; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #1e293b; font-size: 13px;">How to prevent cascade failures when a service is unavailable?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #1e293b; font-size: 13px;">Implement a circuit breaker that stops requests when failures exceed a threshold.</div>
</div>
<div style="color: #3b82f6; font-weight: bold; font-size: 13px; margin-bottom: 12px;">STATE MACHINE:</div>
<div style="background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
<div style="display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap;">
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 11px; flex-direction: column;">
<div>CLOSED</div>
<div style="font-size: 9px; opacity: 0.8;">(Normal)</div>
</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
<div style="color: #dc2626; font-size: 10px;">failure threshold exceeded</div>
<div style="color: #dc2626; font-size: 16px;">-></div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 11px; flex-direction: column;">
<div>OPEN</div>
<div style="font-size: 9px; opacity: 0.8;">(Fast fail)</div>
</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
<div style="color: #f97316; font-size: 10px;">timer expires</div>
<div style="color: #f97316; font-size: 16px;">-></div>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 11px; flex-direction: column;">
<div>HALF-OPEN</div>
<div style="font-size: 9px; opacity: 0.8;">(Test mode)</div>
</div>
</div>
</div>
<div style="display: flex; justify-content: center; gap: 40px; margin-top: 16px; font-size: 11px; flex-wrap: wrap;">
<div style="color: #22c55e;"><- success -> CLOSED</div>
<div style="color: #dc2626;"><- failure -> OPEN</div>
</div>
</div>
<div style="color: #3b82f6; font-weight: bold; font-size: 13px; margin-bottom: 12px;">IMPLEMENTATION EXAMPLE (Go):</div>
<div style="background: #1e293b; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 11px; color: #e2e8f0; margin-bottom: 24px; overflow-x: auto;">
<div><span style="color: #f97316;">breaker</span> := gobreaker.NewCircuitBreaker(gobreaker.Settings{</div>
<div style="margin-left: 16px;">Name:        <span style="color: #93c5fd;">"payment-service"</span>,</div>
<div style="margin-left: 16px;">MaxRequests: <span style="color: #f97316;">5</span>,           <span style="color: #94a3b8;">// Requests in half-open</span></div>
<div style="margin-left: 16px;">Interval:    <span style="color: #f97316;">10</span> * time.Second, <span style="color: #94a3b8;">// Clear counts</span></div>
<div style="margin-left: 16px;">Timeout:     <span style="color: #f97316;">30</span> * time.Second, <span style="color: #94a3b8;">// Time in open</span></div>
<div style="margin-left: 16px;">ReadyToTrip: <span style="color: #f97316;">func</span>(counts) <span style="color: #f97316;">bool</span> { <span style="color: #f97316;">return</span> counts.ConsecutiveFailures > <span style="color: #f97316;">3</span> },</div>
<div>})</div>
<div style="margin-top: 8px;"><span style="color: #f97316;">result</span>, err := breaker.Execute(<span style="color: #f97316;">func</span>() { <span style="color: #f97316;">return</span> paymentClient.ProcessPayment(ctx, payment) })</div>
</div>
<div style="color: #3b82f6; font-weight: bold; font-size: 13px; margin-bottom: 8px;">CONFIGURATION:</div>
<div style="color: #1e293b; font-size: 12px; display: flex; flex-wrap: wrap; gap: 8px;">
<div style="flex: 1; min-width: 200px;">- Failure threshold: 50% failures in 10 seconds</div>
<div style="flex: 1; min-width: 200px;">- Open duration: 30 seconds before trying again</div>
<div style="flex: 1; min-width: 200px;">- Half-open: Allow 3 test requests</div>
<div style="flex: 1; min-width: 200px;">- Reset: Full reset after 10 consecutive successes</div>
</div>
</div>

---

## 8. Bulkhead Pattern

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #3b82f6; margin: 0 0 8px 0; font-size: 16px;">PATTERN: BULKHEAD</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f97316; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #1e293b; font-size: 13px;">How to isolate failures to prevent total system failure?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #1e293b; font-size: 13px;">Partition resources into isolated pools (like ship bulkheads).</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 24px;">
<div style="flex: 1; min-width: 250px; background: rgba(220,38,38,0.05); border-radius: 12px; padding: 20px; border: 1px solid rgba(220,38,38,0.2);">
<div style="color: #dc2626; font-weight: bold; font-size: 13px; margin-bottom: 12px;">WITHOUT BULKHEAD:</div>
<div style="background: #fff; border-radius: 8px; padding: 16px; text-align: center; border: 1px solid #e2e8f0;">
<div style="color: #1e293b; font-weight: bold; font-size: 12px; margin-bottom: 8px;">SHARED THREAD POOL (100)</div>
<div style="color: #dc2626; font-size: 11px;">
<div>All requests share same pool</div>
<div>Slow service exhausts all threads</div>
<div style="font-weight: bold;">ALL services affected!</div>
</div>
</div>
</div>
<div style="flex: 1; min-width: 250px; background: rgba(34,197,94,0.05); border-radius: 12px; padding: 20px; border: 1px solid rgba(34,197,94,0.2);">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; margin-bottom: 12px;">WITH BULKHEAD:</div>
<div style="display: flex; flex-wrap: wrap; gap: 8px;">
<div style="flex: 1; min-width: 80px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 8px; padding: 12px; color: #fff; text-align: center;">
<div style="font-weight: bold; font-size: 10px;">User Pool</div>
<div style="font-size: 9px; opacity: 0.8;">(30 threads)</div>
<div style="font-size: 9px; margin-top: 4px;">If exhausted:<br/>only users affected</div>
</div>
<div style="flex: 1; min-width: 80px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px; padding: 12px; color: #fff; text-align: center;">
<div style="font-weight: bold; font-size: 10px;">Order Pool</div>
<div style="font-size: 9px; opacity: 0.8;">(40 threads)</div>
<div style="font-size: 9px; margin-top: 4px;">If exhausted:<br/>only orders affected</div>
</div>
<div style="flex: 1; min-width: 80px; background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); border-radius: 8px; padding: 12px; color: #fff; text-align: center;">
<div style="font-weight: bold; font-size: 10px;">Payment Pool</div>
<div style="font-size: 9px; opacity: 0.8;">(30 threads)</div>
<div style="font-size: 9px; margin-top: 4px;">Isolated</div>
</div>
</div>
</div>
</div>
<div style="color: #3b82f6; font-weight: bold; font-size: 13px; margin-bottom: 12px;">TYPES OF BULKHEADS:</div>
<div style="display: flex; flex-wrap: wrap; gap: 16px;">
<div style="flex: 1; min-width: 180px; background: #fff; border-radius: 8px; padding: 16px; border: 1px solid #e2e8f0;">
<div style="color: #3b82f6; font-weight: bold; font-size: 12px; margin-bottom: 8px;">1. Thread Pool Isolation</div>
<div style="color: #1e293b; font-size: 11px;">
<div>- Separate thread pools per dependency</div>
<div>- Slow dependency can't exhaust all threads</div>
</div>
</div>
<div style="flex: 1; min-width: 180px; background: #fff; border-radius: 8px; padding: 16px; border: 1px solid #e2e8f0;">
<div style="color: #3b82f6; font-weight: bold; font-size: 12px; margin-bottom: 8px;">2. Semaphore Isolation</div>
<div style="color: #1e293b; font-size: 11px;">
<div>- Limit concurrent calls to dependency</div>
<div>- Lower overhead than thread pools</div>
</div>
</div>
<div style="flex: 1; min-width: 180px; background: #fff; border-radius: 8px; padding: 16px; border: 1px solid #e2e8f0;">
<div style="color: #3b82f6; font-weight: bold; font-size: 12px; margin-bottom: 8px;">3. Connection Pool Isolation</div>
<div style="color: #1e293b; font-size: 11px;">
<div>- Separate DB connection pools per service</div>
<div>- Prevents DB connection exhaustion</div>
</div>
</div>
</div>
</div>

---

## 9. Sidecar Pattern

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #3b82f6; margin: 0 0 8px 0; font-size: 16px;">PATTERN: SIDECAR</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f97316; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #1e293b; font-size: 13px;">How to add common functionality (logging, monitoring, proxy) to services without modifying them?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #1e293b; font-size: 13px;">Deploy helper functionality as a separate container alongside the main application container.</div>
</div>
<div style="background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
<div style="color: #475569; font-size: 12px; text-align: center; margin-bottom: 16px;">POD</div>
<div style="background: rgba(0,0,0,0.03); border: 2px dashed #e2e8f0; border-radius: 12px; padding: 20px;">
<div style="display: flex; justify-content: center; gap: 24px; margin-bottom: 20px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px; padding: 16px; color: #fff; text-align: center; min-width: 140px;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">Application Container</div>
<div style="font-size: 10px; opacity: 0.9;">- Business logic<br/>- No infra code</div>
</div>
<div style="display: flex; align-items: center; color: #3b82f6; font-size: 20px;"><></div>
<div style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); border-radius: 8px; padding: 16px; color: #fff; text-align: center; min-width: 140px;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">Sidecar Container</div>
<div style="font-size: 10px; opacity: 0.9;">- Logging<br/>- Monitoring<br/>- Proxy<br/>- Config sync</div>
</div>
</div>
<div style="color: #475569; font-size: 11px; text-align: center;">
<span style="color: #3b82f6; font-weight: bold;">Shared:</span> Network namespace (localhost) | Volumes | Lifecycle
</div>
</div>
</div>
<div style="color: #3b82f6; font-weight: bold; font-size: 13px; margin-bottom: 12px;">COMMON SIDECAR USE CASES:</div>
<div style="display: flex; flex-wrap: wrap; gap: 8px;">
<span style="background: rgba(124,58,237,0.1); color: #7c3aed; padding: 6px 12px; border-radius: 6px; font-size: 11px; border: 1px solid #c4b5fd;">Envoy Proxy - Service mesh (Istio)</span>
<span style="background: rgba(124,58,237,0.1); color: #7c3aed; padding: 6px 12px; border-radius: 6px; font-size: 11px; border: 1px solid #c4b5fd;">Fluent Bit - Log forwarding</span>
<span style="background: rgba(124,58,237,0.1); color: #7c3aed; padding: 6px 12px; border-radius: 6px; font-size: 11px; border: 1px solid #c4b5fd;">Vault Agent - Secret injection</span>
<span style="background: rgba(124,58,237,0.1); color: #7c3aed; padding: 6px 12px; border-radius: 6px; font-size: 11px; border: 1px solid #c4b5fd;">CloudSQL Proxy - DB connection</span>
<span style="background: rgba(124,58,237,0.1); color: #7c3aed; padding: 6px 12px; border-radius: 6px; font-size: 11px; border: 1px solid #c4b5fd;">Prometheus Exporter - Metrics</span>
</div>
</div>

---

## 10. Strangler Fig Pattern

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #3b82f6; margin: 0 0 8px 0; font-size: 16px;">PATTERN: STRANGLER FIG</h3>
<div style="margin-bottom: 24px;">
<div style="color: #f97316; font-weight: bold; font-size: 13px; margin-bottom: 8px;">PROBLEM:</div>
<div style="color: #1e293b; font-size: 13px;">How to migrate from monolith to microservices incrementally?</div>
</div>
<div style="margin-bottom: 24px;">
<div style="color: #22c55e; font-weight: bold; font-size: 13px; margin-bottom: 8px;">SOLUTION:</div>
<div style="color: #1e293b; font-size: 13px;">Gradually replace monolith functionality with new services, like a strangler fig tree grows around and replaces its host.</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 16px;">
<div style="flex: 1; min-width: 200px; background: #fff; border-radius: 12px; padding: 16px; border: 1px solid #e2e8f0;">
<div style="color: #3b82f6; font-weight: bold; font-size: 12px; margin-bottom: 12px;">PHASE 1: Add Facade</div>
<div style="text-align: center;">
<div style="background: #64748b; border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px; display: inline-block; margin-bottom: 8px;">Clients</div>
<div style="color: #3b82f6;">v</div>
<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px; display: inline-block; margin: 8px 0;">Facade/Proxy</div>
<div style="color: #3b82f6;">v</div>
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-radius: 4px; padding: 8px 16px; color: #fff; font-size: 10px; display: inline-block; margin-top: 8px;">MONOLITH<br/><span style="opacity: 0.8;">[All functionality]</span></div>
</div>
</div>
<div style="flex: 1; min-width: 200px; background: #fff; border-radius: 12px; padding: 16px; border: 1px solid #e2e8f0;">
<div style="color: #3b82f6; font-weight: bold; font-size: 12px; margin-bottom: 12px;">PHASE 2: Extract First Service</div>
<div style="text-align: center;">
<div style="background: #64748b; border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px; display: inline-block; margin-bottom: 8px;">Clients</div>
<div style="color: #3b82f6;">v</div>
<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px; display: inline-block; margin: 8px 0;">Facade/Proxy</div>
<div style="display: flex; justify-content: center; gap: 8px; margin-top: 8px;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 9px;">User Service<br/>(New)</div>
<div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 4px; padding: 6px 10px; color: #fff; font-size: 9px;">MONOLITH<br/>[Less features]</div>
</div>
</div>
</div>
<div style="flex: 1; min-width: 200px; background: #fff; border-radius: 12px; padding: 16px; border: 1px solid #e2e8f0;">
<div style="color: #3b82f6; font-weight: bold; font-size: 12px; margin-bottom: 12px;">PHASE 3: Continue Extraction</div>
<div style="text-align: center;">
<div style="background: #64748b; border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px; display: inline-block; margin-bottom: 8px;">Clients</div>
<div style="color: #3b82f6;">v</div>
<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px; display: inline-block; margin: 8px 0;">Facade/Proxy</div>
<div style="display: flex; justify-content: center; gap: 6px; margin-top: 8px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 8px;">User</div>
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 8px;">Order</div>
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 8px;">Payment</div>
<div style="background: linear-gradient(135deg, #64748b 0%, #475569 100%); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 8px;">Legacy</div>
</div>
</div>
</div>
<div style="flex: 1; min-width: 200px; background: rgba(34,197,94,0.05); border-radius: 12px; padding: 16px; border: 1px solid rgba(34,197,94,0.2);">
<div style="color: #22c55e; font-weight: bold; font-size: 12px; margin-bottom: 12px;">PHASE 4: Decommission Monolith</div>
<div style="text-align: center;">
<div style="background: #64748b; border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px; display: inline-block; margin-bottom: 8px;">Clients</div>
<div style="color: #22c55e;">v</div>
<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px; display: inline-block; margin: 8px 0;">API Gateway</div>
<div style="display: flex; justify-content: center; gap: 6px; margin-top: 8px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 8px;">User</div>
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 8px;">Order</div>
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 8px;">Payment</div>
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 4px; padding: 4px 8px; color: #fff; font-size: 8px;">...</div>
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
