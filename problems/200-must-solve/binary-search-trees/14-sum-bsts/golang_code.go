/*
Sum BSTs - Go Solution

Find the sum of all BST subtrees in a binary tree.
Uses post-order traversal to validate BSTs and accumulate sums.

Time Complexity: O(n)
Space Complexity: O(h) where h is tree height
*/

package main

import (
	"fmt"
	"math"
)

// TreeNode represents a node in the binary tree
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// subtreeInfo contains information about a subtree
type subtreeInfo struct {
	isBST  bool
	sum    int
	minVal int
	maxVal int
}

// SumBSTs finds the sum of all values in all BST subtrees.
//
// Uses post-order traversal to determine if each subtree is a valid BST.
// For each node, we track:
// - Whether the subtree rooted here is a valid BST
// - Sum of nodes in this subtree
// - Minimum value in this subtree
// - Maximum value in this subtree
func SumBSTs(root *TreeNode) int {
	totalSum := 0

	var dfs func(node *TreeNode) subtreeInfo
	dfs = func(node *TreeNode) subtreeInfo {
		// For null nodes: is_bst=true, sum=0, min=+inf, max=-inf
		// This allows easy boundary checking
		if node == nil {
			return subtreeInfo{
				isBST:  true,
				sum:    0,
				minVal: math.MaxInt32,
				maxVal: math.MinInt32,
			}
		}

		// Get info from left and right subtrees (post-order)
		left := dfs(node.Left)
		right := dfs(node.Right)

		// Calculate current subtree's sum
		currentSum := left.sum + right.sum + node.Val

		// Calculate min and max for current subtree
		currentMin := min(node.Val, min(left.minVal, right.minVal))
		currentMax := max(node.Val, max(left.maxVal, right.maxVal))

		// Check if current subtree is a valid BST
		// Conditions:
		// 1. Both children must be BSTs
		// 2. left.maxVal < node.Val (all left values less than current)
		// 3. right.minVal > node.Val (all right values greater than current)
		isBST := left.isBST && right.isBST &&
			left.maxVal < node.Val && right.minVal > node.Val

		// If this subtree is a BST, add its sum to total
		if isBST {
			totalSum += currentSum
		}

		return subtreeInfo{
			isBST:  isBST,
			sum:    currentSum,
			minVal: currentMin,
			maxVal: currentMax,
		}
	}

	dfs(root)
	return totalSum
}

// MaxSumBST finds the maximum sum among all BST subtrees.
// This is LeetCode 1373.
func MaxSumBST(root *TreeNode) int {
	maxSum := 0 // At minimum, empty subtree has sum 0

	var dfs func(node *TreeNode) subtreeInfo
	dfs = func(node *TreeNode) subtreeInfo {
		if node == nil {
			return subtreeInfo{
				isBST:  true,
				sum:    0,
				minVal: math.MaxInt32,
				maxVal: math.MinInt32,
			}
		}

		left := dfs(node.Left)
		right := dfs(node.Right)

		currentSum := left.sum + right.sum + node.Val
		currentMin := min(node.Val, min(left.minVal, right.minVal))
		currentMax := max(node.Val, max(left.maxVal, right.maxVal))

		isBST := left.isBST && right.isBST &&
			left.maxVal < node.Val && right.minVal > node.Val

		if isBST && currentSum > maxSum {
			maxSum = currentSum
		}

		return subtreeInfo{
			isBST:  isBST,
			sum:    currentSum,
			minVal: currentMin,
			maxVal: currentMax,
		}
	}

	dfs(root)
	return maxSum
}

// CountBSTSubtrees counts the number of subtrees that are valid BSTs.
func CountBSTSubtrees(root *TreeNode) int {
	count := 0

	type minMaxInfo struct {
		isBST  bool
		minVal int
		maxVal int
	}

	var dfs func(node *TreeNode) minMaxInfo
	dfs = func(node *TreeNode) minMaxInfo {
		if node == nil {
			return minMaxInfo{
				isBST:  true,
				minVal: math.MaxInt32,
				maxVal: math.MinInt32,
			}
		}

		left := dfs(node.Left)
		right := dfs(node.Right)

		currentMin := min(node.Val, min(left.minVal, right.minVal))
		currentMax := max(node.Val, max(left.maxVal, right.maxVal))

		isBST := left.isBST && right.isBST &&
			left.maxVal < node.Val && right.minVal > node.Val

		if isBST {
			count++
		}

		return minMaxInfo{
			isBST:  isBST,
			minVal: currentMin,
			maxVal: currentMax,
		}
	}

	dfs(root)
	return count
}

// LargestBSTSubtree finds the size (node count) of the largest BST subtree.
// This is LeetCode 333.
func LargestBSTSubtree(root *TreeNode) int {
	maxSize := 0

	type sizeInfo struct {
		isBST  bool
		size   int
		minVal int
		maxVal int
	}

	var dfs func(node *TreeNode) sizeInfo
	dfs = func(node *TreeNode) sizeInfo {
		if node == nil {
			return sizeInfo{
				isBST:  true,
				size:   0,
				minVal: math.MaxInt32,
				maxVal: math.MinInt32,
			}
		}

		left := dfs(node.Left)
		right := dfs(node.Right)

		currentSize := left.size + right.size + 1
		currentMin := min(node.Val, min(left.minVal, right.minVal))
		currentMax := max(node.Val, max(left.maxVal, right.maxVal))

		isBST := left.isBST && right.isBST &&
			left.maxVal < node.Val && right.minVal > node.Val

		if isBST && currentSize > maxSize {
			maxSize = currentSize
		}

		return sizeInfo{
			isBST:  isBST,
			size:   currentSize,
			minVal: currentMin,
			maxVal: currentMax,
		}
	}

	dfs(root)
	return maxSize
}

// visualizeTree prints tree structure for debugging
func visualizeTree(root *TreeNode, level int, prefix string) {
	if root != nil {
		indent := ""
		for i := 0; i < level*4; i++ {
			indent += " "
		}
		fmt.Printf("%s%s%d\n", indent, prefix, root.Val)
		if root.Left != nil || root.Right != nil {
			if root.Left != nil {
				visualizeTree(root.Left, level+1, "L--- ")
			} else {
				fmt.Printf("%s    L--- nil\n", indent)
			}
			if root.Right != nil {
				visualizeTree(root.Right, level+1, "R--- ")
			} else {
				fmt.Printf("%s    R--- nil\n", indent)
			}
		}
	}
}

func main() {
	fmt.Println("=== Sum BSTs Tests ===")
	fmt.Println()

	// Test 1: Mixed tree with some BST subtrees
	//        1
	//       / \
	//      4   3
	//     / \   \
	//    2   4   5
	//           / \
	//          4   6
	fmt.Println("Test 1: Mixed tree")
	root1 := &TreeNode{Val: 1}
	root1.Left = &TreeNode{Val: 4}
	root1.Right = &TreeNode{Val: 3}
	root1.Left.Left = &TreeNode{Val: 2}
	root1.Left.Right = &TreeNode{Val: 4}
	root1.Right.Right = &TreeNode{Val: 5}
	root1.Right.Right.Left = &TreeNode{Val: 4}
	root1.Right.Right.Right = &TreeNode{Val: 6}

	visualizeTree(root1, 0, "Root: ")
	fmt.Println()

	fmt.Printf("Sum of all BST subtree sums: %d\n", SumBSTs(root1))
	fmt.Printf("Count of BST subtrees: %d\n", CountBSTSubtrees(root1))
	fmt.Printf("Max BST subtree sum: %d\n", MaxSumBST(root1))
	fmt.Printf("Largest BST subtree size: %d\n", LargestBSTSubtree(root1))
	fmt.Println()

	// Test 2: Tree where root subtree is not BST
	//        5
	//       / \
	//      4   8
	//     /   / \
	//    3   6   3
	fmt.Println("Test 2: Root is not BST")
	root2 := &TreeNode{Val: 5}
	root2.Left = &TreeNode{Val: 4}
	root2.Right = &TreeNode{Val: 8}
	root2.Left.Left = &TreeNode{Val: 3}
	root2.Right.Left = &TreeNode{Val: 6}
	root2.Right.Right = &TreeNode{Val: 3}

	visualizeTree(root2, 0, "Root: ")
	fmt.Println()

	fmt.Printf("Sum of all BST subtree sums: %d\n", SumBSTs(root2))
	fmt.Printf("Count of BST subtrees: %d\n", CountBSTSubtrees(root2))
	fmt.Println()

	// Test 3: Simple tree that's not a BST
	//        1
	//       / \
	//      2   3
	fmt.Println("Test 3: Simple non-BST")
	root3 := &TreeNode{Val: 1}
	root3.Left = &TreeNode{Val: 2}
	root3.Right = &TreeNode{Val: 3}

	visualizeTree(root3, 0, "Root: ")
	fmt.Println()

	fmt.Printf("Sum of all BST subtree sums: %d\n", SumBSTs(root3))
	// Only leaves 2 and 3 are BSTs: 2 + 3 = 5
	fmt.Println()

	// Test 4: Complete valid BST
	//        4
	//       / \
	//      2   6
	//     / \ / \
	//    1  3 5  7
	fmt.Println("Test 4: Complete valid BST")
	root4 := &TreeNode{Val: 4}
	root4.Left = &TreeNode{Val: 2}
	root4.Right = &TreeNode{Val: 6}
	root4.Left.Left = &TreeNode{Val: 1}
	root4.Left.Right = &TreeNode{Val: 3}
	root4.Right.Left = &TreeNode{Val: 5}
	root4.Right.Right = &TreeNode{Val: 7}

	visualizeTree(root4, 0, "Root: ")
	fmt.Println()

	fmt.Printf("Sum of all BST subtree sums: %d\n", SumBSTs(root4))
	fmt.Printf("Count of BST subtrees: %d\n", CountBSTSubtrees(root4))
	// All subtrees are BSTs:
	// Leaves: 1, 3, 5, 7 (sum = 16)
	// Subtree at 2: 1+2+3=6
	// Subtree at 6: 5+6+7=18
	// Subtree at 4 (root): 1+2+3+4+5+6+7=28
	// Total: 16 + 6 + 18 + 28 = 68
	fmt.Println()

	// Test 5: Single node
	fmt.Println("Test 5: Single node")
	root5 := &TreeNode{Val: 42}

	fmt.Printf("Sum of all BST subtree sums: %d\n", SumBSTs(root5)) // Should be 42
	fmt.Println()

	// Test 6: Skewed tree (all left)
	//      5
	//     /
	//    4
	//   /
	//  3
	fmt.Println("Test 6: Left-skewed tree (valid BST)")
	root6 := &TreeNode{Val: 5}
	root6.Left = &TreeNode{Val: 4}
	root6.Left.Left = &TreeNode{Val: 3}

	visualizeTree(root6, 0, "Root: ")
	fmt.Println()

	fmt.Printf("Sum of all BST subtree sums: %d\n", SumBSTs(root6))
	// Node 3: sum=3
	// Subtree at 4: sum=3+4=7
	// Subtree at 5: sum=3+4+5=12
	// Total: 3 + 7 + 12 = 22
	fmt.Printf("Count of BST subtrees: %d\n", CountBSTSubtrees(root6))
	fmt.Println()

	// Test 7: Tree with negative values
	fmt.Println("Test 7: Tree with negative values")
	//       0
	//      / \
	//    -3   2
	//    /   / \
	//  -5   1   4
	root7 := &TreeNode{Val: 0}
	root7.Left = &TreeNode{Val: -3}
	root7.Right = &TreeNode{Val: 2}
	root7.Left.Left = &TreeNode{Val: -5}
	root7.Right.Left = &TreeNode{Val: 1}
	root7.Right.Right = &TreeNode{Val: 4}

	visualizeTree(root7, 0, "Root: ")
	fmt.Println()

	fmt.Printf("Sum of all BST subtree sums: %d\n", SumBSTs(root7))
	fmt.Printf("Max BST subtree sum: %d\n", MaxSumBST(root7))
	fmt.Printf("Count of BST subtrees: %d\n", CountBSTSubtrees(root7))

	fmt.Println()
	fmt.Println("All tests completed!")
}
