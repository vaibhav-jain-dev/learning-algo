/*
Minimum Window Subsequence - Go Solutions

Find the minimum contiguous substring of s1 containing s2 as a subsequence.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"math"
)

// ============================================================================
// APPROACH 1: Two Pointers (Forward + Backward) ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(m × n) - for each start, scan up to n chars
// Space Complexity: O(1) - only pointers and result string
//
// WHY THIS IS BEST:
// - Intuitive and easy to understand
// - Optimal for most cases
// - No extra space needed
// ============================================================================

// MinWindow finds minimum window using two-pointer technique.
//
// Key Insight: Two-phase approach for each potential window:
//  1. Forward pass: Find where s2 ends in s1
//  2. Backward pass: Find where s2 begins (minimizes window)
//
// Visual for s1="abcdebdde", s2="bde":
//
//	Forward phase (find end of subsequence):
//	s1: a b c d e b d d e
//	       ^     ^       (b matches)
//	           ^         (d matches)
//	             ^       (e matches) → end at index 4
//
//	Backward phase (shrink window):
//	s1: a b c d e
//	         ← ← ←       (e at 4, d at 3, b at 1)
//	      ^       ^      Window: [1, 4] = "bcde"
func MinWindow(s1, s2 string) string {
	m, n := len(s1), len(s2)
	minLen := math.MaxInt32
	result := ""

	i := 0 // Pointer in s1

	for i < m {
		j := 0 // Pointer in s2

		// Forward pass: Find where s2 ends as subsequence in s1
		for i < m && j < n {
			if s1[i] == s2[j] {
				j++
			}
			i++
		}

		// If we didn't match all of s2, no more windows possible
		if j < n {
			break
		}

		// Found a window ending at i-1
		end := i - 1

		// Backward pass: Shrink the window
		j = n - 1
		for j >= 0 {
			if s1[end] == s2[j] {
				j--
			}
			end--
		}

		// Window starts at end + 1
		start := end + 1
		windowLen := i - start

		// Update result if this window is smaller
		if windowLen < minLen {
			minLen = windowLen
			result = s1[start:i]
		}

		// Move to next potential window
		i = start + 1
	}

	return result
}

// ============================================================================
// APPROACH 2: Dynamic Programming
// ============================================================================
// Time Complexity:  O(m × n)
// Space Complexity: O(m × n)
//
// WHEN TO USE:
// - When you need to understand all possible windows
// - Good for variations of the problem
// ============================================================================

// MinWindowDP uses DP approach tracking window start positions.
func MinWindowDP(s1, s2 string) string {
	m, n := len(s1), len(s2)

	// dp[i][j] = start index of window ending at i-1 containing s2[:j]
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
		for j := range dp[i] {
			dp[i][j] = -1
		}
		dp[i][0] = i // Empty s2 can be matched starting at any position
	}

	// Fill the DP table
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if s1[i-1] == s2[j-1] {
				// Extend the previous match
				dp[i][j] = dp[i-1][j-1]
			} else {
				// Keep the previous window start
				dp[i][j] = dp[i-1][j]
			}
		}
	}

	// Find the minimum window
	minLen := math.MaxInt32
	result := ""

	for i := 1; i <= m; i++ {
		if dp[i][n] != -1 {
			start := dp[i][n]
			windowLen := i - start
			if windowLen < minLen {
				minLen = windowLen
				result = s1[start:i]
			}
		}
	}

	return result
}

// ============================================================================
// APPROACH 3: Optimized with Next Character Index
// ============================================================================
// Time Complexity:  O(m × n) worst case, often better in practice
// Space Complexity: O(m × 26) for the next array
//
// WHEN TO USE:
// - When s1 is very long
// - When s2 has repeated characters
// ============================================================================

// MinWindowOptimized uses precomputed next character positions.
func MinWindowOptimized(s1, s2 string) string {
	m, n := len(s1), len(s2)

	// Precompute next occurrence of each character
	// nextChar[i][c] = next index >= i where character c appears
	nextChar := make([][]int, m+1)
	for i := range nextChar {
		nextChar[i] = make([]int, 26)
		for c := range nextChar[i] {
			nextChar[i][c] = m // Default: not found
		}
	}

	// Fill from right to left
	for i := m - 1; i >= 0; i-- {
		// Copy previous row
		for c := 0; c < 26; c++ {
			nextChar[i][c] = nextChar[i+1][c]
		}
		// Update current character
		charIdx := int(s1[i] - 'a')
		nextChar[i][charIdx] = i
	}

	minLen := math.MaxInt32
	result := ""

	// Try each starting position
	for start := 0; start < m; start++ {
		pos := start

		// Match each character of s2 using jump table
		matched := true
		for _, char := range s2 {
			charIdx := int(char - 'a')
			pos = nextChar[pos][charIdx]
			if pos == m {
				matched = false
				break
			}
			pos++
		}

		if matched {
			windowLen := pos - start
			if windowLen < minLen {
				minLen = windowLen
				result = s1[start:pos]
			}
		}
	}

	return result
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		s1       string
		s2       string
		expected string
		desc     string
	}{
		{"abcdebdde", "bde", "bcde", "Standard case"},
		{"abcdef", "ace", "abcde", "Full window needed"},
		{"abc", "abc", "abc", "Exact match"},
		{"abc", "d", "", "No match"},
		{"aaa", "aa", "aa", "Repeated chars"},
		{"fgrqsqsnodwmxzkzxwqegkndaa", "fnok", "fgrqsqsnodwmxzkzxwqegkn", "Long string"},
		{"cnhczmccqouqadqtmjjzl", "mm", "mccqouqadqtm", "Two same chars"},
	}

	approaches := []struct {
		name string
		fn   func(string, string) string
	}{
		{"Two Pointers (Recommended)", MinWindow},
		{"Dynamic Programming", MinWindowDP},
		{"Optimized with Jump Table", MinWindowOptimized},
	}

	fmt.Println("======================================================================")
	fmt.Println("MINIMUM WINDOW SUBSEQUENCE - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.s1, tc.s2)
			status := "✓"
			if result != tc.expected {
				status = "✗"
				allPassed = false
			}
			fmt.Printf("  %s %s: '%s' (expected '%s')\n", status, tc.desc, result, tc.expected)
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
	s1 := "abcdebdde"
	s2 := "bde"
	fmt.Printf("\nInput: s1 = \"%s\", s2 = \"%s\"\n", s1, s2)
	fmt.Printf("Output: \"%s\"\n", MinWindow(s1, s2))

	// Sample Input 2
	s1 = "jmeqksfrsdcmsiwvaovztaqenprpvnbstl"
	s2 = "u"
	fmt.Printf("\nInput: s1 = \"%s\", s2 = \"%s\"\n", s1, s2)
	fmt.Printf("Output: \"%s\"\n", MinWindow(s1, s2))

	// Sample Input 3
	s1 = "abcdef"
	s2 = "ace"
	fmt.Printf("\nInput: s1 = \"%s\", s2 = \"%s\"\n", s1, s2)
	fmt.Printf("Output: \"%s\"\n", MinWindow(s1, s2))
}
