/*
Transpose Matrix - Go Solution

Return the transpose of a 2D matrix.
Element at (i, j) moves to (j, i).

Time Complexity: O(m * n)
Space Complexity: O(m * n)
*/

package main

import "fmt"

// TransposeMatrix returns the transpose of the given matrix
func TransposeMatrix(matrix [][]int) [][]int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return [][]int{}
	}

	rows := len(matrix)
	cols := len(matrix[0])

	// Create new matrix with swapped dimensions
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

// TransposeMatrixAlt alternative implementation building column by column
func TransposeMatrixAlt(matrix [][]int) [][]int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return [][]int{}
	}

	rows := len(matrix)
	cols := len(matrix[0])

	transposed := make([][]int, cols)

	for j := 0; j < cols; j++ {
		row := make([]int, rows)
		for i := 0; i < rows; i++ {
			row[i] = matrix[i][j]
		}
		transposed[j] = row
	}

	return transposed
}

func printMatrix(matrix [][]int, name string) {
	fmt.Printf("%s:\n", name)
	for _, row := range matrix {
		fmt.Printf("  %v\n", row)
	}
}

func main() {
	// Test 1: 3x2 matrix
	matrix1 := [][]int{
		{1, 2},
		{3, 4},
		{5, 6},
	}
	result1 := TransposeMatrix(matrix1)
	fmt.Println("Test 1:")
	printMatrix(matrix1, "Original")
	printMatrix(result1, "Transposed")
	// Expected: [[1,3,5], [2,4,6]]
	fmt.Println()

	// Test 2: 3x3 square matrix
	matrix2 := [][]int{
		{1, 2, 3},
		{4, 5, 6},
		{7, 8, 9},
	}
	result2 := TransposeMatrix(matrix2)
	fmt.Println("Test 2:")
	printMatrix(matrix2, "Original")
	printMatrix(result2, "Transposed")
	// Expected: [[1,4,7], [2,5,8], [3,6,9]]
	fmt.Println()

	// Test 3: 1x3 row vector
	matrix3 := [][]int{{1, 2, 3}}
	result3 := TransposeMatrix(matrix3)
	fmt.Println("Test 3:")
	printMatrix(matrix3, "Original")
	printMatrix(result3, "Transposed")
	// Expected: [[1], [2], [3]]
	fmt.Println()

	// Test 4: 3x1 column vector
	matrix4 := [][]int{{1}, {2}, {3}}
	result4 := TransposeMatrix(matrix4)
	fmt.Println("Test 4:")
	printMatrix(matrix4, "Original")
	printMatrix(result4, "Transposed")
	// Expected: [[1, 2, 3]]
	fmt.Println()

	// Test 5: 1x1 matrix
	matrix5 := [][]int{{5}}
	result5 := TransposeMatrix(matrix5)
	fmt.Printf("Test 5: %v -> %v\n", matrix5, result5)
	// Expected: [[5]]

	// Test 6: Compare methods
	matrix6 := [][]int{{1, 2}, {3, 4}, {5, 6}}
	result6a := TransposeMatrix(matrix6)
	result6b := TransposeMatrixAlt(matrix6)
	fmt.Printf("\nTest 6 - Methods comparison:\n")
	fmt.Printf("Standard: %v\n", result6a)
	fmt.Printf("Alternative: %v\n", result6b)

	fmt.Println("\nAll tests completed!")
}
