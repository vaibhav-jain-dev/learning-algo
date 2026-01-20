/*
Reverse Linked List - Go Solution

Reverse a singly linked list in place.

Time Complexity: O(n)
Space Complexity: O(1) iterative, O(n) recursive
*/

package main

import "fmt"

// LinkedList represents a node in a singly linked list
type LinkedList struct {
	Value int
	Next  *LinkedList
}

// ReverseLinkedList reverses linked list in place using iterative approach
func ReverseLinkedList(head *LinkedList) *LinkedList {
	var prev *LinkedList = nil
	current := head

	for current != nil {
		nextNode := current.Next // Save next
		current.Next = prev      // Reverse link
		prev = current           // Move prev forward
		current = nextNode       // Move current forward
	}

	return prev
}

// ReverseLinkedListRecursive recursive approach to reverse linked list
func ReverseLinkedListRecursive(head *LinkedList) *LinkedList {
	// Base case: empty list or single node
	if head == nil || head.Next == nil {
		return head
	}

	// Reverse the rest of the list
	newHead := ReverseLinkedListRecursive(head.Next)

	// Reverse the link between head and next
	head.Next.Next = head
	head.Next = nil

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
	// Test 1: Standard list
	ll1 := CreateLinkedList([]int{0, 1, 2, 3, 4, 5})
	fmt.Printf("Test 1 Input:  %v\n", LinkedListToArray(ll1))
	result1 := ReverseLinkedList(ll1)
	fmt.Printf("Test 1 Output: %v\n", LinkedListToArray(result1))
	// Expected: [5, 4, 3, 2, 1, 0]

	// Test 2: Two elements
	ll2 := CreateLinkedList([]int{1, 2})
	fmt.Printf("\nTest 2 Input:  %v\n", LinkedListToArray(ll2))
	result2 := ReverseLinkedList(ll2)
	fmt.Printf("Test 2 Output: %v\n", LinkedListToArray(result2))
	// Expected: [2, 1]

	// Test 3: Single element
	ll3 := CreateLinkedList([]int{5})
	fmt.Printf("\nTest 3 Input:  %v\n", LinkedListToArray(ll3))
	result3 := ReverseLinkedList(ll3)
	fmt.Printf("Test 3 Output: %v\n", LinkedListToArray(result3))
	// Expected: [5]

	// Test 4: Empty list
	var ll4 *LinkedList = nil
	fmt.Printf("\nTest 4 Input:  %v\n", LinkedListToArray(ll4))
	result4 := ReverseLinkedList(ll4)
	fmt.Printf("Test 4 Output: %v\n", LinkedListToArray(result4))
	// Expected: []

	// Test 5: Recursive approach
	ll5 := CreateLinkedList([]int{1, 2, 3, 4})
	fmt.Printf("\nTest 5 (Recursive) Input:  %v\n", LinkedListToArray(ll5))
	result5 := ReverseLinkedListRecursive(ll5)
	fmt.Printf("Test 5 (Recursive) Output: %v\n", LinkedListToArray(result5))
	// Expected: [4, 3, 2, 1]

	// Test 6: Longer list
	values := make([]int, 10)
	for i := 0; i < 10; i++ {
		values[i] = i
	}
	ll6 := CreateLinkedList(values)
	fmt.Printf("\nTest 6 Input:  %v\n", LinkedListToArray(ll6))
	result6 := ReverseLinkedList(ll6)
	fmt.Printf("Test 6 Output: %v\n", LinkedListToArray(result6))
	// Expected: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

	fmt.Println("\nAll tests completed!")
}
