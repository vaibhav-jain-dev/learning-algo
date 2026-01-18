/*
Flatten Nested List - Go Solutions

Flatten a nested list of integers into a single-level list.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// Element represents either an int or a nested array
type Element interface{}

// ============================================================================
// APPROACH 1: Recursive with Result Accumulation
// ============================================================================
// Time Complexity:  O(n) where n = total number of elements
// Space Complexity: O(d) where d = maximum depth (recursion stack)
//
// WHY THIS IS BEST:
// - In-place accumulation avoids extra memory allocations
// - Single pass through all elements
// - Clean recursive structure
// ============================================================================

// Flatten recursively flattens a nested array into a single-level slice.
func Flatten(arr []Element) []int {
	result := []int{}
	flattenHelper(arr, &result)
	return result
}

// flattenHelper recursively processes elements, accumulating results
func flattenHelper(arr []Element, result *[]int) {
	for _, elem := range arr {
		switch v := elem.(type) {
		case int:
			// Integer - append to result
			*result = append(*result, v)
		case []Element:
			// Nested array - recurse
			flattenHelper(v, result)
		}
	}
}

// ============================================================================
// APPROACH 2: Recursive with Concatenation
// ============================================================================
// Time Complexity:  O(n^2) worst case due to slice concatenation
// Space Complexity: O(n) for intermediate slices
//
// Less efficient but sometimes clearer to understand.
// ============================================================================

// FlattenConcat returns a new flattened slice using concatenation.
func FlattenConcat(arr []Element) []int {
	result := []int{}

	for _, elem := range arr {
		switch v := elem.(type) {
		case int:
			result = append(result, v)
		case []Element:
			// Concatenate flattened child
			result = append(result, FlattenConcat(v)...)
		}
	}

	return result
}

// ============================================================================
// APPROACH 3: Iterative with Stack (DFS)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n)
//
// WHEN TO USE:
// - When recursion depth might cause stack overflow
// - For very deeply nested structures
// ============================================================================

// FlattenIterative uses an explicit stack for DFS traversal.
func FlattenIterative(arr []Element) []int {
	result := []int{}

	// Stack holds (array, index) pairs
	type stackItem struct {
		arr []Element
		idx int
	}

	stack := []stackItem{{arr, 0}}

	for len(stack) > 0 {
		// Peek at top of stack
		top := &stack[len(stack)-1]

		// If we've processed all elements in current array, pop
		if top.idx >= len(top.arr) {
			stack = stack[:len(stack)-1]
			continue
		}

		// Process current element
		elem := top.arr[top.idx]
		top.idx++

		switch v := elem.(type) {
		case int:
			result = append(result, v)
		case []Element:
			// Push nested array onto stack
			stack = append(stack, stackItem{v, 0})
		}
	}

	return result
}

// ============================================================================
// APPROACH 4: Iterative with Preprocessing (Reverse Stack)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n)
//
// Alternative iterative approach that processes in natural order.
// ============================================================================

// FlattenIterativeReverse uses a stack with reversed element order.
func FlattenIterativeReverse(arr []Element) []int {
	result := []int{}
	stack := []Element{}

	// Add elements in reverse order so we process left-to-right
	for i := len(arr) - 1; i >= 0; i-- {
		stack = append(stack, arr[i])
	}

	for len(stack) > 0 {
		// Pop from stack
		elem := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		switch v := elem.(type) {
		case int:
			result = append(result, v)
		case []Element:
			// Add nested elements in reverse order
			for i := len(v) - 1; i >= 0; i-- {
				stack = append(stack, v[i])
			}
		}
	}

	return result
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		input    []Element
		expected []int
		desc     string
	}{
		{
			[]Element{[]Element{1, 2}, []Element{3, []Element{4, 5}}, 6},
			[]int{1, 2, 3, 4, 5, 6},
			"[[1, 2], [3, [4, 5]], 6]",
		},
		{
			[]Element{1, []Element{2, []Element{3, []Element{4, []Element{5}}}}},
			[]int{1, 2, 3, 4, 5},
			"Deep nesting",
		},
		{
			[]Element{[]Element{[]Element{1}}, []Element{[]Element{2}}, []Element{[]Element{3}}},
			[]int{1, 2, 3},
			"[[[1]], [[2]], [[3]]]",
		},
		{
			[]Element{1, 2, 3},
			[]int{1, 2, 3},
			"Already flat",
		},
		{
			[]Element{},
			[]int{},
			"Empty array",
		},
		{
			[]Element{[]Element{}, 1, []Element{}, 2, []Element{}},
			[]int{1, 2},
			"With empty arrays",
		},
	}

	approaches := []struct {
		name string
		fn   func([]Element) []int
	}{
		{"Recursive Accumulation", Flatten},
		{"Recursive Concatenation", FlattenConcat},
		{"Iterative Stack", FlattenIterative},
		{"Iterative Reverse", FlattenIterativeReverse},
	}

	fmt.Println("======================================================================")
	fmt.Println("FLATTEN NESTED LIST - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.input)
			passed := slicesEqual(result, tc.expected)
			status := "PASS"
			if !passed {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  [%s] %s: got %v, expected %v\n", status, tc.desc, result, tc.expected)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		}
	}

	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE OUTPUT")
	fmt.Println("======================================================================")

	fmt.Println("\nInput: [[1, 2], [3, [4, 5]], 6]")
	fmt.Printf("Output: %v\n", Flatten([]Element{[]Element{1, 2}, []Element{3, []Element{4, 5}}, 6}))

	fmt.Println("\nInput: [1, [2, [3, [4, [5]]]]]")
	fmt.Printf("Output: %v\n", Flatten([]Element{1, []Element{2, []Element{3, []Element{4, []Element{5}}}}}))
}

// Helper function to compare slices
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
