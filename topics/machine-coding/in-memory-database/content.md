# In-Memory Database Design

## Overview and Motivation

An in-memory database stores and manages data primarily in RAM rather than on disk, achieving microsecond-level latency for read/write operations. This machine coding problem tests your understanding of [[hash-tables]](/data-structures/hash-tables), [[concurrency]](/system-design/concurrency), transaction semantics, and memory management - skills directly applicable to building systems like Redis, Memcached, or the caching layer of any high-performance application.

<div style="background: #f8fafc; border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #e2e8f0;">
<div style="color: #1e293b; font-weight: 700; font-size: 18px; margin-bottom: 16px;">Why This Problem Matters</div>
<div style="color: #1e293b; font-size: 14px; line-height: 1.9;">
<div style="margin-bottom: 12px;"><span style="color: #0369a1; font-weight: 600;">Interview Frequency:</span> Asked at Amazon, Google, Stripe, and database companies (Redis Labs, MongoDB)</div>
<div style="margin-bottom: 12px;"><span style="color: #0369a1; font-weight: 600;">Skills Tested:</span> Data structure selection, concurrent programming, transaction isolation, memory efficiency</div>
<div><span style="color: #0369a1; font-weight: 600;">Real-World Relevance:</span> Understanding in-memory stores is crucial for caching strategies, session management, and high-throughput applications</div>
</div>
</div>

---

## Core Architecture

### High-Level System Design

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<div style="font-weight: 700; color: #1e293b; font-size: 18px; text-align: center; margin-bottom: 28px;">In-Memory Database Architecture</div>

<div style="display: flex; flex-direction: column; gap: 24px;">

<div style="background: linear-gradient(180deg, #dbeafe 0%, #eff6ff 100%); border: 2px solid #3b82f6; border-radius: 12px; padding: 20px;">
<div style="color: #1e40af; font-weight: 700; font-size: 14px; text-align: center; margin-bottom: 16px;">Client Interface Layer</div>
<div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #fff; border: 1px solid #93c5fd; padding: 10px 16px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: 600; font-size: 12px;">Command Parser</div>
<div style="color: #64748b; font-size: 10px;">GET, SET, DELETE</div>
</div>
<div style="background: #fff; border: 1px solid #93c5fd; padding: 10px 16px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: 600; font-size: 12px;">Transaction Manager</div>
<div style="color: #64748b; font-size: 10px;">BEGIN, COMMIT, ROLLBACK</div>
</div>
<div style="background: #fff; border: 1px solid #93c5fd; padding: 10px 16px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: 600; font-size: 12px;">Type Router</div>
<div style="color: #64748b; font-size: 10px;">String, List, Hash, Set</div>
</div>
</div>
</div>

<div style="display: flex; justify-content: center;">
<div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 16px solid #94a3b8;"></div>
</div>

<div style="background: linear-gradient(180deg, #dcfce7 0%, #f0fdf4 100%); border: 2px solid #22c55e; border-radius: 12px; padding: 20px;">
<div style="color: #166534; font-weight: 700; font-size: 14px; text-align: center; margin-bottom: 16px;">Storage Engine</div>
<div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #fff; border: 1px solid #86efac; padding: 10px 16px; border-radius: 8px; text-align: center;">
<div style="color: #166534; font-weight: 600; font-size: 12px;">Primary Store</div>
<div style="color: #64748b; font-size: 10px;">HashMap&lt;K, Entry&gt;</div>
</div>
<div style="background: #fff; border: 1px solid #86efac; padding: 10px 16px; border-radius: 8px; text-align: center;">
<div style="color: #166534; font-weight: 600; font-size: 12px;">TTL Index</div>
<div style="color: #64748b; font-size: 10px;">MinHeap&lt;Expiry&gt;</div>
</div>
<div style="background: #fff; border: 1px solid #86efac; padding: 10px 16px; border-radius: 8px; text-align: center;">
<div style="color: #166534; font-weight: 600; font-size: 12px;">Secondary Indexes</div>
<div style="color: #64748b; font-size: 10px;">Optional B-Tree/Hash</div>
</div>
</div>
</div>

<div style="display: flex; justify-content: center;">
<div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 16px solid #94a3b8;"></div>
</div>

<div style="background: linear-gradient(180deg, #fef3c7 0%, #fffbeb 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px;">
<div style="color: #92400e; font-weight: 700; font-size: 14px; text-align: center; margin-bottom: 16px;">Persistence Layer (Optional)</div>
<div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #fff; border: 1px solid #fcd34d; padding: 10px 16px; border-radius: 8px; text-align: center;">
<div style="color: #92400e; font-weight: 600; font-size: 12px;">Write-Ahead Log</div>
<div style="color: #64748b; font-size: 10px;">Append-only durability</div>
</div>
<div style="background: #fff; border: 1px solid #fcd34d; padding: 10px 16px; border-radius: 8px; text-align: center;">
<div style="color: #92400e; font-weight: 600; font-size: 12px;">Snapshot Engine</div>
<div style="color: #64748b; font-size: 10px;">Point-in-time backup</div>
</div>
</div>
</div>

</div>
</div>

---

## Section 1: Key-Value Store Foundation

### Internal Data Structure

The core of any in-memory database is a [[hash-table]](/data-structures/hash-tables) providing O(1) average-case lookup. However, the naive implementation hides critical design decisions.

<div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: 700; margin-bottom: 12px;">Key Design Decision: Entry Structure</div>
<div style="color: #78350f; font-size: 14px; line-height: 1.8;">
The entry stored for each key is not just the value - it includes metadata critical for TTL, type checking, and memory management. This metadata overhead (typically 24-48 bytes per entry) is a conscious trade-off between memory efficiency and feature richness.
</div>
</div>

```python
from dataclasses import dataclass
from typing import Any, Optional
from enum import Enum
import time

class DataType(Enum):
    STRING = "string"
    LIST = "list"
    HASH = "hash"
    SET = "set"
    SORTED_SET = "zset"

@dataclass(slots=True)  # slots=True reduces memory by ~40% per object
class Entry:
    """
    Memory-optimized entry structure.

    Memory layout (64-bit Python):
    - value reference: 8 bytes
    - data_type: 8 bytes (enum reference)
    - expires_at: 8 bytes (float or None)
    - created_at: 8 bytes
    - access_count: 8 bytes (for LFU eviction)
    Total: ~40 bytes overhead + value size
    """
    value: Any
    data_type: DataType
    expires_at: Optional[float] = None
    created_at: float = None
    access_count: int = 0

    def __post_init__(self):
        if self.created_at is None:
            self.created_at = time.time()

    def is_expired(self, current_time: float = None) -> bool:
        if self.expires_at is None:
            return False
        return (current_time or time.time()) > self.expires_at

    def touch(self) -> None:
        """Update access statistics for LRU/LFU tracking."""
        self.access_count += 1
```

### Hash Table Internals

<div style="background: #eff6ff; border-radius: 12px; padding: 24px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; margin-bottom: 12px;">Critical Implementation Detail: Collision Resolution</div>
<div style="color: #1e3a8a; font-size: 14px; line-height: 1.8;">

**Chaining (Redis approach):**
- Each bucket contains a linked list of entries
- Simple to implement, handles high collision gracefully
- Poor cache locality - pointer chasing causes cache misses

**Open Addressing (Memcached approach):**
- All entries stored in contiguous array
- Better cache performance for small tables
- Requires careful load factor management (typically < 0.7)

**Real-World Choice:** Redis uses chaining with a custom hash function (SipHash for security against hash-flooding attacks). For interview purposes, Python's built-in dict (which uses open addressing with pseudo-random probing) is acceptable.

</div>
</div>

```python
class KeyValueStore:
    """
    Core key-value store with careful attention to hash table behavior.
    """

    def __init__(self, initial_capacity: int = 16):
        # Python dict handles resizing, but understanding the concept matters
        self._data: dict[str, Entry] = {}
        self._key_count = 0

        # For interview: explain that real implementations track:
        # - Load factor threshold for resize (typically 0.75)
        # - Resize factor (typically 2x)
        # - Rehashing strategy (incremental vs. stop-the-world)

    def _hash_key(self, key: str) -> int:
        """
        In production, use cryptographic hash to prevent hash-flooding DoS.
        Redis uses SipHash-2-4 after CVE-2012-0769.
        """
        return hash(key)  # Python 3.3+ randomizes hash seed per process

    def get(self, key: str) -> Optional[Any]:
        """
        O(1) average case, O(n) worst case with hash collisions.

        Critical: We check expiration LAZILY on access, not proactively.
        This is a deliberate design choice - see TTL section for trade-offs.
        """
        entry = self._data.get(key)
        if entry is None:
            return None

        if entry.is_expired():
            # Lazy deletion - clean up on access
            del self._data[key]
            return None

        entry.touch()  # Update access stats
        return entry.value

    def set(self, key: str, value: Any,
            ttl_seconds: Optional[int] = None,
            data_type: DataType = DataType.STRING) -> bool:
        """
        O(1) amortized. Can be O(n) during hash table resize.

        Important: SET always overwrites, regardless of existing type.
        This differs from type-specific commands (LPUSH fails on non-list).
        """
        expires_at = None
        if ttl_seconds is not None:
            expires_at = time.time() + ttl_seconds

        self._data[key] = Entry(
            value=value,
            data_type=data_type,
            expires_at=expires_at
        )
        return True

    def delete(self, key: str) -> bool:
        """
        O(1) average case.
        Returns True if key existed, False otherwise (Redis convention).
        """
        if key in self._data:
            del self._data[key]
            return True
        return False
```

### Memory Layout Considerations

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: 700; margin-bottom: 12px;">Assumption: Memory is the Primary Constraint</div>
<div style="color: #14532d; font-size: 14px; line-height: 1.8;">
In-memory databases assume RAM is both the primary storage AND the bottleneck. Design decisions optimize for:
<ul style="margin-top: 8px;">
<li><strong>Memory density:</strong> Store more keys per GB of RAM</li>
<li><strong>Memory fragmentation:</strong> Avoid external fragmentation from malloc/free cycles</li>
<li><strong>Cache efficiency:</strong> Keep hot data in CPU cache hierarchy</li>
</ul>
</div>
</div>

### Interview Questions: Key-Value Stores

<div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border: 2px solid #a855f7; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #6b21a8; font-weight: 700; font-size: 16px; margin-bottom: 20px;">Level 1: Foundational Understanding</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #7c3aed; font-weight: 600;">Q: Why use a hash table instead of a tree-based structure for the primary store?</div>
<div style="color: #4c1d95; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Hash tables provide O(1) average-case for GET/SET/DELETE, while balanced trees offer O(log n). For a database with millions of keys, this difference is significant: 1 operation vs. ~20 comparisons. Trees are useful when you need range queries or sorted iteration, which hash tables cannot provide efficiently.
</div>
</div>

<div style="background: linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%); border: 2px solid #c026d3; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #86198f; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 2: Implementation Depth</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #a21caf; font-weight: 600;">Q: What happens when the hash table needs to resize? How does Redis handle this?</div>
<div style="color: #701a75; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Naive resize copies all entries to a new array (O(n)), causing latency spikes. Redis uses incremental rehashing: it maintains two hash tables during resize, gradually migrating entries (1-10 per operation). This bounds worst-case latency but doubles memory temporarily. The resize is triggered when load factor exceeds 1.0 (if no background save) or 5.0 (during persistence).
</div>
</div>

<div style="background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%); border: 2px solid #db2777; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #9d174d; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 3: Production Considerations</div>

<div style="background: #fff; border-radius: 8px; padding: 16px;">
<div style="color: #be185d; font-weight: 600;">Q: How would you protect against hash-flooding DoS attacks where an attacker crafts keys that all hash to the same bucket?</div>
<div style="color: #831843; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Three approaches: (1) Use cryptographically secure hash functions with random seeds (SipHash-2-4), making collision prediction computationally infeasible. (2) Limit hash table operations per client/second using [[rate-limiting]](/system-design/rate-limiting). (3) Monitor bucket depth and alert/reject when chains exceed threshold. Redis switched from djb2 to SipHash after CVE-2012-0769. Python randomizes hash seeds since 3.3 (PYTHONHASHSEED).
</div>
</div>
</div>
</div>
</div>

---

## Section 2: Indexing Strategies

### Primary vs Secondary Indexes

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="font-weight: 700; color: #1e293b; font-size: 16px; margin-bottom: 20px;">Index Architecture</div>

<div style="display: flex; gap: 20px; flex-wrap: wrap;">

<div style="flex: 1; min-width: 280px; background: #dbeafe; border-radius: 12px; padding: 20px;">
<div style="color: #1e40af; font-weight: 700; font-size: 14px; margin-bottom: 12px;">Primary Index (Always Present)</div>
<div style="color: #1e3a8a; font-size: 13px; line-height: 1.7;">
<div style="margin-bottom: 8px;"><strong>Structure:</strong> Hash table (key -> Entry)</div>
<div style="margin-bottom: 8px;"><strong>Lookup:</strong> O(1) by exact key</div>
<div style="margin-bottom: 8px;"><strong>Range Query:</strong> Not supported</div>
<div><strong>Memory:</strong> ~64 bytes per key (overhead)</div>
</div>
</div>

<div style="flex: 1; min-width: 280px; background: #dcfce7; border-radius: 12px; padding: 20px;">
<div style="color: #166534; font-weight: 700; font-size: 14px; margin-bottom: 12px;">Secondary Index (Optional)</div>
<div style="color: #14532d; font-size: 13px; line-height: 1.7;">
<div style="margin-bottom: 8px;"><strong>Structure:</strong> B-Tree, Skip List, or Hash</div>
<div style="margin-bottom: 8px;"><strong>Lookup:</strong> O(log n) or O(1)</div>
<div style="margin-bottom: 8px;"><strong>Range Query:</strong> Supported (B-Tree/Skip List)</div>
<div><strong>Memory:</strong> Additional ~32-64 bytes per indexed key</div>
</div>
</div>

</div>
</div>

### TTL Index Implementation

The TTL index is a specialized secondary index for efficient expiration processing. This is one of the most asked topics in machine coding rounds.

```python
import heapq
from typing import Optional, Tuple
from dataclasses import dataclass
import time
import threading

@dataclass(order=True)
class TTLEntry:
    """
    Heap entry for TTL tracking.
    order=True enables comparison by expires_at (first field).
    """
    expires_at: float
    key: str = field(compare=False)  # Don't include in comparison

class TTLIndex:
    """
    Efficient TTL management using a min-heap.

    Design Trade-offs:
    1. Min-heap gives O(1) access to next expiring key
    2. Lazy deletion handles key updates/deletions
    3. Background thread vs lazy cleanup on access

    Memory overhead: ~24 bytes per TTL entry
    """

    def __init__(self, primary_store: dict):
        self._heap: list[tuple[float, str]] = []
        self._primary_store = primary_store
        self._lock = threading.Lock()

    def add(self, key: str, expires_at: float) -> None:
        """
        O(log n) - heap insertion.

        Note: We don't remove old TTL entries for the same key.
        This is intentional - removal from heap is O(n).
        Stale entries are cleaned up lazily during cleanup.
        """
        with self._lock:
            heapq.heappush(self._heap, (expires_at, key))

    def cleanup_expired(self, max_deletions: int = 20) -> int:
        """
        Process expired entries with bounded work.

        This implements Redis's lazy expiration strategy:
        - Called periodically (e.g., every 100ms)
        - Processes at most max_deletions to bound latency
        - Returns number of keys deleted

        Why bound deletions?
        - Prevents latency spikes if many keys expire simultaneously
        - Allows interleaving with client requests
        - Trade-off: expired keys may persist briefly
        """
        current_time = time.time()
        deleted = 0

        with self._lock:
            while self._heap and deleted < max_deletions:
                expires_at, key = self._heap[0]

                if expires_at > current_time:
                    # No more expired entries
                    break

                heapq.heappop(self._heap)

                # Verify entry still exists and is actually expired
                # (handles key deletion or TTL update)
                entry = self._primary_store.get(key)
                if entry and entry.expires_at == expires_at:
                    del self._primary_store[key]
                    deleted += 1

        return deleted

    def get_next_expiry(self) -> Optional[float]:
        """Returns timestamp of next expiring key, or None."""
        with self._lock:
            return self._heap[0][0] if self._heap else None
```

### Skip List for Sorted Data

Redis sorted sets (ZSET) use a [[skip-list]](/data-structures/skip-list) - understanding this demonstrates deep knowledge.

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<div style="color: #991b1b; font-weight: 700; margin-bottom: 12px;">Trade-off: Skip List vs Balanced Tree</div>
<div style="color: #7f1d1d; font-size: 14px; line-height: 1.8;">

| Aspect | Skip List | Balanced Tree (Red-Black) |
|--------|-----------|---------------------------|
| **Implementation** | Simpler (~100 LOC) | Complex (~300 LOC) |
| **Range Queries** | Natural - just follow forward pointers | Requires tree traversal |
| **Concurrency** | Lock-free variants possible | Rebalancing needs locks |
| **Memory** | ~1.33 pointers per node average | 2 child + 1 parent pointers |
| **Cache Behavior** | Worse - levels are scattered | Better - tree is more compact |

**Why Redis chose Skip Lists:** Antirez (Redis creator) cited simplicity and natural range query support. Lock-free skip lists also enable better concurrent performance.

</div>
</div>

```python
import random

class SkipListNode:
    __slots__ = ('score', 'member', 'forward', 'span')

    def __init__(self, score: float, member: str, level: int):
        self.score = score
        self.member = member
        self.forward = [None] * level  # Forward pointers at each level
        self.span = [0] * level  # Distance to next node at each level

class SkipList:
    """
    Probabilistic data structure for sorted data.

    Time Complexities:
    - Insert: O(log n) expected
    - Delete: O(log n) expected
    - Search: O(log n) expected
    - Range query [a,b]: O(log n + k) where k = result size

    Space: O(n) expected (1.33n pointers on average)
    """
    MAX_LEVEL = 32
    P = 0.25  # Probability of level increase

    def __init__(self):
        self.header = SkipListNode(float('-inf'), '', self.MAX_LEVEL)
        self.level = 1
        self.length = 0

    def _random_level(self) -> int:
        """
        Generate random level with geometric distribution.
        Expected level = 1/(1-P) = 1.33 for P=0.25
        """
        level = 1
        while random.random() < self.P and level < self.MAX_LEVEL:
            level += 1
        return level

    def insert(self, score: float, member: str) -> None:
        """Insert member with score, maintaining sorted order."""
        update = [None] * self.MAX_LEVEL
        rank = [0] * self.MAX_LEVEL

        x = self.header
        for i in range(self.level - 1, -1, -1):
            rank[i] = 0 if i == self.level - 1 else rank[i + 1]
            while (x.forward[i] and
                   (x.forward[i].score < score or
                    (x.forward[i].score == score and x.forward[i].member < member))):
                rank[i] += x.span[i]
                x = x.forward[i]
            update[i] = x

        level = self._random_level()
        if level > self.level:
            for i in range(self.level, level):
                rank[i] = 0
                update[i] = self.header
                update[i].span[i] = self.length
            self.level = level

        x = SkipListNode(score, member, level)
        for i in range(level):
            x.forward[i] = update[i].forward[i]
            update[i].forward[i] = x
            x.span[i] = update[i].span[i] - (rank[0] - rank[i])
            update[i].span[i] = (rank[0] - rank[i]) + 1

        for i in range(level, self.level):
            update[i].span[i] += 1

        self.length += 1
```

### Interview Questions: Indexing

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #22c55e; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #166534; font-weight: 700; font-size: 16px; margin-bottom: 20px;">Level 1: Foundational Understanding</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #15803d; font-weight: 600;">Q: Why do we need a separate TTL index? Can't we just iterate the main hash table?</div>
<div style="color: #14532d; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Iterating the hash table to find expired keys is O(n), which doesn't scale. With millions of keys, checking each on every cleanup cycle would destroy performance. The TTL heap gives O(1) access to the minimum expiration time, letting us efficiently find only the keys that need processing.
</div>
</div>

<div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 2px solid #10b981; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #065f46; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 2: Implementation Depth</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #059669; font-weight: 600;">Q: The TTL heap can accumulate stale entries (keys deleted or TTL updated). How do you prevent unbounded growth?</div>
<div style="color: #064e3b; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Three strategies: (1) Lazy cleanup - when processing expires, verify the key still exists and TTL matches before deleting. (2) Periodic rebuild - if stale ratio exceeds threshold (e.g., 50%), rebuild the heap from scratch during low-traffic periods. (3) Indexed heap - maintain a hash map of key positions for O(log n) deletion when TTL changes. Redis uses approach (1) combined with probabilistic sampling.
</div>
</div>

<div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border: 2px solid #059669; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #047857; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 3: Production Considerations</div>

<div style="background: #fff; border-radius: 8px; padding: 16px;">
<div style="color: #0d9488; font-weight: 600;">Q: How would you implement secondary indexes that survive restarts without rebuilding from scratch?</div>
<div style="color: #134e4a; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Two approaches: (1) Persist index alongside data - during snapshot (RDB), serialize both the main data and index structures. During load, reconstruct the index. (2) WAL-based recovery - include index operations in the write-ahead log. On restart, replay WAL to rebuild indexes. Redis primarily uses approach (1) for RDB and doesn't persist secondary index structure in AOF (rebuilds on load). For custom indexes, you'd want approach (2) to avoid full scans during recovery.
</div>
</div>
</div>
</div>
</div>

---

## Section 3: TTL Expiration Mechanisms

### Expiration Strategies

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="font-weight: 700; color: #1e293b; font-size: 16px; margin-bottom: 20px;">TTL Implementation Approaches</div>

<div style="display: flex; gap: 16px; flex-wrap: wrap;">

<div style="flex: 1; min-width: 250px; background: linear-gradient(180deg, #fef3c7 0%, #fffbeb 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 18px;">
<div style="color: #92400e; font-weight: 700; font-size: 14px; margin-bottom: 10px;">Lazy Expiration</div>
<div style="color: #78350f; font-size: 12px; line-height: 1.7;">
Check TTL only when key is accessed. Expired keys remain in memory until next access.
<div style="margin-top: 10px; padding: 8px; background: #fff; border-radius: 6px;">
<div style="color: #92400e; font-weight: 600; font-size: 11px;">Pros:</div>
<div style="color: #78350f; font-size: 11px;">Zero CPU overhead when idle</div>
<div style="color: #92400e; font-weight: 600; font-size: 11px; margin-top: 4px;">Cons:</div>
<div style="color: #78350f; font-size: 11px;">Memory leak for unaccessed keys</div>
</div>
</div>
</div>

<div style="flex: 1; min-width: 250px; background: linear-gradient(180deg, #dbeafe 0%, #eff6ff 100%); border: 2px solid #3b82f6; border-radius: 12px; padding: 18px;">
<div style="color: #1e40af; font-weight: 700; font-size: 14px; margin-bottom: 10px;">Active Expiration</div>
<div style="color: #1e3a8a; font-size: 12px; line-height: 1.7;">
Background thread periodically scans for expired keys using TTL index.
<div style="margin-top: 10px; padding: 8px; background: #fff; border-radius: 6px;">
<div style="color: #1e40af; font-weight: 600; font-size: 11px;">Pros:</div>
<div style="color: #1e3a8a; font-size: 11px;">Memory reclaimed promptly</div>
<div style="color: #1e40af; font-weight: 600; font-size: 11px; margin-top: 4px;">Cons:</div>
<div style="color: #1e3a8a; font-size: 11px;">CPU cost even when idle</div>
</div>
</div>
</div>

<div style="flex: 1; min-width: 250px; background: linear-gradient(180deg, #dcfce7 0%, #f0fdf4 100%); border: 2px solid #22c55e; border-radius: 12px; padding: 18px;">
<div style="color: #166534; font-weight: 700; font-size: 14px; margin-bottom: 10px;">Hybrid (Redis)</div>
<div style="color: #14532d; font-size: 12px; line-height: 1.7;">
Combine both: lazy check on access + probabilistic active cleanup.
<div style="margin-top: 10px; padding: 8px; background: #fff; border-radius: 6px;">
<div style="color: #166534; font-weight: 600; font-size: 11px;">Pros:</div>
<div style="color: #14532d; font-size: 11px;">Balances memory and CPU</div>
<div style="color: #166534; font-weight: 600; font-size: 11px; margin-top: 4px;">Cons:</div>
<div style="color: #14532d; font-size: 11px;">More complex implementation</div>
</div>
</div>
</div>

</div>
</div>

### Redis-Style Probabilistic Expiration

```python
import random
import time
import threading
from typing import Callable

class TTLManager:
    """
    Implements Redis-style hybrid TTL expiration.

    Algorithm (from Redis documentation):
    1. Test 20 random keys from keys with an associated expire
    2. Delete all the keys found expired
    3. If more than 25% of keys were expired, repeat from step 1

    This provides probabilistic guarantees:
    - At most 25% of expirable keys are expired at any time
    - Bounded CPU usage per cycle
    """

    SAMPLE_SIZE = 20
    THRESHOLD_PERCENT = 25
    CYCLE_TIME_LIMIT_MS = 25  # Max time per active expiration cycle

    def __init__(self, store: 'KeyValueStore', ttl_index: TTLIndex):
        self._store = store
        self._ttl_index = ttl_index
        self._running = False
        self._thread = None

    def start_background_expiration(self, interval_ms: int = 100) -> None:
        """Start background thread for active expiration."""
        self._running = True
        self._thread = threading.Thread(
            target=self._background_loop,
            args=(interval_ms,),
            daemon=True
        )
        self._thread.start()

    def _background_loop(self, interval_ms: int) -> None:
        """
        Background expiration loop.

        IMPORTANT: This runs in a separate thread.
        All store operations must be thread-safe.
        """
        while self._running:
            self._active_expire_cycle()
            time.sleep(interval_ms / 1000)

    def _active_expire_cycle(self) -> None:
        """
        One cycle of probabilistic expiration.

        Key insight: We don't need to check every key.
        Statistical sampling provides good-enough guarantees
        while bounding CPU usage.
        """
        start_time = time.time()

        while True:
            # Get keys with TTL (in production, maintain separate tracking)
            expirable_keys = self._get_expirable_keys()

            if not expirable_keys:
                break

            # Sample random subset
            sample = random.sample(
                expirable_keys,
                min(self.SAMPLE_SIZE, len(expirable_keys))
            )

            # Check and delete expired
            expired_count = 0
            current_time = time.time()

            for key in sample:
                entry = self._store._data.get(key)
                if entry and entry.is_expired(current_time):
                    del self._store._data[key]
                    expired_count += 1

            # Check termination conditions
            expired_percent = (expired_count / len(sample)) * 100
            elapsed_ms = (time.time() - start_time) * 1000

            if expired_percent < self.THRESHOLD_PERCENT:
                break  # Few expired keys, stop

            if elapsed_ms > self.CYCLE_TIME_LIMIT_MS:
                break  # Time budget exhausted

    def _get_expirable_keys(self) -> list:
        """Get all keys that have TTL set."""
        return [
            key for key, entry in self._store._data.items()
            if entry.expires_at is not None
        ]
```

### Edge Cases in TTL Handling

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<div style="color: #991b1b; font-weight: 700; margin-bottom: 16px;">Critical Edge Cases</div>

<div style="background: #fff; border-radius: 8px; padding: 14px; margin-bottom: 10px;">
<div style="color: #dc2626; font-weight: 600; font-size: 13px;">Clock Skew / Time Travel</div>
<div style="color: #7f1d1d; font-size: 12px; margin-top: 6px; line-height: 1.6;">
System clock can jump forward (NTP sync) or backward (VM restore). Use monotonic clock for TTL calculations or store absolute Unix timestamp and handle gracefully.
</div>
</div>

<div style="background: #fff; border-radius: 8px; padding: 14px; margin-bottom: 10px;">
<div style="color: #dc2626; font-weight: 600; font-size: 13px;">TTL During Transaction</div>
<div style="color: #7f1d1d; font-size: 12px; margin-top: 6px; line-height: 1.6;">
Should a key expire during an active transaction? Options: (1) Expire immediately (breaks transaction isolation), (2) Extend TTL until commit (unpredictable behavior), (3) Snapshot TTL at BEGIN (what Redis does for WATCH).
</div>
</div>

<div style="background: #fff; border-radius: 8px; padding: 14px; margin-bottom: 10px;">
<div style="color: #dc2626; font-weight: 600; font-size: 13px;">TTL Precision vs Memory</div>
<div style="color: #7f1d1d; font-size: 12px; margin-top: 6px; line-height: 1.6;">
Storing millisecond precision (8-byte float) vs second precision (4-byte int). For millions of keys, this doubles TTL storage. Redis uses millisecond precision because cache invalidation often needs sub-second accuracy.
</div>
</div>

<div style="background: #fff; border-radius: 8px; padding: 14px;">
<div style="color: #dc2626; font-weight: 600; font-size: 13px;">Mass Expiration Storm</div>
<div style="color: #7f1d1d; font-size: 12px; margin-top: 6px; line-height: 1.6;">
If many keys expire at the same timestamp (e.g., cache populated at startup + same TTL), deletion storm causes latency spike. Solution: Add random jitter to TTL (e.g., 300s + random(0,60)).
</div>
</div>

</div>

### Interview Questions: TTL Expiration

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 2px solid #ef4444; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #991b1b; font-weight: 700; font-size: 16px; margin-bottom: 20px;">Level 1: Foundational Understanding</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #dc2626; font-weight: 600;">Q: Why not just use a background thread that checks every key's TTL?</div>
<div style="color: #7f1d1d; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Full scan is O(n) per cycle. With 10 million keys and 100ms cycle, you'd need to check 100 million keys/second. This saturates CPU and competes with client requests. Probabilistic sampling achieves similar results with O(1) bounded work per cycle.
</div>
</div>

<div style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border: 2px solid #f87171; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #b91c1c; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 2: Implementation Depth</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #ef4444; font-weight: 600;">Q: How does lazy expiration interact with memory eviction (like LRU)? Which happens first?</div>
<div style="color: #991b1b; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> TTL expiration should happen BEFORE eviction policy. Expired keys are "dead" and must be cleaned regardless of memory pressure. The order is: (1) Check TTL - if expired, delete (free memory). (2) If still over memory limit, apply eviction policy (LRU/LFU/random). This prevents evicting valid keys while expired keys consume memory. Redis processes expirations before eviction during memory pressure.
</div>
</div>

<div style="background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%); border: 2px solid #ef4444; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #b91c1c; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 3: Production Considerations</div>

<div style="background: #fff; border-radius: 8px; padding: 16px;">
<div style="color: #f87171; font-weight: 600;">Q: In a replicated setup, should TTL expiration happen on the primary and propagate, or independently on each replica?</div>
<div style="color: #991b1b; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Primary-driven expiration is safer: primary deletes and replicates DEL commands. Independent expiration on replicas causes divergence due to clock skew (replica might expire before/after primary). However, this means replica memory can grow if replication lags. Redis uses primary-driven: primary sends explicit DEL when expiring, and replicas wait for that DEL. Replicas do return NULL for expired keys on read (read-only lazy expiration) but don't actually delete until instructed.
</div>
</div>
</div>
</div>
</div>

---

## Section 4: Transaction Support

### Transaction Semantics

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; margin-bottom: 12px;">Design Decision: Transaction Isolation Level</div>
<div style="color: #1e3a8a; font-size: 14px; line-height: 1.8;">
Most in-memory databases use <strong>READ UNCOMMITTED</strong> within a session (you see your own uncommitted changes) but operations are atomic. This differs from SQL databases' default READ COMMITTED. The trade-off: simpler implementation and higher performance at the cost of potential dirty reads in multi-session scenarios.
</div>
</div>

### Implementation: Nested Transaction Stack

```python
from dataclasses import dataclass, field
from typing import Any, Optional
from copy import deepcopy

@dataclass
class Transaction:
    """
    Represents a single transaction with undo capability.

    Two implementation strategies:
    1. COMMAND LOG: Record each operation, replay in reverse on rollback
       - Pro: Lower memory (only changed keys)
       - Con: Rollback is O(operations)

    2. SNAPSHOT: Deep copy all data at BEGIN
       - Pro: O(1) rollback (swap pointers)
       - Con: O(n) memory for each transaction level

    We use a HYBRID approach:
    - Store original value only for FIRST write to each key
    - Rollback restores from per-key snapshots
    - Memory: O(modified keys), not O(all keys) or O(operations)
    """
    snapshot: dict[str, Optional['Entry']] = field(default_factory=dict)
    created_at: float = field(default_factory=time.time)

    def record_if_new(self, key: str, old_value: Optional['Entry']) -> None:
        """
        Record original value on first modification of each key.

        Critical insight: We only need the value BEFORE the transaction
        started. Subsequent modifications to the same key within the
        transaction don't need additional snapshots.
        """
        if key not in self.snapshot:
            # Deep copy to avoid aliasing issues
            self.snapshot[key] = deepcopy(old_value) if old_value else None

class TransactionManager:
    """
    Manages transaction stack with support for nesting.

    Nested transactions (savepoints) work like a stack:
    - BEGIN pushes a new Transaction
    - COMMIT pops and merges with parent (or applies to main store)
    - ROLLBACK pops and restores from snapshot

    ACID Properties:
    - Atomicity: All-or-nothing via rollback
    - Consistency: Type checking ensures valid state
    - Isolation: Single-threaded model (no concurrent transactions)
    - Durability: Only with persistence layer (not covered here)
    """

    def __init__(self, store: dict):
        self._store = store
        self._transaction_stack: list[Transaction] = []

    @property
    def in_transaction(self) -> bool:
        return len(self._transaction_stack) > 0

    @property
    def depth(self) -> int:
        return len(self._transaction_stack)

    def begin(self) -> int:
        """
        Start new transaction. Returns transaction depth.

        O(1) - just pushes empty Transaction onto stack.
        Snapshots are created lazily on first write.
        """
        txn = Transaction()
        self._transaction_stack.append(txn)
        return len(self._transaction_stack)

    def record_write(self, key: str) -> None:
        """Record a write operation for potential rollback."""
        if self._transaction_stack:
            current_txn = self._transaction_stack[-1]
            old_value = self._store.get(key)
            current_txn.record_if_new(key, old_value)

    def commit(self) -> bool:
        """
        Commit current transaction.

        For nested transactions: merge snapshot into parent.
        For top-level: discard snapshot (changes are already in store).

        Returns False if no active transaction.
        """
        if not self._transaction_stack:
            return False

        committed_txn = self._transaction_stack.pop()

        # If there's a parent transaction, merge snapshots
        if self._transaction_stack:
            parent_txn = self._transaction_stack[-1]
            for key, old_value in committed_txn.snapshot.items():
                # Parent needs original value (before any nested changes)
                parent_txn.record_if_new(key, old_value)

        return True

    def rollback(self) -> bool:
        """
        Rollback current transaction, restoring original values.

        O(k) where k = number of modified keys in this transaction.

        Returns False if no active transaction.
        """
        if not self._transaction_stack:
            return False

        txn = self._transaction_stack.pop()

        # Restore each key to its pre-transaction state
        for key, original_value in txn.snapshot.items():
            if original_value is None:
                # Key didn't exist before transaction
                self._store.pop(key, None)
            else:
                # Restore original value
                self._store[key] = original_value

        return True

    def rollback_all(self) -> int:
        """Rollback all nested transactions. Returns count."""
        count = 0
        while self._transaction_stack:
            self.rollback()
            count += 1
        return count
```

### Concurrent Transaction Handling

<div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: 700; margin-bottom: 12px;">Trade-off: Concurrency Model</div>
<div style="color: #78350f; font-size: 14px; line-height: 1.8;">

**Option 1: Single-Threaded (Redis approach)**
- All operations serialized through event loop
- No locks needed, simpler implementation
- Throughput limited by single core
- Used by: Redis, Node.js

**Option 2: Lock-Based**
- Global lock for transactions, per-key locks for operations
- Better multi-core utilization
- Risk: deadlocks, priority inversion
- Used by: Memcached (without transactions)

**Option 3: MVCC (Multi-Version Concurrency Control)**
- Each write creates new version
- Readers see consistent snapshot
- Higher memory overhead
- Used by: PostgreSQL, CockroachDB

For interview purposes, single-threaded + RLock is the safest choice.

</div>
</div>

```python
import threading
from contextlib import contextmanager

class ThreadSafeInMemoryDB:
    """
    Thread-safe wrapper using reentrant lock.

    RLock vs Lock:
    - Lock: Same thread acquiring twice = deadlock
    - RLock: Same thread can acquire multiple times (reference counted)

    We need RLock because transaction operations (BEGIN, SET, COMMIT)
    might be called from within other locked methods.
    """

    def __init__(self):
        self._lock = threading.RLock()
        self._store: dict[str, Entry] = {}
        self._txn_manager = TransactionManager(self._store)
        self._ttl_manager = None  # Initialized separately

    @contextmanager
    def _locked(self):
        """Context manager for lock acquisition with timeout."""
        acquired = self._lock.acquire(timeout=5.0)
        if not acquired:
            raise TimeoutError("Could not acquire database lock")
        try:
            yield
        finally:
            self._lock.release()

    def get(self, key: str) -> Optional[Any]:
        with self._locked():
            entry = self._store.get(key)
            if entry is None:
                return None
            if entry.is_expired():
                del self._store[key]
                return None
            entry.touch()
            return entry.value

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        with self._locked():
            self._txn_manager.record_write(key)

            expires_at = time.time() + ttl if ttl else None
            self._store[key] = Entry(
                value=value,
                data_type=DataType.STRING,
                expires_at=expires_at
            )
            return True

    def begin(self) -> int:
        with self._locked():
            return self._txn_manager.begin()

    def commit(self) -> bool:
        with self._locked():
            return self._txn_manager.commit()

    def rollback(self) -> bool:
        with self._locked():
            return self._txn_manager.rollback()
```

### Interview Questions: Transactions

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #3b82f6; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #1e40af; font-weight: 700; font-size: 16px; margin-bottom: 20px;">Level 1: Foundational Understanding</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #2563eb; font-weight: 600;">Q: What's the difference between your transaction implementation and SQL ACID transactions?</div>
<div style="color: #1e3a8a; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Our implementation provides Atomicity (rollback undoes all changes) and partial Consistency (type checking). We don't provide full Isolation (other clients see uncommitted writes) or Durability (data is lost on crash). SQL databases typically provide all four, but at significant performance cost. Redis MULTI/EXEC also doesn't provide isolation - it just batches commands for atomic execution.
</div>
</div>

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 2px solid #60a5fa; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #1d4ed8; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 2: Implementation Depth</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #3b82f6; font-weight: 600;">Q: How does snapshot storage for nested transactions work? If I BEGIN, SET x, BEGIN, SET x, ROLLBACK, what value should x have?</div>
<div style="color: #1e40af; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Each transaction level stores the value from BEFORE that transaction started. Let's trace: (1) Original x=5. (2) Outer BEGIN - empty snapshot. (3) SET x=10 - outer records snapshot[x]=5, store has x=10. (4) Inner BEGIN - empty snapshot. (5) SET x=15 - inner records snapshot[x]=10, store has x=15. (6) Inner ROLLBACK - restores x=10 from inner snapshot. Now x=10, which is correct - we rolled back only the inner transaction's changes.
</div>
</div>

<div style="background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%); border: 2px solid #3b82f6; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #1d4ed8; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 3: Production Considerations</div>

<div style="background: #fff; border-radius: 8px; padding: 16px;">
<div style="color: #60a5fa; font-weight: 600;">Q: How would you implement optimistic locking with WATCH semantics like Redis?</div>
<div style="color: #1e40af; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> WATCH provides optimistic concurrency control: (1) WATCH key - record current version/value. (2) Read key, compute new value in application. (3) MULTI...EXEC - at EXEC time, check if watched keys changed since WATCH. If yes, abort (return null). If no, execute atomically. Implementation: maintain a version counter per key, increment on every write. WATCH stores {key: version} mapping. EXEC checks all watched versions match current. This enables check-and-set without holding locks during application computation, improving concurrency for read-heavy workloads.
</div>
</div>
</div>
</div>
</div>

---

## Section 5: Persistence Options

### Persistence Strategies Overview

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="font-weight: 700; color: #1e293b; font-size: 16px; text-align: center; margin-bottom: 24px;">Persistence Mechanisms Comparison</div>

<div style="display: flex; gap: 20px; flex-wrap: wrap;">

<div style="flex: 1; min-width: 300px; background: linear-gradient(180deg, #dbeafe 0%, #eff6ff 100%); border: 2px solid #3b82f6; border-radius: 12px; padding: 20px;">
<div style="color: #1e40af; font-weight: 700; font-size: 15px; margin-bottom: 14px;">RDB (Snapshot)</div>
<div style="color: #1e3a8a; font-size: 13px; line-height: 1.8;">
Point-in-time snapshot of entire dataset. Similar to [[database-backups]](/system-design/storage).

<div style="margin-top: 12px;">
<div style="font-weight: 600; color: #1e40af;">Characteristics:</div>
<ul style="margin: 6px 0; padding-left: 18px;">
<li>Compact binary format</li>
<li>Fast restart (load entire file)</li>
<li>Data loss between snapshots</li>
<li>Fork() for copy-on-write</li>
</ul>
</div>

<div style="margin-top: 12px; padding: 10px; background: #fff; border-radius: 8px;">
<div style="color: #1e40af; font-weight: 600; font-size: 12px;">Use When:</div>
<div style="color: #3b82f6; font-size: 11px;">Acceptable to lose last few minutes of data; need fast restarts</div>
</div>
</div>
</div>

<div style="flex: 1; min-width: 300px; background: linear-gradient(180deg, #dcfce7 0%, #f0fdf4 100%); border: 2px solid #22c55e; border-radius: 12px; padding: 20px;">
<div style="color: #166534; font-weight: 700; font-size: 15px; margin-bottom: 14px;">AOF (Append-Only File)</div>
<div style="color: #14532d; font-size: 13px; line-height: 1.8;">
Log every write operation. Classic [[write-ahead-log]](/system-design/storage) pattern.

<div style="margin-top: 12px;">
<div style="font-weight: 600; color: #166534;">Characteristics:</div>
<ul style="margin: 6px 0; padding-left: 18px;">
<li>Configurable durability (fsync policy)</li>
<li>Human-readable (if text-based)</li>
<li>Slower restart (replay log)</li>
<li>File grows unbounded (needs compaction)</li>
</ul>
</div>

<div style="margin-top: 12px; padding: 10px; background: #fff; border-radius: 8px;">
<div style="color: #166534; font-weight: 600; font-size: 12px;">Use When:</div>
<div style="color: #22c55e; font-size: 11px;">Need strong durability; can accept slower restarts</div>
</div>
</div>
</div>

</div>
</div>

### Write-Ahead Log Implementation

```python
import json
import os
import time
from typing import Callable
from enum import Enum
from dataclasses import dataclass

class FsyncPolicy(Enum):
    """
    Durability vs Performance trade-off:

    ALWAYS: fsync after every write
      - Data loss: 0 (unless disk failure)
      - Throughput: ~100-1000 ops/sec (disk-bound)

    EVERY_SECOND: fsync every 1 second
      - Data loss: Up to 1 second of writes
      - Throughput: ~10,000-100,000 ops/sec

    NEVER: Let OS decide when to flush
      - Data loss: OS buffer (typically 30 seconds)
      - Throughput: ~100,000+ ops/sec
    """
    ALWAYS = "always"
    EVERY_SECOND = "everysec"
    NEVER = "no"

@dataclass
class WALEntry:
    timestamp: float
    command: str
    args: tuple

    def serialize(self) -> str:
        """Serialize to newline-delimited JSON."""
        return json.dumps({
            'ts': self.timestamp,
            'cmd': self.command,
            'args': self.args
        }) + '\n'

    @classmethod
    def deserialize(cls, line: str) -> 'WALEntry':
        data = json.loads(line.strip())
        return cls(
            timestamp=data['ts'],
            command=data['cmd'],
            args=tuple(data['args'])
        )

class WriteAheadLog:
    """
    Append-only log for durability.

    Design considerations:
    1. Append-only = sequential writes = fast on HDD and SSD
    2. No in-place updates = crash-safe (partial writes are tail)
    3. Needs periodic compaction to bound file size

    Real-world: Redis AOF, PostgreSQL WAL, Kafka segments
    """

    def __init__(self, path: str, fsync_policy: FsyncPolicy = FsyncPolicy.EVERY_SECOND):
        self._path = path
        self._fsync_policy = fsync_policy
        self._file = None
        self._last_fsync = time.time()
        self._operations_since_fsync = 0

    def open(self) -> None:
        """Open log file for appending."""
        self._file = open(self._path, 'a', encoding='utf-8')

    def close(self) -> None:
        """Flush and close log file."""
        if self._file:
            self._file.flush()
            os.fsync(self._file.fileno())
            self._file.close()
            self._file = None

    def append(self, command: str, *args) -> None:
        """
        Append operation to log.

        CRITICAL: Write to log BEFORE applying to memory.
        This ensures crash recovery can replay the operation.
        """
        if not self._file:
            raise RuntimeError("WAL not open")

        entry = WALEntry(
            timestamp=time.time(),
            command=command,
            args=args
        )

        self._file.write(entry.serialize())
        self._operations_since_fsync += 1

        # Apply fsync policy
        self._maybe_fsync()

    def _maybe_fsync(self) -> None:
        """Apply fsync based on configured policy."""
        should_fsync = False

        if self._fsync_policy == FsyncPolicy.ALWAYS:
            should_fsync = True
        elif self._fsync_policy == FsyncPolicy.EVERY_SECOND:
            if time.time() - self._last_fsync >= 1.0:
                should_fsync = True
        # NEVER policy: let OS handle it

        if should_fsync:
            self._file.flush()
            os.fsync(self._file.fileno())
            self._last_fsync = time.time()
            self._operations_since_fsync = 0

    def replay(self, executor: Callable[[str, tuple], None]) -> int:
        """
        Replay log to restore state.

        Called during startup to rebuild in-memory state.
        Returns number of operations replayed.
        """
        count = 0
        try:
            with open(self._path, 'r', encoding='utf-8') as f:
                for line in f:
                    if line.strip():
                        try:
                            entry = WALEntry.deserialize(line)
                            executor(entry.command, entry.args)
                            count += 1
                        except json.JSONDecodeError:
                            # Partial write at end of file - stop here
                            break
        except FileNotFoundError:
            pass  # No log file = fresh start

        return count

    def compact(self, current_state: dict) -> None:
        """
        Rewrite log with only current state.

        Called periodically to prevent unbounded log growth.
        After compaction, log contains SET commands for all current keys.

        Implementation: Write to temp file, then atomic rename.
        """
        temp_path = self._path + '.tmp'

        with open(temp_path, 'w', encoding='utf-8') as f:
            for key, entry in current_state.items():
                wal_entry = WALEntry(
                    timestamp=time.time(),
                    command='SET',
                    args=(key, entry.value, entry.expires_at)
                )
                f.write(wal_entry.serialize())
            f.flush()
            os.fsync(f.fileno())

        # Atomic rename (on POSIX systems)
        os.rename(temp_path, self._path)
```

### Snapshot (RDB) Implementation

```python
import pickle
import os
import time
from multiprocessing import Process

class SnapshotManager:
    """
    Point-in-time snapshot persistence.

    Key challenge: Consistent snapshot while serving requests.

    Solution 1: Stop-the-world
      - Block all operations during save
      - Simple but causes latency spike

    Solution 2: Copy-on-write (COW) via fork()
      - fork() creates child process with shared memory
      - OS handles COW when parent writes
      - Child saves snapshot, parent continues serving
      - Used by Redis RDB

    Limitation: fork() doubles memory temporarily in worst case
    (if all pages are modified during save)
    """

    def __init__(self, path: str, store: dict):
        self._path = path
        self._store = store
        self._save_in_progress = False
        self._last_save_time = 0
        self._changes_since_save = 0

    def save_sync(self) -> bool:
        """
        Synchronous save - blocks until complete.

        Use for: Shutdown, explicit SAVE command
        """
        temp_path = self._path + '.tmp'

        try:
            with open(temp_path, 'wb') as f:
                # Include metadata for validation
                snapshot = {
                    'version': 1,
                    'timestamp': time.time(),
                    'key_count': len(self._store),
                    'data': dict(self._store)  # Shallow copy
                }
                pickle.dump(snapshot, f, protocol=pickle.HIGHEST_PROTOCOL)
                f.flush()
                os.fsync(f.fileno())

            os.rename(temp_path, self._path)
            self._last_save_time = time.time()
            self._changes_since_save = 0
            return True

        except Exception as e:
            # Clean up temp file on failure
            if os.path.exists(temp_path):
                os.remove(temp_path)
            raise

    def save_background(self) -> bool:
        """
        Background save using fork() for copy-on-write.

        Returns False if save already in progress.
        """
        if self._save_in_progress:
            return False

        self._save_in_progress = True

        # In production, use fork() for true COW
        # For simplicity, we use multiprocessing.Process
        # which does fork() on Unix

        def do_save(store_copy, path):
            temp_path = path + '.tmp'
            with open(temp_path, 'wb') as f:
                snapshot = {
                    'version': 1,
                    'timestamp': time.time(),
                    'key_count': len(store_copy),
                    'data': store_copy
                }
                pickle.dump(snapshot, f, protocol=pickle.HIGHEST_PROTOCOL)
            os.rename(temp_path, path)

        # Create copy before fork to ensure consistency
        store_copy = dict(self._store)

        p = Process(target=do_save, args=(store_copy, self._path))
        p.start()

        # In production: monitor child process completion
        # and update _save_in_progress accordingly

        return True

    def load(self) -> bool:
        """
        Load snapshot into memory.

        Returns False if no snapshot exists.
        """
        if not os.path.exists(self._path):
            return False

        try:
            with open(self._path, 'rb') as f:
                snapshot = pickle.load(f)

            # Validate snapshot
            if snapshot.get('version') != 1:
                raise ValueError(f"Unknown snapshot version: {snapshot.get('version')}")

            # Load data
            self._store.clear()
            self._store.update(snapshot['data'])
            self._last_save_time = snapshot['timestamp']

            return True

        except Exception as e:
            # Corrupted snapshot - could try loading backup
            raise RuntimeError(f"Failed to load snapshot: {e}")

    def should_save(self, changes_threshold: int = 1000,
                    time_threshold: int = 300) -> bool:
        """
        Check if background save should be triggered.

        Redis uses configurable policies like:
        - save 900 1     (900 sec if >= 1 change)
        - save 300 10    (300 sec if >= 10 changes)
        - save 60 10000  (60 sec if >= 10000 changes)
        """
        time_since_save = time.time() - self._last_save_time

        return (self._changes_since_save >= changes_threshold or
                (time_since_save >= time_threshold and self._changes_since_save > 0))
```

### Interview Questions: Persistence

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #92400e; font-weight: 700; font-size: 16px; margin-bottom: 20px;">Level 1: Foundational Understanding</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #d97706; font-weight: 600;">Q: Why would you choose AOF over RDB snapshots, or vice versa?</div>
<div style="color: #78350f; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> RDB: Faster restarts (load single file vs replay log), more compact storage, better for backups/replication. AOF: Better durability (configurable fsync), can recover up to last second of data, human-readable for debugging. Many systems (including Redis) use BOTH: RDB for fast recovery baseline, AOF for incremental durability. On restart: load RDB first, then replay AOF entries newer than RDB timestamp.
</div>
</div>

<div style="background: linear-gradient(135deg, #fde68a 0%, #fcd34d 100%); border: 2px solid #fbbf24; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #b45309; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 2: Implementation Depth</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #f59e0b; font-weight: 600;">Q: How does fork() enable consistent snapshots without blocking? What's the memory overhead?</div>
<div style="color: #92400e; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> fork() creates a child process that shares memory pages with parent via copy-on-write (COW). Initially, both processes point to same physical memory. When parent writes, OS copies that specific page before modification. Child sees pre-fork state. Memory overhead: minimal initially, up to 2x in worst case if parent modifies every page during save. In practice, Redis sees 10-30% memory spike. Mitigation: transparent huge pages can amplify COW cost (2MB pages vs 4KB), so Redis recommends disabling THP.
</div>
</div>

<div style="background: linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #b45309; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 3: Production Considerations</div>

<div style="background: #fff; border-radius: 8px; padding: 16px;">
<div style="color: #fbbf24; font-weight: 600;">Q: How would you handle the case where AOF file becomes corrupted mid-write due to power failure?</div>
<div style="color: #92400e; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Multiple strategies: (1) Each entry is self-contained (newline-delimited), so partial final entry can be detected and truncated. (2) Add CRC checksum per entry or per block to detect corruption. (3) Maintain atomic write guarantee: write full entry to buffer, fsync. If entry > filesystem block size, corruption possible. Redis uses redis-check-aof tool to fix truncated files. (4) Shadow paging: write to new location, update pointer atomically (like SQLite WAL mode). (5) Keep old AOF as backup until new one is verified. Recovery: truncate at last valid entry, accept bounded data loss.
</div>
</div>
</div>
</div>
</div>

---

## Complete Implementation

### Integrated In-Memory Database

```python
"""
Complete In-Memory Database Implementation

This integrates all components:
- Key-value store with multiple data types
- TTL expiration (lazy + active)
- Nested transactions
- Optional persistence (WAL + Snapshots)

Thread-safety: RLock for all operations
"""

import time
import threading
import heapq
from typing import Any, Optional, Dict, List, Set, Union
from dataclasses import dataclass, field
from enum import Enum
from copy import deepcopy
from collections import deque

class DataType(Enum):
    STRING = "string"
    LIST = "list"
    HASH = "hash"
    SET = "set"

@dataclass(slots=True)
class Entry:
    value: Any
    data_type: DataType
    expires_at: Optional[float] = None

    def is_expired(self, current_time: float = None) -> bool:
        if self.expires_at is None:
            return False
        return (current_time or time.time()) > self.expires_at

@dataclass
class Transaction:
    snapshot: Dict[str, Optional[Entry]] = field(default_factory=dict)

    def record_if_new(self, key: str, old_value: Optional[Entry]) -> None:
        if key not in self.snapshot:
            self.snapshot[key] = deepcopy(old_value) if old_value else None

class InMemoryDB:
    """
    Feature-complete in-memory database.

    Supported operations:
    - String: GET, SET, DELETE, EXISTS
    - List: LPUSH, RPUSH, LPOP, RPOP, LRANGE, LLEN
    - Hash: HSET, HGET, HGETALL, HDEL, HEXISTS
    - Set: SADD, SREM, SMEMBERS, SISMEMBER, SCARD
    - TTL: EXPIRE, TTL, PERSIST
    - Transaction: BEGIN, COMMIT, ROLLBACK
    """

    def __init__(self, enable_persistence: bool = False,
                 persistence_path: str = "./db"):
        self._data: Dict[str, Entry] = {}
        self._lock = threading.RLock()
        self._transactions: List[Transaction] = []
        self._ttl_heap: List[tuple] = []  # (expires_at, key)

        # Persistence (optional)
        self._wal = None
        self._snapshot = None
        if enable_persistence:
            self._setup_persistence(persistence_path)

    def _setup_persistence(self, path: str) -> None:
        """Initialize persistence layer."""
        import os
        os.makedirs(path, exist_ok=True)
        # Initialize WAL and snapshot managers here
        pass

    # ==================== Internal Helpers ====================

    def _check_expired(self, key: str) -> bool:
        """Check and remove if expired. Returns True if was expired."""
        entry = self._data.get(key)
        if entry and entry.is_expired():
            del self._data[key]
            return True
        return False

    def _record_write(self, key: str) -> None:
        """Record for transaction rollback if in transaction."""
        if self._transactions:
            self._transactions[-1].record_if_new(key, self._data.get(key))

    def _type_check(self, key: str, expected: DataType) -> Optional[Entry]:
        """Verify key is of expected type. Returns entry or None."""
        entry = self._data.get(key)
        if entry is None:
            return None
        if entry.data_type != expected:
            raise TypeError(
                f"WRONGTYPE Operation against a key holding the wrong kind of value. "
                f"Expected {expected.value}, got {entry.data_type.value}"
            )
        return entry

    # ==================== String Operations ====================

    def get(self, key: str) -> Optional[Any]:
        """Get string value by key."""
        with self._lock:
            if self._check_expired(key):
                return None
            entry = self._data.get(key)
            return entry.value if entry else None

    def set(self, key: str, value: Any,
            ex: Optional[int] = None,  # Expire in seconds
            px: Optional[int] = None,  # Expire in milliseconds
            nx: bool = False,  # Only set if not exists
            xx: bool = False   # Only set if exists
            ) -> bool:
        """
        Set string value with options.

        Args:
            key: Key name
            value: Value to set
            ex: Expire time in seconds
            px: Expire time in milliseconds
            nx: Only set if key does not exist
            xx: Only set if key already exists

        Returns:
            True if set, False if condition not met
        """
        with self._lock:
            self._check_expired(key)
            exists = key in self._data

            # Check NX/XX conditions
            if nx and exists:
                return False
            if xx and not exists:
                return False

            self._record_write(key)

            # Calculate expiration
            expires_at = None
            if px is not None:
                expires_at = time.time() + (px / 1000)
            elif ex is not None:
                expires_at = time.time() + ex

            self._data[key] = Entry(
                value=value,
                data_type=DataType.STRING,
                expires_at=expires_at
            )

            if expires_at:
                heapq.heappush(self._ttl_heap, (expires_at, key))

            return True

    def delete(self, *keys: str) -> int:
        """Delete one or more keys. Returns count of deleted keys."""
        with self._lock:
            deleted = 0
            for key in keys:
                self._check_expired(key)
                if key in self._data:
                    self._record_write(key)
                    del self._data[key]
                    deleted += 1
            return deleted

    def exists(self, *keys: str) -> int:
        """Count how many of the specified keys exist."""
        with self._lock:
            count = 0
            for key in keys:
                if not self._check_expired(key) and key in self._data:
                    count += 1
            return count

    # ==================== TTL Operations ====================

    def expire(self, key: str, seconds: int) -> bool:
        """Set TTL on existing key. Returns False if key doesn't exist."""
        with self._lock:
            self._check_expired(key)
            entry = self._data.get(key)
            if not entry:
                return False

            self._record_write(key)
            entry.expires_at = time.time() + seconds
            heapq.heappush(self._ttl_heap, (entry.expires_at, key))
            return True

    def ttl(self, key: str) -> int:
        """
        Get remaining TTL in seconds.
        Returns -2 if key doesn't exist, -1 if no TTL set.
        """
        with self._lock:
            if self._check_expired(key):
                return -2
            entry = self._data.get(key)
            if not entry:
                return -2
            if entry.expires_at is None:
                return -1
            return max(0, int(entry.expires_at - time.time()))

    def persist(self, key: str) -> bool:
        """Remove TTL from key. Returns False if key doesn't exist or has no TTL."""
        with self._lock:
            entry = self._data.get(key)
            if not entry or entry.expires_at is None:
                return False

            self._record_write(key)
            entry.expires_at = None
            return True

    # ==================== List Operations ====================

    def lpush(self, key: str, *values: Any) -> int:
        """Push values to left of list. Returns new length."""
        with self._lock:
            self._check_expired(key)
            self._record_write(key)

            entry = self._data.get(key)
            if entry is None:
                self._data[key] = Entry(value=deque(), data_type=DataType.LIST)
                entry = self._data[key]
            elif entry.data_type != DataType.LIST:
                raise TypeError("WRONGTYPE")

            for v in values:
                entry.value.appendleft(v)

            return len(entry.value)

    def rpush(self, key: str, *values: Any) -> int:
        """Push values to right of list. Returns new length."""
        with self._lock:
            self._check_expired(key)
            self._record_write(key)

            entry = self._data.get(key)
            if entry is None:
                self._data[key] = Entry(value=deque(), data_type=DataType.LIST)
                entry = self._data[key]
            elif entry.data_type != DataType.LIST:
                raise TypeError("WRONGTYPE")

            entry.value.extend(values)
            return len(entry.value)

    def lpop(self, key: str) -> Optional[Any]:
        """Pop from left of list."""
        with self._lock:
            entry = self._type_check(key, DataType.LIST)
            if not entry or not entry.value:
                return None

            self._record_write(key)
            return entry.value.popleft()

    def rpop(self, key: str) -> Optional[Any]:
        """Pop from right of list."""
        with self._lock:
            entry = self._type_check(key, DataType.LIST)
            if not entry or not entry.value:
                return None

            self._record_write(key)
            return entry.value.pop()

    def lrange(self, key: str, start: int, stop: int) -> List[Any]:
        """Get range of elements. Supports negative indices."""
        with self._lock:
            entry = self._type_check(key, DataType.LIST)
            if not entry:
                return []

            lst = list(entry.value)
            # Convert Redis-style inclusive stop to Python slice
            if stop >= 0:
                stop += 1
            elif stop == -1:
                stop = None
            else:
                stop += 1

            return lst[start:stop]

    def llen(self, key: str) -> int:
        """Get length of list."""
        with self._lock:
            entry = self._type_check(key, DataType.LIST)
            return len(entry.value) if entry else 0

    # ==================== Hash Operations ====================

    def hset(self, key: str, field: str, value: Any) -> bool:
        """Set field in hash. Returns True if field is new."""
        with self._lock:
            self._check_expired(key)
            self._record_write(key)

            entry = self._data.get(key)
            if entry is None:
                self._data[key] = Entry(value={}, data_type=DataType.HASH)
                entry = self._data[key]
            elif entry.data_type != DataType.HASH:
                raise TypeError("WRONGTYPE")

            is_new = field not in entry.value
            entry.value[field] = value
            return is_new

    def hget(self, key: str, field: str) -> Optional[Any]:
        """Get field from hash."""
        with self._lock:
            entry = self._type_check(key, DataType.HASH)
            if not entry:
                return None
            return entry.value.get(field)

    def hgetall(self, key: str) -> Dict[str, Any]:
        """Get all fields and values from hash."""
        with self._lock:
            entry = self._type_check(key, DataType.HASH)
            return dict(entry.value) if entry else {}

    def hdel(self, key: str, *fields: str) -> int:
        """Delete fields from hash. Returns count deleted."""
        with self._lock:
            entry = self._type_check(key, DataType.HASH)
            if not entry:
                return 0

            self._record_write(key)
            deleted = 0
            for f in fields:
                if f in entry.value:
                    del entry.value[f]
                    deleted += 1
            return deleted

    def hexists(self, key: str, field: str) -> bool:
        """Check if field exists in hash."""
        with self._lock:
            entry = self._type_check(key, DataType.HASH)
            return field in entry.value if entry else False

    # ==================== Set Operations ====================

    def sadd(self, key: str, *members: Any) -> int:
        """Add members to set. Returns count of new members added."""
        with self._lock:
            self._check_expired(key)
            self._record_write(key)

            entry = self._data.get(key)
            if entry is None:
                self._data[key] = Entry(value=set(), data_type=DataType.SET)
                entry = self._data[key]
            elif entry.data_type != DataType.SET:
                raise TypeError("WRONGTYPE")

            before = len(entry.value)
            entry.value.update(members)
            return len(entry.value) - before

    def srem(self, key: str, *members: Any) -> int:
        """Remove members from set. Returns count removed."""
        with self._lock:
            entry = self._type_check(key, DataType.SET)
            if not entry:
                return 0

            self._record_write(key)
            removed = 0
            for m in members:
                if m in entry.value:
                    entry.value.remove(m)
                    removed += 1
            return removed

    def smembers(self, key: str) -> Set[Any]:
        """Get all members of set."""
        with self._lock:
            entry = self._type_check(key, DataType.SET)
            return set(entry.value) if entry else set()

    def sismember(self, key: str, member: Any) -> bool:
        """Check if member exists in set."""
        with self._lock:
            entry = self._type_check(key, DataType.SET)
            return member in entry.value if entry else False

    def scard(self, key: str) -> int:
        """Get cardinality (size) of set."""
        with self._lock:
            entry = self._type_check(key, DataType.SET)
            return len(entry.value) if entry else 0

    # ==================== Transaction Operations ====================

    def begin(self) -> int:
        """Start new transaction. Returns nesting depth."""
        with self._lock:
            self._transactions.append(Transaction())
            return len(self._transactions)

    def commit(self) -> bool:
        """Commit current transaction. Returns False if no active transaction."""
        with self._lock:
            if not self._transactions:
                return False

            committed = self._transactions.pop()

            # Merge snapshot to parent if nested
            if self._transactions:
                parent = self._transactions[-1]
                for key, old_value in committed.snapshot.items():
                    parent.record_if_new(key, old_value)

            return True

    def rollback(self) -> bool:
        """Rollback current transaction. Returns False if no active transaction."""
        with self._lock:
            if not self._transactions:
                return False

            txn = self._transactions.pop()

            for key, original in txn.snapshot.items():
                if original is None:
                    self._data.pop(key, None)
                else:
                    self._data[key] = original

            return True

    def in_transaction(self) -> bool:
        """Check if currently in a transaction."""
        return len(self._transactions) > 0

    # ==================== Utility Operations ====================

    def keys(self, pattern: str = "*") -> List[str]:
        """
        Get all keys matching pattern.
        WARNING: O(n) - use with caution in production.
        """
        with self._lock:
            import fnmatch
            result = []
            for key in self._data:
                if not self._check_expired(key):
                    if fnmatch.fnmatch(key, pattern):
                        result.append(key)
            return result

    def dbsize(self) -> int:
        """Get number of keys in database."""
        with self._lock:
            return len(self._data)

    def flushdb(self) -> bool:
        """Delete all keys."""
        with self._lock:
            self._data.clear()
            self._ttl_heap.clear()
            return True

    def type(self, key: str) -> Optional[str]:
        """Get type of value at key."""
        with self._lock:
            if self._check_expired(key):
                return None
            entry = self._data.get(key)
            return entry.data_type.value if entry else None
```

---

## Testing and Validation

```python
import unittest
import time
import threading

class TestInMemoryDB(unittest.TestCase):
    """Comprehensive test suite for in-memory database."""

    def setUp(self):
        self.db = InMemoryDB()

    # ===== String Tests =====

    def test_get_set_basic(self):
        self.assertTrue(self.db.set("key", "value"))
        self.assertEqual(self.db.get("key"), "value")

    def test_get_nonexistent(self):
        self.assertIsNone(self.db.get("nonexistent"))

    def test_set_overwrite(self):
        self.db.set("key", "value1")
        self.db.set("key", "value2")
        self.assertEqual(self.db.get("key"), "value2")

    def test_set_nx_when_exists(self):
        self.db.set("key", "value1")
        self.assertFalse(self.db.set("key", "value2", nx=True))
        self.assertEqual(self.db.get("key"), "value1")

    def test_set_xx_when_not_exists(self):
        self.assertFalse(self.db.set("key", "value", xx=True))
        self.assertIsNone(self.db.get("key"))

    def test_delete(self):
        self.db.set("key", "value")
        self.assertEqual(self.db.delete("key"), 1)
        self.assertIsNone(self.db.get("key"))

    def test_delete_nonexistent(self):
        self.assertEqual(self.db.delete("nonexistent"), 0)

    # ===== TTL Tests =====

    def test_ttl_expiration(self):
        self.db.set("key", "value", ex=1)
        self.assertEqual(self.db.get("key"), "value")
        time.sleep(1.1)
        self.assertIsNone(self.db.get("key"))

    def test_ttl_command(self):
        self.db.set("key", "value", ex=10)
        ttl = self.db.ttl("key")
        self.assertTrue(9 <= ttl <= 10)

    def test_ttl_no_expiry(self):
        self.db.set("key", "value")
        self.assertEqual(self.db.ttl("key"), -1)

    def test_ttl_nonexistent(self):
        self.assertEqual(self.db.ttl("nonexistent"), -2)

    def test_persist(self):
        self.db.set("key", "value", ex=10)
        self.assertTrue(self.db.persist("key"))
        self.assertEqual(self.db.ttl("key"), -1)

    # ===== Transaction Tests =====

    def test_transaction_commit(self):
        self.db.set("x", 10)
        self.db.begin()
        self.db.set("x", 20)
        self.db.commit()
        self.assertEqual(self.db.get("x"), 20)

    def test_transaction_rollback(self):
        self.db.set("x", 10)
        self.db.begin()
        self.db.set("x", 20)
        self.db.rollback()
        self.assertEqual(self.db.get("x"), 10)

    def test_nested_transaction_inner_rollback(self):
        self.db.set("x", 1)
        self.db.begin()  # Outer
        self.db.set("x", 2)
        self.db.begin()  # Inner
        self.db.set("x", 3)
        self.db.rollback()  # Rollback inner
        self.assertEqual(self.db.get("x"), 2)
        self.db.commit()  # Commit outer
        self.assertEqual(self.db.get("x"), 2)

    def test_nested_transaction_outer_rollback(self):
        self.db.set("x", 1)
        self.db.begin()  # Outer
        self.db.set("x", 2)
        self.db.begin()  # Inner
        self.db.set("x", 3)
        self.db.commit()  # Commit inner
        self.db.rollback()  # Rollback outer
        self.assertEqual(self.db.get("x"), 1)

    def test_transaction_new_key_rollback(self):
        self.db.begin()
        self.db.set("new_key", "value")
        self.db.rollback()
        self.assertIsNone(self.db.get("new_key"))

    def test_rollback_without_begin(self):
        self.assertFalse(self.db.rollback())

    # ===== List Tests =====

    def test_lpush_rpush(self):
        self.db.rpush("list", 1, 2, 3)
        self.db.lpush("list", 0)
        self.assertEqual(self.db.lrange("list", 0, -1), [0, 1, 2, 3])

    def test_lpop_rpop(self):
        self.db.rpush("list", 1, 2, 3)
        self.assertEqual(self.db.lpop("list"), 1)
        self.assertEqual(self.db.rpop("list"), 3)
        self.assertEqual(self.db.lrange("list", 0, -1), [2])

    def test_llen(self):
        self.db.rpush("list", 1, 2, 3)
        self.assertEqual(self.db.llen("list"), 3)

    # ===== Hash Tests =====

    def test_hset_hget(self):
        self.assertTrue(self.db.hset("hash", "field1", "value1"))
        self.assertEqual(self.db.hget("hash", "field1"), "value1")

    def test_hgetall(self):
        self.db.hset("hash", "f1", "v1")
        self.db.hset("hash", "f2", "v2")
        self.assertEqual(self.db.hgetall("hash"), {"f1": "v1", "f2": "v2"})

    def test_hdel(self):
        self.db.hset("hash", "f1", "v1")
        self.db.hset("hash", "f2", "v2")
        self.assertEqual(self.db.hdel("hash", "f1", "f3"), 1)
        self.assertIsNone(self.db.hget("hash", "f1"))

    # ===== Set Tests =====

    def test_sadd_smembers(self):
        self.assertEqual(self.db.sadd("set", 1, 2, 3), 3)
        self.assertEqual(self.db.smembers("set"), {1, 2, 3})

    def test_sadd_duplicate(self):
        self.db.sadd("set", 1, 2)
        self.assertEqual(self.db.sadd("set", 2, 3), 1)  # Only 3 is new

    def test_sismember(self):
        self.db.sadd("set", 1, 2, 3)
        self.assertTrue(self.db.sismember("set", 2))
        self.assertFalse(self.db.sismember("set", 4))

    def test_srem(self):
        self.db.sadd("set", 1, 2, 3)
        self.assertEqual(self.db.srem("set", 2, 4), 1)
        self.assertEqual(self.db.smembers("set"), {1, 3})

    # ===== Type Error Tests =====

    def test_type_mismatch_list_on_string(self):
        self.db.set("key", "string_value")
        with self.assertRaises(TypeError):
            self.db.lpush("key", "value")

    def test_type_mismatch_hash_on_list(self):
        self.db.rpush("key", 1, 2, 3)
        with self.assertRaises(TypeError):
            self.db.hset("key", "field", "value")

    # ===== Thread Safety Tests =====

    def test_concurrent_access(self):
        """Test thread safety with concurrent operations."""
        errors = []

        def writer():
            try:
                for i in range(100):
                    self.db.set(f"key_{i}", i)
            except Exception as e:
                errors.append(e)

        def reader():
            try:
                for i in range(100):
                    self.db.get(f"key_{i}")
            except Exception as e:
                errors.append(e)

        threads = [
            threading.Thread(target=writer),
            threading.Thread(target=reader),
            threading.Thread(target=writer),
            threading.Thread(target=reader),
        ]

        for t in threads:
            t.start()
        for t in threads:
            t.join()

        self.assertEqual(len(errors), 0)


if __name__ == "__main__":
    unittest.main()
```

---

## Complexity Summary

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="font-weight: 700; color: #1e293b; font-size: 16px; margin-bottom: 16px;">Time and Space Complexity</div>

| Operation | Time | Space | Notes |
|-----------|------|-------|-------|
| GET | O(1) avg | O(1) | O(n) worst-case with hash collision |
| SET | O(1) avg | O(1) | O(log k) with TTL heap insertion |
| DELETE | O(1) avg | O(1) | Lazy TTL heap cleanup |
| EXPIRE | O(log k) | O(1) | k = entries with TTL |
| BEGIN | O(1) | O(1) | Lazy snapshot creation |
| COMMIT | O(1) | O(1) | O(m) to merge nested snapshots |
| ROLLBACK | O(m) | O(1) | m = modified keys in transaction |
| LPUSH/RPUSH | O(1) | O(1) | Using deque |
| LPOP/RPOP | O(1) | O(1) | Using deque |
| LRANGE | O(k) | O(k) | k = range size |
| HSET/HGET | O(1) avg | O(1) | |
| SADD | O(n) | O(1) | n = members added |
| SMEMBERS | O(m) | O(m) | m = set size (copy) |
| TTL Cleanup | O(d log k) | O(1) | d = deleted, k = TTL entries |

</div>

---

---

## Section 6: Advanced Data Structures

### B-Tree and B+ Tree for Range Queries

While <span style="color: #16a34a; font-weight: 600;">hash maps</span> provide O(1) lookup, they cannot efficiently support <span style="color: #16a34a; font-weight: 600;">range queries</span> like "find all keys between A and B". For these operations, we need ordered data structures. See [[database-sharding]](/system-design/database-sharding) for how these structures scale across nodes.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<div style="font-weight: 700; color: #1e293b; font-size: 18px; text-align: center; margin-bottom: 28px;">B+ Tree Structure for In-Memory Database</div>

<div style="display: flex; flex-direction: column; gap: 20px; align-items: center;">

<div style="background: linear-gradient(180deg, #fef3c7 0%, #fffbeb 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 16px 32px; text-align: center;">
<div style="color: #92400e; font-weight: 700; font-size: 14px; margin-bottom: 8px;">Root Node (Internal)</div>
<div style="display: flex; gap: 8px; justify-content: center;">
<div style="background: #fff; border: 1px solid #fcd34d; padding: 8px 16px; border-radius: 6px; font-family: monospace; font-size: 12px;">key: 50</div>
<div style="background: #fff; border: 1px solid #fcd34d; padding: 8px 16px; border-radius: 6px; font-family: monospace; font-size: 12px;">key: 100</div>
</div>
</div>

<div style="display: flex; justify-content: center; gap: 80px;">
<div style="width: 2px; height: 30px; background: #94a3b8;"></div>
<div style="width: 2px; height: 30px; background: #94a3b8;"></div>
<div style="width: 2px; height: 30px; background: #94a3b8;"></div>
</div>

<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
<div style="background: linear-gradient(180deg, #dcfce7 0%, #f0fdf4 100%); border: 2px solid #22c55e; border-radius: 10px; padding: 12px 16px; text-align: center; min-width: 120px;">
<div style="color: #166534; font-weight: 600; font-size: 12px; margin-bottom: 6px;">Leaf Node</div>
<div style="font-family: monospace; font-size: 11px; color: #14532d;">10, 20, 30, 40</div>
<div style="font-size: 10px; color: #6b7280; margin-top: 4px;">+ data pointers</div>
</div>
<div style="background: linear-gradient(180deg, #dcfce7 0%, #f0fdf4 100%); border: 2px solid #22c55e; border-radius: 10px; padding: 12px 16px; text-align: center; min-width: 120px;">
<div style="color: #166534; font-weight: 600; font-size: 12px; margin-bottom: 6px;">Leaf Node</div>
<div style="font-family: monospace; font-size: 11px; color: #14532d;">50, 60, 70, 80</div>
<div style="font-size: 10px; color: #6b7280; margin-top: 4px;">+ data pointers</div>
</div>
<div style="background: linear-gradient(180deg, #dcfce7 0%, #f0fdf4 100%); border: 2px solid #22c55e; border-radius: 10px; padding: 12px 16px; text-align: center; min-width: 120px;">
<div style="color: #166534; font-weight: 600; font-size: 12px; margin-bottom: 6px;">Leaf Node</div>
<div style="font-family: monospace; font-size: 11px; color: #14532d;">100, 110, 120</div>
<div style="font-size: 10px; color: #6b7280; margin-top: 4px;">+ data pointers</div>
</div>
</div>

<div style="display: flex; gap: 8px; justify-content: center; align-items: center; margin-top: 8px;">
<div style="background: #dbeafe; padding: 6px 12px; border-radius: 6px; font-size: 11px; color: #1e40af;">Leaf nodes linked for range scans</div>
<div style="color: #3b82f6;">→→→</div>
</div>

</div>
</div>

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: 700; margin-bottom: 12px;">Key Insight: B+ Tree Advantages for In-Memory Use</div>
<div style="color: #14532d; font-size: 14px; line-height: 1.8;">
<ul style="margin: 0; padding-left: 20px;">
<li><span style="color: #16a34a; font-weight: 600;">Cache-friendly</span>: High fanout (100-1000 keys per node) means shallow trees (2-4 levels for millions of keys)</li>
<li><span style="color: #16a34a; font-weight: 600;">Range queries</span>: O(log n + k) where k = result size, thanks to linked leaf nodes</li>
<li><span style="color: #16a34a; font-weight: 600;">Sorted iteration</span>: Sequential scan through leaf chain for ORDER BY operations</li>
<li><span style="color: #16a34a; font-weight: 600;">Prefix compression</span>: Internal nodes only store separator keys, not full data</li>
</ul>
</div>
</div>

```python
from typing import List, Optional, Any, Tuple
from dataclasses import dataclass, field

@dataclass
class BPlusTreeNode:
    """
    B+ Tree node optimized for in-memory use.

    Design decisions:
    1. ORDER = 4 for demonstration (production uses 100-1000)
    2. Leaf nodes store actual values (not disk pointers)
    3. Internal nodes store only keys (separator values)
    """
    ORDER = 4  # Maximum keys per node (use higher in production)

    keys: List[Any] = field(default_factory=list)
    is_leaf: bool = True

    # For leaf nodes: actual values
    values: List[Any] = field(default_factory=list)

    # For internal nodes: child pointers
    children: List['BPlusTreeNode'] = field(default_factory=list)

    # For leaf nodes: linked list pointer
    next_leaf: Optional['BPlusTreeNode'] = None

    def is_full(self) -> bool:
        return len(self.keys) >= self.ORDER

    def is_underfull(self) -> bool:
        """Node has fewer than minimum keys (ORDER/2)."""
        return len(self.keys) < self.ORDER // 2

class BPlusTree:
    """
    B+ Tree implementation for range-queryable secondary index.

    Use cases in in-memory database:
    1. Secondary indexes on sortable fields
    2. Sorted sets (like Redis ZSET)
    3. Time-series data with timestamp ranges

    Time Complexities:
    - Search: O(log n)
    - Insert: O(log n)
    - Delete: O(log n)
    - Range query [a,b]: O(log n + k) where k = result count
    """

    def __init__(self):
        self.root = BPlusTreeNode()
        self._size = 0

    def search(self, key: Any) -> Optional[Any]:
        """Find value by exact key match."""
        node = self._find_leaf(key)

        for i, k in enumerate(node.keys):
            if k == key:
                return node.values[i]
        return None

    def _find_leaf(self, key: Any) -> BPlusTreeNode:
        """Navigate tree to find appropriate leaf node."""
        node = self.root
        while not node.is_leaf:
            # Find child to follow
            i = 0
            while i < len(node.keys) and key >= node.keys[i]:
                i += 1
            node = node.children[i]
        return node

    def range_query(self, start: Any, end: Any) -> List[Tuple[Any, Any]]:
        """
        Find all key-value pairs where start <= key <= end.

        This is the killer feature of B+ trees: O(log n + k)
        where k is the number of results, thanks to leaf linking.
        """
        results = []
        node = self._find_leaf(start)

        # Scan through leaf nodes
        while node:
            for i, key in enumerate(node.keys):
                if key > end:
                    return results
                if key >= start:
                    results.append((key, node.values[i]))
            node = node.next_leaf

        return results

    def insert(self, key: Any, value: Any) -> None:
        """Insert key-value pair, splitting nodes as needed."""
        leaf = self._find_leaf(key)

        # Find insertion position
        insert_pos = 0
        while insert_pos < len(leaf.keys) and leaf.keys[insert_pos] < key:
            insert_pos += 1

        # Update if key exists
        if insert_pos < len(leaf.keys) and leaf.keys[insert_pos] == key:
            leaf.values[insert_pos] = value
            return

        # Insert new key-value
        leaf.keys.insert(insert_pos, key)
        leaf.values.insert(insert_pos, value)
        self._size += 1

        # Split if overflow
        if leaf.is_full():
            self._split_leaf(leaf)

    def _split_leaf(self, leaf: BPlusTreeNode) -> None:
        """Split full leaf node, propagating split upward if needed."""
        mid = len(leaf.keys) // 2

        # Create new leaf with right half
        new_leaf = BPlusTreeNode(is_leaf=True)
        new_leaf.keys = leaf.keys[mid:]
        new_leaf.values = leaf.values[mid:]
        new_leaf.next_leaf = leaf.next_leaf

        # Truncate original leaf
        leaf.keys = leaf.keys[:mid]
        leaf.values = leaf.values[:mid]
        leaf.next_leaf = new_leaf

        # Promote split key to parent
        split_key = new_leaf.keys[0]
        self._insert_into_parent(leaf, split_key, new_leaf)

    def _insert_into_parent(self, left: BPlusTreeNode,
                            key: Any, right: BPlusTreeNode) -> None:
        """Insert split key into parent, creating new root if needed."""
        # Find parent (simplified - production would track parent during descent)
        parent = self._find_parent(self.root, left)

        if parent is None:
            # Create new root
            new_root = BPlusTreeNode(is_leaf=False)
            new_root.keys = [key]
            new_root.children = [left, right]
            self.root = new_root
            return

        # Insert into parent
        insert_pos = 0
        while insert_pos < len(parent.keys) and parent.keys[insert_pos] < key:
            insert_pos += 1

        parent.keys.insert(insert_pos, key)
        parent.children.insert(insert_pos + 1, right)

        # Split parent if needed (recursive)
        if parent.is_full():
            self._split_internal(parent)

    def _find_parent(self, current: BPlusTreeNode,
                     target: BPlusTreeNode) -> Optional[BPlusTreeNode]:
        """Find parent of target node."""
        if current.is_leaf or current == target:
            return None

        for child in current.children:
            if child == target:
                return current
            result = self._find_parent(child, target)
            if result:
                return result
        return None
```

### Hash Map vs B-Tree: Decision Matrix

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="font-weight: 700; color: #1e293b; font-size: 16px; margin-bottom: 20px;">When to Use Each Data Structure</div>

<div style="display: flex; gap: 20px; flex-wrap: wrap;">

<div style="flex: 1; min-width: 280px; background: linear-gradient(180deg, #dbeafe 0%, #eff6ff 100%); border: 2px solid #3b82f6; border-radius: 12px; padding: 20px;">
<div style="color: #1e40af; font-weight: 700; font-size: 15px; margin-bottom: 14px;">Use Hash Map When</div>
<div style="color: #1e3a8a; font-size: 13px; line-height: 1.9;">
<div style="margin-bottom: 8px;">Primary key lookup (GET by key)</div>
<div style="margin-bottom: 8px;">Existence checks (EXISTS)</div>
<div style="margin-bottom: 8px;">Session/cache storage</div>
<div style="margin-bottom: 8px;">No ordering requirements</div>
<div style="margin-bottom: 8px;">Maximum single-key performance</div>
<div style="background: #fff; padding: 10px; border-radius: 8px; margin-top: 12px;">
<div style="color: #1e40af; font-weight: 600; font-size: 12px;">Complexity: O(1) average</div>
<div style="color: #3b82f6; font-size: 11px;">Examples: Redis strings, Memcached</div>
</div>
</div>
</div>

<div style="flex: 1; min-width: 280px; background: linear-gradient(180deg, #dcfce7 0%, #f0fdf4 100%); border: 2px solid #22c55e; border-radius: 12px; padding: 20px;">
<div style="color: #166534; font-weight: 700; font-size: 15px; margin-bottom: 14px;">Use B-Tree When</div>
<div style="color: #14532d; font-size: 13px; line-height: 1.9;">
<div style="margin-bottom: 8px;">Range queries (BETWEEN, >, <)</div>
<div style="margin-bottom: 8px;">Sorted iteration (ORDER BY)</div>
<div style="margin-bottom: 8px;">Prefix matching (LIKE 'abc%')</div>
<div style="margin-bottom: 8px;">Min/Max operations</div>
<div style="margin-bottom: 8px;">Time-series with windowing</div>
<div style="background: #fff; padding: 10px; border-radius: 8px; margin-top: 12px;">
<div style="color: #166534; font-weight: 600; font-size: 12px;">Complexity: O(log n)</div>
<div style="color: #22c55e; font-size: 11px;">Examples: Redis ZSET, SQLite indexes</div>
</div>
</div>
</div>

</div>
</div>

### Radix Tree for Prefix Operations

For string-heavy workloads requiring <span style="color: #16a34a; font-weight: 600;">prefix matching</span>, a [[radix-tree]](/data-structures/tries) (compressed trie) offers optimal performance. Redis uses this internally for key pattern matching.

```python
from dataclasses import dataclass, field
from typing import Dict, Optional, List, Any

@dataclass
class RadixNode:
    """
    Radix tree node for memory-efficient prefix indexing.

    Key insight: Radix trees compress single-child chains,
    reducing memory from O(total characters) to O(unique prefixes).
    """
    edge_label: str = ""  # Compressed edge label
    value: Optional[Any] = None
    is_terminal: bool = False
    children: Dict[str, 'RadixNode'] = field(default_factory=dict)

class RadixTree:
    """
    Radix tree (Patricia trie) for prefix-based operations.

    Use cases:
    1. Key pattern matching (KEYS prefix*)
    2. Autocomplete/typeahead
    3. IP routing tables
    4. URL routing

    Complexity:
    - Insert: O(k) where k = key length
    - Search: O(k)
    - Prefix search: O(k + m) where m = matching keys
    - Space: O(unique_prefixes) - much better than trie
    """

    def __init__(self):
        self.root = RadixNode()
        self._size = 0

    def insert(self, key: str, value: Any) -> None:
        """Insert key-value pair into radix tree."""
        node = self.root
        remaining = key

        while remaining:
            # Find matching child
            match_char = remaining[0]

            if match_char not in node.children:
                # Create new leaf
                new_node = RadixNode(
                    edge_label=remaining,
                    value=value,
                    is_terminal=True
                )
                node.children[match_char] = new_node
                self._size += 1
                return

            child = node.children[match_char]
            edge = child.edge_label

            # Find common prefix length
            common_len = 0
            while (common_len < len(edge) and
                   common_len < len(remaining) and
                   edge[common_len] == remaining[common_len]):
                common_len += 1

            if common_len == len(edge):
                # Full edge match - continue down
                remaining = remaining[common_len:]
                node = child
            else:
                # Partial match - need to split edge
                self._split_edge(node, match_char, child,
                               common_len, remaining, value)
                return

        # Exact match - update terminal
        node.value = value
        node.is_terminal = True
        if not node.is_terminal:
            self._size += 1

    def _split_edge(self, parent: RadixNode, char: str,
                    child: RadixNode, split_pos: int,
                    remaining: str, value: Any) -> None:
        """Split edge at split_pos when partial match occurs."""
        # Create intermediate node
        common_prefix = child.edge_label[:split_pos]
        child_suffix = child.edge_label[split_pos:]
        new_suffix = remaining[split_pos:]

        intermediate = RadixNode(edge_label=common_prefix)

        # Old child becomes child of intermediate
        child.edge_label = child_suffix
        intermediate.children[child_suffix[0]] = child

        # New node for new key
        if new_suffix:
            new_node = RadixNode(
                edge_label=new_suffix,
                value=value,
                is_terminal=True
            )
            intermediate.children[new_suffix[0]] = new_node
        else:
            intermediate.value = value
            intermediate.is_terminal = True

        parent.children[char] = intermediate
        self._size += 1

    def find_by_prefix(self, prefix: str) -> List[tuple]:
        """
        Find all key-value pairs with given prefix.

        This is the killer feature for pattern matching:
        KEYS user:* becomes find_by_prefix("user:")
        """
        results = []
        node = self.root
        current_key = ""
        remaining = prefix

        # Navigate to prefix node
        while remaining and node:
            match_char = remaining[0]
            if match_char not in node.children:
                return []  # Prefix not found

            child = node.children[match_char]
            edge = child.edge_label

            if remaining.startswith(edge):
                current_key += edge
                remaining = remaining[len(edge):]
                node = child
            elif edge.startswith(remaining):
                # Partial edge match - prefix ends mid-edge
                current_key += remaining
                remaining = ""
                node = child
            else:
                return []  # No match

        # Collect all descendants
        self._collect_all(node, current_key, results)
        return results

    def _collect_all(self, node: RadixNode,
                     prefix: str, results: List) -> None:
        """Recursively collect all terminal nodes under prefix."""
        if node.is_terminal:
            results.append((prefix, node.value))

        for char, child in node.children.items():
            self._collect_all(child, prefix + child.edge_label, results)
```

### Interview Questions: Data Structures

<div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 2px solid #10b981; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #065f46; font-weight: 700; font-size: 16px; margin-bottom: 20px;">Level 1: Foundational Understanding</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #059669; font-weight: 600;">Q: Why does Redis use both hash tables AND skip lists for sorted sets?</div>
<div style="color: #064e3b; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Redis ZSET stores data in both structures simultaneously: (1) <span style="color: #16a34a; font-weight: 600;">Hash table</span> maps member -> score for O(1) score lookup and duplicate detection. (2) <span style="color: #16a34a; font-weight: 600;">Skip list</span> orders by score for O(log n) range queries. The space overhead (storing each member twice) is acceptable because it enables both ZSCORE (O(1)) and ZRANGEBYSCORE (O(log n + k)) to be fast. This is a classic <span style="color: #16a34a; font-weight: 600;">space-time tradeoff</span>.
</div>
</div>

<div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border: 2px solid #34d399; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #047857; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 2: Implementation Depth</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #10b981; font-weight: 600;">Q: How would you implement a secondary index that supports both equality and range queries efficiently?</div>
<div style="color: #065f46; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Use a <span style="color: #16a34a; font-weight: 600;">B+ tree</span> as the index structure. For equality (WHERE age = 25): traverse tree to leaf, O(log n). For range (WHERE age BETWEEN 20 AND 30): traverse to first matching leaf, then scan linked leaves, O(log n + k). For composite indexes (age, name): B+ tree with composite keys enables both "age = 25" and "age = 25 AND name LIKE 'A%'" efficiently. Maintain hash table for primary key, B+ tree for secondary indexes. Index updates must be <span style="color: #16a34a; font-weight: 600;">atomic with data updates</span> - use transaction to update both.
</div>
</div>

<div style="background: linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%); border: 2px solid #10b981; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #047857; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 3: Production Considerations</div>

<div style="background: #fff; border-radius: 8px; padding: 16px;">
<div style="color: #34d399; font-weight: 600;">Q: How would you handle memory pressure when B-tree indexes become too large for available RAM?</div>
<div style="color: #065f46; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Several strategies: (1) <span style="color: #16a34a; font-weight: 600;">Partial indexes</span>: Only index frequently queried subset (WHERE status = 'active'). (2) <span style="color: #16a34a; font-weight: 600;">Index eviction</span>: Treat cold index nodes as evictable cache, rebuild from WAL on access. (3) <span style="color: #16a34a; font-weight: 600;">Sparse indexes</span>: Index every Nth key, scan within blocks. (4) <span style="color: #16a34a; font-weight: 600;">Bloom filters</span>: Pre-filter queries that definitely won't match before B-tree lookup - see [[caching]](/system-design/caching). (5) <span style="color: #16a34a; font-weight: 600;">Hybrid storage</span>: Keep hot internal nodes in memory, cold leaves on SSD with memory-mapped access. Modern systems like RocksDB use LSM trees which are designed for memory/disk hybrid from the start.
</div>
</div>
</div>
</div>
</div>

---

## Section 7: Query Optimization

### Query Planning and Execution

<span style="color: #16a34a; font-weight: 600;">Query optimization</span> in in-memory databases differs from disk-based systems because I/O is not the bottleneck - instead, we optimize for CPU cache efficiency and memory access patterns.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<div style="font-weight: 700; color: #1e293b; font-size: 18px; text-align: center; margin-bottom: 28px;">Query Execution Pipeline</div>

<div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; align-items: center;">

<div style="background: linear-gradient(180deg, #fee2e2 0%, #fef2f2 100%); border: 2px solid #ef4444; border-radius: 10px; padding: 14px 18px; text-align: center; min-width: 100px;">
<div style="color: #991b1b; font-weight: 700; font-size: 12px;">Parse</div>
<div style="color: #7f1d1d; font-size: 10px; margin-top: 4px;">Command validation</div>
</div>

<div style="color: #94a3b8; font-size: 20px;">→</div>

<div style="background: linear-gradient(180deg, #fef3c7 0%, #fffbeb 100%); border: 2px solid #f59e0b; border-radius: 10px; padding: 14px 18px; text-align: center; min-width: 100px;">
<div style="color: #92400e; font-weight: 700; font-size: 12px;">Plan</div>
<div style="color: #78350f; font-size: 10px; margin-top: 4px;">Index selection</div>
</div>

<div style="color: #94a3b8; font-size: 20px;">→</div>

<div style="background: linear-gradient(180deg, #dcfce7 0%, #f0fdf4 100%); border: 2px solid #22c55e; border-radius: 10px; padding: 14px 18px; text-align: center; min-width: 100px;">
<div style="color: #166534; font-weight: 700; font-size: 12px;">Optimize</div>
<div style="color: #14532d; font-size: 10px; margin-top: 4px;">Cost estimation</div>
</div>

<div style="color: #94a3b8; font-size: 20px;">→</div>

<div style="background: linear-gradient(180deg, #dbeafe 0%, #eff6ff 100%); border: 2px solid #3b82f6; border-radius: 10px; padding: 14px 18px; text-align: center; min-width: 100px;">
<div style="color: #1e40af; font-weight: 700; font-size: 12px;">Execute</div>
<div style="color: #1e3a8a; font-size: 10px; margin-top: 4px;">Data retrieval</div>
</div>

<div style="color: #94a3b8; font-size: 20px;">→</div>

<div style="background: linear-gradient(180deg, #f3e8ff 0%, #faf5ff 100%); border: 2px solid #a855f7; border-radius: 10px; padding: 14px 18px; text-align: center; min-width: 100px;">
<div style="color: #6b21a8; font-weight: 700; font-size: 12px;">Return</div>
<div style="color: #581c87; font-size: 10px; margin-top: 4px;">Serialize result</div>
</div>

</div>
</div>

### Index Selection Strategy

```python
from enum import Enum
from typing import List, Optional, Dict, Any, Tuple
from dataclasses import dataclass

class QueryType(Enum):
    POINT = "point"       # Exact key match
    RANGE = "range"       # Between, >, <
    PREFIX = "prefix"     # LIKE 'abc%'
    SCAN = "scan"         # Full scan (worst case)

@dataclass
class QueryPlan:
    """
    Query execution plan with cost estimation.

    In-memory databases optimize for:
    1. Minimize memory accesses (cache misses are expensive)
    2. Maximize sequential access (prefetcher-friendly)
    3. Avoid full scans on large datasets
    """
    query_type: QueryType
    index_name: Optional[str]
    estimated_rows: int
    estimated_cost: float  # Abstract cost units
    access_pattern: str

    def __repr__(self):
        return (f"QueryPlan(type={self.query_type.value}, "
                f"index={self.index_name}, "
                f"est_rows={self.estimated_rows}, "
                f"cost={self.estimated_cost:.2f})")

class QueryOptimizer:
    """
    Simple query optimizer for in-memory database.

    Key principles:
    1. Use index if selectivity > threshold (typically 10-20%)
    2. Prefer hash index for equality, B-tree for range
    3. Consider index intersection for complex predicates

    See [[storage]](/system-design/storage) for disk-based optimization.
    """

    # Cost model constants (tuned for in-memory access)
    HASH_LOOKUP_COST = 1.0
    BTREE_LOOKUP_COST = 3.0  # O(log n) tree traversal
    SCAN_PER_ROW_COST = 0.1  # Sequential access is fast
    RANDOM_ACCESS_MULTIPLIER = 5.0  # Cache miss penalty

    def __init__(self, stats: Dict[str, 'TableStats']):
        self.stats = stats

    def plan_query(self, table: str, predicates: List['Predicate'],
                   indexes: Dict[str, 'IndexInfo']) -> QueryPlan:
        """
        Generate optimal query plan.

        Steps:
        1. Enumerate possible access paths
        2. Estimate cost of each path
        3. Select minimum cost path
        """
        table_stats = self.stats.get(table)
        if not table_stats:
            return self._plan_full_scan(table, table_stats)

        candidates = []

        for pred in predicates:
            # Check for matching index
            if pred.column in indexes:
                idx = indexes[pred.column]
                plan = self._plan_index_access(pred, idx, table_stats)
                candidates.append(plan)

        # Always consider full scan
        candidates.append(self._plan_full_scan(table, table_stats))

        # Select minimum cost
        return min(candidates, key=lambda p: p.estimated_cost)

    def _plan_index_access(self, pred: 'Predicate',
                           idx: 'IndexInfo',
                           stats: 'TableStats') -> QueryPlan:
        """Plan query using index access."""

        if pred.operator == '=' and idx.type == 'hash':
            # Hash index for equality - best case
            return QueryPlan(
                query_type=QueryType.POINT,
                index_name=idx.name,
                estimated_rows=1,
                estimated_cost=self.HASH_LOOKUP_COST,
                access_pattern="Hash lookup"
            )

        if pred.operator in ('=', '>', '<', 'BETWEEN') and idx.type == 'btree':
            # B-tree index for range
            selectivity = self._estimate_selectivity(pred, stats)
            estimated_rows = int(stats.row_count * selectivity)

            cost = (self.BTREE_LOOKUP_COST +
                   estimated_rows * self.SCAN_PER_ROW_COST)

            return QueryPlan(
                query_type=QueryType.RANGE if pred.operator != '=' else QueryType.POINT,
                index_name=idx.name,
                estimated_rows=estimated_rows,
                estimated_cost=cost,
                access_pattern=f"B-tree {pred.operator} scan"
            )

        # Index exists but not optimal for this predicate
        return self._plan_full_scan(pred.column, stats)

    def _plan_full_scan(self, table: str,
                        stats: Optional['TableStats']) -> QueryPlan:
        """Plan full table scan (fallback)."""
        row_count = stats.row_count if stats else 10000

        return QueryPlan(
            query_type=QueryType.SCAN,
            index_name=None,
            estimated_rows=row_count,
            estimated_cost=row_count * self.SCAN_PER_ROW_COST,
            access_pattern="Full scan"
        )

    def _estimate_selectivity(self, pred: 'Predicate',
                              stats: 'TableStats') -> float:
        """
        Estimate fraction of rows matching predicate.

        Techniques:
        1. Histograms for value distribution
        2. Min/max for range estimation
        3. NDV (number of distinct values) for equality
        """
        if pred.operator == '=':
            # Assume uniform distribution
            ndv = stats.distinct_values.get(pred.column, stats.row_count)
            return 1.0 / ndv

        if pred.operator in ('>', '<', 'BETWEEN'):
            # Simple linear interpolation based on min/max
            # Production systems use histograms
            return 0.1  # Conservative estimate

        return 0.5  # Unknown operator

@dataclass
class Predicate:
    column: str
    operator: str
    value: Any

@dataclass
class IndexInfo:
    name: str
    type: str  # 'hash' or 'btree'
    columns: List[str]

@dataclass
class TableStats:
    row_count: int
    distinct_values: Dict[str, int]
```

### Memory-Efficient Query Execution

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; margin-bottom: 12px;">Design Principle: Streaming vs Materialization</div>
<div style="color: #1e3a8a; font-size: 14px; line-height: 1.8;">
For complex queries with multiple operations (filter, sort, aggregate), choose between:

<div style="display: flex; gap: 16px; margin-top: 12px; flex-wrap: wrap;">
<div style="flex: 1; min-width: 200px; background: #fff; padding: 12px; border-radius: 8px;">
<div style="font-weight: 600; color: #1e40af; font-size: 13px;">Materialization</div>
<div style="font-size: 12px; color: #3b82f6; margin-top: 4px;">Store intermediate results. Simpler but uses O(n) memory.</div>
</div>
<div style="flex: 1; min-width: 200px; background: #fff; padding: 12px; border-radius: 8px;">
<div style="font-weight: 600; color: #1e40af; font-size: 13px;">Streaming/Pipelining</div>
<div style="font-size: 12px; color: #3b82f6; margin-top: 4px;">Process row-by-row. O(1) memory but can't backtrack.</div>
</div>
</div>
</div>
</div>

```python
from typing import Iterator, Callable, Any, List
from abc import ABC, abstractmethod

class QueryOperator(ABC):
    """
    Volcano-style query operator (iterator model).

    Each operator implements open/next/close interface.
    Data flows upward through operator tree, one row at a time.

    Benefits:
    1. Memory efficient - O(1) for most operators
    2. Pipelining - no intermediate materialization
    3. Short-circuit - can stop early (LIMIT)
    """

    @abstractmethod
    def open(self) -> None:
        """Initialize operator state."""
        pass

    @abstractmethod
    def next(self) -> Optional[dict]:
        """Return next row or None if exhausted."""
        pass

    @abstractmethod
    def close(self) -> None:
        """Clean up resources."""
        pass

class ScanOperator(QueryOperator):
    """Scan all entries from primary store."""

    def __init__(self, store: dict):
        self._store = store
        self._iterator = None

    def open(self) -> None:
        self._iterator = iter(self._store.items())

    def next(self) -> Optional[dict]:
        try:
            key, entry = next(self._iterator)
            return {'_key': key, '_value': entry.value, '_entry': entry}
        except StopIteration:
            return None

    def close(self) -> None:
        self._iterator = None

class FilterOperator(QueryOperator):
    """Filter rows based on predicate."""

    def __init__(self, child: QueryOperator,
                 predicate: Callable[[dict], bool]):
        self._child = child
        self._predicate = predicate

    def open(self) -> None:
        self._child.open()

    def next(self) -> Optional[dict]:
        while True:
            row = self._child.next()
            if row is None:
                return None
            if self._predicate(row):
                return row

    def close(self) -> None:
        self._child.close()

class ProjectOperator(QueryOperator):
    """Project specific columns from rows."""

    def __init__(self, child: QueryOperator, columns: List[str]):
        self._child = child
        self._columns = columns

    def open(self) -> None:
        self._child.open()

    def next(self) -> Optional[dict]:
        row = self._child.next()
        if row is None:
            return None
        return {col: row.get(col) for col in self._columns}

    def close(self) -> None:
        self._child.close()

class LimitOperator(QueryOperator):
    """Return at most N rows."""

    def __init__(self, child: QueryOperator, limit: int):
        self._child = child
        self._limit = limit
        self._count = 0

    def open(self) -> None:
        self._child.open()
        self._count = 0

    def next(self) -> Optional[dict]:
        if self._count >= self._limit:
            return None
        row = self._child.next()
        if row:
            self._count += 1
        return row

    def close(self) -> None:
        self._child.close()

class SortOperator(QueryOperator):
    """
    Sort rows by key.

    NOTE: This MUST materialize - O(n) memory.
    In-memory DBs often avoid sorting by using ordered indexes.
    """

    def __init__(self, child: QueryOperator,
                 sort_key: Callable[[dict], Any],
                 descending: bool = False):
        self._child = child
        self._sort_key = sort_key
        self._descending = descending
        self._sorted_rows = []
        self._index = 0

    def open(self) -> None:
        self._child.open()

        # Materialize all rows (unavoidable for sorting)
        rows = []
        while True:
            row = self._child.next()
            if row is None:
                break
            rows.append(row)

        self._sorted_rows = sorted(
            rows,
            key=self._sort_key,
            reverse=self._descending
        )
        self._index = 0

    def next(self) -> Optional[dict]:
        if self._index >= len(self._sorted_rows):
            return None
        row = self._sorted_rows[self._index]
        self._index += 1
        return row

    def close(self) -> None:
        self._child.close()
        self._sorted_rows = []

# Example: Build query execution tree
def example_query_execution(store: dict):
    """
    Example: Get top 10 users by age > 21, sorted by score

    Execution tree:
        Limit(10)
            |
        Sort(score DESC)
            |
        Filter(age > 21)
            |
        Scan(users)
    """
    scan = ScanOperator(store)
    filtered = FilterOperator(scan, lambda r: r.get('age', 0) > 21)
    sorted_op = SortOperator(filtered, lambda r: r.get('score', 0), descending=True)
    limited = LimitOperator(sorted_op, 10)

    # Execute
    results = []
    limited.open()
    while True:
        row = limited.next()
        if row is None:
            break
        results.append(row)
    limited.close()

    return results
```

### Interview Questions: Query Optimization

<div style="background: linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%); border: 2px solid #d946ef; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #86198f; font-weight: 700; font-size: 16px; margin-bottom: 20px;">Level 1: Foundational Understanding</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #c026d3; font-weight: 600;">Q: When would a full table scan be faster than using an index in an in-memory database?</div>
<div style="color: #701a75; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> When the query would return most of the table (>20-30%). Index lookup requires: (1) B-tree traversal O(log n), then (2) random access to each matching row. Full scan is sequential O(n) but <span style="color: #16a34a; font-weight: 600;">cache-friendly</span> - CPU prefetcher works well. Also when the table is small (<1000 rows), index overhead exceeds benefit. Modern optimizers use <span style="color: #16a34a; font-weight: 600;">selectivity estimation</span> to choose.
</div>
</div>

<div style="background: linear-gradient(135deg, #fae8ff 0%, #f5d0fe 100%); border: 2px solid #e879f9; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #a21caf; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 2: Implementation Depth</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #d946ef; font-weight: 600;">Q: How would you implement index intersection for queries with multiple predicates?</div>
<div style="color: #86198f; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> For query "WHERE age > 30 AND city = 'NYC'": (1) Use age B-tree index to get matching row IDs (Set A). (2) Use city hash index to get matching row IDs (Set B). (3) Compute A intersect B - this gives final candidates. (4) Fetch actual rows only for intersection. Key optimization: Start with more selective predicate (city = 'NYC' likely returns fewer rows). For <span style="color: #16a34a; font-weight: 600;">bitmap indexes</span>, intersection is just AND operation on bit vectors - very fast. Trade-off: Index intersection needs random access to multiple indexes, sometimes sequential scan + filter is faster.
</div>
</div>

<div style="background: linear-gradient(135deg, #f5d0fe 0%, #f0abfc 100%); border: 2px solid #d946ef; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #a21caf; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 3: Production Considerations</div>

<div style="background: #fff; border-radius: 8px; padding: 16px;">
<div style="color: #e879f9; font-weight: 600;">Q: How do you handle query optimization when statistics are stale or unavailable?</div>
<div style="color: #86198f; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Multiple strategies: (1) <span style="color: #16a34a; font-weight: 600;">Adaptive execution</span>: Start with estimated plan, collect actual statistics during execution, re-optimize mid-query if estimates were very wrong. (2) <span style="color: #16a34a; font-weight: 600;">Background statistics collection</span>: Sample table periodically (Redis scans 10 random keys/100ms for info commands). (3) <span style="color: #16a34a; font-weight: 600;">Conservative defaults</span>: Assume 10% selectivity for unknown predicates. (4) <span style="color: #16a34a; font-weight: 600;">Hybrid plans</span>: For uncertain cases, prepare both indexed and scan plans, choose at runtime based on first few rows. PostgreSQL uses "Generic" vs "Custom" plans. (5) <span style="color: #16a34a; font-weight: 600;">Query hints</span>: Let developers force specific access paths when they know better than optimizer.
</div>
</div>
</div>
</div>
</div>

---

## Section 8: Comprehensive Interview Deep-Dive

This section presents a complete 3-level recursive interview covering all aspects of in-memory database design.

<div style="background: #f8fafc; border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #e2e8f0;">
<div style="color: #1e293b; font-weight: 700; font-size: 20px; margin-bottom: 20px; text-align: center;">Master Interview: In-Memory Database Architecture</div>
<div style="color: #94a3b8; font-size: 14px; text-align: center;">The following simulates a deep-dive technical interview covering all major topics</div>
</div>

### Core Architecture Questions

<div style="background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%); border: 2px solid #14b8a6; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #0f766e; font-weight: 700; font-size: 16px; margin-bottom: 20px;">Level 1: System Design Foundation</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #0d9488; font-weight: 600;">Q: Walk me through how you would design the core architecture of an in-memory database from scratch.</div>
<div style="color: #134e4a; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> I would design it in layers:

**1. Storage Layer:** Primary <span style="color: #16a34a; font-weight: 600;">hash table</span> for O(1) key-value operations. Each entry contains: value, data type, TTL metadata, and access statistics for eviction. Using slots (Python) or packed structs to minimize per-entry overhead.

**2. Index Layer:** Optional <span style="color: #16a34a; font-weight: 600;">secondary indexes</span> - B+ trees for range queries, radix trees for prefix matching, skip lists for sorted sets. TTL heap (min-heap) for expiration management.

**3. Transaction Layer:** Stack-based nested transactions with <span style="color: #16a34a; font-weight: 600;">copy-on-write snapshots</span> per modified key. Support BEGIN/COMMIT/ROLLBACK with merge semantics for nested commits.

**4. Persistence Layer (optional):** WAL for durability with configurable fsync policy. Periodic RDB snapshots using fork() for copy-on-write consistency.

**5. Concurrency Layer:** Single-threaded event loop (Redis model) OR RLock-based thread safety. Single-threaded avoids locking complexity and is surprisingly performant for memory-bound workloads.
</div>
</div>

<div style="background: linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%); border: 2px solid #2dd4bf; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #0f766e; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 2: Deep Implementation</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #14b8a6; font-weight: 600;">Q: You mentioned copy-on-write snapshots. Explain exactly how nested transaction rollback works when the same key is modified at multiple nesting levels.</div>
<div style="color: #115e59; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Let me trace through an example:

```
Initial: x = 5
1. BEGIN (outer)    - outer.snapshot = {}
2. SET x = 10       - outer.snapshot[x] = 5, store[x] = 10
3. BEGIN (inner)    - inner.snapshot = {}
4. SET x = 15       - inner.snapshot[x] = 10, store[x] = 15
5. SET x = 20       - (no action - inner already has x)
6. ROLLBACK inner   - restore store[x] = inner.snapshot[x] = 10
7. Result: x = 10   - outer transaction's value preserved
```

Key insight: Each transaction level records the value from BEFORE that transaction started, not the original value. On rollback, we restore from that level's snapshot. On commit, we merge the child's original values into the parent (in case parent hasn't touched those keys yet).

This is <span style="color: #16a34a; font-weight: 600;">O(modified_keys)</span> per transaction, not O(all_keys), because we use lazy snapshotting - only capture on first write.
</div>
</div>

<div style="background: linear-gradient(135deg, #99f6e4 0%, #5eead4 100%); border: 2px solid #14b8a6; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #0f766e; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 3: Edge Cases and Production</div>

<div style="background: #fff; border-radius: 8px; padding: 16px;">
<div style="color: #2dd4bf; font-weight: 600;">Q: What happens if a transaction modifies millions of keys? How would you optimize for memory during large transactions?</div>
<div style="color: #115e59; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> This is a real production concern. Options:

**1. Transaction Size Limits:** Enforce maximum keys per transaction. Fail early if exceeded. This is the simplest and what most systems do.

**2. Streaming Snapshots:** Instead of deep copying values, store references to immutable value objects. Values become copy-on-write at object level. More complex but O(1) per key.

**3. <span style="color: #16a34a; font-weight: 600;">Command Logging</span>:** Instead of value snapshots, log the inverse operation: SET x = 10 -> log "SET x = 5" (old value). Rollback replays log in reverse. O(operations) memory, not O(key_size).

**4. Checkpoint-Based:** For very large transactions, checkpoint to disk periodically. Rollback replays from checkpoint + memory log. Trades disk I/O for memory.

**5. Two-Phase Transactions:** For distributed scenarios, use prepare/commit phases with WAL. This naturally bounds in-memory state. See [[distributed-locking]](/system-design/distributed-locking).

Redis limits MULTI/EXEC transactions by memory and simply fails if exceeded. For a custom implementation, I'd combine approach (1) with (3) - limit size and use command logging for better memory efficiency.
</div>
</div>
</div>
</div>
</div>

### TTL and Expiration Deep-Dive

<div style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border: 2px solid #f97316; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #9a3412; font-weight: 700; font-size: 16px; margin-bottom: 20px;">Level 1: Expiration Mechanisms</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #ea580c; font-weight: 600;">Q: Compare and contrast lazy expiration vs active expiration. When would you use each?</div>
<div style="color: #7c2d12; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong>

**<span style="color: #16a34a; font-weight: 600;">Lazy Expiration</span>:** Check TTL only when key is accessed. If expired, delete and return nil.
- Pros: Zero CPU overhead when idle, simplest to implement
- Cons: Expired keys consume memory until accessed, "memory leak" for cold data
- Use when: Low memory pressure, most keys are accessed regularly

**<span style="color: #16a34a; font-weight: 600;">Active Expiration</span>:** Background thread periodically scans for expired keys.
- Pros: Memory reclaimed promptly, bounded memory overhead from expired keys
- Cons: CPU cost even when idle, can cause latency if not throttled
- Use when: High memory pressure, many keys with TTL, cold data common

**<span style="color: #16a34a; font-weight: 600;">Hybrid (Redis)</span>:** Combine both - lazy check on access + probabilistic background cleanup.
- Best of both worlds with complexity tradeoff
- Use when: Production systems with SLA requirements
</div>
</div>

<div style="background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%); border: 2px solid #fb923c; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #c2410c; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 2: Implementation Complexity</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #f97316; font-weight: 600;">Q: The TTL heap can have stale entries when keys are deleted or TTL is updated. How do you prevent unbounded heap growth?</div>
<div style="color: #9a3412; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Three strategies with different trade-offs:

**1. <span style="color: #16a34a; font-weight: 600;">Lazy Cleanup</span> (Redis approach):**
- When popping from heap, verify key exists AND TTL matches
- Stale entries are discarded, not processed
- Heap can grow up to O(total_operations) in worst case
- Simple, works well if TTL updates are rare

**2. Indexed Heap with Update/Delete:**
- Maintain hash map: key -> heap_position
- When TTL changes, update heap entry in-place O(log n)
- No stale entries, but more complex
- Extra O(n) memory for position tracking

**3. <span style="color: #16a34a; font-weight: 600;">Periodic Rebuild</span>:**
- Track stale_ratio = stale_entries / total_entries
- When ratio > threshold (e.g., 50%), rebuild heap from scratch
- O(n) periodic cost, but amortized O(1)
- Good for workloads with many TTL updates

I'd recommend (1) for most cases with (3) as safeguard. Production Redis uses (1) with monitoring.
</div>
</div>

<div style="background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%); border: 2px solid #f97316; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #c2410c; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 3: Distributed Considerations</div>

<div style="background: #fff; border-radius: 8px; padding: 16px;">
<div style="color: #fb923c; font-weight: 600;">Q: In a replicated setup, how should TTL expiration be coordinated between primary and replicas?</div>
<div style="color: #9a3412; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> This is tricky due to <span style="color: #16a34a; font-weight: 600;">clock skew</span> between nodes. Options:

**1. Primary-Driven Expiration (Redis approach):**
- Primary runs expiration logic, sends explicit DEL commands to replicas
- Replicas DON'T independently expire, wait for master DEL
- BUT: Replicas return nil for expired keys on read (read-only lazy check)
- Pros: Consistency guaranteed, no clock sync needed
- Cons: Replication lag means replica may serve expired data briefly

**2. Logical Timestamps:**
- Include logical clock in TTL metadata
- Expire based on logical time, not wall clock
- Requires vector clock or similar for causality
- Complex but clock-skew immune

**3. Loose Coupling (Memcached approach):**
- Each node expires independently
- Accept that nodes may have different views briefly
- Works for caching (TTL is hint, not guarantee)
- Simple but inconsistent

For a database (vs cache), I'd use option (1). The brief inconsistency window is acceptable, and it's much simpler than logical timestamps. Reads on replica for expired keys returning nil is actually correct behavior - they're logically expired even if not yet deleted.
</div>
</div>
</div>
</div>
</div>

### Persistence Strategy Deep-Dive

<div style="background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%); border: 2px solid #ec4899; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #9d174d; font-weight: 700; font-size: 16px; margin-bottom: 20px;">Level 1: Durability Fundamentals</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #db2777; font-weight: 600;">Q: Explain the trade-off between AOF fsync policies: always, every-second, and never.</div>
<div style="color: #831843; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong>

| Policy | Data Loss Risk | Throughput | Use Case |
|--------|---------------|------------|----------|
| **always** | ~0 (disk failure only) | 100-1000 ops/s | Financial, audit logs |
| **everysec** | Up to 1 second | 10K-100K ops/s | Most applications |
| **no** | OS buffer (~30s) | 100K+ ops/s | Caching, rebuilable data |

<span style="color: #16a34a; font-weight: 600;">Key insight:</span> fsync() is expensive because it forces data to stable storage. SSDs: ~100us. HDDs: ~10ms. Without fsync, data may be in OS buffer cache, lost on power failure.

**everysec** is the sweet spot - you accept losing the last second of data in exchange for 100x better throughput. Most applications can tolerate this. For the rare cases needing true durability, use **always** or external transaction coordinator.
</div>
</div>

<div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border: 2px solid #f472b6; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #be185d; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 2: Implementation Details</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #ec4899; font-weight: 600;">Q: How does fork()-based snapshotting work, and what are the memory implications?</div>
<div style="color: #9d174d; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> fork() creates a child process with <span style="color: #16a34a; font-weight: 600;">copy-on-write (COW)</span> semantics:

**1. Initial State:** Parent and child share all memory pages (marked read-only in page tables)

**2. On Write by Parent:** OS intercepts write, copies page to new location, then allows write. Child still sees original page.

**3. Child Writes Snapshot:** Iterates through shared memory, writes to file. Sees consistent point-in-time view.

**Memory Implications:**
- Best case: Child reads, parent reads → 0 extra memory
- Worst case: Parent modifies every page during save → 2x memory
- Typical case: 10-30% memory spike during save

**Pitfalls:**
- <span style="color: #16a34a; font-weight: 600;">Transparent Huge Pages (THP)</span>: COW copies 2MB at a time instead of 4KB. Can cause massive memory spikes. Disable THP for Redis.
- Long-running saves with heavy writes: Memory keeps growing. Monitor and alert.
- Fork() itself takes O(n) time for page table copy (though memory is shared)
</div>
</div>

<div style="background: linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 100%); border: 2px solid #ec4899; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #be185d; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 3: Failure Scenarios</div>

<div style="background: #fff; border-radius: 8px; padding: 16px;">
<div style="color: #f472b6; font-weight: 600;">Q: Walk me through recovery from: (1) crash during AOF write, (2) crash during RDB save, (3) corrupt AOF file mid-way.</div>
<div style="color: #9d174d; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong>

**1. Crash During AOF Write:**
- AOF uses append-only, so partial write is always at the end
- On recovery: read file until first parse error, truncate there
- Lost: partial last entry (bounded data loss)
- Optional: checksum per entry for corruption detection

**2. Crash During RDB Save:**
- RDB writes to temp file first, atomic rename on completion
- If crash: temp file exists, old RDB intact
- Recovery: load old RDB, replay any AOF after RDB timestamp
- Lost: changes since last successful RDB (could be significant)

**3. Corrupt AOF Mid-way (disk error, bit rot):**
- <span style="color: #16a34a; font-weight: 600;">Checksum verification</span> detects corruption during replay
- Options: (a) Stop at corruption point, (b) Skip corrupt entry and continue
- redis-check-aof tool: fixes by truncating at corruption
- Best practice: Keep RDB snapshots + AOF. Corruption likely means data after RDB is questionable anyway.

**Defense in Depth:**
1. Regular RDB snapshots (baseline)
2. AOF for incremental durability
3. Checksums for corruption detection
4. Replication for availability
5. Periodic backups to cold storage
</div>
</div>
</div>
</div>
</div>

### Concurrency and Threading

<div style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border: 2px solid #8b5cf6; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #5b21b6; font-weight: 700; font-size: 16px; margin-bottom: 20px;">Level 1: Concurrency Models</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #7c3aed; font-weight: 600;">Q: Redis is single-threaded yet handles 100K+ operations/second. How is this possible?</div>
<div style="color: #4c1d95; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Several factors combine to make single-threaded in-memory databases fast:

**1. <span style="color: #16a34a; font-weight: 600;">Memory-bound, not CPU-bound</span>:** Operations are simple (hash lookup, list append). CPU isn't the bottleneck - memory access is.

**2. No Lock Contention:** Zero overhead from locks, context switches, cache invalidation between cores.

**3. <span style="color: #16a34a; font-weight: 600;">Efficient Event Loop</span>:** epoll/kqueue handle thousands of connections with O(1) per event. Network I/O is non-blocking.

**4. Request Pipelining:** Clients can send multiple commands without waiting. Server batches responses.

**5. Simple Operations:** Most ops are O(1). Compare to SQL query planning, disk I/O, etc.

**The Reality:** Single core can do ~100K simple ops/second easily. If you need more, shard across instances (Redis Cluster). This is often simpler than complex multi-threaded synchronization.

**Redis 6+ Threading:** I/O threads for network handling. Core operations still single-threaded. Best of both worlds.
</div>
</div>

<div style="background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%); border: 2px solid #a78bfa; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #6d28d9; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 2: Lock Implementation</div>

<div style="background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
<div style="color: #8b5cf6; font-weight: 600;">Q: If you choose multi-threaded, explain why RLock is necessary instead of regular Lock for in-memory database.</div>
<div style="color: #5b21b6; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> <span style="color: #16a34a; font-weight: 600;">RLock (reentrant lock)</span> allows the same thread to acquire the lock multiple times:

```python
def set_with_ttl(key, value, ttl):
    with self._lock:  # First acquisition
        self.set(key, value)  # Contains: with self._lock
        self.expire(key, ttl)  # Contains: with self._lock
```

With regular Lock, the nested `with self._lock` in set() would deadlock - thread already holds the lock, can't acquire again.

**RLock behavior:**
- Same thread: Increments reference count, succeeds
- Different thread: Blocks until count reaches 0
- Each release decrements count

**Why needed for DB:**
1. Public methods call other public methods
2. Transaction operations (BEGIN in set, COMMIT) may nest
3. Internal helpers may need protection

**Alternative:** Use lock only at top-level public API, make all internal methods assume lock is held. Cleaner but error-prone.
</div>
</div>

<div style="background: linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%); border: 2px solid #8b5cf6; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #6d28d9; font-weight: 700; font-size: 14px; margin-bottom: 16px;">Level 3: Advanced Concurrency</div>

<div style="background: #fff; border-radius: 8px; padding: 16px;">
<div style="color: #a78bfa; font-weight: 600;">Q: How would you implement lock-free concurrent reads with single-writer semantics?</div>
<div style="color: #5b21b6; font-size: 13px; margin-top: 8px; line-height: 1.7;">
<strong>A:</strong> Use <span style="color: #16a34a; font-weight: 600;">Read-Copy-Update (RCU)</span> or <span style="color: #16a34a; font-weight: 600;">SeqLock</span> pattern:

**SeqLock Approach:**
```python
class SeqLockStore:
    def __init__(self):
        self._seq = 0  # Even = unlocked, Odd = locked
        self._data = {}

    def read(self, key):
        while True:
            seq1 = self._seq
            if seq1 % 2 == 1:  # Writer active
                continue
            value = self._data.get(key)  # Read
            seq2 = self._seq
            if seq1 == seq2:  # No write during read
                return value

    def write(self, key, value):
        with self._write_lock:
            self._seq += 1  # Now odd (writing)
            self._data[key] = value
            self._seq += 1  # Now even (done)
```

**RCU Approach:**
1. Readers access data directly, no locks
2. Writers create new version, atomically swap pointer
3. Old version kept until all readers finish (grace period)
4. Used in Linux kernel, very efficient for read-heavy

**Trade-offs:**
- SeqLock: Simple, readers may retry during writes
- RCU: Complex, needs garbage collection for old versions
- Both: Single writer only (for multiple writers, still need write lock)

For in-memory DB, RCU with copy-on-write maps well to our transaction snapshot model.
</div>
</div>
</div>
</div>
</div>

---

## Related Topics

<div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px solid #0ea5e9; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #0c4a6e; font-weight: 700; font-size: 16px; margin-bottom: 16px;">Explore Further</div>

<div style="display: flex; flex-wrap: wrap; gap: 12px;">
<a href="/data-structures/hash-tables" style="background: #fff; border: 1px solid #7dd3fc; padding: 10px 16px; border-radius: 8px; text-decoration: none; color: #0369a1; font-weight: 500; font-size: 13px;">[[Hash Tables]]</a>
<a href="/data-structures/skip-list" style="background: #fff; border: 1px solid #7dd3fc; padding: 10px 16px; border-radius: 8px; text-decoration: none; color: #0369a1; font-weight: 500; font-size: 13px;">[[Skip Lists]]</a>
<a href="/system-design/caching" style="background: #fff; border: 1px solid #7dd3fc; padding: 10px 16px; border-radius: 8px; text-decoration: none; color: #0369a1; font-weight: 500; font-size: 13px;">[[Caching Strategies]]</a>
<a href="/system-design/storage" style="background: #fff; border: 1px solid #7dd3fc; padding: 10px 16px; border-radius: 8px; text-decoration: none; color: #0369a1; font-weight: 500; font-size: 13px;">[[Storage Systems]]</a>
<a href="/system-design/rate-limiting" style="background: #fff; border: 1px solid #7dd3fc; padding: 10px 16px; border-radius: 8px; text-decoration: none; color: #0369a1; font-weight: 500; font-size: 13px;">[[Rate Limiting]]</a>
<a href="/system-design/concurrency-patterns" style="background: #fff; border: 1px solid #7dd3fc; padding: 10px 16px; border-radius: 8px; text-decoration: none; color: #0369a1; font-weight: 500; font-size: 13px;">[[Concurrency Patterns]]</a>
<a href="/system-design/distributed-locking" style="background: #fff; border: 1px solid #7dd3fc; padding: 10px 16px; border-radius: 8px; text-decoration: none; color: #0369a1; font-weight: 500; font-size: 13px;">[[Distributed Locking]]</a>
<a href="/system-design/database-sharding" style="background: #fff; border: 1px solid #7dd3fc; padding: 10px 16px; border-radius: 8px; text-decoration: none; color: #0369a1; font-weight: 500; font-size: 13px;">[[Database Sharding]]</a>
<a href="/machine-coding/lru-cache" style="background: #fff; border: 1px solid #7dd3fc; padding: 10px 16px; border-radius: 8px; text-decoration: none; color: #0369a1; font-weight: 500; font-size: 13px;">[[LRU Cache]]</a>
<a href="/system-design/cap-theorem" style="background: #fff; border: 1px solid #7dd3fc; padding: 10px 16px; border-radius: 8px; text-decoration: none; color: #0369a1; font-weight: 500; font-size: 13px;">[[CAP Theorem]]</a>
</div>
</div>
