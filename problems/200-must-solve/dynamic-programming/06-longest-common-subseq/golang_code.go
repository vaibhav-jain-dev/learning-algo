/*
Longest Common Subsequence - Go Solution

Find the longest common subsequence of two strings.

Time Complexity: O(m * n)
Space Complexity: O(m * n)
*/

package main

import "fmt"

// LongestCommonSubsequence finds the LCS using bottom-up DP
func LongestCommonSubsequence(str1, str2 string) []byte {
	if len(str1) == 0 || len(str2) == 0 {
		return []byte{}
	}

	m, n := len(str1), len(str2)

	// Create DP table
	// dp[i][j] = length of LCS for str1[0:i] and str2[0:j]
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}

	// Fill the DP table
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if str1[i-1] == str2[j-1] {
				// Characters match, extend LCS
				dp[i][j] = dp[i-1][j-1] + 1
			} else {
				// Take the max from excluding one character
				dp[i][j] = max(dp[i-1][j], dp[i][j-1])
			}
		}
	}

	// Backtrack to reconstruct the LCS
	lcs := []byte{}
	i, j := m, n

	for i > 0 && j > 0 {
		if str1[i-1] == str2[j-1] {
			// This character is part of LCS
			lcs = append(lcs, str1[i-1])
			i--
			j--
		} else if dp[i-1][j] > dp[i][j-1] {
			// Move up
			i--
		} else {
			// Move left
			j--
		}
	}

	// Reverse lcs
	for left, right := 0, len(lcs)-1; left < right; left, right = left+1, right-1 {
		lcs[left], lcs[right] = lcs[right], lcs[left]
	}

	return lcs
}

// LCSLength returns only the length of LCS
func LCSLength(str1, str2 string) int {
	if len(str1) == 0 || len(str2) == 0 {
		return 0
	}

	m, n := len(str1), len(str2)
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}

	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if str1[i-1] == str2[j-1] {
				dp[i][j] = dp[i-1][j-1] + 1
			} else {
				dp[i][j] = max(dp[i-1][j], dp[i][j-1])
			}
		}
	}

	return dp[m][n]
}

// LCSLengthOptimized uses only two rows for space optimization
func LCSLengthOptimized(str1, str2 string) int {
	if len(str1) == 0 || len(str2) == 0 {
		return 0
	}

	// Use the shorter string for columns
	if len(str1) < len(str2) {
		str1, str2 = str2, str1
	}

	m, n := len(str1), len(str2)

	prev := make([]int, n+1)
	curr := make([]int, n+1)

	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if str1[i-1] == str2[j-1] {
				curr[j] = prev[j-1] + 1
			} else {
				curr[j] = max(prev[j], curr[j-1])
			}
		}
		prev, curr = curr, prev
	}

	return prev[n]
}

// LCSRecursive uses top-down approach with memoization
func LCSRecursive(str1, str2 string) []byte {
	if len(str1) == 0 || len(str2) == 0 {
		return []byte{}
	}

	memo := make(map[[2]int]int)

	var dp func(i, j int) int
	dp = func(i, j int) int {
		if i == 0 || j == 0 {
			return 0
		}

		key := [2]int{i, j}
		if val, exists := memo[key]; exists {
			return val
		}

		var result int
		if str1[i-1] == str2[j-1] {
			result = dp(i-1, j-1) + 1
		} else {
			result = max(dp(i-1, j), dp(i, j-1))
		}

		memo[key] = result
		return result
	}

	m, n := len(str1), len(str2)
	dp(m, n) // Fill memo table

	// Backtrack to reconstruct
	lcs := []byte{}
	i, j := m, n

	for i > 0 && j > 0 {
		if str1[i-1] == str2[j-1] {
			lcs = append(lcs, str1[i-1])
			i--
			j--
		} else {
			left := memo[[2]int{i - 1, j}]
			right := memo[[2]int{i, j - 1}]
			if left > right {
				i--
			} else {
				j--
			}
		}
	}

	// Reverse lcs
	for left, right := 0, len(lcs)-1; left < right; left, right = left+1, right-1 {
		lcs[left], lcs[right] = lcs[right], lcs[left]
	}

	return lcs
}

// LCSString returns LCS as a string instead of byte slice
func LCSString(str1, str2 string) string {
	return string(LongestCommonSubsequence(str1, str2))
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func main() {
	// Test 1: Standard case
	s1, s2 := "ZXVVYZW", "XKYKZPW"
	result := LongestCommonSubsequence(s1, s2)
	fmt.Printf("Test 1: '%s' and '%s'\n", s1, s2)
	fmt.Printf("  LCS: %s (length %d)\n", string(result), len(result))
	// Expected: XYZW or equivalent

	// Test 2: Another case
	s1, s2 = "ABCDGH", "AEDFHR"
	result = LongestCommonSubsequence(s1, s2)
	fmt.Printf("\nTest 2: '%s' and '%s'\n", s1, s2)
	fmt.Printf("  LCS: %s (length %d)\n", string(result), len(result))
	// Expected: ADH

	// Test 3: No common subsequence
	s1, s2 = "ABC", "DEF"
	result = LongestCommonSubsequence(s1, s2)
	fmt.Printf("\nTest 3: '%s' and '%s'\n", s1, s2)
	fmt.Printf("  LCS: '%s' (length %d)\n", string(result), len(result))
	// Expected: ""

	// Test 4: One empty string
	s1, s2 = "", "ABC"
	result = LongestCommonSubsequence(s1, s2)
	fmt.Printf("\nTest 4: '%s' and '%s'\n", s1, s2)
	fmt.Printf("  LCS: '%s' (length %d)\n", string(result), len(result))
	// Expected: ""

	// Test 5: Same strings
	s1, s2 = "ABCDE", "ABCDE"
	result = LongestCommonSubsequence(s1, s2)
	fmt.Printf("\nTest 5: '%s' and '%s'\n", s1, s2)
	fmt.Printf("  LCS: %s (length %d)\n", string(result), len(result))
	// Expected: ABCDE

	// Test 6: Compare all methods
	s1, s2 = "AGGTAB", "GXTXAYB"
	fmt.Printf("\nTest 6 - Method comparison for '%s' and '%s':\n", s1, s2)
	fmt.Printf("  Bottom-up: %s\n", string(LongestCommonSubsequence(s1, s2)))
	fmt.Printf("  Recursive: %s\n", string(LCSRecursive(s1, s2)))
	fmt.Printf("  Length: %d\n", LCSLength(s1, s2))
	fmt.Printf("  Optimized length: %d\n", LCSLengthOptimized(s1, s2))
	fmt.Printf("  As string: '%s'\n", LCSString(s1, s2))

	// Test 7: Lowercase strings
	s1, s2 = "programming", "gaming"
	result = LongestCommonSubsequence(s1, s2)
	fmt.Printf("\nTest 7: '%s' and '%s'\n", s1, s2)
	fmt.Printf("  LCS: '%s'\n", string(result))

	// Test 8: Longer example
	s1, s2 = "ABCBDAB", "BDCAB"
	result = LongestCommonSubsequence(s1, s2)
	fmt.Printf("\nTest 8: '%s' and '%s'\n", s1, s2)
	fmt.Printf("  LCS: '%s' (length %d)\n", string(result), len(result))

	fmt.Println("\nAll tests completed!")
}
