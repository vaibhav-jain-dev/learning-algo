// Path Sum
// ========
// Check if tree has a root-to-leaf path with given sum.
//
// Time Complexity: O(n)
// Space Complexity: O(h) for recursive, O(h) for iterative

package main

import "fmt"

// TreeNode defines a binary tree node
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// hasPathSumRecursive checks path sum using recursive DFS
// Time: O(n), Space: O(h) where h is tree height
func hasPathSumRecursive(root *TreeNode, targetSum int) bool {
	if root == nil {
		return false
	}

	// Check if leaf node
	if root.Left == nil && root.Right == nil {
		return targetSum == root.Val
	}

	// Recurse with reduced target
	remaining := targetSum - root.Val
	return hasPathSumRecursive(root.Left, remaining) ||
		hasPathSumRecursive(root.Right, remaining)
}

// NodeSum pairs a node with remaining sum
type NodeSum struct {
	node      *TreeNode
	remaining int
}

// hasPathSumIterative checks path sum using iterative DFS with stack
// Time: O(n), Space: O(h)
func hasPathSumIterative(root *TreeNode, targetSum int) bool {
	if root == nil {
		return false
	}

	stack := []NodeSum{{root, targetSum}}

	for len(stack) > 0 {
		// Pop from stack
		item := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		node, remaining := item.node, item.remaining

		// Check if leaf and sum matches
		if node.Left == nil && node.Right == nil {
			if remaining == node.Val {
				return true
			}
			continue
		}

		newRemaining := remaining - node.Val

		if node.Right != nil {
			stack = append(stack, NodeSum{node.Right, newRemaining})
		}
		if node.Left != nil {
			stack = append(stack, NodeSum{node.Left, newRemaining})
		}
	}

	return false
}

// hasPathSumBFS checks path sum using BFS with queue
// Time: O(n), Space: O(w) where w is max width
func hasPathSumBFS(root *TreeNode, targetSum int) bool {
	if root == nil {
		return false
	}

	queue := []NodeSum{{root, targetSum}}

	for len(queue) > 0 {
		item := queue[0]
		queue = queue[1:]

		node, remaining := item.node, item.remaining

		// Check if leaf and sum matches
		if node.Left == nil && node.Right == nil {
			if remaining == node.Val {
				return true
			}
			continue
		}

		newRemaining := remaining - node.Val

		if node.Left != nil {
			queue = append(queue, NodeSum{node.Left, newRemaining})
		}
		if node.Right != nil {
			queue = append(queue, NodeSum{node.Right, newRemaining})
		}
	}

	return false
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
		target   int
		expected bool
	}{
		{
			input:    []*int{intPtr(5), intPtr(4), intPtr(8), intPtr(11), nil, intPtr(13), intPtr(4), intPtr(7), intPtr(2), nil, nil, nil, intPtr(1)},
			target:   22,
			expected: true,
		},
		{
			input:    []*int{intPtr(1), intPtr(2), intPtr(3)},
			target:   5,
			expected: false,
		},
		{
			input:    []*int{},
			target:   0,
			expected: false,
		},
		{
			input:    []*int{intPtr(1), intPtr(2)},
			target:   1,
			expected: false,
		},
		{
			input:    []*int{intPtr(1)},
			target:   1,
			expected: true,
		},
		{
			input:    []*int{intPtr(1), intPtr(2), intPtr(3)},
			target:   4,
			expected: true,
		},
		{
			input:    []*int{intPtr(1), intPtr(2), intPtr(3)},
			target:   3,
			expected: true,
		},
		{
			input:    []*int{intPtr(-2), nil, intPtr(-3)},
			target:   -5,
			expected: true,
		},
	}

	fmt.Println("============================================================")
	fmt.Println("PATH SUM - TEST RESULTS")
	fmt.Println("============================================================")

	for i, tc := range testCases {
		root := buildTree(tc.input)

		recursiveResult := hasPathSumRecursive(root, tc.target)
		iterativeResult := hasPathSumIterative(root, tc.target)
		bfsResult := hasPathSumBFS(root, tc.target)

		recursivePass := recursiveResult == tc.expected
		iterativePass := iterativeResult == tc.expected
		bfsPass := bfsResult == tc.expected

		status := "PASS"
		if !recursivePass || !iterativePass || !bfsPass {
			status = "FAIL"
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Input:     %v\n", formatInput(tc.input))
		fmt.Printf("  Target:    %d\n", tc.target)
		fmt.Printf("  Expected:  %v\n", tc.expected)
		fmt.Printf("  Recursive: %v %s\n", recursiveResult, passStr(recursivePass))
		fmt.Printf("  Iterative: %v %s\n", iterativeResult, passStr(iterativePass))
		fmt.Printf("  BFS:       %v %s\n", bfsResult, passStr(bfsPass))
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
