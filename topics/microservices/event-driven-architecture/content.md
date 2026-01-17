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

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">EVENT-DRIVEN ARCHITECTURE</h4>

<!-- Traditional Request-Response -->
<div style="color: #f85149; font-weight: bold; font-size: 12px; margin-bottom: 12px;">TRADITIONAL REQUEST-RESPONSE:</div>
<div style="background: rgba(248,81,73,0.1); border-radius: 12px; padding: 16px; margin-bottom: 20px; border-left: 3px solid #f85149;">
<div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
<div style="background: #6e7681; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px; font-weight: bold;">Client</div>
<div style="color: #58a6ff; font-size: 10px;">—Request→</div>
<div style="background: #1f6feb; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px; font-weight: bold;">Service A</div>
<div style="color: #58a6ff; font-size: 10px;">—Request→</div>
<div style="background: #8957e5; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px; font-weight: bold;">Service B</div>
</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
<div style="background: transparent; border-radius: 6px; padding: 8px 16px; color: transparent; font-size: 10px;">Client</div>
<div style="color: #f85149; font-size: 10px;">←Response—</div>
<div style="background: transparent; border-radius: 6px; padding: 8px 16px; color: transparent; font-size: 10px;">Service A</div>
<div style="color: #f85149; font-size: 10px;">←Response—</div>
<div style="background: transparent; border-radius: 6px; padding: 8px 16px; color: transparent; font-size: 10px;">Service B</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
<span style="background: rgba(248,81,73,0.2); color: #f85149; padding: 4px 10px; border-radius: 4px; font-size: 10px;">Synchronous</span>
<span style="background: rgba(248,81,73,0.2); color: #f85149; padding: 4px 10px; border-radius: 4px; font-size: 10px;">Tight coupling</span>
<span style="background: rgba(248,81,73,0.2); color: #f85149; padding: 4px 10px; border-radius: 4px; font-size: 10px;">Caller waits</span>
<span style="background: rgba(248,81,73,0.2); color: #f85149; padding: 4px 10px; border-radius: 4px; font-size: 10px;">Failure propagates</span>
</div>
</div>

<!-- Event-Driven -->
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">EVENT-DRIVEN:</div>
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #7ee787;">
<div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
<div style="background: #1f6feb; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px; text-align: center;">
<div style="font-weight: bold;">Service A</div>
<div style="opacity: 0.8;">(Publisher)</div>
</div>
<div style="color: #7ee787; font-size: 10px;">—Event→</div>
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px; text-align: center;">
<div style="font-weight: bold;">Event Bus</div>
<div style="opacity: 0.8;">(Kafka)</div>
</div>
<div style="color: #7ee787; font-size: 10px;">—Event→</div>
<div style="background: #8957e5; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px; text-align: center;">
<div style="font-weight: bold;">Service B</div>
<div style="opacity: 0.8;">(Subscriber)</div>
</div>
</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
<div style="background: transparent; padding: 8px 16px; font-size: 10px;"></div>
<div style="background: transparent; padding: 8px 16px; font-size: 10px;"></div>
<div style="color: #7ee787; font-size: 10px;">└—Event→</div>
<div style="background: #238636; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px; text-align: center;">
<div style="font-weight: bold;">Service C</div>
<div style="opacity: 0.8;">(Subscriber)</div>
</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 4px 10px; border-radius: 4px; font-size: 10px;">Asynchronous</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 4px 10px; border-radius: 4px; font-size: 10px;">Loose coupling</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 4px 10px; border-radius: 4px; font-size: 10px;">Publisher doesn't wait</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 4px 10px; border-radius: 4px; font-size: 10px;">Failure isolated</span>
</div>
</div>
</div>

### Core Concepts

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">CORE EDA CONCEPTS</h4>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">

<!-- EVENT -->
<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">EVENT</div>
<div style="color: #c9d1d9; font-size: 11px; margin-bottom: 12px;">A record of something that happened in the system</div>
<div style="color: #8b949e; font-size: 10px;">
<div style="font-weight: bold; color: #7ee787; margin-bottom: 4px;">Characteristics:</div>
<div>- Immutable (cannot be changed after creation)</div>
<div>- Past tense (OrderCreated, not CreateOrder)</div>
<div>- Contains enough data for consumers</div>
<div>- Self-describing (includes type and schema version)</div>
</div>
</div>

<!-- PRODUCER -->
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 8px;">PRODUCER (Publisher)</div>
<div style="color: #c9d1d9; font-size: 11px; margin-bottom: 12px;">Service that emits events when something happens</div>
<div style="color: #8b949e; font-size: 10px;">
<div style="font-weight: bold; color: #58a6ff; margin-bottom: 4px;">Responsibilities:</div>
<div>- Create well-formed events</div>
<div>- Ensure delivery to message broker</div>
<div>- Handle publish failures</div>
<div>- Not responsible for post-publish handling</div>
</div>
</div>

<!-- CONSUMER -->
<div style="background: rgba(137,87,229,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #8957e5;">
<div style="color: #8957e5; font-weight: bold; font-size: 12px; margin-bottom: 8px;">CONSUMER (Subscriber)</div>
<div style="color: #c9d1d9; font-size: 11px; margin-bottom: 12px;">Service that reacts to events</div>
<div style="color: #8b949e; font-size: 10px;">
<div style="font-weight: bold; color: #58a6ff; margin-bottom: 4px;">Responsibilities:</div>
<div>- Subscribe to relevant topics</div>
<div>- Process events idempotently</div>
<div>- Handle processing failures</div>
<div>- Manage consumer offsets</div>
</div>
</div>

<!-- EVENT BROKER -->
<div style="background: rgba(247,129,102,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #f78166;">
<div style="color: #f78166; font-weight: bold; font-size: 12px; margin-bottom: 8px;">EVENT BROKER</div>
<div style="color: #c9d1d9; font-size: 11px; margin-bottom: 8px;">Infrastructure that routes events from producers to consumers</div>
<div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 12px;">
<span style="background: rgba(247,129,102,0.2); color: #f78166; padding: 2px 6px; border-radius: 4px; font-size: 9px;">Kafka</span>
<span style="background: rgba(247,129,102,0.2); color: #f78166; padding: 2px 6px; border-radius: 4px; font-size: 9px;">RabbitMQ</span>
<span style="background: rgba(247,129,102,0.2); color: #f78166; padding: 2px 6px; border-radius: 4px; font-size: 9px;">EventBridge</span>
<span style="background: rgba(247,129,102,0.2); color: #f78166; padding: 2px 6px; border-radius: 4px; font-size: 9px;">Redis Streams</span>
</div>
<div style="color: #8b949e; font-size: 10px;">
<div style="font-weight: bold; color: #58a6ff; margin-bottom: 4px;">Responsibilities:</div>
<div>- Receive events from producers</div>
<div>- Store events (optionally)</div>
<div>- Deliver events to consumers</div>
<div>- Handle consumer groups and partitioning</div>
</div>
</div>

</div>
</div>

---

## Event Types

### Event Classification

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">EVENT TYPES</h4>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">

<!-- Domain Events -->
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 8px;">1. DOMAIN EVENTS</div>
<div style="color: #c9d1d9; font-size: 11px; margin-bottom: 12px;">Business-meaningful events within a bounded context</div>
<div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 12px;">
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 2px 8px; border-radius: 4px; font-size: 9px;">OrderPlaced</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 2px 8px; border-radius: 4px; font-size: 9px;">PaymentReceived</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 2px 8px; border-radius: 4px; font-size: 9px;">InventoryReserved</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 2px 8px; border-radius: 4px; font-size: 9px;">ShipmentDelivered</span>
</div>
<div style="color: #8b949e; font-size: 10px;">
<div>- Named in business language</div>
<div>- Contains business-relevant data</div>
<div>- Triggers business workflows</div>
</div>
</div>

<!-- Integration Events -->
<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">2. INTEGRATION EVENTS</div>
<div style="color: #c9d1d9; font-size: 11px; margin-bottom: 12px;">Events that cross service boundaries</div>
<div style="color: #8b949e; font-size: 10px; margin-bottom: 8px;">
<div style="font-weight: bold; margin-bottom: 4px;">Design considerations:</div>
<div>- Should be versioned</div>
<div>- Minimize data exposure</div>
<div>- Consider backward compatibility</div>
</div>
<div style="background: rgba(248,81,73,0.1); border-radius: 6px; padding: 8px; font-size: 9px;">
<span style="color: #f85149; font-weight: bold;">Anti-pattern:</span> <span style="color: #8b949e;">Exposing all domain events as integration events</span>
</div>
</div>

<!-- Event Notification -->
<div style="background: rgba(247,129,102,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #f78166;">
<div style="color: #f78166; font-weight: bold; font-size: 12px; margin-bottom: 8px;">3. EVENT NOTIFICATION</div>
<div style="color: #c9d1d9; font-size: 11px; margin-bottom: 12px;">Minimal event that signals something happened</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px; font-family: monospace; font-size: 9px; color: #c9d1d9; margin-bottom: 8px;">
{ <span style="color: #7ee787;">"type"</span>: <span style="color: #a5d6ff;">"OrderStatusChanged"</span>, <span style="color: #7ee787;">"order_id"</span>: <span style="color: #a5d6ff;">"123"</span> }
</div>
<div style="font-size: 9px;">
<span style="color: #7ee787;">Pros:</span> <span style="color: #8b949e;">Small payload, less coupling</span><br/>
<span style="color: #f85149;">Cons:</span> <span style="color: #8b949e;">Requires callback for details</span>
</div>
</div>

<!-- Event-Carried State Transfer -->
<div style="background: rgba(137,87,229,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #8957e5;">
<div style="color: #8957e5; font-weight: bold; font-size: 12px; margin-bottom: 8px;">4. EVENT-CARRIED STATE TRANSFER</div>
<div style="color: #c9d1d9; font-size: 11px; margin-bottom: 12px;">Event contains all data needed by consumers</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px; font-family: monospace; font-size: 9px; color: #c9d1d9; margin-bottom: 8px;">
{ <span style="color: #7ee787;">"type"</span>: <span style="color: #a5d6ff;">"OrderCreated"</span>,<br/>
&nbsp;&nbsp;<span style="color: #7ee787;">"customer"</span>: { ... },<br/>
&nbsp;&nbsp;<span style="color: #7ee787;">"items"</span>: [...], <span style="color: #7ee787;">"total"</span>: <span style="color: #f78166;">150.00</span> }
</div>
<div style="font-size: 9px;">
<span style="color: #7ee787;">Pros:</span> <span style="color: #8b949e;">No callbacks, consumer autonomous</span><br/>
<span style="color: #f85149;">Cons:</span> <span style="color: #8b949e;">Larger payload, data duplication</span>
</div>
</div>

</div>
</div>

### Event Structure

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">STANDARD EVENT STRUCTURE</h4>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">

<!-- Metadata Section -->
<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 12px;">METADATA (Envelope)</div>
<div style="font-family: monospace; font-size: 9px; color: #c9d1d9;">
<div><span style="color: #7ee787;">"id"</span>: <span style="color: #a5d6ff;">"evt-550e8400-..."</span></div>
<div><span style="color: #7ee787;">"type"</span>: <span style="color: #a5d6ff;">"com.company.order.OrderCreated"</span></div>
<div><span style="color: #7ee787;">"source"</span>: <span style="color: #a5d6ff;">"order-service"</span></div>
<div><span style="color: #7ee787;">"spec_version"</span>: <span style="color: #a5d6ff;">"1.0"</span></div>
<div><span style="color: #7ee787;">"time"</span>: <span style="color: #a5d6ff;">"2024-01-15T10:30:00Z"</span></div>
<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #30363d;">
<span style="color: #8b949e;">// Correlation</span><br/>
<span style="color: #7ee787;">"correlation_id"</span>: <span style="color: #a5d6ff;">"req-abc123"</span><br/>
<span style="color: #7ee787;">"causation_id"</span>: <span style="color: #a5d6ff;">"evt-xyz789"</span>
</div>
</div>
</div>

<!-- Payload Section -->
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">PAYLOAD (Business Data)</div>
<div style="font-family: monospace; font-size: 9px; color: #c9d1d9;">
<div><span style="color: #7ee787;">"data"</span>: {</div>
<div style="margin-left: 12px;"><span style="color: #7ee787;">"order_id"</span>: <span style="color: #a5d6ff;">"ord-123"</span>,</div>
<div style="margin-left: 12px;"><span style="color: #7ee787;">"customer_id"</span>: <span style="color: #a5d6ff;">"cust-456"</span>,</div>
<div style="margin-left: 12px;"><span style="color: #7ee787;">"items"</span>: [{</div>
<div style="margin-left: 24px;"><span style="color: #7ee787;">"product_id"</span>: <span style="color: #a5d6ff;">"prod-789"</span>,</div>
<div style="margin-left: 24px;"><span style="color: #7ee787;">"quantity"</span>: <span style="color: #f78166;">2</span>,</div>
<div style="margin-left: 24px;"><span style="color: #7ee787;">"unit_price"</span>: <span style="color: #f78166;">49.99</span></div>
<div style="margin-left: 12px;">}],</div>
<div style="margin-left: 12px;"><span style="color: #7ee787;">"total"</span>: <span style="color: #f78166;">99.98</span></div>
<div>}</div>
</div>
</div>

</div>

<!-- CloudEvents Specification -->
<div style="background: rgba(137,87,229,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #8957e5;">
<div style="color: #8957e5; font-weight: bold; font-size: 12px; margin-bottom: 8px;">CLOUDEVENTS SPECIFICATION</div>
<div style="color: #c9d1d9; font-size: 11px; margin-bottom: 8px;">Industry standard for event format - <span style="color: #58a6ff;">https://cloudevents.io/</span></div>
<div style="display: flex; flex-wrap: wrap; gap: 8px;">
<div style="font-size: 10px;">
<span style="color: #7ee787; font-weight: bold;">Required:</span>
<span style="color: #8b949e;">id, source, specversion, type</span>
</div>
<div style="font-size: 10px;">
<span style="color: #f0883e; font-weight: bold;">Optional:</span>
<span style="color: #8b949e;">datacontenttype, dataschema, subject, time</span>
</div>
</div>
</div>
</div>

---

## Messaging Infrastructure

### Apache Kafka Deep Dive

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">KAFKA ARCHITECTURE</h4>

<!-- Cluster Topology -->
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">CLUSTER TOPOLOGY:</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
<div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
<div style="background: #1f6feb; border-radius: 8px; padding: 12px; color: #fff; font-size: 11px; text-align: center; font-weight: bold;">Producers</div>
<div style="color: #58a6ff;">→</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 16px; flex: 1; max-width: 500px;">
<div style="color: #fff; font-weight: bold; font-size: 11px; text-align: center; margin-bottom: 12px;">KAFKA CLUSTER</div>
<div style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px; color: #fff; font-size: 9px; text-align: center;">
<div style="font-weight: bold;">Broker 1</div>
<div style="opacity: 0.9;">P0* P1 P2*</div>
</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px; color: #fff; font-size: 9px; text-align: center;">
<div style="font-weight: bold;">Broker 2</div>
<div style="opacity: 0.9;">P0 P1 P2</div>
</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px; color: #fff; font-size: 9px; text-align: center;">
<div style="font-weight: bold;">Broker 3</div>
<div style="opacity: 0.9;">P1* P2 P0</div>
</div>
</div>
</div>
<div style="color: #58a6ff;">→</div>
<div style="background: #8957e5; border-radius: 8px; padding: 12px; color: #fff; font-size: 11px; text-align: center; font-weight: bold;">Consumers</div>
</div>
<div style="margin-top: 12px; font-size: 10px; text-align: center;">
<span style="color: #7ee787;">P* = Partition Leader</span> | <span style="color: #8b949e;">P = Partition Replica</span>
</div>
</div>

<!-- Topic & Partitions -->
<div style="color: #f78166; font-weight: bold; font-size: 12px; margin-bottom: 12px;">TOPIC & PARTITIONS:</div>
<div style="background: rgba(247,129,102,0.1); border-radius: 12px; padding: 16px; margin-bottom: 20px; border-left: 3px solid #f78166;">
<div style="color: #c9d1d9; font-size: 11px; margin-bottom: 12px;"><strong>Topic:</strong> order-events (3 partitions, replication factor 3)</div>
<div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; font-family: monospace; font-size: 10px;">
<div><span style="color: #7ee787;">Partition 0:</span> <span style="color: #8b949e;">[msg0][msg3][msg6][msg9]...</span></div>
<div><span style="color: #58a6ff;">Partition 1:</span> <span style="color: #8b949e;">[msg1][msg4][msg7][msg10]...</span></div>
<div><span style="color: #8957e5;">Partition 2:</span> <span style="color: #8b949e;">[msg2][msg5][msg8][msg11]...</span></div>
</div>
<div style="color: #8b949e; font-size: 10px;">
<div><strong style="color: #c9d1d9;">Partitioning strategy:</strong></div>
<div>- Key-based: hash(order_id) % num_partitions</div>
<div>- Round-robin: If no key specified</div>
<div style="margin-top: 8px; color: #7ee787;"><strong>Same key always goes to same partition - Ordering guarantee</strong></div>
</div>
</div>

<!-- Consumer Groups -->
<div style="color: #8957e5; font-weight: bold; font-size: 12px; margin-bottom: 12px;">CONSUMER GROUPS:</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 12px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 11px; margin-bottom: 8px;">Group: order-processor</div>
<div style="font-size: 10px; color: #c9d1d9;">
<div>Consumer 1 ← Partition 0</div>
<div>Consumer 2 ← Partition 1</div>
<div>Consumer 3 ← Partition 2</div>
</div>
</div>
<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 12px; border-left: 3px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 8px;">Group: analytics</div>
<div style="font-size: 10px; color: #c9d1d9;">
<div>Consumer A ← All partitions</div>
<div style="margin-top: 8px; color: #8b949e; font-style: italic;">(single consumer handles all)</div>
</div>
</div>
</div>
<div style="margin-top: 12px; background: rgba(248,81,73,0.1); border-radius: 6px; padding: 8px; font-size: 10px; color: #f85149;">
<strong>Note:</strong> Max consumers per group = Number of partitions
</div>
</div>

### Topic Design

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">TOPIC DESIGN PATTERNS</h4>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">

<!-- Single Event Type Per Topic -->
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">1. SINGLE EVENT TYPE PER TOPIC</div>
<div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 12px;">
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 2px 8px; border-radius: 4px; font-size: 9px;">order.created</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 2px 8px; border-radius: 4px; font-size: 9px;">order.shipped</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 2px 8px; border-radius: 4px; font-size: 9px;">order.delivered</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 2px 8px; border-radius: 4px; font-size: 9px;">payment.received</span>
</div>
<div style="font-size: 10px;">
<div style="color: #7ee787;">+ Clear separation</div>
<div style="color: #7ee787;">+ Easy to subscribe to specific events</div>
<div style="color: #f85149;">- Many topics to manage</div>
<div style="color: #f85149;">- No ordering across event types</div>
</div>
</div>

<!-- Multiple Event Types Per Topic -->
<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 12px;">2. MULTIPLE EVENT TYPES PER TOPIC</div>
<div style="font-size: 10px; margin-bottom: 12px; color: #c9d1d9;">
<div><span style="color: #58a6ff;">order.events</span>: OrderCreated, OrderShipped, OrderDelivered</div>
<div><span style="color: #58a6ff;">payment.events</span>: PaymentReceived, RefundIssued</div>
</div>
<div style="font-size: 10px;">
<div style="color: #7ee787;">+ Fewer topics</div>
<div style="color: #7ee787;">+ Natural ordering within aggregate</div>
<div style="color: #f85149;">- Consumers receive unneeded events</div>
</div>
</div>

</div>

<!-- Partition Count Guidelines -->
<div style="background: rgba(247,129,102,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #f78166;">
<div style="color: #f78166; font-weight: bold; font-size: 12px; margin-bottom: 12px;">PARTITION COUNT GUIDELINES</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div>
<div style="color: #c9d1d9; font-weight: bold; font-size: 10px; margin-bottom: 6px;">Factors to consider:</div>
<div style="font-size: 10px; color: #8b949e;">
<div>- Expected throughput</div>
<div>- Number of consumer instances</div>
<div>- Ordering requirements</div>
</div>
</div>
<div>
<div style="color: #c9d1d9; font-weight: bold; font-size: 10px; margin-bottom: 6px;">Rules of thumb:</div>
<div style="font-size: 10px; color: #8b949e;">
<div>- partitions >= max consumers</div>
<div>- Cannot reduce partitions later</div>
<div>- More partitions = more overhead</div>
</div>
</div>
</div>
<div style="margin-top: 12px; background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #7ee787; font-weight: bold; font-size: 10px; margin-bottom: 6px;">Example Calculation:</div>
<div style="font-size: 10px; color: #c9d1d9;">
Target: 100K msgs/sec | Single partition: ~10K msgs/sec | Need: 10 partitions | With buffer: 12-15 partitions
</div>
</div>
</div>
</div>

---

## Event Sourcing Deep Dive

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">EVENT SOURCING ARCHITECTURE</h4>

<!-- Overview -->
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 16px; margin-bottom: 20px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 8px;">OVERVIEW</div>
<div style="color: #c9d1d9; font-size: 11px; margin-bottom: 12px;">Instead of storing current state, store ALL state changes (events)</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 10px;">
<div style="background: rgba(248,81,73,0.1); border-radius: 6px; padding: 8px;">
<span style="color: #f85149;">Traditional:</span> <span style="color: #8b949e;">State = current_values</span>
</div>
<div style="background: rgba(126,231,135,0.1); border-radius: 6px; padding: 8px;">
<span style="color: #7ee787;">Event Sourced:</span> <span style="color: #8b949e;">State = fold(initial, all_events)</span>
</div>
</div>
</div>

<!-- Event Store -->
<div style="color: #f78166; font-weight: bold; font-size: 12px; margin-bottom: 12px;">EVENT STORE:</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 16px; margin-bottom: 20px; overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; font-size: 10px; color: #c9d1d9;">
<tr style="border-bottom: 1px solid #30363d;">
<th style="text-align: left; padding: 6px; color: #58a6ff;">stream_id</th>
<th style="text-align: center; padding: 6px; color: #58a6ff;">version</th>
<th style="text-align: left; padding: 6px; color: #58a6ff;">event_type</th>
<th style="text-align: center; padding: 6px; color: #58a6ff;">ts</th>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 6px;">order-123</td>
<td style="text-align: center; padding: 6px;">1</td>
<td style="padding: 6px; color: #7ee787;">OrderCreated</td>
<td style="text-align: center; padding: 6px;">t1</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 6px;">order-123</td>
<td style="text-align: center; padding: 6px;">2</td>
<td style="padding: 6px; color: #58a6ff;">ItemAdded</td>
<td style="text-align: center; padding: 6px;">t2</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 6px;">order-123</td>
<td style="text-align: center; padding: 6px;">3</td>
<td style="padding: 6px; color: #8957e5;">PaymentReceived</td>
<td style="text-align: center; padding: 6px;">t3</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 6px;">order-123</td>
<td style="text-align: center; padding: 6px;">4</td>
<td style="padding: 6px; color: #f78166;">OrderShipped</td>
<td style="text-align: center; padding: 6px;">t4</td>
</tr>
</table>
<div style="margin-top: 12px; font-size: 10px; color: #8b949e;">
<strong style="color: #f85149;">Constraints:</strong> UNIQUE(stream_id, version) | Append-only (no updates/deletes)
</div>
</div>

<!-- Rebuilding State & Snapshots -->
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">REBUILDING STATE</div>
<div style="font-size: 10px; color: #c9d1d9;">
<div style="margin-bottom: 8px;"><span style="color: #7ee787;">1.</span> Load all events for entity</div>
<div style="margin-bottom: 8px;"><span style="color: #7ee787;">2.</span> Create empty aggregate</div>
<div style="margin-bottom: 8px;"><span style="color: #7ee787;">3.</span> Apply each event to build current state</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px; font-family: monospace; font-size: 9px; color: #8b949e; margin-top: 8px;">
for event in events:<br/>
&nbsp;&nbsp;order.Apply(event)
</div>
</div>

<div style="background: rgba(137,87,229,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #8957e5;">
<div style="color: #8957e5; font-weight: bold; font-size: 12px; margin-bottom: 8px;">SNAPSHOTS (Optimization)</div>
<div style="font-size: 10px; color: #c9d1d9; margin-bottom: 8px;">
<strong style="color: #f85149;">Problem:</strong> Rebuilding from 10K events is slow
</div>
<div style="font-size: 10px; color: #c9d1d9; margin-bottom: 8px;">
<strong style="color: #7ee787;">Solution:</strong> Periodically save snapshots
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px; font-size: 9px; color: #8b949e;">
[E1][E2]...[E100][<span style="color: #8957e5;">Snapshot@100</span>][E101]...[E150]
</div>
<div style="margin-top: 8px; font-size: 9px; color: #8b949e;">
Load snapshot v100, apply events 101-150
</div>
</div>
</div>
</div>

---

## CQRS Implementation

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">CQRS + EVENT SOURCING</h4>

<!-- Application Flow -->
<div style="text-align: center; margin-bottom: 16px;">
<div style="background: #6e7681; border-radius: 8px; padding: 12px 24px; display: inline-block; color: #fff; font-weight: bold; font-size: 12px;">APPLICATION</div>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 20px;">

<!-- Commands (Write) Side -->
<div>
<div style="text-align: center; color: #58a6ff; margin-bottom: 8px;">↓</div>
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #7ee787; margin-bottom: 12px;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 8px;">COMMANDS</div>
<div style="display: flex; flex-wrap: wrap; gap: 4px; font-size: 9px;">
<span style="background: rgba(126,231,135,0.2); padding: 2px 6px; border-radius: 4px; color: #7ee787;">CreateOrder</span>
<span style="background: rgba(126,231,135,0.2); padding: 2px 6px; border-radius: 4px; color: #7ee787;">AddItem</span>
<span style="background: rgba(126,231,135,0.2); padding: 2px 6px; border-radius: 4px; color: #7ee787;">ProcessPayment</span>
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin-bottom: 8px;">↓</div>
<div style="background: rgba(247,129,102,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #f78166; margin-bottom: 12px;">
<div style="color: #f78166; font-weight: bold; font-size: 12px; margin-bottom: 8px;">WRITE MODEL</div>
<div style="font-size: 10px; color: #c9d1d9;">
<div>- Event Store</div>
<div>- Domain Logic</div>
<div>- Aggregates</div>
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin-bottom: 8px;">↓</div>
<div style="background: #1f6feb; border-radius: 8px; padding: 12px; text-align: center; color: #fff; font-size: 10px;">
<strong>PostgreSQL</strong><br/>(Event Store)
</div>
</div>

<!-- Queries (Read) Side -->
<div>
<div style="text-align: center; color: #58a6ff; margin-bottom: 8px;">↓</div>
<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #58a6ff; margin-bottom: 12px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">QUERIES</div>
<div style="display: flex; flex-wrap: wrap; gap: 4px; font-size: 9px;">
<span style="background: rgba(88,166,255,0.2); padding: 2px 6px; border-radius: 4px; color: #58a6ff;">GetOrder</span>
<span style="background: rgba(88,166,255,0.2); padding: 2px 6px; border-radius: 4px; color: #58a6ff;">ListOrders</span>
<span style="background: rgba(88,166,255,0.2); padding: 2px 6px; border-radius: 4px; color: #58a6ff;">GetAnalytics</span>
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin-bottom: 8px;">↓</div>
<div style="background: rgba(137,87,229,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #8957e5; margin-bottom: 12px;">
<div style="color: #8957e5; font-weight: bold; font-size: 12px; margin-bottom: 8px;">READ MODEL</div>
<div style="font-size: 10px; color: #c9d1d9;">
<div>- Materialized Views</div>
<div>- Optimized for queries</div>
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin-bottom: 8px;">↓</div>
<div style="display: flex; gap: 8px;">
<div style="background: #238636; border-radius: 8px; padding: 12px; text-align: center; color: #fff; font-size: 10px; flex: 1;">
<strong>Elasticsearch</strong><br/>(Search)
</div>
<div style="background: #da3633; border-radius: 8px; padding: 12px; text-align: center; color: #fff; font-size: 10px; flex: 1;">
<strong>Redis</strong><br/>(Analytics)
</div>
</div>
</div>

</div>

<!-- Events Flow -->
<div style="text-align: center; margin-bottom: 16px;">
<div style="background: rgba(247,129,102,0.2); border-radius: 20px; padding: 8px 24px; display: inline-block; color: #f78166; font-size: 11px;">
<strong>Events</strong> flow from Write Model → Read Model
</div>
</div>

<!-- Projection Example -->
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 16px;">
<div style="color: #7ee787; font-weight: bold; font-size: 11px; margin-bottom: 8px;">PROJECTION EXAMPLE:</div>
<div style="font-family: monospace; font-size: 9px; color: #c9d1d9;">
<div><span style="color: #8957e5;">case</span> <span style="color: #7ee787;">OrderCreated</span>: INSERT INTO order_list...</div>
<div><span style="color: #8957e5;">case</span> <span style="color: #58a6ff;">ItemAdded</span>: UPDATE order_list SET total += price</div>
<div><span style="color: #8957e5;">case</span> <span style="color: #f78166;">OrderShipped</span>: UPDATE order_list SET status = 'SHIPPED'</div>
</div>
</div>
</div>

---

## Schema Management

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">SCHEMA EVOLUTION</h4>

<!-- Schema Registry Flow -->
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">SCHEMA REGISTRY:</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
<div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
<div style="background: #1f6feb; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px; font-weight: bold;">Producer</div>
<div style="color: #58a6ff;">→</div>
<div style="background: #8957e5; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px; font-weight: bold;">Schema Registry</div>
<div style="color: #58a6ff;">→</div>
<div style="background: #f78166; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px; font-weight: bold;">Kafka</div>
<div style="color: #58a6ff;">→</div>
<div style="background: #238636; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px; font-weight: bold;">Consumer</div>
</div>
<div style="font-size: 10px; color: #8b949e; text-align: center;">
<span style="color: #7ee787;">1.</span> Register schema <span style="color: #7ee787;">2.</span> Get schema ID <span style="color: #7ee787;">3.</span> Send (id + data) <span style="color: #7ee787;">4.</span> Lookup <span style="color: #7ee787;">5.</span> Deserialize
</div>
<div style="margin-top: 12px; display: flex; flex-wrap: wrap; gap: 4px; justify-content: center;">
<span style="background: rgba(137,87,229,0.2); color: #a371f7; padding: 2px 8px; border-radius: 4px; font-size: 9px;">Confluent</span>
<span style="background: rgba(137,87,229,0.2); color: #a371f7; padding: 2px 8px; border-radius: 4px; font-size: 9px;">AWS Glue</span>
<span style="background: rgba(137,87,229,0.2); color: #a371f7; padding: 2px 8px; border-radius: 4px; font-size: 9px;">Karapace</span>
</div>
</div>

<!-- Compatibility Modes -->
<div style="color: #f78166; font-weight: bold; font-size: 12px; margin-bottom: 12px;">COMPATIBILITY MODES:</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;">
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 12px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 11px; margin-bottom: 8px;">BACKWARD (Recommended)</div>
<div style="font-size: 9px; color: #c9d1d9;">
<div>New schema reads old data</div>
<div>Deploy consumers first</div>
<div style="color: #7ee787; margin-top: 4px;">+ Add optional fields</div>
<div style="color: #f85149;">- Cannot add required</div>
</div>
</div>
<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 12px; border-left: 3px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 8px;">FORWARD</div>
<div style="font-size: 9px; color: #c9d1d9;">
<div>Old schema reads new data</div>
<div>Deploy producers first</div>
<div style="color: #7ee787; margin-top: 4px;">+ Add fields</div>
<div style="color: #f85149;">- Cannot remove required</div>
</div>
</div>
<div style="background: rgba(137,87,229,0.1); border-radius: 12px; padding: 12px; border-left: 3px solid #8957e5;">
<div style="color: #8957e5; font-weight: bold; font-size: 11px; margin-bottom: 8px;">FULL</div>
<div style="font-size: 9px; color: #c9d1d9;">
<div>Both directions compatible</div>
<div>Safest but restrictive</div>
<div style="color: #7ee787; margin-top: 4px;">+ Optional fields w/ defaults</div>
</div>
</div>
</div>

<!-- Avro Schema Example -->
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 12px;">AVRO SCHEMA EXAMPLE:</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #8b949e; font-size: 10px; margin-bottom: 8px;">Version 1</div>
<div style="font-family: monospace; font-size: 9px; color: #c9d1d9;">
{ <span style="color: #7ee787;">"fields"</span>: [<br/>
&nbsp;&nbsp;{<span style="color: #a5d6ff;">"order_id"</span>: <span style="color: #58a6ff;">string</span>},<br/>
&nbsp;&nbsp;{<span style="color: #a5d6ff;">"customer_id"</span>: <span style="color: #58a6ff;">string</span>},<br/>
&nbsp;&nbsp;{<span style="color: #a5d6ff;">"total"</span>: <span style="color: #58a6ff;">double</span>}<br/>
]}
</div>
</div>
<div style="background: rgba(126,231,135,0.1); border-radius: 8px; padding: 12px;">
<div style="color: #7ee787; font-size: 10px; margin-bottom: 8px;">Version 2 (backward compatible)</div>
<div style="font-family: monospace; font-size: 9px; color: #c9d1d9;">
{ <span style="color: #7ee787;">"fields"</span>: [<br/>
&nbsp;&nbsp;... <span style="color: #8b949e;">(same as v1)</span><br/>
&nbsp;&nbsp;{<span style="color: #a5d6ff;">"currency"</span>: <span style="color: #58a6ff;">string</span>,<br/>
&nbsp;&nbsp;&nbsp;<span style="color: #f78166;">"default"</span>: <span style="color: #a5d6ff;">"USD"</span>}<br/>
]}
</div>
</div>
</div>
</div>

---

## Observability

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">EDA OBSERVABILITY</h4>

<!-- Key Metrics -->
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">KEY METRICS:</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;">
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 12px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 11px; margin-bottom: 8px;">PRODUCER</div>
<div style="font-size: 9px; color: #c9d1d9;">
<div>- Events published/sec</div>
<div>- Publish latency (p50, p95, p99)</div>
<div>- Publish failures</div>
<div>- Batch size</div>
</div>
</div>
<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 12px; border-left: 3px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 8px;">CONSUMER</div>
<div style="font-size: 9px; color: #c9d1d9;">
<div>- Events consumed/sec</div>
<div>- Processing latency</div>
<div style="color: #f85149; font-weight: bold;">- Consumer lag (CRITICAL!)</div>
<div>- Processing failures</div>
<div>- DLQ size</div>
</div>
</div>
<div style="background: rgba(247,129,102,0.1); border-radius: 12px; padding: 12px; border-left: 3px solid #f78166;">
<div style="color: #f78166; font-weight: bold; font-size: 11px; margin-bottom: 8px;">BROKER</div>
<div style="font-size: 9px; color: #c9d1d9;">
<div>- Messages in/out per topic</div>
<div>- Disk usage</div>
<div>- Replication lag</div>
<div>- Under-replicated partitions</div>
</div>
</div>
</div>

<!-- Distributed Tracing -->
<div style="color: #8957e5; font-weight: bold; font-size: 12px; margin-bottom: 12px;">DISTRIBUTED TRACING:</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #7ee787; font-size: 10px; margin-bottom: 8px;">Producer: Include trace context</div>
<div style="font-family: monospace; font-size: 9px; color: #c9d1d9;">
event := Event{<br/>
&nbsp;&nbsp;TraceID: span.TraceID(),<br/>
&nbsp;&nbsp;SpanID: span.SpanID(),<br/>
&nbsp;&nbsp;CorrelationID: ctx.Value(...)<br/>
}
</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #58a6ff; font-size: 10px; margin-bottom: 8px;">Consumer: Continue trace</div>
<div style="font-family: monospace; font-size: 9px; color: #c9d1d9;">
parentCtx := trace.Context...<br/>
ctx, span := tracer.Start(<br/>
&nbsp;&nbsp;parentCtx, "process-event"<br/>
)
</div>
</div>
</div>

<!-- Alerting -->
<div style="color: #f85149; font-weight: bold; font-size: 12px; margin-bottom: 12px;">ALERTING:</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
<div style="background: rgba(248,81,73,0.1); border-radius: 12px; padding: 12px; border-left: 3px solid #f85149;">
<div style="color: #f85149; font-weight: bold; font-size: 11px; margin-bottom: 8px;">CRITICAL</div>
<div style="font-size: 9px; color: #c9d1d9;">
<div>- Consumer lag > 10,000 messages</div>
<div>- DLQ messages > 0</div>
<div>- Under-replicated partitions > 0</div>
</div>
</div>
<div style="background: rgba(240,136,62,0.1); border-radius: 12px; padding: 12px; border-left: 3px solid #f0883e;">
<div style="color: #f0883e; font-weight: bold; font-size: 11px; margin-bottom: 8px;">WARNING</div>
<div style="font-size: 9px; color: #c9d1d9;">
<div>- Consumer lag growing</div>
<div>- Processing latency > SLA</div>
<div>- Disk usage > 80%</div>
</div>
</div>
</div>
</div>

---

## Production Considerations

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">PRODUCTION CHECKLIST</h4>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">

<!-- Message Durability -->
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 11px; margin-bottom: 12px;">MESSAGE DURABILITY</div>
<div style="font-size: 9px; color: #c9d1d9;">
<div style="margin-bottom: 4px;">[ ] Replication factor >= 3</div>
<div style="margin-bottom: 4px;">[ ] min.insync.replicas >= 2</div>
<div style="margin-bottom: 4px;">[ ] acks = all (producer)</div>
<div>[ ] Retention 7+ days for critical</div>
</div>
</div>

<!-- Consumer Reliability -->
<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 12px;">CONSUMER RELIABILITY</div>
<div style="font-size: 9px; color: #c9d1d9;">
<div style="margin-bottom: 4px;">[ ] Idempotent processing</div>
<div style="margin-bottom: 4px;">[ ] Dead letter queue</div>
<div style="margin-bottom: 4px;">[ ] Retry with backoff</div>
<div style="margin-bottom: 4px;">[ ] Circuit breaker</div>
<div>[ ] Consumer lag alerting</div>
</div>
</div>

<!-- Schema Management -->
<div style="background: rgba(137,87,229,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #8957e5;">
<div style="color: #8957e5; font-weight: bold; font-size: 11px; margin-bottom: 12px;">SCHEMA MANAGEMENT</div>
<div style="font-size: 9px; color: #c9d1d9;">
<div style="margin-bottom: 4px;">[ ] Schema registry deployed</div>
<div style="margin-bottom: 4px;">[ ] Compatibility configured</div>
<div>[ ] Schema validation in CI/CD</div>
</div>
</div>

<!-- Observability -->
<div style="background: rgba(247,129,102,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #f78166;">
<div style="color: #f78166; font-weight: bold; font-size: 11px; margin-bottom: 12px;">OBSERVABILITY</div>
<div style="font-size: 9px; color: #c9d1d9;">
<div style="margin-bottom: 4px;">[ ] Metrics (Prometheus/Datadog)</div>
<div style="margin-bottom: 4px;">[ ] Tracing (Jaeger/Zipkin)</div>
<div style="margin-bottom: 4px;">[ ] Centralized logging</div>
<div style="margin-bottom: 4px;">[ ] Dashboards</div>
<div>[ ] Alerting configured</div>
</div>
</div>

<!-- Security -->
<div style="background: rgba(248,81,73,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #f85149;">
<div style="color: #f85149; font-weight: bold; font-size: 11px; margin-bottom: 12px;">SECURITY</div>
<div style="font-size: 9px; color: #c9d1d9;">
<div style="margin-bottom: 4px;">[ ] TLS for broker connections</div>
<div style="margin-bottom: 4px;">[ ] Authentication (SASL)</div>
<div style="margin-bottom: 4px;">[ ] Authorization (ACLs)</div>
<div>[ ] Encryption at rest</div>
</div>
</div>

<!-- Operations -->
<div style="background: rgba(210,153,34,0.1); border-radius: 12px; padding: 16px; border-left: 3px solid #d29922;">
<div style="color: #d29922; font-weight: bold; font-size: 11px; margin-bottom: 12px;">OPERATIONS</div>
<div style="font-size: 9px; color: #c9d1d9;">
<div style="margin-bottom: 4px;">[ ] Runbooks for common issues</div>
<div style="margin-bottom: 4px;">[ ] Capacity planning</div>
<div style="margin-bottom: 4px;">[ ] Disaster recovery plan</div>
<div>[ ] Replay procedures</div>
</div>
</div>

</div>
</div>

---

## Key Takeaways

1. **Events are first-class citizens** - Design events carefully, they are your API
2. **Idempotency is non-negotiable** - Events will be delivered multiple times
3. **Schema evolution matters** - Plan for backward compatibility from day one
4. **Monitor consumer lag** - It's your early warning system
5. **Event sourcing is powerful but complex** - Use only when audit trail is critical
6. **CQRS enables scale** - But adds eventual consistency complexity
7. **Dead letter queues save lives** - Never lose events, investigate failures later
