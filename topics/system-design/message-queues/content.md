# Message Queues

## Overview

A message queue is a form of asynchronous service-to-service communication where messages are stored in a queue until they are processed by a consumer. Think of it like a postal system - you drop a letter in the mailbox (produce), and the recipient picks it up when they are ready (consume), without you needing to wait at their door.

Message queues decouple producers from consumers, enabling systems to handle load spikes gracefully, improve reliability through persistence, and scale components independently.

---

## Why Message Queues Matter

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <h4 style="color: #166534; margin-top: 0;">Real-World Impact</h4>
  <div style="color: #1e293b;">

    **LinkedIn** processes over 7 trillion messages per day through Apache Kafka for activity feeds, metrics, and data pipelines. Message queues enable them to handle massive scale without losing data.

    **Uber** uses message queues to coordinate rides - when you request a ride, the request goes into a queue that matches drivers with riders asynchronously, enabling them to handle millions of concurrent ride requests.

    **Slack** relies on message queues to deliver billions of messages reliably. Even if a recipient's client is offline, the message is queued and delivered when they reconnect.

  </div>
</div>

### The Problem: Direct Service Communication

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

---

## How Message Queues Work

### Core Components

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Message Queue Architecture</h4>
  <div style="display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap;">
    <div style="background: #dbeafe; padding: 20px; border-radius: 12px; text-align: center; border: 1px solid #3b82f6;">
      <div style="color: #1e40af; font-weight: 700;">Producer</div>
      <div style="color: #64748b; font-size: 12px; margin-top: 4px;">Sends messages</div>
    </div>
    <div style="color: #64748b; font-size: 24px;">--></div>
    <div style="background: #fef3c7; padding: 20px 30px; border-radius: 12px; text-align: center; border: 2px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 700;">Message Queue</div>
      <div style="color: #78716c; font-size: 12px; margin-top: 4px;">Stores & delivers</div>
      <div style="display: flex; gap: 4px; justify-content: center; margin-top: 8px;">
        <div style="background: #fbbf24; width: 20px; height: 20px; border-radius: 4px;"></div>
        <div style="background: #fbbf24; width: 20px; height: 20px; border-radius: 4px;"></div>
        <div style="background: #fbbf24; width: 20px; height: 20px; border-radius: 4px;"></div>
      </div>
    </div>
    <div style="color: #64748b; font-size: 24px;">--></div>
    <div style="background: #dcfce7; padding: 20px; border-radius: 12px; text-align: center; border: 1px solid #22c55e;">
      <div style="color: #166534; font-weight: 700;">Consumer</div>
      <div style="color: #64748b; font-size: 12px; margin-top: 4px;">Processes messages</div>
    </div>
  </div>
</div>

### Key Benefits

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
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

## Message Queue Patterns

### Pattern 1: Point-to-Point (Work Queue)

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Point-to-Point Pattern</h4>
  <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
    <div style="background: #dbeafe; padding: 12px 20px; border-radius: 8px;">
      <div style="color: #1e40af; font-weight: 600;">Producer</div>
    </div>
    <div style="color: #64748b;">--></div>
    <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border: 1px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 600; text-align: center;">Queue</div>
      <div style="display: flex; gap: 4px; margin-top: 8px;">
        <div style="background: #fbbf24; padding: 4px 8px; border-radius: 4px; font-size: 11px; color: #92400e;">msg1</div>
        <div style="background: #fbbf24; padding: 4px 8px; border-radius: 4px; font-size: 11px; color: #92400e;">msg2</div>
        <div style="background: #fbbf24; padding: 4px 8px; border-radius: 4px; font-size: 11px; color: #92400e;">msg3</div>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #64748b;">--></div>
        <div style="background: #dcfce7; padding: 8px 16px; border-radius: 8px;">
          <div style="color: #166534; font-weight: 600;">Consumer 1</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #64748b;">--></div>
        <div style="background: #dcfce7; padding: 8px 16px; border-radius: 8px;">
          <div style="color: #166534; font-weight: 600;">Consumer 2</div>
        </div>
      </div>
    </div>
  </div>
  <div style="background: #eff6ff; padding: 12px 16px; border-radius: 8px; margin-top: 16px;">
    <div style="color: #1e40af; font-size: 13px;"><strong>Key:</strong> Each message is processed by exactly ONE consumer. Add more consumers to process faster.</div>
  </div>
</div>

**Use Cases:** Order processing, email sending, image processing, background jobs

### Pattern 2: Publish-Subscribe (Fan-out)

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Publish-Subscribe Pattern</h4>
  <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
    <div style="background: #dbeafe; padding: 12px 20px; border-radius: 8px;">
      <div style="color: #1e40af; font-weight: 600;">Publisher</div>
    </div>
    <div style="color: #64748b;">--></div>
    <div style="background: #f3e8ff; padding: 16px 24px; border-radius: 8px; border: 2px solid #a855f7;">
      <div style="color: #7c3aed; font-weight: 700; text-align: center;">Topic</div>
      <div style="color: #64748b; font-size: 11px; text-align: center;">user.created</div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #64748b;">--></div>
        <div style="background: #dcfce7; padding: 8px 16px; border-radius: 8px;">
          <div style="color: #166534; font-weight: 600;">Email Service</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #64748b;">--></div>
        <div style="background: #fef3c7; padding: 8px 16px; border-radius: 8px;">
          <div style="color: #92400e; font-weight: 600;">Analytics</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="color: #64748b;">--></div>
        <div style="background: #dbeafe; padding: 8px 16px; border-radius: 8px;">
          <div style="color: #1e40af; font-weight: 600;">CRM Service</div>
        </div>
      </div>
    </div>
  </div>
  <div style="background: #f3e8ff; padding: 12px 16px; border-radius: 8px; margin-top: 16px;">
    <div style="color: #7c3aed; font-size: 13px;"><strong>Key:</strong> ALL subscribers receive a copy of every message. Publisher doesn't know who is listening.</div>
  </div>
</div>

**Use Cases:** Event notifications, activity feeds, real-time updates

### Pattern 3: Request-Reply

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #1e293b; margin-top: 0;">Request-Reply Pattern</h4>
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

## Delivery Guarantees

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Delivery Guarantees Comparison</h4>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
    <div style="background: #fef2f2; padding: 20px; border-radius: 12px; border: 1px solid #fecaca;">
      <h5 style="color: #991b1b; margin: 0 0 12px 0;">At-Most-Once</h5>
      <div style="color: #1e293b; font-size: 13px; margin-bottom: 12px;">"Fire and forget"</div>
      <ul style="color: #475569; font-size: 13px; margin: 0; padding-left: 16px;">
        <li>Message may be lost</li>
        <li>No duplicates</li>
        <li>Fastest option</li>
      </ul>
      <div style="background: #fff; padding: 8px; border-radius: 6px; margin-top: 12px;">
        <div style="color: #64748b; font-size: 11px;"><strong>Use for:</strong> Metrics, logs, real-time gaming</div>
      </div>
    </div>
    <div style="background: #eff6ff; padding: 20px; border-radius: 12px; border: 1px solid #bfdbfe;">
      <h5 style="color: #1e40af; margin: 0 0 12px 0;">At-Least-Once</h5>
      <div style="color: #1e293b; font-size: 13px; margin-bottom: 12px;">"Keep trying until confirmed"</div>
      <ul style="color: #475569; font-size: 13px; margin: 0; padding-left: 16px;">
        <li>Message will be delivered</li>
        <li>May have duplicates</li>
        <li>Consumer must be idempotent</li>
      </ul>
      <div style="background: #fff; padding: 8px; border-radius: 6px; margin-top: 12px;">
        <div style="color: #64748b; font-size: 11px;"><strong>Use for:</strong> Most production systems</div>
      </div>
    </div>
    <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; border: 1px solid #bbf7d0;">
      <h5 style="color: #166534; margin: 0 0 12px 0;">Exactly-Once</h5>
      <div style="color: #1e293b; font-size: 13px; margin-bottom: 12px;">"Guaranteed single delivery"</div>
      <ul style="color: #475569; font-size: 13px; margin: 0; padding-left: 16px;">
        <li>No loss, no duplicates</li>
        <li>Complex to implement</li>
        <li>Higher latency</li>
      </ul>
      <div style="background: #fff; padding: 8px; border-radius: 6px; margin-top: 12px;">
        <div style="color: #64748b; font-size: 11px;"><strong>Use for:</strong> Financial transactions</div>
      </div>
    </div>
  </div>
</div>

### The Duplicate Problem

<div style="background: #fff7ed; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #fed7aa;">
  <h4 style="color: #92400e; margin-top: 0;">Why At-Least-Once Can Cause Duplicates</h4>
  <div style="color: #1e293b; font-size: 14px;">

    ```
    1. Queue sends message to consumer
    2. Consumer processes message (transfers $100)
    3. Consumer tries to send ACK
    4. Network fails!
    5. Queue thinks consumer didn't get it
    6. Queue resends the message
    7. Consumer processes AGAIN (transfers $100 AGAIN!)
    ```

  </div>
</div>

### The Solution: Idempotency

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

## Dead Letter Queues

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Dead Letter Queue Flow</h4>
  <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #fef3c7; padding: 12px 20px; border-radius: 8px; border: 1px solid #f59e0b;">
        <div style="color: #92400e; font-weight: 600;">Main Queue</div>
      </div>
      <div style="color: #64748b;">--></div>
      <div style="background: #dbeafe; padding: 12px 20px; border-radius: 8px;">
        <div style="color: #1e40af; font-weight: 600;">Consumer</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="color: #64748b; font-size: 12px;">Retry 1, 2, 3... Failed</div>
      <div style="color: #64748b;">|</div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="color: #ef4444;">v</div>
    </div>
    <div style="background: #fef2f2; padding: 12px 20px; border-radius: 8px; border: 1px solid #ef4444;">
      <div style="color: #991b1b; font-weight: 600;">Dead Letter Queue</div>
      <div style="color: #64748b; font-size: 11px;">For investigation & manual processing</div>
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

## Message Ordering

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #1e293b; margin-top: 0;">FIFO vs Partitioned Ordering</h4>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 16px;">
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

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">Partitioned Ordering</h4>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #dcfce7; padding: 8px 16px; border-radius: 6px; min-width: 100px;">
        <div style="color: #166534; font-size: 12px;">Partition 0</div>
      </div>
      <div style="display: flex; gap: 4px;">
        <div style="background: #bbf7d0; padding: 4px 8px; border-radius: 4px; font-size: 11px; color: #166534;">msg1</div>
        <div style="background: #bbf7d0; padding: 4px 8px; border-radius: 4px; font-size: 11px; color: #166534;">msg2</div>
        <div style="background: #bbf7d0; padding: 4px 8px; border-radius: 4px; font-size: 11px; color: #166534;">msg3</div>
      </div>
      <div style="color: #64748b;">--></div>
      <div style="background: #dcfce7; padding: 8px 12px; border-radius: 6px;">
        <div style="color: #166534; font-size: 12px;">Consumer 0</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #dbeafe; padding: 8px 16px; border-radius: 6px; min-width: 100px;">
        <div style="color: #1e40af; font-size: 12px;">Partition 1</div>
      </div>
      <div style="display: flex; gap: 4px;">
        <div style="background: #bfdbfe; padding: 4px 8px; border-radius: 4px; font-size: 11px; color: #1e40af;">msg4</div>
        <div style="background: #bfdbfe; padding: 4px 8px; border-radius: 4px; font-size: 11px; color: #1e40af;">msg5</div>
        <div style="background: #bfdbfe; padding: 4px 8px; border-radius: 4px; font-size: 11px; color: #1e40af;">msg6</div>
      </div>
      <div style="color: #64748b;">--></div>
      <div style="background: #dbeafe; padding: 8px 12px; border-radius: 6px;">
        <div style="color: #1e40af; font-size: 12px;">Consumer 1</div>
      </div>
    </div>
  </div>
  <div style="background: #fefce8; padding: 12px 16px; border-radius: 8px; margin-top: 16px;">
    <div style="color: #854d0e; font-size: 13px;"><strong>Partition Key Example:</strong> hash(user_id) % num_partitions ensures all messages for one user go to same partition and are processed in order.</div>
  </div>
</div>

---

## Common Pitfalls

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

## Popular Message Queue Systems

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
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

## Interview Questions

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

## Code Examples

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

## Best Practices

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #bbf7d0;">
  <h4 style="color: #166534; margin-top: 0;">Production Checklist</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; color: #1e293b;">
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

## Related Topics

- [Microservices](/topic/system-design/microservices)
- [Event Sourcing](/topic/system-design/event-sourcing)
- [Rate Limiting](/topic/system-design/rate-limiting)
- [Distributed Systems](/topic/system-design/distributed-systems)
