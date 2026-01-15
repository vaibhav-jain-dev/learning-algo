/*
Binary Tree Maximum Path Sum
Combines: Tree Traversal (DFS) + Dynamic Programming
*/

package main

import (
	"fmt"
	"math"
)

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func maxPathSum(root *TreeNode) int {
	maxSum := math.MinInt32

	var dfs func(node *TreeNode) int
	dfs = func(node *TreeNode) int {
		if node == nil {
			return 0
		}

		// Get max path from children (ignore negatives)
		leftGain := max(0, dfs(node.Left))
		rightGain := max(0, dfs(node.Right))

		// Complete path through this node
		pathThrough := node.Val + leftGain + rightGain
		maxSum = max(maxSum, pathThrough)

		// Return max path that can extend to parent
		return node.Val + max(leftGain, rightGain)
	}

	dfs(root)
	return maxSum
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// Build tree from level-order array
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

// Visualize tree
func printTree(node *TreeNode, prefix string, isLeft bool) {
	if node == nil {
		return
	}

	fmt.Printf("%s", prefix)
	if isLeft {
		fmt.Print("├──")
	} else {
		fmt.Print("└──")
	}
	fmt.Printf(" %d\n", node.Val)

	newPrefix := prefix
	if isLeft {
		newPrefix += "│   "
	} else {
		newPrefix += "    "
	}

	printTree(node.Left, newPrefix, true)
	printTree(node.Right, newPrefix, false)
}

func main() {
	testCases := []struct {
		values   []interface{}
		expected int
	}{
		{[]interface{}{1, 2, 3}, 6},
		{[]interface{}{-10, 9, 20, nil, nil, 15, 7}, 42},
		{[]interface{}{-3}, -3},
		{[]interface{}{2, -1}, 2},
		{[]interface{}{-1, -2, -3}, -1},
		{[]interface{}{1, -2, 3}, 4},
	}

	fmt.Println("Binary Tree Maximum Path Sum")
	fmt.Println("============================================================")

	for i, tc := range testCases {
		root := buildTree(tc.values)

		fmt.Printf("\nTest %d: %v\n", i+1, tc.values)
		printTree(root, "", false)

		result := maxPathSum(root)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("Max Path Sum: %d (expected: %d) [%s]\n", result, tc.expected, status)
		fmt.Println("----------------------------------------")
	}
}
