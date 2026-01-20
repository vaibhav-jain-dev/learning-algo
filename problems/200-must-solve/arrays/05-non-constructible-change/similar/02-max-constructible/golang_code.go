/*
Maximum Constructible Value - Go Solutions

Given coins and a budget of K additional coins (each value 1), find maximum
consecutive range starting from 1 you can construct.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"sort"
)

// ============================================================================
// APPROACH 1: Greedy with Budget ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(n log n) - sorting dominates
// Space Complexity: O(1)
// ============================================================================

// MaxConstructible finds maximum value reachable with budget of k 1-coins.
//
// Key Insight: Use 1-coins to fill gaps as we encounter them.
func MaxConstructible(coins []int, budget int) int {
	sort.Ints(coins)

	reachable := budget // Start with budget 1-coins gives us [1, budget]

	for _, coin := range coins {
		if coin > reachable+1 {
			// Gap we can't fill - done
			break
		}
		reachable += coin
	}

	return reachable
}

// ============================================================================
// APPROACH 2: Binary Search on Answer
// ============================================================================
// Time Complexity:  O(n log n + n log target)
// Space Complexity: O(1)
// ============================================================================

// MaxConstructibleBinarySearch uses binary search on the answer.
func MaxConstructibleBinarySearch(coins []int, budget int) int {
	sort.Ints(coins)

	// Helper: can we construct all values 1 to target?
	canConstruct := func(target int) bool {
		reachable := budget
		for _, coin := range coins {
			if coin > reachable+1 {
				break
			}
			reachable += coin
		}
		return reachable >= target
	}

	// Binary search for maximum target
	lo, hi := 1, budget+sum(coins)
	result := 0

	for lo <= hi {
		mid := (lo + hi) / 2
		if canConstruct(mid) {
			result = mid
			lo = mid + 1
		} else {
			hi = mid - 1
		}
	}

	return result
}

func sum(arr []int) int {
	total := 0
	for _, v := range arr {
		total += v
	}
	return total
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		coins    []int
		budget   int
		expected int
		desc     string
	}{
		{[]int{1, 5, 10}, 2, 8, "Add two 1s"},
		{[]int{5, 10, 20}, 0, 0, "No 1-coins, can't start"},
		{[]int{1, 2, 4}, 0, 7, "No budget needed"},
		{[]int{}, 5, 5, "Only budget coins"},
		{[]int{3, 7}, 2, 2, "Gap too large"},
		{[]int{1, 1, 1, 10}, 0, 3, "Multiple 1s"},
	}

	fmt.Println("======================================================================")
	fmt.Println("MAXIMUM CONSTRUCTIBLE VALUE - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, tc := range testCases {
		coins := make([]int, len(tc.coins))
		copy(coins, tc.coins)
		result := MaxConstructible(coins, tc.budget)
		status := "✓"
		if result != tc.expected {
			status = "✗"
		}
		fmt.Printf("%s %s: coins=%v, budget=%d → %d (expected %d)\n",
			status, tc.desc, tc.coins, tc.budget, result, tc.expected)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	// Sample Input 1
	coins := []int{1, 5, 10}
	budget := 2
	fmt.Printf("\nInput: coins = %v, budget = %d\n", coins, budget)
	fmt.Printf("Output: %d\n", MaxConstructible(coins, budget))
}
