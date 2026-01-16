# Different Strategies in Event-Based Systems

## Overview

Event-based systems use various strategies to handle events reliably, maintain ordering, ensure delivery, and manage failures. This guide covers the key strategies you need to know when working with event-driven microservices.

**Tags:** Events, Messaging, Strategies, Kafka

---

## Event Delivery Strategies

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EVENT DELIVERY GUARANTEES                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. AT-MOST-ONCE DELIVERY                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Producer ───▶ Broker ───▶ Consumer                                  │    │
│  │            (fire and forget)                                         │    │
│  │                                                                      │    │
│  │  Characteristics:                                                    │    │
│  │  • Message may be lost                                               │    │
│  │  • Never delivered more than once                                    │    │
│  │  • Fastest, lowest overhead                                          │    │
│  │                                                                      │    │
│  │  Use cases:                                                          │    │
│  │  • Metrics/telemetry (losing some data is OK)                        │    │
│  │  • Log streaming                                                     │    │
│  │  • Real-time analytics where accuracy isn't critical                 │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  2. AT-LEAST-ONCE DELIVERY                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Producer ───▶ Broker ───▶ Consumer                                  │    │
│  │      │           │            │                                      │    │
│  │      │◀───ACK────│            │                                      │    │
│  │      │           │◀────ACK────│                                      │    │
│  │                                                                      │    │
│  │  Characteristics:                                                    │    │
│  │  • Message guaranteed to be delivered                                │    │
│  │  • May be delivered multiple times (duplicates possible)             │    │
│  │  • Requires idempotent consumers                                     │    │
│  │                                                                      │    │
│  │  Use cases:                                                          │    │
│  │  • Most business events (orders, payments)                           │    │
│  │  • Notifications                                                     │    │
│  │  • Data synchronization                                              │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  3. EXACTLY-ONCE DELIVERY                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Producer ───▶ Broker ───▶ Consumer                                  │    │
│  │      │     (Transactional)     │                                     │    │
│  │      │◀────────ACK─────────────│                                     │    │
│  │              (Idempotent)                                            │    │
│  │                                                                      │    │
│  │  Characteristics:                                                    │    │
│  │  • Message delivered exactly once                                    │    │
│  │  • Requires transactional support                                    │    │
│  │  • Higher overhead and complexity                                    │    │
│  │                                                                      │    │
│  │  Implementation:                                                     │    │
│  │  • Kafka: Idempotent producer + Transactional consumer               │    │
│  │  • Outbox pattern + Idempotent consumer                              │    │
│  │                                                                      │    │
│  │  Use cases:                                                          │    │
│  │  • Financial transactions                                            │    │
│  │  • Inventory updates                                                 │    │
│  │  • Critical state changes                                            │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Event Ordering Strategies

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EVENT ORDERING STRATEGIES                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. GLOBAL ORDERING (Single Partition)                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  All events ─────▶ ┌─────────────────────┐ ─────▶ Consumer           │    │
│  │                    │  Single Partition   │                           │    │
│  │                    │  [E1, E2, E3, E4]   │                           │    │
│  │                    └─────────────────────┘                           │    │
│  │                                                                      │    │
│  │  ✓ Strict ordering across all events                                 │    │
│  │  ✗ No parallelism (single consumer)                                  │    │
│  │  ✗ Limited throughput                                                │    │
│  │                                                                      │    │
│  │  Use when: Absolutely need global order (rare)                       │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  2. PARTITION-LEVEL ORDERING (Most Common)                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Events partitioned by key (e.g., order_id)                          │    │
│  │                                                                      │    │
│  │  Order 1 events ─▶ ┌───────────┐ ─▶ Consumer 1                       │    │
│  │                    │Partition 0│                                     │    │
│  │                    └───────────┘                                     │    │
│  │  Order 2 events ─▶ ┌───────────┐ ─▶ Consumer 2                       │    │
│  │                    │Partition 1│                                     │    │
│  │                    └───────────┘                                     │    │
│  │  Order 3 events ─▶ ┌───────────┐ ─▶ Consumer 3                       │    │
│  │                    │Partition 2│                                     │    │
│  │                    └───────────┘                                     │    │
│  │                                                                      │    │
│  │  ✓ Ordered within partition (per order)                              │    │
│  │  ✓ Parallel processing across partitions                             │    │
│  │  ✓ Scalable                                                          │    │
│  │                                                                      │    │
│  │  Kafka example:                                                      │    │
│  │  producer.Send(topic, order.ID, event)  // order.ID is partition key │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  3. CAUSAL ORDERING (Vector Clocks)                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Events carry dependency information:                                │    │
│  │                                                                      │    │
│  │  E1: {id: 1, depends_on: []}                                         │    │
│  │  E2: {id: 2, depends_on: [1]}                                        │    │
│  │  E3: {id: 3, depends_on: [1]}     // E2 and E3 are concurrent       │    │
│  │  E4: {id: 4, depends_on: [2, 3]}  // E4 depends on both             │    │
│  │                                                                      │    │
│  │  Consumer processes E4 only after E2 and E3 complete                 │    │
│  │                                                                      │    │
│  │  ✓ Respects causality                                                │    │
│  │  ✓ Allows concurrent processing of independent events                │    │
│  │  ✗ More complex to implement                                         │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Consumer Strategies

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CONSUMER GROUP STRATEGIES                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. COMPETING CONSUMERS (Load Balancing)                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │                    ┌─────────────────┐                               │    │
│  │                ┌──▶│   Consumer 1    │                               │    │
│  │                │   └─────────────────┘                               │    │
│  │  Topic ────────┼──▶┌─────────────────┐                               │    │
│  │  (6 partitions)│   │   Consumer 2    │                               │    │
│  │                │   └─────────────────┘                               │    │
│  │                └──▶┌─────────────────┐                               │    │
│  │                    │   Consumer 3    │                               │    │
│  │                    └─────────────────┘                               │    │
│  │                                                                      │    │
│  │  Same consumer group: Each partition assigned to one consumer        │    │
│  │  Consumer 1: Partitions 0, 1                                         │    │
│  │  Consumer 2: Partitions 2, 3                                         │    │
│  │  Consumer 3: Partitions 4, 5                                         │    │
│  │                                                                      │    │
│  │  Use for: Parallel processing, load distribution                     │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  2. FAN-OUT (Broadcast)                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │                    ┌─────────────────┐                               │    │
│  │                ┌──▶│ Email Service   │ (Group: email-svc)            │    │
│  │                │   └─────────────────┘                               │    │
│  │  order.created ┼──▶┌─────────────────┐                               │    │
│  │                │   │ Analytics Svc   │ (Group: analytics-svc)        │    │
│  │                │   └─────────────────┘                               │    │
│  │                └──▶┌─────────────────┐                               │    │
│  │                    │ Inventory Svc   │ (Group: inventory-svc)        │    │
│  │                    └─────────────────┘                               │    │
│  │                                                                      │    │
│  │  Different consumer groups: Each gets ALL messages                   │    │
│  │                                                                      │    │
│  │  Use for: Multiple services need the same event                      │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  3. SELECTIVE CONSUMPTION (Filtering)                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  All order events ────▶ order.events topic                           │    │
│  │                                                                      │    │
│  │  Consumer filters based on event type:                               │    │
│  │                                                                      │    │
│  │  Shipping Service:                                                   │    │
│  │  if event.type == "order.shipped" || event.type == "order.delivered"│    │
│  │      process(event)                                                  │    │
│  │  else                                                                │    │
│  │      skip(event)                                                     │    │
│  │                                                                      │    │
│  │  Alternative: Use separate topics per event type                     │    │
│  │  order.created, order.shipped, order.delivered                       │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Error Handling Strategies

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ERROR HANDLING STRATEGIES                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. RETRY WITH BACKOFF                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  func processWithRetry(event Event) error {                          │    │
│  │      maxRetries := 5                                                 │    │
│  │      for attempt := 0; attempt < maxRetries; attempt++ {             │    │
│  │          err := process(event)                                       │    │
│  │          if err == nil {                                             │    │
│  │              return nil                                              │    │
│  │          }                                                           │    │
│  │                                                                      │    │
│  │          if !isRetryable(err) {                                      │    │
│  │              return err  // Don't retry non-recoverable errors       │    │
│  │          }                                                           │    │
│  │                                                                      │    │
│  │          // Exponential backoff: 1s, 2s, 4s, 8s, 16s                 │    │
│  │          delay := time.Duration(1<<attempt) * time.Second            │    │
│  │          time.Sleep(delay)                                           │    │
│  │      }                                                               │    │
│  │      return fmt.Errorf("max retries exceeded")                       │    │
│  │  }                                                                   │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  2. DEAD LETTER QUEUE (DLQ)                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Main Topic ────▶ Consumer ────▶ Process                             │    │
│  │                      │                                               │    │
│  │                      │ (on failure after retries)                    │    │
│  │                      ▼                                               │    │
│  │              ┌─────────────────┐                                     │    │
│  │              │   Dead Letter   │ ──▶ Manual review                   │    │
│  │              │     Queue       │ ──▶ Alerting                        │    │
│  │              └─────────────────┘ ──▶ Later reprocessing              │    │
│  │                                                                      │    │
│  │  DLQ message contains:                                               │    │
│  │  • Original event                                                    │    │
│  │  • Error message                                                     │    │
│  │  • Retry count                                                       │    │
│  │  • Timestamp                                                         │    │
│  │  • Consumer ID                                                       │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  3. CIRCUIT BREAKER FOR CONSUMERS                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  When processing repeatedly fails:                                   │    │
│  │                                                                      │    │
│  │  CLOSED ─────▶ OPEN ─────▶ HALF-OPEN ─────▶ CLOSED                  │    │
│  │  (normal)  (failures)   (test)        (recovered)                   │    │
│  │                                                                      │    │
│  │  When circuit is OPEN:                                               │    │
│  │  • Stop consuming from topic                                         │    │
│  │  • Wait for cooldown period                                          │    │
│  │  • Alert operations team                                             │    │
│  │                                                                      │    │
│  │  Prevents: Endless retry loops, resource exhaustion                  │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  4. POISON PILL HANDLING                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  A "poison pill" is a message that always fails processing           │    │
│  │                                                                      │    │
│  │  Detection:                                                          │    │
│  │  • Track retry count per message                                     │    │
│  │  • If retries > threshold, treat as poison pill                      │    │
│  │                                                                      │    │
│  │  Handling:                                                           │    │
│  │  1. Move to DLQ                                                      │    │
│  │  2. Commit offset (skip the message)                                 │    │
│  │  3. Continue processing next messages                                │    │
│  │  4. Alert for investigation                                          │    │
│  │                                                                      │    │
│  │  Without this: One bad message blocks entire partition               │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Idempotency Strategies

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    IDEMPOTENCY STRATEGIES                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PROBLEM: Events may be delivered more than once                             │
│  SOLUTION: Make consumers idempotent                                         │
│                                                                              │
│  1. IDEMPOTENCY KEY TRACKING                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  processed_events table:                                             │    │
│  │  ┌──────────────────────────────────────────────────┐                │    │
│  │  │ event_id (PK)   │ processed_at   │ result       │                │    │
│  │  ├──────────────────┼────────────────┼──────────────┤                │    │
│  │  │ evt-123          │ 2024-01-15     │ success      │                │    │
│  │  │ evt-124          │ 2024-01-15     │ success      │                │    │
│  │  └──────────────────────────────────────────────────┘                │    │
│  │                                                                      │    │
│  │  func processEvent(event Event) error {                              │    │
│  │      // Check if already processed                                   │    │
│  │      if exists(event.ID) {                                           │    │
│  │          return nil  // Already processed, skip                      │    │
│  │      }                                                               │    │
│  │                                                                      │    │
│  │      // Process and record atomically                                │    │
│  │      tx.Begin()                                                      │    │
│  │      result := process(event)                                        │    │
│  │      recordProcessed(event.ID, result)                               │    │
│  │      tx.Commit()                                                     │    │
│  │  }                                                                   │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  2. NATURAL IDEMPOTENCY                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Some operations are naturally idempotent:                           │    │
│  │                                                                      │    │
│  │  ✓ SET user.status = 'ACTIVE'     (same result every time)          │    │
│  │  ✓ DELETE WHERE id = 123          (delete already deleted = OK)     │    │
│  │  ✓ UPSERT (INSERT ON CONFLICT)    (insert or update)                │    │
│  │                                                                      │    │
│  │  ✗ INCREMENT balance BY 100        (NOT idempotent)                 │    │
│  │  ✗ INSERT INTO orders (...)        (duplicates created)             │    │
│  │                                                                      │    │
│  │  Transform non-idempotent to idempotent:                             │    │
│  │                                                                      │    │
│  │  Before: UPDATE accounts SET balance = balance + 100                 │    │
│  │  After:  UPDATE accounts SET balance = 1000                          │    │
│  │          WHERE balance = 900  (specific state transition)            │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  3. VERSION/SEQUENCE CHECKING                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Event contains version number:                                      │    │
│  │  {                                                                   │    │
│  │    "event_id": "evt-123",                                            │    │
│  │    "aggregate_id": "order-456",                                      │    │
│  │    "version": 5,                                                     │    │
│  │    "data": {...}                                                     │    │
│  │  }                                                                   │    │
│  │                                                                      │    │
│  │  Consumer checks version:                                            │    │
│  │  • If version <= current_version: Skip (already processed)          │    │
│  │  • If version > current_version + 1: Out of order (wait/error)      │    │
│  │  • If version == current_version + 1: Process                        │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Event Replay Strategies

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EVENT REPLAY STRATEGIES                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. FULL REPLAY                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Use case: Build new read model, fix data corruption                 │    │
│  │                                                                      │    │
│  │  Steps:                                                              │    │
│  │  1. Stop consumers                                                   │    │
│  │  2. Reset consumer offset to beginning                               │    │
│  │  3. Clear target state (optional)                                    │    │
│  │  4. Restart consumers                                                │    │
│  │  5. Process all events from start                                    │    │
│  │                                                                      │    │
│  │  Kafka command:                                                      │    │
│  │  kafka-consumer-groups --reset-offsets --to-earliest                 │    │
│  │                        --group my-consumer --topic my-topic          │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  2. POINT-IN-TIME REPLAY                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Reset to specific timestamp:                                        │    │
│  │                                                                      │    │
│  │  kafka-consumer-groups --reset-offsets                               │    │
│  │                        --to-datetime 2024-01-15T10:00:00.000         │    │
│  │                        --group my-consumer --topic my-topic          │    │
│  │                                                                      │    │
│  │  Use case: Replay events after a bug was introduced                  │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  3. SELECTIVE REPLAY                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Replay only specific events (e.g., for one customer):               │    │
│  │                                                                      │    │
│  │  1. Read events from log                                             │    │
│  │  2. Filter by criteria (customer_id, event_type, etc.)               │    │
│  │  3. Republish to special replay topic                                │    │
│  │  4. Consumer processes replay topic                                  │    │
│  │                                                                      │    │
│  │  // Selective replay tool                                            │    │
│  │  for event in read_all_events(topic):                                │    │
│  │      if event.customer_id == target_customer:                        │    │
│  │          publish(replay_topic, event)                                │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  REPLAY CONSIDERATIONS:                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  • Consumers MUST be idempotent                                      │    │
│  │  • Consider side effects (don't send emails again!)                  │    │
│  │  • May need "replay mode" flag to skip side effects                  │    │
│  │  • Time-based logic may behave differently                           │    │
│  │  • External services may not support replay                          │    │
│  │                                                                      │    │
│  │  if (isReplayMode) {                                                 │    │
│  │      // Skip side effects                                            │    │
│  │      processData(event)                                              │    │
│  │  } else {                                                            │    │
│  │      processData(event)                                              │    │
│  │      sendEmail(event)  // Only in live mode                          │    │
│  │  }                                                                   │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Backpressure Strategies

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    BACKPRESSURE STRATEGIES                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PROBLEM: Producer faster than consumer → Queue grows unbounded              │
│                                                                              │
│  1. CONSUMER PULL (Kafka Default)                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Consumer controls the pace by pulling messages:                     │    │
│  │                                                                      │    │
│  │  consumer.poll(timeout)  // Fetch batch when ready                   │    │
│  │  process(batch)          // Process at consumer's pace               │    │
│  │  consumer.commitSync()   // Commit after processing                  │    │
│  │                                                                      │    │
│  │  Natural backpressure: Consumer only takes what it can handle        │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  2. RATE LIMITING AT PRODUCER                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Limit how fast producer can publish:                                │    │
│  │                                                                      │    │
│  │  rateLimiter := rate.NewLimiter(1000, 100)  // 1000/sec, burst 100  │    │
│  │                                                                      │    │
│  │  for event := range events {                                         │    │
│  │      rateLimiter.Wait(ctx)  // Block if over limit                  │    │
│  │      producer.Send(topic, event)                                     │    │
│  │  }                                                                   │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  3. BUFFERING WITH OVERFLOW HANDLING                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  When buffer is full, choose strategy:                               │    │
│  │                                                                      │    │
│  │  a) Drop oldest (sliding window)                                     │    │
│  │     buffer.AddWithOverflow(event, DROP_OLDEST)                       │    │
│  │                                                                      │    │
│  │  b) Drop newest (reject new events)                                  │    │
│  │     if buffer.IsFull() {                                             │    │
│  │         return ErrBufferFull                                         │    │
│  │     }                                                                │    │
│  │                                                                      │    │
│  │  c) Block producer (apply backpressure)                              │    │
│  │     buffer.AddBlocking(event)  // Wait for space                     │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  4. DYNAMIC SCALING                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Auto-scale consumers based on lag:                                  │    │
│  │                                                                      │    │
│  │  Consumer lag = Latest offset - Consumer offset                      │    │
│  │                                                                      │    │
│  │  if consumerLag > highThreshold {                                    │    │
│  │      scaleUp(consumerGroup)                                          │    │
│  │  } else if consumerLag < lowThreshold {                              │    │
│  │      scaleDown(consumerGroup)                                        │    │
│  │  }                                                                   │    │
│  │                                                                      │    │
│  │  Note: Can only scale up to number of partitions                     │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

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
