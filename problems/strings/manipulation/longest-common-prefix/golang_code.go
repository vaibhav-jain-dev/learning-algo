/*
Longest Common Prefix

Find the longest common prefix string amongst an array of strings.

Multiple approaches implemented:
1. Horizontal Scanning - O(S) time
2. Vertical Scanning - O(S) time
3. Binary Search - O(S * log(m)) time
4. Divide and Conquer - O(S) time
*/

package main

import (
	"fmt"
	"sort"
	"strings"
)

// longestCommonPrefixHorizontal finds LCP using horizontal scanning.
// Time Complexity: O(S) where S is sum of all characters
// Space Complexity: O(1)
func longestCommonPrefixHorizontal(strs []string) string {
	if len(strs) == 0 {
		return ""
	}

	prefix := strs[0]

	for i := 1; i < len(strs); i++ {
		// Reduce prefix until it matches the current string
		for !strings.HasPrefix(strs[i], prefix) {
			if len(prefix) == 0 {
				return ""
			}
			prefix = prefix[:len(prefix)-1]
		}
	}

	return prefix
}

// longestCommonPrefixVertical finds LCP using vertical scanning.
// Time Complexity: O(S) where S is sum of all characters
// Space Complexity: O(1)
func longestCommonPrefixVertical(strs []string) string {
	if len(strs) == 0 {
		return ""
	}

	// Use first string as reference
	for i := 0; i < len(strs[0]); i++ {
		char := strs[0][i]

		// Check this character against all other strings
		for j := 1; j < len(strs); j++ {
			// If we've reached end of a string or found mismatch
			if i >= len(strs[j]) || strs[j][i] != char {
				return strs[0][:i]
			}
		}
	}

	return strs[0]
}

// longestCommonPrefixBinarySearch finds LCP using binary search on length.
// Time Complexity: O(S * log(m)) where m is min string length
// Space Complexity: O(1)
func longestCommonPrefixBinarySearch(strs []string) string {
	if len(strs) == 0 {
		return ""
	}

	isCommonPrefix := func(length int) bool {
		prefix := strs[0][:length]
		for _, s := range strs {
			if !strings.HasPrefix(s, prefix) {
				return false
			}
		}
		return true
	}

	// Find minimum length
	minLen := len(strs[0])
	for _, s := range strs {
		if len(s) < minLen {
			minLen = len(s)
		}
	}

	// Binary search for the length of LCP
	low, high := 0, minLen

	for low < high {
		mid := (low + high + 1) / 2 // Bias towards higher

		if isCommonPrefix(mid) {
			low = mid
		} else {
			high = mid - 1
		}
	}

	return strs[0][:low]
}

// longestCommonPrefixDivideConquer finds LCP using divide and conquer.
// Time Complexity: O(S) where S is sum of all characters
// Space Complexity: O(m * log(n)) for recursion stack
func longestCommonPrefixDivideConquer(strs []string) string {
	if len(strs) == 0 {
		return ""
	}

	var lcpDivide func(left, right int) string
	lcpDivide = func(left, right int) string {
		if left == right {
			return strs[left]
		}

		mid := (left + right) / 2
		lcpLeft := lcpDivide(left, mid)
		lcpRight := lcpDivide(mid+1, right)

		return commonPrefix(lcpLeft, lcpRight)
	}

	return lcpDivide(0, len(strs)-1)
}

// commonPrefix finds common prefix of two strings.
func commonPrefix(str1, str2 string) string {
	minLen := len(str1)
	if len(str2) < minLen {
		minLen = len(str2)
	}

	for i := 0; i < minLen; i++ {
		if str1[i] != str2[i] {
			return str1[:i]
		}
	}
	return str1[:minLen]
}

// longestCommonPrefixSort finds LCP by sorting and comparing first and last.
// Time Complexity: O(n * m * log(n)) for sorting
// Space Complexity: O(n) for sorted copy
func longestCommonPrefixSort(strs []string) string {
	if len(strs) == 0 {
		return ""
	}

	// Make a sorted copy
	sorted := make([]string, len(strs))
	copy(sorted, strs)
	sort.Strings(sorted)

	first := sorted[0]
	last := sorted[len(sorted)-1]

	minLen := len(first)
	if len(last) < minLen {
		minLen = len(last)
	}

	var prefix strings.Builder
	for i := 0; i < minLen; i++ {
		if first[i] == last[i] {
			prefix.WriteByte(first[i])
		} else {
			break
		}
	}

	return prefix.String()
}

// longestCommonPrefixIterative finds LCP iteratively with explicit comparison.
// Time Complexity: O(S)
// Space Complexity: O(1)
func longestCommonPrefixIterative(strs []string) string {
	if len(strs) == 0 {
		return ""
	}

	// Find minimum length string
	minLen := len(strs[0])
	for _, s := range strs {
		if len(s) < minLen {
			minLen = len(s)
		}
	}

	// Check each position
	var prefix strings.Builder
	for i := 0; i < minLen; i++ {
		char := strs[0][i]
		allMatch := true

		for j := 1; j < len(strs); j++ {
			if strs[j][i] != char {
				allMatch = false
				break
			}
		}

		if allMatch {
			prefix.WriteByte(char)
		} else {
			break
		}
	}

	return prefix.String()
}

func runTests() {
	fmt.Println("============================================================")
	fmt.Println("Longest Common Prefix - Test Cases")
	fmt.Println("============================================================")

	type testCase struct {
		strs     []string
		expected string
	}

	testCases := []testCase{
		{[]string{"flower", "flow", "flight"}, "fl"},
		{[]string{"dog", "racecar", "car"}, ""},
		{[]string{"interspecies", "interstellar", "interstate"}, "inters"},
		{[]string{"a"}, "a"},
		{[]string{""}, ""},
		{[]string{"", "b"}, ""},
		{[]string{"ab", "a"}, "a"},
		{[]string{"abc", "abc", "abc"}, "abc"},
		{[]string{"c", "c"}, "c"},
		{[]string{"aaa", "aa", "aaa"}, "aa"},
		{[]string{"prefix", "prefixes", "prefixed"}, "prefix"},
	}

	type method struct {
		name string
		fn   func([]string) string
	}

	methods := []method{
		{"Horizontal Scanning", longestCommonPrefixHorizontal},
		{"Vertical Scanning", longestCommonPrefixVertical},
		{"Binary Search", longestCommonPrefixBinarySearch},
		{"Divide and Conquer", longestCommonPrefixDivideConquer},
		{"Sort Method", longestCommonPrefixSort},
		{"Iterative", longestCommonPrefixIterative},
	}

	allPassed := true

	for _, m := range methods {
		fmt.Printf("\n--- Testing %s ---\n", m.name)

		for i, tc := range testCases {
			result := m.fn(tc.strs)
			passed := result == tc.expected

			fmt.Printf("\nTest %d: %v\n", i+1, tc.strs)
			fmt.Printf("Result: \"%s\"\n", result)
			fmt.Printf("Expected: \"%s\"\n", tc.expected)

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
