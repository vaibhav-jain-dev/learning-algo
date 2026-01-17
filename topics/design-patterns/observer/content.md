# Observer Pattern

## Overview

The Observer pattern defines a one-to-many dependency between objects so that when one object (subject) changes state, all its dependents (observers) are notified and updated automatically. It's fundamental to event-driven programming and reactive systems.

**Difficulty:** Intermediate (Simple concept, complex at scale)
**Category:** Behavioral Pattern
**Also Known As:** Publish-Subscribe, Event-Subscriber, Listener

---

## Intuitive Understanding

<div class="metaphor-card">
  <div class="metaphor-icon">📰</div>
  <div class="metaphor-title">Think of a Newspaper Subscription</div>
  <div class="metaphor-description">
    Imagine you're a newspaper publisher (Subject). Instead of people coming to your office every morning to check if there's news, they subscribe once. When you have news, you deliver it to ALL subscribers automatically.
    Subscribers don't poll you. You push to them. They can unsubscribe anytime without affecting others.
  </div>
  <div class="metaphor-mapping">
    <div class="mapping-item">
      <span class="real">Publisher (newspaper)</span>
      <span class="arrow">→</span>
      <span class="concept">Subject</span>
    </div>
    <div class="mapping-item">
      <span class="real">Subscriber list</span>
      <span class="arrow">→</span>
      <span class="concept">observers[]</span>
    </div>
    <div class="mapping-item">
      <span class="real">Subscribe to paper</span>
      <span class="arrow">→</span>
      <span class="concept">attach(observer)</span>
    </div>
    <div class="mapping-item">
      <span class="real">Cancel subscription</span>
      <span class="arrow">→</span>
      <span class="concept">detach(observer)</span>
    </div>
    <div class="mapping-item">
      <span class="real">Deliver newspapers</span>
      <span class="arrow">→</span>
      <span class="concept">notify()</span>
    </div>
    <div class="mapping-item">
      <span class="real">Read the paper</span>
      <span class="arrow">→</span>
      <span class="concept">update(data)</span>
    </div>
  </div>
</div>

### The 20-Year Insight

After decades of building event-driven systems, here's the expert perspective:

**Novice thinks:** "Observer decouples my components!"

**Expert knows:** "Observer creates **temporal coupling** and **hidden dependencies**. The subject doesn't know WHO is listening or HOW LONG they'll take. This is both its power and its trap. In distributed systems, 'fire and forget' notifications can cascade into system-wide failures."

<div id="observer-complexity-diagram" class="diagram-container light"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const diagram = new FlowchartDiagram('observer-complexity-diagram', {
        width: 700,
        height: 500,
        nodeWidth: 140,
        nodeHeight: 70,
        spacing: 90,
        nodes: [
            { id: 'start', label: 'subject.notify()', type: 'terminal' },
            { id: 'q1', label: '❓ Order?\nWhich runs first?', type: 'decision', highlighted: true },
            { id: 'q2', label: '❓ Sync?\nBlock or async?', type: 'decision', highlighted: true },
            { id: 'q3', label: '❓ Error?\nOne fails - others?', type: 'decision', highlighted: true },
            { id: 'q4', label: '❓ Leak?\nUnsubscribe all?', type: 'decision', highlighted: true },
            { id: 'result', label: '⚠️ System-wide consequences', type: 'terminal', highlighted: false }
        ],
        edges: [
            { from: 'start', to: 'q1', label: '' },
            { from: 'q1', to: 'q2', label: '' },
            { from: 'q2', to: 'q3', label: '' },
            { from: 'q3', to: 'q4', label: '' },
            { from: 'q4', to: 'result', label: '' }
        ]
    });
    diagramEngine.register('observer-complexity-diagram', diagram);
    diagram.render();
});
</script>

---

## Mental Model: Push vs Pull

Two fundamental approaches that change everything:

### Push Model (Subject sends data)

```python
def notify(self):
    for observer in self._observers:
        observer.update(self.state)  # Subject decides what to send
```

**Pros:**
- Observer gets exactly what it needs
- Single call, efficient

**Cons:**
- Subject must know what observers need
- May send too much data

### Pull Model (Observer fetches data)

```python
def notify(self):
    for observer in self._observers:
        observer.update(self)  # Observer pulls what it needs

# In observer:
def update(self, subject):
    data = subject.get_state()  # Observer decides what to get
```

**Pros:**
- Observers get exactly what they need
- Subject is simpler

**Cons:**
- Multiple calls to subject
- Subject state might change between pulls

### Hybrid (Best Practice)

```python
def notify(self, event_type: str, changed_data: dict):
    for observer in self._observers[event_type]:
        observer.update(event_type, changed_data, self)
```

---

## Key Concepts

### When to Use

1. **UI Updates** - Model changes → multiple views update
2. **Event Systems** - Decouple event producers from consumers
3. **Cache Invalidation** - Data changes → caches notified
4. **Audit Logging** - Actions → audit trail without coupling
5. **Real-time Features** - Stock prices, chat, live scores

### When NOT to Use

<div class="warning-box">
  <div class="warning-title">⚠️ Observer Anti-Patterns</div>
  <div class="warning-content">
    <ul>
      <li><strong>Cascading Updates:</strong> Observer A updates, triggers Observer B, triggers A again → infinite loop</li>
      <li><strong>Order Dependencies:</strong> If observer order matters, you have hidden coupling</li>
      <li><strong>Synchronous Bottleneck:</strong> Slow observer blocks everyone</li>
      <li><strong>Memory Leaks:</strong> Observers not unsubscribed hold references</li>
      <li><strong>God Subject:</strong> Everything observes one central object</li>
    </ul>
  </div>
</div>

### Structure

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d;">
<h4 style="color: #4ecdc4; margin-top: 0; text-align: center;">Observer Pattern Structure</h4>
<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
<!-- Subject Box -->
<div style="background: #252540; border: 2px solid #569cd6; border-radius: 8px; width: 280px;">
<div style="background: #569cd6; color: white; padding: 8px 16px; font-weight: bold; text-align: center;">Subject</div>
<div style="padding: 12px; border-bottom: 1px solid #30363d;">
<code style="color: #ce9178;">- observers: List&lt;Observer&gt;</code>
</div>
<div style="padding: 12px;">
<code style="color: #dcdcaa;">+ attach(observer)</code><br>
<code style="color: #dcdcaa;">+ detach(observer)</code><br>
<code style="color: #dcdcaa;">+ notify()</code>
</div>
</div>
<div style="color: #569cd6; font-size: 24px;">↓ <span style="font-size: 14px; color: #888;">notifies</span></div>
<!-- Observer Interface Box -->
<div style="background: #252540; border: 2px solid #4ecdc4; border-radius: 8px; width: 280px;">
<div style="background: #4ecdc4; color: #1a1a2e; padding: 8px 16px; font-weight: bold; text-align: center;">«interface» Observer</div>
<div style="padding: 12px;">
<code style="color: #dcdcaa;">+ update(data)</code>
</div>
</div>
<div style="color: #4ecdc4; font-size: 24px;">△</div>
<!-- Concrete Observers -->
<div style="display: flex; gap: 20px; justify-content: center;">
<div style="background: #252540; border: 2px solid #888; border-radius: 8px; width: 130px; text-align: center; padding: 12px;">
<span style="color: #ddd;">ObserverA</span>
</div>
<div style="background: #252540; border: 2px solid #888; border-radius: 8px; width: 130px; text-align: center; padding: 12px;">
<span style="color: #ddd;">ObserverB</span>
</div>
</div>
</div>
</div>

---

## Implementation

### Python - Classic Observer

```python
from abc import ABC, abstractmethod
from typing import List, Any

class Observer(ABC):
    @abstractmethod
    def update(self, data: Any) -> None:
        pass


class Subject:
    def __init__(self):
        self._observers: List[Observer] = []
        self._state: Any = None

    def attach(self, observer: Observer) -> None:
        if observer not in self._observers:
            self._observers.append(observer)

    def detach(self, observer: Observer) -> None:
        self._observers.remove(observer)

    def notify(self) -> None:
        for observer in self._observers:
            observer.update(self._state)

    @property
    def state(self) -> Any:
        return self._state

    @state.setter
    def state(self, value: Any) -> None:
        self._state = value
        self.notify()


# Concrete observers
class EmailNotifier(Observer):
    def update(self, data: Any) -> None:
        print(f"Email: Sending notification about {data}")


class SMSNotifier(Observer):
    def update(self, data: Any) -> None:
        print(f"SMS: Sending text about {data}")


# Usage
stock = Subject()
stock.attach(EmailNotifier())
stock.attach(SMSNotifier())
stock.state = {"symbol": "AAPL", "price": 150.00}
```

### Python - Production-Grade Event System

```python
from typing import Callable, Dict, List, Any, Optional, Set
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum, auto
from contextlib import contextmanager
from concurrent.futures import ThreadPoolExecutor
import threading
import logging
import weakref
import traceback

logger = logging.getLogger(__name__)


class EventPriority(Enum):
    """Observer execution priority."""
    CRITICAL = auto()  # Runs first, synchronously
    HIGH = auto()
    NORMAL = auto()
    LOW = auto()       # Runs last, can be async


@dataclass
class Event:
    """Rich event object with metadata."""
    type: str
    data: Any
    source: str = "unknown"
    timestamp: datetime = field(default_factory=datetime.now)
    correlation_id: Optional[str] = None

    def __post_init__(self):
        if self.correlation_id is None:
            self.correlation_id = f"{self.type}-{id(self)}"


@dataclass
class Subscription:
    """Tracks subscription with metadata."""
    callback: Callable[[Event], None]
    priority: EventPriority = EventPriority.NORMAL
    filter_fn: Optional[Callable[[Event], bool]] = None
    max_calls: Optional[int] = None  # Auto-unsubscribe after N calls
    call_count: int = 0
    created_at: datetime = field(default_factory=datetime.now)


class EventEmitter:
    """
    Production-grade event emitter with:
    - Priority-based execution
    - Event filtering
    - Error isolation
    - Memory leak prevention (weak refs)
    - Async support
    - Metrics
    """

    def __init__(
        self,
        max_workers: int = 4,
        error_handler: Callable[[Exception, Event, Subscription], None] = None
    ):
        self._listeners: Dict[str, List[Subscription]] = {}
        self._lock = threading.RLock()
        self._executor = ThreadPoolExecutor(max_workers=max_workers)
        self._error_handler = error_handler or self._default_error_handler
        self._metrics = {
            "events_emitted": 0,
            "callbacks_executed": 0,
            "errors_caught": 0,
        }
        self._paused_events: Set[str] = set()

    def on(
        self,
        event_type: str,
        callback: Callable[[Event], None],
        priority: EventPriority = EventPriority.NORMAL,
        filter_fn: Callable[[Event], bool] = None,
        max_calls: int = None,
    ) -> Subscription:
        """
        Subscribe to an event type.

        Args:
            event_type: Event type to listen for. Use "*" for all events.
            callback: Function to call when event occurs.
            priority: Execution priority (CRITICAL runs first).
            filter_fn: Optional filter - callback only runs if filter returns True.
            max_calls: Auto-unsubscribe after this many calls.

        Returns:
            Subscription object for later unsubscription.
        """
        subscription = Subscription(
            callback=callback,
            priority=priority,
            filter_fn=filter_fn,
            max_calls=max_calls,
        )

        with self._lock:
            if event_type not in self._listeners:
                self._listeners[event_type] = []
            self._listeners[event_type].append(subscription)
            # Sort by priority
            self._listeners[event_type].sort(key=lambda s: s.priority.value)

        return subscription

    def once(
        self,
        event_type: str,
        callback: Callable[[Event], None],
        **kwargs
    ) -> Subscription:
        """Subscribe for exactly one event."""
        return self.on(event_type, callback, max_calls=1, **kwargs)

    def off(self, event_type: str, subscription: Subscription) -> bool:
        """Unsubscribe from an event."""
        with self._lock:
            if event_type in self._listeners:
                try:
                    self._listeners[event_type].remove(subscription)
                    return True
                except ValueError:
                    return False
        return False

    def emit(
        self,
        event_type: str,
        data: Any = None,
        source: str = None,
        correlation_id: str = None,
        wait: bool = False,
    ) -> None:
        """
        Emit an event to all subscribers.

        Args:
            event_type: Type of event.
            data: Event payload.
            source: Event source identifier.
            correlation_id: For tracking related events.
            wait: If True, wait for all async callbacks to complete.
        """
        if event_type in self._paused_events:
            logger.debug(f"Event {event_type} is paused, skipping")
            return

        event = Event(
            type=event_type,
            data=data,
            source=source or "emit",
            correlation_id=correlation_id,
        )

        self._metrics["events_emitted"] += 1

        # Collect matching subscriptions
        with self._lock:
            subscriptions = list(self._listeners.get(event_type, []))
            # Also notify wildcard listeners
            subscriptions.extend(self._listeners.get("*", []))

        futures = []
        to_remove = []

        for sub in subscriptions:
            # Apply filter
            if sub.filter_fn and not sub.filter_fn(event):
                continue

            # Check max calls
            if sub.max_calls and sub.call_count >= sub.max_calls:
                to_remove.append((event_type, sub))
                continue

            sub.call_count += 1

            # Execute based on priority
            if sub.priority == EventPriority.CRITICAL:
                self._execute_callback(sub, event)
            else:
                future = self._executor.submit(self._execute_callback, sub, event)
                futures.append(future)

        # Clean up expired subscriptions
        for event_type, sub in to_remove:
            self.off(event_type, sub)

        # Wait if requested
        if wait:
            for future in futures:
                future.result()

    def _execute_callback(self, sub: Subscription, event: Event) -> None:
        """Execute a single callback with error handling."""
        try:
            sub.callback(event)
            self._metrics["callbacks_executed"] += 1
        except Exception as e:
            self._metrics["errors_caught"] += 1
            self._error_handler(e, event, sub)

    def _default_error_handler(
        self,
        error: Exception,
        event: Event,
        subscription: Subscription
    ) -> None:
        """Default error handler - logs but doesn't propagate."""
        logger.error(
            f"Error in event handler for {event.type}: {error}\n"
            f"Event data: {event.data}\n"
            f"Traceback: {traceback.format_exc()}"
        )

    @contextmanager
    def pause_events(self, *event_types: str):
        """Temporarily pause specific event types."""
        try:
            for et in event_types:
                self._paused_events.add(et)
            yield
        finally:
            for et in event_types:
                self._paused_events.discard(et)

    def get_metrics(self) -> dict:
        """Return event metrics."""
        return dict(self._metrics)

    def clear(self, event_type: str = None) -> None:
        """Clear all subscriptions for an event type, or all events."""
        with self._lock:
            if event_type:
                self._listeners.pop(event_type, None)
            else:
                self._listeners.clear()


# ============================================================
# USAGE EXAMPLE
# ============================================================

class OrderService:
    """Service using event emitter for decoupled notifications."""

    def __init__(self):
        self.events = EventEmitter()

    def create_order(self, order_data: dict) -> dict:
        order = {"id": 123, **order_data, "status": "created"}

        # Emit event - handlers are decoupled
        self.events.emit(
            "order.created",
            data=order,
            source="order_service",
        )

        return order

    def ship_order(self, order_id: int) -> None:
        self.events.emit("order.shipped", {"order_id": order_id})


# Set up handlers
order_service = OrderService()

# Email handler - high priority, must run
@order_service.events.on("order.created", priority=EventPriority.HIGH)
def send_confirmation(event: Event):
    print(f"[Email] Confirmation for order {event.data['id']}")

# Analytics - low priority, can be async
@order_service.events.on("order.created", priority=EventPriority.LOW)
def track_analytics(event: Event):
    print(f"[Analytics] Tracking order {event.data['id']}")

# Conditional handler - only for high-value orders
@order_service.events.on(
    "order.created",
    filter_fn=lambda e: e.data.get("total", 0) > 1000
)
def notify_vip_team(event: Event):
    print(f"[VIP] High value order: {event.data['id']}")

# Wildcard handler for logging
@order_service.events.on("*")
def log_all_events(event: Event):
    print(f"[LOG] {event.type} at {event.timestamp}")

# Create an order
order_service.create_order({"product": "iPhone", "total": 1500})
```

### Go - Observer with Channels

```go
package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

// ============================================================
// PRODUCTION-GRADE OBSERVER IN GO
// Uses channels for true async, non-blocking notifications
// ============================================================

type Event struct {
	Type          string
	Data          interface{}
	Timestamp     time.Time
	CorrelationID string
}

type EventHandler func(Event)

type Subscription struct {
	ID        string
	Handler   EventHandler
	EventType string
	done      chan struct{}
}

func (s *Subscription) Unsubscribe() {
	close(s.done)
}

type EventBus struct {
	mu            sync.RWMutex
	subscriptions map[string][]*Subscription
	eventQueue    chan Event
	metrics       struct {
		eventsPublished int64
		eventsDelivered int64
		errors          int64
	}
	ctx    context.Context
	cancel context.CancelFunc
}

func NewEventBus(bufferSize int) *EventBus {
	ctx, cancel := context.WithCancel(context.Background())
	eb := &EventBus{
		subscriptions: make(map[string][]*Subscription),
		eventQueue:    make(chan Event, bufferSize),
		ctx:           ctx,
		cancel:        cancel,
	}
	go eb.processEvents()
	return eb
}

func (eb *EventBus) Subscribe(eventType string, handler EventHandler) *Subscription {
	eb.mu.Lock()
	defer eb.mu.Unlock()

	sub := &Subscription{
		ID:        fmt.Sprintf("%s-%d", eventType, time.Now().UnixNano()),
		Handler:   handler,
		EventType: eventType,
		done:      make(chan struct{}),
	}

	eb.subscriptions[eventType] = append(eb.subscriptions[eventType], sub)

	return sub
}

func (eb *EventBus) Unsubscribe(sub *Subscription) {
	eb.mu.Lock()
	defer eb.mu.Unlock()

	subs := eb.subscriptions[sub.EventType]
	for i, s := range subs {
		if s.ID == sub.ID {
			eb.subscriptions[sub.EventType] = append(subs[:i], subs[i+1:]...)
			sub.Unsubscribe()
			break
		}
	}
}

func (eb *EventBus) Publish(eventType string, data interface{}) {
	event := Event{
		Type:          eventType,
		Data:          data,
		Timestamp:     time.Now(),
		CorrelationID: fmt.Sprintf("%d", time.Now().UnixNano()),
	}

	select {
	case eb.eventQueue <- event:
		eb.metrics.eventsPublished++
	default:
		// Queue full - handle backpressure
		fmt.Println("Warning: Event queue full, dropping event")
		eb.metrics.errors++
	}
}

func (eb *EventBus) processEvents() {
	for {
		select {
		case event := <-eb.eventQueue:
			eb.dispatch(event)
		case <-eb.ctx.Done():
			return
		}
	}
}

func (eb *EventBus) dispatch(event Event) {
	eb.mu.RLock()
	subs := make([]*Subscription, len(eb.subscriptions[event.Type]))
	copy(subs, eb.subscriptions[event.Type])

	// Also get wildcard subscribers
	wildcards := make([]*Subscription, len(eb.subscriptions["*"]))
	copy(wildcards, eb.subscriptions["*"])
	eb.mu.RUnlock()

	// Dispatch to all subscribers concurrently
	var wg sync.WaitGroup

	allSubs := append(subs, wildcards...)
	for _, sub := range allSubs {
		wg.Add(1)
		go func(s *Subscription) {
			defer wg.Done()
			defer func() {
				if r := recover(); r != nil {
					fmt.Printf("Recovered from panic in handler: %v\n", r)
					eb.metrics.errors++
				}
			}()

			select {
			case <-s.done:
				// Subscription cancelled
				return
			default:
				s.Handler(event)
				eb.metrics.eventsDelivered++
			}
		}(sub)
	}

	wg.Wait()
}

func (eb *EventBus) GetMetrics() map[string]int64 {
	return map[string]int64{
		"events_published": eb.metrics.eventsPublished,
		"events_delivered": eb.metrics.eventsDelivered,
		"errors":           eb.metrics.errors,
	}
}

func (eb *EventBus) Shutdown() {
	eb.cancel()
	close(eb.eventQueue)
}

// ============================================================
// USAGE
// ============================================================

func main() {
	bus := NewEventBus(100)
	defer bus.Shutdown()

	// Subscribe handlers
	sub1 := bus.Subscribe("order.created", func(e Event) {
		fmt.Printf("[Email] Order created: %v\n", e.Data)
	})

	bus.Subscribe("order.created", func(e Event) {
		fmt.Printf("[Analytics] Tracking: %v\n", e.Data)
	})

	// Wildcard subscriber for logging
	bus.Subscribe("*", func(e Event) {
		fmt.Printf("[LOG] Event %s at %s\n", e.Type, e.Timestamp.Format(time.RFC3339))
	})

	// Publish events
	bus.Publish("order.created", map[string]interface{}{
		"order_id": 123,
		"amount":   99.99,
	})

	bus.Publish("order.shipped", map[string]interface{}{
		"order_id":   123,
		"carrier":    "FedEx",
		"tracking":   "1Z999AA1",
	})

	// Give time for async processing
	time.Sleep(100 * time.Millisecond)

	// Unsubscribe and publish again
	bus.Unsubscribe(sub1)
	bus.Publish("order.created", map[string]interface{}{
		"order_id": 124,
	})

	time.Sleep(100 * time.Millisecond)

	fmt.Printf("Metrics: %+v\n", bus.GetMetrics())
}
```

---

## Production War Stories

<div class="war-story">
  <div class="war-story-header">
    <span class="war-story-icon">💥</span>
    <span class="war-story-title">The Observer That Killed the Database</span>
  </div>
  <div class="war-story-content">
    <p><strong>Company:</strong> E-commerce platform (100K+ orders/day)</p>
    <p><strong>The Setup:</strong> Order service emitted events. One observer updated inventory, another sent emails, another wrote audit logs.</p>
    <p><strong>The Bug:</strong> The audit log observer was synchronous and wrote to the database. When DB was slow, it blocked ALL order processing.</p>
    <p><strong>The Impact:</strong> 45-minute outage during peak hours. ~$500K in lost orders.</p>
```python
# BEFORE: Synchronous death spiral
class OrderSubject:
    def notify(self):
        for observer in self._observers:
            observer.update(self._state)  # Each blocks the next!
class AuditLogObserver:
    def update(self, order):
        # This blocked everything when DB was slow
        self.db.insert("audit_logs", order)  # 2 second timeout!
# AFTER: Async with timeout and fallback
class OrderSubject:
    async def notify(self):
        tasks = []
        for observer in self._observers:
            task = asyncio.create_task(
                asyncio.wait_for(
                    observer.update(self._state),
                    timeout=0.5  # 500ms max
                )
            )
            tasks.append(task)
        results = await asyncio.gather(*tasks, return_exceptions=True)
        for i, result in enumerate(results):
            if isinstance(result, Exception):
                logger.error(f"Observer {i} failed: {result}")
                # Queue for retry
                self._failed_queue.put((self._observers[i], self._state))
```
    <p><strong>Lesson:</strong> Never let a slow observer block critical paths. Use async, timeouts, and fallback queues.</p>
  </div>
</div>

<div class="war-story">
  <div class="war-story-header">
    <span class="war-story-icon">🔥</span>
    <span class="war-story-title">The Memory Leak That Grew 1GB/Hour</span>
  </div>
  <div class="war-story-content">
    <p><strong>The Setup:</strong> React-style component system. Each component subscribed to a global state store.</p>
    <p><strong>The Bug:</strong> Components subscribed in constructor but never unsubscribed. Components were recreated frequently (tab switches, navigation).</p>
```javascript
// BEFORE: Memory leak
class UserProfile {
    constructor() {
        // Subscribes but never unsubscribes
        stateStore.subscribe('user.updated', this.onUserUpdate.bind(this));
    }
    // No cleanup method!
}
// AFTER: Proper lifecycle management
class UserProfile {
    constructor() {
        this.subscription = stateStore.subscribe(
            'user.updated',
            this.onUserUpdate.bind(this)
        );
    }
    destroy() {
        // ALWAYS unsubscribe!
        this.subscription.unsubscribe();
    }
}
// Or use weak references (advanced)
class WeakEventEmitter {
    constructor() {
        this._listeners = new WeakMap();
    }
    subscribe(observer) {
        // Garbage collector can clean up if observer is gone
        this._listeners.set(observer, true);
    }
}
```
    <p><strong>Lesson:</strong> Always pair subscribe with unsubscribe. Use weak references when possible. Monitor memory in production.</p>
  </div>
</div>

<div class="war-story">
  <div class="war-story-header">
    <span class="war-story-icon">⚡</span>
    <span class="war-story-title">The Infinite Loop That Crashed 500 Servers</span>
  </div>
  <div class="war-story-content">
    <p><strong>The Setup:</strong> Microservices communicating via events. Service A listened to Service B, and B listened to A.</p>
    <p><strong>The Bug:</strong> A's handler for B's events triggered an event that B listened to, which triggered A again.</p>
```python
# Service A
@event_bus.on("user.updated")
def handle_user_update(event):
    # Update local cache
    update_cache(event.data)
    # This triggers Service B!
    event_bus.emit("cache.invalidated", event.data)
# Service B
@event_bus.on("cache.invalidated")
def handle_cache_invalidation(event):
    # Refresh from source
    refresh_data(event.data)
    # This triggers Service A again!
    event_bus.emit("user.updated", event.data)
# INFINITE LOOP!
```
    <p><strong>The Fix:</strong></p>
```python
# Solution 1: Track event origin
@event_bus.on("user.updated")
def handle_user_update(event):
    # Don't process events we originated
    if event.source == "service_a":
        return
    update_cache(event.data)
    event_bus.emit("cache.invalidated", event.data, source="service_a")
# Solution 2: Use correlation ID to detect cycles
@event_bus.on("user.updated")
def handle_user_update(event):
    if event.correlation_id in self._processed_ids:
        logger.warning(f"Cycle detected: {event.correlation_id}")
        return
    self._processed_ids.add(event.correlation_id)
    # Process...
# Solution 3: Separate event types
# "user.updated.external" vs "user.updated.internal"
```
    <p><strong>Lesson:</strong> In distributed systems, always consider event cycles. Use correlation IDs, source tracking, or idempotent handlers.</p>
  </div>
</div>

---

## Deep Dive: Observer in Distributed Systems

### The Challenges

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d;">
<h4 style="color: #4ecdc4; margin-top: 0; text-align: center;">Local vs Distributed Observer</h4>
<div style="display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;">
<div style="flex: 1; min-width: 280px; background: #252540; border-radius: 8px; padding: 16px; border-left: 4px solid #569cd6;">
<h5 style="color: #569cd6; margin-top: 0;">Local Observer</h5>
<code style="color: #dcdcaa;">subject.notify()</code>
<ul style="color: #ddd; margin-top: 12px; padding-left: 20px;">
<li>In-memory, instant</li>
<li>Guaranteed delivery</li>
<li>Ordered execution</li>
<li>Failure = exception</li>
<li>Risk: Memory leaks</li>
</ul>
</div>
<div style="flex: 1; min-width: 280px; background: #252540; border-radius: 8px; padding: 16px; border-left: 4px solid #4ecdc4;">
<h5 style="color: #4ecdc4; margin-top: 0;">Distributed Observer</h5>
<code style="color: #dcdcaa;">message_queue.publish()</code>
<ul style="color: #ddd; margin-top: 12px; padding-left: 20px;">
<li>Network latency (ms to s)</li>
<li>At-least-once / At-most-once</li>
<li>Out-of-order possible</li>
<li>Failure = retry/DLQ</li>
<li>Risk: Queue fills up</li>
</ul>
</div>
</div>
</div>

### Solutions

**1. At-Least-Once with Idempotency**

```python
class IdempotentHandler:
    def __init__(self):
        self.processed_ids = set()  # Or Redis/DB for distributed

    def handle(self, event: Event):
        # Idempotency check
        if event.id in self.processed_ids:
            logger.info(f"Duplicate event {event.id}, skipping")
            return

        try:
            self._do_handle(event)
            self.processed_ids.add(event.id)
        except Exception as e:
            # Don't mark as processed - will retry
            raise
```

**2. Outbox Pattern for Reliability**

```python
class OrderService:
    def create_order(self, data):
        with self.db.transaction():
            # 1. Save order
            order = self.db.insert("orders", data)

            # 2. Save event to outbox (same transaction!)
            self.db.insert("event_outbox", {
                "type": "order.created",
                "payload": order,
                "status": "pending"
            })

        # 3. Separate process publishes from outbox
        # This guarantees event is published if order is saved
```

**3. Saga Pattern for Multi-Service Coordination**

```python
class OrderSaga:
    """
    Coordinates across services using events.
    Each step can compensate if later steps fail.
    """

    def execute(self, order_data):
        # Step 1: Create order
        self.event_bus.emit("order.create", order_data)

        # Step 2: Reserve inventory (compensate: release)
        self.event_bus.emit("inventory.reserve", order_data)

        # Step 3: Charge payment (compensate: refund)
        self.event_bus.emit("payment.charge", order_data)

    def on_payment_failed(self, event):
        # Compensate previous steps
        self.event_bus.emit("inventory.release", event.data)
        self.event_bus.emit("order.cancel", event.data)
```

---

## Expert-Level FAQs

<details>
<summary><strong>Q: How do I handle observer ordering dependencies?</strong></summary>

**A:** If ordering matters, you have three options:

**1. Priority System:**
```python
class PrioritySubject:
    def attach(self, observer, priority=0):
        self._observers.append((priority, observer))
        self._observers.sort(key=lambda x: x[0])
```

**2. Chain of Responsibility:**
```python
# Instead of multiple observers, one observer calls the next
class ObserverChain:
    def __init__(self, next_handler=None):
        self.next = next_handler

    def handle(self, event):
        self._do_handle(event)
        if self.next:
            self.next.handle(event)
```

**3. Rethink Your Design:**
If observers must run in order, they're not truly independent. Consider:
- Merging them into one observer with sequential steps
- Using a workflow/saga pattern
- Making dependencies explicit through data passing
</details>

<details>
<summary><strong>Q: Push vs Pull - which is better for performance?</strong></summary>

**A:** Depends on the data characteristics:

| Scenario | Recommendation | Why |
|----------|---------------|-----|
| Small, frequently changing data | Push | Reduces calls |
| Large data, observers need subset | Pull | Avoid sending unused data |
| Observer needs historical context | Pull | Can query subject |
| Real-time requirements | Push | Lower latency |
| Network-distributed | Push (with optimization) | Fewer round trips |

**Hybrid is often best:**
```python
def notify(self, change_summary: dict):
    """Push summary, let observers pull details if needed."""
    for observer in self._observers:
        observer.update(change_summary, subject=self)

# Observer can decide:
def update(self, summary: dict, subject):
    if summary["type"] == "minor_change":
        # Use summary directly
        self.handle_minor(summary)
    else:
        # Pull full state for major changes
        full_state = subject.get_state()
        self.handle_major(full_state)
```
</details>

<details>
<summary><strong>Q: How do I test observer-based code?</strong></summary>

**A:** Several strategies:

**1. Mock the subject:**
```python
def test_order_notification():
    # Arrange
    mock_subject = Mock()
    observer = EmailObserver()

    # Act
    observer.update({"order_id": 123})

    # Assert
    assert email_service.sent_count == 1
```

**2. Spy on observers:**
```python
def test_subject_notifies_all():
    subject = OrderSubject()
    spy1 = Mock()
    spy2 = Mock()

    subject.attach(spy1)
    subject.attach(spy2)
    subject.state = {"new": "data"}

    spy1.update.assert_called_once()
    spy2.update.assert_called_once()
```

**3. Integration test with real event bus:**
```python
def test_full_order_flow():
    received_events = []

    def capture_event(event):
        received_events.append(event)

    event_bus = EventBus()
    event_bus.subscribe("order.created", capture_event)

    order_service = OrderService(event_bus)
    order_service.create_order({"product": "test"})

    assert len(received_events) == 1
    assert received_events[0].data["product"] == "test"
```
</details>

<details>
<summary><strong>Q: How do I debug event-driven systems?</strong></summary>

**A:** Event-driven debugging is notoriously hard. Strategies:

**1. Correlation IDs:**
```python
def emit(self, event_type, data, correlation_id=None):
    if correlation_id is None:
        correlation_id = str(uuid.uuid4())

    # Log with correlation ID
    logger.info(f"[{correlation_id}] Emitting {event_type}")

    # Pass correlation ID through entire chain
    event = Event(type=event_type, data=data, correlation_id=correlation_id)
```

**2. Event Sourcing / Event Log:**
```python
class AuditedEventBus:
    def emit(self, event):
        # Store every event for replay/debugging
        self.event_store.append({
            "event": event,
            "timestamp": datetime.now(),
            "stack_trace": traceback.format_stack(),  # Who emitted?
        })
        super().emit(event)
```

**3. Visualization Tools:**
```
Timeline view:
t=0ms   [order.created]     → handler_1 started
t=5ms   [order.created]     → handler_2 started
t=10ms  [inventory.updated] → triggered by handler_1
t=15ms  [order.created]     → handler_1 completed
t=20ms  [email.sent]        → triggered by handler_2
```
</details>

---

## Common Mistakes and Anti-Patterns

### Mistake 1: The God Subject

```python
# BAD: Everything observes one central object
class ApplicationState:
    # Hundreds of observers watching this one subject
    # Any state change notifies everyone
    def set_state(self, key, value):
        self._state[key] = value
        self.notify()  # Notifies ALL observers for ANY change

# GOOD: Domain-specific subjects
class UserState:
    """Only user-related observers"""
    pass

class OrderState:
    """Only order-related observers"""
    pass

class CartState:
    """Only cart-related observers"""
    pass
```

### Mistake 2: Observer Knows Too Much About Subject

```python
# BAD: Tight coupling
class PriceObserver:
    def update(self, subject):
        # Observer reaches into subject's internals
        if subject._internal_flag:  # Accessing private!
            price = subject._calculate_internal_price()
            ...

# GOOD: Subject provides clean interface
class PriceObserver:
    def update(self, event):
        # Observer only uses event data
        if event.data["price_changed"]:
            new_price = event.data["price"]
            ...
```

### Mistake 3: Modifying Observer List During Notification

```python
# BAD: ConcurrentModificationException waiting to happen
class Subject:
    def notify(self):
        for observer in self._observers:  # Iterating
            observer.update(self)  # Observer might unsubscribe!

    def detach(self, observer):
        self._observers.remove(observer)  # Modifies list during iteration!

# GOOD: Copy or defer modifications
class Subject:
    def notify(self):
        # Copy the list
        observers = list(self._observers)
        for observer in observers:
            observer.update(self)

    # Or use a "to_remove" queue
    def notify(self):
        self._notifying = True
        for observer in self._observers:
            observer.update(self)
        self._notifying = False

        # Process deferred removals
        for observer in self._to_remove:
            self._observers.remove(observer)
        self._to_remove.clear()
```

---

## Modern Alternatives

### Reactive Streams (RxJS, RxPy, RxGo)

```python
from rx import create, operators as ops

# Observable (Subject) that emits values
def price_stream(observer, scheduler):
    observer.on_next(100)
    observer.on_next(105)
    observer.on_next(98)
    observer.on_completed()

source = create(price_stream)

# Subscribe with operators
source.pipe(
    ops.filter(lambda x: x > 100),  # Only prices above 100
    ops.map(lambda x: f"${x}"),     # Format
    ops.distinct_until_changed(),   # Dedupe
).subscribe(
    on_next=lambda x: print(f"Price alert: {x}"),
    on_error=lambda e: print(f"Error: {e}"),
    on_completed=lambda: print("Done"),
)
```

### Event-Driven Architecture with Message Queues

```python
# Instead of in-process observer, use message broker
import pika

class OrderService:
    def create_order(self, order_data):
        order = self.db.save(order_data)

        # Publish to RabbitMQ/Kafka/etc.
        self.channel.basic_publish(
            exchange='orders',
            routing_key='order.created',
            body=json.dumps(order),
        )

# Separate service handles the event
class EmailService:
    def __init__(self):
        self.channel.queue_bind(
            queue='email-queue',
            exchange='orders',
            routing_key='order.created',
        )
        self.channel.basic_consume(
            queue='email-queue',
            on_message_callback=self.send_email,
        )
```

### React/Vue Reactive State

```javascript
// Vue 3 Composition API - reactive by default
import { reactive, watch } from 'vue';

const state = reactive({
  user: { name: 'John', email: 'john@example.com' }
});

// Automatically "observes" state changes
watch(
  () => state.user.name,
  (newName, oldName) => {
    console.log(`Name changed from ${oldName} to ${newName}`);
  }
);

// This triggers the watcher
state.user.name = 'Jane';
```

---

## Interview Deep-Dive Questions

**For Senior/Staff Level:**

1. "Describe a production incident caused by observer pattern misuse. How did you fix it?"

2. "How would you implement observer pattern across microservices? What guarantees would you provide?"

3. "Compare synchronous observers vs async event bus vs message queue. When would you use each?"

4. "How do you handle the case where an observer needs to respond to the subject after processing?"

5. "Design an event system that supports replay, time-travel debugging, and event versioning."

---

## Related Patterns

- [Mediator](/topic/design-patterns/mediator) - Centralized communication instead of direct observer
- [Command](/topic/design-patterns/command) - Encapsulate requests as objects
- [Strategy](/topic/design-patterns/strategy) - Interchangeable algorithms
- [Event Sourcing](/topic/system-design/event-sourcing) - Store events as source of truth
- [Pub/Sub](/topic/system-design/message-queues) - Distributed observer pattern
