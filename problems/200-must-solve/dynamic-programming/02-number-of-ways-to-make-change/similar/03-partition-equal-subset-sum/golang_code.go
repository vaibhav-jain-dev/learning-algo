/*
Partition Equal Subset Sum - Go Solutions

Determine if array can be partitioned into two subsets with equal sum.

Key insight: This is a subset sum decision problem.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: 1D Dynamic Programming
// ============================================================================
// Time Complexity:  O(n * sum)
// Space Complexity: O(sum)
//
// WHY THIS IS BEST:
// - Optimal space complexity
// - Clear and efficient
// - Standard subset sum pattern
// ============================================================================

// CanPartition determines if array can be partitioned into equal sum subsets.
//
// Key Insight: If total sum is S, we need subset summing to S/2.
// This is the 0/1 Knapsack variant: can we fill capacity S/2 exactly?
//
// Visual for nums = [1, 5, 11, 5]:
//
//	Total = 22, target = 11
//	After processing: dp[11] = true
//	Partition: {1,5,5} and {11}
func CanPartition(nums []int) bool {
	totalSum := 0
	for _, num := range nums {
		totalSum += num
	}

	// If sum is odd, can't partition equally
	if totalSum%2 != 0 {
		return false
	}

	target := totalSum / 2

	// dp[s] = can we make sum s?
	dp := make([]bool, target+1)
	dp[0] = true // Can always make sum 0 (empty subset)

	for _, num := range nums {
		// Iterate backwards to avoid using same number twice
		for s := target; s >= num; s-- {
			dp[s] = dp[s] || dp[s-num]
		}

		// Early termination
		if dp[target] {
			return true
		}
	}

	return dp[target]
}

// ============================================================================
// APPROACH 2: Bitset Optimization
// ============================================================================
// Time Complexity:  O(n * sum / 64) effectively
// Space Complexity: O(sum / 64)
//
// WHEN TO USE:
// - Need maximum speed
// - Sum is large but fits in reasonable memory
// ============================================================================

// CanPartitionBitset uses uint64 as a bitset for faster operations.
func CanPartitionBitset(nums []int) bool {
	totalSum := 0
	for _, num := range nums {
		totalSum += num
	}

	if totalSum%2 != 0 {
		return false
	}

	target := totalSum / 2

	// Use big int simulation with slice of uint64
	// Each bit position i represents "can we make sum i?"
	numWords := (target + 64) / 64
	bits := make([]uint64, numWords)
	bits[0] = 1 // Can make sum 0

	for _, num := range nums {
		// Shift bits left by num positions (represents adding num to all possible sums)
		newBits := make([]uint64, numWords)
		copy(newBits, bits)

		// Shift operation across words
		wordShift := num / 64
		bitShift := uint(num % 64)

		for i := numWords - 1; i >= wordShift; i-- {
			shifted := bits[i-wordShift] << bitShift
			if bitShift > 0 && i-wordShift-1 >= 0 {
				shifted |= bits[i-wordShift-1] >> (64 - bitShift)
			}
			newBits[i] |= shifted
		}

		bits = newBits
	}

	// Check if target bit is set
	wordIdx := target / 64
	bitIdx := uint(target % 64)
	return (bits[wordIdx] & (1 << bitIdx)) != 0
}

// ============================================================================
// APPROACH 3: Recursive with Memoization
// ============================================================================
// Time Complexity:  O(n * sum)
// Space Complexity: O(n * sum) for memo
//
// WHEN TO USE:
// - More intuitive top-down thinking
// - Debugging and understanding
// ============================================================================

// CanPartitionMemo uses top-down DP with memoization.
func CanPartitionMemo(nums []int) bool {
	totalSum := 0
	for _, num := range nums {
		totalSum += num
	}

	if totalSum%2 != 0 {
		return false
	}

	target := totalSum / 2
	memo := make(map[string]bool)

	var canReach func(idx int, remaining int) bool
	canReach = func(idx int, remaining int) bool {
		// Base cases
		if remaining == 0 {
			return true
		}
		if remaining < 0 || idx >= len(nums) {
			return false
		}

		key := fmt.Sprintf("%d_%d", idx, remaining)
		if val, exists := memo[key]; exists {
			return val
		}

		// Include or exclude current number
		result := canReach(idx+1, remaining-nums[idx]) || canReach(idx+1, remaining)

		memo[key] = result
		return result
	}

	return canReach(0, target)
}

// ============================================================================
// BONUS: Find the actual partition
// ============================================================================

// CanPartitionWithSets returns the partition if it exists.
func CanPartitionWithSets(nums []int) (bool, []int, []int) {
	totalSum := 0
	for _, num := range nums {
		totalSum += num
	}

	if totalSum%2 != 0 {
		return false, nil, nil
	}

	target := totalSum / 2
	n := len(nums)

	// dp[i][s] = can we make sum s using first i numbers?
	dp := make([][]bool, n+1)
	for i := range dp {
		dp[i] = make([]bool, target+1)
	}
	dp[0][0] = true

	for i := 1; i <= n; i++ {
		for s := 0; s <= target; s++ {
			dp[i][s] = dp[i-1][s]
			if s >= nums[i-1] {
				dp[i][s] = dp[i][s] || dp[i-1][s-nums[i-1]]
			}
		}
	}

	if !dp[n][target] {
		return false, nil, nil
	}

	// Backtrack to find the partition
	subset1 := []int{}
	subset2 := []int{}
	s := target

	for i := n; i > 0; i-- {
		if s >= nums[i-1] && dp[i-1][s-nums[i-1]] {
			subset1 = append(subset1, nums[i-1])
			s -= nums[i-1]
		} else {
			subset2 = append(subset2, nums[i-1])
		}
	}

	return true, subset1, subset2
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		nums     []int
		expected bool
		desc     string
	}{
		{[]int{1, 5, 11, 5}, true, "Example 1"},
		{[]int{1, 2, 3, 5}, false, "Example 2 - odd sum"},
		{[]int{1, 1}, true, "Two equal elements"},
		{[]int{1, 2, 5}, false, "Cannot partition"},
		{[]int{2, 2, 2, 2}, true, "All same elements"},
		{[]int{100}, false, "Single element"},
		{[]int{1, 2, 3, 4, 5, 6, 7}, true, "1-7 sum to 28"},
		{[]int{14, 9, 8, 4, 3, 2}, true, "Mixed numbers"},
	}

	approaches := []struct {
		name string
		fn   func([]int) bool
	}{
		{"1D DP", CanPartition},
		{"Bitset", CanPartitionBitset},
		{"Memoization", CanPartitionMemo},
	}

	fmt.Println("======================================================================")
	fmt.Println("PARTITION EQUAL SUBSET SUM - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.nums)
			status := "PASS"
			if result != tc.expected {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  [%s] %s: got %v, expected %v\n", status, tc.desc, result, tc.expected)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		}
	}

	// Show partition
	fmt.Println("\n======================================================================")
	fmt.Println("PARTITION EXAMPLE")
	fmt.Println("======================================================================")
	nums := []int{1, 5, 11, 5}
	canPart, set1, set2 := CanPartitionWithSets(nums)
	fmt.Printf("\nnums = %v\n", nums)
	fmt.Printf("Can partition: %v\n", canPart)
	if canPart {
		sum1, sum2 := 0, 0
		for _, v := range set1 {
			sum1 += v
		}
		for _, v := range set2 {
			sum2 += v
		}
		fmt.Printf("Subset 1: %v (sum=%d)\n", set1, sum1)
		fmt.Printf("Subset 2: %v (sum=%d)\n", set2, sum2)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	// Sample Input 1
	nums = []int{1, 5, 11, 5}
	fmt.Printf("\nInput: nums = %v\n", nums)
	fmt.Printf("Output: %v\n", CanPartition(nums))

	// Sample Input 2
	nums = []int{1, 2, 3, 5}
	fmt.Printf("\nInput: nums = %v\n", nums)
	fmt.Printf("Output: %v\n", CanPartition(nums))
}
