/*
Non-Constructible Change - Go Solutions

Find the minimum amount of change that cannot be created from given coins.

This file contains MULTIPLE solution approaches with explanations.
*/

package main

import (
	"fmt"
	"sort"
)

// ============================================================================
// APPROACH 1: Greedy with Sorting ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(n log n) - dominated by sorting
// Space Complexity: O(1) - in-place sorting
//
// WHY THIS IS BEST:
// - Elegant single-pass solution after sorting
// - No DP table or recursion needed
// - Optimal time complexity for this problem
// ============================================================================

// NonConstructibleChange finds minimum change that cannot be created.
//
// Key Insight:
// If you can make all values from 1 to N, and the next coin C ≤ N+1,
// then you can make all values from 1 to (N + C).
//
// If the next coin C > N+1, you cannot make N+1 (there's a gap).
//
// How it works:
//  1. Sort coins ascending (process small coins first)
//  2. Track currentChange = max value we can make
//  3. For each coin:
//     - If coin > currentChange + 1 → gap found, return currentChange + 1
//     - Else extend range: currentChange += coin
//  4. Return currentChange + 1 (next value after our range)
//
// Visual:
//
//	coins = [1, 1, 2, 5] (sorted)
//
//	Start: currentChange = 0
//	Coin 1: 1 ≤ 1? YES → currentChange = 1 (can make 1-1)
//	Coin 1: 1 ≤ 2? YES → currentChange = 2 (can make 1-2)
//	Coin 2: 2 ≤ 3? YES → currentChange = 4 (can make 1-4)
//	Coin 5: 5 ≤ 5? YES → currentChange = 9 (can make 1-9)
//	Return: 10
func NonConstructibleChange(coins []int) int {
	if len(coins) == 0 {
		return 1
	}

	sort.Ints(coins)
	currentChange := 0

	for _, coin := range coins {
		// If current coin is larger than currentChange + 1,
		// we cannot make currentChange + 1 (there's a gap!)
		if coin > currentChange+1 {
			return currentChange + 1
		}

		// We can extend our range by adding this coin
		currentChange += coin
	}

	// We can make all values from 1 to currentChange
	// So the answer is currentChange + 1
	return currentChange + 1
}

// ============================================================================
// APPROACH 2: Dynamic Programming (Subset Sum)
// ============================================================================
// Time Complexity:  O(n * S) where S is sum of all coins
// Space Complexity: O(S) for the DP array
//
// WHEN TO USE:
// - When you need to track WHICH amounts are constructible
// - Educational to understand subset sum connection
//
// WHY GREEDY IS BETTER:
// - DP uses O(S) space where S can be huge
// - DP is O(n*S) vs O(n log n) for greedy
// ============================================================================

// NonConstructibleChangeDP finds minimum non-constructible change using DP.
//
// This is the subset sum approach - less efficient but educational.
func NonConstructibleChangeDP(coins []int) int {
	if len(coins) == 0 {
		return 1
	}

	total := 0
	for _, coin := range coins {
		total += coin
	}

	dp := make([]bool, total+2)
	dp[0] = true

	for _, coin := range coins {
		// Process from high to low to avoid using same coin twice
		for amount := total; amount >= coin; amount-- {
			if dp[amount-coin] {
				dp[amount] = true
			}
		}
	}

	// Find smallest positive amount we cannot make
	for i := 1; i <= total+1; i++ {
		if !dp[i] {
			return i
		}
	}

	return total + 1
}

// ============================================================================
// APPROACH 3: Brute Force (Educational Only)
// ============================================================================
// Time Complexity:  O(2^n) - all subsets
// Space Complexity: O(n) for the set
//
// DON'T USE THIS:
// - Only for understanding why greedy is better
// - Impractical for n > 20
// ============================================================================

// NonConstructibleChangeBruteForce uses exponential approach (don't use).
func NonConstructibleChangeBruteForce(coins []int) int {
	if len(coins) == 0 {
		return 1
	}

	n := len(coins)
	achievable := make(map[int]bool)
	achievable[0] = true

	// Try all 2^n subsets
	for mask := 1; mask < (1 << n); mask++ {
		subsetSum := 0
		for i := 0; i < n; i++ {
			if mask&(1<<i) != 0 {
				subsetSum += coins[i]
			}
		}
		achievable[subsetSum] = true
	}

	// Find smallest positive integer not in achievable
	result := 1
	for achievable[result] {
		result++
	}

	return result
}

// ============================================================================
// EDUCATIONAL: Detailed Walkthrough
// ============================================================================

// NonConstructibleChangeExplained shows step-by-step solution process.
func NonConstructibleChangeExplained(coins []int) int {
	fmt.Printf("Input coins: %v\n", coins)

	if len(coins) == 0 {
		fmt.Println("Empty array → return 1")
		return 1
	}

	sort.Ints(coins)
	fmt.Printf("After sorting: %v\n", coins)

	currentChange := 0
	fmt.Printf("\nStarting with currentChange = 0\n")
	fmt.Println("(This means we can make amounts from 1 to 0, i.e., nothing yet)\n")

	for _, coin := range coins {
		fmt.Printf("Processing coin: %d\n", coin)
		fmt.Printf("  Check: Is %d > %d + 1 = %d?\n", coin, currentChange, currentChange+1)

		if coin > currentChange+1 {
			fmt.Printf("  YES! Coin %d is too big!\n", coin)
			fmt.Printf("  We cannot make %d\n", currentChange+1)
			fmt.Printf("  → Answer: %d\n", currentChange+1)
			return currentChange + 1
		}

		fmt.Printf("  NO, %d ≤ %d\n", coin, currentChange+1)
		currentChange += coin
		fmt.Printf("  Extend range: currentChange = %d\n", currentChange)
		fmt.Printf("  We can now make all amounts from 1 to %d\n\n", currentChange)
	}

	result := currentChange + 1
	fmt.Println("Processed all coins!")
	fmt.Printf("Can make 1 to %d\n", currentChange)
	fmt.Printf("→ Answer: %d (first amount we cannot make)\n", result)
	return result
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		coins    []int
		expected int
		desc     string
	}{
		{[]int{5, 7, 1, 1, 2, 3, 22}, 20, "Example from problem"},
		{[]int{1, 1, 1, 1, 1}, 6, "All ones"},
		{[]int{1, 5, 1, 1, 1, 10, 15, 20, 100}, 55, "Mixed coins"},
		{[]int{}, 1, "Empty array"},
		{[]int{2, 3, 5}, 1, "No coin of value 1"},
		{[]int{1}, 2, "Single coin"},
		{[]int{1, 2, 4}, 8, "Powers of 2"},
		{[]int{1, 2, 3, 4, 5}, 16, "Consecutive coins"},
	}

	approaches := []struct {
		name string
		fn   func([]int) int
	}{
		{"Greedy + Sort (Recommended)", NonConstructibleChange},
		{"Dynamic Programming", NonConstructibleChangeDP},
		{"Brute Force", NonConstructibleChangeBruteForce},
	}

	fmt.Println("======================================================================")
	fmt.Println("NON-CONSTRUCTIBLE CHANGE - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			// Copy slice to avoid modification
			coins := make([]int, len(tc.coins))
			copy(coins, tc.coins)

			result := approach.fn(coins)
			status := "✓"
			if result != tc.expected {
				status = "✗"
				allPassed = false
			}
			fmt.Printf("  %s %s: %d\n", status, tc.desc, result)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		} else {
			fmt.Println("  Some tests failed!")
		}
	}

	fmt.Println("\n======================================================================")
	fmt.Println("DETAILED WALKTHROUGH")
	fmt.Println("======================================================================")
	fmt.Println()
	NonConstructibleChangeExplained([]int{5, 7, 1, 1, 2, 3, 22})

	fmt.Println("\n======================================================================")
	fmt.Println("COMPLEXITY COMPARISON")
	fmt.Println("======================================================================")
	fmt.Println(`
    ┌────────────────────────┬───────────┬──────────┬──────────────────┐
    │       Approach         │   Time    │  Space   │  Recommendation  │
    ├────────────────────────┼───────────┼──────────┼──────────────────┤
    │ 1. Greedy + Sort       │ O(n log n)│   O(1)   │  ⭐ BEST CHOICE  │
    │ 2. Dynamic Programming │  O(n * S) │   O(S)   │  ⚠️ Overkill     │
    │ 3. Brute Force         │   O(2^n)  │   O(n)   │  ✗ Don't use     │
    └────────────────────────┴───────────┴──────────┴──────────────────┘

    Where: n = number of coins, S = sum of all coin values
    `)
}
