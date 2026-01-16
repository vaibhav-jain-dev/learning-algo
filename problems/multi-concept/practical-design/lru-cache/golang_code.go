/*
LRU Cache Implementation in Go

Uses HashMap + Doubly Linked List for O(1) operations.

Data Structures:
- map[int]*Node: For O(1) key lookup
- Doubly Linked List: For O(1) order tracking

List order:
- head.next -> Least Recently Used (to evict)
- tail.prev -> Most Recently Used (just accessed)
*/

package main

import (
	"fmt"
)

// Node represents a doubly linked list node
type Node struct {
	key   int
	value int
	prev  *Node
	next  *Node
}

// LRUCache implements an LRU cache with O(1) get and put
type LRUCache struct {
	capacity int
	cache    map[int]*Node
	head     *Node // Sentinel: points to LRU
	tail     *Node // Sentinel: points to MRU
}

// Constructor creates a new LRU cache
func Constructor(capacity int) LRUCache {
	lru := LRUCache{
		capacity: capacity,
		cache:    make(map[int]*Node),
		head:     &Node{}, // Dummy head
		tail:     &Node{}, // Dummy tail
	}
	// Connect sentinels
	lru.head.next = lru.tail
	lru.tail.prev = lru.head
	return lru
}

// remove removes a node from the doubly linked list
// Time: O(1)
func (lru *LRUCache) remove(node *Node) {
	prevNode := node.prev
	nextNode := node.next
	prevNode.next = nextNode
	nextNode.prev = prevNode
}

// addToTail adds a node just before tail (most recent position)
// Time: O(1)
func (lru *LRUCache) addToTail(node *Node) {
	prevNode := lru.tail.prev
	prevNode.next = node
	node.prev = prevNode
	node.next = lru.tail
	lru.tail.prev = node
}

// moveToTail moves an existing node to most recent position
// Time: O(1)
func (lru *LRUCache) moveToTail(node *Node) {
	lru.remove(node)
	lru.addToTail(node)
}

// Get returns the value for a key, or -1 if not found
// Also updates recency (moves to tail)
// Time: O(1)
func (lru *LRUCache) Get(key int) int {
	node, exists := lru.cache[key]
	if !exists {
		return -1
	}

	// Update recency
	lru.moveToTail(node)
	return node.value
}

// Put adds or updates a key-value pair
// Evicts LRU if over capacity
// Time: O(1)
func (lru *LRUCache) Put(key int, value int) {
	if node, exists := lru.cache[key]; exists {
		// Update existing
		node.value = value
		lru.moveToTail(node)
		return
	}

	// Add new node
	newNode := &Node{key: key, value: value}
	lru.cache[key] = newNode
	lru.addToTail(newNode)

	// Evict if over capacity
	if len(lru.cache) > lru.capacity {
		// Remove from head (LRU)
		lruNode := lru.head.next
		lru.remove(lruNode)
		delete(lru.cache, lruNode.key)
	}
}

// ============================================================
// Tests
// ============================================================

func testLRUCache() {
	fmt.Println("Testing LRU Cache")
	fmt.Println("==================================================")

	cache := Constructor(2)

	type testCase struct {
		op       string
		key      int
		value    int
		expected int
	}

	tests := []testCase{
		{"put", 1, 1, 0},
		{"put", 2, 2, 0},
		{"get", 1, 0, 1},
		{"put", 3, 3, 0},  // Evicts 2
		{"get", 2, 0, -1}, // 2 was evicted
		{"put", 4, 4, 0},  // Evicts 1
		{"get", 1, 0, -1}, // 1 was evicted
		{"get", 3, 0, 3},
		{"get", 4, 0, 4},
	}

	for _, tc := range tests {
		if tc.op == "put" {
			cache.Put(tc.key, tc.value)
			fmt.Printf("  put(%d, %d)\n", tc.key, tc.value)
		} else {
			result := cache.Get(tc.key)
			status := "PASS"
			if result != tc.expected {
				status = "FAIL"
			}
			fmt.Printf("  [%s] get(%d) = %d (expected %d)\n",
				status, tc.key, result, tc.expected)
		}
	}
	fmt.Println()
}

func testEdgeCases() {
	fmt.Println("Testing Edge Cases")
	fmt.Println("==================================================")

	// Capacity 1
	cache1 := Constructor(1)
	cache1.Put(1, 1)
	cache1.Put(2, 2) // Evicts 1
	result := cache1.Get(1)
	status := "PASS"
	if result != -1 {
		status = "FAIL"
	}
	fmt.Printf("  [%s] Capacity 1: get(1) after eviction = %d\n", status, result)

	// Update existing key
	cache2 := Constructor(2)
	cache2.Put(1, 1)
	cache2.Put(1, 10) // Update, not insert
	result = cache2.Get(1)
	status = "PASS"
	if result != 10 {
		status = "FAIL"
	}
	fmt.Printf("  [%s] Update value: get(1) = %d\n", status, result)

	// Get updates recency
	cache3 := Constructor(2)
	cache3.Put(1, 1)
	cache3.Put(2, 2)
	cache3.Get(1)     // 1 is now most recent
	cache3.Put(3, 3)  // Should evict 2, not 1
	result1 := cache3.Get(1)
	result2 := cache3.Get(2)
	status = "PASS"
	if result1 != 1 || result2 != -1 {
		status = "FAIL"
	}
	fmt.Printf("  [%s] Get updates recency: get(1)=%d, get(2)=%d\n",
		status, result1, result2)

	fmt.Println()
}

func main() {
	testLRUCache()
	testEdgeCases()
	fmt.Println("All tests completed!")
}
