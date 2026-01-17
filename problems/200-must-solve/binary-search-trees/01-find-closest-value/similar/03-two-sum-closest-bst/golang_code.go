/*
Two Sum Closest in BST - Go Solutions

Given a BST and target, find two nodes whose sum is closest to target.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"math"
)

// TreeNode represents a node in a binary search tree
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// ============================================================================
// APPROACH 1: Inorder Traversal + Two Pointers
// ============================================================================
// Time Complexity:  O(n) - traverse tree + two pointer scan
// Space Complexity: O(n) - store all values in sorted array
//
// WHY THIS WORKS:
// - Inorder traversal gives sorted array
// - Two pointers efficiently find closest pair sum
// - Standard and intuitive approach
// ============================================================================

// TwoSumClosestInorder uses inorder traversal and two pointers.
func TwoSumClosestInorder(root *TreeNode, target int) [2]int {
	// Get sorted values via inorder traversal
	var values []int
	var inorder func(node *TreeNode)
	inorder = func(node *TreeNode) {
		if node == nil {
			return
		}
		inorder(node.Left)
		values = append(values, node.Val)
		inorder(node.Right)
	}
	inorder(root)

	// Two pointer approach on sorted array
	left, right := 0, len(values)-1
	closestPair := [2]int{values[left], values[right]}
	closestDiff := math.MaxInt

	for left < right {
		sum := values[left] + values[right]
		diff := abs(sum - target)

		// Update closest if this pair is better
		if diff < closestDiff {
			closestDiff = diff
			closestPair = [2]int{values[left], values[right]}
		}

		// Exact match found
		if sum == target {
			return closestPair
		}

		// Adjust pointers based on sum comparison
		if sum < target {
			left++
		} else {
			right--
		}
	}

	return closestPair
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

// ============================================================================
// APPROACH 2: BST Iterators (Space Optimized)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(h) - only stack space for iterators
//
// WHY THIS IS OPTIMAL FOR LARGE TREES:
// - Doesn't store entire sorted array
// - Uses two stacks as forward and backward iterators
// - More memory efficient for large BSTs
// ============================================================================

// TwoSumClosestIterators uses BST iterators for space efficiency.
func TwoSumClosestIterators(root *TreeNode, target int) [2]int {
	// Forward iterator (smallest to largest)
	forwardStack := make([]*TreeNode, 0)
	// Backward iterator (largest to smallest)
	backwardStack := make([]*TreeNode, 0)

	// Initialize forward iterator (push all left nodes)
	pushLeft := func(node *TreeNode) {
		for node != nil {
			forwardStack = append(forwardStack, node)
			node = node.Left
		}
	}

	// Initialize backward iterator (push all right nodes)
	pushRight := func(node *TreeNode) {
		for node != nil {
			backwardStack = append(backwardStack, node)
			node = node.Right
		}
	}

	// Get next smallest value
	nextSmallest := func() int {
		node := forwardStack[len(forwardStack)-1]
		forwardStack = forwardStack[:len(forwardStack)-1]
		val := node.Val
		pushLeft(node.Right)
		return val
	}

	// Get next largest value
	nextLargest := func() int {
		node := backwardStack[len(backwardStack)-1]
		backwardStack = backwardStack[:len(backwardStack)-1]
		val := node.Val
		pushRight(node.Left)
		return val
	}

	// Initialize iterators
	pushLeft(root)
	pushRight(root)

	// Get initial values
	small := nextSmallest()
	large := nextLargest()

	closestPair := [2]int{small, large}
	closestDiff := math.MaxInt

	// Two pointer style iteration
	for small < large {
		sum := small + large
		diff := abs(sum - target)

		if diff < closestDiff {
			closestDiff = diff
			closestPair = [2]int{small, large}
		}

		if sum == target {
			return closestPair
		}

		if sum < target {
			if len(forwardStack) > 0 {
				small = nextSmallest()
			} else {
				break
			}
		} else {
			if len(backwardStack) > 0 {
				large = nextLargest()
			} else {
				break
			}
		}
	}

	return closestPair
}

// ============================================================================
// APPROACH 3: Brute Force with Optimization
// ============================================================================
// Time Complexity:  O(n^2) worst case, but often better due to pruning
// Space Complexity: O(h) for recursion
//
// WHEN TO USE:
// - Very small trees
// - When simplicity is preferred
// - As baseline for comparison
// ============================================================================

// TwoSumClosestBruteForce checks all pairs with pruning.
func TwoSumClosestBruteForce(root *TreeNode, target int) [2]int {
	// Collect all values
	var values []int
	var collect func(node *TreeNode)
	collect = func(node *TreeNode) {
		if node == nil {
			return
		}
		values = append(values, node.Val)
		collect(node.Left)
		collect(node.Right)
	}
	collect(root)

	closestPair := [2]int{values[0], values[1]}
	closestDiff := abs(values[0] + values[1] - target)

	// Check all pairs
	for i := 0; i < len(values); i++ {
		for j := i + 1; j < len(values); j++ {
			sum := values[i] + values[j]
			diff := abs(sum - target)

			if diff < closestDiff {
				closestDiff = diff
				closestPair = [2]int{values[i], values[j]}
			}

			// Early termination if exact match found
			if diff == 0 {
				return closestPair
			}
		}
	}

	return closestPair
}

// ============================================================================
// APPROACH 4: Find Exact Sum (Two Sum Variant)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) for hash set
//
// NOTE: This finds EXACT sum match, not closest
// Included for completeness as a related problem
// ============================================================================

// TwoSumExact finds two values that sum exactly to target (if exists).
func TwoSumExact(root *TreeNode, target int) (bool, [2]int) {
	seen := make(map[int]bool)

	var result [2]int
	found := false

	var traverse func(node *TreeNode)
	traverse = func(node *TreeNode) {
		if node == nil || found {
			return
		}

		complement := target - node.Val
		if seen[complement] {
			result = [2]int{complement, node.Val}
			found = true
			return
		}

		seen[node.Val] = true
		traverse(node.Left)
		traverse(node.Right)
	}

	traverse(root)
	return found, result
}

// ============================================================================
// HELPER: Build BST from array (for testing)
// ============================================================================

func buildBST(values []int) *TreeNode {
	if len(values) == 0 {
		return nil
	}

	root := &TreeNode{Val: values[0]}

	for i := 1; i < len(values); i++ {
		insertBST(root, values[i])
	}

	return root
}

func insertBST(root *TreeNode, val int) {
	current := root
	for {
		if val < current.Val {
			if current.Left == nil {
				current.Left = &TreeNode{Val: val}
				return
			}
			current = current.Left
		} else {
			if current.Right == nil {
				current.Right = &TreeNode{Val: val}
				return
			}
			current = current.Right
		}
	}
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("TWO SUM CLOSEST IN BST - TEST RESULTS")
	fmt.Println("======================================================================")

	// Test case 1: Standard BST
	//          10
	//         /  \
	//        5    15
	//       / \   / \
	//      2   7 12  20
	root1 := buildBST([]int{10, 5, 15, 2, 7, 12, 20})

	fmt.Println("\nTest 1: BST [10, 5, 15, 2, 7, 12, 20], target = 22")
	fmt.Println("Inorder sorted: [2, 5, 7, 10, 12, 15, 20]")
	fmt.Println("Expected pairs with sum=22: [2,20], [7,15], [10,12]")

	pair1 := TwoSumClosestInorder(root1, 22)
	fmt.Printf("  Inorder + Two Pointers: %v (sum=%d)\n", pair1, pair1[0]+pair1[1])

	pair2 := TwoSumClosestIterators(root1, 22)
	fmt.Printf("  BST Iterators:          %v (sum=%d)\n", pair2, pair2[0]+pair2[1])

	pair3 := TwoSumClosestBruteForce(root1, 22)
	fmt.Printf("  Brute Force:            %v (sum=%d)\n", pair3, pair3[0]+pair3[1])

	// Test case 2: Target not exactly achievable
	fmt.Println("\nTest 2: Same BST, target = 18")
	fmt.Println("Possible sums: 7+12=19, 5+12=17, 7+10=17, 8+10=18 (not in tree)")
	fmt.Println("Closest would be 7+12=19 or 5+12=17 (both diff=1)")

	pair4 := TwoSumClosestInorder(root1, 18)
	fmt.Printf("  Inorder + Two Pointers: %v (sum=%d, diff=%d)\n",
		pair4, pair4[0]+pair4[1], abs(pair4[0]+pair4[1]-18))

	pair5 := TwoSumClosestIterators(root1, 18)
	fmt.Printf("  BST Iterators:          %v (sum=%d, diff=%d)\n",
		pair5, pair5[0]+pair5[1], abs(pair5[0]+pair5[1]-18))

	// Test case 3: Small tree
	fmt.Println("\nTest 3: BST [5, 3, 7], target = 10")
	root3 := buildBST([]int{5, 3, 7})
	pair6 := TwoSumClosestInorder(root3, 10)
	fmt.Printf("  Result: %v (sum=%d)\n", pair6, pair6[0]+pair6[1])

	// Test case 4: Two nodes only
	fmt.Println("\nTest 4: BST [1, 3], target = 5")
	root4 := buildBST([]int{1, 3})
	pair7 := TwoSumClosestInorder(root4, 5)
	fmt.Printf("  Result: %v (sum=%d, diff=%d)\n", pair7, pair7[0]+pair7[1], abs(pair7[0]+pair7[1]-5))

	// Test exact sum
	fmt.Println("\n======================================================================")
	fmt.Println("BONUS: Two Sum Exact (find if exact sum exists)")
	fmt.Println("======================================================================")

	found, exactPair := TwoSumExact(root1, 22)
	if found {
		fmt.Printf("\nTarget 22: Found exact pair %v\n", exactPair)
	}

	found, exactPair = TwoSumExact(root1, 100)
	if !found {
		fmt.Println("Target 100: No exact pair found")
	}

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
	fmt.Println("======================================================================")
}
