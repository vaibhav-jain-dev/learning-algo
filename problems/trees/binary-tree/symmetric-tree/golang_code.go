// Symmetric Tree
// ==============
// Check if a binary tree is symmetric (mirror of itself).
//
// Time Complexity: O(n)
// Space Complexity: O(h) for recursive, O(n) for iterative

package main

import "fmt"

// TreeNode defines a binary tree node
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// isSymmetricRecursive checks symmetry using recursive mirror check
// Time: O(n), Space: O(h) where h is tree height
func isSymmetricRecursive(root *TreeNode) bool {
	if root == nil {
		return true
	}
	return isMirror(root.Left, root.Right)
}

func isMirror(left, right *TreeNode) bool {
	// Both null - symmetric
	if left == nil && right == nil {
		return true
	}
	// One null - not symmetric
	if left == nil || right == nil {
		return false
	}
	// Check values and mirror subtrees
	return left.Val == right.Val &&
		isMirror(left.Left, right.Right) &&
		isMirror(left.Right, right.Left)
}

// NodePair holds two nodes for comparison
type NodePair struct {
	left  *TreeNode
	right *TreeNode
}

// isSymmetricIterative checks symmetry using a queue (BFS)
// Time: O(n), Space: O(n)
func isSymmetricIterative(root *TreeNode) bool {
	if root == nil {
		return true
	}

	queue := []NodePair{{root.Left, root.Right}}

	for len(queue) > 0 {
		pair := queue[0]
		queue = queue[1:]

		left, right := pair.left, pair.right

		// Both null - continue
		if left == nil && right == nil {
			continue
		}
		// One null or values differ - not symmetric
		if left == nil || right == nil || left.Val != right.Val {
			return false
		}

		// Add children in mirror order
		queue = append(queue, NodePair{left.Left, right.Right})
		queue = append(queue, NodePair{left.Right, right.Left})
	}

	return true
}

// isSymmetricStack checks symmetry using a stack (DFS)
// Time: O(n), Space: O(h)
func isSymmetricStack(root *TreeNode) bool {
	if root == nil {
		return true
	}

	stack := []NodePair{{root.Left, root.Right}}

	for len(stack) > 0 {
		// Pop from stack
		pair := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		left, right := pair.left, pair.right

		if left == nil && right == nil {
			continue
		}
		if left == nil || right == nil || left.Val != right.Val {
			return false
		}

		stack = append(stack, NodePair{left.Left, right.Right})
		stack = append(stack, NodePair{left.Right, right.Left})
	}

	return true
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

func main() {
	testCases := []struct {
		input    []*int
		expected bool
	}{
		{
			input:    []*int{intPtr(1), intPtr(2), intPtr(2), intPtr(3), intPtr(4), intPtr(4), intPtr(3)},
			expected: true,
		},
		{
			input:    []*int{intPtr(1), intPtr(2), intPtr(2), nil, intPtr(3), nil, intPtr(3)},
			expected: false,
		},
		{
			input:    []*int{intPtr(1)},
			expected: true,
		},
		{
			input:    []*int{intPtr(1), intPtr(2), intPtr(2), intPtr(2), nil, intPtr(2)},
			expected: false,
		},
		{
			input:    []*int{},
			expected: true,
		},
		{
			input:    []*int{intPtr(1), intPtr(2), intPtr(2)},
			expected: true,
		},
		{
			input:    []*int{intPtr(1), intPtr(2), intPtr(3)},
			expected: false,
		},
		{
			input:    []*int{intPtr(1), intPtr(2), intPtr(2), nil, intPtr(3), intPtr(3), nil},
			expected: true,
		},
	}

	fmt.Println("============================================================")
	fmt.Println("SYMMETRIC TREE - TEST RESULTS")
	fmt.Println("============================================================")

	for i, tc := range testCases {
		root := buildTree(tc.input)

		recursiveResult := isSymmetricRecursive(root)
		iterativeResult := isSymmetricIterative(root)
		stackResult := isSymmetricStack(root)

		recursivePass := recursiveResult == tc.expected
		iterativePass := iterativeResult == tc.expected
		stackPass := stackResult == tc.expected

		status := "PASS"
		if !recursivePass || !iterativePass || !stackPass {
			status = "FAIL"
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Input:     %v\n", formatInput(tc.input))
		fmt.Printf("  Expected:  %v\n", tc.expected)
		fmt.Printf("  Recursive: %v %s\n", recursiveResult, passStr(recursivePass))
		fmt.Printf("  Iterative: %v %s\n", iterativeResult, passStr(iterativePass))
		fmt.Printf("  Stack:     %v %s\n", stackResult, passStr(stackPass))
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
