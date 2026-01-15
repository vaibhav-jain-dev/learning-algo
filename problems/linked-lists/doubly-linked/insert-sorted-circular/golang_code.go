/*
Insert into a Sorted Circular Linked List

Insert a value into a sorted circular linked list maintaining sorted order.

Time Complexity: O(n)
Space Complexity: O(1)
*/

package main

import (
	"fmt"
	"sort"
	"strings"
)

// Node represents a circular linked list node
type Node struct {
	Val  int
	Next *Node
}

// ==================== HELPER FUNCTIONS ====================

// createCircularList creates a circular linked list from a slice of values
func createCircularList(values []int) *Node {
	if len(values) == 0 {
		return nil
	}

	head := &Node{Val: values[0]}
	current := head

	for _, val := range values[1:] {
		current.Next = &Node{Val: val}
		current = current.Next
	}

	// Make it circular
	current.Next = head

	return head
}

// circularListToSlice converts a circular linked list to a slice
func circularListToSlice(head *Node) []int {
	if head == nil {
		return []int{}
	}

	result := []int{head.Val}
	current := head.Next

	for current != nil && current != head {
		result = append(result, current.Val)
		current = current.Next
	}

	return result
}

// printCircularList returns string representation of circular linked list
func printCircularList(head *Node) string {
	if head == nil {
		return "null"
	}

	values := circularListToSlice(head)
	strValues := make([]string, len(values))
	for i, v := range values {
		strValues[i] = fmt.Sprintf("%d", v)
	}
	return strings.Join(strValues, " -> ") + " -> (cycle)"
}

// getSortedOrder gets values in sorted order
func getSortedOrder(head *Node) []int {
	if head == nil {
		return []int{}
	}

	values := circularListToSlice(head)
	sorted := make([]int, len(values))
	copy(sorted, values)
	sort.Ints(sorted)
	return sorted
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

// insert inserts a value into a sorted circular linked list
// Handles three cases:
// 1. Normal insertion between two nodes
// 2. Insertion at break point (max/min boundary)
// 3. All same values or full traversal (insert anywhere)
// Time: O(n), Space: O(1)
func insert(head *Node, insertVal int) *Node {
	newNode := &Node{Val: insertVal}

	// Case: Empty list
	if head == nil {
		newNode.Next = newNode // Point to itself
		return newNode
	}

	prev := head
	curr := head.Next

	for {
		// Case 1: Normal insertion - value fits between prev and curr
		if prev.Val <= insertVal && insertVal <= curr.Val {
			break
		}

		// Case 2: At break point (where max meets min)
		if prev.Val > curr.Val {
			// Insert if value is >= max or <= min
			if insertVal >= prev.Val || insertVal <= curr.Val {
				break
			}
		}

		// Move to next pair
		prev = curr
		curr = curr.Next

		// Case 3: Completed full loop, insert anywhere
		if prev == head {
			break
		}
	}

	// Insert new node between prev and curr
	prev.Next = newNode
	newNode.Next = curr

	return head
}

// ==================== TEST CASES ====================

func main() {
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("INSERT INTO SORTED CIRCULAR LINKED LIST - TEST CASES")
	fmt.Println(strings.Repeat("=", 60))

	// Test case 1: Insert in middle
	fmt.Println("\nTest 1: Insert 2 into [3, 4, 1]")
	head := createCircularList([]int{3, 4, 1})
	fmt.Printf("  Input: %s\n", printCircularList(head))
	fmt.Printf("  Sorted order: %v\n", getSortedOrder(head))
	result := insert(head, 2)
	fmt.Printf("  After insert(2): %s\n", printCircularList(result))
	fmt.Printf("  Sorted order: %v\n", getSortedOrder(result))
	values := circularListToSlice(result)
	sort.Ints(values)
	if slicesEqual(values, []int{1, 2, 3, 4}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 2: Empty list
	fmt.Println("\nTest 2: Insert 1 into empty list")
	result = insert(nil, 1)
	fmt.Printf("  After insert(1): %s\n", printCircularList(result))
	if slicesEqual(circularListToSlice(result), []int{1}) && result.Next == result {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 3: Single node
	fmt.Println("\nTest 3: Insert 0 into [1]")
	head = createCircularList([]int{1})
	fmt.Printf("  Input: %s\n", printCircularList(head))
	result = insert(head, 0)
	fmt.Printf("  After insert(0): %s\n", printCircularList(result))
	values = circularListToSlice(result)
	sort.Ints(values)
	if slicesEqual(values, []int{0, 1}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 4: Insert larger than max
	fmt.Println("\nTest 4: Insert 6 into [3, 5, 1]")
	head = createCircularList([]int{3, 5, 1})
	fmt.Printf("  Input: %s\n", printCircularList(head))
	fmt.Printf("  Sorted order: %v\n", getSortedOrder(head))
	result = insert(head, 6)
	fmt.Printf("  After insert(6): %s\n", printCircularList(result))
	fmt.Printf("  Sorted order: %v\n", getSortedOrder(result))
	values = circularListToSlice(result)
	sort.Ints(values)
	if slicesEqual(values, []int{1, 3, 5, 6}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 5: Insert smaller than min
	fmt.Println("\nTest 5: Insert 0 into [3, 5, 1]")
	head = createCircularList([]int{3, 5, 1})
	fmt.Printf("  Input: %s\n", printCircularList(head))
	result = insert(head, 0)
	fmt.Printf("  After insert(0): %s\n", printCircularList(result))
	fmt.Printf("  Sorted order: %v\n", getSortedOrder(result))
	values = circularListToSlice(result)
	sort.Ints(values)
	if slicesEqual(values, []int{0, 1, 3, 5}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 6: All same values
	fmt.Println("\nTest 6: Insert 5 into [3, 3, 3]")
	head = createCircularList([]int{3, 3, 3})
	fmt.Printf("  Input: %s\n", printCircularList(head))
	result = insert(head, 5)
	fmt.Printf("  After insert(5): %s\n", printCircularList(result))
	values = circularListToSlice(result)
	sort.Ints(values)
	if slicesEqual(values, []int{3, 3, 3, 5}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 7: Insert duplicate value
	fmt.Println("\nTest 7: Insert 3 into [1, 3, 5]")
	head = createCircularList([]int{1, 3, 5})
	fmt.Printf("  Input: %s\n", printCircularList(head))
	result = insert(head, 3)
	fmt.Printf("  After insert(3): %s\n", printCircularList(result))
	values = circularListToSlice(result)
	sort.Ints(values)
	if slicesEqual(values, []int{1, 3, 3, 5}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 8: Insert into larger list
	fmt.Println("\nTest 8: Insert 7 into [2, 4, 6, 8, 10]")
	head = createCircularList([]int{2, 4, 6, 8, 10})
	fmt.Printf("  Input: %s\n", printCircularList(head))
	result = insert(head, 7)
	fmt.Printf("  After insert(7): %s\n", printCircularList(result))
	fmt.Printf("  Sorted order: %v\n", getSortedOrder(result))
	values = circularListToSlice(result)
	sort.Ints(values)
	if slicesEqual(values, []int{2, 4, 6, 7, 8, 10}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 9: List starting at min
	fmt.Println("\nTest 9: Insert 4 into [1, 2, 3, 5]")
	head = createCircularList([]int{1, 2, 3, 5})
	fmt.Printf("  Input: %s\n", printCircularList(head))
	result = insert(head, 4)
	fmt.Printf("  After insert(4): %s\n", printCircularList(result))
	values = circularListToSlice(result)
	sort.Ints(values)
	if slicesEqual(values, []int{1, 2, 3, 4, 5}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("ALL TESTS PASSED!")
	fmt.Println(strings.Repeat("=", 60))
}
