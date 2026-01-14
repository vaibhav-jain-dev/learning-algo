package main

import (
	"fmt"
	"strconv"
	"strings"
)

// evalRPN evaluates a Reverse Polish Notation expression.
// Uses a stack to store operands. When an operator is encountered,
// pop two operands, apply the operation, and push the result.
//
// Time Complexity: O(n) where n is the number of tokens
// Space Complexity: O(n) for the stack
func evalRPN(tokens []string) int {
	stack := make([]int, 0, len(tokens))

	for _, token := range tokens {
		switch token {
		case "+":
			right := stack[len(stack)-1]
			left := stack[len(stack)-2]
			stack = stack[:len(stack)-2]
			stack = append(stack, left+right)
		case "-":
			right := stack[len(stack)-1]
			left := stack[len(stack)-2]
			stack = stack[:len(stack)-2]
			stack = append(stack, left-right)
		case "*":
			right := stack[len(stack)-1]
			left := stack[len(stack)-2]
			stack = stack[:len(stack)-2]
			stack = append(stack, left*right)
		case "/":
			right := stack[len(stack)-1]
			left := stack[len(stack)-2]
			stack = stack[:len(stack)-2]
			// Go's integer division already truncates toward zero
			stack = append(stack, left/right)
		default:
			// It's a number, push to stack
			num, _ := strconv.Atoi(token)
			stack = append(stack, num)
		}
	}

	return stack[0]
}

// evalRPNWithOperators is an alternative implementation using a map for operators
func evalRPNWithOperators(tokens []string) int {
	operations := map[string]func(int, int) int{
		"+": func(a, b int) int { return a + b },
		"-": func(a, b int) int { return a - b },
		"*": func(a, b int) int { return a * b },
		"/": func(a, b int) int { return a / b }, // Go truncates toward zero
	}

	stack := make([]int, 0, len(tokens))

	for _, token := range tokens {
		if op, exists := operations[token]; exists {
			right := stack[len(stack)-1]
			left := stack[len(stack)-2]
			stack = stack[:len(stack)-2]
			stack = append(stack, op(left, right))
		} else {
			num, _ := strconv.Atoi(token)
			stack = append(stack, num)
		}
	}

	return stack[0]
}

// EvalResult holds the result and trace of RPN evaluation
type EvalResult struct {
	Result int
	Trace  []string
}

// evalRPNWithTrace returns the result along with execution trace
func evalRPNWithTrace(tokens []string) EvalResult {
	stack := make([]int, 0)
	trace := make([]string, 0)

	for i, token := range tokens {
		switch token {
		case "+", "-", "*", "/":
			right := stack[len(stack)-1]
			left := stack[len(stack)-2]
			stack = stack[:len(stack)-2]

			var result int
			switch token {
			case "+":
				result = left + right
			case "-":
				result = left - right
			case "*":
				result = left * right
			case "/":
				result = left / right
			}

			trace = append(trace, fmt.Sprintf("Step %d: %d %s %d = %d", i+1, left, token, right, result))
			stack = append(stack, result)
		default:
			num, _ := strconv.Atoi(token)
			stack = append(stack, num)
			trace = append(trace, fmt.Sprintf("Step %d: Push %s -> Stack: %v", i+1, token, stack))
		}
	}

	return EvalResult{Result: stack[0], Trace: trace}
}

// TestCase represents a single test case
type TestCase struct {
	tokens      []string
	expected    int
	description string
}

func runTests() {
	testCases := []TestCase{
		{[]string{"2", "1", "+", "3", "*"}, 9, "(2 + 1) * 3"},
		{[]string{"4", "13", "5", "/", "+"}, 6, "4 + (13 / 5)"},
		{[]string{"10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"}, 22, "Complex expression"},
		{[]string{"3", "4", "-"}, -1, "3 - 4"},
		{[]string{"5"}, 5, "Single number"},
		{[]string{"2", "3", "+"}, 5, "Simple addition"},
		{[]string{"10", "3", "-"}, 7, "Simple subtraction"},
		{[]string{"4", "5", "*"}, 20, "Simple multiplication"},
		{[]string{"20", "4", "/"}, 5, "Simple division"},
		{[]string{"7", "2", "/"}, 3, "Division truncation (positive)"},
		{[]string{"-7", "2", "/"}, -3, "Division truncation (negative dividend)"},
		{[]string{"7", "-2", "/"}, -3, "Division truncation (negative divisor)"},
		{[]string{"-7", "-2", "/"}, 3, "Division truncation (both negative)"},
		{[]string{"3", "4", "+", "2", "*", "7", "/"}, 2, "(3 + 4) * 2 / 7"},
		{[]string{"5", "1", "2", "+", "4", "*", "+", "3", "-"}, 14, "5 + ((1 + 2) * 4) - 3"},
	}

	fmt.Println("Testing evalRPN function:")
	fmt.Println(strings.Repeat("=", 70))

	allPassed := true
	for i, tc := range testCases {
		result := evalRPN(tc.tokens)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}

		tokensStr := fmt.Sprintf("%v", tc.tokens)
		if len(tokensStr) > 40 {
			tokensStr = tokensStr[:37] + "..."
		}
		fmt.Printf("Test %2d: %s\n", i+1, tc.description)
		fmt.Printf("         Input: %s\n", tokensStr)
		fmt.Printf("         Result: %d, Expected: %d [%s]\n\n", result, tc.expected, status)
	}

	fmt.Println(strings.Repeat("=", 70))
	fmt.Printf("All tests passed: %v\n\n", allPassed)

	// Test alternative implementation
	fmt.Println("Testing evalRPNWithOperators function:")
	fmt.Println(strings.Repeat("=", 70))

	allPassedAlt := true
	for _, tc := range testCases {
		result := evalRPNWithOperators(tc.tokens)
		if result != tc.expected {
			allPassedAlt = false
		}
	}
	passStr := "PASS"
	if !allPassedAlt {
		passStr = "FAIL"
	}
	fmt.Printf("All %d test cases: %s\n\n", len(testCases), passStr)

	// Demonstrate trace functionality
	fmt.Println("Demonstrating evalRPNWithTrace:")
	fmt.Println(strings.Repeat("=", 70))

	demoCases := [][]string{
		{"2", "1", "+", "3", "*"},
		{"4", "13", "5", "/", "+"},
	}

	for _, tokens := range demoCases {
		evalResult := evalRPNWithTrace(tokens)
		fmt.Printf("Expression: %v\n", tokens)
		fmt.Printf("Result: %d\n", evalResult.Result)
		fmt.Println("Trace:")
		for _, step := range evalResult.Trace {
			fmt.Printf("  %s\n", step)
		}
		fmt.Println()
	}
}

func main() {
	runTests()
}
