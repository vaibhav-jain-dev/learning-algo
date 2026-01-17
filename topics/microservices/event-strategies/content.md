# Different Strategies in Event-Based Systems

## Overview

Event-based systems use various strategies to handle events reliably, maintain ordering, ensure delivery, and manage failures. This guide covers the key strategies you need to know when working with event-driven microservices.

**Tags:** Events, Messaging, Strategies, Kafka

---

## Event Delivery Strategies

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">EVENT DELIVERY GUARANTEES</h4>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
<!-- At-Most-Once -->
<div style="background: rgba(248,81,73,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #f85149;">
<div style="color: #f85149; font-weight: bold; font-size: 12px; margin-bottom: 12px;">1. AT-MOST-ONCE</div>
<div style="display: flex; align-items: center; gap: 4px; margin-bottom: 12px; font-size: 10px;">
<span style="background: #1f6feb; padding: 4px 8px; border-radius: 4px; color: #fff;">Producer</span>
<span style="color: #8b949e;">→</span>
<span style="background: #f78166; padding: 4px 8px; border-radius: 4px; color: #fff;">Broker</span>
<span style="color: #8b949e;">→</span>
<span style="background: #238636; padding: 4px 8px; border-radius: 4px; color: #fff;">Consumer</span>
</div>
<div style="font-size: 10px; color: #c9d1d9; margin-bottom: 8px;">
<div style="color: #8b949e; font-style: italic; margin-bottom: 8px;">(fire and forget)</div>
<div>- Message may be lost</div>
<div>- Never delivered more than once</div>
<div>- Fastest, lowest overhead</div>
</div>
<div style="font-size: 9px; color: #8b949e;">
<strong style="color: #f85149;">Use:</strong> Metrics, logs, analytics
</div>
</div>
<!-- At-Least-Once -->
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">2. AT-LEAST-ONCE</div>
<div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px; font-size: 10px;">
<span style="background: #1f6feb; padding: 4px 8px; border-radius: 4px; color: #fff;">Producer</span>
<span style="color: #8b949e;">→</span>
<span style="background: #f78166; padding: 4px 8px; border-radius: 4px; color: #fff;">Broker</span>
<span style="color: #8b949e;">→</span>
<span style="background: #238636; padding: 4px 8px; border-radius: 4px; color: #fff;">Consumer</span>
</div>
<div style="text-align: center; font-size: 9px; color: #7ee787; margin-bottom: 8px;">←ACK← | ←ACK←</div>
<div style="font-size: 10px; color: #c9d1d9; margin-bottom: 8px;">
<div>- Guaranteed delivery</div>
<div>- May have duplicates</div>
<div>- Requires idempotent consumers</div>
</div>
<div style="font-size: 9px; color: #8b949e;">
<strong style="color: #7ee787;">Use:</strong> Orders, payments, notifications
</div>
</div>
<!-- Exactly-Once -->
<div style="background: rgba(137,87,229,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #8957e5;">
<div style="color: #8957e5; font-weight: bold; font-size: 12px; margin-bottom: 12px;">3. EXACTLY-ONCE</div>
<div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px; font-size: 10px;">
<span style="background: #1f6feb; padding: 4px 8px; border-radius: 4px; color: #fff;">Producer</span>
<span style="color: #8b949e;">→</span>
<span style="background: #f78166; padding: 4px 8px; border-radius: 4px; color: #fff;">Broker</span>
<span style="color: #8b949e;">→</span>
<span style="background: #238636; padding: 4px 8px; border-radius: 4px; color: #fff;">Consumer</span>
</div>
<div style="text-align: center; font-size: 9px; color: #8957e5; margin-bottom: 8px;">(Transactional + Idempotent)</div>
<div style="font-size: 10px; color: #c9d1d9; margin-bottom: 8px;">
<div>- Delivered exactly once</div>
<div>- Transactional support required</div>
<div>- Higher overhead</div>
</div>
<div style="font-size: 9px; color: #8b949e;">
<strong style="color: #8957e5;">Use:</strong> Financial txns, inventory
</div>
</div>
</div>
</div>

---

## Event Ordering Strategies

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">EVENT ORDERING STRATEGIES</h4>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
<!-- Global Ordering -->
<div style="background: rgba(248,81,73,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #f85149;">
<div style="color: #f85149; font-weight: bold; font-size: 12px; margin-bottom: 12px;">1. GLOBAL ORDERING</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px; margin-bottom: 12px; text-align: center;">
<div style="font-size: 10px; color: #c9d1d9;">All events → <span style="background: #f78166; padding: 2px 8px; border-radius: 4px; color: #fff;">Single Partition [E1,E2,E3,E4]</span> → Consumer</div>
</div>
<div style="font-size: 10px; margin-bottom: 8px;">
<div style="color: #7ee787;">+ Strict ordering across all events</div>
<div style="color: #f85149;">- No parallelism (single consumer)</div>
<div style="color: #f85149;">- Limited throughput</div>
</div>
<div style="font-size: 9px; color: #8b949e;">
<strong>Use:</strong> When global order is absolutely required (rare)
</div>
</div>
<!-- Partition-Level Ordering -->
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">2. PARTITION-LEVEL (Most Common)</div>
<div style="font-size: 9px; color: #c9d1d9; margin-bottom: 8px;">Events partitioned by key (e.g., order_id)</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 8px; margin-bottom: 12px; font-size: 9px;">
<div style="margin-bottom: 4px;">Order 1 → <span style="color: #7ee787;">P0</span> → Consumer 1</div>
<div style="margin-bottom: 4px;">Order 2 → <span style="color: #58a6ff;">P1</span> → Consumer 2</div>
<div>Order 3 → <span style="color: #8957e5;">P2</span> → Consumer 3</div>
</div>
<div style="font-size: 10px; margin-bottom: 8px;">
<div style="color: #7ee787;">+ Ordered within partition</div>
<div style="color: #7ee787;">+ Parallel across partitions</div>
<div style="color: #7ee787;">+ Scalable</div>
</div>
</div>
<!-- Causal Ordering -->
<div style="background: rgba(137,87,229,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #8957e5;">
<div style="color: #8957e5; font-weight: bold; font-size: 12px; margin-bottom: 12px;">3. CAUSAL ORDERING</div>
<div style="font-size: 9px; color: #c9d1d9; margin-bottom: 8px;">Events carry dependency information</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 8px; margin-bottom: 12px; font-family: monospace; font-size: 9px; color: #c9d1d9;">
<div>E1: depends_on: []</div>
<div>E2: depends_on: [1]</div>
<div>E3: depends_on: [1] <span style="color: #8b949e;">// concurrent w/ E2</span></div>
<div>E4: depends_on: [2,3]</div>
</div>
<div style="font-size: 10px;">
<div style="color: #7ee787;">+ Respects causality</div>
<div style="color: #7ee787;">+ Concurrent independent events</div>
<div style="color: #f85149;">- Complex to implement</div>
</div>
</div>
</div>
</div>

---

## Consumer Strategies

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">CONSUMER GROUP STRATEGIES</h4>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
<!-- Competing Consumers -->
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">1. COMPETING CONSUMERS</div>
<div style="font-size: 9px; color: #c9d1d9; margin-bottom: 8px;">Same consumer group - Load balancing</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px; margin-bottom: 12px;">
<div style="text-align: center; font-size: 10px; color: #c9d1d9; margin-bottom: 8px;">Topic (6 partitions)</div>
<div style="font-size: 9px; color: #c9d1d9;">
<div>→ Consumer 1: P0, P1</div>
<div>→ Consumer 2: P2, P3</div>
<div>→ Consumer 3: P4, P5</div>
</div>
</div>
<div style="font-size: 9px; color: #8b949e;">
<strong style="color: #7ee787;">Use:</strong> Parallel processing, load distribution
</div>
</div>
<!-- Fan-Out -->
<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 12px;">2. FAN-OUT (Broadcast)</div>
<div style="font-size: 9px; color: #c9d1d9; margin-bottom: 8px;">Different consumer groups - ALL messages</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px; margin-bottom: 12px;">
<div style="text-align: center; font-size: 10px; color: #f78166; margin-bottom: 8px;">order.created</div>
<div style="font-size: 9px; color: #c9d1d9;">
<div>→ Email Service <span style="color: #8b949e;">(email-svc)</span></div>
<div>→ Analytics Svc <span style="color: #8b949e;">(analytics-svc)</span></div>
<div>→ Inventory Svc <span style="color: #8b949e;">(inventory-svc)</span></div>
</div>
</div>
<div style="font-size: 9px; color: #8b949e;">
<strong style="color: #58a6ff;">Use:</strong> Multiple services need same event
</div>
</div>
<!-- Selective Consumption -->
<div style="background: rgba(137,87,229,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #8957e5;">
<div style="color: #8957e5; font-weight: bold; font-size: 12px; margin-bottom: 12px;">3. SELECTIVE (Filtering)</div>
<div style="font-size: 9px; color: #c9d1d9; margin-bottom: 8px;">Consumer filters based on event type</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px; margin-bottom: 12px; font-family: monospace; font-size: 9px; color: #c9d1d9;">
<div><span style="color: #8957e5;">if</span> event.type == <span style="color: #a5d6ff;">"order.shipped"</span></div>
<div>&nbsp;&nbsp;process(event)</div>
<div><span style="color: #8957e5;">else</span> skip(event)</div>
</div>
<div style="font-size: 9px; color: #8b949e;">
<strong style="color: #8957e5;">Alt:</strong> Separate topics per event type
</div>
</div>
</div>
</div>

---

## Error Handling Strategies

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">ERROR HANDLING STRATEGIES</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
<!-- Retry with Backoff -->
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">1. RETRY WITH BACKOFF</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px; margin-bottom: 12px; font-family: monospace; font-size: 9px; color: #c9d1d9;">
<div><span style="color: #8957e5;">for</span> attempt := 0; attempt < maxRetries; attempt++ {</div>
<div>&nbsp;&nbsp;err := process(event)</div>
<div>&nbsp;&nbsp;<span style="color: #8957e5;">if</span> err == nil { <span style="color: #7ee787;">return nil</span> }</div>
<div>&nbsp;&nbsp;<span style="color: #8b949e;">// Exponential backoff: 1s, 2s, 4s, 8s...</span></div>
<div>&nbsp;&nbsp;delay := 1 << attempt</div>
<div>&nbsp;&nbsp;time.Sleep(delay)</div>
<div>}</div>
</div>
<div style="font-size: 9px; color: #8b949e;">
Skip non-recoverable errors immediately
</div>
</div>
<!-- Dead Letter Queue -->
<div style="background: rgba(248,81,73,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #f85149;">
<div style="color: #f85149; font-weight: bold; font-size: 12px; margin-bottom: 12px;">2. DEAD LETTER QUEUE (DLQ)</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px; margin-bottom: 12px; font-size: 10px;">
<div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px; color: #c9d1d9;">
<span style="color: #58a6ff;">Main Topic</span> → Consumer → Process
</div>
<div style="text-align: center; color: #f85149; margin-bottom: 4px;">↓ (on failure)</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 4px; color: #c9d1d9;">
<span style="background: #f85149; padding: 4px 8px; border-radius: 4px; color: #fff;">DLQ</span> → Manual review / Alerting
</div>
</div>
<div style="font-size: 9px; color: #8b949e;">
Contains: Original event, error, retry count, timestamp
</div>
</div>
<!-- Circuit Breaker -->
<div style="background: rgba(247,129,102,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #f78166;">
<div style="color: #f78166; font-weight: bold; font-size: 12px; margin-bottom: 12px;">3. CIRCUIT BREAKER</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px; margin-bottom: 12px; text-align: center;">
<div style="display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 10px; flex-wrap: wrap;">
<span style="background: #7ee787; padding: 4px 8px; border-radius: 4px; color: #000;">CLOSED</span>
<span style="color: #8b949e;">→</span>
<span style="background: #f85149; padding: 4px 8px; border-radius: 4px; color: #fff;">OPEN</span>
<span style="color: #8b949e;">→</span>
<span style="background: #f0883e; padding: 4px 8px; border-radius: 4px; color: #fff;">HALF-OPEN</span>
<span style="color: #8b949e;">→</span>
<span style="background: #7ee787; padding: 4px 8px; border-radius: 4px; color: #000;">CLOSED</span>
</div>
</div>
<div style="font-size: 9px; color: #c9d1d9;">
When OPEN: Stop consuming, wait, alert ops<br/>
<span style="color: #8b949e;">Prevents: Endless retries, resource exhaustion</span>
</div>
</div>
<!-- Poison Pill -->
<div style="background: rgba(137,87,229,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #8957e5;">
<div style="color: #8957e5; font-weight: bold; font-size: 12px; margin-bottom: 12px;">4. POISON PILL HANDLING</div>
<div style="font-size: 10px; color: #c9d1d9; margin-bottom: 8px;">
A message that <strong>always fails</strong> processing
</div>
<div style="font-size: 9px; color: #c9d1d9; margin-bottom: 8px;">
<strong style="color: #8957e5;">Detection:</strong> Track retry count per message<br/>
<strong style="color: #8957e5;">If</strong> retries > threshold → poison pill
</div>
<div style="font-size: 9px; color: #c9d1d9;">
<strong style="color: #7ee787;">Handle:</strong> Move to DLQ → Commit offset → Continue → Alert
</div>
<div style="margin-top: 8px; font-size: 9px; color: #f85149;">
Without this: One bad message blocks entire partition!
</div>
</div>
</div>
</div>

---

## Idempotency Strategies

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">IDEMPOTENCY STRATEGIES</h4>
<div style="background: rgba(248,81,73,0.1); border-radius: 8px; padding: 12px; margin-bottom: 20px; text-align: center;">
<span style="color: #f85149; font-weight: bold;">PROBLEM:</span> <span style="color: #c9d1d9;">Events may be delivered more than once</span><br/>
<span style="color: #7ee787; font-weight: bold;">SOLUTION:</span> <span style="color: #c9d1d9;">Make consumers idempotent</span>
</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
<!-- Idempotency Key Tracking -->
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">1. IDEMPOTENCY KEY TRACKING</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px; margin-bottom: 12px; font-size: 9px; overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; color: #c9d1d9;">
<tr style="border-bottom: 1px solid #30363d;">
<th style="text-align: left; padding: 4px; color: #58a6ff;">event_id</th>
<th style="text-align: left; padding: 4px; color: #58a6ff;">result</th>
</tr>
<tr><td style="padding: 4px;">evt-123</td><td style="padding: 4px; color: #7ee787;">success</td></tr>
<tr><td style="padding: 4px;">evt-124</td><td style="padding: 4px; color: #7ee787;">success</td></tr>
</table>
</div>
<div style="font-family: monospace; font-size: 9px; color: #c9d1d9;">
<span style="color: #8957e5;">if</span> exists(event.ID) → skip<br/>
<span style="color: #8957e5;">else</span> process + record atomically
</div>
</div>
<!-- Natural Idempotency -->
<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 12px;">2. NATURAL IDEMPOTENCY</div>
<div style="font-size: 10px; margin-bottom: 8px;">
<div style="color: #7ee787;">+ SET status = 'ACTIVE'</div>
<div style="color: #7ee787;">+ DELETE WHERE id = 123</div>
<div style="color: #7ee787;">+ UPSERT (INSERT ON CONFLICT)</div>
</div>
<div style="font-size: 10px; margin-bottom: 8px;">
<div style="color: #f85149;">- INCREMENT balance BY 100</div>
<div style="color: #f85149;">- INSERT INTO orders</div>
</div>
<div style="font-size: 9px; color: #8b949e;">
<strong>Transform:</strong> balance += 100 → balance = 1000 WHERE balance = 900
</div>
</div>
<!-- Version/Sequence Checking -->
<div style="background: rgba(137,87,229,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #8957e5;">
<div style="color: #8957e5; font-weight: bold; font-size: 12px; margin-bottom: 12px;">3. VERSION CHECKING</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 8px; margin-bottom: 12px; font-family: monospace; font-size: 9px; color: #c9d1d9;">
{<br/>
&nbsp;&nbsp;<span style="color: #7ee787;">"aggregate_id"</span>: "order-456",<br/>
&nbsp;&nbsp;<span style="color: #7ee787;">"version"</span>: <span style="color: #f78166;">5</span><br/>
}
</div>
<div style="font-size: 9px; color: #c9d1d9;">
<div>version <= current → <span style="color: #8b949e;">Skip (processed)</span></div>
<div>version > current+1 → <span style="color: #f85149;">Out of order</span></div>
<div>version == current+1 → <span style="color: #7ee787;">Process</span></div>
</div>
</div>
</div>
</div>

---

## Event Replay Strategies

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">EVENT REPLAY STRATEGIES</h4>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px;">
<!-- Full Replay -->
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 8px;">1. FULL REPLAY</div>
<div style="font-size: 9px; color: #c9d1d9; margin-bottom: 8px;">Build new read model, fix corruption</div>
<div style="font-size: 9px; color: #c9d1d9; margin-bottom: 8px;">
<div><span style="color: #7ee787;">1.</span> Stop consumers</div>
<div><span style="color: #7ee787;">2.</span> Reset offset to beginning</div>
<div><span style="color: #7ee787;">3.</span> Clear target state</div>
<div><span style="color: #7ee787;">4.</span> Restart & process all</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 4px; padding: 6px; font-family: monospace; font-size: 8px; color: #8b949e;">
kafka-consumer-groups --reset-offsets --to-earliest
</div>
</div>
<!-- Point-in-Time Replay -->
<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">2. POINT-IN-TIME REPLAY</div>
<div style="font-size: 9px; color: #c9d1d9; margin-bottom: 8px;">Replay after a bug was introduced</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 4px; padding: 6px; font-family: monospace; font-size: 8px; color: #c9d1d9; margin-bottom: 8px;">
--reset-offsets<br/>
--to-datetime 2024-01-15T10:00:00.000
</div>
<div style="font-size: 9px; color: #8b949e;">
Reset to specific timestamp
</div>
</div>
<!-- Selective Replay -->
<div style="background: rgba(137,87,229,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #8957e5;">
<div style="color: #8957e5; font-weight: bold; font-size: 12px; margin-bottom: 8px;">3. SELECTIVE REPLAY</div>
<div style="font-size: 9px; color: #c9d1d9; margin-bottom: 8px;">Replay only specific events</div>
<div style="font-size: 9px; color: #c9d1d9; margin-bottom: 8px;">
<div><span style="color: #8957e5;">1.</span> Read events from log</div>
<div><span style="color: #8957e5;">2.</span> Filter by criteria</div>
<div><span style="color: #8957e5;">3.</span> Republish to replay topic</div>
<div><span style="color: #8957e5;">4.</span> Consumer processes</div>
</div>
</div>
</div>
<!-- Replay Considerations -->
<div style="background: rgba(248,81,73,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #f85149;">
<div style="color: #f85149; font-weight: bold; font-size: 12px; margin-bottom: 12px;">REPLAY CONSIDERATIONS</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 10px;">
<div style="color: #c9d1d9;">
<div>- Consumers MUST be idempotent</div>
<div>- Consider side effects (no emails!)</div>
<div>- May need "replay mode" flag</div>
</div>
<div style="color: #c9d1d9;">
<div>- Time-based logic may differ</div>
<div>- External services may not support</div>
</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px; margin-top: 12px; font-family: monospace; font-size: 9px; color: #c9d1d9;">
<span style="color: #8957e5;">if</span> (isReplayMode) processData(event);<br/>
<span style="color: #8957e5;">else</span> { processData(event); sendEmail(event); }
</div>
</div>
</div>

---

## Backpressure Strategies

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">BACKPRESSURE STRATEGIES</h4>
<div style="background: rgba(248,81,73,0.1); border-radius: 8px; padding: 12px; margin-bottom: 20px; text-align: center;">
<span style="color: #f85149; font-weight: bold;">PROBLEM:</span> <span style="color: #c9d1d9;">Producer faster than consumer → Queue grows unbounded</span>
</div>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
<!-- Consumer Pull -->
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">1. CONSUMER PULL (Kafka Default)</div>
<div style="font-size: 10px; color: #c9d1d9; margin-bottom: 8px;">Consumer controls the pace by pulling messages</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px; font-family: monospace; font-size: 9px; color: #c9d1d9;">
consumer.poll(timeout)&nbsp;&nbsp;<span style="color: #8b949e;">// Fetch batch</span><br/>
process(batch)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #8b949e;">// Process</span><br/>
consumer.commitSync()&nbsp;&nbsp;&nbsp;<span style="color: #8b949e;">// Commit</span>
</div>
<div style="margin-top: 8px; font-size: 9px; color: #7ee787;">
Natural backpressure: Consumer takes only what it can handle
</div>
</div>
<!-- Rate Limiting -->
<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 12px;">2. RATE LIMITING AT PRODUCER</div>
<div style="font-size: 10px; color: #c9d1d9; margin-bottom: 8px;">Limit how fast producer can publish</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px; font-family: monospace; font-size: 9px; color: #c9d1d9;">
rateLimiter := NewLimiter(<span style="color: #f78166;">1000</span>, <span style="color: #f78166;">100</span>)<br/>
<span style="color: #8b949e;">// 1000/sec, burst 100</span><br/>
rateLimiter.Wait(ctx)&nbsp;&nbsp;<span style="color: #8b949e;">// Block if over</span><br/>
producer.Send(event)
</div>
</div>
<!-- Buffer Overflow -->
<div style="background: rgba(247,129,102,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #f78166;">
<div style="color: #f78166; font-weight: bold; font-size: 12px; margin-bottom: 12px;">3. BUFFERING WITH OVERFLOW</div>
<div style="font-size: 10px; color: #c9d1d9; margin-bottom: 8px;">When buffer is full, choose strategy:</div>
<div style="font-size: 10px; color: #c9d1d9;">
<div><span style="color: #f78166;">a)</span> Drop oldest (sliding window)</div>
<div><span style="color: #f78166;">b)</span> Drop newest (reject new events)</div>
<div><span style="color: #f78166;">c)</span> Block producer (apply backpressure)</div>
</div>
</div>
<!-- Dynamic Scaling -->
<div style="background: rgba(137,87,229,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #8957e5;">
<div style="color: #8957e5; font-weight: bold; font-size: 12px; margin-bottom: 12px;">4. DYNAMIC SCALING</div>
<div style="font-size: 10px; color: #c9d1d9; margin-bottom: 8px;">Auto-scale consumers based on lag</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 10px; font-family: monospace; font-size: 9px; color: #c9d1d9;">
lag = latestOffset - consumerOffset<br/><br/>
<span style="color: #8957e5;">if</span> lag > highThreshold → scaleUp()<br/>
<span style="color: #8957e5;">if</span> lag < lowThreshold → scaleDown()
</div>
<div style="margin-top: 8px; font-size: 9px; color: #f85149;">
Note: Max scale = number of partitions
</div>
</div>
</div>
</div>

---

## Strategy Selection Guide

| Scenario | Recommended Strategy |
|----------|---------------------|
| Financial transactions | Exactly-once + Idempotency keys |
| Notifications | At-least-once + DLQ |
| Metrics/Logs | At-most-once |
| Order events | Partition by order_id |
| Multiple consumers need same event | Fan-out (different consumer groups) |
| Temporary downstream failure | Retry with backoff + Circuit breaker |
| Permanent bad message | DLQ + Alerting |
| Fix data corruption | Full replay with idempotent consumers |
| Producer faster than consumer | Pull-based + Auto-scaling |

---

## Key Takeaways

1. **Choose delivery guarantee based on criticality** - Not everything needs exactly-once
2. **Always design idempotent consumers** - Duplicates will happen
3. **Use DLQ for graceful degradation** - Don't let failures block processing
4. **Partition wisely for ordering** - Per-entity ordering is usually sufficient
5. **Plan for replay** - Keep events long enough, make handlers replay-safe
6. **Monitor consumer lag** - It's your early warning for backpressure issues
