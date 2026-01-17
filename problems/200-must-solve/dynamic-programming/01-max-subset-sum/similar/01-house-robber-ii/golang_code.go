/*
House Robber II (Circular Array) - Go Solutions

Rob houses arranged in a circle. Adjacent houses cannot be robbed.
This means first and last houses are also adjacent.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Two-Pass Linear DP
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// WHY THIS IS BEST:
// - Reuses the simple House Robber solution
// - Clear separation of the two cases
// - Easy to understand and verify
// ============================================================================

// Rob returns maximum money that can be robbed from circular houses.
//
// Key Insight: Since first and last are adjacent, we can't rob both.
// So we solve two subproblems:
//   1. Rob houses 0 to n-2 (exclude last)
//   2. Rob houses 1 to n-1 (exclude first)
// Answer is the maximum of these two.
func Rob(nums []int) int {
	n := len(nums)

	// Edge cases
	if n == 0 {
		return 0
	}
	if n == 1 {
		return nums[0]
	}
	if n == 2 {
		return max(nums[0], nums[1])
	}

	// Two cases: exclude last OR exclude first
	return max(
		robLinear(nums, 0, n-2),
		robLinear(nums, 1, n-1),
	)
}

// robLinear solves the original House Robber for a range [start, end].
func robLinear(nums []int, start, end int) int {
	prev2 := 0         // dp[i-2]
	prev1 := nums[start] // dp[i-1]

	for i := start + 1; i <= end; i++ {
		curr := max(prev1, prev2+nums[i])
		prev2 = prev1
		prev1 = curr
	}

	return prev1
}

// ============================================================================
// APPROACH 2: Single Pass with Dual State
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1)
//
// WHEN TO USE:
// - Want to minimize passes through the array
// - Interview optimization question
// ============================================================================

// RobSinglePass tracks both cases in a single iteration.
func RobSinglePass(nums []int) int {
	n := len(nums)

	if n == 0 {
		return 0
	}
	if n == 1 {
		return nums[0]
	}
	if n == 2 {
		return max(nums[0], nums[1])
	}

	// Case 1: Include first, exclude last
	// Case 2: Exclude first, include last possibility
	prev2Case1, prev1Case1 := 0, nums[0]
	prev2Case2, prev1Case2 := 0, nums[1]

	for i := 1; i < n; i++ {
		// Case 1: process indices 0 to n-2
		if i < n-1 {
			currCase1 := max(prev1Case1, prev2Case1+nums[i])
			prev2Case1 = prev1Case1
			prev1Case1 = currCase1
		}

		// Case 2: process indices 1 to n-1
		if i > 1 {
			currCase2 := max(prev1Case2, prev2Case2+nums[i])
			prev2Case2 = prev1Case2
			prev1Case2 = currCase2
		}
	}

	return max(prev1Case1, prev1Case2)
}

// ============================================================================
// APPROACH 3: DP Array (for visualization/debugging)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n)
//
// WHEN TO USE:
// - Debugging or understanding the problem
// - Need to trace back which houses were robbed
// ============================================================================

// RobWithTrace returns max money and which houses were robbed.
func RobWithTrace(nums []int) (int, []int) {
	n := len(nums)

	if n == 0 {
		return 0, []int{}
	}
	if n == 1 {
		return nums[0], []int{0}
	}

	// Solve both cases and track which houses were robbed
	money1, houses1 := robLinearWithTrace(nums, 0, n-2)
	money2, houses2 := robLinearWithTrace(nums, 1, n-1)

	if money1 >= money2 {
		return money1, houses1
	}
	return money2, houses2
}

func robLinearWithTrace(nums []int, start, end int) (int, []int) {
	size := end - start + 1
	dp := make([]int, size)
	robbed := make([]bool, size)

	dp[0] = nums[start]
	robbed[0] = true

	if size > 1 {
		if nums[start+1] > nums[start] {
			dp[1] = nums[start+1]
			robbed[1] = true
		} else {
			dp[1] = nums[start]
		}
	}

	for i := 2; i < size; i++ {
		if dp[i-2]+nums[start+i] > dp[i-1] {
			dp[i] = dp[i-2] + nums[start+i]
			robbed[i] = true
		} else {
			dp[i] = dp[i-1]
		}
	}

	// Trace back which houses were robbed
	houses := []int{}
	for i := size - 1; i >= 0; {
		if robbed[i] {
			houses = append([]int{start + i}, houses...)
			i -= 2
		} else {
			i--
		}
	}

	return dp[size-1], houses
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		nums     []int
		expected int
		desc     string
	}{
		{[]int{2, 3, 2}, 3, "Basic circular"},
		{[]int{1, 2, 3, 1}, 4, "Four houses"},
		{[]int{1, 2, 3}, 3, "Three houses"},
		{[]int{1}, 1, "Single house"},
		{[]int{1, 2}, 2, "Two houses"},
		{[]int{}, 0, "Empty array"},
		{[]int{200, 3, 140, 20, 10}, 340, "First+Third optimal"},
		{[]int{1, 3, 1, 3, 100}, 103, "Last house valuable"},
	}

	approaches := []struct {
		name string
		fn   func([]int) int
	}{
		{"Two-Pass DP", Rob},
		{"Single Pass", RobSinglePass},
	}

	fmt.Println("======================================================================")
	fmt.Println("HOUSE ROBBER II (CIRCULAR) - TEST RESULTS")
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
			fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, result, tc.expected)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		}
	}

	// Show trace example
	fmt.Println("\n======================================================================")
	fmt.Println("TRACE EXAMPLE")
	fmt.Println("======================================================================")
	nums := []int{1, 2, 3, 1}
	money, houses := RobWithTrace(nums)
	fmt.Printf("\nnums = %v\n", nums)
	fmt.Printf("Max money = %d\n", money)
	fmt.Printf("Houses robbed = %v\n", houses)

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	// Sample Input 1
	nums = []int{2, 3, 2}
	fmt.Printf("\nInput: nums = %v\n", nums)
	fmt.Printf("Output: %d\n", Rob(nums))

	// Sample Input 2
	nums = []int{1, 2, 3, 1}
	fmt.Printf("\nInput: nums = %v\n", nums)
	fmt.Printf("Output: %d\n", Rob(nums))
}
