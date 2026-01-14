/*
Climbing Stairs - Dynamic Programming Solution

Problem: Count the number of distinct ways to climb n stairs,
where you can take either 1 or 2 steps at a time.
*/

package main

import "fmt"

// climbStairsDP uses a full DP array.
// Time Complexity: O(n)
// Space Complexity: O(n)
func climbStairsDP(n int) int {
	if n <= 2 {
		return n
	}

	// dp[i] represents the number of ways to reach step i
	dp := make([]int, n+1)
	dp[1] = 1 // One way to reach step 1
	dp[2] = 2 // Two ways to reach step 2: (1+1) or (2)

	for i := 3; i <= n; i++ {
		dp[i] = dp[i-1] + dp[i-2]
	}

	return dp[n]
}

// climbStairsOptimized uses only two variables for space optimization.
// Time Complexity: O(n)
// Space Complexity: O(1)
func climbStairsOptimized(n int) int {
	if n <= 2 {
		return n
	}

	prev2 := 1 // Ways to reach step 1
	prev1 := 2 // Ways to reach step 2

	for i := 3; i <= n; i++ {
		current := prev1 + prev2
		prev2 = prev1
		prev1 = current
	}

	return prev1
}

// climbStairsMemo uses recursion with memoization (top-down DP).
// Time Complexity: O(n)
// Space Complexity: O(n)
func climbStairsMemo(n int) int {
	memo := make(map[int]int)

	var helper func(step int) int
	helper = func(step int) int {
		if step <= 2 {
			return step
		}

		if val, exists := memo[step]; exists {
			return val
		}

		memo[step] = helper(step-1) + helper(step-2)
		return memo[step]
	}

	return helper(n)
}

func main() {
	testCases := []struct {
		n        int
		expected int
	}{
		{1, 1},
		{2, 2},
		{3, 3},
		{4, 5},
		{5, 8},
		{10, 89},
		{20, 10946},
		{45, 1836311903},
	}

	fmt.Println("============================================================")
	fmt.Println("CLIMBING STAIRS - Test Results")
	fmt.Println("============================================================")

	allPassed := true

	for _, tc := range testCases {
		resultDP := climbStairsDP(tc.n)
		resultOpt := climbStairsOptimized(tc.n)
		resultMemo := climbStairsMemo(tc.n)

		status := "PASS"
		if resultDP != tc.expected || resultOpt != tc.expected || resultMemo != tc.expected {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("\nn = %d\n", tc.n)
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
