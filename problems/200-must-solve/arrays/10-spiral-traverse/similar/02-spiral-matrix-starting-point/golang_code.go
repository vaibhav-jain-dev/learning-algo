/*
Spiral Matrix III (Starting Point) - Go Solutions

Start from a cell and visit all cells in spiral order.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Simulation (Recommended)
// ============================================================================
// Time Complexity:  O(max(rows, cols)^2)
// Space Complexity: O(rows * cols) for result
//
// WHY THIS IS BEST:
// - Direct simulation of the problem
// - Easy to understand
// - Handles out-of-bounds naturally
// ============================================================================

// SpiralMatrixIII visits all cells starting from (rStart, cStart) in spiral order.
func SpiralMatrixIII(rows, cols, rStart, cStart int) [][]int {
	result := make([][]int, 0, rows*cols)

	// Directions: right, down, left, up
	directions := [][2]int{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}
	dirIdx := 0

	row, col := rStart, cStart
	steps := 1 // Steps to take in current direction

	for len(result) < rows*cols {
		// Take 2 directions with same step count
		for i := 0; i < 2; i++ {
			dr, dc := directions[dirIdx][0], directions[dirIdx][1]

			for j := 0; j < steps; j++ {
				// Add if within bounds
				if row >= 0 && row < rows && col >= 0 && col < cols {
					result = append(result, []int{row, col})
				}

				row += dr
				col += dc
			}

			// Turn clockwise
			dirIdx = (dirIdx + 1) % 4
		}

		// Increase step count after every 2 directions
		steps++
	}

	return result
}

// ============================================================================
// APPROACH 2: Channel-based (for streaming)
// ============================================================================
// Time Complexity:  O(max(rows, cols)^2)
// Space Complexity: O(1) excluding output
//
// WHEN TO USE:
// - When processing cells as a stream
// - Concurrent processing
// ============================================================================

// SpiralMatrixIIIChan returns a channel that yields coordinates.
func SpiralMatrixIIIChan(rows, cols, rStart, cStart int) <-chan [2]int {
	ch := make(chan [2]int)

	go func() {
		defer close(ch)

		directions := [][2]int{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}
		dirIdx := 0
		row, col := rStart, cStart
		steps := 1
		count := 0
		total := rows * cols

		for count < total {
			for i := 0; i < 2 && count < total; i++ {
				dr, dc := directions[dirIdx][0], directions[dirIdx][1]

				for j := 0; j < steps && count < total; j++ {
					if row >= 0 && row < rows && col >= 0 && col < cols {
						ch <- [2]int{row, col}
						count++
					}

					row += dr
					col += dc
				}

				dirIdx = (dirIdx + 1) % 4
			}

			steps++
		}
	}()

	return ch
}

// SpiralMatrixIIIFromChan collects results from channel.
func SpiralMatrixIIIFromChan(rows, cols, rStart, cStart int) [][]int {
	result := make([][]int, 0, rows*cols)
	for coord := range SpiralMatrixIIIChan(rows, cols, rStart, cStart) {
		result = append(result, []int{coord[0], coord[1]})
	}
	return result
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		rows, cols, rStart, cStart int
		expectedLen                int
		desc                       string
	}{
		{1, 4, 0, 0, 4, "Single row"},
		{3, 3, 1, 1, 9, "Start from center"},
		{5, 6, 1, 4, 30, "Large grid"},
		{1, 1, 0, 0, 1, "Single cell"},
		{2, 2, 0, 0, 4, "2x2 from corner"},
	}

	approaches := []struct {
		name string
		fn   func(int, int, int, int) [][]int
	}{
		{"Simulation (Recommended)", SpiralMatrixIII},
		{"Channel-based", SpiralMatrixIIIFromChan},
	}

	fmt.Println("======================================================================")
	fmt.Println("SPIRAL MATRIX III (STARTING POINT) - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.rows, tc.cols, tc.rStart, tc.cStart)

			// Verify length
			passed := len(result) == tc.expectedLen

			// Verify all cells are unique and valid
			if passed {
				seen := make(map[[2]int]bool)
				for _, cell := range result {
					coord := [2]int{cell[0], cell[1]}
					if seen[coord] || cell[0] < 0 || cell[0] >= tc.rows ||
						cell[1] < 0 || cell[1] >= tc.cols {
						passed = false
						break
					}
					seen[coord] = true
				}
			}

			status := "PASS"
			if !passed {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  %s: %s (%dx%d from (%d,%d))\n",
				status, tc.desc, tc.rows, tc.cols, tc.rStart, tc.cStart)
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

	// Sample Input 1
	rows, cols, rStart, cStart := 1, 4, 0, 0
	fmt.Printf("\nInput: rows=%d, cols=%d, rStart=%d, cStart=%d\n", rows, cols, rStart, cStart)
	result := SpiralMatrixIII(rows, cols, rStart, cStart)
	fmt.Printf("Output: %v\n", result)

	// Sample Input 2
	rows, cols, rStart, cStart = 3, 3, 1, 1
	fmt.Printf("\nInput: rows=%d, cols=%d, rStart=%d, cStart=%d\n", rows, cols, rStart, cStart)
	result = SpiralMatrixIII(rows, cols, rStart, cStart)
	fmt.Printf("Output: %v\n", result)
}
