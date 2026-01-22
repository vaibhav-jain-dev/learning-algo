# LRU Cache

## Overview

An LRU (Least Recently Used) Cache is a data structure that stores a limited number of items and automatically evicts the least recently accessed item when the cache reaches capacity. It combines a HashMap for O(1) lookups with a Doubly Linked List for O(1) order maintenance, making both `get` and `put` operations constant time.

This is one of the most frequently asked machine coding problems because it tests fundamental data structure knowledge and the ability to combine multiple structures elegantly.

## Why This is Asked in Interviews

**Skills Tested:**
- Understanding of HashMap and Linked List internals
- Ability to combine data structures for optimal performance
- Knowledge of cache eviction policies
- Thread-safety considerations for production systems
- Edge case handling and API design

**Companies That Ask This:**
- Amazon (very frequently)
- Google
- Facebook/Meta
- Microsoft
- Netflix
- Uber
- LinkedIn
- All major tech companies

This is LeetCode #146 and appears in almost every system design discussion about caching.

## Requirements Gathering

**Questions to ask the interviewer:**

### Functional Requirements
- What operations should the cache support? (get, put, delete?)
- Should same key updates reset the "recently used" status?
- What should get() return for missing keys? (-1, null, or throw?)
- Do we need to support TTL (time-to-live) for entries?

### Non-Functional Requirements
- What's the expected capacity range? (hundreds, millions?)
- Do we need thread-safety for concurrent access?
- Is this for a single machine or distributed system?
- What's the read/write ratio? (helps optimize)

## System Design (High Level)

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #334155; margin: 0 0 20px 0; text-align: center; font-size: 16px;">LRU Cache Architecture</h4>

  <div style="display: flex; flex-direction: column; gap: 20px;">
    <!-- HashMap Section -->
    <div style="background: #ffffff; border: 2px solid #cbd5e1; border-radius: 8px; padding: 16px;">
      <div style="color: #059669; font-weight: bold; font-size: 13px; margin-bottom: 12px;">HashMap (Key to Node Pointer)</div>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <div style="background: #dcfce7; border: 1px solid #86efac; padding: 10px 16px; border-radius: 6px; text-align: center;">
          <div style="color: #166534; font-weight: bold; font-size: 12px;">"A"</div>
          <div style="color: #15803d; font-size: 10px;">-> Node 1</div>
        </div>
        <div style="background: #dcfce7; border: 1px solid #86efac; padding: 10px 16px; border-radius: 6px; text-align: center;">
          <div style="color: #166534; font-weight: bold; font-size: 12px;">"B"</div>
          <div style="color: #15803d; font-size: 10px;">-> Node 2</div>
        </div>
        <div style="background: #dcfce7; border: 1px solid #86efac; padding: 10px 16px; border-radius: 6px; text-align: center;">
          <div style="color: #166534; font-weight: bold; font-size: 12px;">"C"</div>
          <div style="color: #15803d; font-size: 10px;">-> Node 3</div>
        </div>
      </div>
      <div style="color: #64748b; font-size: 11px; margin-top: 8px;">O(1) lookup: key directly maps to node in linked list</div>
    </div>

    <!-- Arrow -->
    <div style="text-align: center; color: #3b82f6; font-size: 24px;">|</div>

    <!-- Doubly Linked List Section -->
    <div style="background: #ffffff; border: 2px solid #cbd5e1; border-radius: 8px; padding: 16px;">
      <div style="color: #7c3aed; font-weight: bold; font-size: 13px; margin-bottom: 12px;">Doubly Linked List (Most Recent to Least Recent)</div>
      <div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
        <div style="background: #f1f5f9; border: 2px dashed #94a3b8; padding: 10px 14px; border-radius: 6px; text-align: center;">
          <div style="color: #64748b; font-size: 10px;">HEAD</div>
          <div style="color: #94a3b8; font-size: 9px;">(dummy)</div>
        </div>
        <div style="color: #3b82f6; font-size: 18px;">-</div>
        <div style="background: #dbeafe; border: 2px solid #3b82f6; padding: 10px 14px; border-radius: 6px; text-align: center;">
          <div style="color: #1e40af; font-weight: bold; font-size: 11px;">Node 1</div>
          <div style="color: #3b82f6; font-size: 10px;">"A": 100</div>
          <div style="color: #059669; font-size: 9px;">Most Recent</div>
        </div>
        <div style="color: #3b82f6; font-size: 18px;">-</div>
        <div style="background: #ede9fe; border: 2px solid #8b5cf6; padding: 10px 14px; border-radius: 6px; text-align: center;">
          <div style="color: #5b21b6; font-weight: bold; font-size: 11px;">Node 2</div>
          <div style="color: #7c3aed; font-size: 10px;">"B": 200</div>
        </div>
        <div style="color: #3b82f6; font-size: 18px;">-</div>
        <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 10px 14px; border-radius: 6px; text-align: center;">
          <div style="color: #92400e; font-weight: bold; font-size: 11px;">Node 3</div>
          <div style="color: #d97706; font-size: 10px;">"C": 300</div>
          <div style="color: #dc2626; font-size: 9px;">Least Recent</div>
        </div>
        <div style="color: #3b82f6; font-size: 18px;">-</div>
        <div style="background: #f1f5f9; border: 2px dashed #94a3b8; padding: 10px 14px; border-radius: 6px; text-align: center;">
          <div style="color: #64748b; font-size: 10px;">TAIL</div>
          <div style="color: #94a3b8; font-size: 9px;">(dummy)</div>
        </div>
      </div>
      <div style="color: #64748b; font-size: 11px; margin-top: 8px; text-align: center;">Each node has prev & next pointers for O(1) insert/delete</div>
    </div>

    <!-- Operations Summary -->
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 200px; background: #ecfdf5; border: 1px solid #6ee7b7; padding: 14px; border-radius: 8px;">
        <div style="color: #047857; font-weight: bold; font-size: 12px; margin-bottom: 8px;">GET(key)</div>
        <div style="color: #065f46; font-size: 11px;">1. HashMap lookup O(1)</div>
        <div style="color: #065f46; font-size: 11px;">2. Move node to front O(1)</div>
        <div style="color: #065f46; font-size: 11px;">3. Return value</div>
      </div>
      <div style="flex: 1; min-width: 200px; background: #dbeafe; border: 1px solid #93c5fd; padding: 14px; border-radius: 8px;">
        <div style="color: #1d4ed8; font-weight: bold; font-size: 12px; margin-bottom: 8px;">PUT(key, value)</div>
        <div style="color: #1e40af; font-size: 11px;">1. If at capacity: evict tail.prev</div>
        <div style="color: #1e40af; font-size: 11px;">2. Create node, add to HashMap</div>
        <div style="color: #1e40af; font-size: 11px;">3. Insert after head O(1)</div>
      </div>
    </div>
  </div>
</div>

## Data Structures & Classes

### Class Diagram

```
+------------------+       +-------------------+
|      Node        |       |     LRUCache      |
+------------------+       +-------------------+
| - key: int       |       | - capacity: int   |
| - value: int     |       | - cache: HashMap  |
| - prev: Node     |<------| - head: Node      |
| - next: Node     |       | - tail: Node      |
+------------------+       +-------------------+
                           | + get(key): int   |
                           | + put(key, value) |
                           +-------------------+
```

### Why These Choices?

| Component | Choice | Reasoning |
|-----------|--------|-----------|
| Lookup | HashMap | O(1) access by key |
| Ordering | Doubly Linked List | O(1) removal given node pointer |
| Dummy Nodes | Head & Tail sentinels | Eliminates null checks, cleaner code |

**Why Doubly Linked List (not Singly)?**
- To remove a node, we need access to its previous node
- With singly linked list: O(n) to find previous
- With doubly linked list: O(1) using node.prev

## Core Algorithm/Logic

### GET Operation
```
1. Check if key exists in HashMap
2. If not found: return -1
3. If found:
   a. Get node from HashMap
   b. Remove node from current position in list
   c. Add node right after head (most recent)
   d. Return node.value
```

### PUT Operation
```
1. Check if key exists in HashMap
2. If exists:
   a. Update value
   b. Move node to front (same as GET)
3. If not exists:
   a. If at capacity:
      - Remove node before tail (least recent)
      - Delete that key from HashMap
   b. Create new node
   c. Add to HashMap
   d. Insert after head
```

### Key Helper Methods
- `_add_to_front(node)`: Insert node right after head
- `_remove_node(node)`: Unlink node from its position
- `_move_to_front(node)`: Remove + add to front
- `_remove_lru()`: Remove and return tail.prev

## Code Implementation

### Python

```python
class Node:
    """Doubly linked list node storing key-value pair."""
    def __init__(self, key: int = 0, value: int = 0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None


class LRUCache:
    """
    LRU Cache implementation using HashMap + Doubly Linked List.

    Time Complexity: O(1) for both get and put
    Space Complexity: O(capacity)
    """

    def __init__(self, capacity: int):
        """Initialize cache with given capacity."""
        self.capacity = capacity
        self.cache = {}  # key -> Node

        # Dummy head and tail nodes simplify edge cases
        # head <-> [most recent] <-> ... <-> [least recent] <-> tail
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _add_to_front(self, node: Node) -> None:
        """Add node right after head (most recently used position)."""
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node: Node) -> None:
        """Remove node from its current position in the list."""
        prev_node = node.prev
        next_node = node.next
        prev_node.next = next_node
        next_node.prev = prev_node

    def _move_to_front(self, node: Node) -> None:
        """Move existing node to front (mark as recently used)."""
        self._remove_node(node)
        self._add_to_front(node)

    def _remove_lru(self) -> Node:
        """Remove and return the least recently used node (before tail)."""
        lru_node = self.tail.prev
        self._remove_node(lru_node)
        return lru_node

    def get(self, key: int) -> int:
        """
        Get value by key. Returns -1 if not found.
        Marks the key as recently used.
        """
        if key not in self.cache:
            return -1

        node = self.cache[key]
        self._move_to_front(node)  # Mark as recently used
        return node.value

    def put(self, key: int, value: int) -> None:
        """
        Insert or update key-value pair.
        Evicts least recently used item if at capacity.
        """
        if key in self.cache:
            # Update existing key
            node = self.cache[key]
            node.value = value
            self._move_to_front(node)
        else:
            # Insert new key
            if len(self.cache) >= self.capacity:
                # Evict LRU item
                lru_node = self._remove_lru()
                del self.cache[lru_node.key]

            # Add new node
            new_node = Node(key, value)
            self.cache[key] = new_node
            self._add_to_front(new_node)

    def __repr__(self) -> str:
        """String representation for debugging."""
        items = []
        current = self.head.next
        while current != self.tail:
            items.append(f"{current.key}:{current.value}")
            current = current.next
        return f"LRUCache([{' -> '.join(items)}])"


# Example usage and verification
if __name__ == "__main__":
    cache = LRUCache(2)

    cache.put(1, 1)
    print(f"After put(1,1): {cache}")

    cache.put(2, 2)
    print(f"After put(2,2): {cache}")

    print(f"get(1) = {cache.get(1)}")  # Returns 1
    print(f"After get(1): {cache}")

    cache.put(3, 3)  # Evicts key 2
    print(f"After put(3,3): {cache}")

    print(f"get(2) = {cache.get(2)}")  # Returns -1 (evicted)

    cache.put(4, 4)  # Evicts key 1
    print(f"After put(4,4): {cache}")

    print(f"get(1) = {cache.get(1)}")  # Returns -1 (evicted)
    print(f"get(3) = {cache.get(3)}")  # Returns 3
    print(f"get(4) = {cache.get(4)}")  # Returns 4
```

### Go

```go
package main

import "fmt"

// Node represents a doubly linked list node
type Node struct {
	key, value int
	prev, next *Node
}

// LRUCache implements an LRU cache with O(1) operations
type LRUCache struct {
	capacity int
	cache    map[int]*Node
	head     *Node // Dummy head
	tail     *Node // Dummy tail
}

// Constructor creates a new LRU cache with given capacity
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

// addToFront inserts node right after head
func (c *LRUCache) addToFront(node *Node) {
	node.prev = c.head
	node.next = c.head.next
	c.head.next.prev = node
	c.head.next = node
}

// removeNode removes node from its current position
func (c *LRUCache) removeNode(node *Node) {
	prevNode := node.prev
	nextNode := node.next
	prevNode.next = nextNode
	nextNode.prev = prevNode
}

// moveToFront moves existing node to front
func (c *LRUCache) moveToFront(node *Node) {
	c.removeNode(node)
	c.addToFront(node)
}

// removeLRU removes and returns the least recently used node
func (c *LRUCache) removeLRU() *Node {
	lruNode := c.tail.prev
	c.removeNode(lruNode)
	return lruNode
}

// Get retrieves value by key, returns -1 if not found
func (c *LRUCache) Get(key int) int {
	node, exists := c.cache[key]
	if !exists {
		return -1
	}

	c.moveToFront(node)
	return node.value
}

// Put inserts or updates key-value pair
func (c *LRUCache) Put(key int, value int) {
	if node, exists := c.cache[key]; exists {
		// Update existing
		node.value = value
		c.moveToFront(node)
		return
	}

	// Insert new
	if len(c.cache) >= c.capacity {
		// Evict LRU
		lruNode := c.removeLRU()
		delete(c.cache, lruNode.key)
	}

	newNode := &Node{key: key, value: value}
	c.cache[key] = newNode
	c.addToFront(newNode)
}

// String returns string representation for debugging
func (c *LRUCache) String() string {
	result := "LRUCache(["
	current := c.head.next
	first := true
	for current != c.tail {
		if !first {
			result += " -> "
		}
		result += fmt.Sprintf("%d:%d", current.key, current.value)
		current = current.next
		first = false
	}
	return result + "])"
}

func main() {
	cache := Constructor(2)

	cache.Put(1, 1)
	fmt.Println("After put(1,1):", cache.String())

	cache.Put(2, 2)
	fmt.Println("After put(2,2):", cache.String())

	fmt.Println("get(1) =", cache.Get(1)) // Returns 1
	fmt.Println("After get(1):", cache.String())

	cache.Put(3, 3) // Evicts key 2
	fmt.Println("After put(3,3):", cache.String())

	fmt.Println("get(2) =", cache.Get(2)) // Returns -1 (evicted)

	cache.Put(4, 4) // Evicts key 1
	fmt.Println("After put(4,4):", cache.String())

	fmt.Println("get(1) =", cache.Get(1)) // Returns -1
	fmt.Println("get(3) =", cache.Get(3)) // Returns 3
	fmt.Println("get(4) =", cache.Get(4)) // Returns 4
}
```

## Edge Cases

1. **Capacity of 1**: Only one item allowed, every new put evicts
2. **Update existing key**: Should update value AND move to front
3. **Get non-existent key**: Return -1, don't modify cache state
4. **Put then immediate get**: Should return correct value
5. **Eviction order**: Must evict truly least recently used
6. **Same key multiple puts**: Each put should reset recency
7. **Empty cache get**: Return -1 without errors

## Testing Strategy

### Unit Tests
```python
def test_basic_operations():
    cache = LRUCache(2)
    cache.put(1, 1)
    assert cache.get(1) == 1
    assert cache.get(2) == -1

def test_eviction():
    cache = LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    cache.put(3, 3)  # Evicts 1
    assert cache.get(1) == -1
    assert cache.get(2) == 2
    assert cache.get(3) == 3

def test_update_resets_recency():
    cache = LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    cache.get(1)     # 1 is now most recent
    cache.put(3, 3)  # Evicts 2 (not 1)
    assert cache.get(2) == -1
    assert cache.get(1) == 1

def test_capacity_one():
    cache = LRUCache(1)
    cache.put(1, 1)
    cache.put(2, 2)  # Evicts 1
    assert cache.get(1) == -1
    assert cache.get(2) == 2
```

### Integration Tests
- Concurrent access (if thread-safe version)
- Large capacity with many operations
- Memory usage verification

## Time & Space Complexity

| Operation | Time | Space |
|-----------|------|-------|
| `get(key)` | O(1) | O(1) |
| `put(key, value)` | O(1) | O(1) |
| **Total Space** | - | O(capacity) |

**Space Breakdown per Entry:**
- HashMap entry: ~32 bytes (key, value, hash, next pointer)
- Node: ~40 bytes (key, value, prev, next pointers)
- Total: ~72 bytes per cached item

**Why O(1)?**
- HashMap provides O(1) average lookup
- Doubly linked list with direct node reference provides O(1) insert/delete
- No traversal needed for any operation

## Interview Tips

### How to Approach in 45 Minutes

**Minutes 0-5: Clarify Requirements**
- Confirm operations needed (get, put)
- Ask about capacity, thread-safety
- Clarify return values for edge cases

**Minutes 5-15: Design & Explain**
- Draw the HashMap + Doubly Linked List structure
- Explain why each component is needed
- Walk through get and put operations

**Minutes 15-40: Implement**
- Start with Node class
- Implement helper methods first
- Then implement get and put
- Add comments as you go

**Minutes 40-45: Test & Discuss**
- Walk through example
- Mention edge cases
- Discuss potential extensions

### What to Prioritize
1. **Correctness first**: Get the logic right
2. **Clean code**: Use helper methods, good names
3. **Explain as you code**: Show your thinking
4. **Edge cases**: Mention them even if time is short

### Common Mistakes
- Forgetting to update HashMap when evicting
- Not moving node on update (only on insert)
- Confusing head/tail with actual data nodes
- Off-by-one errors with dummy nodes
- Forgetting to handle capacity = 0

### Follow-up Questions to Prepare For
- How would you make this thread-safe?
- How would you add TTL (expiration)?
- What's the difference between LRU and LFU?
- How would you implement this in a distributed system?
- Can you implement without using built-in HashMap?
