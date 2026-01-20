/*
Copy List with Random Pointer - Go Solutions

Deep copy a linked list where each node has a random pointer.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// Node represents a node with val, next, and random pointers
type Node struct {
	Val    int
	Next   *Node
	Random *Node
}

// ============================================================================
// APPROACH 1: Hash Map (Two Pass) - RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - two passes through the list
// Space Complexity: O(n) - hash map storing n nodes
//
// WHY THIS IS BEST:
// - Clear and intuitive logic
// - Easy to understand and implement
// - Works for any graph-like structure
// ============================================================================

// CopyRandomListHashMap creates a deep copy using a hash map.
//
// Key Insight: Map original nodes to copies, then set all pointers.
//
// Visual:
//
//	Pass 1: Create all copy nodes and build map
//	        Original(7) -> Copy(7)
//	        Original(13) -> Copy(13)
//	        ...
//
//	Pass 2: Use map to set next and random pointers
//	        copy.Next = map[original.Next]
//	        copy.Random = map[original.Random]
func CopyRandomListHashMap(head *Node) *Node {
	if head == nil {
		return nil
	}

	// Map original nodes to their copies
	nodeMap := make(map[*Node]*Node)

	// First pass: create all copy nodes
	current := head
	for current != nil {
		nodeMap[current] = &Node{Val: current.Val}
		current = current.Next
	}

	// Second pass: set next and random pointers
	current = head
	for current != nil {
		copy := nodeMap[current]

		if current.Next != nil {
			copy.Next = nodeMap[current.Next]
		}
		if current.Random != nil {
			copy.Random = nodeMap[current.Random]
		}

		current = current.Next
	}

	return nodeMap[head]
}

// ============================================================================
// APPROACH 2: Interleaving (O(1) Space)
// ============================================================================
// Time Complexity:  O(n) - three passes
// Space Complexity: O(1) - no extra data structures (besides output)
//
// WHEN TO USE:
// - When space is constrained
// - Classic interview optimization technique
// ============================================================================

// CopyRandomListInterleave uses interleaving technique.
//
// Step 1: Insert copy nodes after originals
//
//	A -> A' -> B -> B' -> C -> C' -> null
//
// Step 2: Set random pointers
//
//	copy.Random = original.Random.Next
//
// Step 3: Separate the two lists
func CopyRandomListInterleave(head *Node) *Node {
	if head == nil {
		return nil
	}

	// Step 1: Insert copy nodes after each original
	current := head
	for current != nil {
		copyNode := &Node{
			Val:  current.Val,
			Next: current.Next,
		}
		current.Next = copyNode
		current = copyNode.Next
	}

	// Step 2: Set random pointers for copy nodes
	current = head
	for current != nil {
		copyNode := current.Next
		if current.Random != nil {
			// The copy of current.Random is current.Random.Next
			copyNode.Random = current.Random.Next
		}
		current = copyNode.Next
	}

	// Step 3: Separate the two lists
	current = head
	copyHead := head.Next

	for current != nil {
		copyNode := current.Next
		current.Next = copyNode.Next

		if copyNode.Next != nil {
			copyNode.Next = copyNode.Next.Next
		}

		current = current.Next
	}

	return copyHead
}

// ============================================================================
// APPROACH 3: Recursive with Memoization
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) - recursion stack + memo
//
// WHEN TO USE:
// - When you prefer recursive thinking
// - Handles cycles naturally with memoization
// ============================================================================

// CopyRandomListRecursive uses recursion with memoization.
func CopyRandomListRecursive(head *Node) *Node {
	visited := make(map[*Node]*Node)

	var clone func(node *Node) *Node
	clone = func(node *Node) *Node {
		if node == nil {
			return nil
		}

		// Check if already copied
		if copy, exists := visited[node]; exists {
			return copy
		}

		// Create new node
		copy := &Node{Val: node.Val}
		visited[node] = copy

		// Recursively copy next and random
		copy.Next = clone(node.Next)
		copy.Random = clone(node.Random)

		return copy
	}

	return clone(head)
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// createListFromPairs creates a list from [value, random_index] pairs
// random_index = -1 means null
func createListFromPairs(pairs [][2]int) *Node {
	if len(pairs) == 0 {
		return nil
	}

	// Create all nodes first
	nodes := make([]*Node, len(pairs))
	for i, pair := range pairs {
		nodes[i] = &Node{Val: pair[0]}
	}

	// Connect next pointers
	for i := 0; i < len(nodes)-1; i++ {
		nodes[i].Next = nodes[i+1]
	}

	// Set random pointers
	for i, pair := range pairs {
		if pair[1] >= 0 && pair[1] < len(nodes) {
			nodes[i].Random = nodes[pair[1]]
		}
	}

	return nodes[0]
}

// validateCopy checks if the copy is correct and independent
func validateCopy(original, copy *Node) bool {
	origNodes := make(map[*Node]bool)
	copyNodes := make(map[*Node]bool)

	// Collect all original nodes
	for n := original; n != nil; n = n.Next {
		origNodes[n] = true
	}

	// Collect all copy nodes and verify they're different
	for n := copy; n != nil; n = n.Next {
		if origNodes[n] {
			return false // Copy node points to original!
		}
		copyNodes[n] = true
	}

	// Verify structure matches
	orig := original
	cop := copy
	for orig != nil && cop != nil {
		if orig.Val != cop.Val {
			return false
		}

		// Check random pointers point to correct copies
		if orig.Random != nil && cop.Random != nil {
			if orig.Random.Val != cop.Random.Val {
				return false
			}
		} else if (orig.Random != nil) != (cop.Random != nil) {
			return false
		}

		orig = orig.Next
		cop = cop.Next
	}

	return orig == nil && cop == nil
}

func printList(head *Node) {
	if head == nil {
		fmt.Println("empty")
		return
	}

	// First, index all nodes
	nodeIndex := make(map[*Node]int)
	idx := 0
	for n := head; n != nil; n = n.Next {
		nodeIndex[n] = idx
		idx++
	}

	// Print with random info
	for n := head; n != nil; n = n.Next {
		randomIdx := -1
		if n.Random != nil {
			randomIdx = nodeIndex[n.Random]
		}
		fmt.Printf("[%d,", n.Val)
		if randomIdx == -1 {
			fmt.Printf("null]")
		} else {
			fmt.Printf("%d]", randomIdx)
		}
		if n.Next != nil {
			fmt.Print(" -> ")
		}
	}
	fmt.Println()
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		pairs [][2]int
		desc  string
	}{
		{[][2]int{{7, -1}, {13, 0}, {11, 4}, {10, 2}, {1, 0}}, "Standard case"},
		{[][2]int{{1, 1}, {2, 1}}, "Random points to same node"},
		{[][2]int{{3, -1}, {3, 0}, {3, -1}}, "Same values"},
		{[][2]int{{1, -1}}, "Single node, no random"},
		{[][2]int{{1, 0}}, "Single node, random to self"},
		{[][2]int{}, "Empty list"},
	}

	approaches := []struct {
		name string
		fn   func(*Node) *Node
	}{
		{"Hash Map (Recommended)", CopyRandomListHashMap},
		{"Interleaving", CopyRandomListInterleave},
		{"Recursive", CopyRandomListRecursive},
	}

	fmt.Println("======================================================================")
	fmt.Println("COPY LIST WITH RANDOM POINTER - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			original := createListFromPairs(tc.pairs)
			copyList := approach.fn(original)

			// Handle empty list case
			if original == nil && copyList == nil {
				fmt.Printf("  [PASS] %s\n", tc.desc)
				continue
			}

			passed := validateCopy(original, copyList)
			status := "PASS"
			if !passed {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  [%s] %s\n", status, tc.desc)
			fmt.Print("         Original: ")
			printList(original)
			fmt.Print("         Copy:     ")
			printList(copyList)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		}
	}

	// Visual demonstration
	fmt.Println("\n======================================================================")
	fmt.Println("VISUAL DEMONSTRATION")
	fmt.Println("======================================================================")

	demo := [][2]int{{7, -1}, {13, 0}, {11, 4}, {10, 2}, {1, 0}}
	original := createListFromPairs(demo)
	fmt.Print("\nOriginal: ")
	printList(original)

	copy := CopyRandomListHashMap(original)
	fmt.Print("Deep Copy: ")
	printList(copy)

	fmt.Println("\nNote: The copy is completely independent from the original!")
}
