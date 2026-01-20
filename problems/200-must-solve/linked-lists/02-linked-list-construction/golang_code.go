/*
Linked List Construction - Go Solution

Implement a doubly linked list with various operations.

Time Complexity: O(1) for most operations, O(n) for search/remove by value
Space Complexity: O(1) for all operations
*/

package main

import (
	"fmt"
	"strings"
)

// Node represents a node in a doubly linked list
type Node struct {
	Value int
	Prev  *Node
	Next  *Node
}

// NewNode creates a new node with the given value
func NewNode(value int) *Node {
	return &Node{Value: value}
}

// DoublyLinkedList implements a doubly linked list
type DoublyLinkedList struct {
	Head *Node
	Tail *Node
}

// NewDoublyLinkedList creates a new empty doubly linked list
func NewDoublyLinkedList() *DoublyLinkedList {
	return &DoublyLinkedList{}
}

// SetHead sets the given node as the head of the list
// If node is already in the list, it's moved to the head position
// Time: O(1)
func (dll *DoublyLinkedList) SetHead(node *Node) {
	if dll.Head == node {
		return
	}
	dll.InsertBefore(dll.Head, node)
}

// SetTail sets the given node as the tail of the list
// If node is already in the list, it's moved to the tail position
// Time: O(1)
func (dll *DoublyLinkedList) SetTail(node *Node) {
	if dll.Tail == node {
		return
	}
	dll.InsertAfter(dll.Tail, node)
}

// InsertBefore inserts nodeToInsert before node
// If nodeToInsert is already in the list, it's moved
// Time: O(1)
func (dll *DoublyLinkedList) InsertBefore(node *Node, nodeToInsert *Node) {
	// Don't insert node before itself
	if nodeToInsert == node {
		return
	}

	// Remove from current position if in list
	dll.Remove(nodeToInsert)

	// If list is empty or node is nil, set as head and tail
	if node == nil {
		dll.Head = nodeToInsert
		dll.Tail = nodeToInsert
		return
	}

	// Update pointers
	nodeToInsert.Prev = node.Prev
	nodeToInsert.Next = node

	if node.Prev == nil {
		// node was the head
		dll.Head = nodeToInsert
	} else {
		node.Prev.Next = nodeToInsert
	}

	node.Prev = nodeToInsert
}

// InsertAfter inserts nodeToInsert after node
// If nodeToInsert is already in the list, it's moved
// Time: O(1)
func (dll *DoublyLinkedList) InsertAfter(node *Node, nodeToInsert *Node) {
	// Don't insert node after itself
	if nodeToInsert == node {
		return
	}

	// Remove from current position if in list
	dll.Remove(nodeToInsert)

	// If list is empty or node is nil, set as head and tail
	if node == nil {
		dll.Head = nodeToInsert
		dll.Tail = nodeToInsert
		return
	}

	// Update pointers
	nodeToInsert.Prev = node
	nodeToInsert.Next = node.Next

	if node.Next == nil {
		// node was the tail
		dll.Tail = nodeToInsert
	} else {
		node.Next.Prev = nodeToInsert
	}

	node.Next = nodeToInsert
}

// InsertAtPosition inserts nodeToInsert at the given 1-indexed position
// Time: O(p) where p is the position
func (dll *DoublyLinkedList) InsertAtPosition(position int, nodeToInsert *Node) {
	if position == 1 {
		dll.SetHead(nodeToInsert)
		return
	}

	// Find the node at that position
	current := dll.Head
	currentPosition := 1

	for current != nil && currentPosition < position {
		current = current.Next
		currentPosition++
	}

	if current != nil {
		dll.InsertBefore(current, nodeToInsert)
	} else {
		// Position is beyond list length, insert at tail
		dll.SetTail(nodeToInsert)
	}
}

// RemoveNodesWithValue removes all nodes with the given value
// Time: O(n)
func (dll *DoublyLinkedList) RemoveNodesWithValue(value int) {
	current := dll.Head

	for current != nil {
		nextNode := current.Next
		if current.Value == value {
			dll.Remove(current)
		}
		current = nextNode
	}
}

// Remove removes the given node from the list
// Time: O(1)
func (dll *DoublyLinkedList) Remove(node *Node) {
	if node == nil {
		return
	}

	// Update head/tail if necessary
	if dll.Head == node {
		dll.Head = node.Next
	}
	if dll.Tail == node {
		dll.Tail = node.Prev
	}

	// Update neighbors' pointers
	if node.Prev != nil {
		node.Prev.Next = node.Next
	}
	if node.Next != nil {
		node.Next.Prev = node.Prev
	}

	// Clear node's pointers
	node.Prev = nil
	node.Next = nil
}

// ContainsNodeWithValue checks if any node in the list has the given value
// Time: O(n)
func (dll *DoublyLinkedList) ContainsNodeWithValue(value int) bool {
	current := dll.Head

	for current != nil {
		if current.Value == value {
			return true
		}
		current = current.Next
	}

	return false
}

// ToSlice converts the linked list to a slice for testing
func (dll *DoublyLinkedList) ToSlice() []int {
	result := []int{}
	current := dll.Head
	for current != nil {
		result = append(result, current.Value)
		current = current.Next
	}
	return result
}

// String returns a string representation of the list
func (dll *DoublyLinkedList) String() string {
	values := []string{}
	current := dll.Head
	for current != nil {
		values = append(values, fmt.Sprintf("%d", current.Value))
		current = current.Next
	}
	return strings.Join(values, " <-> ")
}

// Helper function to compare slices
func slicesEqual(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func main() {
	// Create nodes
	node1 := NewNode(1)
	node2 := NewNode(2)
	node3 := NewNode(3)
	node4 := NewNode(4)
	node5 := NewNode(5)
	node6 := NewNode(6)

	// Build initial list: 1 <-> 2 <-> 3 <-> 4 <-> 5
	dll := NewDoublyLinkedList()
	dll.SetHead(node1)
	dll.InsertAfter(node1, node2)
	dll.InsertAfter(node2, node3)
	dll.InsertAfter(node3, node4)
	dll.InsertAfter(node4, node5)

	fmt.Printf("Initial list: %s\n", dll) // 1 <-> 2 <-> 3 <-> 4 <-> 5
	fmt.Printf("Test: %v\n", slicesEqual(dll.ToSlice(), []int{1, 2, 3, 4, 5}))

	// Test SetHead - move node4 to head
	dll.SetHead(node4)
	fmt.Printf("After SetHead(4): %s\n", dll) // 4 <-> 1 <-> 2 <-> 3 <-> 5
	fmt.Printf("Test: %v\n", slicesEqual(dll.ToSlice(), []int{4, 1, 2, 3, 5}))

	// Test SetTail - add node6 at tail
	dll.SetTail(node6)
	fmt.Printf("After SetTail(6): %s\n", dll) // 4 <-> 1 <-> 2 <-> 3 <-> 5 <-> 6
	fmt.Printf("Test: %v\n", slicesEqual(dll.ToSlice(), []int{4, 1, 2, 3, 5, 6}))

	// Test InsertBefore - move node3 before node6
	dll.InsertBefore(node6, node3)
	fmt.Printf("After InsertBefore(6, 3): %s\n", dll) // 4 <-> 1 <-> 2 <-> 5 <-> 3 <-> 6
	fmt.Printf("Test: %v\n", slicesEqual(dll.ToSlice(), []int{4, 1, 2, 5, 3, 6}))

	// Test InsertAfter - move node3 after node6
	dll.InsertAfter(node6, node3)
	fmt.Printf("After InsertAfter(6, 3): %s\n", dll) // 4 <-> 1 <-> 2 <-> 5 <-> 6 <-> 3
	fmt.Printf("Test: %v\n", slicesEqual(dll.ToSlice(), []int{4, 1, 2, 5, 6, 3}))

	// Test InsertAtPosition - move node3 to position 1
	dll.InsertAtPosition(1, node3)
	fmt.Printf("After InsertAtPosition(1, 3): %s\n", dll) // 3 <-> 4 <-> 1 <-> 2 <-> 5 <-> 6
	fmt.Printf("Test: %v\n", slicesEqual(dll.ToSlice(), []int{3, 4, 1, 2, 5, 6}))

	// Test ContainsNodeWithValue
	fmt.Printf("Contains 5: %v\n", dll.ContainsNodeWithValue(5))   // true
	fmt.Printf("Contains 99: %v\n", dll.ContainsNodeWithValue(99)) // false

	// Test RemoveNodesWithValue
	dll.RemoveNodesWithValue(3)
	fmt.Printf("After RemoveNodesWithValue(3): %s\n", dll) // 4 <-> 1 <-> 2 <-> 5 <-> 6
	fmt.Printf("Test: %v\n", slicesEqual(dll.ToSlice(), []int{4, 1, 2, 5, 6}))

	// Test Remove
	dll.Remove(node2)
	fmt.Printf("After Remove(2): %s\n", dll) // 4 <-> 1 <-> 5 <-> 6
	fmt.Printf("Test: %v\n", slicesEqual(dll.ToSlice(), []int{4, 1, 5, 6}))

	// Test edge case: single node
	singleList := NewDoublyLinkedList()
	singleNode := NewNode(10)
	singleList.SetHead(singleNode)
	fmt.Printf("Single node list: %s\n", singleList)
	fmt.Printf("Head is single node: %v\n", singleList.Head == singleNode)
	fmt.Printf("Tail is single node: %v\n", singleList.Tail == singleNode)

	// Test edge case: remove only node
	singleList.Remove(singleNode)
	fmt.Printf("After removing single node, head is nil: %v\n", singleList.Head == nil)
	fmt.Printf("After removing single node, tail is nil: %v\n", singleList.Tail == nil)

	// Test InsertAtPosition beyond length
	newList := NewDoublyLinkedList()
	newNode := NewNode(100)
	newList.InsertAtPosition(5, newNode) // Should just set as head/tail
	fmt.Printf("InsertAtPosition beyond length, head is node: %v\n", newList.Head == newNode)
	fmt.Printf("InsertAtPosition beyond length, tail is node: %v\n", newList.Tail == newNode)

	fmt.Println("\nAll tests completed!")
}
