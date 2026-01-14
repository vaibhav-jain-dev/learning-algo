/*
Longest Palindromic Substring

Given a string s, return the longest palindromic substring in s.

Multiple approaches implemented:
1. Expand Around Center - O(n^2) time, O(1) space
2. Dynamic Programming - O(n^2) time, O(n^2) space
3. Manacher's Algorithm - O(n) time, O(n) space
*/

package main

import (
	"fmt"
	"strings"
)

// longestPalindromeExpand finds longest palindromic substring using expand around center.
// Time Complexity: O(n^2), Space Complexity: O(1)
func longestPalindromeExpand(s string) string {
	if len(s) < 1 {
		return ""
	}

	start := 0
	maxLength := 1

	expandAroundCenter := func(left, right int) int {
		for left >= 0 && right < len(s) && s[left] == s[right] {
			left--
			right++
		}
		return right - left - 1
	}

	for i := 0; i < len(s); i++ {
		// Odd length palindromes
		len1 := expandAroundCenter(i, i)
		// Even length palindromes
		len2 := expandAroundCenter(i, i+1)

		length := len1
		if len2 > len1 {
			length = len2
		}

		if length > maxLength {
			maxLength = length
			start = i - (length-1)/2
		}
	}

	return s[start : start+maxLength]
}

// longestPalindromeDP finds longest palindromic substring using dynamic programming.
// Time Complexity: O(n^2), Space Complexity: O(n^2)
func longestPalindromeDP(s string) string {
	n := len(s)
	if n < 2 {
		return s
	}

	// dp[i][j] represents whether s[i:j+1] is a palindrome
	dp := make([][]bool, n)
	for i := range dp {
		dp[i] = make([]bool, n)
	}

	start := 0
	maxLength := 1

	// All single characters are palindromes
	for i := 0; i < n; i++ {
		dp[i][i] = true
	}

	// Check for length 2 palindromes
	for i := 0; i < n-1; i++ {
		if s[i] == s[i+1] {
			dp[i][i+1] = true
			start = i
			maxLength = 2
		}
	}

	// Check for lengths > 2
	for length := 3; length <= n; length++ {
		for i := 0; i <= n-length; i++ {
			j := i + length - 1

			if s[i] == s[j] && dp[i+1][j-1] {
				dp[i][j] = true
				if length > maxLength {
					start = i
					maxLength = length
				}
			}
		}
	}

	return s[start : start+maxLength]
}

// longestPalindromeManacher finds longest palindromic substring using Manacher's algorithm.
// Time Complexity: O(n), Space Complexity: O(n)
func longestPalindromeManacher(s string) string {
	if len(s) == 0 {
		return ""
	}

	// Transform string: "abc" -> "^#a#b#c#$"
	var sb strings.Builder
	sb.WriteString("^#")
	for _, c := range s {
		sb.WriteRune(c)
		sb.WriteString("#")
	}
	sb.WriteString("$")
	t := sb.String()
	n := len(t)

	// p[i] = radius of palindrome centered at i
	p := make([]int, n)

	center := 0 // Center of rightmost palindrome
	right := 0  // Right edge of rightmost palindrome

	for i := 1; i < n-1; i++ {
		// Mirror position
		mirror := 2*center - i

		if i < right {
			p[i] = min(right-i, p[mirror])
		}

		// Try to expand palindrome centered at i
		for t[i+p[i]+1] == t[i-p[i]-1] {
			p[i]++
		}

		// Update center and right edge
		if i+p[i] > right {
			center = i
			right = i + p[i]
		}
	}

	// Find the maximum element in p
	maxLen := 0
	centerIndex := 0
	for i, v := range p {
		if v > maxLen {
			maxLen = v
			centerIndex = i
		}
	}

	// Extract the palindrome from original string
	start := (centerIndex - maxLen) / 2
	return s[start : start+maxLen]
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

// isPalindrome checks if a string is a palindrome
func isPalindrome(s string) bool {
	for i := 0; i < len(s)/2; i++ {
		if s[i] != s[len(s)-1-i] {
			return false
		}
	}
	return true
}

// contains checks if a string is in a slice
func contains(slice []string, str string) bool {
	for _, s := range slice {
		if s == str {
			return true
		}
	}
	return false
}

func runTests() {
	fmt.Println("============================================================")
	fmt.Println("Longest Palindromic Substring - Test Cases")
	fmt.Println("============================================================")

	type testCase struct {
		input    string
		expected []string
	}

	testCases := []testCase{
		{"babad", []string{"bab", "aba"}},
		{"cbbd", []string{"bb"}},
		{"a", []string{"a"}},
		{"racecar", []string{"racecar"}},
		{"", []string{""}},
		{"ac", []string{"a", "c"}},
		{"abcba", []string{"abcba"}},
		{"abaaba", []string{"abaaba"}},
		{"forgeeksskeegfor", []string{"geeksskeeg"}},
		{"abacdfgdcaba", []string{"aba"}},
	}

	type method struct {
		name string
		fn   func(string) string
	}

	methods := []method{
		{"Expand Around Center", longestPalindromeExpand},
		{"Dynamic Programming", longestPalindromeDP},
		{"Manacher's Algorithm", longestPalindromeManacher},
	}

	allPassed := true

	for _, m := range methods {
		fmt.Printf("\n--- Testing %s ---\n", m.name)

		for i, tc := range testCases {
			result := m.fn(tc.input)
			passed := contains(tc.expected, result)

			fmt.Printf("\nTest %d: s = \"%s\"\n", i+1, tc.input)
			fmt.Printf("Result: \"%s\"\n", result)
			fmt.Printf("Expected (one of): %v\n", tc.expected)

			if passed {
				fmt.Println("PASSED")
			} else {
				// Verify result is a palindrome with correct length
				isPalin := isPalindrome(result)
				expectedLen := len(tc.expected[0])
				hasCorrectLen := len(result) == expectedLen

				if isPalin && hasCorrectLen {
					fmt.Println("PASSED (valid alternative answer)")
				} else {
					fmt.Println("FAILED")
					allPassed = false
				}
			}
		}
	}

	fmt.Println("\n============================================================")
	if allPassed {
		fmt.Println("All tests passed!")
	} else {
		fmt.Println("Some tests failed!")
	}
	fmt.Println("============================================================")
}

func main() {
	runTests()
}
