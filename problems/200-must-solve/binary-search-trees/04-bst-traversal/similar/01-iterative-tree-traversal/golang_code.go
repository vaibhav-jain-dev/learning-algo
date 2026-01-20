/*
Iterative Tree Traversal - Go Solutions

Implement inorder, preorder, and postorder traversals iteratively using stacks.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// TreeNode represents a node in a binary tree
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// ============================================================================
// INORDER TRAVERSAL (Left -> Node -> Right)
// ============================================================================

// InorderIterative performs iterative inorder traversal
// Algorithm:
// 1. Push all left children onto stack
// 2. Pop node, add to result
// 3. Go to right child and repeat
// Time: O(n), Space: O(h)
func InorderIterative(root *TreeNode) []int {
	var result []int
	var stack []*TreeNode
	current := root

	for current != nil || len(stack) > 0 {
		// Go to leftmost node
		for current != nil {
			stack = append(stack, current)
			current = current.Left
		}

		// Process current node
		current = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		result = append(result, current.Val)

		// Move to right subtree
		current = current.Right
	}

	return result
}

// ============================================================================
// PREORDER TRAVERSAL (Node -> Left -> Right)
// ============================================================================

// PreorderIterative performs iterative preorder traversal
// Algorithm:
// 1. Pop node from stack, add to result
// 2. Push right child then left child (so left is processed first)
// Time: O(n), Space: O(h)
func PreorderIterative(root *TreeNode) []int {
	if root == nil {
		return []int{}
	}

	var result []int
	stack := []*TreeNode{root}

	for len(stack) > 0 {
		// Pop from stack
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		result = append(result, node.Val)

		// Push right first so left is popped first
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
	}

	return result
}

// PreorderIterativeV2 uses same pattern as inorder
func PreorderIterativeV2(root *TreeNode) []int {
	var result []int
	var stack []*TreeNode
	current := root

	for current != nil || len(stack) > 0 {
		for current != nil {
			result = append(result, current.Val) // Process before going left
			stack = append(stack, current)
			current = current.Left
		}

		current = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		current = current.Right
	}

	return result
}

// ============================================================================
// POSTORDER TRAVERSAL (Left -> Right -> Node)
// ============================================================================

// PostorderIterativeTwoStacks uses two stacks approach
// Time: O(n), Space: O(n)
func PostorderIterativeTwoStacks(root *TreeNode) []int {
	if root == nil {
		return []int{}
	}

	stack1 := []*TreeNode{root}
	var stack2 []*TreeNode

	// Process nodes: root -> right -> left (reverse postorder)
	for len(stack1) > 0 {
		node := stack1[len(stack1)-1]
		stack1 = stack1[:len(stack1)-1]
		stack2 = append(stack2, node)

		if node.Left != nil {
			stack1 = append(stack1, node.Left)
		}
		if node.Right != nil {
			stack1 = append(stack1, node.Right)
		}
	}

	// Pop from stack2 to get postorder
	result := make([]int, len(stack2))
	for i := len(stack2) - 1; i >= 0; i-- {
		result[len(stack2)-1-i] = stack2[i].Val
	}

	return result
}

// PostorderIterativeReverse does Node->Right->Left then reverses
// Time: O(n), Space: O(n)
func PostorderIterativeReverse(root *TreeNode) []int {
	if root == nil {
		return []int{}
	}

	var result []int
	stack := []*TreeNode{root}

	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		result = append(result, node.Val)

		// Push left first so right is popped first
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
	}

	// Reverse the result
	for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
		result[i], result[j] = result[j], result[i]
	}

	return result
}

// PostorderIterativeOneStack is the most space-efficient approach
// Uses a previous pointer to track visited nodes
// Time: O(n), Space: O(h)
func PostorderIterativeOneStack(root *TreeNode) []int {
	if root == nil {
		return []int{}
	}

	var result []int
	var stack []*TreeNode
	current := root
	var prev *TreeNode

	for current != nil || len(stack) > 0 {
		// Go to leftmost
		for current != nil {
			stack = append(stack, current)
			current = current.Left
		}

		current = stack[len(stack)-1]

		// If right child exists and we haven't visited it yet
		if current.Right != nil && current.Right != prev {
			current = current.Right
		} else {
			// Process current node
			result = append(result, current.Val)
			prev = current
			stack = stack[:len(stack)-1]
			current = nil // Important: don't go left again
		}
	}

	return result
}

// ============================================================================
// BONUS: Level Order (BFS) Traversal
// ============================================================================

// LevelOrderIterative performs level order traversal using queue
// Returns list of lists, one for each level
// Time: O(n), Space: O(w) where w is max width
func LevelOrderIterative(root *TreeNode) [][]int {
	if root == nil {
		return [][]int{}
	}

	var result [][]int
	queue := []*TreeNode{root}

	for len(queue) > 0 {
		levelSize := len(queue)
		level := make([]int, 0, levelSize)

		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]
			level = append(level, node.Val)

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

// ============================================================================
// HELPER: Build tree from slice for testing
// ============================================================================

func buildTree(values []interface{}) *TreeNode {
	if len(values) == 0 || values[0] == nil {
		return nil
	}

	root := &TreeNode{Val: values[0].(int)}
	queue := []*TreeNode{root}
	i := 1

	for len(queue) > 0 && i < len(values) {
		node := queue[0]
		queue = queue[1:]

		if i < len(values) && values[i] != nil {
			node.Left = &TreeNode{Val: values[i].(int)}
			queue = append(queue, node.Left)
		}
		i++

		if i < len(values) && values[i] != nil {
			node.Right = &TreeNode{Val: values[i].(int)}
			queue = append(queue, node.Right)
		}
		i++
	}

	return root
}

// sliceEqual checks if two int slices are equal
func sliceEqual(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("ITERATIVE TREE TRAVERSAL - TEST RESULTS")
	fmt.Println("======================================================================")

	testCases := []struct {
		values      []interface{}
		description string
	}{
		{[]interface{}{1, nil, 2, 3}, "Simple tree"},
		{[]interface{}{1, 2, 3, 4, 5, nil, 6}, "Complete-ish tree"},
		{[]interface{}{1}, "Single node"},
		{[]interface{}{1, 2, nil, 3, nil, 4}, "Left-skewed"},
		{[]interface{}{1, nil, 2, nil, 3, nil, 4}, "Right-skewed"},
	}

	for _, tc := range testCases {
		fmt.Printf("\n%s\n", tc.description)
		fmt.Printf("Tree (level-order): %v\n", tc.values)

		root := buildTree(tc.values)

		// Inorder
		inorder := InorderIterative(root)
		fmt.Printf("  Inorder:   %v\n", inorder)

		// Preorder
		preorder1 := PreorderIterative(root)
		preorder2 := PreorderIterativeV2(root)
		fmt.Printf("  Preorder:  %v\n", preorder1)
		fmt.Printf("  Preorder (v2): %v\n", preorder2)

		// Postorder - all methods
		postTwo := PostorderIterativeTwoStacks(root)
		postRev := PostorderIterativeReverse(root)
		postOne := PostorderIterativeOneStack(root)
		fmt.Printf("  Postorder (2 stacks): %v\n", postTwo)
		fmt.Printf("  Postorder (reverse):  %v\n", postRev)
		fmt.Printf("  Postorder (1 stack):  %v\n", postOne)

		// Level order
		level := LevelOrderIterative(root)
		fmt.Printf("  Level order: %v\n", level)

		// Verify all postorder methods give same result
		if !sliceEqual(postTwo, postRev) || !sliceEqual(postRev, postOne) {
			fmt.Println("  ERROR: Postorder methods don't match!")
		}
	}

	// Test empty tree
	fmt.Println("\nEmpty tree:")
	var empty *TreeNode
	fmt.Printf("  Inorder:   %v\n", InorderIterative(empty))
	fmt.Printf("  Preorder:  %v\n", PreorderIterative(empty))
	fmt.Printf("  Postorder: %v\n", PostorderIterativeOneStack(empty))

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
	fmt.Println("======================================================================")
}
