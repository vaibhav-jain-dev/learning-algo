/*
LRU Cache

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
Operations get and put must run in O(1) time complexity.

Implementation uses:
- Hash Map for O(1) key lookup
- Doubly Linked List for O(1) LRU ordering operations

Time Complexity: O(1) for get and put
Space Complexity: O(capacity)
*/

package main

import (
	"fmt"
	"strings"
)

// DLLNode represents a doubly linked list node for LRU Cache
type DLLNode struct {
	key   int      // Key is stored to remove from hashmap on eviction
	value int
	prev  *DLLNode
	next  *DLLNode
}

// LRUCache implements a Least Recently Used cache
type LRUCache struct {
	capacity int
	cache    map[int]*DLLNode // key -> node
	head     *DLLNode         // Dummy head (MRU side)
	tail     *DLLNode         // Dummy tail (LRU side)
}

// NewLRUCache creates a new LRU cache with given capacity
func NewLRUCache(capacity int) *LRUCache {
	head := &DLLNode{}
	tail := &DLLNode{}
	head.next = tail
	tail.prev = head

	return &LRUCache{
		capacity: capacity,
		cache:    make(map[int]*DLLNode),
		head:     head,
		tail:     tail,
	}
}

// addToHead adds node right after dummy head (most recently used position)
func (c *LRUCache) addToHead(node *DLLNode) {
	node.prev = c.head
	node.next = c.head.next
	c.head.next.prev = node
	c.head.next = node
}

// removeNode removes node from its current position in the list
func (c *LRUCache) removeNode(node *DLLNode) {
	prevNode := node.prev
	nextNode := node.next
	prevNode.next = nextNode
	nextNode.prev = prevNode
}

// moveToHead moves existing node to head (mark as most recently used)
func (c *LRUCache) moveToHead(node *DLLNode) {
	c.removeNode(node)
	c.addToHead(node)
}

// popTail removes and returns the LRU node (just before dummy tail)
func (c *LRUCache) popTail() *DLLNode {
	lruNode := c.tail.prev
	c.removeNode(lruNode)
	return lruNode
}

// Get returns value by key. Returns value if key exists (and moves to MRU), otherwise -1.
func (c *LRUCache) Get(key int) int {
	node, exists := c.cache[key]
	if !exists {
		return -1
	}

	c.moveToHead(node) // Mark as recently used
	return node.value
}

// Put adds key-value pair into cache. Evicts LRU if over capacity.
func (c *LRUCache) Put(key int, value int) {
	node, exists := c.cache[key]

	if exists {
		// Update existing node
		node.value = value
		c.moveToHead(node)
	} else {
		// Create new node
		newNode := &DLLNode{key: key, value: value}
		c.cache[key] = newNode
		c.addToHead(newNode)

		// Check capacity and evict if necessary
		if len(c.cache) > c.capacity {
			lruNode := c.popTail()
			delete(c.cache, lruNode.key)
		}
	}
}

// String returns string representation showing cache order (MRU to LRU)
func (c *LRUCache) String() string {
	var items []string
	current := c.head.next
	for current != c.tail {
		items = append(items, fmt.Sprintf("%d:%d", current.key, current.value))
		current = current.next
	}
	return fmt.Sprintf("LRUCache([%s])", strings.Join(items, " -> "))
}

// ==================== TEST CASES ====================

func main() {
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("LRU CACHE - TEST CASES")
	fmt.Println(strings.Repeat("=", 60))

	// Test case 1: Basic operations from example
	fmt.Println("\nTest 1: Basic operations (capacity=2)")
	cache := NewLRUCache(2)
	fmt.Printf("  Initial: %s\n", cache)

	cache.Put(1, 1)
	fmt.Printf("  put(1,1): %s\n", cache)

	cache.Put(2, 2)
	fmt.Printf("  put(2,2): %s\n", cache)

	result := cache.Get(1)
	fmt.Printf("  get(1)=%d: %s\n", result, cache)
	if result != 1 {
		fmt.Printf("  FAILED! Expected 1, got %d\n", result)
		return
	}

	cache.Put(3, 3) // Evicts key 2
	fmt.Printf("  put(3,3): %s (evicted key 2)\n", cache)

	result = cache.Get(2)
	fmt.Printf("  get(2)=%d (should be -1, was evicted)\n", result)
	if result != -1 {
		fmt.Printf("  FAILED! Expected -1, got %d\n", result)
		return
	}

	cache.Put(4, 4) // Evicts key 1
	fmt.Printf("  put(4,4): %s (evicted key 1)\n", cache)

	result = cache.Get(1)
	fmt.Printf("  get(1)=%d (should be -1)\n", result)
	if result != -1 {
		fmt.Println("  FAILED!")
		return
	}

	result = cache.Get(3)
	fmt.Printf("  get(3)=%d\n", result)
	if result != 3 {
		fmt.Println("  FAILED!")
		return
	}

	result = cache.Get(4)
	fmt.Printf("  get(4)=%d\n", result)
	if result != 4 {
		fmt.Println("  FAILED!")
		return
	}
	fmt.Println("  PASSED!")

	// Test case 2: Capacity 1
	fmt.Println("\nTest 2: Capacity 1")
	cache = NewLRUCache(1)

	cache.Put(2, 1)
	fmt.Printf("  put(2,1): %s\n", cache)

	result = cache.Get(2)
	fmt.Printf("  get(2)=%d\n", result)
	if result != 1 {
		fmt.Println("  FAILED!")
		return
	}

	cache.Put(3, 2)
	fmt.Printf("  put(3,2): %s (evicted key 2)\n", cache)

	result = cache.Get(2)
	fmt.Printf("  get(2)=%d (should be -1)\n", result)
	if result != -1 {
		fmt.Println("  FAILED!")
		return
	}

	result = cache.Get(3)
	fmt.Printf("  get(3)=%d\n", result)
	if result != 2 {
		fmt.Println("  FAILED!")
		return
	}
	fmt.Println("  PASSED!")

	// Test case 3: Update existing key
	fmt.Println("\nTest 3: Update existing key")
	cache = NewLRUCache(2)
	cache.Put(1, 1)
	cache.Put(2, 2)
	fmt.Printf("  Initial: %s\n", cache)

	cache.Put(1, 10) // Update key 1
	fmt.Printf("  put(1,10): %s\n", cache)

	result = cache.Get(1)
	fmt.Printf("  get(1)=%d (should be 10)\n", result)
	if result != 10 {
		fmt.Println("  FAILED!")
		return
	}

	cache.Put(3, 3) // Should evict key 2, not key 1
	fmt.Printf("  put(3,3): %s\n", cache)

	result = cache.Get(2)
	fmt.Printf("  get(2)=%d (should be -1, was evicted)\n", result)
	if result != -1 {
		fmt.Println("  FAILED!")
		return
	}
	fmt.Println("  PASSED!")

	// Test case 4: Access pattern matters
	fmt.Println("\nTest 4: Access pattern affects eviction")
	cache = NewLRUCache(3)
	cache.Put(1, 1)
	cache.Put(2, 2)
	cache.Put(3, 3)
	fmt.Printf("  Initial: %s\n", cache)

	cache.Get(1) // Access 1, making it MRU
	fmt.Printf("  get(1): %s\n", cache)

	cache.Get(2) // Access 2, making it MRU
	fmt.Printf("  get(2): %s\n", cache)

	cache.Put(4, 4) // Should evict 3 (LRU)
	fmt.Printf("  put(4,4): %s (evicted key 3)\n", cache)

	if cache.Get(3) != -1 {
		fmt.Println("  FAILED! Key 3 should have been evicted")
		return
	}
	if cache.Get(1) != 1 {
		fmt.Println("  FAILED! Key 1 should still exist")
		return
	}
	if cache.Get(2) != 2 {
		fmt.Println("  FAILED! Key 2 should still exist")
		return
	}
	fmt.Println("  PASSED!")

	// Test case 5: Larger capacity
	fmt.Println("\nTest 5: Larger capacity (5)")
	cache = NewLRUCache(5)
	for i := 0; i < 5; i++ {
		cache.Put(i, i*10)
	}
	fmt.Printf("  Initial: %s\n", cache)

	// Access in specific order
	cache.Get(0)
	cache.Get(4)
	cache.Get(2)
	fmt.Printf("  After accessing 0, 4, 2: %s\n", cache)

	// Add new item, should evict 1 (LRU)
	cache.Put(10, 100)
	fmt.Printf("  put(10,100): %s\n", cache)

	result = cache.Get(1)
	if result != -1 {
		fmt.Println("  FAILED! Key 1 should have been evicted")
		return
	}
	fmt.Printf("  get(1)=%d (evicted)\n", result)

	result = cache.Get(3)
	if result != 30 {
		fmt.Println("  FAILED! Key 3 should still exist")
		return
	}
	fmt.Printf("  get(3)=%d\n", result)
	fmt.Println("  PASSED!")

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("ALL TESTS PASSED!")
	fmt.Println(strings.Repeat("=", 60))
}
