/*
Nth Fibonacci - Go Solution

Compute the nth Fibonacci number.

Time Complexity: O(n) iterative, O(2^n) naive recursive
Space Complexity: O(1) iterative
*/

package main

import "fmt"

// GetNthFib gets nth Fibonacci number (1-indexed)
// F1=0, F2=1, F3=1, F4=2, F5=3, F6=5...
func GetNthFib(n int) int {
	if n == 1 {
		return 0
	}
	if n == 2 {
		return 1
	}

	prevPrev := 0
	prev := 1

	for i := 3; i <= n; i++ {
		current := prev + prevPrev
		prevPrev = prev
		prev = current
	}

	return prev
}

// GetNthFibRecursive with memoization - O(n) time, O(n) space
func GetNthFibRecursive(n int, memo map[int]int) int {
	if memo == nil {
		memo = make(map[int]int)
	}

	if val, exists := memo[n]; exists {
		return val
	}
	if n == 1 {
		return 0
	}
	if n == 2 {
		return 1
	}

	memo[n] = GetNthFibRecursive(n-1, memo) + GetNthFibRecursive(n-2, memo)
	return memo[n]
}

// GetNthFibNaive - O(2^n) time. Only for small n.
func GetNthFibNaive(n int) int {
	if n == 1 {
		return 0
	}
	if n == 2 {
		return 1
	}
	return GetNthFibNaive(n-1) + GetNthFibNaive(n-2)
}

func main() {
	// Test 1: n = 6
	result1 := GetNthFib(6)
	fmt.Printf("Test 1 (n=6): %d\n", result1) // Expected: 5

	// Test 2: n = 1
	result2 := GetNthFib(1)
	fmt.Printf("Test 2 (n=1): %d\n", result2) // Expected: 0

	// Test 3: n = 2
	result3 := GetNthFib(2)
	fmt.Printf("Test 3 (n=2): %d\n", result3) // Expected: 1

	// Test 4: n = 10
	result4 := GetNthFib(10)
	fmt.Printf("Test 4 (n=10): %d\n", result4) // Expected: 34

	// Test 5: First 15 Fibonacci numbers
	fmt.Println("\nFirst 15 Fibonacci numbers:")
	fibs := make([]int, 15)
	for i := 1; i <= 15; i++ {
		fibs[i-1] = GetNthFib(i)
	}
	fmt.Printf("  %v\n", fibs)
	// Expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]

	// Test 6: Compare methods
	n := 20
	fmt.Printf("\nTest 6 - Compare methods for n=%d:\n", n)
	fmt.Printf("  Iterative: %d\n", GetNthFib(n))
	fmt.Printf("  Memoized:  %d\n", GetNthFibRecursive(n, nil))
	fmt.Printf("  Naive:     %d\n", GetNthFibNaive(n)) // Still OK for n=20

	// Test 7: Large n
	result7 := GetNthFib(50)
	fmt.Printf("\nTest 7 (n=50): %d\n", result7) // Expected: 7778742049

	fmt.Println("\nAll tests completed!")
}
