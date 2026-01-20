/*
Max Path Sum in Binary Tree - Go Solution

Find the maximum path sum where path can start and end at any node.

Time Complexity: O(n)
Space Complexity: O(h) for recursion stack
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

// MaxPathSum finds the maximum path sum in a binary tree
func MaxPathSum(root *BinaryTree) int {
	maxSum := math.MinInt32
	findMaxPath(root, &maxSum)
	return maxSum
}

// findMaxPath returns max straight path while updating global max
func findMaxPath(node *BinaryTree, maxSum *int) int {
	if node == nil {
		return 0
	}

	// Get max path sums from children (use 0 if negative)
	leftMax := max(0, findMaxPath(node.Left, maxSum))
	rightMax := max(0, findMaxPath(node.Right, maxSum))

	// Maximum path sum through this node
	pathThroughNode := node.Value + leftMax + rightMax

	// Update global maximum
	if pathThroughNode > *maxSum {
		*maxSum = pathThroughNode
	}

	// Return max straight path for parent to use
	return node.Value + max(leftMax, rightMax)
}

// TreeInfo holds path sum information
type TreeInfo struct {
	MaxPathSum   int // Max path sum in subtree
	MaxBranchSum int // Max sum starting at root going down
}

// MaxPathSumV2 is an alternative implementation
func MaxPathSumV2(root *BinaryTree) int {
	return getMaxPathInfo(root).MaxPathSum
}

func getMaxPathInfo(node *BinaryTree) TreeInfo {
	if node == nil {
		return TreeInfo{math.MinInt32, 0}
	}

	leftInfo := getMaxPathInfo(node.Left)
	rightInfo := getMaxPathInfo(node.Right)

	// Max branch sum starting at this node
	maxChildBranch := max(leftInfo.MaxBranchSum, rightInfo.MaxBranchSum)
	maxBranchSum := max(node.Value, node.Value+maxChildBranch)

	// Max path sum through this node
	maxSumThrough := max(maxBranchSum, node.Value+leftInfo.MaxBranchSum+rightInfo.MaxBranchSum)

	// Overall max path sum in this subtree
	runningMax := max(leftInfo.MaxPathSum, rightInfo.MaxPathSum)
	maxPath := max(runningMax, maxSumThrough)

	return TreeInfo{maxPath, maxBranchSum}
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func main() {
	// Build test tree 1:
	//        1
	//      /   \
	//     2     3
	//    / \   / \
	//   4   5 6   7

	root1 := &BinaryTree{Value: 1}
	root1.Left = &BinaryTree{Value: 2}
	root1.Right = &BinaryTree{Value: 3}
	root1.Left.Left = &BinaryTree{Value: 4}
	root1.Left.Right = &BinaryTree{Value: 5}
	root1.Right.Left = &BinaryTree{Value: 6}
	root1.Right.Right = &BinaryTree{Value: 7}

	// Test 1: Main example
	result1 := MaxPathSum(root1)
	fmt.Printf("Test 1: %d\n", result1)
	// Expected: 18 (path: 5 -> 2 -> 1 -> 3 -> 7)

	// Build test tree 2:
	//       -10
	//       /  \
	//      9   20
	//         /  \
	//        15   7

	root2 := &BinaryTree{Value: -10}
	root2.Left = &BinaryTree{Value: 9}
	root2.Right = &BinaryTree{Value: 20}
	root2.Right.Left = &BinaryTree{Value: 15}
	root2.Right.Right = &BinaryTree{Value: 7}

	// Test 2: Negative root
	result2 := MaxPathSum(root2)
	fmt.Printf("Test 2: %d\n", result2)
	// Expected: 42 (path: 15 -> 20 -> 7)

	// Test 3: Single node
	single := &BinaryTree{Value: 5}
	result3 := MaxPathSum(single)
	fmt.Printf("Test 3 (single node): %d\n", result3)
	// Expected: 5

	// Test 4: All negative values
	allNeg := &BinaryTree{Value: -3}
	allNeg.Left = &BinaryTree{Value: -1}
	allNeg.Right = &BinaryTree{Value: -2}
	result4 := MaxPathSum(allNeg)
	fmt.Printf("Test 4 (all negative): %d\n", result4)
	// Expected: -1

	// Test 5: Linear tree
	linear := &BinaryTree{Value: 1}
	linear.Left = &BinaryTree{Value: 2}
	linear.Left.Left = &BinaryTree{Value: 3}
	result5 := MaxPathSum(linear)
	fmt.Printf("Test 5 (linear): %d\n", result5)
	// Expected: 6

	// Test 6: Alternative implementation
	result6 := MaxPathSumV2(root1)
	result7 := MaxPathSumV2(root2)
	fmt.Printf("\nTest 6 (v2 tree1): %d\n", result6)
	fmt.Printf("Test 7 (v2 tree2): %d\n", result7)

	// Test 8: Mixed positive and negative
	mixed := &BinaryTree{Value: 1}
	mixed.Left = &BinaryTree{Value: -2}
	mixed.Right = &BinaryTree{Value: 3}
	mixed.Left.Left = &BinaryTree{Value: 4}
	mixed.Left.Right = &BinaryTree{Value: 5}
	mixed.Right.Left = &BinaryTree{Value: -6}
	mixed.Right.Right = &BinaryTree{Value: 2}
	result8 := MaxPathSum(mixed)
	fmt.Printf("\nTest 8 (mixed): %d\n", result8)

	// Test 9: Path doesn't go through root
	notThroughRoot := &BinaryTree{Value: 1}
	notThroughRoot.Left = &BinaryTree{Value: 10}
	notThroughRoot.Left.Left = &BinaryTree{Value: 2}
	notThroughRoot.Left.Right = &BinaryTree{Value: 3}
	result9 := MaxPathSum(notThroughRoot)
	fmt.Printf("Test 9 (not through root): %d\n", result9)
	// Path: 2 -> 10 -> 3 = 15, or 1 -> 10 -> 3 = 14, or all = 16

	fmt.Println("\nAll tests completed!")
}
