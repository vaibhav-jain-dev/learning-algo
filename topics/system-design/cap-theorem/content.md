# CAP Theorem

## Overview

The CAP theorem, proposed by Eric Brewer in 2000, states that a distributed data store can provide only two of the following three guarantees simultaneously:

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

- **Consistency**: Every read receives the most recent write
- **Availability**: Every request receives a response (success or failure)
- **Partition Tolerance**: System continues to operate despite network partitions

</div>

## Key Concepts

### The CAP Triangle

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                         THE CAP THEOREM                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                           CONSISTENCY                                       │
│                               ▲                                             │
│                              ╱ ╲                                            │
│                             ╱   ╲                                           │
│                            ╱     ╲                                          │
│                           ╱  CP   ╲                                         │
│                          ╱ MongoDB ╲                                        │
│                         ╱  HBase    ╲                                       │
│                        ╱  Zookeeper  ╲                                      │
│                       ╱───────────────╲                                     │
│                      ╱                 ╲                                    │
│            CA       ╱    PICK TWO!      ╲       AP                         │
│        (Single    ╱                      ╲   Cassandra                     │
│        Node DB)  ╱                        ╲  DynamoDB                      │
│                 ╱                          ╲ CouchDB                       │
│                ▼──────────────────────────▼                                │
│           AVAILABILITY ◄─────────────────► PARTITION                       │
│                                            TOLERANCE                        │
│                                                                             │
│   ⚠️ In distributed systems, P is mandatory!                               │
│   Network partitions WILL happen. So you really choose between C and A.    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

### The Three Properties

#### Consistency (C)

All nodes see the same data at the same time. After a write completes, all subsequent reads return that value.

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CONSISTENCY                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Client writes X=5                                                        │
│        │                                                                    │
│        ▼                                                                    │
│   ┌──────────┐         Replicate          ┌──────────┐                    │
│   │  Node A  │ ────────────────────────► │  Node B  │                    │
│   │   X=5    │                            │   X=5    │                    │
│   └──────────┘                            └──────────┘                    │
│        │                                       │                           │
│        ▼                                       ▼                           │
│   Read X → 5 ✓                           Read X → 5 ✓                     │
│                                                                             │
│   ✓ CONSISTENT: Both nodes return same value                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

#### Availability (A)

Every request to a non-failing node returns a response. The system remains operational.

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AVAILABILITY                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌────────────┐                                                           │
│   │  Client 1  │ ──► Node A ──► Response ✓  (within timeout)              │
│   └────────────┘                                                           │
│                                                                             │
│   ┌────────────┐                                                           │
│   │  Client 2  │ ──► Node B ──► Response ✓  (within timeout)              │
│   └────────────┘                                                           │
│                                                                             │
│   ┌────────────┐                                                           │
│   │  Client 3  │ ──► Node C ──► Response ✓  (within timeout)              │
│   └────────────┘                                                           │
│                                                                             │
│   ✓ AVAILABLE: Every request gets a response (even if data is stale)      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

#### Partition Tolerance (P)

The system continues to function despite network partitions (communication breaks between nodes).

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PARTITION TOLERANCE                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Normal operation:                                                        │
│   ┌──────────┐ ◄────────────────────────► ┌──────────┐                    │
│   │  Node A  │      Network OK            │  Node B  │                    │
│   └──────────┘                            └──────────┘                    │
│                                                                             │
│   Network Partition (cable cut, router failure, etc.):                     │
│   ┌──────────┐          ╳ ╳ ╳             ┌──────────┐                    │
│   │  Node A  │ ◄───────╳ ╳ ╳───────────► │  Node B  │                    │
│   │          │        PARTITION!          │          │                    │
│   └──────────┘                            └──────────┘                    │
│        │                                       │                           │
│        ▼                                       ▼                           │
│   Still serves                           Still serves                      │
│   clients! ✓                             clients! ✓                       │
│                                                                             │
│   ✓ PARTITION TOLERANT: System keeps working despite network failure      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

### Why Only Two?

In a distributed system, network partitions are inevitable. When a partition occurs, you must choose:

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                   THE PARTITION DILEMMA                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Scenario: Network partition occurs                                       │
│                                                                             │
│   ┌──────────┐          ╳ ╳ ╳             ┌──────────┐                    │
│   │  Node A  │ ◄───────╳ ╳ ╳───────────► │  Node B  │                    │
│   │  X = 5   │        PARTITION!          │  X = 5   │                    │
│   └──────────┘                            └──────────┘                    │
│        │                                       │                           │
│    Client 1                                Client 2                        │
│   writes X=10                            reads X                           │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   OPTION 1: CHOOSE CONSISTENCY (CP)                                        │
│   ─────────────────────────────────                                        │
│                                                                             │
│   Node A: "Can't confirm B received update..."                            │
│           "REJECT the write!" ✗                                           │
│                                                                             │
│   ✓ Consistent: No stale reads                                            │
│   ✗ Not Available: Write rejected                                         │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   OPTION 2: CHOOSE AVAILABILITY (AP)                                       │
│   ──────────────────────────────────                                       │
│                                                                             │
│   Node A: "Accept write X=10" ✓                                           │
│   Node B: "Return X=5 (stale)" ✓                                          │
│                                                                             │
│   ✓ Available: Both requests succeed                                      │
│   ✗ Not Consistent: Different values!                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

## CAP Trade-offs

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CAP TRADE-OFF COMPARISON                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Type │ During Partition           │ Examples              │ Best For       │
│  ─────┼────────────────────────────┼───────────────────────┼────────────────│
│  CP   │ Reject requests            │ MongoDB, Zookeeper    │ Banking, Config│
│       │ to maintain consistency    │ HBase, Redis Cluster  │ Inventory      │
│  ─────┼────────────────────────────┼───────────────────────┼────────────────│
│  AP   │ Accept requests            │ Cassandra, DynamoDB   │ Social feeds   │
│       │ may return stale data      │ CouchDB, Riak         │ Shopping carts │
│  ─────┼────────────────────────────┼───────────────────────┼────────────────│
│  CA   │ N/A (no partition)         │ Single-node RDBMS     │ Not distributed│
│       │ Not truly distributed!     │ PostgreSQL, MySQL     │                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

### CP Systems (Consistency + Partition Tolerance)

Sacrifices availability during partitions.

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CP SYSTEM: QUORUM-BASED                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   3 nodes, quorum = 2 (majority)                                           │
│                                                                             │
│   WRITE: "SET X=5"                                                         │
│   ────────────────                                                         │
│        │                                                                    │
│        ├──► Node A: ACK ✓                                                  │
│        ├──► Node B: ACK ✓       ← 2 ACKs = quorum reached!                │
│        └──► Node C: TIMEOUT ✗                                              │
│                                                                             │
│   Result: Write succeeds (2/3 = quorum)                                   │
│                                                                             │
│   DURING PARTITION (only 1 node reachable):                               │
│   ─────────────────────────────────────────                               │
│        │                                                                    │
│        ├──► Node A: ACK ✓                                                  │
│        ├──► Node B: UNREACHABLE ✗                                         │
│        └──► Node C: UNREACHABLE ✗                                         │
│                                                                             │
│   Result: Write FAILS! (1/3 < quorum)                                     │
│                                                                             │
│   ✓ Consistent: Never return stale data                                   │
│   ✗ Not Available: Requests fail during partition                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

```python
class CPDatabase:
    def __init__(self, nodes):
        self.nodes = nodes
        self.quorum = len(nodes) // 2 + 1

    def write(self, key, value):
        # Must reach quorum to succeed
        acks = 0
        for node in self.nodes:
            try:
                node.write(key, value)
                acks += 1
            except NetworkError:
                pass

        if acks < self.quorum:
            raise UnavailableError("Cannot reach quorum")

        return True

    def read(self, key):
        # Read from quorum and return most recent
        responses = []
        for node in self.nodes:
            try:
                responses.append(node.read(key))
            except NetworkError:
                pass

        if len(responses) < self.quorum:
            raise UnavailableError("Cannot reach quorum")

        return max(responses, key=lambda r: r.version)
```

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #4ecdc4;">

**Examples**: MongoDB (default), HBase, Redis Cluster, Zookeeper

**Use Cases**: Financial transactions, inventory management, configuration management

</div>

### AP Systems (Availability + Partition Tolerance)

Sacrifices consistency during partitions. May return stale data.

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                    AP SYSTEM: ALWAYS AVAILABLE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   DURING PARTITION:                                                        │
│                                                                             │
│   ┌──────────┐        ╳ ╳ ╳         ┌──────────┐                          │
│   │  Node A  │ ◄─────╳ ╳ ╳────────► │  Node B  │                          │
│   │  X = 5   │      PARTITION!      │  X = 5   │                          │
│   └──────────┘                      └──────────┘                          │
│        │                                   │                               │
│        ▼                                   ▼                               │
│   Client writes                      Client reads                         │
│   X = 10  ✓                          X → 5 (stale!) ✓                    │
│                                                                             │
│   ┌──────────┐                      ┌──────────┐                          │
│   │  Node A  │                      │  Node B  │                          │
│   │  X = 10  │                      │  X = 5   │  ← INCONSISTENT!        │
│   └──────────┘                      └──────────┘                          │
│                                                                             │
│   AFTER PARTITION HEALS:                                                   │
│                                                                             │
│   ┌──────────┐ ◄────────────────► ┌──────────┐                           │
│   │  Node A  │    Sync & Merge    │  Node B  │                           │
│   │  X = 10  │ ──────────────────►│  X = 10  │  ← Eventually consistent │
│   └──────────┘                    └──────────┘                           │
│                                                                             │
│   ✓ Available: All requests succeed                                       │
│   ✗ Not Consistent: Temporary stale reads                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

```python
class APDatabase:
    def __init__(self, nodes):
        self.nodes = nodes

    def write(self, key, value):
        # Write to any available node
        for node in self.nodes:
            try:
                node.write(key, value)
                return True
            except NetworkError:
                continue

        raise AllNodesDown()

    def read(self, key):
        # Read from any available node
        for node in self.nodes:
            try:
                return node.read(key)  # May be stale
            except NetworkError:
                continue

        raise AllNodesDown()
```

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #4ecdc4;">

**Examples**: Cassandra, DynamoDB, CouchDB, Riak

**Use Cases**: Social media feeds, shopping carts, session storage

</div>

### CA Systems (Consistency + Availability)

Only possible when there are no partitions (single node or reliable network).

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ff6b6b;">

⚠️ **Note**: In practice, network partitions happen, so CA systems are not truly distributed. A single-node PostgreSQL is CA but not distributed!

</div>

**Examples**: Traditional RDBMS (PostgreSQL, MySQL) on single node

## Consistency Models

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                     CONSISTENCY SPECTRUM                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Strongest                                                     Weakest    │
│   ◄────────────────────────────────────────────────────────────────────►   │
│                                                                             │
│   Linearizable → Sequential → Causal → Read-Your → Monotonic → Eventual   │
│                                        Writes       Reads                   │
│                                                                             │
│   ┌───────────────────────────────────────────────────────────────────┐    │
│   │ Trade-off: Stronger consistency = Higher latency + Lower availability │
│   └───────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

### Strong Consistency (Linearizability)

All reads return the most recent write. As if there's only one copy of data.

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                      STRONG CONSISTENCY                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Timeline:  ─────────────────────────────────────────────────────►        │
│              t=0       t=1       t=2       t=3       t=4                   │
│                         │                   │                               │
│   Client A:         Write(X=1)                                             │
│                         │                                                   │
│                         ▼                                                   │
│   All Nodes:    [X=0] ──► [X=1] ─────────────────────────────────►        │
│                                             │                               │
│   Client B:                            Read(X) = 1 ✓                       │
│                                                                             │
│   ✓ After write completes, ALL subsequent reads return new value          │
│   ✓ Behaves like a single-server system                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

### Eventual Consistency

Reads may return stale data, but will eventually return the most recent write.

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                     EVENTUAL CONSISTENCY                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Timeline:  ─────────────────────────────────────────────────────►        │
│              t=0       t=1       t=2       t=3       t=4                   │
│                         │                   │         │                     │
│   Client A:         Write(X=1)              │         │                     │
│                         │                   │         │                     │
│   Node A:       [X=0] ──► [X=1] ────────────────────────────────►         │
│                                ╲                      │                     │
│                                 ╲ Async replicate    │                     │
│                                  ╲                   │                     │
│   Node B:       [X=0] ────────────► [X=0] ──► [X=1] ────────────►         │
│                                        │         │                         │
│   Client B:                       Read(X)=0  Read(X)=1                    │
│                                    (stale!)   (consistent)                 │
│                                                                             │
│   ⚠️ Temporary inconsistency window (t=1 to t=3)                          │
│   ✓ Eventually all reads return correct value                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

### Causal Consistency

Causally related operations are seen in order.

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CAUSAL CONSISTENCY                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Client A:   Write(post="Hello")                                          │
│                     │                                                       │
│                     ▼                                                       │
│               Read(post="Hello") ──► Write(comment="Hi!")                  │
│                                           │                                 │
│                                           │ (comment depends on post)       │
│                                           ▼                                 │
│                                                                             │
│   Client B:   If sees comment="Hi!", MUST also see post="Hello"            │
│                                                                             │
│   ┌────────────────────────────────────────────────────────────┐           │
│   │  Causal chain: post → read → comment                       │           │
│   │  B cannot see effect (comment) without seeing cause (post) │           │
│   └────────────────────────────────────────────────────────────┘           │
│                                                                             │
│   ✓ Preserves cause-effect relationships                                  │
│   ✓ Concurrent (unrelated) operations may be seen in any order            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

### Read-Your-Writes Consistency

A client always sees its own writes.

```python
class ReadYourWritesConsistency:
    def __init__(self):
        self.local_cache = {}
        self.remote_db = RemoteDB()

    def write(self, key, value):
        self.local_cache[key] = value
        self.remote_db.write(key, value)

    def read(self, key):
        # Check local cache first
        if key in self.local_cache:
            return self.local_cache[key]
        return self.remote_db.read(key)
```

## PACELC Theorem

An extension of CAP that addresses behavior when there's NO partition:

**If Partition (P)**: Choose between Availability (A) and Consistency (C)
**Else (E)**: Choose between Latency (L) and Consistency (C)

```
System Classification:
- PA/EL: High availability, low latency (Cassandra, DynamoDB)
- PA/EC: High availability, strong consistency when possible (MongoDB)
- PC/EL: Strong consistency, low latency (PNUTS)
- PC/EC: Strong consistency always (traditional RDBMS)
```

## Implementation Example

### Go - Quorum-Based Consistency

```go
package main

import (
	"context"
	"errors"
	"sync"
	"time"
)

type VersionedValue struct {
	Value   string
	Version int64
}

type Node struct {
	id    string
	data  map[string]VersionedValue
	mu    sync.RWMutex
	alive bool
}

func (n *Node) Write(key, value string, version int64) error {
	if !n.alive {
		return errors.New("node unavailable")
	}

	n.mu.Lock()
	defer n.mu.Unlock()

	current, exists := n.data[key]
	if exists && current.Version >= version {
		return nil // Already have newer version
	}

	n.data[key] = VersionedValue{Value: value, Version: version}
	return nil
}

func (n *Node) Read(key string) (VersionedValue, error) {
	if !n.alive {
		return VersionedValue{}, errors.New("node unavailable")
	}

	n.mu.RLock()
	defer n.mu.RUnlock()

	value, exists := n.data[key]
	if !exists {
		return VersionedValue{}, errors.New("not found")
	}
	return value, nil
}

type QuorumStore struct {
	nodes       []*Node
	readQuorum  int
	writeQuorum int
}

func NewQuorumStore(n, r, w int) *QuorumStore {
	nodes := make([]*Node, n)
	for i := 0; i < n; i++ {
		nodes[i] = &Node{
			id:    string(rune('A' + i)),
			data:  make(map[string]VersionedValue),
			alive: true,
		}
	}

	return &QuorumStore{
		nodes:       nodes,
		readQuorum:  r,
		writeQuorum: w,
	}
}

func (qs *QuorumStore) Write(ctx context.Context, key, value string) error {
	version := time.Now().UnixNano()

	var wg sync.WaitGroup
	var mu sync.Mutex
	successes := 0

	for _, node := range qs.nodes {
		wg.Add(1)
		go func(n *Node) {
			defer wg.Done()
			if err := n.Write(key, value, version); err == nil {
				mu.Lock()
				successes++
				mu.Unlock()
			}
		}(node)
	}

	wg.Wait()

	if successes < qs.writeQuorum {
		return errors.New("failed to reach write quorum")
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
			if val, err := n.Read(key); err == nil {
				mu.Lock()
				responses = append(responses, val)
				mu.Unlock()
			}
		}(node)
	}

	wg.Wait()

	if len(responses) < qs.readQuorum {
		return "", errors.New("failed to reach read quorum")
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

func main() {
	// R + W > N ensures strong consistency
	// N=3, R=2, W=2 means we need majority for both reads and writes
	store := NewQuorumStore(3, 2, 2)

	ctx := context.Background()

	// Write
	if err := store.Write(ctx, "user:1", "Alice"); err != nil {
		println("Write failed:", err.Error())
		return
	}
	println("Write succeeded")

	// Read
	value, err := store.Read(ctx, "user:1")
	if err != nil {
		println("Read failed:", err.Error())
		return
	}
	println("Read value:", value)

	// Simulate partition (node failure)
	store.nodes[0].alive = false
	println("Node A failed")

	// Still works with 2/3 nodes
	value, err = store.Read(ctx, "user:1")
	if err != nil {
		println("Read failed:", err.Error())
	} else {
		println("Read after partition:", value)
	}
}
```

### Python - Eventual Consistency with Conflict Resolution

```python
import time
from typing import Dict, List, Optional
from dataclasses import dataclass
from enum import Enum

class ConflictResolution(Enum):
    LAST_WRITE_WINS = "lww"
    MERGE = "merge"

@dataclass
class VectorClock:
    clocks: Dict[str, int]

    def increment(self, node_id: str):
        self.clocks[node_id] = self.clocks.get(node_id, 0) + 1

    def merge(self, other: 'VectorClock'):
        for node_id, count in other.clocks.items():
            self.clocks[node_id] = max(self.clocks.get(node_id, 0), count)

    def happens_before(self, other: 'VectorClock') -> bool:
        """Returns True if self happened before other"""
        dominated = False
        for node_id in set(self.clocks.keys()) | set(other.clocks.keys()):
            self_count = self.clocks.get(node_id, 0)
            other_count = other.clocks.get(node_id, 0)

            if self_count > other_count:
                return False
            if self_count < other_count:
                dominated = True

        return dominated

    def concurrent(self, other: 'VectorClock') -> bool:
        """Returns True if events are concurrent (conflict)"""
        return not self.happens_before(other) and not other.happens_before(self)

@dataclass
class Value:
    data: str
    timestamp: float
    clock: VectorClock

class EventuallyConsistentStore:
    def __init__(self, node_id: str, resolution: ConflictResolution = ConflictResolution.LAST_WRITE_WINS):
        self.node_id = node_id
        self.data: Dict[str, List[Value]] = {}  # Key -> list of conflicting values
        self.clock = VectorClock({})
        self.resolution = resolution
        self.pending_sync: List[tuple] = []

    def write(self, key: str, value: str):
        self.clock.increment(self.node_id)

        new_value = Value(
            data=value,
            timestamp=time.time(),
            clock=VectorClock(dict(self.clock.clocks))
        )

        if key not in self.data:
            self.data[key] = [new_value]
        else:
            # Remove values that this write supersedes
            self.data[key] = [
                v for v in self.data[key]
                if not new_value.clock.happens_before(v.clock)
            ]
            self.data[key].append(new_value)

        self.pending_sync.append((key, new_value))

    def read(self, key: str) -> Optional[str]:
        if key not in self.data:
            return None

        values = self.data[key]

        if len(values) == 1:
            return values[0].data

        # Multiple concurrent values - resolve conflict
        if self.resolution == ConflictResolution.LAST_WRITE_WINS:
            latest = max(values, key=lambda v: v.timestamp)
            return latest.data
        else:
            # Return all values for client to merge
            return [v.data for v in values]

    def receive_sync(self, key: str, value: Value):
        """Receive synced value from another node"""
        self.clock.merge(value.clock)

        if key not in self.data:
            self.data[key] = [value]
            return

        # Filter out values that this one supersedes
        new_values = []
        should_add = True

        for existing in self.data[key]:
            if value.clock.happens_before(existing.clock):
                # Existing is newer, don't add incoming
                should_add = False
                new_values.append(existing)
            elif existing.clock.happens_before(value.clock):
                # Incoming is newer, skip existing
                continue
            else:
                # Concurrent - keep both (conflict)
                new_values.append(existing)

        if should_add:
            new_values.append(value)

        self.data[key] = new_values


# Demo
node_a = EventuallyConsistentStore("A")
node_b = EventuallyConsistentStore("B")

# Concurrent writes (simulating partition)
node_a.write("x", "value_from_A")
node_b.write("x", "value_from_B")

print(f"Node A sees: {node_a.read('x')}")
print(f"Node B sees: {node_b.read('x')}")

# Sync after partition heals
for key, value in node_a.pending_sync:
    node_b.receive_sync(key, value)

for key, value in node_b.pending_sync:
    node_a.receive_sync(key, value)

print(f"After sync - Node A sees: {node_a.read('x')}")
print(f"After sync - Node B sees: {node_b.read('x')}")
```

## Database CAP Classifications

<div style="background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

| Database | Category | Notes |
|----------|----------|-------|
| PostgreSQL | CA (single) | CP with streaming replication |
| MySQL | CA (single) | CP with Galera Cluster |
| MongoDB | CP | Configurable, uses replica sets |
| Cassandra | AP | Tunable consistency levels |
| DynamoDB | AP | Eventual consistency default |
| Redis Cluster | CP | Uses Raft consensus |
| CockroachDB | CP | Serializable isolation |
| Spanner | CP | TrueTime for consistency |

</div>

## Common Interview Questions

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

1. **Why can't we have all three (CAP)?**
   - Network partitions are unavoidable
   - During partition, must choose: reject requests (CP) or allow divergence (AP)

2. **How do AP systems handle conflicts?**
   - Last-write-wins (timestamp)
   - Vector clocks
   - Application-level merge (CRDTs)

3. **What is the difference between ACID and CAP?**
   - ACID: Transaction guarantees (single database)
   - CAP: Distributed system trade-offs

4. **How do you choose between CP and AP?**
   - CP: When consistency is critical (banking, inventory)
   - AP: When availability is more important (social feeds, shopping carts)

</div>

## Best Practices

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

1. **Understand your requirements** - Which guarantee matters most?
2. **Design for partition tolerance** - It will happen
3. **Use tunable consistency** - Many databases offer per-query settings
4. **Implement conflict resolution** - For AP systems
5. **Monitor replication lag** - Track staleness in AP systems
6. **Test failure scenarios** - Chaos engineering

</div>

## Related Topics

- [Database Sharding](/topic/system-design/database-sharding)
- [Database Replication](/topic/system-design/database-replication)
- [Consensus Algorithms](/topic/system-design/consensus-algorithms)
