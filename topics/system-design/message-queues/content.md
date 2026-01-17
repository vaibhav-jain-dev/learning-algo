# Message Queues

## Understanding Message Queues from First Principles

### The Problem: Direct Service Communication

Imagine you're building an e-commerce system. When a customer places an order, several things need to happen:

1. Save the order to the database
2. Send a confirmation email
3. Update inventory
4. Notify the warehouse
5. Update analytics

**The naive approach:** The order service directly calls each of these services:

```python
def place_order(order):
    save_to_database(order)           # 50ms
    email_service.send_confirmation() # 200ms (external API)
    inventory_service.update()        # 100ms
    warehouse_service.notify()        # 150ms
    analytics_service.track()         # 100ms
    # Total: 600ms before customer sees "Order placed!"
```

**What's wrong with this?**

1. **Slow response**: Customer waits 600ms. Add more services → even slower
2. **Fragile**: If email service is down, the entire order fails
3. **Coupled**: Order service must know about ALL other services
4. **No retries**: If warehouse notification fails, how do you retry it?
5. **Scaling nightmare**: Order service must wait for the slowest service

### The Solution: Introduce a Message Queue

Instead of calling services directly, the order service drops a message into a queue. Other services pick up messages when they're ready.

```python
def place_order(order):
    save_to_database(order)       # 50ms
    queue.publish("order_placed", order)  # ~5ms
    return "Success!"
    # Total: 55ms - customer sees "Order placed!" immediately!
```

Now the email, inventory, warehouse, and analytics services all subscribe to the "order_placed" topic and process messages at their own pace.

### What Is a Message Queue, Exactly?

A message queue is a form of **asynchronous service-to-service communication**. It has three core components:

**1. Producers** - Services that send messages
**2. The Queue** - A buffer that stores messages until they're processed
**3. Consumers** - Services that receive and process messages

The queue acts as a shock absorber between producers and consumers. It enables:

- **Temporal decoupling**: Producer and consumer don't need to be running at the same time
- **Spatial decoupling**: Producer doesn't need to know where the consumer is
- **Rate decoupling**: Producer can send faster than consumer processes

<div id="message-queue-flow-diagram" class="diagram-container dark"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('message-queue-flow-diagram');
    if (container && typeof FlowchartDiagram !== 'undefined') {
        const diagram = new FlowchartDiagram('message-queue-flow-diagram', {
            width: 700,
            height: 400,
            nodeWidth: 140,
            nodeHeight: 50,
            spacing: 90,
            nodes: [
                { id: 'producer', label: 'Producer', type: 'terminal' },
                { id: 'queue', label: 'Message Queue', type: 'process' },
                { id: 'consumer1', label: 'Consumer 1', type: 'terminal' },
                { id: 'consumer2', label: 'Consumer 2', type: 'terminal' }
            ],
            edges: [
                { from: 'producer', to: 'queue', label: 'publish' },
                { from: 'queue', to: 'consumer1', label: 'consume' },
                { from: 'queue', to: 'consumer2', label: 'consume' }
            ]
        });
        diagramEngine.register('message-queue-flow-diagram', diagram);
        diagram.render();
    }
});
</script>

## Message Queue Patterns

Understanding these patterns helps you choose the right architecture for your needs.

### Pattern 1: Point-to-Point (Work Queue)

**The question it answers:** "How do I distribute work among multiple workers?"

**How it works:** Messages sit in a queue. When a consumer pulls a message, that message is removed from the queue. Each message is processed by exactly ONE consumer.

**Real-world analogy:** A ticket counter at a bank. Multiple tellers (consumers) serve from one queue of customers (messages). Each customer is served by exactly one teller.

**When to use it:**
- Processing orders where each order should be handled once
- Sending emails (each email should be sent once)
- Image/video processing tasks
- Any "work" that should be done exactly once

**The scaling benefit:** Add more consumers → process messages faster. The queue automatically load-balances across consumers.

### Pattern 2: Publish-Subscribe (Fanout)

**The question it answers:** "How do I notify multiple services about an event?"

**How it works:** The publisher sends a message to a "topic." All subscribers to that topic receive a copy of the message. Each subscriber processes independently.

**Real-world analogy:** A newsletter. When you publish an edition, ALL subscribers receive a copy. You don't care who they are or what they do with it.

**When to use it:**
- User signup → notify email service, analytics, CRM, etc.
- Order placed → notify warehouse, accounting, customer support
- Price change → notify all interested services
- Any "event" that multiple services care about

**Key insight:** The publisher doesn't know (or care) who is listening. New services can subscribe without changing the publisher.

### Pattern 3: Fan-Out with Work Queues

**The problem it solves:** "I want multiple services to receive events, AND each service needs to scale independently."

**How it works:** Combine patterns 1 and 2. A topic fans out to multiple queues. Each queue has its own consumers.

**Example:** When an order is placed:
- Email queue → 2 workers send confirmation emails
- Analytics queue → 1 worker tracks the event
- Warehouse queue → 5 workers handle shipping

Each queue can scale based on ITS workload.

### 1. Point-to-Point (Queue)

One message is consumed by exactly one consumer.

```python
# Producer
queue.send("order:123", {"action": "process"})

# Consumer 1 or Consumer 2 receives (not both)
message = queue.receive()
process(message)
queue.acknowledge(message)
```

### 2. Publish-Subscribe (Topic)

One message is delivered to all subscribers.

```python
# Publisher
topic.publish("user.created", {"user_id": 123})

# Subscriber 1 receives
# Subscriber 2 receives
# All subscribers get the message
```

### 3. Fan-Out

Combine queue and topic - broadcast to multiple queues.

```
Topic → Queue A → Consumer A
     ↘ Queue B → Consumer B
     ↘ Queue C → Consumer C
```

### 4. Request-Reply

Synchronous-like pattern over async messaging.

```python
# Requester
correlation_id = uuid4()
queue.send("requests", {
    "action": "get_user",
    "user_id": 123,
    "reply_to": "responses",
    "correlation_id": correlation_id
})
response = wait_for_response(correlation_id)

# Responder
request = queue.receive("requests")
result = process(request)
queue.send(request["reply_to"], {
    "correlation_id": request["correlation_id"],
    "result": result
})
```

## Delivery Guarantees: The Hardest Problem in Messaging

Understanding delivery guarantees is crucial because they affect your application's correctness.

### The Fundamental Question

When the queue says "message delivered," what does that actually mean? Did the consumer:
- Receive the message? (network said OK)
- Store the message? (written to consumer's memory)
- Process the message? (business logic completed)
- Complete all side effects? (database updated, email sent)

Different guarantees answer this differently.

### At-Most-Once: "Fire and Forget"

**How it works:** Send the message, don't wait for confirmation, move on.

**What can go wrong:**
- Network drops the message → lost forever
- Consumer crashes while processing → message is gone

**Why would anyone want this?**

Because it's FAST. For some data, losing occasional messages is acceptable:
- Metrics/telemetry: Missing one data point out of millions is fine
- Real-time gaming: Stale position updates are worse than missing ones
- Logging: Some lost logs are okay

**Key insight:** If you're okay with "some data might be lost," at-most-once is the simplest option.

### At-Least-Once: "Keep trying until confirmed"

**How it works:**
1. Queue sends message to consumer
2. Consumer processes the message
3. Consumer sends ACK (acknowledgment) back to queue
4. Queue removes the message

If no ACK arrives (consumer crashed, network failed), the queue retries.

**The catch: Duplicates!**

```
Consumer receives message
Consumer processes message (transfers $100)
Consumer tries to send ACK
Network fails!
Queue thinks consumer didn't get it
Queue resends the message
Consumer processes AGAIN (transfers $100 AGAIN!)
```

**The solution: Idempotency**

Make your processing idempotent—doing it twice has the same effect as doing it once.

```python
def process_payment(message):
    # BAD: Always transfers money
    transfer_money(message.from, message.to, message.amount)

    # GOOD: Check if already processed
    if not already_processed(message.id):
        transfer_money(message.from, message.to, message.amount)
        mark_as_processed(message.id)
```

**When to use:** Most production systems. The combination of at-least-once + idempotent consumers gives you reliable message processing.

### Exactly-Once: The Holy Grail (Sort Of)

**The harsh truth:** True exactly-once is impossible in distributed systems (see: Two Generals Problem). What systems call "exactly-once" is actually "at-least-once with built-in deduplication."

**How systems fake it:**
1. Every message has a unique ID
2. Consumer tracks which IDs it has processed
3. If it sees an ID again, it skips processing but still ACKs

**Systems that claim exactly-once:** Kafka (with transactions), Apache Pulsar, Amazon SQS (with deduplication)

**The cost:** More complexity, higher latency, requires storage for deduplication state.

### 1. At-Most-Once
- Message may be lost
- No duplicates
- Fastest

### 2. At-Least-Once
- Message will be delivered
- May have duplicates
- Consumer must be idempotent

### 3. Exactly-Once
- No loss, no duplicates
- Complex to implement
- Usually combines at-least-once with deduplication

```python
# Idempotent consumer for at-least-once
def process_message(message):
    message_id = message['id']

    # Check if already processed
    if redis.sismember('processed_messages', message_id):
        return  # Skip duplicate

    # Process message
    do_work(message)

    # Mark as processed
    redis.sadd('processed_messages', message_id)
    redis.expire('processed_messages', 86400)  # TTL 24h
```

## Message Ordering

### FIFO (First-In-First-Out)

```python
# Messages processed in order
# Use partition key for related messages

queue.send("orders", {"order_id": 1}, partition_key="user_123")
queue.send("orders", {"order_id": 2}, partition_key="user_123")
# Both go to same partition → processed in order
```

### Partitioned Ordering

Order guaranteed within partition, not across partitions.

```
Partition 0: [msg1, msg2, msg3] → Consumer 0
Partition 1: [msg4, msg5, msg6] → Consumer 1
Partition 2: [msg7, msg8, msg9] → Consumer 2
```

## Dead Letter Queues

Handle messages that fail processing repeatedly.

```python
class MessageProcessor:
    MAX_RETRIES = 3

    def process(self, message):
        try:
            self.handle(message)
            self.queue.acknowledge(message)
        except Exception as e:
            retry_count = message.get('retry_count', 0)

            if retry_count >= self.MAX_RETRIES:
                # Move to dead letter queue
                self.dlq.send(message)
                self.queue.acknowledge(message)
            else:
                # Retry with backoff
                message['retry_count'] = retry_count + 1
                delay = 2 ** retry_count  # Exponential backoff
                self.queue.send(message, delay=delay)
```

## Implementation Example

### Python - Simple Message Queue

```python
import json
import threading
import time
from queue import Queue, Empty
from typing import Callable, Dict, Any
from dataclasses import dataclass
from datetime import datetime
import uuid

@dataclass
class Message:
    id: str
    topic: str
    payload: Dict[str, Any]
    timestamp: datetime
    retry_count: int = 0

class InMemoryMessageQueue:
    def __init__(self):
        self.queues: Dict[str, Queue] = {}
        self.subscribers: Dict[str, list] = {}
        self.dlq: Queue = Queue()
        self.lock = threading.Lock()

    def create_queue(self, name: str):
        with self.lock:
            if name not in self.queues:
                self.queues[name] = Queue()

    def send(self, queue_name: str, payload: Dict[str, Any], delay: int = 0):
        message = Message(
            id=str(uuid.uuid4()),
            topic=queue_name,
            payload=payload,
            timestamp=datetime.now()
        )

        if delay > 0:
            threading.Timer(delay, lambda: self._enqueue(queue_name, message)).start()
        else:
            self._enqueue(queue_name, message)

        return message.id

    def _enqueue(self, queue_name: str, message: Message):
        self.create_queue(queue_name)
        self.queues[queue_name].put(message)

    def receive(self, queue_name: str, timeout: float = None) -> Message:
        self.create_queue(queue_name)
        try:
            return self.queues[queue_name].get(timeout=timeout)
        except Empty:
            return None

    def subscribe(self, topic: str, handler: Callable):
        with self.lock:
            if topic not in self.subscribers:
                self.subscribers[topic] = []
            self.subscribers[topic].append(handler)

    def publish(self, topic: str, payload: Dict[str, Any]):
        message = Message(
            id=str(uuid.uuid4()),
            topic=topic,
            payload=payload,
            timestamp=datetime.now()
        )

        handlers = self.subscribers.get(topic, [])
        for handler in handlers:
            threading.Thread(target=handler, args=(message,)).start()


class Consumer:
    def __init__(self, queue: InMemoryMessageQueue, queue_name: str):
        self.queue = queue
        self.queue_name = queue_name
        self.running = False
        self.max_retries = 3

    def start(self, handler: Callable):
        self.running = True

        def consume():
            while self.running:
                message = self.queue.receive(self.queue_name, timeout=1)
                if message:
                    try:
                        handler(message)
                    except Exception as e:
                        self._handle_failure(message, e)

        thread = threading.Thread(target=consume)
        thread.daemon = True
        thread.start()

    def _handle_failure(self, message: Message, error: Exception):
        message.retry_count += 1

        if message.retry_count >= self.max_retries:
            print(f"Moving to DLQ: {message.id}")
            self.queue.dlq.put(message)
        else:
            delay = 2 ** message.retry_count
            print(f"Retrying in {delay}s: {message.id}")
            self.queue.send(self.queue_name, message.payload, delay=delay)

    def stop(self):
        self.running = False


# Usage
mq = InMemoryMessageQueue()

# Point-to-point
def order_handler(message):
    print(f"Processing order: {message.payload}")

consumer = Consumer(mq, "orders")
consumer.start(order_handler)

mq.send("orders", {"order_id": 123, "amount": 99.99})

# Pub-Sub
def email_handler(message):
    print(f"Sending email for: {message.payload}")

def analytics_handler(message):
    print(f"Tracking: {message.payload}")

mq.subscribe("user.created", email_handler)
mq.subscribe("user.created", analytics_handler)

mq.publish("user.created", {"user_id": 456, "email": "test@example.com"})

time.sleep(2)
consumer.stop()
```

### Go - Message Queue with Worker Pool

```go
package main

import (
	"context"
	"fmt"
	"sync"
	"time"

	"github.com/google/uuid"
)

type Message struct {
	ID        string
	Topic     string
	Payload   map[string]interface{}
	Timestamp time.Time
	Retries   int
}

type MessageQueue struct {
	queues      map[string]chan *Message
	subscribers map[string][]func(*Message)
	dlq         chan *Message
	mu          sync.RWMutex
}

func NewMessageQueue() *MessageQueue {
	return &MessageQueue{
		queues:      make(map[string]chan *Message),
		subscribers: make(map[string][]func(*Message)),
		dlq:         make(chan *Message, 1000),
	}
}

func (mq *MessageQueue) CreateQueue(name string, size int) {
	mq.mu.Lock()
	defer mq.mu.Unlock()

	if _, exists := mq.queues[name]; !exists {
		mq.queues[name] = make(chan *Message, size)
	}
}

func (mq *MessageQueue) Send(queueName string, payload map[string]interface{}) string {
	mq.CreateQueue(queueName, 1000)

	msg := &Message{
		ID:        uuid.New().String(),
		Topic:     queueName,
		Payload:   payload,
		Timestamp: time.Now(),
	}

	mq.queues[queueName] <- msg
	return msg.ID
}

func (mq *MessageQueue) Receive(queueName string, timeout time.Duration) *Message {
	mq.mu.RLock()
	queue, exists := mq.queues[queueName]
	mq.mu.RUnlock()

	if !exists {
		return nil
	}

	select {
	case msg := <-queue:
		return msg
	case <-time.After(timeout):
		return nil
	}
}

func (mq *MessageQueue) Subscribe(topic string, handler func(*Message)) {
	mq.mu.Lock()
	defer mq.mu.Unlock()

	mq.subscribers[topic] = append(mq.subscribers[topic], handler)
}

func (mq *MessageQueue) Publish(topic string, payload map[string]interface{}) {
	msg := &Message{
		ID:        uuid.New().String(),
		Topic:     topic,
		Payload:   payload,
		Timestamp: time.Now(),
	}

	mq.mu.RLock()
	handlers := mq.subscribers[topic]
	mq.mu.RUnlock()

	for _, handler := range handlers {
		go handler(msg)
	}
}

type WorkerPool struct {
	mq        *MessageQueue
	queueName string
	workers   int
	handler   func(*Message) error
	maxRetry  int
	wg        sync.WaitGroup
	ctx       context.Context
	cancel    context.CancelFunc
}

func NewWorkerPool(mq *MessageQueue, queueName string, workers int, handler func(*Message) error) *WorkerPool {
	ctx, cancel := context.WithCancel(context.Background())
	return &WorkerPool{
		mq:        mq,
		queueName: queueName,
		workers:   workers,
		handler:   handler,
		maxRetry:  3,
		ctx:       ctx,
		cancel:    cancel,
	}
}

func (wp *WorkerPool) Start() {
	for i := 0; i < wp.workers; i++ {
		wp.wg.Add(1)
		go wp.worker(i)
	}
}

func (wp *WorkerPool) worker(id int) {
	defer wp.wg.Done()

	for {
		select {
		case <-wp.ctx.Done():
			return
		default:
			msg := wp.mq.Receive(wp.queueName, time.Second)
			if msg == nil {
				continue
			}

			if err := wp.handler(msg); err != nil {
				wp.handleFailure(msg, err)
			}
		}
	}
}

func (wp *WorkerPool) handleFailure(msg *Message, err error) {
	msg.Retries++

	if msg.Retries >= wp.maxRetry {
		fmt.Printf("Moving to DLQ: %s\n", msg.ID)
		wp.mq.dlq <- msg
		return
	}

	// Retry with backoff
	delay := time.Duration(1<<msg.Retries) * time.Second
	time.AfterFunc(delay, func() {
		wp.mq.queues[wp.queueName] <- msg
	})
}

func (wp *WorkerPool) Stop() {
	wp.cancel()
	wp.wg.Wait()
}

func main() {
	mq := NewMessageQueue()

	// Create worker pool for order processing
	pool := NewWorkerPool(mq, "orders", 3, func(msg *Message) error {
		fmt.Printf("Processing order: %v\n", msg.Payload)
		return nil
	})
	pool.Start()

	// Send messages
	for i := 0; i < 10; i++ {
		mq.Send("orders", map[string]interface{}{
			"order_id": i,
			"amount":   float64(i) * 10.5,
		})
	}

	// Pub-Sub example
	mq.Subscribe("user.created", func(msg *Message) {
		fmt.Printf("Email service: %v\n", msg.Payload)
	})
	mq.Subscribe("user.created", func(msg *Message) {
		fmt.Printf("Analytics: %v\n", msg.Payload)
	})

	mq.Publish("user.created", map[string]interface{}{
		"user_id": 123,
		"email":   "test@example.com",
	})

	time.Sleep(2 * time.Second)
	pool.Stop()
}
```

## Popular Message Queue Systems

| System | Best For | Features |
|--------|----------|----------|
| **RabbitMQ** | Complex routing | AMQP, exchanges, bindings |
| **Apache Kafka** | High throughput streaming | Log-based, partitions, retention |
| **Amazon SQS** | AWS workloads | Managed, auto-scaling |
| **Redis Streams** | Real-time | Fast, in-memory |
| **Apache Pulsar** | Multi-tenancy | Tiered storage, geo-replication |

## Common Interview Questions

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
1. **How do you handle message ordering?**
   - Use partitions with partition keys
   - Single consumer per partition
   - Sequence numbers for verification
2. **How do you ensure exactly-once processing?**
   - Idempotent consumers
   - Deduplication with message IDs
   - Transactional outbox pattern
3. **What happens if a consumer crashes?**
   - Message remains unacknowledged
   - Redelivered after visibility timeout
   - Use heartbeats for long processing
4. **How do you scale consumers?**
   - Consumer groups share partitions
   - Each partition assigned to one consumer
   - Add partitions to increase parallelism
</div>

## Best Practices

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
1. **Make consumers idempotent** - Handle duplicate messages
2. **Use dead letter queues** - Don't lose failed messages
3. **Set appropriate timeouts** - Visibility timeout > processing time
4. **Monitor queue depth** - Alert on growing backlogs
5. **Use batching** - Improve throughput for high-volume
6. **Implement backpressure** - Prevent overwhelming consumers
</div>

## Related Topics

- [Microservices](/topic/system-design/microservices)
- [Event Sourcing](/topic/system-design/event-sourcing)
- [Rate Limiting](/topic/system-design/rate-limiting)
