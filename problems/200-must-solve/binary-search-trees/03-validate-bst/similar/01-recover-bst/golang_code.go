/*
Recover Binary Search Tree - Go Solutions

Given a BST where exactly two nodes were swapped, recover the tree.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"math"
)

// TreeNode represents a node in a binary tree
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// ============================================================================
// APPROACH 1: Inorder Traversal with Recursion
// ============================================================================
// Time Complexity:  O(n) - visit each node once
// Space Complexity: O(h) - recursion stack depth
//
// WHY THIS WORKS:
// - Inorder traversal of valid BST gives sorted sequence
// - Swapped nodes create inversions (prev > curr)
// - Track first and second swapped nodes during traversal
// ============================================================================

// RecoverBSTRecursive holds state for recursive recovery
type RecoverBSTRecursive struct {
	first  *TreeNode
	second *TreeNode
	prev   *TreeNode
}

// RecoverTree recovers the BST by finding and swapping incorrect nodes
func (r *RecoverBSTRecursive) RecoverTree(root *TreeNode) {
	r.first = nil
	r.second = nil
	r.prev = nil

	// Find the two swapped nodes
	r.inorder(root)

	// Swap their values
	if r.first != nil && r.second != nil {
		r.first.Val, r.second.Val = r.second.Val, r.first.Val
	}
}

func (r *RecoverBSTRecursive) inorder(node *TreeNode) {
	if node == nil {
		return
	}

	// Process left subtree
	r.inorder(node.Left)

	// Check for inversion (prev.val > curr.val)
	if r.prev != nil && r.prev.Val > node.Val {
		if r.first == nil {
			// First inversion: first = prev
			r.first = r.prev
		}
		// Always update second to current
		r.second = node
	}

	r.prev = node

	// Process right subtree
	r.inorder(node.Right)
}

// ============================================================================
// APPROACH 2: Iterative Inorder with Stack
// ============================================================================
// Time Complexity:  O(n) - visit each node once
// Space Complexity: O(h) - explicit stack
//
// WHY THIS WORKS:
// - Same logic as recursive but with explicit stack
// - Easier to control and avoid stack overflow
// ============================================================================

// RecoverTreeIterative recovers BST using iterative inorder traversal
func RecoverTreeIterative(root *TreeNode) {
	var stack []*TreeNode
	var first, second, prev *TreeNode
	current := root

	for len(stack) > 0 || current != nil {
		// Go to leftmost node
		for current != nil {
			stack = append(stack, current)
			current = current.Left
		}

		// Process current node
		current = stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		// Check for inversion
		if prev != nil && prev.Val > current.Val {
			if first == nil {
				first = prev
			}
			second = current
		}

		prev = current
		current = current.Right
	}

	// Swap the values
	if first != nil && second != nil {
		first.Val, second.Val = second.Val, first.Val
	}
}

// ============================================================================
// APPROACH 3: Morris Traversal (O(1) Space)
// ============================================================================
// Time Complexity:  O(n) - each edge traversed at most twice
// Space Complexity: O(1) - no additional data structures
//
// WHY THIS IS OPTIMAL:
// - Constant space by threading the tree
// - Tree structure fully restored after traversal
// ============================================================================

// RecoverTreeMorris recovers BST using Morris traversal for O(1) space
func RecoverTreeMorris(root *TreeNode) {
	var first, second, prev *TreeNode
	current := root

	for current != nil {
		if current.Left == nil {
			// No left subtree - process current and go right
			if prev != nil && prev.Val > current.Val {
				if first == nil {
					first = prev
				}
				second = current
			}
			prev = current
			current = current.Right
		} else {
			// Find inorder predecessor
			predecessor := current.Left
			for predecessor.Right != nil && predecessor.Right != current {
				predecessor = predecessor.Right
			}

			if predecessor.Right == nil {
				// Create thread
				predecessor.Right = current
				current = current.Left
			} else {
				// Thread exists - remove it and process current
				predecessor.Right = nil

				if prev != nil && prev.Val > current.Val {
					if first == nil {
						first = prev
					}
					second = current
				}

				prev = current
				current = current.Right
			}
		}
	}

	// Swap the values
	if first != nil && second != nil {
		first.Val, second.Val = second.Val, first.Val
	}
}

// ============================================================================
// HELPER: Build tree and utilities for testing
// ============================================================================

// buildTreeFromSlice builds a binary tree from level-order slice
func buildTreeFromSlice(values []interface{}) *TreeNode {
	if len(values) == 0 || values[0] == nil {
		return nil
	}

	root := &TreeNode{Val: values[0].(int)}
	queue := []*TreeNode{root}
	i := 1

	for len(queue) > 0 && i < len(values) {
		node := queue[0]
		queue = queue[1:]

		// Left child
		if i < len(values) && values[i] != nil {
			node.Left = &TreeNode{Val: values[i].(int)}
			queue = append(queue, node.Left)
		}
		i++

		// Right child
		if i < len(values) && values[i] != nil {
			node.Right = &TreeNode{Val: values[i].(int)}
			queue = append(queue, node.Right)
		}
		i++
	}

	return root
}

// inorderList returns inorder traversal as slice
func inorderList(root *TreeNode) []int {
	var result []int
	var traverse func(*TreeNode)
	traverse = func(node *TreeNode) {
		if node != nil {
			traverse(node.Left)
			result = append(result, node.Val)
			traverse(node.Right)
		}
	}
	traverse(root)
	return result
}

// isValidBST checks if tree is a valid BST
func isValidBST(root *TreeNode) bool {
	return isValidBSTHelper(root, math.MinInt64, math.MaxInt64)
}

func isValidBSTHelper(node *TreeNode, minVal, maxVal int) bool {
	if node == nil {
		return true
	}
	if node.Val <= minVal || node.Val >= maxVal {
		return false
	}
	return isValidBSTHelper(node.Left, minVal, node.Val) &&
		isValidBSTHelper(node.Right, node.Val, maxVal)
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("RECOVER BINARY SEARCH TREE - TEST RESULTS")
	fmt.Println("======================================================================")

	testCases := []struct {
		values      []interface{}
		description string
	}{
		{[]interface{}{1, 3, nil, nil, 2}, "Example 1: Swap 1 and 3"},
		{[]interface{}{3, 1, 4, nil, nil, 2}, "Example 2: Swap 2 and 3"},
		{[]interface{}{2, 1}, "Two nodes: root and left"},
		{[]interface{}{5, 3, 9, 1, 8, 7, 10}, "Larger tree with swapped nodes"},
	}

	for _, tc := range testCases {
		fmt.Printf("\n%s\n", tc.description)
		fmt.Printf("Input (level-order): %v\n", tc.values)

		// Test recursive approach
		root1 := buildTreeFromSlice(tc.values)
		fmt.Printf("Before recovery (inorder): %v\n", inorderList(root1))

		solver := &RecoverBSTRecursive{}
		solver.RecoverTree(root1)
		fmt.Printf("After recursive recovery:  %v\n", inorderList(root1))
		fmt.Printf("Is valid BST: %v\n", isValidBST(root1))

		// Test iterative approach
		root2 := buildTreeFromSlice(tc.values)
		RecoverTreeIterative(root2)
		fmt.Printf("After iterative recovery:  %v\n", inorderList(root2))

		// Test Morris approach
		root3 := buildTreeFromSlice(tc.values)
		RecoverTreeMorris(root3)
		fmt.Printf("After Morris recovery:     %v\n", inorderList(root3))
	}

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
	fmt.Println("======================================================================")
}
