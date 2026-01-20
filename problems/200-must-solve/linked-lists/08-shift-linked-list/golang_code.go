/*
Shift Linked List - Go Solution

Shift (rotate) a linked list by k positions.

Time Complexity: O(n)
Space Complexity: O(1)
*/

package main

import "fmt"

// LinkedList represents a node in a singly linked list
type LinkedList struct {
	Value int
	Next  *LinkedList
}

// ShiftLinkedList shifts a linked list by k positions
// Positive k: shift forward (last k nodes move to front)
// Negative k: shift backward (first |k| nodes move to end)
func ShiftLinkedList(head *LinkedList, k int) *LinkedList {
	// Edge case: empty list, single node, or k = 0
	if head == nil || head.Next == nil || k == 0 {
		return head
	}

	// Step 1: Find length and tail
	length := 1
	tail := head
	for tail.Next != nil {
		tail = tail.Next
		length++
	}

	// Step 2: Normalize k
	// Handle negative and > length cases
	k = k % length
	if k < 0 {
		k = k + length
	}

	// If k is 0 after normalization, no shift needed
	if k == 0 {
		return head
	}

	// Step 3: Find new tail position
	// For forward shift by k, new tail is at position (length - k - 1)
	newTailPosition := length - k

	// Traverse to find new tail
	newTail := head
	for i := 1; i < newTailPosition; i++ {
		newTail = newTail.Next
	}

	// Step 4: Reconnect
	newHead := newTail.Next // New head is right after new tail
	newTail.Next = nil      // Break the link
	tail.Next = head        // Connect old tail to old head

	return newHead
}

// ShiftLinkedListAlternative uses circular list approach
func ShiftLinkedListAlternative(head *LinkedList, k int) *LinkedList {
	if head == nil || head.Next == nil || k == 0 {
		return head
	}

	// Find length and tail
	length := 1
	tail := head
	for tail.Next != nil {
		tail = tail.Next
		length++
	}

	// Normalize k
	k = k % length
	if k < 0 {
		k = k + length
	}
	if k == 0 {
		return head
	}

	// Make list circular
	tail.Next = head

	// Find new tail (traverse length - k steps from head)
	stepsToNewTail := length - k
	newTail := head
	for i := 1; i < stepsToNewTail; i++ {
		newTail = newTail.Next
	}

	// Break circle and return new head
	newHead := newTail.Next
	newTail.Next = nil

	return newHead
}

// CreateLinkedList creates a linked list from values
func CreateLinkedList(values []int) *LinkedList {
	if len(values) == 0 {
		return nil
	}
	head := &LinkedList{Value: values[0]}
	current := head
	for _, val := range values[1:] {
		current.Next = &LinkedList{Value: val}
		current = current.Next
	}
	return head
}

// LinkedListToArray converts linked list to slice
func LinkedListToArray(head *LinkedList) []int {
	result := []int{}
	current := head
	for current != nil {
		result = append(result, current.Value)
		current = current.Next
	}
	return result
}

func main() {
	// Test 1: Shift forward by 2
	ll1 := CreateLinkedList([]int{0, 1, 2, 3, 4, 5})
	fmt.Println("Test 1: Shift by k=2")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll1))
	result1 := ShiftLinkedList(ll1, 2)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result1))
	// Expected: [4, 5, 0, 1, 2, 3]

	// Test 2: Shift backward by 2 (negative k)
	ll2 := CreateLinkedList([]int{0, 1, 2, 3, 4, 5})
	fmt.Println("\nTest 2: Shift by k=-2")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll2))
	result2 := ShiftLinkedList(ll2, -2)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result2))
	// Expected: [2, 3, 4, 5, 0, 1]

	// Test 3: k larger than length
	ll3 := CreateLinkedList([]int{1, 2, 3})
	fmt.Println("\nTest 3: Shift by k=4 (length=3)")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll3))
	result3 := ShiftLinkedList(ll3, 4)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result3))
	// Expected: [3, 1, 2] (4 % 3 = 1)

	// Test 4: k = 0 (no shift)
	ll4 := CreateLinkedList([]int{1, 2, 3, 4})
	fmt.Println("\nTest 4: Shift by k=0")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll4))
	result4 := ShiftLinkedList(ll4, 0)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result4))
	// Expected: [1, 2, 3, 4]

	// Test 5: k = length (no effective shift)
	ll5 := CreateLinkedList([]int{1, 2, 3, 4})
	fmt.Println("\nTest 5: Shift by k=4 (equals length)")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll5))
	result5 := ShiftLinkedList(ll5, 4)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result5))
	// Expected: [1, 2, 3, 4]

	// Test 6: Shift by 1
	ll6 := CreateLinkedList([]int{1, 2, 3, 4, 5})
	fmt.Println("\nTest 6: Shift by k=1")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll6))
	result6 := ShiftLinkedList(ll6, 1)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result6))
	// Expected: [5, 1, 2, 3, 4]

	// Test 7: Single node
	ll7 := CreateLinkedList([]int{42})
	fmt.Println("\nTest 7: Single node, k=5")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll7))
	result7 := ShiftLinkedList(ll7, 5)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result7))
	// Expected: [42]

	// Test 8: Alternative approach
	ll8 := CreateLinkedList([]int{0, 1, 2, 3, 4, 5})
	fmt.Println("\nTest 8 (Alternative): Shift by k=2")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll8))
	result8 := ShiftLinkedListAlternative(ll8, 2)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result8))
	// Expected: [4, 5, 0, 1, 2, 3]

	// Test 9: Large negative k
	ll9 := CreateLinkedList([]int{1, 2, 3, 4, 5})
	fmt.Println("\nTest 9: Shift by k=-7 (length=5)")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll9))
	result9 := ShiftLinkedList(ll9, -7)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result9))
	// -7 % 5 = -2, then -2 + 5 = 3, so shift by 3

	fmt.Println("\nAll tests completed!")
}
