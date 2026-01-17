/*
Remove Duplicates from Unsorted Linked List - Go Solutions

Given an unsorted linked list, remove all duplicates keeping first occurrence.

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
// APPROACH 1: Hash Set (Single Pass) - RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - single traversal
// Space Complexity: O(n) - hash set for unique values
//
// WHY THIS IS BEST:
// - O(1) lookup to check if value seen before
// - Single pass through the list
// - Clean and intuitive implementation
// ============================================================================

// RemoveDuplicatesHashSet removes duplicates using a hash set.
//
// Key Insight: Track seen values in a set, skip nodes with repeated values.
//
// Visual:
//
//	Input:  3 -> 2 -> 2 -> 1 -> 3 -> 4
//	                  ^       ^
//	              duplicate  duplicate
//
//	Output: 3 -> 2 -> 1 -> 4
func RemoveDuplicatesHashSet(head *ListNode) *ListNode {
	if head == nil {
		return nil
	}

	// Use map as a set (value -> exists)
	seen := make(map[int]bool)
	seen[head.Val] = true

	current := head

	for current.Next != nil {
		if seen[current.Next.Val] {
			// Skip the duplicate node
			current.Next = current.Next.Next
		} else {
			// New value, add to set and move forward
			seen[current.Next.Val] = true
			current = current.Next
		}
	}

	return head
}

// ============================================================================
// APPROACH 2: Two Pointers (No Extra Space)
// ============================================================================
// Time Complexity:  O(n^2) - for each node, scan remaining list
// Space Complexity: O(1) - no extra data structures
//
// WHEN TO USE:
// - Memory is extremely constrained
// - List is small enough that O(n^2) is acceptable
// ============================================================================

// RemoveDuplicatesTwoPointers removes duplicates without extra space.
//
// For each node, scan ahead and remove all nodes with same value.
//
// Visual:
//
//	For node with value 2:
//	3 -> [2] -> 2 -> 1 -> 3 -> 2 -> 4
//	      ^     ^              ^
//	    outer  runner scans and removes these
func RemoveDuplicatesTwoPointers(head *ListNode) *ListNode {
	if head == nil {
		return nil
	}

	current := head

	// For each node, remove all future duplicates
	for current != nil {
		runner := current

		// Scan ahead and remove duplicates of current value
		for runner.Next != nil {
			if runner.Next.Val == current.Val {
				// Remove duplicate
				runner.Next = runner.Next.Next
			} else {
				runner = runner.Next
			}
		}

		current = current.Next
	}

	return head
}

// ============================================================================
// APPROACH 3: Using Dummy Node (Clean Edge Case Handling)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n)
//
// WHEN TO USE:
// - Cleaner handling of edge cases
// - More uniform code structure
// ============================================================================

// RemoveDuplicatesWithDummy uses a dummy node for cleaner code.
func RemoveDuplicatesWithDummy(head *ListNode) *ListNode {
	if head == nil {
		return nil
	}

	// Dummy node simplifies edge cases
	dummy := &ListNode{Next: head}
	seen := make(map[int]bool)

	prev := dummy
	current := head

	for current != nil {
		if seen[current.Val] {
			// Skip this node
			prev.Next = current.Next
		} else {
			// Keep this node
			seen[current.Val] = true
			prev = current
		}
		current = current.Next
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

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		input    []int
		expected []int
		desc     string
	}{
		{[]int{3, 2, 2, 1, 3, 2, 4}, []int{3, 2, 1, 4}, "Multiple duplicates"},
		{[]int{1, 1, 1, 1}, []int{1}, "All same values"},
		{[]int{5, 4, 3, 2, 1}, []int{5, 4, 3, 2, 1}, "No duplicates"},
		{[]int{1, 2, 1, 2, 1, 2}, []int{1, 2}, "Alternating duplicates"},
		{[]int{1}, []int{1}, "Single node"},
		{[]int{}, []int{}, "Empty list"},
	}

	approaches := []struct {
		name string
		fn   func(*ListNode) *ListNode
	}{
		{"Hash Set (Recommended)", RemoveDuplicatesHashSet},
		{"Two Pointers", RemoveDuplicatesTwoPointers},
		{"Dummy Node", RemoveDuplicatesWithDummy},
	}

	fmt.Println("======================================================================")
	fmt.Println("REMOVE DUPLICATES FROM UNSORTED LIST - TEST RESULTS")
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

			// Compare results
			passed := len(resultSlice) == len(tc.expected)
			if passed {
				for i := range resultSlice {
					if resultSlice[i] != tc.expected[i] {
						passed = false
						break
					}
				}
			}

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

	demo := []int{3, 2, 2, 1, 3, 2, 4}
	fmt.Print("\nInput:  ")
	printList(createList(demo))

	result := RemoveDuplicatesHashSet(createList(demo))
	fmt.Print("Output: ")
	printList(result)
}
