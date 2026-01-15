/*
Longest Increasing Subsequence (LIS) - Dynamic Programming Solution

Problem: Find the length of the longest strictly increasing subsequence.
*/

package main

import (
	"fmt"
	"sort"
)

// lengthOfLISDP uses standard DP - O(n^2).
// Time Complexity: O(n^2)
// Space Complexity: O(n)
func lengthOfLISDP(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	n := len(nums)
	// dp[i] = length of LIS ending at index i
	dp := make([]int, n)
	for i := range dp {
		dp[i] = 1 // Each element alone is a subsequence of length 1
	}

	maxLen := 1
	for i := 1; i < n; i++ {
		for j := 0; j < i; j++ {
			if nums[j] < nums[i] && dp[j]+1 > dp[i] {
				dp[i] = dp[j] + 1
			}
		}
		if dp[i] > maxLen {
			maxLen = dp[i]
		}
	}

	return maxLen
}

// lengthOfLISBinarySearch uses binary search - O(n log n).
// Maintains an array where tails[i] is the smallest tail
// of all increasing subsequences of length i+1.
// Time Complexity: O(n log n)
// Space Complexity: O(n)
func lengthOfLISBinarySearch(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	tails := []int{}

	for _, num := range nums {
		// Find the first position where tails[pos] >= num
		pos := sort.SearchInts(tails, num)

		if pos == len(tails) {
			// num is larger than all tails, extend the longest subsequence
			tails = append(tails, num)
		} else {
			// Replace to maintain smallest possible tail
			tails[pos] = num
		}
	}

	return len(tails)
}

// lengthOfLISMemo uses top-down DP with memoization.
// Time Complexity: O(n^2)
// Space Complexity: O(n)
func lengthOfLISMemo(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	n := len(nums)
	memo := make(map[int]int)

	var helper func(idx int) int
	helper = func(idx int) int {
		if val, exists := memo[idx]; exists {
			return val
		}

		maxLen := 1 // At minimum, the element itself
		for j := 0; j < idx; j++ {
			if nums[j] < nums[idx] {
				if length := helper(j) + 1; length > maxLen {
					maxLen = length
				}
			}
		}

		memo[idx] = maxLen
		return maxLen
	}

	// Find LIS ending at each position and return the maximum
	result := 0
	for i := 0; i < n; i++ {
		if length := helper(i); length > result {
			result = length
		}
	}

	return result
}

// getLISSequence returns one of the actual LIS sequences (not just length).
// Time Complexity: O(n^2)
// Space Complexity: O(n)
func getLISSequence(nums []int) []int {
	if len(nums) == 0 {
		return []int{}
	}

	n := len(nums)
	dp := make([]int, n)
	parent := make([]int, n)

	for i := range dp {
		dp[i] = 1
		parent[i] = -1
	}

	for i := 1; i < n; i++ {
		for j := 0; j < i; j++ {
			if nums[j] < nums[i] && dp[j]+1 > dp[i] {
				dp[i] = dp[j] + 1
				parent[i] = j
			}
		}
	}

	// Find the index with maximum LIS length
	maxLen := 0
	maxIdx := 0
	for i, length := range dp {
		if length > maxLen {
			maxLen = length
			maxIdx = i
		}
	}

	// Reconstruct the sequence
	sequence := []int{}
	idx := maxIdx
	for idx != -1 {
		sequence = append(sequence, nums[idx])
		idx = parent[idx]
	}

	// Reverse the sequence
	for i, j := 0, len(sequence)-1; i < j; i, j = i+1, j-1 {
		sequence[i], sequence[j] = sequence[j], sequence[i]
	}

	return sequence
}

func main() {
	testCases := []struct {
		nums     []int
		expected int
	}{
		{[]int{10, 9, 2, 5, 3, 7, 101, 18}, 4},
		{[]int{0, 1, 0, 3, 2, 3}, 4},
		{[]int{7, 7, 7, 7, 7, 7, 7}, 1},
		{[]int{1, 3, 6, 7, 9, 4, 10, 5, 6}, 6},
		{[]int{1}, 1},
		{[]int{1, 2}, 2},
		{[]int{2, 1}, 1},
		{[]int{1, 2, 3, 4, 5}, 5},
		{[]int{5, 4, 3, 2, 1}, 1},
		{[]int{3, 10, 2, 1, 20}, 3},
	}

	fmt.Println("============================================================")
	fmt.Println("LONGEST INCREASING SUBSEQUENCE - Test Results")
	fmt.Println("============================================================")

	allPassed := true

	for _, tc := range testCases {
		resultDP := lengthOfLISDP(tc.nums)
		resultBS := lengthOfLISBinarySearch(tc.nums)
		resultMemo := lengthOfLISMemo(tc.nums)
		lisSeq := getLISSequence(tc.nums)

		status := "PASS"
		if resultDP != tc.expected || resultBS != tc.expected || resultMemo != tc.expected {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("\nnums = %v\n", tc.nums)
		fmt.Printf("  Expected:      %d\n", tc.expected)
		fmt.Printf("  DP O(n^2):     %d\n", resultDP)
		fmt.Printf("  Binary Search: %d\n", resultBS)
		fmt.Printf("  Memoized:      %d\n", resultMemo)
		fmt.Printf("  One LIS:       %v\n", lisSeq)
		fmt.Printf("  Status:        %s\n", status)
	}

	fmt.Println("\n============================================================")
	if allPassed {
		fmt.Println("All tests passed!")
	} else {
		fmt.Println("Some tests failed!")
	}
	fmt.Println("============================================================")
}
