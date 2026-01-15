# Observer Pattern

## Overview

The Observer pattern defines a one-to-many dependency between objects so that when one object (subject) changes state, all its dependents (observers) are notified and updated automatically. It's fundamental to event-driven programming.

## Key Concepts

### When to Use

- Event handling systems
- Model-View-Controller architectures
- Pub/sub messaging systems
- Real-time data updates
- Loose coupling between components

### Structure

```
┌─────────────────────────┐
│        Subject          │
├─────────────────────────┤
│ - observers: List       │
├─────────────────────────┤
│ + attach(observer)      │
│ + detach(observer)      │
│ + notify()              │
└───────────┬─────────────┘
            │ notifies
            ▼
┌─────────────────────────┐
│       Observer          │
├─────────────────────────┤
│ + update(data)          │
└─────────────────────────┘
            △
    ┌───────┴───────┐
┌───┴───┐      ┌───┴───┐
│ObserverA│    │ObserverB│
└────────┘     └────────┘
```

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


class SlackNotifier(Observer):
    def update(self, data: Any) -> None:
        print(f"Slack: Posting message about {data}")


# Usage
stock = Subject()

email = EmailNotifier()
sms = SMSNotifier()
slack = SlackNotifier()

stock.attach(email)
stock.attach(sms)
stock.attach(slack)

stock.state = {"symbol": "AAPL", "price": 150.00}
# Email: Sending notification about {'symbol': 'AAPL', 'price': 150.0}
# SMS: Sending text about {'symbol': 'AAPL', 'price': 150.0}
# Slack: Posting message about {'symbol': 'AAPL', 'price': 150.0}

stock.detach(sms)
stock.state = {"symbol": "AAPL", "price": 155.00}
# Email: Sending notification about {'symbol': 'AAPL', 'price': 155.0}
# Slack: Posting message about {'symbol': 'AAPL', 'price': 155.0}
```

### Python - Event-Based Observer

```python
from typing import Callable, Dict, List, Any
from dataclasses import dataclass
from datetime import datetime

@dataclass
class Event:
    type: str
    data: Any
    timestamp: datetime = None

    def __post_init__(self):
        if self.timestamp is None:
            self.timestamp = datetime.now()


class EventEmitter:
    def __init__(self):
        self._listeners: Dict[str, List[Callable]] = {}

    def on(self, event_type: str, callback: Callable) -> Callable:
        """Subscribe to an event"""
        if event_type not in self._listeners:
            self._listeners[event_type] = []
        self._listeners[event_type].append(callback)
        return callback

    def off(self, event_type: str, callback: Callable) -> None:
        """Unsubscribe from an event"""
        if event_type in self._listeners:
            self._listeners[event_type].remove(callback)

    def emit(self, event_type: str, data: Any = None) -> None:
        """Emit an event to all subscribers"""
        event = Event(type=event_type, data=data)

        if event_type in self._listeners:
            for callback in self._listeners[event_type]:
                callback(event)

        # Also emit to wildcard listeners
        if "*" in self._listeners:
            for callback in self._listeners["*"]:
                callback(event)

    def once(self, event_type: str, callback: Callable) -> None:
        """Subscribe to an event for one-time notification"""
        def wrapper(event):
            callback(event)
            self.off(event_type, wrapper)
        self.on(event_type, wrapper)


# Usage
class OrderService:
    def __init__(self):
        self.events = EventEmitter()

    def create_order(self, order_data: dict):
        # Business logic
        order = {"id": 123, **order_data}

        # Emit events
        self.events.emit("order.created", order)
        return order

    def ship_order(self, order_id: int):
        self.events.emit("order.shipped", {"order_id": order_id})


# Subscribe to events
order_service = OrderService()

@order_service.events.on("order.created")
def send_confirmation_email(event):
    print(f"Sending confirmation for order {event.data['id']}")

@order_service.events.on("order.created")
def update_inventory(event):
    print(f"Updating inventory for order {event.data['id']}")

@order_service.events.on("order.shipped")
def send_tracking_email(event):
    print(f"Sending tracking info for order {event.data['order_id']}")

# Wildcard listener for logging
@order_service.events.on("*")
def log_event(event):
    print(f"[LOG] Event: {event.type} at {event.timestamp}")

# Create and ship order
order_service.create_order({"product": "iPhone", "quantity": 1})
order_service.ship_order(123)
```

### Go - Observer with Channels

```go
package main

import (
	"fmt"
	"sync"
)

type Event struct {
	Type string
	Data interface{}
}

type Observer interface {
	OnEvent(event Event)
}

type Subject struct {
	mu        sync.RWMutex
	observers map[string][]Observer
}

func NewSubject() *Subject {
	return &Subject{
		observers: make(map[string][]Observer),
	}
}

func (s *Subject) Subscribe(eventType string, observer Observer) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.observers[eventType] = append(s.observers[eventType], observer)
}

func (s *Subject) Unsubscribe(eventType string, observer Observer) {
	s.mu.Lock()
	defer s.mu.Unlock()

	observers := s.observers[eventType]
	for i, o := range observers {
		if o == observer {
			s.observers[eventType] = append(observers[:i], observers[i+1:]...)
			break
		}
	}
}

func (s *Subject) Notify(eventType string, data interface{}) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	event := Event{Type: eventType, Data: data}

	for _, observer := range s.observers[eventType] {
		go observer.OnEvent(event)
	}
}

// Concrete observers
type EmailObserver struct{}

func (e *EmailObserver) OnEvent(event Event) {
	fmt.Printf("Email: Received %s event with data: %v\n", event.Type, event.Data)
}

type LogObserver struct{}

func (l *LogObserver) OnEvent(event Event) {
	fmt.Printf("Log: [%s] %v\n", event.Type, event.Data)
}

type MetricsObserver struct{}

func (m *MetricsObserver) OnEvent(event Event) {
	fmt.Printf("Metrics: Recording %s event\n", event.Type)
}

func main() {
	subject := NewSubject()

	email := &EmailObserver{}
	logger := &LogObserver{}
	metrics := &MetricsObserver{}

	subject.Subscribe("order.created", email)
	subject.Subscribe("order.created", logger)
	subject.Subscribe("order.created", metrics)
	subject.Subscribe("order.shipped", email)

	subject.Notify("order.created", map[string]interface{}{
		"order_id": 123,
		"amount":   99.99,
	})

	// Wait for goroutines
	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		defer wg.Done()
		subject.Notify("order.shipped", map[string]interface{}{
			"order_id":    123,
			"tracking_no": "1Z999AA1",
		})
	}()
	wg.Wait()
}
```

### Go - Pub/Sub with Channels

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

type Message struct {
	Topic   string
	Payload interface{}
}

type Subscriber struct {
	ID       string
	Messages chan Message
	done     chan struct{}
}

func NewSubscriber(id string, bufferSize int) *Subscriber {
	return &Subscriber{
		ID:       id,
		Messages: make(chan Message, bufferSize),
		done:     make(chan struct{}),
	}
}

func (s *Subscriber) Listen(handler func(Message)) {
	go func() {
		for {
			select {
			case msg := <-s.Messages:
				handler(msg)
			case <-s.done:
				return
			}
		}
	}()
}

func (s *Subscriber) Stop() {
	close(s.done)
}

type PubSub struct {
	mu          sync.RWMutex
	subscribers map[string][]*Subscriber
}

func NewPubSub() *PubSub {
	return &PubSub{
		subscribers: make(map[string][]*Subscriber),
	}
}

func (ps *PubSub) Subscribe(topic string, sub *Subscriber) {
	ps.mu.Lock()
	defer ps.mu.Unlock()
	ps.subscribers[topic] = append(ps.subscribers[topic], sub)
}

func (ps *PubSub) Unsubscribe(topic string, sub *Subscriber) {
	ps.mu.Lock()
	defer ps.mu.Unlock()

	subs := ps.subscribers[topic]
	for i, s := range subs {
		if s.ID == sub.ID {
			ps.subscribers[topic] = append(subs[:i], subs[i+1:]...)
			break
		}
	}
}

func (ps *PubSub) Publish(topic string, payload interface{}) {
	ps.mu.RLock()
	defer ps.mu.RUnlock()

	msg := Message{Topic: topic, Payload: payload}

	for _, sub := range ps.subscribers[topic] {
		select {
		case sub.Messages <- msg:
		default:
			// Buffer full, skip or log
			fmt.Printf("Warning: subscriber %s buffer full\n", sub.ID)
		}
	}
}

func main() {
	pubsub := NewPubSub()

	// Create subscribers
	sub1 := NewSubscriber("email-service", 10)
	sub2 := NewSubscriber("analytics-service", 10)
	sub3 := NewSubscriber("notification-service", 10)

	// Subscribe to topics
	pubsub.Subscribe("user.registered", sub1)
	pubsub.Subscribe("user.registered", sub2)
	pubsub.Subscribe("order.placed", sub1)
	pubsub.Subscribe("order.placed", sub3)

	// Start listening
	sub1.Listen(func(msg Message) {
		fmt.Printf("[Email] Topic: %s, Data: %v\n", msg.Topic, msg.Payload)
	})

	sub2.Listen(func(msg Message) {
		fmt.Printf("[Analytics] Topic: %s, Data: %v\n", msg.Topic, msg.Payload)
	})

	sub3.Listen(func(msg Message) {
		fmt.Printf("[Notification] Topic: %s, Data: %v\n", msg.Topic, msg.Payload)
	})

	// Publish events
	pubsub.Publish("user.registered", map[string]string{
		"user_id": "user-123",
		"email":   "user@example.com",
	})

	pubsub.Publish("order.placed", map[string]interface{}{
		"order_id": "order-456",
		"amount":   99.99,
	})

	time.Sleep(100 * time.Millisecond)

	sub1.Stop()
	sub2.Stop()
	sub3.Stop()
}
```

## Real-World Examples

### Stock Price Monitor

```python
from dataclasses import dataclass
from typing import Dict, List, Callable
from decimal import Decimal
import random

@dataclass
class StockPrice:
    symbol: str
    price: Decimal
    change: Decimal
    change_percent: float


class StockMarket:
    def __init__(self):
        self._prices: Dict[str, Decimal] = {}
        self._watchers: Dict[str, List[Callable]] = {}

    def watch(self, symbol: str, callback: Callable[[StockPrice], None]):
        if symbol not in self._watchers:
            self._watchers[symbol] = []
        self._watchers[symbol].append(callback)

    def unwatch(self, symbol: str, callback: Callable):
        if symbol in self._watchers:
            self._watchers[symbol].remove(callback)

    def update_price(self, symbol: str, new_price: Decimal):
        old_price = self._prices.get(symbol, new_price)
        self._prices[symbol] = new_price

        change = new_price - old_price
        change_percent = float(change / old_price * 100) if old_price else 0

        stock_price = StockPrice(
            symbol=symbol,
            price=new_price,
            change=change,
            change_percent=change_percent
        )

        # Notify watchers
        for callback in self._watchers.get(symbol, []):
            callback(stock_price)


# Usage
market = StockMarket()

def alert_on_drop(stock: StockPrice):
    if stock.change_percent < -5:
        print(f"ALERT: {stock.symbol} dropped {stock.change_percent:.2f}%!")

def log_price(stock: StockPrice):
    print(f"{stock.symbol}: ${stock.price} ({stock.change_percent:+.2f}%)")

market.watch("AAPL", log_price)
market.watch("AAPL", alert_on_drop)
market.watch("GOOGL", log_price)

# Simulate price updates
market.update_price("AAPL", Decimal("150.00"))
market.update_price("AAPL", Decimal("145.00"))  # -3.33%
market.update_price("AAPL", Decimal("135.00"))  # -6.9% - triggers alert
```

## Common Interview Questions

1. **Push vs Pull model in Observer?**
   - Push: Subject sends data to observers
   - Pull: Observer fetches data from subject

2. **How to handle async observers?**
   - Use goroutines/threads
   - Event queue with worker pool
   - Consider backpressure

3. **How to prevent memory leaks?**
   - Remove observers when done
   - Use weak references
   - Lifecycle management

## Best Practices

1. **Define clear event types** - Document event contracts
2. **Handle errors** - Don't let one observer break others
3. **Consider ordering** - May need priority system
4. **Manage lifecycle** - Clean up subscriptions
5. **Use async wisely** - Balance responsiveness and complexity

## Related Patterns

- [Mediator](/topic/design-patterns/mediator) - Centralized communication
- [Command](/topic/design-patterns/command) - Encapsulate requests
- [Strategy](/topic/design-patterns/strategy) - Interchangeable algorithms
