# CAP Theorem

## Overview

The CAP theorem, proposed by Eric Brewer in 2000, states that a distributed data store can provide only two of the following three guarantees simultaneously:

- **Consistency**: Every read receives the most recent write
- **Availability**: Every request receives a response (success or failure)
- **Partition Tolerance**: System continues to operate despite network partitions

## Key Concepts

### The Three Properties

#### Consistency (C)
All nodes see the same data at the same time. After a write completes, all subsequent reads return that value.

```
Write X=5 to Node A
            ↓
    Propagate to Node B
            ↓
Read from Node A → 5
Read from Node B → 5  (same value)
```

#### Availability (A)
Every request to a non-failing node returns a response. The system remains operational.

```
Client → Node A (healthy) → Response ✓
Client → Node B (healthy) → Response ✓
```

#### Partition Tolerance (P)
The system continues to function despite network partitions (communication breaks between nodes).

```
[Node A] ←✗→ [Node B]
    ↓            ↓
Both continue operating
despite being unable to
communicate with each other
```

### Why Only Two?

In a distributed system, network partitions are inevitable. When a partition occurs, you must choose:

```
During Partition:

Option 1: Choose Consistency (CP)
- Reject writes to maintain consistency
- Some requests fail (sacrifice availability)

Option 2: Choose Availability (AP)
- Accept writes on both sides
- Data may diverge (sacrifice consistency)
```

## CAP Trade-offs

### CP Systems (Consistency + Partition Tolerance)

Sacrifices availability during partitions.

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

**Examples**: MongoDB (default), HBase, Redis Cluster, Zookeeper

**Use Cases**:
- Financial transactions
- Inventory management
- Configuration management

### AP Systems (Availability + Partition Tolerance)

Sacrifices consistency during partitions. May return stale data.

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

**Examples**: Cassandra, DynamoDB, CouchDB, Riak

**Use Cases**:
- Social media feeds
- Shopping carts
- Session storage

### CA Systems (Consistency + Availability)

Only possible when there are no partitions (single node or reliable network).

**Examples**: Traditional RDBMS (PostgreSQL, MySQL) on single node

**Note**: In practice, network partitions happen, so CA systems are not truly distributed.

## Consistency Models

### Strong Consistency
All reads return the most recent write.

```
Write(X=1) → success
Read(X) → 1 (always)
```

### Eventual Consistency
Reads may return stale data, but will eventually return the most recent write.

```
Write(X=1) → success
Read(X) → 0 (stale)
... time passes ...
Read(X) → 1 (eventually consistent)
```

### Causal Consistency
Causally related operations are seen in order.

```
Write(X=1) by Client A
Read(X=1) by Client A
Write(Y=2) by Client A (after seeing X=1)

Client B will see X=1 before Y=2
```

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

## Common Interview Questions

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

## Best Practices

1. **Understand your requirements** - Which guarantee matters most?
2. **Design for partition tolerance** - It will happen
3. **Use tunable consistency** - Many databases offer per-query settings
4. **Implement conflict resolution** - For AP systems
5. **Monitor replication lag** - Track staleness in AP systems
6. **Test failure scenarios** - Chaos engineering

## Related Topics

- [Database Sharding](/topic/system-design/database-sharding)
- [Database Replication](/topic/system-design/database-replication)
- [Consensus Algorithms](/topic/system-design/consensus-algorithms)
