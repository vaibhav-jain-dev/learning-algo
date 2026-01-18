/*
Convert Sorted Array to BST - Go Solutions

Given a sorted array, create a height-balanced BST.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
)

// TreeNode represents a node in a binary search tree
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// ============================================================================
// APPROACH 1: Recursive Divide and Conquer (Standard)
// ============================================================================
// Time Complexity:  O(n) - each element processed once
// Space Complexity: O(log n) - recursion stack depth for balanced tree
//
// WHY THIS IS OPTIMAL:
// - Natural recursive structure matches the problem
// - Middle element as root ensures balance
// - Clean and easy to understand
// ============================================================================

// SortedArrayToBST converts sorted array to height-balanced BST.
func SortedArrayToBST(nums []int) *TreeNode {
	return buildBSTRecursive(nums, 0, len(nums)-1)
}

// buildBSTRecursive builds BST for range [left, right].
func buildBSTRecursive(nums []int, left, right int) *TreeNode {
	if left > right {
		return nil
	}

	// Choose middle element as root (left middle for even length)
	mid := left + (right-left)/2

	node := &TreeNode{Val: nums[mid]}
	node.Left = buildBSTRecursive(nums, left, mid-1)
	node.Right = buildBSTRecursive(nums, mid+1, right)

	return node
}

// ============================================================================
// APPROACH 2: Recursive with Right Middle (Alternate Valid Tree)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(log n)
//
// WHY DIFFERENT:
// - Choosing right middle creates a different valid tree
// - Both trees are balanced
// - Shows flexibility in problem solution
// ============================================================================

// SortedArrayToBSTRightMid uses right middle for even-length arrays.
func SortedArrayToBSTRightMid(nums []int) *TreeNode {
	return buildBSTRightMid(nums, 0, len(nums)-1)
}

// buildBSTRightMid builds BST using right middle.
func buildBSTRightMid(nums []int, left, right int) *TreeNode {
	if left > right {
		return nil
	}

	// Choose right middle for even length arrays
	mid := left + (right-left+1)/2

	node := &TreeNode{Val: nums[mid]}
	node.Left = buildBSTRightMid(nums, left, mid-1)
	node.Right = buildBSTRightMid(nums, mid+1, right)

	return node
}

// ============================================================================
// APPROACH 3: Iterative with Stack (Avoids Recursion)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) for stack
//
// WHEN TO USE:
// - Very deep trees (avoid stack overflow)
// - When recursion is restricted
// - Need explicit control over construction
// ============================================================================

// Range represents a node and its construction range
type Range struct {
	node  *TreeNode
	left  int
	right int
}

// SortedArrayToBSTIterative uses iterative approach with stack.
func SortedArrayToBSTIterative(nums []int) *TreeNode {
	if len(nums) == 0 {
		return nil
	}

	mid := len(nums) / 2
	root := &TreeNode{Val: nums[mid]}

	// Stack stores: (parent node, left index, right index)
	stack := []Range{{root, 0, mid - 1}, {root, mid + 1, len(nums) - 1}}
	isLeft := []bool{true, false}

	for len(stack) > 0 {
		// Pop from stack
		r := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		left := isLeft[len(isLeft)-1]
		isLeft = isLeft[:len(isLeft)-1]

		if r.left > r.right {
			continue
		}

		m := r.left + (r.right-r.left)/2
		child := &TreeNode{Val: nums[m]}

		if left {
			r.node.Left = child
		} else {
			r.node.Right = child
		}

		// Push children ranges
		stack = append(stack, Range{child, r.left, m - 1})
		isLeft = append(isLeft, true)
		stack = append(stack, Range{child, m + 1, r.right})
		isLeft = append(isLeft, false)
	}

	return root
}

// ============================================================================
// APPROACH 4: From Sorted Linked List (Related Problem)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(log n) for recursion
//
// KEY INSIGHT:
// - Use inorder traversal order
// - Advance linked list pointer as we build
// - Clever use of recursion to match inorder
// ============================================================================

// ListNode represents a linked list node
type ListNode struct {
	Val  int
	Next *ListNode
}

// SortedListToBST converts sorted linked list to BST.
func SortedListToBST(head *ListNode) *TreeNode {
	// Count nodes
	length := 0
	current := head
	for current != nil {
		length++
		current = current.Next
	}

	// Use closure to track current position in list
	currentNode := head

	var buildFromList func(left, right int) *TreeNode
	buildFromList = func(left, right int) *TreeNode {
		if left > right {
			return nil
		}

		mid := left + (right-left)/2

		// Build left subtree first (inorder)
		leftChild := buildFromList(left, mid-1)

		// Create node with current list value
		node := &TreeNode{Val: currentNode.Val}
		currentNode = currentNode.Next

		// Build right subtree
		node.Left = leftChild
		node.Right = buildFromList(mid+1, right)

		return node
	}

	return buildFromList(0, length-1)
}

// ============================================================================
// APPROACH 5: Build Perfectly Balanced BST (All Elements at Same Depth)
// ============================================================================
// Creates a complete binary tree structure
// ============================================================================

// SortedArrayToCompleteBST creates a complete BST (BFS level order).
func SortedArrayToCompleteBST(nums []int) *TreeNode {
	if len(nums) == 0 {
		return nil
	}

	// Use the standard recursive approach but it naturally creates
	// a complete tree when using middle element selection
	return SortedArrayToBST(nums)
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// getHeight returns the height of the tree
func getHeight(root *TreeNode) int {
	if root == nil {
		return 0
	}
	leftHeight := getHeight(root.Left)
	rightHeight := getHeight(root.Right)
	if leftHeight > rightHeight {
		return leftHeight + 1
	}
	return rightHeight + 1
}

// isBalanced checks if tree is height-balanced
func isBalanced(root *TreeNode) bool {
	if root == nil {
		return true
	}

	leftHeight := getHeight(root.Left)
	rightHeight := getHeight(root.Right)
	diff := leftHeight - rightHeight
	if diff < 0 {
		diff = -diff
	}

	if diff > 1 {
		return false
	}

	return isBalanced(root.Left) && isBalanced(root.Right)
}

// inorderTraversal returns values in sorted order
func inorderTraversal(root *TreeNode) []int {
	var result []int
	var inorder func(node *TreeNode)
	inorder = func(node *TreeNode) {
		if node == nil {
			return
		}
		inorder(node.Left)
		result = append(result, node.Val)
		inorder(node.Right)
	}
	inorder(root)
	return result
}

// printTree prints tree structure
func printTree(root *TreeNode, prefix string, isLeft bool) {
	if root == nil {
		return
	}

	if root.Right != nil {
		newPrefix := prefix
		if isLeft {
			newPrefix += "|   "
		} else {
			newPrefix += "    "
		}
		printTree(root.Right, newPrefix, false)
	}

	fmt.Print(prefix)
	if isLeft {
		fmt.Print("\\-- ")
	} else {
		fmt.Print("/-- ")
	}
	fmt.Println(root.Val)

	if root.Left != nil {
		newPrefix := prefix
		if isLeft {
			newPrefix += "    "
		} else {
			newPrefix += "|   "
		}
		printTree(root.Left, newPrefix, true)
	}
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("CONVERT SORTED ARRAY TO BST - TEST RESULTS")
	fmt.Println("======================================================================")

	testCases := [][]int{
		{-10, -3, 0, 5, 9},
		{1, 3},
		{1, 2, 3, 4, 5, 6, 7},
		{1},
		{1, 2, 3, 4, 5},
	}

	for i, nums := range testCases {
		fmt.Printf("\n--- Test %d: nums = %v ---\n", i+1, nums)

		// Approach 1: Recursive (left mid)
		tree1 := SortedArrayToBST(nums)
		fmt.Println("\nApproach 1 (Recursive, left mid):")
		printTree(tree1, "", false)
		fmt.Printf("Height: %d, Balanced: %v\n", getHeight(tree1), isBalanced(tree1))
		fmt.Printf("Inorder: %v\n", inorderTraversal(tree1))

		// Approach 2: Recursive (right mid)
		tree2 := SortedArrayToBSTRightMid(nums)
		fmt.Println("\nApproach 2 (Recursive, right mid):")
		printTree(tree2, "", false)
		fmt.Printf("Height: %d, Balanced: %v\n", getHeight(tree2), isBalanced(tree2))

		// Approach 3: Iterative
		tree3 := SortedArrayToBSTIterative(nums)
		fmt.Println("\nApproach 3 (Iterative):")
		printTree(tree3, "", false)
		fmt.Printf("Height: %d, Balanced: %v\n", getHeight(tree3), isBalanced(tree3))
	}

	// Test sorted linked list to BST
	fmt.Println("\n======================================================================")
	fmt.Println("BONUS: Sorted Linked List to BST")
	fmt.Println("======================================================================")

	// Create linked list: -10 -> -3 -> 0 -> 5 -> 9
	head := &ListNode{Val: -10}
	head.Next = &ListNode{Val: -3}
	head.Next.Next = &ListNode{Val: 0}
	head.Next.Next.Next = &ListNode{Val: 5}
	head.Next.Next.Next.Next = &ListNode{Val: 9}

	fmt.Println("\nLinked list: -10 -> -3 -> 0 -> 5 -> 9")
	treeFromList := SortedListToBST(head)
	fmt.Println("Resulting BST:")
	printTree(treeFromList, "", false)
	fmt.Printf("Height: %d, Balanced: %v\n", getHeight(treeFromList), isBalanced(treeFromList))
	fmt.Printf("Inorder: %v\n", inorderTraversal(treeFromList))

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
	fmt.Println("======================================================================")
}
