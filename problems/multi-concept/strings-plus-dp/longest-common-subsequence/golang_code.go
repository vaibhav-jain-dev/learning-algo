/*
Longest Common Subsequence
Combines: String Processing + 2D Dynamic Programming
*/

package main

import "fmt"

func longestCommonSubsequence(text1 string, text2 string) int {
	m, n := len(text1), len(text2)

	// dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1]
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}

	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if text1[i-1] == text2[j-1] {
				dp[i][j] = dp[i-1][j-1] + 1
			} else {
				dp[i][j] = max(dp[i-1][j], dp[i][j-1])
			}
		}
	}

	return dp[m][n]
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// Space-optimized version
func longestCommonSubsequenceOptimized(text1 string, text2 string) int {
	m, n := len(text1), len(text2)

	if n > m {
		text1, text2 = text2, text1
		m, n = n, m
	}

	prev := make([]int, n+1)
	curr := make([]int, n+1)

	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if text1[i-1] == text2[j-1] {
				curr[j] = prev[j-1] + 1
			} else {
				curr[j] = max(prev[j], curr[j-1])
			}
		}
		prev, curr = curr, make([]int, n+1)
	}

	return prev[n]
}

// Return length and actual LCS string
func lcsWithString(text1 string, text2 string) (int, string) {
	m, n := len(text1), len(text2)

	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}

	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if text1[i-1] == text2[j-1] {
				dp[i][j] = dp[i-1][j-1] + 1
			} else {
				dp[i][j] = max(dp[i-1][j], dp[i][j-1])
			}
		}
	}

	// Backtrack
	lcs := []byte{}
	i, j := m, n
	for i > 0 && j > 0 {
		if text1[i-1] == text2[j-1] {
			lcs = append([]byte{text1[i-1]}, lcs...)
			i--
			j--
		} else if dp[i-1][j] > dp[i][j-1] {
			i--
		} else {
			j--
		}
	}

	return dp[m][n], string(lcs)
}

func main() {
	testCases := []struct {
		text1    string
		text2    string
		expected int
	}{
		{"abcde", "ace", 3},
		{"abc", "abc", 3},
		{"abc", "def", 0},
		{"bl", "yby", 1},
		{"AGGTAB", "GXTXAYB", 4},
	}

	fmt.Println("Longest Common Subsequence")
	fmt.Println("============================================================")

	for i, tc := range testCases {
		result := longestCommonSubsequence(tc.text1, tc.text2)
		length, lcs := lcsWithString(tc.text1, tc.text2)

		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}

		fmt.Printf("\nTest %d: '%s' vs '%s'\n", i+1, tc.text1, tc.text2)
		fmt.Printf("  Length: %d (expected: %d) [%s]\n", result, tc.expected, status)
		fmt.Printf("  LCS string: '%s' (length: %d)\n", lcs, length)
	}
}
