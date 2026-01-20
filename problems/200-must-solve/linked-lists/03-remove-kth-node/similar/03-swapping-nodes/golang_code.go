/*
Swapping Nodes in a Linked List - Go Solutions

Given a linked list and k, swap the k-th node from start with k-th node from end.

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
// APPROACH 1: Two Pointers (Single Pass) - RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - single pass
// Space Complexity: O(1) - constant extra space
//
// WHY THIS IS BEST:
// - Find both nodes in one traversal
// - Constant space
// - Elegant two-pointer technique
// ============================================================================

// SwapNodesTwoPointers swaps values using two pointers in single pass.
//
// Key Insight:
// - First pointer moves k steps to find k-th from start
// - Then both pointers move until first reaches end
// - Second pointer will be at k-th from end
//
// Visual (k=2):
//
//	Find node1: advance k steps -> at position k
//	Find node2: start second at head, move both until first hits null
//	            second is now k positions from end
//	Swap values of node1 and node2
func SwapNodesTwoPointers(head *ListNode, k int) *ListNode {
	if head == nil {
		return nil
	}

	// Step 1: Find k-th node from start
	first := head
	for i := 0; i < k-1; i++ {
		first = first.Next
	}

	nodeFromStart := first // Save this node

	// Step 2: Find k-th node from end
	// Move first to end while second starts from head
	second := head
	for first.Next != nil {
		first = first.Next
		second = second.Next
	}

	nodeFromEnd := second // This is k-th from end

	// Step 3: Swap values (not the nodes themselves)
	nodeFromStart.Val, nodeFromEnd.Val = nodeFromEnd.Val, nodeFromStart.Val

	return head
}

// ============================================================================
// APPROACH 2: Count Length First
// ============================================================================
// Time Complexity:  O(n) - two passes
// Space Complexity: O(1) - constant extra space
//
// WHEN TO USE:
// - More explicit logic
// - When you need the length for other purposes
// ============================================================================

// SwapNodesCountLength swaps values by counting length first.
//
// Two passes:
// 1. Count total nodes to find positions
// 2. Traverse to both positions and swap
func SwapNodesCountLength(head *ListNode, k int) *ListNode {
	if head == nil {
		return nil
	}

	// Pass 1: Count length
	length := 0
	current := head
	for current != nil {
		length++
		current = current.Next
	}

	// Calculate positions (1-indexed to 0-indexed)
	posFromStart := k - 1
	posFromEnd := length - k

	// Pass 2: Find both nodes
	node1 := head
	node2 := head

	maxPos := posFromStart
	if posFromEnd > maxPos {
		maxPos = posFromEnd
	}

	for i := 0; i < maxPos; i++ {
		if i < posFromStart {
			node1 = node1.Next
		}
		if i < posFromEnd {
			node2 = node2.Next
		}
	}

	// Swap values
	node1.Val, node2.Val = node2.Val, node1.Val

	return head
}

// ============================================================================
// APPROACH 3: Store Nodes in Slice
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) - stores all nodes
//
// WHEN TO USE:
// - When you need random access to nodes
// - Simplest logic but uses extra space
// ============================================================================

// SwapNodesArray swaps values using slice for O(1) index access.
//
// Store all nodes in slice, then access by index.
func SwapNodesArray(head *ListNode, k int) *ListNode {
	if head == nil {
		return nil
	}

	// Collect all nodes
	var nodes []*ListNode
	current := head
	for current != nil {
		nodes = append(nodes, current)
		current = current.Next
	}

	// Swap values (k is 1-indexed)
	n := len(nodes)
	node1 := nodes[k-1]    // k-th from start
	node2 := nodes[n-k]    // k-th from end

	node1.Val, node2.Val = node2.Val, node1.Val

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
// ============================================================================

// SwapNodesRecursive swaps values using recursion to find k-th from end.
func SwapNodesRecursive(head *ListNode, k int) *ListNode {
	if head == nil {
		return nil
	}

	// Find k-th from start iteratively
	nodeFromStart := head
	for i := 0; i < k-1; i++ {
		nodeFromStart = nodeFromStart.Next
	}

	// Use closure to find k-th from end
	var nodeFromEnd *ListNode

	var findKthFromEnd func(node *ListNode) int
	findKthFromEnd = func(node *ListNode) int {
		if node == nil {
			return 0
		}

		pos := findKthFromEnd(node.Next) + 1

		if pos == k {
			nodeFromEnd = node
		}

		return pos
	}

	findKthFromEnd(head)

	// Swap values
	if nodeFromEnd != nil {
		nodeFromStart.Val, nodeFromEnd.Val = nodeFromEnd.Val, nodeFromStart.Val
	}

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
		{[]int{1, 2, 3, 4, 5}, 2, []int{1, 4, 3, 2, 5}, "Swap 2nd from start/end"},
		{[]int{7, 9, 6, 6, 7, 8, 3, 0, 9, 5}, 5, []int{7, 9, 6, 6, 8, 7, 3, 0, 9, 5}, "Swap 5th"},
		{[]int{1}, 1, []int{1}, "Single node"},
		{[]int{1, 2}, 1, []int{2, 1}, "Swap first and last"},
		{[]int{1, 2}, 2, []int{2, 1}, "Swap at k=2 for length 2"},
		{[]int{1, 2, 3}, 2, []int{1, 2, 3}, "Middle node swaps with itself"},
		{[]int{1, 2, 3, 4}, 1, []int{4, 2, 3, 1}, "Swap first and last"},
	}

	approaches := []struct {
		name string
		fn   func(*ListNode, int) *ListNode
	}{
		{"Two Pointers (Recommended)", SwapNodesTwoPointers},
		{"Count Length", SwapNodesCountLength},
		{"Array Storage", SwapNodesArray},
		{"Recursive", SwapNodesRecursive},
	}

	fmt.Println("======================================================================")
	fmt.Println("SWAPPING NODES IN LINKED LIST - TEST RESULTS")
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

	demo := []int{1, 2, 3, 4, 5}
	k := 2
	fmt.Print("\nInput: ")
	printList(createList(demo))
	fmt.Printf("k = %d\n", k)
	fmt.Printf("Swap %d-th from start (value %d) with %d-th from end (value %d)\n",
		k, demo[k-1], k, demo[len(demo)-k])

	result := SwapNodesTwoPointers(createList(demo), k)
	fmt.Print("Output: ")
	printList(result)
}
