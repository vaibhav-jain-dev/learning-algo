/*
BST Iterator - Go Solution

Implement an iterator over a BST's inorder traversal.

Time Complexity: O(1) average for Next() and HasNext()
Space Complexity: O(h) where h is height of tree
*/

package main

import "fmt"

// TreeNode represents a node in Binary Search Tree
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// BSTIterator is an iterator for inorder traversal of BST
// Uses controlled recursion with explicit stack to achieve
// O(h) space complexity and O(1) average time for operations
type BSTIterator struct {
	stack []*TreeNode
}

// NewBSTIterator creates a new BST iterator
// Pushes all left children onto stack to prepare for first Next()
func NewBSTIterator(root *TreeNode) *BSTIterator {
	iter := &BSTIterator{
		stack: make([]*TreeNode, 0),
	}
	iter.pushLeftBranch(root)
	return iter
}

// pushLeftBranch pushes node and all its left descendants onto stack
func (it *BSTIterator) pushLeftBranch(node *TreeNode) {
	for node != nil {
		it.stack = append(it.stack, node)
		node = node.Left
	}
}

// Next returns the next smallest number in BST
// Pops from stack, pushes left branch of right child
func (it *BSTIterator) Next() int {
	// Pop the next smallest node
	node := it.stack[len(it.stack)-1]
	it.stack = it.stack[:len(it.stack)-1]

	// If it has a right child, push all left descendants of right child
	if node.Right != nil {
		it.pushLeftBranch(node.Right)
	}

	return node.Val
}

// HasNext returns true if there are more elements to iterate
func (it *BSTIterator) HasNext() bool {
	return len(it.stack) > 0
}

// BSTIteratorFlattened is an alternative implementation that flattens BST to array
// Simpler but uses O(n) space
type BSTIteratorFlattened struct {
	values []int
	index  int
}

// NewBSTIteratorFlattened creates a flattened iterator
func NewBSTIteratorFlattened(root *TreeNode) *BSTIteratorFlattened {
	iter := &BSTIteratorFlattened{
		values: make([]int, 0),
		index:  0,
	}
	iter.inorder(root)
	return iter
}

func (it *BSTIteratorFlattened) inorder(node *TreeNode) {
	if node != nil {
		it.inorder(node.Left)
		it.values = append(it.values, node.Val)
		it.inorder(node.Right)
	}
}

// Next returns next value and advances index
func (it *BSTIteratorFlattened) Next() int {
	val := it.values[it.index]
	it.index++
	return val
}

// HasNext checks if more values exist
func (it *BSTIteratorFlattened) HasNext() bool {
	return it.index < len(it.values)
}

// BSTIteratorBidirectional supports both Next() and Prev()
type BSTIteratorBidirectional struct {
	values []int
	index  int
}

// NewBSTIteratorBidirectional creates a bidirectional iterator
func NewBSTIteratorBidirectional(root *TreeNode) *BSTIteratorBidirectional {
	iter := &BSTIteratorBidirectional{
		values: make([]int, 0),
		index:  -1, // Start before first element
	}
	iter.inorder(root)
	return iter
}

func (it *BSTIteratorBidirectional) inorder(node *TreeNode) {
	if node != nil {
		it.inorder(node.Left)
		it.values = append(it.values, node.Val)
		it.inorder(node.Right)
	}
}

// Next moves forward and returns value
func (it *BSTIteratorBidirectional) Next() int {
	it.index++
	return it.values[it.index]
}

// Prev moves backward and returns value
func (it *BSTIteratorBidirectional) Prev() int {
	it.index--
	return it.values[it.index]
}

// HasNext checks if can move forward
func (it *BSTIteratorBidirectional) HasNext() bool {
	return it.index < len(it.values)-1
}

// HasPrev checks if can move backward
func (it *BSTIteratorBidirectional) HasPrev() bool {
	return it.index > 0
}

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

func isSorted(arr []int) bool {
	for i := 1; i < len(arr); i++ {
		if arr[i] < arr[i-1] {
			return false
		}
	}
	return true
}

func main() {
	// Build test tree:
	//        7
	//      /   \
	//     3     15
	//          /  \
	//         9    20

	root := &TreeNode{Val: 7}
	root.Left = &TreeNode{Val: 3}
	root.Right = &TreeNode{Val: 15}
	root.Right.Left = &TreeNode{Val: 9}
	root.Right.Right = &TreeNode{Val: 20}

	fmt.Println("=== BST Iterator (Stack-based) ===")
	iterator := NewBSTIterator(root)

	fmt.Printf("Next(): %d\n", iterator.Next())           // Expected: 3
	fmt.Printf("Next(): %d\n", iterator.Next())           // Expected: 7
	fmt.Printf("HasNext(): %v\n", iterator.HasNext())     // Expected: true
	fmt.Printf("Next(): %d\n", iterator.Next())           // Expected: 9
	fmt.Printf("HasNext(): %v\n", iterator.HasNext())     // Expected: true
	fmt.Printf("Next(): %d\n", iterator.Next())           // Expected: 15
	fmt.Printf("HasNext(): %v\n", iterator.HasNext())     // Expected: true
	fmt.Printf("Next(): %d\n", iterator.Next())           // Expected: 20
	fmt.Printf("HasNext(): %v\n", iterator.HasNext())     // Expected: false
	fmt.Println()

	// Test 2: Compare implementations
	fmt.Println("=== Comparing Implementations ===")
	iterator1 := NewBSTIterator(root)
	iterator2 := NewBSTIteratorFlattened(root)

	var values1, values2 []int

	for iterator1.HasNext() {
		values1 = append(values1, iterator1.Next())
	}

	for iterator2.HasNext() {
		values2 = append(values2, iterator2.Next())
	}

	fmt.Printf("Stack-based:     %v\n", values1)
	fmt.Printf("Flattened:       %v\n", values2)
	fmt.Printf("Results match:   %v\n", slicesEqual(values1, values2))
	fmt.Println()

	// Test 3: Bidirectional iterator
	fmt.Println("=== Bidirectional Iterator ===")
	biIter := NewBSTIteratorBidirectional(root)

	fmt.Printf("Next(): %d\n", biIter.Next())       // 3
	fmt.Printf("Next(): %d\n", biIter.Next())       // 7
	fmt.Printf("Next(): %d\n", biIter.Next())       // 9
	fmt.Printf("Prev(): %d\n", biIter.Prev())       // 7
	fmt.Printf("Prev(): %d\n", biIter.Prev())       // 3
	fmt.Printf("HasPrev(): %v\n", biIter.HasPrev()) // false (at start)
	fmt.Printf("Next(): %d\n", biIter.Next())       // 7
	fmt.Println()

	// Test 4: Larger tree
	fmt.Println("=== Larger Tree Test ===")
	//        10
	//       /  \
	//      5    15
	//     / \   / \
	//    3   7 12  20

	largeRoot := &TreeNode{Val: 10}
	largeRoot.Left = &TreeNode{Val: 5}
	largeRoot.Right = &TreeNode{Val: 15}
	largeRoot.Left.Left = &TreeNode{Val: 3}
	largeRoot.Left.Right = &TreeNode{Val: 7}
	largeRoot.Right.Left = &TreeNode{Val: 12}
	largeRoot.Right.Right = &TreeNode{Val: 20}

	largeIter := NewBSTIterator(largeRoot)
	var allValues []int
	for largeIter.HasNext() {
		allValues = append(allValues, largeIter.Next())
	}

	fmt.Printf("Inorder traversal: %v\n", allValues)
	fmt.Printf("Is sorted: %v\n", isSorted(allValues))
	fmt.Println()

	// Test 5: Single node
	fmt.Println("=== Single Node Test ===")
	single := &TreeNode{Val: 42}
	singleIter := NewBSTIterator(single)

	fmt.Printf("HasNext(): %v\n", singleIter.HasNext()) // true
	fmt.Printf("Next(): %d\n", singleIter.Next())       // 42
	fmt.Printf("HasNext(): %v\n", singleIter.HasNext()) // false

	fmt.Println("\nAll tests completed!")
}
