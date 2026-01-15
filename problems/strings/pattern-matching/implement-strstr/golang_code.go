/*
Implement strStr()

Return the index of the first occurrence of needle in haystack, or -1 if not found.

Multiple approaches implemented:
1. Sliding Window (Naive) - O((n-m+1)*m) time
2. Built-in Function - Uses Go's optimized implementation
3. KMP Algorithm - O(n+m) time
*/

package main

import (
	"fmt"
	"strings"
)

// strStrNaive finds first occurrence of needle in haystack using sliding window.
// Time Complexity: O((n-m+1) * m) worst case
// Space Complexity: O(1)
func strStrNaive(haystack, needle string) int {
	if len(needle) == 0 {
		return 0
	}

	n := len(haystack)
	m := len(needle)

	if m > n {
		return -1
	}

	for i := 0; i <= n-m; i++ {
		if haystack[i:i+m] == needle {
			return i
		}
	}

	return -1
}

// strStrBuiltin finds first occurrence using Go's built-in strings.Index.
func strStrBuiltin(haystack, needle string) int {
	return strings.Index(haystack, needle)
}

// strStrKMP finds first occurrence using KMP algorithm.
// Time Complexity: O(n + m)
// Space Complexity: O(m) for the LPS array
func strStrKMP(haystack, needle string) int {
	if len(needle) == 0 {
		return 0
	}

	n := len(haystack)
	m := len(needle)

	if m > n {
		return -1
	}

	// Build LPS array
	lps := computeLPS(needle)

	i := 0 // Index for haystack
	j := 0 // Index for needle

	for i < n {
		if haystack[i] == needle[j] {
			i++
			j++

			if j == m {
				return i - j // Found! Return starting index
			}
		} else if j > 0 {
			// Mismatch after j matches
			j = lps[j-1]
		} else {
			// No match, move to next character
			i++
		}
	}

	return -1
}

// computeLPS computes Longest Proper Prefix Suffix array for KMP.
func computeLPS(pattern string) []int {
	m := len(pattern)
	lps := make([]int, m)
	length := 0
	i := 1

	for i < m {
		if pattern[i] == pattern[length] {
			length++
			lps[i] = length
			i++
		} else if length > 0 {
			length = lps[length-1]
		} else {
			lps[i] = 0
			i++
		}
	}

	return lps
}

// strStrTwoPointers finds first occurrence using explicit two-pointer approach.
// Time Complexity: O((n-m+1) * m) worst case
// Space Complexity: O(1)
func strStrTwoPointers(haystack, needle string) int {
	if len(needle) == 0 {
		return 0
	}

	n := len(haystack)
	m := len(needle)

	if m > n {
		return -1
	}

	for i := 0; i <= n-m; i++ {
		j := 0
		for j < m && haystack[i+j] == needle[j] {
			j++
		}

		if j == m {
			return i
		}
	}

	return -1
}

func runTests() {
	fmt.Println("============================================================")
	fmt.Println("Implement strStr() - Test Cases")
	fmt.Println("============================================================")

	type testCase struct {
		haystack string
		needle   string
		expected int
	}

	testCases := []testCase{
		{"sadbutsad", "sad", 0},
		{"leetcode", "leeto", -1},
		{"hello", "ll", 2},
		{"aaaaa", "bba", -1},
		{"", "", 0},
		{"", "a", -1},
		{"a", "", 0},
		{"mississippi", "issip", 4},
		{"mississippi", "issipi", -1},
		{"aaa", "aaaa", -1},
		{"abc", "c", 2},
		{"abc", "abc", 0},
		{"abcdef", "def", 3},
		{"AABAACAADAABAAABAA", "AABA", 0},
	}

	type method struct {
		name string
		fn   func(string, string) int
	}

	methods := []method{
		{"Naive Sliding Window", strStrNaive},
		{"Built-in Function", strStrBuiltin},
		{"KMP Algorithm", strStrKMP},
		{"Two Pointers", strStrTwoPointers},
	}

	allPassed := true

	for _, m := range methods {
		fmt.Printf("\n--- Testing %s ---\n", m.name)

		for i, tc := range testCases {
			result := m.fn(tc.haystack, tc.needle)
			passed := result == tc.expected

			fmt.Printf("\nTest %d: haystack=\"%s\", needle=\"%s\"\n", i+1, tc.haystack, tc.needle)
			fmt.Printf("Result: %d\n", result)
			fmt.Printf("Expected: %d\n", tc.expected)

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
