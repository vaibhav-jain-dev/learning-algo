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

```
Publishers ──┬──> [Topic A] ──┬──> Subscriber 1
             │                └──> Subscriber 2
             └──> [Topic B] ──┬──> Subscriber 2
                              └──> Subscriber 3
```

## Interview Tips

- Explain topic matching with wildcards
- Discuss delivery guarantees and trade-offs
- Consider message ordering requirements
- Handle subscriber failures gracefully
- Mention real systems (Kafka, RabbitMQ, Redis Pub/Sub)
