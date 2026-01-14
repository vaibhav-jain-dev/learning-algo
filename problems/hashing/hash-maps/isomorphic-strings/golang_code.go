// Isomorphic Strings
//
// This solution uses two hash maps to verify one-to-one character mapping.
package main

import (
	"fmt"
)

// isIsomorphic checks if two strings are isomorphic.
// Time Complexity: O(n)
// Space Complexity: O(1) - limited to character set size
func isIsomorphic(s string, t string) bool {
	if len(s) != len(t) {
		return false
	}

	// Two maps for bidirectional mapping
	sToT := make(map[byte]byte)
	tToS := make(map[byte]byte)

	for i := 0; i < len(s); i++ {
		charS := s[i]
		charT := t[i]

		// Check s -> t mapping
		if mappedT, exists := sToT[charS]; exists {
			if mappedT != charT {
				return false
			}
		} else {
			sToT[charS] = charT
		}

		// Check t -> s mapping
		if mappedS, exists := tToS[charT]; exists {
			if mappedS != charS {
				return false
			}
		} else {
			tToS[charT] = charS
		}
	}

	return true
}

// isIsomorphicTransform uses canonical form transformation
func isIsomorphicTransform(s string, t string) bool {
	transform := func(str string) []int {
		mapping := make(map[byte]int)
		result := make([]int, len(str))
		for i := 0; i < len(str); i++ {
			if _, exists := mapping[str[i]]; !exists {
				mapping[str[i]] = len(mapping)
			}
			result[i] = mapping[str[i]]
		}
		return result
	}

	transS := transform(s)
	transT := transform(t)

	if len(transS) != len(transT) {
		return false
	}

	for i := 0; i < len(transS); i++ {
		if transS[i] != transT[i] {
			return false
		}
	}

	return true
}

func runTests() {
	testCases := []struct {
		s        string
		t        string
		expected bool
	}{
		{"egg", "add", true},               // e->a, g->d
		{"foo", "bar", false},              // o maps to both a and r
		{"paper", "title", true},           // Valid one-to-one mapping
		{"badc", "baba", false},            // b and d both map to b
		{"a", "b", true},                   // Single char
		{"ab", "aa", false},                // a and b both map to a
		{"", "", true},                     // Empty strings
		{"abcdefg", "hijklmn", true},       // All different chars
		{"aaa", "bbb", true},               // Same char repeated
		{"abc", "abc", true},               // Identical strings
		{"13", "42", true},                 // Numbers
		{"ab", "ca", true},                 // Simple valid mapping
	}

	fmt.Println("============================================================")
	fmt.Println("ISOMORPHIC STRINGS - Test Results")
	fmt.Println("============================================================")

	allPassed := true

	for i, tc := range testCases {
		result := isIsomorphic(tc.s, tc.t)
		passed := result == tc.expected
		status := "PASS"
		if !passed {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Input: s = \"%s\", t = \"%s\"\n", tc.s, tc.t)
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
		{"egg", "add"},
		{"foo", "bar"},
	}

	fmt.Println("\n============================================================")
	fmt.Println("STEP-BY-STEP DEMONSTRATION")
	fmt.Println("============================================================")

	for _, ex := range examples {
		s, t := ex.s, ex.t
		fmt.Printf("\nChecking: s = \"%s\", t = \"%s\"\n", s, t)
		fmt.Println("----------------------------------------")

		sToT := make(map[byte]byte)
		tToS := make(map[byte]byte)
		isValid := true

		for i := 0; i < len(s); i++ {
			charS := s[i]
			charT := t[i]

			fmt.Printf("\nPosition %d: '%c' <-> '%c'\n", i, charS, charT)
			fmt.Printf("  Current s_to_t: %v\n", sToT)
			fmt.Printf("  Current t_to_s: %v\n", tToS)

			// Check s -> t
			if mappedT, exists := sToT[charS]; exists {
				if mappedT != charT {
					fmt.Printf("  CONFLICT: '%c' already maps to '%c', not '%c'\n", charS, mappedT, charT)
					isValid = false
					break
				} else {
					fmt.Printf("  OK: '%c' -> '%c' consistent\n", charS, charT)
				}
			} else {
				sToT[charS] = charT
				fmt.Printf("  Added: '%c' -> '%c'\n", charS, charT)
			}

			// Check t -> s
			if mappedS, exists := tToS[charT]; exists {
				if mappedS != charS {
					fmt.Printf("  CONFLICT: '%c' already maps to '%c', not '%c'\n", charT, mappedS, charS)
					isValid = false
					break
				} else {
					fmt.Printf("  OK: '%c' -> '%c' consistent\n", charT, charS)
				}
			} else {
				tToS[charT] = charS
				fmt.Printf("  Added: '%c' -> '%c'\n", charT, charS)
			}
		}

		if isValid {
			fmt.Println("\nResult: Isomorphic")
		} else {
			fmt.Println("\nResult: Not Isomorphic")
		}
	}
}

func main() {
	runTests()
	demonstrateApproach()
}
