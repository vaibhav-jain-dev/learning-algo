# Microservices Architecture

## The Restaurant Kitchen Analogy

Imagine a small restaurant where one chef does everything - takes orders, preps ingredients, cooks, plates, and cleans. This works great with few customers. But when the restaurant gets popular, everything bottlenecks on that one person. If they get sick, the entire restaurant closes.

Now imagine a large restaurant kitchen: one station for appetizers, another for entrees, a dedicated pastry chef, and prep cooks. Each station operates independently, specializes in their craft, and can scale (add more cooks) based on demand. If the dessert station breaks down, customers can still get their main courses.

**That's the difference between monolithic and microservices architecture.**

---

## Real-World Context: How Netflix Transformed

In 2008, Netflix had a massive database corruption that took down their entire service for three days. Their monolithic architecture meant one failure cascaded everywhere. This near-death experience triggered their famous migration to microservices.

Today, Netflix runs over **1,000 microservices** handling 2 billion API requests daily. Each service - recommendations, user profiles, streaming, billing - operates independently. When their recommendation engine has issues, you can still watch videos.

<div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #dee2e6;">
<h4 style="color: #495057; margin: 0 0 24px 0; text-align: center; font-size: 18px;">MONOLITH vs MICROSERVICES</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #fff; border-radius: 12px; padding: 24px; border: 2px solid #adb5bd;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
<div style="width: 12px; height: 12px; background: #868e96; border-radius: 50%;"></div>
<span style="color: #495057; font-weight: 600;">Monolith</span>
</div>
<div style="background: #f8f9fa; border: 2px solid #dee2e6; border-radius: 12px; padding: 20px;">
<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 16px;">
<div style="background: #e7f5ff; padding: 8px 16px; border-radius: 6px; color: #1971c2; font-size: 13px; border: 1px solid #a5d8ff;">Users</div>
<div style="background: #f3f0ff; padding: 8px 16px; border-radius: 6px; color: #7048e8; font-size: 13px; border: 1px solid #d0bfff;">Orders</div>
<div style="background: #e6fcf5; padding: 8px 16px; border-radius: 6px; color: #0ca678; font-size: 13px; border: 1px solid #96f2d7;">Inventory</div>
</div>
<div style="background: #fff5f5; border: 1px solid #ffc9c9; padding: 12px; border-radius: 8px; text-align: center;">
<span style="color: #e03131; font-size: 13px;">Single Database</span>
</div>
</div>
<div style="text-align: center; margin-top: 12px; color: #868e96; font-size: 12px;">
One codebase, one deployment, one failure point
</div>
</div>
<div style="background: #fff; border-radius: 12px; padding: 24px; border: 2px solid #51cf66;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
<div style="width: 12px; height: 12px; background: #51cf66; border-radius: 50%;"></div>
<span style="color: #2f9e44; font-weight: 600;">Microservices</span>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
<div style="text-align: center;">
<div style="background: #e7f5ff; border: 2px solid #74c0fc; padding: 12px 8px; border-radius: 8px; color: #1971c2; font-size: 11px; margin-bottom: 8px;">
Users<br/>Service
</div>
<div style="background: #f8f9fa; border: 1px solid #dee2e6; padding: 8px; border-radius: 6px; color: #868e96; font-size: 10px;">
User DB
</div>
</div>
<div style="text-align: center;">
<div style="background: #f3f0ff; border: 2px solid #b197fc; padding: 12px 8px; border-radius: 8px; color: #7048e8; font-size: 11px; margin-bottom: 8px;">
Orders<br/>Service
</div>
<div style="background: #f8f9fa; border: 1px solid #dee2e6; padding: 8px; border-radius: 6px; color: #868e96; font-size: 10px;">
Order DB
</div>
</div>
<div style="text-align: center;">
<div style="background: #e6fcf5; border: 2px solid #63e6be; padding: 12px 8px; border-radius: 8px; color: #0ca678; font-size: 11px; margin-bottom: 8px;">
Inventory<br/>Service
</div>
<div style="background: #f8f9fa; border: 1px solid #dee2e6; padding: 8px; border-radius: 6px; color: #868e96; font-size: 10px;">
Inv DB
</div>
</div>
</div>
<div style="text-align: center; margin-top: 12px; color: #868e96; font-size: 12px;">
Independent deployment, isolated failures
</div>
</div>
</div>
</div>

---

## Core Principles

### 1. Single Responsibility
Each service does ONE thing well - like a specialist doctor vs a general practitioner.

**Amazon Example**: Amazon has separate services for cart, checkout, recommendations, reviews, and inventory. The team that owns "Add to Cart" doesn't touch payment processing.

### 2. Database Per Service
Each service owns its data completely - no shared databases.

**Why this matters**: When Uber's ride-matching service needs to change its database schema, it shouldn't require coordinating with the payment team.

### 3. Smart Endpoints, Dumb Pipes
Services communicate through simple protocols (HTTP/gRPC). The intelligence lives in the services, not the message broker.

### 4. Design for Failure
Assume everything will fail. Netflix's famous Chaos Monkey randomly kills production services to ensure teams build resilient systems.

---

## Service Communication Patterns

<div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #dee2e6;">
<h4 style="color: #495057; margin: 0 0 24px 0; text-align: center;">COMMUNICATION PATTERNS</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #e7f5ff; border-radius: 12px; padding: 20px; border: 1px solid #a5d8ff;">
<div style="color: #1971c2; font-weight: 600; margin-bottom: 12px;">Synchronous (Request-Response)</div>
<div style="color: #495057; font-size: 13px; margin-bottom: 12px;">Service A waits for Service B's response</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 12px;">
Order Service --> User Service<br/>
"Get user #123"<br/>
<-- Returns user data
</div>
<div style="margin-top: 12px; font-size: 12px;">
<span style="color: #2f9e44;">Best for:</span> <span style="color: #495057;">Real-time queries, simple flows</span>
</div>
</div>
<div style="background: #fff4e6; border-radius: 12px; padding: 20px; border: 1px solid #ffd8a8;">
<div style="color: #e8590c; font-weight: 600; margin-bottom: 12px;">Asynchronous (Event-Driven)</div>
<div style="color: #495057; font-size: 13px; margin-bottom: 12px;">Service A publishes event, doesn't wait</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 12px;">
Order Service --> Event Bus<br/>
"OrderCreated event"<br/>
Inventory, Email, Analytics listen
</div>
<div style="margin-top: 12px; font-size: 12px;">
<span style="color: #2f9e44;">Best for:</span> <span style="color: #495057;">Decoupling, high throughput</span>
</div>
</div>
</div>
</div>

### Python Implementation: Event-Driven Communication

```python
import json
import redis
from dataclasses import dataclass, asdict
from typing import Callable, Dict, List
from datetime import datetime

@dataclass
class Event:
    """Base event class for all domain events"""
    event_type: str
    timestamp: str
    data: dict

    def to_json(self) -> str:
        return json.dumps(asdict(self))

    @classmethod
    def from_json(cls, json_str: str) -> 'Event':
        return cls(**json.loads(json_str))

class EventBus:
    """
    Simple event bus using Redis pub/sub
    Used by: Uber for ride events, Shopify for order events
    """
    def __init__(self, redis_url: str = "redis://localhost:6379"):
        self.redis = redis.from_url(redis_url)
        self.pubsub = self.redis.pubsub()
        self.handlers: Dict[str, List[Callable]] = {}

    def publish(self, event: Event) -> None:
        """Publish event to all subscribers"""
        channel = event.event_type
        self.redis.publish(channel, event.to_json())
        print(f"Published: {event.event_type}")

    def subscribe(self, event_type: str, handler: Callable) -> None:
        """Register handler for event type"""
        if event_type not in self.handlers:
            self.handlers[event_type] = []
            self.pubsub.subscribe(event_type)
        self.handlers[event_type].append(handler)

    def start_listening(self) -> None:
        """Start processing events (run in separate thread)"""
        for message in self.pubsub.listen():
            if message['type'] == 'message':
                event = Event.from_json(message['data'])
                for handler in self.handlers.get(event.event_type, []):
                    try:
                        handler(event)
                    except Exception as e:
                        print(f"Handler error: {e}")

# Order Service - publishes events
class OrderService:
    def __init__(self, event_bus: EventBus):
        self.event_bus = event_bus
        self.orders = {}

    def create_order(self, user_id: str, items: list, total: float) -> dict:
        order_id = f"order_{len(self.orders) + 1}"
        order = {
            "id": order_id,
            "user_id": user_id,
            "items": items,
            "total": total,
            "status": "created"
        }
        self.orders[order_id] = order

        # Publish event - other services react
        self.event_bus.publish(Event(
            event_type="order.created",
            timestamp=datetime.utcnow().isoformat(),
            data=order
        ))

        return order

# Inventory Service - subscribes to order events
class InventoryService:
    def __init__(self, event_bus: EventBus):
        self.inventory = {"item_1": 100, "item_2": 50}
        event_bus.subscribe("order.created", self.handle_order_created)

    def handle_order_created(self, event: Event) -> None:
        """Reserve inventory when order is created"""
        for item in event.data["items"]:
            item_id = item["product_id"]
            quantity = item["quantity"]
            if self.inventory.get(item_id, 0) >= quantity:
                self.inventory[item_id] -= quantity
                print(f"Reserved {quantity} of {item_id}")
            else:
                print(f"Insufficient inventory for {item_id}")

# Notification Service - also subscribes
class NotificationService:
    def __init__(self, event_bus: EventBus):
        event_bus.subscribe("order.created", self.handle_order_created)

    def handle_order_created(self, event: Event) -> None:
        """Send confirmation email when order is created"""
        user_id = event.data["user_id"]
        order_id = event.data["id"]
        print(f"Sending email to {user_id} for order {order_id}")

# Usage
event_bus = EventBus()
order_service = OrderService(event_bus)
inventory_service = InventoryService(event_bus)
notification_service = NotificationService(event_bus)

# When order is created, both services react automatically
order = order_service.create_order(
    user_id="user_123",
    items=[{"product_id": "item_1", "quantity": 2}],
    total=99.99
)
```

---

## The Circuit Breaker Pattern

**The Analogy**: Electrical circuit breakers trip when there's too much current, preventing house fires. Software circuit breakers "trip" when a service is failing, preventing cascade failures.

<div style="background: linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #ffc9c9;">
<h4 style="color: #c92a2a; margin: 0 0 24px 0; text-align: center;">CIRCUIT BREAKER STATES</h4>
<div style="display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap;">
<div style="text-align: center;">
<div style="background: #d3f9d8; border: 3px solid #51cf66; border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
<span style="color: #2f9e44; font-weight: bold; font-size: 12px;">CLOSED</span>
</div>
<div style="color: #495057; font-size: 12px; margin-top: 8px;">Normal flow</div>
</div>
<div style="color: #868e96; font-size: 24px;">--></div>
<div style="text-align: center;">
<div style="background: #ffe3e3; border: 3px solid #ff6b6b; border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
<span style="color: #c92a2a; font-weight: bold; font-size: 12px;">OPEN</span>
</div>
<div style="color: #495057; font-size: 12px; margin-top: 8px;">Fail fast</div>
</div>
<div style="color: #868e96; font-size: 24px;">--></div>
<div style="text-align: center;">
<div style="background: #fff3bf; border: 3px solid #fab005; border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
<span style="color: #e67700; font-weight: bold; font-size: 11px;">HALF-OPEN</span>
</div>
<div style="color: #495057; font-size: 12px; margin-top: 8px;">Test recovery</div>
</div>
</div>
</div>

### Python Implementation: Production Circuit Breaker

```python
import time
from enum import Enum
from threading import Lock
from typing import Callable, Any, Optional
from functools import wraps

class CircuitState(Enum):
    CLOSED = "closed"      # Normal operation
    OPEN = "open"          # Failing fast
    HALF_OPEN = "half_open"  # Testing recovery

class CircuitBreaker:
    """
    Production-grade circuit breaker
    Similar to Netflix Hystrix, Resilience4j
    """
    def __init__(
        self,
        failure_threshold: int = 5,
        recovery_timeout: int = 30,
        half_open_max_calls: int = 3
    ):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.half_open_max_calls = half_open_max_calls

        self.state = CircuitState.CLOSED
        self.failures = 0
        self.successes = 0
        self.last_failure_time: Optional[float] = None
        self.half_open_calls = 0
        self.lock = Lock()

    def call(self, func: Callable, *args, **kwargs) -> Any:
        """Execute function with circuit breaker protection"""
        with self.lock:
            if self.state == CircuitState.OPEN:
                if self._should_attempt_reset():
                    self.state = CircuitState.HALF_OPEN
                    self.half_open_calls = 0
                else:
                    raise CircuitOpenError(
                        f"Circuit is OPEN. Retry after {self._time_until_retry():.1f}s"
                    )

            if self.state == CircuitState.HALF_OPEN:
                if self.half_open_calls >= self.half_open_max_calls:
                    raise CircuitOpenError("Circuit HALF_OPEN: max test calls reached")
                self.half_open_calls += 1

        try:
            result = func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise

    def _should_attempt_reset(self) -> bool:
        return (
            self.last_failure_time is not None and
            time.time() - self.last_failure_time >= self.recovery_timeout
        )

    def _time_until_retry(self) -> float:
        if self.last_failure_time is None:
            return 0
        elapsed = time.time() - self.last_failure_time
        return max(0, self.recovery_timeout - elapsed)

    def _on_success(self) -> None:
        with self.lock:
            if self.state == CircuitState.HALF_OPEN:
                self.successes += 1
                if self.successes >= self.half_open_max_calls:
                    self._reset()
            elif self.state == CircuitState.CLOSED:
                self.failures = 0

    def _on_failure(self) -> None:
        with self.lock:
            self.failures += 1
            self.last_failure_time = time.time()

            if self.state == CircuitState.HALF_OPEN:
                self._trip()
            elif self.failures >= self.failure_threshold:
                self._trip()

    def _trip(self) -> None:
        self.state = CircuitState.OPEN
        print(f"Circuit TRIPPED - now OPEN")

    def _reset(self) -> None:
        self.state = CircuitState.CLOSED
        self.failures = 0
        self.successes = 0
        print(f"Circuit RESET - now CLOSED")

class CircuitOpenError(Exception):
    pass

# Decorator for easy use
def circuit_breaker(breaker: CircuitBreaker):
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs):
            return breaker.call(func, *args, **kwargs)
        return wrapper
    return decorator

# Usage example
user_service_breaker = CircuitBreaker(failure_threshold=3, recovery_timeout=10)

@circuit_breaker(user_service_breaker)
def get_user_from_service(user_id: str) -> dict:
    """Call external user service"""
    import requests
    response = requests.get(f"http://user-service/users/{user_id}", timeout=5)
    response.raise_for_status()
    return response.json()

# With fallback
def get_user_with_fallback(user_id: str) -> dict:
    try:
        return get_user_from_service(user_id)
    except CircuitOpenError:
        # Return cached data when circuit is open
        return get_cached_user(user_id)
    except Exception:
        return {"id": user_id, "name": "Unknown", "cached": True}
```

---

## The Saga Pattern: Distributed Transactions

**The Problem**: In a monolith, you wrap multiple operations in a database transaction. With microservices, each service has its own database - traditional transactions don't work across service boundaries.

**The Solution**: Saga pattern - a sequence of local transactions where each step has a compensating action for rollback.

<div style="background: linear-gradient(135deg, #f3f0ff 0%, #e5dbff 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #d0bfff;">
<h4 style="color: #7048e8; margin: 0 0 24px 0; text-align: center;">SAGA PATTERN: ORDER PROCESSING</h4>
<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #d3f9d8; padding: 12px 20px; border-radius: 8px; color: #2f9e44; min-width: 150px; text-align: center;">1. Create Order</div>
<span style="color: #868e96;">--></span>
<div style="background: #ffe3e3; padding: 8px 16px; border-radius: 6px; color: #c92a2a; font-size: 12px;">Compensate: Cancel Order</div>
</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #e7f5ff; padding: 12px 20px; border-radius: 8px; color: #1971c2; min-width: 150px; text-align: center;">2. Reserve Stock</div>
<span style="color: #868e96;">--></span>
<div style="background: #ffe3e3; padding: 8px 16px; border-radius: 6px; color: #c92a2a; font-size: 12px;">Compensate: Release Stock</div>
</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #fff3bf; padding: 12px 20px; border-radius: 8px; color: #e67700; min-width: 150px; text-align: center;">3. Charge Payment</div>
<span style="color: #868e96;">--></span>
<div style="background: #ffe3e3; padding: 8px 16px; border-radius: 6px; color: #c92a2a; font-size: 12px;">Compensate: Refund Payment</div>
</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #d3f9d8; padding: 12px 20px; border-radius: 8px; color: #2f9e44; min-width: 150px; text-align: center;">4. Ship Order</div>
<span style="color: #868e96;">--></span>
<div style="background: #f8f9fa; padding: 8px 16px; border-radius: 6px; color: #868e96; font-size: 12px;">Final step - no compensation</div>
</div>
</div>
</div>

### Python Implementation: Saga Orchestrator

```python
from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from enum import Enum

class SagaStatus(Enum):
    PENDING = "pending"
    EXECUTING = "executing"
    COMPLETED = "completed"
    COMPENSATING = "compensating"
    FAILED = "failed"

@dataclass
class SagaStep:
    name: str
    execute: callable
    compensate: callable

class SagaOrchestrator:
    """
    Orchestration-based saga pattern
    Used by: Uber (trip booking), Airbnb (reservation)
    """
    def __init__(self, steps: List[SagaStep]):
        self.steps = steps
        self.status = SagaStatus.PENDING
        self.completed_steps: List[SagaStep] = []
        self.context: Dict[str, Any] = {}

    def execute(self, initial_context: Dict[str, Any]) -> Dict[str, Any]:
        """Execute saga steps in order, compensate on failure"""
        self.context = initial_context.copy()
        self.status = SagaStatus.EXECUTING

        for step in self.steps:
            try:
                print(f"Executing: {step.name}")
                result = step.execute(self.context)
                self.context.update(result or {})
                self.completed_steps.append(step)
            except Exception as e:
                print(f"Step '{step.name}' failed: {e}")
                self._compensate()
                self.status = SagaStatus.FAILED
                raise SagaFailedError(f"Saga failed at '{step.name}': {e}")

        self.status = SagaStatus.COMPLETED
        return self.context

    def _compensate(self) -> None:
        """Execute compensating transactions in reverse order"""
        self.status = SagaStatus.COMPENSATING
        print("Starting compensation...")

        for step in reversed(self.completed_steps):
            try:
                print(f"Compensating: {step.name}")
                step.compensate(self.context)
            except Exception as e:
                # Log but continue - compensation must complete
                print(f"Compensation failed for '{step.name}': {e}")

class SagaFailedError(Exception):
    pass

# Real-world example: E-commerce order saga
class OrderSaga:
    def __init__(self, order_service, inventory_service, payment_service, shipping_service):
        self.saga = SagaOrchestrator([
            SagaStep(
                name="create_order",
                execute=lambda ctx: self._create_order(ctx, order_service),
                compensate=lambda ctx: self._cancel_order(ctx, order_service)
            ),
            SagaStep(
                name="reserve_inventory",
                execute=lambda ctx: self._reserve_inventory(ctx, inventory_service),
                compensate=lambda ctx: self._release_inventory(ctx, inventory_service)
            ),
            SagaStep(
                name="process_payment",
                execute=lambda ctx: self._process_payment(ctx, payment_service),
                compensate=lambda ctx: self._refund_payment(ctx, payment_service)
            ),
            SagaStep(
                name="schedule_shipping",
                execute=lambda ctx: self._schedule_shipping(ctx, shipping_service),
                compensate=lambda ctx: None  # Final step - no compensation
            )
        ])

    def _create_order(self, ctx, service) -> dict:
        order = service.create(ctx['user_id'], ctx['items'])
        return {'order_id': order['id']}

    def _cancel_order(self, ctx, service) -> None:
        service.cancel(ctx['order_id'])

    def _reserve_inventory(self, ctx, service) -> dict:
        reservation = service.reserve(ctx['items'])
        return {'reservation_id': reservation['id']}

    def _release_inventory(self, ctx, service) -> None:
        service.release(ctx['reservation_id'])

    def _process_payment(self, ctx, service) -> dict:
        payment = service.charge(ctx['user_id'], ctx['total'])
        return {'payment_id': payment['id']}

    def _refund_payment(self, ctx, service) -> None:
        service.refund(ctx['payment_id'])

    def _schedule_shipping(self, ctx, service) -> dict:
        shipment = service.schedule(ctx['order_id'], ctx['address'])
        return {'shipment_id': shipment['id']}

    def process_order(self, user_id: str, items: list, total: float, address: str) -> dict:
        return self.saga.execute({
            'user_id': user_id,
            'items': items,
            'total': total,
            'address': address
        })
```

---

## Failure Stories and Lessons

### Amazon's 2017 S3 Outage
A typo in a command took down a major portion of the internet. **Lesson**: Even giants fail. Design for failure, implement chaos engineering, and have runbooks.

### Knight Capital's $440M Loss (2012)
A deployment issue with their trading microservices caused erratic trades. **Lesson**: Feature flags, canary deployments, and instant rollback capabilities are essential.

### Uber's Microservices Migration Pain
Uber grew from monolith to 2,200+ microservices. They learned that too many services creates operational nightmare. **Lesson**: Don't create a "distributed monolith" - services should be cohesive.

---

## Interview Questions with Detailed Answers

<div style="background: linear-gradient(135deg, #e7f5ff 0%, #d0ebff 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #a5d8ff;">
<h4 style="color: #1971c2; margin: 0 0 20px 0;">COMMON INTERVIEW QUESTIONS</h4>

<div style="margin-bottom: 20px;">
<p style="color: #495057; font-weight: 600; margin-bottom: 8px;">Q1: How do you handle data consistency across microservices?</p>
<p style="color: #495057; font-size: 14px; background: #fff; padding: 12px; border-radius: 8px;">
<strong>Answer:</strong> Use eventual consistency with sagas for distributed transactions. Implement the Outbox Pattern - write events to a local outbox table in the same transaction as business data, then publish events asynchronously. For queries spanning services, use CQRS with event-driven data synchronization. Accept that strong consistency across services is often impractical - design business processes to tolerate eventual consistency.
</p>
</div>

<div style="margin-bottom: 20px;">
<p style="color: #495057; font-weight: 600; margin-bottom: 8px;">Q2: When should you NOT use microservices?</p>
<p style="color: #495057; font-size: 14px; background: #fff; padding: 12px; border-radius: 8px;">
<strong>Answer:</strong> Avoid microservices when: (1) Small team (<10 devs) - operational overhead isn't worth it, (2) Unclear domain boundaries - you'll create wrong service boundaries, (3) Tight deadlines - monolith is faster to build initially, (4) Performance-critical tight coupling - network latency adds up, (5) Early-stage startups - you need speed, not distributed complexity.
</p>
</div>

<div style="margin-bottom: 20px;">
<p style="color: #495057; font-weight: 600; margin-bottom: 8px;">Q3: How do you debug issues across multiple services?</p>
<p style="color: #495057; font-size: 14px; background: #fff; padding: 12px; border-radius: 8px;">
<strong>Answer:</strong> Implement distributed tracing (Jaeger, Zipkin) with correlation IDs passed through all service calls. Use structured logging with consistent formats. Aggregate logs centrally (ELK Stack, Datadog). Add service mesh (Istio) for visibility into service-to-service traffic. Create dashboards showing request flow and latency at each hop.
</p>
</div>

<div>
<p style="color: #495057; font-weight: 600; margin-bottom: 8px;">Q4: How do you handle service versioning and backward compatibility?</p>
<p style="color: #495057; font-size: 14px; background: #fff; padding: 12px; border-radius: 8px;">
<strong>Answer:</strong> Use semantic versioning for APIs. Apply the "tolerant reader" pattern - services should ignore unknown fields. For breaking changes, run multiple API versions simultaneously during migration. Use consumer-driven contract testing (Pact) to ensure changes don't break clients. Implement feature flags for gradual rollouts.
</p>
</div>
</div>

---

## Quick Reference Card

<div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #dee2e6;">
<h4 style="color: #495057; margin: 0 0 20px 0; text-align: center;">MICROSERVICES QUICK REFERENCE</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div>
<h5 style="color: #1971c2; margin: 0 0 12px 0;">Communication</h5>
<ul style="color: #495057; font-size: 13px; margin: 0; padding-left: 20px;">
<li>Sync: REST, gRPC (real-time)</li>
<li>Async: Events, Message Queues</li>
<li>Always set timeouts</li>
<li>Use circuit breakers</li>
</ul>
</div>
<div>
<h5 style="color: #2f9e44; margin: 0 0 12px 0;">Data Patterns</h5>
<ul style="color: #495057; font-size: 13px; margin: 0; padding-left: 20px;">
<li>Database per service</li>
<li>Saga for transactions</li>
<li>Event sourcing for audit</li>
<li>CQRS for read/write split</li>
</ul>
</div>
<div>
<h5 style="color: #e8590c; margin: 0 0 12px 0;">Resilience</h5>
<ul style="color: #495057; font-size: 13px; margin: 0; padding-left: 20px;">
<li>Circuit breaker (fail fast)</li>
<li>Retry with backoff</li>
<li>Bulkhead (isolation)</li>
<li>Fallback (degraded mode)</li>
</ul>
</div>
<div>
<h5 style="color: #7048e8; margin: 0 0 12px 0;">Observability</h5>
<ul style="color: #495057; font-size: 13px; margin: 0; padding-left: 20px;">
<li>Distributed tracing</li>
<li>Centralized logging</li>
<li>Metrics (RED: Rate, Error, Duration)</li>
<li>Health checks</li>
</ul>
</div>
</div>
</div>

---

## Related Topics

- [API Gateway](/topic/system-design/api-gateway) - Single entry point for microservices
- [Message Queues](/topic/system-design/message-queues) - Async communication
- [Service Discovery](/topic/system-design/service-discovery) - Finding service instances
- [Event Sourcing](/topic/system-design/event-sourcing) - Event-based data storage
