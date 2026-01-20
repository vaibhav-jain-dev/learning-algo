/*
Remove Nodes With Greater Value on Right - Go Solutions

Given a linked list, remove all nodes that have a greater value anywhere to their right.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"math"
)

// ListNode represents a node in a singly linked list
type ListNode struct {
	Val  int
	Next *ListNode
}

// ============================================================================
// APPROACH 1: Reverse, Filter, Reverse - RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - three passes
// Space Complexity: O(1) - in-place modification
//
// WHY THIS IS BEST:
// - Constant extra space
// - Easy to understand: reverse makes "right" become "left"
// - After reverse, keep node if it's >= max seen so far
// ============================================================================

// RemoveNodesReverse removes nodes by reversing, filtering, and reversing back.
//
// Key Insight: After reversing, "greater on right" becomes "greater on left".
// We can then filter in a single pass, keeping running maximum.
//
// Visual:
//
//	Original: 5 -> 2 -> 13 -> 3 -> 8
//	Reverse:  8 -> 3 -> 13 -> 2 -> 5
//	Filter:   8 -> 13 (keep if val >= max_so_far)
//	Reverse:  13 -> 8
func RemoveNodesReverse(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return head
	}

	// Helper function to reverse list
	reverse := func(node *ListNode) *ListNode {
		var prev *ListNode
		current := node
		for current != nil {
			next := current.Next
			current.Next = prev
			prev = current
			current = next
		}
		return prev
	}

	// Step 1: Reverse the list
	head = reverse(head)

	// Step 2: Filter nodes - keep if value >= max seen so far
	maxVal := head.Val
	current := head

	for current.Next != nil {
		if current.Next.Val < maxVal {
			// Remove this node
			current.Next = current.Next.Next
		} else {
			// Keep this node, update max
			maxVal = current.Next.Val
			current = current.Next
		}
	}

	// Step 3: Reverse back
	return reverse(head)
}

// ============================================================================
// APPROACH 2: Recursion (Process Right First)
// ============================================================================
// Time Complexity:  O(n) - visit each node once
// Space Complexity: O(n) - recursion stack
//
// WHEN TO USE:
// - Clean recursive logic
// - List not too long (stack depth limit)
// ============================================================================

// RemoveNodesRecursive removes nodes using recursion, processing from right to left.
//
// Key Insight: Recursively process the rest first, then decide about current.
func RemoveNodesRecursive(head *ListNode) *ListNode {
	if head == nil {
		return nil
	}

	// Process the rest of the list first
	head.Next = RemoveNodesRecursive(head.Next)

	// If there's a greater value on the right, remove current
	if head.Next != nil && head.Val < head.Next.Val {
		return head.Next
	}

	return head
}

// ============================================================================
// APPROACH 3: Stack-Based
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) - stack storage
//
// WHEN TO USE:
// - Prefer iterative over recursive
// - Clear stack-based logic
// ============================================================================

// RemoveNodesStack removes nodes using a monotonic decreasing stack.
//
// Key Insight: Maintain a stack where values are non-increasing.
// When we see a larger value, pop smaller values from stack.
func RemoveNodesStack(head *ListNode) *ListNode {
	if head == nil {
		return nil
	}

	stack := []*ListNode{}
	current := head

	// Process all nodes
	for current != nil {
		// Pop nodes smaller than current (they have greater on right)
		for len(stack) > 0 && stack[len(stack)-1].Val < current.Val {
			stack = stack[:len(stack)-1]
		}

		stack = append(stack, current)
		current = current.Next
	}

	// Rebuild list from stack
	for i := 0; i < len(stack)-1; i++ {
		stack[i].Next = stack[i+1]
	}

	if len(stack) > 0 {
		stack[len(stack)-1].Next = nil
		return stack[0]
	}

	return nil
}

// ============================================================================
// APPROACH 4: Using Dummy Node
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n)
//
// WHEN TO USE:
// - Cleaner edge case handling with dummy node
// ============================================================================

// RemoveNodesDummy uses stack-based approach with dummy node for cleaner code.
func RemoveNodesDummy(head *ListNode) *ListNode {
	if head == nil {
		return nil
	}

	dummy := &ListNode{Val: math.MaxInt32} // Dummy with max value never removed
	dummy.Next = head
	stack := []*ListNode{dummy}

	current := head
	for current != nil {
		for stack[len(stack)-1].Val < current.Val {
			stack = stack[:len(stack)-1]
		}

		stack[len(stack)-1].Next = current
		stack = append(stack, current)
		current = current.Next
	}

	stack[len(stack)-1].Next = nil
	return dummy.Next
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// createList creates a linked list from a slice
func createList(vals []int) *ListNode {
	if len(vals) == 0 {
		return nil
	}

	head := &ListNode{Val: vals[0]}
	current := head

	for i := 1; i < len(vals); i++ {
		current.Next = &ListNode{Val: vals[i]}
		current = current.Next
	}

	return head
}

// listToSlice converts a linked list to a slice
func listToSlice(head *ListNode) []int {
	var result []int
	for head != nil {
		result = append(result, head.Val)
		head = head.Next
	}
	return result
}

// printList prints the linked list
func printList(head *ListNode) {
	if head == nil {
		fmt.Println("empty")
		return
	}

	for head != nil {
		fmt.Printf("%d", head.Val)
		if head.Next != nil {
			fmt.Print(" -> ")
		}
		head = head.Next
	}
	fmt.Println()
}

// sliceEqual checks if two slices are equal
func sliceEqual(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		input    []int
		expected []int
		desc     string
	}{
		{[]int{5, 2, 13, 3, 8}, []int{13, 8}, "Mixed values"},
		{[]int{1, 1, 1, 1}, []int{1, 1, 1, 1}, "All equal values"},
		{[]int{5, 4, 3, 2, 1}, []int{5, 4, 3, 2, 1}, "Strictly decreasing"},
		{[]int{1, 2, 3, 4, 5}, []int{5}, "Strictly increasing"},
		{[]int{1}, []int{1}, "Single node"},
		{[]int{2, 1}, []int{2, 1}, "Two nodes, decreasing"},
		{[]int{1, 2}, []int{2}, "Two nodes, increasing"},
		{[]int{}, []int{}, "Empty list"},
	}

	approaches := []struct {
		name string
		fn   func(*ListNode) *ListNode
	}{
		{"Reverse-Filter-Reverse (Recommended)", RemoveNodesReverse},
		{"Recursion", RemoveNodesRecursive},
		{"Stack-Based", RemoveNodesStack},
		{"Dummy Node", RemoveNodesDummy},
	}

	fmt.Println("======================================================================")
	fmt.Println("REMOVE NODES WITH GREATER VALUE ON RIGHT - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			// Create fresh list for each test
			head := createList(tc.input)
			result := approach.fn(head)
			resultSlice := listToSlice(result)

			// Handle nil slice comparison
			if resultSlice == nil {
				resultSlice = []int{}
			}

			passed := sliceEqual(resultSlice, tc.expected)
			status := "PASS"
			if !passed {
				status = "FAIL"
				allPassed = false
			}

			fmt.Printf("  [%s] %s\n", status, tc.desc)
			fmt.Printf("         Input:    %v\n", tc.input)
			fmt.Printf("         Expected: %v\n", tc.expected)
			fmt.Printf("         Got:      %v\n", resultSlice)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		}
	}

	// Visual demonstration
	fmt.Println("\n======================================================================")
	fmt.Println("VISUAL DEMONSTRATION")
	fmt.Println("======================================================================")

	demo := []int{5, 2, 13, 3, 8}
	fmt.Print("\nInput:  ")
	printList(createList(demo))

	result := RemoveNodesReverse(createList(demo))
	fmt.Print("Output: ")
	printList(result)

	fmt.Println("\nExplanation:")
	fmt.Println("  5 removed: 13 > 5 exists on right")
	fmt.Println("  2 removed: 13 > 2 exists on right")
	fmt.Println("  13 kept: no greater value on right")
	fmt.Println("  3 removed: 8 > 3 exists on right")
	fmt.Println("  8 kept: no nodes on right")
}
