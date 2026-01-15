# Distributed Locking

## Overview

Distributed locking coordinates access to shared resources across multiple processes or nodes. Unlike local locks (mutexes), distributed locks must handle network partitions, node failures, and clock skew.

## The Intuitive Mental Model: Hotel Key Card System

Think of distributed locking like a hotel key card system:

```
Single-Location Lock (Easy):
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Guest → Reception → Physical Key → Room                        │
│                                                                 │
│  - Only one key exists                                          │
│  - Reception knows who has it                                   │
│  - Simple and reliable                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Distributed Lock (Hard - Multiple Hotels in Chain):
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Guest → Any Reception → Electronic Key Card → Any Room         │
│             │                                                   │
│      [Must coordinate                                           │
│       across all hotels]                                        │
│             │                                                   │
│  Problems:                                                      │
│  - What if network fails between hotels?                        │
│  - What if guest's card expires mid-stay?                       │
│  - What if hotel database is out of sync?                       │
│  - What if two receptions issue cards simultaneously?           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Mapping the Metaphor

| Hotel System | Distributed Lock | Purpose |
|--------------|------------------|---------|
| Key card | Lock token | Proof of ownership |
| Card expiration | Lock TTL | Prevents infinite holds |
| Card number | Fencing token | Proves freshness |
| Reception database | Lock storage (Redis, ZK) | State coordination |
| Guest ID | Client ID | Identifies lock holder |
| Room | Protected resource | What we're locking access to |

---

## 20-Year Insight: What Experience Teaches

### What Junior Developers Think:
> "I'll just use Redis SETNX. Distributed locking is easy."

### What Senior Developers Know:
> "Distributed locking is one of the hardest problems in distributed systems. Every 'simple' solution has subtle failure modes that will corrupt your data. The question isn't IF your lock will fail, but WHEN and HOW BADLY."

### The Deeper Truth:
After 20+ years of distributed systems:
1. **You probably don't need distributed locks** - Most problems have lock-free solutions
2. **All distributed locks can fail** - They're probabilistic, not guaranteed
3. **Fencing tokens are non-negotiable** - Without them, locks are theater
4. **The failure mode matters** - Fail-open is usually better than fail-closed

---

## Why Distributed Locking Is Hard

### The Fundamental Problem

```
Time →
           t1          t2          t3          t4
           │           │           │           │
Client A:  ├───────────┤           │           │
           │ Acquires  │ Pause     │ Executes  │ (thinks it has lock)
           │ Lock      │ (GC, etc.)│ Write     │
           │           │           │     │     │
Client B:  │           ├───────────┤     │     │
           │           │ Lock      │ Executes  │
           │           │ Expired   │ Write     │
           │           │ B Acquires│     │     │
           │           │           │     │     │
                                         ▼
                              TWO WRITES TO SAME RESOURCE!
                              DATA CORRUPTION!
```

This is the **pausing problem**. Any client can pause (GC, network delay, swap) while holding a lock, causing the lock to expire while they still think they hold it.

---

## Locking Strategies

### 1. Single-Node Redis Lock (Unsafe but Common)

```python
import redis
import uuid
import time

class SingleNodeRedisLock:
    """
    WARNING: This is NOT safe for correctness-critical applications.
    Use only when lock failure = inconvenience, not data corruption.
    """

    def __init__(self, redis_client, key: str, ttl_seconds: int = 30):
        self.redis = redis_client
        self.key = f"lock:{key}"
        self.ttl = ttl_seconds
        self.token = None

    def acquire(self, timeout: float = 10) -> bool:
        """Attempt to acquire lock."""
        self.token = str(uuid.uuid4())
        deadline = time.time() + timeout

        while time.time() < deadline:
            # SET key value NX EX ttl
            if self.redis.set(self.key, self.token, nx=True, ex=self.ttl):
                return True
            time.sleep(0.1)

        return False

    def release(self) -> bool:
        """Release lock if we still own it."""
        # Lua script for atomic check-and-delete
        lua_script = """
        if redis.call("get", KEYS[1]) == ARGV[1] then
            return redis.call("del", KEYS[1])
        else
            return 0
        end
        """
        result = self.redis.eval(lua_script, 1, self.key, self.token)
        return result == 1

    def extend(self, additional_seconds: int) -> bool:
        """Extend lock TTL if we still own it."""
        lua_script = """
        if redis.call("get", KEYS[1]) == ARGV[1] then
            return redis.call("expire", KEYS[1], ARGV[2])
        else
            return 0
        end
        """
        result = self.redis.eval(
            lua_script, 1, self.key, self.token, additional_seconds
        )
        return result == 1


# Usage
lock = SingleNodeRedisLock(redis_client, "order:123")
if lock.acquire():
    try:
        process_order()
    finally:
        lock.release()
else:
    print("Could not acquire lock")
```

**Problems with this approach**:
1. Single point of failure (Redis server)
2. No protection against clock skew
3. No fencing tokens
4. Client pause can cause overlapping locks

---

### 2. Redlock Algorithm (Safer but Still Imperfect)

```python
import redis
import uuid
import time
from typing import List, Optional, Tuple


class RedlockLock:
    """
    Redlock implementation using multiple Redis instances.

    Provides better safety than single-node but still has limitations.
    See Martin Kleppmann's analysis for detailed criticism.
    """

    def __init__(self,
                 redis_clients: List[redis.Redis],
                 key: str,
                 ttl_ms: int = 30000):
        self.clients = redis_clients
        self.quorum = len(redis_clients) // 2 + 1
        self.key = f"lock:{key}"
        self.ttl_ms = ttl_ms
        self.token = None
        self.lock_start_time = None

    def acquire(self, timeout_ms: int = 10000) -> bool:
        """
        Acquire lock using Redlock algorithm.

        1. Get current time
        2. Try to acquire lock on all N instances
        3. Calculate elapsed time
        4. Lock is acquired if majority acquired AND validity time > 0
        """
        self.token = str(uuid.uuid4())
        deadline = time.time() + (timeout_ms / 1000)

        while time.time() < deadline:
            acquired_count = 0
            self.lock_start_time = time.time() * 1000  # ms

            # Try all instances
            for client in self.clients:
                if self._try_acquire_single(client):
                    acquired_count += 1

            # Calculate elapsed time
            elapsed_ms = (time.time() * 1000) - self.lock_start_time

            # Check validity: majority + time remaining
            validity_time_ms = self.ttl_ms - elapsed_ms - (self.ttl_ms * 0.01)

            if acquired_count >= self.quorum and validity_time_ms > 0:
                return True

            # Failed - release any locks acquired
            self._release_all()
            time.sleep(0.05)  # Small delay before retry

        return False

    def _try_acquire_single(self, client: redis.Redis) -> bool:
        """Try to acquire on single instance."""
        try:
            return client.set(
                self.key,
                self.token,
                nx=True,
                px=self.ttl_ms  # milliseconds
            )
        except Exception:
            return False

    def _release_single(self, client: redis.Redis) -> bool:
        """Release on single instance."""
        lua_script = """
        if redis.call("get", KEYS[1]) == ARGV[1] then
            return redis.call("del", KEYS[1])
        else
            return 0
        end
        """
        try:
            return client.eval(lua_script, 1, self.key, self.token) == 1
        except Exception:
            return False

    def _release_all(self):
        """Release lock on all instances."""
        for client in self.clients:
            self._release_single(client)

    def release(self) -> bool:
        """Release the lock."""
        self._release_all()
        return True

    def get_validity_time_ms(self) -> float:
        """Get remaining validity time."""
        if self.lock_start_time is None:
            return 0
        elapsed = (time.time() * 1000) - self.lock_start_time
        return max(0, self.ttl_ms - elapsed)


# Usage
redis_instances = [
    redis.Redis(host='redis1'),
    redis.Redis(host='redis2'),
    redis.Redis(host='redis3'),
    redis.Redis(host='redis4'),
    redis.Redis(host='redis5'),
]

lock = RedlockLock(redis_instances, "resource:123")
if lock.acquire():
    try:
        # Check validity before critical section
        if lock.get_validity_time_ms() > 5000:
            process_resource()
    finally:
        lock.release()
```

**Redlock limitations** (per Martin Kleppmann):
1. Still vulnerable to timing issues
2. Assumes bounded network delay
3. No true consistency guarantee
4. Clock synchronization assumptions

---

### 3. ZooKeeper Lock (Stronger Guarantees)

```python
from kazoo.client import KazooClient
from kazoo.recipe.lock import Lock


class ZooKeeperLock:
    """
    ZooKeeper-based distributed lock.

    Provides stronger guarantees than Redis:
    - Consensus-based (survives failures)
    - Session-based (automatic release on disconnect)
    - Sequential ordering (fair queuing)
    """

    def __init__(self, zk_hosts: str, lock_path: str):
        self.client = KazooClient(hosts=zk_hosts)
        self.client.start()
        self.lock = Lock(self.client, lock_path)

    def acquire(self, timeout: float = None, blocking: bool = True) -> bool:
        """
        Acquire the lock.

        ZooKeeper locks use ephemeral sequential nodes:
        1. Create /lock/resource-0000000001
        2. Get all children of /lock
        3. If our node is lowest, we have lock
        4. Otherwise, watch the next-lowest node
        5. When it disappears, check again
        """
        return self.lock.acquire(blocking=blocking, timeout=timeout)

    def release(self):
        """Release the lock."""
        self.lock.release()

    def __enter__(self):
        self.acquire()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.release()

    def close(self):
        """Close ZooKeeper connection."""
        self.client.stop()
        self.client.close()


# Usage
with ZooKeeperLock("zk1:2181,zk2:2181,zk3:2181", "/locks/resource") as lock:
    process_resource()
```

**ZooKeeper advantages**:
- Consensus protocol (true linearizability)
- Session semantics (automatic cleanup)
- Watches (notification-based, not polling)

**ZooKeeper disadvantages**:
- Operational complexity
- Higher latency than Redis
- ZooKeeper cluster required

---

### 4. Database-Based Lock (Simple but Limited)

```python
import time
from datetime import datetime, timedelta
from contextlib import contextmanager


class DatabaseLock:
    """
    Database-based distributed lock using advisory locks or table rows.

    Pros: Uses existing infrastructure
    Cons: Database becomes bottleneck, not designed for this
    """

    def __init__(self, db_session, lock_name: str, ttl_seconds: int = 30):
        self.session = db_session
        self.lock_name = lock_name
        self.ttl = ttl_seconds
        self.lock_id = None

    def acquire(self, timeout: float = 10) -> bool:
        """Acquire lock using database row."""
        import uuid
        self.lock_id = str(uuid.uuid4())
        deadline = time.time() + timeout

        while time.time() < deadline:
            now = datetime.utcnow()
            expires_at = now + timedelta(seconds=self.ttl)

            # Try to insert or update expired lock
            try:
                result = self.session.execute("""
                    INSERT INTO distributed_locks (lock_name, lock_id, expires_at)
                    VALUES (:name, :id, :expires)
                    ON CONFLICT (lock_name) DO UPDATE
                    SET lock_id = :id, expires_at = :expires
                    WHERE distributed_locks.expires_at < :now
                    RETURNING lock_id
                """, {
                    'name': self.lock_name,
                    'id': self.lock_id,
                    'expires': expires_at,
                    'now': now,
                })
                self.session.commit()

                row = result.fetchone()
                if row and row[0] == self.lock_id:
                    return True

            except Exception:
                self.session.rollback()

            time.sleep(0.1)

        return False

    def release(self) -> bool:
        """Release lock if we still own it."""
        try:
            result = self.session.execute("""
                DELETE FROM distributed_locks
                WHERE lock_name = :name AND lock_id = :id
            """, {'name': self.lock_name, 'id': self.lock_id})
            self.session.commit()
            return result.rowcount > 0
        except Exception:
            self.session.rollback()
            return False

    def extend(self) -> bool:
        """Extend lock TTL."""
        expires_at = datetime.utcnow() + timedelta(seconds=self.ttl)
        try:
            result = self.session.execute("""
                UPDATE distributed_locks
                SET expires_at = :expires
                WHERE lock_name = :name AND lock_id = :id
            """, {'name': self.lock_name, 'id': self.lock_id, 'expires': expires_at})
            self.session.commit()
            return result.rowcount > 0
        except Exception:
            self.session.rollback()
            return False


# SQL table
CREATE_TABLE_SQL = """
CREATE TABLE distributed_locks (
    lock_name VARCHAR(255) PRIMARY KEY,
    lock_id VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_locks_expires ON distributed_locks(expires_at);
"""
```

---

## Fencing Tokens: The Missing Piece

### The Problem Without Fencing

```
Time →
           t1          t2          t3          t4
           │           │           │           │
Client A:  ├───────────┼───────────┤           │
           │ Gets lock │ GC pause  │ Writes    │ ← PROBLEM!
           │ token=1   │           │ resource  │
           │           │           │           │
Client B:  │           ├───────────┤           │
           │           │ Gets lock │ Writes    │ ← This should win
           │           │ token=2   │ resource  │
           │           │           │           │

Without fencing: A's write (token=1) happens AFTER B's write (token=2)
Result: Stale data overwrites fresh data!
```

### The Solution: Fencing Tokens

```python
class FencedLock:
    """Lock with monotonically increasing fencing token."""

    def __init__(self, redis_client, key: str, ttl: int = 30):
        self.redis = redis_client
        self.lock_key = f"lock:{key}"
        self.token_key = f"fence:{key}"
        self.ttl = ttl
        self.my_token = None

    def acquire(self) -> Optional[int]:
        """Acquire lock and return fencing token."""
        import uuid
        owner_id = str(uuid.uuid4())

        # Atomic: increment fence token + set lock
        lua_script = """
        local lock_key = KEYS[1]
        local token_key = KEYS[2]
        local owner = ARGV[1]
        local ttl = tonumber(ARGV[2])

        -- Try to acquire lock
        if redis.call("SET", lock_key, owner, "NX", "EX", ttl) then
            -- Increment and return fencing token
            local token = redis.call("INCR", token_key)
            return token
        else
            return nil
        end
        """

        result = self.redis.eval(
            lua_script, 2,
            self.lock_key, self.token_key,
            owner_id, self.ttl
        )

        if result:
            self.my_token = int(result)
            return self.my_token
        return None

    def get_token(self) -> Optional[int]:
        """Get our fencing token."""
        return self.my_token


class FencedResource:
    """Resource that validates fencing tokens before writes."""

    def __init__(self, db_session):
        self.session = db_session

    def write(self, resource_id: str, data: dict, fence_token: int) -> bool:
        """
        Write data only if fence_token is newer than stored token.

        This is the CRITICAL protection against stale locks.
        """
        result = self.session.execute("""
            UPDATE resources
            SET data = :data, fence_token = :token, updated_at = NOW()
            WHERE id = :id AND fence_token < :token
        """, {
            'id': resource_id,
            'data': data,
            'token': fence_token,
        })
        self.session.commit()

        if result.rowcount == 0:
            # Either resource doesn't exist or our token is stale
            raise StaleTokenError(f"Token {fence_token} is stale")

        return True


# Usage
lock = FencedLock(redis_client, "order:123")
token = lock.acquire()
if token:
    try:
        # Resource validates token before accepting write
        resource.write("order:123", order_data, token)
    except StaleTokenError:
        # Our lock expired while we were processing
        logger.warning("Lock expired, write rejected")
    finally:
        lock.release()
```

**Why fencing tokens work**:
1. Tokens are monotonically increasing
2. Resource stores the highest token it's seen
3. Writes with lower tokens are rejected
4. Even if Client A's delayed write arrives, it's rejected

---

## Production-Grade Implementation

### Go - Complete Distributed Lock

```go
package distlock

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"sync"
	"time"

	"github.com/go-redis/redis/v8"
)

var (
	ErrLockNotAcquired = errors.New("lock not acquired")
	ErrLockNotHeld     = errors.New("lock not held")
)

// Config holds lock configuration
type Config struct {
	TTL           time.Duration
	RetryDelay    time.Duration
	RetryCount    int
	DriftFactor   float64 // Clock drift factor (typically 0.01)
}

// DefaultConfig returns sensible defaults
func DefaultConfig() Config {
	return Config{
		TTL:         30 * time.Second,
		RetryDelay:  100 * time.Millisecond,
		RetryCount:  3,
		DriftFactor: 0.01,
	}
}

// Lock represents a distributed lock
type Lock struct {
	clients    []*redis.Client
	key        string
	value      string
	config     Config
	fenceToken int64

	validUntil time.Time
	mu         sync.Mutex
}

// New creates a new distributed lock
func New(clients []*redis.Client, key string, config Config) *Lock {
	return &Lock{
		clients: clients,
		key:     "lock:" + key,
		config:  config,
	}
}

func (l *Lock) generateValue() string {
	b := make([]byte, 16)
	rand.Read(b)
	return hex.EncodeToString(b)
}

// Acquire attempts to acquire the lock
func (l *Lock) Acquire(ctx context.Context) error {
	l.mu.Lock()
	defer l.mu.Unlock()

	l.value = l.generateValue()

	for i := 0; i < l.config.RetryCount; i++ {
		start := time.Now()

		acquired := 0
		for _, client := range l.clients {
			if l.tryAcquire(ctx, client) {
				acquired++
			}
		}

		// Quorum check
		quorum := len(l.clients)/2 + 1
		elapsed := time.Since(start)

		// Clock drift adjustment
		drift := time.Duration(float64(l.config.TTL) * l.config.DriftFactor)
		validityTime := l.config.TTL - elapsed - drift

		if acquired >= quorum && validityTime > 0 {
			l.validUntil = time.Now().Add(validityTime)

			// Get fencing token (from first client)
			l.fenceToken = l.getFenceToken(ctx)

			return nil
		}

		// Failed - release any acquired locks
		l.releaseAll(ctx)

		// Wait before retry
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-time.After(l.config.RetryDelay):
		}
	}

	return ErrLockNotAcquired
}

func (l *Lock) tryAcquire(ctx context.Context, client *redis.Client) bool {
	result := client.SetNX(ctx, l.key, l.value, l.config.TTL)
	return result.Val()
}

func (l *Lock) getFenceToken(ctx context.Context) int64 {
	// Use atomic increment on first available client
	for _, client := range l.clients {
		result := client.Incr(ctx, l.key+":fence")
		if result.Err() == nil {
			return result.Val()
		}
	}
	return 0
}

// Release releases the lock
func (l *Lock) Release(ctx context.Context) error {
	l.mu.Lock()
	defer l.mu.Unlock()

	if l.value == "" {
		return ErrLockNotHeld
	}

	l.releaseAll(ctx)
	l.value = ""
	return nil
}

func (l *Lock) releaseAll(ctx context.Context) {
	script := `
		if redis.call("get", KEYS[1]) == ARGV[1] then
			return redis.call("del", KEYS[1])
		else
			return 0
		end
	`

	for _, client := range l.clients {
		client.Eval(ctx, script, []string{l.key}, l.value)
	}
}

// Extend extends the lock TTL
func (l *Lock) Extend(ctx context.Context, ttl time.Duration) error {
	l.mu.Lock()
	defer l.mu.Unlock()

	if l.value == "" {
		return ErrLockNotHeld
	}

	script := `
		if redis.call("get", KEYS[1]) == ARGV[1] then
			return redis.call("pexpire", KEYS[1], ARGV[2])
		else
			return 0
		end
	`

	extended := 0
	for _, client := range l.clients {
		result := client.Eval(ctx, script, []string{l.key}, l.value, ttl.Milliseconds())
		if result.Val().(int64) == 1 {
			extended++
		}
	}

	quorum := len(l.clients)/2 + 1
	if extended >= quorum {
		l.validUntil = time.Now().Add(ttl)
		return nil
	}

	return ErrLockNotHeld
}

// GetFenceToken returns the fencing token
func (l *Lock) GetFenceToken() int64 {
	l.mu.Lock()
	defer l.mu.Unlock()
	return l.fenceToken
}

// IsValid checks if lock is still valid
func (l *Lock) IsValid() bool {
	l.mu.Lock()
	defer l.mu.Unlock()
	return time.Now().Before(l.validUntil)
}

// TimeRemaining returns remaining validity time
func (l *Lock) TimeRemaining() time.Duration {
	l.mu.Lock()
	defer l.mu.Unlock()
	return time.Until(l.validUntil)
}

// Manager handles multiple locks
type Manager struct {
	clients []*redis.Client
	config  Config
}

// NewManager creates a lock manager
func NewManager(clients []*redis.Client, config Config) *Manager {
	return &Manager{
		clients: clients,
		config:  config,
	}
}

// WithLock executes function with lock
func (m *Manager) WithLock(ctx context.Context, key string, fn func(token int64) error) error {
	lock := New(m.clients, key, m.config)

	if err := lock.Acquire(ctx); err != nil {
		return err
	}
	defer lock.Release(ctx)

	// Check validity before critical section
	if !lock.IsValid() {
		return ErrLockNotHeld
	}

	return fn(lock.GetFenceToken())
}
```

---

## Production War Stories

### War Story 1: The Lock That Wasn't

**The Scenario**:
E-commerce site using Redis SETNX for inventory locks. Two customers ordered the last item of a product simultaneously.

**What Happened**:
```
Timeline:
t0: Customer A acquires lock, reads inventory=1
t1: Customer A's process pauses (GC)
t2: Lock expires (30 second TTL)
t3: Customer B acquires lock, reads inventory=1
t4: Customer B decrements inventory=0, releases lock
t5: Customer A resumes, decrements inventory=-1 (OVERSOLD!)
t6: Customer A releases lock (which they don't own anymore)
```

**The Fix**:
```python
def reserve_inventory(product_id: str, quantity: int, fence_token: int):
    """Use fencing token in database update."""
    result = db.execute("""
        UPDATE inventory
        SET quantity = quantity - :qty,
            last_fence_token = :token
        WHERE product_id = :pid
          AND quantity >= :qty
          AND last_fence_token < :token
    """, {'pid': product_id, 'qty': quantity, 'token': fence_token})

    if result.rowcount == 0:
        raise InsufficientInventoryOrStaleToken()
```

**20-Year Lesson**: The lock is not enough. The resource must validate the token.

---

### War Story 2: The Split-Brain Incident

**The Scenario**:
Payment processing using single Redis instance for locks. Redis master went down, sentinel promoted replica.

**What Happened**:
1. Client A acquires lock on master
2. Master crashes before replicating to replica
3. Replica promoted to master (no lock data!)
4. Client B acquires "same" lock on new master
5. Both clients process payment simultaneously
6. Customer charged twice

**The Fix**:
```python
# Use Redlock with multiple independent masters
redis_instances = [
    redis.Redis(host='redis-1'),  # Independent master
    redis.Redis(host='redis-2'),  # Independent master
    redis.Redis(host='redis-3'),  # Independent master
    redis.Redis(host='redis-4'),  # Independent master
    redis.Redis(host='redis-5'),  # Independent master
]

# Requires majority (3/5) to acquire lock
lock = RedlockLock(redis_instances, "payment:123")
```

**Or even better**: Use ZooKeeper or etcd with true consensus.

**20-Year Lesson**: Single-node Redis locks are fine for efficiency (deduplication), but dangerous for correctness (payments, inventory).

---

### War Story 3: The Deadlock Loop

**The Scenario**:
Order processing needed to lock both inventory AND payment resources.

**What Happened**:
```
Thread 1: Lock(inventory) → Lock(payment) → Process → Unlock
Thread 2: Lock(payment) → Lock(inventory) → Process → Unlock

Timeline:
t0: Thread 1 acquires inventory lock
t1: Thread 2 acquires payment lock
t2: Thread 1 waits for payment lock
t3: Thread 2 waits for inventory lock
... forever (DEADLOCK)
```

**The Fix**:
```python
def acquire_multiple_locks(lock_keys: List[str]) -> List[Lock]:
    """Always acquire locks in sorted order to prevent deadlock."""
    sorted_keys = sorted(lock_keys)
    acquired = []

    try:
        for key in sorted_keys:
            lock = Lock(redis, key)
            if not lock.acquire(timeout=10):
                raise LockAcquisitionFailed(key)
            acquired.append(lock)
        return acquired
    except:
        # Release any acquired locks on failure
        for lock in acquired:
            lock.release()
        raise


# Usage
locks = acquire_multiple_locks(["inventory:123", "payment:456"])
try:
    process_order()
finally:
    for lock in locks:
        lock.release()
```

**20-Year Lesson**: Lock ordering prevents deadlock. Always acquire in consistent order (alphabetical is easy).

---

### War Story 4: The Lock Extension Failure

**The Scenario**:
Long-running batch job extending its lock every 10 seconds. Lock TTL was 30 seconds.

**What Happened**:
1. Job starts, acquires lock (TTL 30s)
2. Job extends at t=10s (TTL reset to 30s)
3. Network partition isolates job from Redis
4. Job can't extend at t=40s, t=50s, t=60s...
5. Lock expires at t=70s
6. Another job starts processing same batch
7. Network heals at t=80s
8. Original job resumes, corrupts data

**The Fix**:
```python
class LockExtender:
    """Automatically extend lock and detect failures."""

    def __init__(self, lock: Lock, interval: float = 10):
        self.lock = lock
        self.interval = interval
        self.failed = threading.Event()
        self._stop = threading.Event()
        self._thread = None

    def start(self):
        def extend_loop():
            while not self._stop.is_set():
                time.sleep(self.interval)
                if self._stop.is_set():
                    break
                if not self.lock.extend(self.lock.ttl):
                    self.failed.set()
                    break

        self._thread = threading.Thread(target=extend_loop)
        self._thread.start()

    def stop(self):
        self._stop.set()
        if self._thread:
            self._thread.join()

    def check_failure(self):
        """Call periodically to detect extension failure."""
        if self.failed.is_set():
            raise LockLostException("Failed to extend lock")


# Usage
lock = Lock(redis, "batch:123")
lock.acquire()
extender = LockExtender(lock)
extender.start()

try:
    for item in batch_items:
        extender.check_failure()  # Abort if lock lost
        process_item(item)
finally:
    extender.stop()
    lock.release()
```

**20-Year Lesson**: Lock extension can fail. Your application must detect this and abort gracefully.

---

## When NOT to Use Distributed Locks

### Alternative: Optimistic Concurrency

```python
# Instead of locking, use version numbers
def update_user_optimistic(user_id: int, changes: dict) -> bool:
    """Update using optimistic concurrency control."""
    while True:
        # Read current version
        user = db.query("SELECT * FROM users WHERE id = %s", user_id)
        current_version = user['version']

        # Apply changes
        new_data = {**user, **changes, 'version': current_version + 1}

        # Conditional update
        result = db.execute("""
            UPDATE users
            SET data = %s, version = %s
            WHERE id = %s AND version = %s
        """, (new_data, current_version + 1, user_id, current_version))

        if result.rowcount == 1:
            return True  # Success

        # Version changed - retry or abort
        if should_retry():
            continue
        return False
```

**Use optimistic concurrency when**:
- Conflicts are rare
- Operations can be retried
- You want maximum throughput

### Alternative: Idempotent Operations

```python
def process_payment_idempotent(idempotency_key: str, payment: dict) -> dict:
    """
    Idempotent payment - no lock needed.
    Same key always returns same result.
    """
    # Check if already processed
    existing = db.query("""
        SELECT result FROM payments WHERE idempotency_key = %s
    """, idempotency_key)

    if existing:
        return existing['result']

    # Process payment
    result = payment_gateway.charge(payment)

    # Store result (with conflict handling)
    db.execute("""
        INSERT INTO payments (idempotency_key, result)
        VALUES (%s, %s)
        ON CONFLICT (idempotency_key) DO NOTHING
    """, (idempotency_key, result))

    return result
```

**Use idempotency when**:
- Operations can be safely retried
- You can generate unique operation IDs
- At-least-once delivery is acceptable

---

## Expert FAQs

### Q: Redis vs ZooKeeper vs etcd for distributed locks?

**A**:
| Aspect | Redis | ZooKeeper | etcd |
|--------|-------|-----------|------|
| Consistency | Eventual | Strong (CP) | Strong (CP) |
| Latency | ~1ms | ~10ms | ~5ms |
| Complexity | Low | High | Medium |
| Use when | Efficiency | Correctness | Kubernetes |

- **Redis**: When lock failure = retry (best effort)
- **ZooKeeper/etcd**: When lock failure = data corruption (must be correct)

### Q: How long should lock TTL be?

**A**: TTL = expected_operation_time × 3 + network_latency_buffer

```python
# Example calculation
expected_query_time = 100  # ms
network_buffer = 50        # ms
safety_factor = 3

ttl_ms = (expected_query_time * safety_factor) + network_buffer
# TTL = 350ms

# But also consider: what if operation takes longer?
# - Auto-extend for long operations
# - Or fail fast with shorter TTL
```

### Q: Should I use distributed locks for rate limiting?

**A**: No. Use atomic counters or token buckets instead:
```python
# Bad: Lock for rate limiting
with lock("rate:user:123"):
    count = redis.get("count:user:123")
    if count < 100:
        redis.incr("count:user:123")
        proceed()

# Good: Atomic increment
count = redis.incr("count:user:123")
if count == 1:
    redis.expire("count:user:123", 60)
if count <= 100:
    proceed()
```

### Q: How do I debug distributed lock issues?

**A**: Comprehensive logging:
```python
class ObservableLock:
    def __init__(self, lock: Lock, logger):
        self.lock = lock
        self.logger = logger

    def acquire(self, timeout: float = 30) -> bool:
        start = time.time()
        self.logger.info(f"Attempting lock acquisition: {self.lock.key}")

        result = self.lock.acquire(timeout)
        elapsed = time.time() - start

        if result:
            self.logger.info(f"Lock acquired: {self.lock.key}, "
                           f"token={self.lock.token}, took={elapsed:.3f}s")
        else:
            self.logger.warning(f"Lock acquisition FAILED: {self.lock.key}, "
                              f"timeout={timeout}s")

        return result
```

---

## Related Topics

- [CAP Theorem](/topic/system-design/cap-theorem)
- [Consensus Algorithms](/topic/system-design/consensus-algorithms)
- [Database Transactions](/topic/system-design/transactions)
- [Event Sourcing](/topic/system-design/event-sourcing)
