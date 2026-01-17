/*
Smallest Difference - Go Solutions

Find pair from two arrays with smallest absolute difference.

This file contains MULTIPLE solution approaches with explanations.
*/

package main

import (
	"fmt"
	"math"
	"sort"
)

// ============================================================================
// APPROACH 1: Sort + Two Pointers ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(n log n + m log m) - sorting dominates
// Space Complexity: O(1) - excluding sort space
//
// WHY THIS IS BEST:
// - Optimal time complexity for this problem
// - Simple logic: move pointer of smaller value
// - Early exit if exact match found
// ============================================================================

// SmallestDifference finds pair with smallest absolute difference using two pointers.
//
// Key Insight: If arrays are sorted, we can skip pairs intelligently.
// - If arr1[i] < arr2[j]: Move i (makes arr1 value larger, closer to arr2[j])
// - If arr1[i] > arr2[j]: Move j (makes arr2 value larger, closer to arr1[i])
// - If equal: Perfect match! Return immediately.
//
// How it works:
//  1. Sort both arrays
//  2. Use two pointers, one per array
//  3. Track best difference found
//  4. Move pointer of smaller element to reduce difference
func SmallestDifference(arrayOne, arrayTwo []int) []int {
	sort.Ints(arrayOne)
	sort.Ints(arrayTwo)

	i, j := 0, 0
	smallest := math.MaxInt64
	result := []int{0, 0}

	for i < len(arrayOne) && j < len(arrayTwo) {
		first := arrayOne[i]
		second := arrayTwo[j]
		currentDiff := abs(first - second)

		// Update best if this is smaller
		if currentDiff < smallest {
			smallest = currentDiff
			result = []int{first, second}
		}

		// Optimal case: exact match (difference = 0)
		if first == second {
			return []int{first, second}
		}

		// Move pointer of smaller element to try to reduce difference
		if first < second {
			i++
		} else {
			j++
		}
	}

	return result
}

// ============================================================================
// APPROACH 2: Brute Force
// ============================================================================
// Time Complexity:  O(n × m) - check all pairs
// Space Complexity: O(1)
//
// WHEN TO USE:
// - Arrays are very small
// - Need to verify two-pointer solution
// - No sorting allowed
// ============================================================================

// SmallestDifferenceBrute finds pair by checking all pairs.
//
// Simple but slow: O(n × m) time.
func SmallestDifferenceBrute(arrayOne, arrayTwo []int) []int {
	smallest := math.MaxInt64
	result := []int{0, 0}

	for _, num1 := range arrayOne {
		for _, num2 := range arrayTwo {
			diff := abs(num1 - num2)
			if diff < smallest {
				smallest = diff
				result = []int{num1, num2}
			}

			// Early exit if perfect match
			if diff == 0 {
				return []int{num1, num2}
			}
		}
	}

	return result
}

// ============================================================================
// APPROACH 3: Binary Search
// ============================================================================
// Time Complexity:  O(n log m) assuming n < m
// Space Complexity: O(1)
//
// WHEN TO USE:
// - When one array is much larger than the other
// - When one array is already sorted
// ============================================================================

// SmallestDifferenceBinarySearch uses binary search to find closest elements.
//
// Useful when one array is much larger than the other.
func SmallestDifferenceBinarySearch(arrayOne, arrayTwo []int) []int {
	// Sort the second array for binary search
	arrayTwoSorted := make([]int, len(arrayTwo))
	copy(arrayTwoSorted, arrayTwo)
	sort.Ints(arrayTwoSorted)

	smallest := math.MaxInt64
	result := []int{0, 0}

	for _, num1 := range arrayOne {
		// Find insertion position
		pos := sort.SearchInts(arrayTwoSorted, num1)

		// Check element at position and before it
		candidates := []int{}
		if pos < len(arrayTwoSorted) {
			candidates = append(candidates, arrayTwoSorted[pos])
		}
		if pos > 0 {
			candidates = append(candidates, arrayTwoSorted[pos-1])
		}

		for _, num2 := range candidates {
			diff := abs(num1 - num2)
			if diff < smallest {
				smallest = diff
				result = []int{num1, num2}
			}

			if diff == 0 {
				return []int{num1, num2}
			}
		}
	}

	return result
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

// ============================================================================
// EDUCATIONAL: Detailed Walkthrough
// ============================================================================

// SmallestDifferenceExplained shows step-by-step solution process.
func SmallestDifferenceExplained(arrayOne, arrayTwo []int) []int {
	fmt.Printf("Input:\n")
	fmt.Printf("  arrayOne = %v\n", arrayOne)
	fmt.Printf("  arrayTwo = %v\n", arrayTwo)

	sort.Ints(arrayOne)
	sort.Ints(arrayTwo)

	fmt.Printf("\nAfter sorting:\n")
	fmt.Printf("  arrayOne = %v\n", arrayOne)
	fmt.Printf("  arrayTwo = %v\n", arrayTwo)

	i, j := 0, 0
	smallest := math.MaxInt64
	result := []int{0, 0}

	fmt.Printf("\nTwo-pointer traversal:\n")

	for i < len(arrayOne) && j < len(arrayTwo) {
		first := arrayOne[i]
		second := arrayTwo[j]
		currentDiff := abs(first - second)

		fmt.Printf("  i=%d, j=%d: arr1[%d]=%d, arr2[%d]=%d, diff=%d\n",
			i, j, i, first, j, second, currentDiff)

		if currentDiff < smallest {
			smallest = currentDiff
			result = []int{first, second}
			fmt.Printf("    → New best! pair=%v, diff=%d\n", result, smallest)
		}

		if first == second {
			fmt.Printf("  Perfect match found! Returning %v\n", result)
			return result
		}

		if first < second {
			fmt.Printf("    %d < %d, move i\n", first, second)
			i++
		} else {
			fmt.Printf("    %d > %d, move j\n", first, second)
			j++
		}
	}

	fmt.Printf("\nFinal result: %v with diff = %d\n", result, smallest)
	return result
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		arrayOne     []int
		arrayTwo     []int
		expectedDiff int
		desc         string
	}{
		{[]int{-1, 5, 10, 20, 28, 3}, []int{26, 134, 135, 15, 17}, 2, "Standard case"},
		{[]int{10, 1000}, []int{1001, 11}, 1, "Close large numbers"},
		{[]int{1, 3, 5, 7}, []int{2, 4, 5, 8}, 0, "Exact match exists"},
		{[]int{-10, -5, 0, 5}, []int{-8, -3, 2, 7}, 2, "Negative numbers"},
		{[]int{1}, []int{100}, 99, "Single elements"},
		{[]int{10, 5, 40, 79, 90}, []int{7, 62, 25, 80, 12}, 1, "Medium case"},
	}

	approaches := []struct {
		name string
		fn   func([]int, []int) []int
	}{
		{"Sort + Two Pointers (Recommended)", SmallestDifference},
		{"Brute Force", SmallestDifferenceBrute},
		{"Binary Search", SmallestDifferenceBinarySearch},
	}

	fmt.Println("======================================================================")
	fmt.Println("SMALLEST DIFFERENCE - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			// Copy slices to avoid modification
			arr1 := make([]int, len(tc.arrayOne))
			arr2 := make([]int, len(tc.arrayTwo))
			copy(arr1, tc.arrayOne)
			copy(arr2, tc.arrayTwo)

			result := approach.fn(arr1, arr2)
			actualDiff := abs(result[0] - result[1])
			status := "✓"
			if actualDiff != tc.expectedDiff {
				status = "✗"
				allPassed = false
			}
			fmt.Printf("  %s %s: %v (diff=%d)\n", status, tc.desc, result, actualDiff)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		} else {
			fmt.Println("  Some tests failed!")
		}
	}

	fmt.Println("\n======================================================================")
	fmt.Println("DETAILED WALKTHROUGH")
	fmt.Println("======================================================================")
	fmt.Println()
	SmallestDifferenceExplained([]int{-1, 5, 10, 20, 28, 3}, []int{26, 134, 135, 15, 17})

	fmt.Println("\n======================================================================")
	fmt.Println("COMPLEXITY COMPARISON")
	fmt.Println("======================================================================")
	fmt.Println(`
    ┌─────────────────────────┬──────────────────┬──────────┬──────────────────┐
    │       Approach          │       Time       │  Space   │  Recommendation  │
    ├─────────────────────────┼──────────────────┼──────────┼──────────────────┤
    │ 1. Sort + Two Pointers  │ O(n log n+m log m)│   O(1)  │  ⭐ BEST CHOICE  │
    │ 2. Brute Force          │     O(n × m)     │   O(1)   │  ⚠️ Slow         │
    │ 3. Binary Search        │ O(n log m)       │   O(1)   │  ✓ When n << m   │
    └─────────────────────────┴──────────────────┴──────────┴──────────────────┘

    Where: n = len(arrayOne), m = len(arrayTwo)
    `)
}
