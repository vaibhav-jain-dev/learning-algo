/*
Two Number Sum - Go Solutions

Find two numbers in an array that sum to a target value.

This file contains MULTIPLE solution approaches with explanations.
*/

package main

import (
	"fmt"
	"sort"
)

// ============================================================================
// APPROACH 1: Hash Table (One Pass) - RECOMMENDED
// ============================================================================
// Time Complexity:  O(n) - single pass through array
// Space Complexity: O(n) - hash map stores seen numbers
//
// WHY THIS IS BEST:
// - Optimal O(n) time complexity
// - Simple, clean implementation
// - Works on unsorted arrays
// ============================================================================

// TwoNumberSum finds two numbers that sum to target using hash table.
//
// How it works:
//  1. For each number, calculate its complement (target - number)
//  2. Check if complement exists in our map of seen numbers
//  3. If yes, we found our pair
//  4. If no, add current number to seen map
//
// Visual:
//
//	array = [3, 5, -4, 8, 11, 1, -1, 6], target = 10
//
//	num=3:  need 7,  seen={} -> add 3
//	num=5:  need 5,  seen={3} -> add 5
//	num=-4: need 14, seen={3,5} -> add -4
//	num=8:  need 2,  seen={3,5,-4} -> add 8
//	num=11: need -1, seen={3,5,-4,8} -> add 11
//	num=1:  need 9,  seen={3,5,-4,8,11} -> add 1
//	num=-1: need 11, seen={3,5,-4,8,11,1} -> 11 FOUND!
//	Return [-1, 11]
func TwoNumberSum(array []int, targetSum int) []int {
	seen := make(map[int]bool)

	for _, num := range array {
		complement := targetSum - num
		if seen[complement] {
			return []int{complement, num}
		}
		seen[num] = true
	}

	return []int{}
}

// ============================================================================
// APPROACH 2: Two Pointers (Sort First)
// ============================================================================
// Time Complexity:  O(n log n) - dominated by sorting
// Space Complexity: O(1) - if sorting in place (O(n) if not)
//
// WHEN TO USE:
// - When array is already sorted
// - When you can't use extra space
// - When interviewer asks for different approach
// ============================================================================

// TwoNumberSumTwoPointers finds two numbers using two pointers after sorting.
//
// How it works:
//  1. Sort the array
//  2. Left pointer at start, right pointer at end
//  3. Calculate sum of elements at both pointers
//  4. If sum == target: found it!
//  5. If sum < target: move left pointer right (need bigger sum)
//  6. If sum > target: move right pointer left (need smaller sum)
//
// Visual:
//
//	array = [3, 5, -4, 8, 11, 1, -1, 6], target = 10
//	sorted = [-4, -1, 1, 3, 5, 6, 8, 11]
//
//	L=0, R=7: -4 + 11 = 7 < 10 -> L++
//	L=1, R=7: -1 + 11 = 10 == target -> FOUND!
//	Return [-1, 11]
func TwoNumberSumTwoPointers(array []int, targetSum int) []int {
	// Sort the array
	sort.Ints(array)

	left := 0
	right := len(array) - 1

	for left < right {
		currentSum := array[left] + array[right]

		if currentSum == targetSum {
			return []int{array[left], array[right]}
		} else if currentSum < targetSum {
			left++
		} else {
			right--
		}
	}

	return []int{}
}

// ============================================================================
// APPROACH 3: Brute Force
// ============================================================================
// Time Complexity:  O(n^2) - nested loops
// Space Complexity: O(1) - no extra space
//
// EDUCATIONAL VALUE:
// - Simplest to understand and implement
// - Shows why optimization is needed
// - Good baseline for comparison
// ============================================================================

// TwoNumberSumBruteForce finds two numbers using brute force.
//
// How it works:
//  1. For each element at index i
//  2. Check all elements at index j > i
//  3. If array[i] + array[j] == target, return pair
//
// Why it's slower:
//
//	For each of n elements, we check up to n-1 other elements
//	Total comparisons: n * (n-1) / 2 = O(n^2)
func TwoNumberSumBruteForce(array []int, targetSum int) []int {
	n := len(array)

	for i := 0; i < n-1; i++ {
		for j := i + 1; j < n; j++ {
			if array[i]+array[j] == targetSum {
				return []int{array[i], array[j]}
			}
		}
	}

	return []int{}
}

// ============================================================================
// TEST CASES AND COMPARISON
// ============================================================================

func main() {
	testCases := []struct {
		array     []int
		targetSum int
		desc      string
	}{
		{[]int{3, 5, -4, 8, 11, 1, -1, 6}, 10, "Standard case"},
		{[]int{1, 2, 3, 4, 5}, 10, "No valid pair"},
		{[]int{4, 6}, 10, "Two element array"},
		{[]int{4, 6, 1, -3}, 3, "Negative numbers"},
		{[]int{1, 2, 3, 4, 5, 6, 7, 8, 9}, 17, "Large array"},
		{[]int{-1, -2, -3, -4, -5}, -8, "All negative"},
		{[]int{14}, 15, "Single element"},
	}

	approaches := []struct {
		name string
		fn   func([]int, int) []int
	}{
		{"Hash Table (Recommended)", TwoNumberSum},
		{"Two Pointers", TwoNumberSumTwoPointers},
		{"Brute Force", TwoNumberSumBruteForce},
	}

	fmt.Println("======================================================================")
	fmt.Println("TWO NUMBER SUM - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")

		for _, tc := range testCases {
			// Copy array to avoid modification
			arr := make([]int, len(tc.array))
			copy(arr, tc.array)

			result := approach.fn(arr, tc.targetSum)

			// Validate result
			valid := false
			if len(result) == 2 {
				valid = result[0]+result[1] == tc.targetSum
			} else if len(result) == 0 {
				// Check that no valid pair exists
				valid = true
				for i := 0; i < len(tc.array); i++ {
					for j := i + 1; j < len(tc.array); j++ {
						if tc.array[i]+tc.array[j] == tc.targetSum {
							valid = false
							break
						}
					}
				}
			}

			status := "PASS"
			if !valid {
				status = "FAIL"
			}
			fmt.Printf("  [%s] %s: %v\n", status, tc.desc, result)
		}
	}

	fmt.Println("\n======================================================================")
	fmt.Println("COMPLEXITY COMPARISON")
	fmt.Println("======================================================================")
	fmt.Println(`
    +-------------------+------------+----------+------------------+
    |     Approach      |    Time    |  Space   |  Recommendation  |
    +-------------------+------------+----------+------------------+
    | 1. Hash Table     |    O(n)    |   O(n)   |  BEST CHOICE     |
    | 2. Two Pointers   | O(n log n) |   O(1)   |  Good if sorted  |
    | 3. Brute Force    |   O(n^2)   |   O(1)   |  Learning only   |
    +-------------------+------------+----------+------------------+
    `)
}
