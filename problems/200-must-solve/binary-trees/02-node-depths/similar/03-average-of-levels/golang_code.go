/*
Average of Levels in Binary Tree - Go Solutions

Given a binary tree, return the average value of nodes on each level.

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
// APPROACH 1: BFS with Level Tracking (Recommended)
// ============================================================================
// Time Complexity:  O(n) - visit each node once
// Space Complexity: O(w) - where w is max width of tree
//
// WHY THIS IS BEST:
// - Natural fit for level-order processing
// - Easy to track level boundaries using queue length
// - Simple running sum calculation per level
// ============================================================================

// AverageOfLevels returns the average value of nodes on each level.
//
// Key insight: Use BFS and track level boundaries with queue length.
//
// Visual example:
//
//	    3
//	   / \
//	  9  20
//	    /  \
//	   15   7
//
// Level 0: [3]     -> avg = 3.0
// Level 1: [9, 20] -> avg = 14.5
// Level 2: [15, 7] -> avg = 11.0
//
// Answer: [3.0, 14.5, 11.0]
func AverageOfLevels(root *BinaryTree) []float64 {
	if root == nil {
		return []float64{}
	}

	result := []float64{}
	queue := []*BinaryTree{root}

	for len(queue) > 0 {
		levelSize := len(queue)
		levelSum := 0

		// Process all nodes at current level
		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]
			levelSum += node.Value

			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}

		// Calculate and store average for this level
		result = append(result, float64(levelSum)/float64(levelSize))
	}

	return result
}

// ============================================================================
// APPROACH 2: DFS with Level Mapping
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(h) for recursion + O(levels) for map storage
//
// WHEN TO USE:
// - When you prefer recursive solutions
// - When tree is deep but narrow
// ============================================================================

// levelData stores sum and count for each level
type levelData struct {
	sum   int
	count int
}

// AverageOfLevelsDFS uses DFS to collect nodes by level, then calculates averages.
func AverageOfLevelsDFS(root *BinaryTree) []float64 {
	if root == nil {
		return []float64{}
	}

	// Map level to (sum, count)
	data := make(map[int]*levelData)
	maxLevel := 0

	var dfs func(node *BinaryTree, level int)
	dfs = func(node *BinaryTree, level int) {
		if node == nil {
			return
		}

		if _, exists := data[level]; !exists {
			data[level] = &levelData{}
		}
		data[level].sum += node.Value
		data[level].count++

		if level > maxLevel {
			maxLevel = level
		}

		dfs(node.Left, level+1)
		dfs(node.Right, level+1)
	}

	dfs(root, 0)

	// Calculate averages in level order
	result := make([]float64, maxLevel+1)
	for level := 0; level <= maxLevel; level++ {
		d := data[level]
		result[level] = float64(d.sum) / float64(d.count)
	}

	return result
}

// ============================================================================
// APPROACH 3: BFS with Two Slices (Alternative)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(w)
//
// Alternative implementation using slice swapping instead of queue.
// ============================================================================

// AverageOfLevelsTwoSlices uses two slices to track current and next level nodes.
func AverageOfLevelsTwoSlices(root *BinaryTree) []float64 {
	if root == nil {
		return []float64{}
	}

	result := []float64{}
	currentLevel := []*BinaryTree{root}

	for len(currentLevel) > 0 {
		// Calculate sum for current level
		levelSum := 0
		for _, node := range currentLevel {
			levelSum += node.Value
		}
		result = append(result, float64(levelSum)/float64(len(currentLevel)))

		// Build next level
		nextLevel := []*BinaryTree{}
		for _, node := range currentLevel {
			if node.Left != nil {
				nextLevel = append(nextLevel, node.Left)
			}
			if node.Right != nil {
				nextLevel = append(nextLevel, node.Right)
			}
		}

		currentLevel = nextLevel
	}

	return result
}

// ============================================================================
// APPROACH 4: Collect Levels First
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n)
//
// First collect all levels, then calculate averages.
// ============================================================================

// AverageOfLevelsCollectFirst collects all levels first, then calculates averages.
func AverageOfLevelsCollectFirst(root *BinaryTree) []float64 {
	if root == nil {
		return []float64{}
	}

	// Collect all levels
	levels := [][]int{}
	queue := []*BinaryTree{root}

	for len(queue) > 0 {
		levelSize := len(queue)
		currentLevel := make([]int, 0, levelSize)

		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]
			currentLevel = append(currentLevel, node.Value)

			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}

		levels = append(levels, currentLevel)
	}

	// Calculate averages
	result := make([]float64, len(levels))
	for i, level := range levels {
		sum := 0
		for _, val := range level {
			sum += val
		}
		result[i] = float64(sum) / float64(len(level))
	}

	return result
}

// ============================================================================
// BONUS: Level Sums (Related Problem)
// ============================================================================

// LevelSums returns the sum of nodes at each level.
func LevelSums(root *BinaryTree) []int {
	if root == nil {
		return []int{}
	}

	result := []int{}
	queue := []*BinaryTree{root}

	for len(queue) > 0 {
		levelSize := len(queue)
		levelSum := 0

		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]
			levelSum += node.Value

			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}

		result = append(result, levelSum)
	}

	return result
}

// ============================================================================
// BONUS: Maximum Level Sum (Related Problem - LeetCode 1161)
// ============================================================================

// MaxLevelSum returns the smallest level (1-indexed) with maximum sum.
func MaxLevelSum(root *BinaryTree) int {
	if root == nil {
		return 0
	}

	sums := LevelSums(root)
	if len(sums) == 0 {
		return 0
	}

	maxSum := sums[0]
	maxLevel := 1

	for i, sum := range sums {
		if sum > maxSum {
			maxSum = sum
			maxLevel = i + 1 // 1-indexed
		}
	}

	return maxLevel
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("AVERAGE OF LEVELS IN BINARY TREE - TEST RESULTS")
	fmt.Println("======================================================================")

	// Test Case 1: Standard tree
	//    3
	//   / \
	//  9  20
	//    /  \
	//   15   7
	root1 := &BinaryTree{Value: 3}
	root1.Left = &BinaryTree{Value: 9}
	root1.Right = &BinaryTree{Value: 20}
	root1.Right.Left = &BinaryTree{Value: 15}
	root1.Right.Right = &BinaryTree{Value: 7}

	fmt.Println("\nTest 1: Standard tree")
	fmt.Println("       3")
	fmt.Println("      / \\")
	fmt.Println("     9  20")
	fmt.Println("       /  \\")
	fmt.Println("      15   7")
	fmt.Printf("  Result: %v\n", AverageOfLevels(root1))
	fmt.Println("  Expected: [3.0, 14.5, 11.0]")

	// Test Case 2: Complete binary tree
	//      1
	//     / \
	//    2   3
	//   / \   \
	//  4   5   6
	root2 := &BinaryTree{Value: 1}
	root2.Left = &BinaryTree{Value: 2}
	root2.Right = &BinaryTree{Value: 3}
	root2.Left.Left = &BinaryTree{Value: 4}
	root2.Left.Right = &BinaryTree{Value: 5}
	root2.Right.Right = &BinaryTree{Value: 6}

	fmt.Println("\nTest 2: Tree with 6 nodes")
	fmt.Printf("  Result: %v\n", AverageOfLevels(root2))
	fmt.Println("  Expected: [1.0, 2.5, 5.0]")

	// Test Case 3: Single node
	root3 := &BinaryTree{Value: 42}
	fmt.Println("\nTest 3: Single node (value=42)")
	fmt.Printf("  Result: %v\n", AverageOfLevels(root3))
	fmt.Println("  Expected: [42.0]")

	// Test Case 4: Skewed tree (left)
	root4 := &BinaryTree{Value: 1}
	root4.Left = &BinaryTree{Value: 2}
	root4.Left.Left = &BinaryTree{Value: 3}

	fmt.Println("\nTest 4: Left skewed tree (1->2->3)")
	fmt.Printf("  Result: %v\n", AverageOfLevels(root4))
	fmt.Println("  Expected: [1.0, 2.0, 3.0]")

	// Test Case 5: Empty tree
	fmt.Println("\nTest 5: Empty tree")
	fmt.Printf("  Result: %v\n", AverageOfLevels(nil))
	fmt.Println("  Expected: []")

	// Test Case 6: Tree with negative values
	root6 := &BinaryTree{Value: -1}
	root6.Left = &BinaryTree{Value: -2}
	root6.Right = &BinaryTree{Value: 3}

	fmt.Println("\nTest 6: Tree with negative values")
	fmt.Printf("  Result: %v\n", AverageOfLevels(root6))
	fmt.Println("  Expected: [-1.0, 0.5]")

	// Compare approaches
	fmt.Println("\n======================================================================")
	fmt.Println("COMPARING APPROACHES")
	fmt.Println("======================================================================")

	fmt.Println("\nUsing standard tree (Test 1):")
	fmt.Printf("  BFS Level Tracking: %v\n", AverageOfLevels(root1))
	fmt.Printf("  DFS with Mapping:   %v\n", AverageOfLevelsDFS(root1))
	fmt.Printf("  Two Slices:         %v\n", AverageOfLevelsTwoSlices(root1))
	fmt.Printf("  Collect First:      %v\n", AverageOfLevelsCollectFirst(root1))

	// Test bonus functions
	fmt.Println("\n======================================================================")
	fmt.Println("BONUS: LEVEL SUMS")
	fmt.Println("======================================================================")
	fmt.Printf("\nLevel sums for Test 1: %v\n", LevelSums(root1))
	fmt.Println("Expected: [3, 29, 22]")
	fmt.Printf("Max level sum at level: %d\n", MaxLevelSum(root1))
	fmt.Println("Expected: 2 (level with sum 29)")

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
}
