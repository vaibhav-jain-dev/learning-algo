/*
Sorted Squared Array - Go Solutions

Given a sorted array, return a new sorted array of the squares.
The challenge is handling negative numbers efficiently.

This file contains MULTIPLE solution approaches with explanations.
*/

package main

import (
	"fmt"
	"sort"
)

// ============================================================================
// APPROACH 1: Two-Pointer (Fill from End) ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - single pass through array
// Space Complexity: O(n) - for result array
//
// WHY THIS IS BEST:
// - Leverages the sorted property optimally
// - Single pass, no re-sorting needed
// - Most efficient time complexity possible
// - Works beautifully with negative numbers
// ============================================================================

// SortedSquaredArray returns sorted array of squares using two-pointer technique.
//
// Key Insight: The largest squared value is ALWAYS at one of the ENDS
// of the sorted array (leftmost negative or rightmost positive).
//
// How it works:
//  1. Two pointers: left at start, right at end
//  2. Compare absolute values at both pointers
//  3. Place larger squared value at END of result
//  4. Move the pointer that had the larger value inward
//  5. Fill result array backwards (largest to smallest)
//
// Visual:
//
//	array = [-7, -3, 1, 9]
//	         L        R
//
//	|-7| = 7, |9| = 9
//	9 > 7, so result[-1] = 81, move R left
func SortedSquaredArray(array []int) []int {
	n := len(array)
	result := make([]int, n)
	left := 0
	right := n - 1

	// Fill from the end (largest values first)
	for i := n - 1; i >= 0; i-- {
		leftVal := abs(array[left])
		rightVal := abs(array[right])

		if leftVal > rightVal {
			result[i] = leftVal * leftVal
			left++
		} else {
			result[i] = rightVal * rightVal
			right--
		}
	}

	return result
}

// ============================================================================
// APPROACH 2: Square and Sort (Brute Force)
// ============================================================================
// Time Complexity:  O(n log n) - due to sorting
// Space Complexity: O(n) - for result array
//
// WHEN TO USE:
// - When simplicity matters more than optimal performance
// - Quick implementation in interviews if time is short
// - Good starting point before optimizing
//
// WHY IT'S SUBOPTIMAL:
// - Doesn't leverage the fact that input is already sorted
// - O(n log n) vs O(n) for two-pointer approach
// ============================================================================

// SortedSquaredArraySimple is a simple brute force: square all and sort.
//
// How it works:
//  1. Square every element in the array
//  2. Sort the resulting array
//
// Visual:
//
//	[-7, -3, 1, 9]
//	→ [49, 9, 1, 81]  (after squaring)
//	→ [1, 9, 49, 81]  (after sorting)
func SortedSquaredArraySimple(array []int) []int {
	result := make([]int, len(array))
	for i, v := range array {
		result[i] = v * v
	}
	sort.Ints(result)
	return result
}

// ============================================================================
// APPROACH 3: Find Split Point + Merge
// ============================================================================
// Time Complexity:  O(n) - find split O(n) + merge O(n)
// Space Complexity: O(n) - for result array
//
// EDUCATIONAL VALUE:
// - Demonstrates merge-sort thinking
// - Useful when input is naturally partitioned
// - Shows alternative O(n) approach
//
// WHY TWO-POINTER IS STILL PREFERRED:
// - This approach is more complex to implement
// - Requires handling edge cases (all positive/negative)
// - Two-pointer is more elegant and less error-prone
// ============================================================================

// SortedSquaredArrayMerge finds split point then merges two sorted sequences.
//
// How it works:
//  1. Find the split point (where negative numbers end)
//  2. Negatives squared (reversed) form one sorted sequence
//  3. Positives squared form another sorted sequence
//  4. Merge the two sequences
//
// Visual:
//
//	[-7, -3, 1, 9]
//	Split: negatives = [-7, -3], positives = [1, 9]
//	Square negatives (iterate backwards): [9, 49]
//	Square positives: [1, 81]
//	Merge: [1, 9, 49, 81]
func SortedSquaredArrayMerge(array []int) []int {
	n := len(array)
	if n == 0 {
		return []int{}
	}

	// Find split point (first non-negative index)
	split := 0
	for split < n && array[split] < 0 {
		split++
	}

	// Two pointers for merge
	negPtr := split - 1 // Goes backwards through negatives
	posPtr := split     // Goes forward through non-negatives
	result := make([]int, 0, n)

	// Merge two sorted sequences
	for negPtr >= 0 && posPtr < n {
		negSquared := array[negPtr] * array[negPtr]
		posSquared := array[posPtr] * array[posPtr]

		if negSquared < posSquared {
			result = append(result, negSquared)
			negPtr--
		} else {
			result = append(result, posSquared)
			posPtr++
		}
	}

	// Add remaining negatives (squared)
	for negPtr >= 0 {
		result = append(result, array[negPtr]*array[negPtr])
		negPtr--
	}

	// Add remaining positives (squared)
	for posPtr < n {
		result = append(result, array[posPtr]*array[posPtr])
		posPtr++
	}

	return result
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

// Helper to compare slices
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
	testCases := []struct {
		array    []int
		expected []int
		desc     string
	}{
		{[]int{1, 2, 3, 5, 6, 8, 9}, []int{1, 4, 9, 25, 36, 64, 81}, "All positive"},
		{[]int{-5, -4, -3, -2, -1}, []int{1, 4, 9, 16, 25}, "All negative"},
		{[]int{-7, -3, 1, 9, 22, 30}, []int{1, 9, 49, 81, 484, 900}, "Mixed"},
		{[]int{-4, -2, 0, 1, 3}, []int{0, 1, 4, 9, 16}, "With zero"},
		{[]int{-5}, []int{25}, "Single negative"},
		{[]int{5}, []int{25}, "Single positive"},
		{[]int{-3, -2, -1, 0, 1, 2, 3}, []int{0, 1, 1, 4, 4, 9, 9}, "Symmetric"},
	}

	approaches := []struct {
		name string
		fn   func([]int) []int
	}{
		{"Two-Pointer (Recommended)", SortedSquaredArray},
		{"Square and Sort", SortedSquaredArraySimple},
		{"Split + Merge", SortedSquaredArrayMerge},
	}

	fmt.Println("======================================================================")
	fmt.Println("SORTED SQUARED ARRAY - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			// Copy slice to avoid modification
			arr := make([]int, len(tc.array))
			copy(arr, tc.array)

			result := approach.fn(arr)
			status := "✓"
			if !slicesEqual(result, tc.expected) {
				status = "✗"
				allPassed = false
			}
			fmt.Printf("  %s %s: %v\n", status, tc.desc, result)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		} else {
			fmt.Println("  Some tests failed!")
		}
	}

	fmt.Println("\n======================================================================")
	fmt.Println("COMPLEXITY COMPARISON")
	fmt.Println("======================================================================")
	fmt.Println(`
    ┌───────────────────────────┬───────────┬──────────┬──────────────────┐
    │         Approach          │   Time    │  Space   │  Recommendation  │
    ├───────────────────────────┼───────────┼──────────┼──────────────────┤
    │ 1. Two-Pointer (Fill End) │   O(n)    │   O(n)   │  ⭐ BEST CHOICE  │
    │ 2. Square and Sort        │ O(n log n)│   O(n)   │  ✓ Simple        │
    │ 3. Split + Merge          │   O(n)    │   O(n)   │  ⚠️ Complex      │
    └───────────────────────────┴───────────┴──────────┴──────────────────┘
    `)
}
