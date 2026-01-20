/*
Integer Break - Go Solutions

Given n, break it into sum of at least 2 positive integers and maximize the product.
Demonstrates the connection between DP optimization and mathematical insights.

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
// Time Complexity:  O(n^2)
// Space Complexity: O(n)
//
// WHY THIS IS STANDARD:
// - Clear recurrence relation
// - Works for any constraint variations
// - Easy to understand the state transitions
// ============================================================================

// IntegerBreak finds maximum product by breaking n into at least 2 positive integers.
//
// Key Insight: dp[i] = max product obtainable by breaking i
// For each i, try all possible first pieces j, then either:
//   - Keep (i-j) as is: j * (i-j)
//   - Break (i-j) further: j * dp[i-j]
//
// Visual for n = 10:
//
//	dp[10] = max over j of max(j*(10-j), j*dp[10-j])
//	Best: j=3, dp[7]=12 -> 3*12 = 36
//	Split: 10 = 3 + 3 + 4
func IntegerBreak(n int) int {
	if n <= 3 {
		return n - 1 // Must break: 2=1+1->1, 3=1+2->2
	}

	// dp[i] = max product when breaking i
	dp := make([]int, n+1)
	dp[1] = 1
	dp[2] = 1
	dp[3] = 2

	for i := 4; i <= n; i++ {
		// Try each possible first piece j
		for j := 1; j < i; j++ {
			// Two choices: keep (i-j) whole OR break it further
			product := max(j*(i-j), j*dp[i-j])
			dp[i] = max(dp[i], product)
		}
	}

	return dp[n]
}

// ============================================================================
// APPROACH 2: Optimized DP (Only Try 2 and 3)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n)
//
// WHY THIS WORKS:
// - Mathematical insight: only 2s and 3s matter
// - 1 is never optimal (kills product)
// - Numbers >= 4 should be broken (4 = 2+2, 5 = 2+3, etc.)
// ============================================================================

// IntegerBreakOptimizedDP uses optimized DP with only 2 and 3.
func IntegerBreakOptimizedDP(n int) int {
	if n <= 3 {
		return n - 1
	}

	dp := make([]int, n+1)
	// Base cases: these are values when NOT forced to break
	dp[1] = 1
	dp[2] = 2 // 2 itself (when used as part of larger number)
	dp[3] = 3 // 3 itself (when used as part of larger number)

	for i := 4; i <= n; i++ {
		// Only try breaking off 2 or 3
		dp[i] = max(2*dp[i-2], 3*dp[i-3])
	}

	return dp[n]
}

// ============================================================================
// APPROACH 3: Mathematical (Greedy with 3s)
// ============================================================================
// Time Complexity:  O(log n) for power calculation
// Space Complexity: O(1)
//
// WHEN TO USE:
// - When you understand the math
// - Optimal performance needed
// - Interview "aha" moment solution
// ============================================================================

// IntegerBreakMath uses pure mathematical solution with the 3s rule.
//
// Mathematical Insight:
//   - The number e (approximately 2.718) maximizes x^(n/x)
//   - Since we need integers, 3 is optimal (closest to e)
//   - Exception: if remainder is 1, use one less 3 and add a 4
//
// Rules:
//   - n % 3 == 0: Use all 3s -> 3^(n/3)
//   - n % 3 == 1: One 4 and rest 3s -> 4 * 3^((n-4)/3)
//   - n % 3 == 2: One 2 and rest 3s -> 2 * 3^((n-2)/3)
func IntegerBreakMath(n int) int {
	if n <= 3 {
		return n - 1
	}

	quotient := n / 3
	remainder := n % 3

	switch remainder {
	case 0:
		// All 3s
		return power(3, quotient)
	case 1:
		// One 4 (or two 2s) and rest 3s
		return 4 * power(3, quotient-1)
	default: // remainder == 2
		// One 2 and rest 3s
		return 2 * power(3, quotient)
	}
}

// power calculates base^exp using fast exponentiation
func power(base, exp int) int {
	result := 1
	for exp > 0 {
		if exp%2 == 1 {
			result *= base
		}
		base *= base
		exp /= 2
	}
	return result
}

// ============================================================================
// APPROACH 4: Memoization (Top-Down)
// ============================================================================
// Time Complexity:  O(n^2)
// Space Complexity: O(n)
//
// WHEN TO USE:
// - More intuitive recursive thinking
// - When you want to show the recurrence clearly
// ============================================================================

// IntegerBreakMemo uses top-down DP with memoization.
func IntegerBreakMemo(n int) int {
	if n <= 3 {
		return n - 1
	}

	memo := make([]int, n+1)
	for i := range memo {
		memo[i] = -1
	}

	var dp func(num int) int
	dp = func(num int) int {
		if num <= 3 {
			return num // When used as part, don't force break
		}

		if memo[num] != -1 {
			return memo[num]
		}

		maxProduct := 0
		for j := 2; j < num; j++ {
			// Either keep (num-j) or break it
			product := max(j*(num-j), j*dp(num-j))
			maxProduct = max(maxProduct, product)
		}

		memo[num] = maxProduct
		return maxProduct
	}

	return dp(n)
}

// ============================================================================
// BONUS: Return the actual split
// ============================================================================

// IntegerBreakWithSplit returns (max_product, list_of_parts).
func IntegerBreakWithSplit(n int) (int, []int) {
	if n <= 3 {
		if n == 2 {
			return 1, []int{1, 1}
		}
		return 2, []int{1, 2}
	}

	quotient := n / 3
	remainder := n % 3

	switch remainder {
	case 0:
		// All 3s
		parts := make([]int, quotient)
		for i := range parts {
			parts[i] = 3
		}
		return power(3, quotient), parts
	case 1:
		// Use (q-1) threes and one 4
		product := 4 * power(3, quotient-1)
		parts := make([]int, quotient)
		for i := 0; i < quotient-1; i++ {
			parts[i] = 3
		}
		parts[quotient-1] = 4
		return product, parts
	default: // remainder == 2
		// One 2 and rest 3s
		product := 2 * power(3, quotient)
		parts := make([]int, quotient+1)
		for i := 0; i < quotient; i++ {
			parts[i] = 3
		}
		parts[quotient] = 2
		return product, parts
	}
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
		{2, 1, "Minimum case: 1+1"},
		{3, 2, "3 = 1+2"},
		{4, 4, "4 = 2+2"},
		{5, 6, "5 = 2+3"},
		{6, 9, "6 = 3+3"},
		{7, 12, "7 = 3+4"},
		{8, 18, "8 = 2+3+3"},
		{9, 27, "9 = 3+3+3"},
		{10, 36, "10 = 3+3+4"},
		{11, 54, "11 = 3+3+3+2"},
		{12, 81, "12 = 3+3+3+3"},
		{58, 1549681956, "Max constraint"},
	}

	approaches := []struct {
		name string
		fn   func(int) int
	}{
		{"Bottom-Up DP", IntegerBreak},
		{"Optimized DP", IntegerBreakOptimizedDP},
		{"Mathematical", IntegerBreakMath},
		{"Memoization", IntegerBreakMemo},
	}

	fmt.Println("======================================================================")
	fmt.Println("INTEGER BREAK - TEST RESULTS")
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

	// Show splits
	fmt.Println("\n======================================================================")
	fmt.Println("OPTIMAL SPLITS")
	fmt.Println("======================================================================")

	for _, n := range []int{2, 5, 8, 10, 15} {
		product, parts := IntegerBreakWithSplit(n)
		fmt.Printf("\nn = %d\n", n)

		// Format split
		splitStr := ""
		productStr := ""
		for i, p := range parts {
			if i > 0 {
				splitStr += " + "
				productStr += " x "
			}
			splitStr += fmt.Sprintf("%d", p)
			productStr += fmt.Sprintf("%d", p)
		}
		fmt.Printf("Split: %d = %s\n", n, splitStr)
		fmt.Printf("Product: %s = %d\n", productStr, product)
	}

	// Why 3s are optimal
	fmt.Println("\n======================================================================")
	fmt.Println("WHY 3s ARE OPTIMAL - COMPARISON FOR n = 12")
	fmt.Println("======================================================================")

	comparisons := []struct {
		parts []int
		desc  string
	}{
		{[]int{6, 6}, "Two 6s"},
		{[]int{4, 4, 4}, "Three 4s"},
		{[]int{3, 3, 3, 3}, "Four 3s (optimal)"},
		{[]int{2, 2, 2, 2, 2, 2}, "Six 2s"},
		{[]int{2, 5, 5}, "Mixed"},
	}

	for _, c := range comparisons {
		product := 1
		splitStr := ""
		prodStr := ""
		for i, p := range c.parts {
			product *= p
			if i > 0 {
				splitStr += " + "
				prodStr += " x "
			}
			splitStr += fmt.Sprintf("%d", p)
			prodStr += fmt.Sprintf("%d", p)
		}
		fmt.Printf("\n%s:\n", c.desc)
		fmt.Printf("  12 = %s\n", splitStr)
		fmt.Printf("  Product: %s = %d\n", prodStr, product)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	// Sample Input 1
	n := 2
	fmt.Printf("\nInput: n = %d\n", n)
	fmt.Printf("Output: %d\n", IntegerBreak(n))

	// Sample Input 2
	n = 10
	fmt.Printf("\nInput: n = %d\n", n)
	fmt.Printf("Output: %d\n", IntegerBreak(n))
}

// Verify mathematical insight about e
func verifyMathInsight() {
	fmt.Println("\n======================================================================")
	fmt.Println("MATHEMATICAL INSIGHT: WHY 3 IS OPTIMAL")
	fmt.Println("======================================================================")

	// For a sum of n, if we use k equal parts, each part is n/k
	// Product is (n/k)^k
	// Taking derivative: optimal when part size = e ≈ 2.718

	e := math.E
	fmt.Printf("\nEuler's number e ≈ %.4f\n", e)
	fmt.Println("\nComparing products for sum = 12:")

	for partSize := 2; partSize <= 4; partSize++ {
		numParts := 12 / partSize
		remainder := 12 % partSize
		product := power(partSize, numParts)
		if remainder > 0 {
			product *= remainder
		}
		fmt.Printf("  Part size %d: %d parts -> product = %d\n", partSize, numParts, product)
	}

	fmt.Println("\n3 is closest integer to e, so it gives maximum product!")
}
