// Valid Anagram
//
// This solution uses a hash map to count character frequencies.
package main

import (
	"fmt"
	"sort"
)

// isAnagram checks if t is an anagram of s.
// Time Complexity: O(n)
// Space Complexity: O(1) - at most 26 characters
func isAnagram(s string, t string) bool {
	if len(s) != len(t) {
		return false
	}

	// Count characters in s
	charCount := make(map[rune]int)
	for _, char := range s {
		charCount[char]++
	}

	// Subtract counts for characters in t
	for _, char := range t {
		if _, exists := charCount[char]; !exists {
			return false
		}
		charCount[char]--
		if charCount[char] < 0 {
			return false
		}
	}

	return true
}

// isAnagramArray uses a fixed-size array for better performance
func isAnagramArray(s string, t string) bool {
	if len(s) != len(t) {
		return false
	}

	// Use array of size 26 for a-z
	var count [26]int

	for i := 0; i < len(s); i++ {
		count[s[i]-'a']++
		count[t[i]-'a']--
	}

	for _, c := range count {
		if c != 0 {
			return false
		}
	}

	return true
}

// isAnagramSorting uses sorting approach - O(n log n) time
func isAnagramSorting(s string, t string) bool {
	if len(s) != len(t) {
		return false
	}

	// Convert to rune slices for sorting
	sRunes := []rune(s)
	tRunes := []rune(t)

	sort.Slice(sRunes, func(i, j int) bool { return sRunes[i] < sRunes[j] })
	sort.Slice(tRunes, func(i, j int) bool { return tRunes[i] < tRunes[j] })

	return string(sRunes) == string(tRunes)
}

func runTests() {
	testCases := []struct {
		s        string
		t        string
		expected bool
	}{
		{"anagram", "nagaram", true},
		{"rat", "car", false},
		{"listen", "silent", true},
		{"a", "a", true},
		{"a", "b", false},
		{"", "", true},
		{"ab", "a", false},              // Different lengths
		{"aabb", "abab", true},
		{"aabb", "abba", true},
		{"abc", "cba", true},
		{"abc", "abd", false},
		{"aacc", "ccac", false},         // Same length, different frequencies
	}

	fmt.Println("============================================================")
	fmt.Println("VALID ANAGRAM - Test Results")
	fmt.Println("============================================================")

	allPassed := true

	for i, tc := range testCases {
		result := isAnagram(tc.s, tc.t)
		passed := result == tc.expected
		status := "PASS"
		if !passed {
			status = "FAIL"
			allPassed = false
		}

		displayS := tc.s
		displayT := tc.t
		if len(tc.s) > 15 {
			displayS = tc.s[:15] + "..."
		}
		if len(tc.t) > 15 {
			displayT = tc.t[:15] + "..."
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  s = \"%s\"\n", displayS)
		fmt.Printf("  t = \"%s\"\n", displayT)
		fmt.Printf("  Output: %v\n", result)
		fmt.Printf("  Expected: %v\n", tc.expected)
	}

	fmt.Println("\n============================================================")
	if allPassed {
		fmt.Println("Overall: ALL TESTS PASSED")
	} else {
		fmt.Println("Overall: SOME TESTS FAILED")
	}
	fmt.Println("============================================================")
}

func demonstrateApproach() {
	examples := []struct {
		s string
		t string
	}{
		{"anagram", "nagaram"},
		{"rat", "car"},
	}

	fmt.Println("\n============================================================")
	fmt.Println("STEP-BY-STEP DEMONSTRATION")
	fmt.Println("============================================================")

	for _, ex := range examples {
		s, t := ex.s, ex.t
		fmt.Printf("\nChecking: s = \"%s\", t = \"%s\"\n", s, t)
		fmt.Println("----------------------------------------")

		if len(s) != len(t) {
			fmt.Printf("Length mismatch: %d != %d\n", len(s), len(t))
			fmt.Println("Result: false")
			continue
		}

		// Count characters in s
		fmt.Println("\nStep 1: Count characters in s")
		charCount := make(map[rune]int)
		for _, char := range s {
			charCount[char]++
		}
		fmt.Printf("  Character counts: %v\n", charCount)

		// Subtract counts for t
		fmt.Println("\nStep 2: Subtract counts for characters in t")
		isValid := true
		for i, char := range t {
			fmt.Printf("  Processing t[%d] = '%c'", i, char)
			if _, exists := charCount[char]; !exists {
				fmt.Println(" -> NOT FOUND in s!")
				isValid = false
				break
			}
			charCount[char]--
			fmt.Printf(" -> count['%c'] = %d\n", char, charCount[char])
			if charCount[char] < 0 {
				fmt.Printf("  -> NEGATIVE count! Too many '%c' in t\n", char)
				isValid = false
				break
			}
		}

		if isValid {
			fmt.Printf("\nFinal counts: %v\n", charCount)
			allZero := true
			for _, v := range charCount {
				if v != 0 {
					allZero = false
					break
				}
			}
			fmt.Printf("All counts are zero: %v\n", allZero)
		}

		fmt.Printf("\nResult: %v\n", isValid)
	}
}

func main() {
	runTests()
	demonstrateApproach()
}
