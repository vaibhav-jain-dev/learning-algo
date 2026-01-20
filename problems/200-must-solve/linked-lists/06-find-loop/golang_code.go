/*
Find Loop - Go Solution

Find the node where a cycle begins in a linked list using Floyd's algorithm.

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

// FindLoop finds the node where the loop begins using Floyd's Cycle Detection
func FindLoop(head *LinkedList) *LinkedList {
	// Phase 1: Find the meeting point inside the loop
	slow := head
	fast := head

	// Move slow by 1, fast by 2 until they meet
	for {
		slow = slow.Next
		fast = fast.Next.Next

		if slow == fast {
			break // They've met inside the loop
		}
	}

	// Phase 2: Find the start of the loop
	// Reset slow to head, keep fast at meeting point
	slow = head

	// Move both by 1 until they meet at loop start
	for slow != fast {
		slow = slow.Next
		fast = fast.Next
	}

	return slow // This is the start of the loop
}

// HasCycle checks if a linked list has a cycle
func HasCycle(head *LinkedList) bool {
	if head == nil {
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

// GetLoopLength returns the number of nodes in the loop
func GetLoopLength(head *LinkedList) int {
	loopStart := FindLoop(head)

	// Count nodes in the loop
	count := 1
	current := loopStart.Next
	for current != loopStart {
		count++
		current = current.Next
	}

	return count
}

// CreateLinkedListWithLoop creates a linked list with a loop
// loopIndex: index of node that tail should point to (-1 for no loop)
func CreateLinkedListWithLoop(values []int, loopIndex int) *LinkedList {
	if len(values) == 0 {
		return nil
	}

	head := &LinkedList{Value: values[0]}
	current := head
	nodes := []*LinkedList{head}

	for _, val := range values[1:] {
		current.Next = &LinkedList{Value: val}
		current = current.Next
		nodes = append(nodes, current)
	}

	// Create the loop
	if loopIndex >= 0 {
		current.Next = nodes[loopIndex]
	}

	return head
}

// PrintListWithLoop prints linked list values with protection against infinite loop
func PrintListWithLoop(head *LinkedList, maxNodes int) {
	values := []int{}
	current := head
	seen := make(map[*LinkedList]bool)

	for current != nil && len(values) < maxNodes {
		if seen[current] {
			fmt.Printf("Values: %v -> [%d] (loop)\n", values, current.Value)
			return
		}
		seen[current] = true
		values = append(values, current.Value)
		current = current.Next
	}

	fmt.Printf("Values: %v\n", values)
}

func main() {
	// Test 1: Loop in middle - 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> [3]
	ll1 := CreateLinkedListWithLoop([]int{0, 1, 2, 3, 4, 5, 6}, 3)
	fmt.Println("Test 1:")
	PrintListWithLoop(ll1, 15)
	result1 := FindLoop(ll1)
	fmt.Printf("Loop starts at node with value: %d\n", result1.Value)
	fmt.Printf("Loop length: %d\n", GetLoopLength(ll1))
	// Expected: 3, Loop length: 4

	// Test 2: Loop at head - 1 -> 2 -> 3 -> 4 -> [1]
	ll2 := CreateLinkedListWithLoop([]int{1, 2, 3, 4}, 0)
	fmt.Println("\nTest 2:")
	PrintListWithLoop(ll2, 15)
	result2 := FindLoop(ll2)
	fmt.Printf("Loop starts at node with value: %d\n", result2.Value)
	fmt.Printf("Loop length: %d\n", GetLoopLength(ll2))
	// Expected: 1, Loop length: 4

	// Test 3: Small loop - 5 -> 6 -> 7 -> [6]
	ll3 := CreateLinkedListWithLoop([]int{5, 6, 7}, 1)
	fmt.Println("\nTest 3:")
	PrintListWithLoop(ll3, 15)
	result3 := FindLoop(ll3)
	fmt.Printf("Loop starts at node with value: %d\n", result3.Value)
	fmt.Printf("Loop length: %d\n", GetLoopLength(ll3))
	// Expected: 6, Loop length: 2

	// Test 4: Self loop - 1 -> 2 -> [2]
	ll4 := CreateLinkedListWithLoop([]int{1, 2}, 1)
	fmt.Println("\nTest 4:")
	PrintListWithLoop(ll4, 15)
	result4 := FindLoop(ll4)
	fmt.Printf("Loop starts at node with value: %d\n", result4.Value)
	fmt.Printf("Loop length: %d\n", GetLoopLength(ll4))
	// Expected: 2, Loop length: 1

	// Test 5: Longer list with loop at end
	ll5 := CreateLinkedListWithLoop([]int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}, 7)
	fmt.Println("\nTest 5:")
	PrintListWithLoop(ll5, 15)
	result5 := FindLoop(ll5)
	fmt.Printf("Loop starts at node with value: %d\n", result5.Value)
	fmt.Printf("Loop length: %d\n", GetLoopLength(ll5))
	// Expected: 7, Loop length: 3

	// Test 6: Verify HasCycle function
	ll6WithCycle := CreateLinkedListWithLoop([]int{1, 2, 3}, 0)
	fmt.Println("\nTest 6: HasCycle check")
	fmt.Printf("  List with cycle: %v\n", HasCycle(ll6WithCycle)) // true

	// Create a list without cycle for comparison
	ll6NoCycle := &LinkedList{Value: 1}
	ll6NoCycle.Next = &LinkedList{Value: 2}
	ll6NoCycle.Next.Next = &LinkedList{Value: 3}
	fmt.Printf("  List without cycle: %v\n", HasCycle(ll6NoCycle)) // false

	fmt.Println("\nAll tests completed!")
}
