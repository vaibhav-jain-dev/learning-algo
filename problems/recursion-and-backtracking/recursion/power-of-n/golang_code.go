// Power of N - Calculate x^n Efficiently
//
// This program demonstrates multiple approaches to calculate x^n:
// 1. Naive approach (O(n) time)
// 2. Recursive exponentiation by squaring (O(log n) time)
// 3. Iterative exponentiation by squaring (O(log n) time, O(1) space)

package main

import (
	"fmt"
	"math"
	"strings"
	"time"
)

// powerNaive calculates x^n using naive multiplication
// Time Complexity: O(n)
// Space Complexity: O(1)
func powerNaive(x float64, n int) float64 {
	if n == 0 {
		return 1.0
	}

	if n < 0 {
		x = 1 / x
		n = -n
	}

	result := 1.0
	for i := 0; i < n; i++ {
		result *= x
	}

	return result
}

// powerRecursive calculates x^n using recursive exponentiation by squaring
// Time Complexity: O(log n)
// Space Complexity: O(log n) - recursion stack
func powerRecursive(x float64, n int) float64 {
	// Base case
	if n == 0 {
		return 1.0
	}

	// Handle negative exponents
	if n < 0 {
		return 1.0 / powerRecursive(x, -n)
	}

	// Recursive case
	if n%2 == 0 {
		// n is even: x^n = (x^(n/2))^2
		half := powerRecursive(x, n/2)
		return half * half
	}

	// n is odd: x^n = x * x^(n-1)
	return x * powerRecursive(x, n-1)
}

// powerIterative calculates x^n using iterative exponentiation by squaring
// Time Complexity: O(log n)
// Space Complexity: O(1) - most efficient!
func powerIterative(x float64, n int) float64 {
	if n == 0 {
		return 1.0
	}

	// Handle negative exponents
	if n < 0 {
		x = 1 / x
		n = -n
	}

	result := 1.0

	for n > 0 {
		// If current bit is 1, multiply result by current x
		if n%2 == 1 {
			result *= x
		}

		// Square x for next bit
		x *= x

		// Move to next bit
		n /= 2
	}

	return result
}

// powerWithTrace calculates x^n with detailed trace output
func powerWithTrace(x float64, n int, depth int) float64 {
	indent := strings.Repeat("  ", depth)

	fmt.Printf("%spower(%.1f, %d)\n", indent, x, n)

	// Base case
	if n == 0 {
		fmt.Printf("%s  -> Base case: return 1.0\n", indent)
		return 1.0
	}

	// Handle negative exponents
	if n < 0 {
		fmt.Printf("%s  -> Negative exponent: computing 1/power(%.1f, %d)\n", indent, x, -n)
		result := 1.0 / powerWithTrace(x, -n, depth+1)
		fmt.Printf("%s  -> Result: %.6f\n", indent, result)
		return result
	}

	// Recursive case
	if n%2 == 0 {
		fmt.Printf("%s  -> Even exponent: computing power(%.1f, %d)^2\n", indent, x, n/2)
		half := powerWithTrace(x, n/2, depth+1)
		result := half * half
		fmt.Printf("%s  -> %.6f^2 = %.6f\n", indent, half, result)
		return result
	}

	fmt.Printf("%s  -> Odd exponent: computing %.1f * power(%.1f, %d)\n", indent, x, x, n-1)
	rest := powerWithTrace(x, n-1, depth+1)
	result := x * rest
	fmt.Printf("%s  -> %.1f * %.6f = %.6f\n", indent, x, rest, result)
	return result
}

func main() {
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("POWER OF N - CALCULATE x^n EFFICIENTLY")
	fmt.Println(strings.Repeat("=", 60))

	// Test cases
	testCases := []struct {
		x        float64
		n        int
		expected float64
	}{
		{2.0, 0, 1.0},
		{2.0, 1, 2.0},
		{2.0, 10, 1024.0},
		{2.0, -2, 0.25},
		{3.0, 3, 27.0},
		{5.0, 4, 625.0},
		{-2.0, 3, -8.0},
		{-2.0, 4, 16.0},
		{0.5, 3, 0.125},
		{2.0, 20, 1048576.0},
	}

	// Test recursive approach
	fmt.Println("\n1. Testing Recursive Exponentiation by Squaring:")
	fmt.Println(strings.Repeat("-", 50))
	for _, tc := range testCases {
		result := powerRecursive(tc.x, tc.n)
		status := "PASS"
		if math.Abs(result-tc.expected) > 1e-9 {
			status = "FAIL"
		}
		fmt.Printf("   %.1f^%d = %.6f [%s]\n", tc.x, tc.n, result, status)
	}

	// Test iterative approach
	fmt.Println("\n2. Testing Iterative Exponentiation by Squaring:")
	fmt.Println(strings.Repeat("-", 50))
	for _, tc := range testCases {
		result := powerIterative(tc.x, tc.n)
		status := "PASS"
		if math.Abs(result-tc.expected) > 1e-9 {
			status = "FAIL"
		}
		fmt.Printf("   %.1f^%d = %.6f [%s]\n", tc.x, tc.n, result, status)
	}

	// Demonstrate the trace
	fmt.Println("\n3. Trace of power(2, 10):")
	fmt.Println(strings.Repeat("-", 50))
	result := powerWithTrace(2.0, 10, 0)
	fmt.Printf("\nFinal Result: 2^10 = %.0f\n", result)

	// Demonstrate with negative exponent
	fmt.Println("\n4. Trace of power(2, -3):")
	fmt.Println(strings.Repeat("-", 50))
	result = powerWithTrace(2.0, -3, 0)
	fmt.Printf("\nFinal Result: 2^(-3) = %.6f\n", result)

	// Compare efficiency
	fmt.Println("\n5. Efficiency Comparison (computing 2^30):")
	fmt.Println(strings.Repeat("-", 50))

	naiveCount := 30
	fmt.Printf("   Naive approach: ~%d multiplications\n", naiveCount)
	fmt.Printf("   Squaring approach: ~%d multiplications\n", bitLength(30))

	// Time comparison for large exponent
	nLarge := 10000

	start := time.Now()
	resultIter := powerIterative(1.0001, nLarge)
	timeIter := time.Since(start)

	fmt.Printf("\n   Computing 1.0001^%d:\n", nLarge)
	fmt.Printf("   Iterative squaring: %.4f ms\n", float64(timeIter.Nanoseconds())/1e6)
	fmt.Printf("   Result: %.6f\n", resultIter)

	// Edge cases
	fmt.Println("\n6. Edge Cases:")
	fmt.Println(strings.Repeat("-", 50))

	edgeCases := []struct {
		x    float64
		n    int
		desc string
	}{
		{0, 5, "0^5"},
		{1, 1000000, "1^1000000"},
		{2, 0, "2^0"},
		{-1, 100, "(-1)^100"},
		{-1, 101, "(-1)^101"},
	}

	for _, ec := range edgeCases {
		result := powerRecursive(ec.x, ec.n)
		fmt.Printf("   %s = %.0f\n", ec.desc, result)
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("ALL TESTS COMPLETED!")
	fmt.Println(strings.Repeat("=", 60))
}

// bitLength returns the number of bits needed to represent n
func bitLength(n int) int {
	if n == 0 {
		return 0
	}
	count := 0
	for n > 0 {
		count++
		n >>= 1
	}
	return count
}
