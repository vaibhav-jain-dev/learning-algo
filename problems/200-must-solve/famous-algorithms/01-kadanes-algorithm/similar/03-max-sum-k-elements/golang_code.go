/*
Maximum Sum with at Least K Elements - Go Solution

Time Complexity: O(n)
Space Complexity: O(n)
*/

package main

import (
	"fmt"
	"math"
)

func maxSumAtLeastK(nums []int, k int) int {
	n := len(nums)
	if n < k {
		return 0
	}

	// Prefix sums
	prefix := make([]int, n+1)
	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] + nums[i]
	}

	// maxPrefix[i] = max sum of subarray ending before index i
	maxPrefix := make([]int, n)
	current := 0
	for i := 0; i < n-k; i++ {
		current = max(0, current+nums[i])
		maxPrefix[i+1] = current
	}

	result := math.MinInt32

	// For each ending position, consider exactly k elements + optional extension
	for i := k - 1; i < n; i++ {
		// Sum of exactly k elements ending at i
		windowSum := prefix[i+1] - prefix[i-k+1]
		// Optionally add best prefix ending before window
		if i-k+1 > 0 {
			windowSum += maxPrefix[i-k+1]
		}
		result = max(result, windowSum)
	}

	return result
}

func main() {
	fmt.Printf("Test 1: %d\n", maxSumAtLeastK([]int{1, -2, 3, -1, 5}, 2)) // Expected: 7
	fmt.Printf("Test 2: %d\n", maxSumAtLeastK([]int{-1, -2, -3}, 2))      // Expected: -3
	fmt.Printf("Test 3: %d\n", maxSumAtLeastK([]int{1, 2, 3, 4, 5}, 3))   // Expected: 15
	fmt.Printf("Test 4: %d\n", maxSumAtLeastK([]int{1, 1, 1, 1, 1, 1}, 2)) // Expected: 6
	fmt.Println("\nAll tests completed!")
}
