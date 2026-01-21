package main

import (
	"fmt"
	"sort"
)

/*
Three Sum With Duplicates

Given an integer array nums that may contain duplicates, return all unique triplets
that sum to target. The solution set must not contain duplicate triplets.

Time Complexity: O(n^2) - sort is O(n log n), then O(n^2) for nested loops
Space Complexity: O(1) - excluding output space
*/

// threeSumDuplicates finds all unique triplets that sum to target
func threeSumDuplicates(nums []int, target int) [][]int {
	sort.Ints(nums)
	n := len(nums)
	result := [][]int{}

	for i := 0; i < n-2; i++ {
		// Skip duplicate first elements
		if i > 0 && nums[i] == nums[i-1] {
			continue
		}

		left, right := i+1, n-1
		remaining := target - nums[i]

		for left < right {
			currentSum := nums[left] + nums[right]

			if currentSum == remaining {
				result = append(result, []int{nums[i], nums[left], nums[right]})

				// Skip duplicates for left pointer
				for left < right && nums[left] == nums[left+1] {
					left++
				}
				// Skip duplicates for right pointer
				for left < right && nums[right] == nums[right-1] {
					right--
				}

				left++
				right--
			} else if currentSum < remaining {
				left++
			} else {
				right--
			}
		}
	}

	return result
}

func main() {
	testCases := []struct {
		nums     []int
		target   int
		expected [][]int
	}{
		{[]int{1, 1, 1, 2, 2, 3}, 6, [][]int{{1, 2, 3}}},
		{[]int{-1, 0, 1, 2, -1, -4}, 0, [][]int{{-1, -1, 2}, {-1, 0, 1}}},
		{[]int{0, 0, 0, 0}, 0, [][]int{{0, 0, 0}}},
		{[]int{1, 2, -2, -1}, 0, [][]int{}},
		{[]int{-2, 0, 0, 2, 2}, 0, [][]int{{-2, 0, 2}}},
	}

	fmt.Println("Testing Three Sum With Duplicates")
	fmt.Println("==================================================")

	for _, tc := range testCases {
		// Make a copy since sort modifies the slice
		numsCopy := make([]int, len(tc.nums))
		copy(numsCopy, tc.nums)

		result := threeSumDuplicates(numsCopy, tc.target)
		status := "PASS"
		if len(result) != len(tc.expected) {
			status = "FAIL"
		}

		fmt.Printf("%s: nums=%v, target=%d\n", status, tc.nums, tc.target)
		fmt.Printf("       Expected: %v\n", tc.expected)
		fmt.Printf("       Got:      %v\n\n", result)
	}
}
