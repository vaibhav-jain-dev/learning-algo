# Pub-Sub System

## Problem Statement

Design a publish-subscribe (pub-sub) messaging system that allows publishers to send messages to topics and subscribers to receive messages from topics they're interested in.

## Requirements

- Create and manage topics
- Subscribe/unsubscribe to topics
- Publish messages to topics
- Support message filtering
- Handle concurrent operations
- Optional: Message persistence, acknowledgments

---

## Solution Breakdown

### Part 1: Understanding the Pub-Sub Pattern

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

**Why Pub-Sub?**
- **Decoupling**: Publishers don't know about subscribers (and vice versa)
- **Scalability**: Add subscribers without changing publishers
- **Flexibility**: Filter, transform, or route messages dynamically

**Key Concepts:**
- **Publisher**: Sends messages to a topic (doesn't care who receives)
- **Subscriber**: Registers interest in topics (receives matching messages)
- **Broker**: The middleman that routes messages from publishers to subscribers
- **Topic**: A named channel for organizing messages

</div>

### Part 2: Message Flow Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center; font-size: 16px;">Message Flow: Publish to Delivery</h4>

<div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">

<!-- Publishers -->
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 16px;">📤</div>
<div style="color: #fff; font-size: 11px;">Publisher A</div>
</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 16px;">📤</div>
<div style="color: #fff; font-size: 11px;">Publisher B</div>
</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #7ee787; font-size: 10px;">publish()</div>
<div style="color: #7ee787; font-size: 20px;">→</div>
</div>

<!-- Broker with Topics -->
<div style="background: #21262d; padding: 20px; border-radius: 12px; border: 2px solid #30363d;">
<div style="color: #ffa657; font-weight: bold; font-size: 12px; text-align: center; margin-bottom: 12px;">🔀 Broker</div>
<div style="display: flex; flex-direction: column; gap: 6px;">
<div style="background: #238636; padding: 6px 12px; border-radius: 4px; text-align: center;">
<div style="color: #fff; font-size: 10px;">orders.*</div>
</div>
<div style="background: #8957e5; padding: 6px 12px; border-radius: 4px; text-align: center;">
<div style="color: #fff; font-size: 10px;">users.*</div>
</div>
<div style="background: #f78166; padding: 6px 12px; border-radius: 4px; text-align: center;">
<div style="color: #fff; font-size: 10px;">payments.*</div>
</div>
</div>
<div style="color: #8b949e; font-size: 9px; text-align: center; margin-top: 8px;">Topic Registry</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #a371f7; font-size: 10px;">dispatch()</div>
<div style="color: #a371f7; font-size: 20px;">→</div>
</div>

<!-- Message Queue -->
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); padding: 16px; border-radius: 12px; text-align: center;">
<div style="color: #fff; font-size: 20px;">📨</div>
<div style="color: #fff; font-weight: bold; font-size: 11px;">Message Queue</div>
<div style="display: flex; gap: 4px; justify-content: center; margin-top: 8px;">
<div style="background: rgba(0,0,0,0.3); width: 12px; height: 12px; border-radius: 2px;"></div>
<div style="background: rgba(0,0,0,0.3); width: 12px; height: 12px; border-radius: 2px;"></div>
<div style="background: rgba(0,0,0,0.3); width: 12px; height: 12px; border-radius: 2px;"></div>
</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #7ee787; font-size: 10px;">deliver()</div>
<div style="color: #7ee787; font-size: 20px;">→</div>
</div>

<!-- Subscribers -->
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 16px;">📥</div>
<div style="color: #fff; font-size: 11px;">Subscriber 1</div>
</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 16px;">📥</div>
<div style="color: #fff; font-size: 11px;">Subscriber 2</div>
</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 16px;">📥</div>
<div style="color: #fff; font-size: 11px;">Subscriber 3</div>
</div>
</div>

</div>

</div>

### Part 3: Topic Pattern Matching

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">

**Wildcard Patterns:**

| Pattern | Matches | Doesn't Match |
|---------|---------|---------------|
| `orders.created` | `orders.created` only | `orders.updated` |
| `orders.*` | `orders.created`, `orders.updated`, `orders.cancelled` | `users.created` |
| `*` | Everything | - |

**Pattern Matching Logic:**
```python
def matches_topic(pattern: str, topic: str) -> bool:
    if pattern == topic:
        return True                    # Exact match
    if pattern.endswith('*'):
        prefix = pattern[:-1]          # Remove wildcard
        return topic.startswith(prefix)  # Prefix match
    return False
```

**Example Flow:**
```
Subscriber subscribes to: "orders.*"
Publisher publishes to: "orders.created"

1. Broker receives message for "orders.created"
2. Checks all subscriptions: "orders.*".matches("orders.created") → True!
3. Message delivered to subscriber
```

</div>

### Part 4: Message Filtering

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

**Beyond topic matching**, subscribers can add custom filters:

```python
# Only receive orders above $100
def high_value_filter(msg: Message) -> bool:
    return msg.payload.get('amount', 0) > 100

broker.subscribe(
    subscriber_id="analytics",
    topic_pattern="orders.*",
    callback=process_order,
    filter_func=high_value_filter  # Custom filter!
)
```

**Filter Evaluation Order:**
1. Topic pattern match ← If fails, skip
2. Custom filter function ← If fails, skip
3. Deliver to subscriber ← Both passed

</div>

### Part 5: Worker Thread Pool

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center; font-size: 16px;">Async Message Delivery</h4>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 12px;">Why Worker Pool?</div>
<div style="color: #c9d1d9; font-size: 11px; line-height: 1.6;">
• Publishers shouldn't wait for slow subscribers<br>
• One slow subscriber shouldn't block others<br>
• Parallel delivery = higher throughput<br>
• Isolated failures per subscriber
</div>
</div>

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #ffa657; font-weight: bold; font-size: 13px; margin-bottom: 12px;">How It Works</div>
<div style="color: #c9d1d9; font-size: 11px; line-height: 1.6;">
1. publish() → enqueue message<br>
2. Worker dequeues message<br>
3. Find matching subscriptions<br>
4. Call each callback (in try/except)<br>
5. Log failures, continue to next
</div>
</div>

</div>

</div>

---

## Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| `publish()` | O(1) enqueue | O(1) |
| `subscribe()` | O(1) | O(1) |
| `dispatch()` | O(s) where s = subscriptions | O(1) |
| **Total Space** | - | O(t + s + m) topics, subs, messages |

---

## Solution

### Python

```python
import threading
import queue
import time
import uuid
from typing import Callable, Dict, List, Set, Optional, Any
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from collections import defaultdict


@dataclass
class Message:
    topic: str
    payload: Any
    message_id: str = field(default_factory=lambda: str(uuid.uuid4())[:8])
    timestamp: datetime = field(default_factory=datetime.now)
    headers: Dict[str, str] = field(default_factory=dict)

    def __repr__(self):
        return f"Message(id={self.message_id}, topic={self.topic}, payload={self.payload})"


class DeliveryMode(Enum):
    AT_MOST_ONCE = "at_most_once"      # Fire and forget
    AT_LEAST_ONCE = "at_least_once"    # With acknowledgment


@dataclass
class Subscription:
    subscriber_id: str
    topic_pattern: str
    callback: Callable[[Message], None]
    filter_func: Optional[Callable[[Message], bool]] = None
    created_at: datetime = field(default_factory=datetime.now)

    def matches_topic(self, topic: str) -> bool:
        """Check if topic matches subscription pattern (supports wildcards)."""
        if self.topic_pattern == topic:
            return True
        if self.topic_pattern.endswith('*'):
            prefix = self.topic_pattern[:-1]
            return topic.startswith(prefix)
        return False

    def should_deliver(self, message: Message) -> bool:
        if not self.matches_topic(message.topic):
            return False
        if self.filter_func and not self.filter_func(message):
            return False
        return True


class Topic:
    def __init__(self, name: str, max_size: int = 1000):
        self.name = name
        self.subscribers: Dict[str, Subscription] = {}
        self.message_history: List[Message] = []
        self.max_size = max_size
        self.lock = threading.Lock()

    def add_subscriber(self, subscription: Subscription):
        with self.lock:
            self.subscribers[subscription.subscriber_id] = subscription

    def remove_subscriber(self, subscriber_id: str):
        with self.lock:
            self.subscribers.pop(subscriber_id, None)

    def add_message(self, message: Message):
        with self.lock:
            self.message_history.append(message)
            if len(self.message_history) > self.max_size:
                self.message_history.pop(0)


class PubSubBroker:
    def __init__(self, num_workers: int = 4):
        self.topics: Dict[str, Topic] = {}
        self.subscriptions: Dict[str, Subscription] = {}  # All subscriptions
        self.message_queue: queue.Queue = queue.Queue()
        self.lock = threading.Lock()
        self.running = False
        self.num_workers = num_workers
        self.workers: List[threading.Thread] = []

        # Metrics
        self.messages_published = 0
        self.messages_delivered = 0

    def create_topic(self, topic_name: str) -> Topic:
        """Create a new topic."""
        with self.lock:
            if topic_name not in self.topics:
                self.topics[topic_name] = Topic(topic_name)
            return self.topics[topic_name]

    def delete_topic(self, topic_name: str) -> bool:
        """Delete a topic."""
        with self.lock:
            if topic_name in self.topics:
                del self.topics[topic_name]
                return True
            return False

    def subscribe(self, subscriber_id: str, topic_pattern: str,
                  callback: Callable[[Message], None],
                  filter_func: Optional[Callable[[Message], bool]] = None) -> str:
        """Subscribe to a topic pattern."""
        subscription = Subscription(
            subscriber_id=subscriber_id,
            topic_pattern=topic_pattern,
            callback=callback,
            filter_func=filter_func
        )

        with self.lock:
            self.subscriptions[subscriber_id] = subscription

            # Add to matching topics
            for topic_name, topic in self.topics.items():
                if subscription.matches_topic(topic_name):
                    topic.add_subscriber(subscription)

        return subscriber_id

    def unsubscribe(self, subscriber_id: str) -> bool:
        """Unsubscribe from all topics."""
        with self.lock:
            if subscriber_id not in self.subscriptions:
                return False

            subscription = self.subscriptions.pop(subscriber_id)

            # Remove from all topics
            for topic in self.topics.values():
                topic.remove_subscriber(subscriber_id)

            return True

    def publish(self, topic_name: str, payload: Any,
                headers: Dict[str, str] = None) -> Message:
        """Publish a message to a topic."""
        message = Message(
            topic=topic_name,
            payload=payload,
            headers=headers or {}
        )

        # Create topic if doesn't exist
        self.create_topic(topic_name)

        with self.lock:
            self.topics[topic_name].add_message(message)
            self.messages_published += 1

        # Queue for delivery
        self.message_queue.put(message)

        return message

    def _worker(self):
        """Worker thread for message delivery."""
        while self.running:
            try:
                message = self.message_queue.get(timeout=0.1)
                self._deliver_message(message)
                self.message_queue.task_done()
            except queue.Empty:
                continue

    def _deliver_message(self, message: Message):
        """Deliver message to matching subscribers."""
        with self.lock:
            subscriptions = list(self.subscriptions.values())

        for subscription in subscriptions:
            if subscription.should_deliver(message):
                try:
                    subscription.callback(message)
                    with self.lock:
                        self.messages_delivered += 1
                except Exception as e:
                    print(f"Error delivering to {subscription.subscriber_id}: {e}")

    def start(self):
        """Start the broker."""
        self.running = True
        for i in range(self.num_workers):
            worker = threading.Thread(target=self._worker, name=f"PubSub-Worker-{i}")
            worker.daemon = True
            worker.start()
            self.workers.append(worker)
        print(f"PubSub Broker started with {self.num_workers} workers")

    def stop(self):
        """Stop the broker."""
        self.running = False
        self.message_queue.join()
        for worker in self.workers:
            worker.join(timeout=1.0)
        print("PubSub Broker stopped")

    def get_stats(self) -> Dict:
        """Get broker statistics."""
        with self.lock:
            return {
                'topics': len(self.topics),
                'subscriptions': len(self.subscriptions),
                'messages_published': self.messages_published,
                'messages_delivered': self.messages_delivered,
                'queue_size': self.message_queue.qsize()
            }


# Extended: With acknowledgments
class AckPubSubBroker(PubSubBroker):
    def __init__(self, num_workers: int = 4, ack_timeout: float = 30.0):
        super().__init__(num_workers)
        self.pending_acks: Dict[str, Message] = {}
        self.ack_timeout = ack_timeout

    def publish_with_ack(self, topic_name: str, payload: Any) -> str:
        message = self.publish(topic_name, payload)
        self.pending_acks[message.message_id] = message
        return message.message_id

    def acknowledge(self, message_id: str) -> bool:
        if message_id in self.pending_acks:
            del self.pending_acks[message_id]
            return True
        return False


# Usage
def order_handler(message: Message):
    print(f"[Order Service] Received: {message}")

def notification_handler(message: Message):
    print(f"[Notification Service] Received: {message}")

def analytics_handler(message: Message):
    print(f"[Analytics Service] Received: {message}")


# Create broker
broker = PubSubBroker(num_workers=2)
broker.start()

# Create topics
broker.create_topic("orders")
broker.create_topic("orders.created")
broker.create_topic("orders.shipped")
broker.create_topic("notifications")

# Subscribe
broker.subscribe("order-service", "orders.*", order_handler)
broker.subscribe("notification-service", "notifications", notification_handler)
broker.subscribe("analytics-service", "orders.*", analytics_handler,
                filter_func=lambda m: m.payload.get('amount', 0) > 100)

# Publish messages
print("\n--- Publishing Messages ---")
broker.publish("orders.created", {"order_id": "001", "amount": 150})
broker.publish("orders.created", {"order_id": "002", "amount": 50})
broker.publish("orders.shipped", {"order_id": "001"})
broker.publish("notifications", {"type": "email", "to": "user@example.com"})

# Wait for delivery
time.sleep(1)

# Stats
print(f"\n--- Stats: {broker.get_stats()} ---")

broker.stop()
```

### Go

```go
package main

import (
	"fmt"
	"strings"
	"sync"
	"time"
)

type Message struct {
	ID        string
	Topic     string
	Payload   interface{}
	Timestamp time.Time
	Headers   map[string]string
}

type Subscription struct {
	ID           string
	TopicPattern string
	Callback     func(*Message)
	FilterFunc   func(*Message) bool
}

func (s *Subscription) MatchesTopic(topic string) bool {
	if s.TopicPattern == topic {
		return true
	}
	if strings.HasSuffix(s.TopicPattern, "*") {
		prefix := strings.TrimSuffix(s.TopicPattern, "*")
		return strings.HasPrefix(topic, prefix)
	}
	return false
}

func (s *Subscription) ShouldDeliver(msg *Message) bool {
	if !s.MatchesTopic(msg.Topic) {
		return false
	}
	if s.FilterFunc != nil && !s.FilterFunc(msg) {
		return false
	}
	return true
}

type Topic struct {
	Name        string
	Subscribers map[string]*Subscription
	Messages    []*Message
	MaxSize     int
	mu          sync.RWMutex
}

func NewTopic(name string) *Topic {
	return &Topic{
		Name:        name,
		Subscribers: make(map[string]*Subscription),
		Messages:    make([]*Message, 0),
		MaxSize:     1000,
	}
}

func (t *Topic) AddSubscriber(sub *Subscription) {
	t.mu.Lock()
	defer t.mu.Unlock()
	t.Subscribers[sub.ID] = sub
}

func (t *Topic) RemoveSubscriber(subID string) {
	t.mu.Lock()
	defer t.mu.Unlock()
	delete(t.Subscribers, subID)
}

func (t *Topic) AddMessage(msg *Message) {
	t.mu.Lock()
	defer t.mu.Unlock()
	t.Messages = append(t.Messages, msg)
	if len(t.Messages) > t.MaxSize {
		t.Messages = t.Messages[1:]
	}
}

type PubSubBroker struct {
	topics        map[string]*Topic
	subscriptions map[string]*Subscription
	messageQueue  chan *Message
	running       bool
	numWorkers    int
	wg            sync.WaitGroup
	mu            sync.RWMutex

	// Metrics
	messagesPublished int64
	messagesDelivered int64
}

func NewPubSubBroker(numWorkers int) *PubSubBroker {
	return &PubSubBroker{
		topics:        make(map[string]*Topic),
		subscriptions: make(map[string]*Subscription),
		messageQueue:  make(chan *Message, 1000),
		numWorkers:    numWorkers,
	}
}

func (b *PubSubBroker) CreateTopic(name string) *Topic {
	b.mu.Lock()
	defer b.mu.Unlock()

	if topic, exists := b.topics[name]; exists {
		return topic
	}

	topic := NewTopic(name)
	b.topics[name] = topic
	return topic
}

func (b *PubSubBroker) Subscribe(subID, topicPattern string,
	callback func(*Message), filterFunc func(*Message) bool) string {

	sub := &Subscription{
		ID:           subID,
		TopicPattern: topicPattern,
		Callback:     callback,
		FilterFunc:   filterFunc,
	}

	b.mu.Lock()
	b.subscriptions[subID] = sub

	// Add to matching topics
	for _, topic := range b.topics {
		if sub.MatchesTopic(topic.Name) {
			topic.AddSubscriber(sub)
		}
	}
	b.mu.Unlock()

	return subID
}

func (b *PubSubBroker) Unsubscribe(subID string) bool {
	b.mu.Lock()
	defer b.mu.Unlock()

	if _, exists := b.subscriptions[subID]; !exists {
		return false
	}

	delete(b.subscriptions, subID)
	for _, topic := range b.topics {
		topic.RemoveSubscriber(subID)
	}

	return true
}

var msgCounter int64
var msgCounterMu sync.Mutex

func (b *PubSubBroker) Publish(topicName string, payload interface{}) *Message {
	msgCounterMu.Lock()
	msgCounter++
	msgID := fmt.Sprintf("msg-%d", msgCounter)
	msgCounterMu.Unlock()

	msg := &Message{
		ID:        msgID,
		Topic:     topicName,
		Payload:   payload,
		Timestamp: time.Now(),
		Headers:   make(map[string]string),
	}

	// Create topic if doesn't exist
	b.CreateTopic(topicName)

	b.mu.Lock()
	b.topics[topicName].AddMessage(msg)
	b.messagesPublished++
	b.mu.Unlock()

	b.messageQueue <- msg

	return msg
}

func (b *PubSubBroker) worker() {
	defer b.wg.Done()

	for b.running {
		select {
		case msg := <-b.messageQueue:
			b.deliverMessage(msg)
		default:
			time.Sleep(10 * time.Millisecond)
		}
	}

	// Drain remaining messages
	for len(b.messageQueue) > 0 {
		msg := <-b.messageQueue
		b.deliverMessage(msg)
	}
}

func (b *PubSubBroker) deliverMessage(msg *Message) {
	b.mu.RLock()
	subs := make([]*Subscription, 0, len(b.subscriptions))
	for _, sub := range b.subscriptions {
		subs = append(subs, sub)
	}
	b.mu.RUnlock()

	for _, sub := range subs {
		if sub.ShouldDeliver(msg) {
			func() {
				defer func() {
					if r := recover(); r != nil {
						fmt.Printf("Error delivering to %s: %v\n", sub.ID, r)
					}
				}()
				sub.Callback(msg)
				b.mu.Lock()
				b.messagesDelivered++
				b.mu.Unlock()
			}()
		}
	}
}

func (b *PubSubBroker) Start() {
	b.running = true
	for i := 0; i < b.numWorkers; i++ {
		b.wg.Add(1)
		go b.worker()
	}
	fmt.Printf("PubSub Broker started with %d workers\n", b.numWorkers)
}

func (b *PubSubBroker) Stop() {
	b.running = false
	b.wg.Wait()
	fmt.Println("PubSub Broker stopped")
}

func (b *PubSubBroker) GetStats() map[string]interface{} {
	b.mu.RLock()
	defer b.mu.RUnlock()

	return map[string]interface{}{
		"topics":             len(b.topics),
		"subscriptions":      len(b.subscriptions),
		"messages_published": b.messagesPublished,
		"messages_delivered": b.messagesDelivered,
		"queue_size":         len(b.messageQueue),
	}
}

func main() {
	broker := NewPubSubBroker(2)
	broker.Start()

	// Create topics
	broker.CreateTopic("orders")
	broker.CreateTopic("orders.created")
	broker.CreateTopic("notifications")

	// Subscribe
	broker.Subscribe("order-service", "orders.*", func(msg *Message) {
		fmt.Printf("[Order Service] Received: %v\n", msg.Payload)
	}, nil)

	broker.Subscribe("notification-service", "notifications", func(msg *Message) {
		fmt.Printf("[Notification Service] Received: %v\n", msg.Payload)
	}, nil)

	// Publish
	fmt.Println("\n--- Publishing Messages ---")
	broker.Publish("orders.created", map[string]interface{}{
		"order_id": "001",
		"amount":   150,
	})
	broker.Publish("notifications", map[string]interface{}{
		"type": "email",
		"to":   "user@example.com",
	})

	time.Sleep(time.Second)

	fmt.Printf("\n--- Stats: %v ---\n", broker.GetStats())

	broker.Stop()
}
```

## Message Delivery Guarantees

| Guarantee | Description | Use Case |
|-----------|-------------|----------|
| At-most-once | Fire and forget | Logs, metrics |
| At-least-once | Retry until ack | Orders, payments |
| Exactly-once | Dedup + ack | Financial transactions |

## Architecture Patterns

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center; font-size: 16px;">Pub-Sub Architecture Flow</h4>

<div style="display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap;">

<!-- Publishers -->
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 14px 20px; border-radius: 10px; text-align: center;">
<div style="color: #fff; font-size: 16px;">📤</div>
<div style="color: #fff; font-weight: bold; font-size: 11px;">Publishers</div>
</div>
</div>

<!-- First Arrow Split -->
<div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
<div style="display: flex; gap: 4px;">
<div style="color: #7ee787; font-size: 18px;">→</div>
</div>
</div>

<!-- Topics Column -->
<div style="display: flex; flex-direction: column; gap: 12px;">

<!-- Topic A with subscribers -->
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 12px 18px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">Topic A</div>
</div>
<div style="color: #7ee787; font-size: 16px;">→</div>
<div style="display: flex; flex-direction: column; gap: 6px;">
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 8px 14px; border-radius: 6px; text-align: center;">
<div style="color: #fff; font-size: 10px;">Subscriber 1</div>
</div>
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); padding: 8px 14px; border-radius: 6px; text-align: center;">
<div style="color: #fff; font-size: 10px;">Subscriber 2</div>
</div>
</div>
</div>

<!-- Topic B with subscribers -->
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 12px 18px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">Topic B</div>
</div>
<div style="color: #58a6ff; font-size: 16px;">→</div>
<div style="display: flex; flex-direction: column; gap: 6px;">
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); padding: 8px 14px; border-radius: 6px; text-align: center;">
<div style="color: #fff; font-size: 10px;">Subscriber 2</div>
</div>
<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); padding: 8px 14px; border-radius: 6px; text-align: center;">
<div style="color: #fff; font-size: 10px;">Subscriber 3</div>
</div>
</div>
</div>

</div>

</div>

<!-- Legend -->
<div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px; flex-wrap: wrap;">
<div style="background: #21262d; padding: 8px 14px; border-radius: 6px;">
<span style="color: #7ee787; font-size: 11px;">Subscriber 2 receives from both topics</span>
</div>
</div>

</div>

## Interview Tips

- Explain topic matching with wildcards
- Discuss delivery guarantees and trade-offs
- Consider message ordering requirements
- Handle subscriber failures gracefully
- Mention real systems (Kafka, RabbitMQ, Redis Pub/Sub)
