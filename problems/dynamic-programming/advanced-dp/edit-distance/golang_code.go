package main

import (
	"fmt"
	"strings"
)

/*
Edit Distance (Levenshtein Distance)
LeetCode 72 (Hard)

A classic DP problem with real-world applications in:
- Spell checkers
- DNA sequence alignment
- Plagiarism detection
- Autocomplete systems
*/

// minDistanceRecursive is the pure recursive approach (exponential time)
// Time: O(3^(m+n)), Space: O(m+n)
// Educational purpose only - will TLE on large inputs
func minDistanceRecursive(word1 string, word2 string) int {
	var solve func(i, j int) int
	solve = func(i, j int) int {
		// Base cases
		if i == 0 {
			return j // Insert j characters
		}
		if j == 0 {
			return i // Delete i characters
		}

		// Characters match
		if word1[i-1] == word2[j-1] {
			return solve(i-1, j-1)
		}

		// Try all operations
		return 1 + min3(
			solve(i-1, j),   // Delete
			solve(i, j-1),   // Insert
			solve(i-1, j-1), // Replace
		)
	}

	return solve(len(word1), len(word2))
}

// minDistanceMemo uses memoization for top-down DP
// Time: O(m × n), Space: O(m × n)
func minDistanceMemo(word1 string, word2 string) int {
	m, n := len(word1), len(word2)
	memo := make([][]int, m+1)
	for i := range memo {
		memo[i] = make([]int, n+1)
		for j := range memo[i] {
			memo[i][j] = -1
		}
	}

	var solve func(i, j int) int
	solve = func(i, j int) int {
		if i == 0 {
			return j
		}
		if j == 0 {
			return i
		}

		if memo[i][j] != -1 {
			return memo[i][j]
		}

		if word1[i-1] == word2[j-1] {
			memo[i][j] = solve(i-1, j-1)
		} else {
			memo[i][j] = 1 + min3(
				solve(i-1, j),
				solve(i, j-1),
				solve(i-1, j-1),
			)
		}

		return memo[i][j]
	}

	return solve(m, n)
}

// minDistance uses tabulation (bottom-up DP) - standard solution
// Time: O(m × n), Space: O(m × n)
func minDistance(word1 string, word2 string) int {
	m, n := len(word1), len(word2)

	// Create DP table
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}

	// Base cases
	for i := 0; i <= m; i++ {
		dp[i][0] = i // Delete i characters
	}
	for j := 0; j <= n; j++ {
		dp[0][j] = j // Insert j characters
	}

	// Fill the table
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if word1[i-1] == word2[j-1] {
				// Characters match - no operation needed
				dp[i][j] = dp[i-1][j-1]
			} else {
				// Take minimum of three operations
				dp[i][j] = 1 + min3(
					dp[i-1][j],   // Delete
					dp[i][j-1],   // Insert
					dp[i-1][j-1], // Replace
				)
			}
		}
	}

	return dp[m][n]
}

// minDistanceSpaceOptimized uses only O(n) space
// Time: O(m × n), Space: O(min(m, n))
func minDistanceSpaceOptimized(word1 string, word2 string) int {
	m, n := len(word1), len(word2)

	// Ensure word2 is shorter for space efficiency
	if m < n {
		word1, word2 = word2, word1
		m, n = n, m
	}

	// Only need two rows
	prev := make([]int, n+1)
	curr := make([]int, n+1)

	// Initialize first row
	for j := 0; j <= n; j++ {
		prev[j] = j
	}

	// Fill row by row
	for i := 1; i <= m; i++ {
		curr[0] = i

		for j := 1; j <= n; j++ {
			if word1[i-1] == word2[j-1] {
				curr[j] = prev[j-1]
			} else {
				curr[j] = 1 + min3(
					prev[j],   // Delete
					curr[j-1], // Insert
					prev[j-1], // Replace
				)
			}
		}

		// Swap rows
		prev, curr = curr, prev
	}

	return prev[n]
}

// minDistanceWithOperations returns both distance and operations
func minDistanceWithOperations(word1, word2 string) (int, []string) {
	m, n := len(word1), len(word2)

	// Build DP table
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}

	for i := 0; i <= m; i++ {
		dp[i][0] = i
	}
	for j := 0; j <= n; j++ {
		dp[0][j] = j
	}

	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if word1[i-1] == word2[j-1] {
				dp[i][j] = dp[i-1][j-1]
			} else {
				dp[i][j] = 1 + min3(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
			}
		}
	}

	// Backtrack to find operations
	var operations []string
	i, j := m, n

	for i > 0 || j > 0 {
		if i > 0 && j > 0 && word1[i-1] == word2[j-1] {
			i--
			j--
		} else if i > 0 && j > 0 && dp[i][j] == dp[i-1][j-1]+1 {
			operations = append(operations,
				fmt.Sprintf("Replace '%c' at index %d with '%c'",
					word1[i-1], i-1, word2[j-1]))
			i--
			j--
		} else if i > 0 && dp[i][j] == dp[i-1][j]+1 {
			operations = append(operations,
				fmt.Sprintf("Delete '%c' at index %d", word1[i-1], i-1))
			i--
		} else if j > 0 && dp[i][j] == dp[i][j-1]+1 {
			operations = append(operations,
				fmt.Sprintf("Insert '%c' at index %d", word2[j-1], i))
			j--
		}
	}

	// Reverse operations
	for left, right := 0, len(operations)-1; left < right; left, right = left+1, right-1 {
		operations[left], operations[right] = operations[right], operations[left]
	}

	return dp[m][n], operations
}

func min3(a, b, c int) int {
	if a <= b && a <= c {
		return a
	}
	if b <= c {
		return b
	}
	return c
}

func printDPTable(word1, word2 string, dp [][]int) {
	m, n := len(word1), len(word2)

	fmt.Println("\nDP Table:")
	fmt.Print("      ε")
	for _, c := range word2 {
		fmt.Printf("  %c", c)
	}
	fmt.Println()

	for i := 0; i <= m; i++ {
		if i == 0 {
			fmt.Print("  ε")
		} else {
			fmt.Printf("  %c", word1[i-1])
		}

		for j := 0; j <= n; j++ {
			fmt.Printf(" %2d", dp[i][j])
		}
		fmt.Println()
	}
}

func main() {
	testCases := []struct {
		word1    string
		word2    string
		expected int
	}{
		{"horse", "ros", 3},
		{"intention", "execution", 5},
		{"", "abc", 3},
		{"abc", "", 3},
		{"abc", "abc", 0},
		{"kitten", "sitting", 3},
		{"sunday", "saturday", 3},
	}

	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("EDIT DISTANCE - Comprehensive Test")
	fmt.Println(strings.Repeat("=", 60))

	for _, tc := range testCases {
		fmt.Println()
		fmt.Println(strings.Repeat("-", 50))
		fmt.Printf("word1: '%s'\n", tc.word1)
		fmt.Printf("word2: '%s'\n", tc.word2)
		fmt.Printf("Expected: %d\n", tc.expected)

		// Test tabulation
		result := minDistance(tc.word1, tc.word2)
		fmt.Printf("Result:   %d\n", result)

		// Verify space-optimized gives same result
		resultOpt := minDistanceSpaceOptimized(tc.word1, tc.word2)
		if result != resultOpt {
			fmt.Printf("ERROR: Space-optimized gave %d!\n", resultOpt)
		}

		// Get operations
		distance, operations := minDistanceWithOperations(tc.word1, tc.word2)
		fmt.Printf("\nOperations (%d):\n", len(operations))
		for i, op := range operations {
			fmt.Printf("  %d. %s\n", i+1, op)
		}

		if distance == tc.expected {
			fmt.Println("\n✓ PASSED")
		} else {
			fmt.Printf("\n✗ FAILED (got %d, expected %d)\n", distance, tc.expected)
		}
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("All tests completed!")
	fmt.Println(strings.Repeat("=", 60))
}
