/*
Remove All Nodes with Duplicate Values - Go Solutions

Given a sorted linked list, delete ALL nodes that have duplicate values.
Keep only distinct values from the original list.

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
// APPROACH 1: Dummy Node with Skip Pattern - RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - single pass
// Space Complexity: O(1) - only pointers
//
// WHY THIS IS BEST:
// - Handles head deletion cleanly with dummy node
// - Single pass through the list
// - Constant extra space
// ============================================================================

// DeleteAllDuplicates removes ALL nodes with duplicate values.
//
// Key Insight: When we find duplicates, skip ALL nodes with that value.
//
// Visual:
//
//	Input:  1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5
//	                  ^^^^^^    ^^^^^^
//	                  skip all  skip all
//
//	Output: 1 -> 2 -> 5
func DeleteAllDuplicates(head *ListNode) *ListNode {
	if head == nil {
		return nil
	}

	// Dummy node handles case where head needs to be deleted
	dummy := &ListNode{Next: head}
	prev := dummy

	for prev.Next != nil {
		current := prev.Next

		// Check if current starts a duplicate sequence
		if current.Next != nil && current.Val == current.Next.Val {
			// Skip ALL nodes with this value
			dupVal := current.Val
			for prev.Next != nil && prev.Next.Val == dupVal {
				prev.Next = prev.Next.Next
			}
		} else {
			// No duplicate, move prev forward
			prev = prev.Next
		}
	}

	return dummy.Next
}

// ============================================================================
// APPROACH 2: Two Pass (Count then Remove)
// ============================================================================
// Time Complexity:  O(n) - two passes
// Space Complexity: O(n) - map to store counts
//
// WHEN TO USE:
// - When logic clarity is more important
// - When you want to easily debug/verify counts
// ============================================================================

// DeleteAllDuplicatesTwoPass uses counting first, then removal.
func DeleteAllDuplicatesTwoPass(head *ListNode) *ListNode {
	if head == nil {
		return nil
	}

	// First pass: count occurrences
	counts := make(map[int]int)
	current := head
	for current != nil {
		counts[current.Val]++
		current = current.Next
	}

	// Second pass: remove nodes with count > 1
	dummy := &ListNode{Next: head}
	prev := dummy

	for prev.Next != nil {
		if counts[prev.Next.Val] > 1 {
			// Skip this node
			prev.Next = prev.Next.Next
		} else {
			prev = prev.Next
		}
	}

	return dummy.Next
}

// ============================================================================
// APPROACH 3: Recursive Solution
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) - recursion stack
//
// WHEN TO USE:
// - When recursive thinking is preferred
// - For educational purposes
// ============================================================================

// DeleteAllDuplicatesRecursive solves the problem recursively.
func DeleteAllDuplicatesRecursive(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return head
	}

	// Check if head is part of a duplicate sequence
	if head.Val == head.Next.Val {
		// Skip all nodes with this value
		dupVal := head.Val
		current := head
		for current != nil && current.Val == dupVal {
			current = current.Next
		}
		// Recursively process the rest
		return DeleteAllDuplicatesRecursive(current)
	}

	// Head is unique, keep it and process rest
	head.Next = DeleteAllDuplicatesRecursive(head.Next)
	return head
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

// slicesEqual compares two slices for equality
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
		expected []int
		desc     string
	}{
		{[]int{1, 2, 3, 3, 4, 4, 5}, []int{1, 2, 5}, "Multiple duplicate groups"},
		{[]int{1, 1, 1, 2, 3}, []int{2, 3}, "Duplicates at head"},
		{[]int{1, 1, 2, 2}, []int{}, "All duplicates"},
		{[]int{1, 2, 3, 4, 5}, []int{1, 2, 3, 4, 5}, "No duplicates"},
		{[]int{1, 1}, []int{}, "Only duplicates"},
		{[]int{1}, []int{1}, "Single node"},
		{[]int{}, []int{}, "Empty list"},
		{[]int{1, 2, 2, 3, 3, 4, 5, 5}, []int{1, 4}, "Alternating duplicates"},
	}

	approaches := []struct {
		name string
		fn   func(*ListNode) *ListNode
	}{
		{"Dummy + Skip (Recommended)", DeleteAllDuplicates},
		{"Two Pass", DeleteAllDuplicatesTwoPass},
		{"Recursive", DeleteAllDuplicatesRecursive},
	}

	fmt.Println("======================================================================")
	fmt.Println("REMOVE ALL DUPLICATE NODES - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			head := createList(tc.input)
			result := approach.fn(head)
			resultSlice := listToSlice(result)

			passed := slicesEqual(resultSlice, tc.expected)
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

	demo := []int{1, 2, 3, 3, 4, 4, 5}
	fmt.Print("\nInput:  ")
	printList(createList(demo))

	result := DeleteAllDuplicates(createList(demo))
	fmt.Print("Output: ")
	printList(result)

	fmt.Println("\nNote: Both 3 and 4 appeared multiple times, so ALL their occurrences")
	fmt.Println("      were removed, not just the extras!")
}
