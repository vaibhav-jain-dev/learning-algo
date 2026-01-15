# LRU Cache

## Problem Statement

Design and implement a Least Recently Used (LRU) cache with O(1) time complexity for both `get` and `put` operations.

## Requirements

- `get(key)`: Return value if exists, -1 otherwise. Mark as recently used.
- `put(key, value)`: Insert or update. Evict least recently used if at capacity.
- Both operations must be O(1).

## Approach

Use a **HashMap** for O(1) lookups combined with a **Doubly Linked List** for O(1) insertions/deletions and maintaining access order.

```
HashMap: key -> Node
Doubly Linked List: head (most recent) <-> ... <-> tail (least recent)
```

## Solution

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

## Complexity

- **Time**: O(1) for both get and put
- **Space**: O(capacity) for storing nodes

## Common Extensions

1. **TTL (Time-To-Live)**: Add expiration timestamps
2. **Thread-Safety**: Add mutex/locks
3. **LFU Cache**: Track frequency instead of recency
4. **Generics**: Support any key/value types

## Interview Tips

- Draw the doubly linked list structure
- Explain why doubly linked list (O(1) deletion)
- Discuss thread-safety considerations
- Mention OrderedDict in Python as alternative
