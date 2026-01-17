/*
Transpose Matrix - Go Solutions

Return the transpose of a 2D matrix.
Element at (i, j) moves to (j, i).

This file contains MULTIPLE solution approaches with explanations.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Direct Construction ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(m × n) - visit each element once
// Space Complexity: O(m × n) - for the output matrix
//
// WHY THIS IS BEST:
// - Simple and intuitive
// - Single pass through all elements
// - Works for any matrix dimensions
// ============================================================================

// TransposeMatrix returns the transpose using direct index swapping.
//
// Key Insight: Element at (i, j) moves to (j, i)
//
// How it works:
//  1. Original matrix: m rows × n cols
//  2. Create result: n rows × m cols
//  3. For each position, swap indices: result[j][i] = original[i][j]
//
// Visual:
//
//	Original (3×2):      Transpose (2×3):
//	[[1, 2],             [[1, 3, 5],
//	 [3, 4],      →       [2, 4, 6]]
//	 [5, 6]]
func TransposeMatrix(matrix [][]int) [][]int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return [][]int{}
	}

	rows := len(matrix)
	cols := len(matrix[0])

	// Create new matrix with swapped dimensions (cols × rows)
	transposed := make([][]int, cols)
	for i := range transposed {
		transposed[i] = make([]int, rows)
	}

	for i := 0; i < rows; i++ {
		for j := 0; j < cols; j++ {
			transposed[j][i] = matrix[i][j]
		}
	}

	return transposed
}

// ============================================================================
// APPROACH 2: Column Extraction
// ============================================================================
// Time Complexity:  O(m × n)
// Space Complexity: O(m × n)
//
// INTUITION:
// - Each column of original becomes a row of result
// - Build result row by row
// ============================================================================

// TransposeMatrixColumn builds transpose by extracting columns as rows.
//
// How it works:
// - Column 0 of original → Row 0 of result
// - Column 1 of original → Row 1 of result
// - ... and so on
//
// Visual:
//
//	Original:              Result:
//	[[1, 2],              [[1, 3, 5],  ← column 0
//	 [3, 4],     →         [2, 4, 6]]  ← column 1
//	 [5, 6]]
func TransposeMatrixColumn(matrix [][]int) [][]int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return [][]int{}
	}

	rows := len(matrix)
	cols := len(matrix[0])

	transposed := make([][]int, cols)

	// Build each row of result from column of original
	for j := 0; j < cols; j++ {
		row := make([]int, rows)
		for i := 0; i < rows; i++ {
			row[i] = matrix[i][j]
		}
		transposed[j] = row
	}

	return transposed
}

// ============================================================================
// APPROACH 3: In-Place for Square Matrix
// ============================================================================
// Time Complexity:  O(n²)
// Space Complexity: O(1) - truly in-place!
//
// IMPORTANT: Only works for SQUARE matrices (m = n)
// ============================================================================

// TransposeMatrixInPlace performs in-place transpose for SQUARE matrices only.
//
// Key Insight: Only swap upper triangle with lower triangle
// to avoid double-swapping.
//
// Visual for 3×3:
//
//	┌───┬───┬───┐
//	│ X │ S │ S │   X = diagonal (don't touch)
//	├───┼───┼───┤   S = swap with corresponding
//	│ s │ X │ S │   s = already swapped (skip)
//	├───┼───┼───┤
//	│ s │ s │ X │
//	└───┴───┴───┘
//
//	Only swap upper triangle: (0,1), (0,2), (1,2)
//
// WARNING: Modifies the matrix in place!
func TransposeMatrixInPlace(matrix [][]int) [][]int {
	n := len(matrix)

	// Verify it's a square matrix
	if n == 0 || len(matrix[0]) != n {
		panic("In-place transpose only works for square matrices")
	}

	// Swap upper triangle with lower triangle
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ { // j starts at i+1 to avoid diagonal and lower
			matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
		}
	}

	return matrix
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

// copyMatrix creates a deep copy of a 2D matrix
func copyMatrix(matrix [][]int) [][]int {
	result := make([][]int, len(matrix))
	for i, row := range matrix {
		result[i] = make([]int, len(row))
		copy(result[i], row)
	}
	return result
}

// matricesEqual checks if two matrices are equal
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
		matrix [][]int
		desc   string
	}{
		{[][]int{{1, 2}, {3, 4}, {5, 6}}, "3×2 matrix"},
		{[][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}, "3×3 square matrix"},
		{[][]int{{1, 2, 3}}, "1×3 row vector"},
		{[][]int{{1}, {2}, {3}}, "3×1 column vector"},
		{[][]int{{5}}, "1×1 single element"},
		{[][]int{{1, 2, 3, 4}, {5, 6, 7, 8}}, "2×4 matrix"},
	}

	approaches := []struct {
		name string
		fn   func([][]int) [][]int
	}{
		{"Direct Construction (Recommended)", TransposeMatrix},
		{"Column Extraction", TransposeMatrixColumn},
	}

	fmt.Println("======================================================================")
	fmt.Println("TRANSPOSE MATRIX - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, tc := range testCases {
		fmt.Printf("\n%s:\n", tc.desc)
		printMatrix(tc.matrix, "  Original")

		// Get results from all approaches
		var results [][][]int
		for _, approach := range approaches {
			result := approach.fn(copyMatrix(tc.matrix))
			results = append(results, result)
		}

		// Show first result
		printMatrix(results[0], "  Transposed")

		// Verify all approaches match
		allMatch := true
		for i := 1; i < len(results); i++ {
			if !matricesEqual(results[0], results[i]) {
				allMatch = false
				break
			}
		}
		status := "✓"
		if !allMatch {
			status = "✗"
		}
		fmt.Printf("  All approaches match: %s\n", status)
	}

	// Test in-place for square matrix
	fmt.Println("\n--------------------------------------------------")
	fmt.Println("In-Place Transpose (Square Matrix Only):")
	square := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	printMatrix(square, "  Original")
	TransposeMatrixInPlace(square)
	printMatrix(square, "  After in-place transpose")

	fmt.Println("\n======================================================================")
	fmt.Println("COMPLEXITY COMPARISON")
	fmt.Println("======================================================================")
	fmt.Println(`
    ┌──────────────────────────┬─────────┬──────────┬──────────────────┐
    │        Approach          │  Time   │  Space   │  Recommendation  │
    ├──────────────────────────┼─────────┼──────────┼──────────────────┤
    │ 1. Direct Construction   │ O(m×n)  │  O(m×n)  │  ⭐ BEST CHOICE  │
    │ 2. Column Extraction     │ O(m×n)  │  O(m×n)  │  ✓ Alternative   │
    │ 3. In-Place (square)     │ O(n²)   │   O(1)   │  ⚠️ Square only  │
    └──────────────────────────┴─────────┴──────────┴──────────────────┘
    `)
}
