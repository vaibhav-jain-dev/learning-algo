/*
Flatten Binary Tree - Go Solution

Flatten a binary tree into a doubly linked list following in-order traversal.

Time Complexity: O(n)
Space Complexity: O(h) for recursion stack
*/

package main

import "fmt"

// BinaryTree represents a node in a binary tree
type BinaryTree struct {
	Value int
	Left  *BinaryTree
	Right *BinaryTree
}

// FlattenBinaryTree flattens a binary tree into a doubly linked list
func FlattenBinaryTree(root *BinaryTree) *BinaryTree {
	if root == nil {
		return nil
	}

	leftmost, _ := flattenTreeHelper(root)
	return leftmost
}

// flattenTreeHelper returns (leftmost, rightmost) nodes of flattened subtree
func flattenTreeHelper(node *BinaryTree) (*BinaryTree, *BinaryTree) {
	// Base case: leaf node
	if node.Left == nil && node.Right == nil {
		return node, node
	}

	var leftLeftmost, rightRightmost *BinaryTree

	// Process left subtree
	if node.Left != nil {
		leftLeftmost, leftRightmost := flattenTreeHelper(node.Left)

		// Connect left subtree's rightmost to current node
		leftRightmost.Right = node
		node.Left = leftRightmost

		// Update overall leftmost
		leftLeftmost = leftLeftmost
		_ = leftLeftmost // Capture for return
	} else {
		leftLeftmost = node
	}

	// Process right subtree
	if node.Right != nil {
		rightLeftmost, rightRightmost := flattenTreeHelper(node.Right)

		// Connect current node to right subtree's leftmost
		node.Right = rightLeftmost
		rightLeftmost.Left = node

		// Update overall rightmost
		rightRightmost = rightRightmost
		_ = rightRightmost // Capture for return
	} else {
		rightRightmost = node
	}

	// Return proper leftmost and rightmost
	if node.Left != nil {
		leftLeftmost, _ = flattenTreeHelper2(node)
	}
	if node.Right != nil {
		_, rightRightmost = flattenTreeHelper2(node)
	}

	return leftLeftmost, rightRightmost
}

// flattenTreeHelper2 is a cleaner implementation
func flattenTreeHelper2(node *BinaryTree) (*BinaryTree, *BinaryTree) {
	if node.Left == nil && node.Right == nil {
		return node, node
	}

	leftmost := node
	rightmost := node

	if node.Left != nil {
		ll, lr := flattenTreeHelper2(node.Left)
		lr.Right = node
		node.Left = lr
		leftmost = ll
	}

	if node.Right != nil {
		rl, rr := flattenTreeHelper2(node.Right)
		node.Right = rl
		rl.Left = node
		rightmost = rr
	}

	return leftmost, rightmost
}

// FlattenBinaryTreeClean is a cleaner implementation
func FlattenBinaryTreeClean(root *BinaryTree) *BinaryTree {
	if root == nil {
		return nil
	}
	leftmost, _ := flattenTreeHelper2(root)
	return leftmost
}

// FlattenBinaryTreeIterative uses in-order traversal with stack
func FlattenBinaryTreeIterative(root *BinaryTree) *BinaryTree {
	if root == nil {
		return nil
	}

	// In-order traversal to get nodes in order
	nodes := []*BinaryTree{}
	stack := []*BinaryTree{}
	current := root

	for current != nil || len(stack) > 0 {
		for current != nil {
			stack = append(stack, current)
			current = current.Left
		}

		current = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		nodes = append(nodes, current)
		current = current.Right
	}

	// Connect nodes as doubly linked list
	for i := 0; i < len(nodes); i++ {
		if i > 0 {
			nodes[i].Left = nodes[i-1]
		} else {
			nodes[i].Left = nil
		}

		if i < len(nodes)-1 {
			nodes[i].Right = nodes[i+1]
		} else {
			nodes[i].Right = nil
		}
	}

	if len(nodes) > 0 {
		return nodes[0]
	}
	return nil
}

// PrintFlattenedTree prints the flattened tree as a list
func PrintFlattenedTree(head *BinaryTree) []int {
	values := []int{}
	current := head
	for current != nil {
		values = append(values, current.Value)
		current = current.Right
	}
	return values
}

// VerifyDoublyLinked verifies the structure is a valid doubly linked list
func VerifyDoublyLinked(head *BinaryTree) bool {
	if head == nil {
		return true
	}

	current := head
	var prev *BinaryTree = nil

	for current != nil {
		if current.Left != prev {
			return false
		}
		prev = current
		current = current.Right
	}

	return true
}

func main() {
	// Build test tree:
	//        1
	//      /   \
	//     2     3
	//    / \   /
	//   4   5 6

	root := &BinaryTree{Value: 1}
	root.Left = &BinaryTree{Value: 2}
	root.Right = &BinaryTree{Value: 3}
	root.Left.Left = &BinaryTree{Value: 4}
	root.Left.Right = &BinaryTree{Value: 5}
	root.Right.Left = &BinaryTree{Value: 6}

	// Test 1: Clean recursive approach
	result1 := FlattenBinaryTreeClean(root)
	fmt.Printf("Test 1 - Flattened (recursive): %v\n", PrintFlattenedTree(result1))
	fmt.Printf("Is valid doubly linked: %v\n", VerifyDoublyLinked(result1))
	// Expected: [4 2 5 1 6 3]

	// Build another tree for iterative test
	root2 := &BinaryTree{Value: 1}
	root2.Left = &BinaryTree{Value: 2}
	root2.Right = &BinaryTree{Value: 3}
	root2.Left.Left = &BinaryTree{Value: 4}
	root2.Left.Right = &BinaryTree{Value: 5}
	root2.Right.Left = &BinaryTree{Value: 6}

	// Test 2: Iterative approach
	result2 := FlattenBinaryTreeIterative(root2)
	fmt.Printf("\nTest 2 - Flattened (iterative): %v\n", PrintFlattenedTree(result2))
	fmt.Printf("Is valid doubly linked: %v\n", VerifyDoublyLinked(result2))
	// Expected: [4 2 5 1 6 3]

	// Test 3: Single node
	single := &BinaryTree{Value: 42}
	result3 := FlattenBinaryTreeClean(single)
	fmt.Printf("\nTest 3 - Single node: %v\n", PrintFlattenedTree(result3))
	// Expected: [42]

	// Test 4: Empty tree
	result4 := FlattenBinaryTreeClean(nil)
	fmt.Printf("Test 4 - Empty tree: %v\n", result4)
	// Expected: <nil>

	// Test 5: Left-only tree
	leftOnly := &BinaryTree{Value: 1}
	leftOnly.Left = &BinaryTree{Value: 2}
	leftOnly.Left.Left = &BinaryTree{Value: 3}
	result5 := FlattenBinaryTreeClean(leftOnly)
	fmt.Printf("\nTest 5 - Left-only: %v\n", PrintFlattenedTree(result5))
	// Expected: [3 2 1]

	// Test 6: Right-only tree
	rightOnly := &BinaryTree{Value: 1}
	rightOnly.Right = &BinaryTree{Value: 2}
	rightOnly.Right.Right = &BinaryTree{Value: 3}
	result6 := FlattenBinaryTreeClean(rightOnly)
	fmt.Printf("Test 6 - Right-only: %v\n", PrintFlattenedTree(result6))
	// Expected: [1 2 3]

	// Test 7: Complete binary tree
	complete := &BinaryTree{Value: 1}
	complete.Left = &BinaryTree{Value: 2}
	complete.Right = &BinaryTree{Value: 3}
	complete.Left.Left = &BinaryTree{Value: 4}
	complete.Left.Right = &BinaryTree{Value: 5}
	complete.Right.Left = &BinaryTree{Value: 6}
	complete.Right.Right = &BinaryTree{Value: 7}

	result7 := FlattenBinaryTreeClean(complete)
	fmt.Printf("\nTest 7 - Complete tree: %v\n", PrintFlattenedTree(result7))
	fmt.Printf("Is valid doubly linked: %v\n", VerifyDoublyLinked(result7))
	// Expected: [4 2 5 1 6 3 7]

	fmt.Println("\nAll tests completed!")
}
