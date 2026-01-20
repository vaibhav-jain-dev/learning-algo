/*
Minimum Removals for Monotonic Array - Go Solutions

Find minimum elements to remove to make array monotonic.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"sort"
)

// ============================================================================
// APPROACH 1: O(n^2) DP (Straightforward)
// ============================================================================
// Time Complexity:  O(n^2)
// Space Complexity: O(n)
//
// WHY THIS IS GOOD:
// - Easy to understand
// - Works for all cases
// - Good for interviews to explain
// ============================================================================

// MinRemovalsForMonotonic finds minimum removals to make array monotonic.
func MinRemovalsForMonotonic(array []int) int {
	if len(array) <= 1 {
		return 0
	}

	n := len(array)

	// Find LNDS (Longest Non-Decreasing Subsequence)
	dpInc := make([]int, n)
	for i := range dpInc {
		dpInc[i] = 1
	}

	for i := 1; i < n; i++ {
		for j := 0; j < i; j++ {
			if array[i] >= array[j] && dpInc[j]+1 > dpInc[i] {
				dpInc[i] = dpInc[j] + 1
			}
		}
	}

	// Find LNIS (Longest Non-Increasing Subsequence)
	dpDec := make([]int, n)
	for i := range dpDec {
		dpDec[i] = 1
	}

	for i := 1; i < n; i++ {
		for j := 0; j < i; j++ {
			if array[i] <= array[j] && dpDec[j]+1 > dpDec[i] {
				dpDec[i] = dpDec[j] + 1
			}
		}
	}

	// Find maximum
	maxInc := 0
	maxDec := 0
	for i := 0; i < n; i++ {
		maxInc = max(maxInc, dpInc[i])
		maxDec = max(maxDec, dpDec[i])
	}

	return n - max(maxInc, maxDec)
}

// ============================================================================
// APPROACH 2: O(n log n) Binary Search
// ============================================================================
// Time Complexity:  O(n log n)
// Space Complexity: O(n)
//
// WHEN TO USE:
// - Large arrays
// - Performance critical
// ============================================================================

// MinRemovalsOptimized uses binary search for better performance.
func MinRemovalsOptimized(array []int) int {
	if len(array) <= 1 {
		return 0
	}

	lnds := longestNonDecreasing(array)
	lnis := longestNonIncreasing(array)

	return len(array) - max(lnds, lnis)
}

// longestNonDecreasing finds LNDS using binary search.
func longestNonDecreasing(arr []int) int {
	tails := make([]int, 0)

	for _, num := range arr {
		// Find position using binary search (upper bound for non-decreasing)
		pos := sort.Search(len(tails), func(i int) bool {
			return tails[i] > num
		})

		if pos == len(tails) {
			tails = append(tails, num)
		} else {
			tails[pos] = num
		}
	}

	return len(tails)
}

// longestNonIncreasing finds LNIS by negating and finding LNDS.
func longestNonIncreasing(arr []int) int {
	negated := make([]int, len(arr))
	for i, v := range arr {
		negated[i] = -v
	}
	return longestNonDecreasing(negated)
}

// ============================================================================
// BONUS: Return the elements to remove
// ============================================================================

// GetElementsToRemove returns min removals, elements to keep, and elements to remove.
func GetElementsToRemove(array []int) (int, []int, []int) {
	if len(array) <= 1 {
		result := make([]int, len(array))
		copy(result, array)
		return 0, result, []int{}
	}

	n := len(array)

	// Find LNDS with backtracking
	dp := make([]int, n)
	parent := make([]int, n)
	for i := range dp {
		dp[i] = 1
		parent[i] = -1
	}

	for i := 1; i < n; i++ {
		for j := 0; j < i; j++ {
			if array[i] >= array[j] && dp[j]+1 > dp[i] {
				dp[i] = dp[j] + 1
				parent[i] = j
			}
		}
	}

	// Find end of longest subsequence
	maxLen := 0
	endIdx := 0
	for i, v := range dp {
		if v > maxLen {
			maxLen = v
			endIdx = i
		}
	}

	// Backtrack to find subsequence
	keepIndices := make([]int, 0)
	idx := endIdx
	for idx != -1 {
		keepIndices = append(keepIndices, idx)
		idx = parent[idx]
	}

	// Reverse keepIndices
	for i, j := 0, len(keepIndices)-1; i < j; i, j = i+1, j-1 {
		keepIndices[i], keepIndices[j] = keepIndices[j], keepIndices[i]
	}

	// Build keep set
	keepSet := make(map[int]bool)
	for _, i := range keepIndices {
		keepSet[i] = true
	}

	toKeep := make([]int, len(keepIndices))
	for i, idx := range keepIndices {
		toKeep[i] = array[idx]
	}

	toRemove := make([]int, 0)
	for i := 0; i < n; i++ {
		if !keepSet[i] {
			toRemove = append(toRemove, array[i])
		}
	}

	return n - maxLen, toKeep, toRemove
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		array    []int
		expected int
		desc     string
	}{
		{[]int{1, 3, 2, 4, 5, 3}, 2, "Standard case"},
		{[]int{5, 4, 3, 2, 1}, 0, "Already decreasing"},
		{[]int{1, 2, 3, 4, 5}, 0, "Already increasing"},
		{[]int{1, 2, 1, 2, 1}, 2, "Zigzag pattern"},
		{[]int{1}, 0, "Single element"},
		{[]int{}, 0, "Empty array"},
		{[]int{1, 1, 1, 1}, 0, "All equal"},
		{[]int{3, 1, 2, 4}, 1, "One removal needed"},
	}

	approaches := []struct {
		name string
		fn   func([]int) int
	}{
		{"O(n^2) DP", MinRemovalsForMonotonic},
		{"O(n log n) Binary Search", MinRemovalsOptimized},
	}

	fmt.Println("======================================================================")
	fmt.Println("MINIMUM REMOVALS FOR MONOTONIC - TEST RESULTS")
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
			fmt.Printf("  %s: %s: %d (expected %d)\n", status, tc.desc, result, tc.expected)
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
	array := []int{1, 3, 2, 4, 5, 3}
	fmt.Printf("\nInput: array = %v\n", array)
	result := MinRemovalsForMonotonic(array)
	removals, keep, remove := GetElementsToRemove(array)
	fmt.Printf("Minimum removals: %d\n", result)
	fmt.Printf("Keep: %v\n", keep)
	fmt.Printf("Remove: %v\n", remove)
	_ = removals

	// Sample Input 2
	array = []int{5, 4, 3, 2, 1}
	fmt.Printf("\nInput: array = %v\n", array)
	result = MinRemovalsForMonotonic(array)
	fmt.Printf("Minimum removals: %d\n", result)

	// Sample Input 3
	array = []int{1, 2, 1, 2, 1}
	fmt.Printf("\nInput: array = %v\n", array)
	result = MinRemovalsForMonotonic(array)
	removals, keep, remove = GetElementsToRemove(array)
	fmt.Printf("Minimum removals: %d\n", result)
	fmt.Printf("Keep: %v\n", keep)
	fmt.Printf("Remove: %v\n", remove)
}
