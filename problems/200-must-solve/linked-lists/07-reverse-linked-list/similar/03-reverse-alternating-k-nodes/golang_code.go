/*
Reverse Alternating K Nodes - Go Solutions

Reverse k nodes, skip k nodes, reverse k nodes, and so on.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ListNode represents a node in a singly linked list
type ListNode struct {
	Val  int
	Next *ListNode
}

// ============================================================================
// APPROACH 1: Iterative with Toggle - RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - single pass
// Space Complexity: O(1) - constant extra space
//
// WHY THIS IS BEST:
// - Single pass through the list
// - Constant space
// - Clear alternating logic with boolean toggle
// ============================================================================

// ReverseAlternatingIterative reverses alternating k nodes using iterative approach.
//
// Key Insight: Use a boolean flag to toggle between reverse and skip modes.
// Process k nodes at a time, alternating the operation.
//
// Visual (k=2):
//
//	[1,2] reverse -> [2,1]
//	[3,4] skip    -> [3,4]
//	[5,6] reverse -> [6,5]
//	[7,8] skip    -> [7,8]
//	Result: 2->1->3->4->6->5->7->8
func ReverseAlternatingIterative(head *ListNode, k int) *ListNode {
	if head == nil || k == 1 {
		return head
	}

	dummy := &ListNode{Next: head}
	prevTail := dummy     // Tail of previously processed segment
	shouldReverse := true // Start with reverse

	for prevTail.Next != nil {
		if shouldReverse {
			// Reverse up to k nodes
			prevTail = reverseKNodes(prevTail, k)
		} else {
			// Skip up to k nodes
			prevTail = skipKNodes(prevTail, k)
		}

		shouldReverse = !shouldReverse
	}

	return dummy.Next
}

// reverseKNodes reverses up to k nodes starting after prevTail.
// Returns the new tail of the reversed segment.
func reverseKNodes(prevTail *ListNode, k int) *ListNode {
	// Check if there are nodes to reverse
	if prevTail.Next == nil {
		return prevTail
	}

	// First node will become the tail after reversal
	first := prevTail.Next
	var prev *ListNode
	curr := first
	count := 0

	// Reverse k nodes (or until end)
	for curr != nil && count < k {
		nextNode := curr.Next
		curr.Next = prev
		prev = curr
		curr = nextNode
		count++
	}

	// Connect: prevTail -> new_head (prev), first (new tail) -> curr (rest)
	prevTail.Next = prev
	first.Next = curr

	return first // Return new tail
}

// skipKNodes skips up to k nodes starting after prevTail.
// Returns the last node in the skipped segment.
func skipKNodes(prevTail *ListNode, k int) *ListNode {
	curr := prevTail
	count := 0

	for curr.Next != nil && count < k {
		curr = curr.Next
		count++
	}

	return curr
}

// ============================================================================
// APPROACH 2: Recursive
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n/k) - recursion depth
//
// WHEN TO USE:
// - When recursive logic feels more natural
// ============================================================================

// ReverseAlternatingRecursive reverses alternating k nodes using recursion.
//
// Process one cycle (reverse k, skip k), then recurse on rest.
func ReverseAlternatingRecursive(head *ListNode, k int) *ListNode {
	if head == nil || k == 1 {
		return head
	}

	// Step 1: Reverse first k nodes
	var prev *ListNode
	curr := head
	count := 0

	for curr != nil && count < k {
		nextNode := curr.Next
		curr.Next = prev
		prev = curr
		curr = nextNode
		count++
	}

	// 'head' is now the tail of reversed portion
	// 'prev' is the new head
	// 'curr' points to (k+1)th node

	// Step 2: Skip k nodes
	if head != nil { // Connect reversed tail to skip segment
		head.Next = curr
	}

	skipCount := 0
	tail := head // Start from reversed tail

	for curr != nil && skipCount < k {
		tail = curr
		curr = curr.Next
		skipCount++
	}

	// Step 3: Recurse on remaining
	if tail != nil {
		tail.Next = ReverseAlternatingRecursive(curr, k)
	}

	return prev
}

// ============================================================================
// APPROACH 3: Using Helper for Reversal
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// WHEN TO USE:
// - When you want modular, reusable code
// ============================================================================

// ReverseAlternatingModular reverses alternating k nodes with modular helper functions.
func ReverseAlternatingModular(head *ListNode, k int) *ListNode {
	if head == nil || k == 1 {
		return head
	}

	// reverseSegment reverses 'count' nodes starting from 'start'.
	// Returns (newHead, newTail, nextStart).
	reverseSegment := func(start *ListNode, count int) (*ListNode, *ListNode, *ListNode) {
		var prev *ListNode
		curr := start
		actualCount := 0

		for curr != nil && actualCount < count {
			nextNode := curr.Next
			curr.Next = prev
			prev = curr
			curr = nextNode
			actualCount++
		}

		// start is now tail, prev is head, curr is next segment
		return prev, start, curr
	}

	// skipSegment skips 'count' nodes starting from 'start'.
	// Returns (segmentHead, segmentTail, nextStart).
	skipSegment := func(start *ListNode, count int) (*ListNode, *ListNode, *ListNode) {
		curr := start
		actualCount := 1

		for curr.Next != nil && actualCount < count {
			curr = curr.Next
			actualCount++
		}

		var nextStart *ListNode
		if curr != nil {
			nextStart = curr.Next
		}
		return start, curr, nextStart
	}

	dummy := &ListNode{Next: head}
	prevEnd := dummy
	curr := head
	reverseMode := true

	for curr != nil {
		if reverseMode {
			newHead, newTail, nextStart := reverseSegment(curr, k)
			prevEnd.Next = newHead
			newTail.Next = nextStart
			prevEnd = newTail
			curr = nextStart
		} else {
			_, segTail, nextStart := skipSegment(curr, k)
			prevEnd = segTail
			curr = nextStart
		}

		reverseMode = !reverseMode
	}

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
		fmt.Println("(empty)")
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
		k        int
		expected []int
		desc     string
	}{
		{[]int{1, 2, 3, 4, 5, 6, 7, 8}, 2, []int{2, 1, 3, 4, 6, 5, 7, 8}, "k=2, 8 nodes"},
		{[]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, 3, []int{3, 2, 1, 4, 5, 6, 9, 8, 7, 10}, "k=3, 10 nodes"},
		{[]int{1, 2, 3, 4, 5}, 3, []int{3, 2, 1, 4, 5}, "k=3, partial skip"},
		{[]int{1, 2, 3, 4, 5}, 2, []int{2, 1, 3, 4, 5}, "k=2, 5 nodes"},
		{[]int{1, 2, 3, 4}, 2, []int{2, 1, 3, 4}, "k=2, exact groups"},
		{[]int{1}, 1, []int{1}, "Single node, k=1"},
		{[]int{1, 2}, 1, []int{1, 2}, "k=1, no change"},
		{[]int{1, 2, 3}, 2, []int{2, 1, 3}, "k=2, partial"},
	}

	approaches := []struct {
		name string
		fn   func(*ListNode, int) *ListNode
	}{
		{"Iterative Toggle (Recommended)", ReverseAlternatingIterative},
		{"Recursive", ReverseAlternatingRecursive},
		{"Modular Helpers", ReverseAlternatingModular},
	}

	fmt.Println("======================================================================")
	fmt.Println("REVERSE ALTERNATING K NODES - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			// Create fresh list for each test
			head := createList(tc.input)
			result := approach.fn(head, tc.k)
			resultSlice := listToSlice(result)

			passed := sliceEqual(resultSlice, tc.expected)
			status := "PASS"
			if !passed {
				status = "FAIL"
				allPassed = false
			}

			fmt.Printf("  [%s] %s\n", status, tc.desc)
			fmt.Printf("         Input:    %v, k=%d\n", tc.input, tc.k)
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

	demo := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	k := 3
	fmt.Print("\nInput: ")
	printList(createList(demo))
	fmt.Printf("k = %d\n", k)
	fmt.Println("Operations:")
	fmt.Println("  Reverse: [1,2,3] -> [3,2,1]")
	fmt.Println("  Skip:    [4,5,6] -> [4,5,6]")
	fmt.Println("  Reverse: [7,8,9] -> [9,8,7]")
	fmt.Println("  Skip:    [10] -> [10]")

	result := ReverseAlternatingIterative(createList(demo), k)
	fmt.Print("Output: ")
	printList(result)
}
