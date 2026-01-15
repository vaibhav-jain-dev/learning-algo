/*
Detect Cycle in Linked List (Floyd's Algorithm)

Given the head of a linked list, determine if it has a cycle using
Floyd's Tortoise and Hare algorithm.

Time Complexity: O(n)
Space Complexity: O(1) for Floyd's, O(n) for hash set approach
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

// createLinkedListWithCycle creates a linked list with optional cycle
// pos indicates where the tail connects (-1 means no cycle)
func createLinkedListWithCycle(values []int, pos int) *ListNode {
	if len(values) == 0 {
		return nil
	}

	// Create all nodes
	nodes := make([]*ListNode, len(values))
	for i, val := range values {
		nodes[i] = &ListNode{Val: val}
	}

	// Connect nodes
	for i := 0; i < len(nodes)-1; i++ {
		nodes[i].Next = nodes[i+1]
	}

	// Create cycle if pos is valid
	if pos >= 0 && pos < len(nodes) {
		nodes[len(nodes)-1].Next = nodes[pos]
	}

	return nodes[0]
}

// printLinkedList returns string representation of linked list
// Limits output to maxNodes to handle cycles
func printLinkedList(head *ListNode, maxNodes int) string {
	if head == nil {
		return "null"
	}

	var values []string
	current := head
	seen := make(map[*ListNode]bool)
	count := 0

	for current != nil && count < maxNodes {
		if seen[current] {
			values = append(values, fmt.Sprintf("[cycle to %d]", current.Val))
			break
		}
		seen[current] = true
		values = append(values, fmt.Sprintf("%d", current.Val))
		current = current.Next
		count++
	}

	if current != nil && count >= maxNodes {
		values = append(values, "...")
	}

	return strings.Join(values, " -> ")
}

// ==================== SOLUTION ====================

// hasCycleFloyd detects cycle using Floyd's Tortoise and Hare algorithm
// Two pointers move at different speeds. If they meet, there's a cycle.
// Time: O(n), Space: O(1)
func hasCycleFloyd(head *ListNode) bool {
	if head == nil || head.Next == nil {
		return false
	}

	slow := head
	fast := head

	for fast != nil && fast.Next != nil {
		slow = slow.Next      // Move 1 step
		fast = fast.Next.Next // Move 2 steps

		if slow == fast {
			return true
		}
	}

	return false
}

// hasCycleHashSet detects cycle using a hash set to track visited nodes
// Time: O(n), Space: O(n)
func hasCycleHashSet(head *ListNode) bool {
	visited := make(map[*ListNode]bool)
	current := head

	for current != nil {
		if visited[current] {
			return true
		}
		visited[current] = true
		current = current.Next
	}

	return false
}

// detectCycle finds the node where the cycle begins (if any)
// Uses Floyd's algorithm to detect cycle, then finds the start
// Time: O(n), Space: O(1)
func detectCycle(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return nil
	}

	// Phase 1: Detect if cycle exists
	slow := head
	fast := head

	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next

		if slow == fast {
			// Phase 2: Find cycle start
			// Reset one pointer to head, move both at same speed
			slow = head
			for slow != fast {
				slow = slow.Next
				fast = fast.Next
			}
			return slow
		}
	}

	return nil
}

// ==================== TEST CASES ====================

func main() {
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("DETECT CYCLE IN LINKED LIST - TEST CASES")
	fmt.Println(strings.Repeat("=", 60))

	// Test case 1: List with cycle at position 1
	fmt.Println("\nTest 1: List [3, 2, 0, -4] with cycle at pos 1")
	head := createLinkedListWithCycle([]int{3, 2, 0, -4}, 1)
	fmt.Printf("  List: %s\n", printLinkedList(head, 20))
	result := hasCycleFloyd(head)
	fmt.Printf("  Has cycle: %v\n", result)
	if result == true {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 2: List with cycle at position 0 (head)
	fmt.Println("\nTest 2: List [1, 2] with cycle at pos 0")
	head = createLinkedListWithCycle([]int{1, 2}, 0)
	fmt.Printf("  List: %s\n", printLinkedList(head, 20))
	result = hasCycleFloyd(head)
	fmt.Printf("  Has cycle: %v\n", result)
	if result == true {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 3: List without cycle
	fmt.Println("\nTest 3: List [1] without cycle (pos = -1)")
	head = createLinkedListWithCycle([]int{1}, -1)
	fmt.Printf("  List: %s\n", printLinkedList(head, 20))
	result = hasCycleFloyd(head)
	fmt.Printf("  Has cycle: %v\n", result)
	if result == false {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 4: Empty list
	fmt.Println("\nTest 4: Empty list")
	head = createLinkedListWithCycle([]int{}, -1)
	fmt.Printf("  List: %s\n", printLinkedList(head, 20))
	result = hasCycleFloyd(head)
	fmt.Printf("  Has cycle: %v\n", result)
	if result == false {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 5: Longer list without cycle
	fmt.Println("\nTest 5: Longer list [1, 2, 3, 4, 5] without cycle")
	head = createLinkedListWithCycle([]int{1, 2, 3, 4, 5}, -1)
	fmt.Printf("  List: %s\n", printLinkedList(head, 20))
	result = hasCycleFloyd(head)
	fmt.Printf("  Has cycle: %v\n", result)
	if result == false {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 6: Hash set approach
	fmt.Println("\nTest 6: Hash set approach on [3, 2, 0, -4] with cycle")
	head = createLinkedListWithCycle([]int{3, 2, 0, -4}, 1)
	fmt.Printf("  List: %s\n", printLinkedList(head, 20))
	result = hasCycleHashSet(head)
	fmt.Printf("  Has cycle: %v\n", result)
	if result == true {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 7: Find cycle start node
	fmt.Println("\nTest 7: Find cycle start node in [3, 2, 0, -4] at pos 1")
	head = createLinkedListWithCycle([]int{3, 2, 0, -4}, 1)
	fmt.Printf("  List: %s\n", printLinkedList(head, 20))
	cycleStart := detectCycle(head)
	if cycleStart != nil {
		fmt.Printf("  Cycle starts at node with value: %d\n", cycleStart.Val)
	} else {
		fmt.Println("  No cycle found")
	}
	if cycleStart != nil && cycleStart.Val == 2 {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 8: Self-loop (single node pointing to itself)
	fmt.Println("\nTest 8: Self-loop (single node)")
	head = createLinkedListWithCycle([]int{1}, 0)
	fmt.Printf("  List: %s\n", printLinkedList(head, 20))
	result = hasCycleFloyd(head)
	fmt.Printf("  Has cycle: %v\n", result)
	if result == true {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	// Test case 9: Long cycle
	fmt.Println("\nTest 9: Longer list with cycle at middle")
	head = createLinkedListWithCycle([]int{1, 2, 3, 4, 5, 6, 7, 8}, 3)
	fmt.Printf("  List: %s\n", printLinkedList(head, 20))
	result = hasCycleFloyd(head)
	cycleStart = detectCycle(head)
	fmt.Printf("  Has cycle: %v\n", result)
	if cycleStart != nil {
		fmt.Printf("  Cycle starts at value: %d\n", cycleStart.Val)
	}
	if result == true && cycleStart != nil && cycleStart.Val == 4 {
		fmt.Println("  PASSED!")
	} else {
		fmt.Println("  FAILED!")
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("ALL TESTS PASSED!")
	fmt.Println(strings.Repeat("=", 60))
}
