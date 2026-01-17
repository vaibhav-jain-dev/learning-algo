/*
Delete and Earn - Go Solutions

Pick numbers to earn points. When you pick x, all x-1 and x+1 are deleted.
Maximize total points earned.

Key insight: This is House Robber in disguise!

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"sort"
)

// ============================================================================
// APPROACH 1: Transform to House Robber
// ============================================================================
// Time Complexity:  O(n + max_val)
// Space Complexity: O(max_val)
//
// WHY THIS IS BEST:
// - Clean transformation to known problem
// - Simple implementation
// - Works well when value range is reasonable
// ============================================================================

// DeleteAndEarn finds maximum points using transformation to House Robber.
//
// Key Insight: Transform to points[x] = x * count(x), then solve House Robber.
// If we pick any occurrence of x, we should pick ALL of them (no extra penalty).
//
// Visual for nums = [2, 2, 3, 3, 3, 4]:
//
//	points = [0, 0, 4, 9, 4]  (value 2 appears 2x, value 3 appears 3x, etc.)
//	Apply House Robber: can't take adjacent values
//	Answer: max(take 2+4=8, take 3=9) = 9
func DeleteAndEarn(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	// Find max value
	maxVal := nums[0]
	for _, num := range nums {
		if num > maxVal {
			maxVal = num
		}
	}

	// Build points array: points[x] = x * count(x)
	points := make([]int, maxVal+1)
	for _, num := range nums {
		points[num] += num
	}

	// Apply House Robber DP
	if maxVal == 0 {
		return 0
	}
	if maxVal == 1 {
		return points[1]
	}

	prev2 := points[0]
	prev1 := max(points[0], points[1])

	for i := 2; i <= maxVal; i++ {
		curr := max(prev1, prev2+points[i])
		prev2 = prev1
		prev1 = curr
	}

	return prev1
}

// ============================================================================
// APPROACH 2: HashMap with Sorted Keys
// ============================================================================
// Time Complexity:  O(n + k log k) where k = unique values
// Space Complexity: O(k)
//
// WHEN TO USE:
// - When value range is very large but sparse
// - Example: nums = [1, 1000000] would waste space with Approach 1
// ============================================================================

// DeleteAndEarnSparse handles sparse value ranges efficiently.
func DeleteAndEarnSparse(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	// Count occurrences
	count := make(map[int]int)
	for _, num := range nums {
		count[num]++
	}

	// Get sorted unique values
	values := make([]int, 0, len(count))
	for val := range count {
		values = append(values, val)
	}
	sort.Ints(values)

	// DP with handling for gaps
	// prev2 = max points excluding last two consecutive groups
	// prev1 = max points excluding last consecutive group
	prev2, prev1 := 0, values[0]*count[values[0]]

	for i := 1; i < len(values); i++ {
		curr := values[i] * count[values[i]]

		if values[i] == values[i-1]+1 {
			// Adjacent values - can't take both
			newPrev1 := max(prev1, prev2+curr)
			prev2 = prev1
			prev1 = newPrev1
		} else {
			// Gap exists - can take both
			newPrev1 := prev1 + curr
			prev2 = prev1
			prev1 = newPrev1
		}
	}

	return prev1
}

// ============================================================================
// APPROACH 3: DP with Explicit Array (for visualization)
// ============================================================================
// Time Complexity:  O(n + max_val)
// Space Complexity: O(max_val)
//
// WHEN TO USE:
// - Debugging and understanding the solution
// - Need to trace which values were chosen
// ============================================================================

// DeleteAndEarnWithTrace returns max points and which values were chosen.
func DeleteAndEarnWithTrace(nums []int) (int, []int) {
	if len(nums) == 0 {
		return 0, []int{}
	}

	// Find max value and build points array
	maxVal := nums[0]
	for _, num := range nums {
		if num > maxVal {
			maxVal = num
		}
	}

	points := make([]int, maxVal+1)
	for _, num := range nums {
		points[num] += num
	}

	// DP array and choice tracking
	dp := make([]int, maxVal+1)
	chosen := make([]bool, maxVal+1)

	dp[0] = points[0]
	if points[0] > 0 {
		chosen[0] = true
	}

	if maxVal >= 1 {
		if points[1] > points[0] {
			dp[1] = points[1]
			chosen[1] = true
		} else {
			dp[1] = points[0]
		}
	}

	for i := 2; i <= maxVal; i++ {
		if dp[i-2]+points[i] > dp[i-1] {
			dp[i] = dp[i-2] + points[i]
			chosen[i] = true
		} else {
			dp[i] = dp[i-1]
		}
	}

	// Trace back which values were chosen
	chosenValues := []int{}
	for i := maxVal; i >= 0; {
		if chosen[i] {
			if points[i] > 0 { // Only add if actually in input
				chosenValues = append([]int{i}, chosenValues...)
			}
			i -= 2
		} else {
			i--
		}
	}

	return dp[maxVal], chosenValues
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
		{[]int{3, 4, 2}, 6, "Basic case"},
		{[]int{2, 2, 3, 3, 3, 4}, 9, "Multiple same values"},
		{[]int{1, 1, 1, 2, 4, 5, 5, 5, 6}, 18, "Complex case"},
		{[]int{8, 3, 4, 7, 6, 6, 9, 2, 5, 8, 2, 4, 9, 5, 9, 1, 5, 7, 1, 4}, 61, "Large case"},
		{[]int{1}, 1, "Single element"},
		{[]int{1, 1}, 2, "Two same elements"},
		{[]int{1, 2}, 2, "Two adjacent"},
		{[]int{1, 3, 5}, 9, "Non-adjacent values"},
	}

	approaches := []struct {
		name string
		fn   func([]int) int
	}{
		{"Transform to House Robber", DeleteAndEarn},
		{"HashMap with Sorted Keys", DeleteAndEarnSparse},
	}

	fmt.Println("======================================================================")
	fmt.Println("DELETE AND EARN - TEST RESULTS")
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
	nums := []int{2, 2, 3, 3, 3, 4}
	points, chosenValues := DeleteAndEarnWithTrace(nums)
	fmt.Printf("\nnums = %v\n", nums)
	fmt.Printf("Max points = %d\n", points)
	fmt.Printf("Values chosen = %v\n", chosenValues)

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	// Sample Input 1
	nums = []int{3, 4, 2}
	fmt.Printf("\nInput: nums = %v\n", nums)
	fmt.Printf("Output: %d\n", DeleteAndEarn(nums))

	// Sample Input 2
	nums = []int{2, 2, 3, 3, 3, 4}
	fmt.Printf("\nInput: nums = %v\n", nums)
	fmt.Printf("Output: %d\n", DeleteAndEarn(nums))
}
