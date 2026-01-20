/*
Kth Permutation Sequence - Go Solutions

Given n and k, return the k-th permutation sequence of [1, 2, ..., n].

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"strconv"
	"strings"
)

// ============================================================================
// APPROACH 1: Factorial Number System (Optimal)
// ============================================================================
// Time Complexity:  O(n^2) - n iterations, each with O(n) slice removal
// Space Complexity: O(n) - for available slice and result
//
// WHY THIS IS BEST:
// - Directly calculates the k-th permutation without generating all permutations
// - Much faster than naive approach for large n
// - Clean mathematical solution
// ============================================================================

// GetPermutation returns the k-th permutation sequence of [1, 2, ..., n].
//
// Uses the factorial number system to directly calculate each digit.
// The key insight is that permutations are grouped by their first digit:
// - With n-1 remaining digits, there are (n-1)! permutations starting with each digit
// - We can determine which digit goes in each position using integer division
func GetPermutation(n int, k int) string {
	// Precompute factorials
	factorials := make([]int, n+1)
	factorials[0] = 1
	for i := 1; i <= n; i++ {
		factorials[i] = factorials[i-1] * i
	}

	// Available digits to choose from
	available := make([]int, n)
	for i := 0; i < n; i++ {
		available[i] = i + 1
	}

	// Convert to 0-indexed for easier math
	k--

	var result strings.Builder

	for i := 0; i < n; i++ {
		// Size of each block at this level
		blockSize := factorials[n-1-i]

		// Which block does k fall into?
		index := k / blockSize

		// Pick the digit at that index
		result.WriteString(strconv.Itoa(available[index]))

		// Remove the picked digit from available
		available = append(available[:index], available[index+1:]...)

		// Update k to position within the block
		k %= blockSize
	}

	return result.String()
}

// ============================================================================
// APPROACH 2: Recursive Solution
// ============================================================================
// Time Complexity:  O(n^2)
// Space Complexity: O(n) for recursion stack
//
// WHEN TO USE:
// - When recursive thinking is more intuitive
// - Same logic, different implementation
// ============================================================================

// GetPermutationRecursive is a recursive version of the algorithm.
func GetPermutationRecursive(n int, k int) string {
	// Precompute factorials
	factorials := make([]int, n+1)
	factorials[0] = 1
	for i := 1; i <= n; i++ {
		factorials[i] = factorials[i-1] * i
	}

	available := make([]int, n)
	for i := 0; i < n; i++ {
		available[i] = i + 1
	}

	var solve func(remaining int, k int, avail []int) string
	solve = func(remaining int, k int, avail []int) string {
		if remaining == 0 {
			return ""
		}

		// Block size for current position
		blockSize := factorials[remaining-1]

		// Which digit to pick
		index := k / blockSize
		digit := avail[index]

		// Remove picked digit (create new slice)
		newAvail := make([]int, len(avail)-1)
		copy(newAvail[:index], avail[:index])
		copy(newAvail[index:], avail[index+1:])

		// Recurse for remaining positions
		return strconv.Itoa(digit) + solve(remaining-1, k%blockSize, newAvail)
	}

	return solve(n, k-1, available) // Convert to 0-indexed
}

// ============================================================================
// APPROACH 3: Iterative with Pre-built Factorial Array
// ============================================================================
// Time Complexity:  O(n^2)
// Space Complexity: O(n)
//
// WHEN TO USE:
// - Cleaner iterative version
// - Explicit factorial computation for clarity
// ============================================================================

// GetPermutationIterative is an explicit iterative implementation.
func GetPermutationIterative(n int, k int) string {
	// Compute factorial inline
	factorial := func(x int) int {
		result := 1
		for i := 2; i <= x; i++ {
			result *= i
		}
		return result
	}

	available := make([]int, n)
	for i := 0; i < n; i++ {
		available[i] = i + 1
	}

	k-- // 0-indexed

	var result strings.Builder

	for i := n; i > 0; i-- {
		// i is the count of remaining digits
		blockSize := factorial(i - 1)
		index := k / blockSize

		result.WriteString(strconv.Itoa(available[index]))

		// Remove element at index
		available = append(available[:index], available[index+1:]...)

		k %= blockSize
	}

	return result.String()
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// factorial computes n!
func factorial(n int) int {
	result := 1
	for i := 2; i <= n; i++ {
		result *= i
	}
	return result
}

// explainPermutation shows step-by-step calculation
func explainPermutation(n int, k int) {
	fmt.Printf("\nFinding the %dth permutation of [1, 2, ..., %d]\n", k, n)
	fmt.Println(strings.Repeat("=", 50))

	// Precompute factorials
	factorials := make([]int, n+1)
	factorials[0] = 1
	for i := 1; i <= n; i++ {
		factorials[i] = factorials[i-1] * i
	}

	fmt.Printf("\nFactorials: %v\n", factorials)

	available := make([]int, n)
	for i := 0; i < n; i++ {
		available[i] = i + 1
	}
	fmt.Printf("Available digits: %v\n", available)

	kOrig := k
	k-- // Convert to 0-indexed
	fmt.Printf("\nConvert to 0-indexed: k = %d\n", k)

	var result []string

	for i := 0; i < n; i++ {
		blockSize := factorials[n-1-i]
		index := k / blockSize

		fmt.Printf("\nPosition %d:\n", i)
		fmt.Printf("  Block size = %d! = %d\n", n-1-i, blockSize)
		fmt.Printf("  Index = %d // %d = %d\n", k, blockSize, index)
		fmt.Printf("  Available = %v\n", available)
		fmt.Printf("  Pick available[%d] = %d\n", index, available[index])

		result = append(result, strconv.Itoa(available[index]))
		available = append(available[:index], available[index+1:]...)

		k %= blockSize
		fmt.Printf("  Update k = %d, remaining = %v\n", k, available)
		fmt.Printf("  Result so far: %s\n", strings.Join(result, ""))
	}

	fmt.Printf("\nFinal Answer: %s\n", strings.Join(result, ""))
	fmt.Printf("\nThe %dth permutation of [1..%d] is %s\n", kOrig, n, strings.Join(result, ""))
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	type testCase struct {
		n        int
		k        int
		expected string
		desc     string
	}

	testCases := []testCase{
		{3, 3, "213", "n=3, k=3"},
		{4, 9, "2314", "n=4, k=9"},
		{3, 1, "123", "First permutation"},
		{3, 6, "321", "Last permutation of n=3"},
		{4, 1, "1234", "First permutation of n=4"},
		{4, 24, "4321", "Last permutation of n=4"},
		{2, 1, "12", "n=2, k=1"},
		{2, 2, "21", "n=2, k=2"},
		{1, 1, "1", "Single element"},
	}

	type approach struct {
		name string
		fn   func(int, int) string
	}

	approaches := []approach{
		{"Factorial System (Optimal)", GetPermutation},
		{"Recursive", GetPermutationRecursive},
		{"Iterative", GetPermutationIterative},
	}

	fmt.Println("======================================================================")
	fmt.Println("KTH PERMUTATION SEQUENCE - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, appr := range approaches {
		fmt.Printf("\n%s:\n", appr.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := appr.fn(tc.n, tc.k)
			status := "PASS"
			if result != tc.expected {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  [%s] %s: got '%s', expected '%s'\n", status, tc.desc, result, tc.expected)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		}
	}

	// Show all permutations for n=3
	fmt.Println("\n======================================================================")
	fmt.Println("ALL PERMUTATIONS IN ORDER (n=3)")
	fmt.Println("======================================================================")

	n := 3
	fmt.Printf("\nPermutations of [1, 2, ..., %d]:\n", n)
	for k := 1; k <= factorial(n); k++ {
		fmt.Printf("  k=%d: %s\n", k, GetPermutation(n, k))
	}

	// Show grouping for n=4
	fmt.Println("\n======================================================================")
	fmt.Println("PERMUTATION GROUPING (n=4)")
	fmt.Println("======================================================================")

	n = 4
	groupSize := factorial(n - 1) // 3! = 6

	fmt.Printf("\nTotal permutations: %d\n", factorial(n))
	fmt.Printf("Permutations per first digit: %d\n", groupSize)

	for digit := 1; digit <= n; digit++ {
		startK := (digit-1)*groupSize + 1
		endK := digit * groupSize
		fmt.Printf("\nStarting with %d (k = %d to %d):\n", digit, startK, endK)

		for k := startK; k <= startK+2 && k <= endK; k++ {
			fmt.Printf("  k=%d: %s\n", k, GetPermutation(n, k))
		}
		if endK-startK >= 3 {
			fmt.Println("  ...")
			fmt.Printf("  k=%d: %s\n", endK, GetPermutation(n, endK))
		}
	}

	// Step-by-step explanation
	fmt.Println("\n======================================================================")
	fmt.Println("STEP-BY-STEP EXPLANATION")
	fmt.Println("======================================================================")
	explainPermutation(4, 9)

	// Sample output
	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE OUTPUT")
	fmt.Println("======================================================================")

	fmt.Println("\nInput: n = 3, k = 3")
	fmt.Printf("Output: %s\n", GetPermutation(3, 3))

	fmt.Println("\nInput: n = 4, k = 9")
	fmt.Printf("Output: %s\n", GetPermutation(4, 9))

	fmt.Println("\nInput: n = 3, k = 1")
	fmt.Printf("Output: %s\n", GetPermutation(3, 1))
}
