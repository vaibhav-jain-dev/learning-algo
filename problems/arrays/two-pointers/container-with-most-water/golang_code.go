/*
Container With Most Water
Using Two Pointers Greedy Approach
*/

package main

import "fmt"

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

// maxArea finds maximum water container area
func maxArea(height []int) int {
	left := 0
	right := len(height) - 1
	maxWater := 0

	for left < right {
		// Calculate current area
		width := right - left
		currentHeight := min(height[left], height[right])
		currentArea := width * currentHeight

		maxWater = max(maxWater, currentArea)

		// Move pointer with smaller height
		if height[left] < height[right] {
			left++
		} else {
			right--
		}
	}

	return maxWater
}

// maxAreaWithVisualization returns max area and optimal indices
func maxAreaWithVisualization(height []int) (int, int, int) {
	left := 0
	right := len(height) - 1
	maxWater := 0
	bestLeft, bestRight := 0, 0

	for left < right {
		width := right - left
		currentHeight := min(height[left], height[right])
		currentArea := width * currentHeight

		if currentArea > maxWater {
			maxWater = currentArea
			bestLeft, bestRight = left, right
		}

		if height[left] < height[right] {
			left++
		} else {
			right--
		}
	}

	return maxWater, bestLeft, bestRight
}

func main() {
	testCases := [][]int{
		{1, 8, 6, 2, 5, 4, 8, 3, 7},
		{1, 1},
		{4, 3, 2, 1, 4},
		{1, 2, 4, 3},
		{2, 3, 4, 5, 18, 17, 6},
	}

	fmt.Println("Container With Most Water")
	fmt.Println("==================================================")

	for _, height := range testCases {
		area, left, right := maxAreaWithVisualization(height)
		fmt.Printf("\nHeights: %v\n", height)
		fmt.Printf("Maximum Area: %d\n", area)
		fmt.Printf("Best container: indices [%d, %d]\n", left, right)
		fmt.Printf("Heights at container: [%d, %d]\n", height[left], height[right])
		fmt.Printf("Width: %d, Height: %d\n", right-left, min(height[left], height[right]))
		fmt.Println("------------------------------")
	}
}
