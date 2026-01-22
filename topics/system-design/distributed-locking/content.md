# Distributed Locking

## Overview

Distributed locking is a mechanism that ensures only one process or node in a distributed system can access a shared resource at any given time. Think of it like a bathroom key at a coffee shop - only one person can use it at a time, and they must return it before someone else can enter.

In a single-machine environment, you can use mutexes or semaphores. But in distributed systems with multiple servers, you need a coordination mechanism that works across network boundaries while handling failures gracefully.

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

## How It Works

### The Fundamental Challenge

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">The Distributed Lock Problem</h4>
  <div style="color: #475569; margin-bottom: 16px;">Unlike local locks, distributed locks must handle network partitions, clock skew, and process failures.</div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 16px;">
      <div style="color: #065f46; font-weight: 600; margin-bottom: 12px;">Local Lock (Easy)</div>
      <div style="color: #047857; font-size: 14px;">
        <div>1. Thread requests mutex</div>
        <div>2. OS grants or blocks</div>
        <div>3. Thread releases mutex</div>
        <div style="margin-top: 8px; color: #10b981;">Single point of truth (OS kernel)</div>
      </div>
    </div>
    <div style="background: #fef2f2; border: 1px solid #ef4444; border-radius: 8px; padding: 16px;">
      <div style="color: #991b1b; font-weight: 600; margin-bottom: 12px;">Distributed Lock (Hard)</div>
      <div style="color: #b91c1c; font-size: 14px;">
        <div>1. Client A acquires lock</div>
        <div>2. Network partition occurs</div>
        <div>3. Lock service thinks A died</div>
        <div>4. Client B acquires "same" lock</div>
        <div style="margin-top: 8px; color: #ef4444;">Two clients think they have the lock!</div>
      </div>
    </div>
  </div>
</div>

### Lock Lifecycle

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Distributed Lock Flow</h4>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">1</div>
      <div style="flex: 1; background: #eff6ff; border-radius: 8px; padding: 12px;">
        <div style="color: #1e40af; font-weight: 600;">Acquire Request</div>
        <div style="color: #3730a3; font-size: 13px;">Client sends lock request with unique identifier and TTL</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">2</div>
      <div style="flex: 1; background: #eff6ff; border-radius: 8px; padding: 12px;">
        <div style="color: #1e40af; font-weight: 600;">Atomic Check-and-Set</div>
        <div style="color: #3730a3; font-size: 13px;">Lock service atomically checks if lock is free and sets it if so</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">3</div>
      <div style="flex: 1; background: #eff6ff; border-radius: 8px; padding: 12px;">
        <div style="color: #1e40af; font-weight: 600;">Execute Critical Section</div>
        <div style="color: #3730a3; font-size: 13px;">Client performs protected operation while holding the lock</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">4</div>
      <div style="flex: 1; background: #eff6ff; border-radius: 8px; padding: 12px;">
        <div style="color: #1e40af; font-weight: 600;">Release Lock</div>
        <div style="color: #3730a3; font-size: 13px;">Client releases lock only if it still owns it (compare-and-delete)</div>
      </div>
    </div>
  </div>
</div>

### Fencing Tokens - The Critical Safety Mechanism

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Why Fencing Tokens Are Essential</h4>

  <div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <div style="color: #991b1b; font-weight: 600; margin-bottom: 8px;">Problem: Lock Can Expire During Operation</div>
    <div style="color: #7f1d1d; font-size: 13px; font-family: monospace;">
      t0: Client A acquires lock (token=1)<br>
      t1: Client A pauses (GC, network delay)<br>
      t2: Lock expires (TTL reached)<br>
      t3: Client B acquires lock (token=2)<br>
      t4: Client B writes to resource<br>
      t5: Client A resumes, writes to resource (STALE WRITE!)
    </div>
  </div>

  <div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 16px;">
    <div style="color: #065f46; font-weight: 600; margin-bottom: 8px;">Solution: Fencing Tokens</div>
    <div style="color: #047857; font-size: 13px;">
      <div>1. Each lock acquisition gets a monotonically increasing token</div>
      <div>2. Client includes token with every write operation</div>
      <div>3. Resource rejects writes with tokens lower than the highest seen</div>
      <div style="margin-top: 8px; font-family: monospace; background: #d1fae5; padding: 8px; border-radius: 4px;">
        Client A writes with token=1 at t5<br>
        Resource has seen token=2 from Client B<br>
        Resource REJECTS Client A's write (1 &lt; 2)
      </div>
    </div>
  </div>
</div>

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
      <div>1. Implemented fencing tokens on all write operations</div>
      <div>2. Moved to a consensus-based lock service (based on Raft)</div>
      <div>3. Added write barriers that validate lock ownership before persisting</div>
      <div>4. Introduced operation idempotency with request deduplication</div>
    </div>
  </div>
</div>

---

## Implementation

### Redis-Based Distributed Lock

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
        """Extend lock TTL if we still own it."""
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


# Usage Example
def process_order(order_id: str, order_data: dict):
    """Process an order with distributed locking and fencing."""
    redis_client = redis.Redis(host='localhost', port=6379)
    lock = DistributedLock(redis_client, f"order:{order_id}")

    with lock.hold(timeout=30):
        fence_token = lock.get_fence_token()

        # All writes include the fence token for validation
        resource = FencedResource(db_connection)

        try:
            resource.write(
                resource_id=order_id,
                data=order_data,
                fence_token=fence_token
            )
            print(f"Order {order_id} processed successfully")
        except StaleFenceTokenError:
            print(f"Lock expired during processing of order {order_id}")
            # Handle by retrying or alerting
```

### Redlock Implementation for Better Safety

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

    def __init__(self, redis_clients: List[redis.Redis], name: str,
                 ttl_ms: int = 30000):
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
            drift_ms = self.ttl_ms * 0.01  # 1% clock drift allowance
            validity_ms = self.ttl_ms - elapsed_ms - drift_ms

            if acquired_count >= self.quorum and validity_ms > 0:
                self.acquired_at = time.time()
                return True

            # Failed - release any acquired locks
            self._release_all()
            time.sleep(0.05)

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
                pass

    def validity_time_remaining_ms(self) -> float:
        """Get remaining validity time in milliseconds."""
        if not self.acquired_at:
            return 0
        elapsed = (time.time() - self.acquired_at) * 1000
        return max(0, self.ttl_ms - elapsed)


# Usage with multiple Redis instances
redis_instances = [
    redis.Redis(host='redis1.example.com', port=6379),
    redis.Redis(host='redis2.example.com', port=6379),
    redis.Redis(host='redis3.example.com', port=6379),
    redis.Redis(host='redis4.example.com', port=6379),
    redis.Redis(host='redis5.example.com', port=6379),
]

lock = RedlockLock(redis_instances, "critical-resource")
if lock.acquire():
    try:
        # Check validity before critical operations
        if lock.validity_time_remaining_ms() > 5000:
            perform_critical_operation()
    finally:
        lock.release()
```

---

## Interview Questions

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">

### Q1: What's the difference between Redis SETNX and a proper distributed lock?

**Answer:** SETNX is just an atomic set-if-not-exists operation. A proper distributed lock requires:

1. **Ownership tracking**: Store a unique token with the lock so only the owner can release it
2. **TTL for safety**: Locks must expire to prevent deadlocks if the holder crashes
3. **Atomic release**: Compare-and-delete to prevent releasing someone else's lock
4. **Fencing tokens**: Monotonically increasing tokens to reject stale writes

SETNX alone doesn't prevent the "pausing problem" where a client's lock expires while it's still processing.

### Q2: Explain the Redlock algorithm and its criticisms.

**Answer:** Redlock acquires locks on N independent Redis masters, requiring a majority (N/2 + 1) to succeed within a validity period.

**Algorithm:**
1. Get current time in milliseconds
2. Try to acquire lock on all N instances sequentially
3. Calculate elapsed time
4. Lock is valid if: majority acquired AND (TTL - elapsed - drift) > 0

**Criticisms (per Martin Kleppmann):**
- Assumes bounded network delay and clock drift
- Client pause (GC) can still cause safety violations
- No true consensus - it's a probabilistic guarantee
- Clock synchronization requirements may not hold in practice

**When to use:** Efficiency use cases where occasional duplicate processing is tolerable. For true safety, use consensus-based systems like ZooKeeper or etcd.

### Q3: How would you implement leader election using distributed locks?

**Answer:**
```python
def leader_election_loop(lock_service, node_id):
    while True:
        try:
            if lock_service.acquire("leader-lock", ttl=30):
                print(f"{node_id} is now the leader")
                while lock_service.extend("leader-lock"):
                    perform_leader_duties()
                    time.sleep(10)  # Heartbeat interval
        except LockLostError:
            print(f"{node_id} lost leadership")
        time.sleep(5)  # Wait before trying again
```

Key considerations:
- Use heartbeat-based extension, not one-shot TTL
- Detect when leadership is lost and stop leader duties
- Handle split-brain by using fencing tokens in all leader operations

### Q4: What is a fencing token and why is it necessary?

**Answer:** A fencing token is a monotonically increasing number assigned to each lock acquisition. It's necessary because distributed locks can expire while the holder still thinks they have it.

**Without fencing:**
- Client A acquires lock, gets paused by GC
- Lock expires
- Client B acquires lock, performs write
- Client A resumes, performs write (CORRUPTS DATA)

**With fencing:**
- Client A acquires lock with token=33
- Lock expires, Client B gets token=34
- Client B writes with token=34
- Client A tries to write with token=33
- Storage rejects (33 < 34 is stale)

The resource (database, file system) must validate tokens, not just the lock service.

### Q5: When should you NOT use distributed locking?

**Answer:**

**Avoid distributed locks when:**
1. **Optimistic concurrency works**: Use version numbers/ETags for low-contention updates
2. **Idempotent operations**: Design operations that can safely retry
3. **Event sourcing**: Append-only logs avoid conflicts entirely
4. **CRDTs**: Conflict-free replicated data types merge automatically
5. **Single-node processing**: If data partitions cleanly, avoid cross-partition locks

**Use distributed locks when:**
- Exactly-once execution is required
- External systems don't support conditional updates
- Complex operations that can't be made idempotent
- Leader election for singleton processes

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
  </div>
</div>

---

## Quick Reference Card

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Distributed Locking Cheat Sheet</h4>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div>
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Lock Service Options</div>
      <div style="font-size: 14px; color: #475569;">
        <div style="padding: 4px 0;"><strong>Redis (single):</strong> Fast, simple, not safe</div>
        <div style="padding: 4px 0;"><strong>Redlock:</strong> Better safety, 5+ nodes</div>
        <div style="padding: 4px 0;"><strong>ZooKeeper:</strong> Strong consistency, complex</div>
        <div style="padding: 4px 0;"><strong>etcd:</strong> Raft consensus, Kubernetes native</div>
      </div>
    </div>

    <div>
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">TTL Guidelines</div>
      <div style="font-size: 14px; color: #475569;">
        <div style="padding: 4px 0;"><strong>Formula:</strong> TTL = 3x expected operation time</div>
        <div style="padding: 4px 0;"><strong>Short ops:</strong> 10-30 seconds</div>
        <div style="padding: 4px 0;"><strong>Long ops:</strong> Use heartbeat extension</div>
        <div style="padding: 4px 0;"><strong>Extension interval:</strong> TTL / 3</div>
      </div>
    </div>

    <div>
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Safety Checklist</div>
      <div style="font-size: 14px; color: #475569;">
        <div style="padding: 4px 0;">[ ] Unique token per acquisition</div>
        <div style="padding: 4px 0;">[ ] TTL on all locks</div>
        <div style="padding: 4px 0;">[ ] Compare-and-delete on release</div>
        <div style="padding: 4px 0;">[ ] Fencing tokens validated by resources</div>
        <div style="padding: 4px 0;">[ ] Majority quorum for critical ops</div>
      </div>
    </div>

    <div>
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Alternatives to Locks</div>
      <div style="font-size: 14px; color: #475569;">
        <div style="padding: 4px 0;"><strong>Optimistic locking:</strong> Version numbers</div>
        <div style="padding: 4px 0;"><strong>Idempotency:</strong> Unique request IDs</div>
        <div style="padding: 4px 0;"><strong>Event sourcing:</strong> Append-only logs</div>
        <div style="padding: 4px 0;"><strong>CRDTs:</strong> Conflict-free data types</div>
      </div>
    </div>
  </div>
</div>

---

## Related Topics

- [Database Sharding](/topic/system-design/database-sharding) - Partitioning to reduce lock contention
- [Consensus Algorithms](/topic/system-design/consensus-algorithms) - Raft, Paxos for true safety
- [Event Sourcing](/topic/system-design/event-sourcing) - Lock-free alternative pattern
- [CAP Theorem](/topic/system-design/cap-theorem) - Understanding consistency trade-offs
