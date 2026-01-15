/*
Repeated Substring Pattern

Check if a string can be constructed by repeating a substring.

Multiple approaches implemented:
1. Check All Divisors - O(n*sqrt(n)) average
2. String Concatenation Trick - O(n)
3. KMP-Based (LPS Array) - O(n)
*/

package main

import (
	"fmt"
	"strings"
)

// repeatedSubstringDivisors checks by trying all valid divisor lengths.
// Time Complexity: O(n * sqrt(n)) average, O(n^2) worst case
// Space Complexity: O(n)
func repeatedSubstringDivisors(s string) bool {
	n := len(s)
	if n <= 1 {
		return false
	}

	// Try all possible substring lengths from 1 to n/2
	for length := 1; length <= n/2; length++ {
		// Length must divide n evenly
		if n%length == 0 {
			pattern := s[:length]
			repetitions := n / length

			// Build repeated string
			repeated := strings.Repeat(pattern, repetitions)
			if repeated == s {
				return true
			}
		}
	}

	return false
}

// repeatedSubstringConcatenation uses the concatenation trick.
// Key insight: If s is a repeated pattern, s will appear in (s + s)[1:len-1]
// Time Complexity: O(n) with efficient string search
// Space Complexity: O(n)
func repeatedSubstringConcatenation(s string) bool {
	if len(s) <= 1 {
		return false
	}

	// Double the string and remove first and last characters
	doubled := (s + s)[1 : len(s)*2-1]

	// Check if original string exists in the modified doubled string
	return strings.Contains(doubled, s)
}

// repeatedSubstringKMP uses KMP's LPS array.
// Time Complexity: O(n)
// Space Complexity: O(n)
func repeatedSubstringKMP(s string) bool {
	n := len(s)
	if n <= 1 {
		return false
	}

	// Build LPS array
	lps := computeLPS(s)

	// Get the length of the longest proper prefix which is also suffix
	lpsLast := lps[n-1]

	// Pattern length would be n - lpsLast
	patternLength := n - lpsLast

	// String is repeated if:
	// 1. lpsLast > 0 (there's a proper prefix = suffix)
	// 2. n is divisible by patternLength
	return lpsLast > 0 && n%patternLength == 0
}

// computeLPS computes Longest Proper Prefix Suffix array.
func computeLPS(s string) []int {
	n := len(s)
	lps := make([]int, n)
	length := 0
	i := 1

	for i < n {
		if s[i] == s[length] {
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

// repeatedSubstringOptimized checks only divisors up to sqrt(n).
// Time Complexity: O(n * sqrt(n))
// Space Complexity: O(n)
func repeatedSubstringOptimized(s string) bool {
	n := len(s)
	if n <= 1 {
		return false
	}

	// Find all divisors of n (excluding n itself)
	divisors := []int{}
	for i := 1; i*i <= n; i++ {
		if n%i == 0 {
			if i != n {
				divisors = append(divisors, i)
			}
			if i != n/i && n/i != n {
				divisors = append(divisors, n/i)
			}
		}
	}

	// Check each divisor
	for _, length := range divisors {
		pattern := s[:length]
		if strings.Repeat(pattern, n/length) == s {
			return true
		}
	}

	return false
}

func runTests() {
	fmt.Println("============================================================")
	fmt.Println("Repeated Substring Pattern - Test Cases")
	fmt.Println("============================================================")

	type testCase struct {
		s        string
		expected bool
	}

	testCases := []testCase{
		{"abab", true},
		{"aba", false},
		{"abcabcabcabc", true},
		{"aaa", true},
		{"a", false},
		{"ab", false},
		{"abcabc", true},
		{"ababab", true},
		{"abac", false},
		{"aabaaba", false},
		{"abaababaab", true},
		{"", false},
		{"abcdabcd", true},
		{"abcde", false},
	}

	type method struct {
		name string
		fn   func(string) bool
	}

	methods := []method{
		{"Check All Divisors", repeatedSubstringDivisors},
		{"Concatenation Trick", repeatedSubstringConcatenation},
		{"KMP-Based (LPS)", repeatedSubstringKMP},
		{"Optimized Divisors", repeatedSubstringOptimized},
	}

	allPassed := true

	for _, m := range methods {
		fmt.Printf("\n--- Testing %s ---\n", m.name)

		for i, tc := range testCases {
			var result bool
			if tc.s == "" {
				result = false
			} else {
				result = m.fn(tc.s)
			}

			passed := result == tc.expected

			fmt.Printf("\nTest %d: s = \"%s\"\n", i+1, tc.s)
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

	// Demonstrate the concatenation trick
	fmt.Println("\n============================================================")
	fmt.Println("Demonstrating Concatenation Trick:")
	fmt.Println("============================================================")

	demoCases := []string{"abab", "aba", "abcabc"}
	for _, s := range demoCases {
		if len(s) > 1 {
			doubled := (s + s)[1 : len(s)*2-1]
			found := strings.Contains(doubled, s)
			fmt.Printf("\ns = \"%s\"\n", s)
			fmt.Printf("(s + s)[1:len-1] = \"%s\"\n", doubled)
			fmt.Printf("s in doubled = %v\n", found)
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
