/*
Levenshtein Distance (Edit Distance) - Go Solution

Find the minimum number of operations (insert, delete, replace) to transform
one string into another.

Time Complexity: O(m * n)
Space Complexity: O(m * n), optimized to O(min(m, n))
*/

package main

import "fmt"

// LevenshteinDistance calculates edit distance using bottom-up DP
func LevenshteinDistance(str1, str2 string) int {
	m, n := len(str1), len(str2)

	// Create DP table
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}

	// Base cases: transforming empty string
	for i := 0; i <= m; i++ {
		dp[i][0] = i // Delete all characters from str1
	}
	for j := 0; j <= n; j++ {
		dp[0][j] = j // Insert all characters to empty str1
	}

	// Fill the DP table
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if str1[i-1] == str2[j-1] {
				// Characters match, no operation needed
				dp[i][j] = dp[i-1][j-1]
			} else {
				// Take minimum of three operations
				dp[i][j] = 1 + min(
					dp[i-1][j],   // Delete from str1
					dp[i][j-1],   // Insert into str1
					dp[i-1][j-1], // Replace in str1
				)
			}
		}
	}

	return dp[m][n]
}

// LevenshteinDistanceOptimized uses only two rows for space optimization
func LevenshteinDistanceOptimized(str1, str2 string) int {
	// Ensure str2 is the shorter string for space optimization
	if len(str1) < len(str2) {
		str1, str2 = str2, str1
	}

	m, n := len(str1), len(str2)

	// Only need two rows
	prev := make([]int, n+1)
	curr := make([]int, n+1)

	// Initialize first row
	for j := 0; j <= n; j++ {
		prev[j] = j
	}

	for i := 1; i <= m; i++ {
		curr[0] = i // Base case for current row

		for j := 1; j <= n; j++ {
			if str1[i-1] == str2[j-1] {
				curr[j] = prev[j-1]
			} else {
				curr[j] = 1 + min(prev[j], curr[j-1], prev[j-1])
			}
		}

		// Swap rows
		prev, curr = curr, prev
	}

	return prev[n]
}

// LevenshteinDistanceRecursive uses top-down approach with memoization
func LevenshteinDistanceRecursive(str1, str2 string) int {
	memo := make(map[[2]int]int)

	var dp func(i, j int) int
	dp = func(i, j int) int {
		// Base cases
		if i == 0 {
			return j // Insert all remaining characters
		}
		if j == 0 {
			return i // Delete all remaining characters
		}

		key := [2]int{i, j}
		if val, exists := memo[key]; exists {
			return val
		}

		var result int
		if str1[i-1] == str2[j-1] {
			result = dp(i-1, j-1)
		} else {
			result = 1 + min(
				dp(i-1, j),   // Delete
				dp(i, j-1),   // Insert
				dp(i-1, j-1), // Replace
			)
		}

		memo[key] = result
		return result
	}

	return dp(len(str1), len(str2))
}

// EditOperation represents a single edit operation
type EditOperation struct {
	OpType  string // "insert", "delete", "replace"
	Index   int
	OldChar byte
	NewChar byte
}

// GetEditOperations returns the actual sequence of edit operations
func GetEditOperations(str1, str2 string) []EditOperation {
	m, n := len(str1), len(str2)

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
			if str1[i-1] == str2[j-1] {
				dp[i][j] = dp[i-1][j-1]
			} else {
				dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
			}
		}
	}

	// Backtrack to find operations
	var operations []EditOperation
	i, j := m, n

	for i > 0 || j > 0 {
		if i > 0 && j > 0 && str1[i-1] == str2[j-1] {
			i--
			j--
		} else if i > 0 && j > 0 && dp[i][j] == dp[i-1][j-1]+1 {
			operations = append(operations, EditOperation{
				OpType:  "replace",
				Index:   i - 1,
				OldChar: str1[i-1],
				NewChar: str2[j-1],
			})
			i--
			j--
		} else if j > 0 && dp[i][j] == dp[i][j-1]+1 {
			operations = append(operations, EditOperation{
				OpType:  "insert",
				Index:   i,
				NewChar: str2[j-1],
			})
			j--
		} else {
			operations = append(operations, EditOperation{
				OpType:  "delete",
				Index:   i - 1,
				OldChar: str1[i-1],
			})
			i--
		}
	}

	// Reverse operations
	for left, right := 0, len(operations)-1; left < right; left, right = left+1, right-1 {
		operations[left], operations[right] = operations[right], operations[left]
	}

	return operations
}

func min(values ...int) int {
	minVal := values[0]
	for _, v := range values[1:] {
		if v < minVal {
			minVal = v
		}
	}
	return minVal
}

func main() {
	// Test 1: Basic case
	s1, s2 := "abc", "yabd"
	result := LevenshteinDistance(s1, s2)
	fmt.Printf("Test 1: '%s' -> '%s' = %d\n", s1, s2, result) // Expected: 2

	// Test 2: Classic example
	s1, s2 = "horse", "ros"
	result = LevenshteinDistance(s1, s2)
	fmt.Printf("Test 2: '%s' -> '%s' = %d\n", s1, s2, result) // Expected: 3

	// Test 3: Empty string
	s1, s2 = "", "abc"
	result = LevenshteinDistance(s1, s2)
	fmt.Printf("Test 3: '%s' -> '%s' = %d\n", s1, s2, result) // Expected: 3

	// Test 4: Same strings
	s1, s2 = "hello", "hello"
	result = LevenshteinDistance(s1, s2)
	fmt.Printf("Test 4: '%s' -> '%s' = %d\n", s1, s2, result) // Expected: 0

	// Test 5: Completely different
	s1, s2 = "abc", "xyz"
	result = LevenshteinDistance(s1, s2)
	fmt.Printf("Test 5: '%s' -> '%s' = %d\n", s1, s2, result) // Expected: 3

	// Test 6: Compare all methods
	s1, s2 = "intention", "execution"
	fmt.Printf("\nTest 6 - Method comparison for '%s' -> '%s':\n", s1, s2)
	fmt.Printf("  Bottom-up: %d\n", LevenshteinDistance(s1, s2))
	fmt.Printf("  Optimized: %d\n", LevenshteinDistanceOptimized(s1, s2))
	fmt.Printf("  Recursive: %d\n", LevenshteinDistanceRecursive(s1, s2))

	// Test 7: Get actual operations
	s1, s2 = "cat", "cut"
	ops := GetEditOperations(s1, s2)
	fmt.Printf("\nTest 7 - Operations for '%s' -> '%s':\n", s1, s2)
	for _, op := range ops {
		fmt.Printf("  %+v\n", op)
	}

	// Test 8: Longer example with operations
	s1, s2 = "saturday", "sunday"
	distance := LevenshteinDistance(s1, s2)
	ops = GetEditOperations(s1, s2)
	fmt.Printf("\nTest 8 - '%s' -> '%s':\n", s1, s2)
	fmt.Printf("  Distance: %d\n", distance)
	fmt.Printf("  Operations: %v\n", ops)

	fmt.Println("\nAll tests completed!")
}
