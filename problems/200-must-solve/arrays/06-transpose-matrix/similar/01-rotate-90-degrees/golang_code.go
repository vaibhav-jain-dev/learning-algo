/*
Rotate Matrix 90 Degrees Clockwise - Go Solutions

Rotate an n x n matrix 90 degrees clockwise in-place.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Transpose + Reverse (RECOMMENDED)
// ============================================================================
// Time Complexity:  O(n^2) - visit each element twice
// Space Complexity: O(1) - in-place modification
//
// WHY THIS IS BEST:
// - Simple and intuitive two-step process
// - Easy to remember: "Transpose then Reverse"
// - Each step is a well-understood operation
// ============================================================================

// Rotate90Clockwise rotates matrix 90 degrees clockwise using transpose + reverse.
//
// Key Insight: 90 CW rotation = Transpose + Reverse each row
//
// Mathematical proof:
//   - Transpose: (i, j) -> (j, i)
//   - Reverse row j: (j, i) -> (j, n-1-i)
//   - Combined: (i, j) -> (j, n-1-i) = 90 degrees clockwise!
//
// Visual:
//
//	Original:        Transpose:       Reverse rows:
//	[1, 2, 3]        [1, 4, 7]        [7, 4, 1]
//	[4, 5, 6]   ->   [2, 5, 8]   ->   [8, 5, 2]
//	[7, 8, 9]        [3, 6, 9]        [9, 6, 3]
func Rotate90Clockwise(matrix [][]int) {
	n := len(matrix)
	if n == 0 {
		return
	}

	// Step 1: Transpose (swap across main diagonal)
	// Only iterate upper triangle to avoid double-swapping
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
		}
	}

	// Step 2: Reverse each row
	for i := range matrix {
		reverseRow(matrix[i])
	}
}

// reverseRow reverses a slice in-place
func reverseRow(row []int) {
	left, right := 0, len(row)-1
	for left < right {
		row[left], row[right] = row[right], row[left]
		left++
		right--
	}
}

// ============================================================================
// APPROACH 2: Four-Way Swap (Layer by Layer)
// ============================================================================
// Time Complexity:  O(n^2) - each element visited once
// Space Complexity: O(1) - only one temp variable
//
// INTUITION:
// - Process matrix layer by layer (like an onion)
// - For each position, rotate 4 elements at once
// ============================================================================

// Rotate90ClockwiseLayers rotates using layer-by-layer four-way swap.
//
// Process:
//  1. Start from outermost layer, work inward
//  2. For each layer, rotate 4 elements at a time in a cycle
//  3. Move: top->right, right->bottom, bottom->left, left->top
//
// Visual for 4x4 matrix:
//
//	Layer 0 (outer):     Layer 1 (inner):
//	+---+---+---+---+    +---+---+---+---+
//	| * | * | * | * |    |   |   |   |   |
//	+---+---+---+---+    +---+---+---+---+
//	| * |   |   | * |    |   | * | * |   |
//	+---+---+---+---+    +---+---+---+---+
//	| * |   |   | * |    |   | * | * |   |
//	+---+---+---+---+    +---+---+---+---+
//	| * | * | * | * |    |   |   |   |   |
//	+---+---+---+---+    +---+---+---+---+
func Rotate90ClockwiseLayers(matrix [][]int) {
	n := len(matrix)
	if n == 0 {
		return
	}

	// Process each layer from outside to inside
	for layer := 0; layer < n/2; layer++ {
		first := layer
		last := n - 1 - layer

		for i := first; i < last; i++ {
			offset := i - first

			// Save top element
			top := matrix[first][i]

			// Move left to top
			matrix[first][i] = matrix[last-offset][first]

			// Move bottom to left
			matrix[last-offset][first] = matrix[last][last-offset]

			// Move right to bottom
			matrix[last][last-offset] = matrix[i][last]

			// Move top to right
			matrix[i][last] = top
		}
	}
}

// ============================================================================
// APPROACH 3: Rotate Counter-Clockwise (90 CCW) - Bonus
// ============================================================================
// Time Complexity:  O(n^2)
// Space Complexity: O(1)
//
// BONUS: Reverse first, then transpose = 90 degrees counter-clockwise
// ============================================================================

// Rotate90CounterClockwise rotates 90 degrees counter-clockwise.
//
// Key Insight: 90 CCW = Reverse each row + Transpose
func Rotate90CounterClockwise(matrix [][]int) {
	n := len(matrix)
	if n == 0 {
		return
	}

	// Step 1: Reverse each row
	for i := range matrix {
		reverseRow(matrix[i])
	}

	// Step 2: Transpose
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
		}
	}
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

func printMatrix(matrix [][]int, name string) {
	fmt.Printf("%s:\n", name)
	for _, row := range matrix {
		fmt.Printf("  %v\n", row)
	}
}

func copyMatrix(matrix [][]int) [][]int {
	result := make([][]int, len(matrix))
	for i, row := range matrix {
		result[i] = make([]int, len(row))
		copy(result[i], row)
	}
	return result
}

func matricesEqual(a, b [][]int) bool {
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

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		matrix   [][]int
		expected [][]int
		desc     string
	}{
		{
			[][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}},
			[][]int{{7, 4, 1}, {8, 5, 2}, {9, 6, 3}},
			"3x3 matrix",
		},
		{
			[][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}},
			[][]int{{13, 9, 5, 1}, {14, 10, 6, 2}, {15, 11, 7, 3}, {16, 12, 8, 4}},
			"4x4 matrix",
		},
		{
			[][]int{{1, 2}, {3, 4}},
			[][]int{{3, 1}, {4, 2}},
			"2x2 matrix",
		},
		{
			[][]int{{5}},
			[][]int{{5}},
			"1x1 matrix",
		},
	}

	approaches := []struct {
		name string
		fn   func([][]int)
	}{
		{"Transpose + Reverse (Recommended)", Rotate90Clockwise},
		{"Four-Way Swap (Layers)", Rotate90ClockwiseLayers},
	}

	fmt.Println("======================================================================")
	fmt.Println("ROTATE MATRIX 90 DEGREES CLOCKWISE - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, tc := range testCases {
		fmt.Printf("\n%s:\n", tc.desc)
		printMatrix(tc.matrix, "  Original")
		printMatrix(tc.expected, "  Expected")

		for _, approach := range approaches {
			testMatrix := copyMatrix(tc.matrix)
			approach.fn(testMatrix)
			passed := matricesEqual(testMatrix, tc.expected)
			status := "PASS"
			if !passed {
				status = "FAIL"
			}
			fmt.Printf("    %s: %s\n", approach.name, status)
		}
	}

	// Test counter-clockwise rotation
	fmt.Println("\n--------------------------------------------------")
	fmt.Println("COUNTER-CLOCKWISE ROTATION TEST:")
	fmt.Println("--------------------------------------------------")
	ccwMatrix := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	printMatrix(ccwMatrix, "  Original")
	Rotate90CounterClockwise(ccwMatrix)
	printMatrix(ccwMatrix, "  After 90 CCW")
	fmt.Println("  Expected: [[3, 6, 9], [2, 5, 8], [1, 4, 7]]")

	fmt.Println("\n======================================================================")
	fmt.Println("COMPLEXITY COMPARISON")
	fmt.Println("======================================================================")
	fmt.Println(`
    +---------------------------+---------+----------+-------------------+
    |        Approach           |  Time   |  Space   |   Recommendation  |
    +---------------------------+---------+----------+-------------------+
    | 1. Transpose + Reverse    |  O(n^2) |   O(1)   |  BEST CHOICE      |
    | 2. Four-Way Swap          |  O(n^2) |   O(1)   |  Good alternative |
    +---------------------------+---------+----------+-------------------+
    `)

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	// Sample Input 1
	matrix1 := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	fmt.Println("\nSample Input 1:")
	printMatrix(matrix1, "  Input")
	Rotate90Clockwise(matrix1)
	printMatrix(matrix1, "  Output (90 CW)")

	// Sample Input 2
	matrix2 := [][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}}
	fmt.Println("\nSample Input 2:")
	printMatrix(matrix2, "  Input")
	Rotate90Clockwise(matrix2)
	printMatrix(matrix2, "  Output (90 CW)")
}
