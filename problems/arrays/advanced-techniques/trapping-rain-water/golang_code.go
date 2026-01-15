package main

import (
	"fmt"
)

/*
Trapping Rain Water - Multiple Solutions
LeetCode 42 (Hard)

This problem tests:
- Two pointers technique
- Dynamic programming
- Monotonic stacks
- Optimization from O(n²) to O(n)
*/

// trapBruteForce calculates water using brute force approach
// Time: O(n²) - For each position, scan entire array
// Space: O(1)
func trapBruteForce(height []int) int {
	if len(height) == 0 {
		return 0
	}

	n := len(height)
	totalWater := 0

	for i := 0; i < n; i++ {
		// Find max height to the left
		maxLeft := 0
		for j := 0; j <= i; j++ {
			if height[j] > maxLeft {
				maxLeft = height[j]
			}
		}

		// Find max height to the right
		maxRight := 0
		for j := i; j < n; j++ {
			if height[j] > maxRight {
				maxRight = height[j]
			}
		}

		// Water at this position
		waterLevel := min(maxLeft, maxRight)
		totalWater += waterLevel - height[i]
	}

	return totalWater
}

// trapDP calculates water using dynamic programming
// Time: O(n) - Three passes
// Space: O(n) - Two extra arrays
func trapDP(height []int) int {
	if len(height) == 0 {
		return 0
	}

	n := len(height)

	// Precompute max heights from left
	maxLeft := make([]int, n)
	maxLeft[0] = height[0]
	for i := 1; i < n; i++ {
		maxLeft[i] = max(maxLeft[i-1], height[i])
	}

	// Precompute max heights from right
	maxRight := make([]int, n)
	maxRight[n-1] = height[n-1]
	for i := n - 2; i >= 0; i-- {
		maxRight[i] = max(maxRight[i+1], height[i])
	}

	// Calculate total water
	totalWater := 0
	for i := 0; i < n; i++ {
		waterLevel := min(maxLeft[i], maxRight[i])
		totalWater += waterLevel - height[i]
	}

	return totalWater
}

// trap calculates water using two pointers (Optimal)
// Time: O(n) - Single pass
// Space: O(1)
func trap(height []int) int {
	if len(height) == 0 {
		return 0
	}

	left, right := 0, len(height)-1
	maxLeft, maxRight := 0, 0
	totalWater := 0

	for left < right {
		if height[left] < height[right] {
			// Process left side
			// We know there's something taller on the right
			if height[left] >= maxLeft {
				maxLeft = height[left]
			} else {
				totalWater += maxLeft - height[left]
			}
			left++
		} else {
			// Process right side
			// We know there's something taller on the left
			if height[right] >= maxRight {
				maxRight = height[right]
			} else {
				totalWater += maxRight - height[right]
			}
			right--
		}
	}

	return totalWater
}

// trapStack calculates water using monotonic stack
// Time: O(n) - Each element pushed/popped once
// Space: O(n)
func trapStack(height []int) int {
	if len(height) == 0 {
		return 0
	}

	stack := []int{} // Stack of indices
	totalWater := 0

	for current := 0; current < len(height); current++ {
		// While current bar is taller than stack top
		for len(stack) > 0 && height[current] > height[stack[len(stack)-1]] {
			mid := stack[len(stack)-1]
			stack = stack[:len(stack)-1]

			if len(stack) == 0 {
				break // No left boundary
			}

			leftBound := stack[len(stack)-1]
			width := current - leftBound - 1
			boundedHeight := min(height[current], height[leftBound]) - height[mid]
			totalWater += width * boundedHeight
		}

		stack = append(stack, current)
	}

	return totalWater
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func main() {
	testCases := []struct {
		height   []int
		expected int
	}{
		{[]int{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}, 6},
		{[]int{4, 2, 0, 3, 2, 5}, 9},
		{[]int{4, 2, 3}, 1},
		{[]int{1, 2, 3, 4, 5}, 0},
		{[]int{5, 4, 3, 2, 1}, 0},
		{[]int{2, 0, 2}, 2},
		{[]int{}, 0},
	}

	fmt.Println("=== Trapping Rain Water ===")
	fmt.Println()

	for i, tc := range testCases {
		resultDP := trapDP(tc.height)
		resultTwoPtr := trap(tc.height)
		resultStack := trapStack(tc.height)

		fmt.Printf("Test %d: %v\n", i+1, tc.height)
		fmt.Printf("  Expected: %d\n", tc.expected)
		fmt.Printf("  DP:           %d\n", resultDP)
		fmt.Printf("  Two Pointers: %d\n", resultTwoPtr)
		fmt.Printf("  Stack:        %d\n", resultStack)

		// Verify all approaches match
		if resultDP != tc.expected || resultTwoPtr != tc.expected || resultStack != tc.expected {
			fmt.Println("  FAILED!")
		} else {
			fmt.Println("  PASSED!")
		}
		fmt.Println()
	}
}
