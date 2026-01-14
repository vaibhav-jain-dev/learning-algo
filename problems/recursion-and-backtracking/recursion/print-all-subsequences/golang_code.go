// Print All Subsequences of a String
//
// This program demonstrates multiple approaches to generate all subsequences:
// 1. Recursive include/exclude approach
// 2. Iterative bit manipulation approach
// 3. Iterative building approach

package main

import (
	"fmt"
	"sort"
	"strings"
)

// SubsequencesRecursive generates all subsequences using recursion
// Time Complexity: O(n * 2^n)
// Space Complexity: O(n) for recursion stack
func SubsequencesRecursive(s string) []string {
	result := []string{}

	var generate func(index int, current string)
	generate = func(index int, current string) {
		// Base case: processed all characters
		if index == len(s) {
			result = append(result, current)
			return
		}

		// Choice 1: Exclude current character
		generate(index+1, current)

		// Choice 2: Include current character
		generate(index+1, current+string(s[index]))
	}

	generate(0, "")
	return result
}

// SubsequencesBitManipulation generates all subsequences using bit manipulation
// Time Complexity: O(n * 2^n)
// Space Complexity: O(1) excluding output
func SubsequencesBitManipulation(s string) []string {
	n := len(s)
	result := []string{}

	// Iterate through all possible subsets (0 to 2^n - 1)
	for mask := 0; mask < (1 << n); mask++ {
		subsequence := ""

		// Check each bit
		for i := 0; i < n; i++ {
			// If bit i is set, include character i
			if mask&(1<<i) != 0 {
				subsequence += string(s[i])
			}
		}

		result = append(result, subsequence)
	}

	return result
}

// SubsequencesIterative generates all subsequences iteratively
// Time Complexity: O(n * 2^n)
// Space Complexity: O(2^n) for storing results
func SubsequencesIterative(s string) []string {
	result := []string{""} // Start with empty subsequence

	for _, char := range s {
		// For each existing subsequence, create a new one with current char
		newSubsequences := []string{}
		for _, sub := range result {
			newSubsequences = append(newSubsequences, sub+string(char))
		}
		result = append(result, newSubsequences...)
	}

	return result
}

// SubsequencesWithTrace generates all subsequences with detailed trace
func SubsequencesWithTrace(s string) []string {
	result := []string{}

	var generate func(index int, current string, depth int)
	generate = func(index int, current string, depth int) {
		indent := strings.Repeat("  ", depth)

		// Base case
		if index == len(s) {
			fmt.Printf("%sLEAF: Added '%s' to result\n", indent, current)
			result = append(result, current)
			return
		}

		char := string(s[index])
		fmt.Printf("%sAt index %d, char='%s', current='%s'\n", indent, index, char, current)

		// Exclude current character
		fmt.Printf("%s  Branch 1: EXCLUDE '%s'\n", indent, char)
		generate(index+1, current, depth+1)

		// Include current character
		fmt.Printf("%s  Branch 2: INCLUDE '%s'\n", indent, char)
		generate(index+1, current+char, depth+1)
	}

	fmt.Printf("Generating subsequences of '%s':\n", s)
	fmt.Println(strings.Repeat("-", 50))
	generate(0, "", 0)

	return result
}

// PrintSubsequencesFormatted prints subsequences grouped by length
func PrintSubsequencesFormatted(s string, subsequences []string) {
	fmt.Printf("\nSubsequences of '%s' (%d total):\n", s, len(subsequences))
	fmt.Println(strings.Repeat("-", 40))

	// Group by length
	byLength := make(map[int][]string)
	for _, sub := range subsequences {
		length := len(sub)
		byLength[length] = append(byLength[length], sub)
	}

	// Get sorted lengths
	lengths := []int{}
	for length := range byLength {
		lengths = append(lengths, length)
	}
	sort.Ints(lengths)

	for _, length := range lengths {
		subs := byLength[length]
		label := "empty"
		if length > 0 {
			label = fmt.Sprintf("length %d", length)
		}
		fmt.Printf("  %s: %v\n", label, subs)
	}
}

func main() {
	fmt.Println(strings.Repeat("=", 70))
	fmt.Println("PRINT ALL SUBSEQUENCES OF A STRING")
	fmt.Println(strings.Repeat("=", 70))

	// Test basic functionality
	fmt.Println("\n1. Basic Test - String 'abc':")
	fmt.Println(strings.Repeat("-", 50))
	testStr := "abc"

	recursiveResult := SubsequencesRecursive(testStr)
	bitResult := SubsequencesBitManipulation(testStr)
	iterativeResult := SubsequencesIterative(testStr)

	sort.Strings(recursiveResult)
	sort.Strings(bitResult)
	sort.Strings(iterativeResult)

	fmt.Printf("   Recursive:  %v\n", recursiveResult)
	fmt.Printf("   Bit manip:  %v\n", bitResult)
	fmt.Printf("   Iterative:  %v\n", iterativeResult)

	// Verify all methods produce the same result
	allSame := true
	for i := range recursiveResult {
		if recursiveResult[i] != bitResult[i] || recursiveResult[i] != iterativeResult[i] {
			allSame = false
			break
		}
	}
	fmt.Printf("\n   All methods produce same result: %v\n", allSame)
	fmt.Printf("   Total count: %d (expected: %d)\n", len(recursiveResult), 1<<len(testStr))

	// Test with trace
	fmt.Println("\n2. Recursive Trace for 'ab':")
	fmt.Println(strings.Repeat("-", 50))
	traceResult := SubsequencesWithTrace("ab")
	fmt.Printf("\n   Result: %v\n", traceResult)

	// Test various inputs
	fmt.Println("\n3. Test Various Inputs:")
	fmt.Println(strings.Repeat("-", 50))
	testCases := []string{"a", "ab", "abc", "xy", ""}

	for _, s := range testCases {
		result := SubsequencesRecursive(s)
		expectedCount := 1 << len(s)
		status := "PASS"
		if len(result) != expectedCount {
			status = "FAIL"
		}
		fmt.Printf("   '%s': %d subsequences (expected: %d) [%s]\n", s, len(result), expectedCount, status)
	}

	// Formatted output
	fmt.Println("\n4. Formatted Output for 'abcd':")
	fmt.Println(strings.Repeat("-", 50))
	result := SubsequencesRecursive("abcd")
	PrintSubsequencesFormatted("abcd", result)

	// Demonstrate bit manipulation visually
	fmt.Println("\n5. Bit Manipulation Visualization for 'abc':")
	fmt.Println(strings.Repeat("-", 50))
	s := "abc"
	n := len(s)
	fmt.Printf("   String: '%s' (length %d)\n", s, n)
	fmt.Printf("   Number of subsequences: 2^%d = %d\n", n, 1<<n)
	fmt.Println()
	fmt.Println("   Mask | Binary |  Chars Selected  | Subsequence")
	fmt.Println("   -----|--------|------------------|------------")

	for mask := 0; mask < (1 << n); mask++ {
		binary := fmt.Sprintf("%03b", mask)
		chars := make([]string, n)
		subseq := ""
		for i := 0; i < n; i++ {
			if mask&(1<<i) != 0 {
				chars[i] = string(s[i])
				subseq += string(s[i])
			} else {
				chars[i] = "-"
			}
		}
		fmt.Printf("    %3d |  %s   |       %s        |    \"%s\"\n",
			mask, binary, strings.Join(chars, " "), subseq)
	}

	// Count verification
	fmt.Println("\n6. Count Verification:")
	fmt.Println(strings.Repeat("-", 50))
	for length := 1; length <= 10; length++ {
		s := strings.Repeat("a", length)
		result := SubsequencesRecursive(s)
		expected := 1 << length
		status := "PASS"
		if len(result) != expected {
			status = "FAIL"
		}
		fmt.Printf("   Length %2d: %5d subsequences [%s]\n", length, len(result), status)
	}

	// Non-contiguous subsequences example
	fmt.Println("\n7. Non-contiguous Subsequences (Subsequence vs Substring):")
	fmt.Println(strings.Repeat("-", 50))
	s = "abc"
	result = SubsequencesRecursive(s)
	sort.Slice(result, func(i, j int) bool {
		if len(result[i]) != len(result[j]) {
			return len(result[i]) < len(result[j])
		}
		return result[i] < result[j]
	})

	fmt.Printf("   String: '%s'\n", s)
	fmt.Printf("   Substrings (contiguous): ['', 'a', 'b', 'c', 'ab', 'bc', 'abc']\n")
	fmt.Printf("   Subsequences (all): %v\n", result)
	fmt.Printf("\n   Note: 'ac' is a subsequence but NOT a substring!\n")
	fmt.Printf("   'ac' maintains order (a comes before c) but skips 'b'\n")

	fmt.Println()
	fmt.Println(strings.Repeat("=", 70))
	fmt.Println("ALL TESTS COMPLETED!")
	fmt.Println(strings.Repeat("=", 70))
}
