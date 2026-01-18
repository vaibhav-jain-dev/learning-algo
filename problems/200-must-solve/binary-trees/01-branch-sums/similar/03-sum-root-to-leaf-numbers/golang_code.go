/*
Sum Root to Leaf Numbers - Go Solutions

Calculate the sum of all root-to-leaf numbers where each path forms a number.

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
// - Clean and concise code
// - Natural tree traversal pattern
// - Easy to understand number building
// ============================================================================

// SumRootToLeaf calculates sum of all root-to-leaf numbers.
//
// Key insight: At each node, newNum = oldNum * 10 + node.value
//
// Visual example:
//
//	        4
//	       / \
//	      9   0
//	     / \
//	    5   1
//
//	Numbers: 495, 491, 40
//	Answer: 1026
func SumRootToLeaf(root *BinaryTree) int {
	return sumHelper(root, 0)
}

func sumHelper(node *BinaryTree, currentNum int) int {
	if node == nil {
		return 0
	}

	// Build the number: shift left (multiply by 10) and add digit
	newNum := currentNum*10 + node.Value

	// If leaf, return the complete number
	if node.Left == nil && node.Right == nil {
		return newNum
	}

	// Sum from both subtrees
	return sumHelper(node.Left, newNum) + sumHelper(node.Right, newNum)
}

// ============================================================================
// APPROACH 2: Iterative with Stack
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) for stack
//
// WHEN TO USE:
// - When recursion depth might cause stack overflow
// - When you prefer explicit stack management
// ============================================================================

// stackItem holds node and current number for iterative traversal
type stackItem struct {
	node       *BinaryTree
	currentNum int
}

// SumRootToLeafIterative uses explicit stack for DFS.
func SumRootToLeafIterative(root *BinaryTree) int {
	if root == nil {
		return 0
	}

	totalSum := 0
	stack := []stackItem{{root, 0}}

	for len(stack) > 0 {
		// Pop from stack
		item := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		node := item.node
		newNum := item.currentNum*10 + node.Value

		// If leaf, add to total
		if node.Left == nil && node.Right == nil {
			totalSum += newNum
			continue
		}

		// Push children (right first so left is processed first)
		if node.Right != nil {
			stack = append(stack, stackItem{node.Right, newNum})
		}
		if node.Left != nil {
			stack = append(stack, stackItem{node.Left, newNum})
		}
	}

	return totalSum
}

// ============================================================================
// APPROACH 3: BFS with Queue (Level Order)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(w) where w is max width of tree
//
// WHEN TO USE:
// - When you want level-by-level processing
// - Good for visualizing the traversal
// ============================================================================

// SumRootToLeafBFS uses BFS traversal.
func SumRootToLeafBFS(root *BinaryTree) int {
	if root == nil {
		return 0
	}

	totalSum := 0
	queue := []stackItem{{root, 0}}

	for len(queue) > 0 {
		// Dequeue
		item := queue[0]
		queue = queue[1:]

		node := item.node
		newNum := item.currentNum*10 + node.Value

		// If leaf, add to total
		if node.Left == nil && node.Right == nil {
			totalSum += newNum
			continue
		}

		// Enqueue children
		if node.Left != nil {
			queue = append(queue, stackItem{node.Left, newNum})
		}
		if node.Right != nil {
			queue = append(queue, stackItem{node.Right, newNum})
		}
	}

	return totalSum
}

// ============================================================================
// APPROACH 4: Morris Traversal (O(1) Space)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1) - no additional space
//
// WHEN TO USE:
// - When space is extremely limited
// - Complex to implement but optimal space
// ============================================================================

// SumRootToLeafMorris uses Morris traversal for O(1) space.
// Note: This is more complex and modifies tree temporarily.
func SumRootToLeafMorris(root *BinaryTree) int {
	totalSum := 0
	currentNum := 0
	current := root

	for current != nil {
		if current.Left == nil {
			// Process current node
			currentNum = currentNum*10 + current.Value

			// If leaf, add to sum
			if current.Right == nil {
				totalSum += currentNum
			}

			current = current.Right
		} else {
			// Find predecessor
			predecessor := current.Left
			depth := 1

			for predecessor.Right != nil && predecessor.Right != current {
				predecessor = predecessor.Right
				depth++
			}

			if predecessor.Right == nil {
				// First visit: create thread
				currentNum = currentNum*10 + current.Value
				predecessor.Right = current
				current = current.Left
			} else {
				// Second visit: remove thread
				predecessor.Right = nil

				// Check if predecessor is a leaf
				if predecessor.Left == nil {
					totalSum += currentNum
				}

				// Remove digits added by left subtree
				for i := 0; i < depth; i++ {
					currentNum /= 10
				}

				current = current.Right
			}
		}
	}

	return totalSum
}

// ============================================================================
// BONUS: Return All Numbers (not just sum)
// ============================================================================

// GetAllNumbers returns all root-to-leaf numbers as a slice.
func GetAllNumbers(root *BinaryTree) []int {
	var numbers []int

	var dfs func(node *BinaryTree, current int)
	dfs = func(node *BinaryTree, current int) {
		if node == nil {
			return
		}

		newNum := current*10 + node.Value

		if node.Left == nil && node.Right == nil {
			numbers = append(numbers, newNum)
			return
		}

		dfs(node.Left, newNum)
		dfs(node.Right, newNum)
	}

	dfs(root, 0)
	return numbers
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("SUM ROOT TO LEAF NUMBERS - TEST RESULTS")
	fmt.Println("======================================================================")

	// Test Case 1: Standard tree
	//    1
	//   / \
	//  2   3
	root1 := &BinaryTree{Value: 1}
	root1.Left = &BinaryTree{Value: 2}
	root1.Right = &BinaryTree{Value: 3}

	fmt.Println("\nTest 1: Simple tree (1->2, 1->3)")
	fmt.Printf("  Result: %d\n", SumRootToLeaf(root1))
	fmt.Println("  Expected: 25 (12 + 13)")
	fmt.Printf("  Numbers: %v\n", GetAllNumbers(root1))

	// Test Case 2: Larger tree
	//        4
	//       / \
	//      9   0
	//     / \
	//    5   1
	root2 := &BinaryTree{Value: 4}
	root2.Left = &BinaryTree{Value: 9}
	root2.Right = &BinaryTree{Value: 0}
	root2.Left.Left = &BinaryTree{Value: 5}
	root2.Left.Right = &BinaryTree{Value: 1}

	fmt.Println("\nTest 2: Tree with multiple levels")
	fmt.Printf("  Result: %d\n", SumRootToLeaf(root2))
	fmt.Println("  Expected: 1026 (495 + 491 + 40)")
	fmt.Printf("  Numbers: %v\n", GetAllNumbers(root2))

	// Test Case 3: Single node
	root3 := &BinaryTree{Value: 9}
	fmt.Println("\nTest 3: Single node")
	fmt.Printf("  Result: %d\n", SumRootToLeaf(root3))
	fmt.Println("  Expected: 9")

	// Test Case 4: Zero values
	root4 := &BinaryTree{Value: 1}
	root4.Left = &BinaryTree{Value: 0}
	fmt.Println("\nTest 4: With zero (1->0)")
	fmt.Printf("  Result: %d\n", SumRootToLeaf(root4))
	fmt.Println("  Expected: 10")

	// Test Case 5: Linear tree
	root5 := &BinaryTree{Value: 1}
	root5.Left = &BinaryTree{Value: 2}
	root5.Left.Left = &BinaryTree{Value: 3}
	fmt.Println("\nTest 5: Linear tree (1->2->3)")
	fmt.Printf("  Result: %d\n", SumRootToLeaf(root5))
	fmt.Println("  Expected: 123")

	// Test Case 6: Empty tree
	fmt.Println("\nTest 6: Empty tree")
	fmt.Printf("  Result: %d\n", SumRootToLeaf(nil))
	fmt.Println("  Expected: 0")

	// Compare approaches
	fmt.Println("\n======================================================================")
	fmt.Println("COMPARING APPROACHES")
	fmt.Println("======================================================================")

	fmt.Println("\nUsing tree with numbers 495, 491, 40:")
	fmt.Printf("  Recursive DFS: %d\n", SumRootToLeaf(root2))
	fmt.Printf("  Iterative DFS: %d\n", SumRootToLeafIterative(root2))
	fmt.Printf("  BFS:           %d\n", SumRootToLeafBFS(root2))

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
}
