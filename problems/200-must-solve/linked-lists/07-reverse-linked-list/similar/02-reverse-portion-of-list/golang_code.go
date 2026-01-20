/*
Reverse Linked List II (Reverse Portion) - Go Solutions

Reverse nodes from position left to right in a linked list.

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
// APPROACH 1: One-Pass with Insert at Front - RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - single pass
// Space Complexity: O(1) - constant extra space
//
// WHY THIS IS BEST:
// - Single pass, no need to find boundaries first
// - Clean in-place modification
// - Easy to understand once you see the pattern
// ============================================================================

// ReverseBetweenInsert reverses portion using "insert at front" technique.
//
// Key Insight: Instead of traditional reversal, repeatedly move
// the node after 'start' to right after 'prev'.
//
// Visual (left=2, right=4):
//
//	Start: 1 -> [2] -> 3 -> 4 -> 5
//	            start
//	Step 1: Move 3 after 1: 1 -> [3] -> 2 -> 4 -> 5
//	Step 2: Move 4 after 1: 1 -> [4] -> 3 -> 2 -> 5
//	Done! Reversed 2,3,4 -> 4,3,2
func ReverseBetweenInsert(head *ListNode, left int, right int) *ListNode {
	if head == nil || left == right {
		return head
	}

	// Dummy node handles edge case when left = 1
	dummy := &ListNode{Next: head}
	prev := dummy

	// Move prev to node before position left
	for i := 0; i < left-1; i++ {
		prev = prev.Next
	}

	// 'start' is the first node to reverse (will end up last in reversed portion)
	start := prev.Next

	// Perform (right - left) insertions
	for i := 0; i < right-left; i++ {
		// Node to move is start.Next
		then := start.Next

		// Remove 'then' from its current position
		start.Next = then.Next

		// Insert 'then' right after prev
		then.Next = prev.Next
		prev.Next = then
	}

	return dummy.Next
}

// ============================================================================
// APPROACH 2: Standard Reversal with Boundaries
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// WHEN TO USE:
// - When you prefer traditional reverse logic
// - More explicit boundary handling
// ============================================================================

// ReverseBetweenStandard reverses portion using standard reversal technique.
//
// Steps:
// 1. Find the node before 'left' (connection point)
// 2. Standard reversal for (right - left + 1) nodes
// 3. Reconnect the reversed portion
func ReverseBetweenStandard(head *ListNode, left int, right int) *ListNode {
	if head == nil || left == right {
		return head
	}

	dummy := &ListNode{Next: head}

	// Step 1: Find connection point (node before left)
	prevLeft := dummy
	for i := 0; i < left-1; i++ {
		prevLeft = prevLeft.Next
	}

	// Step 2: Standard reversal
	// 'first' will become the last node after reversal
	first := prevLeft.Next
	var prev *ListNode
	curr := first

	for i := 0; i < right-left+1; i++ {
		nextNode := curr.Next
		curr.Next = prev
		prev = curr
		curr = nextNode
	}

	// Step 3: Reconnect
	// prev is now the new head of reversed portion
	// curr is the node after 'right'
	prevLeft.Next = prev // Connect before to new head
	first.Next = curr    // Connect old first (now last) to rest

	return dummy.Next
}

// ============================================================================
// APPROACH 3: Recursive
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) - recursion stack
//
// WHEN TO USE:
// - Educational purposes
// - When recursive thinking is preferred
// ============================================================================

// ReverseBetweenRecursive reverses portion using recursion.
//
// Recursively reach position 'left', then reverse until 'right'.
func ReverseBetweenRecursive(head *ListNode, left int, right int) *ListNode {
	if head == nil || left == right {
		return head
	}

	var successor *ListNode

	// reverseN reverses first n nodes of the list
	var reverseN func(node *ListNode, n int) *ListNode
	reverseN = func(node *ListNode, n int) *ListNode {
		if n == 1 {
			successor = node.Next
			return node
		}

		last := reverseN(node.Next, n-1)
		node.Next.Next = node
		node.Next = successor
		return last
	}

	if left == 1 {
		return reverseN(head, right)
	}

	// Recursively reach position left
	head.Next = ReverseBetweenRecursive(head.Next, left-1, right-1)
	return head
}

// ============================================================================
// APPROACH 4: Two-Pointer Explicit
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// WHEN TO USE:
// - Most explicit about what's happening
// ============================================================================

// ReverseBetweenExplicit uses two-pointer approach with explicit position tracking.
func ReverseBetweenExplicit(head *ListNode, left int, right int) *ListNode {
	if head == nil || left == right {
		return head
	}

	dummy := &ListNode{Next: head}
	curr := dummy
	position := 0

	// Move to position before left
	for position < left-1 {
		curr = curr.Next
		position++
	}

	// Now curr is at position left-1
	beforeReverse := curr
	startReverse := curr.Next

	// Reverse nodes
	curr = startReverse
	var prev *ListNode

	for position < right {
		nextNode := curr.Next
		curr.Next = prev
		prev = curr
		curr = nextNode
		position++
	}

	// Reconnect
	beforeReverse.Next = prev
	startReverse.Next = curr

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
		left     int
		right    int
		expected []int
		desc     string
	}{
		{[]int{1, 2, 3, 4, 5}, 2, 4, []int{1, 4, 3, 2, 5}, "Middle portion"},
		{[]int{5}, 1, 1, []int{5}, "Single node"},
		{[]int{1, 2, 3, 4, 5}, 1, 5, []int{5, 4, 3, 2, 1}, "Entire list"},
		{[]int{1, 2, 3, 4, 5}, 1, 2, []int{2, 1, 3, 4, 5}, "First two nodes"},
		{[]int{1, 2, 3, 4, 5}, 4, 5, []int{1, 2, 3, 5, 4}, "Last two nodes"},
		{[]int{1, 2, 3, 4, 5}, 3, 4, []int{1, 2, 4, 3, 5}, "Two middle nodes"},
		{[]int{1, 2}, 1, 2, []int{2, 1}, "Two nodes"},
	}

	approaches := []struct {
		name string
		fn   func(*ListNode, int, int) *ListNode
	}{
		{"Insert at Front (Recommended)", ReverseBetweenInsert},
		{"Standard Reversal", ReverseBetweenStandard},
		{"Recursive", ReverseBetweenRecursive},
		{"Explicit Two-Pointer", ReverseBetweenExplicit},
	}

	fmt.Println("======================================================================")
	fmt.Println("REVERSE LINKED LIST II (PORTION) - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			// Create fresh list for each test
			head := createList(tc.input)
			result := approach.fn(head, tc.left, tc.right)
			resultSlice := listToSlice(result)

			passed := sliceEqual(resultSlice, tc.expected)
			status := "PASS"
			if !passed {
				status = "FAIL"
				allPassed = false
			}

			fmt.Printf("  [%s] %s\n", status, tc.desc)
			fmt.Printf("         Input:    %v, left=%d, right=%d\n", tc.input, tc.left, tc.right)
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

	demo := []int{1, 2, 3, 4, 5}
	left, right := 2, 4
	fmt.Print("\nInput: ")
	printList(createList(demo))
	fmt.Printf("left = %d, right = %d\n", left, right)
	fmt.Printf("Reverse positions %d to %d: %v\n", left, right, demo[left-1:right])

	result := ReverseBetweenInsert(createList(demo), left, right)
	fmt.Print("Output: ")
	printList(result)
}
