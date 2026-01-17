/*
Remove Duplicates Keeping At Most K Occurrences - Go Solutions

Given a sorted linked list and k, keep at most k occurrences of each value.

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
// APPROACH 1: Single Pass with Counter - RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - single traversal
// Space Complexity: O(1) - only counters and pointers
//
// WHY THIS IS BEST:
// - Single pass through the list
// - Elegant counting logic
// - No extra data structures
// ============================================================================

// RemoveDuplicatesKeepK keeps at most k occurrences of each value.
//
// Key Insight: Track count for current value, reset when value changes.
//
// Visual for [1,1,1,2,2,3] with k=2:
//
//	1(#1) -> 1(#2) -> 1(#3) -> 2(#1) -> 2(#2) -> 3(#1)
//	 keep     keep     skip     keep     keep     keep
//
//	Result: 1 -> 1 -> 2 -> 2 -> 3
func RemoveDuplicatesKeepK(head *ListNode, k int) *ListNode {
	if head == nil || k == 0 {
		if k == 0 {
			return nil // k=0 means remove all
		}
		return nil
	}

	dummy := &ListNode{Next: head}
	prev := dummy

	// Track count of current value
	count := 0
	var currentVal *int

	for prev.Next != nil {
		node := prev.Next

		// Check if this is a new value
		if currentVal == nil || *currentVal != node.Val {
			count = 1
			currentVal = &node.Val
		} else {
			count++
		}

		// Decide whether to keep or skip
		if count <= k {
			prev = prev.Next // Keep node, move forward
		} else {
			prev.Next = node.Next // Skip node
		}
	}

	return dummy.Next
}

// ============================================================================
// APPROACH 2: Cleaner Implementation with Explicit State
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// This version is easier to understand for interviews.
// ============================================================================

// RemoveDuplicatesKeepKClear is a cleaner implementation.
func RemoveDuplicatesKeepKClear(head *ListNode, k int) *ListNode {
	if head == nil {
		return nil
	}
	if k == 0 {
		return nil
	}

	dummy := &ListNode{Next: head}
	prev := dummy
	current := head

	for current != nil {
		count := 1

		// Count consecutive duplicates
		for current.Next != nil && current.Val == current.Next.Val {
			count++
			current = current.Next
		}

		// Now current is the last node of this value group
		// We need to keep min(count, k) nodes

		// Start from the first node of this group
		node := prev.Next
		kept := 0
		for kept < k && kept < count {
			prev = node
			node = node.Next
			kept++
		}

		// Skip remaining nodes with this value
		prev.Next = current.Next
		current = current.Next
	}

	return dummy.Next
}

// ============================================================================
// APPROACH 3: Two Pointer Look-Ahead
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// Alternative approach looking k nodes ahead.
// ============================================================================

// RemoveDuplicatesKeepKLookAhead uses look-ahead technique.
func RemoveDuplicatesKeepKLookAhead(head *ListNode, k int) *ListNode {
	if head == nil || k == 0 {
		if k == 0 {
			return nil
		}
		return nil
	}

	dummy := &ListNode{Next: head}
	prev := dummy

	for prev.Next != nil {
		current := prev.Next

		// Look k nodes ahead
		ahead := current
		for i := 0; i < k && ahead != nil; i++ {
			ahead = ahead.Next
		}

		// If k-th node ahead has same value, we have > k duplicates
		// Skip current node
		if ahead != nil && ahead.Val == current.Val {
			prev.Next = current.Next
		} else {
			prev = prev.Next
		}
	}

	return dummy.Next
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

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

func listToSlice(head *ListNode) []int {
	var result []int
	for head != nil {
		result = append(result, head.Val)
		head = head.Next
	}
	return result
}

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

func slicesEqual(a, b []int) bool {
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
		{[]int{1, 1, 1, 2, 2, 3}, 2, []int{1, 1, 2, 2, 3}, "k=2, some over limit"},
		{[]int{1, 1, 1, 1, 2, 2, 2}, 1, []int{1, 2}, "k=1, unique only"},
		{[]int{1, 2, 3, 3, 3, 3, 4}, 3, []int{1, 2, 3, 3, 3, 4}, "k=3, one over limit"},
		{[]int{1, 1, 1}, 5, []int{1, 1, 1}, "k > count, keep all"},
		{[]int{1, 2, 3}, 2, []int{1, 2, 3}, "No duplicates"},
		{[]int{1}, 1, []int{1}, "Single node"},
		{[]int{}, 2, []int{}, "Empty list"},
		{[]int{1, 1, 2, 2, 3, 3}, 1, []int{1, 2, 3}, "All have duplicates, k=1"},
	}

	approaches := []struct {
		name string
		fn   func(*ListNode, int) *ListNode
	}{
		{"Counter-based (Recommended)", RemoveDuplicatesKeepK},
		{"Clear Implementation", RemoveDuplicatesKeepKClear},
		{"Look-Ahead", RemoveDuplicatesKeepKLookAhead},
	}

	fmt.Println("======================================================================")
	fmt.Println("REMOVE DUPLICATES KEEPING K - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			head := createList(tc.input)
			result := approach.fn(head, tc.k)
			resultSlice := listToSlice(result)

			passed := slicesEqual(resultSlice, tc.expected)
			status := "PASS"
			if !passed {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  [%s] %s (k=%d)\n", status, tc.desc, tc.k)
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

	demo := []int{1, 1, 1, 2, 2, 3}
	k := 2
	fmt.Printf("\nInput: k=%d\n", k)
	fmt.Print("List:  ")
	printList(createList(demo))

	result := RemoveDuplicatesKeepK(createList(demo), k)
	fmt.Print("Output: ")
	printList(result)
}
