# Caching

## Overview

Caching is a technique that stores copies of frequently accessed data in a faster storage layer (like memory) to reduce latency and decrease load on the primary data source. Think of it as keeping your most-used tools on your desk instead of walking to the storage room every time you need them.

---

## Why This Matters

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin: 0 0 16px 0; font-size: 16px;">Real Company Examples</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
      <div style="color: #0f172a; font-weight: 600; margin-bottom: 8px;">Netflix</div>
      <div style="color: #475569; font-size: 14px;">Caches movie metadata and thumbnails at edge servers. Reduced origin requests by 95% and serves 200+ million users globally.</div>
    </div>
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
      <div style="color: #0f172a; font-weight: 600; margin-bottom: 8px;">Facebook</div>
      <div style="color: #475569; font-size: 14px;">Uses Memcached clusters caching 75% of all reads. Handles billions of requests per second with sub-millisecond latency.</div>
    </div>
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
      <div style="color: #0f172a; font-weight: 600; margin-bottom: 8px;">Amazon</div>
      <div style="color: #475569; font-size: 14px;">Every 100ms of latency costs 1% in sales. Caching product pages and recommendations saves millions in revenue.</div>
    </div>
  </div>
</div>

**Why caching is essential:**
- **Speed**: Memory access is ~100x faster than disk, ~1000x faster than network
- **Cost Reduction**: Serve more requests with fewer database servers
- **Scalability**: Handle traffic spikes without scaling expensive backend resources
- **User Experience**: Users abandon sites that take more than 3 seconds to load

---

## Core Concepts

### The Library Analogy

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <div style="color: #1e293b; font-size: 15px; line-height: 1.7;">
    <p>Imagine a <strong>university library</strong>:</p>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 16px;">
      <div style="background: #ffffff; border-radius: 8px; padding: 16px; border: 1px solid #cbd5e1;">
        <div style="color: #dc2626; font-weight: 600; margin-bottom: 8px;">Without Caching</div>
        <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
          <li>Every student walks to the archive basement</li>
          <li>Finds the book in the catalog</li>
          <li>Retrieves it from storage</li>
          <li>Walks back to their desk</li>
          <li><strong>Time: 10 minutes per book</strong></li>
        </ul>
      </div>
      <div style="background: #ffffff; border-radius: 8px; padding: 16px; border: 1px solid #cbd5e1;">
        <div style="color: #16a34a; font-weight: 600; margin-bottom: 8px;">With Caching</div>
        <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
          <li>Popular books kept on a "reserve shelf" near entrance</li>
          <li>Students check reserve shelf first</li>
          <li>If found (cache hit): grab and go</li>
          <li>If not found (cache miss): go to archive</li>
          <li><strong>Time: 30 seconds (hit) or 10 min (miss)</strong></li>
        </ul>
      </div>
    </div>
  </div>
</div>

### Cache Terminology

| Term | Library Analogy | Technical Meaning |
|------|-----------------|-------------------|
| **Cache Hit** | Book found on reserve shelf | Data found in cache |
| **Cache Miss** | Book not on shelf, go to archive | Data not in cache, fetch from source |
| **TTL** | Books returned to archive after 7 days | Time before cached data expires |
| **Eviction** | Remove least-used books when shelf is full | Remove data when cache is full |
| **Invalidation** | Remove outdated edition when new one arrives | Remove stale data after update |

---

## How It Works

### Cache Hierarchy

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; text-align: center; margin: 0 0 20px 0; font-size: 16px;">THE CACHING PYRAMID</h4>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
    <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 12px 24px; border-radius: 8px; text-align: center; width: 120px;">
      <div style="font-weight: 600; font-size: 13px;">Browser</div>
      <div style="font-size: 11px; opacity: 0.9;">~0ms</div>
    </div>
    <div style="color: #64748b;">|</div>
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 12px 24px; border-radius: 8px; text-align: center; width: 160px;">
      <div style="font-weight: 600; font-size: 13px;">CDN Edge</div>
      <div style="font-size: 11px; opacity: 0.9;">~20ms</div>
    </div>
    <div style="color: #64748b;">|</div>
    <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 12px 24px; border-radius: 8px; text-align: center; width: 200px;">
      <div style="font-weight: 600; font-size: 13px;">Application Cache (Redis)</div>
      <div style="font-size: 11px; opacity: 0.9;">~1ms</div>
    </div>
    <div style="color: #64748b;">|</div>
    <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 12px 24px; border-radius: 8px; text-align: center; width: 240px;">
      <div style="font-weight: 600; font-size: 13px;">Database Query Cache</div>
      <div style="font-size: 11px; opacity: 0.9;">~10ms</div>
    </div>
    <div style="color: #64748b;">|</div>
    <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 12px 24px; border-radius: 8px; text-align: center; width: 280px;">
      <div style="font-weight: 600; font-size: 13px;">Database (Disk)</div>
      <div style="font-size: 11px; opacity: 0.9;">~50-100ms</div>
    </div>
  </div>
  <div style="text-align: center; margin-top: 16px; color: #64748b; font-size: 13px;">
    Faster at top, more capacity at bottom
  </div>
</div>

### Caching Strategies

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; text-align: center; margin: 0 0 20px 0; font-size: 16px;">CACHE-ASIDE (LAZY LOADING)</h4>
  <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
    <div style="background: #ffffff; border: 2px solid #3b82f6; border-radius: 8px; padding: 16px 24px; text-align: center;">
      <div style="color: #1e293b; font-weight: 600;">Application</div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
      <div style="color: #1e293b; font-size: 12px;">1. Check</div>
      <div style="color: #3b82f6; font-size: 18px;">--></div>
    </div>
    <div style="background: #ffffff; border: 2px solid #8b5cf6; border-radius: 8px; padding: 16px 24px; text-align: center;">
      <div style="color: #1e293b; font-weight: 600;">Cache</div>
      <div style="color: #64748b; font-size: 12px; margin-top: 4px;">Hit? Return!</div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
      <div style="color: #1e293b; font-size: 12px;">2. Miss?</div>
      <div style="color: #ef4444; font-size: 18px;">--></div>
    </div>
    <div style="background: #ffffff; border: 2px solid #f59e0b; border-radius: 8px; padding: 16px 24px; text-align: center;">
      <div style="color: #1e293b; font-weight: 600;">Database</div>
    </div>
  </div>
  <div style="text-align: center; margin-top: 16px; color: #475569; font-size: 13px;">
    3. Store result in cache for next time
  </div>
</div>

### Strategy Comparison

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <div style="overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse; color: #1e293b; font-size: 14px;">
      <thead>
        <tr style="background: #e2e8f0;">
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Strategy</th>
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Read Path</th>
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Write Path</th>
          <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Best For</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background: #ffffff;">
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Cache-Aside</td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">App checks cache, then DB</td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Update DB, invalidate cache</td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">General purpose</td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Write-Through</td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Read from cache</td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Write to cache AND DB together</td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Strong consistency needed</td>
        </tr>
        <tr style="background: #ffffff;">
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Write-Behind</td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Read from cache</td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Write to cache, async DB write</td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Write-heavy workloads</td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="padding: 12px; font-weight: 600;">Read-Through</td>
          <td style="padding: 12px;">Cache fetches from DB on miss</td>
          <td style="padding: 12px;">N/A</td>
          <td style="padding: 12px;">Simplified read logic</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Cache Eviction Policies

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; text-align: center; margin: 0 0 20px 0; font-size: 16px;">WHEN THE CACHE IS FULL, WHO GETS EVICTED?</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
    <div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #22c55e;">
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">LRU (Least Recently Used)</div>
      <div style="color: #475569; font-size: 13px;">Evict item not accessed longest. Most popular choice.</div>
      <div style="color: #64748b; font-size: 12px; margin-top: 8px; font-style: italic;">"Haven't used this in ages? Out!"</div>
    </div>
    <div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #3b82f6;">
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">LFU (Least Frequently Used)</div>
      <div style="color: #475569; font-size: 13px;">Evict item accessed fewest times overall.</div>
      <div style="color: #64748b; font-size: 12px; margin-top: 8px; font-style: italic;">"Only used twice ever? Goodbye!"</div>
    </div>
    <div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">FIFO (First In First Out)</div>
      <div style="color: #475569; font-size: 13px;">Evict oldest item regardless of usage.</div>
      <div style="color: #64748b; font-size: 12px; margin-top: 8px; font-style: italic;">"You were here first, now leave first."</div>
    </div>
    <div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #8b5cf6;">
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">TTL (Time To Live)</div>
      <div style="color: #475569; font-size: 13px;">Items expire after set time period.</div>
      <div style="color: #64748b; font-size: 12px; margin-top: 8px; font-style: italic;">"Your time is up!"</div>
    </div>
  </div>
</div>

---

## Real-Life Failure Story

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 2px solid #fecaca; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #991b1b; margin: 0 0 16px 0; font-size: 16px;">The Facebook Cache Stampede (2010)</h4>

  <div style="color: #1e293b; font-size: 14px; line-height: 1.7;">
    <p><strong>What Happened:</strong> Facebook experienced a major outage when a bug caused their entire Memcached cluster to invalidate simultaneously. When cache entries expired at the same time:</p>

    <ol style="color: #475569; margin: 12px 0;">
      <li>Millions of requests found empty caches (cache miss)</li>
      <li>All requests hit the database simultaneously</li>
      <li>Database servers were overwhelmed and crashed</li>
      <li>Even after restart, the stampede repeated</li>
    </ol>

    <p><strong>The Fix:</strong></p>
    <ul style="color: #475569; margin: 12px 0;">
      <li><strong>Jittered TTLs:</strong> Added random variation to expiration times (e.g., 3600s +/- 300s)</li>
      <li><strong>Locking:</strong> Only one request regenerates cache, others wait</li>
      <li><strong>Stale-while-revalidate:</strong> Serve stale data while refreshing in background</li>
    </ul>

    <p><strong>Lesson:</strong> Never let cache entries expire at the same time. Add randomization to everything in distributed systems.</p>
  </div>
</div>

---

## What to Watch Out For

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin: 0 0 16px 0; font-size: 16px;">Common Pitfalls</h4>
  <div style="display: grid; gap: 12px;">
    <div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #ef4444;">
      <div style="color: #1e293b; font-weight: 600;">Cache Stampede</div>
      <div style="color: #475569; font-size: 13px;">Many requests hit database when cache expires. Use locking or jittered TTLs.</div>
    </div>
    <div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
      <div style="color: #1e293b; font-weight: 600;">Stale Data</div>
      <div style="color: #475569; font-size: 13px;">Cache shows outdated information. Implement proper invalidation or use short TTLs.</div>
    </div>
    <div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #8b5cf6;">
      <div style="color: #1e293b; font-weight: 600;">Cache Penetration</div>
      <div style="color: #475569; font-size: 13px;">Queries for non-existent data always miss cache. Cache negative results too.</div>
    </div>
    <div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #3b82f6;">
      <div style="color: #1e293b; font-weight: 600;">Hot Key Problem</div>
      <div style="color: #475569; font-size: 13px;">One popular key overwhelms a single cache node. Replicate hot keys or use local caching.</div>
    </div>
    <div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #22c55e;">
      <div style="color: #1e293b; font-weight: 600;">Memory Pressure</div>
      <div style="color: #475569; font-size: 13px;">Cache grows unbounded. Set memory limits and monitor eviction rates.</div>
    </div>
  </div>
</div>

---

## Interview Deep Dive

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin: 0 0 16px 0; font-size: 16px;">Common Interview Questions</h4>

  <div style="margin-bottom: 20px;">
    <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Q: How do you handle cache invalidation in a distributed system?</div>
    <div style="color: #475569; font-size: 14px; background: #ffffff; padding: 12px; border-radius: 6px;">
      <strong>A:</strong> Multiple approaches: (1) <strong>TTL-based</strong> - set expiration, accept some staleness. (2) <strong>Event-driven</strong> - publish invalidation events via Kafka/Redis Pub-Sub when data changes. (3) <strong>Version-based</strong> - include version in cache key, increment on updates. For strong consistency, use write-through with distributed locks.
    </div>
  </div>

  <div style="margin-bottom: 20px;">
    <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Q: Redis vs Memcached - when would you choose each?</div>
    <div style="color: #475569; font-size: 14px; background: #ffffff; padding: 12px; border-radius: 6px;">
      <strong>A:</strong> <strong>Redis</strong> when you need: data structures (lists, sets, sorted sets), persistence, pub/sub, Lua scripting, replication. <strong>Memcached</strong> when you need: simple key-value, multi-threaded performance, less memory overhead per key, or already have it in your stack. Redis is more versatile; Memcached is simpler and slightly faster for basic operations.
    </div>
  </div>

  <div style="margin-bottom: 20px;">
    <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Q: How do you prevent cache stampede?</div>
    <div style="color: #475569; font-size: 14px; background: #ffffff; padding: 12px; border-radius: 6px;">
      <strong>A:</strong> (1) <strong>Locking</strong> - only one request regenerates, others wait or return stale. (2) <strong>Probabilistic early expiration</strong> - randomly refresh before TTL. (3) <strong>Background refresh</strong> - async job refreshes popular keys. (4) <strong>Jittered TTLs</strong> - add randomness to prevent synchronized expiry.
    </div>
  </div>

  <div>
    <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Q: When should you NOT use caching?</div>
    <div style="color: #475569; font-size: 14px; background: #ffffff; padding: 12px; border-radius: 6px;">
      <strong>A:</strong> (1) <strong>Highly dynamic data</strong> that changes every request. (2) <strong>Strong consistency requirements</strong> where stale reads are unacceptable (financial transactions). (3) <strong>Low-traffic endpoints</strong> where cache hit rate would be low. (4) <strong>Large, unique datasets</strong> that don't fit in memory. (5) <strong>Security-sensitive data</strong> that shouldn't persist outside the database.
    </div>
  </div>
</div>

---

## Code Implementation

### Python - Production Cache with Stampede Prevention

```python
import time
import threading
import hashlib
import random
from typing import Optional, Callable, Any
from dataclasses import dataclass

@dataclass
class CacheEntry:
    value: Any
    expires_at: float
    created_at: float

class ProductionCache:
    """
    Production-ready cache with:
    - TTL with jitter (prevents stampede)
    - Locking for cache regeneration
    - Stale-while-revalidate
    - Cache statistics
    """

    def __init__(self, max_size: int = 10000, default_ttl: int = 3600):
        self.cache: dict[str, CacheEntry] = {}
        self.max_size = max_size
        self.default_ttl = default_ttl
        self.locks: dict[str, threading.Lock] = {}
        self.lock_mutex = threading.Lock()

        # Statistics
        self.hits = 0
        self.misses = 0

    def _get_lock(self, key: str) -> threading.Lock:
        """Get or create a lock for a specific key."""
        with self.lock_mutex:
            if key not in self.locks:
                self.locks[key] = threading.Lock()
            return self.locks[key]

    def _add_jitter(self, ttl: int) -> float:
        """Add 10% random jitter to TTL."""
        jitter = ttl * 0.1 * random.random()
        return ttl + jitter

    def get(self, key: str) -> Optional[Any]:
        """Get value from cache."""
        entry = self.cache.get(key)

        if entry is None:
            self.misses += 1
            return None

        if time.time() > entry.expires_at:
            self.misses += 1
            return None

        self.hits += 1
        return entry.value

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> None:
        """Set value in cache with jittered TTL."""
        ttl = ttl or self.default_ttl
        jittered_ttl = self._add_jitter(ttl)

        # Evict if at capacity (simple LRU would be better)
        if len(self.cache) >= self.max_size:
            oldest_key = min(self.cache, key=lambda k: self.cache[k].created_at)
            del self.cache[oldest_key]

        self.cache[key] = CacheEntry(
            value=value,
            expires_at=time.time() + jittered_ttl,
            created_at=time.time()
        )

    def get_or_set(
        self,
        key: str,
        loader: Callable[[], Any],
        ttl: Optional[int] = None,
        stale_ttl: int = 60
    ) -> Any:
        """
        Get from cache or load with stampede prevention.

        Uses locking to ensure only one request loads data.
        Others wait or return stale data.
        """
        entry = self.cache.get(key)
        now = time.time()

        # Fresh cache hit
        if entry and now < entry.expires_at:
            self.hits += 1
            return entry.value

        # Stale data available?
        stale_value = entry.value if entry else None
        stale_available = entry and now < entry.expires_at + stale_ttl

        # Try to acquire lock
        lock = self._get_lock(key)
        acquired = lock.acquire(blocking=not stale_available)

        if not acquired:
            # Couldn't get lock, return stale if available
            self.hits += 1  # Serving stale
            return stale_value

        try:
            # Double-check after acquiring lock
            entry = self.cache.get(key)
            if entry and time.time() < entry.expires_at:
                return entry.value

            # Load fresh data
            self.misses += 1
            value = loader()
            self.set(key, value, ttl)
            return value
        finally:
            lock.release()

    def invalidate(self, key: str) -> bool:
        """Remove key from cache."""
        if key in self.cache:
            del self.cache[key]
            return True
        return False

    def invalidate_pattern(self, pattern: str) -> int:
        """Invalidate all keys matching pattern (simple prefix match)."""
        keys_to_delete = [k for k in self.cache if k.startswith(pattern)]
        for key in keys_to_delete:
            del self.cache[key]
        return len(keys_to_delete)

    def stats(self) -> dict:
        """Get cache statistics."""
        total = self.hits + self.misses
        return {
            "hits": self.hits,
            "misses": self.misses,
            "hit_rate": self.hits / total if total > 0 else 0,
            "size": len(self.cache),
            "max_size": self.max_size
        }


# Usage Example
cache = ProductionCache(max_size=10000, default_ttl=3600)

def get_user(user_id: int) -> dict:
    """Get user with caching."""
    cache_key = f"user:{user_id}"

    def load_from_db():
        # Simulate database query
        return {"id": user_id, "name": f"User {user_id}"}

    return cache.get_or_set(cache_key, load_from_db, ttl=300)

# First call - cache miss, loads from DB
user = get_user(123)

# Second call - cache hit
user = get_user(123)

# Check stats
print(cache.stats())
# {'hits': 1, 'misses': 1, 'hit_rate': 0.5, 'size': 1, 'max_size': 10000}
```

### Python - Distributed Cache with Redis

```python
import redis
import json
import time
from typing import Optional, Any, Callable

class RedisCache:
    """Redis-backed distributed cache."""

    def __init__(self, host: str = 'localhost', port: int = 6379, db: int = 0):
        self.client = redis.Redis(host=host, port=port, db=db, decode_responses=True)
        self.default_ttl = 3600

    def get(self, key: str) -> Optional[Any]:
        """Get value from Redis."""
        value = self.client.get(key)
        if value:
            return json.loads(value)
        return None

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> None:
        """Set value in Redis with TTL."""
        ttl = ttl or self.default_ttl
        self.client.setex(key, ttl, json.dumps(value))

    def get_or_set(
        self,
        key: str,
        loader: Callable[[], Any],
        ttl: Optional[int] = None
    ) -> Any:
        """Get from cache or load with distributed locking."""
        # Try cache first
        value = self.get(key)
        if value is not None:
            return value

        # Distributed lock using SETNX
        lock_key = f"lock:{key}"
        lock_acquired = self.client.setnx(lock_key, "1")

        if lock_acquired:
            self.client.expire(lock_key, 30)  # Lock timeout
            try:
                value = loader()
                self.set(key, value, ttl)
                return value
            finally:
                self.client.delete(lock_key)
        else:
            # Wait and retry
            time.sleep(0.1)
            return self.get(key) or loader()

    def invalidate(self, key: str) -> bool:
        """Delete key from Redis."""
        return self.client.delete(key) > 0

    def invalidate_pattern(self, pattern: str) -> int:
        """Delete keys matching pattern."""
        keys = self.client.keys(pattern)
        if keys:
            return self.client.delete(*keys)
        return 0
```

---

## Quick Reference Card

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; text-align: center; margin: 0 0 20px 0; font-size: 16px;">CACHING CHEAT SHEET</h4>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
    <div style="background: #ffffff; border-radius: 8px; padding: 16px;">
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">When to Cache</div>
      <ul style="color: #475569; font-size: 13px; margin: 0; padding-left: 16px;">
        <li>Read-heavy workloads (read:write > 10:1)</li>
        <li>Expensive computations</li>
        <li>Slow external API calls</li>
        <li>Database query results</li>
        <li>Session data</li>
      </ul>
    </div>

    <div style="background: #ffffff; border-radius: 8px; padding: 16px;">
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">When NOT to Cache</div>
      <ul style="color: #475569; font-size: 13px; margin: 0; padding-left: 16px;">
        <li>Rapidly changing data</li>
        <li>Write-heavy workloads</li>
        <li>Unique queries (low hit rate)</li>
        <li>Sensitive financial data</li>
        <li>Real-time requirements</li>
      </ul>
    </div>

    <div style="background: #ffffff; border-radius: 8px; padding: 16px;">
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">TTL Guidelines</div>
      <ul style="color: #475569; font-size: 13px; margin: 0; padding-left: 16px;">
        <li>Static assets: 1 year</li>
        <li>User profiles: 1 hour</li>
        <li>API responses: 5-15 minutes</li>
        <li>Search results: 1-5 minutes</li>
        <li>Real-time data: 10-30 seconds</li>
      </ul>
    </div>

    <div style="background: #ffffff; border-radius: 8px; padding: 16px;">
      <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Key Metrics</div>
      <ul style="color: #475569; font-size: 13px; margin: 0; padding-left: 16px;">
        <li>Hit rate > 90% (for hot data)</li>
        <li>Latency p99 < 10ms</li>
        <li>Memory usage < 80%</li>
        <li>Eviction rate (should be low)</li>
        <li>Connection count</li>
      </ul>
    </div>
  </div>

  <div style="margin-top: 16px; padding: 12px; background: #ffffff; border-radius: 8px; text-align: center;">
    <code style="color: #1e293b; font-size: 13px;">Cache Rule: "Cache data that is read often, written rarely, and can tolerate some staleness"</code>
  </div>
</div>

---

## Related Topics

- [CDN](/topic/system-design/cdn) - Edge caching for static content
- [Database Replication](/topic/system-design/database-replication) - Data redundancy
- [Load Balancing](/topic/system-design/load-balancing) - Request distribution
- [Redis](/topic/system-design/redis) - Popular caching solution
