// Word Pattern
//
// This solution uses two hash maps to verify bijection between pattern characters and words.
package main

import (
	"fmt"
	"strings"
)

// wordPattern checks if string s follows the given pattern.
// Time Complexity: O(n)
// Space Complexity: O(n)
func wordPattern(pattern string, s string) bool {
	words := strings.Fields(s)

	// Length check
	if len(pattern) != len(words) {
		return false
	}

	// Two maps for bijection
	charToWord := make(map[byte]string)
	wordToChar := make(map[string]byte)

	for i := 0; i < len(pattern); i++ {
		char := pattern[i]
		word := words[i]

		// Check char -> word mapping
		if mappedWord, exists := charToWord[char]; exists {
			if mappedWord != word {
				return false
			}
		} else {
			charToWord[char] = word
		}

		// Check word -> char mapping
		if mappedChar, exists := wordToChar[word]; exists {
			if mappedChar != char {
				return false
			}
		} else {
			wordToChar[word] = char
		}
	}

	return true
}

func runTests() {
	testCases := []struct {
		pattern  string
		s        string
		expected bool
	}{
		{"abba", "dog cat cat dog", true},
		{"abba", "dog cat cat fish", false},
		{"aaaa", "dog cat cat dog", false},
		{"abba", "dog dog dog dog", false},
		{"a", "dog", true},
		{"ab", "dog cat", true},
		{"ab", "dog dog", false},        // Different chars map to same word
		{"aa", "dog cat", false},        // Same char maps to different words
		{"abc", "one two three", true},
		{"aaa", "dog dog dog", true},
		{"abcd", "a b c d", true},
		{"", "", true},                  // Empty pattern and string
		{"abc", "a b c d", false},       // Length mismatch
		{"jquery", "jquery", false},     // Length mismatch (6 chars vs 1 word)
	}

	fmt.Println("============================================================")
	fmt.Println("WORD PATTERN - Test Results")
	fmt.Println("============================================================")

	allPassed := true

	for i, tc := range testCases {
		result := wordPattern(tc.pattern, tc.s)
		passed := result == tc.expected
		status := "PASS"
		if !passed {
			status = "FAIL"
			allPassed = false
		}

		displayS := tc.s
		if len(tc.s) > 30 {
			displayS = tc.s[:30] + "..."
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Pattern: \"%s\"\n", tc.pattern)
		fmt.Printf("  String:  \"%s\"\n", displayS)
		fmt.Printf("  Output: %v\n", result)
		fmt.Printf("  Expected: %v\n", tc.expected)
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
	examples := []struct {
		pattern string
		s       string
	}{
		{"abba", "dog cat cat dog"},
		{"abba", "dog cat cat fish"},
	}

	fmt.Println("\n============================================================")
	fmt.Println("STEP-BY-STEP DEMONSTRATION")
	fmt.Println("============================================================")

	for _, ex := range examples {
		pattern, s := ex.pattern, ex.s
		fmt.Printf("\nPattern: \"%s\"\n", pattern)
		fmt.Printf("String:  \"%s\"\n", s)
		fmt.Println("----------------------------------------")

		words := strings.Fields(s)
		fmt.Printf("Words: %v\n", words)

		if len(pattern) != len(words) {
			fmt.Printf("Length mismatch: %d != %d\n", len(pattern), len(words))
			fmt.Println("Result: false")
			continue
		}

		charToWord := make(map[byte]string)
		wordToChar := make(map[string]byte)
		isValid := true

		for i := 0; i < len(pattern); i++ {
			char := pattern[i]
			word := words[i]

			fmt.Printf("\nPosition %d: '%c' <-> \"%s\"\n", i, char, word)
			fmt.Printf("  char_to_word: %v\n", charToWord)
			fmt.Printf("  word_to_char: %v\n", wordToChar)

			// Check char -> word
			if mappedWord, exists := charToWord[char]; exists {
				if mappedWord != word {
					fmt.Printf("  CONFLICT: '%c' maps to \"%s\", not \"%s\"\n", char, mappedWord, word)
					isValid = false
					break
				}
				fmt.Printf("  OK: '%c' -> \"%s\" consistent\n", char, word)
			} else {
				charToWord[char] = word
				fmt.Printf("  Added: '%c' -> \"%s\"\n", char, word)
			}

			// Check word -> char
			if mappedChar, exists := wordToChar[word]; exists {
				if mappedChar != char {
					fmt.Printf("  CONFLICT: \"%s\" maps to '%c', not '%c'\n", word, mappedChar, char)
					isValid = false
					break
				}
				fmt.Printf("  OK: \"%s\" -> '%c' consistent\n", word, char)
			} else {
				wordToChar[word] = char
				fmt.Printf("  Added: \"%s\" -> '%c'\n", word, char)
			}
		}

		fmt.Printf("\nResult: %v\n", isValid)
	}
}

func main() {
	runTests()
	demonstrateApproach()
}
