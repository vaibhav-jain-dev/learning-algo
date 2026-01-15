// Maximum Depth of Binary Tree
// ============================
// Return the maximum depth (height) of a binary tree.
//
// Time Complexity: O(n)
// Space Complexity: O(h) for recursive, O(w) for BFS

package main

import "fmt"

// TreeNode defines a binary tree node
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// maxDepthRecursive finds maximum depth using recursive DFS
// Time: O(n), Space: O(h) where h is tree height
func maxDepthRecursive(root *TreeNode) int {
	if root == nil {
		return 0
	}

	leftDepth := maxDepthRecursive(root.Left)
	rightDepth := maxDepthRecursive(root.Right)

	return 1 + max(leftDepth, rightDepth)
}

// maxDepthBFS finds maximum depth using BFS (level-order)
// Time: O(n), Space: O(w) where w is max width
func maxDepthBFS(root *TreeNode) int {
	if root == nil {
		return 0
	}

	depth := 0
	queue := []*TreeNode{root}

	for len(queue) > 0 {
		depth++
		levelSize := len(queue)

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

// NodeDepth pairs a node with its depth for iterative DFS
type NodeDepth struct {
	node  *TreeNode
	depth int
}

// maxDepthDFSIterative finds maximum depth using iterative DFS with stack
// Time: O(n), Space: O(h)
func maxDepthDFSIterative(root *TreeNode) int {
	if root == nil {
		return 0
	}

	maxD := 0
	stack := []NodeDepth{{root, 1}}

	for len(stack) > 0 {
		// Pop from stack
		item := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		node, currentDepth := item.node, item.depth
		if currentDepth > maxD {
			maxD = currentDepth
		}

		if node.Left != nil {
			stack = append(stack, NodeDepth{node.Left, currentDepth + 1})
		}
		if node.Right != nil {
			stack = append(stack, NodeDepth{node.Right, currentDepth + 1})
		}
	}

	return maxD
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
		expected int
	}{
		{
			input:    []*int{intPtr(3), intPtr(9), intPtr(20), nil, nil, intPtr(15), intPtr(7)},
			expected: 3,
		},
		{
			input:    []*int{intPtr(1), nil, intPtr(2)},
			expected: 2,
		},
		{
			input:    []*int{},
			expected: 0,
		},
		{
			input:    []*int{intPtr(1)},
			expected: 1,
		},
		{
			input:    []*int{intPtr(1), intPtr(2), intPtr(3), intPtr(4), intPtr(5), intPtr(6), intPtr(7)},
			expected: 3,
		},
		{
			input:    []*int{intPtr(1), intPtr(2), nil, intPtr(3), nil, intPtr(4), nil, intPtr(5)},
			expected: 5,
		},
		{
			input:    []*int{intPtr(1), nil, intPtr(2), nil, intPtr(3), nil, intPtr(4), nil, intPtr(5)},
			expected: 5,
		},
	}

	fmt.Println("============================================================")
	fmt.Println("MAXIMUM DEPTH - TEST RESULTS")
	fmt.Println("============================================================")

	for i, tc := range testCases {
		root := buildTree(tc.input)

		recursiveResult := maxDepthRecursive(root)
		bfsResult := maxDepthBFS(root)
		dfsResult := maxDepthDFSIterative(root)

		recursivePass := recursiveResult == tc.expected
		bfsPass := bfsResult == tc.expected
		dfsPass := dfsResult == tc.expected

		status := "PASS"
		if !recursivePass || !bfsPass || !dfsPass {
			status = "FAIL"
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Input:     %v\n", formatInput(tc.input))
		fmt.Printf("  Expected:  %d\n", tc.expected)
		fmt.Printf("  Recursive: %d %s\n", recursiveResult, passStr(recursivePass))
		fmt.Printf("  BFS:       %d %s\n", bfsResult, passStr(bfsPass))
		fmt.Printf("  DFS Stack: %d %s\n", dfsResult, passStr(dfsPass))
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
