/*
Combination Sum IV - Go Solutions

Count permutations that add up to target (order matters).

Key difference from Coin Change: iterate amounts first, then nums.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Bottom-Up Dynamic Programming
// ============================================================================
// Time Complexity:  O(target * n)
// Space Complexity: O(target)
//
// WHY THIS IS BEST:
// - Simple iterative approach
// - Clear and efficient
// - Easy to understand the counting logic
// ============================================================================

// CombinationSum4 counts permutations that sum to target.
//
// Key Insight: Order matters! Iterate amounts first, then nums.
// This counts (1,2) and (2,1) as different combinations.
//
// Recurrence:
//
//	dp[amount] = sum of dp[amount - num] for all valid nums
//
// Visual for nums=[1,2,3], target=4:
//
//	dp[0] = 1
//	dp[1] = dp[0] = 1
//	dp[2] = dp[1] + dp[0] = 2
//	dp[3] = dp[2] + dp[1] + dp[0] = 4
//	dp[4] = dp[3] + dp[2] + dp[1] = 7
func CombinationSum4(nums []int, target int) int {
	// dp[i] = number of permutations that sum to i
	dp := make([]int, target+1)
	dp[0] = 1 // One way to make 0: use nothing

	// Iterate amounts first (outer loop) for permutations
	for amount := 1; amount <= target; amount++ {
		// Try each number as the LAST number in the sequence
		for _, num := range nums {
			if amount >= num {
				dp[amount] += dp[amount-num]
			}
		}
	}

	return dp[target]
}

// ============================================================================
// APPROACH 2: Top-Down with Memoization
// ============================================================================
// Time Complexity:  O(target * n)
// Space Complexity: O(target) for memo + recursion stack
//
// WHEN TO USE:
// - More intuitive recursive thinking
// - When only some subproblems are needed
// ============================================================================

// CombinationSum4Memo uses top-down DP with memoization.
func CombinationSum4Memo(nums []int, target int) int {
	memo := make(map[int]int)

	var count func(remaining int) int
	count = func(remaining int) int {
		// Base cases
		if remaining == 0 {
			return 1
		}
		if remaining < 0 {
			return 0
		}

		// Check memo
		if val, exists := memo[remaining]; exists {
			return val
		}

		// Try each number
		total := 0
		for _, num := range nums {
			total += count(remaining - num)
		}

		memo[remaining] = total
		return total
	}

	return count(target)
}

// ============================================================================
// APPROACH 3: With Enumeration (for small targets)
// ============================================================================
// Time Complexity:  O(result) where result is the answer
// Space Complexity: O(target) for recursion depth
//
// WHEN TO USE:
// - Need to actually generate all permutations
// - Target and result are small enough
// ============================================================================

// CombinationSum4WithEnumeration returns all permutations.
func CombinationSum4WithEnumeration(nums []int, target int) (int, [][]int) {
	var results [][]int
	var current []int

	var generate func(remaining int)
	generate = func(remaining int) {
		if remaining == 0 {
			// Found a valid permutation
			perm := make([]int, len(current))
			copy(perm, current)
			results = append(results, perm)
			return
		}
		if remaining < 0 {
			return
		}

		for _, num := range nums {
			current = append(current, num)
			generate(remaining - num)
			current = current[:len(current)-1]
		}
	}

	generate(target)
	return len(results), results
}

// ============================================================================
// HELPER: Compare with Coin Change (Combinations)
// ============================================================================

// CoinChangeWays counts combinations (order doesn't matter).
func CoinChangeWays(coins []int, target int) int {
	dp := make([]int, target+1)
	dp[0] = 1

	// Iterate coins first (outer loop) for combinations
	for _, coin := range coins {
		for amount := coin; amount <= target; amount++ {
			dp[amount] += dp[amount-coin]
		}
	}

	return dp[target]
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		nums     []int
		target   int
		expected int
		desc     string
	}{
		{[]int{1, 2, 3}, 4, 7, "Example 1"},
		{[]int{9}, 3, 0, "Example 2 - impossible"},
		{[]int{1, 2}, 4, 5, "Two numbers"},
		{[]int{1}, 5, 1, "Single number"},
		{[]int{2, 3, 5}, 8, 6, "Different numbers"},
		{[]int{1, 2, 3}, 0, 1, "Target 0"},
	}

	approaches := []struct {
		name string
		fn   func([]int, int) int
	}{
		{"Bottom-Up DP", CombinationSum4},
		{"Top-Down Memo", CombinationSum4Memo},
	}

	fmt.Println("======================================================================")
	fmt.Println("COMBINATION SUM IV - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.nums, tc.target)
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

	// Compare with Coin Change
	fmt.Println("\n======================================================================")
	fmt.Println("COMPARISON: Permutations vs Combinations")
	fmt.Println("======================================================================")
	nums := []int{1, 2, 3}
	target := 4
	perms := CombinationSum4(nums, target)
	combs := CoinChangeWays(nums, target)
	fmt.Printf("\nnums = %v, target = %d\n", nums, target)
	fmt.Printf("Combination Sum IV (permutations): %d\n", perms)
	fmt.Printf("Coin Change Ways (combinations):   %d\n", combs)

	// Show all permutations
	fmt.Println("\n======================================================================")
	fmt.Println("ALL PERMUTATIONS EXAMPLE")
	fmt.Println("======================================================================")
	count, allPerms := CombinationSum4WithEnumeration([]int{1, 2, 3}, 4)
	fmt.Printf("\nnums = [1, 2, 3], target = 4\n")
	fmt.Printf("Total permutations: %d\n", count)
	fmt.Println("All sequences:")
	for i, perm := range allPerms {
		fmt.Printf("  %d: %v\n", i+1, perm)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	// Sample Input 1
	nums = []int{1, 2, 3}
	target = 4
	fmt.Printf("\nInput: nums = %v, target = %d\n", nums, target)
	fmt.Printf("Output: %d\n", CombinationSum4(nums, target))

	// Sample Input 2
	nums = []int{9}
	target = 3
	fmt.Printf("\nInput: nums = %v, target = %d\n", nums, target)
	fmt.Printf("Output: %d\n", CombinationSum4(nums, target))
}
