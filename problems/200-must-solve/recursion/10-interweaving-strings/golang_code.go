/*
Interweaving Strings - Go Solution

Check if string three can be formed by interweaving strings one and two.
*/

package main

import "fmt"

// InterweavingStrings checks if three is an interweaving of one and two using DP.
func InterweavingStrings(one, two, three string) bool {
	// Quick length check
	if len(one)+len(two) != len(three) {
		return false
	}

	// dp[i][j] = can first i chars of one and first j chars of two
	//            form first i+j chars of three?
	dp := make([][]bool, len(one)+1)
	for i := range dp {
		dp[i] = make([]bool, len(two)+1)
	}

	// Base case: empty strings form empty string
	dp[0][0] = true

	// Fill first row (using only chars from two)
	for j := 1; j <= len(two); j++ {
		dp[0][j] = dp[0][j-1] && two[j-1] == three[j-1]
	}

	// Fill first column (using only chars from one)
	for i := 1; i <= len(one); i++ {
		dp[i][0] = dp[i-1][0] && one[i-1] == three[i-1]
	}

	// Fill rest of the table
	for i := 1; i <= len(one); i++ {
		for j := 1; j <= len(two); j++ {
			k := i + j - 1 // Current position in three

			// Option 1: take from one
			fromOne := dp[i-1][j] && one[i-1] == three[k]

			// Option 2: take from two
			fromTwo := dp[i][j-1] && two[j-1] == three[k]

			dp[i][j] = fromOne || fromTwo
		}
	}

	return dp[len(one)][len(two)]
}

// InterweavingStringsRecursive uses memoized recursion.
func InterweavingStringsRecursive(one, two, three string) bool {
	if len(one)+len(two) != len(three) {
		return false
	}

	memo := make(map[[2]int]bool)
	visited := make(map[[2]int]bool)

	var canInterweave func(i, j int) bool
	canInterweave = func(i, j int) bool {
		k := i + j

		// Base case: all characters matched
		if k == len(three) {
			return true
		}

		state := [2]int{i, j}
		if visited[state] {
			return memo[state]
		}

		visited[state] = true
		result := false

		// Try taking from one
		if i < len(one) && one[i] == three[k] {
			result = canInterweave(i+1, j)
		}

		// Try taking from two
		if !result && j < len(two) && two[j] == three[k] {
			result = canInterweave(i, j+1)
		}

		memo[state] = result
		return result
	}

	return canInterweave(0, 0)
}

// InterweavingStringsSpaceOptimized uses O(min(n, m)) space.
func InterweavingStringsSpaceOptimized(one, two, three string) bool {
	if len(one)+len(two) != len(three) {
		return false
	}

	// Ensure one is the shorter string for space optimization
	if len(one) > len(two) {
		one, two = two, one
	}

	// dp[j] = can we form three[0:i+j] using one[0:i] and two[0:j]?
	dp := make([]bool, len(two)+1)
	dp[0] = true

	// Initialize: using only chars from two
	for j := 1; j <= len(two); j++ {
		dp[j] = dp[j-1] && two[j-1] == three[j-1]
	}

	// Fill row by row
	for i := 1; i <= len(one); i++ {
		// Update first column (using only chars from one)
		dp[0] = dp[0] && one[i-1] == three[i-1]

		for j := 1; j <= len(two); j++ {
			k := i + j - 1

			fromOne := dp[j] && one[i-1] == three[k]
			fromTwo := dp[j-1] && two[j-1] == three[k]

			dp[j] = fromOne || fromTwo
		}
	}

	return dp[len(two)]
}

func main() {
	// Test case 1
	one1, two1, three1 := "aabcc", "dbbca", "aadbbcbcac"
	fmt.Printf("One: '%s', Two: '%s', Three: '%s'\n", one1, two1, three1)
	fmt.Printf("DP:        %v\n", InterweavingStrings(one1, two1, three1))
	fmt.Printf("Recursive: %v\n", InterweavingStringsRecursive(one1, two1, three1))
	fmt.Printf("Optimized: %v\n", InterweavingStringsSpaceOptimized(one1, two1, three1))

	// Test case 2
	one2, two2, three2 := "aab", "aac", "aaabac"
	fmt.Printf("\nOne: '%s', Two: '%s', Three: '%s'\n", one2, two2, three2)
	fmt.Printf("Result: %v\n", InterweavingStrings(one2, two2, three2))

	// Test case 3
	one3, two3, three3 := "abc", "def", "adbecf"
	fmt.Printf("\nOne: '%s', Two: '%s', Three: '%s'\n", one3, two3, three3)
	fmt.Printf("Result: %v\n", InterweavingStrings(one3, two3, three3))

	// Test case 4: Length mismatch
	one4, two4, three4 := "abc", "def", "abcdefg"
	fmt.Printf("\nOne: '%s', Two: '%s', Three: '%s'\n", one4, two4, three4)
	fmt.Printf("Result: %v\n", InterweavingStrings(one4, two4, three4))

	// Test case 5: Empty strings
	one5, two5, three5 := "", "abc", "abc"
	fmt.Printf("\nOne: '%s', Two: '%s', Three: '%s'\n", one5, two5, three5)
	fmt.Printf("Result: %v\n", InterweavingStrings(one5, two5, three5))
}
