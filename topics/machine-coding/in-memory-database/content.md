# In-Memory Database Design

## Overview and Motivation

An in-memory database stores and manages data primarily in RAM rather than on disk, achieving microsecond-level latency for read/write operations. This machine coding problem tests your understanding of [[hash-tables]](/data-structures/hash-tables), [[concurrency]](/system-design/concurrency), transaction semantics, and memory management - skills directly applicable to building systems like Redis, Memcached, or the caching layer of any high-performance application.

<div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #475569;">
<div style="color: #f8fafc; font-weight: 700; font-size: 18px; margin-bottom: 16px;">Why This Problem Matters</div>
<div style="color: #cbd5e1; font-size: 14px; line-height: 1.9;">
<div style="margin-bottom: 12px;"><span style="color: #22d3ee; font-weight: 600;">Interview Frequency:</span> Asked at Amazon, Google, Stripe, and database companies (Redis Labs, MongoDB)</div>
<div style="margin-bottom: 12px;"><span style="color: #22d3ee; font-weight: 600;">Skills Tested:</span> Data structure selection, concurrent programming, transaction isolation, memory efficiency</div>
<div><span style="color: #22d3ee; font-weight: 600;">Real-World Relevance:</span> Understanding in-memory stores is crucial for caching strategies, session management, and high-throughput applications</div>
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

## Related Topics

<div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px solid #0ea5e9; border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #0c4a6e; font-weight: 700; font-size: 16px; margin-bottom: 16px;">Explore Further</div>

<div style="display: flex; flex-wrap: wrap; gap: 12px;">
<a href="/data-structures/hash-tables" style="background: #fff; border: 1px solid #7dd3fc; padding: 10px 16px; border-radius: 8px; text-decoration: none; color: #0369a1; font-weight: 500; font-size: 13px;">Hash Tables</a>
<a href="/data-structures/skip-list" style="background: #fff; border: 1px solid #7dd3fc; padding: 10px 16px; border-radius: 8px; text-decoration: none; color: #0369a1; font-weight: 500; font-size: 13px;">Skip Lists</a>
<a href="/system-design/caching" style="background: #fff; border: 1px solid #7dd3fc; padding: 10px 16px; border-radius: 8px; text-decoration: none; color: #0369a1; font-weight: 500; font-size: 13px;">Caching Strategies</a>
<a href="/system-design/storage" style="background: #fff; border: 1px solid #7dd3fc; padding: 10px 16px; border-radius: 8px; text-decoration: none; color: #0369a1; font-weight: 500; font-size: 13px;">Storage Systems</a>
<a href="/system-design/rate-limiting" style="background: #fff; border: 1px solid #7dd3fc; padding: 10px 16px; border-radius: 8px; text-decoration: none; color: #0369a1; font-weight: 500; font-size: 13px;">Rate Limiting</a>
<a href="/system-design/concurrency" style="background: #fff; border: 1px solid #7dd3fc; padding: 10px 16px; border-radius: 8px; text-decoration: none; color: #0369a1; font-weight: 500; font-size: 13px;">Concurrency Patterns</a>
</div>
</div>
