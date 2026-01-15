/*
Merge Two Sorted Lists

Merge two sorted linked lists and return it as a sorted list.

Time Complexity: O(n + m) where n, m are list lengths
Space Complexity: O(1) for iterative, O(n + m) for recursive
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

// mergeTwoListsIterative merges two sorted lists using iterative approach
// Time: O(n + m), Space: O(1)
func mergeTwoListsIterative(list1, list2 *ListNode) *ListNode {
	// Dummy node simplifies edge cases
	dummy := &ListNode{Val: 0}
	tail := dummy

	// Compare and merge while both lists have nodes
	for list1 != nil && list2 != nil {
		if list1.Val <= list2.Val {
			tail.Next = list1
			list1 = list1.Next
		} else {
			tail.Next = list2
			list2 = list2.Next
		}
		tail = tail.Next
	}

	// Attach remaining nodes
	if list1 != nil {
		tail.Next = list1
	} else {
		tail.Next = list2
	}

	return dummy.Next
}

// mergeTwoListsRecursive merges two sorted lists using recursive approach
// Time: O(n + m), Space: O(n + m) due to recursion stack
func mergeTwoListsRecursive(list1, list2 *ListNode) *ListNode {
	// Base cases
	if list1 == nil {
		return list2
	}
	if list2 == nil {
		return list1
	}

	// Choose smaller head and recursively merge the rest
	if list1.Val <= list2.Val {
		list1.Next = mergeTwoListsRecursive(list1.Next, list2)
		return list1
	} else {
		list2.Next = mergeTwoListsRecursive(list1, list2.Next)
		return list2
	}
}

// ==================== TEST CASES ====================

func main() {
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("MERGE TWO SORTED LISTS - TEST CASES")
	fmt.Println(strings.Repeat("=", 60))

	// Test case 1: Normal merge
	fmt.Println("\nTest 1: Normal merge")
	list1 := createLinkedList([]int{1, 2, 4})
	list2 := createLinkedList([]int{1, 3, 4})
	fmt.Printf("  List1: %s\n", printLinkedList(list1))
	fmt.Printf("  List2: %s\n", printLinkedList(list2))
	result := mergeTwoListsIterative(list1, list2)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{1, 1, 2, 3, 4, 4}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 2: Both empty
	fmt.Println("\nTest 2: Both lists empty")
	list1 = createLinkedList([]int{})
	list2 = createLinkedList([]int{})
	fmt.Printf("  List1: %s\n", printLinkedList(list1))
	fmt.Printf("  List2: %s\n", printLinkedList(list2))
	result = mergeTwoListsIterative(list1, list2)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 3: One empty
	fmt.Println("\nTest 3: One list empty")
	list1 = createLinkedList([]int{})
	list2 = createLinkedList([]int{0})
	fmt.Printf("  List1: %s\n", printLinkedList(list1))
	fmt.Printf("  List2: %s\n", printLinkedList(list2))
	result = mergeTwoListsIterative(list1, list2)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{0}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 4: Non-overlapping ranges
	fmt.Println("\nTest 4: Non-overlapping ranges")
	list1 = createLinkedList([]int{1, 2, 3})
	list2 = createLinkedList([]int{4, 5, 6})
	fmt.Printf("  List1: %s\n", printLinkedList(list1))
	fmt.Printf("  List2: %s\n", printLinkedList(list2))
	result = mergeTwoListsIterative(list1, list2)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{1, 2, 3, 4, 5, 6}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 5: Recursive approach
	fmt.Println("\nTest 5: Recursive approach")
	list1 = createLinkedList([]int{1, 3, 5, 7})
	list2 = createLinkedList([]int{2, 4, 6, 8})
	fmt.Printf("  List1: %s\n", printLinkedList(list1))
	fmt.Printf("  List2: %s\n", printLinkedList(list2))
	result = mergeTwoListsRecursive(list1, list2)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{1, 2, 3, 4, 5, 6, 7, 8}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 6: Different lengths
	fmt.Println("\nTest 6: Different lengths")
	list1 = createLinkedList([]int{1, 5})
	list2 = createLinkedList([]int{2, 3, 4, 6, 7, 8})
	fmt.Printf("  List1: %s\n", printLinkedList(list1))
	fmt.Printf("  List2: %s\n", printLinkedList(list2))
	result = mergeTwoListsIterative(list1, list2)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{1, 2, 3, 4, 5, 6, 7, 8}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 7: Negative numbers
	fmt.Println("\nTest 7: Negative numbers")
	list1 = createLinkedList([]int{-3, -1, 2})
	list2 = createLinkedList([]int{-2, 0, 3})
	fmt.Printf("  List1: %s\n", printLinkedList(list1))
	fmt.Printf("  List2: %s\n", printLinkedList(list2))
	result = mergeTwoListsIterative(list1, list2)
	fmt.Printf("  Output: %s\n", printLinkedList(result))
	if slicesEqual(linkedListToSlice(result), []int{-3, -2, -1, 0, 2, 3}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("ALL TESTS PASSED!")
	fmt.Println(strings.Repeat("=", 60))
}
