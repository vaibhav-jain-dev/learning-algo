/*
Validate Subsequence - Go Solutions

Given two arrays, determine if the second is a subsequence of the first.
A subsequence maintains relative order but doesn't need to be contiguous.

This file contains MULTIPLE solution approaches with explanations.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Range Loop (For-Each) ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) where n is length of main array
// Space Complexity: O(1) - only one pointer variable
//
// WHY THIS IS BEST:
// - Idiomatic Go using range
// - Single pointer to track
// - Clean and readable
// - Optimal efficiency
// ============================================================================

// ValidateSubsequence checks if sequence is a valid subsequence of array
// using the recommended range-based approach.
//
// How it works:
//  1. Track position in sequence with seqIdx pointer
//  2. Iterate through main array using range
//  3. On match, advance sequence pointer
//  4. Return true if all sequence elements found
//
// Visual:
//
//	array:    [5, 1, 22, 25, 6, -1, 8, 10]
//	sequence: [1, 6, -1, 10]
//
//	Step through: 5≠1, 1=1✓, 22≠6, 25≠6, 6=6✓, -1=-1✓, 8≠10, 10=10✓
//	Found all 4 elements → true
func ValidateSubsequence(array []int, sequence []int) bool {
	seqIdx := 0

	for _, num := range array {
		// Early exit if we've found all sequence elements
		if seqIdx == len(sequence) {
			break
		}
		// Match found - advance sequence pointer
		if num == sequence[seqIdx] {
			seqIdx++
		}
	}

	return seqIdx == len(sequence)
}

// ============================================================================
// APPROACH 2: While-Style Loop (Two Pointers)
// ============================================================================
// Time Complexity:  O(n) - same as Approach 1
// Space Complexity: O(1) - two pointer variables
//
// WHEN TO USE THIS INSTEAD:
// - When you need explicit index access
// - When interviewer requests "two-pointer" solution
// - When modifying to track match positions
// ============================================================================

// ValidateSubsequenceWhile uses explicit while-style loop with two pointers.
//
// How it works:
//  1. Two pointers: arrIdx for array, seqIdx for sequence
//  2. Both start at 0
//  3. Always advance arrIdx
//  4. Advance seqIdx only on match
//  5. Stop when either reaches end
//
// Comparison with Approach 1:
// ┌─────────────────────────────────────────────────────────┐
// │  Approach 1 (range)         │  Approach 2 (for loop)   │
// ├─────────────────────────────────────────────────────────┤
// │  Implicit array index       │  Explicit arrIdx         │
// │  Single pointer             │  Two pointers            │
// │  More idiomatic Go          │  More explicit control   │
// │  Same O(n) time             │  Same O(n) time          │
// └─────────────────────────────────────────────────────────┘
func ValidateSubsequenceWhile(array []int, sequence []int) bool {
	arrIdx := 0
	seqIdx := 0

	for arrIdx < len(array) && seqIdx < len(sequence) {
		if array[arrIdx] == sequence[seqIdx] {
			seqIdx++
		}
		arrIdx++
	}

	return seqIdx == len(sequence)
}

// ============================================================================
// APPROACH 3: Recursive Solution
// ============================================================================
// Time Complexity:  O(n) - each element processed once
// Space Complexity: O(n) - call stack depth ⚠️ WORSE THAN ITERATIVE
//
// WHEN TO USE:
// - Learning recursion concepts
// - Building toward DP solutions
// - When problem naturally fits recursive structure
//
// WHEN NOT TO USE:
// - Large arrays (stack overflow risk)
// - Performance critical code
// ============================================================================

// ValidateSubsequenceRecursive validates using recursion.
//
// How it works:
//
//	Base Cases:
//	  - Empty sequence → true (found everything)
//	  - Empty array with non-empty sequence → false
//
//	Recursive Case:
//	  - Match: Check remaining array AND remaining sequence
//	  - No match: Check remaining array with SAME sequence
//
//	Recursion Tree Example:
//	validate([5,1,22,6], [1,6])
//	│
//	├── 5≠1: validate([1,22,6], [1,6])
//	│   │
//	│   └── 1=1: validate([22,6], [6])
//	│       │
//	│       └── 22≠6: validate([6], [6])
//	│           │
//	│           └── 6=6: validate([], [])
//	│               │
//	│               └── Empty sequence → true ✓
func ValidateSubsequenceRecursive(array []int, sequence []int) bool {
	return recursiveHelper(array, sequence, 0, 0)
}

func recursiveHelper(array, sequence []int, arrIdx, seqIdx int) bool {
	// Base case: found all sequence elements
	if seqIdx == len(sequence) {
		return true
	}

	// Base case: array exhausted but sequence remains
	if arrIdx == len(array) {
		return false
	}

	// Recursive case
	if array[arrIdx] == sequence[seqIdx] {
		// Match - advance both pointers
		return recursiveHelper(array, sequence, arrIdx+1, seqIdx+1)
	}
	// No match - only advance array pointer
	return recursiveHelper(array, sequence, arrIdx+1, seqIdx)
}

// ============================================================================
// APPROACH 4: Index Finding (Less Optimal)
// ============================================================================
// Time Complexity:  O(n * m) worst case ⚠️ SUBOPTIMAL
// Space Complexity: O(1)
//
// WHY IT'S SUBOPTIMAL:
// - May re-scan portions of array multiple times
// - O(n*m) vs O(n) for two-pointer approach
//
// EDUCATIONAL VALUE:
// - Shows common beginner approach
// - Demonstrates why two-pointer is better
// ============================================================================

// ValidateSubsequenceIndexFind validates by finding each element's index.
//
// How it works:
//  1. For each sequence element
//  2. Find it in array (starting after previous found position)
//  3. If not found, return false
//  4. Update search start position
//
// Why it's slower:
// ┌─────────────────────────────────────────────────────────┐
// │  Array: [1, 1, 1, 1, 1, 2]                              │
// │  Sequence: [1, 1, 1, 1, 2]                              │
// │                                                         │
// │  Two-pointer: Scans array ONCE → O(n)                   │
// │  Index-find:  Multiple scans → O(n*m)                   │
// └─────────────────────────────────────────────────────────┘
func ValidateSubsequenceIndexFind(array []int, sequence []int) bool {
	searchStart := 0

	for _, target := range sequence {
		found := false
		for i := searchStart; i < len(array); i++ {
			if array[i] == target {
				searchStart = i + 1
				found = true
				break
			}
		}
		if !found {
			return false
		}
	}

	return true
}

// ============================================================================
// TEST CASES AND COMPARISON
// ============================================================================

func main() {
	// Test cases
	testCases := []struct {
		array    []int
		sequence []int
		expected bool
		desc     string
	}{
		{[]int{5, 1, 22, 25, 6, -1, 8, 10}, []int{1, 6, -1, 10}, true, "Standard case"},
		{[]int{5, 1, 22, 25, 6, -1, 8, 10}, []int{5, 1, 22, 25, 6, -1, 8, 10}, true, "Full array"},
		{[]int{5, 1, 22, 25, 6, -1, 8, 10}, []int{5, 1, 22, 6, -1, 8, 10}, true, "Skip elements"},
		{[]int{5, 1, 22, 25, 6, -1, 8, 10}, []int{1, 6, 10, -1}, false, "Wrong order"},
		{[]int{1, 2, 3, 4}, []int{2, 4}, true, "Simple case"},
		{[]int{1, 2, 3, 4}, []int{5}, false, "Not present"},
		{[]int{1}, []int{1}, true, "Single match"},
		{[]int{1}, []int{2}, false, "Single no match"},
		{[]int{1, 1, 1, 1}, []int{1, 1}, true, "Duplicates"},
		{[]int{-5, -4, -3}, []int{-5, -3}, true, "Negative numbers"},
	}

	approaches := []struct {
		name string
		fn   func([]int, []int) bool
	}{
		{"Range Loop (Recommended)", ValidateSubsequence},
		{"While Loop", ValidateSubsequenceWhile},
		{"Recursive", ValidateSubsequenceRecursive},
		{"Index Finding", ValidateSubsequenceIndexFind},
	}

	fmt.Println("======================================================================")
	fmt.Println("VALIDATE SUBSEQUENCE - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			// Copy slices to avoid modification
			arr := make([]int, len(tc.array))
			seq := make([]int, len(tc.sequence))
			copy(arr, tc.array)
			copy(seq, tc.sequence)

			result := approach.fn(arr, seq)
			status := "✓"
			if result != tc.expected {
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
    ┌───────────────────┬──────────┬──────────┬──────────────────┐
    │     Approach      │   Time   │  Space   │  Recommendation  │
    ├───────────────────┼──────────┼──────────┼──────────────────┤
    │ 1. Range Loop     │   O(n)   │   O(1)   │  ⭐ BEST CHOICE  │
    │ 2. While Loop     │   O(n)   │   O(1)   │  ✓ Also great    │
    │ 3. Recursive      │   O(n)   │   O(n)   │  ⚠️ Learning only│
    │ 4. Index Finding  │  O(n*m)  │   O(1)   │  ✗ Not optimal   │
    └───────────────────┴──────────┴──────────┴──────────────────┘
    `)
}
