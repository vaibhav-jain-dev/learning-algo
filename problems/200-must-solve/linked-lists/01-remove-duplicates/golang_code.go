/*
Remove Duplicates From Linked List - Go Solution

Remove duplicate values from a sorted linked list in place.

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

// RemoveDuplicatesFromLinkedList removes duplicate values from sorted linked list
func RemoveDuplicatesFromLinkedList(linkedList *LinkedList) *LinkedList {
	current := linkedList

	for current != nil {
		// Skip all nodes with same value
		nextDistinct := current.Next
		for nextDistinct != nil && nextDistinct.Value == current.Value {
			nextDistinct = nextDistinct.Next
		}

		// Link current to next distinct node
		current.Next = nextDistinct
		current = nextDistinct
	}

	return linkedList
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

// LinkedListToArray converts linked list to slice for display
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
	// Test 1: Multiple duplicates
	ll1 := CreateLinkedList([]int{1, 1, 3, 4, 4, 4, 5, 6, 6})
	fmt.Printf("Test 1 Input:  %v\n", LinkedListToArray(ll1))
	result1 := RemoveDuplicatesFromLinkedList(ll1)
	fmt.Printf("Test 1 Output: %v\n", LinkedListToArray(result1))
	// Expected: [1, 3, 4, 5, 6]

	// Test 2: All same values
	ll2 := CreateLinkedList([]int{1, 1, 1, 1, 1})
	fmt.Printf("\nTest 2 Input:  %v\n", LinkedListToArray(ll2))
	result2 := RemoveDuplicatesFromLinkedList(ll2)
	fmt.Printf("Test 2 Output: %v\n", LinkedListToArray(result2))
	// Expected: [1]

	// Test 3: No duplicates
	ll3 := CreateLinkedList([]int{1, 2, 3, 4, 5})
	fmt.Printf("\nTest 3 Input:  %v\n", LinkedListToArray(ll3))
	result3 := RemoveDuplicatesFromLinkedList(ll3)
	fmt.Printf("Test 3 Output: %v\n", LinkedListToArray(result3))
	// Expected: [1, 2, 3, 4, 5]

	// Test 4: Single element
	ll4 := CreateLinkedList([]int{5})
	fmt.Printf("\nTest 4 Input:  %v\n", LinkedListToArray(ll4))
	result4 := RemoveDuplicatesFromLinkedList(ll4)
	fmt.Printf("Test 4 Output: %v\n", LinkedListToArray(result4))
	// Expected: [5]

	// Test 5: Two elements, duplicates
	ll5 := CreateLinkedList([]int{1, 1})
	fmt.Printf("\nTest 5 Input:  %v\n", LinkedListToArray(ll5))
	result5 := RemoveDuplicatesFromLinkedList(ll5)
	fmt.Printf("Test 5 Output: %v\n", LinkedListToArray(result5))
	// Expected: [1]

	// Test 6: Alternating duplicates
	ll6 := CreateLinkedList([]int{1, 1, 2, 2, 3, 3, 4, 4})
	fmt.Printf("\nTest 6 Input:  %v\n", LinkedListToArray(ll6))
	result6 := RemoveDuplicatesFromLinkedList(ll6)
	fmt.Printf("Test 6 Output: %v\n", LinkedListToArray(result6))
	// Expected: [1, 2, 3, 4]

	fmt.Println("\nAll tests completed!")
}
