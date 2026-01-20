/*
Remove Kth Node From End - Go Solution

Remove the kth node from the end of a singly linked list.

Time Complexity: O(n) where n is the length of the list
Space Complexity: O(1)
*/

package main

import (
	"fmt"
	"strings"
)

// LinkedList represents a node in a singly linked list
type LinkedList struct {
	Value int
	Next  *LinkedList
}

// NewLinkedList creates a new linked list node
func NewLinkedList(value int) *LinkedList {
	return &LinkedList{Value: value}
}

// RemoveKthNodeFromEnd removes the kth node from the end of the linked list
// Uses two-pointer technique:
// 1. Move first pointer k nodes ahead
// 2. Move both pointers until first reaches end
// 3. Second pointer is now at the node before the one to remove
func RemoveKthNodeFromEnd(head *LinkedList, k int) {
	// Use two pointers
	first := head
	second := head

	// Move first pointer k nodes ahead
	for i := 0; i < k; i++ {
		first = first.Next
	}

	// Edge case: if first is nil, we need to remove the head
	// Since we can't actually remove the head node (we don't have access to
	// the pointer to head), we copy the next node's value and remove the next node
	if first == nil {
		head.Value = head.Next.Value
		head.Next = head.Next.Next
		return
	}

	// Move both pointers until first reaches the last node
	for first.Next != nil {
		first = first.Next
		second = second.Next
	}

	// second is now pointing to the node before the one to remove
	// Remove the next node
	second.Next = second.Next.Next
}

// RemoveKthNodeFromEndWithCounter uses alternative approach: count length first
func RemoveKthNodeFromEndWithCounter(head *LinkedList, k int) {
	// Count the length
	length := 0
	current := head
	for current != nil {
		length++
		current = current.Next
	}

	// Position from the beginning (0-indexed)
	positionFromStart := length - k

	// Edge case: removing the head
	if positionFromStart == 0 {
		head.Value = head.Next.Value
		head.Next = head.Next.Next
		return
	}

	// Traverse to the node before the one to remove
	current = head
	for i := 0; i < positionFromStart-1; i++ {
		current = current.Next
	}

	// Remove the node
	current.Next = current.Next.Next
}

// BuildLinkedList builds a linked list from a slice of values
func BuildLinkedList(values []int) *LinkedList {
	if len(values) == 0 {
		return nil
	}

	head := NewLinkedList(values[0])
	current := head
	for _, value := range values[1:] {
		current.Next = NewLinkedList(value)
		current = current.Next
	}

	return head
}

// ToSlice converts a linked list to a slice
func (head *LinkedList) ToSlice() []int {
	result := []int{}
	current := head
	for current != nil {
		result = append(result, current.Value)
		current = current.Next
	}
	return result
}

// String returns a string representation of the linked list
func (head *LinkedList) String() string {
	if head == nil {
		return "nil"
	}
	values := []string{}
	current := head
	for current != nil {
		values = append(values, fmt.Sprintf("%d", current.Value))
		current = current.Next
	}
	return strings.Join(values, " -> ")
}

// Helper function to compare slices
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

func main() {
	// Test 1: Example from problem
	head1 := BuildLinkedList([]int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9})
	fmt.Printf("Original: %s\n", head1)
	RemoveKthNodeFromEnd(head1, 4)
	fmt.Printf("After removing 4th from end: %s\n", head1)
	fmt.Printf("Test 1 passed: %v\n", slicesEqual(head1.ToSlice(), []int{0, 1, 2, 3, 4, 5, 7, 8, 9}))

	// Test 2: Remove the head (kth from end where k == length)
	head2 := BuildLinkedList([]int{1, 2, 3})
	fmt.Printf("\nOriginal: %s\n", head2)
	RemoveKthNodeFromEnd(head2, 3)
	fmt.Printf("After removing 3rd from end (head): %s\n", head2)
	fmt.Printf("Test 2 passed: %v\n", slicesEqual(head2.ToSlice(), []int{2, 3}))

	// Test 3: Remove the tail (k=1)
	head3 := BuildLinkedList([]int{1, 2, 3, 4, 5})
	fmt.Printf("\nOriginal: %s\n", head3)
	RemoveKthNodeFromEnd(head3, 1)
	fmt.Printf("After removing 1st from end (tail): %s\n", head3)
	fmt.Printf("Test 3 passed: %v\n", slicesEqual(head3.ToSlice(), []int{1, 2, 3, 4}))

	// Test 4: Remove second to last (k=2)
	head4 := BuildLinkedList([]int{1, 2, 3, 4, 5})
	fmt.Printf("\nOriginal: %s\n", head4)
	RemoveKthNodeFromEnd(head4, 2)
	fmt.Printf("After removing 2nd from end: %s\n", head4)
	fmt.Printf("Test 4 passed: %v\n", slicesEqual(head4.ToSlice(), []int{1, 2, 3, 5}))

	// Test 5: Two-node list, remove tail
	head5 := BuildLinkedList([]int{1, 2})
	fmt.Printf("\nOriginal: %s\n", head5)
	RemoveKthNodeFromEnd(head5, 1)
	fmt.Printf("After removing 1st from end: %s\n", head5)
	fmt.Printf("Test 5 passed: %v\n", slicesEqual(head5.ToSlice(), []int{1}))

	// Test 6: Two-node list, remove head
	head6 := BuildLinkedList([]int{1, 2})
	fmt.Printf("\nOriginal: %s\n", head6)
	RemoveKthNodeFromEnd(head6, 2)
	fmt.Printf("After removing 2nd from end (head): %s\n", head6)
	fmt.Printf("Test 6 passed: %v\n", slicesEqual(head6.ToSlice(), []int{2}))

	// Test with counter approach
	fmt.Println("\n--- Testing Counter Approach ---")
	head7 := BuildLinkedList([]int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9})
	RemoveKthNodeFromEndWithCounter(head7, 4)
	fmt.Printf("Counter approach result: %s\n", head7)
	fmt.Printf("Counter test passed: %v\n", slicesEqual(head7.ToSlice(), []int{0, 1, 2, 3, 4, 5, 7, 8, 9}))

	fmt.Println("\nAll tests completed!")
}
