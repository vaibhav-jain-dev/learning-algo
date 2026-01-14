/*
Remove Nth Node From End of List

Given the head of a linked list, remove the nth node from the end
of the list and return its head.

Time Complexity: O(L) where L is list length
Space Complexity: O(1)
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

// removeNthFromEndOnePass removes nth node from end using two-pointer technique
// Uses a dummy node and maintains gap of n+1 between pointers
// Time: O(L), Space: O(1)
func removeNthFromEndOnePass(head *ListNode, n int) *ListNode {
	// Dummy node helps handle edge case of removing head
	dummy := &ListNode{Val: 0}
	dummy.Next = head

	first := dummy
	second := dummy

	// Move first pointer n+1 steps ahead
	for i := 0; i <= n; i++ {
		first = first.Next
	}

	// Move both pointers until first reaches null
	for first != nil {
		first = first.Next
		second = second.Next
	}

	// second is now right before the node to remove
	second.Next = second.Next.Next

	return dummy.Next
}

// removeNthFromEndTwoPass removes nth node using two-pass approach
// First pass counts length, second pass removes the node
// Time: O(L), Space: O(1)
func removeNthFromEndTwoPass(head *ListNode, n int) *ListNode {
	// First pass: count nodes
	length := 0
	current := head
	for current != nil {
		length++
		current = current.Next
	}

	// Calculate position from start (0-indexed)
	posToRemove := length - n

	// Edge case: removing head
	if posToRemove == 0 {
		return head.Next
	}

	// Second pass: find node before the one to remove
	current = head
	for i := 0; i < posToRemove-1; i++ {
		current = current.Next
	}

	// Remove the node
	current.Next = current.Next.Next

	return head
}

// ==================== TEST CASES ====================

func main() {
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("REMOVE NTH NODE FROM END OF LIST - TEST CASES")
	fmt.Println(strings.Repeat("=", 60))

	// Test case 1: Remove 2nd from end
	fmt.Println("\nTest 1: Remove 2nd from end of [1, 2, 3, 4, 5]")
	head := createLinkedList([]int{1, 2, 3, 4, 5})
	fmt.Printf("  Input: %s, n = 2\n", printLinkedList(head))
	result := removeNthFromEndOnePass(head, 2)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{1, 2, 3, 5}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 2: Remove only node
	fmt.Println("\nTest 2: Remove only node from [1]")
	head = createLinkedList([]int{1})
	fmt.Printf("  Input: %s, n = 1\n", printLinkedList(head))
	result = removeNthFromEndOnePass(head, 1)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 3: Remove last node
	fmt.Println("\nTest 3: Remove last node from [1, 2]")
	head = createLinkedList([]int{1, 2})
	fmt.Printf("  Input: %s, n = 1\n", printLinkedList(head))
	result = removeNthFromEndOnePass(head, 1)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{1}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 4: Remove head (first node)
	fmt.Println("\nTest 4: Remove head from [1, 2]")
	head = createLinkedList([]int{1, 2})
	fmt.Printf("  Input: %s, n = 2\n", printLinkedList(head))
	result = removeNthFromEndOnePass(head, 2)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{2}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 5: Two-pass approach
	fmt.Println("\nTest 5: Two-pass approach on [1, 2, 3, 4, 5], n = 2")
	head = createLinkedList([]int{1, 2, 3, 4, 5})
	fmt.Printf("  Input: %s, n = 2\n", printLinkedList(head))
	result = removeNthFromEndTwoPass(head, 2)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{1, 2, 3, 5}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 6: Remove middle node
	fmt.Println("\nTest 6: Remove middle node from [1, 2, 3]")
	head = createLinkedList([]int{1, 2, 3})
	fmt.Printf("  Input: %s, n = 2\n", printLinkedList(head))
	result = removeNthFromEndOnePass(head, 2)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{1, 3}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 7: Longer list
	fmt.Println("\nTest 7: Longer list [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], n = 5")
	head = createLinkedList([]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10})
	fmt.Printf("  Input: %s\n", printLinkedList(head))
	fmt.Println("  n = 5 (remove node with value 6)")
	result = removeNthFromEndOnePass(head, 5)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{1, 2, 3, 4, 5, 7, 8, 9, 10}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 8: Remove head using two-pass
	fmt.Println("\nTest 8: Remove head using two-pass approach")
	head = createLinkedList([]int{1, 2, 3})
	fmt.Printf("  Input: %s, n = 3\n", printLinkedList(head))
	result = removeNthFromEndTwoPass(head, 3)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{2, 3}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("ALL TESTS PASSED!")
	fmt.Println(strings.Repeat("=", 60))
}
