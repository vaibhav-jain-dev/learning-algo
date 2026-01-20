/*
Repeated Substring Pattern - Go Solution

Time Complexity: O(n)
Space Complexity: O(n)
*/

package main

import (
	"fmt"
	"strings"
)

func repeatedSubstringPattern(s string) bool {
	n := len(s)
	if n <= 1 {
		return false
	}

	// Build LPS array
	lps := make([]int, n)
	length := 0
	i := 1

	for i < n {
		if s[i] == s[length] {
			length++
			lps[i] = length
			i++
		} else if length != 0 {
			length = lps[length-1]
		} else {
			lps[i] = 0
			i++
		}
	}

	// Check if string can be formed by repeating a pattern
	patternLen := n - lps[n-1]
	return lps[n-1] > 0 && n%patternLen == 0
}

func repeatedSubstringPatternSimple(s string) bool {
	doubled := s + s
	return strings.Contains(doubled[1:len(doubled)-1], s)
}

func main() {
	fmt.Printf("Test 1: %v\n", repeatedSubstringPattern("abab"))        // Expected: true
	fmt.Printf("Test 2: %v\n", repeatedSubstringPattern("aba"))         // Expected: false
	fmt.Printf("Test 3: %v\n", repeatedSubstringPattern("abcabcabcabc")) // Expected: true
	fmt.Printf("Test 4: %v\n", repeatedSubstringPattern("a"))           // Expected: false
	fmt.Println("\nAll tests completed!")
}
