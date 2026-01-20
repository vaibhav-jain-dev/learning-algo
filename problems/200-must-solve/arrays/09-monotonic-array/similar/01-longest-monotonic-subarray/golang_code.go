/*
Longest Monotonic Subarray - Go Solutions

Find the length of the longest contiguous monotonic subarray.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Single Pass (Recommended)
// ============================================================================
// Time Complexity:  O(n) - single pass
// Space Complexity: O(1) - constant extra space
//
// WHY THIS IS BEST:
// - Single pass through array
// - Tracks both increasing and decreasing simultaneously
// - Simple and efficient
// ============================================================================

// LongestMonotonicSubarray finds length of longest contiguous monotonic subarray.
func LongestMonotonicSubarray(array []int) int {
	if len(array) == 0 {
		return 0
	}

	maxLen := 1
	incLen := 1 // Length of non-decreasing ending at current
	decLen := 1 // Length of non-increasing ending at current

	for i := 1; i < len(array); i++ {
		if array[i] >= array[i-1] {
			incLen++
		} else {
			incLen = 1
		}

		if array[i] <= array[i-1] {
			decLen++
		} else {
			decLen = 1
		}

		maxLen = max(maxLen, max(incLen, decLen))
	}

	return maxLen
}

// ============================================================================
// APPROACH 2: Two Separate Passes
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// WHEN TO USE:
// - Clearer separation of concerns
// - Easier to debug
// ============================================================================

// LongestMonotonicTwoPass finds longest monotonic using two separate passes.
func LongestMonotonicTwoPass(array []int) int {
	if len(array) == 0 {
		return 0
	}

	// Find longest non-decreasing
	maxInc := 1
	currInc := 1
	for i := 1; i < len(array); i++ {
		if array[i] >= array[i-1] {
			currInc++
			maxInc = max(maxInc, currInc)
		} else {
			currInc = 1
		}
	}

	// Find longest non-increasing
	maxDec := 1
	currDec := 1
	for i := 1; i < len(array); i++ {
		if array[i] <= array[i-1] {
			currDec++
			maxDec = max(maxDec, currDec)
		} else {
			currDec = 1
		}
	}

	return max(maxInc, maxDec)
}

// ============================================================================
// APPROACH 3: DP with Arrays (For visualization/debugging)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) - stores all lengths
//
// WHEN TO USE:
// - Need to see full state at each position
// - Debugging or educational purposes
// ============================================================================

// LongestMonotonicDP uses DP approach that stores all intermediate values.
// Returns (maxLength, startIndex, endIndex) of longest monotonic subarray.
func LongestMonotonicDP(array []int) (int, int, int) {
	if len(array) == 0 {
		return 0, -1, -1
	}

	n := len(array)
	inc := make([]int, n) // Non-decreasing length ending at i
	dec := make([]int, n) // Non-increasing length ending at i

	inc[0] = 1
	dec[0] = 1

	for i := 1; i < n; i++ {
		inc[i] = 1
		dec[i] = 1

		if array[i] >= array[i-1] {
			inc[i] = inc[i-1] + 1
		}
		if array[i] <= array[i-1] {
			dec[i] = dec[i-1] + 1
		}
	}

	// Find maximum and its position
	maxLen := 1
	endIdx := 0

	for i := 0; i < n; i++ {
		if inc[i] > maxLen {
			maxLen = inc[i]
			endIdx = i
		}
		if dec[i] > maxLen {
			maxLen = dec[i]
			endIdx = i
		}
	}

	startIdx := endIdx - maxLen + 1
	return maxLen, startIdx, endIdx
}

// GetLongestMonotonicSubarray returns the actual longest monotonic subarray.
func GetLongestMonotonicSubarray(array []int) []int {
	maxLen, start, end := LongestMonotonicDP(array)
	if start == -1 {
		return []int{}
	}
	result := make([]int, maxLen)
	copy(result, array[start:end+1])
	return result
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
		{[]int{1, 4, 3, 2, 5, 6, 7}, 4, "Standard case"},
		{[]int{5, 4, 3, 2, 1}, 5, "All decreasing"},
		{[]int{1, 2, 3, 4, 5}, 5, "All increasing"},
		{[]int{1, 2, 2, 3, 1}, 4, "With equal elements"},
		{[]int{1}, 1, "Single element"},
		{[]int{}, 0, "Empty array"},
		{[]int{1, 3, 2, 4, 3, 5}, 2, "Alternating"},
		{[]int{5, 5, 5, 5}, 4, "All equal"},
		{[]int{1, 2, 1, 2, 1}, 2, "Zigzag"},
	}

	approaches := []struct {
		name string
		fn   func([]int) int
	}{
		{"Single Pass (Recommended)", LongestMonotonicSubarray},
		{"Two Passes", LongestMonotonicTwoPass},
		{"DP Array", func(arr []int) int { l, _, _ := LongestMonotonicDP(arr); return l }},
	}

	fmt.Println("======================================================================")
	fmt.Println("LONGEST MONOTONIC SUBARRAY - TEST RESULTS")
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
	array := []int{1, 4, 3, 2, 5, 6, 7}
	fmt.Printf("\nInput: array = %v\n", array)
	result := LongestMonotonicSubarray(array)
	subarray := GetLongestMonotonicSubarray(array)
	fmt.Printf("Output: %d\n", result)
	fmt.Printf("Subarray: %v\n", subarray)

	// Sample Input 2
	array = []int{5, 4, 3, 2, 1}
	fmt.Printf("\nInput: array = %v\n", array)
	result = LongestMonotonicSubarray(array)
	subarray = GetLongestMonotonicSubarray(array)
	fmt.Printf("Output: %d\n", result)
	fmt.Printf("Subarray: %v\n", subarray)

	// Sample Input 3
	array = []int{1, 2, 2, 3, 1}
	fmt.Printf("\nInput: array = %v\n", array)
	result = LongestMonotonicSubarray(array)
	subarray = GetLongestMonotonicSubarray(array)
	fmt.Printf("Output: %d\n", result)
	fmt.Printf("Subarray: %v\n", subarray)
}
