/*
Rabin-Karp String Matching Algorithm

Uses rolling hash for efficient pattern matching.
Average Time Complexity: O(n + m)
Worst Case Time Complexity: O(nm) with many hash collisions
Space Complexity: O(1)
*/

package main

import (
	"fmt"
	"reflect"
)

const (
	defaultD = 256       // Number of characters in the alphabet (ASCII)
	defaultQ = 101       // A prime number for modular arithmetic
	largeQ   = 1000000007 // Larger prime for better collision resistance
)

// rabinKarpSearch finds all occurrences of pattern in text using Rabin-Karp algorithm.
func rabinKarpSearch(text, pattern string) []int {
	return rabinKarpSearchWithParams(text, pattern, defaultD, defaultQ)
}

// rabinKarpSearchWithParams allows customization of d and q parameters.
func rabinKarpSearchWithParams(text, pattern string, d, q int) []int {
	if len(pattern) == 0 || len(text) == 0 || len(pattern) > len(text) {
		return []int{}
	}

	n := len(text)
	m := len(pattern)
	result := []int{}

	// h = d^(m-1) % q
	// Used to remove the leading digit when rolling the hash
	h := 1
	for i := 0; i < m-1; i++ {
		h = (h * d) % q
	}

	// Calculate initial hash values for pattern and first window of text
	patternHash := 0
	textHash := 0

	for i := 0; i < m; i++ {
		patternHash = (d*patternHash + int(pattern[i])) % q
		textHash = (d*textHash + int(text[i])) % q
	}

	// Slide the pattern over text one by one
	for i := 0; i <= n-m; i++ {
		// Check if hash values match
		if patternHash == textHash {
			// Verify character by character (handles hash collisions)
			if text[i:i+m] == pattern {
				result = append(result, i)
			}
		}

		// Calculate hash value for next window
		if i < n-m {
			// Remove leading digit, add trailing digit
			textHash = (d*(textHash-int(text[i])*h) + int(text[i+m])) % q

			// Handle negative hash values
			if textHash < 0 {
				textHash += q
			}
		}
	}

	return result
}

// rabinKarpWithLargePrime uses a larger prime for better collision resistance.
func rabinKarpWithLargePrime(text, pattern string) []int {
	return rabinKarpSearchWithParams(text, pattern, defaultD, largeQ)
}

// rabinKarpMultiplePatterns finds all occurrences of multiple patterns in text.
func rabinKarpMultiplePatterns(text string, patterns []string) map[string][]int {
	results := make(map[string][]int)
	for _, pattern := range patterns {
		results[pattern] = rabinKarpSearch(text, pattern)
	}
	return results
}

func runTests() {
	fmt.Println("============================================================")
	fmt.Println("Rabin-Karp String Matching Algorithm - Test Cases")
	fmt.Println("============================================================")

	allPassed := true

	// Test Case 1: Multiple occurrences with spaces
	text1 := "GEEKS FOR GEEKS"
	pattern1 := "GEEK"
	result1 := rabinKarpSearch(text1, pattern1)
	expected1 := []int{0, 10}
	fmt.Printf("\nTest 1: Find '%s' in '%s'\n", pattern1, text1)
	fmt.Printf("Result: %v\n", result1)
	fmt.Printf("Expected: %v\n", expected1)
	if reflect.DeepEqual(result1, expected1) {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED")
		allPassed = false
	}

	// Test Case 2: Overlapping occurrences
	text2 := "AABAACAADAABAABA"
	pattern2 := "AABA"
	result2 := rabinKarpSearch(text2, pattern2)
	expected2 := []int{0, 9, 12}
	fmt.Printf("\nTest 2: Find '%s' in '%s'\n", pattern2, text2)
	fmt.Printf("Result: %v\n", result2)
	fmt.Printf("Expected: %v\n", expected2)
	if reflect.DeepEqual(result2, expected2) {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED")
		allPassed = false
	}

	// Test Case 3: Pattern not found
	text3 := "abcdefgh"
	pattern3 := "xyz"
	result3 := rabinKarpSearch(text3, pattern3)
	expected3 := []int{}
	fmt.Printf("\nTest 3: Find '%s' in '%s'\n", pattern3, text3)
	fmt.Printf("Result: %v\n", result3)
	fmt.Printf("Expected: %v\n", expected3)
	if len(result3) == 0 && len(expected3) == 0 {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED")
		allPassed = false
	}

	// Test Case 4: Pattern at beginning and end
	text4 := "TEST string TEST"
	pattern4 := "TEST"
	result4 := rabinKarpSearch(text4, pattern4)
	expected4 := []int{0, 12}
	fmt.Printf("\nTest 4: Find '%s' in '%s'\n", pattern4, text4)
	fmt.Printf("Result: %v\n", result4)
	fmt.Printf("Expected: %v\n", expected4)
	if reflect.DeepEqual(result4, expected4) {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED")
		allPassed = false
	}

	// Test Case 5: Single character pattern
	text5 := "abcabc"
	pattern5 := "a"
	result5 := rabinKarpSearch(text5, pattern5)
	expected5 := []int{0, 3}
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
	text6 := "exact"
	pattern6 := "exact"
	result6 := rabinKarpSearch(text6, pattern6)
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
	text7 := "test"
	pattern7 := ""
	result7 := rabinKarpSearch(text7, pattern7)
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

	// Test Case 8: Pattern longer than text
	text8 := "ab"
	pattern8 := "abcdef"
	result8 := rabinKarpSearch(text8, pattern8)
	expected8 := []int{}
	fmt.Printf("\nTest 8: Find '%s' in '%s'\n", pattern8, text8)
	fmt.Printf("Result: %v\n", result8)
	fmt.Printf("Expected: %v\n", expected8)
	if len(result8) == 0 && len(expected8) == 0 {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED")
		allPassed = false
	}

	// Test Case 9: Repeated pattern (all same characters)
	text9 := "AAAAAA"
	pattern9 := "AA"
	result9 := rabinKarpSearch(text9, pattern9)
	expected9 := []int{0, 1, 2, 3, 4}
	fmt.Printf("\nTest 9: Find '%s' in '%s'\n", pattern9, text9)
	fmt.Printf("Result: %v\n", result9)
	fmt.Printf("Expected: %v\n", expected9)
	if reflect.DeepEqual(result9, expected9) {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED")
		allPassed = false
	}

	// Test Case 10: Multiple patterns
	text10 := "the quick brown fox jumps over the lazy dog"
	patterns10 := []string{"the", "fox", "cat"}
	result10 := rabinKarpMultiplePatterns(text10, patterns10)
	fmt.Printf("\nTest 10: Find multiple patterns in '%s'\n", text10)
	fmt.Printf("Patterns: %v\n", patterns10)
	fmt.Printf("Result: %v\n", result10)

	expectedThe := []int{0, 31}
	expectedFox := []int{16}

	test10Passed := reflect.DeepEqual(result10["the"], expectedThe) &&
		reflect.DeepEqual(result10["fox"], expectedFox) &&
		len(result10["cat"]) == 0

	if test10Passed {
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
