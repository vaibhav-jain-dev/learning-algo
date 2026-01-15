/*
KMP Pattern Search Algorithm

The Knuth-Morris-Pratt algorithm efficiently finds all occurrences of a pattern
in a text by utilizing a preprocessing step that builds a failure function (LPS array).

Time Complexity: O(n + m) where n is text length and m is pattern length
Space Complexity: O(m) for the LPS array
*/

package main

import (
	"fmt"
	"reflect"
)

// computeLPS computes the Longest Proper Prefix which is also Suffix (LPS) array.
// LPS[i] = length of the longest proper prefix of pattern[0..i]
// which is also a suffix of pattern[0..i]
func computeLPS(pattern string) []int {
	m := len(pattern)
	lps := make([]int, m)

	// Length of the previous longest prefix suffix
	length := 0
	i := 1

	for i < m {
		if pattern[i] == pattern[length] {
			length++
			lps[i] = length
			i++
		} else {
			if length != 0 {
				// Use the previous LPS value to avoid redundant comparisons
				length = lps[length-1]
			} else {
				lps[i] = 0
				i++
			}
		}
	}

	return lps
}

// kmpSearch finds all occurrences of pattern in text using KMP algorithm.
// Returns a slice of starting indices where pattern is found in text.
func kmpSearch(text, pattern string) []int {
	if len(pattern) == 0 || len(text) == 0 {
		return []int{}
	}

	n := len(text)
	m := len(pattern)

	if m > n {
		return []int{}
	}

	// Preprocess pattern to get LPS array
	lps := computeLPS(pattern)

	result := []int{}
	i := 0 // Index for text
	j := 0 // Index for pattern

	for i < n {
		if pattern[j] == text[i] {
			i++
			j++
		}

		if j == m {
			// Pattern found at index i - j
			result = append(result, i-j)
			// Continue searching for more occurrences
			j = lps[j-1]
		} else if i < n && pattern[j] != text[i] {
			// Mismatch after j matches
			if j != 0 {
				// Use LPS to skip characters
				j = lps[j-1]
			} else {
				// No match, move to next character in text
				i++
			}
		}
	}

	return result
}

// kmpSearchFirst finds the first occurrence of pattern in text.
// Returns the index of first occurrence, or -1 if not found.
func kmpSearchFirst(text, pattern string) int {
	occurrences := kmpSearch(text, pattern)
	if len(occurrences) > 0 {
		return occurrences[0]
	}
	return -1
}

func runTests() {
	fmt.Println("============================================================")
	fmt.Println("KMP Pattern Search Algorithm - Test Cases")
	fmt.Println("============================================================")

	allPassed := true

	// Test Case 1: Multiple occurrences
	text1 := "AABAACAADAABAAABAA"
	pattern1 := "AABA"
	result1 := kmpSearch(text1, pattern1)
	expected1 := []int{0, 9, 13}
	fmt.Printf("\nTest 1: Find '%s' in '%s'\n", pattern1, text1)
	fmt.Printf("Result: %v\n", result1)
	fmt.Printf("Expected: %v\n", expected1)
	if reflect.DeepEqual(result1, expected1) {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED")
		allPassed = false
	}

	// Test Case 2: Single occurrence
	text2 := "ABABDABACDABABCABAB"
	pattern2 := "ABABCABAB"
	result2 := kmpSearch(text2, pattern2)
	expected2 := []int{10}
	fmt.Printf("\nTest 2: Find '%s' in '%s'\n", pattern2, text2)
	fmt.Printf("Result: %v\n", result2)
	fmt.Printf("Expected: %v\n", expected2)
	if reflect.DeepEqual(result2, expected2) {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED")
		allPassed = false
	}

	// Test Case 3: Overlapping occurrences
	text3 := "AAAAAA"
	pattern3 := "AAA"
	result3 := kmpSearch(text3, pattern3)
	expected3 := []int{0, 1, 2, 3}
	fmt.Printf("\nTest 3: Find '%s' in '%s'\n", pattern3, text3)
	fmt.Printf("Result: %v\n", result3)
	fmt.Printf("Expected: %v\n", expected3)
	if reflect.DeepEqual(result3, expected3) {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED")
		allPassed = false
	}

	// Test Case 4: No occurrence
	text4 := "ABCDEF"
	pattern4 := "XYZ"
	result4 := kmpSearch(text4, pattern4)
	expected4 := []int{}
	fmt.Printf("\nTest 4: Find '%s' in '%s'\n", pattern4, text4)
	fmt.Printf("Result: %v\n", result4)
	fmt.Printf("Expected: %v\n", expected4)
	if len(result4) == 0 && len(expected4) == 0 {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED")
		allPassed = false
	}

	// Test Case 5: Pattern at the end
	text5 := "ABCDEFGH"
	pattern5 := "FGH"
	result5 := kmpSearch(text5, pattern5)
	expected5 := []int{5}
	fmt.Printf("\nTest 5: Find '%s' in '%s'\n", pattern5, text5)
	fmt.Printf("Result: %v\n", result5)
	fmt.Printf("Expected: %v\n", expected5)
	if reflect.DeepEqual(result5, expected5) {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED")
		allPassed = false
	}

	// Test Case 6: Pattern equals text
	text6 := "ABC"
	pattern6 := "ABC"
	result6 := kmpSearch(text6, pattern6)
	expected6 := []int{0}
	fmt.Printf("\nTest 6: Find '%s' in '%s'\n", pattern6, text6)
	fmt.Printf("Result: %v\n", result6)
	fmt.Printf("Expected: %v\n", expected6)
	if reflect.DeepEqual(result6, expected6) {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED")
		allPassed = false
	}

	// Test Case 7: Empty pattern
	text7 := "ABC"
	pattern7 := ""
	result7 := kmpSearch(text7, pattern7)
	expected7 := []int{}
	fmt.Printf("\nTest 7: Find empty pattern in '%s'\n", text7)
	fmt.Printf("Result: %v\n", result7)
	fmt.Printf("Expected: %v\n", expected7)
	if len(result7) == 0 && len(expected7) == 0 {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED")
		allPassed = false
	}

	// Test Case 8: LPS array verification
	pattern8 := "AABAACAABAA"
	lps8 := computeLPS(pattern8)
	expectedLPS8 := []int{0, 1, 0, 1, 2, 0, 1, 2, 3, 4, 5}
	fmt.Printf("\nTest 8: LPS array for '%s'\n", pattern8)
	fmt.Printf("Result: %v\n", lps8)
	fmt.Printf("Expected: %v\n", expectedLPS8)
	if reflect.DeepEqual(lps8, expectedLPS8) {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED")
		allPassed = false
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
