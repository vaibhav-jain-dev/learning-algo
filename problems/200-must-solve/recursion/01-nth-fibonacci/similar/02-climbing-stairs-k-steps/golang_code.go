/*
Climbing Stairs with K Steps - Go Solutions

Given n steps and ability to climb 1 to k steps at a time,
find the number of distinct ways to reach the top.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: DP with Sliding Window (Optimal)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(k)
//
// WHY THIS IS BEST:
// - O(1) update per step using running sum
// - Space proportional to k, not n
// - Efficient for large n
// ============================================================================

// ClimbStairs computes ways to climb n stairs taking 1 to k steps at a time.
//
// Key insight: ways[i] = sum of ways[i-k..i-1]
// Optimization: Maintain running sum, update in O(1) per step.
func ClimbStairs(n, k int) int {
	if n == 0 {
		return 1
	}
	if n == 1 {
		return 1
	}

	// Use circular buffer of size k
	dp := make([]int, k)
	dp[0] = 1                       // ways[0] = 1
	windowSum := 1                  // Sum of values in window

	for i := 1; i <= n; i++ {
		// Current position in circular buffer
		curr := i % k

		// Save the old value before overwriting
		oldVal := dp[curr]

		// New value is the window sum
		dp[curr] = windowSum

		// Update window sum:
		// - Add new value (dp[curr])
		// - Remove value that falls out of window (oldVal, but only if window was full)
		if i >= k {
			windowSum = windowSum + dp[curr] - oldVal
		} else {
			windowSum = windowSum + dp[curr]
		}
	}

	return dp[n%k]
}

// ============================================================================
// APPROACH 2: DP with Array
// ============================================================================
// Time Complexity:  O(n * k)
// Space Complexity: O(n)
//
// WHEN TO USE:
// - Easier to understand
// - When you need access to all intermediate values
// ============================================================================

// ClimbStairsDP uses a standard DP array approach.
func ClimbStairsDP(n, k int) int {
	if n == 0 {
		return 1
	}

	dp := make([]int, n+1)
	dp[0] = 1 // Base case: 1 way to stay at ground

	for i := 1; i <= n; i++ {
		// Sum all ways to reach current step
		for j := 1; j <= k && j <= i; j++ {
			dp[i] += dp[i-j]
		}
	}

	return dp[n]
}

// ============================================================================
// APPROACH 3: DP with Sliding Window Sum (Alternative)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n)
//
// Cleaner implementation using running sum optimization.
// ============================================================================

// ClimbStairsSlidingSum uses array with sliding sum for O(n) time.
func ClimbStairsSlidingSum(n, k int) int {
	if n == 0 {
		return 1
	}

	dp := make([]int, n+1)
	dp[0] = 1
	windowSum := 1 // Sum of dp[max(0,i-k)..i-1]

	for i := 1; i <= n; i++ {
		dp[i] = windowSum

		// Add current to window sum
		windowSum += dp[i]

		// Remove element falling out of window
		if i >= k {
			windowSum -= dp[i-k]
		}
	}

	return dp[n]
}

// ============================================================================
// APPROACH 4: Memoization
// ============================================================================
// Time Complexity:  O(n * k)
// Space Complexity: O(n)
//
// WHEN TO USE:
// - Top-down thinking is more intuitive
// - When computing sparse values
// ============================================================================

// ClimbStairsMemo uses memoization for top-down DP.
func ClimbStairsMemo(n, k int) int {
	memo := make(map[int]int)

	var dp func(step int) int
	dp = func(step int) int {
		// Base cases
		if step == 0 {
			return 1
		}
		if step < 0 {
			return 0
		}

		// Check cache
		if val, exists := memo[step]; exists {
			return val
		}

		// Sum all ways from previous k steps
		total := 0
		for j := 1; j <= k; j++ {
			total += dp(step - j)
		}

		memo[step] = total
		return total
	}

	return dp(n)
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		n        int
		k        int
		expected int
		desc     string
	}{
		{4, 2, 5, "n=4, k=2 (classic)"},
		{3, 3, 4, "n=3, k=3 (tribonacci)"},
		{5, 3, 13, "n=5, k=3"},
		{1, 1, 1, "n=1, k=1 (single step)"},
		{0, 2, 1, "n=0 (already at top)"},
		{10, 2, 89, "n=10, k=2 (Fibonacci)"},
		{5, 5, 16, "n=5, k=5 (can jump to top)"},
		{3, 2, 3, "n=3, k=2"},
	}

	approaches := []struct {
		name string
		fn   func(int, int) int
	}{
		{"Sliding Window (Optimal)", ClimbStairs},
		{"DP Array", ClimbStairsDP},
		{"Sliding Sum", ClimbStairsSlidingSum},
		{"Memoization", ClimbStairsMemo},
	}

	fmt.Println("======================================================================")
	fmt.Println("CLIMBING STAIRS WITH K STEPS - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.n, tc.k)
			status := "PASS"
			if result != tc.expected {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, result, tc.expected)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		}
	}

	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE OUTPUT")
	fmt.Println("======================================================================")

	fmt.Println("\nInput: n = 4, k = 2")
	fmt.Printf("Output: %d\n", ClimbStairs(4, 2))

	fmt.Println("\nInput: n = 3, k = 3")
	fmt.Printf("Output: %d\n", ClimbStairs(3, 3))

	fmt.Println("\nInput: n = 5, k = 3")
	fmt.Printf("Output: %d\n", ClimbStairs(5, 3))
}
