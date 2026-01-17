/*
Minimum Coins to Add - Go Solutions

Given coins and a target, find minimum coins to add to make all values 1 to target.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"sort"
)

// ============================================================================
// APPROACH 1: Greedy with Gap Analysis ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(n log n) - sorting dominates
// Space Complexity: O(1) - in-place sorting
//
// WHY THIS IS BEST:
// - Greedy approach is provably optimal
// - Uses same insight as non-constructible change
// ============================================================================

// MinCoinsToAdd finds minimum coins needed to construct all values up to target.
//
// Key Insight: If we can make [1, reachable], and next coin > reachable+1,
// we need to add (reachable+1) to extend our range to [1, 2*reachable+1].
//
// Visual for coins=[1,3], target=6:
//
//	Initial: coins=[1,3], reachable=0, coinsToAdd=0
//
//	Process 1: 1 <= reachable+1? Yes → reachable=1
//	Process 3: 3 <= reachable+1? No (3>2) → Add 2, reachable=3
//	Process 3: 3 <= reachable+1? Yes → reachable=6
//
//	reachable(6) >= target(6)? Yes → Done!
//	Answer: 1 coin added
func MinCoinsToAdd(coins []int, target int) int {
	sort.Ints(coins)

	reachable := 0 // Can construct [1, reachable]
	coinsAdded := 0
	i := 0

	for reachable < target {
		if i < len(coins) && coins[i] <= reachable+1 {
			// Coin extends our range
			reachable += coins[i]
			i++
		} else {
			// Gap exists - add coin of value reachable+1
			coinsAdded++
			reachable = 2*reachable + 1 // reachable + (reachable+1)
		}
	}

	return coinsAdded
}

// ============================================================================
// APPROACH 2: Iterative Gap Filling
// ============================================================================
// Time Complexity:  O(n log n + log target)
// Space Complexity: O(1)
// ============================================================================

// MinCoinsToAddIterative uses iteration to fill gaps.
func MinCoinsToAddIterative(coins []int, target int) int {
	sort.Ints(coins)

	reachable := 0
	coinsAdded := 0
	idx := 0

	for reachable < target {
		// Skip coins we can use
		for idx < len(coins) && coins[idx] <= reachable+1 {
			reachable += coins[idx]
			idx++
		}

		// If still not enough, add optimal coin
		if reachable < target {
			coinsAdded++
			reachable = 2*reachable + 1
		}
	}

	return coinsAdded
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		coins    []int
		target   int
		expected int
		desc     string
	}{
		{[]int{1, 3}, 6, 1, "Add 2 to reach 6"},
		{[]int{1, 5, 10}, 20, 2, "Multiple gaps"},
		{[]int{1, 2, 5}, 10, 0, "No coins needed"},
		{[]int{}, 7, 3, "Empty coins: add 1,2,4"},
		{[]int{1}, 1, 0, "Already sufficient"},
		{[]int{2, 4, 8}, 15, 3, "Missing 1"},
		{[]int{1, 1, 1}, 3, 0, "Duplicates"},
	}

	fmt.Println("======================================================================")
	fmt.Println("MINIMUM COINS TO ADD - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, tc := range testCases {
		coins := make([]int, len(tc.coins))
		copy(coins, tc.coins)
		result := MinCoinsToAdd(coins, tc.target)
		status := "✓"
		if result != tc.expected {
			status = "✗"
		}
		fmt.Printf("%s %s: coins=%v, target=%d → %d (expected %d)\n",
			status, tc.desc, tc.coins, tc.target, result, tc.expected)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	// Sample Input 1
	coins := []int{1, 3}
	target := 6
	fmt.Printf("\nInput: coins = %v, target = %d\n", coins, target)
	fmt.Printf("Output: %d\n", MinCoinsToAdd(coins, target))

	// Sample Input 2
	coins = []int{1, 5, 10}
	target = 20
	fmt.Printf("\nInput: coins = %v, target = %d\n", coins, target)
	fmt.Printf("Output: %d\n", MinCoinsToAdd(coins, target))
}
