/*
Node Depths - Go Solution

Calculate the sum of all node depths in a binary tree.

Time Complexity: O(n) where n is the number of nodes
Space Complexity: O(h) where h is the height of the tree
*/

package main

import "fmt"

// BinaryTree represents a node in a binary tree
type BinaryTree struct {
	Value int
	Left  *BinaryTree
	Right *BinaryTree
}

// NewBinaryTree creates a new binary tree node
func NewBinaryTree(value int) *BinaryTree {
	return &BinaryTree{Value: value}
}

// NodeDepths calculates sum of all node depths using recursion
func NodeDepths(root *BinaryTree) int {
	return nodeDepthsHelper(root, 0)
}

// nodeDepthsHelper is the recursive helper function
func nodeDepthsHelper(node *BinaryTree, depth int) int {
	if node == nil {
		return 0
	}
	return depth + nodeDepthsHelper(node.Left, depth+1) + nodeDepthsHelper(node.Right, depth+1)
}

// NodeDepthsIterativeDFS calculates sum using iterative DFS with stack
func NodeDepthsIterativeDFS(root *BinaryTree) int {
	if root == nil {
		return 0
	}

	type nodeDepth struct {
		node  *BinaryTree
		depth int
	}

	totalDepth := 0
	stack := []nodeDepth{{root, 0}}

	for len(stack) > 0 {
		// Pop from stack
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		totalDepth += current.depth

		if current.node.Left != nil {
			stack = append(stack, nodeDepth{current.node.Left, current.depth + 1})
		}
		if current.node.Right != nil {
			stack = append(stack, nodeDepth{current.node.Right, current.depth + 1})
		}
	}

	return totalDepth
}

// NodeDepthsIterativeBFS calculates sum using iterative BFS with queue
func NodeDepthsIterativeBFS(root *BinaryTree) int {
	if root == nil {
		return 0
	}

	type nodeDepth struct {
		node  *BinaryTree
		depth int
	}

	totalDepth := 0
	queue := []nodeDepth{{root, 0}}

	for len(queue) > 0 {
		// Dequeue from front
		current := queue[0]
		queue = queue[1:]

		totalDepth += current.depth

		if current.node.Left != nil {
			queue = append(queue, nodeDepth{current.node.Left, current.depth + 1})
		}
		if current.node.Right != nil {
			queue = append(queue, nodeDepth{current.node.Right, current.depth + 1})
		}
	}

	return totalDepth
}

func main() {
	// Test 1: Example tree from problem
	//         1
	//        / \
	//       2   3
	//      / \ / \
	//     4  5 6  7
	//    / \
	//   8   9
	root1 := NewBinaryTree(1)
	root1.Left = NewBinaryTree(2)
	root1.Right = NewBinaryTree(3)
	root1.Left.Left = NewBinaryTree(4)
	root1.Left.Right = NewBinaryTree(5)
	root1.Right.Left = NewBinaryTree(6)
	root1.Right.Right = NewBinaryTree(7)
	root1.Left.Left.Left = NewBinaryTree(8)
	root1.Left.Left.Right = NewBinaryTree(9)

	result1Recursive := NodeDepths(root1)
	result1DFS := NodeDepthsIterativeDFS(root1)
	result1BFS := NodeDepthsIterativeBFS(root1)
	fmt.Printf("Test 1 (Recursive): %d\n", result1Recursive) // Expected: 16
	fmt.Printf("Test 1 (DFS): %d\n", result1DFS)             // Expected: 16
	fmt.Printf("Test 1 (BFS): %d\n", result1BFS)             // Expected: 16

	// Test 2: Linear tree (left-skewed)
	//     1
	//    /
	//   2
	//  /
	// 3
	root2 := NewBinaryTree(1)
	root2.Left = NewBinaryTree(2)
	root2.Left.Left = NewBinaryTree(3)

	result2 := NodeDepths(root2)
	fmt.Printf("Test 2 (Linear tree): %d\n", result2) // Expected: 0 + 1 + 2 = 3

	// Test 3: Single node
	root3 := NewBinaryTree(1)
	result3 := NodeDepths(root3)
	fmt.Printf("Test 3 (Single node): %d\n", result3) // Expected: 0

	// Test 4: Empty tree
	result4 := NodeDepths(nil)
	fmt.Printf("Test 4 (Empty tree): %d\n", result4) // Expected: 0

	// Test 5: Perfect binary tree with 3 levels
	//       1
	//      / \
	//     2   3
	//    /\ / \
	//   4 5 6  7
	root5 := NewBinaryTree(1)
	root5.Left = NewBinaryTree(2)
	root5.Right = NewBinaryTree(3)
	root5.Left.Left = NewBinaryTree(4)
	root5.Left.Right = NewBinaryTree(5)
	root5.Right.Left = NewBinaryTree(6)
	root5.Right.Right = NewBinaryTree(7)

	result5 := NodeDepths(root5)
	fmt.Printf("Test 5 (Perfect binary tree): %d\n", result5) // Expected: 0 + 1 + 1 + 2 + 2 + 2 + 2 = 10

	// Test 6: Right-skewed tree
	root6 := NewBinaryTree(1)
	root6.Right = NewBinaryTree(2)
	root6.Right.Right = NewBinaryTree(3)
	root6.Right.Right.Right = NewBinaryTree(4)

	result6 := NodeDepths(root6)
	fmt.Printf("Test 6 (Right-skewed): %d\n", result6) // Expected: 0 + 1 + 2 + 3 = 6

	fmt.Println("\nAll tests completed!")
}
