/*
Ways To Traverse Graph - Go Solution

Count the number of ways to traverse from top-left to bottom-right
of a grid, moving only right or down.

Time Complexity: O(width * height) for DP, O(width + height) for math
Space Complexity: O(width) for optimized DP, O(1) for math
*/

package main

import "fmt"

// WaysToTraverseGraph finds number of ways using space-optimized DP
func WaysToTraverseGraph(width, height int) int {
	// Use 1D array - only need current row
	dp := make([]int, width)
	for i := range dp {
		dp[i] = 1 // First row: only 1 way to reach each cell
	}

	for row := 1; row < height; row++ {
		for col := 1; col < width; col++ {
			// Current cell = cell above (dp[col]) + cell to left (dp[col-1])
			dp[col] = dp[col] + dp[col-1]
		}
	}

	return dp[width-1]
}

// WaysToTraverseGraph2D finds number of ways using 2D DP table
func WaysToTraverseGraph2D(width, height int) int {
	// Create 2D table
	dp := make([][]int, height)
	for i := range dp {
		dp[i] = make([]int, width)
	}

	// Base case: first row - only one way to reach each cell (go right)
	for col := 0; col < width; col++ {
		dp[0][col] = 1
	}

	// Base case: first column - only one way to reach each cell (go down)
	for row := 0; row < height; row++ {
		dp[row][0] = 1
	}

	// Fill the rest of the table
	for row := 1; row < height; row++ {
		for col := 1; col < width; col++ {
			dp[row][col] = dp[row-1][col] + dp[row][col-1]
		}
	}

	return dp[height-1][width-1]
}

// WaysToTraverseGraphMath finds number of ways using mathematical combinatorics
// The path requires (width-1) right moves and (height-1) down moves.
// Total moves = width + height - 2
// We need to choose which moves are "right" (or "down").
// Answer = C(width + height - 2, width - 1)
func WaysToTraverseGraphMath(width, height int) int {
	// Calculate C(n, r) = n! / (r! * (n-r)!)
	// where n = width + height - 2, r = width - 1

	xDist := width - 1
	yDist := height - 1

	// Choose smaller of xDist and yDist for efficiency
	if xDist < yDist {
		xDist, yDist = yDist, xDist
	}

	// Calculate C(xDist + yDist, yDist)
	// = (xDist + yDist)! / (xDist! * yDist!)
	// = (xDist + 1) * (xDist + 2) * ... * (xDist + yDist) / yDist!

	numerator := 1
	denominator := 1

	for i := 1; i <= yDist; i++ {
		numerator *= (xDist + i)
		denominator *= i
	}

	return numerator / denominator
}

// WaysToTraverseRecursive finds number of ways using recursion with memoization
func WaysToTraverseRecursive(width, height int) int {
	memo := make(map[[2]int]int)
	return waysRecursiveHelper(width, height, memo)
}

func waysRecursiveHelper(width, height int, memo map[[2]int]int) int {
	// Base cases
	if width == 1 || height == 1 {
		return 1
	}

	// Check memo
	key := [2]int{width, height}
	if val, exists := memo[key]; exists {
		return val
	}

	// Recursive case: sum of going right and going down
	result := waysRecursiveHelper(width-1, height, memo) +
		waysRecursiveHelper(width, height-1, memo)

	memo[key] = result
	return result
}

func main() {
	// Test 1: Example from problem
	result1 := WaysToTraverseGraph(4, 3)
	fmt.Printf("Test 1 (4x3 grid): %d\n", result1) // Expected: 10

	// Test 2: 2x2 grid
	result2 := WaysToTraverseGraph(2, 2)
	fmt.Printf("Test 2 (2x2 grid): %d\n", result2) // Expected: 2

	// Test 3: 3x3 grid
	result3 := WaysToTraverseGraph(3, 3)
	fmt.Printf("Test 3 (3x3 grid): %d\n", result3) // Expected: 6

	// Test 4: Single column
	result4 := WaysToTraverseGraph(1, 5)
	fmt.Printf("Test 4 (1x5 grid): %d\n", result4) // Expected: 1

	// Test 5: Single row
	result5 := WaysToTraverseGraph(5, 1)
	fmt.Printf("Test 5 (5x1 grid): %d\n", result5) // Expected: 1

	// Test 6: 1x1 grid (just start = end)
	result6 := WaysToTraverseGraph(1, 1)
	fmt.Printf("Test 6 (1x1 grid): %d\n", result6) // Expected: 1

	// Test 7: Larger grid
	result7 := WaysToTraverseGraph(5, 5)
	fmt.Printf("Test 7 (5x5 grid): %d\n", result7) // Expected: 70

	// Test 8: 2x3 grid (from problem description)
	result8 := WaysToTraverseGraph(2, 3)
	fmt.Printf("Test 8 (2x3 grid): %d\n", result8) // Expected: 3

	// Verify all approaches give same result
	fmt.Println("\n--- Verifying all approaches ---")
	testWidth, testHeight := 6, 4
	r1 := WaysToTraverseGraph(testWidth, testHeight)
	r2 := WaysToTraverseGraph2D(testWidth, testHeight)
	r3 := WaysToTraverseGraphMath(testWidth, testHeight)
	r4 := WaysToTraverseRecursive(testWidth, testHeight)
	fmt.Printf("Grid %dx%d:\n", testWidth, testHeight)
	fmt.Printf("  Space-optimized DP: %d\n", r1)
	fmt.Printf("  2D DP: %d\n", r2)
	fmt.Printf("  Mathematical: %d\n", r3)
	fmt.Printf("  Recursive with memo: %d\n", r4)
	fmt.Printf("  All match: %v\n", r1 == r2 && r2 == r3 && r3 == r4)

	// Test 9: Moderately large grid
	result9 := WaysToTraverseGraphMath(15, 15)
	fmt.Printf("\nTest 9 (15x15 grid): %d\n", result9) // Expected: 40116600

	fmt.Println("\nAll tests completed!")
}
