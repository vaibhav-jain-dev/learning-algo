/*
Partition Array by Predicate - Go Solutions

Rearrange array so elements satisfying predicate come before those that don't.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Two-Pointer Swap (Recommended)
// ============================================================================
// Time Complexity:  O(n) - single pass
// Space Complexity: O(1) - in-place
//
// WHY THIS IS BEST:
// - Single pass through array
// - In-place modification
// - Minimal number of swaps
// ============================================================================

// PartitionByPredicate partitions array so elements satisfying predicate come first.
func PartitionByPredicate(array []int, predicate func(int) bool) []int {
	left, right := 0, len(array)-1

	for left < right {
		// Move left until we find element that doesn't satisfy
		for left < right && predicate(array[left]) {
			left++
		}

		// Move right until we find element that satisfies
		for left < right && !predicate(array[right]) {
			right--
		}

		// Swap if pointers haven't crossed
		if left < right {
			array[left], array[right] = array[right], array[left]
			left++
			right--
		}
	}

	return array
}

// ============================================================================
// APPROACH 2: Stable Partition (Preserves Order)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) - extra slice
//
// WHEN TO USE:
// - Need to preserve relative order within partitions
// ============================================================================

// PartitionStable performs stable partition preserving relative order.
func PartitionStable(array []int, predicate func(int) bool) []int {
	satisfies := make([]int, 0)
	notSatisfies := make([]int, 0)

	for _, val := range array {
		if predicate(val) {
			satisfies = append(satisfies, val)
		} else {
			notSatisfies = append(notSatisfies, val)
		}
	}

	return append(satisfies, notSatisfies...)
}

// ============================================================================
// APPROACH 3: In-Place with Count
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) - temporary storage
//
// WHEN TO USE:
// - Want stable partition
// - Need to modify original array
// ============================================================================

// PartitionStableInPlace performs stable partition modifying original array.
func PartitionStableInPlace(array []int, predicate func(int) bool) []int {
	notSatisfying := make([]int, 0)
	writeIdx := 0

	for _, val := range array {
		if predicate(val) {
			array[writeIdx] = val
			writeIdx++
		} else {
			notSatisfying = append(notSatisfying, val)
		}
	}

	for _, val := range notSatisfying {
		array[writeIdx] = val
		writeIdx++
	}

	return array
}

// ============================================================================
// COMMON PREDICATES
// ============================================================================

func isEven(x int) bool {
	return x%2 == 0
}

func isOdd(x int) bool {
	return x%2 == 1
}

func isPositive(x int) bool {
	return x > 0
}

func greaterThan(threshold int) func(int) bool {
	return func(x int) bool {
		return x > threshold
	}
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	// Helper to check if partition is valid
	isValidPartition := func(arr []int, pred func(int) bool) bool {
		foundNonSatisfying := false
		for _, x := range arr {
			if !pred(x) {
				foundNonSatisfying = true
			} else if foundNonSatisfying {
				return false
			}
		}
		return true
	}

	type testCase struct {
		array    []int
		pred     func(int) bool
		predName string
		desc     string
	}

	testCases := []testCase{
		{[]int{1, 4, 2, 5, 3, 6}, isEven, "isEven", "Standard case"},
		{[]int{3, 1, 4, 1, 5, 9, 2, 6}, greaterThan(3), "x > 3", "Greater than threshold"},
		{[]int{1, 2, 3, 4, 5}, isOdd, "isOdd", "Odds first"},
		{[]int{-3, 1, -2, 4, -5}, isPositive, "isPositive", "Positive first"},
		{[]int{2, 4, 6, 8}, isEven, "isEven", "All satisfy"},
		{[]int{1, 3, 5, 7}, isEven, "isEven", "None satisfy"},
		{[]int{}, isEven, "isEven", "Empty array"},
		{[]int{1}, isEven, "isEven", "Single element"},
	}

	type approach struct {
		name string
		fn   func([]int, func(int) bool) []int
	}

	approaches := []approach{
		{"Two-Pointer (Recommended)", PartitionByPredicate},
		{"Stable Partition", PartitionStable},
		{"Stable In-Place", PartitionStableInPlace},
	}

	fmt.Println("======================================================================")
	fmt.Println("PARTITION ARRAY BY PREDICATE - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, ap := range approaches {
		fmt.Printf("\n%s:\n", ap.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			arrayCopy := make([]int, len(tc.array))
			copy(arrayCopy, tc.array)

			result := ap.fn(arrayCopy, tc.pred)
			valid := isValidPartition(result, tc.pred)
			status := "PASS"
			if !valid {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  %s: %s (%s) -> %v\n", status, tc.desc, tc.predName, result)
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
	array := []int{1, 4, 2, 5, 3, 6}
	fmt.Printf("\nInput: array = %v, predicate = isEven\n", array)
	result := PartitionByPredicate(append([]int{}, array...), isEven)
	fmt.Printf("Output: %v\n", result)

	// Sample Input 2
	array = []int{3, 1, 4, 1, 5, 9, 2, 6}
	fmt.Printf("\nInput: array = %v, predicate = x > 3\n", array)
	result = PartitionByPredicate(append([]int{}, array...), greaterThan(3))
	fmt.Printf("Output: %v\n", result)

	// Sample Input 3
	array = []int{1, 2, 3, 4, 5}
	fmt.Printf("\nInput: array = %v, predicate = isOdd\n", array)
	result = PartitionByPredicate(append([]int{}, array...), isOdd)
	fmt.Printf("Output: %v\n", result)
}
