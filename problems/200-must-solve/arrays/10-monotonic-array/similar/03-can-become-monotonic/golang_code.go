/*
Check If Array Can Become Monotonic - Go Solutions

Determine if array can become monotonic by changing at most one element.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Check Both Directions (Recommended)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// WHY THIS IS BEST:
// - Single pass for each direction
// - Handles edge cases cleanly
// - Efficient
// ============================================================================

// CanBecomeMonotonic checks if array can become monotonic with one change.
func CanBecomeMonotonic(array []int) bool {
	return canBecomeNonDecreasing(array) || canBecomeNonIncreasing(array)
}

// canBecomeNonDecreasing checks if array can become non-decreasing with one change.
func canBecomeNonDecreasing(array []int) bool {
	if len(array) <= 2 {
		return true
	}

	violations := 0
	violationIdx := -1

	for i := 0; i < len(array)-1; i++ {
		if array[i] > array[i+1] {
			violations++
			violationIdx = i
			if violations > 1 {
				return false
			}
		}
	}

	if violations == 0 {
		return true
	}

	i := violationIdx

	// Option A: change arr[i]
	optionA := (i == 0) || (array[i-1] <= array[i+1])

	// Option B: change arr[i+1]
	optionB := (i+1 == len(array)-1) || (array[i] <= array[i+2])

	return optionA || optionB
}

// canBecomeNonIncreasing checks if array can become non-increasing with one change.
func canBecomeNonIncreasing(array []int) bool {
	if len(array) <= 2 {
		return true
	}

	violations := 0
	violationIdx := -1

	for i := 0; i < len(array)-1; i++ {
		if array[i] < array[i+1] {
			violations++
			violationIdx = i
			if violations > 1 {
				return false
			}
		}
	}

	if violations == 0 {
		return true
	}

	i := violationIdx

	// Option A: change arr[i]
	optionA := (i == 0) || (array[i-1] >= array[i+1])

	// Option B: change arr[i+1]
	optionB := (i+1 == len(array)-1) || (array[i] >= array[i+2])

	return optionA || optionB
}

// ============================================================================
// APPROACH 2: Try All Single Changes (Brute Force)
// ============================================================================
// Time Complexity:  O(n^2)
// Space Complexity: O(n)
//
// WHEN TO USE:
// - For verification
// - When clarity is priority
// ============================================================================

// CanBecomeMonotonicBrute tries removing each element and checks monotonicity.
func CanBecomeMonotonicBrute(array []int) bool {
	if isMonotonic(array) {
		return true
	}

	// Try removing each element
	for i := range array {
		test := make([]int, 0, len(array)-1)
		test = append(test, array[:i]...)
		test = append(test, array[i+1:]...)
		if isMonotonic(test) {
			return true
		}
	}

	return false
}

// isMonotonic checks if array is monotonic.
func isMonotonic(arr []int) bool {
	if len(arr) <= 1 {
		return true
	}

	increasing := true
	decreasing := true

	for i := 0; i < len(arr)-1; i++ {
		if arr[i] > arr[i+1] {
			increasing = false
		}
		if arr[i] < arr[i+1] {
			decreasing = false
		}
	}

	return increasing || decreasing
}

// ============================================================================
// APPROACH 3: Compact Single Function
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// WHEN TO USE:
// - More compact code
// ============================================================================

// CanBecomeMonotonicCompact is a compact version checking both directions.
func CanBecomeMonotonicCompact(array []int) bool {
	checkDirection := func(arr []int, compare func(a, b int) bool) bool {
		if len(arr) <= 2 {
			return true
		}

		violationIdx := -1
		for i := 0; i < len(arr)-1; i++ {
			if !compare(arr[i], arr[i+1]) {
				if violationIdx != -1 {
					return false
				}
				violationIdx = i
			}
		}

		if violationIdx == -1 {
			return true
		}

		i := violationIdx
		// Option A: fix arr[i]
		if i == 0 || compare(arr[i-1], arr[i+1]) {
			return true
		}
		// Option B: fix arr[i+1]
		if i+1 == len(arr)-1 || compare(arr[i], arr[i+2]) {
			return true
		}

		return false
	}

	return checkDirection(array, func(a, b int) bool { return a <= b }) ||
		checkDirection(array, func(a, b int) bool { return a >= b })
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		array    []int
		expected bool
		desc     string
	}{
		{[]int{1, 5, 3, 4, 5}, true, "Fix one element"},
		{[]int{1, 2, 3, 4, 5}, true, "Already increasing"},
		{[]int{5, 4, 3, 2, 1}, true, "Already decreasing"},
		{[]int{4, 2, 3, 1}, false, "Cannot fix"},
		{[]int{3, 4, 2, 3}, false, "Cannot fix"},
		{[]int{1, 2, 3}, true, "Short array increasing"},
		{[]int{1}, true, "Single element"},
		{[]int{}, true, "Empty array"},
		{[]int{1, 1, 1}, true, "All equal"},
		{[]int{4, 2, 1}, true, "Almost decreasing"},
		{[]int{1, 4, 2}, true, "Middle element issue"},
		{[]int{10, 5, 7}, true, "Can fix by changing 10 or 5"},
	}

	approaches := []struct {
		name string
		fn   func([]int) bool
	}{
		{"Check Both Directions", CanBecomeMonotonic},
		{"Brute Force", CanBecomeMonotonicBrute},
		{"Compact Version", CanBecomeMonotonicCompact},
	}

	fmt.Println("======================================================================")
	fmt.Println("CAN BECOME MONOTONIC - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.array)
			status := "PASS"
			if result != tc.expected {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  %s: %s: %t (expected %t)\n", status, tc.desc, result, tc.expected)
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
	array := []int{1, 5, 3, 4, 5}
	fmt.Printf("\nInput: array = %v\n", array)
	result := CanBecomeMonotonic(array)
	fmt.Printf("Output: %t\n", result)
	fmt.Println("Explanation: Change 5 at index 1 to 2: [1, 2, 3, 4, 5]")

	// Sample Input 2
	array = []int{1, 2, 3, 4, 5}
	fmt.Printf("\nInput: array = %v\n", array)
	result = CanBecomeMonotonic(array)
	fmt.Printf("Output: %t\n", result)
	fmt.Println("Explanation: Already monotonic")

	// Sample Input 3
	array = []int{4, 2, 3, 1}
	fmt.Printf("\nInput: array = %v\n", array)
	result = CanBecomeMonotonic(array)
	fmt.Printf("Output: %t\n", result)
	fmt.Println("Explanation: Need to change more than one element")
}
