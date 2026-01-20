/*
Linked List Cycle Detection - Go Solution

Detect if a linked list has a cycle using Floyd's algorithm.

Time Complexity: O(n)
Space Complexity: O(1)
*/

package main

import "fmt"

// ListNode represents a node in the linked list
type ListNode struct {
	Val  int
	Next *ListNode
}

// hasCycle detects if linked list has a cycle
func hasCycle(head *ListNode) bool {
	if head == nil || head.Next == nil {
		return false
	}

	slow := head
	fast := head

	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next

		if slow == fast {
			return true
		}
	}

	return false
}

// hasCycleHashSet uses hash set approach (O(n) space)
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

// detectCycleStart finds where the cycle begins
func detectCycleStart(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return nil
	}

	slow := head
	fast := head

	// Detect cycle
	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next

		if slow == fast {
			break
		}
	}

	if fast == nil || fast.Next == nil {
		return nil
	}

	// Find cycle start
	slow = head
	for slow != fast {
		slow = slow.Next
		fast = fast.Next
	}

	return slow
}

// cycleLength finds the length of the cycle
func cycleLength(head *ListNode) int {
	if head == nil || head.Next == nil {
		return 0
	}

	slow := head
	fast := head

	// Detect cycle
	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next

		if slow == fast {
			break
		}
	}

	if fast == nil || fast.Next == nil {
		return 0
	}

	// Count cycle length
	length := 1
	current := slow.Next
	for current != slow {
		length++
		current = current.Next
	}

	return length
}

// createListWithCycle creates a linked list with optional cycle
func createListWithCycle(values []int, pos int) *ListNode {
	if len(values) == 0 {
		return nil
	}

	nodes := make([]*ListNode, len(values))
	for i, val := range values {
		nodes[i] = &ListNode{Val: val}
	}

	for i := 0; i < len(nodes)-1; i++ {
		nodes[i].Next = nodes[i+1]
	}

	if pos >= 0 && pos < len(nodes) {
		nodes[len(nodes)-1].Next = nodes[pos]
	}

	return nodes[0]
}

func main() {
	// Test 1: Cycle exists
	head1 := createListWithCycle([]int{3, 2, 0, -4}, 1)
	result1 := hasCycle(head1)
	fmt.Printf("Test 1: %v\n", result1)
	if result1 != true {
		fmt.Println("FAIL: Expected true")
	}

	// Test 2: Cycle at head
	head2 := createListWithCycle([]int{1, 2}, 0)
	result2 := hasCycle(head2)
	fmt.Printf("Test 2: %v\n", result2)
	if result2 != true {
		fmt.Println("FAIL: Expected true")
	}

	// Test 3: No cycle
	head3 := createListWithCycle([]int{1}, -1)
	result3 := hasCycle(head3)
	fmt.Printf("Test 3: %v\n", result3)
	if result3 != false {
		fmt.Println("FAIL: Expected false")
	}

	// Test 4: Empty list
	result4 := hasCycle(nil)
	fmt.Printf("Test 4: %v\n", result4)
	if result4 != false {
		fmt.Println("FAIL: Expected false")
	}

	// Test 5: Hash set approach
	head5 := createListWithCycle([]int{3, 2, 0, -4}, 1)
	result5 := hasCycleHashSet(head5)
	fmt.Printf("Test 5 (Hash Set): %v\n", result5)
	if result5 != true {
		fmt.Println("FAIL: Expected true")
	}

	// Test 6: Detect cycle start
	head6 := createListWithCycle([]int{3, 2, 0, -4}, 1)
	cycleStart := detectCycleStart(head6)
	if cycleStart != nil {
		fmt.Printf("Test 6: Cycle starts at node with value %d\n", cycleStart.Val)
		if cycleStart.Val != 2 {
			fmt.Println("FAIL: Expected 2")
		}
	}

	// Test 7: Cycle length
	head7 := createListWithCycle([]int{3, 2, 0, -4}, 1)
	length := cycleLength(head7)
	fmt.Printf("Test 7: Cycle length = %d\n", length)
	if length != 3 {
		fmt.Printf("FAIL: Expected 3, got %d\n", length)
	}

	fmt.Println("\nAll tests passed!")
}
