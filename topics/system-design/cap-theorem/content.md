# CAP Theorem

## Overview

The CAP Theorem is one of the most fundamental concepts in distributed systems design. Proposed by computer scientist Eric Brewer in 2000 and later proven by Seth Gilbert and Nancy Lynch, it states that a distributed data store can only provide two out of three guarantees simultaneously: Consistency, Availability, and Partition Tolerance.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 20px; font-weight: 600;">THE CAP THEOREM</h3>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
    <div style="display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;">
      <div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 140px;">
        <div style="color: #166534; font-weight: 700; font-size: 16px;">Consistency</div>
        <div style="color: #15803d; font-size: 12px; margin-top: 4px;">Every read gets latest write</div>
      </div>
      <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 140px;">
        <div style="color: #1e40af; font-weight: 700; font-size: 16px;">Availability</div>
        <div style="color: #1d4ed8; font-size: 12px; margin-top: 4px;">Every request gets response</div>
      </div>
      <div style="background: #f3e8ff; border: 2px solid #a855f7; border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 140px;">
        <div style="color: #6b21a8; font-weight: 700; font-size: 16px;">Partition Tolerance</div>
        <div style="color: #7c3aed; font-size: 12px; margin-top: 4px;">Works despite network splits</div>
      </div>
    </div>
    <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 12px 24px; margin-top: 8px;">
      <span style="color: #92400e; font-weight: 600;">Key Insight: You can only pick TWO!</span>
    </div>
  </div>
</div>

**The Simple Explanation**: Imagine you have data stored on multiple servers across the world. When a network cable gets cut between two data centers (a "partition"), you face a choice: either refuse some requests to keep data consistent, or accept requests but risk serving stale data. You cannot have both perfect consistency AND perfect availability when networks fail.

---

## Why It Matters: Real Company Examples

Understanding CAP Theorem is crucial because it drives fundamental architecture decisions at every major tech company:

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">REAL-WORLD CAP DECISIONS</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
    <div style="background: #ecfdf5; border-radius: 12px; padding: 20px; border-left: 4px solid #10b981;">
      <div style="color: #065f46; font-weight: 700; margin-bottom: 8px;">Amazon DynamoDB (AP)</div>
      <div style="color: #047857; font-size: 13px;">Shopping carts prioritize availability - a customer should always be able to add items, even if it means briefly seeing stale inventory counts.</div>
    </div>
    <div style="background: #eff6ff; border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6;">
      <div style="color: #1e40af; font-weight: 700; margin-bottom: 8px;">Google Spanner (CP)</div>
      <div style="color: #1d4ed8; font-size: 13px;">Bank transactions require strong consistency - you can never show incorrect balance, even if it means briefly rejecting requests.</div>
    </div>
    <div style="background: #fef3c7; border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 700; margin-bottom: 8px;">Netflix (AP)</div>
      <div style="color: #b45309; font-size: 13px;">Video recommendations can be stale for a few seconds - availability matters more than showing the absolutely latest suggestions.</div>
    </div>
    <div style="background: #fce7f3; border-radius: 12px; padding: 20px; border-left: 4px solid #ec4899;">
      <div style="color: #9d174d; font-weight: 700; margin-bottom: 8px;">Stripe (CP)</div>
      <div style="color: #be185d; font-size: 13px;">Payment processing demands consistency - double-charging a customer is unacceptable, so reject requests if uncertain.</div>
    </div>
  </div>
</div>

**Interview Insight**: Companies often ask "how would you design X?" The CAP theorem is usually the first design decision you need to articulate. Should your system prioritize never losing data (CP) or always being responsive (AP)?

---

## How It Works: The Three Guarantees

### Consistency (C)

All nodes see the same data at the same time. After a successful write, every subsequent read from any node returns that value.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 16px; font-weight: 600;">STRONG CONSISTENCY</h3>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
    <div style="color: #1e293b; font-size: 14px;">Client writes <span style="color: #16a34a; font-weight: 600;">balance = $100</span></div>
    <div style="color: #64748b; font-size: 24px;">|</div>
    <div style="display: flex; align-items: center; gap: 32px; flex-wrap: wrap; justify-content: center;">
      <div style="background: #dcfce7; padding: 16px 24px; border-radius: 10px; text-align: center; border: 2px solid #22c55e;">
        <div style="color: #166534; font-weight: 600;">Node A</div>
        <div style="color: #15803d; font-size: 14px;">$100</div>
      </div>
      <div style="color: #3b82f6; font-size: 14px;">sync</div>
      <div style="background: #dcfce7; padding: 16px 24px; border-radius: 10px; text-align: center; border: 2px solid #22c55e;">
        <div style="color: #166534; font-weight: 600;">Node B</div>
        <div style="color: #15803d; font-size: 14px;">$100</div>
      </div>
      <div style="color: #3b82f6; font-size: 14px;">sync</div>
      <div style="background: #dcfce7; padding: 16px 24px; border-radius: 10px; text-align: center; border: 2px solid #22c55e;">
        <div style="color: #166534; font-weight: 600;">Node C</div>
        <div style="color: #15803d; font-size: 14px;">$100</div>
      </div>
    </div>
    <div style="background: #dcfce7; border-radius: 8px; padding: 12px 20px; margin-top: 8px;">
      <span style="color: #166534; font-weight: 600;">Result: Any node you read from shows $100</span>
    </div>
  </div>
</div>

### Availability (A)

Every request to a non-failing node receives a response (success or failure), without guarantee that it contains the most recent write.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 16px; font-weight: 600;">HIGH AVAILABILITY</h3>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 500px; margin: 0 auto;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="background: #dbeafe; padding: 10px 16px; border-radius: 8px; color: #1e40af; font-weight: 600; min-width: 80px;">Client 1</div>
      <div style="color: #64748b;">--></div>
      <div style="background: #f1f5f9; padding: 10px 16px; border-radius: 8px; color: #475569;">Node A</div>
      <div style="color: #64748b;">--></div>
      <div style="background: #dcfce7; padding: 10px 16px; border-radius: 8px; color: #166534; font-weight: 600;">Response OK</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="background: #dbeafe; padding: 10px 16px; border-radius: 8px; color: #1e40af; font-weight: 600; min-width: 80px;">Client 2</div>
      <div style="color: #64748b;">--></div>
      <div style="background: #f1f5f9; padding: 10px 16px; border-radius: 8px; color: #475569;">Node B</div>
      <div style="color: #64748b;">--></div>
      <div style="background: #dcfce7; padding: 10px 16px; border-radius: 8px; color: #166534; font-weight: 600;">Response OK</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="background: #dbeafe; padding: 10px 16px; border-radius: 8px; color: #1e40af; font-weight: 600; min-width: 80px;">Client 3</div>
      <div style="color: #64748b;">--></div>
      <div style="background: #f1f5f9; padding: 10px 16px; border-radius: 8px; color: #475569;">Node C</div>
      <div style="color: #64748b;">--></div>
      <div style="background: #dcfce7; padding: 10px 16px; border-radius: 8px; color: #166534; font-weight: 600;">Response OK</div>
    </div>
  </div>
  <div style="background: #dbeafe; border-radius: 8px; padding: 12px 20px; margin-top: 16px; text-align: center;">
    <span style="color: #1e40af; font-weight: 600;">Result: Every request gets a response (may be stale)</span>
  </div>
</div>

### Partition Tolerance (P)

The system continues to operate despite arbitrary message loss or failure of part of the system. Network partitions are inevitable in distributed systems.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 16px; font-weight: 600;">NETWORK PARTITION</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap;">
    <div style="background: #dbeafe; padding: 20px 28px; border-radius: 12px; text-align: center; border: 2px solid #3b82f6;">
      <div style="color: #1e40af; font-weight: 700;">Data Center A</div>
      <div style="color: #3b82f6; font-size: 13px;">Nodes 1, 2, 3</div>
    </div>
    <div style="background: #fef2f2; border: 2px dashed #ef4444; padding: 12px 20px; border-radius: 8px;">
      <div style="color: #dc2626; font-weight: 700; font-size: 14px;">NETWORK SPLIT</div>
      <div style="color: #b91c1c; font-size: 11px;">Cannot communicate</div>
    </div>
    <div style="background: #f3e8ff; padding: 20px 28px; border-radius: 12px; text-align: center; border: 2px solid #a855f7;">
      <div style="color: #6b21a8; font-weight: 700;">Data Center B</div>
      <div style="color: #7c3aed; font-size: 13px;">Nodes 4, 5, 6</div>
    </div>
  </div>
  <div style="background: #fef3c7; border-radius: 8px; padding: 12px 20px; margin-top: 20px; text-align: center;">
    <span style="color: #92400e; font-weight: 600;">Partition Tolerant: Both sides keep serving requests</span>
  </div>
</div>

---

## The Trade-off: Why You Must Choose

In a distributed system, network partitions WILL happen. When they do, you face an impossible choice:

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">THE PARTITION DILEMMA</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
    <div style="background: #ecfdf5; border-radius: 12px; padding: 24px; border: 2px solid #10b981;">
      <div style="color: #065f46; font-weight: 700; font-size: 16px; margin-bottom: 12px;">OPTION 1: Choose Consistency (CP)</div>
      <div style="color: #047857; font-size: 14px; margin-bottom: 16px;">
        "I cannot confirm the other data center received this update..."<br><br>
        <span style="font-weight: 600;">"REJECT the request to avoid inconsistency!"</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px; font-size: 13px;">
        <span style="color: #166534;">+ Data always consistent</span>
        <span style="color: #dc2626;">- Some requests fail</span>
      </div>
    </div>
    <div style="background: #eff6ff; border-radius: 12px; padding: 24px; border: 2px solid #3b82f6;">
      <div style="color: #1e40af; font-weight: 700; font-size: 16px; margin-bottom: 12px;">OPTION 2: Choose Availability (AP)</div>
      <div style="color: #1d4ed8; font-size: 14px; margin-bottom: 16px;">
        "I'll accept the write locally and sync later..."<br><br>
        <span style="font-weight: 600;">"ACCEPT the request, deal with conflicts later!"</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px; font-size: 13px;">
        <span style="color: #166534;">+ All requests succeed</span>
        <span style="color: #dc2626;">- May return stale data</span>
      </div>
    </div>
  </div>
</div>

---

## System Classifications

### CP Systems (Consistency + Partition Tolerance)

These systems sacrifice availability during partitions. They use techniques like quorum consensus to ensure data consistency.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">CP SYSTEM: QUORUM CONSENSUS</h3>
  <div style="color: #64748b; text-align: center; margin-bottom: 20px; font-size: 13px;">5 nodes, quorum = 3 (majority required)</div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div style="background: #dcfce7; border-radius: 10px; padding: 20px;">
      <div style="color: #166534; font-weight: 600; margin-bottom: 12px;">Normal Operation</div>
      <div style="font-size: 13px; color: #15803d;">
        Write to Node A: ACK<br>
        Write to Node B: ACK<br>
        Write to Node C: ACK<br>
        <span style="font-weight: 600;">3/5 = Quorum reached = SUCCESS</span>
      </div>
    </div>
    <div style="background: #fef2f2; border-radius: 10px; padding: 20px;">
      <div style="color: #dc2626; font-weight: 600; margin-bottom: 12px;">During Partition</div>
      <div style="font-size: 13px; color: #b91c1c;">
        Write to Node A: ACK<br>
        Write to Node B: UNREACHABLE<br>
        Write to Node C: UNREACHABLE<br>
        <span style="font-weight: 600;">1/5 &lt; Quorum = REQUEST REJECTED</span>
      </div>
    </div>
  </div>
</div>

**Examples**: MongoDB (default config), HBase, Redis Cluster, Zookeeper, etcd, Consul

**Use Cases**: Banking transactions, inventory management, configuration management, leader election

### AP Systems (Availability + Partition Tolerance)

These systems sacrifice consistency during partitions. They accept writes on any available node and reconcile later.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">AP SYSTEM: EVENTUAL CONSISTENCY</h3>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <div style="color: #f59e0b; font-weight: 600; margin-bottom: 12px;">During Partition:</div>
      <div style="display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap;">
        <div style="text-align: center;">
          <div style="background: #dbeafe; padding: 14px 20px; border-radius: 8px; border: 2px solid #3b82f6;">
            <div style="color: #1e40af; font-weight: 600;">Node A</div>
            <div style="color: #3b82f6; font-size: 13px;">X = 10</div>
          </div>
          <div style="color: #166534; font-size: 12px; margin-top: 4px;">Write accepted!</div>
        </div>
        <div style="background: #fef2f2; border: 2px dashed #ef4444; padding: 8px 16px; border-radius: 6px;">
          <span style="color: #dc2626; font-weight: 600; font-size: 12px;">PARTITION</span>
        </div>
        <div style="text-align: center;">
          <div style="background: #fef2f2; padding: 14px 20px; border-radius: 8px; border: 2px solid #ef4444;">
            <div style="color: #dc2626; font-weight: 600;">Node B</div>
            <div style="color: #b91c1c; font-size: 13px;">X = 5 (stale)</div>
          </div>
          <div style="color: #b91c1c; font-size: 12px; margin-top: 4px;">Returns old value</div>
        </div>
      </div>
    </div>
    <div>
      <div style="color: #16a34a; font-weight: 600; margin-bottom: 12px;">After Partition Heals:</div>
      <div style="display: flex; align-items: center; justify-content: center; gap: 24px;">
        <div style="background: #dcfce7; padding: 14px 20px; border-radius: 8px; border: 2px solid #22c55e;">
          <div style="color: #166534; font-weight: 600;">Node A</div>
          <div style="color: #15803d; font-size: 13px;">X = 10</div>
        </div>
        <div style="color: #22c55e; font-size: 14px;">sync</div>
        <div style="background: #dcfce7; padding: 14px 20px; border-radius: 8px; border: 2px solid #22c55e;">
          <div style="color: #166534; font-weight: 600;">Node B</div>
          <div style="color: #15803d; font-size: 13px;">X = 10</div>
        </div>
      </div>
    </div>
  </div>
</div>

**Examples**: Cassandra, DynamoDB, CouchDB, Riak, Amazon S3

**Use Cases**: Shopping carts, social media feeds, session storage, analytics

---

## Code Examples

### Python - CP System with Quorum

```python
from typing import List, Optional, Any
from dataclasses import dataclass
import time

@dataclass
class VersionedValue:
    value: Any
    version: int
    timestamp: float

class CPDatabase:
    """Consistency + Partition Tolerance database simulation."""

    def __init__(self, nodes: List['Node'], quorum_size: int = None):
        self.nodes = nodes
        self.quorum = quorum_size or (len(nodes) // 2 + 1)

    def write(self, key: str, value: Any) -> bool:
        """Write requires quorum acknowledgment."""
        version = int(time.time() * 1000)
        acks = 0

        for node in self.nodes:
            try:
                if node.write(key, value, version):
                    acks += 1
            except NetworkError:
                continue  # Node unreachable

        if acks < self.quorum:
            raise UnavailableError(
                f"Cannot reach quorum: {acks}/{self.quorum} nodes responded"
            )
        return True

    def read(self, key: str) -> Any:
        """Read from quorum and return most recent value."""
        responses = []

        for node in self.nodes:
            try:
                response = node.read(key)
                if response:
                    responses.append(response)
            except NetworkError:
                continue

        if len(responses) < self.quorum:
            raise UnavailableError("Cannot reach read quorum")

        # Return value with highest version (most recent)
        latest = max(responses, key=lambda r: r.version)
        return latest.value
```

### Python - AP System with Eventual Consistency

```python
from dataclasses import dataclass, field
from typing import Dict, List, Any
import time

@dataclass
class VectorClock:
    """Track causality for conflict resolution."""
    clocks: Dict[str, int] = field(default_factory=dict)

    def increment(self, node_id: str):
        self.clocks[node_id] = self.clocks.get(node_id, 0) + 1

    def merge(self, other: 'VectorClock'):
        for node_id, count in other.clocks.items():
            self.clocks[node_id] = max(
                self.clocks.get(node_id, 0), count
            )

class APDatabase:
    """Availability + Partition Tolerance database simulation."""

    def __init__(self, node_id: str):
        self.node_id = node_id
        self.data: Dict[str, tuple] = {}  # key -> (value, vector_clock)
        self.clock = VectorClock()
        self.sync_queue: List[tuple] = []

    def write(self, key: str, value: Any) -> bool:
        """Always accept writes locally."""
        self.clock.increment(self.node_id)
        clock_copy = VectorClock(dict(self.clock.clocks))
        self.data[key] = (value, clock_copy)
        self.sync_queue.append((key, value, clock_copy))
        return True  # Always succeeds!

    def read(self, key: str) -> Any:
        """Always return local value (may be stale)."""
        if key in self.data:
            return self.data[key][0]
        return None  # Always responds!

    def receive_sync(self, key: str, value: Any, remote_clock: VectorClock):
        """Receive update from another node after partition heals."""
        self.clock.merge(remote_clock)

        if key not in self.data:
            self.data[key] = (value, remote_clock)
            return

        local_value, local_clock = self.data[key]

        # Last-write-wins conflict resolution
        if sum(remote_clock.clocks.values()) > sum(local_clock.clocks.values()):
            self.data[key] = (value, remote_clock)
```

### Go - Quorum-Based Read/Write

```go
package cap

import (
    "context"
    "errors"
    "sync"
    "time"
)

var ErrQuorumNotReached = errors.New("quorum not reached")

type QuorumStore struct {
    nodes       []*Node
    readQuorum  int
    writeQuorum int
}

func NewQuorumStore(nodes []*Node) *QuorumStore {
    n := len(nodes)
    return &QuorumStore{
        nodes:       nodes,
        readQuorum:  n/2 + 1,
        writeQuorum: n/2 + 1,
    }
}

func (qs *QuorumStore) Write(ctx context.Context, key, value string) error {
    version := time.Now().UnixNano()

    var wg sync.WaitGroup
    var mu sync.Mutex
    acks := 0

    for _, node := range qs.nodes {
        wg.Add(1)
        go func(n *Node) {
            defer wg.Done()
            if err := n.Write(ctx, key, value, version); err == nil {
                mu.Lock()
                acks++
                mu.Unlock()
            }
        }(node)
    }

    wg.Wait()

    if acks < qs.writeQuorum {
        return ErrQuorumNotReached
    }
    return nil
}

func (qs *QuorumStore) Read(ctx context.Context, key string) (string, error) {
    var wg sync.WaitGroup
    var mu sync.Mutex
    var responses []VersionedValue

    for _, node := range qs.nodes {
        wg.Add(1)
        go func(n *Node) {
            defer wg.Done()
            if val, err := n.Read(ctx, key); err == nil {
                mu.Lock()
                responses = append(responses, val)
                mu.Unlock()
            }
        }(node)
    }

    wg.Wait()

    if len(responses) < qs.readQuorum {
        return "", ErrQuorumNotReached
    }

    // Return highest version
    var latest VersionedValue
    for _, r := range responses {
        if r.Version > latest.Version {
            latest = r
        }
    }

    return latest.Value, nil
}
```

---

## Common Pitfalls

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">1. Thinking CA is Possible in Distributed Systems</div>
  <div style="color: #7f1d1d; font-size: 14px;">Network partitions WILL happen. Any truly distributed system must be partition-tolerant. "CA systems" like single-node PostgreSQL are not distributed - they have no partitions because there is no network between nodes.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">2. Confusing CAP Consistency with ACID Consistency</div>
  <div style="color: #7f1d1d; font-size: 14px;">CAP consistency means all nodes see the same data. ACID consistency means data satisfies integrity constraints. A CP system can still have ACID violations if transactions are not properly implemented.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">3. Treating CAP as Binary</div>
  <div style="color: #7f1d1d; font-size: 14px;">Real systems exist on a spectrum. Many databases offer tunable consistency - you can choose different consistency levels per operation. DynamoDB, Cassandra, and MongoDB all offer this flexibility.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">4. Ignoring Latency (PACELC)</div>
  <div style="color: #7f1d1d; font-size: 14px;">CAP only describes behavior during partitions. The PACELC theorem extends this: even when no partition exists, you must choose between latency and consistency. Strong consistency requires coordination, which adds latency.</div>
</div>

---

## Interview Questions

### Conceptual Questions

**Q1: Why can't we have all three CAP guarantees?**

A: During a network partition, nodes cannot communicate. If a write comes in, you must either:
- Accept it on available nodes (sacrificing consistency - other nodes have stale data)
- Reject it until partition heals (sacrificing availability)

You cannot both accept the write AND guarantee all nodes are consistent.

**Q2: Is MongoDB CP or AP?**

A: MongoDB is CP by default (requires majority acknowledgment), but can be configured for AP behavior with `{w: 1, j: false}` settings. This is a great example of how modern databases offer tunable consistency.

**Q3: How do AP systems handle conflicts?**

A: Common strategies include:
- **Last-Write-Wins (LWW)**: Highest timestamp wins
- **Vector Clocks**: Track causality, detect conflicts
- **CRDTs**: Data structures that automatically merge
- **Application-level resolution**: Let users resolve conflicts

### Design Questions

**Q4: "Design a shopping cart system - would you choose CP or AP?"**

A: AP is typically better for shopping carts because:
- Availability matters more - customers should always be able to add items
- Temporary inconsistency is acceptable - showing slightly stale cart is fine
- Conflicts are rare and can be merged (union of items)
- Lost sales from unavailability > cost of occasional duplicate items

Amazon's DynamoDB was literally designed for this use case.

**Q5: "Design a banking system - CP or AP?"**

A: CP is required because:
- Incorrect balances are unacceptable
- Double-spending must be prevented
- Regulatory compliance requires accurate records
- Users accept occasional "try again later" errors

Banks prefer rejecting transactions over showing wrong balances.

---

## Database CAP Classifications

| Database | Type | Notes |
|----------|------|-------|
| PostgreSQL (single) | CA* | *Not distributed, so no partitions |
| MongoDB | CP | Default config, tunable |
| Cassandra | AP | Tunable consistency levels |
| DynamoDB | AP | Eventual consistency default |
| Redis Cluster | CP | Requires majority for writes |
| CockroachDB | CP | Serializable transactions |
| Spanner | CP | TrueTime for global consistency |
| Riak | AP | Designed for availability |
| etcd | CP | Raft consensus |

---

## Related Topics

- [Database Replication](/topic/system-design/database-replication)
- [Consensus Algorithms](/topic/system-design/consensus-algorithms)
- [Eventual Consistency](/topic/system-design/eventual-consistency)
- [Database Sharding](/topic/system-design/database-sharding)
