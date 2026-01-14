/*
Reverse Words in a String

Given a string s, reverse the order of words.
Handle multiple spaces, leading/trailing spaces.

Multiple approaches implemented:
1. Split, Reverse, Join - O(n) time, O(n) space
2. Two Pointers - O(n) time, O(n) space
3. Stack-Based - O(n) time, O(n) space
*/

package main

import (
	"fmt"
	"strings"
)

// reverseWordsSplit reverses words using split, reverse, and join.
// Time Complexity: O(n), Space Complexity: O(n)
func reverseWordsSplit(s string) string {
	// Split by whitespace
	words := strings.Fields(s)

	// Reverse the slice
	for i, j := 0, len(words)-1; i < j; i, j = i+1, j-1 {
		words[i], words[j] = words[j], words[i]
	}

	// Join with single space
	return strings.Join(words, " ")
}

// reverseWordsTwoPointers reverses words using two pointers approach.
// Time Complexity: O(n), Space Complexity: O(n)
func reverseWordsTwoPointers(s string) string {
	chars := []byte(s)
	n := len(chars)

	reverseSection := func(start, end int) {
		for start < end {
			chars[start], chars[end] = chars[end], chars[start]
			start++
			end--
		}
	}

	// Step 1: Reverse the entire string
	reverseSection(0, n-1)

	// Step 2: Reverse each word
	start := 0
	for i := 0; i <= n; i++ {
		if i == n || chars[i] == ' ' {
			if start < i {
				reverseSection(start, i-1)
			}
			start = i + 1
		}
	}

	// Step 3: Clean up spaces - build result
	var result []byte
	i := 0
	for i < n {
		// Skip leading spaces
		for i < n && chars[i] == ' ' {
			i++
		}

		if i >= n {
			break
		}

		// Find word end
		wordStart := i
		for i < n && chars[i] != ' ' {
			i++
		}

		// Add space between words
		if len(result) > 0 {
			result = append(result, ' ')
		}
		result = append(result, chars[wordStart:i]...)
	}

	return string(result)
}

// reverseWordsStack reverses words using a stack.
// Time Complexity: O(n), Space Complexity: O(n)
func reverseWordsStack(s string) string {
	stack := []string{}
	var word strings.Builder

	for _, char := range s {
		if char == ' ' {
			if word.Len() > 0 {
				stack = append(stack, word.String())
				word.Reset()
			}
		} else {
			word.WriteRune(char)
		}
	}

	// Don't forget the last word
	if word.Len() > 0 {
		stack = append(stack, word.String())
	}

	// Pop from stack and build result
	var result []string
	for i := len(stack) - 1; i >= 0; i-- {
		result = append(result, stack[i])
	}

	return strings.Join(result, " ")
}

// reverseWordsManual extracts words manually without using Fields().
// Time Complexity: O(n), Space Complexity: O(n)
func reverseWordsManual(s string) string {
	words := []string{}
	i := 0
	n := len(s)

	for i < n {
		// Skip spaces
		for i < n && s[i] == ' ' {
			i++
		}

		if i >= n {
			break
		}

		// Extract word
		j := i
		for j < n && s[j] != ' ' {
			j++
		}

		words = append(words, s[i:j])
		i = j
	}

	// Reverse the words slice
	for left, right := 0, len(words)-1; left < right; left, right = left+1, right-1 {
		words[left], words[right] = words[right], words[left]
	}

	return strings.Join(words, " ")
}

// reverseWordsBuilder uses StringBuilder for efficient concatenation.
// Time Complexity: O(n), Space Complexity: O(n)
func reverseWordsBuilder(s string) string {
	words := strings.Fields(s)
	if len(words) == 0 {
		return ""
	}

	var sb strings.Builder
	for i := len(words) - 1; i >= 0; i-- {
		sb.WriteString(words[i])
		if i > 0 {
			sb.WriteByte(' ')
		}
	}

	return sb.String()
}

func runTests() {
	fmt.Println("============================================================")
	fmt.Println("Reverse Words in a String - Test Cases")
	fmt.Println("============================================================")

	type testCase struct {
		input    string
		expected string
	}

	testCases := []testCase{
		{"the sky is blue", "blue is sky the"},
		{"  hello world  ", "world hello"},
		{"a good   example", "example good a"},
		{"  Bob    Loves  Alice   ", "Alice Loves Bob"},
		{"word", "word"},
		{"  spaces  ", "spaces"},
		{"one two three", "three two one"},
		{"a", "a"},
		{"   a   b   c   ", "c b a"},
	}

	type method struct {
		name string
		fn   func(string) string
	}

	methods := []method{
		{"Split/Reverse/Join", reverseWordsSplit},
		{"Two Pointers", reverseWordsTwoPointers},
		{"Stack-Based", reverseWordsStack},
		{"Manual Extraction", reverseWordsManual},
		{"StringBuilder", reverseWordsBuilder},
	}

	allPassed := true

	for _, m := range methods {
		fmt.Printf("\n--- Testing %s ---\n", m.name)

		for i, tc := range testCases {
			result := m.fn(tc.input)
			passed := result == tc.expected

			fmt.Printf("\nTest %d: \"%s\"\n", i+1, tc.input)
			fmt.Printf("Result: \"%s\"\n", result)
			fmt.Printf("Expected: \"%s\"\n", tc.expected)

			if passed {
				fmt.Println("PASSED")
			} else {
				fmt.Println("FAILED")
				allPassed = false
			}
		}
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
