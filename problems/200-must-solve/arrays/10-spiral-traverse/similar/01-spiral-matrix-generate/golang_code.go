/*
Spiral Matrix II (Generate) - Go Solutions

Generate an n x n matrix filled with elements 1 to n^2 in spiral order.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Layer-by-Layer (Recommended)
// ============================================================================
// Time Complexity:  O(n^2)
// Space Complexity: O(1) extra (O(n^2) for result)
//
// WHY THIS IS BEST:
// - Same pattern as spiral traverse
// - Easy to understand
// - Handles all cases cleanly
// ============================================================================

// GenerateSpiralMatrix generates n x n matrix with values 1 to n^2 in spiral order.
func GenerateSpiralMatrix(n int) [][]int {
	matrix := make([][]int, n)
	for i := range matrix {
		matrix[i] = make([]int, n)
	}

	top, bottom := 0, n-1
	left, right := 0, n-1
	num := 1

	for top <= bottom && left <= right {
		// Fill top row (left to right)
		for col := left; col <= right; col++ {
			matrix[top][col] = num
			num++
		}
		top++

		// Fill right column (top to bottom)
		for row := top; row <= bottom; row++ {
			matrix[row][right] = num
			num++
		}
		right--

		// Fill bottom row (right to left)
		if top <= bottom {
			for col := right; col >= left; col-- {
				matrix[bottom][col] = num
				num++
			}
			bottom--
		}

		// Fill left column (bottom to top)
		if left <= right {
			for row := bottom; row >= top; row-- {
				matrix[row][left] = num
				num++
			}
			left++
		}
	}

	return matrix
}

// ============================================================================
// APPROACH 2: Direction Vectors
// ============================================================================
// Time Complexity:  O(n^2)
// Space Complexity: O(1) extra
//
// WHEN TO USE:
// - More flexible for different spiral patterns
// - Easier to modify for variations
// ============================================================================

// GenerateSpiralDirection generates spiral matrix using direction vectors.
func GenerateSpiralDirection(n int) [][]int {
	matrix := make([][]int, n)
	for i := range matrix {
		matrix[i] = make([]int, n)
	}

	// Direction vectors: (row_delta, col_delta)
	// Order: right, down, left, up
	directions := [][2]int{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}
	dirIdx := 0

	row, col := 0, 0

	for num := 1; num <= n*n; num++ {
		matrix[row][col] = num

		// Calculate next position
		nextRow := row + directions[dirIdx][0]
		nextCol := col + directions[dirIdx][1]

		// Check if we need to change direction
		if nextRow < 0 || nextRow >= n ||
			nextCol < 0 || nextCol >= n ||
			matrix[nextRow][nextCol] != 0 {
			// Change direction (clockwise)
			dirIdx = (dirIdx + 1) % 4
			nextRow = row + directions[dirIdx][0]
			nextCol = col + directions[dirIdx][1]
		}

		row, col = nextRow, nextCol
	}

	return matrix
}

// ============================================================================
// APPROACH 3: Recursive Layer Filling
// ============================================================================
// Time Complexity:  O(n^2)
// Space Complexity: O(n) recursion stack
//
// WHEN TO USE:
// - When recursive thinking is clearer
// - For educational purposes
// ============================================================================

// GenerateSpiralRecursive generates spiral matrix recursively.
func GenerateSpiralRecursive(n int) [][]int {
	matrix := make([][]int, n)
	for i := range matrix {
		matrix[i] = make([]int, n)
	}

	fillLayer(matrix, 0, n-1, 0, n-1, 1)
	return matrix
}

// fillLayer fills one layer of the spiral recursively.
func fillLayer(matrix [][]int, top, bottom, left, right, start int) int {
	if top > bottom || left > right {
		return start
	}

	num := start

	// Top row
	for col := left; col <= right; col++ {
		matrix[top][col] = num
		num++
	}

	// Right column
	for row := top + 1; row <= bottom; row++ {
		matrix[row][right] = num
		num++
	}

	// Bottom row (if exists)
	if top < bottom {
		for col := right - 1; col >= left; col-- {
			matrix[bottom][col] = num
			num++
		}
	}

	// Left column (if exists)
	if left < right {
		for row := bottom - 1; row > top; row-- {
			matrix[row][left] = num
			num++
		}
	}

	// Recurse to inner layer
	return fillLayer(matrix, top+1, bottom-1, left+1, right-1, num)
}

// ============================================================================
// HELPER: Print matrix nicely
// ============================================================================

func printMatrix(matrix [][]int) {
	if len(matrix) == 0 {
		fmt.Println("[]")
		return
	}

	// Find max width
	maxWidth := 1
	for _, row := range matrix {
		for _, val := range row {
			width := len(fmt.Sprintf("%d", val))
			if width > maxWidth {
				maxWidth = width
			}
		}
	}

	for _, row := range matrix {
		fmt.Print("[")
		for i, val := range row {
			if i > 0 {
				fmt.Print(", ")
			}
			fmt.Printf("%*d", maxWidth, val)
		}
		fmt.Println("]")
	}
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		n    int
		desc string
	}{
		{1, "1x1 matrix"},
		{2, "2x2 matrix"},
		{3, "3x3 matrix"},
		{4, "4x4 matrix"},
		{5, "5x5 matrix"},
	}

	approaches := []struct {
		name string
		fn   func(int) [][]int
	}{
		{"Layer-by-Layer (Recommended)", GenerateSpiralMatrix},
		{"Direction Vectors", GenerateSpiralDirection},
		{"Recursive", GenerateSpiralRecursive},
	}

	fmt.Println("======================================================================")
	fmt.Println("SPIRAL MATRIX II (GENERATE) - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.n)
			reference := GenerateSpiralMatrix(tc.n)

			// Compare with reference
			passed := matrixEqual(result, reference)
			status := "PASS"
			if !passed {
				status = "FAIL"
				allPassed = false
			}
			fmt.Printf("  %s: %s\n", status, tc.desc)
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
	n := 3
	fmt.Printf("\nInput: n = %d\n", n)
	result := GenerateSpiralMatrix(n)
	fmt.Println("Output:")
	printMatrix(result)

	// Sample Input 2
	n = 4
	fmt.Printf("\nInput: n = %d\n", n)
	result = GenerateSpiralMatrix(n)
	fmt.Println("Output:")
	printMatrix(result)

	// Sample Input 3
	n = 1
	fmt.Printf("\nInput: n = %d\n", n)
	result = GenerateSpiralMatrix(n)
	fmt.Println("Output:")
	printMatrix(result)
}

// matrixEqual compares two matrices for equality.
func matrixEqual(a, b [][]int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if len(a[i]) != len(b[i]) {
			return false
		}
		for j := range a[i] {
			if a[i][j] != b[i][j] {
				return false
			}
		}
	}
	return true
}
