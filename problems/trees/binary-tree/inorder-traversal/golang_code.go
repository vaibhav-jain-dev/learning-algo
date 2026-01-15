// Inorder Traversal of Binary Tree
// ================================
// Implement both iterative and recursive inorder traversal.
//
// Time Complexity: O(n) for all approaches
// Space Complexity: O(h) for recursive/iterative, O(1) for Morris

package main

import (
	"fmt"
	"reflect"
)

// TreeNode defines a binary tree node
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// inorderTraversalRecursive performs recursive inorder traversal
// Time: O(n), Space: O(h) where h is tree height
func inorderTraversalRecursive(root *TreeNode) []int {
	result := []int{}

	var inorder func(node *TreeNode)
	inorder = func(node *TreeNode) {
		if node == nil {
			return
		}
		inorder(node.Left)           // Visit left subtree
		result = append(result, node.Val) // Visit root
		inorder(node.Right)          // Visit right subtree
	}

	inorder(root)
	return result
}

// inorderTraversalIterative performs iterative inorder traversal using a stack
// Time: O(n), Space: O(h)
func inorderTraversalIterative(root *TreeNode) []int {
	result := []int{}
	stack := []*TreeNode{}
	current := root

	for current != nil || len(stack) > 0 {
		// Go to the leftmost node
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

// inorderTraversalMorris performs Morris Traversal with O(1) space
// Time: O(n), Space: O(1)
func inorderTraversalMorris(root *TreeNode) []int {
	result := []int{}
	current := root

	for current != nil {
		if current.Left == nil {
			// No left subtree, visit current and go right
			result = append(result, current.Val)
			current = current.Right
		} else {
			// Find inorder predecessor
			predecessor := current.Left
			for predecessor.Right != nil && predecessor.Right != current {
				predecessor = predecessor.Right
			}

			if predecessor.Right == nil {
				// Make current the right child of its predecessor
				predecessor.Right = current
				current = current.Left
			} else {
				// Revert the changes (remove thread)
				predecessor.Right = nil
				result = append(result, current.Val)
				current = current.Right
			}
		}
	}

	return result
}

// buildTree creates a binary tree from level-order slice representation
func buildTree(values []*int) *TreeNode {
	if len(values) == 0 || values[0] == nil {
		return nil
	}

	root := &TreeNode{Val: *values[0]}
	queue := []*TreeNode{root}
	i := 1

	for len(queue) > 0 && i < len(values) {
		node := queue[0]
		queue = queue[1:]

		// Left child
		if i < len(values) && values[i] != nil {
			node.Left = &TreeNode{Val: *values[i]}
			queue = append(queue, node.Left)
		}
		i++

		// Right child
		if i < len(values) && values[i] != nil {
			node.Right = &TreeNode{Val: *values[i]}
			queue = append(queue, node.Right)
		}
		i++
	}

	return root
}

// Helper to create int pointer
func intPtr(v int) *int {
	return &v
}

// TestCase represents a test case
type TestCase struct {
	input    []*int
	expected []int
}

func main() {
	testCases := []TestCase{
		{
			input:    []*int{intPtr(1), nil, intPtr(2), intPtr(3)},
			expected: []int{1, 3, 2},
		},
		{
			input:    []*int{},
			expected: []int{},
		},
		{
			input:    []*int{intPtr(1)},
			expected: []int{1},
		},
		{
			input:    []*int{intPtr(1), intPtr(2), intPtr(3), intPtr(4), intPtr(5)},
			expected: []int{4, 2, 5, 1, 3},
		},
		{
			input:    []*int{intPtr(1), intPtr(2), intPtr(3), nil, nil, intPtr(4), intPtr(5)},
			expected: []int{2, 1, 4, 3, 5},
		},
		{
			input:    []*int{intPtr(5), intPtr(3), intPtr(7), intPtr(2), intPtr(4), intPtr(6), intPtr(8)},
			expected: []int{2, 3, 4, 5, 6, 7, 8},
		},
	}

	fmt.Println("============================================================")
	fmt.Println("INORDER TRAVERSAL - TEST RESULTS")
	fmt.Println("============================================================")

	for i, tc := range testCases {
		root := buildTree(tc.input)

		recursiveResult := inorderTraversalRecursive(root)
		iterativeResult := inorderTraversalIterative(root)

		// Rebuild tree for Morris (it modifies the tree temporarily)
		root = buildTree(tc.input)
		morrisResult := inorderTraversalMorris(root)

		// Handle empty slice comparison
		if len(recursiveResult) == 0 {
			recursiveResult = []int{}
		}
		if len(iterativeResult) == 0 {
			iterativeResult = []int{}
		}
		if len(morrisResult) == 0 {
			morrisResult = []int{}
		}
		if len(tc.expected) == 0 {
			tc.expected = []int{}
		}

		recursivePass := reflect.DeepEqual(recursiveResult, tc.expected)
		iterativePass := reflect.DeepEqual(iterativeResult, tc.expected)
		morrisPass := reflect.DeepEqual(morrisResult, tc.expected)

		status := "PASS"
		if !recursivePass || !iterativePass || !morrisPass {
			status = "FAIL"
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Input:     %v\n", formatInput(tc.input))
		fmt.Printf("  Expected:  %v\n", tc.expected)
		fmt.Printf("  Recursive: %v %s\n", recursiveResult, passStr(recursivePass))
		fmt.Printf("  Iterative: %v %s\n", iterativeResult, passStr(iterativePass))
		fmt.Printf("  Morris:    %v %s\n", morrisResult, passStr(morrisPass))
	}

	fmt.Println("\n============================================================")
	fmt.Println("All tests completed!")
	fmt.Println("============================================================")
}

func passStr(pass bool) string {
	if pass {
		return "OK"
	}
	return "FAIL"
}

func formatInput(input []*int) []interface{} {
	result := make([]interface{}, len(input))
	for i, v := range input {
		if v == nil {
			result[i] = nil
		} else {
			result[i] = *v
		}
	}
	return result
}
