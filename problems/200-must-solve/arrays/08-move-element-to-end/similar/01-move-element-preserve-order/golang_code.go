/*
Move Element to End (Preserve Order) - Go Solutions

Move all instances of target value to end while preserving relative order
of non-target elements.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Write Pointer (Recommended)
// ============================================================================
// Time Complexity:  O(n) - single pass
// Space Complexity: O(1) - in-place modification
//
// WHY THIS IS BEST:
// - Single pass through array
// - In-place modification
// - Preserves relative order naturally
// ============================================================================

// MoveElementPreserveOrder moves all instances of toMove to end,
// preserving order of other elements.
//
// Uses write pointer technique:
// - Read through array left to right
// - Write non-target elements to current write position
// - Fill remaining positions with target value
func MoveElementPreserveOrder(array []int, toMove int) []int {
	writeIdx := 0

	// First pass: write all non-target elements
	for _, val := range array {
		if val != toMove {
			array[writeIdx] = val
			writeIdx++
		}
	}

	// Second pass: fill remaining with target value
	for writeIdx < len(array) {
		array[writeIdx] = toMove
		writeIdx++
	}

	return array
}

// ============================================================================
// APPROACH 2: Count and Rebuild
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// WHEN TO USE:
// - When you want explicit counting
// - Same performance as approach 1
// ============================================================================

// MoveElementCountRebuild counts targets first, then rebuilds array.
func MoveElementCountRebuild(array []int, toMove int) []int {
	// Count targets
	targetCount := 0
	for _, val := range array {
		if val == toMove {
			targetCount++
		}
	}

	// Write non-targets to front
	writeIdx := 0
	for _, val := range array {
		if val != toMove {
			array[writeIdx] = val
			writeIdx++
		}
	}

	// Fill end with targets
	for i := writeIdx; i < len(array); i++ {
		array[i] = toMove
	}

	return array
}

// ============================================================================
// APPROACH 3: New Slice (Not In-Place)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) - creates new slice
//
// WHEN TO USE:
// - When in-place modification not required
// - When original array must be preserved
// ============================================================================

// MoveElementNewSlice creates new slice with non-targets first.
func MoveElementNewSlice(array []int, toMove int) []int {
	result := make([]int, 0, len(array))

	// Add non-targets
	for _, val := range array {
		if val != toMove {
			result = append(result, val)
		}
	}

	// Add targets
	targetCount := len(array) - len(result)
	for i := 0; i < targetCount; i++ {
		result = append(result, toMove)
	}

	return result
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		array    []int
		toMove   int
		expected []int
		desc     string
	}{
		{[]int{2, 1, 2, 3, 2, 4}, 2, []int{1, 3, 4, 2, 2, 2}, "Standard case"},
		{[]int{1, 2, 3, 4, 5}, 3, []int{1, 2, 4, 5, 3}, "Single target"},
		{[]int{2, 2, 2}, 2, []int{2, 2, 2}, "All targets"},
		{[]int{1, 2, 3}, 4, []int{1, 2, 3}, "No targets"},
		{[]int{}, 1, []int{}, "Empty array"},
		{[]int{1}, 1, []int{1}, "Single element is target"},
		{[]int{5, 1, 5, 2, 5, 3}, 5, []int{1, 2, 3, 5, 5, 5}, "Multiple at start"},
	}

	approaches := []struct {
		name string
		fn   func([]int, int) []int
	}{
		{"Write Pointer (Recommended)", MoveElementPreserveOrder},
		{"Count and Rebuild", MoveElementCountRebuild},
		{"New Slice", MoveElementNewSlice},
	}

	fmt.Println("======================================================================")
	fmt.Println("MOVE ELEMENT TO END (PRESERVE ORDER) - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			// Make copy for in-place approaches
			arrayCopy := make([]int, len(tc.array))
			copy(arrayCopy, tc.array)

			result := approach.fn(arrayCopy, tc.toMove)
			passed := sliceEqual(result, tc.expected)
			status := "PASS"
			if !passed {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  %s: %s\n", status, tc.desc)
			if !passed {
				fmt.Printf("        Got: %v, Expected: %v\n", result, tc.expected)
			}
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		} else {
			fmt.Println("  Some tests failed!")
		}
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	// Sample Input 1
	array := []int{2, 1, 2, 3, 2, 4}
	toMove := 2
	fmt.Printf("\nInput: array = %v, toMove = %d\n", array, toMove)
	result := MoveElementPreserveOrder(append([]int{}, array...), toMove)
	fmt.Printf("Output: %v\n", result)

	// Sample Input 2
	array = []int{1, 2, 3, 4, 5}
	toMove = 3
	fmt.Printf("\nInput: array = %v, toMove = %d\n", array, toMove)
	result = MoveElementPreserveOrder(append([]int{}, array...), toMove)
	fmt.Printf("Output: %v\n", result)

	// Sample Input 3
	array = []int{2, 2, 2}
	toMove = 2
	fmt.Printf("\nInput: array = %v, toMove = %d\n", array, toMove)
	result = MoveElementPreserveOrder(append([]int{}, array...), toMove)
	fmt.Printf("Output: %v\n", result)
}

// Helper function to compare slices
func sliceEqual(a, b []int) bool {
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
