/*
Staircase Traversal - Go Solution

Count distinct ways to climb a staircase with variable step sizes.
*/

package main

import "fmt"

// StaircaseTraversal counts ways using dynamic programming.
// Time: O(n * k), Space: O(n)
func StaircaseTraversal(height, maxSteps int) int {
	// dp[i] = number of ways to reach step i
	dp := make([]int, height+1)
	dp[0] = 1 // One way to stay at ground

	for currentStep := 1; currentStep <= height; currentStep++ {
		// Sum all ways to reach current step from previous steps
		for stepSize := 1; stepSize <= maxSteps && stepSize <= currentStep; stepSize++ {
			dp[currentStep] += dp[currentStep-stepSize]
		}
	}

	return dp[height]
}

// StaircaseTraversalOptimized uses sliding window for O(n) time.
func StaircaseTraversalOptimized(height, maxSteps int) int {
	if height <= 1 {
		return 1
	}

	dp := make([]int, height+1)
	dp[0] = 1

	windowSum := 0 // Sum of last maxSteps dp values

	for i := 1; i <= height; i++ {
		// Add the previous dp value to window
		windowSum += dp[i-1]

		// Remove value that's now outside window
		startOfWindow := i - maxSteps - 1
		if startOfWindow >= 0 {
			windowSum -= dp[startOfWindow]
		}

		dp[i] = windowSum
	}

	return dp[height]
}

// StaircaseTraversalRecursive uses memoized recursion.
func StaircaseTraversalRecursive(height, maxSteps int) int {
	memo := make(map[int]int)

	var countWays func(remaining int) int
	countWays = func(remaining int) int {
		if remaining == 0 {
			return 1
		}
		if remaining < 0 {
			return 0
		}

		if val, exists := memo[remaining]; exists {
			return val
		}

		total := 0
		for stepSize := 1; stepSize <= maxSteps && stepSize <= remaining; stepSize++ {
			total += countWays(remaining - stepSize)
		}

		memo[remaining] = total
		return total
	}

	return countWays(height)
}

// StaircaseTraversalSpaceOptimized uses O(maxSteps) space with circular buffer.
func StaircaseTraversalSpaceOptimized(height, maxSteps int) int {
	if height <= 1 {
		return 1
	}

	// Circular buffer of size maxSteps + 1
	windowSize := maxSteps + 1
	window := make([]int, windowSize)
	window[0] = 1

	windowSum := 1

	for i := 1; i <= height; i++ {
		// Current position in circular buffer
		currentIdx := i % windowSize

		// The value being replaced exits the window
		oldValue := window[currentIdx]

		// New value is the current window sum
		window[currentIdx] = windowSum

		// Update window sum for next iteration
		windowSum = windowSum + window[currentIdx] - oldValue
	}

	return window[height%windowSize]
}

func main() {
	// Test case 1
	height1, maxSteps1 := 4, 2
	fmt.Printf("Height: %d, Max Steps: %d\n", height1, maxSteps1)
	fmt.Printf("DP:          %d\n", StaircaseTraversal(height1, maxSteps1))
	fmt.Printf("Optimized:   %d\n", StaircaseTraversalOptimized(height1, maxSteps1))
	fmt.Printf("Recursive:   %d\n", StaircaseTraversalRecursive(height1, maxSteps1))

	// Test case 2
	height2, maxSteps2 := 3, 3
	fmt.Printf("\nHeight: %d, Max Steps: %d\n", height2, maxSteps2)
	fmt.Printf("Output: %d\n", StaircaseTraversal(height2, maxSteps2))

	// Test case 3
	height3, maxSteps3 := 10, 3
	fmt.Printf("\nHeight: %d, Max Steps: %d\n", height3, maxSteps3)
	fmt.Printf("Output: %d\n", StaircaseTraversal(height3, maxSteps3))

	// Test case 4: Large input
	height4, maxSteps4 := 20, 5
	fmt.Printf("\nHeight: %d, Max Steps: %d\n", height4, maxSteps4)
	fmt.Printf("Output: %d\n", StaircaseTraversal(height4, maxSteps4))
}
