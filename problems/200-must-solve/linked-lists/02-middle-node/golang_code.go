/*
Middle Node of Linked List - Go Solution

Find the middle node of a linked list using the slow/fast pointer technique.

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

// MiddleNode finds the middle node of a linked list
// Uses the slow/fast pointer technique:
// - Slow pointer moves 1 step at a time
// - Fast pointer moves 2 steps at a time
// - When fast reaches the end, slow is at the middle
// For even-length lists, returns the second middle node
func MiddleNode(head *LinkedList) *LinkedList {
	if head == nil {
		return nil
	}

	slow := head
	fast := head

	// Move fast two steps and slow one step
	// When fast reaches end, slow is at middle
	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
	}

	return slow
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
	// Test 1: Odd number of nodes
	ll1 := CreateLinkedList([]int{1, 2, 3, 4, 5})
	fmt.Printf("Test 1 Input:  %v\n", LinkedListToArray(ll1))
	result1 := MiddleNode(ll1)
	fmt.Printf("Test 1 Output: %d\n", result1.Value)
	fmt.Println("Test 1 Expected: 3")

	// Test 2: Even number of nodes (return second middle)
	ll2 := CreateLinkedList([]int{1, 2, 3, 4, 5, 6})
	fmt.Printf("\nTest 2 Input:  %v\n", LinkedListToArray(ll2))
	result2 := MiddleNode(ll2)
	fmt.Printf("Test 2 Output: %d\n", result2.Value)
	fmt.Println("Test 2 Expected: 4")

	// Test 3: Single node
	ll3 := CreateLinkedList([]int{1})
	fmt.Printf("\nTest 3 Input:  %v\n", LinkedListToArray(ll3))
	result3 := MiddleNode(ll3)
	fmt.Printf("Test 3 Output: %d\n", result3.Value)
	fmt.Println("Test 3 Expected: 1")

	// Test 4: Two nodes
	ll4 := CreateLinkedList([]int{1, 2})
	fmt.Printf("\nTest 4 Input:  %v\n", LinkedListToArray(ll4))
	result4 := MiddleNode(ll4)
	fmt.Printf("Test 4 Output: %d\n", result4.Value)
	fmt.Println("Test 4 Expected: 2")

	// Test 5: Three nodes
	ll5 := CreateLinkedList([]int{1, 2, 3})
	fmt.Printf("\nTest 5 Input:  %v\n", LinkedListToArray(ll5))
	result5 := MiddleNode(ll5)
	fmt.Printf("Test 5 Output: %d\n", result5.Value)
	fmt.Println("Test 5 Expected: 2")

	// Test 6: Longer list with odd count
	ll6 := CreateLinkedList([]int{1, 2, 3, 4, 5, 6, 7, 8, 9})
	fmt.Printf("\nTest 6 Input:  %v\n", LinkedListToArray(ll6))
	result6 := MiddleNode(ll6)
	fmt.Printf("Test 6 Output: %d\n", result6.Value)
	fmt.Println("Test 6 Expected: 5")

	// Test 7: Longer list with even count
	ll7 := CreateLinkedList([]int{1, 2, 3, 4, 5, 6, 7, 8})
	fmt.Printf("\nTest 7 Input:  %v\n", LinkedListToArray(ll7))
	result7 := MiddleNode(ll7)
	fmt.Printf("Test 7 Output: %d\n", result7.Value)
	fmt.Println("Test 7 Expected: 5")

	fmt.Println("\nAll tests completed!")
}
