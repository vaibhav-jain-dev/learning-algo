/*
All Kinds of Node Depths - Go Solution

Calculate the sum of depths for every node treated as root, then sum all results.

Time Complexity: O(n) with optimized approach
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

// AllKindsOfNodeDepths calculates sum of all node depths treating each node as root
func AllKindsOfNodeDepths(root *BinaryTree) int {
	return allNodeDepthsHelper(root, 0)
}

// allNodeDepthsHelper uses depth accumulation
func allNodeDepthsHelper(node *BinaryTree, depth int) int {
	if node == nil {
		return 0
	}

	return allNodeDepthsHelper(node.Left, depth+1) +
		allNodeDepthsHelper(node.Right, depth+1) +
		nodeDepths(node, 0)
}

// nodeDepths calculates standard sum of depths from a given root
func nodeDepths(node *BinaryTree, depth int) int {
	if node == nil {
		return 0
	}
	return depth + nodeDepths(node.Left, depth+1) + nodeDepths(node.Right, depth+1)
}

// AllKindsOfNodeDepthsOptimized is the O(n) solution
func AllKindsOfNodeDepthsOptimized(root *BinaryTree) int {
	total := 0
	getAllInfo(root, &total)
	return total
}

// getAllInfo returns (subtree_size, depth_sum_from_node)
func getAllInfo(node *BinaryTree, total *int) (int, int) {
	if node == nil {
		return 0, 0
	}

	leftSize, leftDepths := getAllInfo(node.Left, total)
	rightSize, rightDepths := getAllInfo(node.Right, total)

	subtreeSize := 1 + leftSize + rightSize
	depthsFromHere := leftDepths + leftSize + rightDepths + rightSize

	*total += depthsFromHere

	return subtreeSize, depthsFromHere
}

// TreeInfo stores subtree information
type TreeInfo struct {
	NumNodes       int
	SumOfDepths    int // Standard depths sum from this root
	SumOfAllDepths int // All kinds sum in subtree
}

// AllKindsOfNodeDepthsV2 is an alternative implementation
func AllKindsOfNodeDepthsV2(root *BinaryTree) int {
	return getTreeInfo(root).SumOfAllDepths
}

// getTreeInfo gets complete depth information for subtree
func getTreeInfo(node *BinaryTree) TreeInfo {
	if node == nil {
		return TreeInfo{0, 0, 0}
	}

	leftInfo := getTreeInfo(node.Left)
	rightInfo := getTreeInfo(node.Right)

	numNodes := 1 + leftInfo.NumNodes + rightInfo.NumNodes

	// Sum of depths from this node as root
	sumOfDepths := leftInfo.SumOfDepths + leftInfo.NumNodes +
		rightInfo.SumOfDepths + rightInfo.NumNodes

	// Sum of all depths in this subtree
	sumOfAllDepths := sumOfDepths + leftInfo.SumOfAllDepths + rightInfo.SumOfAllDepths

	return TreeInfo{numNodes, sumOfDepths, sumOfAllDepths}
}

func main() {
	// Build test tree:
	//        1
	//      /   \
	//     2     3
	//    / \   / \
	//   4   5 6   7
	//  / \
	// 8   9

	root := &BinaryTree{Value: 1}
	root.Left = &BinaryTree{Value: 2}
	root.Right = &BinaryTree{Value: 3}
	root.Left.Left = &BinaryTree{Value: 4}
	root.Left.Right = &BinaryTree{Value: 5}
	root.Right.Left = &BinaryTree{Value: 6}
	root.Right.Right = &BinaryTree{Value: 7}
	root.Left.Left.Left = &BinaryTree{Value: 8}
	root.Left.Left.Right = &BinaryTree{Value: 9}

	// Test 1: Basic approach
	result1 := AllKindsOfNodeDepths(root)
	fmt.Printf("Test 1 (basic): %d\n", result1)
	// Expected: 26

	// Test 2: Optimized approach
	result2 := AllKindsOfNodeDepthsOptimized(root)
	fmt.Printf("Test 2 (optimized): %d\n", result2)

	// Test 3: V2 approach
	result3 := AllKindsOfNodeDepthsV2(root)
	fmt.Printf("Test 3 (v2): %d\n", result3)

	// Test 4: Single node
	single := &BinaryTree{Value: 1}
	result4 := AllKindsOfNodeDepths(single)
	fmt.Printf("\nTest 4 (single node): %d\n", result4)
	// Expected: 0

	// Test 5: Empty tree
	result5 := AllKindsOfNodeDepths(nil)
	fmt.Printf("Test 5 (empty): %d\n", result5)
	// Expected: 0

	// Test 6: Linear tree (all left)
	linear := &BinaryTree{Value: 1}
	linear.Left = &BinaryTree{Value: 2}
	linear.Left.Left = &BinaryTree{Value: 3}
	result6 := AllKindsOfNodeDepths(linear)
	result6Opt := AllKindsOfNodeDepthsOptimized(linear)
	fmt.Printf("\nTest 6 (linear tree): basic=%d, optimized=%d\n", result6, result6Opt)
	// Expected: 4

	// Test 7: Complete two-level tree
	twoLevel := &BinaryTree{Value: 1}
	twoLevel.Left = &BinaryTree{Value: 2}
	twoLevel.Right = &BinaryTree{Value: 3}
	result7 := AllKindsOfNodeDepths(twoLevel)
	fmt.Printf("Test 7 (two-level): %d\n", result7)
	// Expected: 2

	// Verify with simple calculation
	fmt.Println("\nManual verification for test tree:")
	fmt.Printf("  Standard depths from root: %d\n", nodeDepths(root, 0))
	fmt.Printf("  From node 2: %d\n", nodeDepths(root.Left, 0))
	fmt.Printf("  From node 3: %d\n", nodeDepths(root.Right, 0))
	fmt.Printf("  From node 4: %d\n", nodeDepths(root.Left.Left, 0))

	fmt.Println("\nAll tests completed!")
}
