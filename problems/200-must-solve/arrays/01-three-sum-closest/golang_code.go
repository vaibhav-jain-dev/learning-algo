package main

import (
	"fmt"
	"math"
	"sort"
)

/*
Three Sum Closest

Given an integer array nums of length n and an integer target, find three integers
in nums such that the sum is closest to target. Return the sum of the three integers.

Time Complexity: O(n^2) - sort is O(n log n), then O(n^2) for nested loops
Space Complexity: O(1) - only using pointers and variables
*/

// threeSumClosest finds three numbers whose sum is closest to target
func threeSumClosest(nums []int, target int) int {
	sort.Ints(nums)
	n := len(nums)
	closestSum := math.MaxInt32

	for i := 0; i < n-2; i++ {
		// Skip duplicates for optimization
		if i > 0 && nums[i] == nums[i-1] {
			continue
		}

		left, right := i+1, n-1

		for left < right {
			currentSum := nums[i] + nums[left] + nums[right]

			// Update closest if this sum is closer to target
			if abs(currentSum-target) < abs(closestSum-target) {
				closestSum = currentSum
			}

			// Found exact match
			if currentSum == target {
				return currentSum
			} else if currentSum < target {
				left++ // Need larger sum
			} else {
				right-- // Need smaller sum
			}
		}
	}

	return closestSum
}

// threeSumClosestBrute is the brute force approach
// Time: O(n^3), Space: O(1)
func threeSumClosestBrute(nums []int, target int) int {
	n := len(nums)
	closestSum := math.MaxInt32

	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			for k := j + 1; k < n; k++ {
				currentSum := nums[i] + nums[j] + nums[k]
				if abs(currentSum-target) < abs(closestSum-target) {
					closestSum = currentSum
				}
			}
		}
	}

	return closestSum
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func main() {
	testCases := []struct {
		nums     []int
		target   int
		expected int
	}{
		{[]int{-1, 2, 1, -4}, 1, 2},
		{[]int{0, 0, 0}, 1, 0},
		{[]int{1, 1, 1, 0}, -100, 2},
		{[]int{4, 0, 5, -5, 3, 3, 0, -4, -5}, -2, -2},
		{[]int{1, 2, 3}, 6, 6},
	}

	fmt.Println("Testing Three Sum Closest")
	fmt.Println("==================================================")

	for _, tc := range testCases {
		// Make a copy since sort modifies the slice
		numsCopy := make([]int, len(tc.nums))
		copy(numsCopy, tc.nums)

		result := threeSumClosest(numsCopy, tc.target)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}

		fmt.Printf("%s: nums=%v, target=%d\n", status, tc.nums, tc.target)
		fmt.Printf("       Expected: %d, Got: %d\n\n", tc.expected, result)
	}
}
