/*
N-th Tribonacci Number - Go Solutions

T(n) = T(n-1) + T(n-2) + T(n-3) with T(0)=0, T(1)=1, T(2)=1

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Iterative (Optimal) - RECOMMENDED
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// WHY THIS IS BEST:
// - Only uses 3 variables (constant space)
// - Simple sliding window technique
// - No recursion overhead or stack space
// ============================================================================

// Tribonacci computes the n-th Tribonacci number iteratively.
//
// Key insight: We only need the last 3 values at any point.
// Slide the window forward as we compute each new value.
func Tribonacci(n int) int {
	// Base cases
	if n == 0 {
		return 0
	}
	if n <= 2 {
		return 1
	}

	// Track last 3 values: T(i-3), T(i-2), T(i-1)
	a, b, c := 0, 1, 1

	for i := 3; i <= n; i++ {
		// T(i) = T(i-1) + T(i-2) + T(i-3)
		next := a + b + c
		// Slide window forward
		a, b, c = b, c, next
	}

	return c
}

// ============================================================================
// APPROACH 2: Memoization (Top-Down DP)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) for cache + recursion stack
//
// WHEN TO USE:
// - When top-down thinking is more intuitive
// - When only computing sparse values (not all 0 to n)
// ============================================================================

// TribonacciMemo uses memoization to avoid recomputation.
func TribonacciMemo(n int) int {
	memo := make(map[int]int)

	var dp func(i int) int
	dp = func(i int) int {
		// Base cases
		if i == 0 {
			return 0
		}
		if i <= 2 {
			return 1
		}

		// Check cache
		if val, exists := memo[i]; exists {
			return val
		}

		// Compute and cache
		result := dp(i-1) + dp(i-2) + dp(i-3)
		memo[i] = result
		return result
	}

	return dp(n)
}

// ============================================================================
// APPROACH 3: Matrix Exponentiation - O(log n)
// ============================================================================
// Time Complexity:  O(log n)
// Space Complexity: O(1)
//
// WHEN TO USE:
// - When n is extremely large (millions or billions)
// - When O(n) is too slow
//
// The key insight is that:
// [T(n+2)]   [1 1 1]^n   [T(2)]   [1]
// [T(n+1)] = [1 0 0]   * [T(1)] = [1]
// [T(n)  ]   [0 1 0]     [T(0)]   [0]
// ============================================================================

// Matrix represents a 3x3 matrix
type Matrix [3][3]int

// multiply performs matrix multiplication
func multiply(a, b Matrix) Matrix {
	var result Matrix
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			for k := 0; k < 3; k++ {
				result[i][j] += a[i][k] * b[k][j]
			}
		}
	}
	return result
}

// matrixPow computes matrix^n using binary exponentiation
func matrixPow(m Matrix, n int) Matrix {
	// Identity matrix
	result := Matrix{
		{1, 0, 0},
		{0, 1, 0},
		{0, 0, 1},
	}

	for n > 0 {
		if n%2 == 1 {
			result = multiply(result, m)
		}
		m = multiply(m, m)
		n /= 2
	}

	return result
}

// TribonacciMatrix computes T(n) in O(log n) time using matrix exponentiation.
func TribonacciMatrix(n int) int {
	if n == 0 {
		return 0
	}
	if n <= 2 {
		return 1
	}

	// Transformation matrix
	m := Matrix{
		{1, 1, 1},
		{1, 0, 0},
		{0, 1, 0},
	}

	// Compute M^(n-2) and apply to initial vector [1, 1, 0]
	result := matrixPow(m, n-2)

	// T(n) = result[0][0]*T(2) + result[0][1]*T(1) + result[0][2]*T(0)
	//      = result[0][0]*1 + result[0][1]*1 + result[0][2]*0
	return result[0][0] + result[0][1]
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		n        int
		expected int
		desc     string
	}{
		{0, 0, "T(0) = 0"},
		{1, 1, "T(1) = 1"},
		{2, 1, "T(2) = 1"},
		{3, 2, "T(3) = 0+1+1 = 2"},
		{4, 4, "T(4) = 1+1+2 = 4"},
		{5, 7, "T(5) = 1+2+4 = 7"},
		{10, 149, "T(10)"},
		{25, 1389537, "T(25) - larger value"},
	}

	approaches := []struct {
		name string
		fn   func(int) int
	}{
		{"Iterative (Optimal)", Tribonacci},
		{"Memoization", TribonacciMemo},
		{"Matrix Exponentiation", TribonacciMatrix},
	}

	fmt.Println("======================================================================")
	fmt.Println("N-TH TRIBONACCI NUMBER - TEST RESULTS")
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

	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE OUTPUT")
	fmt.Println("======================================================================")

	fmt.Println("\nInput: n = 4")
	fmt.Printf("Output: %d\n", Tribonacci(4))

	fmt.Println("\nInput: n = 25")
	fmt.Printf("Output: %d\n", Tribonacci(25))

	fmt.Println("\nInput: n = 0")
	fmt.Printf("Output: %d\n", Tribonacci(0))
}
