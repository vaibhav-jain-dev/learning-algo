/*
LRU Cache - Go Solution

Implement a Least Recently Used (LRU) Cache with O(1) get and put operations.

Time Complexity: O(1) for both get and put
Space Complexity: O(capacity)
*/

package main

import "fmt"

// DoublyLinkedNode represents a node in the doubly linked list
type DoublyLinkedNode struct {
	Key   string
	Value int
	Prev  *DoublyLinkedNode
	Next  *DoublyLinkedNode
}

// LRUCache implements an LRU cache using Hash Map + Doubly Linked List
// The doubly linked list maintains the order:
// - Head side: Most recently used
// - Tail side: Least recently used
type LRUCache struct {
	capacity int
	cache    map[string]*DoublyLinkedNode
	head     *DoublyLinkedNode // Dummy head
	tail     *DoublyLinkedNode // Dummy tail
}

// NewLRUCache creates a new LRU Cache with the given capacity
func NewLRUCache(maxSize int) *LRUCache {
	if maxSize < 1 {
		maxSize = 1
	}

	lru := &LRUCache{
		capacity: maxSize,
		cache:    make(map[string]*DoublyLinkedNode),
		head:     &DoublyLinkedNode{},
		tail:     &DoublyLinkedNode{},
	}

	// Connect dummy head and tail
	lru.head.Next = lru.tail
	lru.tail.Prev = lru.head

	return lru
}

// Get returns the value for the key, or -1 if not found
func (lru *LRUCache) Get(key string) int {
	node, exists := lru.cache[key]
	if !exists {
		return -1
	}

	// Move to head (mark as most recently used)
	lru.moveToHead(node)

	return node.Value
}

// Put inserts or updates a key-value pair
func (lru *LRUCache) Put(key string, value int) {
	if node, exists := lru.cache[key]; exists {
		// Update existing node
		node.Value = value
		lru.moveToHead(node)
	} else {
		// Create new node
		newNode := &DoublyLinkedNode{Key: key, Value: value}

		// Add to cache and list
		lru.cache[key] = newNode
		lru.addToHead(newNode)

		// Check capacity
		if len(lru.cache) > lru.capacity {
			// Remove least recently used (tail)
			removed := lru.removeTail()
			delete(lru.cache, removed.Key)
		}
	}
}

// addToHead adds a node right after the dummy head
func (lru *LRUCache) addToHead(node *DoublyLinkedNode) {
	node.Prev = lru.head
	node.Next = lru.head.Next
	lru.head.Next.Prev = node
	lru.head.Next = node
}

// removeNode removes a node from its current position
func (lru *LRUCache) removeNode(node *DoublyLinkedNode) {
	node.Prev.Next = node.Next
	node.Next.Prev = node.Prev
}

// moveToHead moves an existing node to the head
func (lru *LRUCache) moveToHead(node *DoublyLinkedNode) {
	lru.removeNode(node)
	lru.addToHead(node)
}

// removeTail removes and returns the tail node (least recently used)
func (lru *LRUCache) removeTail() *DoublyLinkedNode {
	node := lru.tail.Prev
	lru.removeNode(node)
	return node
}

// String returns a string representation showing order from most to least recent
func (lru *LRUCache) String() string {
	items := []string{}
	current := lru.head.Next
	for current != lru.tail {
		items = append(items, fmt.Sprintf("%s=%d", current.Key, current.Value))
		current = current.Next
	}
	return fmt.Sprintf("LRUCache(%v)", items)
}

func main() {
	fmt.Println("=== LRU Cache Tests ===\n")

	// Test 1: Basic operations
	fmt.Println("Test 1: Basic operations")
	cache1 := NewLRUCache(3)
	cache1.Put("a", 1)
	cache1.Put("b", 2)
	cache1.Put("c", 3)
	fmt.Printf("After inserting a=1, b=2, c=3: %s\n", cache1)
	fmt.Printf("get('a') = %d\n", cache1.Get("a"))
	fmt.Printf("After accessing 'a': %s\n", cache1)
	// Expected: a is now most recent

	// Test 2: Eviction
	fmt.Println("\nTest 2: Eviction")
	cache1.Put("d", 4) // Should evict 'b' (least recently used)
	fmt.Printf("After inserting d=4: %s\n", cache1)
	fmt.Printf("get('b') = %d\n", cache1.Get("b")) // Should be -1
	// Expected: b was evicted

	// Test 3: Update existing key
	fmt.Println("\nTest 3: Update existing key")
	cache2 := NewLRUCache(2)
	cache2.Put("x", 10)
	cache2.Put("y", 20)
	fmt.Printf("Initial: %s\n", cache2)
	cache2.Put("x", 100) // Update x
	fmt.Printf("After updating x=100: %s\n", cache2)
	cache2.Put("z", 30) // Should evict y
	fmt.Printf("After inserting z=30: %s\n", cache2)
	fmt.Printf("get('y') = %d\n", cache2.Get("y")) // Should be -1
	// Expected: x was updated and moved to front, y evicted

	// Test 4: Capacity 1
	fmt.Println("\nTest 4: Capacity 1")
	cache3 := NewLRUCache(1)
	cache3.Put("only", 42)
	fmt.Printf("After inserting only=42: %s\n", cache3)
	cache3.Put("new", 99)
	fmt.Printf("After inserting new=99: %s\n", cache3)
	fmt.Printf("get('only') = %d\n", cache3.Get("only")) // Should be -1
	fmt.Printf("get('new') = %d\n", cache3.Get("new"))   // Should be 99

	// Test 5: Access pattern affects eviction
	fmt.Println("\nTest 5: Access pattern affects eviction")
	cache4 := NewLRUCache(3)
	cache4.Put("1", 1)
	cache4.Put("2", 2)
	cache4.Put("3", 3)
	fmt.Printf("Initial: %s\n", cache4)
	cache4.Get("1") // Access 1, making it most recent
	cache4.Get("2") // Access 2, making it most recent
	fmt.Printf("After accessing 1 then 2: %s\n", cache4)
	cache4.Put("4", 4) // Should evict 3 (least recently used)
	fmt.Printf("After inserting 4: %s\n", cache4)
	fmt.Printf("get('3') = %d\n", cache4.Get("3")) // Should be -1

	// Test 6: Multiple gets
	fmt.Println("\nTest 6: Multiple gets on same key")
	cache5 := NewLRUCache(2)
	cache5.Put("p", 100)
	cache5.Put("q", 200)
	for i := 0; i < 5; i++ {
		cache5.Get("p") // Multiple accesses to p
	}
	cache5.Put("r", 300)                           // Should evict q
	fmt.Printf("get('p') = %d\n", cache5.Get("p")) // Should be 100
	fmt.Printf("get('q') = %d\n", cache5.Get("q")) // Should be -1

	// Test 7: Large cache
	fmt.Println("\nTest 7: Large cache (capacity=5)")
	cache6 := NewLRUCache(5)
	for i := 0; i < 10; i++ {
		cache6.Put(fmt.Sprintf("key%d", i), i*10)
	}
	fmt.Printf("Final cache state: %s\n", cache6)
	// Only last 5 keys should remain

	fmt.Println("\nAll tests completed!")
}
