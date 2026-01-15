// Longest Substring Without Repeating Characters
//
// Given a string s, find the length of the longest substring without
// repeating characters.
//
// Time Complexity: O(n)
// Space Complexity: O(min(m, n)) where m is the character set size

package main

import (
	"fmt"
)

// lengthOfLongestSubstring finds length of longest substring without repeating characters.
// Uses optimized sliding window with HashMap.
func lengthOfLongestSubstring(s string) int {
	if len(s) == 0 {
		return 0
	}

	// Map character to its last seen index
	charIndex := make(map[byte]int)
	maxLength := 0
	left := 0

	for right := 0; right < len(s); right++ {
		char := s[right]

		// If character was seen and is within current window
		if idx, exists := charIndex[char]; exists && idx >= left {
			// Move left pointer to position after the previous occurrence
			left = idx + 1
		}

		// Update the last seen index of current character
		charIndex[char] = right

		// Update maximum length
		currentLength := right - left + 1
		if currentLength > maxLength {
			maxLength = currentLength
		}
	}

	return maxLength
}

// lengthOfLongestSubstringSet uses HashSet approach.
// When duplicate found, shrink window from left one by one.
func lengthOfLongestSubstringSet(s string) int {
	if len(s) == 0 {
		return 0
	}

	charSet := make(map[byte]bool)
	maxLength := 0
	left := 0

	for right := 0; right < len(s); right++ {
		// Shrink window until no duplicate
		for charSet[s[right]] {
			delete(charSet, s[left])
			left++
		}

		// Add current character to set
		charSet[s[right]] = true

		// Update maximum length
		currentLength := right - left + 1
		if currentLength > maxLength {
			maxLength = currentLength
		}
	}

	return maxLength
}

// findLongestSubstring finds and returns the actual longest substring (not just length).
func findLongestSubstring(s string) string {
	if len(s) == 0 {
		return ""
	}

	charIndex := make(map[byte]int)
	maxLength := 0
	maxStart := 0
	left := 0

	for right := 0; right < len(s); right++ {
		char := s[right]

		if idx, exists := charIndex[char]; exists && idx >= left {
			left = idx + 1
		}

		charIndex[char] = right

		currentLength := right - left + 1
		if currentLength > maxLength {
			maxLength = currentLength
			maxStart = left
		}
	}

	return s[maxStart : maxStart+maxLength]
}

func runTests() bool {
	type testCase struct {
		input    string
		expected int
	}

	testCases := []testCase{
		{"abcabcbb", 3},
		{"bbbbb", 1},
		{"pwwkew", 3},
		{"", 0},
		{" ", 1},
		{"au", 2},
		{"aab", 2},
		{"dvdf", 3},
		{"abcdef", 6},
		{"abba", 2},
		{"tmmzuxt", 5},
	}

	fmt.Println("Testing Longest Substring Without Repeating Characters")
	fmt.Println("============================================================")

	allPassed := true

	for i, tc := range testCases {
		result := lengthOfLongestSubstring(tc.input)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("Test %d: %s\n", i+1, status)
		fmt.Printf("  Input: \"%s\"\n", tc.input)
		fmt.Printf("  Expected: %d, Got: %d\n", tc.expected, result)

		// Also show the actual substring found
		if len(tc.input) > 0 {
			substring := findLongestSubstring(tc.input)
			fmt.Printf("  Longest substring: \"%s\"\n", substring)
		}
		fmt.Println()
	}

	// Verify both approaches give same results
	fmt.Println("Verifying HashSet approach matches HashMap approach...")
	for _, tc := range testCases {
		mapResult := lengthOfLongestSubstring(tc.input)
		setResult := lengthOfLongestSubstringSet(tc.input)
		if mapResult != setResult {
			fmt.Printf("  Mismatch for \"%s\"! Map=%d, Set=%d\n", tc.input, mapResult, setResult)
			allPassed = false
		}
	}
	fmt.Println("  All approaches give matching results!")
	fmt.Println()

	if allPassed {
		fmt.Println("All tests PASSED!")
	} else {
		fmt.Println("Some tests FAILED!")
	}

	return allPassed
}

func main() {
	runTests()
}
