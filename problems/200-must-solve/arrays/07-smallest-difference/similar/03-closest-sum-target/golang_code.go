/*
Closest Sum to Target - Go Solutions

Find one number from each of two arrays with sum closest to target.
*/

package main

import (
	"fmt"
	"math"
	"sort"
)

// ============================================================================
// APPROACH 1: Two Pointers ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(n log n + m log m)
// Space Complexity: O(1)
// ============================================================================

// ClosestSumToTarget finds pair from two arrays closest to target.
func ClosestSumToTarget(arr1, arr2 []int, target int) []int {
	sort.Ints(arr1)
	sort.Ints(arr2)

	i, j := 0, len(arr2)-1
	minDiff := math.MaxInt32
	result := []int{arr1[0], arr2[0]}

	for i < len(arr1) && j >= 0 {
		sum := arr1[i] + arr2[j]
		diff := abs(sum - target)

		if diff < minDiff {
			minDiff = diff
			result = []int{arr1[i], arr2[j]}
		}

		if sum == target {
			return result
		} else if sum < target {
			i++
		} else {
			j--
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
// APPROACH 2: Binary Search
// ============================================================================
// Time Complexity:  O(n log m) or O(m log n)
// Space Complexity: O(1)
// ============================================================================

// ClosestSumBinarySearch uses binary search to find closest.
func ClosestSumBinarySearch(arr1, arr2 []int, target int) []int {
	sort.Ints(arr2)

	minDiff := math.MaxInt32
	result := []int{arr1[0], arr2[0]}

	for _, a := range arr1 {
		complement := target - a

		// Binary search for closest to complement in arr2
		idx := sort.SearchInts(arr2, complement)

		// Check idx and idx-1
		for _, i := range []int{idx - 1, idx} {
			if i >= 0 && i < len(arr2) {
				diff := abs(a + arr2[i] - target)
				if diff < minDiff {
					minDiff = diff
					result = []int{a, arr2[i]}
				}
			}
		}
	}

	return result
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("CLOSEST SUM TO TARGET - TEST RESULTS")
	fmt.Println("======================================================================")

	testCases := []struct {
		arr1, arr2 []int
		target     int
		desc       string
	}{
		{[]int{1, 3, 5}, []int{2, 4, 6}, 8, "Standard case"},
		{[]int{-1, 3, 8}, []int{2, 4, 9}, 7, "Exact match"},
		{[]int{1, 2, 3}, []int{4, 5, 6}, 100, "Far from target"},
		{[]int{5}, []int{10}, 12, "Single elements"},
	}

	for _, tc := range testCases {
		result := ClosestSumToTarget(tc.arr1, tc.arr2, tc.target)
		sum := result[0] + result[1]
		fmt.Printf("\n%s:\n", tc.desc)
		fmt.Printf("  arr1=%v, arr2=%v, target=%d\n", tc.arr1, tc.arr2, tc.target)
		fmt.Printf("  Result: %v (sum=%d, diff=%d)\n", result, sum, abs(sum-tc.target))
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	arr1 := []int{1, 3, 5}
	arr2 := []int{2, 4, 6}
	target := 8
	fmt.Printf("\nInput: arr1=%v, arr2=%v, target=%d\n", arr1, arr2, target)
	result := ClosestSumToTarget(arr1, arr2, target)
	fmt.Printf("Output: %v (sum=%d)\n", result, result[0]+result[1])
}
