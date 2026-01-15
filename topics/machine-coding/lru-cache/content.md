# LRU Cache

## Problem Statement

Design and implement a Least Recently Used (LRU) cache with O(1) time complexity for both `get` and `put` operations.

## Why This Problem Matters

LRU Cache is one of the most asked machine coding questions because:
- **Real-world ubiquity:** Used in databases, operating systems, web browsers, CDNs
- **Data structure mastery:** Requires combining HashMap + Doubly Linked List
- **System design foundation:** Core component of caching layers
- **Complexity requirement:** Must achieve O(1) for both operations

## Mental Model & Thinking Process

### The Core Challenge

We need THREE capabilities simultaneously:
1. **O(1) Lookup:** Find if key exists and get its value
2. **O(1) Update Order:** Move accessed element to "most recent"
3. **O(1) Eviction:** Remove the "least recent" element

No single data structure provides all three. We need to **combine** them.

### The "Aha!" Moment

```
What gives O(1) lookup?          → HashMap
What tracks order with O(1) updates? → Doubly Linked List
What if we combine them?         → HashMap pointing to List Nodes!
```

### Why Doubly Linked List?

| Operation | Singly Linked | Doubly Linked |
|-----------|---------------|---------------|
| Add to front | O(1) | O(1) |
| Remove known node | O(n)* | O(1) |
| Find previous | O(n) | O(1) |

*Singly linked requires traversal to find the previous node

## Requirements

### Basic Requirements
- `get(key)`: Return value if exists, -1 otherwise. Mark as recently used.
- `put(key, value)`: Insert or update. Evict least recently used if at capacity.
- Both operations must be **O(1)**.

### Extended Requirements (Often Asked)
- Thread-safety for concurrent access
- TTL (Time-To-Live) support
- Statistics tracking (hit rate, miss rate)
- Bulk operations (getAll, putAll)

## Data Structure Design

### Core Components

```
┌────────────────────────────────────────────────────────────────┐
│                         LRU Cache                               │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│   HashMap: key → Node                                           │
│   ┌─────┬─────────────┐                                        │
│   │ key │ Node ptr    │                                        │
│   ├─────┼─────────────┤                                        │
│   │  1  │ ─────────────────────────────────┐                   │
│   │  2  │ ─────────────────────┐           │                   │
│   │  3  │ ──────────┐          │           │                   │
│   └─────┴───────────│──────────│───────────│────               │
│                     │          │           │                    │
│   Doubly Linked List (order):  │           │                    │
│                     ▼          ▼           ▼                    │
│   ┌──────┐    ┌──────────┐  ┌──────────┐  ┌──────────┐    ┌────┐│
│   │ HEAD │ ⟺ │ key:3    │⟺│ key:2    │⟺│ key:1    │ ⟺ │TAIL││
│   │(dummy)│   │ val:300  │  │ val:200  │  │ val:100  │    │    ││
│   └──────┘    └──────────┘  └──────────┘  └──────────┘    └────┘│
│               Most Recent                 Least Recent          │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### Why Dummy Head and Tail?

Dummy nodes eliminate edge cases:
- No null checks when adding to front
- No null checks when removing from end
- Consistent code for all operations

```python
# WITHOUT dummy nodes (error-prone):
def add_to_front(self, node):
    if self.head is None:
        self.head = self.tail = node
    else:
        node.next = self.head
        self.head.prev = node
        self.head = node

# WITH dummy nodes (clean):
def add_to_front(self, node):
    node.prev = self.head
    node.next = self.head.next
    self.head.next.prev = node
    self.head.next = node
```

## Approach & Implementation

### Python - Full Implementation with Comments

```python
class Node:
    """
    Doubly linked list node.
    Stores key (needed for HashMap cleanup on eviction) and value.
    """
    __slots__ = ['key', 'value', 'prev', 'next']  # Memory optimization

    def __init__(self, key: int = 0, value: int = 0):
        self.key = key
        self.value = value
        self.prev: 'Node' = None
        self.next: 'Node' = None


class LRUCache:
    """
    LRU Cache with O(1) get and put operations.

    Design Decisions:
    1. HashMap for O(1) lookup by key
    2. Doubly linked list for O(1) order updates
    3. Dummy head/tail to simplify edge cases
    4. Most recent at head, least recent before tail

    Time Complexity: O(1) for both get and put
    Space Complexity: O(capacity) for storing nodes
    """

    def __init__(self, capacity: int):
        """
        Initialize cache with given capacity.

        Args:
            capacity: Maximum number of items to store

        Raises:
            ValueError: If capacity <= 0
        """
        if capacity <= 0:
            raise ValueError("Capacity must be positive")

        self.capacity = capacity
        self.cache: dict[int, Node] = {}  # key -> Node

        # Dummy head and tail for easier list operations
        # Real nodes are between head and tail
        self.head = Node()  # Most recently used end
        self.tail = Node()  # Least recently used end
        self.head.next = self.tail
        self.tail.prev = self.head

    def _add_to_front(self, node: Node) -> None:
        """
        Add node right after head (mark as most recently used).

        Before: HEAD ⟺ A ⟺ B ⟺ TAIL
        After:  HEAD ⟺ node ⟺ A ⟺ B ⟺ TAIL
        """
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node: Node) -> None:
        """
        Remove node from its current position.
        Does NOT remove from HashMap - caller must handle that.

        Before: ... ⟺ A ⟺ node ⟺ B ⟺ ...
        After:  ... ⟺ A ⟺ B ⟺ ...
        """
        node.prev.next = node.next
        node.next.prev = node.prev

    def _move_to_front(self, node: Node) -> None:
        """
        Move existing node to front (mark as most recently used).
        Used when accessing an existing key.
        """
        self._remove_node(node)
        self._add_to_front(node)

    def _evict_lru(self) -> Node:
        """
        Remove and return the least recently used node.
        Caller must remove from HashMap.

        Returns the evicted node (for HashMap key lookup).
        """
        lru = self.tail.prev  # Node right before tail
        self._remove_node(lru)
        return lru

    def get(self, key: int) -> int:
        """
        Get value for key.

        Args:
            key: The key to look up

        Returns:
            Value if key exists, -1 otherwise

        Side Effect:
            Marks the key as most recently used (if exists)
        """
        if key not in self.cache:
            return -1

        node = self.cache[key]
        self._move_to_front(node)  # Mark as recently used
        return node.value

    def put(self, key: int, value: int) -> None:
        """
        Insert or update key-value pair.

        If key exists: Update value and mark as recently used
        If key doesn't exist:
            - If at capacity: Evict LRU item first
            - Add new item as most recently used

        Args:
            key: The key to insert/update
            value: The value to store
        """
        if key in self.cache:
            # Update existing
            node = self.cache[key]
            node.value = value
            self._move_to_front(node)
        else:
            # Add new
            if len(self.cache) >= self.capacity:
                # Evict LRU
                lru = self._evict_lru()
                del self.cache[lru.key]  # Remove from HashMap

            # Create and add new node
            node = Node(key, value)
            self.cache[key] = node
            self._add_to_front(node)

    def __len__(self) -> int:
        """Return current cache size."""
        return len(self.cache)

    def __contains__(self, key: int) -> bool:
        """Check if key exists (without marking as used)."""
        return key in self.cache

    def peek(self, key: int) -> int:
        """Get value without marking as recently used."""
        if key not in self.cache:
            return -1
        return self.cache[key].value

    def debug_state(self) -> str:
        """Return string representation of cache state for debugging."""
        items = []
        node = self.head.next
        while node != self.tail:
            items.append(f"({node.key}:{node.value})")
            node = node.next
        return f"[MRU] {' ⟺ '.join(items)} [LRU]"


# Usage Example
if __name__ == "__main__":
    cache = LRUCache(2)

    cache.put(1, 1)
    print(f"After put(1,1): {cache.debug_state()}")
    # [MRU] (1:1) [LRU]

    cache.put(2, 2)
    print(f"After put(2,2): {cache.debug_state()}")
    # [MRU] (2:2) ⟺ (1:1) [LRU]

    print(f"get(1) = {cache.get(1)}")  # 1
    print(f"After get(1): {cache.debug_state()}")
    # [MRU] (1:1) ⟺ (2:2) [LRU]  (1 moved to front)

    cache.put(3, 3)  # Evicts key 2 (LRU)
    print(f"After put(3,3): {cache.debug_state()}")
    # [MRU] (3:3) ⟺ (1:1) [LRU]

    print(f"get(2) = {cache.get(2)}")  # -1 (was evicted)
```

### Python - Using OrderedDict (Cleaner but Less Educational)

```python
from collections import OrderedDict


class LRUCacheSimple:
    """
    LRU Cache using Python's OrderedDict.

    OrderedDict maintains insertion order AND supports move_to_end().
    This is the "Pythonic" way but hides the underlying mechanism.

    Good for:
    - Production code where correctness > education
    - Interviews where time is limited

    Less ideal for:
    - Demonstrating data structure knowledge
    - Interviews that want to see the underlying implementation
    """

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        # Move to end (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            # Update and move to end
            self.cache.move_to_end(key)
            self.cache[key] = value
        else:
            if len(self.cache) >= self.capacity:
                # Remove first item (least recently used)
                self.cache.popitem(last=False)
            self.cache[key] = value
```

### Go - Full Implementation

```go
package main

import (
	"fmt"
	"sync"
)

// Node represents a doubly linked list node
type Node struct {
	key, value int
	prev, next *Node
}

// LRUCache implements an LRU cache with O(1) operations
type LRUCache struct {
	capacity int
	cache    map[int]*Node
	head     *Node // Dummy head (MRU end)
	tail     *Node // Dummy tail (LRU end)
	mu       sync.RWMutex // For thread-safety (optional)
}

// Constructor creates a new LRU Cache
func Constructor(capacity int) LRUCache {
	head := &Node{}
	tail := &Node{}
	head.next = tail
	tail.prev = head

	return LRUCache{
		capacity: capacity,
		cache:    make(map[int]*Node),
		head:     head,
		tail:     tail,
	}
}

// addToFront adds a node right after head
func (c *LRUCache) addToFront(node *Node) {
	node.prev = c.head
	node.next = c.head.next
	c.head.next.prev = node
	c.head.next = node
}

// removeNode removes a node from its current position
func (c *LRUCache) removeNode(node *Node) {
	node.prev.next = node.next
	node.next.prev = node.prev
}

// moveToFront moves an existing node to the front
func (c *LRUCache) moveToFront(node *Node) {
	c.removeNode(node)
	c.addToFront(node)
}

// evictLRU removes and returns the LRU node
func (c *LRUCache) evictLRU() *Node {
	lru := c.tail.prev
	c.removeNode(lru)
	return lru
}

// Get returns value for key (-1 if not found)
func (c *LRUCache) Get(key int) int {
	c.mu.RLock()
	node, exists := c.cache[key]
	c.mu.RUnlock()

	if !exists {
		return -1
	}

	c.mu.Lock()
	c.moveToFront(node)
	c.mu.Unlock()

	return node.value
}

// Put inserts or updates a key-value pair
func (c *LRUCache) Put(key int, value int) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if node, exists := c.cache[key]; exists {
		// Update existing
		node.value = value
		c.moveToFront(node)
		return
	}

	// Add new
	if len(c.cache) >= c.capacity {
		// Evict LRU
		lru := c.evictLRU()
		delete(c.cache, lru.key)
	}

	node := &Node{key: key, value: value}
	c.cache[key] = node
	c.addToFront(node)
}

// Size returns current cache size
func (c *LRUCache) Size() int {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return len(c.cache)
}

// DebugState returns a string representation for debugging
func (c *LRUCache) DebugState() string {
	c.mu.RLock()
	defer c.mu.RUnlock()

	result := "[MRU] "
	node := c.head.next
	for node != c.tail {
		result += fmt.Sprintf("(%d:%d) ", node.key, node.value)
		node = node.next
	}
	result += "[LRU]"
	return result
}

func main() {
	cache := Constructor(2)

	cache.Put(1, 1)
	fmt.Println(cache.DebugState())

	cache.Put(2, 2)
	fmt.Println(cache.DebugState())

	fmt.Printf("get(1) = %d\n", cache.Get(1))
	fmt.Println(cache.DebugState())

	cache.Put(3, 3) // Evicts 2
	fmt.Println(cache.DebugState())

	fmt.Printf("get(2) = %d\n", cache.Get(2)) // -1

	cache.Put(4, 4) // Evicts 1
	fmt.Println(cache.DebugState())

	fmt.Printf("get(1) = %d\n", cache.Get(1)) // -1
	fmt.Printf("get(3) = %d\n", cache.Get(3)) // 3
	fmt.Printf("get(4) = %d\n", cache.Get(4)) // 4
}
```

## Complexity Analysis

| Operation | Time | Space | Notes |
|-----------|------|-------|-------|
| get() | O(1) | O(1) | HashMap lookup + list update |
| put() | O(1) | O(1) | HashMap insert + list update |
| Overall | O(1) | O(n) | n = capacity |

### Why O(1)?

```
get(key):
  1. HashMap lookup: O(1)
  2. Move node to front (remove + add): O(1)
  Total: O(1)

put(key, value):
  1. HashMap lookup: O(1)
  2. If exists: update + move to front: O(1)
  3. If new:
     a. Evict LRU (remove from list + HashMap): O(1)
     b. Add new (add to list + HashMap): O(1)
  Total: O(1)
```

## Pros and Cons

### Pros

| Advantage | Explanation |
|-----------|-------------|
| O(1) Operations | Both get and put are constant time |
| Memory Bounded | Never exceeds capacity |
| Predictable Behavior | LRU eviction is deterministic |
| Simple Concept | Easy to understand and explain |
| Widely Applicable | Used in many real systems |

### Cons

| Disadvantage | Explanation | Mitigation |
|--------------|-------------|------------|
| Memory Overhead | Each entry has prev/next pointers | Use array-based implementation for small caches |
| No TTL | Items don't expire by time | Implement TTL extension |
| Single-threaded | Basic impl not thread-safe | Add mutex/locks |
| LRU may not be optimal | Frequency matters sometimes | Use LFU or adaptive policy |
| Cold start | Empty cache has 100% miss rate | Implement cache warming |

## Common Extensions

### 1. Thread-Safe LRU Cache

```python
import threading

class ThreadSafeLRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head
        self._lock = threading.RLock()

    def get(self, key: int) -> int:
        with self._lock:
            if key not in self.cache:
                return -1
            node = self.cache[key]
            self._move_to_front(node)
            return node.value

    def put(self, key: int, value: int) -> None:
        with self._lock:
            # ... same as before
```

### 2. LRU Cache with TTL

```python
import time

class NodeWithTTL:
    def __init__(self, key, value, ttl_seconds):
        self.key = key
        self.value = value
        self.expires_at = time.time() + ttl_seconds
        self.prev = None
        self.next = None

    def is_expired(self) -> bool:
        return time.time() > self.expires_at


class LRUCacheWithTTL:
    def __init__(self, capacity: int, default_ttl: int = 3600):
        self.capacity = capacity
        self.default_ttl = default_ttl
        self.cache = {}
        # ... same structure

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        node = self.cache[key]
        if node.is_expired():
            self._remove_node(node)
            del self.cache[key]
            return -1

        self._move_to_front(node)
        return node.value

    def put(self, key: int, value: int, ttl: int = None) -> None:
        ttl = ttl or self.default_ttl
        # ... create NodeWithTTL instead of Node
```

### 3. LRU Cache with Statistics

```python
class LRUCacheWithStats:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        # ... same structure

        # Statistics
        self.hits = 0
        self.misses = 0
        self.evictions = 0

    def get(self, key: int) -> int:
        if key not in self.cache:
            self.misses += 1
            return -1

        self.hits += 1
        # ... rest same

    def put(self, key: int, value: int) -> None:
        # ... if evicting:
        #     self.evictions += 1

    def hit_rate(self) -> float:
        total = self.hits + self.misses
        return self.hits / total if total > 0 else 0.0

    def stats(self) -> dict:
        return {
            'hits': self.hits,
            'misses': self.misses,
            'evictions': self.evictions,
            'hit_rate': self.hit_rate(),
            'size': len(self.cache),
            'capacity': self.capacity,
        }
```

## Frequently Asked Questions (FAQ)

### Q1: Why use a doubly linked list instead of singly linked?

**Answer:** With a singly linked list, removing a known node requires O(n) to find the previous node. With a doubly linked list, we have `node.prev`, making removal O(1).

```
Singly Linked (O(n) removal):
  To remove node X, traverse from head until curr.next == X
  Then set curr.next = X.next

Doubly Linked (O(1) removal):
  X.prev.next = X.next
  X.next.prev = X.prev
```

---

### Q2: Why store key in the Node when HashMap already has it?

**Answer:** When evicting the LRU node, we need to remove it from both the list AND the HashMap. The node gives us O(1) access to the list position, but we need the key to remove from HashMap.

```python
# During eviction:
lru = self.tail.prev  # O(1) - get node from list
del self.cache[lru.key]  # Need the key for HashMap!
```

---

### Q3: Can I use an array instead of a linked list?

**Answer:** Yes, but with trade-offs:

| Approach | Pros | Cons |
|----------|------|------|
| Linked List | O(1) insert/delete | Memory overhead (pointers) |
| Array | Cache-friendly, less memory | O(n) to move elements |

For most uses, linked list is preferred due to O(1) operations.

---

### Q4: How is LRU Cache used in real systems?

**Answer:**

1. **CPU Cache:** Hardware LRU approximation for cache line eviction
2. **Web Browsers:** Page cache for back/forward navigation
3. **Databases:** Buffer pool management (PostgreSQL, MySQL)
4. **Operating Systems:** Page replacement algorithms
5. **CDNs:** Content caching at edge servers
6. **Redis:** `maxmemory-policy allkeys-lru`

---

### Q5: When is LRU NOT the best policy?

**Answer:** LRU isn't optimal when:

1. **Scan workloads:** Sequential scans evict frequently used items
   - Solution: LRU-K or 2Q
2. **Frequency matters:** Some items accessed rarely but are "hot"
   - Solution: LFU (Least Frequently Used)
3. **Predictable patterns:** Known access patterns
   - Solution: Custom eviction based on domain knowledge

---

### Q6: How do I make this thread-safe?

**Answer:** Several approaches:

1. **Coarse-grained lock:** Single mutex for all operations
2. **Fine-grained locks:** Separate locks for HashMap and list
3. **Read-Write lock:** RLock for reads, exclusive lock for writes
4. **Lock-free:** CAS operations (complex, advanced)

For most cases, a single RLock is sufficient and correct.

## Common Interview Questions

### Basic Level
1. Explain LRU Cache and its use cases
2. What data structures are needed and why?
3. Implement get() and put() operations
4. What is the time complexity?

### Intermediate Level
5. Why doubly linked list instead of singly linked?
6. Why store key in the node?
7. How would you make it thread-safe?
8. What are dummy head and tail? Why use them?

### Advanced Level
9. Implement LRU Cache with TTL
10. Compare LRU vs LFU - when to use each?
11. How would you implement this without using HashMap?
12. Design a distributed LRU Cache
13. What are the memory overhead considerations?

## Interview Tips

1. **Start by clarifying requirements:** O(1)? Thread-safe? TTL?
2. **Draw the data structure:** Visual helps understanding
3. **Explain the "why":** Why doubly linked list? Why HashMap?
4. **Handle edge cases:** Capacity 0? Empty cache? Update existing?
5. **Discuss trade-offs:** Memory overhead, thread-safety
6. **Mention alternatives:** OrderedDict, LFU, 2Q
7. **Test your code:** Walk through an example

## Related Topics

- [LFU Cache](/topic/machine-coding/lfu-cache) - Evict by frequency
- [Caching](/topic/system-design/caching) - System design perspective
- [Rate Limiter](/topic/machine-coding/rate-limiter) - Often uses cache
- [Time-Based Key-Value Store](/topic/machine-coding/time-key-value) - TTL variant

## Further Reading

- LeetCode 146: LRU Cache
- Redis documentation on eviction policies
- "Operating System Concepts" - Page Replacement Algorithms
- Google's "The Adaptive Replacement Cache" paper
