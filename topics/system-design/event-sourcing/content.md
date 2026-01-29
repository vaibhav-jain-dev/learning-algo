# Event Sourcing

## Overview

<span style="color:#10b981">**Event Sourcing**</span> is an architectural pattern where you store all changes to application state as a sequence of <span style="color:#10b981">**immutable events**</span>, rather than storing just the current state. Think of it like a bank statement - instead of just showing your current balance, it shows every transaction that led to that balance.

When you need the current state, you <span style="color:#10b981">**replay all events**</span> from the beginning (or from a snapshot) to reconstruct it. This gives you a complete audit trail and the ability to understand exactly how you got to any particular state.

<div style="background: linear-gradient(135deg, #0f766e 0%, #065f46 100%); border-radius: 12px; padding: 24px; margin: 20px 0; color: white;">
  <h4 style="margin-top: 0; color: white;">Core Principle</h4>
  <div style="font-size: 18px; font-weight: 500;">
    "Don't store state. Store the facts that led to that state."
  </div>
  <div style="margin-top: 12px; opacity: 0.9;">
    Events are immutable historical facts. The current state is a left-fold over the event stream.
  </div>
</div>

---

## Why This Matters

### Real Company Examples

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Companies Using Event Sourcing</h4>
  <div style="display: grid; gap: 16px;">
    <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #3b82f6;">
      <div style="color: #1e293b; font-weight: 600;">Netflix - Viewing History</div>
      <div style="color: #475569; font-size: 14px; margin-top: 8px;">Netflix stores every play, pause, seek, and completion event. This enables "Continue Watching" features, personalized recommendations, and analytics on viewing patterns across millions of users.</div>
    </div>
    <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #10b981;">
      <div style="color: #1e293b; font-weight: 600;">Stripe - Payment Processing</div>
      <div style="color: #475569; font-size: 14px; margin-top: 8px;">Every payment state change is an event: created, authorized, captured, refunded. This provides complete audit trails for financial compliance and enables rebuilding payment states for dispute resolution.</div>
    </div>
    <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
      <div style="color: #1e293b; font-weight: 600;">LinkedIn - Activity Feed</div>
      <div style="color: #475569; font-size: 14px; margin-top: 8px;">Posts, likes, comments, and shares are all events. This enables building multiple views (feed, notifications, analytics) from the same event stream without duplicating business logic.</div>
    </div>
    <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #8b5cf6;">
      <div style="color: #1e293b; font-weight: 600;">LMAX Exchange - Financial Trading</div>
      <div style="color: #475569; font-size: 14px; margin-top: 8px;">Processes 6 million transactions/second with sub-millisecond latency using event sourcing. Complete audit trail built-in, with ability to replay any trading day for debugging or compliance.</div>
    </div>
  </div>
</div>

**Key Benefits:**
- <span style="color:#10b981">**Complete audit trail**</span>: Every change is recorded with timestamp and context
- <span style="color:#10b981">**Temporal queries**</span>: Answer "what was the state at time X?"
- <span style="color:#10b981">**Debugging**</span>: Replay events to reproduce bugs exactly
- <span style="color:#10b981">**Flexibility**</span>: Build new read models from existing events
- <span style="color:#10b981">**Compliance**</span>: Financial and healthcare regulations often require event history

---

## Core Concepts Deep Dive

### The Event Store

The <span style="color:#10b981">**Event Store**</span> is the heart of an event-sourced system - an append-only log that stores all events in the order they occurred.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Event Store Architecture</h4>

  <div style="display: flex; flex-direction: column; gap: 4px; margin: 20px 0;">
    <div style="background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 20px; border-radius: 8px 8px 0 0; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-weight: 600;">Event Stream: order-12345</div>
        <div style="font-size: 12px; opacity: 0.9;">Aggregate ID identifies the stream</div>
      </div>
      <div style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 4px; font-size: 12px;">
        Append-Only
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 80px 1fr 100px 140px; background: #1e293b; color: white; padding: 10px 16px; font-size: 12px; font-weight: 600;">
      <div>Version</div>
      <div>Event Type</div>
      <div>Timestamp</div>
      <div>Data (JSON)</div>
    </div>

    <div style="display: grid; grid-template-columns: 80px 1fr 100px 140px; background: #ecfdf5; padding: 10px 16px; font-size: 13px; border-left: 4px solid #10b981;">
      <div style="color: #065f46; font-weight: 600;">1</div>
      <div style="color: #047857;">OrderCreated</div>
      <div style="color: #6b7280;">10:00:01</div>
      <div style="color: #374151; font-family: monospace; font-size: 11px;">{customer: "C1"}</div>
    </div>

    <div style="display: grid; grid-template-columns: 80px 1fr 100px 140px; background: #f0fdf4; padding: 10px 16px; font-size: 13px; border-left: 4px solid #22c55e;">
      <div style="color: #065f46; font-weight: 600;">2</div>
      <div style="color: #047857;">ItemAdded</div>
      <div style="color: #6b7280;">10:00:05</div>
      <div style="color: #374151; font-family: monospace; font-size: 11px;">{sku: "ABC", qty: 2}</div>
    </div>

    <div style="display: grid; grid-template-columns: 80px 1fr 100px 140px; background: #ecfdf5; padding: 10px 16px; font-size: 13px; border-left: 4px solid #10b981;">
      <div style="color: #065f46; font-weight: 600;">3</div>
      <div style="color: #047857;">ItemAdded</div>
      <div style="color: #6b7280;">10:00:12</div>
      <div style="color: #374151; font-family: monospace; font-size: 11px;">{sku: "XYZ", qty: 1}</div>
    </div>

    <div style="display: grid; grid-template-columns: 80px 1fr 100px 140px; background: #f0fdf4; padding: 10px 16px; font-size: 13px; border-left: 4px solid #22c55e;">
      <div style="color: #065f46; font-weight: 600;">4</div>
      <div style="color: #047857;">OrderSubmitted</div>
      <div style="color: #6b7280;">10:00:30</div>
      <div style="color: #374151; font-family: monospace; font-size: 11px;">{total: 150.00}</div>
    </div>

    <div style="display: grid; grid-template-columns: 80px 1fr 100px 140px; background: #fef3c7; padding: 10px 16px; font-size: 13px; border-left: 4px solid #f59e0b; border-radius: 0 0 8px 8px;">
      <div style="color: #92400e; font-weight: 600;">5</div>
      <div style="color: #b45309;">PaymentReceived</div>
      <div style="color: #6b7280;">10:01:15</div>
      <div style="color: #374151; font-family: monospace; font-size: 11px;">{amount: 150.00}</div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 20px;">
    <div style="background: #eff6ff; border-radius: 8px; padding: 16px; text-align: center;">
      <div style="font-size: 24px; font-weight: 700; color: #1d4ed8;">Immutable</div>
      <div style="font-size: 13px; color: #3b82f6; margin-top: 4px;">Events never change once written</div>
    </div>
    <div style="background: #f0fdf4; border-radius: 8px; padding: 16px; text-align: center;">
      <div style="font-size: 24px; font-weight: 700; color: #15803d;">Ordered</div>
      <div style="font-size: 13px; color: #22c55e; margin-top: 4px;">Version number ensures ordering</div>
    </div>
    <div style="background: #fef3c7; border-radius: 8px; padding: 16px; text-align: center;">
      <div style="font-size: 24px; font-weight: 700; color: #b45309;">Complete</div>
      <div style="font-size: 13px; color: #f59e0b; margin-top: 4px;">Full history preserved forever</div>
    </div>
  </div>
</div>

**Event Store Key Properties:**

| Property | Description | Why It Matters |
|----------|-------------|----------------|
| <span style="color:#10b981">**Append-only**</span> | Events can only be added, never modified or deleted | Guarantees audit integrity, simplifies concurrency |
| <span style="color:#10b981">**Optimistic Concurrency**</span> | Version check on write prevents conflicts | Multiple writers can't corrupt stream |
| <span style="color:#10b981">**Partitioned by Aggregate**</span> | Each aggregate has its own event stream | Enables parallel processing, isolation |
| <span style="color:#10b981">**Global Ordering**</span> | Global sequence number across all streams | Enables consistent projections |

---

### Snapshots

<span style="color:#10b981">**Snapshots**</span> are periodic saves of aggregate state that optimize event replay performance.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Snapshot Strategy</h4>

  <div style="display: flex; align-items: stretch; gap: 4px; margin: 20px 0;">
    <div style="flex: 1; display: flex; flex-direction: column;">
      <div style="background: #fee2e2; padding: 12px; border-radius: 8px 0 0 0; text-align: center; font-size: 13px; color: #991b1b; font-weight: 600;">Without Snapshots</div>
      <div style="background: #fef2f2; padding: 16px; border-radius: 0 0 0 8px; flex: 1;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <div style="background: #fca5a5; padding: 6px 10px; border-radius: 4px; font-size: 11px; color: #7f1d1d;">Event 1</div>
          <div style="background: #fca5a5; padding: 6px 10px; border-radius: 4px; font-size: 11px; color: #7f1d1d;">Event 2</div>
          <div style="background: #fca5a5; padding: 6px 10px; border-radius: 4px; font-size: 11px; color: #7f1d1d;">...</div>
          <div style="background: #fca5a5; padding: 6px 10px; border-radius: 4px; font-size: 11px; color: #7f1d1d;">Event 999</div>
          <div style="background: #fca5a5; padding: 6px 10px; border-radius: 4px; font-size: 11px; color: #7f1d1d;">Event 1000</div>
        </div>
        <div style="margin-top: 12px; padding: 8px; background: #fee2e2; border-radius: 4px; text-align: center;">
          <div style="font-size: 12px; color: #991b1b; font-weight: 600;">Replay ALL 1000 events</div>
          <div style="font-size: 11px; color: #b91c1c;">Slow startup time</div>
        </div>
      </div>
    </div>

    <div style="display: flex; align-items: center; padding: 0 8px; color: #64748b; font-size: 20px;">vs</div>

    <div style="flex: 1; display: flex; flex-direction: column;">
      <div style="background: #d1fae5; padding: 12px; border-radius: 0 8px 0 0; text-align: center; font-size: 13px; color: #065f46; font-weight: 600;">With Snapshots</div>
      <div style="background: #ecfdf5; padding: 16px; border-radius: 0 0 8px 0; flex: 1;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <div style="background: #86efac; padding: 10px; border-radius: 4px; text-align: center; border: 2px solid #22c55e;">
            <div style="font-size: 12px; color: #065f46; font-weight: 600;">Snapshot @ v900</div>
            <div style="font-size: 10px; color: #047857;">Full state saved</div>
          </div>
          <div style="color: #6b7280; text-align: center; font-size: 11px;">load</div>
          <div style="background: #bbf7d0; padding: 6px 10px; border-radius: 4px; font-size: 11px; color: #166534;">Event 901</div>
          <div style="background: #bbf7d0; padding: 6px 10px; border-radius: 4px; font-size: 11px; color: #166534;">...</div>
          <div style="background: #bbf7d0; padding: 6px 10px; border-radius: 4px; font-size: 11px; color: #166534;">Event 1000</div>
        </div>
        <div style="margin-top: 12px; padding: 8px; background: #d1fae5; border-radius: 4px; text-align: center;">
          <div style="font-size: 12px; color: #065f46; font-weight: 600;">Replay only 100 events</div>
          <div style="font-size: 11px; color: #047857;">10x faster startup</div>
        </div>
      </div>
    </div>
  </div>
</div>

**Snapshot Strategies:**

| Strategy | When to Snapshot | Trade-offs |
|----------|------------------|------------|
| <span style="color:#10b981">**Count-based**</span> | Every N events (e.g., 100) | Simple, predictable |
| <span style="color:#10b981">**Time-based**</span> | Every N minutes/hours | Consistent timing |
| <span style="color:#10b981">**On-demand**</span> | When replay takes too long | Adaptive, efficient |
| <span style="color:#10b981">**Background**</span> | Async process creates snapshots | No write path impact |

---

### Projections

<span style="color:#10b981">**Projections**</span> transform the event stream into read-optimized views (also called <span style="color:#10b981">**read models**</span>).

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Multiple Projections from Single Event Stream</h4>

  <div style="display: flex; flex-direction: column; gap: 20px; margin: 20px 0;">
    <!-- Event Stream -->
    <div style="background: linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 16px 24px; border-radius: 12px; text-align: center;">
      <div style="font-weight: 600; font-size: 16px;">Event Stream</div>
      <div style="font-size: 13px; opacity: 0.9; margin-top: 4px;">OrderCreated, ItemAdded, PaymentReceived, OrderShipped...</div>
    </div>

    <!-- Arrows -->
    <div style="display: flex; justify-content: space-around; color: #8b5cf6;">
      <div style="text-align: center;">
        <div style="font-size: 24px;">|</div>
        <div style="font-size: 20px;">V</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 24px;">|</div>
        <div style="font-size: 20px;">V</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 24px;">|</div>
        <div style="font-size: 20px;">V</div>
      </div>
    </div>

    <!-- Projections -->
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
      <div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 16px;">
        <div style="color: #1d4ed8; font-weight: 600; margin-bottom: 8px;">Order Summary</div>
        <div style="background: white; border-radius: 6px; padding: 10px; font-family: monospace; font-size: 11px; color: #475569;">
          {<br>
          &nbsp;&nbsp;orderId: "123",<br>
          &nbsp;&nbsp;status: "shipped",<br>
          &nbsp;&nbsp;total: $150<br>
          }
        </div>
        <div style="margin-top: 8px; font-size: 12px; color: #3b82f6;">Optimized for: Order details page</div>
      </div>

      <div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 16px;">
        <div style="color: #15803d; font-weight: 600; margin-bottom: 8px;">Customer Orders</div>
        <div style="background: white; border-radius: 6px; padding: 10px; font-family: monospace; font-size: 11px; color: #475569;">
          {<br>
          &nbsp;&nbsp;customerId: "C1",<br>
          &nbsp;&nbsp;orders: [123, 456],<br>
          &nbsp;&nbsp;totalSpent: $500<br>
          }
        </div>
        <div style="margin-top: 8px; font-size: 12px; color: #22c55e;">Optimized for: Customer dashboard</div>
      </div>

      <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 16px;">
        <div style="color: #b45309; font-weight: 600; margin-bottom: 8px;">Sales Analytics</div>
        <div style="background: white; border-radius: 6px; padding: 10px; font-family: monospace; font-size: 11px; color: #475569;">
          {<br>
          &nbsp;&nbsp;date: "2024-01",<br>
          &nbsp;&nbsp;revenue: $50K,<br>
          &nbsp;&nbsp;orderCount: 340<br>
          }
        </div>
        <div style="margin-top: 8px; font-size: 12px; color: #f59e0b;">Optimized for: Reports</div>
      </div>
    </div>
  </div>

  <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin-top: 16px;">
    <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Projection Characteristics</div>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 13px; color: #475569;">
      <div>Derived from events (can rebuild anytime)</div>
      <div>Eventually consistent with event store</div>
      <div>Optimized for specific query patterns</div>
      <div>Can use different storage technologies</div>
    </div>
  </div>
</div>

**Projection Types:**

| Type | Description | Use Case |
|------|-------------|----------|
| <span style="color:#10b981">**Live Projection**</span> | Updated in real-time as events occur | User-facing queries |
| <span style="color:#10b981">**Catch-up Projection**</span> | Periodically catches up with event stream | Batch analytics |
| <span style="color:#10b981">**One-time Projection**</span> | Built once for specific analysis | Ad-hoc reports |

---

### CQRS Integration

<span style="color:#10b981">**CQRS (Command Query Responsibility Segregation)**</span> separates read and write operations into different models. Event Sourcing and CQRS are natural partners - see [[CQRS Pattern]](/topic/design-patterns/cqrs) for detailed coverage.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Event Sourcing + CQRS Architecture</h4>

  <div style="display: flex; flex-direction: column; gap: 16px; margin: 20px 0;">
    <!-- Top Row: Commands and Queries -->
    <div style="display: grid; grid-template-columns: 1fr 80px 1fr; gap: 16px;">
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 20px; border-radius: 12px; text-align: center;">
        <div style="font-weight: 700; font-size: 18px;">Commands</div>
        <div style="font-size: 13px; opacity: 0.9; margin-top: 8px;">PlaceOrder, AddItem, CancelOrder</div>
        <div style="margin-top: 12px; background: rgba(255,255,255,0.2); padding: 8px; border-radius: 6px; font-size: 12px;">
          Write Path
        </div>
      </div>
      <div></div>
      <div style="background: linear-gradient(135deg, #22c55e 0%, #15803d 100%); color: white; padding: 20px; border-radius: 12px; text-align: center;">
        <div style="font-weight: 700; font-size: 18px;">Queries</div>
        <div style="font-size: 13px; opacity: 0.9; margin-top: 8px;">GetOrder, ListOrders, GetAnalytics</div>
        <div style="margin-top: 12px; background: rgba(255,255,255,0.2); padding: 8px; border-radius: 6px; font-size: 12px;">
          Read Path
        </div>
      </div>
    </div>

    <!-- Arrows -->
    <div style="display: grid; grid-template-columns: 1fr 80px 1fr; gap: 16px; text-align: center; color: #64748b;">
      <div style="font-size: 20px;">|<br>V</div>
      <div></div>
      <div style="font-size: 20px;">^<br>|</div>
    </div>

    <!-- Middle: Domain + Projections -->
    <div style="display: grid; grid-template-columns: 1fr 80px 1fr; gap: 16px;">
      <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 16px; border-radius: 12px; text-align: center;">
        <div style="color: #b45309; font-weight: 600;">Domain / Aggregates</div>
        <div style="font-size: 12px; color: #92400e; margin-top: 4px;">Business logic, validation</div>
      </div>
      <div></div>
      <div style="background: #dbeafe; border: 2px solid #3b82f6; padding: 16px; border-radius: 12px; text-align: center;">
        <div style="color: #1d4ed8; font-weight: 600;">Projections / Read Models</div>
        <div style="font-size: 12px; color: #2563eb; margin-top: 4px;">Denormalized, query-optimized</div>
      </div>
    </div>

    <!-- Arrows -->
    <div style="display: grid; grid-template-columns: 1fr 80px 1fr; gap: 16px; text-align: center; color: #64748b;">
      <div style="font-size: 20px;">|<br>V</div>
      <div style="font-size: 20px;"><br>----></div>
      <div style="font-size: 20px;">^<br>|</div>
    </div>

    <!-- Event Store -->
    <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 20px; border-radius: 12px; text-align: center;">
      <div style="font-weight: 700; font-size: 18px;">Event Store</div>
      <div style="font-size: 13px; opacity: 0.9; margin-top: 8px;">Append-only log of all domain events</div>
      <div style="display: flex; justify-content: center; gap: 16px; margin-top: 12px;">
        <div style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 4px; font-size: 12px;">Source of Truth</div>
        <div style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 4px; font-size: 12px;">Publishes Events</div>
      </div>
    </div>
  </div>
</div>

**Why Combine Event Sourcing with CQRS?**

| Benefit | Explanation |
|---------|-------------|
| <span style="color:#10b981">**Independent Scaling**</span> | Scale read and write sides separately based on load |
| <span style="color:#10b981">**Optimized Models**</span> | Write model for consistency, read models for queries |
| <span style="color:#10b981">**Multiple Views**</span> | Create any number of projections from same events |
| <span style="color:#10b981">**Simpler Code**</span> | Each side focused on single responsibility |

---

### Event Versioning

<span style="color:#10b981">**Event Versioning**</span> handles schema evolution when event structures need to change over time.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Event Schema Evolution Strategies</h4>

  <div style="display: grid; gap: 16px; margin: 20px 0;">
    <!-- Upcasting -->
    <div style="background: #ecfdf5; border-radius: 12px; padding: 20px; border-left: 4px solid #10b981;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <div style="color: #065f46; font-weight: 700; font-size: 16px;">1. Upcasting (Recommended)</div>
        <div style="background: #d1fae5; color: #065f46; padding: 4px 12px; border-radius: 20px; font-size: 12px;">Best Practice</div>
      </div>
      <div style="color: #047857; font-size: 14px; margin-bottom: 12px;">Transform old events to new schema on-the-fly during read</div>
      <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
        <div style="background: white; border: 1px solid #d1fae5; border-radius: 6px; padding: 10px; font-family: monospace; font-size: 11px;">
          <div style="color: #6b7280; font-size: 10px; margin-bottom: 4px;">V1 (stored)</div>
          {name: "Alice"}
        </div>
        <div style="color: #10b981; font-size: 20px;">-></div>
        <div style="background: white; border: 1px solid #d1fae5; border-radius: 6px; padding: 10px; font-family: monospace; font-size: 11px;">
          <div style="color: #6b7280; font-size: 10px; margin-bottom: 4px;">V2 (upcasted)</div>
          {owner: "Alice"}
        </div>
        <div style="color: #10b981; font-size: 20px;">-></div>
        <div style="background: white; border: 1px solid #d1fae5; border-radius: 6px; padding: 10px; font-family: monospace; font-size: 11px;">
          <div style="color: #6b7280; font-size: 10px; margin-bottom: 4px;">V3 (upcasted)</div>
          {owner: "Alice", currency: "USD"}
        </div>
      </div>
    </div>

    <!-- Weak Schema -->
    <div style="background: #eff6ff; border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6;">
      <div style="color: #1d4ed8; font-weight: 700; font-size: 16px; margin-bottom: 8px;">2. Weak Schema / Optional Fields</div>
      <div style="color: #2563eb; font-size: 14px; margin-bottom: 12px;">Design events with optional fields, use defaults for missing data</div>
      <div style="background: white; border: 1px solid #dbeafe; border-radius: 6px; padding: 10px; font-family: monospace; font-size: 12px; color: #475569;">
        event.data.get("currency", "USD")  # Default if not present
      </div>
    </div>

    <!-- New Event Type -->
    <div style="background: #fef3c7; border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b;">
      <div style="color: #b45309; font-weight: 700; font-size: 16px; margin-bottom: 8px;">3. New Event Type</div>
      <div style="color: #92400e; font-size: 14px; margin-bottom: 12px;">Create new event type for breaking changes, handle both in projections</div>
      <div style="display: flex; gap: 12px;">
        <div style="background: white; border: 1px solid #fde68a; border-radius: 6px; padding: 10px; font-family: monospace; font-size: 11px;">OrderPlacedV1</div>
        <div style="background: white; border: 1px solid #fde68a; border-radius: 6px; padding: 10px; font-family: monospace; font-size: 11px;">OrderPlacedV2</div>
      </div>
    </div>
  </div>

  <div style="background: #fef2f2; border-radius: 8px; padding: 16px; margin-top: 16px;">
    <div style="color: #991b1b; font-weight: 600; margin-bottom: 8px;">Golden Rule: Never Modify Stored Events</div>
    <div style="color: #7f1d1d; font-size: 14px;">Events are immutable historical facts. Transform on read, never on write.</div>
  </div>
</div>

---

### Replay Strategies

<span style="color:#10b981">**Event Replay**</span> is the process of re-processing events to rebuild state or projections.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Replay Strategies Comparison</h4>

  <div style="display: grid; gap: 16px; margin: 20px 0;">
    <!-- Full Replay -->
    <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: #3b82f6; color: white; padding: 12px 20px; font-weight: 600;">
        Full Replay
      </div>
      <div style="padding: 16px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <div style="font-size: 13px; color: #1e293b; font-weight: 600; margin-bottom: 8px;">When to Use</div>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569;">
              <li>Rebuilding projection from scratch</li>
              <li>Fixing bugs in projection logic</li>
              <li>Creating new projection</li>
            </ul>
          </div>
          <div>
            <div style="font-size: 13px; color: #1e293b; font-weight: 600; margin-bottom: 8px;">Considerations</div>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569;">
              <li>Can be slow for large streams</li>
              <li>Run during off-peak hours</li>
              <li>Consider parallelization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Partial Replay -->
    <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: #22c55e; color: white; padding: 12px 20px; font-weight: 600;">
        Partial Replay (from Snapshot)
      </div>
      <div style="padding: 16px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <div style="font-size: 13px; color: #1e293b; font-weight: 600; margin-bottom: 8px;">When to Use</div>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569;">
              <li>Loading aggregate for command</li>
              <li>Recovery after crash</li>
              <li>Hot standby sync</li>
            </ul>
          </div>
          <div>
            <div style="font-size: 13px; color: #1e293b; font-weight: 600; margin-bottom: 8px;">Considerations</div>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569;">
              <li>Requires snapshot management</li>
              <li>Trade-off: storage vs speed</li>
              <li>Snapshot frequency tuning</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Parallel Replay -->
    <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: #8b5cf6; color: white; padding: 12px 20px; font-weight: 600;">
        Parallel Replay
      </div>
      <div style="padding: 16px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <div style="font-size: 13px; color: #1e293b; font-weight: 600; margin-bottom: 8px;">When to Use</div>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569;">
              <li>Massive event volumes</li>
              <li>Time-critical rebuilds</li>
              <li>Multi-tenant systems</li>
            </ul>
          </div>
          <div>
            <div style="font-size: 13px; color: #1e293b; font-weight: 600; margin-bottom: 8px;">Considerations</div>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569;">
              <li>Partition by aggregate ID</li>
              <li>Merge results carefully</li>
              <li>Handle cross-aggregate queries</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---

## How It Works

### Traditional vs Event Sourcing

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">State Storage Comparison</h4>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 12px;">Traditional (CRUD)</div>
      <div style="background: white; border: 1px solid #e2e8f0; border-radius: 4px; padding: 12px; font-family: monospace; font-size: 13px; color: #475569;">
        User: {<br>
        &nbsp;&nbsp;id: 123,<br>
        &nbsp;&nbsp;name: "Alice",<br>
        &nbsp;&nbsp;balance: 150<br>
        }
      </div>
      <div style="color: #64748b; font-size: 13px; margin-top: 8px;">Only current state stored. History is lost.</div>
    </div>

    <div style="background: #ecfdf5; border-radius: 8px; padding: 16px;">
      <div style="color: #065f46; font-weight: 600; margin-bottom: 12px;">Event Sourcing</div>
      <div style="background: white; border: 1px solid #d1fae5; border-radius: 4px; padding: 12px; font-family: monospace; font-size: 12px; color: #047857;">
        1. AccountCreated {id: 123, name: "Alice"}<br>
        2. MoneyDeposited {amount: 200}<br>
        3. MoneyWithdrawn {amount: 50}<br>
        <div style="color: #10b981; margin-top: 8px;">Replay = balance: 150</div>
      </div>
      <div style="color: #059669; font-size: 13px; margin-top: 8px;">Complete history. Can rebuild any point in time.</div>
    </div>
  </div>
</div>

### Core Components

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Event Sourcing Architecture</h4>

  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; padding: 12px 20px; border-radius: 8px; min-width: 120px; text-align: center;">
        <div style="font-weight: 600;">Command</div>
        <div style="font-size: 12px;">User Intent</div>
      </div>
      <div style="color: #64748b;">-></div>
      <div style="background: #8b5cf6; color: white; padding: 12px 20px; border-radius: 8px; min-width: 120px; text-align: center;">
        <div style="font-weight: 600;">Aggregate</div>
        <div style="font-size: 12px;">Business Logic</div>
      </div>
      <div style="color: #64748b;">-></div>
      <div style="background: #10b981; color: white; padding: 12px 20px; border-radius: 8px; min-width: 120px; text-align: center;">
        <div style="font-weight: 600;">Event</div>
        <div style="font-size: 12px;">Fact Recorded</div>
      </div>
    </div>

    <div style="display: flex; align-items: flex-start; gap: 16px; margin-left: 300px;">
      <div style="color: #64748b;">|<br>V</div>
    </div>

    <div style="display: flex; align-items: center; gap: 16px; margin-left: 240px;">
      <div style="background: #f59e0b; color: white; padding: 12px 20px; border-radius: 8px; min-width: 120px; text-align: center;">
        <div style="font-weight: 600;">Event Store</div>
        <div style="font-size: 12px;">Append-Only Log</div>
      </div>
      <div style="color: #64748b;">-></div>
      <div style="background: #ec4899; color: white; padding: 12px 20px; border-radius: 8px; min-width: 120px; text-align: center;">
        <div style="font-weight: 600;">Projection</div>
        <div style="font-size: 12px;">Read Model</div>
      </div>
    </div>
  </div>

  <div style="margin-top: 20px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; font-size: 13px;">
    <div style="background: #f1f5f9; padding: 12px; border-radius: 6px;">
      <div style="color: #1e293b; font-weight: 600;">Event Store</div>
      <div style="color: #64748b;">Immutable, append-only log of all events</div>
    </div>
    <div style="background: #f1f5f9; padding: 12px; border-radius: 6px;">
      <div style="color: #1e293b; font-weight: 600;">Aggregate</div>
      <div style="color: #64748b;">Domain entity that produces and applies events</div>
    </div>
    <div style="background: #f1f5f9; padding: 12px; border-radius: 6px;">
      <div style="color: #1e293b; font-weight: 600;">Projection</div>
      <div style="color: #64748b;">Read model built by processing events</div>
    </div>
  </div>
</div>

### Event Flow

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Processing a Command</h4>

  <div style="display: flex; flex-direction: column; gap: 8px;">
    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #eff6ff; border-radius: 8px;">
      <div style="background: #3b82f6; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600;">1</div>
      <div style="color: #1e40af;"><strong>Load Events:</strong> Retrieve all events for the aggregate from the event store</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f5f3ff; border-radius: 8px;">
      <div style="background: #8b5cf6; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600;">2</div>
      <div style="color: #5b21b6;"><strong>Replay Events:</strong> Apply each event to rebuild current state</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #ecfdf5; border-radius: 8px;">
      <div style="background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600;">3</div>
      <div style="color: #065f46;"><strong>Validate Command:</strong> Check if command is valid against current state</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #fef3c7; border-radius: 8px;">
      <div style="background: #f59e0b; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600;">4</div>
      <div style="color: #92400e;"><strong>Produce Events:</strong> Generate new events representing state changes</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #fce7f3; border-radius: 8px;">
      <div style="background: #ec4899; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600;">5</div>
      <div style="color: #9d174d;"><strong>Persist Events:</strong> Append new events to event store (with optimistic concurrency)</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #f1f5f9; border-radius: 8px;">
      <div style="background: #64748b; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600;">6</div>
      <div style="color: #334155;"><strong>Update Projections:</strong> Asynchronously update read models</div>
    </div>
  </div>
</div>

---

## Real-Life Failure Story

### LMAX Exchange Architecture Evolution

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">How Event Sourcing Solved a Performance Crisis</h4>

  <div style="background: #fef2f2; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <div style="color: #991b1b; font-weight: 600;">The Challenge</div>
    <div style="color: #7f1d1d; font-size: 14px; margin-top: 8px;">
      LMAX, a financial exchange, needed to process 6 million orders per second with microsecond latency. Traditional database-backed systems couldn't handle the throughput requirements, and they needed complete audit trails for regulatory compliance.
    </div>
  </div>

  <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <div style="color: #1e293b; font-weight: 600;">Traditional Approach Problems</div>
    <div style="color: #475569; font-size: 14px; margin-top: 8px;">
      <div style="padding: 4px 0;">Database writes: 1-10ms latency (too slow)</div>
      <div style="padding: 4px 0;">Audit logging: Separate system, consistency issues</div>
      <div style="padding: 4px 0;">Recovery: Complex, incomplete state restoration</div>
      <div style="padding: 4px 0;">Debugging: No way to replay production issues</div>
    </div>
  </div>

  <div style="background: #ecfdf5; border-radius: 8px; padding: 16px;">
    <div style="color: #065f46; font-weight: 600;">Event Sourcing Solution</div>
    <div style="color: #047857; font-size: 14px; margin-top: 8px;">
      <div>1. All state changes stored as events in an append-only journal</div>
      <div>2. In-memory processing with journal replay for recovery</div>
      <div>3. Complete audit trail built into the architecture</div>
      <div>4. Can replay any day's events to reproduce issues</div>
      <div style="margin-top: 8px; font-weight: 600;">Result: 6 million transactions/second with less than 1ms latency</div>
    </div>
  </div>
</div>

---

## Implementation

### Complete Event Sourcing System

```python
from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Dict, Optional, Any, Callable
from abc import ABC, abstractmethod
import uuid
import json


# ============ Events ============

@dataclass
class Event:
    """Base class for all domain events."""
    event_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    aggregate_id: str = ""
    aggregate_type: str = ""
    event_type: str = ""
    data: Dict[str, Any] = field(default_factory=dict)
    metadata: Dict[str, Any] = field(default_factory=dict)
    version: int = 0
    timestamp: datetime = field(default_factory=datetime.utcnow)

    def to_dict(self) -> dict:
        return {
            "event_id": self.event_id,
            "aggregate_id": self.aggregate_id,
            "aggregate_type": self.aggregate_type,
            "event_type": self.event_type,
            "data": self.data,
            "metadata": self.metadata,
            "version": self.version,
            "timestamp": self.timestamp.isoformat()
        }


# ============ Event Store ============

class EventStore:
    """
    Append-only store for events with optimistic concurrency.

    In production, use EventStoreDB, PostgreSQL, or Kafka.
    """

    def __init__(self):
        self._events: List[Event] = []
        self._streams: Dict[str, List[Event]] = {}
        self._subscribers: List[Callable[[Event], None]] = []

    def append(self, aggregate_id: str, events: List[Event],
               expected_version: int) -> None:
        """
        Append events with optimistic concurrency control.

        Raises ConcurrencyError if expected_version doesn't match.
        """
        if aggregate_id not in self._streams:
            self._streams[aggregate_id] = []

        current_version = len(self._streams[aggregate_id])

        if expected_version != current_version:
            raise ConcurrencyError(
                f"Expected version {expected_version}, "
                f"but stream is at version {current_version}"
            )

        for i, event in enumerate(events):
            event.version = current_version + i + 1
            event.aggregate_id = aggregate_id
            self._events.append(event)
            self._streams[aggregate_id].append(event)

            # Notify subscribers
            for subscriber in self._subscribers:
                subscriber(event)

    def get_events(self, aggregate_id: str,
                   from_version: int = 0) -> List[Event]:
        """Get events for an aggregate starting from a version."""
        if aggregate_id not in self._streams:
            return []

        return [e for e in self._streams[aggregate_id]
                if e.version > from_version]

    def get_all_events(self, from_position: int = 0) -> List[Event]:
        """Get all events across all aggregates (for projections)."""
        return self._events[from_position:]

    def subscribe(self, handler: Callable[[Event], None]) -> None:
        """Subscribe to new events (for real-time projections)."""
        self._subscribers.append(handler)


class ConcurrencyError(Exception):
    """Raised when optimistic concurrency check fails."""
    pass


# ============ Aggregates ============

class Aggregate(ABC):
    """
    Base class for domain aggregates.

    Aggregates produce events and rebuild state from events.
    """

    def __init__(self):
        self.id: str = ""
        self.version: int = 0
        self._pending_events: List[Event] = []

    @abstractmethod
    def apply(self, event: Event) -> None:
        """Apply an event to update aggregate state."""
        pass

    def load_from_events(self, events: List[Event]) -> None:
        """Reconstruct aggregate state by replaying events."""
        for event in events:
            self.apply(event)
            self.version = event.version

    def add_event(self, event_type: str, data: dict) -> None:
        """Record a new event (to be persisted)."""
        event = Event(
            aggregate_type=self.__class__.__name__,
            event_type=event_type,
            data=data,
            version=self.version + len(self._pending_events) + 1
        )
        self._pending_events.append(event)
        self.apply(event)

    def get_pending_events(self) -> List[Event]:
        return self._pending_events.copy()

    def clear_pending_events(self) -> None:
        self._pending_events.clear()


class BankAccount(Aggregate):
    """
    Example aggregate: A bank account with event-sourced state.
    """

    def __init__(self):
        super().__init__()
        self.owner: str = ""
        self.balance: float = 0.0
        self.is_closed: bool = False
        self.transaction_count: int = 0

    def apply(self, event: Event) -> None:
        """Apply event to update account state."""
        if event.event_type == "AccountOpened":
            self.id = event.aggregate_id or event.data.get("account_id", "")
            self.owner = event.data["owner"]
            self.balance = event.data.get("initial_balance", 0.0)

        elif event.event_type == "MoneyDeposited":
            self.balance += event.data["amount"]
            self.transaction_count += 1

        elif event.event_type == "MoneyWithdrawn":
            self.balance -= event.data["amount"]
            self.transaction_count += 1

        elif event.event_type == "AccountClosed":
            self.is_closed = True

    # Command handlers

    @classmethod
    def open(cls, account_id: str, owner: str,
             initial_balance: float = 0.0) -> "BankAccount":
        """Command: Open a new account."""
        account = cls()
        account.id = account_id
        account.add_event("AccountOpened", {
            "account_id": account_id,
            "owner": owner,
            "initial_balance": initial_balance
        })
        return account

    def deposit(self, amount: float, description: str = "") -> None:
        """Command: Deposit money into account."""
        if self.is_closed:
            raise InvalidOperationError("Cannot deposit to closed account")
        if amount <= 0:
            raise InvalidOperationError("Deposit amount must be positive")

        self.add_event("MoneyDeposited", {
            "amount": amount,
            "description": description
        })

    def withdraw(self, amount: float, description: str = "") -> None:
        """Command: Withdraw money from account."""
        if self.is_closed:
            raise InvalidOperationError("Cannot withdraw from closed account")
        if amount <= 0:
            raise InvalidOperationError("Withdrawal amount must be positive")
        if amount > self.balance:
            raise InvalidOperationError(
                f"Insufficient funds. Balance: {self.balance}, "
                f"Requested: {amount}"
            )

        self.add_event("MoneyWithdrawn", {
            "amount": amount,
            "description": description
        })

    def close(self) -> None:
        """Command: Close the account."""
        if self.is_closed:
            raise InvalidOperationError("Account is already closed")
        if self.balance != 0:
            raise InvalidOperationError(
                "Cannot close account with non-zero balance"
            )

        self.add_event("AccountClosed", {})


class InvalidOperationError(Exception):
    """Raised when a command violates business rules."""
    pass


# ============ Repository ============

class Repository:
    """
    Repository pattern for loading and saving aggregates.
    """

    def __init__(self, event_store: EventStore, aggregate_class: type):
        self.event_store = event_store
        self.aggregate_class = aggregate_class

    def get(self, aggregate_id: str) -> Optional[Aggregate]:
        """Load an aggregate by replaying its events."""
        events = self.event_store.get_events(aggregate_id)

        if not events:
            return None

        aggregate = self.aggregate_class()
        aggregate.load_from_events(events)
        return aggregate

    def save(self, aggregate: Aggregate) -> None:
        """Persist pending events with optimistic concurrency."""
        pending = aggregate.get_pending_events()

        if not pending:
            return

        expected_version = aggregate.version - len(pending)
        self.event_store.append(aggregate.id, pending, expected_version)
        aggregate.clear_pending_events()


# ============ Projections ============

class Projection(ABC):
    """
    Base class for read model projections.

    Projections build queryable views from events.
    """

    @abstractmethod
    def handle(self, event: Event) -> None:
        """Process an event to update the projection."""
        pass


class AccountBalanceProjection(Projection):
    """Simple projection: account_id -> balance."""

    def __init__(self):
        self.balances: Dict[str, float] = {}

    def handle(self, event: Event) -> None:
        if event.event_type == "AccountOpened":
            self.balances[event.aggregate_id] = event.data.get(
                "initial_balance", 0.0
            )
        elif event.event_type == "MoneyDeposited":
            self.balances[event.aggregate_id] += event.data["amount"]
        elif event.event_type == "MoneyWithdrawn":
            self.balances[event.aggregate_id] -= event.data["amount"]
        elif event.event_type == "AccountClosed":
            del self.balances[event.aggregate_id]

    def get_balance(self, account_id: str) -> Optional[float]:
        return self.balances.get(account_id)


class AccountSummaryProjection(Projection):
    """Rich projection with multiple fields per account."""

    def __init__(self):
        self.accounts: Dict[str, dict] = {}

    def handle(self, event: Event) -> None:
        if event.event_type == "AccountOpened":
            self.accounts[event.aggregate_id] = {
                "owner": event.data["owner"],
                "balance": event.data.get("initial_balance", 0.0),
                "transaction_count": 0,
                "opened_at": event.timestamp,
                "last_activity": event.timestamp,
                "status": "active"
            }

        elif event.event_type in ["MoneyDeposited", "MoneyWithdrawn"]:
            account = self.accounts.get(event.aggregate_id)
            if account:
                delta = event.data["amount"]
                if event.event_type == "MoneyWithdrawn":
                    delta = -delta
                account["balance"] += delta
                account["transaction_count"] += 1
                account["last_activity"] = event.timestamp

        elif event.event_type == "AccountClosed":
            account = self.accounts.get(event.aggregate_id)
            if account:
                account["status"] = "closed"
                account["closed_at"] = event.timestamp

    def get_account(self, account_id: str) -> Optional[dict]:
        return self.accounts.get(account_id)

    def get_active_accounts(self) -> List[dict]:
        return [a for a in self.accounts.values() if a["status"] == "active"]


class ProjectionManager:
    """Manages multiple projections and keeps them in sync."""

    def __init__(self, event_store: EventStore):
        self.event_store = event_store
        self.projections: List[Projection] = []
        self.position: int = 0

    def register(self, projection: Projection) -> None:
        """Register a projection to receive events."""
        self.projections.append(projection)

    def rebuild_all(self) -> None:
        """Rebuild all projections from scratch."""
        self.position = 0
        for projection in self.projections:
            projection.__init__()  # Reset state
        self.catch_up()

    def catch_up(self) -> None:
        """Process any new events since last catch_up."""
        events = self.event_store.get_all_events(self.position)

        for event in events:
            for projection in self.projections:
                projection.handle(event)
            self.position += 1


# ============ Snapshots ============

@dataclass
class Snapshot:
    """Snapshot of aggregate state for faster loading."""
    aggregate_id: str
    aggregate_type: str
    version: int
    state: dict
    created_at: datetime = field(default_factory=datetime.utcnow)


class SnapshotStore:
    """Store for aggregate snapshots."""

    def __init__(self, snapshot_frequency: int = 100):
        self.snapshots: Dict[str, Snapshot] = {}
        self.snapshot_frequency = snapshot_frequency

    def should_snapshot(self, version: int) -> bool:
        return version % self.snapshot_frequency == 0

    def save(self, aggregate: Aggregate, state: dict) -> None:
        """Save a snapshot of the aggregate."""
        self.snapshots[aggregate.id] = Snapshot(
            aggregate_id=aggregate.id,
            aggregate_type=aggregate.__class__.__name__,
            version=aggregate.version,
            state=state
        )

    def get(self, aggregate_id: str) -> Optional[Snapshot]:
        """Get the latest snapshot for an aggregate."""
        return self.snapshots.get(aggregate_id)


# ============ Usage Example ============

def main():
    # Set up infrastructure
    event_store = EventStore()
    repo = Repository(event_store, BankAccount)

    # Set up projections
    balance_projection = AccountBalanceProjection()
    summary_projection = AccountSummaryProjection()
    projection_manager = ProjectionManager(event_store)
    projection_manager.register(balance_projection)
    projection_manager.register(summary_projection)

    # Subscribe projections to real-time updates
    event_store.subscribe(balance_projection.handle)
    event_store.subscribe(summary_projection.handle)

    # Create and use an account
    account = BankAccount.open("acc-001", "Alice", initial_balance=100.0)
    repo.save(account)

    # Perform operations
    account.deposit(50.0, "Paycheck")
    account.withdraw(30.0, "Groceries")
    repo.save(account)

    # Query via projection (fast)
    balance = balance_projection.get_balance("acc-001")
    print(f"Balance from projection: ${balance}")  # $120.0

    # Query via aggregate (replay events)
    loaded = repo.get("acc-001")
    print(f"Balance from replay: ${loaded.balance}")  # $120.0

    # Get rich account data
    summary = summary_projection.get_account("acc-001")
    print(f"Transaction count: {summary['transaction_count']}")  # 2


if __name__ == "__main__":
    main()
```

### Event Schema Evolution

```python
class EventUpcaster:
    """
    Transform old event schemas to current version.

    Never modify stored events - upcast on read instead.
    """

    def __init__(self):
        self.upcasters = {}

    def register(self, event_type: str, from_version: int,
                 upcaster: Callable[[dict], dict]) -> None:
        """Register an upcaster for a specific event type and version."""
        key = (event_type, from_version)
        self.upcasters[key] = upcaster

    def upcast(self, event: dict) -> dict:
        """Apply all necessary upcasters to bring event to current schema."""
        event_type = event["event_type"]
        version = event.get("schema_version", 1)

        while True:
            key = (event_type, version)
            if key not in self.upcasters:
                break

            event = self.upcasters[key](event)
            version += 1

        event["schema_version"] = version
        return event


# Example: Evolving AccountOpened event
def upcast_account_opened_v1_to_v2(event: dict) -> dict:
    """V1 had 'name', V2 renamed to 'owner'."""
    data = event["data"].copy()
    data["owner"] = data.pop("name", "Unknown")
    return {**event, "data": data}


def upcast_account_opened_v2_to_v3(event: dict) -> dict:
    """V3 added 'currency' field with default."""
    data = event["data"].copy()
    data.setdefault("currency", "USD")
    return {**event, "data": data}


# Usage
upcaster = EventUpcaster()
upcaster.register("AccountOpened", 1, upcast_account_opened_v1_to_v2)
upcaster.register("AccountOpened", 2, upcast_account_opened_v2_to_v3)
```

---

## 3-Level Recursive Interview Questions

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); border-radius: 16px; padding: 32px; margin: 24px 0; color: white;">
  <h3 style="margin-top: 0; color: #60a5fa;">Deep Interview Q&A: Event Sourcing Mastery</h3>
  <p style="color: #94a3b8;">3-level recursive questions that demonstrate deep understanding</p>
</div>

### Q1: When should you use Event Sourcing vs traditional CRUD?

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

**Use Event Sourcing when:**
- <span style="color:#10b981">**Complete audit trail**</span> is a requirement (finance, healthcare, legal)
- You need <span style="color:#10b981">**temporal queries**</span> ("what was the state on March 15?")
- Complex domain with many state transitions
- Multiple read models needed from the same data
- Debugging production issues requires exact replay

**Use CRUD when:**
- Simple domain with straightforward state
- No audit requirements
- High-frequency updates to same records
- Team unfamiliar with event sourcing patterns
- Query patterns are simple and predictable

<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; margin-top: 16px; border-radius: 0 8px 8px 0;">
<div style="color: #1d4ed8; font-weight: 600; margin-bottom: 8px;">Follow-up L2: What are the hidden costs of Event Sourcing that teams often underestimate?</div>
<div style="color: #1e40af; font-size: 14px;">

**Hidden costs include:**
1. <span style="color:#10b981">**Event schema evolution complexity**</span> - Every schema change requires upcasting logic
2. <span style="color:#10b981">**Storage growth**</span> - Events never deleted, requires archival strategy
3. <span style="color:#10b981">**Eventual consistency UX**</span> - UI must handle projection lag gracefully
4. <span style="color:#10b981">**Testing complexity**</span> - Need to test event replay, projections, upcasters
5. <span style="color:#10b981">**Operational overhead**</span> - Monitoring projection lag, snapshot health, replay times

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 12px; margin-top: 12px; border-radius: 0 6px 6px 0;">
<div style="color: #1e40af; font-weight: 600; margin-bottom: 4px;">Follow-up L3: How would you migrate from CRUD to Event Sourcing for a live system?</div>
<div style="color: #1e40af; font-size: 13px;">

**Migration Strategy (Strangler Fig Pattern):**

1. **Dual-write phase**: Write to both old DB and new event store
2. **Shadow projection**: Build projections from events, compare with old DB
3. **Read migration**: Gradually shift reads to projections
4. **Write migration**: Route new writes only to event store
5. **Backfill**: Generate synthetic events for historical data
6. **Decommission**: Remove old CRUD system

**Key considerations:**
- Use [[Change Data Capture]](/topic/system-design/cdc) to generate events from existing DB changes
- Maintain idempotency keys to handle duplicate events
- Plan for rollback if projections show data inconsistencies
</div>
</div>
</div>
</div>
</div>

---

### Q2: How do you handle large event streams efficiently?

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

**Answer:**

1. **Snapshots**: Periodically save aggregate state. Load from snapshot + replay only newer events.
```python
def load_with_snapshot(aggregate_id):
    snapshot = snapshot_store.get(aggregate_id)
    if snapshot:
        aggregate.restore_from_snapshot(snapshot)
        events = event_store.get_events(aggregate_id, from_version=snapshot.version)
    else:
        events = event_store.get_events(aggregate_id)
    aggregate.load_from_events(events)
```

2. **Event archiving**: Move old events to cold storage, keep recent events hot

3. **Aggregate design**: Keep aggregates small with bounded event streams

4. **Parallel projection rebuild**: Partition events and process in parallel

<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; margin-top: 16px; border-radius: 0 8px 8px 0;">
<div style="color: #15803d; font-weight: 600; margin-bottom: 8px;">Follow-up L2: When should you take snapshots and what trade-offs are involved?</div>
<div style="color: #166534; font-size: 14px;">

**Snapshot Frequency Trade-offs:**

| Frequency | Storage Cost | Load Time | Complexity |
|-----------|--------------|-----------|------------|
| Every 10 events | High | Fastest | Low |
| Every 100 events | Medium | Fast | Low |
| Every 1000 events | Low | Slower | Medium |
| Adaptive (time-based) | Variable | Predictable | High |

**When NOT to snapshot:**
- Aggregates with few events (< 50)
- Events are small and replay is fast
- Write-heavy with infrequent reads

**Snapshot strategies:**
- <span style="color:#10b981">**Count-based**</span>: Every N events - simple and predictable
- <span style="color:#10b981">**Time-based**</span>: Every N hours - consistent timing
- <span style="color:#10b981">**Adaptive**</span>: When replay time exceeds threshold - efficient but complex

<div style="background: #dcfce7; border-left: 4px solid #16a34a; padding: 12px; margin-top: 12px; border-radius: 0 6px 6px 0;">
<div style="color: #15803d; font-weight: 600; margin-bottom: 4px;">Follow-up L3: How do you handle snapshot invalidation when aggregate logic changes?</div>
<div style="color: #166534; font-size: 13px;">

**Snapshot Versioning Strategy:**

```python
@dataclass
class Snapshot:
    aggregate_id: str
    version: int
    schema_version: int  # Snapshot schema version
    state: dict

class SnapshotAwareRepository:
    CURRENT_SCHEMA_VERSION = 3

    def load(self, aggregate_id: str) -> Aggregate:
        snapshot = self.snapshot_store.get(aggregate_id)

        if snapshot and snapshot.schema_version == self.CURRENT_SCHEMA_VERSION:
            # Valid snapshot - use it
            aggregate = self.restore_from_snapshot(snapshot)
            events = self.event_store.get_events(
                aggregate_id, from_version=snapshot.version
            )
        else:
            # Stale snapshot - full replay
            aggregate = self.aggregate_class()
            events = self.event_store.get_events(aggregate_id)

        aggregate.load_from_events(events)

        # Optionally create new snapshot
        if self.should_snapshot(aggregate):
            self.create_snapshot(aggregate)

        return aggregate
```

**Handling logic changes:**
1. Increment `CURRENT_SCHEMA_VERSION` when aggregate `apply()` logic changes
2. Background job rebuilds snapshots with new version
3. Use [[Blue-Green Deployment]](/topic/system-design/deployment-strategies) to avoid serving stale reads during transition
</div>
</div>
</div>
</div>
</div>

---

### Q3: How do you ensure consistency between the event store and projections?

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

**Answer:**

Projections are <span style="color:#10b981">**eventually consistent**</span> by design. To manage this:

1. **Idempotent handlers**: Projections must handle duplicate events safely
2. **Position tracking**: Store the last processed event position
3. **Replay capability**: Rebuild projections from events at any time
4. **Ordering guarantees**: Process events in order per aggregate

For stronger consistency, use the <span style="color:#10b981">**Outbox Pattern**</span>:
- Write events to database table in same transaction as projection update
- Background process publishes events to message bus

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-top: 16px; border-radius: 0 8px 8px 0;">
<div style="color: #b45309; font-weight: 600; margin-bottom: 8px;">Follow-up L2: How do you handle projection lag in user-facing applications?</div>
<div style="color: #92400e; font-size: 14px;">

**Strategies for handling eventual consistency in UX:**

1. **Read-your-writes consistency**: After command, poll projection until updated
```python
async def place_order_and_wait(order_data):
    event_version = await command_handler.place_order(order_data)

    # Wait for projection to catch up
    while True:
        projection = await order_projection.get(order_data.id)
        if projection and projection.version >= event_version:
            return projection
        await asyncio.sleep(0.1)
```

2. **Optimistic UI updates**: Update UI immediately, sync later
3. **Version tokens**: Return event version, client includes in subsequent reads
4. **Dedicated read-after-write projection**: Synchronous projection for immediate consistency

<div style="background: #fde68a; border-left: 4px solid #d97706; padding: 12px; margin-top: 12px; border-radius: 0 6px 6px 0;">
<div style="color: #92400e; font-weight: 600; margin-bottom: 4px;">Follow-up L3: How do you design idempotent projection handlers for exactly-once semantics?</div>
<div style="color: #92400e; font-size: 13px;">

**Idempotent Projection Pattern:**

```python
class IdempotentProjection:
    def __init__(self, db):
        self.db = db

    def handle(self, event: Event) -> None:
        # Check if event already processed
        if self._is_processed(event.event_id):
            return  # Skip duplicate

        # Process event and mark as processed atomically
        with self.db.transaction():
            self._apply_event(event)
            self._mark_processed(event.event_id, event.version)

    def _is_processed(self, event_id: str) -> bool:
        return self.db.exists(
            "processed_events",
            {"event_id": event_id}
        )

    def _mark_processed(self, event_id: str, version: int) -> None:
        self.db.insert("processed_events", {
            "event_id": event_id,
            "version": version,
            "processed_at": datetime.utcnow()
        })
```

**Key techniques:**
- <span style="color:#10b981">**Deduplication table**</span>: Track processed event IDs
- <span style="color:#10b981">**Idempotency keys**</span>: Use event_id as natural idempotency key
- <span style="color:#10b981">**Upsert operations**</span>: Use `INSERT ... ON CONFLICT UPDATE`
- <span style="color:#10b981">**Version checks**</span>: Only apply if version > current

See also: [[Distributed Transactions]](/topic/system-design/distributed-transactions) for related patterns
</div>
</div>
</div>
</div>
</div>

---

### Q4: How do you handle event schema changes?

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

**Answer:**

**Golden Rule**: <span style="color:#10b981">Never modify stored events</span>. Events are immutable facts.

**Strategies:**
1. **Upcasting**: Transform old events to new schema on read
2. **Event versioning**: Include schema_version in events
3. **Copy-and-transform**: Create new events from old (for major changes)
4. **Weak schema**: Design events with optional fields

**Example upcaster chain:**
```
V1: {name: "Alice"}
  -> V2: {owner: "Alice"}
  -> V3: {owner: "Alice", currency: "USD"}
```

<div style="background: #f5f3ff; border-left: 4px solid #8b5cf6; padding: 16px; margin-top: 16px; border-radius: 0 8px 8px 0;">
<div style="color: #6d28d9; font-weight: 600; margin-bottom: 8px;">Follow-up L2: What happens when an upcaster has a bug that corrupts projected data?</div>
<div style="color: #5b21b6; font-size: 14px;">

**Recovery Strategy:**

1. **Fix the upcaster**: Correct the transformation logic
2. **Rebuild projections**: Full replay from events with corrected upcaster
3. **No data loss**: Original events unchanged, only projections affected

**Prevention techniques:**
- Unit test upcasters with sample events from each version
- Keep old event samples in test fixtures
- Integration test full replay path
- Monitor projection checksums after deployments

```python
def test_upcaster_chain():
    v1_event = {"event_type": "AccountOpened", "data": {"name": "Alice"}}

    result = upcaster.upcast(v1_event)

    assert result["data"]["owner"] == "Alice"
    assert result["data"]["currency"] == "USD"
    assert result["schema_version"] == 3
```

<div style="background: #ede9fe; border-left: 4px solid #7c3aed; padding: 12px; margin-top: 12px; border-radius: 0 6px 6px 0;">
<div style="color: #5b21b6; font-weight: 600; margin-bottom: 4px;">Follow-up L3: How do you handle breaking changes that can't be upcasted?</div>
<div style="color: #5b21b6; font-size: 13px;">

**Strategies for non-upcastable changes:**

1. **Create new event type**: `OrderPlacedV2` alongside `OrderPlacedV1`
   - Projections handle both types
   - New code emits V2, old events remain V1

2. **Compensating events**: Emit correction events
   ```python
   # Original event (wrong)
   OrderPlaced {amount: 100}  # Should have been 110

   # Compensation event
   OrderAmountCorrected {
       original_event_id: "evt-123",
       old_amount: 100,
       new_amount: 110,
       reason: "Pricing bug fix"
   }
   ```

3. **Event store migration** (last resort):
   - Create new event store with transformed events
   - Use [[Blue-Green Deployment]](/topic/system-design/deployment-strategies) to switch
   - Keep old store for audit/legal requirements

**When to use each:**
- New event type: Semantic changes (new fields change meaning)
- Compensating events: Data corrections, business adjustments
- Migration: Fundamental structural changes, compliance requirements
</div>
</div>
</div>
</div>
</div>

---

### Q5: What is CQRS and how does it relate to Event Sourcing?

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

**Answer:**

<span style="color:#10b981">**CQRS (Command Query Responsibility Segregation)**</span> separates read and write models:
- **Write side**: Receives commands, produces events
- **Read side**: Optimized projections for queries

Event Sourcing and CQRS are complementary:
- Event Sourcing provides the write model (append-only event log)
- CQRS provides multiple read models (projections built from events)

**Benefits together:**
- Write model optimized for consistency (events)
- Read models optimized for specific queries (denormalized views)
- Can scale read and write sides independently

<div style="background: #fce7f3; border-left: 4px solid #ec4899; padding: 16px; margin-top: 16px; border-radius: 0 8px 8px 0;">
<div style="color: #9d174d; font-weight: 600; margin-bottom: 8px;">Follow-up L2: When would you use Event Sourcing without CQRS, or CQRS without Event Sourcing?</div>
<div style="color: #831843; font-size: 14px;">

**Event Sourcing without CQRS:**
- Single, simple read model sufficient
- Audit trail is primary requirement, not query flexibility
- Example: Compliance logging system

**CQRS without Event Sourcing:**
- Need read/write separation for scaling
- Traditional database on write side is sufficient
- Example: E-commerce product catalog (read-heavy, simple writes)

```
CQRS without ES:
  [Command] -> [Write DB] -> [Change Data Capture] -> [Read DB]
                    |                                      |
                 Normalized                           Denormalized
```

<div style="background: #fdf2f8; border-left: 4px solid #db2777; padding: 12px; margin-top: 12px; border-radius: 0 6px 6px 0;">
<div style="color: #9d174d; font-weight: 600; margin-bottom: 4px;">Follow-up L3: How do you handle cross-aggregate queries in an Event Sourced CQRS system?</div>
<div style="color: #831843; font-size: 13px;">

**Cross-Aggregate Query Strategies:**

1. **Denormalized projection**: Build read model spanning aggregates
```python
class CustomerOrdersProjection:
    """Combines Customer and Order aggregate data."""

    def handle(self, event: Event):
        if event.event_type == "CustomerCreated":
            self.data[event.aggregate_id] = {
                "customer_name": event.data["name"],
                "orders": []
            }
        elif event.event_type == "OrderPlaced":
            customer_id = event.data["customer_id"]
            self.data[customer_id]["orders"].append({
                "order_id": event.aggregate_id,
                "total": event.data["total"]
            })
```

2. **Composite ID projection**: Key by combination of aggregate IDs

3. **GraphQL/API composition**: Combine projections at API layer

4. **Event-carried state transfer**: Include related data in events
```python
OrderPlaced {
    order_id: "ord-123",
    customer_id: "cust-456",
    customer_name: "Alice",  # Denormalized for projection
    total: 150.00
}
```

**Trade-offs:**
- Denormalized projections: Faster queries, more storage, eventual consistency
- API composition: Flexible, slower, consistent at query time

See [[API Gateway]](/topic/system-design/api-gateway) for aggregation patterns
</div>
</div>
</div>
</div>
</div>

---

### Q6: How do you implement replay for debugging production issues?

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

**Answer:**

**Production Replay Strategy:**

1. **Copy events** to isolated environment
2. **Replay with instrumentation**: Add logging/breakpoints
3. **Time-travel debugging**: Stop at specific event, inspect state
4. **Hypothesis testing**: Modify event data to test fixes

```python
class DebuggingReplayer:
    def replay_until(self, aggregate_id: str, target_version: int,
                     breakpoint_fn: Callable[[Event, Aggregate], bool] = None):
        aggregate = self.aggregate_class()
        events = self.event_store.get_events(aggregate_id)

        for event in events:
            if event.version > target_version:
                break

            print(f"Applying: {event.event_type} v{event.version}")
            aggregate.apply(event)

            if breakpoint_fn and breakpoint_fn(event, aggregate):
                print(f"Breakpoint hit at v{event.version}")
                import pdb; pdb.set_trace()

        return aggregate
```

<div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; margin-top: 16px; border-radius: 0 8px 8px 0;">
<div style="color: #991b1b; font-weight: 600; margin-bottom: 8px;">Follow-up L2: How do you handle side effects during replay (sending emails, API calls)?</div>
<div style="color: #7f1d1d; font-size: 14px;">

**Side Effect Management:**

1. **Separate side effects from state changes**:
```python
class OrderAggregate:
    def place_order(self, data):
        # State change - replayed
        self.add_event("OrderPlaced", data)

# Side effects handled separately by process manager
class OrderProcessManager:
    def handle(self, event: Event):
        if event.event_type == "OrderPlaced":
            if not self.is_replay_mode:
                self.email_service.send_confirmation(event.data)
```

2. **Event handlers track execution**:
```python
class IdempotentEmailHandler:
    def handle(self, event: Event):
        if self.already_sent(event.event_id):
            return  # Skip during replay
        self.send_email(event)
        self.mark_sent(event.event_id)
```

3. **Replay mode flag**: Disable side effects during rebuild

<div style="background: #fee2e2; border-left: 4px solid #dc2626; padding: 12px; margin-top: 12px; border-radius: 0 6px 6px 0;">
<div style="color: #991b1b; font-weight: 600; margin-bottom: 4px;">Follow-up L3: How do you handle time-dependent logic during replay?</div>
<div style="color: #7f1d1d; font-size: 13px;">

**Time-Dependent Replay Strategies:**

**Problem:** Code like `if datetime.now() > event.timestamp + timedelta(days=30)` behaves differently during replay.

**Solutions:**

1. **Use event timestamp, not system time**:
```python
class OrderAggregate:
    def apply(self, event: Event):
        if event.event_type == "OrderPlaced":
            # Use event time, not now()
            self.placed_at = event.timestamp
            self.expires_at = event.timestamp + timedelta(days=30)
```

2. **Clock abstraction**:
```python
class EventSourcedAggregate:
    def __init__(self, clock: Callable[[], datetime] = datetime.utcnow):
        self.clock = clock

    def current_time(self) -> datetime:
        return self.clock()

# During replay, inject event timestamp as clock
def replay_clock(event: Event):
    return lambda: event.timestamp
```

3. **Time events**: Model time passage as events
```python
# Instead of checking "now > 30 days after order"
# Emit explicit event when expiration occurs
DailyExpirationCheck {}
OrderExpired {order_id: "123", reason: "30 day limit"}
```

See [[Saga Pattern]](/topic/design-patterns/saga) for handling long-running processes
</div>
</div>
</div>
</div>
</div>

---

### Q7: What are the best practices for event design?

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

**Answer:**

**Event Design Principles:**

1. <span style="color:#10b981">**Past tense naming**</span>: Events are facts that happened
   - Good: `OrderPlaced`, `PaymentReceived`
   - Bad: `PlaceOrder`, `ProcessPayment`

2. <span style="color:#10b981">**Self-contained**</span>: Include all data needed to understand the change
   ```python
   # Good - self-contained
   OrderPlaced {
       order_id: "123",
       customer_id: "456",
       items: [{sku: "ABC", qty: 2, price: 25.00}],
       total: 50.00
   }

   # Bad - requires lookup
   OrderPlaced {order_id: "123"}  # Missing context
   ```

3. <span style="color:#10b981">**Domain language**</span>: Use business terms, not technical
   - Good: `SubscriptionRenewed`
   - Bad: `SubscriptionRowUpdated`

4. <span style="color:#10b981">**Granular events**</span>: One event per business fact
   - Good: `ItemAddedToCart`, `ItemRemovedFromCart`
   - Bad: `CartUpdated` (loses specific intent)

<div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 16px; margin-top: 16px; border-radius: 0 8px 8px 0;">
<div style="color: #065f46; font-weight: 600; margin-bottom: 8px;">Follow-up L2: How much data should an event contain - minimal or denormalized?</div>
<div style="color: #047857; font-size: 14px;">

**The Tension:**

| Minimal Events | Denormalized Events |
|----------------|---------------------|
| Smaller storage | Larger storage |
| Projections need lookups | Self-contained for projections |
| Schema changes easier | More data to upcast |
| Consistent with source | May drift from source |

**Recommended approach**: <span style="color:#10b981">**Event-Carried State Transfer**</span>

Include data that:
1. Is needed by multiple projections
2. Won't change after event (immutable references)
3. Would require expensive lookups

```python
# Good balance
OrderPlaced {
    order_id: "123",
    customer_id: "456",
    customer_name: "Alice",  # Denormalized - needed for display
    items: [...],
    total: 50.00,
    currency: "USD"
}
```

<div style="background: #d1fae5; border-left: 4px solid #059669; padding: 12px; margin-top: 12px; border-radius: 0 6px 6px 0;">
<div style="color: #065f46; font-weight: 600; margin-bottom: 4px;">Follow-up L3: How do you handle large payloads like file uploads in events?</div>
<div style="color: #047857; font-size: 13px;">

**Large Payload Strategies:**

1. **Reference pattern**: Store payload externally, event contains reference
```python
DocumentUploaded {
    document_id: "doc-123",
    storage_location: "s3://bucket/doc-123.pdf",  # Reference
    content_hash: "sha256:abc...",
    size_bytes: 5242880,
    metadata: {filename: "contract.pdf", mime: "application/pdf"}
}
```

2. **Claim check pattern**: Similar but with expiring claim
```python
LargeOrderReceived {
    order_id: "123",
    claim_check: "claims/order-123",  # Temporary storage
    claim_expires_at: "2024-01-15T00:00:00Z"
}
```

3. **Event chunking** (for very large events):
```python
DataImportStarted {import_id: "imp-1", total_chunks: 100}
DataChunkReceived {import_id: "imp-1", chunk: 1, data: [...]}
DataChunkReceived {import_id: "imp-1", chunk: 2, data: [...]}
DataImportCompleted {import_id: "imp-1"}
```

**Storage considerations:**
- Event store for metadata and references
- Blob storage (S3, GCS) for large payloads
- Content-addressable storage for deduplication

See [[Object Storage]](/topic/system-design/object-storage) for blob storage patterns
</div>
</div>
</div>
</div>
</div>

---

### Q8: How do you test event-sourced systems?

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

**Answer:**

**Testing Layers:**

1. <span style="color:#10b981">**Aggregate unit tests**</span>: Given events, when command, then events
```python
def test_withdraw_from_account():
    # Given
    account = BankAccount()
    account.load_from_events([
        Event(event_type="AccountOpened", data={"owner": "Alice", "initial_balance": 100})
    ])

    # When
    account.withdraw(30)

    # Then
    pending = account.get_pending_events()
    assert len(pending) == 1
    assert pending[0].event_type == "MoneyWithdrawn"
    assert pending[0].data["amount"] == 30
```

2. <span style="color:#10b981">**Projection tests**</span>: Given events, projection state matches
3. <span style="color:#10b981">**Integration tests**</span>: Full command -> event store -> projection flow
4. <span style="color:#10b981">**Upcaster tests**</span>: Old events transform correctly

<div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; margin-top: 16px; border-radius: 0 8px 8px 0;">
<div style="color: #1d4ed8; font-weight: 600; margin-bottom: 8px;">Follow-up L2: How do you write integration tests that verify eventual consistency?</div>
<div style="color: #1e40af; font-size: 14px;">

**Eventual Consistency Testing:**

```python
@pytest.fixture
def event_sourced_system():
    event_store = InMemoryEventStore()
    projection = OrderProjection()
    event_store.subscribe(projection.handle)
    return event_store, projection

def test_projection_eventually_consistent(event_sourced_system):
    event_store, projection = event_sourced_system

    # When: Place order via command
    order = Order.create("order-1", customer_id="cust-1", total=100)
    event_store.append("order-1", order.pending_events, expected_version=0)

    # Then: Projection reflects change (sync subscription)
    result = projection.get_order("order-1")
    assert result["total"] == 100

def test_projection_handles_out_of_order_events(event_sourced_system):
    """Verify projection handles events arriving out of order."""
    event_store, projection = event_sourced_system

    # Simulate out-of-order delivery
    events = [
        Event(event_type="ItemAdded", version=2),
        Event(event_type="OrderCreated", version=1),  # Arrives second
    ]

    for event in events:
        projection.handle(event)

    # Projection should buffer/reorder correctly
    assert projection.get_order("order-1") is not None
```

<div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 12px; margin-top: 12px; border-radius: 0 6px 6px 0;">
<div style="color: #1e40af; font-weight: 600; margin-bottom: 4px;">Follow-up L3: How do you implement property-based testing for event-sourced aggregates?</div>
<div style="color: #1e40af; font-size: 13px;">

**Property-Based Testing with Hypothesis:**

```python
from hypothesis import given, strategies as st
from hypothesis.stateful import RuleBasedStateMachine, rule

class BankAccountStateMachine(RuleBasedStateMachine):
    """Property: Replaying events always produces same state."""

    def __init__(self):
        super().__init__()
        self.account = BankAccount.open("test", "Alice", initial_balance=1000)
        self.event_store = InMemoryEventStore()

    @rule(amount=st.floats(min_value=0.01, max_value=100))
    def deposit(self, amount):
        self.account.deposit(amount)
        self._verify_replay_consistency()

    @rule(amount=st.floats(min_value=0.01, max_value=100))
    def withdraw(self, amount):
        if amount <= self.account.balance:
            self.account.withdraw(amount)
            self._verify_replay_consistency()

    def _verify_replay_consistency(self):
        # Save events
        events = self.account.get_pending_events()
        self.event_store.append(self.account.id, events,
                                expected_version=self.account.version - len(events))
        self.account.clear_pending_events()

        # Replay and compare
        replayed = BankAccount()
        replayed.load_from_events(
            self.event_store.get_events(self.account.id)
        )

        assert replayed.balance == self.account.balance
        assert replayed.version == self.account.version

TestBankAccount = BankAccountStateMachine.TestCase
```

**Properties to test:**
- Replay produces identical state
- Events are idempotent when applied
- Concurrent commands with same expected_version fail
- Upcasters are reversible (can downcast for testing)
</div>
</div>
</div>
</div>
</div>

---

## Common Mistakes

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Event Sourcing Anti-Patterns</h4>

  <div style="display: grid; gap: 12px;">
    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Storing CRUD operations as events</div>
      <div style="color: #7f1d1d; font-size: 14px;">Events should represent domain facts ("OrderPlaced"), not database operations ("OrderRowInserted"). Capture business intent, not technical actions.</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Large aggregates with too many events</div>
      <div style="color: #7f1d1d; font-size: 14px;">If an aggregate has thousands of events, loading becomes slow. Use snapshots, or redesign aggregates to be smaller and more focused.</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Modifying stored events</div>
      <div style="color: #7f1d1d; font-size: 14px;">Events are immutable historical facts. Use upcasting to transform old schemas on read, never modify the stored event data.</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Non-idempotent projection handlers</div>
      <div style="color: #7f1d1d; font-size: 14px;">Projections may receive duplicate events during replays or failures. Handlers must produce the same result when applied multiple times.</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Querying the event store directly</div>
      <div style="color: #7f1d1d; font-size: 14px;">Event stores are optimized for append and replay, not ad-hoc queries. Build projections for query needs instead of scanning events.</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Ignoring eventual consistency in UX</div>
      <div style="color: #7f1d1d; font-size: 14px;">Projections lag behind writes. Design UI to handle this - show optimistic updates, indicate "syncing" state, or use read-your-writes consistency.</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Coupling aggregates through events</div>
      <div style="color: #7f1d1d; font-size: 14px;">One aggregate should not directly consume another's events. Use sagas or process managers to coordinate across boundaries. See [[Saga Pattern]](/topic/design-patterns/saga).</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Missing correlation/causation IDs</div>
      <div style="color: #7f1d1d; font-size: 14px;">Without tracking which command caused which events, debugging distributed flows becomes nearly impossible. Always include correlation_id in event metadata.</div>
    </div>
  </div>
</div>

---

## Event Store Technologies Comparison

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Choosing an Event Store</h4>

  <div style="overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <thead>
        <tr style="background: #1e293b; color: white;">
          <th style="padding: 12px; text-align: left; border-radius: 8px 0 0 0;">Technology</th>
          <th style="padding: 12px; text-align: left;">Best For</th>
          <th style="padding: 12px; text-align: left;">Strengths</th>
          <th style="padding: 12px; text-align: left; border-radius: 0 8px 0 0;">Limitations</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background: #f1f5f9;">
          <td style="padding: 12px; font-weight: 600; color: #3b82f6;">EventStoreDB</td>
          <td style="padding: 12px;">Purpose-built ES</td>
          <td style="padding: 12px;">Projections built-in, optimized for ES patterns</td>
          <td style="padding: 12px;">Specialized knowledge required</td>
        </tr>
        <tr style="background: white;">
          <td style="padding: 12px; font-weight: 600; color: #22c55e;">PostgreSQL</td>
          <td style="padding: 12px;">Teams with SQL expertise</td>
          <td style="padding: 12px;">Familiar, transactional, JSONB support</td>
          <td style="padding: 12px;">Manual optimistic concurrency</td>
        </tr>
        <tr style="background: #f1f5f9;">
          <td style="padding: 12px; font-weight: 600; color: #f59e0b;">Apache Kafka</td>
          <td style="padding: 12px;">High-throughput streaming</td>
          <td style="padding: 12px;">Scalable, built-in pub/sub</td>
          <td style="padding: 12px;">No per-aggregate ordering guarantee</td>
        </tr>
        <tr style="background: white;">
          <td style="padding: 12px; font-weight: 600; color: #8b5cf6;">DynamoDB</td>
          <td style="padding: 12px;">Serverless, AWS ecosystem</td>
          <td style="padding: 12px;">Managed, scalable, streams for projections</td>
          <td style="padding: 12px;">25 item transaction limit</td>
        </tr>
        <tr style="background: #f1f5f9;">
          <td style="padding: 12px; font-weight: 600; color: #ec4899;">Marten (.NET)</td>
          <td style="padding: 12px;">.NET applications</td>
          <td style="padding: 12px;">PostgreSQL-backed, strong tooling</td>
          <td style="padding: 12px;">.NET specific</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

---

## Quick Reference Card

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Event Sourcing Cheat Sheet</h4>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div>
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Event Design Principles</div>
      <div style="font-size: 14px; color: #475569;">
        <div style="padding: 4px 0;">Events are past tense facts (OrderPlaced)</div>
        <div style="padding: 4px 0;">Include all data needed to understand the change</div>
        <div style="padding: 4px 0;">Events are immutable - never modify</div>
        <div style="padding: 4px 0;">Use domain language, not technical terms</div>
      </div>
    </div>

    <div>
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Event Store Technologies</div>
      <div style="font-size: 14px; color: #475569;">
        <div style="padding: 4px 0;"><strong>EventStoreDB:</strong> Purpose-built for ES</div>
        <div style="padding: 4px 0;"><strong>PostgreSQL:</strong> With append-only table</div>
        <div style="padding: 4px 0;"><strong>Kafka:</strong> As an event log</div>
        <div style="padding: 4px 0;"><strong>DynamoDB:</strong> With version attribute</div>
      </div>
    </div>

    <div>
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Performance Strategies</div>
      <div style="font-size: 14px; color: #475569;">
        <div style="padding: 4px 0;">Snapshots every N events (50-100)</div>
        <div style="padding: 4px 0;">Keep aggregates small</div>
        <div style="padding: 4px 0;">Parallel projection rebuilds</div>
        <div style="padding: 4px 0;">Archive old events to cold storage</div>
      </div>
    </div>

    <div>
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Consistency Patterns</div>
      <div style="font-size: 14px; color: #475569;">
        <div style="padding: 4px 0;"><strong>Optimistic concurrency:</strong> Version checks</div>
        <div style="padding: 4px 0;"><strong>Projections:</strong> Eventually consistent</div>
        <div style="padding: 4px 0;"><strong>Outbox pattern:</strong> Reliable publishing</div>
        <div style="padding: 4px 0;"><strong>Idempotency:</strong> Safe replay</div>
      </div>
    </div>
  </div>
</div>

---

## Related Topics

- [[CQRS Pattern]](/topic/design-patterns/cqrs) - Separating read and write models
- [[Message Queues]](/topic/system-design/message-queues) - Publishing events to subscribers
- [[Distributed Locking]](/topic/system-design/distributed-locking) - Concurrency control
- [[Saga Pattern]](/topic/design-patterns/saga) - Coordinating distributed transactions
- [[API Gateway]](/topic/system-design/api-gateway) - Aggregating read models
- [[Change Data Capture]](/topic/system-design/cdc) - Generating events from databases
- [[Microservices Event Strategies]](/topic/microservices/event-strategies) - Event-driven architecture patterns
