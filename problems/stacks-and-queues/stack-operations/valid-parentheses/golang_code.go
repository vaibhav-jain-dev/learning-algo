package main

import (
	"fmt"
	"strings"
)

// isValid checks if the parentheses in the string are valid and balanced.
// Uses a stack to track opening brackets and ensures each closing bracket
// matches the most recent opening bracket.
//
// Time Complexity: O(n) where n is the length of the string
// Space Complexity: O(n) in the worst case
func isValid(s string) bool {
	// Mapping of closing brackets to their corresponding opening brackets
	bracketMap := map[rune]rune{
		')': '(',
		'}': '{',
		']': '[',
	}

	// Stack to keep track of opening brackets
	stack := []rune{}

	for _, char := range s {
		if matching, isClosing := bracketMap[char]; isClosing {
			// It's a closing bracket
			// Check if stack is empty or top doesn't match
			if len(stack) == 0 || stack[len(stack)-1] != matching {
				return false
			}
			// Pop from stack
			stack = stack[:len(stack)-1]
		} else {
			// It's an opening bracket, push to stack
			stack = append(stack, char)
		}
	}

	// Valid only if all brackets are matched (stack is empty)
	return len(stack) == 0
}

// isValidAlternative is an alternative approach using explicit opening bracket check
func isValidAlternative(s string) bool {
	opening := map[rune]bool{
		'(': true,
		'{': true,
		'[': true,
	}
	matching := map[rune]rune{
		')': '(',
		'}': '{',
		']': '[',
	}

	stack := []rune{}

	for _, char := range s {
		if opening[char] {
			stack = append(stack, char)
		} else if match, exists := matching[char]; exists {
			if len(stack) == 0 || stack[len(stack)-1] != match {
				return false
			}
			stack = stack[:len(stack)-1]
		}
	}

	return len(stack) == 0
}

// ValidationResult holds the result of validation with details
type ValidationResult struct {
	Valid   bool
	Message string
}

// isValidWithDetails returns validation result along with detailed error messages
func isValidWithDetails(s string) ValidationResult {
	bracketMap := map[rune]rune{
		')': '(',
		'}': '{',
		']': '[',
	}
	opening := map[rune]bool{
		'(': true,
		'{': true,
		'[': true,
	}

	type bracketInfo struct {
		bracket rune
		index   int
	}
	stack := []bracketInfo{}

	for i, char := range s {
		if opening[char] {
			stack = append(stack, bracketInfo{char, i})
		} else if match, exists := bracketMap[char]; exists {
			if len(stack) == 0 {
				return ValidationResult{
					Valid:   false,
					Message: fmt.Sprintf("Unmatched closing bracket '%c' at position %d", char, i),
				}
			}
			top := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			if top.bracket != match {
				return ValidationResult{
					Valid:   false,
					Message: fmt.Sprintf("Mismatched brackets: '%c' at %d and '%c' at %d", top.bracket, top.index, char, i),
				}
			}
		}
	}

	if len(stack) > 0 {
		var unmatched []string
		for _, b := range stack {
			unmatched = append(unmatched, fmt.Sprintf("'%c' at %d", b.bracket, b.index))
		}
		return ValidationResult{
			Valid:   false,
			Message: fmt.Sprintf("Unmatched opening brackets: %s", strings.Join(unmatched, ", ")),
		}
	}

	return ValidationResult{
		Valid:   true,
		Message: "All brackets are valid and balanced",
	}
}

// TestCase represents a single test case
type TestCase struct {
	input    string
	expected bool
}

func runTests() {
	testCases := []TestCase{
		{"()", true},
		{"()[]{}", true},
		{"(]", false},
		{"([)]", false},
		{"{[]}", true},
		{"", true},  // Empty string is valid
		{"(", false}, // Single opening bracket
		{")", false}, // Single closing bracket
		{"((()))", true}, // Deeply nested
		{"{[()]}", true}, // Mixed nested
		{"({[]})", true}, // Complex valid
		{"([{}])", true}, // Complex valid
		{"((())", false}, // Missing closing
		{"())", false},   // Extra closing
		{"{", false},
		{"}", false},
		{"[(])", false}, // Interleaved incorrect
		{"{{{{{{{{{{[[[[[[[[[[(((((((((())))))))))]]]]]]]]]]}}}}}}}}}}", true}, // Long valid
	}

	fmt.Println("Testing isValid function:")
	fmt.Println(strings.Repeat("=", 70))

	allPassed := true
	for i, tc := range testCases {
		result := isValid(tc.input)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}

		displayInput := tc.input
		if len(displayInput) > 30 {
			displayInput = displayInput[:27] + "..."
		}
		fmt.Printf("Test %2d: isValid(\"%s\") = %v, Expected: %v [%s]\n",
			i+1, displayInput, result, tc.expected, status)
	}

	fmt.Println(strings.Repeat("=", 70))
	fmt.Printf("All tests passed: %v\n\n", allPassed)

	// Test alternative implementation
	fmt.Println("Testing isValidAlternative function:")
	fmt.Println(strings.Repeat("=", 70))

	allPassedAlt := true
	for i, tc := range testCases {
		result := isValidAlternative(tc.input)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
			allPassedAlt = false
		}

		displayInput := tc.input
		if len(displayInput) > 30 {
			displayInput = displayInput[:27] + "..."
		}
		fmt.Printf("Test %2d: isValidAlternative(\"%s\") = %v, Expected: %v [%s]\n",
			i+1, displayInput, result, tc.expected, status)
	}

	fmt.Println(strings.Repeat("=", 70))
	fmt.Printf("All tests passed: %v\n\n", allPassedAlt)

	// Demonstrate detailed validation
	fmt.Println("Testing isValidWithDetails function (showing details):")
	fmt.Println(strings.Repeat("=", 70))

	detailCases := []string{"()", "(]", "([)]", "{[]}", "((()", "())"}
	for _, s := range detailCases {
		result := isValidWithDetails(s)
		fmt.Printf("Input: \"%s\"\n", s)
		fmt.Printf("  Valid: %v\n", result.Valid)
		fmt.Printf("  Details: %s\n\n", result.Message)
	}
}

func main() {
	runTests()
}
