// Fibonacci Number with Memoization
//
// This program demonstrates multiple approaches to calculate Fibonacci numbers:
// 1. Naive recursion (exponential time)
// 2. Memoization with map (linear time)
// 3. Iterative approach (linear time, constant space)

package main

import (
	"fmt"
	"strings"
)

// fibonacciNaive calculates nth Fibonacci using naive recursion
// Time Complexity: O(2^n) - exponential
// Space Complexity: O(n) - recursion stack
// WARNING: Very slow for n > 35
func fibonacciNaive(n int) int64 {
	if n <= 0 {
		return 0
	}
	if n == 1 {
		return 1
	}
	return fibonacciNaive(n-1) + fibonacciNaive(n-2)
}

// fibonacciMemo calculates nth Fibonacci using memoization
// Time Complexity: O(n)
// Space Complexity: O(n)
func fibonacciMemo(n int, memo map[int]int64) int64 {
	// Base cases
	if n <= 0 {
		return 0
	}
	if n == 1 {
		return 1
	}

	// Check if already computed
	if val, exists := memo[n]; exists {
		return val
	}

	// Compute and store in memo
	memo[n] = fibonacciMemo(n-1, memo) + fibonacciMemo(n-2, memo)

	return memo[n]
}

// Fibonacci is a helper function that initializes the memo map
func Fibonacci(n int) int64 {
	memo := make(map[int]int64)
	return fibonacciMemo(n, memo)
}

// fibonacciIterative calculates nth Fibonacci iteratively
// Time Complexity: O(n)
// Space Complexity: O(1) - most efficient!
func fibonacciIterative(n int) int64 {
	if n <= 0 {
		return 0
	}
	if n == 1 {
		return 1
	}

	var prev2, prev1 int64 = 0, 1

	for i := 2; i <= n; i++ {
		current := prev1 + prev2
		prev2 = prev1
		prev1 = current
	}

	return prev1
}

// fibonacciWithTrace calculates Fibonacci with detailed trace output
func fibonacciWithTrace(n int, memo map[int]int64, depth int) int64 {
	indent := strings.Repeat("  ", depth)

	if n <= 0 {
		fmt.Printf("%sfib(%d) = 0 [base case]\n", indent, n)
		return 0
	}
	if n == 1 {
		fmt.Printf("%sfib(%d) = 1 [base case]\n", indent, n)
		return 1
	}

	if val, exists := memo[n]; exists {
		fmt.Printf("%sfib(%d) = %d [cached]\n", indent, n, val)
		return val
	}

	fmt.Printf("%sComputing fib(%d)...\n", indent, n)

	result1 := fibonacciWithTrace(n-1, memo, depth+1)
	result2 := fibonacciWithTrace(n-2, memo, depth+1)

	memo[n] = result1 + result2
	fmt.Printf("%sfib(%d) = %d [computed: %d + %d]\n", indent, n, memo[n], result1, result2)

	return memo[n]
}

func main() {
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("FIBONACCI NUMBER WITH MEMOIZATION")
	fmt.Println(strings.Repeat("=", 60))

	// Test cases
	testCases := []struct {
		n        int
		expected int64
	}{
		{0, 0},
		{1, 1},
		{2, 1},
		{5, 5},
		{10, 55},
		{20, 6765},
		{30, 832040},
		{40, 102334155},
	}

	// Test memoization approach
	fmt.Println("\n1. Testing Memoization Approach:")
	fmt.Println(strings.Repeat("-", 40))
	for _, tc := range testCases {
		result := Fibonacci(tc.n)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("   fib(%d) = %d [%s]\n", tc.n, result, status)
	}

	// Test iterative approach
	fmt.Println("\n2. Testing Iterative Approach:")
	fmt.Println(strings.Repeat("-", 40))
	for _, tc := range testCases {
		result := fibonacciIterative(tc.n)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("   fib(%d) = %d [%s]\n", tc.n, result, status)
	}

	// Demonstrate the trace
	fmt.Println("\n3. Trace of fib(6) with Memoization:")
	fmt.Println(strings.Repeat("-", 40))
	traceMemo := make(map[int]int64)
	result := fibonacciWithTrace(6, traceMemo, 0)
	fmt.Printf("\nFinal Result: fib(6) = %d\n", result)

	// Show first 15 Fibonacci numbers
	fmt.Println("\n4. First 15 Fibonacci Numbers:")
	fmt.Println(strings.Repeat("-", 40))
	fmt.Print("   [")
	for i := 0; i < 15; i++ {
		if i > 0 {
			fmt.Print(", ")
		}
		fmt.Print(Fibonacci(i))
	}
	fmt.Println("]")

	// Large number test
	fmt.Println("\n5. Large Number Test:")
	fmt.Println(strings.Repeat("-", 40))
	largeN := 90 // Using 90 to avoid overflow with int64
	largeResult := Fibonacci(largeN)
	fmt.Printf("   fib(%d) = %d\n", largeN, largeResult)

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("ALL TESTS COMPLETED!")
	fmt.Println(strings.Repeat("=", 60))
}
