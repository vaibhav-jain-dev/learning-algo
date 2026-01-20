/*
Rearrange Linked List - Go Solution

Partition a linked list around a value k, preserving relative order.

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

// RearrangeLinkedList rearranges the list so all nodes < k come before
// nodes = k, which come before nodes > k.
// Preserves relative order within each group.
func RearrangeLinkedList(head *LinkedList, k int) *LinkedList {
	if head == nil {
		return nil
	}

	// Create dummy heads for three chains
	lessHead := &LinkedList{Value: 0}    // Nodes with value < k
	equalHead := &LinkedList{Value: 0}   // Nodes with value == k
	greaterHead := &LinkedList{Value: 0} // Nodes with value > k

	// Tail pointers for each chain
	lessTail := lessHead
	equalTail := equalHead
	greaterTail := greaterHead

	// Traverse and partition
	current := head
	for current != nil {
		if current.Value < k {
			lessTail.Next = current
			lessTail = lessTail.Next
		} else if current.Value == k {
			equalTail.Next = current
			equalTail = equalTail.Next
		} else { // current.Value > k
			greaterTail.Next = current
			greaterTail = greaterTail.Next
		}

		current = current.Next
	}

	// Connect the three chains
	// greaterTail is the end of the final list
	greaterTail.Next = nil

	// Connect equalTail to greater chain
	equalTail.Next = greaterHead.Next

	// Connect lessTail to equal chain
	lessTail.Next = equalHead.Next

	// Return head of the less chain (skip dummy)
	return lessHead.Next
}

// RearrangeLinkedListTwoPointers is an alternative approach with two groups
func RearrangeLinkedListTwoPointers(head *LinkedList, k int) *LinkedList {
	if head == nil {
		return nil
	}

	// Two chains: smaller and greater-or-equal
	smallHead := &LinkedList{Value: 0}
	largeHead := &LinkedList{Value: 0}

	smallTail := smallHead
	largeTail := largeHead

	current := head
	for current != nil {
		if current.Value < k {
			smallTail.Next = current
			smallTail = smallTail.Next
		} else {
			largeTail.Next = current
			largeTail = largeTail.Next
		}
		current = current.Next
	}

	largeTail.Next = nil
	smallTail.Next = largeHead.Next

	return smallHead.Next
}

// RearrangeInZigzag rearranges list in zigzag pattern: a < b > c < d > e ...
func RearrangeInZigzag(head *LinkedList) *LinkedList {
	if head == nil || head.Next == nil {
		return head
	}

	current := head
	// Flag: true means current should be less than next
	shouldBeLess := true

	for current.Next != nil {
		if shouldBeLess {
			if current.Value > current.Next.Value {
				// Swap values
				current.Value, current.Next.Value = current.Next.Value, current.Value
			}
		} else {
			if current.Value < current.Next.Value {
				// Swap values
				current.Value, current.Next.Value = current.Next.Value, current.Value
			}
		}

		shouldBeLess = !shouldBeLess
		current = current.Next
	}

	return head
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
	// Test 1: Standard case
	ll1 := CreateLinkedList([]int{3, 0, 5, 2, 1, 4})
	fmt.Println("Test 1: k=3")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll1))
	result1 := RearrangeLinkedList(ll1, 3)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result1))
	// Expected: [0, 2, 1, 3, 5, 4]

	// Test 2: Multiple nodes equal to k
	ll2 := CreateLinkedList([]int{1, 4, 3, 2, 5, 2})
	fmt.Println("\nTest 2: k=3")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll2))
	result2 := RearrangeLinkedList(ll2, 3)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result2))
	// Expected: [1, 2, 2, 3, 4, 5]

	// Test 3: k not in list
	ll3 := CreateLinkedList([]int{5, 1, 8, 0})
	fmt.Println("\nTest 3: k=3 (not in list)")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll3))
	result3 := RearrangeLinkedList(ll3, 3)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result3))
	// Expected: [1, 0, 5, 8]

	// Test 4: All elements smaller than k
	ll4 := CreateLinkedList([]int{1, 2, 3, 4})
	fmt.Println("\nTest 4: k=10 (all smaller)")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll4))
	result4 := RearrangeLinkedList(ll4, 10)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result4))
	// Expected: [1, 2, 3, 4]

	// Test 5: All elements greater than k
	ll5 := CreateLinkedList([]int{5, 6, 7, 8})
	fmt.Println("\nTest 5: k=1 (all greater)")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll5))
	result5 := RearrangeLinkedList(ll5, 1)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result5))
	// Expected: [5, 6, 7, 8]

	// Test 6: Single element
	ll6 := CreateLinkedList([]int{5})
	fmt.Println("\nTest 6: Single element, k=5")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll6))
	result6 := RearrangeLinkedList(ll6, 5)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result6))
	// Expected: [5]

	// Test 7: Two elements
	ll7 := CreateLinkedList([]int{5, 1})
	fmt.Println("\nTest 7: Two elements, k=3")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll7))
	result7 := RearrangeLinkedList(ll7, 3)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result7))
	// Expected: [1, 5]

	// Test 8: Alternative two-pointer approach
	ll8 := CreateLinkedList([]int{3, 0, 5, 2, 1, 4})
	fmt.Println("\nTest 8 (Two-pointer): k=3")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll8))
	result8 := RearrangeLinkedListTwoPointers(ll8, 3)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result8))
	// Expected: [0, 2, 1, 3, 5, 4]

	// Test 9: Zigzag rearrangement (bonus)
	ll9 := CreateLinkedList([]int{4, 3, 7, 8, 6, 2, 1})
	fmt.Println("\nTest 9 (Zigzag):")
	fmt.Printf("  Input:  %v\n", LinkedListToArray(ll9))
	result9 := RearrangeInZigzag(ll9)
	fmt.Printf("  Output: %v\n", LinkedListToArray(result9))
	// Pattern: a < b > c < d > e ...

	fmt.Println("\nAll tests completed!")
}
