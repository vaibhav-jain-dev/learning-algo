/*
Paint House - Go Solutions

Paint n houses with 3 colors such that no two adjacent houses have the same color.
Minimize total painting cost.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"math"
)

// ============================================================================
// APPROACH 1: Dynamic Programming (Space-Optimized)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(1) - only track 3 values
//
// WHY THIS IS BEST:
// - Optimal time and space complexity
// - Clean transition logic
// - Easy to understand
// ============================================================================

// MinCost finds minimum cost to paint all houses.
//
// Key Insight: For each house and color, the cost is:
//
//	cost[i][c] + min(dp[i-1][other colors])
//
// We only need the previous house's costs, so O(1) space.
func MinCost(costs [][]int) int {
	if len(costs) == 0 {
		return 0
	}

	n := len(costs)

	// Previous house costs for each color
	prevRed := costs[0][0]
	prevBlue := costs[0][1]
	prevGreen := costs[0][2]

	for i := 1; i < n; i++ {
		// Current costs (must use different color from previous)
		currRed := costs[i][0] + min(prevBlue, prevGreen)
		currBlue := costs[i][1] + min(prevRed, prevGreen)
		currGreen := costs[i][2] + min(prevRed, prevBlue)

		prevRed, prevBlue, prevGreen = currRed, currBlue, currGreen
	}

	return min(prevRed, min(prevBlue, prevGreen))
}

// ============================================================================
// APPROACH 2: DP with Full Table (for path reconstruction)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n)
//
// WHEN TO USE:
// - Need to know which color was used for each house
// - Debugging and visualization
// ============================================================================

// MinCostWithPath returns minimum cost and the colors used.
func MinCostWithPath(costs [][]int) (int, []string) {
	if len(costs) == 0 {
		return 0, []string{}
	}

	n := len(costs)
	colors := []string{"Red", "Blue", "Green"}

	// dp[i][c] = minimum cost to paint houses 0..i with house i being color c
	dp := make([][]int, n)
	for i := range dp {
		dp[i] = make([]int, 3)
	}

	// Base case
	dp[0][0] = costs[0][0]
	dp[0][1] = costs[0][1]
	dp[0][2] = costs[0][2]

	// Fill DP table
	for i := 1; i < n; i++ {
		dp[i][0] = costs[i][0] + min(dp[i-1][1], dp[i-1][2])
		dp[i][1] = costs[i][1] + min(dp[i-1][0], dp[i-1][2])
		dp[i][2] = costs[i][2] + min(dp[i-1][0], dp[i-1][1])
	}

	// Find minimum and trace back
	minCost := dp[n-1][0]
	lastColor := 0
	for c := 1; c < 3; c++ {
		if dp[n-1][c] < minCost {
			minCost = dp[n-1][c]
			lastColor = c
		}
	}

	// Trace back the path
	path := make([]string, n)
	path[n-1] = colors[lastColor]
	currColor := lastColor

	for i := n - 2; i >= 0; i-- {
		// Find which color was used (the one that, combined with current, gives dp value)
		for c := 0; c < 3; c++ {
			if c != currColor && dp[i][c]+costs[i+1][currColor] == dp[i+1][currColor] {
				path[i] = colors[c]
				currColor = c
				break
			}
		}
	}

	return minCost, path
}

// ============================================================================
// APPROACH 3: Paint House II (K Colors)
// ============================================================================
// Time Complexity:  O(n * k)
// Space Complexity: O(k)
//
// EXTENSION: When there are k colors instead of 3.
// Optimization: Track min and second-min to avoid O(k^2).
// ============================================================================

// MinCostK handles k colors efficiently.
func MinCostK(costs [][]int) int {
	if len(costs) == 0 {
		return 0
	}

	n := len(costs)
	k := len(costs[0])

	if k == 0 {
		return 0
	}
	if k == 1 {
		if n == 1 {
			return costs[0][0]
		}
		return -1 // Impossible: can't paint adjacent houses differently
	}

	// Track minimum, second minimum, and the index of minimum
	prevMin := 0
	prevSecondMin := 0
	prevMinIdx := -1

	// Initialize from first house
	for c := 0; c < k; c++ {
		if prevMinIdx == -1 || costs[0][c] < prevMin {
			prevSecondMin = prevMin
			prevMin = costs[0][c]
			prevMinIdx = c
		} else if costs[0][c] < prevSecondMin {
			prevSecondMin = costs[0][c]
		}
	}

	// Process each house
	for i := 1; i < n; i++ {
		currMin := math.MaxInt32
		currSecondMin := math.MaxInt32
		currMinIdx := -1

		for c := 0; c < k; c++ {
			// If this color is same as prev min, use second min
			var cost int
			if c == prevMinIdx {
				cost = costs[i][c] + prevSecondMin
			} else {
				cost = costs[i][c] + prevMin
			}

			// Update current min/secondMin
			if cost < currMin {
				currSecondMin = currMin
				currMin = cost
				currMinIdx = c
			} else if cost < currSecondMin {
				currSecondMin = cost
			}
		}

		prevMin = currMin
		prevSecondMin = currSecondMin
		prevMinIdx = currMinIdx
	}

	return prevMin
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		costs    [][]int
		expected int
		desc     string
	}{
		{[][]int{{17, 2, 17}, {16, 16, 5}, {14, 3, 19}}, 10, "Example 1"},
		{[][]int{{7, 6, 2}}, 2, "Single house"},
		{[][]int{{1, 2, 3}, {1, 2, 3}}, 3, "Two houses"},
		{[][]int{{5, 8, 6}, {19, 14, 13}, {7, 5, 12}, {14, 15, 17}, {3, 20, 10}}, 43, "Five houses"},
		{[][]int{}, 0, "Empty"},
		{[][]int{{1, 1, 1}, {1, 1, 1}, {1, 1, 1}}, 3, "All same cost"},
	}

	fmt.Println("======================================================================")
	fmt.Println("PAINT HOUSE - TEST RESULTS")
	fmt.Println("======================================================================")

	fmt.Println("\nApproach 1: Space-Optimized DP")
	fmt.Println("--------------------------------------------------")
	allPassed := true

	for _, tc := range testCases {
		result := MinCost(tc.costs)
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

	// Test K colors version
	fmt.Println("\nApproach 2: K Colors Version")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		result := MinCostK(tc.costs)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, result, tc.expected)
	}

	// Show path example
	fmt.Println("\n======================================================================")
	fmt.Println("PATH RECONSTRUCTION EXAMPLE")
	fmt.Println("======================================================================")
	costs := [][]int{{17, 2, 17}, {16, 16, 5}, {14, 3, 19}}
	minCost, path := MinCostWithPath(costs)
	fmt.Printf("\ncosts = %v\n", costs)
	fmt.Printf("Minimum cost = %d\n", minCost)
	fmt.Printf("Colors used = %v\n", path)

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	// Sample Input 1
	costs = [][]int{{17, 2, 17}, {16, 16, 5}, {14, 3, 19}}
	fmt.Printf("\nInput: costs = %v\n", costs)
	fmt.Printf("Output: %d\n", MinCost(costs))

	// Sample Input 2
	costs = [][]int{{7, 6, 2}}
	fmt.Printf("\nInput: costs = %v\n", costs)
	fmt.Printf("Output: %d\n", MinCost(costs))
}
