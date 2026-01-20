/*
Longest Happy Prefix - Go Solution

Time Complexity: O(n)
Space Complexity: O(n)
*/

package main

import "fmt"

func longestPrefix(s string) string {
	n := len(s)
	if n <= 1 {
		return ""
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

	return s[:lps[n-1]]
}

func main() {
	fmt.Printf("Test 1: '%s'\n", longestPrefix("level"))        // Expected: "l"
	fmt.Printf("Test 2: '%s'\n", longestPrefix("ababab"))       // Expected: "abab"
	fmt.Printf("Test 3: '%s'\n", longestPrefix("leetcodeleet")) // Expected: "leet"
	fmt.Printf("Test 4: '%s'\n", longestPrefix("a"))            // Expected: ""
	fmt.Println("\nAll tests completed!")
}
