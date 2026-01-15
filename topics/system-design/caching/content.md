# Caching

## Overview

Caching is a technique that stores copies of frequently accessed data in a faster storage layer to reduce latency, database load, and improve application performance. It's one of the most effective ways to scale systems.

## Key Concepts

### Why Caching?

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

1. **Reduced Latency**: Memory access is ~100x faster than disk, ~1000x faster than network
2. **Lower Database Load**: Fewer queries hit the primary database
3. **Cost Efficiency**: Serve more requests with fewer resources
4. **Improved User Experience**: Faster response times

</div>

### Cache Layers Architecture

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CACHE HIERARCHY                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐              │
│  │  Client  │───►│   CDN    │───►│   App    │───►│ Database │              │
│  │ Browser  │    │ (Edge)   │    │  Cache   │    │  Cache   │              │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘              │
│       │              │               │               │                       │
│       ▼              ▼               ▼               ▼                       │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐                 │
│  │ Browser  │   │  Static  │   │In-Memory │   │  Query   │                 │
│  │  Cache   │   │  Assets  │   │ (Redis)  │   │  Cache   │                 │
│  │ ~100ms   │   │  ~50ms   │   │  ~1ms    │   │  ~10ms   │                 │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘                 │
│                                                                              │
│  Latency:  Fastest ◄────────────────────────────────────► Slowest          │
│                                                                              │
│  Typical latencies:                                                          │
│  • L1 Cache:      ~1 ns                                                     │
│  • L2 Cache:      ~10 ns                                                    │
│  • RAM:           ~100 ns                                                   │
│  • Redis:         ~1 ms (network + memory)                                  │
│  • SSD:           ~100 μs                                                   │
│  • HDD:           ~10 ms                                                    │
│  • Network:       ~100 ms (cross-region)                                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

---

## Caching Strategies

### Strategy Comparison

<div style="background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

| Strategy | Read Path | Write Path | Consistency | Best For |
|----------|-----------|------------|-------------|----------|
| **Cache-Aside** | App checks cache → DB on miss | App updates DB, invalidates cache | Eventual | General purpose |
| **Read-Through** | Cache fetches from DB on miss | N/A | Eventual | Read-heavy |
| **Write-Through** | Same as cache-aside | Write to cache + DB together | Strong | Read-heavy + consistency |
| **Write-Behind** | Same as cache-aside | Write to cache, async DB | Eventual | Write-heavy |
| **Refresh-Ahead** | Proactive refresh before expiry | N/A | Fresh data | Predictable access |

</div>

### 1. Cache-Aside (Lazy Loading)

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CACHE-ASIDE PATTERN                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  READ FLOW:                                                                  │
│  ──────────                                                                  │
│                                                                              │
│  Application                                                                 │
│       │                                                                      │
│       │ 1. Check cache                                                       │
│       ▼                                                                      │
│  ┌─────────┐                                                                │
│  │  Cache  │ ──── HIT? ──── YES ────► Return data                           │
│  └─────────┘         │                                                       │
│                      NO                                                      │
│                      │                                                       │
│                      ▼                                                       │
│               2. Query database                                              │
│                      │                                                       │
│                      ▼                                                       │
│              ┌──────────────┐                                               │
│              │   Database   │                                               │
│              └──────────────┘                                               │
│                      │                                                       │
│                      ▼                                                       │
│               3. Store in cache                                              │
│                      │                                                       │
│                      ▼                                                       │
│               4. Return data                                                 │
│                                                                              │
│  WRITE FLOW:                                                                 │
│  ───────────                                                                 │
│                                                                              │
│  Application ──► Update Database ──► Invalidate Cache                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 20px;">

**Pros**
- Only caches what's needed
- Cache failures don't break system
- Simple to implement

</div>

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px;">

**Cons**
- Initial requests are slow (cache miss)
- Potential for stale data
- Cache stampede on expiry

</div>

</div>

### 2. Write-Through

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                       WRITE-THROUGH PATTERN                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Application                                                                 │
│       │                                                                      │
│       │ Write request                                                        │
│       ▼                                                                      │
│  ┌─────────┐     Synchronous      ┌──────────────┐                          │
│  │  Cache  │ ◄─────────────────► │   Database   │                          │
│  └─────────┘                      └──────────────┘                          │
│       │                                  │                                   │
│       └──────────────────────────────────┘                                  │
│                      │                                                       │
│               Both updated                                                   │
│               atomically                                                     │
│                      │                                                       │
│                      ▼                                                       │
│               Return success                                                 │
│                                                                              │
│  Result: Cache always consistent with database                              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

**Pros**: Cache always consistent with database
**Cons**: Higher write latency, cache may store unused data

### 3. Write-Behind (Write-Back)

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                       WRITE-BEHIND PATTERN                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Application                                                                 │
│       │                                                                      │
│       │ 1. Write request                                                     │
│       ▼                                                                      │
│  ┌─────────┐                                                                │
│  │  Cache  │ ◄── Return immediately (fast!)                                 │
│  └─────────┘                                                                │
│       │                                                                      │
│       │ 2. Queue write                                                       │
│       ▼                                                                      │
│  ┌───────────────┐                                                          │
│  │  Write Queue  │                                                          │
│  │  ┌───┬───┬───┐│                                                          │
│  │  │ A │ B │ C ││ ← Pending writes                                         │
│  │  └───┴───┴───┘│                                                          │
│  └───────────────┘                                                          │
│       │                                                                      │
│       │ 3. Async batch write                                                 │
│       ▼                                                                      │
│  ┌──────────────┐                                                           │
│  │   Database   │                                                           │
│  └──────────────┘                                                           │
│                                                                              │
│  ⚠️  Risk: Data loss if cache fails before flush!                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ff6b6b;">

**Pros**: Very fast writes, reduced database load, batch optimization
**Cons**: Risk of data loss if cache fails before flush, complexity

</div>

### 4. Read-Through

Cache automatically fetches from database on miss.

### 5. Refresh-Ahead

Proactively refresh cache before expiration - prevents cache miss latency for predictable access patterns.

---

## Cache Eviction Policies

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CACHE EVICTION POLICIES                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. LRU (Least Recently Used)                                               │
│     ┌───┬───┬───┬───┬───┐                                                   │
│     │ E │ D │ C │ B │ A │  Access A → A moves to front                      │
│     └───┴───┴───┴───┴───┘                                                   │
│      ▲                 ▲                                                     │
│   Evict             Most                                                     │
│   first            recent                                                    │
│                                                                              │
│  2. LFU (Least Frequently Used)                                             │
│     ┌────────────────────┐                                                  │
│     │ Item │ Frequency   │                                                  │
│     ├────────────────────┤                                                  │
│     │  A   │    5        │ ← Keep (popular)                                 │
│     │  B   │    2        │                                                  │
│     │  C   │    1        │ ← Evict first                                    │
│     └────────────────────┘                                                  │
│                                                                              │
│  3. TTL (Time To Live)                                                      │
│     ┌────────────────────────────────────┐                                  │
│     │ Key │ Value │ Expires At           │                                  │
│     ├────────────────────────────────────┤                                  │
│     │  A  │  ...  │ 2024-01-15 10:30:00  │ ← Auto-expire                   │
│     └────────────────────────────────────┘                                  │
│                                                                              │
│  4. FIFO (First In First Out)                                               │
│     Evict oldest entries regardless of access pattern                       │
│                                                                              │
│  5. Random                                                                   │
│     Randomly select items to evict (simple but unpredictable)               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

---

## Cache Invalidation

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">

> "There are only two hard things in Computer Science: cache invalidation and naming things." - Phil Karlton

</div>

### Strategies

<div style="background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

| Strategy | How It Works | Best For |
|----------|--------------|----------|
| **TTL-based** | Set expiration time | Tolerant of staleness |
| **Event-based** | Invalidate on data changes | Strong consistency needs |
| **Version-based** | Include version in cache key | Config, static data |

</div>

### Cache Stampede Prevention

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CACHE STAMPEDE PROBLEM                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Cache expires at T=0                                                        │
│                                                                              │
│  T=0.001: Request 1 ──► Cache MISS ──► Query DB                             │
│  T=0.002: Request 2 ──► Cache MISS ──► Query DB                             │
│  T=0.003: Request 3 ──► Cache MISS ──► Query DB                             │
│  T=0.004: Request 4 ──► Cache MISS ──► Query DB                             │
│     ...        ...                       ...                                 │
│                                                                              │
│  Result: Database overwhelmed! 😱                                            │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  SOLUTION: Lock-based approach                                               │
│                                                                              │
│  T=0.001: Request 1 ──► Cache MISS ──► Acquire Lock ──► Query DB            │
│  T=0.002: Request 2 ──► Cache MISS ──► Wait for lock...                     │
│  T=0.003: Request 3 ──► Cache MISS ──► Wait for lock...                     │
│  T=0.050: Request 1 ──► Updates cache ──► Release lock                      │
│  T=0.051: Request 2 ──► Cache HIT! ──► Return                               │
│  T=0.052: Request 3 ──► Cache HIT! ──► Return                               │
│                                                                              │
│  Result: Only ONE database query! ✓                                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

---

## Distributed Caching

### Consistent Hashing

<div style="background: #0d1117; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; font-family: monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; white-space: pre;">
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CONSISTENT HASHING FOR CACHE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Hash Ring (0 to 2^32):                                                      │
│                                                                              │
│                         0                                                    │
│                         │                                                    │
│              Node A (●)─┼─────────(●) Node B                                │
│                        ╱│╲                                                   │
│                       ╱ │ ╲                                                  │
│                      ╱  │  ╲                                                 │
│                     ╱   │   ╲                                                │
│            2^32/4 ─●    │    ●─ 2^32 * 3/4                                  │
│                    │    │    │                                               │
│              Node D │    │    │ Node C                                       │
│                     ╲   │   ╱                                                │
│                      ╲  │  ╱                                                 │
│                       ╲ │ ╱                                                  │
│                        ╲│╱                                                   │
│                         │                                                    │
│                       2^32/2                                                 │
│                                                                              │
│  Key "user:123" ──► hash() = X ──► Find next node clockwise ──► Node B     │
│                                                                              │
│  When Node B fails:                                                          │
│  • Only keys between A and B move to C                                       │
│  • Keys on other nodes stay put!                                             │
│                                                                              │
│  Virtual nodes: Each physical node gets multiple positions                   │
│  for better distribution                                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
</pre>
</div>

---

## Common Interview Questions

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

1. **How do you handle cache invalidation in a distributed system?**
   - Use pub/sub for cache invalidation events
   - Version-based keys
   - Short TTLs with refresh-ahead

2. **What's the difference between Redis and Memcached?**
   - Redis: Data structures, persistence, replication, Lua scripting
   - Memcached: Simpler, multi-threaded, slightly faster for simple use cases

3. **How do you prevent cache stampede?**
   - Locking/mutex
   - Probabilistic early expiration
   - Background refresh

4. **When should you NOT use caching?**
   - Highly dynamic data
   - Write-heavy workloads
   - When consistency is critical

</div>

---

## Best Practices

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

1. **Set appropriate TTLs** - Balance freshness vs. hit rate
2. **Monitor cache hit rates** - Target 90%+ for frequently accessed data
3. **Use cache warming** - Pre-populate cache on startup
4. **Handle cache failures gracefully** - Fall back to database
5. **Avoid caching sensitive data** - Or encrypt if necessary
6. **Use consistent hashing** - For distributed caches

</div>

---

## Related Topics

- [Load Balancing](/topic/system-design/load-balancing)
- [CDN](/topic/system-design/cdn)
- [Database Replication](/topic/system-design/database-replication)

---

## Implementation

### Python - Cache-Aside Pattern

```python
def get_user(user_id):
    # Try cache first
    user = cache.get(f"user:{user_id}")
    if user:
        return user

    # Cache miss - fetch from database
    user = database.query(f"SELECT * FROM users WHERE id = {user_id}")

    # Store in cache for future requests
    cache.set(f"user:{user_id}", user, ttl=3600)
    return user
```

### Python - Write-Through Pattern

```python
def update_user(user_id, data):
    # Write to database
    database.update("users", user_id, data)

    # Write to cache
    cache.set(f"user:{user_id}", data, ttl=3600)
```

### Python - Write-Behind Pattern

```python
def update_user(user_id, data):
    # Write to cache only
    cache.set(f"user:{user_id}", data)

    # Queue async database write
    write_queue.push({"table": "users", "id": user_id, "data": data})

# Background worker
def flush_writes():
    while True:
        item = write_queue.pop()
        database.update(item["table"], item["id"], item["data"])
```

### Python - Read-Through Cache

```python
class ReadThroughCache:
    def get(self, key, loader_func):
        value = self.cache.get(key)
        if value is None:
            value = loader_func()
            self.cache.set(key, value)
        return value

# Usage
user = cache.get(f"user:{user_id}", lambda: database.get_user(user_id))
```

### Python - Refresh-Ahead

```python
def get_with_refresh(key, ttl, refresh_threshold=0.8):
    value, remaining_ttl = cache.get_with_ttl(key)

    if remaining_ttl < ttl * (1 - refresh_threshold):
        # Async refresh in background
        background_refresh(key)

    return value
```

### Python - LRU Cache with OrderedDict

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return None
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)
```

### Python - Consistent Hashing

```python
import hashlib

class ConsistentHash:
    def __init__(self, nodes, virtual_nodes=100):
        self.ring = {}
        self.sorted_keys = []

        for node in nodes:
            for i in range(virtual_nodes):
                key = self._hash(f"{node}:{i}")
                self.ring[key] = node
                self.sorted_keys.append(key)

        self.sorted_keys.sort()

    def _hash(self, key):
        return int(hashlib.md5(key.encode()).hexdigest(), 16)

    def get_node(self, key):
        if not self.ring:
            return None

        hash_key = self._hash(key)
        for ring_key in self.sorted_keys:
            if hash_key <= ring_key:
                return self.ring[ring_key]
        return self.ring[self.sorted_keys[0]]
```

### Python - Cache Stampede Prevention

```python
import threading

locks = {}

def get_with_lock(key, loader_func, ttl):
    value = cache.get(key)
    if value:
        return value

    # Acquire lock for this key
    lock = locks.setdefault(key, threading.Lock())
    with lock:
        # Double-check after acquiring lock
        value = cache.get(key)
        if value:
            return value

        value = loader_func()
        cache.set(key, value, ttl)
        return value
```

### Python - Redis Cluster Example

```python
import redis

class DistributedCache:
    def __init__(self, nodes):
        self.cluster = redis.RedisCluster(
            startup_nodes=nodes,
            decode_responses=True
        )

    def get(self, key):
        return self.cluster.get(key)

    def set(self, key, value, ttl=3600):
        self.cluster.setex(key, ttl, value)

    def delete(self, key):
        self.cluster.delete(key)
```

### Go - Thread-Safe LRU Cache

```go
package main

import (
	"container/list"
	"sync"
	"time"
)

type CacheItem struct {
	Key       string
	Value     interface{}
	ExpiresAt time.Time
}

type LRUCache struct {
	capacity int
	items    map[string]*list.Element
	order    *list.List
	mu       sync.RWMutex
}

func NewLRUCache(capacity int) *LRUCache {
	return &LRUCache{
		capacity: capacity,
		items:    make(map[string]*list.Element),
		order:    list.New(),
	}
}

func (c *LRUCache) Get(key string) (interface{}, bool) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if elem, ok := c.items[key]; ok {
		item := elem.Value.(*CacheItem)
		if time.Now().Before(item.ExpiresAt) {
			c.order.MoveToFront(elem)
			return item.Value, true
		}
		// Expired - remove it
		c.removeElement(elem)
	}
	return nil, false
}

func (c *LRUCache) Set(key string, value interface{}, ttl time.Duration) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if elem, ok := c.items[key]; ok {
		c.order.MoveToFront(elem)
		item := elem.Value.(*CacheItem)
		item.Value = value
		item.ExpiresAt = time.Now().Add(ttl)
		return
	}

	// Evict if at capacity
	for c.order.Len() >= c.capacity {
		c.removeOldest()
	}

	item := &CacheItem{
		Key:       key,
		Value:     value,
		ExpiresAt: time.Now().Add(ttl),
	}
	elem := c.order.PushFront(item)
	c.items[key] = elem
}

func (c *LRUCache) removeOldest() {
	elem := c.order.Back()
	if elem != nil {
		c.removeElement(elem)
	}
}

func (c *LRUCache) removeElement(elem *list.Element) {
	c.order.Remove(elem)
	item := elem.Value.(*CacheItem)
	delete(c.items, item.Key)
}

func main() {
	cache := NewLRUCache(100)

	cache.Set("user:1", map[string]string{"name": "Alice"}, 5*time.Minute)

	if value, ok := cache.Get("user:1"); ok {
		println("Found:", value.(map[string]string)["name"])
	}
}
```
