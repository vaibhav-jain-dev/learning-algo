/*
Binary Tree Maximum Path Sum - Go Solutions

Find the maximum path sum in a binary tree where path can start and end anywhere.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"math"
)

// BinaryTree represents a node in a binary tree
type BinaryTree struct {
	Value int
	Left  *BinaryTree
	Right *BinaryTree
}

// ============================================================================
// APPROACH 1: Post-Order DFS with Global Max (Recommended)
// ============================================================================
// Time Complexity:  O(n) - visit each node once
// Space Complexity: O(h) - recursion stack depth
//
// WHY THIS IS BEST:
// - Single pass through tree
// - Clean handling of negative values
// - Separates "extendable path" from "complete path"
// ============================================================================

// MaxPathSum finds the maximum path sum in the tree.
//
// Key insight: At each node, track:
// 1. Max path that can extend to parent (return value)
// 2. Max path through this node (update global max)
//
// Visual example:
//
//	       -10
//	       /  \
//	      9    20
//	          /  \
//	         15   7
//
//	Answer: 42 (path: 15 -> 20 -> 7)
func MaxPathSum(root *BinaryTree) int {
	if root == nil {
		return 0
	}

	maxSum := math.MinInt64

	var maxGain func(node *BinaryTree) int
	maxGain = func(node *BinaryTree) int {
		if node == nil {
			return 0
		}

		// Get max gain from children (ignore negative paths)
		leftGain := max(0, maxGain(node.Left))
		rightGain := max(0, maxGain(node.Right))

		// Calculate path through current node (potential answer)
		pathThroughNode := node.Value + leftGain + rightGain

		// Update global maximum
		maxSum = max(maxSum, pathThroughNode)

		// Return max gain to parent (can only extend one direction)
		return node.Value + max(leftGain, rightGain)
	}

	maxGain(root)
	return maxSum
}

// ============================================================================
// APPROACH 2: DFS Returning Struct (No Global State)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(h)
//
// WHEN TO USE:
// - When you want to avoid global/closure state
// - More explicit about what's being tracked
// ============================================================================

// PathInfo holds the result of DFS for each subtree
type PathInfo struct {
	MaxGain int // Max path sum that can extend upward
	MaxPath int // Max path sum in this subtree
}

// MaxPathSumNoGlobal finds max path sum without using global state.
func MaxPathSumNoGlobal(root *BinaryTree) int {
	if root == nil {
		return 0
	}
	return maxPathDFS(root).MaxPath
}

func maxPathDFS(node *BinaryTree) PathInfo {
	if node == nil {
		return PathInfo{MaxGain: 0, MaxPath: math.MinInt64}
	}

	left := maxPathDFS(node.Left)
	right := maxPathDFS(node.Right)

	// Max gain that can extend upward (ignore negative)
	leftGain := max(0, left.MaxGain)
	rightGain := max(0, right.MaxGain)

	// Path through current node
	pathThrough := node.Value + leftGain + rightGain

	// Max path in any subtree or through this node
	maxPath := max(pathThrough, max(left.MaxPath, right.MaxPath))

	// Max extendable gain
	maxGain := node.Value + max(leftGain, rightGain)

	return PathInfo{MaxGain: maxGain, MaxPath: maxPath}
}

// ============================================================================
// APPROACH 3: Iterative with Post-Order Traversal
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) for stack and result map
//
// WHEN TO USE:
// - When recursion depth is a concern
// - More complex but avoids stack overflow
// ============================================================================

// MaxPathSumIterative uses iterative post-order traversal.
func MaxPathSumIterative(root *BinaryTree) int {
	if root == nil {
		return 0
	}

	// Use two stacks for post-order
	stack1 := []*BinaryTree{root}
	stack2 := []*BinaryTree{}

	// First pass: build post-order sequence
	for len(stack1) > 0 {
		node := stack1[len(stack1)-1]
		stack1 = stack1[:len(stack1)-1]
		stack2 = append(stack2, node)

		if node.Left != nil {
			stack1 = append(stack1, node.Left)
		}
		if node.Right != nil {
			stack1 = append(stack1, node.Right)
		}
	}

	// Store max gain for each node
	gains := make(map[*BinaryTree]int)
	maxSum := math.MinInt64

	// Process in post-order (children before parent)
	for len(stack2) > 0 {
		node := stack2[len(stack2)-1]
		stack2 = stack2[:len(stack2)-1]

		leftGain := max(0, gains[node.Left])
		rightGain := max(0, gains[node.Right])

		// Path through current node
		pathThrough := node.Value + leftGain + rightGain
		maxSum = max(maxSum, pathThrough)

		// Store gain for parent
		gains[node] = node.Value + max(leftGain, rightGain)
	}

	return maxSum
}

// ============================================================================
// BONUS: Find the Actual Path
// ============================================================================

// PathResult contains both sum and the actual path nodes
type PathResult struct {
	Sum  int
	Path []int
}

// MaxPathSumWithPath returns both the max sum and the actual path.
func MaxPathSumWithPath(root *BinaryTree) PathResult {
	if root == nil {
		return PathResult{Sum: 0, Path: []int{}}
	}

	var maxResult PathResult
	maxResult.Sum = math.MinInt64

	var dfs func(node *BinaryTree) (int, []int)
	dfs = func(node *BinaryTree) (int, []int) {
		if node == nil {
			return 0, nil
		}

		leftGain, leftPath := dfs(node.Left)
		rightGain, rightPath := dfs(node.Right)

		// Use left/right only if positive
		useLeft := leftGain > 0
		useRight := rightGain > 0

		// Path through this node
		pathSum := node.Value
		var fullPath []int

		if useLeft {
			pathSum += leftGain
		}
		if useRight {
			pathSum += rightGain
		}

		if pathSum > maxResult.Sum {
			maxResult.Sum = pathSum
			// Build the full path
			fullPath = []int{}
			if useLeft {
				fullPath = append(fullPath, leftPath...)
			}
			fullPath = append(fullPath, node.Value)
			if useRight {
				fullPath = append(fullPath, rightPath...)
			}
			maxResult.Path = fullPath
		}

		// Return best extendable path
		if !useLeft && !useRight {
			return node.Value, []int{node.Value}
		} else if leftGain >= rightGain && useLeft {
			return node.Value + leftGain, append(leftPath, node.Value)
		} else if useRight {
			return node.Value + rightGain, append([]int{node.Value}, rightPath...)
		}
		return node.Value, []int{node.Value}
	}

	dfs(root)
	return maxResult
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("BINARY TREE MAXIMUM PATH SUM - TEST RESULTS")
	fmt.Println("======================================================================")

	// Test Case 1: Standard tree
	//    1
	//   / \
	//  2   3
	root1 := &BinaryTree{Value: 1}
	root1.Left = &BinaryTree{Value: 2}
	root1.Right = &BinaryTree{Value: 3}

	fmt.Println("\nTest 1: Simple tree (1->2, 1->3)")
	fmt.Printf("  Result: %d\n", MaxPathSum(root1))
	fmt.Println("  Expected: 6 (path: 2->1->3)")

	// Test Case 2: Tree with negative root
	//       -10
	//       /  \
	//      9    20
	//          /  \
	//         15   7
	root2 := &BinaryTree{Value: -10}
	root2.Left = &BinaryTree{Value: 9}
	root2.Right = &BinaryTree{Value: 20}
	root2.Right.Left = &BinaryTree{Value: 15}
	root2.Right.Right = &BinaryTree{Value: 7}

	fmt.Println("\nTest 2: Tree with negative root")
	fmt.Printf("  Result: %d\n", MaxPathSum(root2))
	fmt.Println("  Expected: 42 (path: 15->20->7)")

	// Test Case 3: Single negative node
	root3 := &BinaryTree{Value: -3}
	fmt.Println("\nTest 3: Single negative node")
	fmt.Printf("  Result: %d\n", MaxPathSum(root3))
	fmt.Println("  Expected: -3")

	// Test Case 4: All negative values
	root4 := &BinaryTree{Value: -2}
	root4.Left = &BinaryTree{Value: -1}
	fmt.Println("\nTest 4: All negative values")
	fmt.Printf("  Result: %d\n", MaxPathSum(root4))
	fmt.Println("  Expected: -1")

	// Test Case 5: Linear tree
	root5 := &BinaryTree{Value: 1}
	root5.Left = &BinaryTree{Value: 2}
	root5.Left.Left = &BinaryTree{Value: 3}
	fmt.Println("\nTest 5: Linear tree (1->2->3)")
	fmt.Printf("  Result: %d\n", MaxPathSum(root5))
	fmt.Println("  Expected: 6")

	// Compare approaches
	fmt.Println("\n======================================================================")
	fmt.Println("COMPARING APPROACHES")
	fmt.Println("======================================================================")

	fmt.Println("\nUsing tree with negative root:")
	fmt.Printf("  Approach 1 (Global Max): %d\n", MaxPathSum(root2))
	fmt.Printf("  Approach 2 (No Global):  %d\n", MaxPathSumNoGlobal(root2))
	fmt.Printf("  Approach 3 (Iterative):  %d\n", MaxPathSumIterative(root2))

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
}
