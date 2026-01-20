/*
Sum of Linked Lists - Go Solution

Add two numbers represented as linked lists (digits in reverse order).

Time Complexity: O(max(n, m))
Space Complexity: O(max(n, m))
*/

package main

import "fmt"

// LinkedList represents a node in a singly linked list
type LinkedList struct {
	Value int
	Next  *LinkedList
}

// SumOfLinkedLists adds two numbers represented as linked lists
// Digits are stored in reverse order (least significant first)
func SumOfLinkedLists(linkedListOne, linkedListTwo *LinkedList) *LinkedList {
	// Dummy head simplifies edge cases
	dummyHead := &LinkedList{Value: 0}
	current := dummyHead
	carry := 0

	// Traverse both lists
	nodeOne := linkedListOne
	nodeTwo := linkedListTwo

	for nodeOne != nil || nodeTwo != nil || carry > 0 {
		// Get values (0 if list exhausted)
		valueOne := 0
		valueTwo := 0

		if nodeOne != nil {
			valueOne = nodeOne.Value
		}
		if nodeTwo != nil {
			valueTwo = nodeTwo.Value
		}

		// Calculate sum and carry
		total := valueOne + valueTwo + carry
		carry = total / 10
		digit := total % 10

		// Create new node for this digit
		current.Next = &LinkedList{Value: digit}
		current = current.Next

		// Move to next nodes
		if nodeOne != nil {
			nodeOne = nodeOne.Next
		}
		if nodeTwo != nil {
			nodeTwo = nodeTwo.Next
		}
	}

	return dummyHead.Next
}

// SumOfLinkedListsRecursive is a recursive approach to sum linked lists
func SumOfLinkedListsRecursive(nodeOne, nodeTwo *LinkedList, carry int) *LinkedList {
	// Base case: both lists exhausted and no carry
	if nodeOne == nil && nodeTwo == nil && carry == 0 {
		return nil
	}

	// Get values
	valueOne := 0
	valueTwo := 0

	if nodeOne != nil {
		valueOne = nodeOne.Value
	}
	if nodeTwo != nil {
		valueTwo = nodeTwo.Value
	}

	// Calculate sum
	total := valueOne + valueTwo + carry
	newCarry := total / 10
	digit := total % 10

	// Create result node
	result := &LinkedList{Value: digit}

	// Get next nodes
	var nextOne, nextTwo *LinkedList
	if nodeOne != nil {
		nextOne = nodeOne.Next
	}
	if nodeTwo != nil {
		nextTwo = nodeTwo.Next
	}

	// Recurse for next digit
	result.Next = SumOfLinkedListsRecursive(nextOne, nextTwo, newCarry)

	return result
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

// LinkedListToNumber converts linked list to actual number (for verification)
func LinkedListToNumber(head *LinkedList) int {
	result := 0
	multiplier := 1
	current := head
	for current != nil {
		result += current.Value * multiplier
		multiplier *= 10
		current = current.Next
	}
	return result
}

func main() {
	// Test 1: 1742 + 549 = 2291
	ll1 := CreateLinkedList([]int{2, 4, 7, 1}) // 1742
	ll2 := CreateLinkedList([]int{9, 4, 5})    // 549
	fmt.Printf("Test 1: %d + %d\n", LinkedListToNumber(ll1), LinkedListToNumber(ll2))
	result1 := SumOfLinkedLists(ll1, ll2)
	fmt.Printf("  Output: %v = %d\n", LinkedListToArray(result1), LinkedListToNumber(result1))
	// Expected: [1, 9, 2, 2] = 2291

	// Test 2: 999 + 1 = 1000 (carry propagation)
	ll3 := CreateLinkedList([]int{9, 9, 9}) // 999
	ll4 := CreateLinkedList([]int{1})       // 1
	fmt.Printf("\nTest 2: %d + %d\n", LinkedListToNumber(ll3), LinkedListToNumber(ll4))
	result2 := SumOfLinkedLists(ll3, ll4)
	fmt.Printf("  Output: %v = %d\n", LinkedListToArray(result2), LinkedListToNumber(result2))
	// Expected: [0, 0, 0, 1] = 1000

	// Test 3: 365 + 248 = 613
	ll5 := CreateLinkedList([]int{5, 6, 3}) // 365
	ll6 := CreateLinkedList([]int{8, 4, 2}) // 248
	fmt.Printf("\nTest 3: %d + %d\n", LinkedListToNumber(ll5), LinkedListToNumber(ll6))
	result3 := SumOfLinkedLists(ll5, ll6)
	fmt.Printf("  Output: %v = %d\n", LinkedListToArray(result3), LinkedListToNumber(result3))
	// Expected: [3, 1, 6] = 613

	// Test 4: Different length lists - 9999 + 1 = 10000
	ll7 := CreateLinkedList([]int{9, 9, 9, 9}) // 9999
	ll8 := CreateLinkedList([]int{1})          // 1
	fmt.Printf("\nTest 4: %d + %d\n", LinkedListToNumber(ll7), LinkedListToNumber(ll8))
	result4 := SumOfLinkedLists(ll7, ll8)
	fmt.Printf("  Output: %v = %d\n", LinkedListToArray(result4), LinkedListToNumber(result4))
	// Expected: [0, 0, 0, 0, 1] = 10000

	// Test 5: Single digits - 5 + 5 = 10
	ll9 := CreateLinkedList([]int{5})
	ll10 := CreateLinkedList([]int{5})
	fmt.Printf("\nTest 5: %d + %d\n", LinkedListToNumber(ll9), LinkedListToNumber(ll10))
	result5 := SumOfLinkedLists(ll9, ll10)
	fmt.Printf("  Output: %v = %d\n", LinkedListToArray(result5), LinkedListToNumber(result5))
	// Expected: [0, 1] = 10

	// Test 6: Recursive approach - 123 + 456 = 579
	ll11 := CreateLinkedList([]int{3, 2, 1}) // 123
	ll12 := CreateLinkedList([]int{6, 5, 4}) // 456
	fmt.Printf("\nTest 6 (Recursive): %d + %d\n", LinkedListToNumber(ll11), LinkedListToNumber(ll12))
	result6 := SumOfLinkedListsRecursive(ll11, ll12, 0)
	fmt.Printf("  Output: %v = %d\n", LinkedListToArray(result6), LinkedListToNumber(result6))
	// Expected: [9, 7, 5] = 579

	fmt.Println("\nAll tests completed!")
}
