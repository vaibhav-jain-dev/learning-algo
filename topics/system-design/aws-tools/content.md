# AWS Tools for System Design

## Overview

AWS provides a comprehensive suite of managed services that solve common distributed systems problems. Understanding these tools deeply is essential for system design interviews and real-world architecture decisions.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Core AWS Services for Distributed Systems</h4>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
<div style="background: #fff7ed; border-radius: 8px; padding: 16px; border-left: 4px solid #f97316;">
<div style="color: #c2410c; font-weight: 600;">Messaging</div>
<div style="color: #9a3412; font-size: 14px; margin-top: 8px;">SNS, SQS, EventBridge</div>
</div>
<div style="background: #f0fdf4; border-radius: 8px; padding: 16px; border-left: 4px solid #22c55e;">
<div style="color: #15803d; font-weight: 600;">Compute</div>
<div style="color: #166534; font-size: 14px; margin-top: 8px;">Lambda, ECS, EKS, EC2</div>
</div>
<div style="background: #eff6ff; border-radius: 8px; padding: 16px; border-left: 4px solid #3b82f6;">
<div style="color: #1d4ed8; font-weight: 600;">Storage</div>
<div style="color: #1e40af; font-size: 14px; margin-top: 8px;">S3, DynamoDB, RDS, ElastiCache</div>
</div>
</div>
</div>

---

## Amazon SQS (Simple Queue Service)

### What is SQS?

<span style="background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); padding: 2px 6px; border-radius: 4px;">SQS is a fully managed message queuing service that enables decoupling of distributed systems</span>. It acts as a buffer between producers and consumers, allowing them to operate independently and at different rates.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">SQS Architecture Flow</h4>
<div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
<div style="background: #3b82f6; color: white; padding: 16px 24px; border-radius: 8px; text-align: center; min-width: 100px;">
<div style="font-weight: 600;">Producer</div>
<div style="font-size: 12px; opacity: 0.9;">Sends messages</div>
</div>
<div style="flex: 1; height: 4px; background: linear-gradient(90deg, #3b82f6, #f97316); position: relative;">
<div style="position: absolute; top: -8px; left: 50%; transform: translateX(-50%); font-size: 20px;">→</div>
</div>
<div style="background: #f97316; color: white; padding: 20px 32px; border-radius: 8px; text-align: center; min-width: 120px;">
<div style="font-weight: 600;">SQS Queue</div>
<div style="font-size: 12px; opacity: 0.9;">Stores & delivers</div>
</div>
<div style="flex: 1; height: 4px; background: linear-gradient(90deg, #f97316, #22c55e); position: relative;">
<div style="position: absolute; top: -8px; left: 50%; transform: translateX(-50%); font-size: 20px;">→</div>
</div>
<div style="background: #22c55e; color: white; padding: 16px 24px; border-radius: 8px; text-align: center; min-width: 100px;">
<div style="font-weight: 600;">Consumer</div>
<div style="font-size: 12px; opacity: 0.9;">Processes messages</div>
</div>
</div>
</div>

### SQS Queue Types

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Standard vs FIFO Queues</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div style="background: #eff6ff; border-radius: 8px; padding: 20px;">
<div style="color: #1d4ed8; font-weight: 600; font-size: 18px; margin-bottom: 12px;">Standard Queue</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 6px 0; border-bottom: 1px solid #cbd5e1;"><strong>Throughput:</strong> Unlimited</div>
<div style="padding: 6px 0; border-bottom: 1px solid #cbd5e1;"><strong>Ordering:</strong> Best-effort (may be out of order)</div>
<div style="padding: 6px 0; border-bottom: 1px solid #cbd5e1;"><strong>Delivery:</strong> At-least-once (may have duplicates)</div>
<div style="padding: 6px 0;"><strong>Use Case:</strong> High throughput, order not critical</div>
</div>
</div>
<div style="background: #fef3c7; border-radius: 8px; padding: 20px;">
<div style="color: #b45309; font-weight: 600; font-size: 18px; margin-bottom: 12px;">FIFO Queue</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 6px 0; border-bottom: 1px solid #cbd5e1;"><strong>Throughput:</strong> 3,000 msg/sec (with batching)</div>
<div style="padding: 6px 0; border-bottom: 1px solid #cbd5e1;"><strong>Ordering:</strong> Strictly preserved</div>
<div style="padding: 6px 0; border-bottom: 1px solid #cbd5e1;"><strong>Delivery:</strong> Exactly-once processing</div>
<div style="padding: 6px 0;"><strong>Use Case:</strong> Financial transactions, order processing</div>
</div>
</div>
</div>
</div>

### How SQS Works Internally

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Message Lifecycle</h4>
<div style="display: flex; flex-direction: column; gap: 16px;">
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #3b82f6; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">1</div>
<div style="flex: 1; background: #eff6ff; border-radius: 8px; padding: 16px;">
<div style="color: #1d4ed8; font-weight: 600;">Send Message</div>
<div style="color: #475569; font-size: 14px;">Producer sends message → SQS stores across multiple AZs for durability</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f97316; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">2</div>
<div style="flex: 1; background: #fff7ed; border-radius: 8px; padding: 16px;">
<div style="color: #c2410c; font-weight: 600;">Receive Message</div>
<div style="color: #475569; font-size: 14px;">Consumer polls queue → Message becomes "in-flight" (invisible to others)</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #eab308; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">3</div>
<div style="flex: 1; background: #fef9c3; border-radius: 8px; padding: 16px;">
<div style="color: #a16207; font-weight: 600;">Visibility Timeout</div>
<div style="color: #475569; font-size: 14px;">Message hidden for configured time (default 30s) → Prevents duplicate processing</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #22c55e; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">4</div>
<div style="flex: 1; background: #f0fdf4; border-radius: 8px; padding: 16px;">
<div style="color: #15803d; font-weight: 600;">Delete Message</div>
<div style="color: #475569; font-size: 14px;">After successful processing → Consumer explicitly deletes message from queue</div>
</div>
</div>
</div>
</div>

### Key SQS Concepts

#### Visibility Timeout

<span style="background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); padding: 2px 6px; border-radius: 4px;">Critical assumption: Visibility timeout must be longer than your processing time</span>. If processing takes longer than visibility timeout, another consumer may receive the same message.

```python
import boto3
import json

sqs = boto3.client('sqs')
queue_url = 'https://sqs.us-east-1.amazonaws.com/123456789/my-queue'

# Send message
response = sqs.send_message(
    QueueUrl=queue_url,
    MessageBody=json.dumps({'order_id': '12345', 'action': 'process'}),
    DelaySeconds=0,  # Optional delay before message becomes visible
    MessageAttributes={
        'Priority': {
            'DataType': 'String',
            'StringValue': 'high'
        }
    }
)
print(f"Message ID: {response['MessageId']}")

# Receive message
response = sqs.receive_message(
    QueueUrl=queue_url,
    MaxNumberOfMessages=10,  # Max 10 per call
    WaitTimeSeconds=20,      # Long polling (reduces API calls)
    VisibilityTimeout=60,    # 60 seconds to process
    MessageAttributeNames=['All']
)

for message in response.get('Messages', []):
    try:
        body = json.loads(message['Body'])
        # Process the message
        process_order(body['order_id'])

        # Delete after successful processing
        sqs.delete_message(
            QueueUrl=queue_url,
            ReceiptHandle=message['ReceiptHandle']
        )
    except Exception as e:
        # Message will become visible again after timeout
        print(f"Error processing: {e}")
```

#### Dead Letter Queue (DLQ)

<span style="background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); padding: 2px 6px; border-radius: 4px;">Design choice: DLQ captures messages that fail processing multiple times</span>. This prevents poison messages from blocking the queue.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">DLQ Flow</h4>
<div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #3b82f6; color: white; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="font-weight: 600;">Main Queue</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="font-size: 12px; color: #64748b;">Fail 3x</div>
<div style="font-size: 24px;">→</div>
</div>
<div style="background: #ef4444; color: white; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="font-weight: 600;">Dead Letter Queue</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="font-size: 12px; color: #64748b;">Alert & Review</div>
<div style="font-size: 24px;">→</div>
</div>
<div style="background: #8b5cf6; color: white; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="font-weight: 600;">Manual Handling</div>
</div>
</div>
</div>

```python
# Configure DLQ in CloudFormation/Terraform
dlq_config = {
    'RedrivePolicy': json.dumps({
        'deadLetterTargetArn': 'arn:aws:sqs:us-east-1:123456789:my-queue-dlq',
        'maxReceiveCount': 3  # Move to DLQ after 3 failed attempts
    })
}
```

#### Long Polling vs Short Polling

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Polling Comparison</h4>
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
<tr style="background: #f1f5f9;">
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Aspect</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Short Polling</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Long Polling</th>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;"><strong>Behavior</strong></td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Returns immediately (even if empty)</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Waits up to 20 seconds for messages</td>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;"><strong>API Calls</strong></td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Many (costly)</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Fewer (cost-effective)</td>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;"><strong>Empty Responses</strong></td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Common</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Rare</td>
</tr>
<tr>
<td style="padding: 12px;"><strong>Best For</strong></td>
<td style="padding: 12px;">Immediate response needed</td>
<td style="padding: 12px;">Most use cases (recommended)</td>
</tr>
</table>
</div>

---

## Amazon SNS (Simple Notification Service)

### What is SNS?

<span style="background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); padding: 2px 6px; border-radius: 4px;">SNS is a fully managed pub/sub messaging service that enables fan-out messaging patterns</span>. Unlike SQS (point-to-point), SNS delivers messages to multiple subscribers simultaneously.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">SNS Fan-Out Architecture</h4>
<div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
<div style="background: #8b5cf6; color: white; padding: 16px 32px; border-radius: 8px; text-align: center;">
<div style="font-weight: 600;">Publisher</div>
<div style="font-size: 12px; opacity: 0.9;">Sends message once</div>
</div>
<div style="font-size: 24px;">↓</div>
<div style="background: #f97316; color: white; padding: 20px 40px; border-radius: 8px; text-align: center;">
<div style="font-weight: 600;">SNS Topic</div>
<div style="font-size: 12px; opacity: 0.9;">Distributes to all subscribers</div>
</div>
<div style="display: flex; gap: 8px;">
<div style="font-size: 24px;">↓</div>
<div style="font-size: 24px;">↓</div>
<div style="font-size: 24px;">↓</div>
<div style="font-size: 24px;">↓</div>
</div>
<div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
<div style="background: #3b82f6; color: white; padding: 12px 16px; border-radius: 8px; text-align: center; font-size: 13px;">
<div style="font-weight: 600;">SQS Queue</div>
</div>
<div style="background: #22c55e; color: white; padding: 12px 16px; border-radius: 8px; text-align: center; font-size: 13px;">
<div style="font-weight: 600;">Lambda</div>
</div>
<div style="background: #06b6d4; color: white; padding: 12px 16px; border-radius: 8px; text-align: center; font-size: 13px;">
<div style="font-weight: 600;">HTTP/S</div>
</div>
<div style="background: #ec4899; color: white; padding: 12px 16px; border-radius: 8px; text-align: center; font-size: 13px;">
<div style="font-weight: 600;">Email/SMS</div>
</div>
</div>
</div>
</div>

### SNS vs SQS - Key Differences

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">When to Use Each</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div style="background: #fef3c7; border-radius: 8px; padding: 20px;">
<div style="color: #b45309; font-weight: 600; font-size: 18px; margin-bottom: 12px;">SNS (Pub/Sub)</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 6px 0;">One-to-many messaging</div>
<div style="padding: 6px 0;">Push-based delivery</div>
<div style="padding: 6px 0;">No message persistence</div>
<div style="padding: 6px 0;">Multiple subscriber types</div>
<div style="padding: 6px 0; font-weight: 600; color: #b45309;">Use for: Notifications, alerts, fan-out</div>
</div>
</div>
<div style="background: #eff6ff; border-radius: 8px; padding: 20px;">
<div style="color: #1d4ed8; font-weight: 600; font-size: 18px; margin-bottom: 12px;">SQS (Queue)</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 6px 0;">One-to-one messaging</div>
<div style="padding: 6px 0;">Pull-based (polling)</div>
<div style="padding: 6px 0;">Messages persist until processed</div>
<div style="padding: 6px 0;">Single consumer type</div>
<div style="padding: 6px 0; font-weight: 600; color: #1d4ed8;">Use for: Work queues, decoupling, buffering</div>
</div>
</div>
</div>
</div>

### SNS + SQS Fan-Out Pattern

<span style="background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); padding: 2px 6px; border-radius: 4px;">Common pattern: Combine SNS with multiple SQS queues for reliable fan-out with persistence</span>.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">SNS + SQS Fan-Out</h4>
<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
<div style="background: #8b5cf6; color: white; padding: 12px 24px; border-radius: 8px;">
<strong>Order Service</strong>
</div>
<div>↓ Publish</div>
<div style="background: #f97316; color: white; padding: 16px 32px; border-radius: 8px;">
<strong>orders-topic (SNS)</strong>
</div>
<div style="display: flex; gap: 24px;">
<div>↓</div>
<div>↓</div>
<div>↓</div>
</div>
<div style="display: flex; gap: 16px;">
<div style="background: #3b82f6; color: white; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="font-weight: 600;">inventory-queue</div>
<div style="font-size: 11px;">Update stock</div>
</div>
<div style="background: #3b82f6; color: white; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="font-weight: 600;">shipping-queue</div>
<div style="font-size: 11px;">Create shipment</div>
</div>
<div style="background: #3b82f6; color: white; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="font-weight: 600;">analytics-queue</div>
<div style="font-size: 11px;">Track metrics</div>
</div>
</div>
</div>
</div>

```python
import boto3
import json

sns = boto3.client('sns')
topic_arn = 'arn:aws:sns:us-east-1:123456789:orders-topic'

# Publish to SNS topic (fans out to all subscribers)
response = sns.publish(
    TopicArn=topic_arn,
    Message=json.dumps({
        'order_id': '12345',
        'customer_id': 'cust-789',
        'total': 99.99,
        'items': ['item-1', 'item-2']
    }),
    Subject='New Order Created',
    MessageAttributes={
        'order_type': {
            'DataType': 'String',
            'StringValue': 'standard'
        }
    }
)
print(f"Message published: {response['MessageId']}")

# Message filtering (only send to subscribers matching filter)
# Subscriber can set filter policy:
filter_policy = {
    'order_type': ['priority', 'express']  # Only receive priority/express orders
}
```

### Message Filtering

<span style="background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); padding: 2px 6px; border-radius: 4px;">Trade-off: Message filtering reduces unnecessary processing but adds complexity</span>.

```python
# Set filter policy on subscription
sns.set_subscription_attributes(
    SubscriptionArn='arn:aws:sns:us-east-1:123456789:orders-topic:subscription-id',
    AttributeName='FilterPolicy',
    AttributeValue=json.dumps({
        'order_type': ['priority'],
        'region': ['us-east', 'us-west'],
        'total': [{'numeric': ['>=', 100]}]  # Orders >= $100
    })
)
```

---

## Interview Deep Dive

### Level 1 Questions

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

#### Q1: How would you design a system that processes orders with guaranteed exactly-once processing?

  **Answer:**

  Use SQS FIFO queue with message deduplication:

  1. **FIFO Queue**: Ensures strict ordering within message groups
  2. **MessageDeduplicationId**: Prevents duplicate message delivery (5-minute window)
  3. **MessageGroupId**: Enables parallel processing while maintaining order within groups
  4. **Idempotent Processing**: Design consumers to handle potential reprocessing

  ```python
  # Send order with deduplication
  sqs.send_message(
  QueueUrl=fifo_queue_url,
  MessageBody=json.dumps(order),
  MessageGroupId=f"customer-{order['customer_id']}",  # Orders per customer in order
  MessageDeduplicationId=f"order-{order['order_id']}"  # Prevent duplicates
  )
  ```

<span style="background: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); padding: 2px 6px; border-radius: 4px;">Key insight: Even with FIFO, design for idempotency - distributed systems can still have edge cases</span>.

##### Level 2 Follow-ups:

  **Q1.1: What happens if processing takes longer than visibility timeout?**

  The message becomes visible again and another consumer may pick it up. Solutions:
  - Extend visibility timeout during processing using `ChangeMessageVisibility`
  - Use heartbeat pattern to periodically extend timeout
  - Set conservative initial timeout based on P99 processing time

  ```python
  def process_with_heartbeat(message, queue_url):
  receipt_handle = message['ReceiptHandle']

  def extend_visibility():
  while not processing_complete:
  sqs.change_message_visibility(
  QueueUrl=queue_url,
  ReceiptHandle=receipt_handle,
  VisibilityTimeout=60
  )
  time.sleep(30)  # Extend every 30 seconds

  heartbeat_thread = threading.Thread(target=extend_visibility)
  heartbeat_thread.start()

  try:
  process_order(message)
  processing_complete = True
  finally:
  heartbeat_thread.join()
  ```

###### Level 3 Follow-ups:

  **Q1.1.1: How do you handle the case where heartbeat thread fails but processing continues?**

  Implement multiple safeguards:
  - Use idempotency keys to ensure reprocessing is safe
  - Store processing state in DynamoDB with conditional writes
  - Implement distributed locking using DynamoDB or Redis

  **Q1.1.2: What's the maximum visibility timeout and how do you handle processing that exceeds it?**

  Maximum is 12 hours. For longer processing:
  - Break work into smaller chunks
  - Use Step Functions for orchestration
  - Store progress in database and resume from checkpoints

  **Q1.1.3: How does this interact with DLQ configuration?**

  DLQ counts receive attempts, not visibility timeout extensions. Each time a message becomes visible counts as a receive. Coordinate maxReceiveCount with your retry strategy.

  ---

  **Q1.2: How do you scale consumers while maintaining message ordering?**

  Use MessageGroupId strategically:
  - Messages with same GroupId are processed in order by one consumer
  - Different GroupIds can be processed in parallel
  - Partition by natural keys (customer_id, tenant_id, etc.)

  ```
  Group A: Consumer 1 → [msg1, msg2, msg3] (in order)
  Group B: Consumer 2 → [msg4, msg5, msg6] (in order)
  Group C: Consumer 3 → [msg7, msg8, msg9] (in order)
  ```

###### Level 3 Follow-ups:

  **Q1.2.1: What if one MessageGroup has much higher traffic than others?**

  Hot partition problem. Solutions:
  - Sub-partition within group (customer-123-partition-1, customer-123-partition-2)
  - Accept eventual consistency for high-volume groups
  - Use separate queue for high-volume entities

  **Q1.2.2: How many consumers can process from a FIFO queue simultaneously?**

  Up to 20,000 in-flight messages per queue. Each MessageGroup limited to 20,000 in-flight. For higher scale, use multiple queues with load balancing.

  **Q1.2.3: What happens if a consumer dies mid-processing?**

  Message becomes visible after visibility timeout. Ensure idempotent processing and potentially use XA transactions or saga pattern for multi-step operations.

  ---

  **Q1.3: When would you choose Standard queue over FIFO despite needing ordering?**

  When throughput requirements exceed FIFO limits (3,000 msg/sec with batching):
  - Implement ordering at application level using timestamps
  - Accept eventual consistency with conflict resolution
  - Use DynamoDB to track and reorder messages
  - Partition workload across multiple FIFO queues

###### Level 3 Follow-ups:

  **Q1.3.1: How do you implement application-level ordering with Standard queues?**

  ```python
  # Include sequence number and buffer for reordering
  message = {
  'sequence': 12345,
  'timestamp': '2024-01-15T10:30:00Z',
  'entity_id': 'order-789',
  'data': {...}
  }

  # Consumer buffers and reorders
  class OrderedProcessor:
  def __init__(self):
  self.buffer = {}
  self.expected_sequence = {}

  def process(self, message):
  entity_id = message['entity_id']
  seq = message['sequence']

  if seq == self.expected_sequence.get(entity_id, 0):
  self.handle(message)
  self.expected_sequence[entity_id] = seq + 1
  self.flush_buffer(entity_id)
  else:
  self.buffer[(entity_id, seq)] = message
  ```

  **Q1.3.2: What are the failure modes of application-level ordering?**

  - Missing messages create gaps (need timeout and skip logic)
  - Buffer can grow unbounded (need size limits)
  - Clock skew can affect timestamp ordering
  - Consumer restarts lose buffer state (persist to Redis/DynamoDB)

  **Q1.3.3: How does at-least-once delivery affect your ordering implementation?**

  Duplicates can arrive out of order. Solutions:
  - Track processed message IDs in database
  - Use idempotency keys
  - Design operations to be naturally idempotent (SET vs INCREMENT)

</div>

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

#### Q2: Design a notification system that sends alerts through multiple channels (email, SMS, push) with different priority levels.

  **Answer:**

  Use SNS with message filtering and multiple SQS queues:

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 16px 0;">
<div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
<div style="background: #8b5cf6; color: white; padding: 10px 20px; border-radius: 6px;">Notification Service</div>
<div>↓</div>
<div style="background: #f97316; color: white; padding: 10px 20px; border-radius: 6px;">notifications-topic (SNS)</div>
<div style="display: flex; gap: 8px;">
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="font-size: 12px; color: #64748b;">priority=high</div>
<div>↓</div>
<div style="background: #ef4444; color: white; padding: 8px 12px; border-radius: 6px; font-size: 13px;">high-priority-queue</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="font-size: 12px; color: #64748b;">channel=email</div>
<div>↓</div>
<div style="background: #3b82f6; color: white; padding: 8px 12px; border-radius: 6px; font-size: 13px;">email-queue</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="font-size: 12px; color: #64748b;">channel=sms</div>
<div>↓</div>
<div style="background: #22c55e; color: white; padding: 8px 12px; border-radius: 6px; font-size: 13px;">sms-queue</div>
</div>
</div>
</div>
</div>

  ```python
  # Publish notification with attributes for filtering
  sns.publish(
  TopicArn=topic_arn,
  Message=json.dumps({
  'user_id': 'user-123',
  'title': 'Payment Received',
  'body': 'Your payment of $99.99 was processed',
  'channels': ['email', 'push']
  }),
  MessageAttributes={
  'priority': {'DataType': 'String', 'StringValue': 'high'},
  'notification_type': {'DataType': 'String', 'StringValue': 'payment'},
  'channels': {'DataType': 'String.Array', 'StringValue': '["email", "push"]'}
  }
  )
  ```

##### Level 2 Follow-ups:

  **Q2.1: How do you handle rate limiting for SMS/email providers?**

  Implement token bucket rate limiter in consumer:

  ```python
  class RateLimitedConsumer:
  def __init__(self, rate_per_second):
  self.rate = rate_per_second
  self.tokens = rate_per_second
  self.last_update = time.time()

  def consume(self):
  # Refill tokens
  now = time.time()
  self.tokens = min(
  self.rate,
  self.tokens + (now - self.last_update) * self.rate
  )
  self.last_update = now

  if self.tokens >= 1:
  self.tokens -= 1
  return True
  return False
  ```

  Also use SQS delay queues for backoff when rate limited.

###### Level 3 Follow-ups:

  **Q2.1.1: How do you distribute rate limits across multiple consumers?**

  Use Redis for distributed rate limiting:

  ```python
  def distributed_rate_limit(key, limit, window_seconds):
  pipe = redis.pipeline()
  now = time.time()
  window_start = now - window_seconds

  pipe.zremrangebyscore(key, 0, window_start)
  pipe.zadd(key, {str(now): now})
  pipe.zcard(key)
  pipe.expire(key, window_seconds)

  results = pipe.execute()
  return results[2] <= limit
  ```

  **Q2.1.2: What happens to messages when you hit rate limits?**

  Options:
  1. Return to queue with delay (DelaySeconds)
  2. Move to throttle queue with slower processing
  3. Store in DynamoDB and process via scheduled Lambda
  4. Implement exponential backoff at consumer level

  **Q2.1.3: How do you prioritize high-priority notifications when rate limited?**

  Separate queues with different consumer allocations:
  - High priority: 70% of rate limit capacity
  - Normal priority: 25% of rate limit capacity
  - Low priority: 5% of rate limit capacity

  ---

  **Q2.2: How do you ensure a notification is delivered to at least one channel?**

  Implement saga pattern with compensation:

  ```python
  async def send_notification(notification):
  results = {}

  for channel in notification['channels']:
  try:
  results[channel] = await send_via_channel(channel, notification)
  except Exception as e:
  results[channel] = {'error': str(e)}

  # Check if at least one succeeded
  successes = [c for c, r in results.items() if 'error' not in r]

  if not successes:
  # All channels failed - store for retry
  await store_failed_notification(notification, results)
  raise AllChannelsFailedException(results)

  return results
  ```

###### Level 3 Follow-ups:

  **Q2.2.1: How do you track delivery status across channels?**

  Use DynamoDB with GSIs for querying:

  ```python
  notification_record = {
  'pk': f"NOTIF#{notification_id}",
  'sk': f"CHANNEL#{channel}",
  'user_id': user_id,
  'status': 'delivered',  # pending, delivered, failed
  'delivered_at': timestamp,
  'provider_id': external_message_id
  }
  ```

  **Q2.2.2: How do you handle partial failures in multi-channel delivery?**

  - Track each channel independently
  - Implement per-channel retry with backoff
  - Alert on channels with high failure rates
  - Allow user to configure fallback channel preferences

  **Q2.2.3: What if email succeeds but user requested push notification?**

  Define delivery semantics:
  - "Any channel" - success if any works
  - "Preferred channel" - try preferred first, fallback allowed
  - "All channels" - must deliver to all requested
  - Store user preferences and apply business rules

</div>

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

#### Q3: How would you handle message replay for debugging or reprocessing in SQS?

  **Answer:**

  SQS doesn't natively support replay. Implement event sourcing pattern:

  1. **Dual Write**: Publish to SQS and archive to S3/DynamoDB
  2. **Event Store**: Use DynamoDB Streams or Kinesis for ordered, replayable log
  3. **Dead Letter Replay**: Process DLQ messages with modified handling

  ```python
  class ReplayableMessageHandler:
  def __init__(self):
  self.s3 = boto3.client('s3')
  self.sqs = boto3.client('sqs')

  def send_with_archive(self, queue_url, message):
  message_id = str(uuid.uuid4())
  timestamp = datetime.utcnow().isoformat()

  # Archive to S3 for replay capability
  self.s3.put_object(
  Bucket='message-archive',
  Key=f"messages/{timestamp[:10]}/{message_id}.json",
  Body=json.dumps({
  'id': message_id,
  'timestamp': timestamp,
  'body': message,
  'queue': queue_url
  })
  )

  # Send to SQS
  self.sqs.send_message(
  QueueUrl=queue_url,
  MessageBody=json.dumps(message),
  MessageAttributes={
  'archive_key': {
  'DataType': 'String',
  'StringValue': f"messages/{timestamp[:10]}/{message_id}.json"
  }
  }
  )

  def replay_messages(self, queue_url, start_date, end_date):
  """Replay archived messages to queue"""
  paginator = self.s3.get_paginator('list_objects_v2')

  for date in date_range(start_date, end_date):
  prefix = f"messages/{date}/"

  for page in paginator.paginate(Bucket='message-archive', Prefix=prefix):
  for obj in page.get('Contents', []):
  archived = json.loads(
  self.s3.get_object(Bucket='message-archive', Key=obj['Key'])['Body'].read()
  )

  self.sqs.send_message(
  QueueUrl=queue_url,
  MessageBody=json.dumps(archived['body']),
  MessageAttributes={
  'replay': {'DataType': 'String', 'StringValue': 'true'},
  'original_timestamp': {'DataType': 'String', 'StringValue': archived['timestamp']}
  }
  )
  ```

##### Level 2 Follow-ups:

  **Q3.1: How do you handle idempotency during replay?**

  Track processed message IDs:

  ```python
  def process_with_idempotency(message, dynamodb_table):
  message_id = message['MessageId']

  try:
  # Conditional put - fails if already exists
  dynamodb_table.put_item(
  Item={
  'pk': f"PROCESSED#{message_id}",
  'processed_at': datetime.utcnow().isoformat(),
  'ttl': int(time.time()) + 86400 * 7  # 7 day TTL
  },
  ConditionExpression='attribute_not_exists(pk)'
  )
  except ClientError as e:
  if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
  print(f"Message {message_id} already processed, skipping")
  return
  raise

  # Process the message
  handle_message(message)
  ```

###### Level 3 Follow-ups:

  **Q3.1.1: What's the storage cost of tracking all processed message IDs?**

  With TTL-based cleanup:
  - 1M messages/day × 7 days = 7M records
  - ~100 bytes per record = 700MB
  - DynamoDB cost: ~$0.25/GB/month = negligible
  - Use TTL to auto-expire old records

  **Q3.1.2: How do you handle the case where processing succeeded but idempotency record failed to write?**

  Use transactional writes:

  ```python
  dynamodb.transact_write_items(
  TransactItems=[
  {
  'Put': {
  'TableName': 'idempotency',
  'Item': {'pk': message_id, 'status': 'completed'}
  }
  },
  {
  'Put': {
  'TableName': 'results',
  'Item': {'pk': result_id, 'data': result_data}
  }
  }
  ]
  )
  ```

  **Q3.1.3: How do you handle replay for messages that modify external systems?**

  - External systems need their own idempotency (payment providers usually have this)
  - Store external transaction IDs for reconciliation
  - Use compensating transactions for rollback scenarios

</div>

---

## Common Mistakes

<div style="background: #fef2f2; border: 2px solid #fecaca; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #991b1b; margin-top: 0;">SQS/SNS Anti-Patterns</h4>
<div style="display: grid; gap: 12px;">
<div style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Not using Long Polling</div>
<div style="color: #7f1d1d; font-size: 14px;">Short polling wastes API calls and increases costs. Always use WaitTimeSeconds=20.</div>
</div>
<div style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Ignoring Visibility Timeout</div>
<div style="color: #7f1d1d; font-size: 14px;">Setting timeout too low causes duplicate processing. Set based on P99 processing time + buffer.</div>
</div>
<div style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Not Configuring DLQ</div>
<div style="color: #7f1d1d; font-size: 14px;">Poison messages can block queue indefinitely. Always configure DLQ with appropriate maxReceiveCount.</div>
</div>
<div style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Assuming Exactly-Once with Standard Queue</div>
<div style="color: #7f1d1d; font-size: 14px;">Standard queues are at-least-once. Design consumers to be idempotent or use FIFO.</div>
</div>
<div style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">Large Message Bodies</div>
<div style="color: #7f1d1d; font-size: 14px;">SQS max is 256KB. Use S3 for large payloads and pass reference in message.</div>
</div>
<div style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600;">SNS Without Persistence</div>
<div style="color: #7f1d1d; font-size: 14px;">SNS doesn't persist messages. If subscriber is down, messages are lost. Use SNS+SQS pattern.</div>
</div>
</div>
</div>

---

## Quick Reference Card

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">SQS/SNS Cheat Sheet</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">SQS Limits</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;"><strong>Message size:</strong> 256 KB</div>
<div style="padding: 4px 0;"><strong>Retention:</strong> 1 min - 14 days (default 4 days)</div>
<div style="padding: 4px 0;"><strong>Visibility timeout:</strong> 0 sec - 12 hours</div>
<div style="padding: 4px 0;"><strong>Long poll wait:</strong> 1-20 seconds</div>
<div style="padding: 4px 0;"><strong>FIFO throughput:</strong> 3,000 msg/sec (batched)</div>
</div>
</div>
<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">SNS Limits</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;"><strong>Message size:</strong> 256 KB</div>
<div style="padding: 4px 0;"><strong>Subscriptions/topic:</strong> 12.5 million</div>
<div style="padding: 4px 0;"><strong>Topics/account:</strong> 100,000</div>
<div style="padding: 4px 0;"><strong>Filter policies/sub:</strong> 1</div>
<div style="padding: 4px 0;"><strong>FIFO throughput:</strong> 300 msg/sec</div>
</div>
</div>
<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">When to Use SQS</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;">Work queues / job processing</div>
<div style="padding: 4px 0;">Decoupling microservices</div>
<div style="padding: 4px 0;">Buffering for rate limiting</div>
<div style="padding: 4px 0;">Guaranteed delivery needed</div>
</div>
</div>
<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">When to Use SNS</div>
<div style="font-size: 14px; color: #475569;">
<div style="padding: 4px 0;">Fan-out to multiple subscribers</div>
<div style="padding: 4px 0;">Push notifications</div>
<div style="padding: 4px 0;">Event broadcasting</div>
<div style="padding: 4px 0;">Multi-protocol delivery</div>
</div>
</div>
</div>
</div>

---

## Related Topics

- [[Message Queues]](/topic/system-design/message-queues) - General queuing concepts
- [[Event Sourcing]](/topic/system-design/event-sourcing) - Event-driven patterns
- [[Microservices]](/topic/system-design/microservices) - Service communication
- [[Rate Limiting]](/topic/system-design/rate-limiting) - Throttling strategies
- [[Distributed Locking]](/topic/system-design/distributed-locking) - Coordination patterns
