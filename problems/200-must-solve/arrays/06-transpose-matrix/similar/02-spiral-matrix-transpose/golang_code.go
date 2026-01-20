/*
Spiral Matrix Transpose - Go Solutions

Read matrix in spiral order and write back in spiral order of transposed dimensions.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Spiral Read + Write ⭐ RECOMMENDED
// ============================================================================
// Time Complexity:  O(m × n)
// Space Complexity: O(m × n)
// ============================================================================

// SpiralTranspose reads in spiral, writes in spiral to transposed shape.
func SpiralTranspose(matrix [][]int) [][]int {
	if len(matrix) == 0 {
		return [][]int{}
	}

	m, n := len(matrix), len(matrix[0])

	// Read spiral order
	spiral := spiralOrder(matrix)

	// Create transposed result (n x m)
	result := make([][]int, n)
	for i := range result {
		result[i] = make([]int, m)
	}

	// Write in spiral order to result
	writeSpiralOrder(result, spiral)

	return result
}

func spiralOrder(matrix [][]int) []int {
	if len(matrix) == 0 {
		return []int{}
	}

	result := []int{}
	top, bottom := 0, len(matrix)-1
	left, right := 0, len(matrix[0])-1

	for top <= bottom && left <= right {
		// Right
		for col := left; col <= right; col++ {
			result = append(result, matrix[top][col])
		}
		top++

		// Down
		for row := top; row <= bottom; row++ {
			result = append(result, matrix[row][right])
		}
		right--

		// Left
		if top <= bottom {
			for col := right; col >= left; col-- {
				result = append(result, matrix[bottom][col])
			}
			bottom--
		}

		// Up
		if left <= right {
			for row := bottom; row >= top; row-- {
				result = append(result, matrix[row][left])
			}
			left++
		}
	}

	return result
}

func writeSpiralOrder(matrix [][]int, values []int) {
	if len(matrix) == 0 {
		return
	}

	idx := 0
	top, bottom := 0, len(matrix)-1
	left, right := 0, len(matrix[0])-1

	for top <= bottom && left <= right && idx < len(values) {
		for col := left; col <= right && idx < len(values); col++ {
			matrix[top][col] = values[idx]
			idx++
		}
		top++

		for row := top; row <= bottom && idx < len(values); row++ {
			matrix[row][right] = values[idx]
			idx++
		}
		right--

		if top <= bottom {
			for col := right; col >= left && idx < len(values); col-- {
				matrix[bottom][col] = values[idx]
				idx++
			}
			bottom--
		}

		if left <= right {
			for row := bottom; row >= top && idx < len(values); row-- {
				matrix[row][left] = values[idx]
				idx++
			}
			left++
		}
	}
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("SPIRAL MATRIX TRANSPOSE - TEST RESULTS")
	fmt.Println("======================================================================")

	matrix := [][]int{
		{1, 2, 3},
		{4, 5, 6},
	}

	fmt.Printf("\nInput (2x3):\n")
	printMatrix(matrix)

	result := SpiralTranspose(matrix)

	fmt.Printf("\nOutput (3x2 spiral transpose):\n")
	printMatrix(result)

	fmt.Println("\n======================================================================")
	fmt.Println("RUNNING WITH SAMPLE INPUT")
	fmt.Println("======================================================================")

	matrix = [][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}}
	fmt.Printf("\nInput (3x4):\n")
	printMatrix(matrix)
	fmt.Printf("Spiral order: %v\n", spiralOrder(matrix))
	fmt.Printf("\nSpiral transpose (4x3):\n")
	printMatrix(SpiralTranspose(matrix))
}

func printMatrix(m [][]int) {
	for _, row := range m {
		fmt.Printf("  %v\n", row)
	}
}
