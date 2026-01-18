/*
Fibonacci with Matrix Exponentiation - Go Solutions

Compute F(n) mod (10^9 + 7) for very large n using O(log n) algorithms.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

const MOD = 1_000_000_007

// ============================================================================
// APPROACH 1: Matrix Exponentiation (Optimal)
// ============================================================================
// Time Complexity:  O(log n)
// Space Complexity: O(1)
//
// WHY THIS IS BEST:
// - Handles n up to 10^18 efficiently
// - Uses binary exponentiation for matrix powers
// - Essential technique for competitive programming
// ============================================================================

// Matrix represents a 2x2 matrix with modular arithmetic
type Matrix [2][2]int64

// multiply performs matrix multiplication with modulo
func multiply(a, b Matrix) Matrix {
	var result Matrix
	for i := 0; i < 2; i++ {
		for j := 0; j < 2; j++ {
			for k := 0; k < 2; k++ {
				result[i][j] = (result[i][j] + a[i][k]*b[k][j]) % MOD
			}
		}
	}
	return result
}

// matrixPow computes matrix^n using binary exponentiation
func matrixPow(m Matrix, n int64) Matrix {
	// Identity matrix
	result := Matrix{{1, 0}, {0, 1}}

	for n > 0 {
		if n%2 == 1 {
			result = multiply(result, m)
		}
		m = multiply(m, m)
		n /= 2
	}

	return result
}

// FibonacciMatrix computes F(n) mod MOD using matrix exponentiation.
//
// Key insight:
// [F(n+1) F(n)  ]   [1 1]^n
// [F(n)   F(n-1)] = [1 0]
//
// Therefore: F(n) = (base^n)[0][1] or [1][0]
func FibonacciMatrix(n int64) int64 {
	if n == 0 {
		return 0
	}
	if n <= 2 {
		return 1
	}

	// Base transformation matrix
	base := Matrix{{1, 1}, {1, 0}}

	// Compute base^(n-1)
	result := matrixPow(base, n-1)

	// F(n) is at position [0][0] after raising to power n-1
	return result[0][0]
}

// ============================================================================
// APPROACH 2: Fast Doubling
// ============================================================================
// Time Complexity:  O(log n)
// Space Complexity: O(log n) for recursion stack
//
// Uses mathematical identities:
// F(2k) = F(k) * [2*F(k+1) - F(k)]
// F(2k+1) = F(k+1)^2 + F(k)^2
// ============================================================================

// FibonacciFastDoubling uses the fast doubling method.
func FibonacciFastDoubling(n int64) int64 {
	if n == 0 {
		return 0
	}

	// Returns (F(n), F(n+1))
	var fib func(k int64) (int64, int64)
	fib = func(k int64) (int64, int64) {
		if k == 0 {
			return 0, 1
		}

		// Get F(k/2) and F(k/2 + 1)
		a, b := fib(k / 2)

		// F(2k) = F(k) * [2*F(k+1) - F(k)]
		c := a * ((2*b - a + MOD) % MOD) % MOD

		// F(2k+1) = F(k+1)^2 + F(k)^2
		d := (a*a + b*b) % MOD

		if k%2 == 0 {
			return c, d
		}
		return d, (c + d) % MOD
	}

	result, _ := fib(n)
	return result
}

// ============================================================================
// APPROACH 3: Iterative with Bit Manipulation
// ============================================================================
// Time Complexity:  O(log n)
// Space Complexity: O(1)
//
// Same as fast doubling but iterative using bit manipulation.
// ============================================================================

// FibonacciIterative uses iterative fast doubling.
func FibonacciIterative(n int64) int64 {
	if n == 0 {
		return 0
	}

	// Find the highest bit position
	var highBit int64 = 1
	for highBit <= n/2 {
		highBit <<= 1
	}

	a, b := int64(0), int64(1) // F(0), F(1)

	for highBit > 0 {
		// Fast doubling formulas
		// F(2k) = F(k) * [2*F(k+1) - F(k)]
		// F(2k+1) = F(k+1)^2 + F(k)^2
		d := a * ((2*b - a + MOD) % MOD) % MOD
		e := (a*a + b*b) % MOD

		a, b = d, e

		if n&highBit != 0 {
			// Add 1 to the index: F(k+1) = F(k) + F(k-1)
			a, b = b, (a+b)%MOD
		}

		highBit >>= 1
	}

	return a
}

// ============================================================================
// APPROACH 4: Standard Iterative (For Comparison)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// Only works for smaller n values.
// ============================================================================

// FibonacciStandard uses the standard iterative approach.
func FibonacciStandard(n int64) int64 {
	if n == 0 {
		return 0
	}
	if n <= 2 {
		return 1
	}

	var a, b int64 = 0, 1

	for i := int64(2); i <= n; i++ {
		a, b = b, (a+b)%MOD
	}

	return b
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	// Test cases with known values
	testCases := []struct {
		n        int64
		expected int64
		desc     string
	}{
		{0, 0, "F(0)"},
		{1, 1, "F(1)"},
		{2, 1, "F(2)"},
		{10, 55, "F(10)"},
		{20, 6765, "F(20)"},
		{50, 12586269025 % MOD, "F(50)"},
		{100, 687995182, "F(100) mod 10^9+7"},
	}

	approaches := []struct {
		name string
		fn   func(int64) int64
	}{
		{"Matrix Exponentiation", FibonacciMatrix},
		{"Fast Doubling (Recursive)", FibonacciFastDoubling},
		{"Fast Doubling (Iterative)", FibonacciIterative},
		{"Standard Iterative", FibonacciStandard},
	}

	fmt.Println("======================================================================")
	fmt.Println("FIBONACCI WITH MATRIX EXPONENTIATION - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.n)
			status := "PASS"
			if result != tc.expected {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, result, tc.expected)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		}
	}

	// Demonstrate large n computation
	fmt.Println("\n======================================================================")
	fmt.Println("LARGE N DEMONSTRATION (Matrix Exponentiation)")
	fmt.Println("======================================================================")

	largeN := []int64{1000, 1_000_000, 1_000_000_000, 1_000_000_000_000}

	for _, n := range largeN {
		result := FibonacciMatrix(n)
		fmt.Printf("\nF(%d) mod 10^9+7 = %d\n", n, result)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE OUTPUT")
	fmt.Println("======================================================================")

	fmt.Println("\nInput: n = 10")
	fmt.Printf("Output: %d\n", FibonacciMatrix(10))

	fmt.Println("\nInput: n = 1000000000")
	fmt.Printf("Output: %d\n", FibonacciMatrix(1_000_000_000))

	fmt.Println("\nInput: n = 0")
	fmt.Printf("Output: %d\n", FibonacciMatrix(0))
}
