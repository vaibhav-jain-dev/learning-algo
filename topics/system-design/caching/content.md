# Caching

## Overview

Caching is a technique that stores copies of frequently accessed data in a faster storage layer to reduce latency, database load, and improve application performance. It's one of the most effective ways to scale systems.

## Key Concepts

### Why Caching?

1. **Reduced Latency**: Memory access is ~100x faster than disk, ~1000x faster than network
2. **Lower Database Load**: Fewer queries hit the primary database
3. **Cost Efficiency**: Serve more requests with fewer resources
4. **Improved User Experience**: Faster response times

### Cache Layers

```
Client → CDN → Application Cache → Database Cache → Database
         ↓           ↓                    ↓
     Static      In-Memory            Query Cache
     Assets      (Redis)              (MySQL)
```

## Caching Strategies

### 1. Cache-Aside (Lazy Loading)

Application manages cache explicitly.

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

**Pros**: Only caches what's needed, cache failures don't break the system
**Cons**: Initial requests are slow, potential for stale data

### 2. Write-Through

Data written to cache and database simultaneously.

```python
def update_user(user_id, data):
    # Write to database
    database.update("users", user_id, data)

    # Write to cache
    cache.set(f"user:{user_id}", data, ttl=3600)
```

**Pros**: Cache always consistent with database
**Cons**: Higher write latency, cache may store unused data

### 3. Write-Behind (Write-Back)

Write to cache immediately, async write to database.

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

**Pros**: Very fast writes, reduced database load
**Cons**: Risk of data loss if cache fails before flush

### 4. Read-Through

Cache automatically fetches from database on miss.

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

### 5. Refresh-Ahead

Proactively refresh cache before expiration.

```python
def get_with_refresh(key, ttl, refresh_threshold=0.8):
    value, remaining_ttl = cache.get_with_ttl(key)

    if remaining_ttl < ttl * (1 - refresh_threshold):
        # Async refresh in background
        background_refresh(key)

    return value
```

## Cache Eviction Policies

### 1. LRU (Least Recently Used)
Evicts items that haven't been accessed recently.

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

### 2. LFU (Least Frequently Used)
Evicts items with lowest access count.

### 3. TTL (Time To Live)
Items expire after a set duration.

### 4. FIFO (First In First Out)
Evicts oldest items first.

### 5. Random
Randomly selects items to evict.

## Cache Invalidation

### Strategies

1. **TTL-based**: Set expiration time
2. **Event-based**: Invalidate on data changes
3. **Version-based**: Include version in cache key

```python
# Version-based invalidation
def get_config(version):
    return cache.get(f"config:v{version}")

def update_config(data):
    new_version = get_current_version() + 1
    database.update_config(data, new_version)
    cache.set(f"config:v{new_version}", data)
    # Old version naturally expires or can be explicitly deleted
```

### Cache Stampede Prevention

When cache expires, multiple requests hit database simultaneously.

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

## Distributed Caching

### Consistent Hashing

Distribute cache across multiple nodes with minimal redistribution when nodes change.

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

### Redis Cluster Example

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

## Implementation Example

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

## Common Interview Questions

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

## Best Practices

1. **Set appropriate TTLs** - Balance freshness vs. hit rate
2. **Monitor cache hit rates** - Target 90%+ for frequently accessed data
3. **Use cache warming** - Pre-populate cache on startup
4. **Handle cache failures gracefully** - Fall back to database
5. **Avoid caching sensitive data** - Or encrypt if necessary
6. **Use consistent hashing** - For distributed caches

## Related Topics

- [Load Balancing](/topic/system-design/load-balancing)
- [CDN](/topic/system-design/cdn)
- [Database Replication](/topic/system-design/database-replication)
