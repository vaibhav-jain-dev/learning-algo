/*
Number of Ways to Make Change - Go Solutions

Given coin denominations and a target amount, find the number of ways
to make change using unlimited coins of each denomination.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Bottom-Up Dynamic Programming
// ============================================================================
// Time Complexity:  O(n * d) where d = number of denominations
// Space Complexity: O(n)
//
// WHY THIS IS BEST:
// - Counts combinations (not permutations) by iterating coins first
// - Clear and intuitive tabulation
// - Optimal time and space for this problem
// ============================================================================

// NumberOfWaysToMakeChange finds number of ways to make target amount.
//
// Key Insight: Iterate coins in outer loop to count combinations, not permutations.
//
// Visual for n=6, denoms=[1,5]:
//
//	After coin 1: dp = [1, 1, 1, 1, 1, 1, 1]  (only 1s)
//	After coin 5: dp = [1, 1, 1, 1, 1, 2, 2]  (add 5 combinations)
//
//	Answer: dp[6] = 2
func NumberOfWaysToMakeChange(n int, denoms []int) int {
	// dp[i] = number of ways to make amount i
	dp := make([]int, n+1)
	dp[0] = 1 // One way to make 0: use no coins

	// Iterate coins first to count combinations
	for _, coin := range denoms {
		for amount := coin; amount <= n; amount++ {
			dp[amount] += dp[amount-coin]
		}
	}

	return dp[n]
}

// ============================================================================
// APPROACH 2: Recursive with Memoization
// ============================================================================
// Time Complexity:  O(n * d)
// Space Complexity: O(n * d) for memo + recursion stack
//
// WHEN TO USE:
// - More intuitive top-down thinking
// - When exploring problem structure
// ============================================================================

// NumberOfWaysToMakeChangeMemo uses top-down DP with memoization.
func NumberOfWaysToMakeChangeMemo(n int, denoms []int) int {
	// Memo: ways[amount][coinIndex]
	memo := make(map[string]int)

	var count func(amount, coinIdx int) int
	count = func(amount, coinIdx int) int {
		// Base cases
		if amount == 0 {
			return 1
		}
		if amount < 0 || coinIdx >= len(denoms) {
			return 0
		}

		// Check memo
		key := fmt.Sprintf("%d_%d", amount, coinIdx)
		if val, exists := memo[key]; exists {
			return val
		}

		// Two choices:
		// 1. Use current coin (stay at same coinIdx)
		// 2. Skip to next coin
		ways := count(amount-denoms[coinIdx], coinIdx) + count(amount, coinIdx+1)

		memo[key] = ways
		return ways
	}

	return count(n, 0)
}

// ============================================================================
// APPROACH 3: 2D DP Table (Explicit)
// ============================================================================
// Time Complexity:  O(n * d)
// Space Complexity: O(n * d)
//
// WHEN TO USE:
// - Need to understand subproblem structure
// - Debugging and visualization
// ============================================================================

// NumberOfWaysToMakeChange2D uses explicit 2D DP table.
func NumberOfWaysToMakeChange2D(n int, denoms []int) int {
	d := len(denoms)
	// dp[i][j] = ways to make amount j using first i coins
	dp := make([][]int, d+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}

	// Base case: one way to make 0 with any coins
	for i := 0; i <= d; i++ {
		dp[i][0] = 1
	}

	// Fill table
	for i := 1; i <= d; i++ {
		coin := denoms[i-1]
		for j := 1; j <= n; j++ {
			// Don't use this coin
			dp[i][j] = dp[i-1][j]
			// Use this coin (if possible)
			if j >= coin {
				dp[i][j] += dp[i][j-coin]
			}
		}
	}

	return dp[d][n]
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		n        int
		denoms   []int
		expected int
		desc     string
	}{
		{6, []int{1, 5}, 2, "Basic case"},
		{10, []int{1, 5, 10, 25}, 4, "Multiple coins"},
		{0, []int{1, 2, 5}, 1, "Zero amount"},
		{7, []int{2, 4}, 0, "Impossible"},
		{25, []int{1, 5, 10, 25}, 13, "Quarter"},
		{4, []int{1, 2, 3}, 4, "Multiple ways"},
		{100, []int{1, 5, 10, 25}, 242, "Large amount"},
	}

	approaches := []struct {
		name string
		fn   func(int, []int) int
	}{
		{"Bottom-Up DP", NumberOfWaysToMakeChange},
		{"Memoization", NumberOfWaysToMakeChangeMemo},
		{"2D DP Table", NumberOfWaysToMakeChange2D},
	}

	fmt.Println("======================================================================")
	fmt.Println("NUMBER OF WAYS TO MAKE CHANGE - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.n, tc.denoms)
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
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	// Sample Input 1
	n, denoms := 6, []int{1, 5}
	fmt.Printf("\nInput: n = %d, denoms = %v\n", n, denoms)
	fmt.Printf("Output: %d\n", NumberOfWaysToMakeChange(n, denoms))

	// Sample Input 2
	n, denoms = 10, []int{1, 5, 10, 25}
	fmt.Printf("\nInput: n = %d, denoms = %v\n", n, denoms)
	fmt.Printf("Output: %d\n", NumberOfWaysToMakeChange(n, denoms))
}
