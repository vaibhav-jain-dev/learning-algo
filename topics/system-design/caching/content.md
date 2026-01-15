# Caching

## Overview

Caching is a technique that stores copies of frequently accessed data in a faster storage layer to reduce latency, database load, and improve application performance. It's one of the most effective and fundamental techniques for scaling systems. Understanding caching deeply is essential for any system design interview.

## Intuitive Understanding

### Real-World Metaphor: The Library Desk

<div class="metaphor-card">
  <div class="metaphor-icon">📖</div>
  <div class="metaphor-title">Think of a Library with a Reading Desk</div>
  <div class="metaphor-description">
    Imagine a huge library (database) with millions of books. Walking to get each book takes time.
    But you have a small desk (cache) next to you. When you need a book, you first check your desk.
    If it's there - great! If not, you walk to the library, get it, and put a copy on your desk for next time.
  </div>
  <div class="metaphor-mapping">
    <div class="mapping-item">
      <span class="real">Library shelves</span>
      <span class="arrow">→</span>
      <span class="concept">Database (slow, large)</span>
    </div>
    <div class="mapping-item">
      <span class="real">Reading desk</span>
      <span class="arrow">→</span>
      <span class="concept">Cache (fast, small)</span>
    </div>
    <div class="mapping-item">
      <span class="real">Book on desk</span>
      <span class="arrow">→</span>
      <span class="concept">Cache Hit!</span>
    </div>
    <div class="mapping-item">
      <span class="real">Walk to get book</span>
      <span class="arrow">→</span>
      <span class="concept">Cache Miss (slow)</span>
    </div>
    <div class="mapping-item">
      <span class="real">Desk full, remove old book</span>
      <span class="arrow">→</span>
      <span class="concept">Cache Eviction</span>
    </div>
  </div>
</div>

### Latency Comparison Visualization

<div class="complexity-viz">
  <p style="color: #9ca3af; margin-bottom: 20px;">See how different storage speeds compare (not to scale - actual differences are even larger!):</p>
  <div class="complexity-bars">
    <div class="complexity-bar">
      <div class="bar-fill o1" style="background: #22c55e; height: 10px;"></div>
      <div class="bar-label">L1 Cache<br>0.5ns</div>
    </div>
    <div class="complexity-bar">
      <div class="bar-fill ologn" style="background: #84cc16; height: 20px;"></div>
      <div class="bar-label">L2 Cache<br>7ns</div>
    </div>
    <div class="complexity-bar">
      <div class="bar-fill on" style="background: #eab308; height: 40px;"></div>
      <div class="bar-label">RAM<br>100ns</div>
    </div>
    <div class="complexity-bar">
      <div class="bar-fill onlogn" style="background: #f97316; height: 100px;"></div>
      <div class="bar-label">SSD<br>150μs</div>
    </div>
    <div class="complexity-bar">
      <div class="bar-fill on2" style="background: #ef4444; height: 200px;"></div>
      <div class="bar-label">HDD<br>10ms</div>
    </div>
  </div>
</div>

### The "Why Cache?" Thinking Process

<div class="think-aloud">
  <div class="thought-bubble">
    <div class="thought-text">
      "My database query takes 50ms... and it's the same data every time for the same user..."
    </div>
  </div>
  <div class="thought-bubble">
    <div class="thought-text">
      "If I store this in memory (Redis), it takes 1ms. That's 50x faster!"
    </div>
  </div>
  <div class="thought-bubble">
    <div class="thought-text">
      "But what if the data changes? I need an invalidation strategy..."
    </div>
  </div>
  <div class="realization">
    <span class="insight">Key Trade-off:</span> Speed vs Freshness. Caching is about choosing the right balance.
  </div>
</div>

## Mental Model & Thinking Process

### When Your Brain Should Think "Caching"

Ask yourself these questions:
1. **Is this data read more often than written?** (High read-to-write ratio)
2. **Is the data relatively static or changes infrequently?**
3. **Is there significant latency in fetching this data?** (Database, API, computation)
4. **Would serving stale data for a short period be acceptable?**
5. **Is this data accessed by multiple users/requests?**

### The Caching Decision Framework

```
Is data accessed frequently?
├── No → Don't cache (overhead not worth it)
└── Yes → Is latency a problem?
    ├── No → Don't cache (database is fast enough)
    └── Yes → Can you tolerate stale data?
        ├── No → Use write-through or write-invalidate
        └── Yes → Cache-aside with TTL is usually best
            └── How stale is acceptable?
                ├── Seconds → Short TTL + refresh-ahead
                ├── Minutes → Standard TTL
                └── Hours/Days → Long TTL + event invalidation
```

### Latency Numbers Every Developer Should Know

```
Operation                              Time
─────────────────────────────────────────────
L1 cache reference                     0.5 ns
L2 cache reference                       7 ns
Main memory reference                  100 ns
SSD random read                    150,000 ns  (150 μs)
HDD seek                        10,000,000 ns  (10 ms)
Network round trip (same DC)       500,000 ns  (0.5 ms)
Network round trip (cross DC)   150,000,000 ns (150 ms)

Key insight: Memory is 1,000x faster than SSD
            SSD is 67x faster than HDD
            Same-DC network is 300x slower than memory
```

## Key Concepts

### Why Caching?

| Benefit | Explanation | Real-World Impact |
|---------|-------------|-------------------|
| **Reduced Latency** | Memory ~100x faster than disk, ~1000x faster than network | Sub-millisecond responses |
| **Lower Database Load** | Fewer queries hit primary database | Database can handle 10x more traffic |
| **Cost Efficiency** | Serve more requests with fewer resources | Reduce infrastructure costs by 50-80% |
| **Improved UX** | Faster response times | Higher user engagement, lower bounce rate |
| **Resilience** | Cache can serve requests if DB is down | Graceful degradation |

### Cache Layers Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT                                     │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BROWSER CACHE (L1)                                │
│  • HTTP Cache-Control headers                                        │
│  • Service Worker cache                                              │
│  • localStorage/sessionStorage                                       │
│  TTL: seconds to days | Hit Rate: 70-90%                            │
└───────────────────────────────┬─────────────────────────────────────┘
                                │ Cache Miss
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        CDN CACHE (L2)                                │
│  • CloudFront, Cloudflare, Akamai                                   │
│  • Geographically distributed                                        │
│  • Static assets, API responses                                      │
│  TTL: minutes to hours | Hit Rate: 80-95%                           │
└───────────────────────────────┬─────────────────────────────────────┘
                                │ Cache Miss
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  APPLICATION CACHE (L3)                              │
│  ┌──────────────────┐    ┌──────────────────┐                       │
│  │   Local Cache    │    │  Distributed     │                       │
│  │   (In-Process)   │    │  Cache (Redis)   │                       │
│  │   TTL: seconds   │    │   TTL: minutes   │                       │
│  │   Size: 100MB    │    │   Size: 100GB    │                       │
│  └────────┬─────────┘    └────────┬─────────┘                       │
│           │                       │                                  │
│           └───────────┬───────────┘                                  │
│                       │                                              │
└───────────────────────┼──────────────────────────────────────────────┘
                        │ Cache Miss
                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    DATABASE CACHE (L4)                               │
│  • Query cache (MySQL)                                               │
│  • Buffer pool                                                       │
│  • Connection pool                                                   │
└───────────────────────┬─────────────────────────────────────────────┘
                        │ Cache Miss
                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       DATABASE                                       │
│  • PostgreSQL, MySQL, MongoDB                                        │
│  • Disk I/O (slowest layer)                                         │
└─────────────────────────────────────────────────────────────────────┘
```

## Caching Strategies - Deep Dive

### 1. Cache-Aside (Lazy Loading)

The application manages cache explicitly. Most commonly used pattern.

```python
import redis
import json
from typing import Optional, Any
import logging

class CacheAsideRepository:
    """
    Cache-Aside pattern implementation with comprehensive error handling.

    Flow:
    1. Check cache first
    2. On miss, query database
    3. Populate cache for future requests

    Pros:
    - Only caches what's actually accessed
    - Cache failures don't break the application
    - Simple to implement and understand

    Cons:
    - First request is always slow (cold cache)
    - Potential for stale data
    - Cache stampede on popular keys
    """

    def __init__(self, redis_client: redis.Redis, db_client, default_ttl: int = 3600):
        self.cache = redis_client
        self.db = db_client
        self.default_ttl = default_ttl
        self.logger = logging.getLogger(__name__)

    def get_user(self, user_id: int) -> Optional[dict]:
        """
        Get user with cache-aside pattern.

        Time Complexity:
        - Cache hit: O(1)
        - Cache miss: O(1) cache + O(db_query) database

        Cache hit rate target: 90%+
        """
        cache_key = f"user:{user_id}"

        # Step 1: Try cache first
        try:
            cached = self.cache.get(cache_key)
            if cached:
                self.logger.debug(f"Cache HIT for {cache_key}")
                return json.loads(cached)
        except redis.RedisError as e:
            # Cache failure - continue to database
            self.logger.warning(f"Cache read failed: {e}")

        # Step 2: Cache miss - fetch from database
        self.logger.debug(f"Cache MISS for {cache_key}")
        user = self.db.query(f"SELECT * FROM users WHERE id = %s", (user_id,))

        if user is None:
            return None

        # Step 3: Populate cache for future requests
        try:
            self.cache.setex(
                cache_key,
                self.default_ttl,
                json.dumps(user)
            )
        except redis.RedisError as e:
            # Cache write failure - log but don't fail request
            self.logger.warning(f"Cache write failed: {e}")

        return user

    def invalidate_user(self, user_id: int) -> bool:
        """Explicitly invalidate cache entry."""
        try:
            return self.cache.delete(f"user:{user_id}") > 0
        except redis.RedisError:
            return False
```

### 2. Write-Through

Data written to cache and database simultaneously. Ensures consistency.

```python
import redis
import json
from typing import Any, Dict
import threading

class WriteThroughRepository:
    """
    Write-Through pattern: Writes go to cache AND database together.

    Flow:
    1. Write to database first (source of truth)
    2. Write to cache
    3. Return success only if both succeed

    Pros:
    - Cache is always consistent with database
    - Simple mental model
    - No stale data

    Cons:
    - Higher write latency (2 writes per operation)
    - Cache may store data that's never read
    - Both systems must be available for writes
    """

    def __init__(self, redis_client: redis.Redis, db_client, ttl: int = 3600):
        self.cache = redis_client
        self.db = db_client
        self.ttl = ttl

    def update_user(self, user_id: int, data: Dict[str, Any]) -> bool:
        """
        Update user with write-through pattern.

        Time Complexity: O(1) cache + O(db_write) database
        Consistency: Strong (cache always matches DB)
        """
        cache_key = f"user:{user_id}"

        # Start database transaction
        try:
            # Step 1: Write to database first (source of truth)
            self.db.execute(
                "UPDATE users SET data = %s WHERE id = %s",
                (json.dumps(data), user_id)
            )
            self.db.commit()

            # Step 2: Update cache
            self.cache.setex(cache_key, self.ttl, json.dumps(data))

            return True

        except Exception as e:
            self.db.rollback()
            # Invalidate cache to prevent inconsistency
            self.cache.delete(cache_key)
            raise

    def create_user(self, user_data: Dict[str, Any]) -> int:
        """Create new user with write-through."""
        try:
            # Insert into database
            user_id = self.db.execute(
                "INSERT INTO users (data) VALUES (%s) RETURNING id",
                (json.dumps(user_data),)
            )
            self.db.commit()

            # Populate cache
            cache_key = f"user:{user_id}"
            user_data['id'] = user_id
            self.cache.setex(cache_key, self.ttl, json.dumps(user_data))

            return user_id

        except Exception as e:
            self.db.rollback()
            raise
```

### 3. Write-Behind (Write-Back)

Write to cache immediately, async write to database later.

```python
import redis
import json
import threading
import queue
from typing import Any, Dict, List
from dataclasses import dataclass
from datetime import datetime
import time

@dataclass
class WriteOperation:
    """Represents a pending write operation."""
    table: str
    key: str
    data: Dict[str, Any]
    timestamp: datetime
    retries: int = 0

class WriteBehindCache:
    """
    Write-Behind pattern: Write to cache first, async flush to database.

    Flow:
    1. Write to cache immediately (fast response)
    2. Queue write for async database update
    3. Background worker flushes to database

    Pros:
    - Very fast writes (only cache latency)
    - Reduced database load (batch writes)
    - Can absorb traffic spikes

    Cons:
    - Risk of data loss if cache fails before flush
    - Eventual consistency only
    - Complex failure handling
    - Read-your-writes may not work immediately

    Use cases:
    - Analytics/metrics (losing some data is acceptable)
    - Shopping carts (can be reconstructed)
    - User preferences (not critical)
    """

    def __init__(self, redis_client: redis.Redis, db_client,
                 flush_interval: float = 1.0, batch_size: int = 100):
        self.cache = redis_client
        self.db = db_client
        self.write_queue: queue.Queue[WriteOperation] = queue.Queue()
        self.flush_interval = flush_interval
        self.batch_size = batch_size
        self._stop_event = threading.Event()

        # Start background worker
        self._worker = threading.Thread(target=self._flush_worker, daemon=True)
        self._worker.start()

    def write(self, table: str, key: str, data: Dict[str, Any]) -> bool:
        """
        Fast write - only touches cache, queues DB write.

        Time Complexity: O(1) - only cache write
        Consistency: Eventual
        """
        cache_key = f"{table}:{key}"

        # Write to cache immediately
        self.cache.set(cache_key, json.dumps(data))

        # Queue for async database write
        operation = WriteOperation(
            table=table,
            key=key,
            data=data,
            timestamp=datetime.now()
        )
        self.write_queue.put(operation)

        return True

    def _flush_worker(self):
        """Background worker that flushes writes to database."""
        while not self._stop_event.is_set():
            batch: List[WriteOperation] = []

            # Collect batch of operations
            try:
                # Wait for first item with timeout
                operation = self.write_queue.get(timeout=self.flush_interval)
                batch.append(operation)

                # Collect more items without waiting
                while len(batch) < self.batch_size:
                    try:
                        operation = self.write_queue.get_nowait()
                        batch.append(operation)
                    except queue.Empty:
                        break

            except queue.Empty:
                continue

            # Flush batch to database
            if batch:
                self._flush_batch(batch)

    def _flush_batch(self, batch: List[WriteOperation]):
        """Flush a batch of operations to database."""
        # Group by table for efficient bulk inserts
        by_table: Dict[str, List[WriteOperation]] = {}
        for op in batch:
            by_table.setdefault(op.table, []).append(op)

        for table, operations in by_table.items():
            try:
                # Bulk upsert
                values = [(op.key, json.dumps(op.data)) for op in operations]
                self.db.executemany(
                    f"INSERT INTO {table} (key, data) VALUES (%s, %s) "
                    f"ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data",
                    values
                )
                self.db.commit()

            except Exception as e:
                # Re-queue failed operations with retry count
                for op in operations:
                    if op.retries < 3:
                        op.retries += 1
                        self.write_queue.put(op)
                    else:
                        # Log permanent failure
                        print(f"Permanent write failure: {op}")

    def shutdown(self, timeout: float = 30.0):
        """Graceful shutdown - flush remaining writes."""
        self._stop_event.set()
        self._worker.join(timeout=timeout)

        # Final flush
        remaining = []
        while not self.write_queue.empty():
            remaining.append(self.write_queue.get_nowait())
        if remaining:
            self._flush_batch(remaining)
```

### 4. Read-Through

Cache automatically fetches from database on miss.

```python
from typing import Callable, Any, Optional
import redis
import json

class ReadThroughCache:
    """
    Read-Through pattern: Cache handles loading on miss.

    Flow:
    1. Application requests data from cache
    2. Cache checks if data exists
    3. On miss, cache calls loader function
    4. Cache stores and returns result

    Pros:
    - Clean separation of concerns
    - Application doesn't know about cache misses
    - Consistent cache population logic

    Cons:
    - Cache must know how to load data
    - More complex cache implementation
    - Loader function must be provided
    """

    def __init__(self, redis_client: redis.Redis, default_ttl: int = 3600):
        self.cache = redis_client
        self.default_ttl = default_ttl
        self._loaders: dict = {}

    def register_loader(self, prefix: str, loader: Callable[[str], Any]):
        """Register a loader function for a key prefix."""
        self._loaders[prefix] = loader

    def get(self, key: str, loader: Optional[Callable[[], Any]] = None,
            ttl: Optional[int] = None) -> Any:
        """
        Get value, automatically loading on miss.

        Args:
            key: Cache key
            loader: Function to load value on miss
            ttl: Optional TTL override
        """
        # Try cache first
        cached = self.cache.get(key)
        if cached:
            return json.loads(cached)

        # Determine loader
        if loader is None:
            prefix = key.split(':')[0]
            loader = self._loaders.get(prefix)

        if loader is None:
            raise ValueError(f"No loader registered for key: {key}")

        # Load value
        value = loader() if callable(loader) else loader

        if value is not None:
            # Store in cache
            self.cache.setex(
                key,
                ttl or self.default_ttl,
                json.dumps(value)
            )

        return value


# Usage example
cache = ReadThroughCache(redis.Redis())

# Register loaders
cache.register_loader("user", lambda key: db.get_user(key.split(':')[1]))
cache.register_loader("product", lambda key: db.get_product(key.split(':')[1]))

# Application code - doesn't need to handle cache misses
user = cache.get("user:123")
product = cache.get("product:456")

# Or with inline loader
config = cache.get("app:config", loader=lambda: load_config_from_file())
```

### 5. Refresh-Ahead (Predictive Refresh)

Proactively refresh cache before expiration to prevent misses.

```python
import redis
import json
import threading
from typing import Callable, Any, Dict
from datetime import datetime, timedelta
import time

class RefreshAheadCache:
    """
    Refresh-Ahead pattern: Proactively refresh before expiration.

    Flow:
    1. On read, check remaining TTL
    2. If TTL below threshold, trigger async refresh
    3. Return current cached value immediately
    4. Background refresh updates cache

    Pros:
    - Eliminates cache miss latency for hot keys
    - Smooth performance (no sudden spikes)
    - Better user experience

    Cons:
    - More complex implementation
    - May refresh data that won't be accessed
    - Requires tracking access patterns

    Best for:
    - High-traffic keys
    - Data with predictable access patterns
    - When consistent low latency is critical
    """

    def __init__(self, redis_client: redis.Redis,
                 refresh_threshold: float = 0.2):  # Refresh when 20% TTL remains
        self.cache = redis_client
        self.refresh_threshold = refresh_threshold
        self._refresh_in_progress: Dict[str, bool] = {}
        self._lock = threading.Lock()

    def get(self, key: str, loader: Callable[[], Any],
            ttl: int = 3600) -> Any:
        """
        Get value with refresh-ahead.

        Time Complexity: O(1) always (refresh is async)
        """
        # Get value and TTL
        pipe = self.cache.pipeline()
        pipe.get(key)
        pipe.ttl(key)
        cached, remaining_ttl = pipe.execute()

        # Check if refresh needed
        if cached and remaining_ttl > 0:
            # Calculate if we should refresh
            threshold_seconds = ttl * self.refresh_threshold

            if remaining_ttl < threshold_seconds:
                # Trigger async refresh
                self._trigger_refresh(key, loader, ttl)

            return json.loads(cached)

        # Cache miss - load synchronously
        value = loader()
        if value is not None:
            self.cache.setex(key, ttl, json.dumps(value))
        return value

    def _trigger_refresh(self, key: str, loader: Callable, ttl: int):
        """Trigger async refresh if not already in progress."""
        with self._lock:
            if key in self._refresh_in_progress:
                return  # Already refreshing
            self._refresh_in_progress[key] = True

        def do_refresh():
            try:
                value = loader()
                if value is not None:
                    self.cache.setex(key, ttl, json.dumps(value))
            finally:
                with self._lock:
                    del self._refresh_in_progress[key]

        threading.Thread(target=do_refresh, daemon=True).start()


# Advanced: Priority-based refresh with access tracking
class SmartRefreshCache:
    """
    Smart refresh that prioritizes frequently accessed keys.
    """

    def __init__(self, redis_client: redis.Redis):
        self.cache = redis_client
        self.access_counts: Dict[str, int] = {}

    def get(self, key: str, loader: Callable, ttl: int = 3600) -> Any:
        # Track access
        self.access_counts[key] = self.access_counts.get(key, 0) + 1

        # More aggressive refresh for hot keys
        access_count = self.access_counts[key]
        if access_count > 100:
            refresh_threshold = 0.5  # Refresh at 50% TTL
        elif access_count > 10:
            refresh_threshold = 0.3  # Refresh at 30% TTL
        else:
            refresh_threshold = 0.2  # Refresh at 20% TTL

        # ... rest of implementation
```

## Cache Eviction Policies - Deep Dive

### 1. LRU (Least Recently Used)

```python
from collections import OrderedDict
from typing import Any, Optional
import threading

class LRUCache:
    """
    LRU Cache: Evicts least recently accessed items.

    Mental Model:
    - Think of a stack of papers on your desk
    - When you use a paper, it goes to the top
    - When desk is full, throw away bottom paper

    Time Complexity:
    - Get: O(1)
    - Put: O(1)
    - Eviction: O(1)

    Space Complexity: O(capacity)

    When to use:
    - General-purpose caching
    - When recent access is good predictor of future access
    - User sessions, API responses

    When NOT to use:
    - Scan-resistant workloads (sequential scans pollute cache)
    - When frequency matters more than recency
    """

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache: OrderedDict[str, Any] = OrderedDict()
        self._lock = threading.Lock()

        # Metrics
        self.hits = 0
        self.misses = 0

    def get(self, key: str) -> Optional[Any]:
        with self._lock:
            if key not in self.cache:
                self.misses += 1
                return None

            self.hits += 1
            # Move to end (most recently used)
            self.cache.move_to_end(key)
            return self.cache[key]

    def put(self, key: str, value: Any) -> None:
        with self._lock:
            if key in self.cache:
                # Update existing - move to end
                self.cache.move_to_end(key)
                self.cache[key] = value
            else:
                # New entry
                if len(self.cache) >= self.capacity:
                    # Evict oldest (first item)
                    self.cache.popitem(last=False)
                self.cache[key] = value

    def hit_rate(self) -> float:
        total = self.hits + self.misses
        return self.hits / total if total > 0 else 0.0
```

### 2. LFU (Least Frequently Used)

```python
from collections import defaultdict
from typing import Any, Optional, Dict
import heapq

class LFUCache:
    """
    LFU Cache: Evicts least frequently accessed items.

    Mental Model:
    - Count how many times each item is accessed
    - When full, evict item with lowest count
    - Tie-breaker: evict oldest among same frequency

    Time Complexity:
    - Get: O(1)
    - Put: O(1) with optimized implementation
    - Eviction: O(1)

    When to use:
    - Long-running caches where frequency matters
    - CDN caching (popular content stays cached)
    - Database query caching

    When NOT to use:
    - When access patterns change frequently
    - Short-lived caches (frequency hasn't stabilized)
    - When one-time bursts shouldn't count
    """

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache: Dict[str, Any] = {}  # key -> value
        self.freq: Dict[str, int] = {}   # key -> frequency
        self.freq_to_keys: Dict[int, OrderedDict] = defaultdict(OrderedDict)
        self.min_freq = 0

    def get(self, key: str) -> Optional[Any]:
        if key not in self.cache:
            return None

        # Increment frequency
        self._increment_freq(key)
        return self.cache[key]

    def put(self, key: str, value: Any) -> None:
        if self.capacity <= 0:
            return

        if key in self.cache:
            self.cache[key] = value
            self._increment_freq(key)
            return

        # Check if eviction needed
        if len(self.cache) >= self.capacity:
            self._evict()

        # Add new key
        self.cache[key] = value
        self.freq[key] = 1
        self.freq_to_keys[1][key] = None
        self.min_freq = 1

    def _increment_freq(self, key: str):
        """Move key to next frequency bucket."""
        old_freq = self.freq[key]
        new_freq = old_freq + 1

        # Remove from old frequency bucket
        del self.freq_to_keys[old_freq][key]
        if not self.freq_to_keys[old_freq]:
            del self.freq_to_keys[old_freq]
            if self.min_freq == old_freq:
                self.min_freq = new_freq

        # Add to new frequency bucket
        self.freq[key] = new_freq
        self.freq_to_keys[new_freq][key] = None

    def _evict(self):
        """Evict least frequently used key."""
        # Get oldest key from minimum frequency bucket
        keys = self.freq_to_keys[self.min_freq]
        evict_key = next(iter(keys))

        del keys[evict_key]
        if not keys:
            del self.freq_to_keys[self.min_freq]

        del self.cache[evict_key]
        del self.freq[evict_key]
```

### 3. LRU-K and 2Q (Scan-Resistant)

```python
from collections import OrderedDict
from typing import Any, Optional

class TwoQueueCache:
    """
    2Q Cache: Scan-resistant LRU variant.

    Problem with LRU:
    - Sequential scans pollute the cache
    - One-time accesses evict valuable cached items

    Solution:
    - A1in (FIFO): First-time accesses go here
    - A1out: Recently evicted from A1in (tracks history)
    - Am (LRU): Items accessed more than once

    Flow:
    1. First access → A1in
    2. Evicted from A1in → A1out (just tracking)
    3. Accessed while in A1out → Am
    4. In Am → Standard LRU behavior

    This prevents one-time scans from polluting Am.
    """

    def __init__(self, capacity: int, kin_ratio: float = 0.25):
        self.capacity = capacity
        self.kin_size = int(capacity * kin_ratio)  # First-time access queue
        self.kout_size = int(capacity * 0.5)  # History tracking

        self.a1_in: OrderedDict[str, Any] = OrderedDict()  # FIFO
        self.a1_out: OrderedDict[str, None] = OrderedDict()  # Just keys
        self.am: OrderedDict[str, Any] = OrderedDict()  # LRU

    def get(self, key: str) -> Optional[Any]:
        # Check Am (hot items)
        if key in self.am:
            self.am.move_to_end(key)
            return self.am[key]

        # Check A1in (recently added)
        if key in self.a1_in:
            # Don't move - A1in is FIFO
            return self.a1_in[key]

        return None

    def put(self, key: str, value: Any) -> None:
        # If already in Am, update
        if key in self.am:
            self.am.move_to_end(key)
            self.am[key] = value
            return

        # If already in A1in, don't promote yet
        if key in self.a1_in:
            self.a1_in[key] = value
            return

        # If in A1out (accessed before), promote to Am
        if key in self.a1_out:
            del self.a1_out[key]
            self._add_to_am(key, value)
            return

        # First-time access - add to A1in
        self._add_to_a1in(key, value)

    def _add_to_a1in(self, key: str, value: Any):
        """Add to first-time access queue (FIFO)."""
        while len(self.a1_in) >= self.kin_size:
            # Evict oldest to A1out
            evicted_key, _ = self.a1_in.popitem(last=False)
            self._add_to_a1out(evicted_key)

        self.a1_in[key] = value

    def _add_to_a1out(self, key: str):
        """Add to history tracking."""
        while len(self.a1_out) >= self.kout_size:
            self.a1_out.popitem(last=False)
        self.a1_out[key] = None

    def _add_to_am(self, key: str, value: Any):
        """Add to hot items cache (LRU)."""
        am_capacity = self.capacity - self.kin_size
        while len(self.am) >= am_capacity:
            self.am.popitem(last=False)
        self.am[key] = value
```

## Cache Invalidation Strategies

### The Hardest Problem in Computer Science

```
"There are only two hard things in Computer Science:
cache invalidation and naming things."
    - Phil Karlton

Why is it hard?
1. When should cache be invalidated?
2. How do you know all places that cached this data?
3. What about in-flight requests?
4. What about distributed caches?
```

### Strategy 1: TTL-Based Expiration

```python
class TTLStrategy:
    """
    TTL-Based: Data expires after fixed duration.

    Pros:
    - Simple to implement
    - Self-healing (stale data eventually expires)
    - No coordination needed

    Cons:
    - Stale data until TTL expires
    - Choosing right TTL is hard

    TTL Guidelines:
    - User sessions: 15-30 minutes
    - API responses: 1-5 minutes
    - Static content: 24 hours - 7 days
    - Configuration: 5-15 minutes
    """

    def cache_user(self, user_id: int, data: dict):
        # Short TTL for frequently changing data
        self.cache.setex(f"user:{user_id}", 300, json.dumps(data))  # 5 min

    def cache_product(self, product_id: int, data: dict):
        # Longer TTL for less frequently changing data
        self.cache.setex(f"product:{product_id}", 3600, json.dumps(data))  # 1 hour

    def cache_static_content(self, content_id: str, data: str):
        # Very long TTL for static content
        self.cache.setex(f"static:{content_id}", 86400, data)  # 24 hours
```

### Strategy 2: Event-Based Invalidation

```python
import redis
from typing import Callable, List, Dict
import threading

class EventBasedInvalidation:
    """
    Event-Based: Invalidate when data changes.

    Pros:
    - Immediate consistency
    - No stale data
    - Efficient (only invalidate what changed)

    Cons:
    - Requires event infrastructure
    - Must track all cache keys for an entity
    - Risk of missed events
    """

    def __init__(self, redis_client: redis.Redis):
        self.cache = redis_client
        self.pubsub = redis_client.pubsub()
        self._invalidation_rules: Dict[str, List[str]] = {}

    def register_invalidation_rule(self, event: str, cache_patterns: List[str]):
        """Register cache keys to invalidate for an event."""
        self._invalidation_rules[event] = cache_patterns

    def publish_event(self, event: str, entity_id: str):
        """Publish event that triggers invalidation."""
        self.cache.publish(f"cache:invalidate:{event}", entity_id)

    def handle_invalidation(self, event: str, entity_id: str):
        """Handle invalidation event."""
        patterns = self._invalidation_rules.get(event, [])
        for pattern in patterns:
            key = pattern.format(id=entity_id)
            self.cache.delete(key)

    # Example usage
    def update_user(self, user_id: int, data: dict):
        # Update database
        self.db.update_user(user_id, data)

        # Publish invalidation event
        self.publish_event("user.updated", str(user_id))


# Subscriber that handles invalidation
class InvalidationSubscriber:
    def __init__(self, invalidator: EventBasedInvalidation):
        self.invalidator = invalidator
        self._setup_subscriptions()

    def _setup_subscriptions(self):
        """Subscribe to invalidation channels."""
        self.invalidator.pubsub.subscribe(**{
            'cache:invalidate:user.updated': self._on_user_updated,
            'cache:invalidate:product.updated': self._on_product_updated,
        })

        # Start listener thread
        thread = threading.Thread(target=self._listen, daemon=True)
        thread.start()

    def _on_user_updated(self, message):
        user_id = message['data'].decode()
        # Invalidate all user-related cache keys
        self.invalidator.handle_invalidation('user.updated', user_id)
```

### Strategy 3: Version-Based Invalidation

```python
class VersionBasedCache:
    """
    Version-Based: Include version in cache key.

    Pros:
    - No explicit invalidation needed
    - Old versions naturally expire
    - Good for immutable data patterns

    Cons:
    - Need to track versions
    - Cache size grows with versions
    - Must propagate version to all readers
    """

    def __init__(self, redis_client: redis.Redis):
        self.cache = redis_client

    def get_version(self, entity_type: str) -> int:
        """Get current version for entity type."""
        version = self.cache.get(f"version:{entity_type}")
        return int(version) if version else 1

    def increment_version(self, entity_type: str) -> int:
        """Increment version (called on data change)."""
        return self.cache.incr(f"version:{entity_type}")

    def get(self, entity_type: str, entity_id: str) -> dict:
        """Get entity with current version."""
        version = self.get_version(entity_type)
        key = f"{entity_type}:v{version}:{entity_id}"
        data = self.cache.get(key)
        return json.loads(data) if data else None

    def set(self, entity_type: str, entity_id: str, data: dict):
        """Set entity with current version."""
        version = self.get_version(entity_type)
        key = f"{entity_type}:v{version}:{entity_id}"
        self.cache.setex(key, 3600, json.dumps(data))

    def invalidate_all(self, entity_type: str):
        """Invalidate all cached entities of this type."""
        # Simply increment version - old keys will expire naturally
        self.increment_version(entity_type)


# Usage
cache = VersionBasedCache(redis.Redis())

# Normal read/write
user = cache.get("user", "123")
cache.set("user", "123", {"name": "Alice"})

# Mass invalidation (e.g., schema change)
cache.invalidate_all("user")  # All user caches invalidated instantly
```

## Cache Stampede Prevention

### The Problem

```
When a popular cache key expires:
1. 1000 requests arrive simultaneously
2. All see cache miss
3. All query database
4. Database overloaded!

                    ┌─────────────┐
    Request 1 ─────→│             │
    Request 2 ─────→│  Cache Miss │──────→ Database gets
    Request 3 ─────→│             │        1000 queries!
       ...    ─────→│             │
    Request 1000 ──→│             │
                    └─────────────┘
```

### Solution 1: Locking

```python
import redis
import time
from typing import Callable, Any, Optional

class StampedeProtectedCache:
    """
    Locking approach: Only one request fetches data.

    Flow:
    1. Try to acquire lock
    2. Winner fetches from DB, others wait
    3. Winner stores in cache
    4. Losers read from cache
    """

    def __init__(self, redis_client: redis.Redis):
        self.cache = redis_client

    def get_with_lock(self, key: str, loader: Callable[[], Any],
                      ttl: int = 3600, lock_timeout: int = 10) -> Any:
        """Get value with stampede protection."""

        # Try cache first
        cached = self.cache.get(key)
        if cached:
            return json.loads(cached)

        # Cache miss - try to acquire lock
        lock_key = f"lock:{key}"
        lock_acquired = self.cache.set(
            lock_key, "1",
            nx=True,  # Only if not exists
            ex=lock_timeout
        )

        if lock_acquired:
            try:
                # We're the winner - fetch from database
                value = loader()
                self.cache.setex(key, ttl, json.dumps(value))
                return value
            finally:
                self.cache.delete(lock_key)
        else:
            # Someone else is fetching - wait and retry
            for _ in range(lock_timeout * 10):  # Check every 100ms
                time.sleep(0.1)
                cached = self.cache.get(key)
                if cached:
                    return json.loads(cached)

            # Lock expired but no data - try again
            return self.get_with_lock(key, loader, ttl, lock_timeout)
```

### Solution 2: Probabilistic Early Expiration

```python
import random
import math

class ProbabilisticCache:
    """
    Probabilistic Early Expiration: Randomly refresh before expiry.

    Instead of all requests expiring at once:
    - Each request has small probability of refreshing early
    - Probability increases as TTL approaches
    - Natural load distribution

    Formula: probability = exp(-remaining_ttl / beta)
    """

    def get_with_early_expiry(self, key: str, loader: Callable,
                               ttl: int = 3600, beta: float = 1.0) -> Any:
        """Get with probabilistic early refresh."""

        pipe = self.cache.pipeline()
        pipe.get(key)
        pipe.ttl(key)
        cached, remaining_ttl = pipe.execute()

        if cached:
            # Calculate refresh probability
            # Higher probability as TTL decreases
            if remaining_ttl > 0:
                probability = math.exp(-remaining_ttl / (beta * ttl / 10))

                if random.random() < probability:
                    # Early refresh (async)
                    threading.Thread(
                        target=self._refresh,
                        args=(key, loader, ttl),
                        daemon=True
                    ).start()

            return json.loads(cached)

        # Cache miss
        value = loader()
        self.cache.setex(key, ttl, json.dumps(value))
        return value

    def _refresh(self, key: str, loader: Callable, ttl: int):
        """Background refresh."""
        value = loader()
        self.cache.setex(key, ttl, json.dumps(value))
```

## Distributed Caching

### Consistent Hashing

```python
import hashlib
from typing import List, Optional
from bisect import bisect_left

class ConsistentHash:
    """
    Consistent Hashing: Distribute keys across nodes with minimal redistribution.

    Problem with simple hashing (hash(key) % num_nodes):
    - Adding/removing node redistributes almost ALL keys
    - Causes massive cache miss storm

    Solution:
    - Hash both keys and nodes onto a ring (0 to 2^32)
    - Key is stored on next node clockwise
    - Adding/removing node only affects adjacent keys

    Virtual nodes:
    - Each physical node has multiple positions on ring
    - Provides better distribution
    - More virtual nodes = more even distribution
    """

    def __init__(self, nodes: List[str] = None, virtual_nodes: int = 150):
        self.virtual_nodes = virtual_nodes
        self.ring: dict = {}  # hash -> node
        self.sorted_hashes: List[int] = []

        if nodes:
            for node in nodes:
                self.add_node(node)

    def _hash(self, key: str) -> int:
        """Hash key to position on ring."""
        return int(hashlib.md5(key.encode()).hexdigest(), 16)

    def add_node(self, node: str):
        """Add a node with virtual nodes."""
        for i in range(self.virtual_nodes):
            virtual_key = f"{node}:vn{i}"
            hash_val = self._hash(virtual_key)
            self.ring[hash_val] = node
            # Insert in sorted order
            idx = bisect_left(self.sorted_hashes, hash_val)
            self.sorted_hashes.insert(idx, hash_val)

    def remove_node(self, node: str):
        """Remove a node and its virtual nodes."""
        for i in range(self.virtual_nodes):
            virtual_key = f"{node}:vn{i}"
            hash_val = self._hash(virtual_key)
            if hash_val in self.ring:
                del self.ring[hash_val]
                self.sorted_hashes.remove(hash_val)

    def get_node(self, key: str) -> Optional[str]:
        """Get the node responsible for this key."""
        if not self.ring:
            return None

        hash_val = self._hash(key)

        # Find first node with hash >= key hash
        idx = bisect_left(self.sorted_hashes, hash_val)

        # Wrap around if necessary
        if idx == len(self.sorted_hashes):
            idx = 0

        return self.ring[self.sorted_hashes[idx]]

    def get_nodes_for_key(self, key: str, count: int = 3) -> List[str]:
        """Get multiple nodes for replication."""
        if not self.ring:
            return []

        hash_val = self._hash(key)
        idx = bisect_left(self.sorted_hashes, hash_val)

        nodes = []
        seen = set()

        while len(nodes) < count and len(seen) < len(set(self.ring.values())):
            if idx >= len(self.sorted_hashes):
                idx = 0
            node = self.ring[self.sorted_hashes[idx]]
            if node not in seen:
                nodes.append(node)
                seen.add(node)
            idx += 1

        return nodes


# Usage
ring = ConsistentHash(['cache1:6379', 'cache2:6379', 'cache3:6379'])

# Get node for key
node = ring.get_node("user:12345")  # Returns responsible node

# Add new node - minimal redistribution
ring.add_node('cache4:6379')

# Get multiple nodes for replication
replicas = ring.get_nodes_for_key("user:12345", count=3)
```

### Redis Cluster Implementation

```python
import redis
from typing import Any, Optional, List
import json

class DistributedCache:
    """
    Production-ready distributed cache using Redis Cluster.
    """

    def __init__(self, startup_nodes: List[dict]):
        """
        Args:
            startup_nodes: [{"host": "localhost", "port": 7000}, ...]
        """
        self.cluster = redis.RedisCluster(
            startup_nodes=startup_nodes,
            decode_responses=True,
            skip_full_coverage_check=True
        )

    def get(self, key: str) -> Optional[Any]:
        """Get value from cluster."""
        data = self.cluster.get(key)
        return json.loads(data) if data else None

    def set(self, key: str, value: Any, ttl: int = 3600) -> bool:
        """Set value in cluster."""
        return self.cluster.setex(key, ttl, json.dumps(value))

    def mget(self, keys: List[str]) -> List[Optional[Any]]:
        """
        Get multiple keys.
        Note: Keys must be on same slot for MGET in cluster mode.
        Use hash tags: user:{123}:profile, user:{123}:settings
        """
        results = self.cluster.mget(keys)
        return [json.loads(r) if r else None for r in results]

    def delete(self, key: str) -> bool:
        """Delete key from cluster."""
        return self.cluster.delete(key) > 0

    def exists(self, key: str) -> bool:
        """Check if key exists."""
        return self.cluster.exists(key) > 0

    # Hash tag example for related data
    def get_user_data(self, user_id: int) -> dict:
        """Get all user data using hash tags."""
        # Hash tags ensure related keys are on same node
        keys = [
            f"user:{{{user_id}}}:profile",
            f"user:{{{user_id}}}:settings",
            f"user:{{{user_id}}}:preferences",
        ]
        results = self.mget(keys)
        return {
            "profile": results[0],
            "settings": results[1],
            "preferences": results[2],
        }
```

## Implementation Examples

### Go - Thread-Safe LRU Cache with TTL

```go
package cache

import (
	"container/list"
	"sync"
	"time"
)

// CacheItem represents an item in the cache
type CacheItem struct {
	Key       string
	Value     interface{}
	ExpiresAt time.Time
	element   *list.Element
}

// LRUCache is a thread-safe LRU cache with TTL support
type LRUCache struct {
	capacity int
	items    map[string]*CacheItem
	order    *list.List  // Front = most recent, Back = least recent
	mu       sync.RWMutex

	// Metrics
	hits       int64
	misses     int64
	evictions  int64
}

// NewLRUCache creates a new LRU cache
func NewLRUCache(capacity int) *LRUCache {
	cache := &LRUCache{
		capacity: capacity,
		items:    make(map[string]*CacheItem),
		order:    list.New(),
	}

	// Start background cleanup goroutine
	go cache.cleanupExpired()

	return cache
}

// Get retrieves an item from the cache
func (c *LRUCache) Get(key string) (interface{}, bool) {
	c.mu.Lock()
	defer c.mu.Unlock()

	item, exists := c.items[key]
	if !exists {
		c.misses++
		return nil, false
	}

	// Check expiration
	if time.Now().After(item.ExpiresAt) {
		c.removeItem(item)
		c.misses++
		return nil, false
	}

	// Move to front (most recently used)
	c.order.MoveToFront(item.element)
	c.hits++

	return item.Value, true
}

// Set adds or updates an item in the cache
func (c *LRUCache) Set(key string, value interface{}, ttl time.Duration) {
	c.mu.Lock()
	defer c.mu.Unlock()

	expiresAt := time.Now().Add(ttl)

	// Update existing item
	if item, exists := c.items[key]; exists {
		item.Value = value
		item.ExpiresAt = expiresAt
		c.order.MoveToFront(item.element)
		return
	}

	// Evict if at capacity
	for len(c.items) >= c.capacity {
		c.evictOldest()
	}

	// Add new item
	item := &CacheItem{
		Key:       key,
		Value:     value,
		ExpiresAt: expiresAt,
	}
	item.element = c.order.PushFront(item)
	c.items[key] = item
}

// Delete removes an item from the cache
func (c *LRUCache) Delete(key string) bool {
	c.mu.Lock()
	defer c.mu.Unlock()

	item, exists := c.items[key]
	if !exists {
		return false
	}

	c.removeItem(item)
	return true
}

func (c *LRUCache) evictOldest() {
	element := c.order.Back()
	if element == nil {
		return
	}

	item := element.Value.(*CacheItem)
	c.removeItem(item)
	c.evictions++
}

func (c *LRUCache) removeItem(item *CacheItem) {
	c.order.Remove(item.element)
	delete(c.items, item.Key)
}

func (c *LRUCache) cleanupExpired() {
	ticker := time.NewTicker(time.Minute)
	defer ticker.Stop()

	for range ticker.C {
		c.mu.Lock()
		now := time.Now()
		for _, item := range c.items {
			if now.After(item.ExpiresAt) {
				c.removeItem(item)
			}
		}
		c.mu.Unlock()
	}
}

// Stats returns cache statistics
func (c *LRUCache) Stats() map[string]interface{} {
	c.mu.RLock()
	defer c.mu.RUnlock()

	total := c.hits + c.misses
	hitRate := float64(0)
	if total > 0 {
		hitRate = float64(c.hits) / float64(total) * 100
	}

	return map[string]interface{}{
		"capacity":   c.capacity,
		"size":       len(c.items),
		"hits":       c.hits,
		"misses":     c.misses,
		"evictions":  c.evictions,
		"hit_rate":   hitRate,
	}
}
```

## Pros and Cons Analysis

### Overall Caching Trade-offs

| Aspect | Pros | Cons |
|--------|------|------|
| **Performance** | Dramatically reduces latency | Adds complexity |
| **Scalability** | Reduces database load | Cache itself needs scaling |
| **Cost** | Fewer database instances needed | Additional infrastructure |
| **Reliability** | Can serve during DB outages | Cache failures impact system |
| **Consistency** | N/A | Stale data is possible |

### Strategy Comparison

| Strategy | Best For | Consistency | Complexity | Performance |
|----------|----------|-------------|------------|-------------|
| Cache-Aside | General use | Eventual | Low | Good |
| Write-Through | Write-heavy + read | Strong | Medium | Moderate |
| Write-Behind | Write-heavy | Eventual | High | Excellent |
| Read-Through | Read-heavy | Eventual | Medium | Good |
| Refresh-Ahead | Hot keys | Strong | High | Excellent |

## Frequently Asked Questions (FAQ)

### Q1: How do I choose the right TTL?

**Answer:** Consider these factors:

| Data Type | Recommended TTL | Reasoning |
|-----------|----------------|-----------|
| User sessions | 15-30 min | Security + activity timeout |
| API responses | 1-5 min | Balance freshness + performance |
| Product listings | 5-15 min | Changes are not urgent |
| Search results | 1-10 min | Depends on data velocity |
| Static content | 24h - 7 days | Rarely changes |
| Configuration | 5-15 min | Changes need to propagate |

**Formula approach:**
```
TTL = acceptable_staleness × (1 - write_frequency)

Example: If 30s staleness is OK and data changes every 5min:
TTL = 30 * (1 - 1/300) = ~30s
```

---

### Q2: Redis vs Memcached - Which should I use?

**Answer:**

| Feature | Redis | Memcached |
|---------|-------|-----------|
| Data structures | Rich (lists, sets, hashes) | Key-value only |
| Persistence | Yes | No |
| Replication | Yes | No |
| Lua scripting | Yes | No |
| Memory efficiency | Less efficient | More efficient |
| Multi-threaded | No (single-threaded) | Yes |
| Cluster mode | Native | Via clients |

**Use Redis when:**
- You need data structures beyond key-value
- Persistence is required
- You need pub/sub or Lua scripting
- Complex operations (sorted sets, HyperLogLog)

**Use Memcached when:**
- Simple key-value caching only
- Maximum memory efficiency needed
- Simple horizontal scaling

---

### Q3: How do I handle cache failures gracefully?

**Answer:**

```python
class ResilientCache:
    def get(self, key: str, fallback: Callable) -> Any:
        try:
            # Try cache with timeout
            cached = self.cache.get(key, socket_timeout=0.1)
            if cached:
                return json.loads(cached)
        except (redis.RedisError, socket.timeout) as e:
            # Log but don't fail
            self.logger.warning(f"Cache error: {e}")

        # Fallback to source
        return fallback()

    def set(self, key: str, value: Any):
        try:
            self.cache.setex(key, self.ttl, json.dumps(value))
        except redis.RedisError as e:
            # Log but don't fail the request
            self.logger.warning(f"Cache write failed: {e}")
```

**Best practices:**
1. Always have a fallback to source of truth
2. Use short timeouts for cache operations
3. Implement circuit breaker for repeated failures
4. Monitor cache health and alert on issues

---

### Q4: How do I warm up a cold cache?

**Answer:**

```python
class CacheWarmer:
    def warm_cache(self, keys: List[str], loader: Callable):
        """Pre-populate cache on startup."""
        for key in keys:
            try:
                value = loader(key)
                self.cache.setex(key, self.ttl, json.dumps(value))
            except Exception as e:
                self.logger.error(f"Failed to warm {key}: {e}")

    def warm_from_access_log(self, log_file: str, top_n: int = 1000):
        """Warm cache based on historical access patterns."""
        # Parse log to find most accessed keys
        access_counts = Counter()
        with open(log_file) as f:
            for line in f:
                key = extract_cache_key(line)
                access_counts[key] += 1

        # Warm top N keys
        for key, _ in access_counts.most_common(top_n):
            self.warm_single(key)
```

---

### Q5: How do I monitor cache effectiveness?

**Answer:**

Key metrics to track:
1. **Hit Rate** - Target 90%+ for frequently accessed data
2. **Miss Rate** - Investigate if > 10%
3. **Eviction Rate** - High rate = need more capacity
4. **Latency** - p50, p95, p99 response times
5. **Memory Usage** - Track to prevent OOM

```python
class CacheMetrics:
    def __init__(self):
        self.hits = Counter()
        self.misses = Counter()
        self.latencies = []

    def record_hit(self, key: str, latency_ms: float):
        self.hits[key] += 1
        self.latencies.append(latency_ms)

    def get_stats(self) -> dict:
        total = sum(self.hits.values()) + sum(self.misses.values())
        return {
            "hit_rate": sum(self.hits.values()) / total if total > 0 else 0,
            "p50_latency": percentile(self.latencies, 50),
            "p95_latency": percentile(self.latencies, 95),
            "p99_latency": percentile(self.latencies, 99),
            "total_requests": total,
        }
```

---

### Q6: When should I NOT use caching?

**Answer:**

**Don't cache when:**
1. **Data changes very frequently** - Cache hit rate will be too low
2. **Strong consistency is required** - Financial transactions, inventory
3. **Data is unique per request** - Search with many parameters
4. **Cache size would be huge** - Every user has unique data
5. **Security-sensitive data** - Unless properly encrypted

**Warning signs that caching won't help:**
- Hit rate < 50%
- TTL must be < 1 second
- Write-to-read ratio > 1:1
- Data has high cardinality with uniform access

## Common Interview Questions

### Basic Level
1. What is caching and why is it used?
2. Explain cache-aside pattern
3. What is TTL and how do you choose it?
4. What is a cache hit vs cache miss?

### Intermediate Level
5. Explain write-through vs write-behind caching
6. How do you handle cache invalidation?
7. What is cache stampede and how do you prevent it?
8. Compare LRU and LFU eviction policies

### Advanced Level
9. How does consistent hashing work?
10. Design a distributed cache system
11. How would you implement cache warming?
12. Explain 2Q and why it's better than LRU for some workloads

### System Design Questions
13. Design a CDN caching strategy
14. How would you cache for a social media feed?
15. Design multi-level caching for an e-commerce site

## Best Practices

### Do's ✅

1. **Start with cache-aside** - Simplest and most flexible
2. **Set appropriate TTLs** - Based on data change frequency
3. **Monitor hit rates** - Target 90%+ for hot data
4. **Handle failures gracefully** - Cache down ≠ system down
5. **Use consistent hashing** - For distributed caches
6. **Implement cache warming** - Prevent cold start issues
7. **Use hash tags** - For related data in clusters

### Don'ts ❌

1. **Don't cache everything** - Only frequently accessed data
2. **Don't use infinite TTL** - Data will become stale
3. **Don't ignore cache failures** - Monitor and alert
4. **Don't cache sensitive data unencrypted** - Security risk
5. **Don't assume cache is always faster** - Network can add latency
6. **Don't forget to invalidate** - Stale data causes bugs

## Related Topics

- [Load Balancing](/topic/system-design/load-balancing) - Distributing traffic
- [CDN](/topic/system-design/cdn) - Edge caching
- [Database Replication](/topic/system-design/database-replication) - Read replicas as cache
- [Message Queues](/topic/system-design/message-queues) - Async processing
- [Rate Limiting](/topic/system-design/rate-limiting) - Often uses caching

## Further Reading

- "Designing Data-Intensive Applications" by Martin Kleppmann - Chapter on Caching
- Redis documentation - https://redis.io/documentation
- Facebook's caching paper - "Scaling Memcache at Facebook"
- "Web Scalability for Startup Engineers" - Caching strategies
