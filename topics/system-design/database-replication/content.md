# Database Replication

## Overview

**Simple Explanation**: Database replication is like having backup copies of an important document stored in different locations. If one copy is lost or damaged, you can still access the others. In databases, replication means keeping multiple copies of your data on different servers so that if one server fails, your application keeps running.

The key challenge is keeping all copies synchronized - when you update the original, how and when do the copies get updated?

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">DATABASE REPLICATION ARCHITECTURE</div>
  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 32px; align-items: flex-start;">
    <div style="text-align: center;">
      <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px 32px; border: 2px solid #3b82f6; margin-bottom: 12px;">
        <div style="color: #1e40af; font-weight: 600; font-size: 16px;">PRIMARY</div>
        <div style="color: #3b82f6; font-size: 12px; margin-top: 4px;">Accepts all writes</div>
      </div>
      <div style="color: #64748b; font-size: 12px;">Write Path</div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 8px; padding-top: 20px;">
      <div style="color: #6366f1; font-size: 14px;">replicates to</div>
      <div style="color: #6366f1; font-size: 20px;">--></div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 10px; padding: 14px 24px; border: 1px solid #86efac; text-align: center;">
        <div style="color: #166534; font-weight: 500;">Replica 1</div>
        <div style="color: #22c55e; font-size: 11px;">Read-only</div>
      </div>
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 10px; padding: 14px 24px; border: 1px solid #86efac; text-align: center;">
        <div style="color: #166534; font-weight: 500;">Replica 2</div>
        <div style="color: #22c55e; font-size: 11px;">Read-only</div>
      </div>
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 10px; padding: 14px 24px; border: 1px solid #86efac; text-align: center;">
        <div style="color: #166534; font-weight: 500;">Replica 3</div>
        <div style="color: #22c55e; font-size: 11px;">Read-only</div>
      </div>
    </div>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 13px;">Reads can be distributed across all replicas for scalability</div>
</div>

## Why It Matters: Real Company Examples

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

**Netflix** uses replication across multiple AWS regions. When you press play, you're often reading from a replica geographically close to you, reducing latency from 200ms to 20ms.

**GitHub** replicates every repository to multiple data centers. When their primary DC had issues in 2018, they failed over to replicas - but a 43-second replication lag caused some data inconsistency, teaching them to improve their replication monitoring.

**Shopify** handles Black Friday traffic (4M+ requests/second) by routing reads to replicas while writes go to the primary. This lets them scale reads infinitely without overloading their write path.

**Instagram** uses multi-region replication for their PostgreSQL clusters. User data is replicated globally so that a user in Tokyo sees their feed as fast as a user in New York.

</div>

## How It Works

### Single-Primary (Leader-Follower) Replication

The most common architecture where one database (primary/leader) accepts writes and propagates changes to read-only replicas (followers).

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">SINGLE-PRIMARY REPLICATION FLOW</div>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
      <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 8px; padding: 12px 20px; border: 1px solid #93c5fd;">
        <span style="color: #1e40af; font-weight: 500;">Client</span>
      </div>
      <span style="color: #6366f1;">-- INSERT INTO users --></span>
      <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 8px; padding: 12px 20px; border: 2px solid #3b82f6;">
        <span style="color: #1e40af; font-weight: 600;">Primary</span>
      </div>
    </div>
    <div style="margin-left: 200px; color: #64748b; font-size: 13px;">1. Write to local storage</div>
    <div style="margin-left: 200px; color: #64748b; font-size: 13px;">2. Write to replication log (binlog/WAL)</div>
    <div style="display: flex; align-items: flex-start; gap: 16px; margin-left: 200px; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; align-items: center;">
        <span style="color: #6366f1;">|</span>
        <span style="color: #6366f1;">v</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #22c55e;">replicate --></span>
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 6px; padding: 8px 16px; border: 1px solid #86efac;">
            <span style="color: #166534;">Replica 1</span>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #22c55e;">replicate --></span>
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 6px; padding: 8px 16px; border: 1px solid #86efac;">
            <span style="color: #166534;">Replica 2</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

### Synchronous vs Asynchronous Replication

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">REPLICATION MODES</div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px; border: 1px solid #93c5fd;">
      <div style="color: #1e40af; font-weight: 600; margin-bottom: 12px;">SYNCHRONOUS</div>
      <div style="font-size: 13px; color: #1e293b; line-height: 1.8;">
        <div>1. Client sends write</div>
        <div>2. Primary writes locally</div>
        <div>3. Primary sends to ALL replicas</div>
        <div>4. <strong>Waits for ALL replicas to confirm</strong></div>
        <div>5. Returns success to client</div>
      </div>
      <div style="margin-top: 12px; background: rgba(34, 197, 94, 0.15); border-radius: 6px; padding: 8px; text-align: center;">
        <span style="color: #166534; font-size: 12px;">Strong consistency, higher latency</span>
      </div>
    </div>
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; border: 1px solid #fcd34d;">
      <div style="color: #92400e; font-weight: 600; margin-bottom: 12px;">ASYNCHRONOUS</div>
      <div style="font-size: 13px; color: #1e293b; line-height: 1.8;">
        <div>1. Client sends write</div>
        <div>2. Primary writes locally</div>
        <div>3. <strong>Returns success to client immediately</strong></div>
        <div>4. Primary sends to replicas (background)</div>
        <div>5. Replicas apply when they can</div>
      </div>
      <div style="margin-top: 12px; background: rgba(234, 179, 8, 0.15); border-radius: 6px; padding: 8px; text-align: center;">
        <span style="color: #92400e; font-size: 12px;">Lower latency, eventual consistency</span>
      </div>
    </div>
  </div>
</div>

### The Replication Lag Problem

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">

**The Scenario**: User updates their profile, then immediately views it.

```
Time T=0: User writes "name = Alice" to PRIMARY
Time T=1: PRIMARY confirms "Success!"
Time T=2: User reads from REPLICA (for load balancing)
Time T=3: REPLICA hasn't received the update yet!
Result: User sees old name "Bob" - confusion!
```

This is the **read-your-writes consistency** problem. Solutions:
1. Route user's reads to primary for N seconds after their writes
2. Track replication position and only read from caught-up replicas
3. Use synchronous replication (but sacrifice performance)

</div>

## Replication Methods

### 1. Statement-Based Replication
Replicate the actual SQL statements.

```sql
-- Primary executes and logs:
INSERT INTO users (name, created_at) VALUES ('Alice', NOW());

-- Replica receives and executes same statement
-- Problem: NOW() returns different times!
```

**Issues**: Non-deterministic functions (NOW(), RAND(), AUTO_INCREMENT) produce different results.

### 2. Row-Based Replication (Most Common)
Replicate the actual row changes.

```python
# Binary log entry (MySQL)
{
    "type": "INSERT",
    "table": "users",
    "row": {
        "id": 123,
        "name": "Alice",
        "created_at": "2024-01-15 10:30:00"  # Actual value, not NOW()
    }
}
```

**Pros**: Deterministic, works with all operations
**Cons**: Larger log size for bulk updates

### 3. Write-Ahead Log (WAL) Shipping
Ship the database's internal write-ahead log to replicas.

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

## Code Examples

### Python - Replication-Aware Router

```python
import random
import time
from typing import List, Optional
from dataclasses import dataclass

@dataclass
class DatabaseNode:
    host: str
    port: int
    is_primary: bool
    is_healthy: bool = True
    replication_lag_ms: int = 0

class ReplicationRouter:
    """Routes queries to appropriate database nodes."""

    def __init__(self, primary: DatabaseNode, replicas: List[DatabaseNode]):
        self.primary = primary
        self.replicas = replicas
        self.max_acceptable_lag_ms = 1000  # 1 second

        # Track recent writes per session for read-your-writes consistency
        self.recent_writes: dict = {}  # session_id -> timestamp

    def get_write_connection(self) -> DatabaseNode:
        """Always route writes to primary."""
        if not self.primary.is_healthy:
            raise Exception("Primary is not healthy - writes unavailable")
        return self.primary

    def get_read_connection(self,
                           session_id: Optional[str] = None,
                           require_strong_consistency: bool = False
                           ) -> DatabaseNode:
        """
        Route reads based on consistency requirements.

        Args:
            session_id: If provided, ensures read-your-writes consistency
            require_strong_consistency: If True, always read from primary
        """
        # Strong consistency always goes to primary
        if require_strong_consistency:
            return self.primary

        # Check if this session recently wrote
        if session_id and session_id in self.recent_writes:
            last_write = self.recent_writes[session_id]
            if time.time() - last_write < 2.0:  # Within 2 seconds
                return self.primary  # Read from primary for consistency

        # Find healthy replicas with acceptable lag
        available = [
            r for r in self.replicas
            if r.is_healthy and r.replication_lag_ms <= self.max_acceptable_lag_ms
        ]

        if not available:
            # Fallback to primary if no replicas available
            return self.primary

        # Load balance across available replicas
        return random.choice(available)

    def record_write(self, session_id: str):
        """Record that a session performed a write."""
        self.recent_writes[session_id] = time.time()

        # Cleanup old entries
        cutoff = time.time() - 60  # Keep for 1 minute
        self.recent_writes = {
            k: v for k, v in self.recent_writes.items()
            if v > cutoff
        }

    def execute_write(self, session_id: str, query: str) -> dict:
        """Execute a write query."""
        node = self.get_write_connection()
        result = self._execute(node, query)
        self.record_write(session_id)
        return result

    def execute_read(self,
                    query: str,
                    session_id: Optional[str] = None,
                    strong: bool = False) -> dict:
        """Execute a read query."""
        node = self.get_read_connection(session_id, strong)
        return self._execute(node, query)

    def _execute(self, node: DatabaseNode, query: str) -> dict:
        """Execute query on specified node."""
        print(f"Executing on {node.host}:{node.port} "
              f"(primary={node.is_primary}): {query[:50]}...")
        return {"result": "ok", "node": node.host}


# Usage example
primary = DatabaseNode(host="db-primary", port=5432, is_primary=True)
replicas = [
    DatabaseNode(host="db-replica-1", port=5432, is_primary=False,
                replication_lag_ms=50),
    DatabaseNode(host="db-replica-2", port=5432, is_primary=False,
                replication_lag_ms=100),
    DatabaseNode(host="db-replica-3", port=5432, is_primary=False,
                replication_lag_ms=2000),  # High lag - will be excluded
]

router = ReplicationRouter(primary, replicas)

# User updates their profile, then views it
session = "user-123-session"
router.execute_write(session, "UPDATE users SET name = 'Alice' WHERE id = 123")
router.execute_read("SELECT * FROM users WHERE id = 123", session_id=session)
# ^ This goes to PRIMARY because user just wrote

# Different user reads (no recent writes)
router.execute_read("SELECT * FROM products", session_id="user-456-session")
# ^ This goes to a REPLICA for load balancing
```

### Go - Replication Manager with Failover

```go
package main

import (
    "context"
    "errors"
    "log"
    "sync"
    "time"
)

type ReplicationMode int

const (
    Async ReplicationMode = iota
    SemiSync
    Sync
)

type ReplicaNode struct {
    ID          string
    Address     string
    IsHealthy   bool
    Lag         time.Duration
    LastContact time.Time
    mu          sync.RWMutex
}

func (r *ReplicaNode) UpdateHealth(healthy bool, lag time.Duration) {
    r.mu.Lock()
    defer r.mu.Unlock()
    r.IsHealthy = healthy
    r.Lag = lag
    r.LastContact = time.Now()
}

func (r *ReplicaNode) GetLag() time.Duration {
    r.mu.RLock()
    defer r.mu.RUnlock()
    return r.Lag
}

type WriteEntry struct {
    Key       string
    Value     []byte
    Timestamp time.Time
    LSN       int64 // Log Sequence Number
}

type ReplicationManager struct {
    primaryAddr string
    replicas    []*ReplicaNode
    mode        ReplicationMode
    minAcks     int

    wal       []WriteEntry
    walMu     sync.RWMutex
    currentLSN int64

    healthCheckInterval time.Duration
}

func NewReplicationManager(primaryAddr string, mode ReplicationMode) *ReplicationManager {
    rm := &ReplicationManager{
        primaryAddr:         primaryAddr,
        replicas:           make([]*ReplicaNode, 0),
        mode:               mode,
        minAcks:            1,
        wal:                make([]WriteEntry, 0),
        healthCheckInterval: 5 * time.Second,
    }
    return rm
}

func (rm *ReplicationManager) AddReplica(id, address string) {
    replica := &ReplicaNode{
        ID:        id,
        Address:   address,
        IsHealthy: true,
    }
    rm.replicas = append(rm.replicas, replica)
}

func (rm *ReplicationManager) Write(ctx context.Context, key string, value []byte) error {
    // Write to WAL first
    rm.walMu.Lock()
    rm.currentLSN++
    entry := WriteEntry{
        Key:       key,
        Value:     value,
        Timestamp: time.Now(),
        LSN:       rm.currentLSN,
    }
    rm.wal = append(rm.wal, entry)
    rm.walMu.Unlock()

    // Replicate based on mode
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
    errCh := make(chan error, len(rm.replicas))

    for _, replica := range rm.replicas {
        if !replica.IsHealthy {
            continue
        }

        wg.Add(1)
        go func(r *ReplicaNode) {
            defer wg.Done()
            if err := rm.sendToReplica(ctx, r, entry); err != nil {
                errCh <- err
            }
        }(replica)
    }

    wg.Wait()
    close(errCh)

    // Return first error if any
    for err := range errCh {
        return err
    }
    return nil
}

func (rm *ReplicationManager) semiSyncReplicate(ctx context.Context, entry WriteEntry) error {
    ackCh := make(chan bool, len(rm.replicas))
    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()

    for _, replica := range rm.replicas {
        if !replica.IsHealthy {
            continue
        }

        go func(r *ReplicaNode) {
            if err := rm.sendToReplica(ctx, r, entry); err == nil {
                ackCh <- true
            }
        }(replica)
    }

    acks := 0
    for {
        select {
        case <-ackCh:
            acks++
            if acks >= rm.minAcks {
                return nil // Got minimum required acks
            }
        case <-ctx.Done():
            return errors.New("replication timeout: insufficient acks")
        }
    }
}

func (rm *ReplicationManager) asyncReplicate(entry WriteEntry) {
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()

    for _, replica := range rm.replicas {
        if replica.IsHealthy {
            rm.sendToReplica(ctx, replica, entry)
        }
    }
}

func (rm *ReplicationManager) sendToReplica(ctx context.Context, replica *ReplicaNode, entry WriteEntry) error {
    // In real implementation, this would be a network call
    log.Printf("Replicating LSN %d to %s: %s", entry.LSN, replica.ID, entry.Key)

    // Simulate network delay
    select {
    case <-time.After(10 * time.Millisecond):
        replica.UpdateHealth(true, 10*time.Millisecond)
        return nil
    case <-ctx.Done():
        return ctx.Err()
    }
}

func (rm *ReplicationManager) MonitorReplicationLag() {
    ticker := time.NewTicker(rm.healthCheckInterval)
    defer ticker.Stop()

    for range ticker.C {
        for _, replica := range rm.replicas {
            lag := replica.GetLag()

            if lag > 10*time.Second {
                log.Printf("WARNING: Replica %s has high lag: %v", replica.ID, lag)
            }

            // Mark unhealthy if no contact in 30 seconds
            replica.mu.Lock()
            if time.Since(replica.LastContact) > 30*time.Second {
                replica.IsHealthy = false
                log.Printf("Replica %s marked unhealthy", replica.ID)
            }
            replica.mu.Unlock()
        }
    }
}

func (rm *ReplicationManager) PromoteReplica(replicaID string) error {
    // Find the replica to promote
    var bestReplica *ReplicaNode
    var lowestLag time.Duration = time.Hour

    for _, replica := range rm.replicas {
        if replica.IsHealthy && replica.GetLag() < lowestLag {
            lowestLag = replica.GetLag()
            bestReplica = replica
        }
    }

    if bestReplica == nil {
        return errors.New("no healthy replica available for promotion")
    }

    log.Printf("Promoting replica %s to primary (lag was %v)", bestReplica.ID, lowestLag)

    // In real implementation:
    // 1. Stop writes to old primary
    // 2. Wait for replica to catch up
    // 3. Promote replica
    // 4. Update DNS/routing
    // 5. Convert old primary to replica

    return nil
}

func main() {
    rm := NewReplicationManager("primary:5432", SemiSync)

    rm.AddReplica("replica-1", "replica1:5432")
    rm.AddReplica("replica-2", "replica2:5432")

    go rm.MonitorReplicationLag()

    ctx := context.Background()
    for i := 0; i < 10; i++ {
        key := "key-" + string(rune('a'+i))
        value := []byte("value-" + string(rune('a'+i)))

        if err := rm.Write(ctx, key, value); err != nil {
            log.Printf("Write failed: %v", err)
        }
    }

    time.Sleep(2 * time.Second)
}
```

## Failover Strategies

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">AUTOMATIC FAILOVER PROCESS</div>
  <div style="margin-bottom: 32px;">
    <div style="color: #166534; font-weight: 600; margin-bottom: 16px;">BEFORE FAILURE:</div>
    <div style="display: flex; align-items: center; gap: 24px; flex-wrap: wrap;">
      <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 20px; min-width: 150px; text-align: center; border: 2px solid #22c55e;">
        <div style="color: #166534; font-weight: 600;">PRIMARY</div>
        <div style="color: #22c55e; font-size: 12px;">(Active)</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="color: #6366f1; font-size: 16px;">--></span>
          <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 10px; padding: 14px; min-width: 130px; text-align: center; border: 1px solid #cbd5e1;">
            <div style="color: #475569; font-weight: 500;">REPLICA 1</div>
            <div style="color: #64748b; font-size: 12px;">(Standby)</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="color: #6366f1; font-size: 16px;">--></span>
          <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 10px; padding: 14px; min-width: 130px; text-align: center; border: 1px solid #cbd5e1;">
            <div style="color: #475569; font-weight: 500;">REPLICA 2</div>
            <div style="color: #64748b; font-size: 12px;">(Standby)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="margin-bottom: 32px;">
    <div style="color: #dc2626; font-weight: 600; margin-bottom: 16px;">FAILURE DETECTED:</div>
    <div style="display: flex; align-items: flex-start; gap: 24px; flex-wrap: wrap;">
      <div style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border-radius: 12px; padding: 20px; min-width: 150px; text-align: center; opacity: 0.8; border: 2px solid #ef4444;">
        <div style="color: #991b1b; font-weight: 600;">PRIMARY</div>
        <div style="color: #dc2626; font-size: 12px;">(Down)</div>
        <div style="color: #dc2626; font-size: 16px; margin-top: 8px;">FAILED!</div>
      </div>
      <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px; flex: 1; min-width: 280px; border: 1px solid #93c5fd;">
        <div style="color: #1e40af; font-weight: 600; margin-bottom: 12px; text-align: center;">FAILOVER PROCESS</div>
        <div style="color: #1e293b; font-size: 13px;">
          <div style="margin-bottom: 6px;">1. Detect failure (heartbeat timeout)</div>
          <div style="margin-bottom: 6px;">2. Select best replica (lowest replication lag)</div>
          <div style="margin-bottom: 6px;">3. Promote replica to primary</div>
          <div style="margin-bottom: 6px;">4. Reconfigure remaining replicas</div>
          <div>5. Update DNS/connection routing</div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div style="color: #166534; font-weight: 600; margin-bottom: 16px;">AFTER FAILOVER:</div>
    <div style="display: flex; align-items: center; gap: 24px; flex-wrap: wrap;">
      <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 20px; min-width: 150px; text-align: center; border: 2px solid #22c55e;">
        <div style="color: #166534; font-weight: 600;">REPLICA 1</div>
        <div style="color: #22c55e; font-size: 12px;">(NEW PRIMARY)</div>
        <div style="color: #16a34a; font-size: 14px; margin-top: 4px;">Active</div>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="color: #6366f1; font-size: 16px;">--></span>
        <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 10px; padding: 14px; min-width: 130px; text-align: center; border: 1px solid #cbd5e1;">
          <div style="color: #475569; font-weight: 500;">REPLICA 2</div>
          <div style="color: #64748b; font-size: 12px;">(Standby)</div>
        </div>
      </div>
    </div>
  </div>
</div>

### Split-Brain Prevention

```python
class QuorumBasedFailover:
    """Prevent split-brain using quorum consensus."""

    def __init__(self, nodes: List[str]):
        self.nodes = nodes
        self.quorum = len(nodes) // 2 + 1

    def elect_new_primary(self) -> Optional[str]:
        """Elect new primary only if we have quorum."""
        reachable = [n for n in self.nodes if self.can_reach(n)]

        if len(reachable) < self.quorum:
            raise NoQuorumError(
                f"Cannot elect leader: only {len(reachable)}/{len(self.nodes)} "
                f"nodes reachable, need {self.quorum}"
            )

        # Elect node with lowest replication lag
        candidates = [(n, self.get_replication_lag(n)) for n in reachable]
        candidates.sort(key=lambda x: x[1])  # Sort by lag

        new_primary = candidates[0][0]
        return new_primary
```

## Common Pitfalls

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">

### 1. Ignoring Replication Lag
**Problem**: Reading from replica immediately after write returns stale data.
**Solution**: Track write timestamps per session; route recent writers to primary.

### 2. Split-Brain on Network Partition
**Problem**: Both sides of a partition think they're the primary; both accept writes.
**Solution**: Use quorum-based leader election; minority partition goes read-only.

### 3. Promoting Lagged Replica
**Problem**: Promoting a replica that's behind loses committed transactions.
**Solution**: Always check replication lag before promotion; wait for catch-up if possible.

### 4. Not Testing Failover
**Problem**: Failover process is broken when you actually need it.
**Solution**: Regularly test failover in production (chaos engineering).

### 5. Synchronous Replication Over WAN
**Problem**: Cross-region synchronous replication adds 100ms+ to every write.
**Solution**: Use semi-synchronous (ack from 1 local replica) or async for geo-distributed systems.

</div>

## Interview Questions

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

### Fundamental Questions

1. **How do you handle replication lag?**
   - Monitor lag metrics continuously
   - Route time-sensitive reads to primary
   - Use read-your-writes consistency for user sessions
   - Consider semi-synchronous replication for critical data

2. **What happens during a failover?**
   - Detect primary failure (heartbeat timeout)
   - Select replica with lowest lag (most up-to-date)
   - Promote selected replica to primary
   - Reconfigure other replicas to follow new primary
   - Update connection routing (DNS, proxy config)

3. **How do you prevent split-brain?**
   - Quorum-based leader election (need majority)
   - Fencing/STONITH (Shoot The Other Node In The Head)
   - External arbitrator service
   - Lease-based leadership with expiration

4. **When would you use multi-primary replication?**
   - Geographic distribution (write locally, reduce latency)
   - High write availability requirements
   - Requires conflict resolution strategy (last-write-wins, merge, CRDTs)

### Advanced Questions

5. **Explain the difference between physical and logical replication.**
   - Physical: Replicate disk blocks/pages (byte-for-byte copy)
   - Logical: Replicate row changes (INSERT, UPDATE, DELETE)
   - Physical is simpler but requires same DB version
   - Logical allows heterogeneous systems, selective replication

6. **How would you implement read-your-writes consistency?**
   - Track last write timestamp per session
   - Include write position in response
   - Only read from replicas that have reached that position
   - Or route to primary for N seconds after write

7. **What's the CAP theorem trade-off in replication?**
   - Synchronous: CP (consistent but unavailable during partition)
   - Asynchronous: AP (available but potentially stale reads)
   - Most systems choose AP with tunable consistency

</div>

## Best Practices

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

1. **Monitor replication lag** - Alert when lag exceeds acceptable threshold
2. **Test failover regularly** - Run failover drills monthly; automate if possible
3. **Use checksums** - Verify data integrity between primary and replicas
4. **Separate networks** - Dedicated replication network to avoid contention
5. **Size replicas appropriately** - Replicas need same resources as primary
6. **Plan for catch-up** - New/recovered replicas need bandwidth to catch up
7. **Document runbooks** - Clear procedures for manual failover if automation fails

</div>

## Related Topics

- [Database Sharding](/topic/system-design/database-sharding)
- [CAP Theorem](/topic/system-design/cap-theorem)
- [Consensus Algorithms](/topic/system-design/consensus-algorithms)
