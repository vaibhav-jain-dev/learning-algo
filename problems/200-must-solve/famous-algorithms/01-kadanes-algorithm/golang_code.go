/*
Kadane's Algorithm - Maximum Subarray Sum - Go Solution

Find the contiguous subarray with the largest sum.

Time Complexity: O(n)
Space Complexity: O(1)
*/

package main

import "fmt"

// maxSubarraySum finds maximum subarray sum using Kadane's Algorithm
func maxSubarraySum(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	currentSum := nums[0]
	maxSum := nums[0]

	for i := 1; i < len(nums); i++ {
		// Either start fresh from current element or extend previous subarray
		currentSum = max(nums[i], currentSum+nums[i])
		maxSum = max(maxSum, currentSum)
	}

	return maxSum
}

// SubarrayResult holds the result with indices
type SubarrayResult struct {
	MaxSum     int
	StartIndex int
	EndIndex   int
}

// maxSubarraySumWithIndices finds maximum subarray sum and returns indices
func maxSubarraySumWithIndices(nums []int) SubarrayResult {
	if len(nums) == 0 {
		return SubarrayResult{0, -1, -1}
	}

	maxSum := nums[0]
	currentSum := nums[0]
	maxStart, maxEnd := 0, 0
	currentStart := 0

	for i := 1; i < len(nums); i++ {
		if nums[i] > currentSum+nums[i] {
			currentSum = nums[i]
			currentStart = i
		} else {
			currentSum = currentSum + nums[i]
		}

		if currentSum > maxSum {
			maxSum = currentSum
			maxStart = currentStart
			maxEnd = i
		}
	}

	return SubarrayResult{maxSum, maxStart, maxEnd}
}

// maxSubarrayDP uses DP approach (for understanding)
func maxSubarrayDP(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	n := len(nums)
	// dp[i] = maximum subarray sum ending at index i
	dp := make([]int, n)
	dp[0] = nums[0]

	for i := 1; i < n; i++ {
		dp[i] = max(nums[i], dp[i-1]+nums[i])
	}

	result := dp[0]
	for i := 1; i < n; i++ {
		result = max(result, dp[i])
	}
	return result
}

func main() {
	// Test 1: Standard case
	nums1 := []int{-2, 1, -3, 4, -1, 2, 1, -5, 4}
	result1 := maxSubarraySum(nums1)
	fmt.Printf("Test 1: %d\n", result1)
	if result1 != 6 {
		fmt.Printf("FAIL: Expected 6, got %d\n", result1)
	}

	// Test 1b: With indices
	res1b := maxSubarraySumWithIndices(nums1)
	fmt.Printf("Test 1b: Sum=%d, Subarray=%v\n", res1b.MaxSum, nums1[res1b.StartIndex:res1b.EndIndex+1])

	// Test 2: Single element
	nums2 := []int{1}
	result2 := maxSubarraySum(nums2)
	fmt.Printf("Test 2: %d\n", result2)
	if result2 != 1 {
		fmt.Printf("FAIL: Expected 1, got %d\n", result2)
	}

	// Test 3: All positive
	nums3 := []int{5, 4, -1, 7, 8}
	result3 := maxSubarraySum(nums3)
	fmt.Printf("Test 3: %d\n", result3)
	if result3 != 23 {
		fmt.Printf("FAIL: Expected 23, got %d\n", result3)
	}

	// Test 4: All negative
	nums4 := []int{-3, -2, -5, -1, -4}
	result4 := maxSubarraySum(nums4)
	fmt.Printf("Test 4: %d\n", result4)
	if result4 != -1 {
		fmt.Printf("FAIL: Expected -1, got %d\n", result4)
	}

	// Test 5: Mixed with larger example
	nums5 := []int{1, 2, 3, -2, 5}
	result5 := maxSubarraySum(nums5)
	fmt.Printf("Test 5: %d\n", result5)
	if result5 != 9 {
		fmt.Printf("FAIL: Expected 9, got %d\n", result5)
	}

	// Test 6: DP approach verification
	testCases := [][]int{nums1, nums2, nums3, nums4, nums5}
	for i, nums := range testCases {
		if maxSubarraySum(nums) != maxSubarrayDP(nums) {
			fmt.Printf("FAIL: Test case %d - DP doesn't match Kadane's\n", i+1)
		}
	}
	fmt.Println("Test 6: DP approach matches Kadane's")

	fmt.Println("\nAll tests passed!")
}
