// Trapping Rain Water - Two Pointer Approach
//
// Problem: Given n non-negative integers representing an elevation map where
// the width of each bar is 1, compute how much water it can trap after raining.
//
// Time Complexity: O(n)
// Space Complexity: O(1)

package main

import (
	"fmt"
	"strings"
)

// trap calculates the amount of water that can be trapped using two pointers.
//
// The key insight is that at any position, water level is determined by
// the minimum of max heights on both sides. We process the smaller side
// first since it's the limiting factor.
func trap(height []int) int {
	if len(height) < 3 {
		return 0
	}

	left := 0
	right := len(height) - 1
	leftMax := 0
	rightMax := 0
	water := 0

	for left < right {
		if height[left] < height[right] {
			// Left side is the limiting factor
			if height[left] >= leftMax {
				// Current position is a new max, no water can be trapped
				leftMax = height[left]
			} else {
				// Water can be trapped: leftMax - current height
				water += leftMax - height[left]
			}
			left++
		} else {
			// Right side is the limiting factor
			if height[right] >= rightMax {
				// Current position is a new max, no water can be trapped
				rightMax = height[right]
			} else {
				// Water can be trapped: rightMax - current height
				water += rightMax - height[right]
			}
			right--
		}
	}

	return water
}

// trapWithArrays is an alternative approach using precomputed leftMax and rightMax arrays.
// Time Complexity: O(n), Space Complexity: O(n)
// This is easier to understand but uses more space.
func trapWithArrays(height []int) int {
	n := len(height)
	if n < 3 {
		return 0
	}

	// leftMax[i] = maximum height from index 0 to i
	leftMax := make([]int, n)
	leftMax[0] = height[0]
	for i := 1; i < n; i++ {
		leftMax[i] = max(leftMax[i-1], height[i])
	}

	// rightMax[i] = maximum height from index i to n-1
	rightMax := make([]int, n)
	rightMax[n-1] = height[n-1]
	for i := n - 2; i >= 0; i-- {
		rightMax[i] = max(rightMax[i+1], height[i])
	}

	// Calculate water at each position
	water := 0
	for i := 0; i < n; i++ {
		waterLevel := min(leftMax[i], rightMax[i])
		water += waterLevel - height[i]
	}

	return water
}

// visualize creates a visual representation of the elevation map with trapped water
func visualize(height []int) string {
	if len(height) == 0 {
		return "Empty input"
	}

	n := len(height)
	maxHeight := 0
	for _, h := range height {
		if h > maxHeight {
			maxHeight = h
		}
	}

	// Calculate water levels at each position
	leftMax := make([]int, n)
	rightMax := make([]int, n)

	leftMax[0] = height[0]
	for i := 1; i < n; i++ {
		leftMax[i] = max(leftMax[i-1], height[i])
	}

	rightMax[n-1] = height[n-1]
	for i := n - 2; i >= 0; i-- {
		rightMax[i] = max(rightMax[i+1], height[i])
	}

	waterLevels := make([]int, n)
	for i := 0; i < n; i++ {
		waterLevels[i] = min(leftMax[i], rightMax[i])
	}

	// Build visual representation
	var lines []string
	for level := maxHeight; level > 0; level-- {
		var row strings.Builder
		for i := 0; i < n; i++ {
			if height[i] >= level {
				row.WriteRune('#')
			} else if waterLevels[i] >= level {
				row.WriteRune('~')
			} else {
				row.WriteRune(' ')
			}
		}
		lines = append(lines, row.String())
	}

	// Add base with heights
	lines = append(lines, strings.Repeat("-", n))
	var heightStr strings.Builder
	for _, h := range height {
		heightStr.WriteString(fmt.Sprintf("%d", h%10))
	}
	lines = append(lines, heightStr.String())

	return strings.Join(lines, "\n")
}

// TestCase represents a test case for the trapping rain water problem
type TestCase struct {
	height      []int
	expected    int
	description string
}

func runTests() bool {
	testCases := []TestCase{
		{[]int{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}, 6, "Classic example"},
		{[]int{4, 2, 0, 3, 2, 5}, 9, "Simple case"},
		{[]int{1, 0, 2, 0, 1}, 2, "Small symmetric case"},
		{[]int{3, 2, 1}, 0, "Descending - no water"},
		{[]int{1, 2, 3}, 0, "Ascending - no water"},
		{[]int{5, 4, 1, 2}, 1, "Water at single position"},
		{[]int{2, 0, 2}, 2, "Simple pool"},
		{[]int{3, 0, 0, 2, 0, 4}, 10, "Deep pool"},
		{[]int{}, 0, "Empty array"},
		{[]int{1}, 0, "Single element"},
		{[]int{1, 2}, 0, "Two elements"},
		{[]int{0, 0, 0}, 0, "All zeros"},
		{[]int{5, 5, 5, 5}, 0, "Flat surface"},
		{[]int{0, 7, 1, 4, 6}, 7, "Uneven terrain"},
		{[]int{4, 2, 3}, 1, "Small valley"},
	}

	fmt.Println(strings.Repeat("=", 70))
	fmt.Println("TRAPPING RAIN WATER - Test Results")
	fmt.Println(strings.Repeat("=", 70))

	allPassed := true

	for i, tc := range testCases {
		// Test two-pointer approach
		result1 := trap(tc.height)
		// Test array approach
		result2 := trapWithArrays(tc.height)

		passed := result1 == tc.expected && result2 == tc.expected
		status := "PASS"
		if !passed {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("\nTest %d: %s\n", i+1, tc.description)
		fmt.Printf("  Input:    %v\n", tc.height)
		fmt.Printf("  Expected: %d\n", tc.expected)
		fmt.Printf("  Got (two-pointer): %d\n", result1)
		fmt.Printf("  Got (array):       %d\n", result2)
		fmt.Printf("  Status:   [%s]\n", status)

		// Show visualization for some interesting cases
		if len(tc.height) > 0 && len(tc.height) <= 15 {
			maxH := 0
			for _, h := range tc.height {
				if h > maxH {
					maxH = h
				}
			}
			if maxH <= 10 {
				fmt.Println("\n  Visualization:")
				viz := visualize(tc.height)
				for _, line := range strings.Split(viz, "\n") {
					fmt.Printf("    %s\n", line)
				}
			}
		}
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 70))
	if allPassed {
		fmt.Println("All tests passed!")
	} else {
		fmt.Println("Some tests failed!")
	}
	fmt.Println(strings.Repeat("=", 70))

	return allPassed
}

// demoStepByStep demonstrates the two-pointer algorithm step by step
func demoStepByStep() {
	height := []int{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 70))
	fmt.Println("STEP-BY-STEP WALKTHROUGH")
	fmt.Println(strings.Repeat("=", 70))
	fmt.Printf("\nInput: %v\n", height)
	fmt.Println("\nTwo-pointer algorithm trace:\n")

	left := 0
	right := len(height) - 1
	leftMax := 0
	rightMax := 0
	water := 0
	step := 0

	for left < right {
		step++
		fmt.Printf("Step %d:\n", step)
		fmt.Printf("  left=%d, right=%d\n", left, right)
		fmt.Printf("  height[left]=%d, height[right]=%d\n", height[left], height[right])
		fmt.Printf("  leftMax=%d, rightMax=%d\n", leftMax, rightMax)

		if height[left] < height[right] {
			if height[left] >= leftMax {
				leftMax = height[left]
				fmt.Printf("  -> Update leftMax to %d\n", leftMax)
			} else {
				added := leftMax - height[left]
				water += added
				fmt.Printf("  -> Add water: %d - %d = %d\n", leftMax, height[left], added)
			}
			left++
			fmt.Printf("  -> Move left to %d\n", left)
		} else {
			if height[right] >= rightMax {
				rightMax = height[right]
				fmt.Printf("  -> Update rightMax to %d\n", rightMax)
			} else {
				added := rightMax - height[right]
				water += added
				fmt.Printf("  -> Add water: %d - %d = %d\n", rightMax, height[right], added)
			}
			right--
			fmt.Printf("  -> Move right to %d\n", right)
		}

		fmt.Printf("  Total water so far: %d\n\n", water)
	}

	fmt.Printf("Final answer: %d units of water\n", water)
}

func main() {
	// Run all tests
	runTests()

	// Show step-by-step demonstration
	demoStepByStep()
}
