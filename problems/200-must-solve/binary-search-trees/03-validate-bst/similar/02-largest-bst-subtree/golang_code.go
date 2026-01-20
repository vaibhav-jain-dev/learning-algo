/*
Largest BST Subtree - Go Solutions

Find the largest subtree that is a valid BST in a binary tree.

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
// APPROACH 1: Post-order DFS with Struct Return
// ============================================================================
// Time Complexity:  O(n) - visit each node once
// Space Complexity: O(h) - recursion stack depth
//
// WHY THIS WORKS:
// - Bottom-up: process children before parent
// - Each node returns: (is_bst, min_val, max_val, size)
// - Parent combines children info to determine its own BST status
// ============================================================================

// SubtreeInfo holds information about a subtree for BST validation
type SubtreeInfo struct {
	IsBST  bool
	MinVal int
	MaxVal int
	Size   int
}

// LargestBSTSubtreeStruct finds size of largest BST using struct return
func LargestBSTSubtreeStruct(root *TreeNode) int {
	maxSize := 0

	var postorder func(node *TreeNode) SubtreeInfo
	postorder = func(node *TreeNode) SubtreeInfo {
		if node == nil {
			// Base case: empty tree is a valid BST
			return SubtreeInfo{
				IsBST:  true,
				MinVal: math.MaxInt64,
				MaxVal: math.MinInt64,
				Size:   0,
			}
		}

		// Get info from left and right subtrees
		left := postorder(node.Left)
		right := postorder(node.Right)

		// Check if current subtree is a valid BST
		if left.IsBST && right.IsBST &&
			left.MaxVal < node.Val && node.Val < right.MinVal {
			// Current subtree is a valid BST
			size := 1 + left.Size + right.Size
			if size > maxSize {
				maxSize = size
			}

			minVal := left.MinVal
			if minVal == math.MaxInt64 {
				minVal = node.Val
			}

			maxVal := right.MaxVal
			if maxVal == math.MinInt64 {
				maxVal = node.Val
			}

			return SubtreeInfo{
				IsBST:  true,
				MinVal: minVal,
				MaxVal: maxVal,
				Size:   size,
			}
		}

		// Current subtree is not a valid BST
		return SubtreeInfo{IsBST: false}
	}

	postorder(root)
	return maxSize
}

// ============================================================================
// APPROACH 2: Simplified with Tuple-like Return
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(h)
//
// WHY THIS IS ELEGANT:
// - Uses -1 size to indicate non-BST
// - Cleaner condition checking
// - More idiomatic Go with multiple return values
// ============================================================================

// LargestBSTSubtreeSimple uses multiple return values for cleaner code
func LargestBSTSubtreeSimple(root *TreeNode) int {
	maxSize := 0

	// Returns (size, min, max) where size=-1 means not BST
	var helper func(node *TreeNode) (int, int, int)
	helper = func(node *TreeNode) (int, int, int) {
		if node == nil {
			return 0, math.MaxInt64, math.MinInt64
		}

		leftSize, leftMin, leftMax := helper(node.Left)
		rightSize, rightMin, rightMax := helper(node.Right)

		// Check if either subtree is not a BST
		if leftSize == -1 || rightSize == -1 {
			return -1, 0, 0
		}

		// Check BST property at current node
		if leftMax < node.Val && node.Val < rightMin {
			size := 1 + leftSize + rightSize
			if size > maxSize {
				maxSize = size
			}

			currMin := leftMin
			if currMin == math.MaxInt64 {
				currMin = node.Val
			}

			currMax := rightMax
			if currMax == math.MinInt64 {
				currMax = node.Val
			}

			return size, currMin, currMax
		}

		// Not a BST
		return -1, 0, 0
	}

	helper(root)
	return maxSize
}

// ============================================================================
// APPROACH 3: Using Pointer for Max Size (Common Interview Pattern)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(h)
//
// WHY USE POINTER:
// - Avoids closure capture
// - More explicit about what's being modified
// - Common pattern in Go interviews
// ============================================================================

// LargestBSTSubtreePointer uses pointer to track max size
func LargestBSTSubtreePointer(root *TreeNode) int {
	maxSize := 0
	largestBSTHelper(root, &maxSize)
	return maxSize
}

// largestBSTHelper returns (isBST, min, max, size)
func largestBSTHelper(node *TreeNode, maxSize *int) (bool, int, int, int) {
	if node == nil {
		return true, math.MaxInt64, math.MinInt64, 0
	}

	leftBST, leftMin, leftMax, leftSize := largestBSTHelper(node.Left, maxSize)
	rightBST, rightMin, rightMax, rightSize := largestBSTHelper(node.Right, maxSize)

	if leftBST && rightBST && leftMax < node.Val && node.Val < rightMin {
		size := 1 + leftSize + rightSize
		if size > *maxSize {
			*maxSize = size
		}

		minVal := min(leftMin, node.Val)
		maxVal := max(rightMax, node.Val)

		return true, minVal, maxVal, size
	}

	return false, 0, 0, 0
}

// ============================================================================
// APPROACH 4: With Node Tracking (Extended Problem)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(h)
//
// WHY THIS VARIATION:
// - Sometimes you need to return the actual BST subtree root
// - Useful for follow-up questions
// ============================================================================

// LargestBSTWithRoot returns both size and the root of the largest BST
func LargestBSTWithRoot(root *TreeNode) (int, *TreeNode) {
	maxSize := 0
	var bstRoot *TreeNode

	var dfs func(node *TreeNode) (bool, int, int, int)
	dfs = func(node *TreeNode) (bool, int, int, int) {
		if node == nil {
			return true, math.MaxInt64, math.MinInt64, 0
		}

		leftBST, leftMin, leftMax, leftSize := dfs(node.Left)
		rightBST, rightMin, rightMax, rightSize := dfs(node.Right)

		if leftBST && rightBST && leftMax < node.Val && node.Val < rightMin {
			size := 1 + leftSize + rightSize
			if size > maxSize {
				maxSize = size
				bstRoot = node
			}

			minVal := leftMin
			if minVal == math.MaxInt64 {
				minVal = node.Val
			}
			maxVal := rightMax
			if maxVal == math.MinInt64 {
				maxVal = node.Val
			}

			return true, minVal, maxVal, size
		}

		return false, 0, 0, 0
	}

	dfs(root)
	return maxSize, bstRoot
}

// ============================================================================
// HELPER: Build tree from slice for testing
// ============================================================================

func buildTree(values []interface{}) *TreeNode {
	if len(values) == 0 || values[0] == nil {
		return nil
	}

	root := &TreeNode{Val: values[0].(int)}
	queue := []*TreeNode{root}
	i := 1

	for len(queue) > 0 && i < len(values) {
		node := queue[0]
		queue = queue[1:]

		if i < len(values) && values[i] != nil {
			node.Left = &TreeNode{Val: values[i].(int)}
			queue = append(queue, node.Left)
		}
		i++

		if i < len(values) && values[i] != nil {
			node.Right = &TreeNode{Val: values[i].(int)}
			queue = append(queue, node.Right)
		}
		i++
	}

	return root
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("LARGEST BST SUBTREE - TEST RESULTS")
	fmt.Println("======================================================================")

	testCases := []struct {
		values      []interface{}
		expected    int
		description string
	}{
		{[]interface{}{10, 5, 15, 1, 8, nil, 7}, 3, "Standard case: BST at node 5"},
		{[]interface{}{2, 1, 3}, 3, "Entire tree is BST"},
		{[]interface{}{1}, 1, "Single node"},
		{[]interface{}{4, 2, 7, 2, 3, 5}, 2, "Multiple small BSTs"},
		{[]interface{}{3, 2, 4, nil, nil, 1}, 2, "BST at node 2"},
	}

	for _, tc := range testCases {
		fmt.Printf("\n%s\n", tc.description)
		fmt.Printf("Input: %v\n", tc.values)
		fmt.Printf("Expected: %d\n", tc.expected)

		// Test struct approach
		root1 := buildTree(tc.values)
		result1 := LargestBSTSubtreeStruct(root1)
		status1 := "PASS"
		if result1 != tc.expected {
			status1 = fmt.Sprintf("FAIL (got %d)", result1)
		}
		fmt.Printf("  Struct approach:   %d - %s\n", result1, status1)

		// Test simple approach
		root2 := buildTree(tc.values)
		result2 := LargestBSTSubtreeSimple(root2)
		status2 := "PASS"
		if result2 != tc.expected {
			status2 = fmt.Sprintf("FAIL (got %d)", result2)
		}
		fmt.Printf("  Simple approach:   %d - %s\n", result2, status2)

		// Test pointer approach
		root3 := buildTree(tc.values)
		result3 := LargestBSTSubtreePointer(root3)
		status3 := "PASS"
		if result3 != tc.expected {
			status3 = fmt.Sprintf("FAIL (got %d)", result3)
		}
		fmt.Printf("  Pointer approach:  %d - %s\n", result3, status3)

		// Test with root tracking
		root4 := buildTree(tc.values)
		result4, bstRoot := LargestBSTWithRoot(root4)
		rootVal := "nil"
		if bstRoot != nil {
			rootVal = fmt.Sprintf("%d", bstRoot.Val)
		}
		fmt.Printf("  With root track:   %d (root=%s)\n", result4, rootVal)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
	fmt.Println("======================================================================")
}
