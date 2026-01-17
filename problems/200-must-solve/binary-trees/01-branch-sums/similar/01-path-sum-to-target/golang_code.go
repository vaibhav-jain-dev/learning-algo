/*
Path Sum to Target - Go Solutions

Find all root-to-leaf paths where the sum equals the target.

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
// APPROACH 1: DFS with Backtracking (Recommended)
// ============================================================================
// Time Complexity:  O(n) - visit each node once
// Space Complexity: O(h) for recursion stack + O(n) for storing paths
//
// WHY THIS IS BEST:
// - Clean recursive structure
// - Natural fit for path problems
// - Backtracking handles path building elegantly
// ============================================================================

// PathSumToTarget finds all root-to-leaf paths summing to target.
//
// Visual example for target=22:
//
//	        5
//	       / \
//	      4   8
//	     /   / \
//	   11   13  4
//	   / \     / \
//	  7   2   5   1
//
//	Paths: [[5,4,11,2], [5,8,4,5]]
func PathSumToTarget(root *BinaryTree, target int) [][]int {
	var result [][]int
	var currentPath []int

	var dfs func(node *BinaryTree, remainingSum int)
	dfs = func(node *BinaryTree, remainingSum int) {
		if node == nil {
			return
		}

		// Add current node to path
		currentPath = append(currentPath, node.Value)
		remainingSum -= node.Value

		// Check if it's a leaf and sum matches
		if node.Left == nil && node.Right == nil && remainingSum == 0 {
			// Make a copy of the path to store
			pathCopy := make([]int, len(currentPath))
			copy(pathCopy, currentPath)
			result = append(result, pathCopy)
		}

		// Explore children
		dfs(node.Left, remainingSum)
		dfs(node.Right, remainingSum)

		// BACKTRACK: remove current node from path
		currentPath = currentPath[:len(currentPath)-1]
	}

	dfs(root, target)
	return result
}

// ============================================================================
// APPROACH 2: Iterative with Stack
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) for stack and path storage
//
// WHEN TO USE:
// - When recursion depth might cause stack overflow
// - When you need explicit control over traversal
// ============================================================================

// pathState holds the state for iterative traversal
type pathState struct {
	node         *BinaryTree
	remainingSum int
	path         []int
}

// PathSumToTargetIterative finds paths using iterative DFS.
func PathSumToTargetIterative(root *BinaryTree, target int) [][]int {
	if root == nil {
		return [][]int{}
	}

	var result [][]int
	stack := []pathState{{root, target, []int{}}}

	for len(stack) > 0 {
		// Pop from stack
		state := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		node := state.node
		remaining := state.remainingSum - node.Value

		// Create new path with current node
		newPath := make([]int, len(state.path)+1)
		copy(newPath, state.path)
		newPath[len(newPath)-1] = node.Value

		// Check if leaf and sum matches
		if node.Left == nil && node.Right == nil && remaining == 0 {
			result = append(result, newPath)
			continue
		}

		// Push children to stack (right first so left is processed first)
		if node.Right != nil {
			stack = append(stack, pathState{node.Right, remaining, newPath})
		}
		if node.Left != nil {
			stack = append(stack, pathState{node.Left, remaining, newPath})
		}
	}

	return result
}

// ============================================================================
// APPROACH 3: Using Closure for Cleaner Code
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(h) for recursion
//
// Modern Go pattern using closures for encapsulation.
// ============================================================================

// PathSumToTargetClosure uses closure pattern for cleaner code.
func PathSumToTargetClosure(root *BinaryTree, target int) [][]int {
	result := make([][]int, 0)

	// Helper closure captures result slice
	findPaths := func(node *BinaryTree, target int, path []int) {}
	findPaths = func(node *BinaryTree, remaining int, path []int) {
		if node == nil {
			return
		}

		// Extend path
		path = append(path, node.Value)
		remaining -= node.Value

		// Leaf node check
		if isLeaf(node) && remaining == 0 {
			// Store copy
			result = append(result, append([]int{}, path...))
			return
		}

		// Continue search
		findPaths(node.Left, remaining, path)
		findPaths(node.Right, remaining, path)
	}

	findPaths(root, target, []int{})
	return result
}

// isLeaf checks if a node is a leaf node
func isLeaf(node *BinaryTree) bool {
	return node != nil && node.Left == nil && node.Right == nil
}

// ============================================================================
// HELPER: Build tree from slice (for testing)
// ============================================================================

// BuildTree creates a binary tree from level-order slice.
// -1 represents nil nodes.
func BuildTree(values []int) *BinaryTree {
	if len(values) == 0 || values[0] == -1 {
		return nil
	}

	root := &BinaryTree{Value: values[0]}
	queue := []*BinaryTree{root}
	i := 1

	for len(queue) > 0 && i < len(values) {
		node := queue[0]
		queue = queue[1:]

		// Left child
		if i < len(values) && values[i] != -1 {
			node.Left = &BinaryTree{Value: values[i]}
			queue = append(queue, node.Left)
		}
		i++

		// Right child
		if i < len(values) && values[i] != -1 {
			node.Right = &BinaryTree{Value: values[i]}
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
	fmt.Println("======================================================================")
	fmt.Println("PATH SUM TO TARGET - TEST RESULTS")
	fmt.Println("======================================================================")

	// Test Case 1: Standard tree
	//        5
	//       / \
	//      4   8
	//     /   / \
	//   11   13  4
	//   / \     / \
	//  7   2   5   1
	root1 := &BinaryTree{Value: 5}
	root1.Left = &BinaryTree{Value: 4}
	root1.Right = &BinaryTree{Value: 8}
	root1.Left.Left = &BinaryTree{Value: 11}
	root1.Right.Left = &BinaryTree{Value: 13}
	root1.Right.Right = &BinaryTree{Value: 4}
	root1.Left.Left.Left = &BinaryTree{Value: 7}
	root1.Left.Left.Right = &BinaryTree{Value: 2}
	root1.Right.Right.Left = &BinaryTree{Value: 5}
	root1.Right.Right.Right = &BinaryTree{Value: 1}

	fmt.Println("\nTest 1: Tree with target=22")
	result1 := PathSumToTarget(root1, 22)
	fmt.Printf("  Result: %v\n", result1)
	fmt.Println("  Expected: [[5 4 11 2] [5 8 4 5]]")

	// Test Case 2: No valid paths
	root2 := &BinaryTree{Value: 1}
	root2.Left = &BinaryTree{Value: 2}
	root2.Right = &BinaryTree{Value: 3}

	fmt.Println("\nTest 2: Tree with target=5 (no match)")
	result2 := PathSumToTarget(root2, 5)
	fmt.Printf("  Result: %v\n", result2)
	fmt.Println("  Expected: []")

	// Test Case 3: Single valid path
	fmt.Println("\nTest 3: Tree with target=4")
	result3 := PathSumToTarget(root2, 4)
	fmt.Printf("  Result: %v\n", result3)
	fmt.Println("  Expected: [[1 3]]")

	// Test Case 4: Single node tree
	root4 := &BinaryTree{Value: 5}
	fmt.Println("\nTest 4: Single node with target=5")
	result4 := PathSumToTarget(root4, 5)
	fmt.Printf("  Result: %v\n", result4)
	fmt.Println("  Expected: [[5]]")

	// Test Case 5: Empty tree
	fmt.Println("\nTest 5: Empty tree")
	result5 := PathSumToTarget(nil, 0)
	fmt.Printf("  Result: %v\n", result5)
	fmt.Println("  Expected: []")

	// Compare approaches
	fmt.Println("\n======================================================================")
	fmt.Println("COMPARING APPROACHES")
	fmt.Println("======================================================================")

	fmt.Println("\nApproach 1 (DFS Backtracking):")
	fmt.Printf("  %v\n", PathSumToTarget(root1, 22))

	fmt.Println("\nApproach 2 (Iterative):")
	fmt.Printf("  %v\n", PathSumToTargetIterative(root1, 22))

	fmt.Println("\nApproach 3 (Closure):")
	fmt.Printf("  %v\n", PathSumToTargetClosure(root1, 22))

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
}
