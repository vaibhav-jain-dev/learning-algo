/*
Flatten a Multilevel Doubly Linked List - Go Solutions

Flatten a multilevel doubly linked list where nodes have child pointers.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// Node represents a node in a multilevel doubly linked list
type Node struct {
	Val   int
	Prev  *Node
	Next  *Node
	Child *Node
}

// ============================================================================
// APPROACH 1: Iterative with Stack - RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - visit each node once
// Space Complexity: O(depth) - stack stores nodes with children
//
// WHY THIS IS BEST:
// - Clear iterative logic
// - Stack naturally handles nesting
// - Easy to trace execution
// ============================================================================

// FlattenWithStack flattens the list using a stack.
//
// Key Insight: When we see a child, push 'next' to stack, process child.
// When we reach the end, pop from stack to continue.
//
// Visual:
//
//	1 -- 2 -- 3 -- 4        Stack: []
//	          |
//	          7 -- 8
//
//	At 3: push 4 to stack, go to 7
//	1 -- 2 -- 3 -- 7 -- 8   Stack: [4]
//
//	At 8: pop 4, connect
//	1 -- 2 -- 3 -- 7 -- 8 -- 4
func FlattenWithStack(head *Node) *Node {
	if head == nil {
		return nil
	}

	// Stack to save nodes to revisit
	stack := []*Node{}
	current := head

	for current != nil {
		// If current has a child, process it
		if current.Child != nil {
			// Save next to stack if it exists
			if current.Next != nil {
				stack = append(stack, current.Next)
			}

			// Connect current to child
			current.Next = current.Child
			current.Child.Prev = current
			current.Child = nil // Clear child pointer
		}

		// If no next but stack has nodes, pop and connect
		if current.Next == nil && len(stack) > 0 {
			next := stack[len(stack)-1]
			stack = stack[:len(stack)-1]

			current.Next = next
			next.Prev = current
		}

		current = current.Next
	}

	return head
}

// ============================================================================
// APPROACH 2: Iterative without Stack
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1) - no extra data structures
//
// WHEN TO USE:
// - When space is critical
// - Slightly more complex logic
// ============================================================================

// FlattenNoStack flattens without using a stack.
//
// Key Insight: When we find a child, find the tail of child list,
// then connect: current -> child, tail -> current.next
func FlattenNoStack(head *Node) *Node {
	if head == nil {
		return nil
	}

	current := head

	for current != nil {
		if current.Child != nil {
			// Find the tail of the child list
			tail := current.Child
			for tail.Next != nil {
				tail = tail.Next
			}

			// Save next
			next := current.Next

			// Connect current to child
			current.Next = current.Child
			current.Child.Prev = current
			current.Child = nil

			// Connect tail to saved next
			if next != nil {
				tail.Next = next
				next.Prev = tail
			}
		}

		current = current.Next
	}

	return head
}

// ============================================================================
// APPROACH 3: Recursive DFS
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(depth) - recursion stack
//
// WHEN TO USE:
// - When recursive thinking is preferred
// - Elegant handling of nested structure
// ============================================================================

// FlattenRecursive uses recursive DFS to flatten.
func FlattenRecursive(head *Node) *Node {
	if head == nil {
		return nil
	}

	// Helper returns the tail of the flattened list
	var flatten func(node *Node) *Node
	flatten = func(node *Node) *Node {
		var tail *Node

		for node != nil {
			next := node.Next

			if node.Child != nil {
				// Recursively flatten child
				childTail := flatten(node.Child)

				// Connect node to child
				node.Next = node.Child
				node.Child.Prev = node
				node.Child = nil

				// Connect child tail to next
				if next != nil {
					childTail.Next = next
					next.Prev = childTail
				}

				tail = childTail
			} else {
				tail = node
			}

			node = next
		}

		return tail
	}

	flatten(head)
	return head
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// createMultilevelList creates a test multilevel list
// Format: each level is a slice, with child indices marked
func createTestList() *Node {
	// Create: 1-2-3-4-5-6 with 3->7-8-9-10 and 8->11-12

	// Level 1
	n1 := &Node{Val: 1}
	n2 := &Node{Val: 2}
	n3 := &Node{Val: 3}
	n4 := &Node{Val: 4}
	n5 := &Node{Val: 5}
	n6 := &Node{Val: 6}

	n1.Next = n2
	n2.Prev = n1
	n2.Next = n3
	n3.Prev = n2
	n3.Next = n4
	n4.Prev = n3
	n4.Next = n5
	n5.Prev = n4
	n5.Next = n6
	n6.Prev = n5

	// Level 2
	n7 := &Node{Val: 7}
	n8 := &Node{Val: 8}
	n9 := &Node{Val: 9}
	n10 := &Node{Val: 10}

	n7.Next = n8
	n8.Prev = n7
	n8.Next = n9
	n9.Prev = n8
	n9.Next = n10
	n10.Prev = n9

	n3.Child = n7

	// Level 3
	n11 := &Node{Val: 11}
	n12 := &Node{Val: 12}

	n11.Next = n12
	n12.Prev = n11

	n8.Child = n11

	return n1
}

func createSimpleList() *Node {
	// 1-2 with 1->3
	n1 := &Node{Val: 1}
	n2 := &Node{Val: 2}
	n3 := &Node{Val: 3}

	n1.Next = n2
	n2.Prev = n1
	n1.Child = n3

	return n1
}

func listToSlice(head *Node) []int {
	var result []int
	for head != nil {
		result = append(result, head.Val)
		head = head.Next
	}
	return result
}

func printList(head *Node) {
	if head == nil {
		fmt.Println("empty")
		return
	}

	for head != nil {
		fmt.Printf("%d", head.Val)
		if head.Next != nil {
			fmt.Print(" <-> ")
		}
		head = head.Next
	}
	fmt.Println()
}

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

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("FLATTEN MULTILEVEL DOUBLY LINKED LIST - TEST RESULTS")
	fmt.Println("======================================================================")

	approaches := []struct {
		name string
		fn   func(*Node) *Node
	}{
		{"Stack-based (Recommended)", FlattenWithStack},
		{"No Stack", FlattenNoStack},
		{"Recursive", FlattenRecursive},
	}

	testCases := []struct {
		createFn func() *Node
		expected []int
		desc     string
	}{
		{createTestList, []int{1, 2, 3, 7, 8, 11, 12, 9, 10, 4, 5, 6}, "Standard 3-level"},
		{createSimpleList, []int{1, 3, 2}, "Simple with child"},
		{func() *Node { return nil }, []int{}, "Empty list"},
		{func() *Node { return &Node{Val: 1} }, []int{1}, "Single node"},
	}

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			head := tc.createFn()
			result := approach.fn(head)
			resultSlice := listToSlice(result)

			passed := slicesEqual(resultSlice, tc.expected)
			status := "PASS"
			if !passed {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  [%s] %s\n", status, tc.desc)
			fmt.Printf("         Expected: %v\n", tc.expected)
			fmt.Printf("         Got:      %v\n", resultSlice)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		}
	}

	// Visual demonstration
	fmt.Println("\n======================================================================")
	fmt.Println("VISUAL DEMONSTRATION")
	fmt.Println("======================================================================")

	fmt.Println("\nBefore flattening (conceptual):")
	fmt.Println("  1 <-> 2 <-> 3 <-> 4 <-> 5 <-> 6")
	fmt.Println("              |")
	fmt.Println("              7 <-> 8 <-> 9 <-> 10")
	fmt.Println("                    |")
	fmt.Println("                    11 <-> 12")

	demo := createTestList()
	result := FlattenWithStack(demo)
	fmt.Print("\nAfter flattening: ")
	printList(result)
}
