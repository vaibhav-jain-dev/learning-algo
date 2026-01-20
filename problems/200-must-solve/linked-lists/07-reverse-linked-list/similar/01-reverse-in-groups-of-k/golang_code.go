/*
Reverse Linked List in Groups of K - Go Solutions

Reverse nodes in k-sized groups, leaving incomplete groups unchanged.

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
// APPROACH 1: Iterative with Dummy Node - RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - each node visited twice (count + reverse)
// Space Complexity: O(1) - constant extra space
//
// WHY THIS IS BEST:
// - Constant space
// - Clear group management with dummy node
// - Easy to understand control flow
// ============================================================================

// ReverseKGroupIterative reverses in groups of k using iterative approach.
//
// Key Insight: For each group:
// 1. Check if k nodes exist
// 2. Reverse k nodes
// 3. Connect previous group's tail to new head
// 4. Move to next group
func ReverseKGroupIterative(head *ListNode, k int) *ListNode {
	if head == nil || k == 1 {
		return head
	}

	// Dummy node simplifies edge cases
	dummy := &ListNode{Next: head}
	groupPrev := dummy // Node before current group

	for {
		// Check if k nodes exist
		kth := getKth(groupPrev, k)
		if kth == nil {
			break
		}

		groupNext := kth.Next // Node after current group

		// Reverse the group
		prev, curr := kth.Next, groupPrev.Next
		for curr != groupNext {
			nextNode := curr.Next
			curr.Next = prev
			prev = curr
			curr = nextNode
		}

		// Connect previous group to reversed group
		tmp := groupPrev.Next // This becomes tail after reversal
		groupPrev.Next = kth  // kth is the new head
		groupPrev = tmp       // Move to end of reversed group
	}

	return dummy.Next
}

// getKth returns the k-th node from curr (1-indexed from curr).
func getKth(curr *ListNode, k int) *ListNode {
	for curr != nil && k > 0 {
		curr = curr.Next
		k--
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
// - When recursive logic is clearer
// - When stack space is not a concern
// ============================================================================

// ReverseKGroupRecursive reverses in groups of k using recursion.
//
// Base case: less than k nodes remain, return head unchanged.
// Recursive case: reverse k nodes, connect to recursively processed rest.
func ReverseKGroupRecursive(head *ListNode, k int) *ListNode {
	// Count if we have k nodes
	count := 0
	curr := head
	for curr != nil && count < k {
		curr = curr.Next
		count++
	}

	// If less than k nodes, don't reverse
	if count < k {
		return head
	}

	// Reverse k nodes
	prev := ReverseKGroupRecursive(curr, k) // Recursively process rest first
	current := head

	for i := 0; i < k; i++ {
		nextNode := current.Next
		current.Next = prev
		prev = current
		current = nextNode
	}

	return prev
}

// ============================================================================
// APPROACH 3: Stack-Based
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(k) - stack for each group
//
// WHEN TO USE:
// - Explicit reversal logic
// - When you're comfortable with stack operations
// ============================================================================

// ReverseKGroupStack reverses in groups of k using a stack.
//
// Push k nodes to stack, pop to reverse, connect groups.
func ReverseKGroupStack(head *ListNode, k int) *ListNode {
	if head == nil || k == 1 {
		return head
	}

	dummy := &ListNode{Next: head}
	prev := dummy
	curr := head

	for {
		// Try to fill stack with k nodes
		stack := []*ListNode{}
		temp := curr

		for i := 0; i < k; i++ {
			if temp == nil {
				break
			}
			stack = append(stack, temp)
			temp = temp.Next
		}

		// If we don't have k nodes, we're done
		if len(stack) < k {
			prev.Next = curr
			break
		}

		// Pop from stack to reverse
		for len(stack) > 0 {
			prev.Next = stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			prev = prev.Next
		}

		// Move to next group
		prev.Next = temp
		curr = temp
	}

	return dummy.Next
}

// ============================================================================
// APPROACH 4: Two-Pass (Count then Reverse)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// WHEN TO USE:
// - When you prefer explicit length calculation
// ============================================================================

// ReverseKGroupTwoPass uses two-pass approach: count length first, then reverse.
func ReverseKGroupTwoPass(head *ListNode, k int) *ListNode {
	if head == nil || k == 1 {
		return head
	}

	// Pass 1: Count total length
	length := 0
	curr := head
	for curr != nil {
		length++
		curr = curr.Next
	}

	// Number of complete groups
	numGroups := length / k

	dummy := &ListNode{Next: head}
	groupPrev := dummy

	for g := 0; g < numGroups; g++ {
		// Reverse k nodes
		var prev *ListNode
		curr := groupPrev.Next
		groupTail := curr // First node becomes tail after reversal

		for i := 0; i < k; i++ {
			nextNode := curr.Next
			curr.Next = prev
			prev = curr
			curr = nextNode
		}

		// Connect groups
		groupPrev.Next = prev       // Connect to new head
		groupTail.Next = curr       // Connect tail to next group
		groupPrev = groupTail       // Move to next group's prev
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
		{[]int{1, 2, 3, 4, 5}, 2, []int{2, 1, 4, 3, 5}, "k=2, 5 nodes"},
		{[]int{1, 2, 3, 4, 5}, 3, []int{3, 2, 1, 4, 5}, "k=3, partial last group"},
		{[]int{1, 2, 3, 4, 5, 6, 7, 8}, 3, []int{3, 2, 1, 6, 5, 4, 7, 8}, "k=3, 8 nodes"},
		{[]int{1, 2, 3, 4, 5}, 1, []int{1, 2, 3, 4, 5}, "k=1, no change"},
		{[]int{1, 2, 3, 4, 5}, 5, []int{5, 4, 3, 2, 1}, "k=n, reverse entire list"},
		{[]int{1}, 1, []int{1}, "Single node"},
		{[]int{1, 2}, 2, []int{2, 1}, "Two nodes, k=2"},
	}

	approaches := []struct {
		name string
		fn   func(*ListNode, int) *ListNode
	}{
		{"Iterative (Recommended)", ReverseKGroupIterative},
		{"Recursive", ReverseKGroupRecursive},
		{"Stack-Based", ReverseKGroupStack},
		{"Two-Pass", ReverseKGroupTwoPass},
	}

	fmt.Println("======================================================================")
	fmt.Println("REVERSE LINKED LIST IN GROUPS OF K - TEST RESULTS")
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

	demo := []int{1, 2, 3, 4, 5, 6, 7, 8}
	k := 3
	fmt.Print("\nInput: ")
	printList(createList(demo))
	fmt.Printf("k = %d\n", k)
	fmt.Printf("Groups: [%v], [%v], [%v] (incomplete)\n", demo[0:3], demo[3:6], demo[6:8])

	result := ReverseKGroupIterative(createList(demo), k)
	fmt.Print("Output: ")
	printList(result)
}
