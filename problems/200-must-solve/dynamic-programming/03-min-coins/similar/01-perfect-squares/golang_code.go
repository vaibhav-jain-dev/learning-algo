/*
Perfect Squares - Go Solutions

Find minimum perfect squares that sum to n.
This is Coin Change with squares as coins.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"math"
)

// ============================================================================
// APPROACH 1: Bottom-Up Dynamic Programming
// ============================================================================
// Time Complexity:  O(n * sqrt(n))
// Space Complexity: O(n)
//
// WHY THIS IS BEST:
// - Straightforward coin change adaptation
// - Easy to understand and implement
// - Good for general use
// ============================================================================

// NumSquares finds minimum perfect squares summing to n.
//
// Key Insight: This is Coin Change where coins are perfect squares.
//
// Visual for n = 12:
//
//	Squares: [1, 4, 9]
//	dp[12] = min(dp[11]+1, dp[8]+1, dp[3]+1) = min(4, 3, 4) = 3
//	Answer: 12 = 4 + 4 + 4
func NumSquares(n int) int {
	// dp[i] = minimum squares needed to sum to i
	dp := make([]int, n+1)

	// Initialize with max value (except dp[0])
	for i := 1; i <= n; i++ {
		dp[i] = math.MaxInt32
	}

	// Fill DP table
	for i := 1; i <= n; i++ {
		// Try each perfect square <= i
		for j := 1; j*j <= i; j++ {
			square := j * j
			dp[i] = min(dp[i], dp[i-square]+1)
		}
	}

	return dp[n]
}

// ============================================================================
// APPROACH 2: BFS (Level-by-Level)
// ============================================================================
// Time Complexity:  O(n * sqrt(n))
// Space Complexity: O(n)
//
// WHEN TO USE:
// - When you want to think of it as shortest path
// - BFS naturally finds minimum depth (minimum squares)
// ============================================================================

// NumSquaresBFS uses BFS to find minimum squares.
func NumSquaresBFS(n int) int {
	if n == 0 {
		return 0
	}

	// Precompute squares
	squares := []int{}
	for i := 1; i*i <= n; i++ {
		squares = append(squares, i*i)
	}

	// BFS
	visited := make([]bool, n+1)
	queue := []int{n}
	visited[n] = true
	level := 0

	for len(queue) > 0 {
		level++
		size := len(queue)

		for i := 0; i < size; i++ {
			curr := queue[0]
			queue = queue[1:]

			for _, sq := range squares {
				next := curr - sq
				if next == 0 {
					return level
				}
				if next > 0 && !visited[next] {
					visited[next] = true
					queue = append(queue, next)
				}
			}
		}
	}

	return level
}

// ============================================================================
// APPROACH 3: Mathematical (Lagrange's Four Square Theorem)
// ============================================================================
// Time Complexity:  O(sqrt(n))
// Space Complexity: O(1)
//
// WHEN TO USE:
// - When optimal performance is needed
// - Relies on number theory knowledge
// ============================================================================

// NumSquaresMath uses Lagrange's Four Square Theorem.
//
// Key theorems:
// 1. Every positive integer is sum of at most 4 squares
// 2. n is sum of 3 squares iff n is NOT of form 4^a(8b+7)
// 3. n is sum of 2 squares iff in prime factorization, primes of form 4k+3
//
//	appear with even exponent
func NumSquaresMath(n int) int {
	// Check if n itself is a perfect square
	if isSquare(n) {
		return 1
	}

	// Check if n is of form 4^a(8b+7) - then answer is 4
	// Remove factors of 4
	temp := n
	for temp%4 == 0 {
		temp /= 4
	}
	if temp%8 == 7 {
		return 4
	}

	// Check if sum of two squares
	for i := 1; i*i <= n; i++ {
		if isSquare(n - i*i) {
			return 2
		}
	}

	return 3
}

func isSquare(n int) bool {
	sqrt := int(math.Sqrt(float64(n)))
	return sqrt*sqrt == n
}

// ============================================================================
// BONUS: Find the actual squares
// ============================================================================

// NumSquaresWithDecomposition returns minimum squares and the actual squares.
func NumSquaresWithDecomposition(n int) (int, []int) {
	// dp[i] = minimum squares needed for i
	dp := make([]int, n+1)
	// parent[i] = which square was used to reach i optimally
	parent := make([]int, n+1)

	for i := 1; i <= n; i++ {
		dp[i] = math.MaxInt32
	}

	for i := 1; i <= n; i++ {
		for j := 1; j*j <= i; j++ {
			sq := j * j
			if dp[i-sq]+1 < dp[i] {
				dp[i] = dp[i-sq] + 1
				parent[i] = sq
			}
		}
	}

	// Reconstruct the squares
	squares := []int{}
	curr := n
	for curr > 0 {
		squares = append(squares, parent[curr])
		curr -= parent[curr]
	}

	return dp[n], squares
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
		{12, 3, "Example 1: 4+4+4"},
		{13, 2, "Example 2: 4+9"},
		{1, 1, "Perfect square itself"},
		{2, 2, "1+1"},
		{4, 1, "Perfect square 4"},
		{7, 4, "4+1+1+1 (Legendre form)"},
		{100, 1, "10^2"},
		{99, 3, "81+9+9"},
	}

	approaches := []struct {
		name string
		fn   func(int) int
	}{
		{"Bottom-Up DP", NumSquares},
		{"BFS", NumSquaresBFS},
		{"Mathematical", NumSquaresMath},
	}

	fmt.Println("======================================================================")
	fmt.Println("PERFECT SQUARES - TEST RESULTS")
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

	// Show decomposition
	fmt.Println("\n======================================================================")
	fmt.Println("DECOMPOSITION EXAMPLES")
	fmt.Println("======================================================================")
	for _, n := range []int{12, 13, 99} {
		count, squares := NumSquaresWithDecomposition(n)
		fmt.Printf("\nn = %d: %d squares\n", n, count)
		fmt.Printf("Squares: %v\n", squares)
		sum := 0
		expr := ""
		for i, sq := range squares {
			sum += sq
			if i > 0 {
				expr += " + "
			}
			expr += fmt.Sprintf("%d", sq)
		}
		fmt.Printf("Verification: %s = %d\n", expr, sum)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	// Sample Input 1
	n := 12
	fmt.Printf("\nInput: n = %d\n", n)
	fmt.Printf("Output: %d\n", NumSquares(n))

	// Sample Input 2
	n = 13
	fmt.Printf("\nInput: n = %d\n", n)
	fmt.Printf("Output: %d\n", NumSquares(n))
}
