/*
Binary Tree Level Order Traversal - Go Solutions

Return level order traversal of binary tree (values grouped by level).

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// TreeNode represents a binary tree node
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// ============================================================================
// APPROACH 1: BFS with Level Size Tracking
// ============================================================================
// Time Complexity:  O(N) - visit each node once
// Space Complexity: O(W) - max width of tree (queue size)
//
// WHY THIS IS BEST:
// - Clean and intuitive level-by-level processing
// - Natural BFS pattern
// - Uses queue size to determine level boundaries
// ============================================================================

// LevelOrderBFS returns level order traversal using BFS.
//
// Key Insight: At start of each level, queue contains exactly
// all nodes at that level. Use queue size to process level.
//
// Visual:
//
//	    3          Level 0: [3]
//	   / \         Level 1: [9, 20]
//	  9  20        Level 2: [15, 7]
//	    /  \
//	   15   7
func LevelOrderBFS(root *TreeNode) [][]int {
	if root == nil {
		return [][]int{}
	}

	result := [][]int{}
	queue := []*TreeNode{root}

	for len(queue) > 0 {
		levelSize := len(queue) // Nodes at current level
		level := []int{}

		// Process all nodes at this level
		for i := 0; i < levelSize; i++ {
			// Dequeue
			node := queue[0]
			queue = queue[1:]

			level = append(level, node.Val)

			// Enqueue children for next level
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
// APPROACH 2: DFS with Level Parameter
// ============================================================================
// Time Complexity:  O(N)
// Space Complexity: O(H) - height of tree for recursion
//
// WHEN TO USE:
// - Prefer recursive solutions
// - Want to use DFS pattern
// - Tree is very wide but not deep
// ============================================================================

// LevelOrderDFS returns level order traversal using DFS.
func LevelOrderDFS(root *TreeNode) [][]int {
	result := [][]int{}

	var dfs func(node *TreeNode, level int)
	dfs = func(node *TreeNode, level int) {
		if node == nil {
			return
		}

		// Ensure result has slice for this level
		if level >= len(result) {
			result = append(result, []int{})
		}

		// Add value to appropriate level
		result[level] = append(result[level], node.Val)

		// Recurse to children (left first for left-to-right order)
		dfs(node.Left, level+1)
		dfs(node.Right, level+1)
	}

	dfs(root, 0)
	return result
}

// ============================================================================
// APPROACH 3: BFS with Level Marker (Alternative)
// ============================================================================
// Time Complexity:  O(N)
// Space Complexity: O(W)
//
// WHEN TO USE:
// - Alternative approach using nil to mark level end
// - Some may find this more intuitive
// ============================================================================

// LevelOrderMarker uses nil as level delimiter.
func LevelOrderMarker(root *TreeNode) [][]int {
	if root == nil {
		return [][]int{}
	}

	result := [][]int{}
	queue := []*TreeNode{root, nil} // nil marks end of level
	currentLevel := []int{}

	for len(queue) > 0 {
		// Dequeue
		node := queue[0]
		queue = queue[1:]

		if node == nil {
			// End of current level
			result = append(result, currentLevel)
			currentLevel = []int{}

			// Add marker for next level (if there are more nodes)
			if len(queue) > 0 {
				queue = append(queue, nil)
			}
		} else {
			currentLevel = append(currentLevel, node.Val)

			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
	}

	return result
}

// ============================================================================
// VARIATIONS
// ============================================================================

// LevelOrderBottom returns level order from bottom to top.
func LevelOrderBottom(root *TreeNode) [][]int {
	result := LevelOrderBFS(root)

	// Reverse
	for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
		result[i], result[j] = result[j], result[i]
	}

	return result
}

// ZigzagLevelOrder returns zigzag level order traversal.
func ZigzagLevelOrder(root *TreeNode) [][]int {
	if root == nil {
		return [][]int{}
	}

	result := [][]int{}
	queue := []*TreeNode{root}
	leftToRight := true

	for len(queue) > 0 {
		levelSize := len(queue)
		level := make([]int, levelSize)

		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]

			// Insert based on direction
			idx := i
			if !leftToRight {
				idx = levelSize - 1 - i
			}
			level[idx] = node.Val

			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}

		result = append(result, level)
		leftToRight = !leftToRight
	}

	return result
}

// ============================================================================
// HELPER: Build tree from array
// ============================================================================

func BuildTree(values []interface{}) *TreeNode {
	if len(values) == 0 || values[0] == nil {
		return nil
	}

	root := &TreeNode{Val: values[0].(int)}
	queue := []*TreeNode{root}
	i := 1

	for len(queue) > 0 && i < len(values) {
		node := queue[0]
		queue = queue[1:]

		// Left child
		if i < len(values) && values[i] != nil {
			node.Left = &TreeNode{Val: values[i].(int)}
			queue = append(queue, node.Left)
		}
		i++

		// Right child
		if i < len(values) && values[i] != nil {
			node.Right = &TreeNode{Val: values[i].(int)}
			queue = append(queue, node.Right)
		}
		i++
	}

	return root
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		values   []interface{}
		expected [][]int
		desc     string
	}{
		{
			[]interface{}{3, 9, 20, nil, nil, 15, 7},
			[][]int{{3}, {9, 20}, {15, 7}},
			"Standard tree",
		},
		{
			[]interface{}{1},
			[][]int{{1}},
			"Single node",
		},
		{
			[]interface{}{},
			[][]int{},
			"Empty tree",
		},
		{
			[]interface{}{1, 2, 3, 4, 5, 6, 7},
			[][]int{{1}, {2, 3}, {4, 5, 6, 7}},
			"Complete binary tree",
		},
	}

	approaches := []struct {
		name string
		fn   func(*TreeNode) [][]int
	}{
		{"BFS Level Size", LevelOrderBFS},
		{"DFS Recursive", LevelOrderDFS},
		{"BFS with Marker", LevelOrderMarker},
	}

	fmt.Println("======================================================================")
	fmt.Println("BINARY TREE LEVEL ORDER TRAVERSAL - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")

		for _, tc := range testCases {
			root := BuildTree(tc.values)
			result := approach.fn(root)

			status := "PASS"
			if fmt.Sprintf("%v", result) != fmt.Sprintf("%v", tc.expected) {
				status = "FAIL"
			}
			fmt.Printf("  [%s] %s: %v\n", status, tc.desc, result)
		}
	}

	// Variation tests
	fmt.Println("\n======================================================================")
	fmt.Println("VARIATIONS")
	fmt.Println("======================================================================")

	tree := BuildTree([]interface{}{3, 9, 20, nil, nil, 15, 7})

	fmt.Printf("\nLevel Order Bottom: %v\n", LevelOrderBottom(tree))
	fmt.Printf("Zigzag Level Order: %v\n", ZigzagLevelOrder(tree))

	fmt.Println("\nAll tests completed!")
}
