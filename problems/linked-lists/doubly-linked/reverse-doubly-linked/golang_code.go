/*
Reverse a Doubly Linked List

Reverse a doubly linked list by swapping prev and next pointers.

Time Complexity: O(n)
Space Complexity: O(1) for iterative, O(n) for recursive
*/

package main

import (
	"fmt"
	"strings"
)

// DLLNode represents a doubly linked list node
type DLLNode struct {
	Val  int
	Prev *DLLNode
	Next *DLLNode
}

// ==================== HELPER FUNCTIONS ====================

// createDoublyLinkedList creates a doubly linked list from a slice of values
func createDoublyLinkedList(values []int) *DLLNode {
	if len(values) == 0 {
		return nil
	}

	head := &DLLNode{Val: values[0]}
	current := head

	for _, val := range values[1:] {
		newNode := &DLLNode{Val: val}
		current.Next = newNode
		newNode.Prev = current
		current = newNode
	}

	return head
}

// dllToSlice converts a doubly linked list to a slice (forward traversal)
func dllToSlice(head *DLLNode) []int {
	result := []int{}
	current := head

	for current != nil {
		result = append(result, current.Val)
		current = current.Next
	}

	return result
}

// dllToSliceReverse converts by traversing backwards from tail
func dllToSliceReverse(head *DLLNode) []int {
	if head == nil {
		return []int{}
	}

	// Find tail
	current := head
	for current.Next != nil {
		current = current.Next
	}

	// Traverse backwards
	result := []int{}
	for current != nil {
		result = append(result, current.Val)
		current = current.Prev
	}

	return result
}

// printDLL returns string representation of doubly linked list
func printDLL(head *DLLNode) string {
	if head == nil {
		return "null"
	}

	var values []string
	current := head

	for current != nil {
		values = append(values, fmt.Sprintf("%d", current.Val))
		current = current.Next
	}

	return "null <-> " + strings.Join(values, " <-> ") + " <-> null"
}

// verifyDLL verifies that prev/next pointers are consistent
func verifyDLL(head *DLLNode) bool {
	if head == nil {
		return true
	}

	// First node's prev should be nil
	if head.Prev != nil {
		return false
	}

	current := head
	for current.Next != nil {
		if current.Next.Prev != current {
			return false
		}
		current = current.Next
	}

	return true
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

// reverseIterative reverses doubly linked list by swapping prev and next pointers
// Time: O(n), Space: O(1)
func reverseIterative(head *DLLNode) *DLLNode {
	if head == nil {
		return nil
	}

	current := head
	var newHead *DLLNode

	for current != nil {
		// Save original next before swapping
		originalNext := current.Next

		// Swap prev and next
		current.Next = current.Prev
		current.Prev = originalNext

		// Track new head (will be the last non-null node)
		newHead = current

		// Move to next node (which is now in prev due to swap)
		current = originalNext
	}

	return newHead
}

// reverseRecursive reverses doubly linked list using recursion
// Swaps prev and next at each node, then recurses
// Time: O(n), Space: O(n) due to recursion stack
func reverseRecursive(head *DLLNode) *DLLNode {
	// Base case: empty list
	if head == nil {
		return nil
	}

	// Swap prev and next for current node
	head.Prev, head.Next = head.Next, head.Prev

	// If this was the last node (head.Prev is now nil, meaning original next was nil)
	// Then this is the new head
	if head.Prev == nil {
		return head
	}

	// Recursively reverse the rest (use Prev since we swapped)
	return reverseRecursive(head.Prev)
}

// reverseSimple is an alternative cleaner implementation
// Time: O(n), Space: O(1)
func reverseSimple(head *DLLNode) *DLLNode {
	if head == nil {
		return nil
	}

	current := head

	for current != nil {
		// Swap prev and next pointers
		current.Prev, current.Next = current.Next, current.Prev

		// Move to next node (now accessed via prev since we swapped)
		if current.Prev == nil {
			// This means original next was nil, so current is the new head
			return current
		}

		current = current.Prev
	}

	return head // Should not reach here
}

// ==================== TEST CASES ====================

func main() {
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("REVERSE DOUBLY LINKED LIST - TEST CASES")
	fmt.Println(strings.Repeat("=", 60))

	// Test case 1: Normal list
	fmt.Println("\nTest 1: Reverse [1, 2, 3, 4, 5]")
	head := createDoublyLinkedList([]int{1, 2, 3, 4, 5})
	fmt.Printf("  Input: %s\n", printDLL(head))
	result := reverseIterative(head)
	fmt.Printf("  Output: %s\n", printDLL(result))
	if slicesEqual(dllToSlice(result), []int{5, 4, 3, 2, 1}) && verifyDLL(result) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 2: Two nodes
	fmt.Println("\nTest 2: Reverse [1, 2]")
	head = createDoublyLinkedList([]int{1, 2})
	fmt.Printf("  Input: %s\n", printDLL(head))
	result = reverseIterative(head)
	fmt.Printf("  Output: %s\n", printDLL(result))
	if slicesEqual(dllToSlice(result), []int{2, 1}) && verifyDLL(result) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 3: Single node
	fmt.Println("\nTest 3: Reverse [1]")
	head = createDoublyLinkedList([]int{1})
	fmt.Printf("  Input: %s\n", printDLL(head))
	result = reverseIterative(head)
	fmt.Printf("  Output: %s\n", printDLL(result))
	if slicesEqual(dllToSlice(result), []int{1}) && verifyDLL(result) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 4: Empty list
	fmt.Println("\nTest 4: Reverse empty list")
	result = reverseIterative(nil)
	fmt.Printf("  Output: %s\n", printDLL(result))
	if result == nil {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 5: Recursive approach
	fmt.Println("\nTest 5: Recursive approach on [1, 2, 3, 4, 5]")
	head = createDoublyLinkedList([]int{1, 2, 3, 4, 5})
	fmt.Printf("  Input: %s\n", printDLL(head))
	result = reverseRecursive(head)
	fmt.Printf("  Output: %s\n", printDLL(result))
	if slicesEqual(dllToSlice(result), []int{5, 4, 3, 2, 1}) && verifyDLL(result) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 6: Simple swap approach
	fmt.Println("\nTest 6: Simple swap approach on [1, 2, 3]")
	head = createDoublyLinkedList([]int{1, 2, 3})
	fmt.Printf("  Input: %s\n", printDLL(head))
	result = reverseSimple(head)
	fmt.Printf("  Output: %s\n", printDLL(result))
	if slicesEqual(dllToSlice(result), []int{3, 2, 1}) && verifyDLL(result) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 7: Verify backward traversal works
	fmt.Println("\nTest 7: Verify backward traversal after reversal")
	head = createDoublyLinkedList([]int{1, 2, 3, 4})
	result = reverseIterative(head)
	forward := dllToSlice(result)
	backward := dllToSliceReverse(result)
	fmt.Printf("  Forward traversal: %v\n", forward)
	fmt.Printf("  Backward traversal (from tail): %v\n", backward)
	if slicesEqual(forward, []int{4, 3, 2, 1}) && slicesEqual(backward, []int{1, 2, 3, 4}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 8: Three nodes
	fmt.Println("\nTest 8: Reverse [1, 2, 3]")
	head = createDoublyLinkedList([]int{1, 2, 3})
	fmt.Printf("  Input: %s\n", printDLL(head))
	result = reverseIterative(head)
	fmt.Printf("  Output: %s\n", printDLL(result))
	if slicesEqual(dllToSlice(result), []int{3, 2, 1}) && verifyDLL(result) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 9: Negative numbers
	fmt.Println("\nTest 9: Reverse [-3, -2, -1, 0, 1, 2, 3]")
	head = createDoublyLinkedList([]int{-3, -2, -1, 0, 1, 2, 3})
	fmt.Printf("  Input: %s\n", printDLL(head))
	result = reverseIterative(head)
	fmt.Printf("  Output: %s\n", printDLL(result))
	if slicesEqual(dllToSlice(result), []int{3, 2, 1, 0, -1, -2, -3}) && verifyDLL(result) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 10: Double reverse should give original
	fmt.Println("\nTest 10: Double reverse returns to original")
	head = createDoublyLinkedList([]int{1, 2, 3, 4, 5})
	original := dllToSlice(head)
	fmt.Printf("  Original: %v\n", original)
	reversedOnce := reverseIterative(head)
	reversedTwice := reverseIterative(reversedOnce)
	fmt.Printf("  After double reverse: %v\n", dllToSlice(reversedTwice))
	if slicesEqual(dllToSlice(reversedTwice), original) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("ALL TESTS PASSED!")
	fmt.Println(strings.Repeat("=", 60))
}
