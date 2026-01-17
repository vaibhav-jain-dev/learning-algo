/*
Longest Common Subsequence - Go Solutions

Find the length of the longest common subsequence between two strings.

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
// - Clear visualization of subproblem relationships
// - Easy to understand and debug
// - Can reconstruct the actual LCS if needed
// ============================================================================

// LongestCommonSubsequence finds LCS length using bottom-up DP.
//
// Key Insight: If characters match, extend previous LCS by 1.
// If not, take the best LCS from either excluding current char.
//
// Visual for text1="ace", text2="abcde":
//
//	        ""  a  b  c  d  e
//	    ""   0  0  0  0  0  0
//	    a    0  1  1  1  1  1
//	    c    0  1  1  2  2  2
//	    e    0  1  1  2  2  3
//
//	    Answer: dp[3][5] = 3 (LCS = "ace")
func LongestCommonSubsequence(text1, text2 string) int {
	m, n := len(text1), len(text2)

	// dp[i][j] = LCS length for text1[:i] and text2[:j]
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}

	// Fill the table using range for idiomatic Go
	for i, char1 := range text1 {
		for j, char2 := range text2 {
			if char1 == char2 {
				// Characters match - extend LCS
				dp[i+1][j+1] = dp[i][j] + 1
			} else {
				// Take best from excluding either character
				dp[i+1][j+1] = max(dp[i][j+1], dp[i+1][j])
			}
		}
	}

	return dp[m][n]
}

// ============================================================================
// APPROACH 2: Space-Optimized DP
// ============================================================================
// Time Complexity:  O(m × n)
// Space Complexity: O(min(m, n)) - only two rows needed
//
// WHEN TO USE:
// - Memory is constrained
// - Only need the length, not the actual LCS
// ============================================================================

// LongestCommonSubsequenceOptimized uses only two rows of space.
func LongestCommonSubsequenceOptimized(text1, text2 string) int {
	// Ensure text2 is shorter for space optimization
	if len(text1) < len(text2) {
		text1, text2 = text2, text1
	}

	n := len(text2)

	// Only need two rows
	prev := make([]int, n+1)
	curr := make([]int, n+1)

	for _, char1 := range text1 {
		for j, char2 := range text2 {
			if char1 == char2 {
				curr[j+1] = prev[j] + 1
			} else {
				curr[j+1] = max(prev[j+1], curr[j])
			}
		}
		// Swap rows
		prev, curr = curr, prev
	}

	return prev[n]
}

// ============================================================================
// APPROACH 3: Recursive with Memoization
// ============================================================================
// Time Complexity:  O(m × n) - each subproblem solved once
// Space Complexity: O(m × n) - cache + recursion stack
//
// WHEN TO USE:
// - More intuitive top-down thinking
// - When only some subproblems need solving
// ============================================================================

// LongestCommonSubsequenceMemo uses top-down DP with memoization.
func LongestCommonSubsequenceMemo(text1, text2 string) int {
	m, n := len(text1), len(text2)

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
		// Base case: empty string
		if i < 0 || j < 0 {
			return 0
		}

		// Check memo
		if memo[i][j] != -1 {
			return memo[i][j]
		}

		var result int
		if text1[i] == text2[j] {
			// Characters match
			result = dp(i-1, j-1) + 1
		} else {
			// Take the better option
			result = max(dp(i-1, j), dp(i, j-1))
		}

		memo[i][j] = result
		return result
	}

	return dp(m-1, n-1)
}

// ============================================================================
// BONUS: Reconstruct the Actual LCS
// ============================================================================

// LongestCommonSubsequenceWithString returns both length and actual LCS.
func LongestCommonSubsequenceWithString(text1, text2 string) (int, string) {
	m, n := len(text1), len(text2)

	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}

	// Fill DP table
	for i, char1 := range text1 {
		for j, char2 := range text2 {
			if char1 == char2 {
				dp[i+1][j+1] = dp[i][j] + 1
			} else {
				dp[i+1][j+1] = max(dp[i][j+1], dp[i+1][j])
			}
		}
	}

	// Backtrack to find actual LCS
	lcs := make([]byte, 0, dp[m][n])
	i, j := m, n

	for i > 0 && j > 0 {
		if text1[i-1] == text2[j-1] {
			lcs = append(lcs, text1[i-1])
			i--
			j--
		} else if dp[i-1][j] > dp[i][j-1] {
			i--
		} else {
			j--
		}
	}

	// Reverse the LCS
	for left, right := 0, len(lcs)-1; left < right; left, right = left+1, right-1 {
		lcs[left], lcs[right] = lcs[right], lcs[left]
	}

	return dp[m][n], string(lcs)
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		text1    string
		text2    string
		expected int
		desc     string
	}{
		{"abcde", "ace", 3, "Standard case"},
		{"abc", "abc", 3, "Identical strings"},
		{"abc", "def", 0, "No common chars"},
		{"oxcpqrsvwf", "shmtulqrypy", 2, "Longer strings"},
		{"", "abc", 0, "Empty string"},
		{"a", "a", 1, "Single char match"},
		{"abcba", "abcbcba", 5, "Palindrome-like"},
	}

	approaches := []struct {
		name string
		fn   func(string, string) int
	}{
		{"2D DP (Recommended)", LongestCommonSubsequence},
		{"Space-Optimized", LongestCommonSubsequenceOptimized},
		{"Memoization", LongestCommonSubsequenceMemo},
	}

	fmt.Println("======================================================================")
	fmt.Println("LONGEST COMMON SUBSEQUENCE - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.text1, tc.text2)
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

	// Show LCS reconstruction
	fmt.Println("\n======================================================================")
	fmt.Println("LCS RECONSTRUCTION EXAMPLE")
	fmt.Println("======================================================================")
	text1, text2 := "abcde", "ace"
	length, lcs := LongestCommonSubsequenceWithString(text1, text2)
	fmt.Printf("\ntext1 = \"%s\"\n", text1)
	fmt.Printf("text2 = \"%s\"\n", text2)
	fmt.Printf("LCS length = %d\n", length)
	fmt.Printf("LCS string = \"%s\"\n", lcs)

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	// Sample Input 1
	text1 = "abcde"
	text2 = "ace"
	fmt.Printf("\nInput: text1 = \"%s\", text2 = \"%s\"\n", text1, text2)
	fmt.Printf("Output: %d\n", LongestCommonSubsequence(text1, text2))

	// Sample Input 2
	text1 = "abc"
	text2 = "abc"
	fmt.Printf("\nInput: text1 = \"%s\", text2 = \"%s\"\n", text1, text2)
	fmt.Printf("Output: %d\n", LongestCommonSubsequence(text1, text2))

	// Sample Input 3
	text1 = "abc"
	text2 = "def"
	fmt.Printf("\nInput: text1 = \"%s\", text2 = \"%s\"\n", text1, text2)
	fmt.Printf("Output: %d\n", LongestCommonSubsequence(text1, text2))
}
