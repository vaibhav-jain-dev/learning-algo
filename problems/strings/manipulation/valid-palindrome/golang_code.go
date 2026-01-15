/*
Valid Palindrome

Check if a string is a valid palindrome considering only alphanumeric characters
and ignoring case.

Multiple approaches implemented:
1. Two Pointers - O(n) time, O(1) space
2. Filter and Compare - O(n) time, O(n) space
*/

package main

import (
	"fmt"
	"strings"
	"unicode"
)

// isPalindromeTwoPointers checks palindrome using two pointers.
// Time Complexity: O(n), Space Complexity: O(1)
func isPalindromeTwoPointers(s string) bool {
	left := 0
	right := len(s) - 1

	for left < right {
		// Skip non-alphanumeric characters from left
		for left < right && !isAlphanumeric(rune(s[left])) {
			left++
		}

		// Skip non-alphanumeric characters from right
		for left < right && !isAlphanumeric(rune(s[right])) {
			right--
		}

		// Compare characters (case-insensitive)
		if toLower(rune(s[left])) != toLower(rune(s[right])) {
			return false
		}

		left++
		right--
	}

	return true
}

// isPalindromeFilter checks palindrome by filtering and comparing.
// Time Complexity: O(n), Space Complexity: O(n)
func isPalindromeFilter(s string) bool {
	// Filter to keep only alphanumeric and convert to lowercase
	var filtered strings.Builder
	for _, char := range s {
		if unicode.IsLetter(char) || unicode.IsDigit(char) {
			filtered.WriteRune(unicode.ToLower(char))
		}
	}

	str := filtered.String()
	n := len(str)

	// Compare with reverse
	for i := 0; i < n/2; i++ {
		if str[i] != str[n-1-i] {
			return false
		}
	}

	return true
}

// isPalindromeRunes checks palindrome using rune slice for Unicode support.
// Time Complexity: O(n), Space Complexity: O(n)
func isPalindromeRunes(s string) bool {
	// Convert to runes and filter
	var runes []rune
	for _, r := range s {
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			runes = append(runes, unicode.ToLower(r))
		}
	}

	// Compare using two pointers on rune slice
	left, right := 0, len(runes)-1
	for left < right {
		if runes[left] != runes[right] {
			return false
		}
		left++
		right--
	}

	return true
}

// isPalindromeReverse checks by reversing filtered string.
// Time Complexity: O(n), Space Complexity: O(n)
func isPalindromeReverse(s string) bool {
	var filtered strings.Builder
	for _, char := range s {
		if unicode.IsLetter(char) || unicode.IsDigit(char) {
			filtered.WriteRune(unicode.ToLower(char))
		}
	}

	str := filtered.String()

	// Reverse the string
	runes := []rune(str)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}

	return str == string(runes)
}

// Helper functions
func isAlphanumeric(r rune) bool {
	return (r >= 'a' && r <= 'z') || (r >= 'A' && r <= 'Z') || (r >= '0' && r <= '9')
}

func toLower(r rune) rune {
	if r >= 'A' && r <= 'Z' {
		return r + 32
	}
	return r
}

func runTests() {
	fmt.Println("============================================================")
	fmt.Println("Valid Palindrome - Test Cases")
	fmt.Println("============================================================")

	type testCase struct {
		input    string
		expected bool
	}

	testCases := []testCase{
		{"A man, a plan, a canal: Panama", true},
		{"race a car", false},
		{" ", true},
		{"Was it a car or a cat I saw?", true},
		{"", true},
		{"a", true},
		{"ab", false},
		{"aa", true},
		{"0P", false},
		{"ab_a", true},
		{"Aa", true},
		{".,", true},
		{"Race car", false},
		{"A Santa at NASA", true},
		{"12321", true},
		{"123456", false},
		{"A1B2B1A", true},
	}

	type method struct {
		name string
		fn   func(string) bool
	}

	methods := []method{
		{"Two Pointers", isPalindromeTwoPointers},
		{"Filter and Compare", isPalindromeFilter},
		{"Runes (Unicode)", isPalindromeRunes},
		{"Reverse Method", isPalindromeReverse},
	}

	allPassed := true

	for _, m := range methods {
		fmt.Printf("\n--- Testing %s ---\n", m.name)

		for i, tc := range testCases {
			result := m.fn(tc.input)
			passed := result == tc.expected

			displayStr := tc.input
			if len(displayStr) > 30 {
				displayStr = displayStr[:27] + "..."
			}

			fmt.Printf("\nTest %d: \"%s\"\n", i+1, displayStr)
			fmt.Printf("Result: %v\n", result)
			fmt.Printf("Expected: %v\n", tc.expected)

			if passed {
				fmt.Println("PASSED")
			} else {
				fmt.Println("FAILED")
				allPassed = false
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
