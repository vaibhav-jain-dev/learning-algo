# Distributed Locking

## Overview

Distributed locking is a mechanism that ensures only one process or node in a distributed system can access a shared resource at any given time. Think of it like a bathroom key at a coffee shop - only one person can use it at a time, and they must return it before someone else can enter.

In a single-machine environment, you can use mutexes or semaphores. But in distributed systems with multiple servers, you need a coordination mechanism that works across network boundaries while handling failures gracefully.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">THE DISTRIBUTED LOCKING CHALLENGE</div>
  <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; margin-bottom: 24px;">
    <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 20px; min-width: 200px; text-align: center; border: 1px solid #86efac;">
      <div style="color: #166534; font-weight: 600; font-size: 16px;">Local Lock</div>
      <div style="color: #15803d; font-size: 13px; margin-top: 8px;">Single point of truth</div>
      <div style="color: #22c55e; font-size: 12px; margin-top: 4px;">OS kernel manages it</div>
    </div>
    <div style="color: #6366f1; font-size: 32px; display: flex; align-items: center;">vs</div>
    <div style="background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%); border-radius: 12px; padding: 20px; min-width: 200px; text-align: center; border: 1px solid #f87171;">
      <div style="color: #991b1b; font-weight: 600; font-size: 16px;">Distributed Lock</div>
      <div style="color: #dc2626; font-size: 13px; margin-top: 8px;">No single source of truth</div>
      <div style="color: #ef4444; font-size: 12px; margin-top: 4px;">Network can partition</div>
    </div>
  </div>
  <div style="text-align: center; background: rgba(99, 102, 241, 0.1); border: 1px solid #6366f1; border-radius: 8px; padding: 12px;">
    <span style="color: #4338ca;">Requires <span style="color: #10b981; font-weight: 600;">consensus</span>, <span style="color: #10b981; font-weight: 600;">fencing tokens</span>, and <span style="color: #10b981; font-weight: 600;">TTL management</span></span>
  </div>
</div>

---

## Why This Matters

### Real Company Examples

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Companies Using Distributed Locking</h4>
  <div style="display: grid; gap: 16px;">
    <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #3b82f6;">
      <div style="color: #1e293b; font-weight: 600;">Uber - Ride Assignment</div>
      <div style="color: #475569; font-size: 14px; margin-top: 8px;">When a rider requests a pickup, Uber uses distributed locks to ensure only one driver is assigned to a ride. Without this, multiple drivers could accept the same ride causing confusion and wasted trips.</div>
    </div>
    <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #10b981;">
      <div style="color: #1e293b; font-weight: 600;">Stripe - Payment Processing</div>
      <div style="color: #475569; font-size: 14px; margin-top: 8px;">Stripe uses distributed locks to prevent double-charging customers. When processing a payment, a lock ensures the same transaction isn't processed twice even if the request is retried.</div>
    </div>
    <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
      <div style="color: #1e293b; font-weight: 600;">Amazon - Inventory Management</div>
      <div style="color: #475569; font-size: 14px; margin-top: 8px;">When the last item of a product is purchased, Amazon uses locks to prevent overselling. Multiple concurrent purchases must be serialized to maintain accurate inventory counts.</div>
    </div>
  </div>
</div>

**Key Use Cases:**
- **Preventing duplicate operations**: Ensuring idempotent processing of payments, orders, or emails
- **Leader election**: Choosing which node should perform scheduled tasks or coordinate activities
- **Resource coordination**: Managing access to shared files, database connections, or external APIs
- **Rate limiting enforcement**: Ensuring global rate limits across multiple servers

---

## Core Concepts Deep Dive

### The Safety vs Liveness Trade-off

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">LOCK PROPERTIES</div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px; border: 1px solid #93c5fd;">
      <div style="color: #1e40af; font-weight: 600; font-size: 16px; margin-bottom: 12px;">Safety Properties</div>
      <div style="color: #1e3a8a; font-size: 14px; line-height: 1.8;">
        <div><span style="color: #10b981; font-weight: 600;">Mutual Exclusion</span>: At most one client holds the lock</div>
        <div><span style="color: #10b981; font-weight: 600;">No Deadlock</span>: Locks eventually become available</div>
        <div><span style="color: #10b981; font-weight: 600;">Fault Tolerance</span>: System continues despite failures</div>
      </div>
    </div>
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; border: 1px solid #fcd34d;">
      <div style="color: #92400e; font-weight: 600; font-size: 16px; margin-bottom: 12px;">Liveness Properties</div>
      <div style="color: #78350f; font-size: 14px; line-height: 1.8;">
        <div><span style="color: #10b981; font-weight: 600;">Progress</span>: Requests eventually succeed or fail</div>
        <div><span style="color: #10b981; font-weight: 600;">Availability</span>: Lock service responds in bounded time</div>
        <div><span style="color: #10b981; font-weight: 600;">Fairness</span>: Requests processed in reasonable order</div>
      </div>
    </div>
  </div>
  <div style="margin-top: 20px; background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 8px; padding: 12px; text-align: center;">
    <span style="color: #991b1b;">Due to the [[CAP theorem]](/topic/system-design/cap-theorem), you cannot have perfect safety AND liveness during network partitions</span>
  </div>
</div>

### Fencing Tokens - The Critical Safety Mechanism

A <span style="color: #10b981; font-weight: 600;">fencing token</span> is a monotonically increasing number assigned to each lock acquisition. It's the only reliable way to prevent stale writes from expired lock holders.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">WHY FENCING TOKENS ARE ESSENTIAL</div>

  <div style="margin-bottom: 24px;">
    <div style="color: #dc2626; font-weight: 600; margin-bottom: 12px;">The Problem: GC Pause or Network Delay</div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #fee2e2; color: #991b1b; padding: 8px 16px; border-radius: 6px; min-width: 60px; text-align: center; font-family: monospace; font-size: 13px;">t0</div>
        <div style="color: #475569; font-size: 14px;">Client A acquires lock (token=33)</div>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #fee2e2; color: #991b1b; padding: 8px 16px; border-radius: 6px; min-width: 60px; text-align: center; font-family: monospace; font-size: 13px;">t1</div>
        <div style="color: #475569; font-size: 14px;">Client A pauses (GC, network delay, CPU starvation)</div>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #fee2e2; color: #991b1b; padding: 8px 16px; border-radius: 6px; min-width: 60px; text-align: center; font-family: monospace; font-size: 13px;">t2</div>
        <div style="color: #475569; font-size: 14px;">Lock expires (TTL reached)</div>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #fee2e2; color: #991b1b; padding: 8px 16px; border-radius: 6px; min-width: 60px; text-align: center; font-family: monospace; font-size: 13px;">t3</div>
        <div style="color: #475569; font-size: 14px;">Client B acquires lock (token=34), writes value=Y</div>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #fee2e2; color: #991b1b; padding: 8px 16px; border-radius: 6px; min-width: 60px; text-align: center; font-family: monospace; font-size: 13px;">t4</div>
        <div style="color: #dc2626; font-size: 14px; font-weight: 600;">Client A resumes, writes value=X (DATA CORRUPTION!)</div>
      </div>
    </div>
  </div>

  <div style="margin-bottom: 24px;">
    <div style="color: #16a34a; font-weight: 600; margin-bottom: 12px;">The Solution: Fencing Token Validation</div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #dcfce7; color: #166534; padding: 8px 16px; border-radius: 6px; min-width: 60px; text-align: center; font-family: monospace; font-size: 13px;">t4</div>
        <div style="color: #475569; font-size: 14px;">Client A tries to write with token=33</div>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #dcfce7; color: #166534; padding: 8px 16px; border-radius: 6px; min-width: 60px; text-align: center; font-family: monospace; font-size: 13px;">t4</div>
        <div style="color: #475569; font-size: 14px;">Storage has seen token=34 from Client B</div>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: #dcfce7; color: #166534; padding: 8px 16px; border-radius: 6px; min-width: 60px; text-align: center; font-family: monospace; font-size: 13px;">t4</div>
        <div style="color: #16a34a; font-size: 14px; font-weight: 600;">Storage REJECTS write (33 < 34 is stale)</div>
      </div>
    </div>
  </div>

  <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 8px; padding: 16px;">
    <div style="color: #065f46; font-weight: 600; margin-bottom: 8px;">Key Insight</div>
    <div style="color: #047857; font-size: 14px;">The resource (database, file system, API) must validate fencing tokens. The lock service alone cannot guarantee safety - the storage layer must participate in the protocol.</div>
  </div>
</div>

---

## Lock Timeout Strategies

<span style="color: #10b981; font-weight: 600;">Lock timeouts (TTL)</span> prevent deadlocks when lock holders crash, but choosing the right timeout is critical for both safety and performance.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">TTL STRATEGIES COMPARISON</div>

  <div style="display: grid; gap: 16px; margin-bottom: 24px;">
    <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px; border: 1px solid #93c5fd;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <div style="color: #1e40af; font-weight: 600; font-size: 16px;">Fixed TTL</div>
        <div style="background: #3b82f6; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">Simple</div>
      </div>
      <div style="color: #1e3a8a; font-size: 14px;">
        <div style="margin-bottom: 8px;">Lock expires after a fixed duration (e.g., 30 seconds)</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
          <div style="background: rgba(34, 197, 94, 0.2); padding: 8px; border-radius: 6px;">
            <span style="color: #166534;">Pros:</span> Simple to implement, predictable behavior
          </div>
          <div style="background: rgba(239, 68, 68, 0.2); padding: 8px; border-radius: 6px;">
            <span style="color: #991b1b;">Cons:</span> May expire during long operations
          </div>
        </div>
      </div>
    </div>

    <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 20px; border: 1px solid #86efac;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <div style="color: #166534; font-weight: 600; font-size: 16px;">Heartbeat Renewal</div>
        <div style="background: #22c55e; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">Recommended</div>
      </div>
      <div style="color: #14532d; font-size: 14px;">
        <div style="margin-bottom: 8px;">Client periodically extends lock TTL while holding it</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
          <div style="background: rgba(34, 197, 94, 0.2); padding: 8px; border-radius: 6px;">
            <span style="color: #166534;">Pros:</span> Supports long operations, adapts to actual duration
          </div>
          <div style="background: rgba(239, 68, 68, 0.2); padding: 8px; border-radius: 6px;">
            <span style="color: #991b1b;">Cons:</span> Requires background thread, adds complexity
          </div>
        </div>
      </div>
    </div>

    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; border: 1px solid #fcd34d;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <div style="color: #92400e; font-weight: 600; font-size: 16px;">Session-Based (ZooKeeper)</div>
        <div style="background: #f59e0b; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">Advanced</div>
      </div>
      <div style="color: #78350f; font-size: 14px;">
        <div style="margin-bottom: 8px;">Lock tied to client session with ephemeral nodes</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
          <div style="background: rgba(34, 197, 94, 0.2); padding: 8px; border-radius: 6px;">
            <span style="color: #166534;">Pros:</span> Automatic cleanup on disconnect, no manual TTL
          </div>
          <div style="background: rgba(239, 68, 68, 0.2); padding: 8px; border-radius: 6px;">
            <span style="color: #991b1b;">Cons:</span> Requires ZooKeeper, session management overhead
          </div>
        </div>
      </div>
    </div>
  </div>

  <div style="background: rgba(99, 102, 241, 0.1); border: 1px solid #6366f1; border-radius: 8px; padding: 16px;">
    <div style="color: #4338ca; font-weight: 600; margin-bottom: 8px;">TTL Formula</div>
    <div style="color: #4f46e5; font-size: 14px; font-family: monospace;">
      TTL = 2 * (expected_operation_time + max_network_latency + clock_drift_allowance)
    </div>
    <div style="color: #6366f1; font-size: 13px; margin-top: 8px;">
      Example: 5s operation + 100ms latency + 50ms drift = TTL of ~11 seconds minimum
    </div>
  </div>
</div>

---

## Deadlock Prevention Strategies

<span style="color: #10b981; font-weight: 600;">Deadlock</span> occurs when two or more processes are waiting for each other to release resources. In distributed systems, this is particularly dangerous because processes can't easily detect or recover from deadlocks.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">DEADLOCK PREVENTION ALGORITHMS</div>

  <div style="display: grid; gap: 20px;">
    <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px; border: 1px solid #93c5fd;">
      <div style="color: #1e40af; font-weight: 600; font-size: 16px; margin-bottom: 12px;">Wait-Die Scheme (Non-Preemptive)</div>
      <div style="color: #1e3a8a; font-size: 14px; line-height: 1.8;">
        <div style="margin-bottom: 8px;">Older transactions wait for younger ones; younger transactions abort (die) when requesting locks held by older ones.</div>
        <div style="background: white; border-radius: 8px; padding: 12px; margin-top: 12px; font-family: monospace; font-size: 13px;">
          <div style="color: #475569;">Transaction A (timestamp=100) holds Lock X</div>
          <div style="color: #475569;">Transaction B (timestamp=200) requests Lock X</div>
          <div style="color: #dc2626;">B is younger, so B DIES (aborts and retries)</div>
        </div>
      </div>
    </div>

    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; border: 1px solid #fcd34d;">
      <div style="color: #92400e; font-weight: 600; font-size: 16px; margin-bottom: 12px;">Wound-Wait Scheme (Preemptive)</div>
      <div style="color: #78350f; font-size: 14px; line-height: 1.8;">
        <div style="margin-bottom: 8px;">Older transactions preempt (wound) younger ones; younger transactions wait for older ones.</div>
        <div style="background: white; border-radius: 8px; padding: 12px; margin-top: 12px; font-family: monospace; font-size: 13px;">
          <div style="color: #475569;">Transaction B (timestamp=200) holds Lock X</div>
          <div style="color: #475569;">Transaction A (timestamp=100) requests Lock X</div>
          <div style="color: #dc2626;">A is older, so A WOUNDS B (B is forced to abort)</div>
        </div>
      </div>
    </div>

    <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 20px; border: 1px solid #86efac;">
      <div style="color: #166534; font-weight: 600; font-size: 16px; margin-bottom: 12px;">Timeout-Based Prevention</div>
      <div style="color: #14532d; font-size: 14px; line-height: 1.8;">
        <div style="margin-bottom: 8px;">If a lock request doesn't succeed within a timeout, assume deadlock and abort.</div>
        <div style="background: white; border-radius: 8px; padding: 12px; margin-top: 12px; font-family: monospace; font-size: 13px;">
          <div style="color: #475569;">Transaction A waits for Lock X for 5 seconds</div>
          <div style="color: #475569;">Timeout expires</div>
          <div style="color: #dc2626;">A aborts and retries with exponential backoff</div>
        </div>
      </div>
    </div>

    <div style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-radius: 12px; padding: 20px; border: 1px solid #c4b5fd;">
      <div style="color: #5b21b6; font-weight: 600; font-size: 16px; margin-bottom: 12px;">Lock Ordering (Prevention by Design)</div>
      <div style="color: #4c1d95; font-size: 14px; line-height: 1.8;">
        <div style="margin-bottom: 8px;">Always acquire locks in a globally consistent order to prevent circular waits.</div>
        <div style="background: white; border-radius: 8px; padding: 12px; margin-top: 12px; font-family: monospace; font-size: 13px;">
          <div style="color: #16a34a;">GOOD: Always acquire Lock A before Lock B</div>
          <div style="color: #dc2626;">BAD: Process 1 acquires A then B, Process 2 acquires B then A</div>
        </div>
      </div>
    </div>
  </div>
</div>

---

## Implementation Approaches

### Redlock Algorithm (Redis-Based)

<span style="color: #10b981; font-weight: 600;">Redlock</span> is a distributed lock algorithm that uses N independent Redis masters (typically 5) to achieve better safety guarantees than a single Redis instance.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">REDLOCK ALGORITHM FLOW</div>

  <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">1</div>
      <div style="flex: 1; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 10px; padding: 16px; border: 1px solid #93c5fd;">
        <div style="color: #1e40af; font-weight: 600;">Record Start Time</div>
        <div style="color: #3730a3; font-size: 13px; margin-top: 4px;">Get current time in milliseconds before attempting acquisition</div>
      </div>
    </div>

    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">2</div>
      <div style="flex: 1; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 10px; padding: 16px; border: 1px solid #93c5fd;">
        <div style="color: #1e40af; font-weight: 600;">Acquire on All N Instances</div>
        <div style="color: #3730a3; font-size: 13px; margin-top: 4px;">Try SET key random_value NX PX ttl on each Redis instance sequentially with small timeout</div>
      </div>
    </div>

    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">3</div>
      <div style="flex: 1; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 10px; padding: 16px; border: 1px solid #93c5fd;">
        <div style="color: #1e40af; font-weight: 600;">Calculate Elapsed Time</div>
        <div style="color: #3730a3; font-size: 13px; margin-top: 4px;">Subtract start time from current time to determine acquisition duration</div>
      </div>
    </div>

    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">4</div>
      <div style="flex: 1; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 10px; padding: 16px; border: 1px solid #93c5fd;">
        <div style="color: #1e40af; font-weight: 600;">Check Validity</div>
        <div style="color: #3730a3; font-size: 13px; margin-top: 4px;">Lock valid if: acquired on majority (N/2+1) AND (TTL - elapsed - drift) > 0</div>
      </div>
    </div>

    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">5</div>
      <div style="flex: 1; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 10px; padding: 16px; border: 1px solid #93c5fd;">
        <div style="color: #1e40af; font-weight: 600;">Handle Result</div>
        <div style="color: #3730a3; font-size: 13px; margin-top: 4px;">If failed, release lock on ALL instances; if succeeded, use remaining validity time</div>
      </div>
    </div>
  </div>

  <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <div style="color: #991b1b; font-weight: 600; margin-bottom: 8px;">Martin Kleppmann's Criticisms</div>
    <div style="color: #b91c1c; font-size: 14px; line-height: 1.8;">
      <div>1. Assumes bounded network delay and clock drift (not guaranteed in practice)</div>
      <div>2. GC pauses can still cause safety violations even with correct implementation</div>
      <div>3. No true consensus - it's a probabilistic guarantee, not a mathematical proof</div>
      <div>4. Fencing tokens still required for true safety (Redlock doesn't provide them natively)</div>
    </div>
  </div>

  <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 8px; padding: 16px;">
    <div style="color: #065f46; font-weight: 600; margin-bottom: 8px;">When Redlock is Appropriate</div>
    <div style="color: #047857; font-size: 14px; line-height: 1.8;">
      <div>Efficiency use cases: Preventing duplicate work (cron jobs, cache warming)</div>
      <div>Not for: Financial transactions, inventory management, anything requiring true mutual exclusion</div>
      <div>For true safety, use [[consensus algorithms]](/topic/system-design/consensus-algorithms) like Raft (etcd) or Zab (ZooKeeper)</div>
    </div>
  </div>
</div>

### ZooKeeper Locks (Consensus-Based)

<span style="color: #10b981; font-weight: 600;">ZooKeeper</span> provides distributed locking through <span style="color: #10b981; font-weight: 600;">ephemeral sequential znodes</span>, offering stronger guarantees than Redis-based approaches.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">ZOOKEEPER LOCK RECIPE</div>

  <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
    <div style="display: flex; align-items: flex-start; gap: 16px;">
      <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">1</div>
      <div style="flex: 1; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 10px; padding: 16px; border: 1px solid #86efac;">
        <div style="color: #166534; font-weight: 600;">Create Ephemeral Sequential Znode</div>
        <div style="color: #14532d; font-size: 13px; margin-top: 4px; font-family: monospace;">
          create -e -s /locks/resource-lock-<br>
          Result: /locks/resource-lock-0000000001
        </div>
      </div>
    </div>

    <div style="display: flex; align-items: flex-start; gap: 16px;">
      <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">2</div>
      <div style="flex: 1; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 10px; padding: 16px; border: 1px solid #86efac;">
        <div style="color: #166534; font-weight: 600;">Get All Children and Sort</div>
        <div style="color: #14532d; font-size: 13px; margin-top: 4px; font-family: monospace;">
          ls /locks<br>
          [resource-lock-0000000001, resource-lock-0000000002, ...]
        </div>
      </div>
    </div>

    <div style="display: flex; align-items: flex-start; gap: 16px;">
      <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">3</div>
      <div style="flex: 1; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 10px; padding: 16px; border: 1px solid #86efac;">
        <div style="color: #166534; font-weight: 600;">Check If Lowest Sequence</div>
        <div style="color: #14532d; font-size: 13px; margin-top: 4px;">
          If your znode has the lowest sequence number, you have the lock.<br>
          The sequence number serves as the <span style="color: #10b981; font-weight: 600;">fencing token</span>!
        </div>
      </div>
    </div>

    <div style="display: flex; align-items: flex-start; gap: 16px;">
      <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">4</div>
      <div style="flex: 1; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 10px; padding: 16px; border: 1px solid #86efac;">
        <div style="color: #166534; font-weight: 600;">Watch Previous Znode (If Not Lowest)</div>
        <div style="color: #14532d; font-size: 13px; margin-top: 4px;">
          Set a watch on the znode with the next-lower sequence number.<br>
          This creates a fair queue and avoids <span style="color: #10b981; font-weight: 600;">herd effect</span>.
        </div>
      </div>
    </div>

    <div style="display: flex; align-items: flex-start; gap: 16px;">
      <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">5</div>
      <div style="flex: 1; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 10px; padding: 16px; border: 1px solid #86efac;">
        <div style="color: #166534; font-weight: 600;">Release by Deleting Znode</div>
        <div style="color: #14532d; font-size: 13px; margin-top: 4px;">
          Delete your znode to release lock, or let session expire (ephemeral auto-cleanup)
        </div>
      </div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
    <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 8px; padding: 16px;">
      <div style="color: #065f46; font-weight: 600; margin-bottom: 8px;">Advantages</div>
      <div style="color: #047857; font-size: 13px; line-height: 1.8;">
        <div>Built-in fencing (sequence numbers)</div>
        <div>Automatic cleanup via ephemeral nodes</div>
        <div>Fair ordering (no starvation)</div>
        <div>Strong consistency (Zab consensus)</div>
      </div>
    </div>
    <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 8px; padding: 16px;">
      <div style="color: #991b1b; font-weight: 600; margin-bottom: 8px;">Disadvantages</div>
      <div style="color: #b91c1c; font-size: 13px; line-height: 1.8;">
        <div>Higher latency than Redis</div>
        <div>Operational complexity</div>
        <div>Session management overhead</div>
        <div>Requires ZooKeeper cluster</div>
      </div>
    </div>
  </div>
</div>

### Consensus-Based Locking (etcd/Raft)

<span style="color: #10b981; font-weight: 600;">etcd</span> uses the [[Raft consensus algorithm]](/topic/system-design/consensus-algorithms) to provide strongly consistent distributed locking through its lease mechanism.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">ETCD LOCK MECHANISM</div>

  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px;">
    <div style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-radius: 12px; padding: 20px; border: 1px solid #c4b5fd; text-align: center;">
      <div style="color: #5b21b6; font-weight: 600; font-size: 16px; margin-bottom: 8px;">Lease</div>
      <div style="color: #6d28d9; font-size: 13px;">TTL-based ownership with automatic cleanup on expiry</div>
    </div>
    <div style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-radius: 12px; padding: 20px; border: 1px solid #c4b5fd; text-align: center;">
      <div style="color: #5b21b6; font-weight: 600; font-size: 16px; margin-bottom: 8px;">Revision</div>
      <div style="color: #6d28d9; font-size: 13px;">Global monotonic counter acts as fencing token</div>
    </div>
    <div style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-radius: 12px; padding: 20px; border: 1px solid #c4b5fd; text-align: center;">
      <div style="color: #5b21b6; font-weight: 600; font-size: 16px; margin-bottom: 8px;">Watch</div>
      <div style="color: #6d28d9; font-size: 13px;">Efficient notification when lock becomes available</div>
    </div>
  </div>

  <div style="background: rgba(99, 102, 241, 0.1); border: 1px solid #6366f1; border-radius: 8px; padding: 16px;">
    <div style="color: #4338ca; font-weight: 600; margin-bottom: 8px;">etcd Lock Flow</div>
    <div style="color: #4f46e5; font-size: 14px; font-family: monospace; line-height: 2;">
      <div>1. Grant lease: etcdctl lease grant 30</div>
      <div>2. Create key with lease: put --lease=LEASE_ID /locks/mylock "client-id"</div>
      <div>3. Check if lowest revision (similar to ZK sequence)</div>
      <div>4. Keep-alive heartbeat to extend lease</div>
      <div>5. Revoke lease to release lock</div>
    </div>
  </div>
</div>

---

## Implementation

### Redis-Based Distributed Lock with Fencing

```python
import redis
import uuid
import time
from typing import Optional
from contextlib import contextmanager


class DistributedLock:
    """
    Redis-based distributed lock with fencing token support.

    WARNING: Single Redis instance is NOT safe for correctness-critical
    applications. Use Redlock or consensus-based systems for those cases.
    """

    def __init__(self, redis_client: redis.Redis, name: str, ttl_seconds: int = 30):
        self.redis = redis_client
        self.name = f"lock:{name}"
        self.fence_key = f"fence:{name}"
        self.ttl = ttl_seconds
        self.token = None
        self.fence_token = None

    def acquire(self, timeout: float = 10.0, retry_interval: float = 0.1) -> bool:
        """
        Attempt to acquire the lock with a timeout.

        Returns True if lock was acquired, False otherwise.
        """
        self.token = str(uuid.uuid4())
        deadline = time.time() + timeout

        while time.time() < deadline:
            # Try to acquire lock and get fencing token atomically
            acquired, fence = self._try_acquire()
            if acquired:
                self.fence_token = fence
                return True
            time.sleep(retry_interval)

        return False

    def _try_acquire(self) -> tuple[bool, Optional[int]]:
        """Attempt to acquire lock with atomic fencing token generation."""
        lua_script = """
        local lock_key = KEYS[1]
        local fence_key = KEYS[2]
        local token = ARGV[1]
        local ttl = tonumber(ARGV[2])

        -- Try to set the lock (only if not exists)
        local acquired = redis.call('SET', lock_key, token, 'NX', 'EX', ttl)

        if acquired then
            -- Increment and return fencing token
            local fence = redis.call('INCR', fence_key)
            return {1, fence}
        else
            return {0, 0}
        end
        """
        result = self.redis.eval(lua_script, 2, self.name, self.fence_key,
                                  self.token, self.ttl)
        return bool(result[0]), result[1] if result[0] else None

    def release(self) -> bool:
        """
        Release the lock only if we still own it.

        Uses compare-and-delete to prevent releasing someone else's lock.
        """
        if not self.token:
            return False

        lua_script = """
        local lock_key = KEYS[1]
        local expected_token = ARGV[1]

        local current_token = redis.call('GET', lock_key)
        if current_token == expected_token then
            redis.call('DEL', lock_key)
            return 1
        else
            return 0
        end
        """
        result = self.redis.eval(lua_script, 1, self.name, self.token)
        return bool(result)

    def extend(self, additional_seconds: int = None) -> bool:
        """Extend lock TTL if we still own it (heartbeat renewal)."""
        if not self.token:
            return False

        extension = additional_seconds or self.ttl

        lua_script = """
        local lock_key = KEYS[1]
        local expected_token = ARGV[1]
        local new_ttl = tonumber(ARGV[2])

        local current_token = redis.call('GET', lock_key)
        if current_token == expected_token then
            redis.call('EXPIRE', lock_key, new_ttl)
            return 1
        else
            return 0
        end
        """
        result = self.redis.eval(lua_script, 1, self.name, self.token, extension)
        return bool(result)

    def get_fence_token(self) -> Optional[int]:
        """Return the fencing token for this lock acquisition."""
        return self.fence_token

    @contextmanager
    def hold(self, timeout: float = 10.0):
        """Context manager for lock acquisition and release."""
        if not self.acquire(timeout=timeout):
            raise LockAcquisitionError(f"Could not acquire lock: {self.name}")
        try:
            yield self
        finally:
            self.release()


class LockAcquisitionError(Exception):
    """Raised when lock cannot be acquired within timeout."""
    pass


class FencedResource:
    """
    A resource that validates fencing tokens before accepting writes.

    This is the server-side component that prevents stale writes.
    """

    def __init__(self, db_connection):
        self.db = db_connection
        self.highest_token = {}  # resource_id -> highest_seen_token

    def write(self, resource_id: str, data: dict, fence_token: int) -> bool:
        """
        Write data only if fence_token is higher than any previously seen.

        This prevents writes from clients whose locks have expired.
        """
        current_highest = self.highest_token.get(resource_id, 0)

        if fence_token <= current_highest:
            raise StaleFenceTokenError(
                f"Token {fence_token} is stale. "
                f"Highest seen: {current_highest}"
            )

        # Perform the write
        self.db.execute(
            "UPDATE resources SET data = %s, fence_token = %s WHERE id = %s",
            (data, fence_token, resource_id)
        )

        self.highest_token[resource_id] = fence_token
        return True


class StaleFenceTokenError(Exception):
    """Raised when a write is attempted with a stale fencing token."""
    pass
```

### Redlock Implementation

```python
import redis
import uuid
import time
from typing import List, Optional


class RedlockLock:
    """
    Redlock algorithm implementation using multiple Redis instances.

    Provides better safety than single-node Redis by requiring
    a majority of nodes to agree on lock ownership.
    """

    CLOCK_DRIFT_FACTOR = 0.01  # 1% clock drift allowance

    def __init__(self, redis_clients: List[redis.Redis], name: str,
                 ttl_ms: int = 30000):
        if len(redis_clients) < 3:
            raise ValueError("Redlock requires at least 3 Redis instances")

        self.clients = redis_clients
        self.quorum = len(redis_clients) // 2 + 1
        self.name = f"lock:{name}"
        self.ttl_ms = ttl_ms
        self.token = None
        self.acquired_at = None

    def acquire(self, timeout_ms: int = 10000) -> bool:
        """
        Acquire lock using Redlock algorithm.

        Steps:
        1. Get current time
        2. Try to acquire lock on all N instances
        3. Calculate elapsed time
        4. Lock is acquired if majority acquired AND validity time > 0
        """
        self.token = str(uuid.uuid4())
        deadline = time.time() + (timeout_ms / 1000)

        while time.time() < deadline:
            start_time = time.time() * 1000
            acquired_count = 0

            # Try all instances
            for client in self.clients:
                if self._try_acquire_single(client):
                    acquired_count += 1

            # Calculate validity time
            elapsed_ms = (time.time() * 1000) - start_time
            drift_ms = self.ttl_ms * self.CLOCK_DRIFT_FACTOR
            validity_ms = self.ttl_ms - elapsed_ms - drift_ms

            if acquired_count >= self.quorum and validity_ms > 0:
                self.acquired_at = time.time()
                return True

            # Failed - release any acquired locks
            self._release_all()
            time.sleep(0.05)  # Small delay before retry

        return False

    def _try_acquire_single(self, client: redis.Redis) -> bool:
        """Try to acquire lock on a single Redis instance."""
        try:
            return client.set(self.name, self.token, nx=True, px=self.ttl_ms)
        except redis.RedisError:
            return False

    def release(self) -> bool:
        """Release lock on all instances."""
        if not self.token:
            return False
        self._release_all()
        self.token = None
        return True

    def _release_all(self):
        """Release lock on all Redis instances."""
        lua_script = """
        if redis.call("GET", KEYS[1]) == ARGV[1] then
            return redis.call("DEL", KEYS[1])
        else
            return 0
        end
        """
        for client in self.clients:
            try:
                client.eval(lua_script, 1, self.name, self.token)
            except redis.RedisError:
                pass  # Best effort release

    def validity_time_remaining_ms(self) -> float:
        """Get remaining validity time in milliseconds."""
        if not self.acquired_at:
            return 0
        elapsed = (time.time() - self.acquired_at) * 1000
        return max(0, self.ttl_ms - elapsed)
```

### ZooKeeper Lock Implementation

```python
from kazoo.client import KazooClient
from kazoo.recipe.lock import Lock
from typing import Optional
import threading


class ZooKeeperLock:
    """
    ZooKeeper-based distributed lock using ephemeral sequential nodes.

    Provides strong consistency guarantees through Zab consensus.
    The sequence number serves as a built-in fencing token.
    """

    def __init__(self, zk_hosts: str, lock_path: str):
        self.zk = KazooClient(hosts=zk_hosts)
        self.zk.start()
        self.lock_path = lock_path
        self.lock = Lock(self.zk, lock_path)
        self._sequence_number = None
        self._stop_event = threading.Event()

    def acquire(self, timeout: float = None, blocking: bool = True) -> bool:
        """
        Acquire the lock.

        The sequence number from the ephemeral znode serves as the
        fencing token - use get_fence_token() after acquiring.
        """
        try:
            acquired = self.lock.acquire(blocking=blocking, timeout=timeout)
            if acquired:
                # Extract sequence number from znode path
                self._sequence_number = self._extract_sequence_number()
            return acquired
        except Exception:
            return False

    def _extract_sequence_number(self) -> int:
        """Extract the sequence number from our lock znode."""
        # The lock's node path ends with a sequence number
        if self.lock.node:
            # Node name format: lock-0000000001
            parts = self.lock.node.split('-')
            if len(parts) >= 2:
                return int(parts[-1])
        return 0

    def release(self) -> bool:
        """Release the lock by deleting our ephemeral znode."""
        try:
            self.lock.release()
            self._sequence_number = None
            return True
        except Exception:
            return False

    def get_fence_token(self) -> Optional[int]:
        """
        Return the fencing token (sequence number) for this lock acquisition.

        ZooKeeper's sequential znodes provide a natural fencing token -
        the sequence number is globally ordered and monotonically increasing.
        """
        return self._sequence_number

    def __enter__(self):
        self.acquire()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.release()

    def close(self):
        """Clean up ZooKeeper connection."""
        self.zk.stop()
        self.zk.close()


# Example usage with automatic cleanup
def process_with_zk_lock(zk_hosts: str, resource_id: str, operation):
    """Process a resource with ZooKeeper-based distributed locking."""
    lock = ZooKeeperLock(zk_hosts, f"/locks/{resource_id}")

    try:
        with lock:
            fence_token = lock.get_fence_token()
            print(f"Acquired lock with fence token: {fence_token}")

            # Perform operation with fence token for safety
            result = operation(resource_id, fence_token)
            return result
    finally:
        lock.close()
```

### etcd Lock with Lease Management

```python
import etcd3
from typing import Optional
import threading
import time


class EtcdLock:
    """
    etcd-based distributed lock using leases.

    Provides strong consistency through Raft consensus.
    The revision number serves as a fencing token.
    """

    def __init__(self, etcd_client: etcd3.Etcd3Client, name: str, ttl: int = 30):
        self.client = etcd_client
        self.name = f"/locks/{name}"
        self.ttl = ttl
        self.lease = None
        self.revision = None
        self._keep_alive_thread = None
        self._stop_event = threading.Event()

    def acquire(self, timeout: float = 10.0) -> bool:
        """
        Acquire lock using etcd lease mechanism.

        Returns True if lock acquired, False on timeout.
        The revision number is stored as the fencing token.
        """
        deadline = time.time() + timeout

        while time.time() < deadline:
            # Create a new lease
            self.lease = self.client.lease(self.ttl)

            # Try to create the lock key with our lease
            success, responses = self.client.transaction(
                compare=[
                    self.client.transactions.version(self.name) == 0
                ],
                success=[
                    self.client.transactions.put(self.name, "locked", lease=self.lease)
                ],
                failure=[
                    self.client.transactions.get(self.name)
                ]
            )

            if success:
                # Get the revision for fencing
                _, metadata = self.client.get(self.name)
                self.revision = metadata.mod_revision

                # Start keep-alive thread
                self._start_keep_alive()
                return True

            # Lock exists - watch for deletion
            self._wait_for_lock(deadline)

        return False

    def _wait_for_lock(self, deadline: float):
        """Wait for the lock to be released using watch."""
        timeout = deadline - time.time()
        if timeout <= 0:
            return

        events_iterator, cancel = self.client.watch(self.name)

        try:
            for event in events_iterator:
                if isinstance(event, etcd3.events.DeleteEvent):
                    break
                if time.time() >= deadline:
                    break
        finally:
            cancel()

    def _start_keep_alive(self):
        """Start background thread to refresh lease."""
        self._stop_event.clear()
        self._keep_alive_thread = threading.Thread(target=self._keep_alive_loop)
        self._keep_alive_thread.daemon = True
        self._keep_alive_thread.start()

    def _keep_alive_loop(self):
        """Periodically refresh the lease."""
        while not self._stop_event.is_set():
            try:
                if self.lease:
                    self.lease.refresh()
            except Exception:
                break
            self._stop_event.wait(self.ttl / 3)

    def release(self) -> bool:
        """Release the lock by revoking the lease."""
        self._stop_event.set()

        if self.lease:
            try:
                self.lease.revoke()
            except Exception:
                pass
            self.lease = None

        self.revision = None
        return True

    def get_fence_token(self) -> Optional[int]:
        """
        Return the fencing token (revision number).

        etcd's revision is a global monotonically increasing counter,
        making it ideal for fencing.
        """
        return self.revision

    def __enter__(self):
        if not self.acquire():
            raise LockAcquisitionError(f"Could not acquire lock: {self.name}")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.release()
```

---

## Real-Life Failure Story

### The GitHub Outage (2012)

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">What Happened</h4>

  <div style="background: #fef2f2; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <div style="color: #991b1b; font-weight: 600;">The Incident</div>
    <div style="color: #7f1d1d; font-size: 14px; margin-top: 8px;">
      GitHub experienced data corruption during a routine database migration. Multiple processes simultaneously wrote to repositories because their distributed locking mechanism failed during a network partition between data centers.
    </div>
  </div>

  <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <div style="color: #1e293b; font-weight: 600;">Timeline</div>
    <div style="color: #475569; font-size: 14px; margin-top: 8px;">
      <div style="padding: 4px 0; border-bottom: 1px solid #e2e8f0;">2:00 AM - Network partition between US-East and US-West</div>
      <div style="padding: 4px 0; border-bottom: 1px solid #e2e8f0;">2:01 AM - Lock service in US-West can't reach US-East quorum</div>
      <div style="padding: 4px 0; border-bottom: 1px solid #e2e8f0;">2:02 AM - US-West decides locks have expired, grants new locks</div>
      <div style="padding: 4px 0; border-bottom: 1px solid #e2e8f0;">2:03 AM - Network heals, both DCs have active writers</div>
      <div style="padding: 4px 0;">2:15 AM - Data corruption detected, service halted</div>
    </div>
  </div>

  <div style="background: #ecfdf5; border-radius: 8px; padding: 16px;">
    <div style="color: #065f46; font-weight: 600;">How They Fixed It</div>
    <div style="color: #047857; font-size: 14px; margin-top: 8px;">
      <div>1. Implemented <span style="color: #10b981; font-weight: 600;">fencing tokens</span> on all write operations</div>
      <div>2. Moved to a consensus-based lock service (based on Raft)</div>
      <div>3. Added write barriers that validate lock ownership before persisting</div>
      <div>4. Introduced operation <span style="color: #10b981; font-weight: 600;">idempotency</span> with request deduplication</div>
    </div>
  </div>
</div>

---

## Interview Questions - 3-Level Deep Dive

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

### Q1: What's the difference between Redis SETNX and a proper distributed lock?

**Level 1 Answer:**
SETNX (SET if Not eXists) is just an atomic set-if-not-exists operation. A proper distributed lock requires additional mechanisms: <span style="color: #10b981; font-weight: 600;">ownership tracking</span> (unique token), <span style="color: #10b981; font-weight: 600;">TTL for safety</span>, <span style="color: #10b981; font-weight: 600;">atomic release</span> (compare-and-delete), and <span style="color: #10b981; font-weight: 600;">fencing tokens</span>.

<div style="background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; padding: 12px; margin: 12px 0;">

**Level 2 Follow-up: Why isn't SETNX with an expiry sufficient?**

Even with SETNX + EXPIRE (or SET NX EX), you face the <span style="color: #10b981; font-weight: 600;">"pausing problem"</span>: if Client A acquires a lock, then experiences a long GC pause or network delay, the lock expires. Client B acquires the lock and starts working. When Client A resumes, it doesn't know its lock expired and continues operating, causing data corruption.

<div style="background: rgba(99, 102, 241, 0.1); border-left: 3px solid #6366f1; padding: 12px; margin: 12px 0;">

**Level 3 Follow-up: How do fencing tokens solve this, and why must the storage validate them?**

<span style="color: #10b981; font-weight: 600;">Fencing tokens</span> are monotonically increasing numbers assigned with each lock acquisition. Client A gets token=33, Client B gets token=34. The storage layer tracks the highest token seen per resource. When Client A tries to write with token=33 after Client B wrote with token=34, the storage rejects it (33 < 34 is stale).

The storage must validate tokens because the lock service cannot prevent a client from attempting operations after its lock expires - by the time the client acts, the lock service has already moved on. Only the storage, which is the ultimate destination of writes, can enforce this safety check.

This is why distributed locks require cooperation between lock service AND storage - neither can provide safety alone. Systems like [[ZooKeeper]](/topic/system-design/consensus-algorithms) provide built-in fencing via sequential znode numbers, while Redis requires manual implementation.

</div>
</div>
</div>

---

### Q2: Explain the Redlock algorithm and its criticisms. When should you use it?

**Level 1 Answer:**
Redlock acquires locks on N independent Redis masters (typically 5), requiring a <span style="color: #10b981; font-weight: 600;">majority (N/2 + 1)</span> to succeed within a validity period. This provides better safety than single-node Redis because data must be lost on multiple independent machines for the lock to be violated.

<div style="background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; padding: 12px; margin: 12px 0;">

**Level 2 Follow-up: What are Martin Kleppmann's specific criticisms?**

Kleppmann's analysis identified several fundamental issues:

1. **Timing assumptions**: Redlock assumes bounded network delay and clock drift, but in real systems these can be arbitrarily long (GC pauses, VM migrations, network congestion).

2. **No fencing tokens**: Redlock doesn't natively provide fencing tokens, so even correct implementation is vulnerable to the pausing problem.

3. **Not true consensus**: Unlike Raft or Paxos, Redlock doesn't have formal safety proofs. It's a probabilistic guarantee based on independence assumptions that may not hold.

4. **Clock synchronization**: The algorithm requires reasonably synchronized clocks across Redis instances, but clock drift in distributed systems is notoriously difficult to bound.

<div style="background: rgba(99, 102, 241, 0.1); border-left: 3px solid #6366f1; padding: 12px; margin: 12px 0;">

**Level 3 Follow-up: Given these criticisms, what's Redlock actually good for?**

Redlock is appropriate for <span style="color: #10b981; font-weight: 600;">efficiency use cases</span> where occasional duplicate processing is tolerable:

- **Cron job deduplication**: Preventing a scheduled job from running on multiple servers (if it runs twice occasionally, no disaster)
- **Cache warming**: Ensuring only one server rebuilds a cache entry
- **Rate limiting**: Approximate global rate limits where occasional over-limit is acceptable

For <span style="color: #10b981; font-weight: 600;">correctness use cases</span> where duplicate processing causes data corruption or financial loss:
- Use [[consensus-based systems]](/topic/system-design/consensus-algorithms): etcd (Raft), ZooKeeper (Zab)
- Always implement fencing tokens validated by the storage layer
- Consider whether you can redesign to use [[optimistic concurrency]](/topic/system-design/database-replication) or [[event sourcing]](/topic/system-design/event-sourcing) instead

</div>
</div>
</div>

---

### Q3: How does ZooKeeper implement distributed locks differently from Redis?

**Level 1 Answer:**
ZooKeeper uses <span style="color: #10b981; font-weight: 600;">ephemeral sequential znodes</span> backed by the Zab consensus protocol. Clients create an ephemeral znode with a sequence number, then check if they have the lowest number. The lock automatically releases when the session disconnects, and the sequence number serves as a natural fencing token.

<div style="background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; padding: 12px; margin: 12px 0;">

**Level 2 Follow-up: What's the "herd effect" and how does ZooKeeper's lock recipe avoid it?**

The <span style="color: #10b981; font-weight: 600;">herd effect</span> (or "thundering herd") occurs when all waiting clients wake up simultaneously when a lock is released, causing a spike in traffic and contention.

ZooKeeper's lock recipe avoids this elegantly: instead of all clients watching the lock key, each client watches only the znode with the next-lower sequence number. When a lock is released:
- Only the client watching that specific znode wakes up
- That client is already next in line and acquires the lock
- Other clients remain sleeping, waiting for their predecessor

This creates a <span style="color: #10b981; font-weight: 600;">fair queue</span> with O(1) notifications per release instead of O(n).

<div style="background: rgba(99, 102, 241, 0.1); border-left: 3px solid #6366f1; padding: 12px; margin: 12px 0;">

**Level 3 Follow-up: What happens if a ZooKeeper client experiences a network partition while holding a lock?**

When a client is partitioned from ZooKeeper:

1. **Session timeout countdown**: ZooKeeper starts counting down the session timeout (typically 2-20 seconds configurable)

2. **If partition heals quickly**: Session survives, lock retained, no issue

3. **If partition persists past timeout**:
   - ZooKeeper deletes all ephemeral znodes for that session
   - Lock is released automatically
   - Next client in queue acquires the lock
   - When original client reconnects, it discovers its session is dead

4. **The critical safety insight**: During the partition, the client might still be doing work thinking it has the lock. This is why fencing tokens (the sequence number) are essential - operations must include the sequence number so the storage can reject stale writes.

The key difference from Redis: ZooKeeper's consensus protocol ensures all clients see a consistent view of lock ownership. There's no window where two clients can both believe they hold the lock (unlike Redlock during certain failure modes).

</div>
</div>
</div>

---

### Q4: How would you implement leader election using distributed locks?

**Level 1 Answer:**
Leader election is a special case of distributed locking where one node holds the "leader" lock. The basic pattern: try to acquire a lock with TTL, if successful you're the leader. Use heartbeat renewal to extend the lock while performing leader duties. If you lose the lock, stop leader activities immediately.

<div style="background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; padding: 12px; margin: 12px 0;">

**Level 2 Follow-up: How do you handle the case where a leader loses its lock but doesn't realize it?**

This is the <span style="color: #10b981; font-weight: 600;">split-brain problem</span>. Several strategies:

1. **Fencing tokens on all leader operations**: Every action the leader takes must include its epoch number (fencing token). Followers and storage reject operations from stale epochs.

2. **Pre-vote confirmation**: Before taking action, verify you still hold the lock (though this has a TOCTOU race)

3. **Lease-based design**: Structure operations so that anything started must complete within the lease time, with no lingering effects beyond the lease

4. **Idempotent operations**: Design leader operations to be safely re-executed, so duplicate leadership is harmless

<div style="background: rgba(99, 102, 241, 0.1); border-left: 3px solid #6366f1; padding: 12px; margin: 12px 0;">

**Level 3 Follow-up: How does Raft handle leader election, and why is it more robust than lock-based approaches?**

Raft leader election differs fundamentally from lock-based approaches:

1. **Term numbers as epochs**: Each election increments the term. All messages include the term, and nodes reject messages from old terms. This is built into every operation, not just leadership acquisition.

2. **Voting with log comparison**: A node only votes for candidates whose log is at least as up-to-date as its own. This prevents electing leaders with missing data.

3. **Majority requirement**: A leader must continuously communicate with a majority. If it can only reach a minority (network partition), it knows it might not be the real leader and stops accepting writes.

4. **No external coordination**: Raft is self-contained - nodes coordinate directly without a separate lock service. The consensus mechanism IS the lock.

5. **Automatic step-down**: If a leader discovers a higher term exists, it immediately becomes a follower. There's no window where two nodes think they're leader.

For critical systems like databases (CockroachDB, TiDB) or coordination services (etcd, Consul), this built-in leader election is far more robust than bolting on a separate lock service.

</div>
</div>
</div>

---

### Q5: When should you NOT use distributed locking?

**Level 1 Answer:**
Avoid distributed locks when: <span style="color: #10b981; font-weight: 600;">optimistic concurrency</span> works (use version numbers), operations can be made <span style="color: #10b981; font-weight: 600;">idempotent</span>, data can be partitioned to avoid cross-shard coordination, or when [[event sourcing]](/topic/system-design/event-sourcing) can eliminate conflicts entirely.

<div style="background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; padding: 12px; margin: 12px 0;">

**Level 2 Follow-up: Explain how optimistic concurrency control compares to distributed locking.**

<span style="color: #10b981; font-weight: 600;">Optimistic Concurrency Control (OCC)</span> assumes conflicts are rare and detects them at write time rather than preventing them upfront:

| Aspect | Distributed Locking | OCC |
|--------|-------------------|-----|
| Philosophy | Pessimistic - prevent conflicts | Optimistic - detect conflicts |
| Contention handling | Block waiting | Retry on conflict |
| Read performance | Locks may block reads | Reads never blocked |
| Write performance | Guaranteed success if locked | May need retries |
| Scalability | Limited by lock service | Better horizontal scaling |
| Implementation | External coordination required | Version column in database |

OCC works well when:
- Read-heavy workloads (no lock overhead on reads)
- Low conflict rate (few retries needed)
- Short transactions (less chance of conflict)

<div style="background: rgba(99, 102, 241, 0.1); border-left: 3px solid #6366f1; padding: 12px; margin: 12px 0;">

**Level 3 Follow-up: What about CRDTs? When would they replace both locking and OCC?**

<span style="color: #10b981; font-weight: 600;">CRDTs (Conflict-free Replicated Data Types)</span> eliminate coordination entirely by making all operations commutative:

**How CRDTs work:**
- Data structures designed so concurrent updates merge automatically
- No locks, no conflicts, no coordination needed
- Examples: G-Counter (grow-only counter), LWW-Register (last-write-wins), OR-Set (observed-remove set)

**When to use CRDTs:**
- Multi-master replication where all replicas accept writes
- Offline-first applications needing eventual sync
- Collaborative editing (like Google Docs)
- High-availability systems that can't afford coordination latency

**Trade-offs:**
- Limited operation types (can't do arbitrary read-modify-write)
- Eventually consistent (no linearizability)
- Memory overhead for tracking causality
- Some operations impossible (like strong decrement on counter)

**Real-world example**: Rather than using locks for "like" counts, use a G-Counter CRDT. Each server maintains its own count, and counts merge by taking the max per server. You get approximate real-time counts with zero coordination, perfect for social media scale.

The hierarchy of preference:
1. Design to not need coordination (CRDTs, idempotency)
2. Use optimistic concurrency (version numbers)
3. Use distributed locking (when neither above works)

</div>
</div>
</div>

---

### Q6: How do you choose the right TTL for a distributed lock?

**Level 1 Answer:**
TTL should be long enough to complete the protected operation, but short enough to recover from failures quickly. A common formula: TTL = 2-3x expected operation time, accounting for network latency and clock drift.

<div style="background: rgba(59, 130, 246, 0.1); border-left: 3px solid #3b82f6; padding: 12px; margin: 12px 0;">

**Level 2 Follow-up: What happens if your operation takes longer than expected?**

If an operation exceeds TTL, you have several options:

1. **Heartbeat renewal**: Background thread extends TTL periodically (e.g., every TTL/3). But if the renewal fails (network issue), you must immediately stop work.

2. **Validity checking**: Before each step, check remaining validity time. If insufficient for next step, abort and retry.

3. **Staged locking**: Break operation into stages, acquire/release locks for each stage instead of one long lock.

4. **Timeout on operation**: Set operation timeout to less than lock TTL, fail fast if exceeded.

The critical insight: if your lock expires, you MUST stop working immediately. Any work after expiry is unsafe unless protected by fencing tokens.

<div style="background: rgba(99, 102, 241, 0.1); border-left: 3px solid #6366f1; padding: 12px; margin: 12px 0;">

**Level 3 Follow-up: How do you handle GC pauses that can be longer than any reasonable TTL?**

GC pauses (especially in Java) can be hundreds of milliseconds to seconds, making any TTL-based safety guarantee questionable. Strategies:

1. **Fencing tokens are mandatory**: Since you can't prevent GC pauses, ensure the storage layer rejects stale operations. This is your only true safety guarantee.

2. **GC tuning**: Use low-pause collectors (G1, ZGC, Shenandoah), tune heap sizes, avoid full GCs in production.

3. **Pre-operation validation**: After any potentially-pausing operation (like memory allocation), check lock validity before proceeding.

4. **Containerized resource limits**: In Kubernetes, set memory limits to prevent JVM from competing with other processes, reducing GC pressure.

5. **Consider non-GC languages**: For latency-critical lock holders, Rust or Go (with shorter GC pauses) may be more appropriate than Java.

6. **Design for idempotency**: Accept that safety violations might occur, but design operations so that duplicate execution is harmless.

The philosophical point: in distributed systems, you can't achieve perfect safety. You minimize risk through defense-in-depth: TTLs, fencing tokens, idempotency, and careful operation design. Assuming any single mechanism is sufficient leads to production incidents.

</div>
</div>
</div>

</div>

---

## Common Mistakes

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Distributed Locking Anti-Patterns</h4>

  <div style="display: grid; gap: 12px;">
    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Using locks without TTL</div>
      <div style="color: #7f1d1d; font-size: 14px;">If the lock holder crashes, the lock is held forever. Always set a TTL and handle lock expiration gracefully.</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Releasing locks unconditionally</div>
      <div style="color: #7f1d1d; font-size: 14px;">Always use compare-and-delete. Otherwise, you might release a lock that another client acquired after yours expired.</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Ignoring fencing tokens</div>
      <div style="color: #7f1d1d; font-size: 14px;">The lock alone doesn't guarantee safety. Resources must validate fencing tokens to reject stale writes from expired locks.</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Single Redis node for critical operations</div>
      <div style="color: #7f1d1d; font-size: 14px;">Redis failover can cause lock data loss. Use Redlock with multiple masters or consensus-based systems for true safety.</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Lock contention as a design pattern</div>
      <div style="color: #7f1d1d; font-size: 14px;">If many clients are waiting for the same lock, your system will be slow. Redesign to reduce contention through partitioning or different patterns.</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Holding locks during external calls</div>
      <div style="color: #7f1d1d; font-size: 14px;">Network calls can take unpredictably long. Keep critical sections short and release locks before calling external services.</div>
    </div>

    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 0 8px 8px 0;">
      <div style="color: #991b1b; font-weight: 600;">Not monitoring lock acquisition time</div>
      <div style="color: #7f1d1d; font-size: 14px;">High lock acquisition latency indicates contention. Monitor P99 acquisition times and alert when they exceed thresholds.</div>
    </div>
  </div>
</div>

---

## Quick Reference Card

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">DISTRIBUTED LOCKING CHEAT SHEET</div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div>
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 12px; font-size: 15px;">Lock Service Comparison</div>
      <div style="font-size: 13px; color: #475569; line-height: 1.8;">
        <div style="padding: 4px 0;"><span style="color: #10b981; font-weight: 600;">Redis (single)</span>: Fast, simple, NOT safe for correctness</div>
        <div style="padding: 4px 0;"><span style="color: #10b981; font-weight: 600;">Redlock</span>: Better safety, requires 5+ nodes, efficiency only</div>
        <div style="padding: 4px 0;"><span style="color: #10b981; font-weight: 600;">ZooKeeper</span>: Strong consistency, built-in fencing, complex ops</div>
        <div style="padding: 4px 0;"><span style="color: #10b981; font-weight: 600;">etcd</span>: Raft consensus, Kubernetes native, lease-based</div>
      </div>
    </div>

    <div>
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 12px; font-size: 15px;">TTL Guidelines</div>
      <div style="font-size: 13px; color: #475569; line-height: 1.8;">
        <div style="padding: 4px 0;"><span style="color: #10b981; font-weight: 600;">Formula</span>: TTL = 2x (operation + latency + drift)</div>
        <div style="padding: 4px 0;"><span style="color: #10b981; font-weight: 600;">Short ops</span>: 10-30 seconds</div>
        <div style="padding: 4px 0;"><span style="color: #10b981; font-weight: 600;">Long ops</span>: Use heartbeat extension</div>
        <div style="padding: 4px 0;"><span style="color: #10b981; font-weight: 600;">Extension interval</span>: TTL / 3</div>
      </div>
    </div>

    <div>
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 12px; font-size: 15px;">Safety Checklist</div>
      <div style="font-size: 13px; color: #475569; line-height: 1.8;">
        <div style="padding: 4px 0;">Unique token per acquisition</div>
        <div style="padding: 4px 0;">TTL on all locks</div>
        <div style="padding: 4px 0;">Compare-and-delete on release</div>
        <div style="padding: 4px 0;">Fencing tokens validated by resources</div>
        <div style="padding: 4px 0;">Majority quorum for critical ops</div>
      </div>
    </div>

    <div>
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 12px; font-size: 15px;">Alternatives to Locks</div>
      <div style="font-size: 13px; color: #475569; line-height: 1.8;">
        <div style="padding: 4px 0;"><span style="color: #10b981; font-weight: 600;">Optimistic locking</span>: Version numbers, ETags</div>
        <div style="padding: 4px 0;"><span style="color: #10b981; font-weight: 600;">Idempotency</span>: Unique request IDs</div>
        <div style="padding: 4px 0;"><span style="color: #10b981; font-weight: 600;">Event sourcing</span>: Append-only logs</div>
        <div style="padding: 4px 0;"><span style="color: #10b981; font-weight: 600;">CRDTs</span>: Conflict-free data types</div>
      </div>
    </div>
  </div>

  <div style="margin-top: 24px; background: rgba(99, 102, 241, 0.1); border: 1px solid #6366f1; border-radius: 8px; padding: 16px;">
    <div style="color: #4338ca; font-weight: 600; margin-bottom: 8px;">Decision Tree</div>
    <div style="color: #4f46e5; font-size: 13px; line-height: 1.8;">
      <div>1. Can you avoid coordination? -> Use CRDTs or idempotent design</div>
      <div>2. Is conflict rate low? -> Use optimistic concurrency</div>
      <div>3. Is this efficiency-only? -> Redlock is acceptable</div>
      <div>4. Is correctness critical? -> Use ZooKeeper/etcd + fencing tokens</div>
    </div>
  </div>
</div>

---

## Related Topics

- [[Consensus Algorithms]](/topic/system-design/consensus-algorithms) - Raft, Paxos, Zab for true safety guarantees
- [[Database Sharding]](/topic/system-design/database-sharding) - Partitioning to reduce lock contention
- [[Event Sourcing]](/topic/system-design/event-sourcing) - Lock-free alternative pattern
- [[CAP Theorem]](/topic/system-design/cap-theorem) - Understanding consistency trade-offs
- [[Database Replication]](/topic/system-design/database-replication) - Optimistic concurrency and versioning
- [[Rate Limiting]](/topic/system-design/rate-limiting) - Global limits using distributed coordination
