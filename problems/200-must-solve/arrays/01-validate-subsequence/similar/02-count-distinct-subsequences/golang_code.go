/*
Count Distinct Subsequences - Go Solutions

Count the number of distinct subsequences of s that equal t.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Dynamic Programming (2D Table) ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(m × n) - fill entire table
// Space Complexity: O(m × n) - for the DP table
//
// WHY THIS IS BEST:
// - Clear logic for counting subsequences
// - Easy to trace and debug
// - Handles large inputs well
// ============================================================================

// NumDistinct counts distinct subsequences using bottom-up DP.
//
// Key Insight:
//   - If s[i-1] == t[j-1]: We can either use this match or skip it
//     dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
//   - If s[i-1] != t[j-1]: We must skip the current char of s
//     dp[i][j] = dp[i-1][j]
//
// Visual for s="rabbbit", t="rabbit":
//
//	         ""  r  a  b  b  i  t
//	    ""    1  0  0  0  0  0  0
//	    r     1  1  0  0  0  0  0
//	    a     1  1  1  0  0  0  0
//	    b     1  1  1  1  0  0  0
//	    b     1  1  1  2  1  0  0
//	    b     1  1  1  3  3  0  0
//	    i     1  1  1  3  3  3  0
//	    t     1  1  1  3  3  3  3
//
// Answer: dp[7][6] = 3
func NumDistinct(s, t string) int {
	m, n := len(s), len(t)

	// dp[i][j] = ways to form t[:j] from s[:i]
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
		dp[i][0] = 1 // Empty t can be formed in 1 way
	}

	// Fill the table using range for idiomatic Go
	for i, charS := range s {
		for j, charT := range t {
			// Always include ways that don't use s[i]
			dp[i+1][j+1] = dp[i][j+1]

			// If characters match, add ways that use this match
			if charS == charT {
				dp[i+1][j+1] += dp[i][j]
			}
		}
	}

	return dp[m][n]
}

// ============================================================================
// APPROACH 2: Space-Optimized DP
// ============================================================================
// Time Complexity:  O(m × n)
// Space Complexity: O(n) - only one row needed
//
// WHEN TO USE:
// - Memory is constrained
// - Large input strings
// ============================================================================

// NumDistinctOptimized uses space-optimized DP with single row.
func NumDistinctOptimized(s, t string) int {
	n := len(t)

	// dp[j] = ways to form t[:j] from current prefix of s
	dp := make([]int, n+1)
	dp[0] = 1 // Empty t can always be formed

	for _, charS := range s {
		// Process right to left to avoid using updated values
		for j := n; j >= 1; j-- {
			if charS == rune(t[j-1]) {
				dp[j] += dp[j-1]
			}
		}
	}

	return dp[n]
}

// ============================================================================
// APPROACH 3: Recursive with Memoization
// ============================================================================
// Time Complexity:  O(m × n) - each subproblem solved once
// Space Complexity: O(m × n) - cache + recursion stack
//
// WHEN TO USE:
// - More intuitive top-down thinking
// - When you want to explore the decision tree
// ============================================================================

// NumDistinctMemo uses top-down DP with memoization.
func NumDistinctMemo(s, t string) int {
	m, n := len(s), len(t)

	// Memoization cache: -1 means not computed
	memo := make([][]int, m)
	for i := range memo {
		memo[i] = make([]int, n)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}

	var dp func(i, j int) int
	dp = func(i, j int) int {
		// Successfully matched all of t
		if j < 0 {
			return 1
		}

		// Ran out of s but still have t to match
		if i < 0 {
			return 0
		}

		// Check memo
		if memo[i][j] != -1 {
			return memo[i][j]
		}

		// Option 1: Skip current character of s
		result := dp(i-1, j)

		// Option 2: Use the match if characters are equal
		if s[i] == t[j] {
			result += dp(i-1, j-1)
		}

		memo[i][j] = result
		return result
	}

	return dp(m-1, n-1)
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		s        string
		t        string
		expected int
		desc     string
	}{
		{"rabbbit", "rabbit", 3, "Standard case with repeated chars"},
		{"babgbag", "bag", 5, "Multiple paths"},
		{"aaa", "aa", 3, "All same characters"},
		{"abc", "abc", 1, "Exact match"},
		{"abc", "def", 0, "No match possible"},
		{"", "a", 0, "Empty s"},
		{"a", "", 1, "Empty t"},
		{"aabb", "ab", 4, "Four ways to pick ab"},
	}

	approaches := []struct {
		name string
		fn   func(string, string) int
	}{
		{"2D DP (Recommended)", NumDistinct},
		{"Space-Optimized", NumDistinctOptimized},
		{"Memoization", NumDistinctMemo},
	}

	fmt.Println("======================================================================")
	fmt.Println("COUNT DISTINCT SUBSEQUENCES - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.s, tc.t)
			status := "✓"
			if result != tc.expected {
				status = "✗"
				allPassed = false
			}
			fmt.Printf("  %s %s: %d (expected %d)\n", status, tc.desc, result, tc.expected)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		} else {
			fmt.Println("  Some tests failed!")
		}
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	// Sample Input 1
	s := "rabbbit"
	t := "rabbit"
	fmt.Printf("\nInput: s = \"%s\", t = \"%s\"\n", s, t)
	fmt.Printf("Output: %d\n", NumDistinct(s, t))

	// Sample Input 2
	s = "babgbag"
	t = "bag"
	fmt.Printf("\nInput: s = \"%s\", t = \"%s\"\n", s, t)
	fmt.Printf("Output: %d\n", NumDistinct(s, t))
}
