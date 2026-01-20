/*
Binary Tree Zigzag Level Order Traversal - Go Solutions

Return zigzag level order traversal (alternating left-to-right and right-to-left).

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
// APPROACH 1: BFS with Level Reverse
// ============================================================================
// Time Complexity:  O(n) - visit each node once, reversals are O(n) total
// Space Complexity: O(n) - queue and result storage
//
// WHY THIS WORKS:
// - Standard BFS collects levels left-to-right
// - Reverse odd-indexed levels to get right-to-left
// - Simple and easy to understand
// ============================================================================

// ZigzagLevelOrderReverse uses standard BFS + reverse on odd levels
func ZigzagLevelOrderReverse(root *TreeNode) [][]int {
	if root == nil {
		return [][]int{}
	}

	var result [][]int
	queue := []*TreeNode{root}
	leftToRight := true

	for len(queue) > 0 {
		levelSize := len(queue)
		level := make([]int, levelSize)

		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]
			level[i] = node.Val

			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}

		// Reverse if right-to-left direction
		if !leftToRight {
			reverseSlice(level)
		}

		result = append(result, level)
		leftToRight = !leftToRight
	}

	return result
}

// reverseSlice reverses a slice of integers in place
func reverseSlice(s []int) {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[i], s[j] = s[j], s[i]
	}
}

// ============================================================================
// APPROACH 2: BFS with Direction-Aware Insertion
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n)
//
// WHY THIS IS ELEGANT:
// - No explicit reversal needed
// - Insert at front or back based on direction
// ============================================================================

// ZigzagLevelOrderDirectional uses direction-aware insertion
func ZigzagLevelOrderDirectional(root *TreeNode) [][]int {
	if root == nil {
		return [][]int{}
	}

	var result [][]int
	queue := []*TreeNode{root}
	leftToRight := true

	for len(queue) > 0 {
		levelSize := len(queue)
		level := make([]int, levelSize)

		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]

			// Calculate index based on direction
			var idx int
			if leftToRight {
				idx = i
			} else {
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
// APPROACH 3: Two Stacks Alternating
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n)
//
// WHY THIS IS INTERESTING:
// - Uses stack's LIFO property for natural reversal
// - Alternate between two stacks
// ============================================================================

// ZigzagLevelOrderTwoStacks uses two alternating stacks
func ZigzagLevelOrderTwoStacks(root *TreeNode) [][]int {
	if root == nil {
		return [][]int{}
	}

	var result [][]int
	currentStack := []*TreeNode{root}
	var nextStack []*TreeNode
	leftToRight := true

	for len(currentStack) > 0 {
		var level []int

		for len(currentStack) > 0 {
			// Pop from current stack
			node := currentStack[len(currentStack)-1]
			currentStack = currentStack[:len(currentStack)-1]
			level = append(level, node.Val)

			if leftToRight {
				// For next level (right-to-left), push left first
				if node.Left != nil {
					nextStack = append(nextStack, node.Left)
				}
				if node.Right != nil {
					nextStack = append(nextStack, node.Right)
				}
			} else {
				// For next level (left-to-right), push right first
				if node.Right != nil {
					nextStack = append(nextStack, node.Right)
				}
				if node.Left != nil {
					nextStack = append(nextStack, node.Left)
				}
			}
		}

		result = append(result, level)
		currentStack, nextStack = nextStack, currentStack
		leftToRight = !leftToRight
	}

	return result
}

// ============================================================================
// APPROACH 4: DFS with Level Tracking
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) for result + O(h) for recursion
//
// WHY USE DFS:
// - Alternative to BFS
// - Can be useful if you prefer recursive thinking
// ============================================================================

// ZigzagLevelOrderDFS uses DFS with level tracking
func ZigzagLevelOrderDFS(root *TreeNode) [][]int {
	var result [][]int

	var dfs func(node *TreeNode, level int)
	dfs = func(node *TreeNode, level int) {
		if node == nil {
			return
		}

		// Extend result slice if needed
		for level >= len(result) {
			result = append(result, []int{})
		}

		// Insert based on level parity
		if level%2 == 0 {
			// Left to right - append
			result[level] = append(result[level], node.Val)
		} else {
			// Right to left - prepend
			result[level] = append([]int{node.Val}, result[level]...)
		}

		dfs(node.Left, level+1)
		dfs(node.Right, level+1)
	}

	dfs(root, 0)
	return result
}

// ============================================================================
// VARIANT: Zigzag with Level Info
// ============================================================================

// LevelInfo contains level information with direction
type LevelInfo struct {
	Level     int
	Direction string
	Values    []int
}

// ZigzagWithInfo returns zigzag traversal with level info
func ZigzagWithInfo(root *TreeNode) []LevelInfo {
	if root == nil {
		return []LevelInfo{}
	}

	var result []LevelInfo
	queue := []*TreeNode{root}
	leftToRight := true
	levelNum := 0

	for len(queue) > 0 {
		levelSize := len(queue)
		level := make([]int, levelSize)

		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]
			level[i] = node.Val

			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}

		direction := "L->R"
		if !leftToRight {
			direction = "R->L"
			reverseSlice(level)
		}

		result = append(result, LevelInfo{
			Level:     levelNum,
			Direction: direction,
			Values:    level,
		})

		leftToRight = !leftToRight
		levelNum++
	}

	return result
}

// ============================================================================
// BONUS: Spiral Order (Bottom-Up)
// ============================================================================

// SpiralOrderBottomUp returns bottom-up spiral traversal
func SpiralOrderBottomUp(root *TreeNode) [][]int {
	if root == nil {
		return [][]int{}
	}

	// First do regular level order
	var allLevels [][]int
	queue := []*TreeNode{root}

	for len(queue) > 0 {
		levelSize := len(queue)
		level := make([]int, levelSize)

		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]
			level[i] = node.Val

			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}

		allLevels = append(allLevels, level)
	}

	// Reverse levels and apply zigzag
	result := make([][]int, len(allLevels))
	for i := 0; i < len(allLevels); i++ {
		level := allLevels[len(allLevels)-1-i]
		if i%2 == 1 {
			levelCopy := make([]int, len(level))
			copy(levelCopy, level)
			reverseSlice(levelCopy)
			result[i] = levelCopy
		} else {
			result[i] = level
		}
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

// slicesEqual checks if two 2D int slices are equal
func slicesEqual(a, b [][]int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if len(a[i]) != len(b[i]) {
			return false
		}
		for j := range a[i] {
			if a[i][j] != b[i][j] {
				return false
			}
		}
	}
	return true
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("ZIGZAG LEVEL ORDER TRAVERSAL - TEST RESULTS")
	fmt.Println("======================================================================")

	testCases := []struct {
		values      []interface{}
		expected    [][]int
		description string
	}{
		{[]interface{}{3, 9, 20, nil, nil, 15, 7}, [][]int{{3}, {20, 9}, {15, 7}}, "Example 1"},
		{[]interface{}{1, 2, 3, 4, 5, 6, 7}, [][]int{{1}, {3, 2}, {4, 5, 6, 7}}, "Complete tree"},
		{[]interface{}{1}, [][]int{{1}}, "Single node"},
		{[]interface{}{1, 2, 3, 4, nil, nil, 5}, [][]int{{1}, {3, 2}, {4, 5}}, "Partial tree"},
	}

	for _, tc := range testCases {
		fmt.Printf("\n%s\n", tc.description)
		fmt.Printf("Input: %v\n", tc.values)
		fmt.Printf("Expected: %v\n", tc.expected)

		root := buildTree(tc.values)

		// Test all approaches
		result1 := ZigzagLevelOrderReverse(root)
		result2 := ZigzagLevelOrderDirectional(root)
		result3 := ZigzagLevelOrderTwoStacks(root)
		result4 := ZigzagLevelOrderDFS(root)

		status1 := "PASS"
		if !slicesEqual(result1, tc.expected) {
			status1 = fmt.Sprintf("FAIL: %v", result1)
		}
		status2 := "PASS"
		if !slicesEqual(result2, tc.expected) {
			status2 = fmt.Sprintf("FAIL: %v", result2)
		}
		status3 := "PASS"
		if !slicesEqual(result3, tc.expected) {
			status3 = fmt.Sprintf("FAIL: %v", result3)
		}
		status4 := "PASS"
		if !slicesEqual(result4, tc.expected) {
			status4 = fmt.Sprintf("FAIL: %v", result4)
		}

		fmt.Printf("  Reverse approach:    %v - %s\n", result1, status1)
		fmt.Printf("  Directional approach: %v - %s\n", result2, status2)
		fmt.Printf("  Two stacks approach: %v - %s\n", result3, status3)
		fmt.Printf("  DFS approach:        %v - %s\n", result4, status4)
	}

	// Test empty tree
	fmt.Println("\nEmpty tree:")
	var emptyRoot *TreeNode
	result := ZigzagLevelOrderReverse(emptyRoot)
	fmt.Printf("  Result: %v\n", result)

	// Test with info
	fmt.Println("\n----------------------------------------------------------------------")
	fmt.Println("Zigzag with Direction Info")
	fmt.Println("----------------------------------------------------------------------")

	root := buildTree([]interface{}{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15})
	infoResult := ZigzagWithInfo(root)
	for _, info := range infoResult {
		fmt.Printf("  Level %d (%s): %v\n", info.Level, info.Direction, info.Values)
	}

	// Test spiral bottom-up
	fmt.Println("\n----------------------------------------------------------------------")
	fmt.Println("Spiral Order (Bottom-Up)")
	fmt.Println("----------------------------------------------------------------------")
	root = buildTree([]interface{}{1, 2, 3, 4, 5, 6, 7})
	spiral := SpiralOrderBottomUp(root)
	fmt.Printf("  Tree: [1, 2, 3, 4, 5, 6, 7]\n")
	fmt.Printf("  Spiral bottom-up: %v\n", spiral)

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
	fmt.Println("======================================================================")
}
