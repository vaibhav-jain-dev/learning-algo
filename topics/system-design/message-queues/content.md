# Message Queues

## Table of Contents {#toc}

- [Overview](#overview)
- [Why Message Queues Matter](#why-message-queues-matter)
- [How Message Queues Work](#how-message-queues-work)
- [Message Queue Patterns](#message-queue-patterns)
  - [Point-to-Point](#pattern-point-to-point)
  - [Publish-Subscribe](#pattern-publish-subscribe)
  - [Request-Reply](#pattern-request-reply)
- [Delivery Guarantees](#delivery-guarantees)
- [Dead Letter Queues](#dead-letter-queues)
- [Message Ordering](#message-ordering)
- [Edge Cases & Failure Modes](#edge-cases-failure-modes)
- [Common Pitfalls](#common-pitfalls)
- [Popular Message Queue Systems](#popular-systems)
- [Interview Questions](#interview-questions)
- [Code Examples](#code-examples)
- [Best Practices](#best-practices)
- [Related Topics](#related-topics)

---

## Overview {#overview}

A message queue is a form of asynchronous service-to-service communication where messages are stored in a queue until they are processed by a consumer. Think of it like a postal system - you drop a letter in the mailbox (produce), and the recipient picks it up when they are ready (consume), without you needing to wait at their door.

Message queues decouple producers from consumers, enabling systems to handle load spikes gracefully, improve reliability through persistence, and scale components independently.

---

## Why Message Queues Matter {#why-message-queues-matter}

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">
<h4 style="color: #166534; margin-top: 0;">Real-World Impact</h4>
<div style="color: #1e293b;">

**LinkedIn** processes over 7 trillion messages per day through Apache Kafka for activity feeds, metrics, and data pipelines. Message queues enable them to handle massive scale without losing data.

**Uber** uses message queues to coordinate rides - when you request a ride, the request goes into a queue that matches drivers with riders asynchronously, enabling them to handle millions of concurrent ride requests.

**Slack** relies on message queues to deliver billions of messages reliably. Even if a recipient's client is offline, the message is queued and delivered when they reconnect.

</div>
</div>

### The Problem: Direct Service Communication {#problem-direct-communication}

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #fecaca;">
<h4 style="color: #991b1b; margin-top: 0;">Without Message Queues</h4>
<div style="color: #1e293b;">

```python
def place_order(order):
    save_to_database(order)           # 50ms
    email_service.send_confirmation() # 200ms (external API)
    inventory_service.update()        # 100ms
    warehouse_service.notify()        # 150ms
    analytics_service.track()         # 100ms
    # Total: 600ms before customer sees "Order placed!"
```

**Problems:**
- **Slow response**: Customer waits 600ms. Add more services = even slower
- **Fragile**: If email service is down, the entire order fails
- **Tightly coupled**: Order service must know about ALL downstream services
- **No retries**: If warehouse notification fails, how do you retry it?

</div>
</div>

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; font-weight: 600; color: #991b1b; margin-bottom: 16px;">Synchronous Flow - Slow & Fragile</div>
<div class="flow-row">
<div class="flow-box primary">
<div class="flow-box-title">Order Service</div>
<div class="flow-box-subtitle">Entry Point</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box info">
<div class="flow-box-title">Database</div>
<div class="flow-box-subtitle">50ms</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box warning">
<div class="flow-box-title">Email</div>
<div class="flow-box-subtitle">200ms</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box warning">
<div class="flow-box-title">Inventory</div>
<div class="flow-box-subtitle">100ms</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box warning">
<div class="flow-box-title">Warehouse</div>
<div class="flow-box-subtitle">150ms</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box error">
<div class="flow-box-title">Response</div>
<div class="flow-box-subtitle">600ms total</div>
</div>
</div>
</div>
</div>

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #bbf7d0;">
<h4 style="color: #166534; margin-top: 0;">With Message Queues</h4>
<div style="color: #1e293b;">

```python
def place_order(order):
    save_to_database(order)            # 50ms
    queue.publish("order_placed", order)  # ~5ms
    return "Success!"
    # Total: 55ms - customer sees "Order placed!" immediately!
```

Email, inventory, warehouse, and analytics services subscribe to "order_placed" and process independently at their own pace.

</div>
</div>

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; font-weight: 600; color: #166534; margin-bottom: 16px;">Asynchronous Flow - Fast & Resilient</div>
<div class="flow-row">
<div class="flow-box primary">
<div class="flow-box-title">Order Service</div>
<div class="flow-box-subtitle">Entry Point</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box info">
<div class="flow-box-title">Database</div>
<div class="flow-box-subtitle">50ms</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box warning">
<div class="flow-box-title">Queue</div>
<div class="flow-box-subtitle">5ms</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box success">
<div class="flow-box-title">Response</div>
<div class="flow-box-subtitle">55ms total</div>
</div>
</div>
<div class="flow-arrow" style="transform: rotate(90deg); margin: 8px 0;">&#8595;</div>
<div class="flow-row">
<div class="flow-box neutral">
<div class="flow-box-title">Email</div>
<div class="flow-box-subtitle">Async</div>
</div>
<div class="flow-box neutral">
<div class="flow-box-title">Inventory</div>
<div class="flow-box-subtitle">Async</div>
</div>
<div class="flow-box neutral">
<div class="flow-box-title">Warehouse</div>
<div class="flow-box-subtitle">Async</div>
</div>
<div class="flow-box neutral">
<div class="flow-box-title">Analytics</div>
<div class="flow-box-subtitle">Async</div>
</div>
</div>
</div>
</div>

---

## How Message Queues Work {#how-message-queues-work}

### Core Components {#core-components}

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; font-weight: 700; color: #1e293b; margin-bottom: 24px; font-size: 1.1rem;">Message Queue Architecture</div>
<div class="flow-row">
<div class="flow-box primary">
<div class="flow-box-title">Producer</div>
<div class="flow-box-subtitle">Sends messages</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box warning" style="min-width: 180px;">
<div class="flow-box-title">Message Queue</div>
<div class="flow-box-subtitle">Stores & delivers</div>
<div style="display: flex; gap: 6px; justify-content: center; margin-top: 10px;">
<span class="diagram-badge warning">msg1</span>
<span class="diagram-badge warning">msg2</span>
<span class="diagram-badge warning">msg3</span>
</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box success">
<div class="flow-box-title">Consumer</div>
<div class="flow-box-subtitle">Processes messages</div>
</div>
</div>
</div>
</div>

### Key Benefits {#key-benefits}

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
<div style="background: #eff6ff; padding: 16px; border-radius: 8px;">
<h5 style="color: #1e40af; margin: 0 0 8px 0;">Temporal Decoupling</h5>
<p style="color: #1e293b; margin: 0; font-size: 13px;">Producer and consumer don't need to be running at the same time</p>
</div>
<div style="background: #f0fdf4; padding: 16px; border-radius: 8px;">
<h5 style="color: #166534; margin: 0 0 8px 0;">Spatial Decoupling</h5>
<p style="color: #1e293b; margin: 0; font-size: 13px;">Producer doesn't need to know where or what the consumer is</p>
</div>
<div style="background: #fefce8; padding: 16px; border-radius: 8px;">
<h5 style="color: #854d0e; margin: 0 0 8px 0;">Rate Decoupling</h5>
<p style="color: #1e293b; margin: 0; font-size: 13px;">Producer can send faster than consumer processes</p>
</div>
</div>
</div>

---

## Message Queue Patterns {#message-queue-patterns}

### Pattern 1: Point-to-Point (Work Queue) {#pattern-point-to-point}

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; font-weight: 700; color: #1e293b; margin-bottom: 24px; font-size: 1.1rem;">Point-to-Point Pattern</div>
<div class="flow-row">
<div class="flow-box primary">
<div class="flow-box-title">Producer</div>
<div class="flow-box-subtitle">Sends tasks</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box warning" style="min-width: 160px;">
<div class="flow-box-title">Queue</div>
<div style="display: flex; gap: 4px; justify-content: center; margin-top: 8px;">
<span class="diagram-badge warning">msg1</span>
<span class="diagram-badge warning">msg2</span>
<span class="diagram-badge warning">msg3</span>
</div>
</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="display: flex; align-items: center; gap: 8px;">
<div class="flow-arrow">&#8594;</div>
<div class="flow-box success">
<div class="flow-box-title">Consumer 1</div>
<div class="flow-box-subtitle">Gets msg1</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<div class="flow-arrow">&#8594;</div>
<div class="flow-box success">
<div class="flow-box-title">Consumer 2</div>
<div class="flow-box-subtitle">Gets msg2</div>
</div>
</div>
</div>
</div>
<div style="background: #eff6ff; padding: 12px 16px; border-radius: 8px; margin-top: 16px;">
<div style="color: #1e40af; font-size: 13px;"><strong>Key:</strong> Each message is processed by exactly ONE consumer. Add more consumers to process faster.</div>
</div>
</div>
</div>

**Use Cases:** Order processing, email sending, image processing, background jobs

### Pattern 2: Publish-Subscribe (Fan-out) {#pattern-publish-subscribe}

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; font-weight: 700; color: #1e293b; margin-bottom: 24px; font-size: 1.1rem;">Publish-Subscribe Pattern</div>
<div class="flow-row">
<div class="flow-box primary">
<div class="flow-box-title">Publisher</div>
<div class="flow-box-subtitle">Broadcasts event</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box purple" style="min-width: 140px;">
<div class="flow-box-title">Topic</div>
<div class="flow-box-subtitle">user.created</div>
</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="display: flex; align-items: center; gap: 8px;">
<div class="flow-arrow">&#8594;</div>
<div class="flow-box success">
<div class="flow-box-title">Email Service</div>
<div class="flow-box-subtitle">Copy 1</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<div class="flow-arrow">&#8594;</div>
<div class="flow-box warning">
<div class="flow-box-title">Analytics</div>
<div class="flow-box-subtitle">Copy 2</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<div class="flow-arrow">&#8594;</div>
<div class="flow-box info">
<div class="flow-box-title">CRM Service</div>
<div class="flow-box-subtitle">Copy 3</div>
</div>
</div>
</div>
</div>
<div style="background: rgba(139, 92, 246, 0.1); padding: 12px 16px; border-radius: 8px; margin-top: 16px;">
<div style="color: #7c3aed; font-size: 13px;"><strong>Key:</strong> ALL subscribers receive a copy of every message. Publisher doesn't know who is listening.</div>
</div>
</div>
</div>

**Use Cases:** Event notifications, activity feeds, real-time updates

### Pattern 3: Request-Reply {#pattern-request-reply}

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; font-weight: 700; color: #1e293b; margin-bottom: 24px; font-size: 1.1rem;">Request-Reply Pattern</div>
<div class="flow-row">
<div class="flow-box primary">
<div class="flow-box-title">Requester</div>
<div class="flow-box-subtitle">Sends request</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box warning">
<div class="flow-box-title">Request Queue</div>
<div class="flow-box-subtitle">with correlation_id</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box info">
<div class="flow-box-title">Responder</div>
<div class="flow-box-subtitle">Processes</div>
</div>
</div>
<div style="display: flex; justify-content: center; margin: 16px 0;">
<div class="flow-arrow" style="transform: rotate(180deg);">&#8592;</div>
</div>
<div class="flow-row">
<div class="flow-box success">
<div class="flow-box-title">Requester</div>
<div class="flow-box-subtitle">Gets response</div>
</div>
<div class="flow-arrow" style="transform: rotate(180deg);">&#8592;</div>
<div class="flow-box warning">
<div class="flow-box-title">Reply Queue</div>
<div class="flow-box-subtitle">matched by id</div>
</div>
<div class="flow-arrow" style="transform: rotate(180deg);">&#8592;</div>
<div class="flow-box info">
<div class="flow-box-title">Responder</div>
<div class="flow-box-subtitle">Sends reply</div>
</div>
</div>
</div>
</div>

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; margin-top: 0;">Request-Reply Implementation</h4>
<p style="color: #475569;">Synchronous-like pattern over async messaging. Used when you need a response but want queue benefits.</p>

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
</div>

---

## Delivery Guarantees {#delivery-guarantees}

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; font-weight: 700; color: #1e293b; margin-bottom: 24px; font-size: 1.1rem;">Delivery Guarantees Comparison</div>
<div class="flow-row" style="align-items: stretch;">
<div class="flow-box error" style="flex: 1; max-width: 250px;">
<div class="flow-box-title">At-Most-Once</div>
<div class="flow-box-subtitle">"Fire and forget"</div>
<div style="text-align: left; margin-top: 12px; font-size: 12px;">
<div>- Message may be lost</div>
<div>- No duplicates</div>
<div>- Fastest option</div>
</div>
<div style="background: rgba(255,255,255,0.9); padding: 6px 8px; border-radius: 4px; margin-top: 8px; font-size: 11px;">
<strong>Use for:</strong> Metrics, logs
</div>
</div>
<div class="flow-box info" style="flex: 1; max-width: 250px;">
<div class="flow-box-title">At-Least-Once</div>
<div class="flow-box-subtitle">"Keep trying"</div>
<div style="text-align: left; margin-top: 12px; font-size: 12px;">
<div>- Message will arrive</div>
<div>- May have duplicates</div>
<div>- Needs idempotency</div>
</div>
<div style="background: rgba(255,255,255,0.9); padding: 6px 8px; border-radius: 4px; margin-top: 8px; font-size: 11px;">
<strong>Use for:</strong> Most systems
</div>
</div>
<div class="flow-box success" style="flex: 1; max-width: 250px;">
<div class="flow-box-title">Exactly-Once</div>
<div class="flow-box-subtitle">"Guaranteed single"</div>
<div style="text-align: left; margin-top: 12px; font-size: 12px;">
<div>- No loss, no duplicates</div>
<div>- Complex to implement</div>
<div>- Higher latency</div>
</div>
<div style="background: rgba(255,255,255,0.9); padding: 6px 8px; border-radius: 4px; margin-top: 8px; font-size: 11px;">
<strong>Use for:</strong> Payments
</div>
</div>
</div>
</div>
</div>

### The Duplicate Problem {#duplicate-problem}

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; font-weight: 600; color: #92400e; margin-bottom: 16px;">Why At-Least-Once Can Cause Duplicates</div>
<div class="flow-row">
<div class="flow-box warning">
<div class="flow-box-title">1. Queue</div>
<div class="flow-box-subtitle">Sends message</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box success">
<div class="flow-box-title">2. Consumer</div>
<div class="flow-box-subtitle">Transfers $100</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box error">
<div class="flow-box-title">3. ACK Fails</div>
<div class="flow-box-subtitle">Network error!</div>
</div>
</div>
<div class="flow-arrow" style="transform: rotate(90deg); margin: 12px 0;">&#8595;</div>
<div class="flow-row">
<div class="flow-box warning">
<div class="flow-box-title">4. Queue</div>
<div class="flow-box-subtitle">Thinks undelivered</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box warning">
<div class="flow-box-title">5. Resends</div>
<div class="flow-box-subtitle">Same message</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box error">
<div class="flow-box-title">6. Double!</div>
<div class="flow-box-subtitle">$200 transferred</div>
</div>
</div>
</div>
</div>

### The Solution: Idempotency {#solution-idempotency}

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #bbf7d0;">
<h4 style="color: #166534; margin-top: 0;">Making Consumers Idempotent</h4>

```python
def process_payment(message):
    # BAD: Always transfers money
    transfer_money(message.from_user, message.to_user, message.amount)

    # GOOD: Check if already processed
    if not already_processed(message.id):
        transfer_money(message.from_user, message.to_user, message.amount)
        mark_as_processed(message.id)
```

<div style="color: #166534; font-size: 13px; margin-top: 12px;">
<strong>Rule:</strong> Processing the same message twice should have the same effect as processing it once.
</div>
</div>

---

## Dead Letter Queues {#dead-letter-queues}

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; font-weight: 700; color: #1e293b; margin-bottom: 24px; font-size: 1.1rem;">Dead Letter Queue Flow</div>
<div class="flow-row">
<div class="flow-box warning">
<div class="flow-box-title">Main Queue</div>
<div class="flow-box-subtitle">Messages waiting</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box info">
<div class="flow-box-title">Consumer</div>
<div class="flow-box-subtitle">Processes</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px; margin: 16px 0;">
<div style="flex: 1; text-align: right; color: #64748b; font-size: 12px;">Retry 1, 2, 3... Failed</div>
<div class="flow-arrow" style="transform: rotate(90deg);">&#8595;</div>
<div style="flex: 1;"></div>
</div>
<div class="flow-row">
<div class="flow-box error" style="min-width: 200px;">
<div class="flow-box-title">Dead Letter Queue</div>
<div class="flow-box-subtitle">For investigation & manual processing</div>
</div>
</div>
</div>
</div>

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
                # Retry with exponential backoff
                message['retry_count'] = retry_count + 1
                delay = 2 ** retry_count  # 1s, 2s, 4s
                self.queue.send(message, delay=delay)
```

---

## Message Ordering {#message-ordering}

### FIFO vs Partitioned Ordering {#fifo-vs-partitioned}

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 16px;">
<div style="background: #eff6ff; padding: 16px; border-radius: 8px;">
<h5 style="color: #1e40af; margin: 0 0 12px 0;">FIFO Queue</h5>
<p style="color: #475569; font-size: 13px; margin: 0;">All messages processed in exact order. Simple but limits throughput to single consumer.</p>
</div>
<div style="background: #f0fdf4; padding: 16px; border-radius: 8px;">
<h5 style="color: #166534; margin: 0 0 12px 0;">Partitioned Queue</h5>
<p style="color: #475569; font-size: 13px; margin: 0;">Order guaranteed within partition. Use partition key to keep related messages together.</p>
</div>
</div>
</div>

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; font-weight: 700; color: #1e293b; margin-bottom: 24px; font-size: 1.1rem;">Partitioned Ordering</div>
<div style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
<div class="flow-row" style="justify-content: flex-start;">
<div class="flow-box success" style="min-width: 100px;">
<div class="flow-box-title">Partition 0</div>
</div>
<div style="display: flex; gap: 4px; margin: 0 16px;">
<span class="diagram-badge success">msg1</span>
<span class="diagram-badge success">msg2</span>
<span class="diagram-badge success">msg3</span>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box success">
<div class="flow-box-title">Consumer 0</div>
</div>
</div>
<div class="flow-row" style="justify-content: flex-start;">
<div class="flow-box info" style="min-width: 100px;">
<div class="flow-box-title">Partition 1</div>
</div>
<div style="display: flex; gap: 4px; margin: 0 16px;">
<span class="diagram-badge info">msg4</span>
<span class="diagram-badge info">msg5</span>
<span class="diagram-badge info">msg6</span>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box info">
<div class="flow-box-title">Consumer 1</div>
</div>
</div>
</div>
<div style="background: #fefce8; padding: 12px 16px; border-radius: 8px; margin-top: 16px;">
<div style="color: #854d0e; font-size: 13px;"><strong>Partition Key Example:</strong> hash(user_id) % num_partitions ensures all messages for one user go to same partition and are processed in order.</div>
</div>
</div>
</div>

---

## Edge Cases & Failure Modes {#edge-cases-failure-modes}

Understanding failure scenarios is critical for building robust message queue systems.

### Message Loss Scenarios {#message-loss-scenarios}

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; font-weight: 700; color: #991b1b; margin-bottom: 24px; font-size: 1.1rem;">Message Loss Points</div>
<div class="flow-row">
<div class="flow-box primary">
<div class="flow-box-title">Producer</div>
</div>
<div class="flow-box error" style="padding: 8px;">
<div style="font-size: 11px;">Loss Point 1</div>
<div style="font-size: 10px;">Network failure</div>
</div>
<div class="flow-box warning">
<div class="flow-box-title">Queue</div>
</div>
<div class="flow-box error" style="padding: 8px;">
<div style="font-size: 11px;">Loss Point 2</div>
<div style="font-size: 10px;">Disk failure</div>
</div>
<div class="flow-box success">
<div class="flow-box-title">Consumer</div>
</div>
</div>
</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #fecaca;">
<h4 style="color: #991b1b; margin-top: 0;">Common Message Loss Causes</h4>
<div style="display: flex; flex-direction: column; gap: 12px; color: #1e293b;">
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>Producer-side Loss:</strong> Message sent but network fails before queue receives it. Use acknowledgments and retries.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>Broker Crash:</strong> In-memory messages lost on restart. Use persistent/durable queues with disk writes.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>Consumer ACK Before Processing:</strong> Consumer acknowledges, then crashes. Process first, ACK after.
</div>
</div>
</div>

```python
# PREVENTION: Transactional Outbox Pattern
def place_order_safely(order):
    with database.transaction():
        # 1. Save order and outbox message in same transaction
        save_order(order)
        save_to_outbox({
            "id": uuid4(),
            "event": "order_placed",
            "payload": order,
            "status": "pending"
        })
    # 2. Separate process polls outbox and publishes to queue
    # 3. Only marks as "sent" after queue confirms receipt
```

### Duplicate Message Handling {#duplicate-message-handling}

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; font-weight: 700; color: #1e293b; margin-bottom: 24px; font-size: 1.1rem;">Duplicate Prevention Strategies</div>
<div class="flow-row" style="align-items: stretch;">
<div class="flow-box info" style="flex: 1; max-width: 220px;">
<div class="flow-box-title">Message Deduplication</div>
<div style="text-align: left; margin-top: 12px; font-size: 11px;">
<div>1. Store message IDs in cache</div>
<div>2. Check before processing</div>
<div>3. TTL based on retention</div>
</div>
</div>
<div class="flow-box success" style="flex: 1; max-width: 220px;">
<div class="flow-box-title">Idempotent Operations</div>
<div style="text-align: left; margin-top: 12px; font-size: 11px;">
<div>1. Use unique request IDs</div>
<div>2. Check final state vs action</div>
<div>3. SET not INCREMENT</div>
</div>
</div>
<div class="flow-box purple" style="flex: 1; max-width: 220px;">
<div class="flow-box-title">Database Constraints</div>
<div style="text-align: left; margin-top: 12px; font-size: 11px;">
<div>1. Unique index on msg_id</div>
<div>2. Upsert operations</div>
<div>3. Optimistic locking</div>
</div>
</div>
</div>
</div>
</div>

```python
class IdempotentConsumer:
    def __init__(self, redis_client, ttl_hours=24):
        self.redis = redis_client
        self.ttl = ttl_hours * 3600

    def process(self, message):
        message_id = message['id']

        # Atomic check-and-set with Redis
        if not self.redis.set(f"processed:{message_id}", "1",
                              nx=True, ex=self.ttl):
            # Already processed - skip
            return {"status": "duplicate", "message_id": message_id}

        try:
            result = self.handle(message)
            return {"status": "processed", "result": result}
        except Exception as e:
            # Remove marker so message can be retried
            self.redis.delete(f"processed:{message_id}")
            raise
```

### Consumer Failure Scenarios {#consumer-failure-scenarios}

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; font-weight: 700; color: #1e293b; margin-bottom: 24px; font-size: 1.1rem;">Consumer Failure & Recovery</div>
<div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
<div class="flow-row">
<div class="flow-box warning">
<div class="flow-box-title">Queue</div>
<div class="flow-box-subtitle">Visibility timeout: 30s</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box info">
<div class="flow-box-title">Consumer A</div>
<div class="flow-box-subtitle">Gets message</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box error">
<div class="flow-box-title">CRASH!</div>
<div class="flow-box-subtitle">No ACK sent</div>
</div>
</div>
<div style="text-align: center; color: #64748b; font-size: 12px;">After 30 seconds...</div>
<div class="flow-row">
<div class="flow-box warning">
<div class="flow-box-title">Queue</div>
<div class="flow-box-subtitle">Message reappears</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box success">
<div class="flow-box-title">Consumer B</div>
<div class="flow-box-subtitle">Gets same message</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box success">
<div class="flow-box-title">Success</div>
<div class="flow-box-subtitle">ACK sent</div>
</div>
</div>
</div>
</div>
</div>

<div style="background: #fff7ed; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #fed7aa;">
<h4 style="color: #92400e; margin-top: 0;">Critical: Visibility Timeout Configuration</h4>
<div style="color: #1e293b; font-size: 14px;">

| Scenario | Too Short | Too Long |
|----------|-----------|----------|
| Problem | Message redelivered mid-processing | Slow recovery from crashes |
| Effect | Duplicate processing | Messages stuck invisible |
| Solution | Timeout > max processing time | Use heartbeat extensions |

```python
# Heartbeat pattern for long-running tasks
def process_with_heartbeat(message):
    def extend_visibility():
        while not done:
            queue.extend_visibility(message, seconds=30)
            time.sleep(20)  # Extend before timeout

    heartbeat_thread = Thread(target=extend_visibility)
    heartbeat_thread.start()

    try:
        result = long_running_process(message)
        done = True
        queue.acknowledge(message)
    except:
        done = True
        raise
```

</div>
</div>

### Poison Message Handling {#poison-message-handling}

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; font-weight: 700; color: #991b1b; margin-bottom: 24px; font-size: 1.1rem;">Poison Message Detection</div>
<div class="flow-row">
<div class="flow-box error" style="min-width: 160px;">
<div class="flow-box-title">Poison Message</div>
<div class="flow-box-subtitle">Always fails</div>
</div>
<div style="display: flex; flex-direction: column; gap: 4px; align-items: center;">
<div class="flow-arrow">&#8594;</div>
<div style="font-size: 10px; color: #64748b;">Retry 1</div>
</div>
<div class="flow-box error" style="padding: 8px;">
<div style="font-size: 11px;">FAIL</div>
</div>
<div style="display: flex; flex-direction: column; gap: 4px; align-items: center;">
<div class="flow-arrow">&#8594;</div>
<div style="font-size: 10px; color: #64748b;">Retry 2</div>
</div>
<div class="flow-box error" style="padding: 8px;">
<div style="font-size: 11px;">FAIL</div>
</div>
<div style="display: flex; flex-direction: column; gap: 4px; align-items: center;">
<div class="flow-arrow">&#8594;</div>
<div style="font-size: 10px; color: #64748b;">Retry 3</div>
</div>
<div class="flow-box error" style="padding: 8px;">
<div style="font-size: 11px;">DLQ</div>
</div>
</div>
</div>
</div>

```python
class PoisonMessageHandler:
    """Detect and quarantine messages that always fail."""

    def __init__(self, max_retries=3, alert_threshold=10):
        self.max_retries = max_retries
        self.alert_threshold = alert_threshold
        self.failure_counts = defaultdict(int)

    def process(self, message):
        msg_id = message['id']
        delivery_count = message.get('delivery_count', 1)

        if delivery_count > self.max_retries:
            self.quarantine(message)
            return

        try:
            result = self.handle(message)
            self.failure_counts.pop(msg_id, None)
            return result
        except Exception as e:
            self.failure_counts[msg_id] += 1

            if self.failure_counts[msg_id] >= self.alert_threshold:
                self.alert_ops_team(message, e)

            raise  # Let queue retry

    def quarantine(self, message):
        """Move to DLQ with full context for debugging."""
        self.dlq.send({
            "original_message": message,
            "failure_reason": self.last_error,
            "retry_count": message.get('delivery_count', 0),
            "quarantined_at": datetime.now().isoformat()
        })
```

---

## Common Pitfalls {#common-pitfalls}

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #fecaca;">
<h4 style="color: #991b1b; margin-top: 0;">Mistakes to Avoid</h4>
<div style="display: flex; flex-direction: column; gap: 12px; color: #1e293b;">
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>Non-Idempotent Consumers:</strong> Without idempotency, duplicate messages cause data corruption or double charges.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>No Dead Letter Queue:</strong> Poison messages (that always fail) will block the queue forever or be lost.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>Ignoring Backpressure:</strong> If consumers can't keep up, queues grow unbounded, eventually causing OOM or disk full.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>Wrong Visibility Timeout:</strong> If timeout is shorter than processing time, messages get redelivered mid-processing.
</div>
<div style="background: #fff; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
<strong>No Monitoring:</strong> Without queue depth monitoring, you won't know consumers are falling behind until it's too late.
</div>
</div>
</div>

---

## Popular Message Queue Systems {#popular-systems}

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0; overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; font-size: 14px; min-width: 500px;">
<tr style="background: #f1f5f9;">
<th style="padding: 12px; text-align: left; color: #1e293b;">System</th>
<th style="padding: 12px; text-align: left; color: #1e293b;">Best For</th>
<th style="padding: 12px; text-align: left; color: #1e293b;">Key Features</th>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Apache Kafka</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">High throughput streaming</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Log-based, partitions, retention</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>RabbitMQ</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Complex routing</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">AMQP, exchanges, bindings</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Amazon SQS</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">AWS workloads</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Managed, auto-scaling, FIFO</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;"><strong>Redis Streams</strong></td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">Real-time, low latency</td>
<td style="padding: 12px; color: #475569; border-bottom: 1px solid #e2e8f0;">In-memory, consumer groups</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b;"><strong>Apache Pulsar</strong></td>
<td style="padding: 12px; color: #475569;">Multi-tenancy</td>
<td style="padding: 12px; color: #475569;">Tiered storage, geo-replication</td>
</tr>
</table>
</div>

---

## Interview Questions {#interview-questions}

<div style="background: #f3e8ff; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #d8b4fe;">
<h4 style="color: #7c3aed; margin-top: 0;">Common Interview Questions</h4>
<div style="display: flex; flex-direction: column; gap: 16px; color: #1e293b;">

<div>
<strong>1. How do you ensure exactly-once processing?</strong>
<ul style="margin: 8px 0 0 0; color: #475569;">
<li>Use idempotent consumers with deduplication</li>
<li>Store message ID before processing, check before each operation</li>
<li>Use transactional outbox pattern for database + queue atomicity</li>
<li>Leverage Kafka transactions or similar built-in features</li>
</ul>
</div>

<div>
<strong>2. How do you handle message ordering?</strong>
<ul style="margin: 8px 0 0 0; color: #475569;">
<li>Use partition keys to route related messages to same partition</li>
<li>Single consumer per partition guarantees order</li>
<li>Include sequence numbers for verification</li>
<li>Accept eventual consistency where possible</li>
</ul>
</div>

<div>
<strong>3. What happens if a consumer crashes mid-processing?</strong>
<ul style="margin: 8px 0 0 0; color: #475569;">
<li>Message remains unacknowledged in queue</li>
<li>After visibility timeout, message becomes visible again</li>
<li>Another consumer (or same one after restart) picks it up</li>
<li>Idempotency ensures safe reprocessing</li>
</ul>
</div>

<div>
<strong>4. How do you scale message consumers?</strong>
<ul style="margin: 8px 0 0 0; color: #475569;">
<li>Add more partitions to increase parallelism</li>
<li>Consumer groups share partitions automatically</li>
<li>Each partition assigned to one consumer in the group</li>
<li>Monitor lag and scale based on queue depth</li>
</ul>
</div>

<div>
<strong>5. Kafka vs RabbitMQ - when to use each?</strong>
<ul style="margin: 8px 0 0 0; color: #475569;">
<li><strong>Kafka:</strong> High throughput, event streaming, replay capability, log aggregation</li>
<li><strong>RabbitMQ:</strong> Complex routing, request-reply, lower latency, traditional messaging</li>
</ul>
</div>

</div>
</div>

---

## Code Examples {#code-examples}

### Python - Simple Message Queue {#python-example}

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
        self.processed_ids: set = set()
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


# Usage
mq = InMemoryMessageQueue()

# Point-to-point
def order_handler(message):
    print(f"Processing order: {message.payload}")

mq.send("orders", {"order_id": 123, "amount": 99.99})

# Pub-Sub
mq.subscribe("user.created", lambda msg: print(f"Email: {msg.payload}"))
mq.subscribe("user.created", lambda msg: print(f"Analytics: {msg.payload}"))
mq.publish("user.created", {"user_id": 456, "email": "test@example.com"})
```

### Go - Message Queue with Worker Pool {#go-example}

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

type WorkerPool struct {
    mq        *MessageQueue
    queueName string
    workers   int
    handler   func(*Message) error
    maxRetry  int
    ctx       context.Context
    cancel    context.CancelFunc
    wg        sync.WaitGroup
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
        case msg := <-wp.mq.queues[wp.queueName]:
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

func main() {
    mq := NewMessageQueue()

    pool := NewWorkerPool(mq, "orders", 3, func(msg *Message) error {
        fmt.Printf("Processing: %v\n", msg.Payload)
        return nil
    })
    pool.Start()

    for i := 0; i < 10; i++ {
        mq.Send("orders", map[string]interface{}{
            "order_id": i,
            "amount":   float64(i) * 10.5,
        })
    }

    time.Sleep(2 * time.Second)
}
```

---

## Best Practices {#best-practices}

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #bbf7d0;">
<h4 style="color: #166534; margin-top: 0;">Production Checklist</h4>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; color: #1e293b;">
<div>
<strong style="color: #166534;">Reliability</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Make consumers idempotent</li>
<li>Use dead letter queues</li>
<li>Implement retry with backoff</li>
</ul>
</div>
<div>
<strong style="color: #166534;">Performance</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Use batching for throughput</li>
<li>Set appropriate timeouts</li>
<li>Implement backpressure</li>
</ul>
</div>
<div>
<strong style="color: #166534;">Monitoring</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Track queue depth</li>
<li>Alert on consumer lag</li>
<li>Monitor DLQ size</li>
</ul>
</div>
<div>
<strong style="color: #166534;">Operations</strong>
<ul style="margin: 4px 0 0 0; padding-left: 20px; color: #475569;">
<li>Plan for replay scenarios</li>
<li>Document message schemas</li>
<li>Version your messages</li>
</ul>
</div>
</div>
</div>

---

## Related Topics {#related-topics}

- [Microservices](/topic/system-design/microservices)
- [Event Sourcing](/topic/system-design/event-sourcing)
- [Rate Limiting](/topic/system-design/rate-limiting)
- [Distributed Systems](/topic/system-design/distributed-systems)
