/*
Reverse Linked List

Given the head of a singly linked list, reverse the list and return the new head.

Time Complexity: O(n) - visit each node once
Space Complexity: O(1) for iterative, O(n) for recursive
*/

package main

import (
	"fmt"
	"strings"
)

// ListNode defines a singly-linked list node
type ListNode struct {
	Val  int
	Next *ListNode
}

// ==================== HELPER FUNCTIONS ====================

// createLinkedList creates a linked list from a slice of values
func createLinkedList(values []int) *ListNode {
	if len(values) == 0 {
		return nil
	}

	head := &ListNode{Val: values[0]}
	current := head

	for _, val := range values[1:] {
		current.Next = &ListNode{Val: val}
		current = current.Next
	}

	return head
}

// linkedListToSlice converts a linked list to a slice for easy comparison
func linkedListToSlice(head *ListNode) []int {
	result := []int{}
	current := head

	for current != nil {
		result = append(result, current.Val)
		current = current.Next
	}

	return result
}

// printLinkedList returns string representation of linked list
func printLinkedList(head *ListNode) string {
	if head == nil {
		return "null"
	}

	var values []string
	current := head

	for current != nil {
		values = append(values, fmt.Sprintf("%d", current.Val))
		current = current.Next
	}

	return strings.Join(values, " -> ") + " -> null"
}

// slicesEqual compares two int slices for equality
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

// ==================== SOLUTION ====================

// reverseListIterative reverses linked list using iterative approach
// Uses three pointers to reverse the list in-place
// Time: O(n), Space: O(1)
func reverseListIterative(head *ListNode) *ListNode {
	var prev *ListNode = nil
	curr := head

	for curr != nil {
		// Save next node before we change curr.Next
		nextNode := curr.Next

		// Reverse the link
		curr.Next = prev

		// Move pointers forward
		prev = curr
		curr = nextNode
	}

	// prev is now the new head
	return prev
}

// reverseListRecursive reverses linked list using recursive approach
// Time: O(n), Space: O(n) due to recursion stack
func reverseListRecursive(head *ListNode) *ListNode {
	// Base case: empty list or single node
	if head == nil || head.Next == nil {
		return head
	}

	// Recursively reverse the rest of the list
	newHead := reverseListRecursive(head.Next)

	// Make the next node point back to us
	head.Next.Next = head

	// Remove our forward pointer (we're now the tail)
	head.Next = nil

	return newHead
}

// ==================== TEST CASES ====================

func main() {
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("REVERSE LINKED LIST - TEST CASES")
	fmt.Println(strings.Repeat("=", 60))

	// Test case 1: Normal list
	fmt.Println("\nTest 1: Normal list [1, 2, 3, 4, 5]")
	head := createLinkedList([]int{1, 2, 3, 4, 5})
	fmt.Printf("  Input:  %s\n", printLinkedList(head))
	result := reverseListIterative(head)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{5, 4, 3, 2, 1}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 2: Two nodes
	fmt.Println("\nTest 2: Two nodes [1, 2]")
	head = createLinkedList([]int{1, 2})
	fmt.Printf("  Input:  %s\n", printLinkedList(head))
	result = reverseListIterative(head)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{2, 1}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 3: Empty list
	fmt.Println("\nTest 3: Empty list")
	head = createLinkedList([]int{})
	fmt.Printf("  Input:  %s\n", printLinkedList(head))
	result = reverseListIterative(head)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 4: Single node
	fmt.Println("\nTest 4: Single node [1]")
	head = createLinkedList([]int{1})
	fmt.Printf("  Input:  %s\n", printLinkedList(head))
	result = reverseListIterative(head)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{1}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 5: Recursive approach
	fmt.Println("\nTest 5: Recursive approach [1, 2, 3, 4, 5]")
	head = createLinkedList([]int{1, 2, 3, 4, 5})
	fmt.Printf("  Input:  %s\n", printLinkedList(head))
	result = reverseListRecursive(head)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{5, 4, 3, 2, 1}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 6: Negative numbers
	fmt.Println("\nTest 6: Negative numbers [-1, -2, -3]")
	head = createLinkedList([]int{-1, -2, -3})
	fmt.Printf("  Input:  %s\n", printLinkedList(head))
	result = reverseListIterative(head)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{-3, -2, -1}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("ALL TESTS PASSED!")
	fmt.Println(strings.Repeat("=", 60))
}
