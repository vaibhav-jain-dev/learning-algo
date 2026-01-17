/*
BST Iterator - Go Solutions

Implement an iterator over a BST that returns elements in sorted order.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// TreeNode represents a node in a binary search tree
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// ============================================================================
// APPROACH 1: Stack-Based (Controlled Recursion) - OPTIMAL
// ============================================================================
// Time Complexity:  O(1) amortized for next(), O(1) for hasNext()
// Space Complexity: O(h) where h is tree height
//
// WHY THIS IS OPTIMAL:
// - Each node is pushed and popped exactly once across all calls
// - Space is proportional to height, not total nodes
// - Simulates recursion using explicit stack
// ============================================================================

// BSTIterator implements an in-order iterator using a stack.
type BSTIterator struct {
	stack []*TreeNode
}

// Constructor initializes the iterator with the root of the BST.
func Constructor(root *TreeNode) BSTIterator {
	iterator := BSTIterator{
		stack: make([]*TreeNode, 0),
	}
	// Push all left nodes from root
	iterator.pushLeftPath(root)
	return iterator
}

// pushLeftPath pushes all left children starting from node.
func (it *BSTIterator) pushLeftPath(node *TreeNode) {
	for node != nil {
		it.stack = append(it.stack, node)
		node = node.Left
	}
}

// Next returns the next smallest number in the BST.
func (it *BSTIterator) Next() int {
	// Pop the top node (smallest in current subtree)
	node := it.stack[len(it.stack)-1]
	it.stack = it.stack[:len(it.stack)-1]

	// If there's a right subtree, push its leftmost path
	if node.Right != nil {
		it.pushLeftPath(node.Right)
	}

	return node.Val
}

// HasNext returns true if there are more elements.
func (it *BSTIterator) HasNext() bool {
	return len(it.stack) > 0
}

// ============================================================================
// APPROACH 2: Precomputed Array (Simple but More Space)
// ============================================================================
// Time Complexity:  O(n) for construction, O(1) for operations
// Space Complexity: O(n) to store all values
//
// WHEN TO USE:
// - Simplicity is preferred
// - Memory is not a concern
// - Need random access to elements
// ============================================================================

// BSTIteratorArray stores all values in a precomputed array.
type BSTIteratorArray struct {
	values []int
	index  int
}

// ConstructorArray initializes with precomputed inorder traversal.
func ConstructorArray(root *TreeNode) BSTIteratorArray {
	iterator := BSTIteratorArray{
		values: make([]int, 0),
		index:  0,
	}
	iterator.inorder(root)
	return iterator
}

// inorder performs inorder traversal and stores values.
func (it *BSTIteratorArray) inorder(node *TreeNode) {
	if node == nil {
		return
	}
	it.inorder(node.Left)
	it.values = append(it.values, node.Val)
	it.inorder(node.Right)
}

// Next returns the next smallest number.
func (it *BSTIteratorArray) Next() int {
	val := it.values[it.index]
	it.index++
	return val
}

// HasNext returns true if there are more elements.
func (it *BSTIteratorArray) HasNext() bool {
	return it.index < len(it.values)
}

// ============================================================================
// APPROACH 3: Using Channels (Concurrent Go Pattern)
// ============================================================================
// Time Complexity:  O(1) per operation (after goroutine starts)
// Space Complexity: O(h) for recursion + channel buffer
//
// GO-SPECIFIC APPROACH:
// - Uses goroutine to generate values
// - Channel acts as iterator
// - Idiomatic for streaming data
// ============================================================================

// BSTIteratorChannel uses a channel for iteration.
type BSTIteratorChannel struct {
	ch     chan int
	next   int
	hasVal bool
}

// ConstructorChannel creates an iterator using a channel.
func ConstructorChannel(root *TreeNode) *BSTIteratorChannel {
	ch := make(chan int, 1)

	go func() {
		var inorder func(node *TreeNode)
		inorder = func(node *TreeNode) {
			if node == nil {
				return
			}
			inorder(node.Left)
			ch <- node.Val
			inorder(node.Right)
		}
		inorder(root)
		close(ch)
	}()

	iterator := &BSTIteratorChannel{ch: ch}
	// Pre-fetch first value
	iterator.advance()
	return iterator
}

// advance fetches the next value from channel.
func (it *BSTIteratorChannel) advance() {
	val, ok := <-it.ch
	it.hasVal = ok
	if ok {
		it.next = val
	}
}

// Next returns the next smallest number.
func (it *BSTIteratorChannel) Next() int {
	val := it.next
	it.advance()
	return val
}

// HasNext returns true if there are more elements.
func (it *BSTIteratorChannel) HasNext() bool {
	return it.hasVal
}

// ============================================================================
// APPROACH 4: Bidirectional Iterator (Extended Functionality)
// ============================================================================
// Time Complexity:  O(1) amortized for both directions
// Space Complexity: O(n) for storing values + current position
//
// EXTENDED FUNCTIONALITY:
// - Supports both forward and backward iteration
// - Useful for problems needing predecessor and successor
// ============================================================================

// BSTIteratorBidirectional supports iteration in both directions.
type BSTIteratorBidirectional struct {
	values []int
	index  int
}

// ConstructorBidirectional creates a bidirectional iterator.
func ConstructorBidirectional(root *TreeNode) BSTIteratorBidirectional {
	iterator := BSTIteratorBidirectional{
		values: make([]int, 0),
		index:  -1, // Before first element
	}

	var inorder func(node *TreeNode)
	inorder = func(node *TreeNode) {
		if node == nil {
			return
		}
		inorder(node.Left)
		iterator.values = append(iterator.values, node.Val)
		inorder(node.Right)
	}
	inorder(root)

	return iterator
}

// Next returns the next value (moving forward).
func (it *BSTIteratorBidirectional) Next() int {
	it.index++
	return it.values[it.index]
}

// Prev returns the previous value (moving backward).
func (it *BSTIteratorBidirectional) Prev() int {
	it.index--
	return it.values[it.index]
}

// HasNext returns true if can move forward.
func (it *BSTIteratorBidirectional) HasNext() bool {
	return it.index < len(it.values)-1
}

// HasPrev returns true if can move backward.
func (it *BSTIteratorBidirectional) HasPrev() bool {
	return it.index > 0
}

// Peek returns current value without moving.
func (it *BSTIteratorBidirectional) Peek() int {
	if it.index >= 0 && it.index < len(it.values) {
		return it.values[it.index]
	}
	return -1
}

// ============================================================================
// HELPER: Build BST from array (for testing)
// ============================================================================

func buildBST(values []int) *TreeNode {
	if len(values) == 0 {
		return nil
	}

	root := &TreeNode{Val: values[0]}

	for i := 1; i < len(values); i++ {
		insertBST(root, values[i])
	}

	return root
}

func insertBST(root *TreeNode, val int) {
	current := root
	for {
		if val < current.Val {
			if current.Left == nil {
				current.Left = &TreeNode{Val: val}
				return
			}
			current = current.Left
		} else {
			if current.Right == nil {
				current.Right = &TreeNode{Val: val}
				return
			}
			current = current.Right
		}
	}
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("BST ITERATOR - TEST RESULTS")
	fmt.Println("======================================================================")

	// Build test tree
	//          7
	//         / \
	//        3   15
	//           /  \
	//          9    20
	root := buildBST([]int{7, 3, 15, 9, 20})

	fmt.Println("\nTest Tree:")
	fmt.Println("          7")
	fmt.Println("         / \\")
	fmt.Println("        3   15")
	fmt.Println("           /  \\")
	fmt.Println("          9    20")
	fmt.Println("\nExpected inorder: [3, 7, 9, 15, 20]")

	// Test Approach 1: Stack-based
	fmt.Println("\n--- Approach 1: Stack-Based (Optimal) ---")
	iter1 := Constructor(root)
	fmt.Print("Iteration: ")
	for iter1.HasNext() {
		fmt.Printf("%d ", iter1.Next())
	}
	fmt.Println()

	// Test Approach 2: Array-based
	fmt.Println("\n--- Approach 2: Array-Based ---")
	iter2 := ConstructorArray(root)
	fmt.Print("Iteration: ")
	for iter2.HasNext() {
		fmt.Printf("%d ", iter2.Next())
	}
	fmt.Println()

	// Test Approach 3: Channel-based
	fmt.Println("\n--- Approach 3: Channel-Based (Go-specific) ---")
	iter3 := ConstructorChannel(root)
	fmt.Print("Iteration: ")
	for iter3.HasNext() {
		fmt.Printf("%d ", iter3.Next())
	}
	fmt.Println()

	// Test Approach 4: Bidirectional
	fmt.Println("\n--- Approach 4: Bidirectional ---")
	iter4 := ConstructorBidirectional(root)
	fmt.Print("Forward:  ")
	for iter4.HasNext() {
		fmt.Printf("%d ", iter4.Next())
	}
	fmt.Println()
	fmt.Print("Backward: ")
	for iter4.HasPrev() {
		fmt.Printf("%d ", iter4.Prev())
	}
	fmt.Println()

	// Test operations sequence matching problem description
	fmt.Println("\n--- Operations Sequence (from problem) ---")
	iter := Constructor(root)
	fmt.Printf("next():    %d (expected 3)\n", iter.Next())
	fmt.Printf("next():    %d (expected 7)\n", iter.Next())
	fmt.Printf("hasNext(): %v (expected true)\n", iter.HasNext())
	fmt.Printf("next():    %d (expected 9)\n", iter.Next())
	fmt.Printf("hasNext(): %v (expected true)\n", iter.HasNext())
	fmt.Printf("next():    %d (expected 15)\n", iter.Next())
	fmt.Printf("hasNext(): %v (expected true)\n", iter.HasNext())
	fmt.Printf("next():    %d (expected 20)\n", iter.Next())
	fmt.Printf("hasNext(): %v (expected false)\n", iter.HasNext())

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
	fmt.Println("======================================================================")
}
