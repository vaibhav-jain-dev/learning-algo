/*
Palindrome Partitioning Min Cuts - Go Solution

Find the minimum number of cuts needed to partition a string such that
each partition is a palindrome.

Time Complexity: O(n^2)
Space Complexity: O(n^2)
*/

package main

import "fmt"

// PalindromePartitioningMinCuts finds minimum cuts using bottom-up DP
func PalindromePartitioningMinCuts(str string) int {
	if len(str) <= 1 {
		return 0
	}

	n := len(str)

	// Step 1: Build palindrome table
	// isPalindrome[i][j] = true if str[i:j+1] is a palindrome
	isPalindrome := make([][]bool, n)
	for i := range isPalindrome {
		isPalindrome[i] = make([]bool, n)
	}

	// All single characters are palindromes
	for i := 0; i < n; i++ {
		isPalindrome[i][i] = true
	}

	// Check for palindromes of length 2+
	for length := 2; length <= n; length++ {
		for i := 0; i <= n-length; i++ {
			j := i + length - 1

			if length == 2 {
				isPalindrome[i][j] = (str[i] == str[j])
			} else {
				isPalindrome[i][j] = (str[i] == str[j] && isPalindrome[i+1][j-1])
			}
		}
	}

	// Step 2: Build cuts table
	// cuts[i] = minimum cuts for str[0:i+1]
	cuts := make([]int, n)

	for i := 0; i < n; i++ {
		if isPalindrome[0][i] {
			// Entire prefix is palindrome, no cuts needed
			cuts[i] = 0
		} else {
			// Start with worst case: cut before every character
			cuts[i] = i

			// Try all positions j where str[j:i+1] is palindrome
			for j := 1; j <= i; j++ {
				if isPalindrome[j][i] {
					if cuts[j-1]+1 < cuts[i] {
						cuts[i] = cuts[j-1] + 1
					}
				}
			}
		}
	}

	return cuts[n-1]
}

// PalindromePartitioningOptimized builds palindrome table on the fly
func PalindromePartitioningOptimized(str string) int {
	if len(str) <= 1 {
		return 0
	}

	n := len(str)

	// cuts[i] = min cuts for str[0:i]
	// cuts[0] = -1 is a sentinel for empty prefix
	cuts := make([]int, n+1)
	for i := range cuts {
		cuts[i] = i - 1
	}

	// Expand around each center
	for center := 0; center < n; center++ {
		// Odd length palindromes
		left, right := center, center
		for left >= 0 && right < n && str[left] == str[right] {
			if cuts[left]+1 < cuts[right+1] {
				cuts[right+1] = cuts[left] + 1
			}
			left--
			right++
		}

		// Even length palindromes
		left, right = center, center+1
		for left >= 0 && right < n && str[left] == str[right] {
			if cuts[left]+1 < cuts[right+1] {
				cuts[right+1] = cuts[left] + 1
			}
			left--
			right++
		}
	}

	return cuts[n]
}

// PalindromePartitioningRecursive uses top-down approach with memoization
func PalindromePartitioningRecursive(str string) int {
	if len(str) <= 1 {
		return 0
	}

	n := len(str)

	// Precompute palindrome table
	isPalindrome := make([][]bool, n)
	for i := range isPalindrome {
		isPalindrome[i] = make([]bool, n)
		isPalindrome[i][i] = true
	}

	for length := 2; length <= n; length++ {
		for i := 0; i <= n-length; i++ {
			j := i + length - 1
			if length == 2 {
				isPalindrome[i][j] = (str[i] == str[j])
			} else {
				isPalindrome[i][j] = (str[i] == str[j] && isPalindrome[i+1][j-1])
			}
		}
	}

	memo := make(map[int]int)

	var dp func(start int) int
	dp = func(start int) int {
		if start >= n {
			return -1 // No cut needed for empty string
		}

		if isPalindrome[start][n-1] {
			return 0 // Remaining string is palindrome
		}

		if val, exists := memo[start]; exists {
			return val
		}

		result := n - start - 1 // Worst case

		for end := start; end < n; end++ {
			if isPalindrome[start][end] {
				cuts := 1 + dp(end+1)
				if cuts < result {
					result = cuts
				}
			}
		}

		memo[start] = result
		return result
	}

	return dp(0)
}

// PalindromePartitioningWithResult returns both min cuts and the partition
func PalindromePartitioningWithResult(str string) (int, []string) {
	if len(str) == 0 {
		return 0, []string{}
	}

	if len(str) == 1 {
		return 0, []string{str}
	}

	n := len(str)

	// Build palindrome table
	isPalindrome := make([][]bool, n)
	for i := range isPalindrome {
		isPalindrome[i] = make([]bool, n)
		isPalindrome[i][i] = true
	}

	for length := 2; length <= n; length++ {
		for i := 0; i <= n-length; i++ {
			j := i + length - 1
			if length == 2 {
				isPalindrome[i][j] = (str[i] == str[j])
			} else {
				isPalindrome[i][j] = (str[i] == str[j] && isPalindrome[i+1][j-1])
			}
		}
	}

	// Build cuts table with backtracking info
	cuts := make([]int, n)
	cutPoints := make([]int, n) // Where the last cut was made

	for i := 0; i < n; i++ {
		if isPalindrome[0][i] {
			cuts[i] = 0
			cutPoints[i] = -1
		} else {
			cuts[i] = i
			cutPoints[i] = i - 1

			for j := 1; j <= i; j++ {
				if isPalindrome[j][i] && cuts[j-1]+1 < cuts[i] {
					cuts[i] = cuts[j-1] + 1
					cutPoints[i] = j - 1
				}
			}
		}
	}

	// Reconstruct partition
	var partitions []string
	i := n - 1
	for i >= 0 {
		if cutPoints[i] == -1 {
			partitions = append(partitions, str[0:i+1])
			break
		} else {
			partitions = append(partitions, str[cutPoints[i]+1:i+1])
			i = cutPoints[i]
		}
	}

	// Reverse partitions
	for left, right := 0, len(partitions)-1; left < right; left, right = left+1, right-1 {
		partitions[left], partitions[right] = partitions[right], partitions[left]
	}

	return cuts[n-1], partitions
}

// AllPalindromePartitions returns all possible palindrome partitions
func AllPalindromePartitions(str string) [][]string {
	if len(str) == 0 {
		return [][]string{{}}
	}

	n := len(str)
	var result [][]string

	isPalin := func(s string) bool {
		for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
			if s[i] != s[j] {
				return false
			}
		}
		return true
	}

	var backtrack func(start int, current []string)
	backtrack = func(start int, current []string) {
		if start >= n {
			partition := make([]string, len(current))
			copy(partition, current)
			result = append(result, partition)
			return
		}

		for end := start + 1; end <= n; end++ {
			substring := str[start:end]
			if isPalin(substring) {
				backtrack(end, append(current, substring))
			}
		}
	}

	backtrack(0, []string{})
	return result
}

func main() {
	// Test 1: Standard case
	s1 := "noonabbad"
	result1 := PalindromePartitioningMinCuts(s1)
	fmt.Printf("Test 1: '%s'\n", s1)
	fmt.Printf("  Min cuts: %d\n", result1)
	// Expected: 2 ("noon" | "abba" | "d")

	// Test 2: Simple case
	s2 := "aab"
	result2 := PalindromePartitioningMinCuts(s2)
	fmt.Printf("\nTest 2: '%s'\n", s2)
	fmt.Printf("  Min cuts: %d\n", result2)
	// Expected: 1 ("aa" | "b")

	// Test 3: Already palindrome
	s3 := "aba"
	result3 := PalindromePartitioningMinCuts(s3)
	fmt.Printf("\nTest 3: '%s'\n", s3)
	fmt.Printf("  Min cuts: %d\n", result3)
	// Expected: 0

	// Test 4: All different characters
	s4 := "abcde"
	result4 := PalindromePartitioningMinCuts(s4)
	fmt.Printf("\nTest 4: '%s'\n", s4)
	fmt.Printf("  Min cuts: %d\n", result4)
	// Expected: 4

	// Test 5: Single character
	s5 := "a"
	result5 := PalindromePartitioningMinCuts(s5)
	fmt.Printf("\nTest 5: '%s'\n", s5)
	fmt.Printf("  Min cuts: %d\n", result5)
	// Expected: 0

	// Test 6: Compare methods
	s6 := "noonabbad"
	fmt.Printf("\nTest 6 - Method comparison for '%s':\n", s6)
	fmt.Printf("  Standard: %d\n", PalindromePartitioningMinCuts(s6))
	fmt.Printf("  Optimized: %d\n", PalindromePartitioningOptimized(s6))
	fmt.Printf("  Recursive: %d\n", PalindromePartitioningRecursive(s6))

	// Test 7: Get actual partition
	s7 := "noonabbad"
	cuts, partition := PalindromePartitioningWithResult(s7)
	fmt.Printf("\nTest 7 - With partition for '%s':\n", s7)
	fmt.Printf("  Min cuts: %d\n", cuts)
	fmt.Printf("  Partition: %v\n", partition)

	// Test 8: All partitions
	s8 := "aab"
	allParts := AllPalindromePartitions(s8)
	fmt.Printf("\nTest 8 - All partitions for '%s':\n", s8)
	for _, p := range allParts {
		fmt.Printf("  %v\n", p)
	}

	// Test 9: Longer palindrome
	s9 := "abacaba"
	result9 := PalindromePartitioningMinCuts(s9)
	cuts9, partition9 := PalindromePartitioningWithResult(s9)
	fmt.Printf("\nTest 9: '%s'\n", s9)
	fmt.Printf("  Min cuts: %d\n", result9)
	fmt.Printf("  Partition: %v\n", partition9, cuts9)
	// Expected: 0 (entire string is palindrome)

	fmt.Println("\nAll tests completed!")
}
