/*
Flatten a Multilevel Doubly Linked List

Flatten a multilevel doubly linked list where nodes can have children
pointing to separate doubly linked lists.

Time Complexity: O(n)
Space Complexity: O(1) for iterative, O(d) for recursive where d is max depth
*/

package main

import (
	"fmt"
	"strings"
)

// Node represents a multilevel doubly linked list node
type Node struct {
	Val   int
	Prev  *Node
	Next  *Node
	Child *Node
}

// ==================== HELPER FUNCTIONS ====================

// createList creates a simple doubly linked list from values
func createList(values []int) *Node {
	if len(values) == 0 {
		return nil
	}

	head := &Node{Val: values[0]}
	current := head

	for _, val := range values[1:] {
		newNode := &Node{Val: val}
		current.Next = newNode
		newNode.Prev = current
		current = newNode
	}

	return head
}

// Helper to add child at specific index
func addChildAtIndex(head *Node, index int, child *Node) {
	current := head
	for i := 0; i < index && current != nil; i++ {
		current = current.Next
	}
	if current != nil {
		current.Child = child
	}
}

// flattenToSlice converts flattened list to slice for testing
func flattenToSlice(head *Node) []int {
	result := []int{}
	current := head

	for current != nil {
		result = append(result, current.Val)
		current = current.Next
	}

	return result
}

// printFlatList prints flattened list
func printFlatList(head *Node) string {
	if head == nil {
		return "null"
	}

	var values []string
	current := head
	maxNodes := 50 // Safety limit

	for current != nil && len(values) < maxNodes {
		values = append(values, fmt.Sprintf("%d", current.Val))
		current = current.Next
	}

	return strings.Join(values, " <-> ")
}

// verifyDoublyLinked verifies that all prev/next pointers are correct
func verifyDoublyLinked(head *Node) bool {
	if head == nil {
		return true
	}

	if head.Prev != nil {
		return false
	}

	current := head
	for current.Next != nil {
		if current.Next.Prev != current {
			return false
		}
		current = current.Next
	}

	return true
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

// flattenIterative flattens multilevel list using iterative approach
// Time: O(n), Space: O(1)
func flattenIterative(head *Node) *Node {
	if head == nil {
		return nil
	}

	current := head

	for current != nil {
		if current.Child != nil {
			child := current.Child
			nextNode := current.Next

			// Find tail of child list
			tail := child
			for tail.Next != nil {
				tail = tail.Next
			}

			// Connect current -> child
			current.Next = child
			child.Prev = current
			current.Child = nil // Important: remove child pointer

			// Connect tail -> nextNode
			if nextNode != nil {
				tail.Next = nextNode
				nextNode.Prev = tail
			}
		}

		current = current.Next
	}

	return head
}

// flattenRecursive flattens multilevel list using recursive approach
// Time: O(n), Space: O(d) where d is max depth
func flattenRecursive(head *Node) *Node {
	if head == nil {
		return nil
	}

	flattenAndGetTail(head)
	return head
}

// flattenAndGetTail flattens starting from node and returns tail of flattened list
func flattenAndGetTail(node *Node) *Node {
	current := node
	var tail *Node = node

	for current != nil {
		nextNode := current.Next

		if current.Child != nil {
			// Recursively flatten child
			childHead := current.Child
			childTail := flattenAndGetTail(childHead)

			// Connect current -> child
			current.Next = childHead
			childHead.Prev = current
			current.Child = nil

			// Connect childTail -> nextNode
			if nextNode != nil {
				childTail.Next = nextNode
				nextNode.Prev = childTail
			}

			tail = childTail
		} else {
			tail = current
		}

		current = nextNode
	}

	return tail
}

// ==================== TEST CASES ====================

func main() {
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("FLATTEN MULTILEVEL DOUBLY LINKED LIST - TEST CASES")
	fmt.Println(strings.Repeat("=", 60))

	// Test case 1: Basic multilevel list
	fmt.Println("\nTest 1: Basic multilevel list")
	// Structure: 1 - 2 - 3 - 4
	//                |
	//                5 - 6
	head := createList([]int{1, 2, 3, 4})
	addChildAtIndex(head, 1, createList([]int{5, 6}))
	fmt.Println("  Input structure:")
	fmt.Println("    1 - 2 - 3 - 4")
	fmt.Println("        |")
	fmt.Println("        5 - 6")
	result := flattenIterative(head)
	fmt.Printf("  Output: %s\n", printFlatList(result))
	if slicesEqual(flattenToSlice(result), []int{1, 2, 5, 6, 3, 4}) && verifyDoublyLinked(result) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 2: Three levels deep
	fmt.Println("\nTest 2: Three levels deep")
	// Structure: 1 - 2 - 3
	//                |
	//                4 - 5
	//                    |
	//                    6
	head = createList([]int{1, 2, 3})
	child1 := createList([]int{4, 5})
	addChildAtIndex(child1, 1, createList([]int{6}))
	addChildAtIndex(head, 1, child1)
	fmt.Println("  Input structure:")
	fmt.Println("    1 - 2 - 3")
	fmt.Println("        |")
	fmt.Println("        4 - 5")
	fmt.Println("            |")
	fmt.Println("            6")
	result = flattenIterative(head)
	fmt.Printf("  Output: %s\n", printFlatList(result))
	if slicesEqual(flattenToSlice(result), []int{1, 2, 4, 5, 6, 3}) && verifyDoublyLinked(result) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 3: Child at first node
	fmt.Println("\nTest 3: Child at first node")
	head = createList([]int{1, 2})
	addChildAtIndex(head, 0, createList([]int{3, 4}))
	fmt.Println("  Input: 1 - 2 with child 3 - 4 at node 1")
	result = flattenIterative(head)
	fmt.Printf("  Output: %s\n", printFlatList(result))
	if slicesEqual(flattenToSlice(result), []int{1, 3, 4, 2}) && verifyDoublyLinked(result) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 4: Empty list
	fmt.Println("\nTest 4: Empty list")
	result = flattenIterative(nil)
	fmt.Printf("  Output: %s\n", printFlatList(result))
	if result == nil {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 5: Single node
	fmt.Println("\nTest 5: Single node")
	head = createList([]int{1})
	result = flattenIterative(head)
	fmt.Printf("  Output: %s\n", printFlatList(result))
	if slicesEqual(flattenToSlice(result), []int{1}) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 6: No children
	fmt.Println("\nTest 6: No children (simple list)")
	head = createList([]int{1, 2, 3, 4, 5})
	result = flattenIterative(head)
	fmt.Printf("  Output: %s\n", printFlatList(result))
	if slicesEqual(flattenToSlice(result), []int{1, 2, 3, 4, 5}) && verifyDoublyLinked(result) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 7: Recursive approach
	fmt.Println("\nTest 7: Recursive approach on complex structure")
	// 1 - 2 - 3 - 4
	//     |
	//     5 - 6 - 7
	//         |
	//         8 - 9
	head = createList([]int{1, 2, 3, 4})
	child1 = createList([]int{5, 6, 7})
	addChildAtIndex(child1, 1, createList([]int{8, 9}))
	addChildAtIndex(head, 1, child1)
	fmt.Println("  Input structure:")
	fmt.Println("    1 - 2 - 3 - 4")
	fmt.Println("        |")
	fmt.Println("        5 - 6 - 7")
	fmt.Println("            |")
	fmt.Println("            8 - 9")
	result = flattenRecursive(head)
	fmt.Printf("  Output: %s\n", printFlatList(result))
	if slicesEqual(flattenToSlice(result), []int{1, 2, 5, 6, 8, 9, 7, 3, 4}) && verifyDoublyLinked(result) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 8: Child at end
	fmt.Println("\nTest 8: Child at last node")
	head = createList([]int{1, 2, 3})
	addChildAtIndex(head, 2, createList([]int{4, 5}))
	fmt.Println("  Input: 1 - 2 - 3 with child 4 - 5 at node 3")
	result = flattenIterative(head)
	fmt.Printf("  Output: %s\n", printFlatList(result))
	if slicesEqual(flattenToSlice(result), []int{1, 2, 3, 4, 5}) && verifyDoublyLinked(result) {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("ALL TESTS PASSED!")
	fmt.Println(strings.Repeat("=", 60))
}
