/*
K Closest Values in BST - Go Solutions

Given a BST, target, and k, find k values closest to the target.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"container/heap"
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
// APPROACH 1: Inorder Traversal + Max Heap
// ============================================================================
// Time Complexity:  O(n log k) - traverse all nodes, heap ops are log k
// Space Complexity: O(k + h) - heap size k, recursion depth h
//
// WHY THIS WORKS:
// - Traverse entire BST
// - Maintain max heap of size k (by distance)
// - When heap full and current is closer, replace max
// ============================================================================

// MaxHeapItem stores value and its distance from target
type MaxHeapItem struct {
	distance float64
	value    int
}

// MaxHeap implements heap.Interface for max heap behavior
type MaxHeap []MaxHeapItem

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i].distance > h[j].distance } // Max heap
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *MaxHeap) Push(x any) {
	*h = append(*h, x.(MaxHeapItem))
}

func (h *MaxHeap) Pop() any {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[0 : n-1]
	return item
}

// KClosestValuesHeap finds k closest values using max heap approach.
func KClosestValuesHeap(root *TreeNode, target float64, k int) []int {
	h := &MaxHeap{}
	heap.Init(h)

	// Helper function for inorder traversal
	var inorder func(node *TreeNode)
	inorder = func(node *TreeNode) {
		if node == nil {
			return
		}

		inorder(node.Left)

		// Process current node
		dist := math.Abs(float64(node.Val) - target)

		if h.Len() < k {
			// Heap not full, add directly
			heap.Push(h, MaxHeapItem{distance: dist, value: node.Val})
		} else if dist < (*h)[0].distance {
			// Current is closer than the farthest in heap
			heap.Pop(h)
			heap.Push(h, MaxHeapItem{distance: dist, value: node.Val})
		}

		inorder(node.Right)
	}

	inorder(root)

	// Extract values from heap
	result := make([]int, 0, k)
	for h.Len() > 0 {
		result = append(result, heap.Pop(h).(MaxHeapItem).value)
	}

	return result
}

// ============================================================================
// APPROACH 2: Inorder + Two Pointers
// ============================================================================
// Time Complexity:  O(n + k) - inorder O(n), two pointers O(k)
// Space Complexity: O(n) - store all values in array
//
// WHY THIS WORKS:
// - Inorder traversal gives sorted array
// - Binary search finds starting point
// - Expand outward to find k closest
// ============================================================================

// KClosestValuesTwoPointers uses sorted array with two pointers.
func KClosestValuesTwoPointers(root *TreeNode, target float64, k int) []int {
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

	if len(values) == 0 {
		return []int{}
	}

	// Binary search to find starting position
	left := binarySearchClosest(values, target)
	right := left + 1
	result := make([]int, 0, k)

	// Expand outward from closest position
	for len(result) < k {
		if left < 0 {
			// Only right side available
			result = append(result, values[right])
			right++
		} else if right >= len(values) {
			// Only left side available
			result = append(result, values[left])
			left--
		} else {
			// Both sides available, pick closer one
			leftDist := math.Abs(target - float64(values[left]))
			rightDist := math.Abs(target - float64(values[right]))

			if leftDist <= rightDist {
				result = append(result, values[left])
				left--
			} else {
				result = append(result, values[right])
				right++
			}
		}
	}

	return result
}

// binarySearchClosest finds index of value closest to or just less than target
func binarySearchClosest(values []int, target float64) int {
	left, right := 0, len(values)-1

	for left < right {
		mid := left + (right-left+1)/2
		if float64(values[mid]) <= target {
			left = mid
		} else {
			right = mid - 1
		}
	}

	return left
}

// ============================================================================
// APPROACH 3: Optimized with Early Termination
// ============================================================================
// Time Complexity:  O(k + h) average case - can skip many nodes
// Space Complexity: O(h) - recursion stack
//
// WHY THIS IS OPTIMAL:
// - Uses BST property to navigate efficiently
// - Once we have k values and are moving away from target, we can stop
// - Best when k << n
// ============================================================================

// KClosestValuesOptimized uses smart traversal with early termination.
func KClosestValuesOptimized(root *TreeNode, target float64, k int) []int {
	result := make([]int, 0, k)

	// Use modified inorder that can terminate early
	var inorder func(node *TreeNode) bool
	inorder = func(node *TreeNode) bool {
		if node == nil {
			return false // Continue traversal
		}

		// Process left subtree
		if inorder(node.Left) {
			return true // Early termination triggered
		}

		// Process current node
		if len(result) < k {
			result = append(result, node.Val)
		} else {
			// Check if current is closer than first element (farthest in result)
			currDist := math.Abs(float64(node.Val) - target)
			firstDist := math.Abs(float64(result[0]) - target)

			if currDist < firstDist {
				// Slide the window: remove first, add current
				result = result[1:]
				result = append(result, node.Val)
			} else {
				// Current is farther, and since we're going in sorted order,
				// all future nodes will be even farther
				return true // Trigger early termination
			}
		}

		// Process right subtree
		return inorder(node.Right)
	}

	inorder(root)
	return result
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
	fmt.Println("K CLOSEST VALUES IN BST - TEST RESULTS")
	fmt.Println("======================================================================")

	// Test case 1: Standard case
	//       4
	//      / \
	//     2   5
	//    / \
	//   1   3
	root1 := buildBST([]int{4, 2, 5, 1, 3})
	target1 := 3.7
	k1 := 2

	fmt.Println("\nTest 1: Standard BST")
	fmt.Println("BST: [4, 2, 5, 1, 3], target = 3.7, k = 2")
	fmt.Println("Expected closest values: [3, 4]")
	fmt.Printf("Heap approach:         %v\n", KClosestValuesHeap(root1, target1, k1))
	fmt.Printf("Two pointers approach: %v\n", KClosestValuesTwoPointers(root1, target1, k1))
	fmt.Printf("Optimized approach:    %v\n", KClosestValuesOptimized(root1, target1, k1))

	// Test case 2: Single node
	root2 := &TreeNode{Val: 1}
	fmt.Println("\nTest 2: Single node")
	fmt.Println("BST: [1], target = 0.0, k = 1")
	fmt.Printf("Heap approach:         %v\n", KClosestValuesHeap(root2, 0.0, 1))
	fmt.Printf("Two pointers approach: %v\n", KClosestValuesTwoPointers(root2, 0.0, 1))
	fmt.Printf("Optimized approach:    %v\n", KClosestValuesOptimized(root2, 0.0, 1))

	// Test case 3: Larger BST
	//           8
	//         /   \
	//        4     12
	//       / \   /  \
	//      2   6 10  14
	root3 := buildBST([]int{8, 4, 12, 2, 6, 10, 14})
	target3 := 6.5
	k3 := 4

	fmt.Println("\nTest 3: Larger BST")
	fmt.Println("BST: [8, 4, 12, 2, 6, 10, 14], target = 6.5, k = 4")
	fmt.Printf("Heap approach:         %v\n", KClosestValuesHeap(root3, target3, k3))
	fmt.Printf("Two pointers approach: %v\n", KClosestValuesTwoPointers(root3, target3, k3))
	fmt.Printf("Optimized approach:    %v\n", KClosestValuesOptimized(root3, target3, k3))

	// Test case 4: Target equals a node value
	fmt.Println("\nTest 4: Target equals node value")
	fmt.Println("BST: [4, 2, 5, 1, 3], target = 3.0, k = 3")
	fmt.Printf("Heap approach:         %v\n", KClosestValuesHeap(root1, 3.0, 3))
	fmt.Printf("Two pointers approach: %v\n", KClosestValuesTwoPointers(root1, 3.0, 3))
	fmt.Printf("Optimized approach:    %v\n", KClosestValuesOptimized(root1, 3.0, 3))

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
	fmt.Println("======================================================================")
}
