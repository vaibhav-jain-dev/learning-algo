# Event-Driven Architecture: Complete Guide

## Overview

Event-Driven Architecture (EDA) is a software design pattern where the flow of the program is determined by events. This comprehensive guide covers everything from fundamentals to advanced patterns, implementation details, and best practices.

**Tags:** Events, Architecture, Kafka, Messaging, Design

---

## Table of Contents

1. [Fundamentals](#fundamentals)
2. [Event Types & Structures](#event-types)
3. [Messaging Infrastructure](#messaging-infrastructure)
4. [Event Sourcing](#event-sourcing)
5. [CQRS Pattern](#cqrs)
6. [Saga Pattern](#saga)
7. [Schema Management](#schema-management)
8. [Testing Strategies](#testing)
9. [Observability](#observability)
10. [Production Considerations](#production)

---

## Fundamentals

### What is Event-Driven Architecture?

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EVENT-DRIVEN ARCHITECTURE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  TRADITIONAL REQUEST-RESPONSE:                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Client ──Request──▶ Service A ──Request──▶ Service B                │    │
│  │         ◀─Response──          ◀─Response──                           │    │
│  │                                                                      │    │
│  │  • Synchronous                                                       │    │
│  │  • Tight coupling                                                    │    │
│  │  • Caller waits for response                                         │    │
│  │  • Failure propagates immediately                                    │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  EVENT-DRIVEN:                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Service A ──Event──▶ Event Bus ──Event──▶ Service B                 │    │
│  │  (Publisher)           (Kafka)    (Subscriber)                       │    │
│  │                           │                                          │    │
│  │                           └──Event──▶ Service C                      │    │
│  │                              (Subscriber)                            │    │
│  │                                                                      │    │
│  │  • Asynchronous                                                      │    │
│  │  • Loose coupling                                                    │    │
│  │  • Publisher doesn't wait                                            │    │
│  │  • Failure isolated                                                  │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Core Concepts

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CORE EDA CONCEPTS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  EVENT                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  A record of something that happened in the system                   │    │
│  │                                                                      │    │
│  │  Characteristics:                                                    │    │
│  │  • Immutable (cannot be changed after creation)                      │    │
│  │  • Past tense (OrderCreated, not CreateOrder)                        │    │
│  │  • Contains enough data to be useful to consumers                    │    │
│  │  • Self-describing (includes type and schema version)                │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  PRODUCER (Publisher)                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Service that emits events when something happens                    │    │
│  │                                                                      │    │
│  │  Responsibilities:                                                   │    │
│  │  • Create well-formed events                                         │    │
│  │  • Ensure delivery to message broker                                 │    │
│  │  • Handle publish failures                                           │    │
│  │  • Not responsible for what happens to event after publishing        │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  CONSUMER (Subscriber)                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Service that reacts to events                                       │    │
│  │                                                                      │    │
│  │  Responsibilities:                                                   │    │
│  │  • Subscribe to relevant topics                                      │    │
│  │  • Process events idempotently                                       │    │
│  │  • Handle processing failures                                        │    │
│  │  • Manage consumer offsets                                           │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  EVENT BROKER                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Infrastructure that routes events from producers to consumers       │    │
│  │                                                                      │    │
│  │  Examples: Apache Kafka, RabbitMQ, AWS EventBridge, Redis Streams    │    │
│  │                                                                      │    │
│  │  Responsibilities:                                                   │    │
│  │  • Receive events from producers                                     │    │
│  │  • Store events (optionally)                                         │    │
│  │  • Deliver events to consumers                                       │    │
│  │  • Handle consumer groups and partitioning                           │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Event Types

### Event Classification

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         EVENT TYPES                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. DOMAIN EVENTS                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Business-meaningful events within a bounded context                 │    │
│  │                                                                      │    │
│  │  Examples:                                                           │    │
│  │  • OrderPlaced                                                       │    │
│  │  • PaymentReceived                                                   │    │
│  │  • InventoryReserved                                                 │    │
│  │  • ShipmentDelivered                                                 │    │
│  │                                                                      │    │
│  │  Characteristics:                                                    │    │
│  │  • Named in business language                                        │    │
│  │  • Contains business-relevant data                                   │    │
│  │  • Triggers business workflows                                       │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  2. INTEGRATION EVENTS                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Events that cross service boundaries                                │    │
│  │                                                                      │    │
│  │  Design considerations:                                              │    │
│  │  • Should be versioned                                               │    │
│  │  • Minimize data exposure (don't leak internal details)              │    │
│  │  • Consider backward compatibility                                   │    │
│  │                                                                      │    │
│  │  Anti-pattern: Exposing all domain events as integration events      │    │
│  │  Better: Create specific integration events with curated data        │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  3. EVENT NOTIFICATION                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Minimal event that signals something happened                       │    │
│  │                                                                      │    │
│  │  {                                                                   │    │
│  │    "type": "OrderStatusChanged",                                     │    │
│  │    "order_id": "123"                                                 │    │
│  │    // Consumer must call API for details                             │    │
│  │  }                                                                   │    │
│  │                                                                      │    │
│  │  Pros: Small payload, less coupling                                  │    │
│  │  Cons: Requires callback to get details                              │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  4. EVENT-CARRIED STATE TRANSFER                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Event contains all data needed by consumers                         │    │
│  │                                                                      │    │
│  │  {                                                                   │    │
│  │    "type": "OrderCreated",                                           │    │
│  │    "order_id": "123",                                                │    │
│  │    "customer": {                                                     │    │
│  │      "id": "456",                                                    │    │
│  │      "name": "John Doe",                                             │    │
│  │      "email": "john@example.com"                                     │    │
│  │    },                                                                │    │
│  │    "items": [...],                                                   │    │
│  │    "total": 150.00                                                   │    │
│  │  }                                                                   │    │
│  │                                                                      │    │
│  │  Pros: No callbacks needed, consumer autonomous                      │    │
│  │  Cons: Larger payload, data duplication                              │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Event Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STANDARD EVENT STRUCTURE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  {                                                                           │
│    // ===== METADATA (Envelope) =====                                        │
│    "id": "evt-550e8400-e29b-41d4-a716-446655440000",  // Unique event ID    │
│    "type": "com.company.order.OrderCreated",          // Event type         │
│    "source": "order-service",                         // Publisher          │
│    "spec_version": "1.0",                             // CloudEvents ver    │
│    "time": "2024-01-15T10:30:00.000Z",               // When it happened   │
│                                                                              │
│    // Correlation & Causation                                                │
│    "correlation_id": "req-abc123",                    // Request trace      │
│    "causation_id": "evt-xyz789",                      // Causing event      │
│                                                                              │
│    // Schema versioning                                                      │
│    "data_content_type": "application/json",                                  │
│    "data_schema": "https://schemas.company.com/order/created/v2",           │
│                                                                              │
│    // ===== PAYLOAD (Business Data) =====                                    │
│    "data": {                                                                 │
│      "order_id": "ord-123",                                                  │
│      "customer_id": "cust-456",                                              │
│      "items": [                                                              │
│        {                                                                     │
│          "product_id": "prod-789",                                           │
│          "quantity": 2,                                                      │
│          "unit_price": 49.99                                                 │
│        }                                                                     │
│      ],                                                                      │
│      "total": 99.98,                                                         │
│      "shipping_address": {                                                   │
│        "street": "123 Main St",                                              │
│        "city": "Mumbai",                                                     │
│        "postal_code": "400001"                                               │
│      }                                                                       │
│    }                                                                         │
│  }                                                                           │
│                                                                              │
│  CLOUDЕВENTS SPECIFICATION:                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Industry standard for event format                                  │    │
│  │  https://cloudevents.io/                                             │    │
│  │                                                                      │    │
│  │  Required fields: id, source, specversion, type                      │    │
│  │  Optional: datacontenttype, dataschema, subject, time                │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Messaging Infrastructure

### Apache Kafka Deep Dive

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    KAFKA ARCHITECTURE                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  CLUSTER TOPOLOGY:                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │               ┌─────────────────────────────────────┐               │    │
│  │               │         KAFKA CLUSTER               │               │    │
│  │               │                                     │               │    │
│  │  Producers    │  ┌─────────┐  ┌─────────┐  ┌─────────┐  Consumers  │    │
│  │      │        │  │ Broker 1│  │ Broker 2│  │ Broker 3│      │      │    │
│  │      │        │  │         │  │         │  │         │      │      │    │
│  │      ├───────▶│  │  P0*    │  │  P0     │  │  P1*    │◀─────┤      │    │
│  │      │        │  │  P1     │  │  P1     │  │  P2     │      │      │    │
│  │      │        │  │  P2*    │  │  P2     │  │  P0     │      │      │    │
│  │      │        │  │         │  │         │  │         │      │      │    │
│  │      │        │  └─────────┘  └─────────┘  └─────────┘      │      │    │
│  │      │        │                                     │        │      │    │
│  │      │        └─────────────────────────────────────┘        │      │    │
│  │      │                                                       │      │    │
│  │      │        P* = Partition Leader                          │      │    │
│  │      │        P  = Partition Replica                         │      │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  TOPIC & PARTITIONS:                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Topic: order-events (3 partitions, replication factor 3)            │    │
│  │                                                                      │    │
│  │  Partition 0: [msg0][msg3][msg6][msg9 ]...                          │    │
│  │  Partition 1: [msg1][msg4][msg7][msg10]...                          │    │
│  │  Partition 2: [msg2][msg5][msg8][msg11]...                          │    │
│  │                                                                      │    │
│  │  Partitioning strategy:                                              │    │
│  │  • Key-based: hash(order_id) % num_partitions                        │    │
│  │  • Round-robin: If no key specified                                  │    │
│  │                                                                      │    │
│  │  Same key always goes to same partition → Ordering guarantee         │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  CONSUMER GROUPS:                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Topic: order-events (3 partitions)                                  │    │
│  │                                                                      │    │
│  │  Consumer Group: order-processor                                     │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │  Consumer 1 ◀─── Partition 0                                │    │    │
│  │  │  Consumer 2 ◀─── Partition 1                                │    │    │
│  │  │  Consumer 3 ◀─── Partition 2                                │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                      │    │
│  │  Consumer Group: analytics (same topic, different processing)        │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │  Consumer A ◀─── All partitions (single consumer)           │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                      │    │
│  │  Max consumers per group = Number of partitions                      │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Topic Design

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TOPIC DESIGN PATTERNS                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. SINGLE EVENT TYPE PER TOPIC                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Topics:                                                             │    │
│  │  • order.created                                                     │    │
│  │  • order.shipped                                                     │    │
│  │  • order.delivered                                                   │    │
│  │  • payment.received                                                  │    │
│  │                                                                      │    │
│  │  ✓ Clear separation                                                  │    │
│  │  ✓ Easy to subscribe to specific events                              │    │
│  │  ✗ Many topics to manage                                             │    │
│  │  ✗ No ordering across event types                                    │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  2. MULTIPLE EVENT TYPES PER TOPIC (by domain)                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Topics:                                                             │    │
│  │  • order.events (OrderCreated, OrderShipped, OrderDelivered)         │    │
│  │  • payment.events (PaymentReceived, RefundIssued)                    │    │
│  │                                                                      │    │
│  │  ✓ Fewer topics                                                      │    │
│  │  ✓ Natural ordering within aggregate                                 │    │
│  │  ✗ Consumers receive events they may not need                        │    │
│  │                                                                      │    │
│  │  Filtering approach:                                                 │    │
│  │  for event in consumer.poll():                                       │    │
│  │      if event.type in ["OrderCreated", "OrderShipped"]:              │    │
│  │          process(event)                                              │    │
│  │      else:                                                           │    │
│  │          skip(event)                                                 │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  PARTITION COUNT GUIDELINES:                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Factors to consider:                                                │    │
│  │  • Expected throughput                                               │    │
│  │  • Number of consumer instances                                      │    │
│  │  • Ordering requirements                                             │    │
│  │                                                                      │    │
│  │  Rules of thumb:                                                     │    │
│  │  • Start with partitions >= max consumer instances                   │    │
│  │  • Single partition per unique entity (for ordering)                 │    │
│  │  • More partitions = more parallelism but more overhead              │    │
│  │  • Cannot reduce partitions once created (can only increase)         │    │
│  │                                                                      │    │
│  │  Example calculation:                                                │    │
│  │  • Target throughput: 100,000 msgs/sec                               │    │
│  │  • Single partition throughput: ~10,000 msgs/sec                     │    │
│  │  • Partitions needed: 100,000 / 10,000 = 10 partitions               │    │
│  │  • Add buffer: 12-15 partitions                                      │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Event Sourcing Deep Dive

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EVENT SOURCING ARCHITECTURE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  OVERVIEW:                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Instead of storing current state, store ALL state changes (events)  │    │
│  │                                                                      │    │
│  │  Traditional:   State = current_values                               │    │
│  │  Event Sourced: State = fold(initial_state, all_events)              │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  EVENT STORE:                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  events table:                                                       │    │
│  │  ┌──────────────────────────────────────────────────────────────┐   │    │
│  │  │ stream_id      │ version │ event_type        │ data   │ ts   │   │    │
│  │  ├────────────────┼─────────┼───────────────────┼────────┼──────┤   │    │
│  │  │ order-123      │ 1       │ OrderCreated      │ {...}  │ t1   │   │    │
│  │  │ order-123      │ 2       │ ItemAdded         │ {...}  │ t2   │   │    │
│  │  │ order-123      │ 3       │ PaymentReceived   │ {...}  │ t3   │   │    │
│  │  │ order-123      │ 4       │ OrderShipped      │ {...}  │ t4   │   │    │
│  │  │ order-456      │ 1       │ OrderCreated      │ {...}  │ t5   │   │    │
│  │  └──────────────────────────────────────────────────────────────┘   │    │
│  │                                                                      │    │
│  │  Constraints:                                                        │    │
│  │  • UNIQUE(stream_id, version) - Optimistic concurrency              │    │
│  │  • Append-only (no updates, no deletes)                              │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  REBUILDING STATE:                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  func GetOrder(orderID string) (*Order, error) {                     │    │
│  │      // 1. Load all events for this order                            │    │
│  │      events := eventStore.GetStream("order-" + orderID)              │    │
│  │                                                                      │    │
│  │      // 2. Create empty aggregate                                    │    │
│  │      order := &Order{}                                               │    │
│  │                                                                      │    │
│  │      // 3. Apply each event to build current state                   │    │
│  │      for _, event := range events {                                  │    │
│  │          order.Apply(event)                                          │    │
│  │      }                                                               │    │
│  │                                                                      │    │
│  │      return order, nil                                               │    │
│  │  }                                                                   │    │
│  │                                                                      │    │
│  │  func (o *Order) Apply(event Event) {                                │    │
│  │      switch e := event.(type) {                                      │    │
│  │      case OrderCreated:                                              │    │
│  │          o.ID = e.OrderID                                            │    │
│  │          o.CustomerID = e.CustomerID                                 │    │
│  │          o.Status = "CREATED"                                        │    │
│  │      case ItemAdded:                                                 │    │
│  │          o.Items = append(o.Items, e.Item)                           │    │
│  │          o.Total += e.Item.Price                                     │    │
│  │      case PaymentReceived:                                           │    │
│  │          o.Status = "PAID"                                           │    │
│  │          o.PaymentID = e.PaymentID                                   │    │
│  │      case OrderShipped:                                              │    │
│  │          o.Status = "SHIPPED"                                        │    │
│  │          o.TrackingNumber = e.TrackingNumber                         │    │
│  │      }                                                               │    │
│  │  }                                                                   │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  SNAPSHOTS (Optimization):                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Problem: Rebuilding from 10,000 events is slow                      │    │
│  │  Solution: Periodically save snapshots                               │    │
│  │                                                                      │    │
│  │  Event stream: [E1][E2]...[E100][Snapshot@100][E101]...[E150]        │    │
│  │                                                                      │    │
│  │  To get current state:                                               │    │
│  │  1. Load latest snapshot (version 100)                               │    │
│  │  2. Apply only events after snapshot (101-150)                       │    │
│  │                                                                      │    │
│  │  Snapshot frequency: Every N events (e.g., every 100 events)         │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## CQRS Implementation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CQRS + EVENT SOURCING                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │                        APPLICATION                                   │    │
│  │                             │                                        │    │
│  │              ┌──────────────┴──────────────┐                        │    │
│  │              │                             │                        │    │
│  │              ▼                             ▼                        │    │
│  │     ┌─────────────────┐          ┌─────────────────┐               │    │
│  │     │    COMMANDS     │          │     QUERIES     │               │    │
│  │     │                 │          │                 │               │    │
│  │     │ • CreateOrder   │          │ • GetOrder      │               │    │
│  │     │ • AddItem       │          │ • ListOrders    │               │    │
│  │     │ • ProcessPayment│          │ • GetAnalytics  │               │    │
│  │     └────────┬────────┘          └────────┬────────┘               │    │
│  │              │                             │                        │    │
│  │              ▼                             ▼                        │    │
│  │     ┌─────────────────┐          ┌─────────────────┐               │    │
│  │     │  WRITE MODEL    │          │   READ MODEL    │               │    │
│  │     │                 │          │                 │               │    │
│  │     │  • Event Store  │  Events  │ • Materialized  │               │    │
│  │     │  • Domain Logic │ ────────▶│   Views         │               │    │
│  │     │  • Aggregates   │          │ • Optimized for │               │    │
│  │     │                 │          │   queries       │               │    │
│  │     └────────┬────────┘          └─────────────────┘               │    │
│  │              │                             │                        │    │
│  │              ▼                             ▼                        │    │
│  │     ┌─────────────────┐          ┌─────────────────┐               │    │
│  │     │   PostgreSQL    │          │  Elasticsearch  │               │    │
│  │     │  (Event Store)  │          │   (Search)      │               │    │
│  │     └─────────────────┘          └─────────────────┘               │    │
│  │                                           │                        │    │
│  │                                  ┌─────────────────┐               │    │
│  │                                  │     Redis       │               │    │
│  │                                  │   (Analytics)   │               │    │
│  │                                  └─────────────────┘               │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  PROJECTION EXAMPLE:                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  // Order List Projection (for listing orders)                       │    │
│  │  type OrderListProjection struct {                                   │    │
│  │      db *sql.DB                                                      │    │
│  │  }                                                                   │    │
│  │                                                                      │    │
│  │  func (p *OrderListProjection) Handle(event Event) {                 │    │
│  │      switch e := event.(type) {                                      │    │
│  │      case OrderCreated:                                              │    │
│  │          p.db.Exec(`                                                 │    │
│  │              INSERT INTO order_list                                  │    │
│  │              (id, customer_name, status, total, created_at)          │    │
│  │              VALUES ($1, $2, $3, $4, $5)                              │    │
│  │          `, e.OrderID, e.CustomerName, "CREATED", 0, e.Timestamp)    │    │
│  │                                                                      │    │
│  │      case ItemAdded:                                                 │    │
│  │          p.db.Exec(`                                                 │    │
│  │              UPDATE order_list                                       │    │
│  │              SET total = total + $2                                  │    │
│  │              WHERE id = $1                                           │    │
│  │          `, e.OrderID, e.Item.Price)                                 │    │
│  │                                                                      │    │
│  │      case OrderShipped:                                              │    │
│  │          p.db.Exec(`                                                 │    │
│  │              UPDATE order_list                                       │    │
│  │              SET status = 'SHIPPED', shipped_at = $2                 │    │
│  │              WHERE id = $1                                           │    │
│  │          `, e.OrderID, e.Timestamp)                                  │    │
│  │      }                                                               │    │
│  │  }                                                                   │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Schema Management

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SCHEMA EVOLUTION                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  SCHEMA REGISTRY:                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  Producer ──▶ Schema Registry ──▶ Kafka ──▶ Consumer                 │    │
│  │     │              │                           │                     │    │
│  │     │   1. Register│schema                     │                     │    │
│  │     │   2. Get schema ID                       │                     │    │
│  │     │   3. Send (schema_id + data)             │                     │    │
│  │     │                                          │                     │    │
│  │     │                              4. Lookup schema by ID            │    │
│  │     │                              5. Deserialize data               │    │
│  │                                                                      │    │
│  │  Popular implementations:                                            │    │
│  │  • Confluent Schema Registry (Avro, JSON, Protobuf)                  │    │
│  │  • AWS Glue Schema Registry                                          │    │
│  │  • Karapace (open source)                                            │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  COMPATIBILITY MODES:                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  BACKWARD (recommended):                                             │    │
│  │  • New schema can read old data                                      │    │
│  │  • Deploy consumers first, then producers                            │    │
│  │  • Can: Add optional fields, Remove fields                           │    │
│  │  • Cannot: Add required fields                                       │    │
│  │                                                                      │    │
│  │  FORWARD:                                                            │    │
│  │  • Old schema can read new data                                      │    │
│  │  • Deploy producers first, then consumers                            │    │
│  │  • Can: Add fields, Remove optional fields                           │    │
│  │  • Cannot: Remove required fields                                    │    │
│  │                                                                      │    │
│  │  FULL:                                                               │    │
│  │  • Both backward and forward compatible                              │    │
│  │  • Safest but most restrictive                                       │    │
│  │  • Can: Add/Remove optional fields with defaults                     │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  AVRO SCHEMA EXAMPLE:                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  // Version 1                                                        │    │
│  │  {                                                                   │    │
│  │    "type": "record",                                                 │    │
│  │    "name": "OrderCreated",                                           │    │
│  │    "namespace": "com.company.events",                                │    │
│  │    "fields": [                                                       │    │
│  │      {"name": "order_id", "type": "string"},                         │    │
│  │      {"name": "customer_id", "type": "string"},                      │    │
│  │      {"name": "total", "type": "double"}                             │    │
│  │    ]                                                                 │    │
│  │  }                                                                   │    │
│  │                                                                      │    │
│  │  // Version 2 (backward compatible)                                  │    │
│  │  {                                                                   │    │
│  │    "type": "record",                                                 │    │
│  │    "name": "OrderCreated",                                           │    │
│  │    "namespace": "com.company.events",                                │    │
│  │    "fields": [                                                       │    │
│  │      {"name": "order_id", "type": "string"},                         │    │
│  │      {"name": "customer_id", "type": "string"},                      │    │
│  │      {"name": "total", "type": "double"},                            │    │
│  │      {"name": "currency", "type": "string", "default": "USD"}        │    │
│  │    ]  // New optional field with default                             │    │
│  │  }                                                                   │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Observability

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EDA OBSERVABILITY                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  KEY METRICS:                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  PRODUCER METRICS:                                                   │    │
│  │  • Events published/sec                                              │    │
│  │  • Publish latency (p50, p95, p99)                                   │    │
│  │  • Publish failures                                                  │    │
│  │  • Batch size                                                        │    │
│  │                                                                      │    │
│  │  CONSUMER METRICS:                                                   │    │
│  │  • Events consumed/sec                                               │    │
│  │  • Processing latency                                                │    │
│  │  • Consumer lag (CRITICAL!)                                          │    │
│  │  • Processing failures                                               │    │
│  │  • DLQ size                                                          │    │
│  │                                                                      │    │
│  │  BROKER METRICS:                                                     │    │
│  │  • Messages in/out per topic                                         │    │
│  │  • Disk usage                                                        │    │
│  │  • Replication lag                                                   │    │
│  │  • Under-replicated partitions                                       │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  DISTRIBUTED TRACING:                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  // Producer: Include trace context in event                         │    │
│  │  event := Event{                                                     │    │
│  │      ID:           uuid.New(),                                       │    │
│  │      Type:         "OrderCreated",                                   │    │
│  │      Data:         orderData,                                        │    │
│  │      TraceID:      span.TraceID(),      // From current span         │    │
│  │      SpanID:       span.SpanID(),                                    │    │
│  │      CorrelationID: ctx.Value("correlation_id"),                     │    │
│  │  }                                                                   │    │
│  │                                                                      │    │
│  │  // Consumer: Continue trace                                         │    │
│  │  parentCtx := trace.ContextWithRemoteSpanContext(                    │    │
│  │      context.Background(),                                           │    │
│  │      trace.NewSpanContext(trace.SpanContextConfig{                   │    │
│  │          TraceID: event.TraceID,                                     │    │
│  │          SpanID:  event.SpanID,                                      │    │
│  │      }),                                                             │    │
│  │  )                                                                   │    │
│  │  ctx, span := tracer.Start(parentCtx, "process-order-created")       │    │
│  │  defer span.End()                                                    │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ALERTING:                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  CRITICAL:                                                           │    │
│  │  • Consumer lag > 10,000 messages (falling behind)                   │    │
│  │  • DLQ messages > 0 (processing failures)                            │    │
│  │  • Under-replicated partitions > 0 (data durability risk)            │    │
│  │                                                                      │    │
│  │  WARNING:                                                            │    │
│  │  • Consumer lag growing                                              │    │
│  │  • Processing latency > SLA                                          │    │
│  │  • Disk usage > 80%                                                  │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Production Considerations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PRODUCTION CHECKLIST                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ☐ MESSAGE DURABILITY                                                        │
│    ☐ Replication factor >= 3                                                │
│    ☐ min.insync.replicas >= 2                                               │
│    ☐ acks = all (producer)                                                  │
│    ☐ Proper retention (7+ days for critical topics)                         │
│                                                                              │
│  ☐ CONSUMER RELIABILITY                                                      │
│    ☐ Idempotent processing implemented                                      │
│    ☐ Dead letter queue configured                                           │
│    ☐ Retry with backoff                                                     │
│    ☐ Circuit breaker for downstream calls                                   │
│    ☐ Consumer lag alerting                                                  │
│                                                                              │
│  ☐ SCHEMA MANAGEMENT                                                         │
│    ☐ Schema registry deployed                                               │
│    ☐ Compatibility mode configured                                          │
│    ☐ Schema validation in CI/CD                                             │
│                                                                              │
│  ☐ OBSERVABILITY                                                             │
│    ☐ Metrics collection (Prometheus/Datadog)                                │
│    ☐ Distributed tracing (Jaeger/Zipkin)                                    │
│    ☐ Centralized logging                                                    │
│    ☐ Dashboards for key metrics                                             │
│    ☐ Alerting configured                                                    │
│                                                                              │
│  ☐ SECURITY                                                                  │
│    ☐ TLS for broker connections                                             │
│    ☐ Authentication (SASL)                                                  │
│    ☐ Authorization (ACLs)                                                   │
│    ☐ Encryption at rest                                                     │
│                                                                              │
│  ☐ OPERATIONS                                                                │
│    ☐ Runbooks for common issues                                             │
│    ☐ Capacity planning                                                      │
│    ☐ Disaster recovery plan                                                 │
│    ☐ Replay procedures documented                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Key Takeaways

1. **Events are first-class citizens** - Design events carefully, they are your API
2. **Idempotency is non-negotiable** - Events will be delivered multiple times
3. **Schema evolution matters** - Plan for backward compatibility from day one
4. **Monitor consumer lag** - It's your early warning system
5. **Event sourcing is powerful but complex** - Use only when audit trail is critical
6. **CQRS enables scale** - But adds eventual consistency complexity
7. **Dead letter queues save lives** - Never lose events, investigate failures later
