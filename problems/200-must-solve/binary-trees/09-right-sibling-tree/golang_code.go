/*
Right Sibling Tree - Go Solution

Transform a binary tree so each node's right pointer points to its right sibling.

Time Complexity: O(n)
Space Complexity: O(w) where w is maximum width of the tree
*/

package main

import "fmt"

// BinaryTree represents a node in a binary tree
type BinaryTree struct {
	Value int
	Left  *BinaryTree
	Right *BinaryTree
}

// RightSiblingTree transforms a binary tree into a right sibling tree
func RightSiblingTree(root *BinaryTree) *BinaryTree {
	if root == nil {
		return nil
	}

	// Use BFS to process level by level
	queue := []*BinaryTree{root}

	for len(queue) > 0 {
		levelSize := len(queue)

		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]

			// Store original children before modifying
			leftChild := node.Left
			rightChild := node.Right

			// Connect to right sibling (next node in queue, if same level)
			if i < levelSize-1 {
				node.Right = queue[0] // Peek at next node
			} else {
				node.Right = nil // Last node in level
			}

			// Add children to queue (left first, then original right)
			if leftChild != nil {
				queue = append(queue, leftChild)
			}
			if rightChild != nil {
				queue = append(queue, rightChild)
			}
		}
	}

	return root
}

// RightSiblingTreeRecursive uses recursive approach
func RightSiblingTreeRecursive(root *BinaryTree) *BinaryTree {
	if root == nil {
		return nil
	}

	mutate(root, nil, false)
	return root
}

// mutate recursively transforms the tree
func mutate(node, parent *BinaryTree, isLeftChild bool) {
	if node == nil {
		return
	}

	left := node.Left
	right := node.Right

	// Process left subtree first
	mutate(left, node, true)

	// Set right sibling
	if parent == nil {
		node.Right = nil
	} else if isLeftChild {
		node.Right = right // Will be updated by parent's processing
	} else {
		// Node is right child
		if parent.Right == nil {
			node.Right = nil
		} else {
			node.Right = parent.Right.Left
		}
	}

	// Process original right subtree
	mutate(right, node, false)
}

// PrintRightSiblings prints tree showing right sibling connections at each level
func PrintRightSiblings(root *BinaryTree) [][]int {
	if root == nil {
		return [][]int{}
	}

	result := [][]int{}
	level := []*BinaryTree{root}

	for len(level) > 0 {
		levelValues := []int{}
		nextLevel := []*BinaryTree{}

		// Follow right siblings from leftmost node
		current := level[0]
		visited := make(map[*BinaryTree]bool)

		for current != nil && !visited[current] {
			visited[current] = true
			levelValues = append(levelValues, current.Value)
			if current.Left != nil {
				nextLevel = append(nextLevel, current.Left)
			}
			current = current.Right
		}

		result = append(result, levelValues)
		level = nextLevel
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
	//  / \   \   / \
	// 8   9  10 11 12

	root := &BinaryTree{Value: 1}
	root.Left = &BinaryTree{Value: 2}
	root.Right = &BinaryTree{Value: 3}
	root.Left.Left = &BinaryTree{Value: 4}
	root.Left.Right = &BinaryTree{Value: 5}
	root.Right.Left = &BinaryTree{Value: 6}
	root.Right.Right = &BinaryTree{Value: 7}
	root.Left.Left.Left = &BinaryTree{Value: 8}
	root.Left.Left.Right = &BinaryTree{Value: 9}
	root.Left.Right.Right = &BinaryTree{Value: 10}
	root.Right.Right.Left = &BinaryTree{Value: 11}
	root.Right.Right.Right = &BinaryTree{Value: 12}

	// Test 1: Transform to right sibling tree
	result1 := RightSiblingTree(root)
	fmt.Println("Test 1 - Right Sibling Tree:")
	fmt.Println("  Levels (following right siblings):", PrintRightSiblings(result1))

	// Verify connections
	printNodeRight := func(name string, node *BinaryTree) {
		if node.Right != nil {
			fmt.Printf("  %s.right = %d\n", name, node.Right.Value)
		} else {
			fmt.Printf("  %s.right = nil\n", name)
		}
	}

	printNodeRight("root(1)", root)
	printNodeRight("node(2)", root.Left)
	printNodeRight("node(4)", root.Left.Left)

	// Test 2: Single node
	single := &BinaryTree{Value: 42}
	result2 := RightSiblingTree(single)
	fmt.Printf("\nTest 2 - Single node: %d, right = %v\n", result2.Value, result2.Right)
	// Expected: 42, right = nil

	// Test 3: Empty tree
	result3 := RightSiblingTree(nil)
	fmt.Printf("Test 3 - Empty tree: %v\n", result3)
	// Expected: nil

	// Test 4: Two-level tree
	twoLevel := &BinaryTree{Value: 1}
	twoLevel.Left = &BinaryTree{Value: 2}
	twoLevel.Right = &BinaryTree{Value: 3}
	result4 := RightSiblingTree(twoLevel)
	fmt.Println("\nTest 4 - Two-level tree:")
	fmt.Printf("  Root right: %v\n", result4.Right)
	if result4.Left.Right != nil {
		fmt.Printf("  Left child right: %d\n", result4.Left.Right.Value)
	} else {
		fmt.Println("  Left child right: nil")
	}

	// Test 5: Left-only tree
	leftOnly := &BinaryTree{Value: 1}
	leftOnly.Left = &BinaryTree{Value: 2}
	leftOnly.Left.Left = &BinaryTree{Value: 3}
	result5 := RightSiblingTree(leftOnly)
	fmt.Println("\nTest 5 - Left-only tree (all right pointers should be nil):")
	fmt.Printf("  1.right = %v, 2.right = %v, 3.right = %v\n",
		result5.Right, result5.Left.Right, result5.Left.Left.Right)

	// Test 6: Perfect binary tree
	//       1
	//      / \
	//     2   3
	//    / \ / \
	//   4  5 6  7

	perfect := &BinaryTree{Value: 1}
	perfect.Left = &BinaryTree{Value: 2}
	perfect.Right = &BinaryTree{Value: 3}
	perfect.Left.Left = &BinaryTree{Value: 4}
	perfect.Left.Right = &BinaryTree{Value: 5}
	perfect.Right.Left = &BinaryTree{Value: 6}
	perfect.Right.Right = &BinaryTree{Value: 7}

	result6 := RightSiblingTree(perfect)
	fmt.Println("\nTest 6 - Perfect binary tree:")
	fmt.Println("  Levels:", PrintRightSiblings(result6))
	// Expected: [[1] [2 3] [4 5 6 7]]

	fmt.Println("\nAll tests completed!")
}
