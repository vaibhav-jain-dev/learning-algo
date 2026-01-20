/*
Delete the Middle Node of a Linked List - Go Solutions

Given a linked list, delete the middle node and return the modified list.

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
// APPROACH 1: Fast and Slow Pointers - RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - single pass
// Space Complexity: O(1) - constant extra space
//
// WHY THIS IS BEST:
// - Single traversal finds the middle
// - Slow pointer ends up at node BEFORE middle (using dummy)
// - Clean and efficient
// ============================================================================

// DeleteMiddleFastSlow deletes middle node using fast and slow pointers.
//
// Key Insight: Use a dummy node so slow stops at node BEFORE middle.
// - Fast moves 2 steps, slow moves 1 step
// - When fast reaches end, slow is at the node before middle
//
// Visual (7 nodes):
//
//	D -> 1 -> 3 -> 4 -> 7 -> 1 -> 2 -> 6
//	               ^slow          ^fast
//	Delete slow.next (the middle node 7)
func DeleteMiddleFastSlow(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return nil
	}

	// Dummy node helps slow stop at node BEFORE middle
	dummy := &ListNode{Next: head}
	slow := dummy
	fast := head

	// Move fast 2x speed of slow
	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
	}

	// slow is now at node before middle, delete middle
	slow.Next = slow.Next.Next

	return dummy.Next
}

// ============================================================================
// APPROACH 2: Count Length First
// ============================================================================
// Time Complexity:  O(n) - two passes
// Space Complexity: O(1) - constant extra space
//
// WHEN TO USE:
// - When you need the length for other operations
// - More explicit about what's happening
// ============================================================================

// DeleteMiddleCount deletes middle node by counting length first.
//
// Two passes:
// 1. Count total nodes
// 2. Traverse to middle-1, delete middle
func DeleteMiddleCount(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return nil
	}

	// Pass 1: Count length
	length := 0
	current := head
	for current != nil {
		length++
		current = current.Next
	}

	// Pass 2: Traverse to node before middle
	middleIndex := length / 2
	current = head

	for i := 0; i < middleIndex-1; i++ {
		current = current.Next
	}

	// Delete middle node
	current.Next = current.Next.Next

	return head
}

// ============================================================================
// APPROACH 3: Fast Slow with Prev Pointer
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// WHEN TO USE:
// - Alternative without dummy node
// - Track previous node explicitly
// ============================================================================

// DeleteMiddleWithPrev deletes middle using fast/slow with explicit prev pointer.
//
// Track prev separately instead of using dummy node.
func DeleteMiddleWithPrev(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return nil
	}

	slow := head
	fast := head
	var prev *ListNode

	for fast != nil && fast.Next != nil {
		prev = slow
		slow = slow.Next
		fast = fast.Next.Next
	}

	// slow is now at middle, prev is before it
	if prev != nil {
		prev.Next = slow.Next
	} else {
		// Edge case: middle is head (shouldn't happen with n >= 2)
		return slow.Next
	}

	return head
}

// ============================================================================
// APPROACH 4: Recursive
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) - recursion stack
//
// WHEN TO USE:
// - Educational purposes
// - When recursion is preferred
// ============================================================================

// DeleteMiddleRecursive deletes middle using recursion.
//
// Use two recursive traversals to find length and delete.
func DeleteMiddleRecursive(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return nil
	}

	// First, find length
	var getLength func(node *ListNode) int
	getLength = func(node *ListNode) int {
		if node == nil {
			return 0
		}
		return 1 + getLength(node.Next)
	}

	length := getLength(head)
	middle := length / 2

	// Then, delete at middle
	var deleteAt func(node *ListNode, index int) *ListNode
	deleteAt = func(node *ListNode, index int) *ListNode {
		if index == middle-1 {
			node.Next = node.Next.Next
			return node
		}
		deleteAt(node.Next, index+1)
		return node
	}

	return deleteAt(head, 0)
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
		expected []int
		desc     string
	}{
		{[]int{1, 3, 4, 7, 1, 2, 6}, []int{1, 3, 4, 1, 2, 6}, "7 nodes, delete index 3"},
		{[]int{1, 2, 3, 4}, []int{1, 2, 4}, "4 nodes, delete index 2"},
		{[]int{2, 1}, []int{2}, "2 nodes, delete index 1"},
		{[]int{1}, []int{}, "1 node, delete it"},
		{[]int{1, 2, 3, 4, 5}, []int{1, 2, 4, 5}, "5 nodes, delete index 2"},
		{[]int{1, 2, 3}, []int{1, 3}, "3 nodes, delete index 1"},
	}

	approaches := []struct {
		name string
		fn   func(*ListNode) *ListNode
	}{
		{"Fast/Slow Pointers (Recommended)", DeleteMiddleFastSlow},
		{"Count Length First", DeleteMiddleCount},
		{"With Prev Pointer", DeleteMiddleWithPrev},
		{"Recursive", DeleteMiddleRecursive},
	}

	fmt.Println("======================================================================")
	fmt.Println("DELETE MIDDLE NODE - TEST RESULTS")
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

	demo := []int{1, 3, 4, 7, 1, 2, 6}
	fmt.Printf("\nInput (%d nodes): ", len(demo))
	printList(createList(demo))
	fmt.Printf("Middle index: %d (value 7)\n", len(demo)/2)

	result := DeleteMiddleFastSlow(createList(demo))
	fmt.Print("Output: ")
	printList(result)

	fmt.Println("\n--- Even length example ---")
	demo2 := []int{1, 2, 3, 4}
	fmt.Printf("\nInput (%d nodes): ", len(demo2))
	printList(createList(demo2))
	fmt.Printf("Middle index: %d (value 3)\n", len(demo2)/2)

	result2 := DeleteMiddleFastSlow(createList(demo2))
	fmt.Print("Output: ")
	printList(result2)
}
