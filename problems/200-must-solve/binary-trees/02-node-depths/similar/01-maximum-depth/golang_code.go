/*
Maximum Depth of Binary Tree - Go Solutions

Find the maximum depth (height) of a binary tree.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// BinaryTree represents a node in a binary tree
type BinaryTree struct {
	Value int
	Left  *BinaryTree
	Right *BinaryTree
}

// ============================================================================
// APPROACH 1: Recursive DFS (Recommended)
// ============================================================================
// Time Complexity:  O(n) - visit each node once
// Space Complexity: O(h) - recursion stack depth
//
// WHY THIS IS BEST:
// - Simplest and most elegant solution
// - Natural recursive tree structure
// - Easy to understand and maintain
// ============================================================================

// MaxDepth returns the maximum depth of the binary tree.
//
// Key insight: depth = 1 + max(leftDepth, rightDepth)
//
// Visual example:
//
//	    3
//	   / \
//	  9  20
//	    /  \
//	   15   7
//
//	Answer: 3
func MaxDepth(root *BinaryTree) int {
	if root == nil {
		return 0
	}

	leftDepth := MaxDepth(root.Left)
	rightDepth := MaxDepth(root.Right)

	return 1 + max(leftDepth, rightDepth)
}

// ============================================================================
// APPROACH 2: BFS Level Counting
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(w) where w is maximum width of tree
//
// WHEN TO USE:
// - When you want to avoid recursion
// - When you need level-order traversal anyway
// ============================================================================

// MaxDepthBFS uses BFS to count levels.
func MaxDepthBFS(root *BinaryTree) int {
	if root == nil {
		return 0
	}

	depth := 0
	queue := []*BinaryTree{root}

	for len(queue) > 0 {
		depth++
		levelSize := len(queue)

		// Process all nodes at current level
		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]

			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
	}

	return depth
}

// ============================================================================
// APPROACH 3: Iterative DFS with Stack
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(h) for stack
//
// WHEN TO USE:
// - Deep trees where recursion might cause stack overflow
// - When you prefer explicit stack management
// ============================================================================

// stackItem holds node and its depth for iterative traversal
type stackItem struct {
	node  *BinaryTree
	depth int
}

// MaxDepthIterative uses explicit stack for DFS.
func MaxDepthIterative(root *BinaryTree) int {
	if root == nil {
		return 0
	}

	maxDepth := 0
	stack := []stackItem{{root, 1}}

	for len(stack) > 0 {
		// Pop from stack
		item := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		// Update max depth
		if item.depth > maxDepth {
			maxDepth = item.depth
		}

		// Push children with incremented depth
		if item.node.Right != nil {
			stack = append(stack, stackItem{item.node.Right, item.depth + 1})
		}
		if item.node.Left != nil {
			stack = append(stack, stackItem{item.node.Left, item.depth + 1})
		}
	}

	return maxDepth
}

// ============================================================================
// APPROACH 4: Tail-Recursive Style (Go doesn't optimize, but clean pattern)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(h)
//
// Shows functional programming pattern even though Go doesn't have TCO.
// ============================================================================

// MaxDepthTailRec demonstrates tail-recursive style.
func MaxDepthTailRec(root *BinaryTree) int {
	return maxDepthHelper(root, 0)
}

func maxDepthHelper(node *BinaryTree, currentMax int) int {
	if node == nil {
		return currentMax
	}

	// This would be tail-recursive in a language with TCO
	leftMax := maxDepthHelper(node.Left, currentMax+1)
	rightMax := maxDepthHelper(node.Right, currentMax+1)

	return max(leftMax, rightMax)
}

// ============================================================================
// BONUS: Get Depth of Specific Node
// ============================================================================

// GetNodeDepth returns the depth of a node with given value.
// Returns -1 if node not found.
func GetNodeDepth(root *BinaryTree, target int) int {
	var find func(node *BinaryTree, depth int) int
	find = func(node *BinaryTree, depth int) int {
		if node == nil {
			return -1
		}
		if node.Value == target {
			return depth
		}

		leftResult := find(node.Left, depth+1)
		if leftResult != -1 {
			return leftResult
		}
		return find(node.Right, depth+1)
	}

	return find(root, 0)
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("MAXIMUM DEPTH OF BINARY TREE - TEST RESULTS")
	fmt.Println("======================================================================")

	// Test Case 1: Standard tree
	//    3
	//   / \
	//  9  20
	//    /  \
	//   15   7
	root1 := &BinaryTree{Value: 3}
	root1.Left = &BinaryTree{Value: 9}
	root1.Right = &BinaryTree{Value: 20}
	root1.Right.Left = &BinaryTree{Value: 15}
	root1.Right.Right = &BinaryTree{Value: 7}

	fmt.Println("\nTest 1: Standard tree")
	fmt.Printf("  Result: %d\n", MaxDepth(root1))
	fmt.Println("  Expected: 3")

	// Test Case 2: Skewed tree
	//  1
	//   \
	//    2
	root2 := &BinaryTree{Value: 1}
	root2.Right = &BinaryTree{Value: 2}

	fmt.Println("\nTest 2: Skewed tree (1->2)")
	fmt.Printf("  Result: %d\n", MaxDepth(root2))
	fmt.Println("  Expected: 2")

	// Test Case 3: Single node
	root3 := &BinaryTree{Value: 1}
	fmt.Println("\nTest 3: Single node")
	fmt.Printf("  Result: %d\n", MaxDepth(root3))
	fmt.Println("  Expected: 1")

	// Test Case 4: Empty tree
	fmt.Println("\nTest 4: Empty tree")
	fmt.Printf("  Result: %d\n", MaxDepth(nil))
	fmt.Println("  Expected: 0")

	// Test Case 5: Deep linear tree
	root5 := &BinaryTree{Value: 1}
	root5.Left = &BinaryTree{Value: 2}
	root5.Left.Left = &BinaryTree{Value: 3}
	root5.Left.Left.Left = &BinaryTree{Value: 4}
	fmt.Println("\nTest 5: Linear tree (depth 4)")
	fmt.Printf("  Result: %d\n", MaxDepth(root5))
	fmt.Println("  Expected: 4")

	// Compare approaches
	fmt.Println("\n======================================================================")
	fmt.Println("COMPARING APPROACHES")
	fmt.Println("======================================================================")

	fmt.Println("\nUsing standard tree:")
	fmt.Printf("  Recursive DFS: %d\n", MaxDepth(root1))
	fmt.Printf("  BFS:           %d\n", MaxDepthBFS(root1))
	fmt.Printf("  Iterative DFS: %d\n", MaxDepthIterative(root1))
	fmt.Printf("  Tail-Rec:      %d\n", MaxDepthTailRec(root1))

	// Test GetNodeDepth
	fmt.Println("\n======================================================================")
	fmt.Println("GET NODE DEPTH")
	fmt.Println("======================================================================")
	fmt.Printf("\nDepth of node 15: %d (expected: 2)\n", GetNodeDepth(root1, 15))
	fmt.Printf("Depth of node 3:  %d (expected: 0)\n", GetNodeDepth(root1, 3))
	fmt.Printf("Depth of node 99: %d (expected: -1)\n", GetNodeDepth(root1, 99))

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
}
