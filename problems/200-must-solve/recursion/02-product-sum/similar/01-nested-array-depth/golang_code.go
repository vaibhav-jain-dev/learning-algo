/*
Maximum Depth of Nested Arrays - Go Solutions

Find the maximum nesting depth of a nested array structure.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// Element represents either an int or a nested array
type Element interface{}

// ============================================================================
// APPROACH 1: Recursive DFS (Optimal)
// ============================================================================
// Time Complexity:  O(n) where n = total number of elements
// Space Complexity: O(d) where d = maximum depth (recursion stack)
//
// WHY THIS IS BEST:
// - Natural fit for tree-like nested structure
// - Clean and readable
// - Optimal time complexity
// ============================================================================

// MaxDepth returns the maximum depth of a nested array.
//
// Depth is defined as:
// - A flat array (no nested arrays) has depth 1
// - Each level of nesting adds 1 to the depth
func MaxDepth(arr []Element) int {
	return maxDepthHelper(arr)
}

// maxDepthHelper recursively computes depth
func maxDepthHelper(arr []Element) int {
	maxChildDepth := 0

	for _, elem := range arr {
		// Check if element is a nested array
		if nested, ok := elem.([]Element); ok {
			childDepth := maxDepthHelper(nested)
			if childDepth > maxChildDepth {
				maxChildDepth = childDepth
			}
		}
	}

	// Current level (1) plus maximum child depth
	return 1 + maxChildDepth
}

// ============================================================================
// APPROACH 2: Iterative with Stack (DFS)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) worst case
//
// WHEN TO USE:
// - When recursion depth might cause stack overflow
// - When iterative solution is preferred
// ============================================================================

// MaxDepthIterative uses an explicit stack for DFS traversal.
func MaxDepthIterative(arr []Element) int {
	if len(arr) == 0 {
		return 1 // Empty array still has depth 1
	}

	type stackItem struct {
		arr   []Element
		depth int
	}

	stack := []stackItem{{arr, 1}}
	maxDepth := 1

	for len(stack) > 0 {
		// Pop from stack
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if current.depth > maxDepth {
			maxDepth = current.depth
		}

		// Push nested arrays onto stack
		for _, elem := range current.arr {
			if nested, ok := elem.([]Element); ok {
				stack = append(stack, stackItem{nested, current.depth + 1})
			}
		}
	}

	return maxDepth
}

// ============================================================================
// APPROACH 3: BFS with Queue (Level Order)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(w) where w = maximum width at any level
//
// Alternative approach using breadth-first search.
// ============================================================================

// MaxDepthBFS uses BFS to find maximum depth.
func MaxDepthBFS(arr []Element) int {
	if len(arr) == 0 {
		return 1
	}

	type queueItem struct {
		arr   []Element
		depth int
	}

	queue := []queueItem{{arr, 1}}
	maxDepth := 1
	front := 0

	for front < len(queue) {
		current := queue[front]
		front++

		if current.depth > maxDepth {
			maxDepth = current.depth
		}

		for _, elem := range current.arr {
			if nested, ok := elem.([]Element); ok {
				queue = append(queue, queueItem{nested, current.depth + 1})
			}
		}
	}

	return maxDepth
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		input    []Element
		expected int
		desc     string
	}{
		{
			[]Element{1, []Element{2, []Element{3, 4}}},
			3,
			"[1, [2, [3, 4]]] - depth 3",
		},
		{
			[]Element{1, 2, 3},
			1,
			"[1, 2, 3] - flat array",
		},
		{
			[]Element{[]Element{[]Element{[]Element{}}}},
			4,
			"[[[[]]]] - 4 levels of nesting",
		},
		{
			[]Element{1, []Element{2, 3}, []Element{4, []Element{5}}},
			3,
			"[1, [2, 3], [4, [5]]] - multiple branches",
		},
		{
			[]Element{},
			1,
			"[] - empty array",
		},
		{
			[]Element{[]Element{1}, []Element{2}, []Element{3}},
			2,
			"[[1], [2], [3]] - wide, shallow",
		},
	}

	approaches := []struct {
		name string
		fn   func([]Element) int
	}{
		{"Recursive DFS", MaxDepth},
		{"Iterative Stack", MaxDepthIterative},
		{"BFS Queue", MaxDepthBFS},
	}

	fmt.Println("======================================================================")
	fmt.Println("MAXIMUM DEPTH OF NESTED ARRAYS - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.input)
			status := "PASS"
			if result != tc.expected {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, result, tc.expected)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		}
	}

	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE OUTPUT")
	fmt.Println("======================================================================")

	fmt.Println("\nInput: [1, [2, [3, 4]]]")
	fmt.Printf("Output: %d\n", MaxDepth([]Element{1, []Element{2, []Element{3, 4}}}))

	fmt.Println("\nInput: [1, 2, 3]")
	fmt.Printf("Output: %d\n", MaxDepth([]Element{1, 2, 3}))

	fmt.Println("\nInput: [[[[]]]]")
	fmt.Printf("Output: %d\n", MaxDepth([]Element{[]Element{[]Element{[]Element{}}}}))
}
