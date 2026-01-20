/*
Range Sum of BST - Go Solution

Calculate the sum of all node values within a given range in a BST.

Time Complexity: O(n) worst case, often O(h + k) with BST pruning
Space Complexity: O(h) for recursion stack
*/

package main

import (
	"fmt"
	"strings"
)

// TreeNode represents a node in Binary Search Tree
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// RangeSumBST calculates sum of all nodes with values in range [low, high]
// Uses DFS with BST pruning to skip branches that cannot
// contain values in the range
func RangeSumBST(root *TreeNode, low, high int) int {
	if root == nil {
		return 0
	}

	// If current value is less than low, only right subtree matters
	if root.Val < low {
		return RangeSumBST(root.Right, low, high)
	}

	// If current value is greater than high, only left subtree matters
	if root.Val > high {
		return RangeSumBST(root.Left, low, high)
	}

	// Current value is in range, include it and search both subtrees
	return root.Val +
		RangeSumBST(root.Left, low, high) +
		RangeSumBST(root.Right, low, high)
}

// RangeSumBSTIterative is an iterative solution using stack with BST pruning
func RangeSumBSTIterative(root *TreeNode, low, high int) int {
	if root == nil {
		return 0
	}

	total := 0
	stack := []*TreeNode{root}

	for len(stack) > 0 {
		// Pop from stack
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if node == nil {
			continue
		}

		if node.Val < low {
			// Only explore right subtree
			stack = append(stack, node.Right)
		} else if node.Val > high {
			// Only explore left subtree
			stack = append(stack, node.Left)
		} else {
			// Value in range, add it and explore both subtrees
			total += node.Val
			stack = append(stack, node.Left)
			stack = append(stack, node.Right)
		}
	}

	return total
}

// RangeSumBSTBFS is a BFS solution using queue with BST pruning
func RangeSumBSTBFS(root *TreeNode, low, high int) int {
	if root == nil {
		return 0
	}

	total := 0
	queue := []*TreeNode{root}

	for len(queue) > 0 {
		// Dequeue
		node := queue[0]
		queue = queue[1:]

		if node == nil {
			continue
		}

		if node.Val < low {
			queue = append(queue, node.Right)
		} else if node.Val > high {
			queue = append(queue, node.Left)
		} else {
			total += node.Val
			queue = append(queue, node.Left)
			queue = append(queue, node.Right)
		}
	}

	return total
}

// CountNodesInRange counts nodes with values in range (related problem)
func CountNodesInRange(root *TreeNode, low, high int) int {
	if root == nil {
		return 0
	}

	if root.Val < low {
		return CountNodesInRange(root.Right, low, high)
	}

	if root.Val > high {
		return CountNodesInRange(root.Left, low, high)
	}

	return 1 +
		CountNodesInRange(root.Left, low, high) +
		CountNodesInRange(root.Right, low, high)
}

// Insert inserts a value into BST
func Insert(root *TreeNode, val int) {
	if val < root.Val {
		if root.Left == nil {
			root.Left = &TreeNode{Val: val}
		} else {
			Insert(root.Left, val)
		}
	} else {
		if root.Right == nil {
			root.Right = &TreeNode{Val: val}
		} else {
			Insert(root.Right, val)
		}
	}
}

// PrintTree prints tree structure
func PrintTree(node *TreeNode, level int, prefix string) {
	if node == nil {
		return
	}
	fmt.Printf("%s%s%d\n", strings.Repeat("    ", level), prefix, node.Val)
	if node.Left != nil || node.Right != nil {
		if node.Left != nil {
			PrintTree(node.Left, level+1, "L--- ")
		} else {
			fmt.Printf("%sL--- nil\n", strings.Repeat("    ", level+1))
		}
		if node.Right != nil {
			PrintTree(node.Right, level+1, "R--- ")
		} else {
			fmt.Printf("%sR--- nil\n", strings.Repeat("    ", level+1))
		}
	}
}

func main() {
	// Test 1: Example from problem
	// Build tree:    10
	//              /    \
	//             5      15
	//            / \       \
	//           3   7      18
	root1 := &TreeNode{Val: 10}
	root1.Left = &TreeNode{Val: 5}
	root1.Right = &TreeNode{Val: 15}
	root1.Left.Left = &TreeNode{Val: 3}
	root1.Left.Right = &TreeNode{Val: 7}
	root1.Right.Right = &TreeNode{Val: 18}

	fmt.Println("Test 1 Tree:")
	PrintTree(root1, 0, "Root: ")
	result1 := RangeSumBST(root1, 7, 15)
	fmt.Printf("Range sum [7, 15]: %d\n\n", result1) // Expected: 32 (7+10+15)

	// Test 2: Larger tree
	// Build tree:       10
	//                 /    \
	//                5      15
	//               / \    /  \
	//              3   7  13   18
	//             /   /
	//            1   6
	root2 := &TreeNode{Val: 10}
	root2.Left = &TreeNode{Val: 5}
	root2.Right = &TreeNode{Val: 15}
	root2.Left.Left = &TreeNode{Val: 3}
	root2.Left.Right = &TreeNode{Val: 7}
	root2.Right.Left = &TreeNode{Val: 13}
	root2.Right.Right = &TreeNode{Val: 18}
	root2.Left.Left.Left = &TreeNode{Val: 1}
	root2.Left.Right.Left = &TreeNode{Val: 6}

	fmt.Println("Test 2 Tree:")
	PrintTree(root2, 0, "Root: ")
	result2 := RangeSumBST(root2, 6, 10)
	fmt.Printf("Range sum [6, 10]: %d\n\n", result2) // Expected: 23 (6+7+10)

	// Test 3: Entire tree in range
	result3 := RangeSumBST(root2, 1, 100)
	fmt.Printf("Test 3 - Entire tree [1, 100]: %d\n\n", result3) // Expected: 78

	// Test 4: Single node in range
	result4 := RangeSumBST(root2, 10, 10)
	fmt.Printf("Test 4 - Single value [10, 10]: %d\n\n", result4) // Expected: 10

	// Test 5: No nodes in range
	result5 := RangeSumBST(root2, 100, 200)
	fmt.Printf("Test 5 - No nodes [100, 200]: %d\n\n", result5) // Expected: 0

	// Test 6: Single node tree
	single := &TreeNode{Val: 5}
	result6 := RangeSumBST(single, 1, 10)
	fmt.Printf("Test 6 - Single node tree [1, 10]: %d\n\n", result6) // Expected: 5

	// Test 7: Compare methods
	fmt.Println("--- Method Comparison ---")
	recursive := RangeSumBST(root2, 6, 15)
	iterative := RangeSumBSTIterative(root2, 6, 15)
	bfs := RangeSumBSTBFS(root2, 6, 15)
	fmt.Println("Range [6, 15]:")
	fmt.Printf("  Recursive: %d\n", recursive)
	fmt.Printf("  Iterative: %d\n", iterative)
	fmt.Printf("  BFS:       %d\n", bfs)
	fmt.Printf("  All match: %v\n\n", recursive == iterative && iterative == bfs)

	// Test 8: Count nodes in range
	count := CountNodesInRange(root2, 6, 15)
	fmt.Printf("Test 8 - Count nodes in [6, 15]: %d\n", count) // Expected: 5 (6,7,10,13,15)

	fmt.Println("\nAll tests completed!")
}
