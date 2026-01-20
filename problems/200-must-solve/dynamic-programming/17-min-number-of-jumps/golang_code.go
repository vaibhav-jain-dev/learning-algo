/*
Min Number Of Jumps - Go Solution

Find the minimum number of jumps needed to reach the last index,
where each element represents the maximum jump length from that position.

Time Complexity: O(n) for greedy, O(n^2) for DP
Space Complexity: O(1) for greedy, O(n) for DP
*/

package main

import (
	"fmt"
	"math"
)

// MinNumberOfJumps finds minimum jumps using greedy approach (optimal)
func MinNumberOfJumps(array []int) int {
	n := len(array)

	// Edge case: already at the end
	if n == 1 {
		return 0
	}

	// Edge case: can't move from start
	if array[0] == 0 {
		return -1
	}

	jumps := 0      // Number of jumps made
	currentEnd := 0 // Farthest index reachable with current number of jumps
	farthest := 0   // Farthest index reachable overall

	// Iterate through array (don't need to process last element)
	for i := 0; i < n-1; i++ {
		// Update the farthest we can reach from index i
		if i+array[i] > farthest {
			farthest = i + array[i]
		}

		// When we reach the end of current jump range
		if i == currentEnd {
			jumps++
			currentEnd = farthest

			// If we can already reach or pass the last index
			if currentEnd >= n-1 {
				return jumps
			}

			// If farthest hasn't moved beyond current position, we're stuck
			if currentEnd == i {
				return -1
			}
		}
	}

	return jumps
}

// MinNumberOfJumpsDP finds minimum jumps using dynamic programming approach
func MinNumberOfJumpsDP(array []int) int {
	n := len(array)

	// Edge case: already at the end
	if n == 1 {
		return 0
	}

	// dp[i] = minimum jumps to reach index i
	dp := make([]int, n)
	for i := range dp {
		dp[i] = math.MaxInt32
	}
	dp[0] = 0 // No jumps needed to reach start

	for i := 0; i < n; i++ {
		if dp[i] == math.MaxInt32 {
			continue // Can't reach this index
		}

		// Try all possible jumps from index i
		maxReach := i + array[i]
		if maxReach > n-1 {
			maxReach = n - 1
		}

		for j := i + 1; j <= maxReach; j++ {
			if dp[i]+1 < dp[j] {
				dp[j] = dp[i] + 1
			}
		}
	}

	if dp[n-1] == math.MaxInt32 {
		return -1
	}
	return dp[n-1]
}

// MinJumpsWithPath finds minimum jumps and returns the path
func MinJumpsWithPath(array []int) (int, []int) {
	n := len(array)

	if n == 1 {
		return 0, []int{0}
	}

	if array[0] == 0 {
		return -1, []int{}
	}

	// dp[i] = minimum jumps to reach index i
	// parent[i] = index we jumped from to reach i optimally
	dp := make([]int, n)
	parent := make([]int, n)
	for i := range dp {
		dp[i] = math.MaxInt32
		parent[i] = -1
	}
	dp[0] = 0

	for i := 0; i < n; i++ {
		if dp[i] == math.MaxInt32 {
			continue
		}

		maxReach := i + array[i]
		if maxReach > n-1 {
			maxReach = n - 1
		}

		for j := i + 1; j <= maxReach; j++ {
			if dp[i]+1 < dp[j] {
				dp[j] = dp[i] + 1
				parent[j] = i
			}
		}
	}

	if dp[n-1] == math.MaxInt32 {
		return -1, []int{}
	}

	// Reconstruct path
	path := []int{}
	current := n - 1
	for current != -1 {
		path = append([]int{current}, path...)
		current = parent[current]
	}

	return dp[n-1], path
}

func main() {
	// Test 1: Main example
	arr1 := []int{3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3}
	result1 := MinNumberOfJumps(arr1)
	fmt.Printf("Test 1: %d\n", result1) // Expected: 4

	// Test 2: Can reach in one jump
	arr2 := []int{2, 1, 1}
	result2 := MinNumberOfJumps(arr2)
	fmt.Printf("Test 2: %d\n", result2) // Expected: 1

	// Test 3: Must jump one at a time
	arr3 := []int{1, 1, 1, 1}
	result3 := MinNumberOfJumps(arr3)
	fmt.Printf("Test 3: %d\n", result3) // Expected: 3

	// Test 4: Two elements
	arr4 := []int{3, 1}
	result4 := MinNumberOfJumps(arr4)
	fmt.Printf("Test 4: %d\n", result4) // Expected: 1

	// Test 5: Impossible case
	arr5 := []int{1, 0, 1}
	result5 := MinNumberOfJumps(arr5)
	fmt.Printf("Test 5: %d\n", result5) // Expected: -1

	// Test 6: Single element
	arr6 := []int{5}
	result6 := MinNumberOfJumps(arr6)
	fmt.Printf("Test 6: %d\n", result6) // Expected: 0

	// Test 7: Large jumps available
	arr7 := []int{5, 1, 1, 1, 1}
	result7 := MinNumberOfJumps(arr7)
	fmt.Printf("Test 7: %d\n", result7) // Expected: 1

	// Test 8: Need to be strategic
	arr8 := []int{2, 3, 1, 1, 4}
	result8 := MinNumberOfJumps(arr8)
	fmt.Printf("Test 8: %d\n", result8) // Expected: 2 (0->1->4)

	// Test 9: Start with zero (impossible)
	arr9 := []int{0, 1, 2, 3}
	result9 := MinNumberOfJumps(arr9)
	fmt.Printf("Test 9: %d\n", result9) // Expected: -1

	// Verify both approaches match
	fmt.Println("\n--- Verifying both approaches ---")
	testArrays := [][]int{
		{3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3},
		{2, 1, 1},
		{1, 1, 1, 1},
		{3, 1},
		{1, 0, 1},
		{5},
		{5, 1, 1, 1, 1},
		{2, 3, 1, 1, 4},
	}

	for _, arr := range testArrays {
		greedy := MinNumberOfJumps(arr)
		dp := MinNumberOfJumpsDP(arr)
		match := "OK"
		if greedy != dp {
			match = "MISMATCH"
		}
		fmt.Printf("Array %v: Greedy=%d, DP=%d [%s]\n", arr, greedy, dp, match)
	}

	// Test with path reconstruction
	fmt.Println("\n--- Path reconstruction ---")
	arrPath := []int{3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3}
	jumps, path := MinJumpsWithPath(arrPath)
	fmt.Printf("Array: %v\n", arrPath)
	fmt.Printf("Min jumps: %d\n", jumps)
	fmt.Printf("Path (indices): %v\n", path)
	fmt.Printf("Values at path: ")
	for i, idx := range path {
		if i > 0 {
			fmt.Print(", ")
		}
		fmt.Print(arrPath[idx])
	}
	fmt.Println()

	fmt.Println("\nAll tests completed!")
}
