/*
All Non-Constructible Values - Go Solutions

Find all values up to a limit that cannot be constructed from given coins.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"sort"
)

// ============================================================================
// APPROACH 1: Greedy Range Building ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(n log n + limit)
// Space Complexity: O(k) where k is number of gaps
// ============================================================================

// AllNonConstructible finds all values <= limit that can't be made.
func AllNonConstructible(coins []int, limit int) []int {
	sort.Ints(coins)

	nonConstructible := []int{}
	reachable := 0
	i := 0

	for target := 1; target <= limit; target++ {
		// Add all coins <= reachable+1
		for i < len(coins) && coins[i] <= reachable+1 {
			reachable += coins[i]
			i++
		}

		// Check if target is constructible
		if target > reachable {
			nonConstructible = append(nonConstructible, target)
		}
	}

	return nonConstructible
}

// ============================================================================
// APPROACH 2: Gap Detection
// ============================================================================
// Time Complexity:  O(n log n)
// Space Complexity: O(k)
// ============================================================================

// AllNonConstructibleGaps returns ranges of non-constructible values.
func AllNonConstructibleGaps(coins []int, limit int) [][]int {
	sort.Ints(coins)

	gaps := [][]int{}
	reachable := 0

	for _, coin := range coins {
		if coin > reachable+1 {
			// Gap from reachable+1 to coin-1
			gapStart := reachable + 1
			gapEnd := coin - 1
			if gapEnd <= limit {
				gaps = append(gaps, []int{gapStart, gapEnd})
			} else if gapStart <= limit {
				gaps = append(gaps, []int{gapStart, limit})
			}
		}
		reachable += coin
	}

	// Values after reachable up to limit
	if reachable < limit {
		gaps = append(gaps, []int{reachable + 1, limit})
	}

	return gaps
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		coins    []int
		limit    int
		expected []int
		desc     string
	}{
		{[]int{1, 2, 5}, 10, []int{}, "All constructible"},
		{[]int{1, 3}, 5, []int{5}, "One gap"},
		{[]int{2, 4}, 10, []int{1, 7, 8, 9, 10}, "Missing 1"},
		{[]int{1, 5, 10}, 20, []int{7, 8, 9, 17, 18, 19, 20}, "Multiple gaps"},
		{[]int{}, 5, []int{1, 2, 3, 4, 5}, "No coins"},
	}

	fmt.Println("======================================================================")
	fmt.Println("ALL NON-CONSTRUCTIBLE VALUES - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, tc := range testCases {
		coins := make([]int, len(tc.coins))
		copy(coins, tc.coins)
		result := AllNonConstructible(coins, tc.limit)
		status := "✓"
		if !slicesEqual(result, tc.expected) {
			status = "✗"
		}
		fmt.Printf("%s %s: coins=%v, limit=%d → %v\n",
			status, tc.desc, tc.coins, tc.limit, result)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	coins := []int{1, 2, 5}
	limit := 10
	fmt.Printf("\nInput: coins = %v, limit = %d\n", coins, limit)
	fmt.Printf("Non-constructible: %v\n", AllNonConstructible(coins, limit))

	coins = []int{1, 5, 10}
	limit = 20
	fmt.Printf("\nInput: coins = %v, limit = %d\n", coins, limit)
	fmt.Printf("Non-constructible: %v\n", AllNonConstructible(coins, limit))
	fmt.Printf("Gap ranges: %v\n", AllNonConstructibleGaps([]int{1, 5, 10}, 20))
}

func slicesEqual(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}
