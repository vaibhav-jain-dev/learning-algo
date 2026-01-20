/*
Invert Binary Tree - Go Solution

Swap every left node with its corresponding right node in a binary tree.

Time Complexity: O(n)
Space Complexity: O(h) for recursion stack, O(n) for iterative with queue
*/

package main

import "fmt"

// BinaryTree represents a node in a binary tree
type BinaryTree struct {
	Value int
	Left  *BinaryTree
	Right *BinaryTree
}

// InvertBinaryTree inverts a binary tree recursively
func InvertBinaryTree(root *BinaryTree) *BinaryTree {
	if root == nil {
		return nil
	}

	// Swap left and right children
	root.Left, root.Right = root.Right, root.Left

	// Recursively invert subtrees
	InvertBinaryTree(root.Left)
	InvertBinaryTree(root.Right)

	return root
}

// InvertBinaryTreeIterative uses BFS with a queue
func InvertBinaryTreeIterative(root *BinaryTree) *BinaryTree {
	if root == nil {
		return nil
	}

	queue := []*BinaryTree{root}

	for len(queue) > 0 {
		// Dequeue
		node := queue[0]
		queue = queue[1:]

		// Swap children
		node.Left, node.Right = node.Right, node.Left

		// Add children to queue
		if node.Left != nil {
			queue = append(queue, node.Left)
		}
		if node.Right != nil {
			queue = append(queue, node.Right)
		}
	}

	return root
}

// PrintTreeLevelOrder prints the tree level by level
func PrintTreeLevelOrder(root *BinaryTree) [][]int {
	if root == nil {
		return [][]int{}
	}

	result := [][]int{}
	queue := []*BinaryTree{root}

	for len(queue) > 0 {
		levelSize := len(queue)
		level := []int{}

		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]

			level = append(level, node.Value)

			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
		result = append(result, level)
	}

	return result
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

	fmt.Println("Original tree (level order):")
	fmt.Println(PrintTreeLevelOrder(root))
	// Expected: [[1] [2 3] [4 5 6 7] [8 9]]

	// Test 1: Recursive inversion
	InvertBinaryTree(root)
	fmt.Println("\nAfter inversion (level order):")
	fmt.Println(PrintTreeLevelOrder(root))
	// Expected: [[1] [3 2] [7 6 5 4] [9 8]]

	// Test 2: Invert back using iterative
	InvertBinaryTreeIterative(root)
	fmt.Println("\nAfter second inversion (back to original):")
	fmt.Println(PrintTreeLevelOrder(root))

	// Test 3: Single node
	single := &BinaryTree{Value: 5}
	InvertBinaryTree(single)
	fmt.Printf("\nSingle node: %v\n", PrintTreeLevelOrder(single))
	// Expected: [[5]]

	// Test 4: Empty tree
	result := InvertBinaryTree(nil)
	fmt.Printf("Empty tree: %v\n", result)
	// Expected: <nil>

	// Test 5: Two-level tree
	small := &BinaryTree{Value: 1}
	small.Left = &BinaryTree{Value: 2}
	small.Right = &BinaryTree{Value: 3}
	fmt.Printf("\nSmall tree before: %v\n", PrintTreeLevelOrder(small))
	InvertBinaryTree(small)
	fmt.Printf("Small tree after: %v\n", PrintTreeLevelOrder(small))
	// Expected: [[1] [3 2]]

	fmt.Println("\nAll tests completed!")
}
