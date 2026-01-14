// Minimum Window Substring
//
// Given two strings s and t, return the minimum window substring of s such that
// every character in t (including duplicates) is included in the window.
//
// Time Complexity: O(|s| + |t|)
// Space Complexity: O(|s| + |t|)

package main

import (
	"fmt"
	"math"
)

// minWindow finds the minimum window substring of s containing all characters of t.
func minWindow(s string, t string) string {
	if len(s) == 0 || len(t) == 0 || len(s) < len(t) {
		return ""
	}

	// Count frequency of each character in t
	tCount := make(map[byte]int)
	for i := 0; i < len(t); i++ {
		tCount[t[i]]++
	}
	required := len(tCount) // Number of unique characters in t

	// Window frequency map
	windowCount := make(map[byte]int)

	// Number of unique chars in current window with required frequency
	formed := 0

	// Result: minimum length, left index, right index
	minLen := math.MaxInt32
	resultLeft := 0
	resultRight := 0

	left := 0

	for right := 0; right < len(s); right++ {
		// Add character from right to window
		char := s[right]
		windowCount[char]++

		// Check if current character's frequency matches required frequency
		if count, exists := tCount[char]; exists && windowCount[char] == count {
			formed++
		}

		// Try to contract the window until it's no longer valid
		for left <= right && formed == required {
			char := s[left]

			// Update result if this window is smaller
			if right-left+1 < minLen {
				minLen = right - left + 1
				resultLeft = left
				resultRight = right
			}

			// Remove leftmost character from window
			windowCount[char]--
			if count, exists := tCount[char]; exists && windowCount[char] < count {
				formed--
			}

			left++
		}
	}

	if minLen == math.MaxInt32 {
		return ""
	}
	return s[resultLeft : resultRight+1]
}

// minWindowSimple is a simpler but slightly less efficient approach.
func minWindowSimple(s string, t string) string {
	if len(s) == 0 || len(t) == 0 || len(s) < len(t) {
		return ""
	}

	tCount := make(map[byte]int)
	for i := 0; i < len(t); i++ {
		tCount[t[i]]++
	}

	windowCount := make(map[byte]int)

	// Check if current window is valid
	isValid := func() bool {
		for char, count := range tCount {
			if windowCount[char] < count {
				return false
			}
		}
		return true
	}

	minLen := math.MaxInt32
	minStart := 0
	left := 0

	for right := 0; right < len(s); right++ {
		windowCount[s[right]]++

		for isValid() {
			if right-left+1 < minLen {
				minLen = right - left + 1
				minStart = left
			}

			windowCount[s[left]]--
			left++
		}
	}

	if minLen == math.MaxInt32 {
		return ""
	}
	return s[minStart : minStart+minLen]
}

func runTests() bool {
	type testCase struct {
		s        string
		t        string
		expected string
	}

	testCases := []testCase{
		{"ADOBECODEBANC", "ABC", "BANC"},
		{"a", "a", "a"},
		{"a", "aa", ""},
		{"cabwefgewcwaefgcf", "cae", "cwae"},
		{"aa", "aa", "aa"},
		{"bba", "ab", "ba"},
		{"abc", "b", "b"},
		{"ab", "b", "b"},
		{"bdab", "ab", "ab"},
		{"aaaaaaaaaaaabbbbbcdd", "abcdd", "abbbbbcdd"},
	}

	fmt.Println("Testing Minimum Window Substring")
	fmt.Println("============================================================")

	allPassed := true

	for i, tc := range testCases {
		result := minWindow(tc.s, tc.t)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("Test %d: %s\n", i+1, status)
		fmt.Printf("  s = \"%s\"\n", tc.s)
		fmt.Printf("  t = \"%s\"\n", tc.t)
		fmt.Printf("  Expected: \"%s\", Got: \"%s\"\n\n", tc.expected, result)
	}

	// Verify simple approach gives same results
	fmt.Println("Verifying simple approach matches optimized approach...")
	for _, tc := range testCases {
		optResult := minWindow(tc.s, tc.t)
		simpleResult := minWindowSimple(tc.s, tc.t)
		if optResult != simpleResult {
			fmt.Printf("  Mismatch! Optimized=\"%s\", Simple=\"%s\"\n", optResult, simpleResult)
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
