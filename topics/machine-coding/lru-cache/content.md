# LRU Cache

## Problem Statement

Design and implement a Least Recently Used (LRU) cache with O(1) time complexity for both `get` and `put` operations.

## Requirements

- `get(key)`: Return value if exists, -1 otherwise. Mark as recently used.
- `put(key, value)`: Insert or update. Evict least recently used if at capacity.
- Both operations must be O(1).

---

## Solution Breakdown

### Part 1: Understanding the Core Challenge

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

**The Key Insight**: We need TWO operations to be O(1):
1. **Lookup by key** → HashMap is perfect (O(1) average)
2. **Track access order + evict oldest** → Need ordered structure with O(1) removal

**The Problem**:
- Arrays: O(1) access but O(n) deletion
- Linked Lists: O(1) deletion but O(n) access
- HashMap alone: No ordering

**The Solution**: Combine both! HashMap for O(1) lookup + Doubly Linked List for O(1) order maintenance

</div>

### Part 2: Why Doubly Linked List? (Not Singly Linked)

<div style="background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

| Operation | Singly Linked | Doubly Linked |
|-----------|---------------|---------------|
| Remove node (given pointer) | O(n) - need to find prev | **O(1)** - have prev pointer |
| Insert at head | O(1) | O(1) |
| Remove from tail | O(n) - need to traverse | **O(1)** - tail.prev |

**Why this matters**: When we access a key via HashMap, we get a direct pointer to the node. With doubly linked list, we can remove it in O(1) without traversing.

</div>

### Part 3: The Data Structure Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center; font-size: 16px;">LRU Cache: HashMap + Doubly Linked List</h4>

<div style="display: flex; flex-direction: column; gap: 24px;">

<!-- HashMap Section -->
<div>
<div style="color: #7ee787; font-weight: bold; font-size: 13px; margin-bottom: 12px;">🗺️ HashMap (Key → Node Pointer)</div>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
<div style="background: #238636; padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 12px;">"A"</div>
<div style="color: #d1f5d3; font-size: 10px; margin-top: 4px;">→ Node 1</div>
</div>
<div style="background: #238636; padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 12px;">"B"</div>
<div style="color: #d1f5d3; font-size: 10px; margin-top: 4px;">→ Node 2</div>
</div>
<div style="background: #238636; padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 12px;">"C"</div>
<div style="color: #d1f5d3; font-size: 10px; margin-top: 4px;">→ Node 3</div>
</div>
<div style="background: #21262d; padding: 12px; border-radius: 8px; text-align: center; border: 2px dashed #30363d;">
<div style="color: #6e7681; font-size: 12px;">...</div>
</div>
</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 8px;">O(1) lookup: key → direct node access</div>
</div>

<!-- Arrows -->
<div style="text-align: center; color: #58a6ff; font-size: 24px;">↓ ↓ ↓</div>

<!-- Doubly Linked List Section -->
<div>
<div style="color: #a371f7; font-weight: bold; font-size: 13px; margin-bottom: 12px;">🔗 Doubly Linked List (Most Recent → Least Recent)</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">

<!-- Dummy Head -->
<div style="background: #21262d; padding: 12px 16px; border-radius: 8px; border: 2px dashed #30363d; text-align: center;">
<div style="color: #6e7681; font-size: 10px;">HEAD</div>
<div style="color: #6e7681; font-size: 10px;">(dummy)</div>
</div>

<div style="color: #58a6ff; font-size: 20px;">⟷</div>

<!-- Node 1 (Most Recent) -->
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">Node 1</div>
<div style="color: #a5d6ff; font-size: 10px;">"A": 100</div>
<div style="color: #7ee787; font-size: 9px; margin-top: 4px;">← Most Recent</div>
</div>

<div style="color: #58a6ff; font-size: 20px;">⟷</div>

<!-- Node 2 -->
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">Node 2</div>
<div style="color: #eddeff; font-size: 10px;">"B": 200</div>
</div>

<div style="color: #58a6ff; font-size: 20px;">⟷</div>

<!-- Node 3 (Least Recent) -->
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">Node 3</div>
<div style="color: #ffe2cc; font-size: 10px;">"C": 300</div>
<div style="color: #f85149; font-size: 9px; margin-top: 4px;">Least Recent →</div>
</div>

<div style="color: #58a6ff; font-size: 20px;">⟷</div>

<!-- Dummy Tail -->
<div style="background: #21262d; padding: 12px 16px; border-radius: 8px; border: 2px dashed #30363d; text-align: center;">
<div style="color: #6e7681; font-size: 10px;">TAIL</div>
<div style="color: #6e7681; font-size: 10px;">(dummy)</div>
</div>

</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 8px; text-align: center;">Each node has prev & next pointers → O(1) insert/delete</div>
</div>

<!-- Key Operations -->
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 16px;">
<div style="background: #238636; padding: 16px; border-radius: 8px;">
<div style="color: #fff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">GET(key)</div>
<div style="color: #d1f5d3; font-size: 11px;">1. HashMap lookup → O(1)</div>
<div style="color: #d1f5d3; font-size: 11px;">2. Move node to front → O(1)</div>
<div style="color: #d1f5d3; font-size: 11px;">3. Return value</div>
</div>
<div style="background: #1f6feb; padding: 16px; border-radius: 8px;">
<div style="color: #fff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">PUT(key, value)</div>
<div style="color: #a5d6ff; font-size: 11px;">1. If at capacity: evict tail.prev</div>
<div style="color: #a5d6ff; font-size: 11px;">2. Create node, add to HashMap</div>
<div style="color: #a5d6ff; font-size: 11px;">3. Insert after head → O(1)</div>
</div>
</div>

</div>
</div>

### Part 4: Why Dummy Head and Tail Nodes?

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">

**Without dummy nodes**: Every operation needs null checks
```python
# Messy code without dummies
def add_to_front(node):
    if self.head is None:
        self.head = node
        self.tail = node
    else:
        node.next = self.head
        self.head.prev = node
        self.head = node
```

**With dummy nodes**: Clean, consistent code
```python
# Clean code with dummies
def add_to_front(node):
    node.prev = self.head
    node.next = self.head.next
    self.head.next.prev = node
    self.head.next = node
```

**Benefits**:
- No edge cases for empty list
- No null pointer checks
- Same code path for all operations

</div>

### Part 5: Operation Walkthrough

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #30363d;">

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">

<!-- GET Operation -->
<div style="background: #21262d; border-radius: 12px; padding: 20px; border-left: 4px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 14px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
<span style="background: #238636; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px;">GET</span>
Operation Flow
</div>

<div style="display: flex; flex-direction: column; gap: 8px;">
<!-- Step 1 -->
<div style="background: #30363d; padding: 12px; border-radius: 8px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px;">1. Check HashMap for key</div>
</div>

<!-- Branches -->
<div style="display: flex; gap: 12px; margin-left: 16px;">
<!-- Not Found Branch -->
<div style="flex: 1; position: relative;">
<div style="position: absolute; left: -12px; top: 0; bottom: 50%; width: 2px; background: #484f58;"></div>
<div style="position: absolute; left: -12px; top: 50%; width: 12px; height: 2px; background: #484f58;"></div>
<div style="background: linear-gradient(135deg, #3d1f1f 0%, #4a2828 100%); padding: 10px; border-radius: 6px; border: 1px solid #f85149;">
<div style="color: #f85149; font-size: 11px; font-weight: bold;">Not found</div>
<div style="color: #f0883e; font-size: 10px; margin-top: 4px;">return -1</div>
</div>
</div>

<!-- Found Branch -->
<div style="flex: 2; position: relative;">
<div style="position: absolute; left: -12px; top: 0; height: 100%; width: 2px; background: #484f58;"></div>
<div style="position: absolute; left: -12px; top: 12px; width: 12px; height: 2px; background: #484f58;"></div>
<div style="background: linear-gradient(135deg, #1f3d1f 0%, #284a28 100%); padding: 10px; border-radius: 6px; border: 1px solid #7ee787;">
<div style="color: #7ee787; font-size: 11px; font-weight: bold;">Found → get node pointer</div>
<div style="display: flex; flex-direction: column; gap: 4px; margin-top: 8px; padding-left: 8px; border-left: 2px solid #484f58;">
<div style="color: #a5d6ff; font-size: 10px;">Remove node from current position <span style="color: #7ee787;">(O(1))</span></div>
<div style="color: #a5d6ff; font-size: 10px;">Add node to front <span style="color: #7ee787;">(O(1))</span></div>
<div style="color: #a5d6ff; font-size: 10px;">Return node.value</div>
</div>
</div>
</div>
</div>
</div>
</div>

<!-- PUT Operation -->
<div style="background: #21262d; border-radius: 12px; padding: 20px; border-left: 4px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; font-size: 14px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
<span style="background: #1f6feb; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px;">PUT</span>
Operation Flow
</div>

<div style="display: flex; flex-direction: column; gap: 8px;">
<!-- Step 1 -->
<div style="background: #30363d; padding: 12px; border-radius: 8px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px;">1. Check if key exists in HashMap</div>
</div>

<!-- Branches -->
<div style="display: flex; gap: 12px; margin-left: 16px;">
<!-- Exists Branch -->
<div style="flex: 1; position: relative;">
<div style="position: absolute; left: -12px; top: 0; bottom: 50%; width: 2px; background: #484f58;"></div>
<div style="position: absolute; left: -12px; top: 50%; width: 12px; height: 2px; background: #484f58;"></div>
<div style="background: linear-gradient(135deg, #1f3d1f 0%, #284a28 100%); padding: 10px; border-radius: 6px; border: 1px solid #7ee787;">
<div style="color: #7ee787; font-size: 11px; font-weight: bold;">Exists</div>
<div style="color: #a5d6ff; font-size: 10px; margin-top: 4px;">Update value, move to front</div>
</div>
</div>

<!-- Not Exists Branch -->
<div style="flex: 2; position: relative;">
<div style="position: absolute; left: -12px; top: 0; height: 100%; width: 2px; background: #484f58;"></div>
<div style="position: absolute; left: -12px; top: 12px; width: 12px; height: 2px; background: #484f58;"></div>
<div style="background: linear-gradient(135deg, #1f2d3d 0%, #283a4a 100%); padding: 10px; border-radius: 6px; border: 1px solid #58a6ff;">
<div style="color: #58a6ff; font-size: 11px; font-weight: bold;">Not exists</div>
<div style="display: flex; flex-direction: column; gap: 4px; margin-top: 8px; padding-left: 8px; border-left: 2px solid #484f58;">
<div style="color: #f0883e; font-size: 10px;">Check capacity</div>
<div style="color: #f85149; font-size: 9px; padding-left: 8px; border-left: 1px solid #484f58;">At capacity → Remove LRU (tail.prev), delete from HashMap</div>
<div style="color: #a5d6ff; font-size: 10px;">Create new node</div>
<div style="color: #a5d6ff; font-size: 10px;">Add to HashMap</div>
<div style="color: #a5d6ff; font-size: 10px;">Add to front of list</div>
</div>
</div>
</div>
</div>
</div>
</div>

</div>

</div>

---

## Alternative Approaches

### Alternative 1: OrderedDict (Python)

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)  # Mark as recently used
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove oldest
```

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 20px; margin: 16px 0;">

| Aspect | Custom Implementation | OrderedDict |
|--------|----------------------|-------------|
| **Interview** | Shows deep understanding | May seem like "cheating" |
| **Production** | More control, thread-safety options | Cleaner, well-tested |
| **Performance** | Identical O(1) | Identical O(1) |
| **Extensibility** | Easy to add TTL, stats | Harder to extend |

</div>

### Alternative 2: LinkedHashMap (Java)

```java
class LRUCache extends LinkedHashMap<Integer, Integer> {
    private int capacity;

    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);  // true = access order
        this.capacity = capacity;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}
```

### Alternative 3: Using a Min-Heap (NOT Recommended)

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ff6b6b;">

**Why it doesn't work well:**
- Heap operations are O(log n), not O(1)
- Updating access time requires O(n) search + O(log n) heapify
- Would need HashMap + Heap, but heap doesn't support efficient arbitrary removal

**When heap IS useful**: LFU cache (Least Frequently Used) where you track frequency counts

</div>

---

## Pros and Cons Analysis

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 20px;">

### Pros

- **O(1) all operations** - Cannot get better
- **Predictable memory** - Bounded by capacity
- **Simple eviction** - Always remove least recent
- **Cache-friendly** - Preserves hot data
- **Thread-safe variants** - Easy to add locks

</div>

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px;">

### Cons

- **Memory overhead** - Pointers add ~16 bytes/entry
- **No TTL built-in** - Need to add expiration logic
- **Single-machine** - Doesn't scale horizontally
- **Cold start problem** - Empty cache initially
- **Access pattern blind** - Doesn't consider frequency

</div>

</div>

---

## Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| `get(key)` | O(1) | - |
| `put(key, value)` | O(1) | - |
| **Total Space** | - | O(capacity) |

**Space breakdown per entry:**
- HashMap entry: ~32 bytes (key, value, hash, next pointer)
- Node: ~40 bytes (key, value, prev, next pointers)
- Total: ~72 bytes per cached item

---

## Common Extensions

1. **TTL (Time-To-Live)**: Add `expires_at` field to Node, check on access
2. **Thread-Safety**: Add `RWMutex` for concurrent access
3. **LFU Cache**: Track frequency instead of recency (use HashMap + frequency buckets)
4. **Generics**: Support any key/value types
5. **Distributed**: Use Redis with `EXPIRE` and `LRU` eviction policy

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

1. **Draw the data structure** - Visual explanation helps tremendously
2. **Explain why doubly linked** - Shows you understand the O(1) requirement
3. **Mention dummy nodes** - Shows production-ready thinking
4. **Discuss alternatives** - OrderedDict shows breadth of knowledge
5. **Thread-safety** - Mention how you'd add locks for production
6. **Edge cases**: Empty cache, single capacity, update existing key

</div>

---

## Implementation

### Python

```python
class Node:
    def __init__(self, key: int = 0, value: int = 0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # key -> Node

        # Dummy head and tail for easier operations
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _add_to_front(self, node: Node):
        """Add node right after head (most recently used)"""
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node: Node):
        """Remove node from its current position"""
        node.prev.next = node.next
        node.next.prev = node.prev

    def _move_to_front(self, node: Node):
        """Move existing node to front (mark as recently used)"""
        self._remove_node(node)
        self._add_to_front(node)

    def _remove_lru(self) -> Node:
        """Remove and return the least recently used node (before tail)"""
        lru = self.tail.prev
        self._remove_node(lru)
        return lru

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        node = self.cache[key]
        self._move_to_front(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            # Update existing
            node = self.cache[key]
            node.value = value
            self._move_to_front(node)
        else:
            # Add new
            if len(self.cache) >= self.capacity:
                # Evict LRU
                lru = self._remove_lru()
                del self.cache[lru.key]

            node = Node(key, value)
            self.cache[key] = node
            self._add_to_front(node)


# Usage
cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
print(cache.get(1))       # 1
cache.put(3, 3)           # Evicts key 2
print(cache.get(2))       # -1 (not found)
cache.put(4, 4)           # Evicts key 1
print(cache.get(1))       # -1 (not found)
print(cache.get(3))       # 3
print(cache.get(4))       # 4
```

### Go

```go
package main

import "fmt"

type Node struct {
	key, value int
	prev, next *Node
}

type LRUCache struct {
	capacity int
	cache    map[int]*Node
	head     *Node
	tail     *Node
}

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

func (c *LRUCache) addToFront(node *Node) {
	node.prev = c.head
	node.next = c.head.next
	c.head.next.prev = node
	c.head.next = node
}

func (c *LRUCache) removeNode(node *Node) {
	node.prev.next = node.next
	node.next.prev = node.prev
}

func (c *LRUCache) moveToFront(node *Node) {
	c.removeNode(node)
	c.addToFront(node)
}

func (c *LRUCache) removeLRU() *Node {
	lru := c.tail.prev
	c.removeNode(lru)
	return lru
}

func (c *LRUCache) Get(key int) int {
	node, exists := c.cache[key]
	if !exists {
		return -1
	}
	c.moveToFront(node)
	return node.value
}

func (c *LRUCache) Put(key int, value int) {
	if node, exists := c.cache[key]; exists {
		node.value = value
		c.moveToFront(node)
		return
	}

	if len(c.cache) >= c.capacity {
		lru := c.removeLRU()
		delete(c.cache, lru.key)
	}

	node := &Node{key: key, value: value}
	c.cache[key] = node
	c.addToFront(node)
}

func main() {
	cache := Constructor(2)
	cache.Put(1, 1)
	cache.Put(2, 2)
	fmt.Println(cache.Get(1)) // 1
	cache.Put(3, 3)           // Evicts 2
	fmt.Println(cache.Get(2)) // -1
	cache.Put(4, 4)           // Evicts 1
	fmt.Println(cache.Get(1)) // -1
	fmt.Println(cache.Get(3)) // 3
	fmt.Println(cache.Get(4)) // 4
}
```
