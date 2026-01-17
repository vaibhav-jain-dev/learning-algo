/*
Block Matrix Transpose - Go Solutions

Transpose a matrix where elements are blocks (sub-matrices) instead of scalars.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Block-wise Transpose ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(m × n × blockSize²)
// Space Complexity: O(m × n × blockSize²)
// ============================================================================

// BlockTranspose transposes matrix of blocks.
func BlockTranspose(matrix [][][]int) [][][]int {
	if len(matrix) == 0 {
		return [][][]int{}
	}

	rows := len(matrix)
	cols := len(matrix[0])

	// Create transposed result
	result := make([][][]int, cols)
	for i := range result {
		result[i] = make([][]int, rows)
	}

	// Transpose blocks and transpose within each block
	for i := range matrix {
		for j := range matrix[i] {
			result[j][i] = transposeBlock(matrix[i][j])
		}
	}

	return result
}

func transposeBlock(block []int) []int {
	// Assuming square block for simplicity
	n := 1
	for n*n < len(block) {
		n++
	}

	result := make([]int, len(block))
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if i*n+j < len(block) && j*n+i < len(result) {
				result[j*n+i] = block[i*n+j]
			}
		}
	}

	return result
}

// BlockTranspose2D handles 2D blocks within a matrix.
func BlockTranspose2D(matrix [][]int, blockSize int) [][]int {
	if len(matrix) == 0 {
		return [][]int{}
	}

	rows := len(matrix)
	cols := len(matrix[0])

	// Result dimensions: swap row blocks with col blocks
	result := make([][]int, cols)
	for i := range result {
		result[i] = make([]int, rows)
	}

	// Process each block
	for bi := 0; bi < rows; bi += blockSize {
		for bj := 0; bj < cols; bj += blockSize {
			// Transpose this block to position (bj, bi)
			for i := 0; i < blockSize && bi+i < rows; i++ {
				for j := 0; j < blockSize && bj+j < cols; j++ {
					result[bj+j][bi+i] = matrix[bi+i][bj+j]
				}
			}
		}
	}

	return result
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("BLOCK MATRIX TRANSPOSE - TEST RESULTS")
	fmt.Println("======================================================================")

	// 4x4 matrix with 2x2 blocks
	matrix := [][]int{
		{1, 2, 5, 6},
		{3, 4, 7, 8},
		{9, 10, 13, 14},
		{11, 12, 15, 16},
	}

	fmt.Printf("\nInput (4x4 with 2x2 blocks):\n")
	printMatrix(matrix)

	result := BlockTranspose2D(matrix, 2)

	fmt.Printf("\nBlock transpose result:\n")
	printMatrix(result)

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	matrix = [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	fmt.Printf("\nInput (3x3):\n")
	printMatrix(matrix)
	fmt.Printf("\nBlock transpose (block=1, same as regular):\n")
	printMatrix(BlockTranspose2D(matrix, 1))
}

func printMatrix(m [][]int) {
	for _, row := range m {
		fmt.Printf("  %v\n", row)
	}
}
