/*
Sorted Squared Array Without Duplicates - Go Solutions

Square elements and return sorted unique values.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"sort"
)

// ============================================================================
// APPROACH 1: Two Pointers with Deduplication ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - single pass
// Space Complexity: O(n) - for result
//
// WHY THIS IS BEST:
// - Optimal time complexity
// - Handles deduplication inline
// ============================================================================

// SortedSquaredUnique squares and deduplicates using two pointers.
func SortedSquaredUnique(array []int) []int {
	if len(array) == 0 {
		return []int{}
	}

	n := len(array)
	result := make([]int, 0, n)
	left, right := 0, n-1
	lastAdded := -1 // Use -1 as sentinel since squares are non-negative

	for left <= right {
		leftSq := array[left] * array[left]
		rightSq := array[right] * array[right]

		if leftSq > rightSq {
			if lastAdded == -1 || leftSq != lastAdded {
				result = append(result, leftSq)
				lastAdded = leftSq
			}
			left++
		} else if rightSq > leftSq {
			if lastAdded == -1 || rightSq != lastAdded {
				result = append(result, rightSq)
				lastAdded = rightSq
			}
			right--
		} else { // equal
			if lastAdded == -1 || leftSq != lastAdded {
				result = append(result, leftSq)
				lastAdded = leftSq
			}
			left++
			right--
		}
	}

	// Reverse the result
	for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
		result[i], result[j] = result[j], result[i]
	}

	return result
}

// ============================================================================
// APPROACH 2: Map-Based Deduplication
// ============================================================================
// Time Complexity:  O(n log n) - due to sorting
// Space Complexity: O(n)
// ============================================================================

// SortedSquaredUniqueMap uses a map to handle duplicates.
func SortedSquaredUniqueMap(array []int) []int {
	seen := make(map[int]bool)

	for _, x := range array {
		sq := x * x
		seen[sq] = true
	}

	result := make([]int, 0, len(seen))
	for sq := range seen {
		result = append(result, sq)
	}

	sort.Ints(result)
	return result
}

// ============================================================================
// APPROACH 3: Two Pointers with Map Check
// ============================================================================
// Time Complexity:  O(n) average
// Space Complexity: O(n)
// ============================================================================

// SortedSquaredUniqueHybrid combines two pointers with map check.
func SortedSquaredUniqueHybrid(array []int) []int {
	if len(array) == 0 {
		return []int{}
	}

	n := len(array)
	result := make([]int, 0, n)
	seen := make(map[int]bool)
	left, right := 0, n-1

	for left <= right {
		leftSq := array[left] * array[left]
		rightSq := array[right] * array[right]

		if leftSq >= rightSq {
			if !seen[leftSq] {
				result = append(result, leftSq)
				seen[leftSq] = true
			}
			left++
		} else {
			if !seen[rightSq] {
				result = append(result, rightSq)
				seen[rightSq] = true
			}
			right--
		}
	}

	// Reverse
	for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
		result[i], result[j] = result[j], result[i]
	}

	return result
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
		{[]int{-3, -2, -1, 1, 2, 3}, []int{1, 4, 9}, "Symmetric pairs"},
		{[]int{-5, -3, 0, 2, 3, 5}, []int{0, 4, 9, 25}, "With zero"},
		{[]int{1, 2, 3, 4, 5}, []int{1, 4, 9, 16, 25}, "All positive"},
		{[]int{-1, 1}, []int{1}, "Single duplicate"},
		{[]int{0}, []int{0}, "Single zero"},
	}

	fmt.Println("======================================================================")
	fmt.Println("SORTED SQUARED UNIQUE - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, tc := range testCases {
		result := SortedSquaredUnique(tc.array)
		status := "✓"
		if !slicesEqual(result, tc.expected) {
			status = "✗"
		}
		fmt.Printf("%s %s: %v\n", status, tc.desc, result)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	array := []int{-3, -2, -1, 1, 2, 3}
	fmt.Printf("\nInput: array = %v\n", array)
	fmt.Printf("Output: %v\n", SortedSquaredUnique(array))
}

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
