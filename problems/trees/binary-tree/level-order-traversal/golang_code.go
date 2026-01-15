// Level Order Traversal (BFS)
// ===========================
// Return the level order traversal of a binary tree.
//
// Time Complexity: O(n)
// Space Complexity: O(w) where w is maximum width of tree

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

// levelOrderBFS performs level order traversal using BFS with a queue
// Time: O(n), Space: O(w) where w is max width
func levelOrderBFS(root *TreeNode) [][]int {
	if root == nil {
		return [][]int{}
	}

	result := [][]int{}
	queue := []*TreeNode{root}

	for len(queue) > 0 {
		levelSize := len(queue)
		currentLevel := []int{}

		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]
			currentLevel = append(currentLevel, node.Val)

			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}

		result = append(result, currentLevel)
	}

	return result
}

// levelOrderDFS performs level order traversal using DFS recursively
// Time: O(n), Space: O(h) for recursion
func levelOrderDFS(root *TreeNode) [][]int {
	result := [][]int{}

	var dfs func(node *TreeNode, level int)
	dfs = func(node *TreeNode, level int) {
		if node == nil {
			return
		}

		// Create new level list if needed
		if level >= len(result) {
			result = append(result, []int{})
		}

		// Add current node to its level
		result[level] = append(result[level], node.Val)

		// Process children
		dfs(node.Left, level+1)
		dfs(node.Right, level+1)
	}

	dfs(root, 0)
	return result
}

// levelOrderIterative performs level order using two slices (no deque)
// Time: O(n), Space: O(w)
func levelOrderIterative(root *TreeNode) [][]int {
	if root == nil {
		return [][]int{}
	}

	result := [][]int{}
	currentLevel := []*TreeNode{root}

	for len(currentLevel) > 0 {
		levelValues := []int{}
		nextLevel := []*TreeNode{}

		for _, node := range currentLevel {
			levelValues = append(levelValues, node.Val)
			if node.Left != nil {
				nextLevel = append(nextLevel, node.Left)
			}
			if node.Right != nil {
				nextLevel = append(nextLevel, node.Right)
			}
		}

		result = append(result, levelValues)
		currentLevel = nextLevel
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

func main() {
	testCases := []struct {
		input    []*int
		expected [][]int
	}{
		{
			input:    []*int{intPtr(3), intPtr(9), intPtr(20), nil, nil, intPtr(15), intPtr(7)},
			expected: [][]int{{3}, {9, 20}, {15, 7}},
		},
		{
			input:    []*int{intPtr(1)},
			expected: [][]int{{1}},
		},
		{
			input:    []*int{},
			expected: [][]int{},
		},
		{
			input:    []*int{intPtr(1), intPtr(2), intPtr(3), intPtr(4), intPtr(5), intPtr(6), intPtr(7)},
			expected: [][]int{{1}, {2, 3}, {4, 5, 6, 7}},
		},
		{
			input:    []*int{intPtr(1), intPtr(2), nil, intPtr(3), nil, intPtr(4)},
			expected: [][]int{{1}, {2}, {3}, {4}},
		},
		{
			input:    []*int{intPtr(1), nil, intPtr(2), nil, intPtr(3), nil, intPtr(4)},
			expected: [][]int{{1}, {2}, {3}, {4}},
		},
	}

	fmt.Println("============================================================")
	fmt.Println("LEVEL ORDER TRAVERSAL - TEST RESULTS")
	fmt.Println("============================================================")

	for i, tc := range testCases {
		root := buildTree(tc.input)

		bfsResult := levelOrderBFS(root)
		dfsResult := levelOrderDFS(root)
		iterativeResult := levelOrderIterative(root)

		bfsPass := reflect.DeepEqual(bfsResult, tc.expected)
		dfsPass := reflect.DeepEqual(dfsResult, tc.expected)
		iterativePass := reflect.DeepEqual(iterativeResult, tc.expected)

		status := "PASS"
		if !bfsPass || !dfsPass || !iterativePass {
			status = "FAIL"
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Input:     %v\n", formatInput(tc.input))
		fmt.Printf("  Expected:  %v\n", tc.expected)
		fmt.Printf("  BFS:       %v %s\n", bfsResult, passStr(bfsPass))
		fmt.Printf("  DFS:       %v %s\n", dfsResult, passStr(dfsPass))
		fmt.Printf("  Iterative: %v %s\n", iterativeResult, passStr(iterativePass))
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
