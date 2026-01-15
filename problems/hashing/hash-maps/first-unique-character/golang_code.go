// First Unique Character in a String
//
// This solution uses a hash map to count character frequencies.
package main

import (
	"fmt"
	"math"
)

// firstUniqChar finds the index of the first non-repeating character.
// Time Complexity: O(n)
// Space Complexity: O(1) - at most 26 characters
func firstUniqChar(s string) int {
	// Count frequency of each character
	charCount := make(map[rune]int)
	for _, char := range s {
		charCount[char]++
	}

	// Find first character with count 1
	for i, char := range s {
		if charCount[char] == 1 {
			return i
		}
	}

	return -1
}

// firstUniqCharArray uses an array instead of map for better performance.
// Since we only have lowercase letters, we can use a fixed-size array.
func firstUniqCharArray(s string) int {
	// Array to store count of each letter (a-z)
	count := [26]int{}

	// Count frequencies
	for _, char := range s {
		count[char-'a']++
	}

	// Find first unique
	for i, char := range s {
		if count[char-'a'] == 1 {
			return i
		}
	}

	return -1
}

// CharInfo stores count and first index for single-pass approach
type CharInfo struct {
	count      int
	firstIndex int
}

// firstUniqCharSinglePass uses a single pass with index tracking
func firstUniqCharSinglePass(s string) int {
	charInfo := make(map[rune]CharInfo)

	for i, char := range s {
		if info, exists := charInfo[char]; exists {
			charInfo[char] = CharInfo{count: info.count + 1, firstIndex: info.firstIndex}
		} else {
			charInfo[char] = CharInfo{count: 1, firstIndex: i}
		}
	}

	// Find character with count 1 and minimum index
	minIndex := math.MaxInt32
	for _, info := range charInfo {
		if info.count == 1 && info.firstIndex < minIndex {
			minIndex = info.firstIndex
		}
	}

	if minIndex == math.MaxInt32 {
		return -1
	}
	return minIndex
}

func runTests() {
	testCases := []struct {
		s        string
		expected int
	}{
		{"leetcode", 0},                        // 'l' is first unique
		{"loveleetcode", 2},                    // 'v' is first unique
		{"aabb", -1},                           // No unique character
		{"a", 0},                               // Single character
		{"aabbccd", 6},                         // 'd' is unique at the end
		{"abcabc", -1},                         // All characters repeat
		{"abcdefghijklmnopqrstuvwxyz", 0},      // All unique
		{"aabbccddee", -1},                     // All pairs
		{"z", 0},                               // Single char 'z'
		{"dddccdbba", 8},                       // 'a' is unique at index 8
	}

	fmt.Println("============================================================")
	fmt.Println("FIRST UNIQUE CHARACTER - Test Results")
	fmt.Println("============================================================")

	allPassed := true

	for i, tc := range testCases {
		result := firstUniqChar(tc.s)
		passed := result == tc.expected
		status := "PASS"
		if !passed {
			status = "FAIL"
			allPassed = false
		}

		displayS := tc.s
		if len(tc.s) > 20 {
			displayS = tc.s[:20] + "..."
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Input: s = \"%s\"\n", displayS)
		fmt.Printf("  Output: %d\n", result)
		fmt.Printf("  Expected: %d\n", tc.expected)
		if result != -1 {
			fmt.Printf("  Character at index %d: '%c'\n", result, tc.s[result])
		}
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
	s := "loveleetcode"

	fmt.Println("\n============================================================")
	fmt.Println("STEP-BY-STEP DEMONSTRATION")
	fmt.Println("============================================================")
	fmt.Printf("Input: s = \"%s\"\n", s)

	// First pass: Count frequencies
	fmt.Println("\n--- First Pass: Count Character Frequencies ---")
	charCount := make(map[rune]int)
	for i, char := range s {
		charCount[char]++
		fmt.Printf("  After char '%c' at index %d: %v\n", char, i, charCount)
	}

	fmt.Printf("\nFinal frequency map: %v\n", charCount)

	// Second pass: Find first unique
	fmt.Println("\n--- Second Pass: Find First Unique Character ---")
	for i, char := range s {
		count := charCount[char]
		fmt.Printf("  Index %d: char='%c', count=%d", i, char, count)
		if count == 1 {
			fmt.Printf(" -> UNIQUE! Return %d\n", i)
			break
		} else {
			fmt.Println(" -> Not unique, continue")
		}
	}
}

func main() {
	runTests()
	demonstrateApproach()
}
