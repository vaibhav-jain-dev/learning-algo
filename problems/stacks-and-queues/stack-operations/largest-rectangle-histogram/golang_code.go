package main

import (
	"fmt"
	"strings"
)

// largestRectangleArea finds the largest rectangle area in a histogram using monotonic stack.
// Uses a monotonic increasing stack to efficiently find, for each bar,
// how far it can extend left and right while being the minimum height.
//
// Time Complexity: O(n) - each element pushed and popped at most once
// Space Complexity: O(n) - for the stack
func largestRectangleArea(heights []int) int {
	stack := make([]int, 0) // Stack of indices
	maxArea := 0
	n := len(heights)

	for i := 0; i <= n; i++ {
		// Use 0 as sentinel for processing remaining bars at the end
		currentHeight := 0
		if i < n {
			currentHeight = heights[i]
		}

		for len(stack) > 0 && currentHeight < heights[stack[len(stack)-1]] {
			height := heights[stack[len(stack)-1]]
			stack = stack[:len(stack)-1]

			// Width calculation
			width := i
			if len(stack) > 0 {
				width = i - stack[len(stack)-1] - 1
			}

			area := height * width
			if area > maxArea {
				maxArea = area
			}
		}

		stack = append(stack, i)
	}

	return maxArea
}

// largestRectangleAreaBruteForce is the brute force approach.
// Time Complexity: O(n^2)
// Space Complexity: O(1)
func largestRectangleAreaBruteForce(heights []int) int {
	maxArea := 0
	n := len(heights)

	for i := 0; i < n; i++ {
		// Find how far left we can extend
		left := i
		for left > 0 && heights[left-1] >= heights[i] {
			left--
		}

		// Find how far right we can extend
		right := i
		for right < n-1 && heights[right+1] >= heights[i] {
			right++
		}

		width := right - left + 1
		area := heights[i] * width
		if area > maxArea {
			maxArea = area
		}
	}

	return maxArea
}

// largestRectangleAreaTwoPass uses precomputed left and right boundaries.
// Time Complexity: O(n)
// Space Complexity: O(n)
func largestRectangleAreaTwoPass(heights []int) int {
	n := len(heights)
	if n == 0 {
		return 0
	}

	// left[i] = index of first bar shorter than heights[i] to the left (-1 if none)
	left := make([]int, n)
	stack := make([]int, 0)

	for i := 0; i < n; i++ {
		for len(stack) > 0 && heights[stack[len(stack)-1]] >= heights[i] {
			stack = stack[:len(stack)-1]
		}
		if len(stack) > 0 {
			left[i] = stack[len(stack)-1]
		} else {
			left[i] = -1
		}
		stack = append(stack, i)
	}

	// right[i] = index of first bar shorter than heights[i] to the right (n if none)
	right := make([]int, n)
	stack = make([]int, 0)

	for i := n - 1; i >= 0; i-- {
		for len(stack) > 0 && heights[stack[len(stack)-1]] >= heights[i] {
			stack = stack[:len(stack)-1]
		}
		if len(stack) > 0 {
			right[i] = stack[len(stack)-1]
		} else {
			right[i] = n
		}
		stack = append(stack, i)
	}

	// Calculate max area
	maxArea := 0
	for i := 0; i < n; i++ {
		width := right[i] - left[i] - 1
		area := heights[i] * width
		if area > maxArea {
			maxArea = area
		}
	}

	return maxArea
}

// RectangleDetails holds information about the largest rectangle
type RectangleDetails struct {
	Height int
	Width  int
	Left   int
	Right  int
	Area   int
}

// largestRectangleWithDetails returns area and details about the rectangle
func largestRectangleWithDetails(heights []int) (int, RectangleDetails) {
	stack := make([]int, 0)
	maxArea := 0
	bestRect := RectangleDetails{}
	n := len(heights)

	for i := 0; i <= n; i++ {
		currentHeight := 0
		if i < n {
			currentHeight = heights[i]
		}

		for len(stack) > 0 && currentHeight < heights[stack[len(stack)-1]] {
			height := heights[stack[len(stack)-1]]
			stack = stack[:len(stack)-1]

			width := i
			leftIdx := 0
			if len(stack) > 0 {
				width = i - stack[len(stack)-1] - 1
				leftIdx = stack[len(stack)-1] + 1
			}

			area := height * width
			if area > maxArea {
				maxArea = area
				bestRect = RectangleDetails{
					Height: height,
					Width:  width,
					Left:   leftIdx,
					Right:  i - 1,
					Area:   area,
				}
			}
		}

		stack = append(stack, i)
	}

	return maxArea, bestRect
}

// largestRectangleWithTrace returns execution trace for understanding
func largestRectangleWithTrace(heights []int) (int, []string) {
	stack := make([]int, 0)
	maxArea := 0
	trace := make([]string, 0)
	n := len(heights)

	for i := 0; i <= n; i++ {
		currentHeight := 0
		if i < n {
			currentHeight = heights[i]
		}
		trace = append(trace, fmt.Sprintf("\nIndex %d: Current height = %d", i, currentHeight))
		trace = append(trace, fmt.Sprintf("  Stack (indices): %v", stack))

		for len(stack) > 0 && currentHeight < heights[stack[len(stack)-1]] {
			poppedIdx := stack[len(stack)-1]
			stack = stack[:len(stack)-1]

			height := heights[poppedIdx]
			width := i
			if len(stack) > 0 {
				width = i - stack[len(stack)-1] - 1
			}

			area := height * width
			trace = append(trace, fmt.Sprintf("  Pop index %d (height %d): width=%d, area=%d", poppedIdx, height, width, area))

			if area > maxArea {
				maxArea = area
				trace = append(trace, fmt.Sprintf("    New max area: %d", maxArea))
			}
		}

		if i < n {
			stack = append(stack, i)
			trace = append(trace, fmt.Sprintf("  Push index %d", i))
		}
	}

	return maxArea, trace
}

// TestCase represents a single test case
type TestCase struct {
	heights     []int
	expected    int
	description string
}

func runTests() {
	testCases := []TestCase{
		{[]int{2, 1, 5, 6, 2, 3}, 10, "Example 1"},
		{[]int{2, 4}, 4, "Two bars"},
		{[]int{1, 1, 1, 1}, 4, "All equal"},
		{[]int{5, 4, 3, 2, 1}, 9, "Decreasing"},
		{[]int{1, 2, 3, 4, 5}, 9, "Increasing"},
		{[]int{1}, 1, "Single bar"},
		{[]int{0}, 0, "Single zero"},
		{[]int{2, 1, 2}, 3, "Valley"},
		{[]int{1, 2, 1}, 3, "Peak"},
		{[]int{4, 2, 0, 3, 2, 5}, 6, "With zero"},
		{[]int{6, 2, 5, 4, 5, 1, 6}, 12, "Complex 1"},
		{[]int{3, 6, 5, 7, 4, 8, 1, 0}, 20, "Complex 2"},
		{[]int{0, 9}, 9, "Zero and large"},
	}

	fmt.Println("Testing largestRectangleArea function:")
	fmt.Println(strings.Repeat("=", 70))

	allPassed := true
	for i, tc := range testCases {
		result := largestRectangleArea(tc.heights)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}

		heightsStr := fmt.Sprintf("%v", tc.heights)
		if len(heightsStr) > 35 {
			heightsStr = heightsStr[:32] + "..."
		}
		fmt.Printf("Test %2d: %s\n", i+1, tc.description)
		fmt.Printf("         Input: %s\n", heightsStr)
		fmt.Printf("         Result: %d, Expected: %d [%s]\n\n", result, tc.expected, status)
	}

	fmt.Println(strings.Repeat("=", 70))
	fmt.Printf("All tests passed: %v\n\n", allPassed)

	// Compare all implementations
	fmt.Println("Comparing all implementations:")
	fmt.Println(strings.Repeat("=", 70))

	allMatch := true
	for _, tc := range testCases {
		result1 := largestRectangleArea(tc.heights)
		result2 := largestRectangleAreaBruteForce(tc.heights)
		result3 := largestRectangleAreaTwoPass(tc.heights)

		if result1 != result2 || result2 != result3 || result1 != tc.expected {
			allMatch = false
			fmt.Printf("MISMATCH for %s: stack=%d, brute=%d, two_pass=%d\n",
				tc.description, result1, result2, result3)
		}
	}

	if allMatch {
		fmt.Println("All implementations produce identical correct results!")
	}
	fmt.Println()

	// Demonstrate detailed results
	fmt.Println("Demonstrating detailed rectangle information:")
	fmt.Println(strings.Repeat("=", 70))

	demoHeights := []int{2, 1, 5, 6, 2, 3}
	area, details := largestRectangleWithDetails(demoHeights)
	fmt.Printf("Heights: %v\n", demoHeights)
	fmt.Printf("Largest area: %d\n", area)
	fmt.Println("Rectangle details:")
	fmt.Printf("  Height: %d\n", details.Height)
	fmt.Printf("  Width: %d\n", details.Width)
	fmt.Printf("  Left index: %d\n", details.Left)
	fmt.Printf("  Right index: %d\n", details.Right)
	fmt.Printf("  Area: %d\n", details.Area)
	fmt.Println()

	// Demonstrate trace
	fmt.Println("Algorithm trace for [2, 1, 5, 6, 2, 3]:")
	fmt.Println(strings.Repeat("=", 70))

	areaTrace, trace := largestRectangleWithTrace(demoHeights)
	for _, line := range trace {
		fmt.Println(line)
	}
	fmt.Printf("\nFinal largest area: %d\n", areaTrace)
}

func main() {
	runTests()
}
