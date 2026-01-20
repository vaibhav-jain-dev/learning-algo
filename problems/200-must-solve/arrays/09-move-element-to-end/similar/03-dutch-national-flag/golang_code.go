/*
Dutch National Flag (3-Way Partition) - Go Solutions

Partition array into three sections: < pivot, == pivot, > pivot.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Three-Pointer (Dutch National Flag) - Recommended
// ============================================================================
// Time Complexity:  O(n) - single pass
// Space Complexity: O(1) - in-place
//
// WHY THIS IS BEST:
// - Single pass through array
// - In-place, constant extra space
// - Elegant handling of three categories
// ============================================================================

// DutchNationalFlag partitions array into < pivot, == pivot, > pivot sections.
func DutchNationalFlag(array []int, pivot int) []int {
	low, mid, high := 0, 0, len(array)-1

	for mid <= high {
		if array[mid] < pivot {
			// Element belongs in "less than" section
			array[low], array[mid] = array[mid], array[low]
			low++
			mid++
		} else if array[mid] == pivot {
			// Element is in correct section
			mid++
		} else { // array[mid] > pivot
			// Element belongs in "greater than" section
			array[mid], array[high] = array[high], array[mid]
			high--
			// Don't increment mid - need to examine swapped element
		}
	}

	return array
}

// ============================================================================
// APPROACH 2: Two-Pass Partition
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// WHEN TO USE:
// - Easier to understand
// - When code clarity is priority
// ============================================================================

// DutchFlagTwoPass uses two passes to partition the array.
func DutchFlagTwoPass(array []int, pivot int) []int {
	// First pass: move all elements < pivot to front
	writeIdx := 0
	for i := range array {
		if array[i] < pivot {
			array[writeIdx], array[i] = array[i], array[writeIdx]
			writeIdx++
		}
	}

	// Second pass: from writeIdx, move elements == pivot to front of remaining
	equalIdx := writeIdx
	for i := writeIdx; i < len(array); i++ {
		if array[i] == pivot {
			array[equalIdx], array[i] = array[i], array[equalIdx]
			equalIdx++
		}
	}

	return array
}

// ============================================================================
// APPROACH 3: Count and Place
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) - for storing values
//
// WHEN TO USE:
// - When counting is intuitive
// - When preserving exact non-pivot values
// ============================================================================

// DutchFlagCount counts elements then rebuilds array.
func DutchFlagCount(array []int, pivot int) []int {
	lessVals := make([]int, 0)
	equalCount := 0
	greaterVals := make([]int, 0)

	for _, val := range array {
		if val < pivot {
			lessVals = append(lessVals, val)
		} else if val == pivot {
			equalCount++
		} else {
			greaterVals = append(greaterVals, val)
		}
	}

	// Fill array
	idx := 0
	for _, val := range lessVals {
		array[idx] = val
		idx++
	}
	for i := 0; i < equalCount; i++ {
		array[idx] = pivot
		idx++
	}
	for _, val := range greaterVals {
		array[idx] = val
		idx++
	}

	return array
}

// ============================================================================
// SPECIAL CASE: Sort Colors (LeetCode 75)
// ============================================================================

// SortColors sorts an array containing only 0, 1, 2.
// This is Dutch National Flag with pivot=1.
func SortColors(nums []int) []int {
	return DutchNationalFlag(nums, 1)
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	// Helper to check if partition is valid
	isValidPartition := func(arr []int, pivot int) bool {
		lessEnded := false
		equalEnded := false
		for _, x := range arr {
			if x < pivot {
				if lessEnded {
					return false
				}
			} else if x == pivot {
				lessEnded = true
				if equalEnded {
					return false
				}
			} else { // x > pivot
				lessEnded = true
				equalEnded = true
			}
		}
		return true
	}

	testCases := []struct {
		array []int
		pivot int
		desc  string
	}{
		{[]int{2, 0, 1, 2, 1, 0}, 1, "Standard case"},
		{[]int{1, 4, 2, 5, 3, 6}, 3, "Mixed values"},
		{[]int{3, 3, 3, 3}, 3, "All equal to pivot"},
		{[]int{1, 2, 3}, 5, "All less than pivot"},
		{[]int{5, 6, 7}, 3, "All greater than pivot"},
		{[]int{}, 1, "Empty array"},
		{[]int{1}, 1, "Single element equals pivot"},
		{[]int{2, 1, 0}, 1, "Small array"},
		{[]int{0, 0, 1, 1, 2, 2}, 1, "Already sorted"},
	}

	approaches := []struct {
		name string
		fn   func([]int, int) []int
	}{
		{"Three-Pointer (DNF)", DutchNationalFlag},
		{"Two-Pass Partition", DutchFlagTwoPass},
		{"Count and Place", DutchFlagCount},
	}

	fmt.Println("======================================================================")
	fmt.Println("DUTCH NATIONAL FLAG (3-WAY PARTITION) - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			arrayCopy := make([]int, len(tc.array))
			copy(arrayCopy, tc.array)

			result := approach.fn(arrayCopy, tc.pivot)
			valid := isValidPartition(result, tc.pivot)
			status := "PASS"
			if !valid {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  %s: %s (pivot=%d) -> %v\n", status, tc.desc, tc.pivot, result)
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
	array := []int{2, 0, 1, 2, 1, 0}
	pivot := 1
	fmt.Printf("\nInput: array = %v, pivot = %d\n", array, pivot)
	result := DutchNationalFlag(append([]int{}, array...), pivot)
	fmt.Printf("Output: %v\n", result)

	// Sample Input 2
	array = []int{1, 4, 2, 5, 3, 6}
	pivot = 3
	fmt.Printf("\nInput: array = %v, pivot = %d\n", array, pivot)
	result = DutchNationalFlag(append([]int{}, array...), pivot)
	fmt.Printf("Output: %v\n", result)

	// Sample Input 3 (Sort Colors)
	fmt.Println("\n--- Sort Colors (LeetCode 75) ---")
	nums := []int{2, 0, 2, 1, 1, 0}
	fmt.Printf("Input: nums = %v\n", nums)
	result = SortColors(append([]int{}, nums...))
	fmt.Printf("Output: %v\n", result)
}
