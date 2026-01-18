/*
Minimum Depth of Binary Tree - Go Solutions

Find the minimum depth (shortest path to a leaf) of a binary tree.

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
// APPROACH 1: BFS (Recommended for Min Depth)
// ============================================================================
// Time Complexity:  O(n) worst case, often better
// Space Complexity: O(w) where w is maximum width
//
// WHY THIS IS BEST:
// - Stops as soon as first leaf is found
// - No need to traverse entire tree
// - Most efficient for finding minimum
// ============================================================================

// MinDepth returns the minimum depth using BFS.
//
// Key insight: First leaf encountered in BFS is at minimum depth!
//
// Visual example:
//
//	    3
//	   / \
//	  9  20     <- 9 is a leaf at depth 2
//	    /  \
//	   15   7
//
//	Answer: 2 (path: 3 -> 9)
func MinDepth(root *BinaryTree) int {
	if root == nil {
		return 0
	}

	queue := []*BinaryTree{root}
	depth := 0

	for len(queue) > 0 {
		depth++
		levelSize := len(queue)

		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]

			// Check if it's a leaf - first leaf found is at min depth!
			if node.Left == nil && node.Right == nil {
				return depth
			}

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
// APPROACH 2: Recursive DFS with Null Check (CAREFUL!)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(h)
//
// CRITICAL: Must handle one-child nodes correctly!
// A node with only one child is NOT a leaf.
// ============================================================================

// MinDepthDFS returns minimum depth using recursive DFS.
func MinDepthDFS(root *BinaryTree) int {
	if root == nil {
		return 0
	}

	// If leaf node
	if root.Left == nil && root.Right == nil {
		return 1
	}

	// If only right child exists
	if root.Left == nil {
		return 1 + MinDepthDFS(root.Right)
	}

	// If only left child exists
	if root.Right == nil {
		return 1 + MinDepthDFS(root.Left)
	}

	// Both children exist - take minimum
	return 1 + min(MinDepthDFS(root.Left), MinDepthDFS(root.Right))
}

// ============================================================================
// APPROACH 3: Iterative DFS with Stack
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(h)
//
// WHEN TO USE:
// - When avoiding recursion
// - Must track minimum across all paths
// ============================================================================

// stackItem holds node and its depth
type stackItem struct {
	node  *BinaryTree
	depth int
}

// MinDepthIterative uses stack-based DFS.
func MinDepthIterative(root *BinaryTree) int {
	if root == nil {
		return 0
	}

	minD := int(^uint(0) >> 1) // Max int
	stack := []stackItem{{root, 1}}

	for len(stack) > 0 {
		item := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		node := item.node
		depth := item.depth

		// Found a leaf
		if node.Left == nil && node.Right == nil {
			if depth < minD {
				minD = depth
			}
			continue
		}

		// Push children
		if node.Right != nil {
			stack = append(stack, stackItem{node.Right, depth + 1})
		}
		if node.Left != nil {
			stack = append(stack, stackItem{node.Left, depth + 1})
		}
	}

	return minD
}

// ============================================================================
// APPROACH 4: DFS with Early Termination
// ============================================================================
// Time Complexity:  O(n) worst case
// Space Complexity: O(h)
//
// Optimization: Track current minimum and prune branches.
// ============================================================================

// MinDepthOptimized uses DFS with pruning.
func MinDepthOptimized(root *BinaryTree) int {
	if root == nil {
		return 0
	}

	currentMin := int(^uint(0) >> 1)
	minDepthHelper(root, 1, &currentMin)
	return currentMin
}

func minDepthHelper(node *BinaryTree, depth int, currentMin *int) {
	if node == nil {
		return
	}

	// Pruning: no need to go deeper if we're already at currentMin
	if depth >= *currentMin {
		return
	}

	// Found a leaf
	if node.Left == nil && node.Right == nil {
		*currentMin = depth
		return
	}

	minDepthHelper(node.Left, depth+1, currentMin)
	minDepthHelper(node.Right, depth+1, currentMin)
}

// ============================================================================
// WRONG APPROACH (for demonstration)
// ============================================================================

// MinDepthWRONG shows the common mistake.
// DO NOT USE - here to show what NOT to do!
func MinDepthWRONG(root *BinaryTree) int {
	if root == nil {
		return 0
	}

	// WRONG: This returns 1 for a node with only one child!
	// Because min(0, something) = 0, then 0 + 1 = 1
	left := MinDepthWRONG(root.Left)
	right := MinDepthWRONG(root.Right)

	return 1 + min(left, right) // BUG!
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("MINIMUM DEPTH OF BINARY TREE - TEST RESULTS")
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

	fmt.Println("\nTest 1: Standard tree (nearest leaf is 9)")
	fmt.Printf("  BFS Result:     %d\n", MinDepth(root1))
	fmt.Printf("  DFS Result:     %d\n", MinDepthDFS(root1))
	fmt.Println("  Expected: 2")

	// Test Case 2: Skewed tree (the tricky case!)
	//    1
	//   /
	//  2
	root2 := &BinaryTree{Value: 1}
	root2.Left = &BinaryTree{Value: 2}

	fmt.Println("\nTest 2: Skewed tree (only left child)")
	fmt.Printf("  BFS Result:     %d\n", MinDepth(root2))
	fmt.Printf("  DFS Result:     %d\n", MinDepthDFS(root2))
	fmt.Printf("  WRONG Approach: %d (BUG!)\n", MinDepthWRONG(root2))
	fmt.Println("  Expected: 2 (not 1! Node 1 is not a leaf)")

	// Test Case 3: Long skewed tree
	//  2
	//   \
	//    3
	//     \
	//      4
	root3 := &BinaryTree{Value: 2}
	root3.Right = &BinaryTree{Value: 3}
	root3.Right.Right = &BinaryTree{Value: 4}

	fmt.Println("\nTest 3: Right-skewed tree")
	fmt.Printf("  BFS Result: %d\n", MinDepth(root3))
	fmt.Println("  Expected: 3")

	// Test Case 4: Single node
	root4 := &BinaryTree{Value: 1}
	fmt.Println("\nTest 4: Single node")
	fmt.Printf("  BFS Result: %d\n", MinDepth(root4))
	fmt.Println("  Expected: 1")

	// Test Case 5: Empty tree
	fmt.Println("\nTest 5: Empty tree")
	fmt.Printf("  BFS Result: %d\n", MinDepth(nil))
	fmt.Println("  Expected: 0")

	// Test Case 6: Balanced tree
	root6 := &BinaryTree{Value: 1}
	root6.Left = &BinaryTree{Value: 2}
	root6.Right = &BinaryTree{Value: 3}
	root6.Left.Left = &BinaryTree{Value: 4}
	root6.Left.Right = &BinaryTree{Value: 5}

	fmt.Println("\nTest 6: Balanced tree")
	fmt.Printf("  BFS Result: %d\n", MinDepth(root6))
	fmt.Println("  Expected: 2 (leaf 3 at depth 2)")

	// Compare all approaches
	fmt.Println("\n======================================================================")
	fmt.Println("COMPARING APPROACHES")
	fmt.Println("======================================================================")

	fmt.Println("\nUsing standard tree:")
	fmt.Printf("  BFS:        %d\n", MinDepth(root1))
	fmt.Printf("  DFS:        %d\n", MinDepthDFS(root1))
	fmt.Printf("  Iterative:  %d\n", MinDepthIterative(root1))
	fmt.Printf("  Optimized:  %d\n", MinDepthOptimized(root1))

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
}
