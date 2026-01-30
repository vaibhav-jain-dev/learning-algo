# Introduction to Microservices Architecture

## Overview

**Microservices architecture** is a distributed systems approach that decomposes applications into small, autonomous services organized around business capabilities. Each service encapsulates a bounded context, owns its data, and communicates through well-defined contracts. Unlike simple "small services," true microservices embody specific organizational, operational, and technical principles that enable independent evolution at scale.

**Tags:** Architecture, Distributed Systems, System Design, Interview Essential

---

## Core Principles: The Deep Mechanics

### 1. Single Responsibility and Service Boundaries

The Single Responsibility Principle in microservices extends beyond code-level concerns to **business capability ownership**. A service should represent a single bounded context from Domain-Driven Design, not merely a single function.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #e94560; margin: 0 0 24px 0; font-size: 18px;">Service Boundary Decision Framework</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div style="background: rgba(233, 69, 96, 0.1); padding: 20px; border-radius: 12px; border-left: 4px solid #e94560;">
      <div style="color: #e94560; font-weight: bold; margin-bottom: 12px;">Cohesion Indicators (Keep Together)</div>
      <div style="color: #475569; font-size: 13px; line-height: 1.8;">
        <div>Data that changes together</div>
        <div>Features deployed together</div>
        <div>Functionality sharing transactions</div>
        <div>Same team ownership</div>
        <div>Common release cycles</div>
      </div>
    </div>
    <div style="background: rgba(0, 173, 181, 0.1); padding: 20px; border-radius: 12px; border-left: 4px solid #00adb5;">
      <div style="color: #00adb5; font-weight: bold; margin-bottom: 12px;">Coupling Indicators (Split Apart)</div>
      <div style="color: #475569; font-size: 13px; line-height: 1.8;">
        <div>Different rates of change</div>
        <div>Different scaling requirements</div>
        <div>Different security boundaries</div>
        <div>Different team expertise</div>
        <div>Independent business value</div>
      </div>
    </div>
  </div>
  <div style="background: #eff6ff; padding: 16px; border-radius: 8px; margin-top: 20px;">
    <div style="color: #1e293b; font-size: 13px;"><span style="color: #e94560; font-weight: bold;">Critical Insight:</span> The boundary is correct when you can explain what the service does without using "and" - "This service manages order lifecycle" vs "This service manages orders and sends notifications and updates inventory"</div>
  </div>
</div>

      **The Granularity Trap**: Services that are too fine-grained create a "distributed monolith" - the worst of both worlds. Signs include:
      - Every business operation requires orchestrating 5+ services
      - Circular dependencies between services
      - Cannot deploy one service without deploying others
      - Distributed transactions spanning multiple services

```python
# Anti-pattern: Nano-services creating tight coupling
class OrderService:
    def create_order(self, order_data):
        # Orchestrating too many fine-grained services
        customer = self.customer_service.get(order_data.customer_id)
        address = self.address_service.validate(order_data.address)
        inventory = self.inventory_service.check(order_data.items)
        pricing = self.pricing_service.calculate(order_data.items)
        tax = self.tax_service.calculate(pricing, address)
        discount = self.discount_service.apply(customer, pricing)
        # If any service fails, entire operation fails
        # This is distributed monolith behavior

# Better: Coarser boundaries with internal cohesion
class OrderService:
    def create_order(self, order_data):
        # Order service owns the order lifecycle completely
        # Calls external services only at true boundaries
        customer_snapshot = self.customer_client.get_snapshot(order_data.customer_id)

        # Order calculation is internal - no external calls
        order = Order.create(order_data, customer_snapshot)
        order.calculate_totals()  # Internal logic, not external service

        self.repository.save(order)
        self.event_bus.publish(OrderCreated(order))
        return order
```

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e94560;">
  <h4 style="color: #e94560; margin: 0 0 16px 0; font-size: 16px;">Interview Questions: Service Boundaries (3-Level Deep)</h4>

  <div style="margin-bottom: 20px;">
    <div style="color: #00adb5; font-weight: bold; margin-bottom: 8px;">Level 1: How do you determine service boundaries in a microservices architecture?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 16px; border-left: 2px solid #cbd5e1; margin: 12px 0;">
      Use Domain-Driven Design's bounded contexts. Identify distinct business capabilities with their own ubiquitous language, data ownership, and team alignment. Apply the "can explain without 'and'" test.
    </div>

    <div style="color: #e94560; font-weight: bold; margin: 16px 0 8px 24px;">Level 2: What happens when you discover the boundary is wrong after deployment? How do you refactor?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 40px; border-left: 2px solid #cbd5e1; margin: 12px 0 12px 24px;">
      Refactoring requires the Strangler Fig pattern: create new service with correct boundary, route traffic gradually using feature flags, maintain backward compatibility through API versioning, use change data capture to sync during transition, deprecate old service only after full migration verification.
    </div>

    <div style="color: #ffa500; font-weight: bold; margin: 16px 0 8px 48px;">Level 3: How do you handle data that was shared between the old services during the split? What about in-flight transactions?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 64px; border-left: 2px solid #cbd5e1; margin: 12px 0 12px 48px;">
      For shared data: establish data ownership first, then replicate needed data via events (eventual consistency) or API calls (synchronous). For in-flight transactions during cutover: implement dual-write during transition with reconciliation jobs, use distributed sagas with compensation for new flows, maintain audit logs with correlation IDs to trace and replay failed operations. Consider "freeze" windows for complex migrations.
    </div>
  </div>
</div>

---

### 2. Decentralized Data Management

Each microservice must own its data exclusively. This principle has profound implications for consistency, querying, and operational complexity.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #00adb5; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Data Ownership Patterns</h4>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
    <div style="background: rgba(0, 173, 181, 0.15); padding: 20px; border-radius: 12px; text-align: center;">
      <div style="color: #00adb5; font-weight: bold; font-size: 14px; margin-bottom: 12px;">Database per Service</div>
      <div style="background: #eff6ff; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
        <div style="color: #1e293b; font-size: 12px;">Order Service</div>
        <div style="color: #64748b; font-size: 10px; margin-top: 4px;">PostgreSQL</div>
      </div>
      <div style="color: #475569; font-size: 11px;">Complete isolation, different DB tech per service</div>
    </div>
    <div style="background: rgba(233, 69, 96, 0.15); padding: 20px; border-radius: 12px; text-align: center;">
      <div style="color: #e94560; font-weight: bold; font-size: 14px; margin-bottom: 12px;">Schema per Service</div>
      <div style="background: #eff6ff; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
        <div style="color: #1e293b; font-size: 12px;">Shared PostgreSQL</div>
        <div style="color: #64748b; font-size: 10px; margin-top: 4px;">Separate schemas</div>
      </div>
      <div style="color: #475569; font-size: 11px;">Logical isolation, shared infrastructure</div>
    </div>
    <div style="background: rgba(255, 165, 0, 0.15); padding: 20px; border-radius: 12px; text-align: center;">
      <div style="color: #ffa500; font-weight: bold; font-size: 14px; margin-bottom: 12px;">Private Tables</div>
      <div style="background: #eff6ff; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
        <div style="color: #1e293b; font-size: 12px;">Shared Schema</div>
        <div style="color: #64748b; font-size: 10px; margin-top: 4px;">Table ownership rules</div>
      </div>
      <div style="color: #475569; font-size: 11px;">Weak isolation, transition pattern only</div>
    </div>
  </div>
</div>

**The CAP Theorem Reality**: With distributed data, you must choose between consistency and availability during network partitions. Most microservices choose **eventual consistency** with the following implications:

```python
# Eventual consistency example: Order and Inventory
class OrderService:
    def place_order(self, order_request):
        # Step 1: Reserve inventory optimistically
        reservation = self.inventory_client.reserve(
            order_request.items,
            reservation_ttl=timedelta(minutes=15)
        )

        if not reservation.success:
            raise InsufficientInventoryError(reservation.unavailable_items)

        # Step 2: Create order with reservation reference
        order = Order(
            items=order_request.items,
            reservation_id=reservation.id,
            status=OrderStatus.PENDING_PAYMENT
        )
        self.repository.save(order)

        # Step 3: Publish event for downstream processing
        # Other services will eventually be consistent
        self.events.publish(OrderCreated(
            order_id=order.id,
            reservation_id=reservation.id,
            customer_id=order_request.customer_id
        ))

        return order

    # Compensation handler for failed payments
    @event_handler(PaymentFailed)
    def handle_payment_failed(self, event):
        order = self.repository.get(event.order_id)
        order.status = OrderStatus.CANCELLED
        self.repository.save(order)

        # Release the inventory reservation
        self.inventory_client.release_reservation(order.reservation_id)

        self.events.publish(OrderCancelled(order_id=order.id))
```

**Cross-Service Queries**: When you need data from multiple services, you have several patterns:

| Pattern | Use Case | Trade-offs |
|---------|----------|------------|
| **API Composition** | Real-time aggregation | Latency accumulates, partial failures complex |
| **CQRS Read Models** | Query-heavy workloads | Eventual consistency, additional infrastructure |
| **Data Replication** | Frequently joined data | Stale data risk, storage overhead |
| **Materialized Views** | Reporting, analytics | Build complexity, sync lag |

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e94560;">
  <h4 style="color: #e94560; margin: 0 0 16px 0; font-size: 16px;">Interview Questions: Data Management (3-Level Deep)</h4>

  <div style="margin-bottom: 20px;">
    <div style="color: #00adb5; font-weight: bold; margin-bottom: 8px;">Level 1: Why should each microservice own its database? What problems does shared databases cause?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 16px; border-left: 2px solid #cbd5e1; margin: 12px 0;">
      Shared databases create hidden coupling through schema dependencies, prevent independent deployment (schema changes affect all services), eliminate technology choice, create scaling bottlenecks, and make ownership unclear. Separate databases enable true autonomy.
    </div>

    <div style="color: #e94560; font-weight: bold; margin: 16px 0 8px 24px;">Level 2: How do you handle transactions that span multiple services when each has its own database?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 40px; border-left: 2px solid #cbd5e1; margin: 12px 0 12px 24px;">
      Use the [[Saga Pattern]](/microservices/patterns/saga) with either choreography (event-driven) or orchestration (central coordinator). Each service performs local transactions and publishes events. Compensating transactions handle rollback. Avoid distributed transactions (2PC) as they don't scale and create tight coupling.
    </div>

    <div style="color: #ffa500; font-weight: bold; margin: 16px 0 8px 48px;">Level 3: What happens if a compensating transaction fails? How do you handle "uncompensatable" operations like sending emails?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 64px; border-left: 2px solid #cbd5e1; margin: 12px 0 12px 48px;">
      Compensating transaction failures require: (1) Retry with exponential backoff and dead letter queues, (2) Manual intervention workflows with admin dashboards, (3) Eventual reconciliation jobs that compare states. For uncompensatable operations: use semantic locks (mark operation as "pending" until saga completes), design operations to be reversible (send "order cancelled" email instead of unsending), or accept business-level compensation (refunds, credits). Implement idempotency keys throughout.
    </div>
  </div>
</div>

---

### 3. Design for Failure

In distributed systems, failure is not exceptional - it is the norm. Network partitions, service crashes, and slow dependencies will occur. The system must be designed to degrade gracefully rather than fail catastrophically.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #e94560; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Failure Handling Mechanisms</h4>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
    <div style="background: #eff6ff; padding: 20px; border-radius: 12px;">
      <div style="color: #00adb5; font-weight: bold; margin-bottom: 12px;">Circuit Breaker States</div>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <div style="background: rgba(0, 255, 0, 0.2); padding: 8px 16px; border-radius: 20px; color: #7fff7f; font-size: 12px;">CLOSED: Normal operation</div>
        <div style="background: rgba(255, 165, 0, 0.2); padding: 8px 16px; border-radius: 20px; color: #ffa500; font-size: 12px;">HALF-OPEN: Testing recovery</div>
        <div style="background: rgba(255, 0, 0, 0.2); padding: 8px 16px; border-radius: 20px; color: #ff6b6b; font-size: 12px;">OPEN: Failing fast</div>
      </div>
      <div style="color: #475569; font-size: 12px; margin-top: 12px;">Threshold: 50% failures in 10 requests triggers OPEN. Reset timeout: 30 seconds to HALF-OPEN.</div>
    </div>
    <div style="background: #eff6ff; padding: 20px; border-radius: 12px;">
      <div style="color: #e94560; font-weight: bold; margin-bottom: 12px;">Bulkhead Isolation</div>
      <div style="color: #475569; font-size: 12px; line-height: 1.6;">
        Isolate failures by partitioning resources:
        <div style="margin-top: 8px; padding-left: 12px; border-left: 2px solid #e94560;">
          Thread pool per dependency<br/>
          Connection pool limits<br/>
          Separate process/container<br/>
          Queue per operation type
        </div>
      </div>
    </div>
    <div style="background: #eff6ff; padding: 20px; border-radius: 12px;">
      <div style="color: #ffa500; font-weight: bold; margin-bottom: 12px;">Retry Strategy</div>
      <div style="color: #475569; font-size: 12px;">
        <div style="font-family: monospace; background: #f1f5f9; padding: 8px; border-radius: 4px; margin-top: 8px;">
          delay = min(base * 2^attempt, max)<br/>
          delay += random(0, delay * 0.1)  # jitter
        </div>
        <div style="margin-top: 8px;">Max 3 retries, base 100ms, max 10s, with jitter to prevent thundering herd</div>
      </div>
    </div>
    <div style="background: #eff6ff; padding: 20px; border-radius: 12px;">
      <div style="color: #00adb5; font-weight: bold; margin-bottom: 12px;">Timeout Hierarchy</div>
      <div style="color: #475569; font-size: 12px;">
        <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 8px;">
          <div style="display: flex; justify-content: space-between;"><span>Connection timeout:</span><span style="color: #00adb5;">1-5s</span></div>
          <div style="display: flex; justify-content: space-between;"><span>Read timeout:</span><span style="color: #00adb5;">5-30s</span></div>
          <div style="display: flex; justify-content: space-between;"><span>Overall request:</span><span style="color: #00adb5;">30-60s</span></div>
          <div style="display: flex; justify-content: space-between;"><span>Circuit breaker:</span><span style="color: #00adb5;">30-60s</span></div>
        </div>
      </div>
    </div>
  </div>
</div>

```python
# Production-grade resilience implementation
from circuitbreaker import circuit
from tenacity import retry, stop_after_attempt, wait_exponential
import asyncio

class ResilientServiceClient:
    def __init__(self, service_name: str, base_url: str):
        self.service_name = service_name
        self.base_url = base_url
        self.circuit_breaker = CircuitBreaker(
            failure_threshold=5,
            recovery_timeout=30,
            expected_exceptions=(ServiceUnavailableError, TimeoutError)
        )
        # Bulkhead: separate semaphore per service
        self.semaphore = asyncio.Semaphore(10)

    @circuit
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=0.1, max=10),
        retry=retry_if_exception_type((TransientError, TimeoutError))
    )
    async def call(self, endpoint: str, method: str = "GET", **kwargs):
        # Bulkhead: limit concurrent calls
        async with self.semaphore:
            # Timeout: prevent hanging
            try:
                async with asyncio.timeout(30):
                    response = await self._make_request(endpoint, method, **kwargs)
                    return response
            except asyncio.TimeoutError:
                self._record_failure("timeout")
                raise TimeoutError(f"{self.service_name} timeout")

    async def call_with_fallback(self, endpoint: str, fallback_fn, **kwargs):
        """Call with graceful degradation"""
        try:
            return await self.call(endpoint, **kwargs)
        except CircuitBreakerOpenError:
            # Circuit is open - use fallback immediately
            logger.warning(f"Circuit open for {self.service_name}, using fallback")
            return await fallback_fn()
        except Exception as e:
            logger.error(f"Call failed to {self.service_name}: {e}")
            return await fallback_fn()

# Usage with fallback
class ProductService:
    async def get_product_with_reviews(self, product_id: str):
        product = await self.product_repo.get(product_id)

        # Reviews are non-critical - use fallback on failure
        reviews = await self.review_client.call_with_fallback(
            f"/products/{product_id}/reviews",
            fallback_fn=lambda: {"reviews": [], "cached": True}
        )

        return {**product, **reviews}
```

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e94560;">
  <h4 style="color: #e94560; margin: 0 0 16px 0; font-size: 16px;">Interview Questions: Failure Handling (3-Level Deep)</h4>

  <div style="margin-bottom: 20px;">
    <div style="color: #00adb5; font-weight: bold; margin-bottom: 8px;">Level 1: What is a circuit breaker and when should you use it?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 16px; border-left: 2px solid #cbd5e1; margin: 12px 0;">
      A circuit breaker prevents cascading failures by stopping calls to failing services. It has three states: CLOSED (normal), OPEN (failing fast), HALF-OPEN (testing recovery). Use it for all inter-service communication to prevent one failing service from bringing down the entire system.
    </div>

    <div style="color: #e94560; font-weight: bold; margin: 16px 0 8px 24px;">Level 2: How do you configure circuit breaker thresholds? What happens when the circuit opens during a traffic spike?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 40px; border-left: 2px solid #cbd5e1; margin: 12px 0 12px 24px;">
      Thresholds depend on SLAs and traffic patterns: typically 50% failure rate over 20 requests, with 30-second recovery timeout. During traffic spikes with open circuit: (1) Return cached data if available, (2) Serve degraded response, (3) Queue requests if latency-tolerant. Configure sliding window for failure counting to avoid single burst triggering. Use separate circuits per endpoint, not per service.
    </div>

    <div style="color: #ffa500; font-weight: bold; margin: 16px 0 8px 48px;">Level 3: How do you prevent thundering herd when the circuit transitions from OPEN to HALF-OPEN? What about circuit breakers in async/event-driven systems?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 64px; border-left: 2px solid #cbd5e1; margin: 12px 0 12px 48px;">
      Thundering herd prevention: (1) Allow only single probe request in HALF-OPEN, (2) Add jitter to recovery timeouts across instances, (3) Gradual ramp-up from HALF-OPEN (10% traffic initially). For async systems: circuit breakers apply to message processing - track consumer failure rates, pause consumption when circuit opens (let messages queue in broker), resume with backpressure. Use dead letter queues for persistent failures. Consider per-partition circuits in Kafka.
    </div>
  </div>
</div>

---

### 4. Smart Endpoints and Dumb Pipes

Microservices favor simple communication mechanisms (HTTP, message queues) with intelligent services. Avoid putting business logic in middleware, ESBs, or API gateways.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #00adb5; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Communication Philosophy Comparison</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div style="background: rgba(233, 69, 96, 0.15); padding: 24px; border-radius: 12px; border: 2px solid #e94560;">
      <div style="color: #e94560; font-weight: bold; font-size: 16px; margin-bottom: 16px; text-align: center;">ESB Anti-Pattern (Smart Pipes)</div>
      <div style="color: #475569; font-size: 13px; line-height: 1.8;">
        <div style="padding: 8px; background: #eff6ff; border-radius: 4px; margin-bottom: 8px;">Routing logic in middleware</div>
        <div style="padding: 8px; background: #eff6ff; border-radius: 4px; margin-bottom: 8px;">Transformation in bus</div>
        <div style="padding: 8px; background: #eff6ff; border-radius: 4px; margin-bottom: 8px;">Orchestration in ESB</div>
        <div style="padding: 8px; background: #eff6ff; border-radius: 4px;">Vendor lock-in, centralized bottleneck</div>
      </div>
    </div>
    <div style="background: rgba(0, 173, 181, 0.15); padding: 24px; border-radius: 12px; border: 2px solid #00adb5;">
      <div style="color: #00adb5; font-weight: bold; font-size: 16px; margin-bottom: 16px; text-align: center;">Microservices (Dumb Pipes)</div>
      <div style="color: #475569; font-size: 13px; line-height: 1.8;">
        <div style="padding: 8px; background: #eff6ff; border-radius: 4px; margin-bottom: 8px;">Simple HTTP or message queues</div>
        <div style="padding: 8px; background: #eff6ff; border-radius: 4px; margin-bottom: 8px;">Services own transformation</div>
        <div style="padding: 8px; background: #eff6ff; border-radius: 4px; margin-bottom: 8px;">Choreography or service orchestration</div>
        <div style="padding: 8px; background: #eff6ff; border-radius: 4px;">Decentralized, independently evolvable</div>
      </div>
    </div>
  </div>
</div>

**Where logic CAN live in infrastructure:**
- [[API Gateway]](/system-design/api-gateway): Authentication, rate limiting, SSL termination (cross-cutting concerns, not business logic)
- [[Service Mesh]](/microservices/patterns/service-mesh): mTLS, observability, retries (infrastructure concerns)
- Message Broker: Message routing, dead letters (delivery concerns)

**Where logic must NOT live:**
- Business rules
- Data transformation/enrichment
- Workflow orchestration
- Validation logic

---

## When to Use Microservices: The Decision Framework

### The Microservices Premium

Microservices have significant overhead costs. You must earn the right to use them by having problems that justify the complexity:

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #ffa500; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Microservices Overhead Costs</h4>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
    <div style="background: #eff6ff; padding: 16px; border-radius: 8px;">
      <div style="color: #e94560; font-weight: bold; margin-bottom: 8px;">Operational Complexity</div>
      <div style="color: #475569; font-size: 12px;">N services = N deployments, N monitoring setups, N failure modes, N log aggregations</div>
    </div>
    <div style="background: #eff6ff; padding: 16px; border-radius: 8px;">
      <div style="color: #e94560; font-weight: bold; margin-bottom: 8px;">Network Overhead</div>
      <div style="color: #475569; font-size: 12px;">Latency, serialization, network failures, distributed tracing complexity</div>
    </div>
    <div style="background: #eff6ff; padding: 16px; border-radius: 8px;">
      <div style="color: #e94560; font-weight: bold; margin-bottom: 8px;">Data Consistency</div>
      <div style="color: #475569; font-size: 12px;">No ACID transactions, eventual consistency, saga complexity, debugging difficulty</div>
    </div>
    <div style="background: #eff6ff; padding: 16px; border-radius: 8px;">
      <div style="color: #e94560; font-weight: bold; margin-bottom: 8px;">Testing Complexity</div>
      <div style="color: #475569; font-size: 12px;">Integration tests, contract tests, end-to-end tests, test environment management</div>
    </div>
    <div style="background: #eff6ff; padding: 16px; border-radius: 8px;">
      <div style="color: #e94560; font-weight: bold; margin-bottom: 8px;">Infrastructure Cost</div>
      <div style="color: #475569; font-size: 12px;">Service mesh, API gateway, message brokers, container orchestration, monitoring stack</div>
    </div>
    <div style="background: #eff6ff; padding: 16px; border-radius: 8px;">
      <div style="color: #e94560; font-weight: bold; margin-bottom: 8px;">Cognitive Load</div>
      <div style="color: #475569; font-size: 12px;">Understanding system topology, debugging across services, onboarding new developers</div>
    </div>
  </div>
</div>

### Decision Matrix

| Factor | Favors Monolith | Favors Microservices |
|--------|-----------------|---------------------|
| **Team Size** | < 10 engineers | > 30 engineers, multiple teams |
| **Domain Complexity** | Simple, well-understood | Complex, multiple bounded contexts |
| **Scale Requirements** | Uniform scaling sufficient | Components need independent scaling |
| **Release Cadence** | Monthly releases acceptable | Multiple deploys per day needed |
| **Technology Needs** | Single stack sufficient | Different components need different tech |
| **Organization** | Single team | Multiple autonomous teams |
| **Domain Knowledge** | Still discovering boundaries | Clear, stable domain boundaries |

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border-left: 4px solid #f97316;">
  <div style="color: #ffa500; font-weight: bold; font-size: 16px; margin-bottom: 12px;">Critical Assumption: The Monolith-First Approach</div>
  <div style="color: #475569; font-size: 14px; line-height: 1.7;">
    Martin Fowler recommends starting with a well-modularized monolith and extracting microservices only when you have: (1) clear domain boundaries validated through production usage, (2) team growth requiring organizational decoupling, (3) scaling bottlenecks that cannot be solved by vertical scaling. Premature decomposition leads to distributed monoliths and boundary mistakes that are expensive to fix.
  </div>
</div>

### Real-World Extraction Patterns

```python
# Phase 1: Modular Monolith - Clear internal boundaries
# /monolith/src/
#   /orders/         <- Future microservice
#     __init__.py    <- Public API
#     service.py     <- Business logic
#     repository.py  <- Data access
#     models.py      <- Domain models
#   /inventory/      <- Future microservice
#   /payments/       <- Future microservice

# orders/__init__.py - Only expose public interface
from .service import OrderService
from .models import Order, OrderStatus
__all__ = ['OrderService', 'Order', 'OrderStatus']

# orders/service.py - No direct imports from other modules
class OrderService:
    def __init__(
        self,
        inventory_service,  # Interface, not concrete import
        payment_service,    # Dependency injection
        event_publisher     # For future event-driven
    ):
        self._inventory = inventory_service
        self._payment = payment_service
        self._events = event_publisher

    def place_order(self, order_request):
        # All external module access through interfaces
        inventory_result = self._inventory.reserve(order_request.items)
        # Business logic stays here
        order = Order.create(order_request, inventory_result)
        self._repository.save(order)
        self._events.publish(OrderCreated(order))
        return order

# Phase 2: Extract to separate service when ready
# The interface stays the same - just implementation changes
```

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e94560;">
  <h4 style="color: #e94560; margin: 0 0 16px 0; font-size: 16px;">Interview Questions: When to Use Microservices (3-Level Deep)</h4>

  <div style="margin-bottom: 20px;">
    <div style="color: #00adb5; font-weight: bold; margin-bottom: 8px;">Level 1: When would you choose microservices over a monolith?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 16px; border-left: 2px solid #cbd5e1; margin: 12px 0;">
      When you have multiple teams needing independent deployment, different scaling requirements per component, polyglot technology needs, and well-understood domain boundaries. The organizational need for autonomy often drives the technical decision.
    </div>

    <div style="color: #e94560; font-weight: bold; margin: 16px 0 8px 24px;">Level 2: Your startup has 8 engineers and wants to use microservices for "future scalability." How do you advise them?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 40px; border-left: 2px solid #cbd5e1; margin: 12px 0 12px 24px;">
      Advise against it. With 8 engineers, coordination overhead outweighs benefits. Recommend a modular monolith with clear internal boundaries, dependency injection, and event publishing internally. This provides future extraction paths without current complexity. Microservices are a solution to organizational scaling problems they don't yet have.
    </div>

    <div style="color: #ffa500; font-weight: bold; margin: 16px 0 8px 48px;">Level 3: The company grows to 50 engineers. How do you identify which modules to extract first and in what sequence?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 64px; border-left: 2px solid #cbd5e1; margin: 12px 0 12px 48px;">
      Prioritize extraction by: (1) Team ownership clarity - modules owned by distinct teams extract first, (2) Change frequency - high-churn modules benefit most from independent deployment, (3) Scaling requirements - components needing different scaling extract early, (4) Coupling analysis - use static analysis to find modules with fewest inbound dependencies. Sequence: extract leaf services (few dependencies) first, core services last. Each extraction should reduce coupling for subsequent extractions.
    </div>
  </div>
</div>

---

## Team Organization: Conway's Law in Practice

### Conway's Law

> "Organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations." - Melvin Conway

This isn't just an observation - it's a tool. **Inverse Conway Maneuver**: Design your team structure to get the architecture you want.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #00adb5; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Team Structure vs Architecture Alignment</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div style="background: rgba(233, 69, 96, 0.15); padding: 24px; border-radius: 12px;">
      <div style="color: #e94560; font-weight: bold; font-size: 15px; margin-bottom: 16px; text-align: center;">Misaligned: Component Teams</div>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
        <div style="background: #eff6ff; padding: 10px; border-radius: 6px; text-align: center; color: #475569; font-size: 12px;">Frontend Team</div>
        <div style="background: #eff6ff; padding: 10px; border-radius: 6px; text-align: center; color: #475569; font-size: 12px;">Backend Team</div>
        <div style="background: #eff6ff; padding: 10px; border-radius: 6px; text-align: center; color: #475569; font-size: 12px;">Database Team</div>
      </div>
      <div style="color: #e94560; font-size: 12px; text-align: center;">Every feature requires 3 teams to coordinate</div>
    </div>
    <div style="background: rgba(0, 173, 181, 0.15); padding: 24px; border-radius: 12px;">
      <div style="color: #00adb5; font-weight: bold; font-size: 15px; margin-bottom: 16px; text-align: center;">Aligned: Stream-Aligned Teams</div>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
        <div style="background: #eff6ff; padding: 10px; border-radius: 6px; text-align: center; color: #475569; font-size: 12px;">Orders Team (full stack)</div>
        <div style="background: #eff6ff; padding: 10px; border-radius: 6px; text-align: center; color: #475569; font-size: 12px;">Payments Team (full stack)</div>
        <div style="background: #eff6ff; padding: 10px; border-radius: 6px; text-align: center; color: #475569; font-size: 12px;">Search Team (full stack)</div>
      </div>
      <div style="color: #00adb5; font-size: 12px; text-align: center;">Each team delivers features independently</div>
    </div>
  </div>
</div>

### Team Topologies Model

The Team Topologies framework defines four fundamental team types:

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #ffa500; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Four Team Types</h4>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
    <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 20px; border-radius: 12px;">
      <div style="color: #fff; font-weight: bold; font-size: 14px; margin-bottom: 12px;">Stream-Aligned Teams</div>
      <div style="color: rgba(255,255,255,0.8); font-size: 12px; line-height: 1.6;">
        Primary value-delivery teams. Own one or more services end-to-end. Aligned to business flow (Orders, Checkout, Search). Should be 80%+ of engineering.
      </div>
    </div>
    <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 20px; border-radius: 12px;">
      <div style="color: #fff; font-weight: bold; font-size: 14px; margin-bottom: 12px;">Platform Teams</div>
      <div style="color: rgba(255,255,255,0.8); font-size: 12px; line-height: 1.6;">
        Provide internal platforms as products. Kubernetes, CI/CD, observability. Enable stream-aligned teams through self-service. Minimize cognitive load for feature teams.
      </div>
    </div>
    <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 20px; border-radius: 12px;">
      <div style="color: #fff; font-weight: bold; font-size: 14px; margin-bottom: 12px;">Enabling Teams</div>
      <div style="color: rgba(255,255,255,0.8); font-size: 12px; line-height: 1.6;">
        Help stream-aligned teams adopt new capabilities. Temporary engagement model. Examples: helping adopt Kubernetes, implementing observability. Goal: make themselves unnecessary.
      </div>
    </div>
    <div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); padding: 20px; border-radius: 12px;">
      <div style="color: #fff; font-weight: bold; font-size: 14px; margin-bottom: 12px;">Complicated Subsystem Teams</div>
      <div style="color: rgba(255,255,255,0.8); font-size: 12px; line-height: 1.6;">
        Own complex technical components requiring specialist skills. Examples: ML models, video encoding, compiler. Provide APIs consumed by stream-aligned teams.
      </div>
    </div>
  </div>
</div>

### Team Size: Two-Pizza Rule and Beyond

Amazon's "two-pizza team" (6-10 people) isn't arbitrary. It's based on communication overhead:

**Metcalfe's Law**: Communication paths = n(n-1)/2

| Team Size | Communication Paths | Coordination Overhead |
|-----------|--------------------|-----------------------|
| 5 people | 10 paths | Low - verbal sync works |
| 8 people | 28 paths | Medium - need some structure |
| 12 people | 66 paths | High - meetings dominate |
| 20 people | 190 paths | Unsustainable - must split |

**Optimal microservices team**: 5-8 engineers owning 2-5 services, with full-stack capability (frontend, backend, data, ops).

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border-left: 4px solid #e94560;">
  <div style="color: #e94560; font-weight: bold; font-size: 16px; margin-bottom: 12px;">Critical Trade-off: Team Autonomy vs Consistency</div>
  <div style="color: #475569; font-size: 14px; line-height: 1.7;">
    Full autonomy leads to fragmentation: different logging formats, incompatible error handling, duplicated solutions. But too much standardization kills innovation and creates bottlenecks. Balance through: (1) Mandated standards for cross-cutting concerns (logging format, tracing IDs, error codes), (2) Recommended patterns with escape hatches, (3) Inner-source shared libraries, (4) Architecture Decision Records (ADRs) for transparency.
  </div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e94560;">
  <h4 style="color: #e94560; margin: 0 0 16px 0; font-size: 16px;">Interview Questions: Team Organization (3-Level Deep)</h4>

  <div style="margin-bottom: 20px;">
    <div style="color: #00adb5; font-weight: bold; margin-bottom: 8px;">Level 1: What is Conway's Law and how does it affect microservices architecture?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 16px; border-left: 2px solid #cbd5e1; margin: 12px 0;">
      Conway's Law states that system design mirrors organizational communication structures. For microservices, this means team boundaries should match service boundaries. A team split by technical layers (frontend/backend/DB) will struggle with microservices; teams split by business capability will naturally create aligned services.
    </div>

    <div style="color: #e94560; font-weight: bold; margin: 16px 0 8px 24px;">Level 2: Your organization has 5 services but only 3 teams. Two services have no clear owner. How do you handle this?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 40px; border-left: 2px solid #cbd5e1; margin: 12px 0 12px 24px;">
      Options: (1) Merge unowned services into related owned services - reduce service count to match teams, (2) Assign shared ownership with rotation - but risks "tragedy of the commons", (3) Create virtual team with members from existing teams - temporary for maintenance. Long-term: services should never exceed team capacity. If you can't staff a service, it shouldn't exist separately.
    </div>

    <div style="color: #ffa500; font-weight: bold; margin: 16px 0 8px 48px;">Level 3: How do you handle cross-cutting changes that span multiple teams' services (like adding a new authentication method)?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 64px; border-left: 2px solid #cbd5e1; margin: 12px 0 12px 48px;">
      Pattern depends on change type: (1) For infrastructure changes (new auth), platform team provides library/sidecar, stream teams integrate on their schedule with deadline. (2) For coordinated features, create temporary "virtual team" with representatives from each affected team - they coordinate implementation and return to home teams. (3) Use feature flags for gradual rollout, allowing teams to integrate independently. (4) Establish architectural runway - platform/enabling teams prepare capabilities ahead of stream teams' needs. Key: avoid synchronous dependencies between teams' work.
    </div>
  </div>
</div>

---

## Deployment Strategies: Zero-Downtime Release Patterns

### Strategy Comparison

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #00adb5; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Deployment Strategy Spectrum</h4>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
    <div style="background: #eff6ff; padding: 20px; border-radius: 12px;">
      <div style="color: #1f6feb; font-weight: bold; font-size: 15px; margin-bottom: 12px;">Rolling Deployment</div>
      <div style="color: #475569; font-size: 12px; margin-bottom: 12px;">Gradually replace instances of old version with new version</div>
      <div style="display: flex; gap: 8px; margin-bottom: 12px;">
        <div style="background: #238636; padding: 6px 12px; border-radius: 4px; color: #fff; font-size: 10px;">v2</div>
        <div style="background: #238636; padding: 6px 12px; border-radius: 4px; color: #fff; font-size: 10px;">v2</div>
        <div style="background: #6e7681; padding: 6px 12px; border-radius: 4px; color: #fff; font-size: 10px;">v1</div>
        <div style="background: #6e7681; padding: 6px 12px; border-radius: 4px; color: #fff; font-size: 10px;">v1</div>
      </div>
      <div style="color: #7ee787; font-size: 11px;">+ No extra infrastructure</div>
      <div style="color: #f85149; font-size: 11px;">- Version mixing during rollout</div>
    </div>
    <div style="background: #eff6ff; padding: 20px; border-radius: 12px;">
      <div style="color: #8957e5; font-weight: bold; font-size: 15px; margin-bottom: 12px;">Blue-Green Deployment</div>
      <div style="color: #475569; font-size: 12px; margin-bottom: 12px;">Run two identical environments, switch traffic atomically</div>
      <div style="display: flex; gap: 16px; margin-bottom: 12px;">
        <div style="text-align: center;">
          <div style="background: #1f6feb; padding: 12px; border-radius: 4px; color: #fff; font-size: 10px; margin-bottom: 4px;">Blue (v1)</div>
          <div style="color: #6e7681; font-size: 10px;">standby</div>
        </div>
        <div style="text-align: center;">
          <div style="background: #238636; padding: 12px; border-radius: 4px; color: #fff; font-size: 10px; margin-bottom: 4px;">Green (v2)</div>
          <div style="color: #7ee787; font-size: 10px;">active</div>
        </div>
      </div>
      <div style="color: #7ee787; font-size: 11px;">+ Instant rollback</div>
      <div style="color: #f85149; font-size: 11px;">- 2x infrastructure cost</div>
    </div>
    <div style="background: #eff6ff; padding: 20px; border-radius: 12px;">
      <div style="color: #f78166; font-weight: bold; font-size: 15px; margin-bottom: 12px;">Canary Deployment</div>
      <div style="color: #475569; font-size: 12px; margin-bottom: 12px;">Route small % of traffic to new version, gradually increase</div>
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <div style="background: #6e7681; flex: 9; padding: 8px; border-radius: 4px; color: #fff; font-size: 10px; text-align: center;">v1 (90%)</div>
        <div style="background: #f78166; flex: 1; padding: 8px; border-radius: 4px; color: #fff; font-size: 10px; text-align: center;">v2</div>
      </div>
      <div style="color: #7ee787; font-size: 11px;">+ Early problem detection</div>
      <div style="color: #f85149; font-size: 11px;">- Complex traffic routing</div>
    </div>
    <div style="background: #eff6ff; padding: 20px; border-radius: 12px;">
      <div style="color: #e94560; font-weight: bold; font-size: 15px; margin-bottom: 12px;">Feature Flags</div>
      <div style="color: #475569; font-size: 12px; margin-bottom: 12px;">Deploy code to all, enable features selectively via configuration</div>
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px; font-family: monospace; font-size: 10px; color: #475569; margin-bottom: 12px;">
        if (flags.newCheckout) { ... }
      </div>
      <div style="color: #7ee787; font-size: 11px;">+ Decouple deploy from release</div>
      <div style="color: #f85149; font-size: 11px;">- Code complexity, flag debt</div>
    </div>
  </div>
</div>

### Blue-Green Deployment Deep Dive

```yaml
# Kubernetes Blue-Green with Service switch
# blue-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-blue
  labels:
    app: myapp
    version: blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      version: blue
  template:
    metadata:
      labels:
        app: myapp
        version: blue
    spec:
      containers:
      - name: myapp
        image: myapp:1.0.0
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5
---
# green-deployment.yaml (new version)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-green
  labels:
    app: myapp
    version: green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      version: green
  template:
    metadata:
      labels:
        app: myapp
        version: green
    spec:
      containers:
      - name: myapp
        image: myapp:2.0.0
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
---
# service.yaml - Switch by changing selector
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector:
    app: myapp
    version: green  # Change to 'blue' to rollback
  ports:
  - port: 80
    targetPort: 8080
```

**Blue-Green Database Challenge**: The hardest part is database schema changes. Solutions:

1. **Expand-Contract Pattern**:
   - Phase 1: Add new columns/tables (backward compatible)
   - Phase 2: Deploy application using new schema
   - Phase 3: Migrate data
   - Phase 4: Remove old columns/tables

2. **Database per Environment**: Expensive but cleanest - each color has own database with sync

### Canary Deployment with Automated Rollback

```python
# Canary deployment controller
class CanaryController:
    def __init__(self, metrics_client, deployment_client):
        self.metrics = metrics_client
        self.deploy = deployment_client

    async def progressive_rollout(
        self,
        service: str,
        new_version: str,
        stages: list[CanaryStage]
    ):
        """
        Progressive canary with automatic rollback
        stages = [
            CanaryStage(traffic_pct=1, duration_min=5, error_threshold=0.01),
            CanaryStage(traffic_pct=10, duration_min=15, error_threshold=0.01),
            CanaryStage(traffic_pct=50, duration_min=30, error_threshold=0.005),
            CanaryStage(traffic_pct=100, duration_min=0, error_threshold=0.005),
        ]
        """
        for stage in stages:
            logger.info(f"Canary stage: {stage.traffic_pct}% traffic to {new_version}")

            # Shift traffic
            await self.deploy.set_traffic_split(
                service,
                canary_version=new_version,
                canary_percent=stage.traffic_pct
            )

            # Monitor for stage duration
            if stage.duration_min > 0:
                healthy = await self._monitor_health(
                    service,
                    new_version,
                    duration_minutes=stage.duration_min,
                    error_threshold=stage.error_threshold
                )

                if not healthy:
                    logger.error(f"Canary failed at {stage.traffic_pct}%, rolling back")
                    await self._rollback(service, new_version)
                    raise CanaryFailedError(service, new_version, stage)

        logger.info(f"Canary successful, {new_version} is now production")
        await self.deploy.promote_canary(service, new_version)

    async def _monitor_health(
        self,
        service: str,
        version: str,
        duration_minutes: int,
        error_threshold: float
    ) -> bool:
        """Monitor error rate, latency, and custom metrics"""
        end_time = datetime.now() + timedelta(minutes=duration_minutes)

        while datetime.now() < end_time:
            metrics = await self.metrics.query(
                service=service,
                version=version,
                window_minutes=5
            )

            # Check error rate
            if metrics.error_rate > error_threshold:
                logger.warning(f"Error rate {metrics.error_rate} exceeds threshold")
                return False

            # Check latency regression
            baseline = await self.metrics.get_baseline(service)
            if metrics.p99_latency > baseline.p99_latency * 1.5:
                logger.warning(f"Latency regression: {metrics.p99_latency}ms")
                return False

            # Check custom business metrics
            if metrics.conversion_rate < baseline.conversion_rate * 0.95:
                logger.warning("Conversion rate dropped")
                return False

            await asyncio.sleep(30)

        return True
```

### GitOps Deployment Pipeline

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #00adb5; margin: 0 0 24px 0; text-align: center; font-size: 18px;">GitOps Deployment Flow</h4>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #1f6feb; padding: 16px 24px; border-radius: 8px; color: #fff; font-size: 13px; min-width: 140px; text-align: center;">Developer Push</div>
      <div style="color: #00adb5; font-size: 20px;">-></div>
      <div style="background: #eff6ff; padding: 12px; border-radius: 8px; color: #475569; font-size: 12px; flex: 1;">git push triggers CI pipeline</div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #8957e5; padding: 16px 24px; border-radius: 8px; color: #fff; font-size: 13px; min-width: 140px; text-align: center;">CI Pipeline</div>
      <div style="color: #00adb5; font-size: 20px;">-></div>
      <div style="background: #eff6ff; padding: 12px; border-radius: 8px; color: #475569; font-size: 12px; flex: 1;">Test, build image, push to registry, update manifest repo</div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #238636; padding: 16px 24px; border-radius: 8px; color: #fff; font-size: 13px; min-width: 140px; text-align: center;">GitOps Agent</div>
      <div style="color: #00adb5; font-size: 20px;">-></div>
      <div style="background: #eff6ff; padding: 12px; border-radius: 8px; color: #475569; font-size: 12px; flex: 1;">ArgoCD/Flux detects manifest change, syncs to cluster</div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #f78166; padding: 16px 24px; border-radius: 8px; color: #fff; font-size: 13px; min-width: 140px; text-align: center;">Kubernetes</div>
      <div style="color: #00adb5; font-size: 20px;">-></div>
      <div style="background: #eff6ff; padding: 12px; border-radius: 8px; color: #475569; font-size: 12px; flex: 1;">Rolling update with health checks, automatic rollback on failure</div>
    </div>
  </div>
  <div style="background: rgba(0, 173, 181, 0.1); padding: 16px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #00adb5;">
    <div style="color: #00adb5; font-weight: bold; margin-bottom: 8px;">Key Principle</div>
    <div style="color: #475569; font-size: 13px;">Git is the single source of truth. All changes go through git. Cluster state converges to git state. Audit trail is automatic.</div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e94560;">
  <h4 style="color: #e94560; margin: 0 0 16px 0; font-size: 16px;">Interview Questions: Deployment Strategies (3-Level Deep)</h4>

  <div style="margin-bottom: 20px;">
    <div style="color: #00adb5; font-weight: bold; margin-bottom: 8px;">Level 1: What is the difference between blue-green and canary deployments?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 16px; border-left: 2px solid #cbd5e1; margin: 12px 0;">
      Blue-green runs two complete environments and switches all traffic atomically. Canary gradually shifts traffic percentage to new version while monitoring metrics. Blue-green is simpler but costs 2x resources; canary catches issues with smaller blast radius but requires sophisticated traffic routing and monitoring.
    </div>

    <div style="color: #e94560; font-weight: bold; margin: 16px 0 8px 24px;">Level 2: How do you handle database migrations in a blue-green deployment where both versions need different schemas?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 40px; border-left: 2px solid #cbd5e1; margin: 12px 0 12px 24px;">
      Use the expand-contract (parallel change) pattern: (1) Expand: add new columns without removing old ones, make schema backward compatible. (2) Deploy new application version reading/writing both old and new schema. (3) Migrate: backfill new columns from old data. (4) Contract: after successful cutover, remove old columns. This allows both blue and green to work with the same database during transition.
    </div>

    <div style="color: #ffa500; font-weight: bold; margin: 16px 0 8px 48px;">Level 3: During a canary deployment, you discover the new version has a subtle bug that only affects 0.1% of users with a specific data pattern. Your metrics show overall error rates are within threshold. How do you catch this?</div>
    <div style="color: #475569; font-size: 13px; padding-left: 64px; border-left: 2px solid #cbd5e1; margin: 12px 0 12px 48px;">
      Aggregate metrics miss long-tail issues. Solutions: (1) Segment metrics by customer cohorts, device types, data characteristics - monitor each segment separately. (2) Implement anomaly detection that flags unusual patterns even within thresholds. (3) Use log analysis for error clustering - new error signatures trigger alerts. (4) Shadow testing: run canary in parallel processing same requests as production and compare outputs. (5) Real user monitoring (RUM) with user feedback channels. (6) Staged canary targeting: first roll out to internal users, then beta users, then general population.
    </div>
  </div>
</div>

---

## Common Anti-Patterns and How to Avoid Them

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e94560;">
  <h4 style="color: #e94560; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Microservices Anti-Patterns</h4>
  <div style="display: grid; gap: 16px;">
    <div style="background: rgba(233, 69, 96, 0.15); padding: 20px; border-radius: 12px; display: grid; grid-template-columns: 1fr 2fr; gap: 20px;">
      <div>
        <div style="color: #e94560; font-weight: bold; margin-bottom: 8px;">Distributed Monolith</div>
        <div style="color: #64748b; font-size: 12px;">Services are separated but still tightly coupled</div>
      </div>
      <div style="color: #475569; font-size: 13px;">
        <strong>Symptoms:</strong> Can't deploy one service without deploying others. Services share database. Synchronous call chains of 5+ services. All services must be up for system to work.<br/>
        <strong>Fix:</strong> Identify true boundaries, merge over-split services, introduce async communication, embrace eventual consistency.
      </div>
    </div>
    <div style="background: rgba(255, 165, 0, 0.15); padding: 20px; border-radius: 12px; display: grid; grid-template-columns: 1fr 2fr; gap: 20px;">
      <div>
        <div style="color: #ffa500; font-weight: bold; margin-bottom: 8px;">Shared Database</div>
        <div style="color: #64748b; font-size: 12px;">Multiple services accessing same database</div>
      </div>
      <div style="color: #475569; font-size: 13px;">
        <strong>Symptoms:</strong> Schema changes require coordinating multiple teams. No clear data ownership. Performance issues affect all services. Can't choose optimal database per service.<br/>
        <strong>Fix:</strong> Define data ownership, create service APIs for data access, replicate needed data via events.
      </div>
    </div>
    <div style="background: rgba(0, 173, 181, 0.15); padding: 20px; border-radius: 12px; display: grid; grid-template-columns: 1fr 2fr; gap: 20px;">
      <div>
        <div style="color: #00adb5; font-weight: bold; margin-bottom: 8px;">Chatty Services</div>
        <div style="color: #64748b; font-size: 12px;">Excessive inter-service communication</div>
      </div>
      <div style="color: #475569; font-size: 13px;">
        <strong>Symptoms:</strong> High latency due to network round trips. N+1 query patterns across services. Single user action triggers dozens of service calls.<br/>
        <strong>Fix:</strong> Batch APIs, data replication for read-heavy paths, coarser service boundaries, [[CQRS]](/microservices/patterns/cqrs) for queries.
      </div>
    </div>
    <div style="background: rgba(143, 87, 229, 0.15); padding: 20px; border-radius: 12px; display: grid; grid-template-columns: 1fr 2fr; gap: 20px;">
      <div>
        <div style="color: #8957e5; font-weight: bold; margin-bottom: 8px;">Missing Observability</div>
        <div style="color: #64748b; font-size: 12px;">Can't trace requests across services</div>
      </div>
      <div style="color: #475569; font-size: 13px;">
        <strong>Symptoms:</strong> Debugging requires checking logs in multiple places. Can't understand call patterns. No visibility into cross-service latency breakdown.<br/>
        <strong>Fix:</strong> Implement [[distributed tracing]](/observability/distributed-tracing) (Jaeger, Zipkin), structured logging with correlation IDs, centralized metrics.
      </div>
    </div>
  </div>
</div>

---

## Key Takeaways

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border-left: 4px solid #00adb5;">
  <div style="color: #00adb5; font-weight: bold; font-size: 16px; margin-bottom: 16px;">Essential Principles to Remember</div>
  <div style="color: #475569; font-size: 14px; line-height: 2;">
    <div><strong style="color: #e94560;">1.</strong> Microservices solve organizational scaling problems first, technical problems second</div>
    <div><strong style="color: #e94560;">2.</strong> Conway's Law is a tool - design team structure to get desired architecture</div>
    <div><strong style="color: #e94560;">3.</strong> Start monolith, extract services when you have proven domain boundaries</div>
    <div><strong style="color: #e94560;">4.</strong> Each service owns its data completely - no shared databases</div>
    <div><strong style="color: #e94560;">5.</strong> Design for failure from day one - circuit breakers, bulkheads, timeouts</div>
    <div><strong style="color: #e94560;">6.</strong> Deployment strategy depends on risk tolerance and infrastructure capability</div>
    <div><strong style="color: #e94560;">7.</strong> Observability is not optional - distributed tracing, centralized logging, metrics</div>
    <div><strong style="color: #e94560;">8.</strong> The goal is independent deployability - if you can't deploy independently, you don't have microservices</div>
  </div>
</div>

            ---

            ## Related Topics

            - [[Service Mesh]](/microservices/patterns/service-mesh) - Infrastructure layer for service-to-service communication
            - [[Saga Pattern]](/microservices/patterns/saga) - Managing distributed transactions
            - [[API Gateway]](/system-design/api-gateway) - Entry point and cross-cutting concerns
            - [[Event-Driven Architecture]](/microservices/patterns/event-driven) - Async communication patterns
            - [[CQRS]](/microservices/patterns/cqrs) - Command Query Responsibility Segregation
            - [[Distributed Tracing]](/observability/distributed-tracing) - Request flow visibility
            - [[Domain-Driven Design]](/architecture/ddd) - Strategic design for service boundaries
