/*
Implement strStr() - Go Solution

Time Complexity: O(n + m)
Space Complexity: O(m)
*/

package main

import "fmt"

func strStr(haystack string, needle string) int {
	if len(needle) == 0 {
		return 0
	}

	m := len(needle)
	n := len(haystack)

	if m > n {
		return -1
	}

	// Build LPS array
	lps := make([]int, m)
	length := 0
	i := 1

	for i < m {
		if needle[i] == needle[length] {
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

	// Search
	i = 0
	j := 0
	for i < n {
		if haystack[i] == needle[j] {
			i++
			j++
			if j == m {
				return i - m
			}
		} else if j != 0 {
			j = lps[j-1]
		} else {
			i++
		}
	}

	return -1
}

func main() {
	fmt.Printf("Test 1: %d\n", strStr("sadbutsad", "sad")) // Expected: 0
	fmt.Printf("Test 2: %d\n", strStr("leetcode", "leeto")) // Expected: -1
	fmt.Printf("Test 3: %d\n", strStr("hello", "llo"))      // Expected: 2
	fmt.Printf("Test 4: %d\n", strStr("", ""))              // Expected: 0
	fmt.Println("\nAll tests completed!")
}
