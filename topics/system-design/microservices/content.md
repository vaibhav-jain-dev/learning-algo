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

## Service Boundaries: Domain-Driven Design

<div style="background: linear-gradient(135deg, #e6fcf5 0%, #c3fae8 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #96f2d7;">
  <h4 style="color: #087f5b; margin: 0 0 24px 0; text-align: center;">BOUNDED CONTEXTS & SERVICE BOUNDARIES</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
    <div style="background: #fff; border-radius: 12px; padding: 20px; border: 2px solid #38d9a9;">
      <div style="color: #087f5b; font-weight: 600; margin-bottom: 12px; text-align: center;">Order Context</div>
      <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-bottom: 8px;">
        <div style="font-size: 11px; color: #495057;">Entities:</div>
        <div style="font-size: 12px; color: #087f5b;">Order, OrderItem, OrderStatus</div>
      </div>
      <div style="background: #f8f9fa; padding: 12px; border-radius: 8px;">
        <div style="font-size: 11px; color: #495057;">Operations:</div>
        <div style="font-size: 12px; color: #087f5b;">Create, Cancel, Update</div>
      </div>
    </div>
    <div style="background: #fff; border-radius: 12px; padding: 20px; border: 2px solid #748ffc;">
      <div style="color: #4263eb; font-weight: 600; margin-bottom: 12px; text-align: center;">Payment Context</div>
      <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-bottom: 8px;">
        <div style="font-size: 11px; color: #495057;">Entities:</div>
        <div style="font-size: 12px; color: #4263eb;">Payment, Refund, Invoice</div>
      </div>
      <div style="background: #f8f9fa; padding: 12px; border-radius: 8px;">
        <div style="font-size: 11px; color: #495057;">Operations:</div>
        <div style="font-size: 12px; color: #4263eb;">Charge, Refund, Verify</div>
      </div>
    </div>
    <div style="background: #fff; border-radius: 12px; padding: 20px; border: 2px solid #ffa94d;">
      <div style="color: #e8590c; font-weight: 600; margin-bottom: 12px; text-align: center;">Shipping Context</div>
      <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-bottom: 8px;">
        <div style="font-size: 11px; color: #495057;">Entities:</div>
        <div style="font-size: 12px; color: #e8590c;">Shipment, Address, Carrier</div>
      </div>
      <div style="background: #f8f9fa; padding: 12px; border-radius: 8px;">
        <div style="font-size: 11px; color: #495057;">Operations:</div>
        <div style="font-size: 12px; color: #e8590c;">Ship, Track, Return</div>
      </div>
    </div>
  </div>
  <div style="text-align: center; margin-top: 20px;">
    <div style="display: inline-flex; gap: 24px; background: #fff; padding: 16px 24px; border-radius: 8px;">
      <div style="font-size: 12px; color: #495057;"><span style="color: #087f5b;">Anti-Corruption Layer</span> translates between contexts</div>
    </div>
  </div>
</div>

<span style="color: #2f9e44; font-weight: 600;">Bounded contexts</span> from [[Domain-Driven Design]](/topic/system-design/ddd) define natural service boundaries. Each context has its own <span style="color: #2f9e44; font-weight: 600;">ubiquitous language</span> - "Customer" in Sales means something different than in Shipping.

### Identifying Service Boundaries

**Key Questions to Ask:**
1. Can this capability be deployed independently?
2. Does it have a clear owner (single team)?
3. Does it align with a business capability?
4. Can it scale independently based on its own demand?

**Warning Signs of Wrong Boundaries:**
- Services that always deploy together
- Circular dependencies between services
- Distributed monolith - changes require coordinating multiple teams
- Data duplication without clear ownership

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

### Inter-Service Communication Deep Dive

<div style="background: linear-gradient(135deg, #f3f0ff 0%, #e5dbff 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #d0bfff;">
  <h4 style="color: #7048e8; margin: 0 0 24px 0; text-align: center;">COMMUNICATION PROTOCOLS COMPARISON</h4>
  <div style="overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden;">
      <thead>
        <tr style="background: #7048e8; color: white;">
          <th style="padding: 12px; text-align: left; font-size: 13px;">Protocol</th>
          <th style="padding: 12px; text-align: left; font-size: 13px;">Latency</th>
          <th style="padding: 12px; text-align: left; font-size: 13px;">Use Case</th>
          <th style="padding: 12px; text-align: left; font-size: 13px;">Trade-offs</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #e9ecef;">
          <td style="padding: 12px; font-size: 13px; color: #495057;"><strong>REST/HTTP</strong></td>
          <td style="padding: 12px; font-size: 13px; color: #495057;">~10-100ms</td>
          <td style="padding: 12px; font-size: 13px; color: #495057;">CRUD operations, external APIs</td>
          <td style="padding: 12px; font-size: 13px; color: #495057;">Simple but verbose</td>
        </tr>
        <tr style="border-bottom: 1px solid #e9ecef; background: #f8f9fa;">
          <td style="padding: 12px; font-size: 13px; color: #495057;"><strong>gRPC</strong></td>
          <td style="padding: 12px; font-size: 13px; color: #495057;">~1-10ms</td>
          <td style="padding: 12px; font-size: 13px; color: #495057;">Internal service-to-service</td>
          <td style="padding: 12px; font-size: 13px; color: #495057;">Fast but needs proto files</td>
        </tr>
        <tr style="border-bottom: 1px solid #e9ecef;">
          <td style="padding: 12px; font-size: 13px; color: #495057;"><strong>GraphQL</strong></td>
          <td style="padding: 12px; font-size: 13px; color: #495057;">~10-50ms</td>
          <td style="padding: 12px; font-size: 13px; color: #495057;">API aggregation, BFF pattern</td>
          <td style="padding: 12px; font-size: 13px; color: #495057;">Flexible but complex caching</td>
        </tr>
        <tr style="background: #f8f9fa;">
          <td style="padding: 12px; font-size: 13px; color: #495057;"><strong>Message Queue</strong></td>
          <td style="padding: 12px; font-size: 13px; color: #495057;">~1-1000ms</td>
          <td style="padding: 12px; font-size: 13px; color: #495057;">Async workflows, event sourcing</td>
          <td style="padding: 12px; font-size: 13px; color: #495057;">Decoupled but eventual consistency</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

See [[API Gateway]](/topic/system-design/api-gateway) for routing patterns and [[Message Queues]](/topic/system-design/message-queues) for async communication details.

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

## Data Consistency Patterns

<div style="background: linear-gradient(135deg, #fff9db 0%, #fff3bf 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #ffe066;">
  <h4 style="color: #e67700; margin: 0 0 24px 0; text-align: center;">DATA CONSISTENCY SPECTRUM</h4>
  <div style="position: relative; background: linear-gradient(90deg, #d3f9d8 0%, #fff3bf 50%, #ffe3e3 100%); border-radius: 8px; height: 40px; margin-bottom: 20px;">
    <div style="position: absolute; left: 5%; top: 50%; transform: translateY(-50%); background: #fff; padding: 4px 12px; border-radius: 4px; font-size: 11px; color: #2f9e44; border: 1px solid #51cf66;">Strong</div>
    <div style="position: absolute; left: 45%; top: 50%; transform: translate(-50%, -50%); background: #fff; padding: 4px 12px; border-radius: 4px; font-size: 11px; color: #e67700; border: 1px solid #fab005;">Eventual</div>
    <div style="position: absolute; right: 5%; top: 50%; transform: translateY(-50%); background: #fff; padding: 4px 12px; border-radius: 4px; font-size: 11px; color: #c92a2a; border: 1px solid #ff6b6b;">Weak</div>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
    <div style="background: #fff; padding: 16px; border-radius: 8px; border-left: 4px solid #51cf66;">
      <div style="font-weight: 600; color: #2f9e44; margin-bottom: 8px;">2PC / Saga</div>
      <div style="font-size: 12px; color: #495057;">Guaranteed consistency across services</div>
    </div>
    <div style="background: #fff; padding: 16px; border-radius: 8px; border-left: 4px solid #fab005;">
      <div style="font-weight: 600; color: #e67700; margin-bottom: 8px;">Outbox Pattern</div>
      <div style="font-size: 12px; color: #495057;">Reliable event publishing</div>
    </div>
    <div style="background: #fff; padding: 16px; border-radius: 8px; border-left: 4px solid #ff6b6b;">
      <div style="font-weight: 600; color: #c92a2a; margin-bottom: 8px;">Fire & Forget</div>
      <div style="font-size: 12px; color: #495057;">Best effort, may lose events</div>
    </div>
  </div>
</div>

### The Outbox Pattern

<span style="color: #2f9e44; font-weight: 600;">The Outbox Pattern</span> solves the dual-write problem: how do you reliably update your database AND publish an event atomically?

<div style="background: linear-gradient(135deg, #e7f5ff 0%, #d0ebff 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #a5d8ff;">
  <h4 style="color: #1971c2; margin: 0 0 24px 0; text-align: center;">OUTBOX PATTERN FLOW</h4>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #fff; padding: 16px; border-radius: 8px; flex: 1; border: 2px solid #74c0fc;">
        <div style="font-weight: 600; color: #1971c2; margin-bottom: 8px;">Step 1: Single Transaction</div>
        <div style="font-size: 12px; color: #495057;">Write business data + outbox event in same DB transaction</div>
      </div>
    </div>
    <div style="text-align: center; color: #868e96;">|</div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #fff; padding: 16px; border-radius: 8px; flex: 1; border: 2px solid #74c0fc;">
        <div style="font-weight: 600; color: #1971c2; margin-bottom: 8px;">Step 2: Outbox Reader</div>
        <div style="font-size: 12px; color: #495057;">Background process polls outbox table, publishes to message broker</div>
      </div>
    </div>
    <div style="text-align: center; color: #868e96;">|</div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #fff; padding: 16px; border-radius: 8px; flex: 1; border: 2px solid #74c0fc;">
        <div style="font-weight: 600; color: #1971c2; margin-bottom: 8px;">Step 3: Mark Processed</div>
        <div style="font-size: 12px; color: #495057;">Delete or mark outbox record after successful publish</div>
      </div>
    </div>
  </div>
</div>

```python
from datetime import datetime
from typing import Optional
import json

class OutboxPattern:
    """
    Transactional Outbox Pattern implementation
    Ensures atomic updates between business data and events
    """

    def __init__(self, db_session):
        self.db = db_session

    def create_order_with_outbox(self, order_data: dict) -> dict:
        """
        Creates order and outbox entry in single transaction
        """
        with self.db.begin_transaction() as tx:
            # 1. Insert business data
            order = tx.execute(
                "INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?) RETURNING id",
                (order_data['user_id'], order_data['total'], 'created')
            )
            order_id = order.fetchone()[0]

            # 2. Insert outbox event in SAME transaction
            event_payload = {
                'event_type': 'order.created',
                'order_id': order_id,
                'user_id': order_data['user_id'],
                'total': order_data['total'],
                'timestamp': datetime.utcnow().isoformat()
            }

            tx.execute(
                """INSERT INTO outbox
                   (aggregate_type, aggregate_id, event_type, payload, created_at)
                   VALUES (?, ?, ?, ?, ?)""",
                ('order', order_id, 'order.created',
                 json.dumps(event_payload), datetime.utcnow())
            )

            tx.commit()  # Both succeed or both fail

        return {'id': order_id, **order_data}


class OutboxPublisher:
    """
    Background process that reads outbox and publishes events
    Run as separate worker/cron job
    """

    def __init__(self, db_session, message_broker):
        self.db = db_session
        self.broker = message_broker

    def process_outbox(self, batch_size: int = 100):
        """
        Poll outbox table and publish pending events
        """
        # Get unpublished events
        events = self.db.execute(
            """SELECT id, aggregate_type, aggregate_id, event_type, payload
               FROM outbox
               WHERE published_at IS NULL
               ORDER BY created_at
               LIMIT ?""",
            (batch_size,)
        ).fetchall()

        for event in events:
            try:
                # Publish to message broker
                self.broker.publish(
                    topic=event['event_type'],
                    message=event['payload']
                )

                # Mark as published
                self.db.execute(
                    "UPDATE outbox SET published_at = ? WHERE id = ?",
                    (datetime.utcnow(), event['id'])
                )
                self.db.commit()

            except Exception as e:
                # Log and continue - will retry on next poll
                print(f"Failed to publish event {event['id']}: {e}")
                self.db.rollback()
```

See [[Event Sourcing]](/topic/system-design/event-sourcing) for event-based data storage and [[CQRS]](/topic/system-design/cqrs) for read/write separation.

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

### Choreography vs Orchestration

<div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #dee2e6;">
  <h4 style="color: #495057; margin: 0 0 24px 0; text-align: center;">SAGA COORDINATION STYLES</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div style="background: #e6fcf5; border-radius: 12px; padding: 20px; border: 2px solid #38d9a9;">
      <div style="color: #087f5b; font-weight: 600; margin-bottom: 12px; text-align: center;">Choreography</div>
      <div style="background: #fff; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-around; margin-bottom: 12px;">
          <div style="text-align: center; font-size: 11px; color: #495057;">Order</div>
          <div style="text-align: center; font-size: 11px; color: #495057;">Inventory</div>
          <div style="text-align: center; font-size: 11px; color: #495057;">Payment</div>
        </div>
        <div style="text-align: center; color: #087f5b; font-size: 12px;">Services react to events independently</div>
      </div>
      <div style="font-size: 12px; color: #495057;">
        <div style="color: #2f9e44; margin-bottom: 4px;">+ No central coordinator</div>
        <div style="color: #2f9e44; margin-bottom: 4px;">+ Loose coupling</div>
        <div style="color: #c92a2a;">- Hard to track flow</div>
      </div>
    </div>
    <div style="background: #e7f5ff; border-radius: 12px; padding: 20px; border: 2px solid #74c0fc;">
      <div style="color: #1971c2; font-weight: 600; margin-bottom: 12px; text-align: center;">Orchestration</div>
      <div style="background: #fff; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
        <div style="text-align: center; margin-bottom: 8px;">
          <div style="display: inline-block; background: #1971c2; color: white; padding: 6px 16px; border-radius: 4px; font-size: 11px;">Orchestrator</div>
        </div>
        <div style="display: flex; justify-content: space-around;">
          <div style="text-align: center; font-size: 11px; color: #495057;">Order</div>
          <div style="text-align: center; font-size: 11px; color: #495057;">Inventory</div>
          <div style="text-align: center; font-size: 11px; color: #495057;">Payment</div>
        </div>
      </div>
      <div style="font-size: 12px; color: #495057;">
        <div style="color: #2f9e44; margin-bottom: 4px;">+ Clear flow control</div>
        <div style="color: #2f9e44; margin-bottom: 4px;">+ Easy to understand</div>
        <div style="color: #c92a2a;">- Single point of coordination</div>
      </div>
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

## Deployment Strategies

<div style="background: linear-gradient(135deg, #e7f5ff 0%, #d0ebff 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #a5d8ff;">
  <h4 style="color: #1971c2; margin: 0 0 24px 0; text-align: center;">DEPLOYMENT STRATEGIES COMPARISON</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div style="background: #fff; border-radius: 12px; padding: 20px; border: 2px solid #74c0fc;">
      <div style="color: #1971c2; font-weight: 600; margin-bottom: 12px;">Rolling Deployment</div>
      <div style="display: flex; gap: 4px; margin-bottom: 12px;">
        <div style="flex: 1; height: 24px; background: #51cf66; border-radius: 4px;"></div>
        <div style="flex: 1; height: 24px; background: #51cf66; border-radius: 4px;"></div>
        <div style="flex: 1; height: 24px; background: #74c0fc; border-radius: 4px;"></div>
        <div style="flex: 1; height: 24px; background: #868e96; border-radius: 4px;"></div>
      </div>
      <div style="font-size: 12px; color: #495057;">Replace instances one at a time. Zero downtime, gradual rollout.</div>
    </div>
    <div style="background: #fff; border-radius: 12px; padding: 20px; border: 2px solid #38d9a9;">
      <div style="color: #087f5b; font-weight: 600; margin-bottom: 12px;">Blue-Green Deployment</div>
      <div style="display: flex; gap: 12px; margin-bottom: 12px;">
        <div style="flex: 1; background: #74c0fc; border-radius: 4px; padding: 8px; text-align: center; font-size: 11px; color: white;">Blue (Live)</div>
        <div style="flex: 1; background: #51cf66; border-radius: 4px; padding: 8px; text-align: center; font-size: 11px; color: white;">Green (New)</div>
      </div>
      <div style="font-size: 12px; color: #495057;">Run two identical environments, switch traffic instantly.</div>
    </div>
    <div style="background: #fff; border-radius: 12px; padding: 20px; border: 2px solid #fab005;">
      <div style="color: #e67700; font-weight: 600; margin-bottom: 12px;">Canary Deployment</div>
      <div style="display: flex; gap: 4px; margin-bottom: 12px;">
        <div style="flex: 9; height: 24px; background: #74c0fc; border-radius: 4px;"></div>
        <div style="flex: 1; height: 24px; background: #fab005; border-radius: 4px;"></div>
      </div>
      <div style="font-size: 12px; color: #495057;">Route small % of traffic to new version, monitor, then expand.</div>
    </div>
    <div style="background: #fff; border-radius: 12px; padding: 20px; border: 2px solid #b197fc;">
      <div style="color: #7048e8; font-weight: 600; margin-bottom: 12px;">Feature Flags</div>
      <div style="background: #f8f9fa; border-radius: 4px; padding: 8px; margin-bottom: 12px; font-family: monospace; font-size: 11px;">
        if (feature.enabled("new_checkout"))<br/>
        &nbsp;&nbsp;showNewCheckout()
      </div>
      <div style="font-size: 12px; color: #495057;">Toggle features without deployment. Per-user or percentage rollout.</div>
    </div>
  </div>
</div>

### Deployment Pipeline Best Practices

<span style="color: #2f9e44; font-weight: 600;">Immutable infrastructure</span> means you never modify running servers - you replace them. Combined with <span style="color: #2f9e44; font-weight: 600;">containerization</span> via Docker and orchestration with [[Kubernetes]](/topic/system-design/kubernetes), this enables reliable, repeatable deployments.

```yaml
# Example: Kubernetes Rolling Update Configuration
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1      # At most 1 pod unavailable during update
      maxSurge: 1            # At most 1 extra pod during update
  template:
    spec:
      containers:
      - name: order-service
        image: order-service:v2.0.0
        readinessProbe:        # Only receive traffic when ready
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5
        livenessProbe:         # Restart if unhealthy
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
```

See [[Code Deployment]](/topic/system-architectures/code-deployment) for comprehensive CI/CD patterns.

---

## Monitoring & Observability

<div style="background: linear-gradient(135deg, #f3f0ff 0%, #e5dbff 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #d0bfff;">
  <h4 style="color: #7048e8; margin: 0 0 24px 0; text-align: center;">THE THREE PILLARS OF OBSERVABILITY</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
    <div style="background: #fff; border-radius: 12px; padding: 20px; border-top: 4px solid #1971c2;">
      <div style="color: #1971c2; font-weight: 600; margin-bottom: 12px; text-align: center;">Metrics</div>
      <div style="font-size: 12px; color: #495057; margin-bottom: 12px;">Numerical measurements over time</div>
      <div style="background: #e7f5ff; padding: 12px; border-radius: 8px; font-size: 11px;">
        <div style="color: #1971c2; font-weight: 600;">RED Method:</div>
        <div style="color: #495057;">Rate - requests/sec</div>
        <div style="color: #495057;">Errors - error rate</div>
        <div style="color: #495057;">Duration - latency</div>
      </div>
      <div style="margin-top: 12px; font-size: 11px; color: #868e96;">Tools: Prometheus, Datadog</div>
    </div>
    <div style="background: #fff; border-radius: 12px; padding: 20px; border-top: 4px solid #2f9e44;">
      <div style="color: #2f9e44; font-weight: 600; margin-bottom: 12px; text-align: center;">Logs</div>
      <div style="font-size: 12px; color: #495057; margin-bottom: 12px;">Timestamped event records</div>
      <div style="background: #e6fcf5; padding: 12px; border-radius: 8px; font-size: 11px;">
        <div style="color: #087f5b; font-weight: 600;">Best Practices:</div>
        <div style="color: #495057;">Structured JSON format</div>
        <div style="color: #495057;">Correlation IDs</div>
        <div style="color: #495057;">Log levels (INFO/WARN/ERROR)</div>
      </div>
      <div style="margin-top: 12px; font-size: 11px; color: #868e96;">Tools: ELK Stack, Loki</div>
    </div>
    <div style="background: #fff; border-radius: 12px; padding: 20px; border-top: 4px solid #e8590c;">
      <div style="color: #e8590c; font-weight: 600; margin-bottom: 12px; text-align: center;">Traces</div>
      <div style="font-size: 12px; color: #495057; margin-bottom: 12px;">Request flow across services</div>
      <div style="background: #fff4e6; padding: 12px; border-radius: 8px; font-size: 11px;">
        <div style="color: #e8590c; font-weight: 600;">Contains:</div>
        <div style="color: #495057;">Trace ID (full journey)</div>
        <div style="color: #495057;">Span ID (single hop)</div>
        <div style="color: #495057;">Timing & metadata</div>
      </div>
      <div style="margin-top: 12px; font-size: 11px; color: #868e96;">Tools: Jaeger, Zipkin</div>
    </div>
  </div>
</div>

### Distributed Tracing Implementation

<span style="color: #2f9e44; font-weight: 600;">Distributed tracing</span> is essential for debugging microservices. Every request gets a <span style="color: #2f9e44; font-weight: 600;">trace ID</span> that follows it through all services.

<div style="background: linear-gradient(135deg, #fff4e6 0%, #ffe8cc 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #ffd8a8;">
  <h4 style="color: #e8590c; margin: 0 0 24px 0; text-align: center;">DISTRIBUTED TRACE VISUALIZATION</h4>
  <div style="background: #fff; border-radius: 8px; padding: 20px;">
    <div style="font-size: 12px; color: #495057; margin-bottom: 16px;">Trace ID: <code style="background: #f8f9fa; padding: 2px 6px; border-radius: 4px;">abc123</code></div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; align-items: center;">
        <div style="width: 100px; font-size: 11px; color: #495057;">API Gateway</div>
        <div style="flex: 1; height: 20px; background: #74c0fc; border-radius: 4px; position: relative;">
          <span style="position: absolute; left: 8px; top: 2px; font-size: 10px; color: white;">150ms</span>
        </div>
      </div>
      <div style="display: flex; align-items: center;">
        <div style="width: 100px; font-size: 11px; color: #495057;">Order Service</div>
        <div style="width: 20px;"></div>
        <div style="flex: 0.7; height: 20px; background: #51cf66; border-radius: 4px; position: relative;">
          <span style="position: absolute; left: 8px; top: 2px; font-size: 10px; color: white;">80ms</span>
        </div>
      </div>
      <div style="display: flex; align-items: center;">
        <div style="width: 100px; font-size: 11px; color: #495057;">User Service</div>
        <div style="width: 40px;"></div>
        <div style="flex: 0.3; height: 20px; background: #b197fc; border-radius: 4px; position: relative;">
          <span style="position: absolute; left: 8px; top: 2px; font-size: 10px; color: white;">25ms</span>
        </div>
      </div>
      <div style="display: flex; align-items: center;">
        <div style="width: 100px; font-size: 11px; color: #495057;">Inventory DB</div>
        <div style="width: 45px;"></div>
        <div style="flex: 0.2; height: 20px; background: #ffa94d; border-radius: 4px; position: relative;">
          <span style="position: absolute; left: 8px; top: 2px; font-size: 10px; color: white;">15ms</span>
        </div>
      </div>
    </div>
  </div>
</div>

```python
import uuid
from functools import wraps
from typing import Optional, Dict, Any
from datetime import datetime
import json

class Span:
    """Represents a single unit of work in a trace"""

    def __init__(self, trace_id: str, span_id: str, operation: str,
                 parent_span_id: Optional[str] = None):
        self.trace_id = trace_id
        self.span_id = span_id
        self.parent_span_id = parent_span_id
        self.operation = operation
        self.start_time = datetime.utcnow()
        self.end_time: Optional[datetime] = None
        self.tags: Dict[str, Any] = {}
        self.logs: list = []

    def set_tag(self, key: str, value: Any) -> 'Span':
        self.tags[key] = value
        return self

    def log(self, message: str) -> 'Span':
        self.logs.append({
            'timestamp': datetime.utcnow().isoformat(),
            'message': message
        })
        return self

    def finish(self):
        self.end_time = datetime.utcnow()

    @property
    def duration_ms(self) -> float:
        if self.end_time:
            return (self.end_time - self.start_time).total_seconds() * 1000
        return 0

    def to_dict(self) -> dict:
        return {
            'trace_id': self.trace_id,
            'span_id': self.span_id,
            'parent_span_id': self.parent_span_id,
            'operation': self.operation,
            'start_time': self.start_time.isoformat(),
            'duration_ms': self.duration_ms,
            'tags': self.tags,
            'logs': self.logs
        }


class Tracer:
    """
    Distributed tracing implementation
    Compatible with OpenTelemetry/Jaeger concepts
    """

    _current_span: Optional[Span] = None

    def __init__(self, service_name: str, exporter=None):
        self.service_name = service_name
        self.exporter = exporter  # Send to Jaeger/Zipkin

    def start_span(self, operation: str,
                   trace_id: Optional[str] = None) -> Span:
        """Start a new span, optionally continuing existing trace"""
        if trace_id is None:
            trace_id = str(uuid.uuid4())

        span_id = str(uuid.uuid4())[:16]
        parent_span_id = self._current_span.span_id if self._current_span else None

        span = Span(trace_id, span_id, operation, parent_span_id)
        span.set_tag('service', self.service_name)

        self._current_span = span
        return span

    def finish_span(self, span: Span):
        """Finish span and export"""
        span.finish()

        if self.exporter:
            self.exporter.export(span.to_dict())
        else:
            # Default: structured log output
            print(json.dumps(span.to_dict()))

        self._current_span = None

    def inject_headers(self) -> Dict[str, str]:
        """Get headers to propagate trace context"""
        if self._current_span:
            return {
                'X-Trace-Id': self._current_span.trace_id,
                'X-Span-Id': self._current_span.span_id
            }
        return {}

    def extract_headers(self, headers: Dict[str, str]) -> Optional[str]:
        """Extract trace ID from incoming request headers"""
        return headers.get('X-Trace-Id')


def traced(tracer: Tracer, operation: str):
    """Decorator to automatically trace function calls"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            span = tracer.start_span(operation)
            try:
                result = func(*args, **kwargs)
                span.set_tag('status', 'success')
                return result
            except Exception as e:
                span.set_tag('status', 'error')
                span.set_tag('error.message', str(e))
                span.log(f"Exception: {e}")
                raise
            finally:
                tracer.finish_span(span)
        return wrapper
    return decorator


# Usage Example
tracer = Tracer('order-service')

@traced(tracer, 'create_order')
def create_order(user_id: str, items: list) -> dict:
    # This call is automatically traced
    user = get_user(user_id)
    inventory = check_inventory(items)
    return {'order_id': '123', 'user': user, 'inventory': inventory}

@traced(tracer, 'get_user')
def get_user(user_id: str) -> dict:
    # Makes HTTP call with trace headers
    import requests
    headers = tracer.inject_headers()
    response = requests.get(f'http://user-service/users/{user_id}', headers=headers)
    return response.json()
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

## Interview Deep-Dive: 3-Level Recursive Q&A

<div style="background: linear-gradient(135deg, #e7f5ff 0%, #d0ebff 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #a5d8ff;">
  <h4 style="color: #1971c2; margin: 0 0 20px 0;">SERVICE BOUNDARIES & DOMAIN DESIGN</h4>

  <div style="margin-bottom: 24px;">
    <p style="color: #1971c2; font-weight: 600; margin-bottom: 8px;">Q1: How do you determine the right boundaries for microservices?</p>
    <div style="background: #fff; padding: 16px; border-radius: 8px; border-left: 4px solid #1971c2;">
      <p style="color: #495057; font-size: 14px; margin: 0;">
        <strong>Answer:</strong> Use <span style="color: #2f9e44; font-weight: 600;">Domain-Driven Design (DDD)</span> to identify bounded contexts. Each service should align with a business capability, have a single team owner, and be independently deployable. Key techniques include: (1) <span style="color: #2f9e44; font-weight: 600;">Event Storming</span> - workshop to discover domain events and aggregates, (2) Analyze team communication patterns - Conway's Law suggests system boundaries mirror org structure, (3) Look for natural seams where data consistency requirements change.
      </p>
    </div>

    <div style="margin-left: 24px; margin-top: 16px;">
      <p style="color: #4263eb; font-weight: 600; margin-bottom: 8px;">Q1.1: What if you get the boundaries wrong initially?</p>
      <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; border-left: 4px solid #4263eb;">
        <p style="color: #495057; font-size: 14px; margin: 0;">
          <strong>Answer:</strong> Wrong boundaries manifest as: services always deploying together, excessive inter-service calls, or data duplication without clear ownership. Solutions: (1) <span style="color: #2f9e44; font-weight: 600;">Merge services</span> if they're too fine-grained, (2) <span style="color: #2f9e44; font-weight: 600;">Extract services</span> if a service does too much, (3) Use the <span style="color: #2f9e44; font-weight: 600;">Strangler Fig pattern</span> for gradual refactoring. The cost of wrong boundaries is high - you're essentially doing a distributed monolith refactor.
        </p>
      </div>

      <div style="margin-left: 24px; margin-top: 16px;">
        <p style="color: #7048e8; font-weight: 600; margin-bottom: 8px;">Q1.1.1: How does the Strangler Fig pattern work for service boundary changes?</p>
        <div style="background: #f3f0ff; padding: 16px; border-radius: 8px; border-left: 4px solid #7048e8;">
          <p style="color: #495057; font-size: 14px; margin: 0;">
            <strong>Answer:</strong> The Strangler Fig pattern incrementally replaces functionality without big-bang rewrites. For boundary changes: (1) Create new service with correct boundary, (2) Use an <span style="color: #2f9e44; font-weight: 600;">Anti-Corruption Layer</span> to translate between old/new, (3) Gradually route traffic to new service using feature flags, (4) Once migrated, decommission old service. Netflix used this extensively during their cloud migration - they called it "building the plane while flying it."
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #e6fcf5 0%, #c3fae8 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #96f2d7;">
  <h4 style="color: #087f5b; margin: 0 0 20px 0;">INTER-SERVICE COMMUNICATION</h4>

  <div style="margin-bottom: 24px;">
    <p style="color: #087f5b; font-weight: 600; margin-bottom: 8px;">Q2: When should you use synchronous vs asynchronous communication?</p>
    <div style="background: #fff; padding: 16px; border-radius: 8px; border-left: 4px solid #087f5b;">
      <p style="color: #495057; font-size: 14px; margin: 0;">
        <strong>Answer:</strong> Use <span style="color: #2f9e44; font-weight: 600;">synchronous (REST/gRPC)</span> when: the caller needs an immediate response, the operation is simple query/command, and latency is acceptable. Use <span style="color: #2f9e44; font-weight: 600;">asynchronous (events/queues)</span> when: you need to decouple services, handle high throughput, or the operation can complete later. Rule of thumb: prefer async for anything that modifies state across services - it enables <span style="color: #2f9e44; font-weight: 600;">eventual consistency</span> and better fault tolerance.
      </p>
    </div>

    <div style="margin-left: 24px; margin-top: 16px;">
      <p style="color: #1971c2; font-weight: 600; margin-bottom: 8px;">Q2.1: How do you handle failures in async communication?</p>
      <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; border-left: 4px solid #1971c2;">
        <p style="color: #495057; font-size: 14px; margin: 0;">
          <strong>Answer:</strong> Key patterns: (1) <span style="color: #2f9e44; font-weight: 600;">Dead Letter Queues (DLQ)</span> - failed messages go to separate queue for analysis, (2) <span style="color: #2f9e44; font-weight: 600;">Idempotency</span> - design handlers to safely process same message multiple times, (3) <span style="color: #2f9e44; font-weight: 600;">Retry with exponential backoff</span> - retry 3 times with increasing delays before DLQ, (4) <span style="color: #2f9e44; font-weight: 600;">Outbox pattern</span> - ensure events are published reliably. Always include correlation IDs to trace message flows.
        </p>
      </div>

      <div style="margin-left: 24px; margin-top: 16px;">
        <p style="color: #7048e8; font-weight: 600; margin-bottom: 8px;">Q2.1.1: How do you implement idempotency in event handlers?</p>
        <div style="background: #f3f0ff; padding: 16px; border-radius: 8px; border-left: 4px solid #7048e8;">
          <p style="color: #495057; font-size: 14px; margin: 0;">
            <strong>Answer:</strong> Three approaches: (1) <span style="color: #2f9e44; font-weight: 600;">Idempotency keys</span> - store processed event IDs in database, check before processing, (2) <span style="color: #2f9e44; font-weight: 600;">Natural idempotency</span> - design operations to be naturally safe (e.g., "set status to X" vs "increment counter"), (3) <span style="color: #2f9e44; font-weight: 600;">Deduplication window</span> - track recent events in Redis with TTL. For critical operations, use database constraints - if inserting with same idempotency key fails with unique constraint, the event was already processed.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #fff9db 0%, #fff3bf 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #ffe066;">
  <h4 style="color: #e67700; margin: 0 0 20px 0;">DATA CONSISTENCY</h4>

  <div style="margin-bottom: 24px;">
    <p style="color: #e67700; font-weight: 600; margin-bottom: 8px;">Q3: How do you handle data consistency across microservices without distributed transactions?</p>
    <div style="background: #fff; padding: 16px; border-radius: 8px; border-left: 4px solid #e67700;">
      <p style="color: #495057; font-size: 14px; margin: 0;">
        <strong>Answer:</strong> Accept <span style="color: #2f9e44; font-weight: 600;">eventual consistency</span> as the default. Use: (1) <span style="color: #2f9e44; font-weight: 600;">Saga pattern</span> for distributed transactions with compensating actions, (2) <span style="color: #2f9e44; font-weight: 600;">Outbox pattern</span> for reliable event publishing, (3) <span style="color: #2f9e44; font-weight: 600;">CQRS</span> to separate read/write models and allow async synchronization. Design business processes to tolerate temporary inconsistency - e.g., "order pending" status while payment processes. Strong consistency across services requires distributed locking and has significant performance costs.
      </p>
    </div>

    <div style="margin-left: 24px; margin-top: 16px;">
      <p style="color: #1971c2; font-weight: 600; margin-bottom: 8px;">Q3.1: What happens if a saga step fails after others have committed?</p>
      <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; border-left: 4px solid #1971c2;">
        <p style="color: #495057; font-size: 14px; margin: 0;">
          <strong>Answer:</strong> Execute <span style="color: #2f9e44; font-weight: 600;">compensating transactions</span> in reverse order. Key principles: (1) Compensations must be <span style="color: #2f9e44; font-weight: 600;">idempotent</span> - they might run multiple times, (2) They must <span style="color: #2f9e44; font-weight: 600;">eventually succeed</span> - keep retrying with alerts, (3) Some actions are <span style="color: #2f9e44; font-weight: 600;">non-compensatable</span> (e.g., sent email) - design around this. Store saga state persistently so recovery can resume after crashes. If compensation truly fails, alert humans - this is a business-level exception.
        </p>
      </div>

      <div style="margin-left: 24px; margin-top: 16px;">
        <p style="color: #7048e8; font-weight: 600; margin-bottom: 8px;">Q3.1.1: How do you handle the case where a compensation action itself fails?</p>
        <div style="background: #f3f0ff; padding: 16px; border-radius: 8px; border-left: 4px solid #7048e8;">
          <p style="color: #495057; font-size: 14px; margin: 0;">
            <strong>Answer:</strong> This is the "saga of sagas" problem. Solutions: (1) <span style="color: #2f9e44; font-weight: 600;">Infinite retry with alerting</span> - compensation must eventually succeed, alert after N failures, (2) <span style="color: #2f9e44; font-weight: 600;">Manual intervention queue</span> - failed compensations go to human review, (3) <span style="color: #2f9e44; font-weight: 600;">Reconciliation jobs</span> - periodic batch jobs detect and fix inconsistencies. Design compensations to be simple and unlikely to fail. Example: if refund fails, store "refund_pending" and let a reconciliation job handle it. This is where <span style="color: #2f9e44; font-weight: 600;">event sourcing</span> helps - you can always replay to fix state.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #f3f0ff 0%, #e5dbff 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #d0bfff;">
  <h4 style="color: #7048e8; margin: 0 0 20px 0;">DEPLOYMENT STRATEGIES</h4>

  <div style="margin-bottom: 24px;">
    <p style="color: #7048e8; font-weight: 600; margin-bottom: 8px;">Q4: How do you safely deploy changes to production microservices?</p>
    <div style="background: #fff; padding: 16px; border-radius: 8px; border-left: 4px solid #7048e8;">
      <p style="color: #495057; font-size: 14px; margin: 0;">
        <strong>Answer:</strong> Layer multiple strategies: (1) <span style="color: #2f9e44; font-weight: 600;">Canary deployments</span> - route 1-5% traffic to new version, monitor errors/latency, (2) <span style="color: #2f9e44; font-weight: 600;">Feature flags</span> - deploy code dark, enable gradually per user segment, (3) <span style="color: #2f9e44; font-weight: 600;">Blue-green deployments</span> - instant rollback capability, (4) <span style="color: #2f9e44; font-weight: 600;">Automated rollback</span> - if error rate exceeds threshold, auto-revert. Every deployment should be reversible within minutes. Use immutable infrastructure - never patch running instances.
      </p>
    </div>

    <div style="margin-left: 24px; margin-top: 16px;">
      <p style="color: #1971c2; font-weight: 600; margin-bottom: 8px;">Q4.1: How do you handle database schema changes with zero-downtime deployments?</p>
      <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; border-left: 4px solid #1971c2;">
        <p style="color: #495057; font-size: 14px; margin: 0;">
          <strong>Answer:</strong> Use <span style="color: #2f9e44; font-weight: 600;">expand-contract pattern</span> (also called parallel change): (1) <span style="color: #2f9e44; font-weight: 600;">Expand</span> - add new column/table, deploy code that writes to both old and new, (2) <span style="color: #2f9e44; font-weight: 600;">Migrate</span> - backfill old data to new structure, (3) <span style="color: #2f9e44; font-weight: 600;">Contract</span> - deploy code that reads from new only, then drop old. Never rename columns directly - add new, migrate, drop old. For large tables, use online schema change tools (pt-online-schema-change, gh-ost) to avoid locking.
        </p>
      </div>

      <div style="margin-left: 24px; margin-top: 16px;">
        <p style="color: #087f5b; font-weight: 600; margin-bottom: 8px;">Q4.1.1: What if a migration fails midway during the expand phase?</p>
        <div style="background: #e6fcf5; padding: 16px; border-radius: 8px; border-left: 4px solid #087f5b;">
          <p style="color: #495057; font-size: 14px; margin: 0;">
            <strong>Answer:</strong> Design migrations to be <span style="color: #2f9e44; font-weight: 600;">resumable and idempotent</span>: (1) Track migration progress (e.g., "last processed ID"), (2) Use batched updates with checkpoints, (3) Application code should handle both old and new schema during migration window. If migration corrupts data, restore from backup to the new column only - old data in original column is untouched. This is why expand-contract works: the old path remains functional throughout. For critical tables, test migrations on production-clone database first.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #ffc9c9;">
  <h4 style="color: #c92a2a; margin: 0 0 20px 0;">MONITORING & DEBUGGING</h4>

  <div style="margin-bottom: 24px;">
    <p style="color: #c92a2a; font-weight: 600; margin-bottom: 8px;">Q5: How do you debug issues that span multiple microservices?</p>
    <div style="background: #fff; padding: 16px; border-radius: 8px; border-left: 4px solid #c92a2a;">
      <p style="color: #495057; font-size: 14px; margin: 0;">
        <strong>Answer:</strong> Implement the <span style="color: #2f9e44; font-weight: 600;">three pillars of observability</span>: (1) <span style="color: #2f9e44; font-weight: 600;">Distributed tracing</span> (Jaeger/Zipkin) - trace ID follows request across all services, shows latency per hop, (2) <span style="color: #2f9e44; font-weight: 600;">Centralized logging</span> (ELK/Datadog) - correlation ID in all logs, structured JSON format, (3) <span style="color: #2f9e44; font-weight: 600;">Metrics</span> (Prometheus/Grafana) - RED metrics per service (Rate, Errors, Duration). Create dashboards showing request flow. When debugging, start with trace to identify slow/failing service, then dive into that service's logs.
      </p>
    </div>

    <div style="margin-left: 24px; margin-top: 16px;">
      <p style="color: #1971c2; font-weight: 600; margin-bottom: 8px;">Q5.1: How do you set up alerting that doesn't cause alert fatigue?</p>
      <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; border-left: 4px solid #1971c2;">
        <p style="color: #495057; font-size: 14px; margin: 0;">
          <strong>Answer:</strong> Follow <span style="color: #2f9e44; font-weight: 600;">SRE alerting principles</span>: (1) Alert on <span style="color: #2f9e44; font-weight: 600;">symptoms, not causes</span> - "users can't checkout" not "CPU high", (2) Define <span style="color: #2f9e44; font-weight: 600;">SLOs</span> (Service Level Objectives) and alert on SLO breach, (3) Every alert must be <span style="color: #2f9e44; font-weight: 600;">actionable</span> - if no action needed, it's not an alert, (4) Use <span style="color: #2f9e44; font-weight: 600;">error budgets</span> - if 99.9% SLO, you have 43 minutes/month of allowed downtime. Distinguish pages (wake someone up) from tickets (fix tomorrow). Regularly review and tune alerts.
        </p>
      </div>

      <div style="margin-left: 24px; margin-top: 16px;">
        <p style="color: #7048e8; font-weight: 600; margin-bottom: 8px;">Q5.1.1: How do you define good SLOs for microservices?</p>
        <div style="background: #f3f0ff; padding: 16px; border-radius: 8px; border-left: 4px solid #7048e8;">
          <p style="color: #495057; font-size: 14px; margin: 0;">
            <strong>Answer:</strong> SLOs should reflect <span style="color: #2f9e44; font-weight: 600;">user experience</span>: (1) <span style="color: #2f9e44; font-weight: 600;">Availability</span> - "99.9% of requests succeed", (2) <span style="color: #2f9e44; font-weight: 600;">Latency</span> - "95% of requests complete in <200ms, 99% in <1s", (3) <span style="color: #2f9e44; font-weight: 600;">Correctness</span> - "99.99% of orders processed correctly". Start with what users actually need - don't promise 99.99% if 99.9% is sufficient (that's 10x harder). Different services need different SLOs - payment needs higher than recommendations. Track SLIs (indicators) continuously, compare against SLOs, alert when error budget burns too fast.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

---

## Common Interview Questions: Quick Reference

<div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #dee2e6;">
  <h4 style="color: #495057; margin: 0 0 20px 0;">RAPID-FIRE Q&A</h4>

  <div style="display: grid; gap: 16px;">

    <div style="background: #fff; padding: 16px; border-radius: 8px; border-left: 4px solid #1971c2;">
      <p style="color: #1971c2; font-weight: 600; margin: 0 0 8px 0;">When should you NOT use microservices?</p>
      <p style="color: #495057; font-size: 13px; margin: 0;">Small team (<10 devs), unclear domain boundaries, tight deadlines, early-stage startup, or when performance requires tight coupling. The operational overhead isn't worth it for simple applications.</p>
    </div>

    <div style="background: #fff; padding: 16px; border-radius: 8px; border-left: 4px solid #2f9e44;">
      <p style="color: #2f9e44; font-weight: 600; margin: 0 0 8px 0;">How do you handle API versioning?</p>
      <p style="color: #495057; font-size: 13px; margin: 0;">Use <span style="color: #2f9e44; font-weight: 600;">semantic versioning</span> in URLs (/v1/users) or headers. Apply <span style="color: #2f9e44; font-weight: 600;">tolerant reader pattern</span> - ignore unknown fields. Run multiple versions simultaneously during migration. Use <span style="color: #2f9e44; font-weight: 600;">consumer-driven contracts</span> (Pact) to verify compatibility.</p>
    </div>

    <div style="background: #fff; padding: 16px; border-radius: 8px; border-left: 4px solid #e67700;">
      <p style="color: #e67700; font-weight: 600; margin: 0 0 8px 0;">What's the difference between orchestration and choreography?</p>
      <p style="color: #495057; font-size: 13px; margin: 0;"><span style="color: #2f9e44; font-weight: 600;">Orchestration</span>: Central coordinator directs workflow (easier to understand, single point of control). <span style="color: #2f9e44; font-weight: 600;">Choreography</span>: Services react to events independently (more decoupled, harder to trace). Use orchestration for complex business processes, choreography for simple event reactions.</p>
    </div>

    <div style="background: #fff; padding: 16px; border-radius: 8px; border-left: 4px solid #7048e8;">
      <p style="color: #7048e8; font-weight: 600; margin: 0 0 8px 0;">How do you handle service discovery?</p>
      <p style="color: #495057; font-size: 13px; margin: 0;">Options: (1) <span style="color: #2f9e44; font-weight: 600;">DNS-based</span> (Kubernetes Services) - simple, built-in, (2) <span style="color: #2f9e44; font-weight: 600;">Service registry</span> (Consul, Eureka) - more features, health checks, (3) <span style="color: #2f9e44; font-weight: 600;">Service mesh</span> (Istio, Linkerd) - transparent, advanced traffic management. Kubernetes DNS is sufficient for most cases.</p>
    </div>

    <div style="background: #fff; padding: 16px; border-radius: 8px; border-left: 4px solid #c92a2a;">
      <p style="color: #c92a2a; font-weight: 600; margin: 0 0 8px 0;">What is a distributed monolith and how do you avoid it?</p>
      <p style="color: #495057; font-size: 13px; margin: 0;">A distributed monolith has microservice deployment but monolithic coupling - services can't deploy independently, share databases, or have circular dependencies. Avoid by: enforcing <span style="color: #2f9e44; font-weight: 600;">database per service</span>, using <span style="color: #2f9e44; font-weight: 600;">async communication</span>, defining clear <span style="color: #2f9e44; font-weight: 600;">API contracts</span>, and ensuring teams can deploy independently.</p>
    </div>

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

- [[API Gateway]](/topic/system-design/api-gateway) - Single entry point for microservices
- [[Message Queues]](/topic/system-design/message-queues) - Async communication patterns
- [[Service Discovery]](/topic/system-design/service-discovery) - Finding service instances
- [[Event Sourcing]](/topic/system-design/event-sourcing) - Event-based data storage
- [[CQRS]](/topic/system-design/cqrs) - Command Query Responsibility Segregation
- [[Distributed Locking]](/topic/system-design/distributed-locking) - Coordination across services
- [[Rate Limiting]](/topic/system-design/rate-limiting) - Protecting services from overload
- [[Load Balancing]](/topic/system-design/load-balancing) - Distributing traffic across instances
- [[Code Deployment]](/topic/system-architectures/code-deployment) - CI/CD and deployment strategies
- [[Kubernetes]](/topic/system-design/kubernetes) - Container orchestration
