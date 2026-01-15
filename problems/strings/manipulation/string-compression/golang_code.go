/*
String Compression

Compress a character array in-place by replacing consecutive repeating
characters with the character followed by the count (if count > 1).

Multiple approaches implemented:
1. Two Pointers (In-Place) - O(n) time, O(1) space
2. Simple (Non In-Place) - O(n) time, O(n) space
*/

package main

import (
	"fmt"
	"strconv"
	"strings"
)

// compressInPlace compresses character slice in-place using two pointers.
// Time Complexity: O(n), Space Complexity: O(1)
func compressInPlace(chars []byte) int {
	if len(chars) == 0 {
		return 0
	}

	n := len(chars)
	write := 0 // Position to write compressed data
	read := 0  // Position to read from

	for read < n {
		currentChar := chars[read]
		count := 0

		// Count consecutive occurrences
		for read < n && chars[read] == currentChar {
			read++
			count++
		}

		// Write the character
		chars[write] = currentChar
		write++

		// Write the count if > 1
		if count > 1 {
			// Convert count to string and write each digit
			countStr := strconv.Itoa(count)
			for _, digit := range countStr {
				chars[write] = byte(digit)
				write++
			}
		}
	}

	return write
}

// compressSimple compresses using extra space (simpler to understand).
// Time Complexity: O(n), Space Complexity: O(n)
func compressSimple(chars []byte) int {
	if len(chars) == 0 {
		return 0
	}

	var result []byte
	i := 0
	n := len(chars)

	for i < n {
		currentChar := chars[i]
		count := 0

		// Count consecutive occurrences
		for i < n && chars[i] == currentChar {
			i++
			count++
		}

		// Add character to result
		result = append(result, currentChar)

		// Add count if > 1
		if count > 1 {
			countStr := strconv.Itoa(count)
			result = append(result, []byte(countStr)...)
		}
	}

	// Copy result back to chars
	copy(chars, result)

	return len(result)
}

// compressToString compresses a string and returns the compressed string.
// (Helper function for testing and demonstration)
func compressToString(s string) string {
	if len(s) == 0 {
		return ""
	}

	var result strings.Builder
	i := 0
	n := len(s)

	for i < n {
		currentChar := s[i]
		count := 0

		for i < n && s[i] == currentChar {
			i++
			count++
		}

		result.WriteByte(currentChar)
		if count > 1 {
			result.WriteString(strconv.Itoa(count))
		}
	}

	return result.String()
}

// decompressString decompresses a compressed string back to original.
// (Helper function for verification)
func decompressString(compressed string) string {
	var result strings.Builder
	i := 0
	n := len(compressed)

	for i < n {
		char := compressed[i]
		i++

		// Parse the count (if any)
		countStr := ""
		for i < n && compressed[i] >= '0' && compressed[i] <= '9' {
			countStr += string(compressed[i])
			i++
		}

		count := 1
		if countStr != "" {
			count, _ = strconv.Atoi(countStr)
		}

		result.WriteString(strings.Repeat(string(char), count))
	}

	return result.String()
}

// byteSliceEqual checks if two byte slices are equal up to a given length.
func byteSliceEqual(a, b []byte, length int) bool {
	if len(a) < length || len(b) < length {
		return false
	}
	for i := 0; i < length; i++ {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func runTests() {
	fmt.Println("============================================================")
	fmt.Println("String Compression - Test Cases")
	fmt.Println("============================================================")

	type testCase struct {
		chars         []byte
		expectedLen   int
		expectedChars []byte
	}

	testCases := []testCase{
		{[]byte{'a', 'a', 'b', 'b', 'c', 'c', 'c'}, 6, []byte{'a', '2', 'b', '2', 'c', '3'}},
		{[]byte{'a'}, 1, []byte{'a'}},
		{[]byte{'a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'}, 4, []byte{'a', 'b', '1', '2'}},
		{[]byte{'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'}, 3, []byte{'a', '1', '6'}},
		{[]byte{'a', 'b', 'c'}, 3, []byte{'a', 'b', 'c'}},
		{[]byte{'a', 'a', 'a', 'b', 'b', 'a', 'a'}, 6, []byte{'a', '3', 'b', '2', 'a', '2'}},
	}

	type method struct {
		name string
		fn   func([]byte) int
	}

	methods := []method{
		{"Two Pointers (In-Place)", compressInPlace},
		{"Simple (Extra Space)", compressSimple},
	}

	allPassed := true

	for _, m := range methods {
		fmt.Printf("\n--- Testing %s ---\n", m.name)

		for i, tc := range testCases {
			// Make a copy since we modify in place
			chars := make([]byte, len(tc.chars))
			copy(chars, tc.chars)

			resultLen := m.fn(chars)
			passed := resultLen == tc.expectedLen && byteSliceEqual(chars, tc.expectedChars, resultLen)

			fmt.Printf("\nTest %d: %v\n", i+1, string(tc.chars))
			fmt.Printf("Result length: %d, chars: %v\n", resultLen, string(chars[:resultLen]))
			fmt.Printf("Expected length: %d, chars: %v\n", tc.expectedLen, string(tc.expectedChars))

			if passed {
				fmt.Println("PASSED")
			} else {
				fmt.Println("FAILED")
				allPassed = false
			}
		}
	}

	// Demonstrate string compression
	fmt.Println("\n============================================================")
	fmt.Println("String Compression Demonstration")
	fmt.Println("============================================================")

	demoStrings := []string{"aabbbcccc", "abcd", "aaaaaaaaaa", "aabbcc"}
	for _, s := range demoStrings {
		compressed := compressToString(s)
		decompressed := decompressString(compressed)
		ratio := float64(len(compressed)) / float64(len(s))
		fmt.Printf("\nOriginal: '%s' (len=%d)\n", s, len(s))
		fmt.Printf("Compressed: '%s' (len=%d)\n", compressed, len(compressed))
		fmt.Printf("Decompressed: '%s'\n", decompressed)
		fmt.Printf("Compression ratio: %.2f\n", ratio)
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
