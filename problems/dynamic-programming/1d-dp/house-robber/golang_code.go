/*
House Robber - Dynamic Programming Solution

Problem: Find the maximum amount of money you can rob from houses
where you cannot rob two adjacent houses.
*/

package main

import "fmt"

// robDP uses a full DP array.
// Time Complexity: O(n)
// Space Complexity: O(n)
func robDP(nums []int) int {
	if len(nums) == 0 {
		return 0
	}
	if len(nums) == 1 {
		return nums[0]
	}

	n := len(nums)
	dp := make([]int, n)
	dp[0] = nums[0]
	dp[1] = max(nums[0], nums[1])

	for i := 2; i < n; i++ {
		dp[i] = max(dp[i-1], dp[i-2]+nums[i])
	}

	return dp[n-1]
}

// robOptimized uses only two variables for space optimization.
// Time Complexity: O(n)
// Space Complexity: O(1)
func robOptimized(nums []int) int {
	if len(nums) == 0 {
		return 0
	}
	if len(nums) == 1 {
		return nums[0]
	}

	prev2 := nums[0]                // dp[i-2]
	prev1 := max(nums[0], nums[1])  // dp[i-1]

	for i := 2; i < len(nums); i++ {
		current := max(prev1, prev2+nums[i])
		prev2 = prev1
		prev1 = current
	}

	return prev1
}

// robMemo uses recursion with memoization (top-down DP).
// Time Complexity: O(n)
// Space Complexity: O(n)
func robMemo(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	memo := make(map[int]int)

	var helper func(i int) int
	helper = func(i int) int {
		if i < 0 {
			return 0
		}
		if i == 0 {
			return nums[0]
		}

		if val, exists := memo[i]; exists {
			return val
		}

		memo[i] = max(helper(i-1), helper(i-2)+nums[i])
		return memo[i]
	}

	return helper(len(nums) - 1)
}

func main() {
	testCases := []struct {
		nums     []int
		expected int
	}{
		{[]int{1, 2, 3, 1}, 4},
		{[]int{2, 7, 9, 3, 1}, 12},
		{[]int{2, 1, 1, 2}, 4},
		{[]int{1}, 1},
		{[]int{1, 2}, 2},
		{[]int{2, 1}, 2},
		{[]int{1, 2, 3, 4, 5}, 9},
		{[]int{5, 3, 4, 11, 2}, 16},
		{[]int{100, 1, 1, 100}, 200},
		{[]int{1, 3, 1, 3, 100}, 103},
	}

	fmt.Println("============================================================")
	fmt.Println("HOUSE ROBBER - Test Results")
	fmt.Println("============================================================")

	allPassed := true

	for _, tc := range testCases {
		resultDP := robDP(tc.nums)
		resultOpt := robOptimized(tc.nums)
		resultMemo := robMemo(tc.nums)

		status := "PASS"
		if resultDP != tc.expected || resultOpt != tc.expected || resultMemo != tc.expected {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("\nnums = %v\n", tc.nums)
		fmt.Printf("  Expected:  %d\n", tc.expected)
		fmt.Printf("  DP Array:  %d\n", resultDP)
		fmt.Printf("  Optimized: %d\n", resultOpt)
		fmt.Printf("  Memoized:  %d\n", resultMemo)
		fmt.Printf("  Status:    %s\n", status)
	}

	fmt.Println("\n============================================================")
	if allPassed {
		fmt.Println("All tests passed!")
	} else {
		fmt.Println("Some tests failed!")
	}
	fmt.Println("============================================================")
}
