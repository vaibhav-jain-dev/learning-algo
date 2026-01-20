/*
First Duplicate Value - Go Solutions

Find the first integer that appears more than once (minimum index of second occurrence).
Values are between 1 and n where n is array length.

This file contains MULTIPLE solution approaches with explanations.
*/

package main

import (
	"fmt"
)

// ============================================================================
// APPROACH 1: Hash Set
// ============================================================================
// Time Complexity:  O(n) - single pass through array
// Space Complexity: O(n) - hash map stores seen values
//
// WHY THIS APPROACH:
// - Simple and clear
// - Works for any array (no value constraints)
// - Doesn't mutate input
// ============================================================================

// FirstDuplicateValueHashSet finds first duplicate using hash set.
//
// How it works:
//  1. Maintain map of seen values
//  2. For each value, check if already seen
//  3. If yes, return it (first duplicate)
//  4. If no, add to map
//
// Visual:
//
//	array = [2, 1, 5, 2, 3, 3, 4]
//
//	v=2: seen={}, add 2 -> seen={2}
//	v=1: seen={2}, add 1 -> seen={2,1}
//	v=5: seen={2,1}, add 5 -> seen={2,1,5}
//	v=2: 2 in seen! Return 2
func FirstDuplicateValueHashSet(array []int) int {
	seen := make(map[int]bool)

	for _, value := range array {
		if seen[value] {
			return value
		}
		seen[value] = true
	}

	return -1
}

// ============================================================================
// APPROACH 2: Negative Marking (O(1) Space) - RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - single pass through array
// Space Complexity: O(1) - no extra space (mutates input)
//
// WHY THIS IS BEST:
// - Optimal space complexity
// - Clever use of array as implicit hash map
// - Demonstrates creative problem-solving
//
// REQUIREMENT: Values must be 1 to n, and mutation is allowed
// ============================================================================

// FirstDuplicateValue finds first duplicate using negative marking technique.
//
// How it works:
// Since values are 1 to n (array length), we can use indices as markers:
//   - For value v, check index abs(v) - 1
//   - If value at that index is negative, v is a duplicate
//   - Otherwise, negate value at that index to mark v as seen
//
// Visual:
//
//	array = [2, 1, 5, 2, 3, 3, 4]
//
//	v=2: index=1, array[1]=1 (pos) -> mark: array[1]=-1
//	     array = [2, -1, 5, 2, 3, 3, 4]
//
//	v=-1 (abs=1): index=0, array[0]=2 (pos) -> mark: array[0]=-2
//	     array = [-2, -1, 5, 2, 3, 3, 4]
//
//	v=5: index=4, array[4]=3 (pos) -> mark: array[4]=-3
//	     array = [-2, -1, 5, 2, -3, 3, 4]
//
//	v=2: index=1, array[1]=-1 (NEGATIVE!) -> 2 is duplicate!
//	Return 2
func FirstDuplicateValue(array []int) int {
	for _, value := range array {
		absValue := abs(value)
		index := absValue - 1

		// If value at index is negative, we've seen absValue before
		if array[index] < 0 {
			return absValue
		}

		// Mark as seen by negating
		array[index] = -array[index]
	}

	return -1
}

// abs returns absolute value of an integer
func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

// ============================================================================
// APPROACH 3: Brute Force
// ============================================================================
// Time Complexity:  O(n^2) - for each element, scan rest of array
// Space Complexity: O(1) - no extra space
//
// EDUCATIONAL VALUE:
// - Shows baseline approach
// - Doesn't mutate input
// - Demonstrates why optimization matters
// ============================================================================

// FirstDuplicateValueBruteForce finds first duplicate using brute force.
//
// How it works:
//  1. For each index i, look for same value at index j > i
//  2. Track the minimum index of second occurrence
//  3. Return corresponding value
//
// Why it's slow:
//
//	For each element, we potentially scan all remaining elements.
//	Worst case: n * (n-1) / 2 comparisons = O(n^2)
func FirstDuplicateValueBruteForce(array []int) int {
	minSecondIndex := len(array)
	result := -1

	for i := 0; i < len(array); i++ {
		for j := i + 1; j < len(array); j++ {
			if array[i] == array[j] && j < minSecondIndex {
				minSecondIndex = j
				result = array[i]
				break // Found second occurrence for array[i]
			}
		}
	}

	return result
}

// ============================================================================
// TEST CASES AND COMPARISON
// ============================================================================

func main() {
	testCases := []struct {
		array    []int
		expected int
		desc     string
	}{
		{[]int{2, 1, 5, 2, 3, 3, 4}, 2, "Standard case - 2 first"},
		{[]int{2, 1, 5, 3, 3, 2, 4}, 3, "3's second occurs before 2's second"},
		{[]int{1, 2, 3, 4, 5}, -1, "No duplicates"},
		{[]int{1, 1, 2, 3, 3, 2, 2}, 1, "First element duplicated"},
		{[]int{2, 1, 1}, 1, "Small array"},
		{[]int{1}, -1, "Single element"},
		{[]int{1, 1}, 1, "Two same elements"},
		{[]int{1, 2, 3, 4, 5, 5}, 5, "Duplicate at end"},
		{[]int{3, 1, 3, 1, 1, 4, 4}, 3, "Multiple duplicates"},
	}

	fmt.Println("======================================================================")
	fmt.Println("FIRST DUPLICATE VALUE - TEST RESULTS")
	fmt.Println("======================================================================")

	// Test Hash Set approach
	fmt.Println("\nHash Set Approach:")
	fmt.Println("--------------------------------------------------")
	allPassed := true
	for _, tc := range testCases {
		arr := make([]int, len(tc.array))
		copy(arr, tc.array)
		result := FirstDuplicateValueHashSet(arr)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}
		fmt.Printf("  [%s] %s: %d\n", status, tc.desc, result)
	}
	if allPassed {
		fmt.Println("  All tests passed!")
	}

	// Test Negative Marking approach
	fmt.Println("\nNegative Marking (Recommended):")
	fmt.Println("--------------------------------------------------")
	allPassed = true
	for _, tc := range testCases {
		arr := make([]int, len(tc.array))
		copy(arr, tc.array)
		result := FirstDuplicateValue(arr)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}
		fmt.Printf("  [%s] %s: %d\n", status, tc.desc, result)
	}
	if allPassed {
		fmt.Println("  All tests passed!")
	}

	// Test Brute Force approach
	fmt.Println("\nBrute Force:")
	fmt.Println("--------------------------------------------------")
	allPassed = true
	for _, tc := range testCases {
		arr := make([]int, len(tc.array))
		copy(arr, tc.array)
		result := FirstDuplicateValueBruteForce(arr)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}
		fmt.Printf("  [%s] %s: %d\n", status, tc.desc, result)
	}
	if allPassed {
		fmt.Println("  All tests passed!")
	}

	fmt.Println("\n======================================================================")
	fmt.Println("COMPLEXITY COMPARISON")
	fmt.Println("======================================================================")
	fmt.Println(`
    +---------------------+----------+----------+------------------+
    |      Approach       |   Time   |  Space   |  Recommendation  |
    +---------------------+----------+----------+------------------+
    | 1. Hash Set         |   O(n)   |   O(n)   |  Safe choice     |
    | 2. Negative Marking |   O(n)   |   O(1)   |  BEST CHOICE     |
    | 3. Brute Force      |  O(n^2)  |   O(1)   |  Not recommended |
    +---------------------+----------+----------+------------------+

    Note: Negative Marking requires values 1 to n and allows mutation.
    `)
}
