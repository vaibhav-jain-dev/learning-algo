/*
Merge Linked Lists - Go Solution

Merge two sorted linked lists in place.

Time Complexity: O(n + m)
Space Complexity: O(1)
*/

package main

import "fmt"

// LinkedList represents a node in a singly linked list
type LinkedList struct {
	Value int
	Next  *LinkedList
}

// MergeLinkedLists merges two sorted linked lists in place
func MergeLinkedLists(headOne, headTwo *LinkedList) *LinkedList {
	// Handle edge cases
	if headOne == nil {
		return headTwo
	}
	if headTwo == nil {
		return headOne
	}

	// Determine which list has smaller head
	var p1, p2 *LinkedList
	if headOne.Value <= headTwo.Value {
		p1 = headOne
		p2 = headTwo
	} else {
		p1 = headTwo
		p2 = headOne
	}

	// p1 always points to the list with smaller current value
	head := p1
	var prev *LinkedList

	for p1 != nil && p2 != nil {
		if p1.Value <= p2.Value {
			// p1 is smaller, just advance
			prev = p1
			p1 = p1.Next
		} else {
			// p2 is smaller, insert it before p1
			if prev != nil {
				prev.Next = p2
			}

			prev = p2
			p2 = p2.Next
			prev.Next = p1
		}
	}

	// If p2 still has elements, append them
	if p1 == nil && p2 != nil {
		prev.Next = p2
	}

	return head
}

// MergeLinkedListsRecursive is a recursive approach to merge two sorted lists
// Note: Uses O(n + m) space due to recursion stack
func MergeLinkedListsRecursive(headOne, headTwo *LinkedList) *LinkedList {
	// Base cases
	if headOne == nil {
		return headTwo
	}
	if headTwo == nil {
		return headOne
	}

	// Choose smaller head and recurse
	if headOne.Value <= headTwo.Value {
		headOne.Next = MergeLinkedListsRecursive(headOne.Next, headTwo)
		return headOne
	} else {
		headTwo.Next = MergeLinkedListsRecursive(headOne, headTwo.Next)
		return headTwo
	}
}

// MergeUsingDummyHead is an alternative approach using a dummy head
func MergeUsingDummyHead(headOne, headTwo *LinkedList) *LinkedList {
	dummy := &LinkedList{Value: 0}
	tail := dummy

	p1, p2 := headOne, headTwo

	for p1 != nil && p2 != nil {
		if p1.Value <= p2.Value {
			tail.Next = p1
			p1 = p1.Next
		} else {
			tail.Next = p2
			p2 = p2.Next
		}
		tail = tail.Next
	}

	// Append remaining nodes
	if p1 != nil {
		tail.Next = p1
	} else {
		tail.Next = p2
	}

	return dummy.Next
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
	// Test 1: Standard merge
	ll1 := CreateLinkedList([]int{2, 6, 7, 8})
	ll2 := CreateLinkedList([]int{1, 3, 4, 5, 9, 10})
	fmt.Println("Test 1:")
	fmt.Printf("  List 1: %v\n", LinkedListToArray(ll1))
	fmt.Printf("  List 2: %v\n", LinkedListToArray(ll2))
	result1 := MergeLinkedLists(ll1, ll2)
	fmt.Printf("  Merged: %v\n", LinkedListToArray(result1))
	// Expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

	// Test 2: Non-overlapping ranges
	ll3 := CreateLinkedList([]int{1, 2, 3})
	ll4 := CreateLinkedList([]int{4, 5, 6})
	fmt.Println("\nTest 2:")
	fmt.Printf("  List 1: %v\n", LinkedListToArray(ll3))
	fmt.Printf("  List 2: %v\n", LinkedListToArray(ll4))
	result2 := MergeLinkedLists(ll3, ll4)
	fmt.Printf("  Merged: %v\n", LinkedListToArray(result2))
	// Expected: [1, 2, 3, 4, 5, 6]

	// Test 3: Single element lists
	ll5 := CreateLinkedList([]int{5})
	ll6 := CreateLinkedList([]int{1, 2, 3})
	fmt.Println("\nTest 3:")
	fmt.Printf("  List 1: %v\n", LinkedListToArray(ll5))
	fmt.Printf("  List 2: %v\n", LinkedListToArray(ll6))
	result3 := MergeLinkedLists(ll5, ll6)
	fmt.Printf("  Merged: %v\n", LinkedListToArray(result3))
	// Expected: [1, 2, 3, 5]

	// Test 4: One empty list
	ll7 := CreateLinkedList([]int{1, 2, 3})
	var ll8 *LinkedList = nil
	fmt.Println("\nTest 4:")
	fmt.Printf("  List 1: %v\n", LinkedListToArray(ll7))
	fmt.Printf("  List 2: %v\n", LinkedListToArray(ll8))
	result4 := MergeLinkedLists(ll7, ll8)
	fmt.Printf("  Merged: %v\n", LinkedListToArray(result4))
	// Expected: [1, 2, 3]

	// Test 5: Lists with duplicates
	ll9 := CreateLinkedList([]int{1, 3, 5, 7})
	ll10 := CreateLinkedList([]int{1, 2, 5, 8})
	fmt.Println("\nTest 5 (with duplicates):")
	fmt.Printf("  List 1: %v\n", LinkedListToArray(ll9))
	fmt.Printf("  List 2: %v\n", LinkedListToArray(ll10))
	result5 := MergeLinkedLists(ll9, ll10)
	fmt.Printf("  Merged: %v\n", LinkedListToArray(result5))
	// Expected: [1, 1, 2, 3, 5, 5, 7, 8]

	// Test 6: Recursive approach
	ll11 := CreateLinkedList([]int{1, 4, 7})
	ll12 := CreateLinkedList([]int{2, 5, 8})
	fmt.Println("\nTest 6 (Recursive):")
	fmt.Printf("  List 1: %v\n", LinkedListToArray(ll11))
	fmt.Printf("  List 2: %v\n", LinkedListToArray(ll12))
	result6 := MergeLinkedListsRecursive(ll11, ll12)
	fmt.Printf("  Merged: %v\n", LinkedListToArray(result6))
	// Expected: [1, 2, 4, 5, 7, 8]

	// Test 7: Dummy head approach
	ll13 := CreateLinkedList([]int{0, 3, 6})
	ll14 := CreateLinkedList([]int{1, 2, 4, 5})
	fmt.Println("\nTest 7 (Dummy Head):")
	fmt.Printf("  List 1: %v\n", LinkedListToArray(ll13))
	fmt.Printf("  List 2: %v\n", LinkedListToArray(ll14))
	result7 := MergeUsingDummyHead(ll13, ll14)
	fmt.Printf("  Merged: %v\n", LinkedListToArray(result7))
	// Expected: [0, 1, 2, 3, 4, 5, 6]

	fmt.Println("\nAll tests completed!")
}
