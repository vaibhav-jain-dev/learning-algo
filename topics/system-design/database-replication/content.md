# Database Replication

## Overview

Database replication is the process of copying and maintaining database objects in multiple databases that make up a distributed database system. It provides high availability, fault tolerance, and improved read performance.

## Key Concepts

### Why Replication?

1. **High Availability**: If primary fails, replica takes over
2. **Read Scalability**: Distribute read queries across replicas
3. **Geographic Distribution**: Serve data closer to users
4. **Disaster Recovery**: Backup in different data centers

### Replication Architecture

```
Single Primary (Master-Slave):
┌─────────┐        ┌─────────┐
│ Primary │───────→│ Replica │
│  (R/W)  │        │  (R)    │
└─────────┘        └─────────┘
     │
     └────────────→┌─────────┐
                   │ Replica │
                   │  (R)    │
                   └─────────┘

Multi-Primary (Master-Master):
┌─────────┐←──────→┌─────────┐
│Primary 1│        │Primary 2│
│  (R/W)  │        │  (R/W)  │
└─────────┘        └─────────┘
```

## Replication Types

### 1. Synchronous Replication

Write is confirmed only after all replicas acknowledge.

```python
class SynchronousReplication:
    def __init__(self, primary, replicas):
        self.primary = primary
        self.replicas = replicas

    def write(self, key, value):
        # Write to primary
        self.primary.write(key, value)

        # Wait for all replicas
        for replica in self.replicas:
            success = replica.write(key, value)
            if not success:
                # Rollback on failure
                self.rollback(key)
                raise ReplicationError("Replica write failed")

        return True
```

**Pros**: Strong consistency
**Cons**: High latency, availability depends on all replicas

### 2. Asynchronous Replication

Primary confirms write immediately, replicates in background.

```python
import threading
import queue

class AsynchronousReplication:
    def __init__(self, primary, replicas):
        self.primary = primary
        self.replicas = replicas
        self.replication_queue = queue.Queue()
        self.start_replication_workers()

    def write(self, key, value):
        # Write to primary immediately
        self.primary.write(key, value)

        # Queue for async replication
        self.replication_queue.put((key, value))

        return True  # Return immediately

    def start_replication_workers(self):
        def replicate():
            while True:
                key, value = self.replication_queue.get()
                for replica in self.replicas:
                    try:
                        replica.write(key, value)
                    except Exception as e:
                        # Log error, maybe retry
                        pass

        thread = threading.Thread(target=replicate, daemon=True)
        thread.start()
```

**Pros**: Low latency, high availability
**Cons**: Eventual consistency, potential data loss

### 3. Semi-Synchronous Replication

Wait for at least one replica to acknowledge.

```python
class SemiSynchronousReplication:
    def __init__(self, primary, replicas, min_acks=1):
        self.primary = primary
        self.replicas = replicas
        self.min_acks = min_acks

    def write(self, key, value):
        # Write to primary
        self.primary.write(key, value)

        # Wait for minimum number of acks
        acks = 0
        for replica in self.replicas:
            if replica.write(key, value):
                acks += 1
                if acks >= self.min_acks:
                    break

        if acks < self.min_acks:
            raise ReplicationError("Insufficient replica acks")

        # Async replicate to remaining
        self.async_replicate_remaining(key, value)

        return True
```

## Replication Methods

### 1. Statement-Based Replication

Replicate SQL statements to replicas.

```sql
-- Primary executes and logs:
INSERT INTO users (name, created_at) VALUES ('Alice', NOW());

-- Replica receives and executes same statement
```

**Issue**: Non-deterministic functions (NOW(), RAND()) may differ

### 2. Row-Based Replication

Replicate actual row changes.

```python
# Binary log entry (MySQL)
{
    "type": "INSERT",
    "table": "users",
    "row": {
        "id": 123,
        "name": "Alice",
        "created_at": "2024-01-15 10:30:00"
    }
}
```

**Pros**: Deterministic, works with all operations
**Cons**: Larger log size for bulk updates

### 3. Write-Ahead Log (WAL) Shipping

Ship database write-ahead log to replicas.

```python
class WALReplication:
    def __init__(self, primary, replica):
        self.primary = primary
        self.replica = replica
        self.last_lsn = 0  # Log Sequence Number

    def replicate(self):
        while True:
            # Get WAL entries since last position
            entries = self.primary.get_wal_entries(since=self.last_lsn)

            for entry in entries:
                self.replica.apply_wal_entry(entry)
                self.last_lsn = entry.lsn

            time.sleep(0.1)  # Polling interval
```

## Failover Strategies

### Automatic Failover

```python
class AutomaticFailover:
    def __init__(self, primary, replicas, check_interval=5):
        self.primary = primary
        self.replicas = replicas
        self.check_interval = check_interval

    def start(self):
        while True:
            if not self.primary.is_healthy():
                self.promote_replica()
            time.sleep(self.check_interval)

    def promote_replica(self):
        # Find replica with most up-to-date data
        best_replica = max(
            self.replicas,
            key=lambda r: r.get_replication_position()
        )

        # Promote to primary
        best_replica.promote_to_primary()

        # Reconfigure other replicas
        for replica in self.replicas:
            if replica != best_replica:
                replica.replicate_from(best_replica)

        self.primary = best_replica
        self.replicas = [r for r in self.replicas if r != best_replica]
```

### Split-Brain Prevention

```python
class QuorumBasedFailover:
    def __init__(self, nodes):
        self.nodes = nodes
        self.quorum = len(nodes) // 2 + 1

    def elect_leader(self):
        # Only proceed if we can reach quorum
        reachable = [n for n in self.nodes if n.is_reachable()]

        if len(reachable) < self.quorum:
            raise NoQuorumError("Cannot elect leader without quorum")

        # Elect node with highest term/position
        leader = max(reachable, key=lambda n: (n.term, n.position))
        return leader
```

## Implementation Example

### Go - Replication Manager

```go
package main

import (
	"context"
	"log"
	"sync"
	"time"
)

type ReplicationMode int

const (
	Async ReplicationMode = iota
	Sync
	SemiSync
)

type ReplicaNode struct {
	ID       string
	Address  string
	Lag      time.Duration
	IsAlive  bool
	Position int64
}

type WriteEntry struct {
	Key       string
	Value     []byte
	Timestamp time.Time
	Position  int64
}

type ReplicationManager struct {
	primary   *ReplicaNode
	replicas  []*ReplicaNode
	mode      ReplicationMode
	minAcks   int
	wal       []WriteEntry
	walMu     sync.RWMutex
	position  int64
}

func NewReplicationManager(mode ReplicationMode, minAcks int) *ReplicationManager {
	return &ReplicationManager{
		mode:     mode,
		minAcks:  minAcks,
		wal:      make([]WriteEntry, 0),
	}
}

func (rm *ReplicationManager) Write(ctx context.Context, key string, value []byte) error {
	// Write to WAL
	rm.walMu.Lock()
	rm.position++
	entry := WriteEntry{
		Key:       key,
		Value:     value,
		Timestamp: time.Now(),
		Position:  rm.position,
	}
	rm.wal = append(rm.wal, entry)
	rm.walMu.Unlock()

	switch rm.mode {
	case Sync:
		return rm.syncReplicate(ctx, entry)
	case SemiSync:
		return rm.semiSyncReplicate(ctx, entry)
	default:
		go rm.asyncReplicate(entry)
		return nil
	}
}

func (rm *ReplicationManager) syncReplicate(ctx context.Context, entry WriteEntry) error {
	var wg sync.WaitGroup
	errors := make(chan error, len(rm.replicas))

	for _, replica := range rm.replicas {
		if !replica.IsAlive {
			continue
		}

		wg.Add(1)
		go func(r *ReplicaNode) {
			defer wg.Done()
			if err := rm.sendToReplica(ctx, r, entry); err != nil {
				errors <- err
			}
		}(replica)
	}

	wg.Wait()
	close(errors)

	for err := range errors {
		return err // Return first error
	}

	return nil
}

func (rm *ReplicationManager) semiSyncReplicate(ctx context.Context, entry WriteEntry) error {
	ackChan := make(chan bool, len(rm.replicas))
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	for _, replica := range rm.replicas {
		if !replica.IsAlive {
			continue
		}

		go func(r *ReplicaNode) {
			if err := rm.sendToReplica(ctx, r, entry); err == nil {
				ackChan <- true
			}
		}(replica)
	}

	acks := 0
	for {
		select {
		case <-ackChan:
			acks++
			if acks >= rm.minAcks {
				return nil
			}
		case <-ctx.Done():
			return ctx.Err()
		}
	}
}

func (rm *ReplicationManager) asyncReplicate(entry WriteEntry) {
	for _, replica := range rm.replicas {
		if replica.IsAlive {
			ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
			rm.sendToReplica(ctx, replica, entry)
			cancel()
		}
	}
}

func (rm *ReplicationManager) sendToReplica(ctx context.Context, replica *ReplicaNode, entry WriteEntry) error {
	// Simulate network call to replica
	log.Printf("Replicating to %s: %s = %s", replica.ID, entry.Key, string(entry.Value))
	time.Sleep(10 * time.Millisecond)
	replica.Position = entry.Position
	return nil
}

func (rm *ReplicationManager) GetReplicationLag(replica *ReplicaNode) time.Duration {
	rm.walMu.RLock()
	defer rm.walMu.RUnlock()

	if len(rm.wal) == 0 || replica.Position >= rm.position {
		return 0
	}

	// Find entry at replica position
	for _, entry := range rm.wal {
		if entry.Position == replica.Position {
			return time.Since(entry.Timestamp)
		}
	}

	return time.Hour // Unknown, assume large lag
}

func (rm *ReplicationManager) MonitorReplicas() {
	for {
		for _, replica := range rm.replicas {
			lag := rm.GetReplicationLag(replica)
			replica.Lag = lag

			if lag > 10*time.Second {
				log.Printf("WARNING: Replica %s has high lag: %v", replica.ID, lag)
			}
		}

		time.Sleep(5 * time.Second)
	}
}

func main() {
	rm := NewReplicationManager(SemiSync, 1)

	rm.replicas = []*ReplicaNode{
		{ID: "replica-1", Address: "localhost:5433", IsAlive: true},
		{ID: "replica-2", Address: "localhost:5434", IsAlive: true},
	}

	go rm.MonitorReplicas()

	// Write some data
	ctx := context.Background()
	for i := 0; i < 10; i++ {
		key := "key-" + string(rune('a'+i))
		value := []byte("value-" + string(rune('a'+i)))

		if err := rm.Write(ctx, key, value); err != nil {
			log.Printf("Write failed: %v", err)
		}
	}

	time.Sleep(time.Second)
}
```

### Python - Read/Write Routing

```python
import random
from typing import List, Optional
from dataclasses import dataclass
import time

@dataclass
class DatabaseNode:
    host: str
    port: int
    is_primary: bool
    is_healthy: bool = True
    lag_ms: int = 0

class ReplicationRouter:
    def __init__(self, primary: DatabaseNode, replicas: List[DatabaseNode]):
        self.primary = primary
        self.replicas = replicas
        self.max_acceptable_lag_ms = 1000

    def get_write_connection(self):
        """Always route writes to primary"""
        if not self.primary.is_healthy:
            raise Exception("Primary is not healthy")
        return self.primary

    def get_read_connection(self, require_consistent: bool = False):
        """Route reads to replica or primary based on requirements"""
        if require_consistent:
            return self.primary

        # Filter healthy replicas with acceptable lag
        available = [
            r for r in self.replicas
            if r.is_healthy and r.lag_ms <= self.max_acceptable_lag_ms
        ]

        if not available:
            # Fallback to primary
            return self.primary

        # Load balance across replicas
        return random.choice(available)

    def execute_read(self, query: str, consistent: bool = False):
        node = self.get_read_connection(consistent)
        return self._execute(node, query)

    def execute_write(self, query: str):
        node = self.get_write_connection()
        return self._execute(node, query)

    def _execute(self, node: DatabaseNode, query: str):
        # Simulate query execution
        print(f"Executing on {node.host}:{node.port} (primary={node.is_primary}): {query}")
        return {"result": "ok"}


class ReadAfterWriteConsistency:
    """Ensure reads see their own writes"""

    def __init__(self, router: ReplicationRouter):
        self.router = router
        self.write_positions = {}  # session_id -> last_write_position

    def write(self, session_id: str, query: str):
        result = self.router.execute_write(query)

        # Record write position
        self.write_positions[session_id] = time.time()

        return result

    def read(self, session_id: str, query: str):
        last_write = self.write_positions.get(session_id)

        if last_write:
            # Check if replicas have caught up
            time_since_write = time.time() - last_write

            if time_since_write < 1.0:  # Within 1 second of write
                # Read from primary to ensure consistency
                return self.router.execute_read(query, consistent=True)

        return self.router.execute_read(query, consistent=False)


# Usage
primary = DatabaseNode(host="db-primary", port=5432, is_primary=True)
replicas = [
    DatabaseNode(host="db-replica-1", port=5432, is_primary=False, lag_ms=50),
    DatabaseNode(host="db-replica-2", port=5432, is_primary=False, lag_ms=100),
]

router = ReplicationRouter(primary, replicas)
consistency = ReadAfterWriteConsistency(router)

# Write then read same session
session = "user-123"
consistency.write(session, "INSERT INTO orders ...")
consistency.read(session, "SELECT * FROM orders WHERE ...")  # Goes to primary

# Read from different session
consistency.read("user-456", "SELECT * FROM products")  # Goes to replica
```

## Common Interview Questions

1. **How do you handle replication lag?**
   - Monitor lag metrics
   - Route time-sensitive reads to primary
   - Use semi-synchronous replication

2. **What happens during a failover?**
   - Detect primary failure
   - Elect new primary (most up-to-date replica)
   - Reconfigure replicas
   - Update connection routing

3. **How do you prevent split-brain?**
   - Quorum-based leader election
   - Fencing (STONITH)
   - External arbitrator

4. **When would you use multi-primary replication?**
   - Geographic distribution (write locally)
   - High write availability
   - Requires conflict resolution

## Best Practices

1. **Monitor replication lag** - Alert on high lag
2. **Test failover regularly** - Ensure it works when needed
3. **Use checksums** - Verify data integrity
4. **Separate networks** - Dedicated replication network
5. **Consider consistency requirements** - Choose appropriate mode
6. **Plan for capacity** - Replicas need resources for catchup

## Related Topics

- [Database Sharding](/topic/system-design/database-sharding)
- [CAP Theorem](/topic/system-design/cap-theorem)
- [Consensus Algorithms](/topic/system-design/consensus-algorithms)
