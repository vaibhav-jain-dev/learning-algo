/*
Anti-Spiral Traverse - Go Solutions

Traverse matrix in anti-spiral order (counterclockwise from center).

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Center-Out Counterclockwise (Recommended)
// ============================================================================

// AntiSpiralTraverse traverses matrix counterclockwise from center.
func AntiSpiralTraverse(matrix [][]int) []int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return []int{}
	}

	rows, cols := len(matrix), len(matrix[0])
	result := make([]int, 0, rows*cols)

	// Find center
	centerRow := rows / 2
	centerCol := cols / 2

	// Counterclockwise: left, down, right, up
	directions := [][2]int{{0, -1}, {1, 0}, {0, 1}, {-1, 0}}
	dirIdx := 0

	row, col := centerRow, centerCol
	steps := 1

	visited := make(map[[2]int]bool)

	for len(result) < rows*cols {
		for i := 0; i < 2; i++ {
			dr, dc := directions[dirIdx][0], directions[dirIdx][1]

			for j := 0; j < steps; j++ {
				coord := [2]int{row, col}
				if row >= 0 && row < rows && col >= 0 && col < cols && !visited[coord] {
					result = append(result, matrix[row][col])
					visited[coord] = true
				}

				row += dr
				col += dc
			}

			dirIdx = (dirIdx + 1) % 4
		}

		steps++

		if steps > rows+cols {
			break
		}
	}

	return result
}

// ============================================================================
// APPROACH 2: Counterclockwise Outside-In
// ============================================================================

// AntiSpiralReverse traverses counterclockwise from outside.
func AntiSpiralReverse(matrix [][]int) []int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return []int{}
	}

	result := make([]int, 0)
	rows, cols := len(matrix), len(matrix[0])

	top, bottom := 0, rows-1
	left, right := 0, cols-1

	for top <= bottom && left <= right {
		// Left column (top to bottom)
		for row := top; row <= bottom; row++ {
			result = append(result, matrix[row][left])
		}
		left++

		// Bottom row (left to right)
		if left <= right {
			for col := left; col <= right; col++ {
				result = append(result, matrix[bottom][col])
			}
			bottom--
		}

		// Right column (bottom to top)
		if top <= bottom {
			for row := bottom; row >= top; row-- {
				result = append(result, matrix[row][right])
			}
			right--
		}

		// Top row (right to left)
		if left <= right {
			for col := right; col >= left; col-- {
				result = append(result, matrix[top][col])
			}
			top++
		}
	}

	return result
}

// ============================================================================
// APPROACH 3: Reversed Clockwise
// ============================================================================

func spiralClockwise(matrix [][]int) []int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return []int{}
	}

	result := make([]int, 0)
	rows, cols := len(matrix), len(matrix[0])
	top, bottom, left, right := 0, rows-1, 0, cols-1

	for top <= bottom && left <= right {
		for col := left; col <= right; col++ {
			result = append(result, matrix[top][col])
		}
		top++

		for row := top; row <= bottom; row++ {
			result = append(result, matrix[row][right])
		}
		right--

		if top <= bottom {
			for col := right; col >= left; col-- {
				result = append(result, matrix[bottom][col])
			}
			bottom--
		}

		if left <= right {
			for row := bottom; row >= top; row-- {
				result = append(result, matrix[row][left])
			}
			left++
		}
	}

	return result
}

// AntiSpiralSimple returns reversed clockwise spiral.
func AntiSpiralSimple(matrix [][]int) []int {
	spiral := spiralClockwise(matrix)
	// Reverse
	for i, j := 0, len(spiral)-1; i < j; i, j = i+1, j-1 {
		spiral[i], spiral[j] = spiral[j], spiral[i]
	}
	return spiral
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		matrix      [][]int
		expectedLen int
		desc        string
	}{
		{[][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}, 9, "3x3 matrix"},
		{[][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}}, 12, "3x4 matrix"},
		{[][]int{{1}}, 1, "1x1 matrix"},
		{[][]int{{1, 2}, {3, 4}}, 4, "2x2 matrix"},
	}

	approaches := []struct {
		name string
		fn   func([][]int) []int
	}{
		{"Center-Out Counterclockwise", AntiSpiralTraverse},
		{"Counterclockwise Outside-In", AntiSpiralReverse},
		{"Reversed Clockwise", AntiSpiralSimple},
	}

	fmt.Println("======================================================================")
	fmt.Println("ANTI-SPIRAL TRAVERSE - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.matrix)
			passed := len(result) == tc.expectedLen

			status := "PASS"
			if !passed {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  %s: %s: %v\n", status, tc.desc, result)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		} else {
			fmt.Println("  Some tests failed!")
		}
	}

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	matrix := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	fmt.Printf("\nInput: %v\n", matrix)
	fmt.Printf("Anti-spiral (center-out): %v\n", AntiSpiralTraverse(matrix))
	fmt.Printf("Anti-spiral (outside-in): %v\n", AntiSpiralReverse(matrix))
}
