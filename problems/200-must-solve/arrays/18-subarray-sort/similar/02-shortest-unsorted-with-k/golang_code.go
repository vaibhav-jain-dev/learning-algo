/*
Shortest Unsorted Continuous Subarray - Go Solutions
*/

package main

import (
	"fmt"
	"math"
)

// FindUnsortedSubarray finds length of shortest subarray that needs sorting.
func FindUnsortedSubarray(nums []int) int {
	n := len(nums)
	if n <= 1 {
		return 0
	}

	// Find first out-of-order from left
	left := 0
	for left < n-1 && nums[left] <= nums[left+1] {
		left++
	}

	if left == n-1 {
		return 0
	}

	// Find first out-of-order from right
	right := n - 1
	for right > 0 && nums[right] >= nums[right-1] {
		right--
	}

	// Find min/max in unsorted region
	subMin := math.MaxInt32
	subMax := math.MinInt32
	for i := left; i <= right; i++ {
		if nums[i] < subMin {
			subMin = nums[i]
		}
		if nums[i] > subMax {
			subMax = nums[i]
		}
	}

	// Extend boundaries
	for left > 0 && nums[left-1] > subMin {
		left--
	}
	for right < n-1 && nums[right+1] < subMax {
		right++
	}

	return right - left + 1
}

func main() {
	testCases := []struct {
		nums     []int
		expected int
		desc     string
	}{
		{[]int{2, 6, 4, 8, 10, 9, 15}, 5, "Standard case"},
		{[]int{1, 2, 3, 4}, 0, "Already sorted"},
		{[]int{1, 3, 2, 4}, 2, "Small unsorted"},
	}

	fmt.Println("============================================================")
	fmt.Println("SHORTEST UNSORTED SUBARRAY - TEST RESULTS")
	fmt.Println("============================================================")

	for _, tc := range testCases {
		result := FindUnsortedSubarray(tc.nums)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  %s: %s: %d (expected %d)\n", status, tc.desc, result, tc.expected)
	}
}
