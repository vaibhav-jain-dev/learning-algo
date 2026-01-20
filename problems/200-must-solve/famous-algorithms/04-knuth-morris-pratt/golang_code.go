/*
Knuth-Morris-Pratt (KMP) Algorithm - String Pattern Matching - Go Solution

Find all occurrences of a pattern in a text string.

Time Complexity: O(n + m)
Space Complexity: O(m)
*/

package main

import "fmt"

// buildLPS builds the Longest Proper Prefix which is also Suffix array
func buildLPS(pattern string) []int {
	m := len(pattern)
	lps := make([]int, m)
	length := 0 // Length of previous longest prefix suffix
	i := 1

	for i < m {
		if pattern[i] == pattern[length] {
			length++
			lps[i] = length
			i++
		} else {
			if length != 0 {
				// Use previously computed LPS value
				length = lps[length-1]
			} else {
				lps[i] = 0
				i++
			}
		}
	}

	return lps
}

// kmpSearch finds all occurrences of pattern in text
func kmpSearch(text, pattern string) []int {
	n := len(text)
	m := len(pattern)

	if m == 0 {
		return []int{}
	}
	if m > n {
		return []int{}
	}

	// Build LPS array
	lps := buildLPS(pattern)

	result := []int{}
	i := 0 // Index for text
	j := 0 // Index for pattern

	for i < n {
		if text[i] == pattern[j] {
			i++
			j++

			if j == m {
				// Pattern found at index (i - m)
				result = append(result, i-m)
				// Use LPS to continue searching
				j = lps[j-1]
			}
		} else {
			if j != 0 {
				// Use LPS to skip characters
				j = lps[j-1]
			} else {
				i++
			}
		}
	}

	return result
}

// kmpFirstOccurrence finds the first occurrence of pattern in text
func kmpFirstOccurrence(text, pattern string) int {
	result := kmpSearch(text, pattern)
	if len(result) > 0 {
		return result[0]
	}
	return -1
}

// kmpCountOccurrences counts total occurrences of pattern in text
func kmpCountOccurrences(text, pattern string) int {
	return len(kmpSearch(text, pattern))
}

func main() {
	// Test 1: Basic search
	text1 := "ABABDABACDABABCABAB"
	pattern1 := "ABABCABAB"
	result1 := kmpSearch(text1, pattern1)
	fmt.Printf("Test 1: %v\n", result1)

	// Test 2: Overlapping occurrences
	text2 := "AAAAAA"
	pattern2 := "AA"
	result2 := kmpSearch(text2, pattern2)
	fmt.Printf("Test 2: %v\n", result2)

	// Test 3: No match
	text3 := "ABCDEF"
	pattern3 := "XYZ"
	result3 := kmpSearch(text3, pattern3)
	fmt.Printf("Test 3: %v\n", result3)

	// Test 4: Pattern at beginning
	text4 := "ABCABC"
	pattern4 := "ABC"
	result4 := kmpSearch(text4, pattern4)
	fmt.Printf("Test 4: %v\n", result4)

	// Test 5: LPS array test
	lps5 := buildLPS("ABABCABAB")
	fmt.Printf("Test 5 (LPS): %v\n", lps5)

	// Test 6: First occurrence
	result6 := kmpFirstOccurrence("hello world", "world")
	fmt.Printf("Test 6 (First): %d\n", result6)

	// Test 7: Count occurrences
	result7 := kmpCountOccurrences("abababa", "aba")
	fmt.Printf("Test 7 (Count): %d\n", result7)

	fmt.Println("\nAll tests completed!")
}
