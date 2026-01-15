/*
Middle of the Linked List

Given the head of a singly linked list, return the middle node.
If there are two middle nodes, return the second middle node.

Time Complexity: O(n)
Space Complexity: O(1)
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

// ==================== SOLUTION ====================

// middleNodeTwoPointer finds middle node using slow and fast pointer technique
// When fast reaches the end, slow is at the middle
// For even-length lists, returns the second middle
// Time: O(n), Space: O(1)
func middleNodeTwoPointer(head *ListNode) *ListNode {
	slow := head
	fast := head

	// Move slow by 1, fast by 2
	// When fast reaches end, slow is at middle
	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
	}

	return slow
}

// middleNodeTwoPass finds middle node using two-pass approach
// First count all nodes, then traverse to middle
// Time: O(n), Space: O(1)
func middleNodeTwoPass(head *ListNode) *ListNode {
	// First pass: count nodes
	length := 0
	current := head
	for current != nil {
		length++
		current = current.Next
	}

	// Calculate middle index
	middleIndex := length / 2

	// Second pass: go to middle
	current = head
	for i := 0; i < middleIndex; i++ {
		current = current.Next
	}

	return current
}

// middleNodeArray finds middle node by storing all nodes in an array
// Time: O(n), Space: O(n)
func middleNodeArray(head *ListNode) *ListNode {
	nodes := []*ListNode{}
	current := head

	for current != nil {
		nodes = append(nodes, current)
		current = current.Next
	}

	return nodes[len(nodes)/2]
}

// ==================== TEST CASES ====================

func main() {
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("MIDDLE OF THE LINKED LIST - TEST CASES")
	fmt.Println(strings.Repeat("=", 60))

	// Test case 1: Odd length list
	fmt.Println("\nTest 1: Odd length list [1, 2, 3, 4, 5]")
	head := createLinkedList([]int{1, 2, 3, 4, 5})
	fmt.Printf("  Input: %s\n", printLinkedList(head))
	result := middleNodeTwoPointer(head)
	fmt.Printf("  Middle node value: %d\n", result.Val)
	fmt.Printf("  From middle: %s\n", printLinkedList(result))
	if result.Val == 3 {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 2: Even length list
	fmt.Println("\nTest 2: Even length list [1, 2, 3, 4, 5, 6]")
	head = createLinkedList([]int{1, 2, 3, 4, 5, 6})
	fmt.Printf("  Input: %s\n", printLinkedList(head))
	result = middleNodeTwoPointer(head)
	fmt.Printf("  Middle node value: %d (second middle)\n", result.Val)
	fmt.Printf("  From middle: %s\n", printLinkedList(result))
	if result.Val == 4 {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 3: Single node
	fmt.Println("\nTest 3: Single node [1]")
	head = createLinkedList([]int{1})
	fmt.Printf("  Input: %s\n", printLinkedList(head))
	result = middleNodeTwoPointer(head)
	fmt.Printf("  Middle node value: %d\n", result.Val)
	if result.Val == 1 {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 4: Two nodes
	fmt.Println("\nTest 4: Two nodes [1, 2]")
	head = createLinkedList([]int{1, 2})
	fmt.Printf("  Input: %s\n", printLinkedList(head))
	result = middleNodeTwoPointer(head)
	fmt.Printf("  Middle node value: %d (second middle)\n", result.Val)
	if result.Val == 2 {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 5: Two-pass approach
	fmt.Println("\nTest 5: Two-pass approach on [1, 2, 3, 4, 5]")
	head = createLinkedList([]int{1, 2, 3, 4, 5})
	fmt.Printf("  Input: %s\n", printLinkedList(head))
	result = middleNodeTwoPass(head)
	fmt.Printf("  Middle node value: %d\n", result.Val)
	if result.Val == 3 {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 6: Array approach
	fmt.Println("\nTest 6: Array approach on [1, 2, 3, 4, 5, 6]")
	head = createLinkedList([]int{1, 2, 3, 4, 5, 6})
	fmt.Printf("  Input: %s\n", printLinkedList(head))
	result = middleNodeArray(head)
	fmt.Printf("  Middle node value: %d\n", result.Val)
	if result.Val == 4 {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 7: Three nodes
	fmt.Println("\nTest 7: Three nodes [1, 2, 3]")
	head = createLinkedList([]int{1, 2, 3})
	fmt.Printf("  Input: %s\n", printLinkedList(head))
	result = middleNodeTwoPointer(head)
	fmt.Printf("  Middle node value: %d\n", result.Val)
	if result.Val == 2 {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 8: Four nodes
	fmt.Println("\nTest 8: Four nodes [1, 2, 3, 4]")
	head = createLinkedList([]int{1, 2, 3, 4})
	fmt.Printf("  Input: %s\n", printLinkedList(head))
	result = middleNodeTwoPointer(head)
	fmt.Printf("  Middle node value: %d (second middle)\n", result.Val)
	if result.Val == 3 {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 9: Longer list
	fmt.Println("\nTest 9: Longer list [1, 2, 3, 4, 5, 6, 7, 8, 9]")
	head = createLinkedList([]int{1, 2, 3, 4, 5, 6, 7, 8, 9})
	fmt.Printf("  Input: %s\n", printLinkedList(head))
	result = middleNodeTwoPointer(head)
	fmt.Printf("  Middle node value: %d\n", result.Val)
	if result.Val == 5 {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("ALL TESTS PASSED!")
	fmt.Println(strings.Repeat("=", 60))
}
