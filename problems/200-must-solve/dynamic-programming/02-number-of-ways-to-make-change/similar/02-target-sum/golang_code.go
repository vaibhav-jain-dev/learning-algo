/*
Target Sum - Go Solutions

Assign + or - to each number to reach target sum.
Count the number of ways to do this.

Key insight: Transform to subset sum problem.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Subset Sum Transformation (Optimal)
// ============================================================================
// Time Complexity:  O(n * sum)
// Space Complexity: O(sum)
//
// WHY THIS IS BEST:
// - Transforms problem to simpler subset sum counting
// - Optimal space complexity
// - Elegant mathematical insight
// ============================================================================

// FindTargetSumWays counts ways to assign +/- to reach target.
//
// Mathematical Transformation:
//   Let P = sum of positives, N = sum of negatives
//   P + N = totalSum
//   P - N = target
//   Therefore: P = (totalSum + target) / 2
//
// Problem becomes: count subsets summing to P
func FindTargetSumWays(nums []int, target int) int {
	totalSum := 0
	for _, num := range nums {
		totalSum += num
	}

	// Edge cases
	if (totalSum+target)%2 != 0 {
		return 0 // Can't have fractional sum
	}
	if target > totalSum || target < -totalSum {
		return 0 // Impossible to reach
	}

	// Target sum for positive subset
	subsetSum := (totalSum + target) / 2
	if subsetSum < 0 {
		return 0
	}

	// Count subsets summing to subsetSum
	// dp[s] = number of ways to get sum s
	dp := make([]int, subsetSum+1)
	dp[0] = 1 // One way to get sum 0: take nothing

	for _, num := range nums {
		// Iterate backwards to avoid using same number twice
		for s := subsetSum; s >= num; s-- {
			dp[s] += dp[s-num]
		}
	}

	return dp[subsetSum]
}

// ============================================================================
// APPROACH 2: 2D DP with Offset (Clearer)
// ============================================================================
// Time Complexity:  O(n * sum)
// Space Complexity: O(n * sum)
//
// WHEN TO USE:
// - More intuitive understanding
// - Easier to debug
// ============================================================================

// FindTargetSumWays2D uses explicit 2D DP with sum offset.
func FindTargetSumWays2D(nums []int, target int) int {
	totalSum := 0
	for _, num := range nums {
		totalSum += num
	}

	if target > totalSum || target < -totalSum {
		return 0
	}

	n := len(nums)
	offset := totalSum // Shift to handle negative indices

	// dp[i][s+offset] = ways to reach sum s using first i numbers
	dp := make([][]int, n+1)
	for i := range dp {
		dp[i] = make([]int, 2*totalSum+1)
	}

	dp[0][offset] = 1 // One way to have sum 0 with no numbers

	for i := 0; i < n; i++ {
		for s := -totalSum; s <= totalSum; s++ {
			if dp[i][s+offset] > 0 {
				// Add current number (positive)
				dp[i+1][s+nums[i]+offset] += dp[i][s+offset]
				// Subtract current number (negative)
				dp[i+1][s-nums[i]+offset] += dp[i][s+offset]
			}
		}
	}

	return dp[n][target+offset]
}

// ============================================================================
// APPROACH 3: Recursive with Memoization
// ============================================================================
// Time Complexity:  O(n * sum)
// Space Complexity: O(n * sum) for memo + recursion stack
//
// WHEN TO USE:
// - Most intuitive top-down thinking
// - Exploring all +/- choices explicitly
// ============================================================================

// FindTargetSumWaysMemo uses top-down DP with memoization.
func FindTargetSumWaysMemo(nums []int, target int) int {
	memo := make(map[string]int)

	var count func(idx int, currentSum int) int
	count = func(idx int, currentSum int) int {
		// Base case: processed all numbers
		if idx == len(nums) {
			if currentSum == target {
				return 1
			}
			return 0
		}

		// Check memo
		key := fmt.Sprintf("%d_%d", idx, currentSum)
		if val, exists := memo[key]; exists {
			return val
		}

		// Two choices: add or subtract current number
		ways := count(idx+1, currentSum+nums[idx]) +
			count(idx+1, currentSum-nums[idx])

		memo[key] = ways
		return ways
	}

	return count(0, 0)
}

// ============================================================================
// BONUS: Enumerate all expressions
// ============================================================================

// FindTargetSumWaysWithExpressions returns all valid expressions.
func FindTargetSumWaysWithExpressions(nums []int, target int) (int, []string) {
	var results []string
	var current []byte

	var generate func(idx int, sum int)
	generate = func(idx int, sum int) {
		if idx == len(nums) {
			if sum == target {
				results = append(results, string(current))
			}
			return
		}

		// Try positive
		if idx > 0 {
			current = append(current, '+')
		}
		current = append(current, fmt.Sprintf("%d", nums[idx])...)
		generate(idx+1, sum+nums[idx])

		// Backtrack and try negative
		if idx > 0 {
			current = current[:len(current)-1-len(fmt.Sprintf("%d", nums[idx]))]
			current = append(current, '-')
		} else {
			current = current[:0]
			current = append(current, '-')
		}
		current = append(current, fmt.Sprintf("%d", nums[idx])...)
		generate(idx+1, sum-nums[idx])

		// Backtrack
		if idx > 0 {
			current = current[:len(current)-1-len(fmt.Sprintf("%d", nums[idx]))]
		} else {
			current = current[:0]
		}
	}

	generate(0, 0)
	return len(results), results
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
		{[]int{1, 1, 1, 1, 1}, 3, 5, "Example 1"},
		{[]int{1}, 1, 1, "Example 2"},
		{[]int{1}, 2, 0, "Impossible"},
		{[]int{0, 0, 0, 0, 0, 0, 0, 0, 1}, 1, 256, "Many zeros"},
		{[]int{1, 2, 1}, 0, 2, "Target zero"},
		{[]int{2, 3, 5}, 0, 0, "No solution"},
	}

	approaches := []struct {
		name string
		fn   func([]int, int) int
	}{
		{"Subset Sum", FindTargetSumWays},
		{"2D DP", FindTargetSumWays2D},
		{"Memoization", FindTargetSumWaysMemo},
	}

	fmt.Println("======================================================================")
	fmt.Println("TARGET SUM - TEST RESULTS")
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

	// Show expressions
	fmt.Println("\n======================================================================")
	fmt.Println("ALL EXPRESSIONS EXAMPLE")
	fmt.Println("======================================================================")
	nums := []int{1, 1, 1, 1, 1}
	target := 3
	count, expressions := FindTargetSumWaysWithExpressions(nums, target)
	fmt.Printf("\nnums = %v, target = %d\n", nums, target)
	fmt.Printf("Total ways: %d\n", count)
	fmt.Println("All expressions:")
	for i, expr := range expressions {
		fmt.Printf("  %d: %s = %d\n", i+1, expr, target)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	// Sample Input 1
	nums = []int{1, 1, 1, 1, 1}
	target = 3
	fmt.Printf("\nInput: nums = %v, target = %d\n", nums, target)
	fmt.Printf("Output: %d\n", FindTargetSumWays(nums, target))

	// Sample Input 2
	nums = []int{1}
	target = 1
	fmt.Printf("\nInput: nums = %v, target = %d\n", nums, target)
	fmt.Printf("Output: %d\n", FindTargetSumWays(nums, target))
}
