package main

import (
	"fmt"
	"math"
	"sort"
)

/*
Closest Sum Target (Two Arrays)

Given two sorted arrays arr1 and arr2, find one element from each array such that
their sum is closest to a given target value. Return the pair of elements.

Time Complexity: O(n log n + m log m) for sorting, O(n + m) for two-pointer traversal
Space Complexity: O(1) - only using pointers and variables
*/

// closestSumTarget finds one element from each array whose sum is closest to target
func closestSumTarget(arr1, arr2 []int, target int) []int {
	sort.Ints(arr1)
	sort.Ints(arr2)

	left := 0
	right := len(arr2) - 1
	closestPair := []int{arr1[0], arr2[0]}
	minDiff := math.MaxInt32

	for left < len(arr1) && right >= 0 {
		currentSum := arr1[left] + arr2[right]
		currentDiff := abs(currentSum - target)

		if currentDiff < minDiff {
			minDiff = currentDiff
			closestPair = []int{arr1[left], arr2[right]}
		}

		// Found exact match
		if currentSum == target {
			return closestPair
		} else if currentSum < target {
			left++ // Need larger sum
		} else {
			right-- // Need smaller sum
		}
	}

	return closestPair
}

// closestSumTargetBrute is the brute force approach
// Time: O(n * m), Space: O(1)
func closestSumTargetBrute(arr1, arr2 []int, target int) []int {
	closestPair := []int{arr1[0], arr2[0]}
	minDiff := math.MaxInt32

	for _, a := range arr1 {
		for _, b := range arr2 {
			currentDiff := abs(a + b - target)
			if currentDiff < minDiff {
				minDiff = currentDiff
				closestPair = []int{a, b}
			}
		}
	}

	return closestPair
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func main() {
	testCases := []struct {
		arr1        []int
		arr2        []int
		target      int
		expectedSum int
	}{
		{[]int{1, 3, 5, 7}, []int{2, 4, 6, 8}, 10, 10},
		{[]int{-1, 3, 8, 12}, []int{2, 4, 9, 15}, 7, 7},
		{[]int{1, 4, 5, 7}, []int{10, 20, 30, 40}, 32, 31},
		{[]int{-5, -2, 0, 3}, []int{-3, 1, 4, 8}, 1, 1},
	}

	fmt.Println("Testing Closest Sum Target (Two Arrays)")
	fmt.Println("==================================================")

	for _, tc := range testCases {
		// Make copies since sort modifies slices
		arr1Copy := make([]int, len(tc.arr1))
		arr2Copy := make([]int, len(tc.arr2))
		copy(arr1Copy, tc.arr1)
		copy(arr2Copy, tc.arr2)

		result := closestSumTarget(arr1Copy, arr2Copy, tc.target)
		actualSum := result[0] + result[1]
		status := "PASS"
		if actualSum != tc.expectedSum {
			status = "FAIL"
		}

		fmt.Printf("%s: arr1=%v, arr2=%v, target=%d\n", status, tc.arr1, tc.arr2, tc.target)
		fmt.Printf("       Expected sum: %d\n", tc.expectedSum)
		fmt.Printf("       Got pair: %v (sum=%d)\n\n", result, actualSum)
	}
}
