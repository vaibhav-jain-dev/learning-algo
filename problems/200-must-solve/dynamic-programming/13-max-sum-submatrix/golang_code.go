/*
Maximum Sum Submatrix - Go Solution

Find the maximum sum of any size x size submatrix within a matrix.

Time Complexity: O(rows * cols)
Space Complexity: O(rows * cols)
*/

package main

import (
	"fmt"
	"math"
)

// MaxSumSubmatrix finds maximum sum of size x size submatrix using prefix sums
func MaxSumSubmatrix(matrix [][]int, size int) int {
	if len(matrix) == 0 || len(matrix[0]) == 0 || size <= 0 {
		return 0
	}

	rows := len(matrix)
	cols := len(matrix[0])

	if size > rows || size > cols {
		return 0
	}

	// Build prefix sum matrix
	// prefix[i][j] = sum of all elements in matrix[0:i][0:j]
	prefix := make([][]int, rows+1)
	for i := range prefix {
		prefix[i] = make([]int, cols+1)
	}

	for i := 1; i <= rows; i++ {
		for j := 1; j <= cols; j++ {
			prefix[i][j] = matrix[i-1][j-1] +
				prefix[i-1][j] +
				prefix[i][j-1] -
				prefix[i-1][j-1]
		}
	}

	// Find maximum sum submatrix of given size
	maxSum := math.MinInt32

	for r := size; r <= rows; r++ {
		for c := size; c <= cols; c++ {
			// Calculate sum of submatrix ending at (r-1, c-1)
			currentSum := prefix[r][c] -
				prefix[r-size][c] -
				prefix[r][c-size] +
				prefix[r-size][c-size]

			if currentSum > maxSum {
				maxSum = currentSum
			}
		}
	}

	return maxSum
}

// MaxSumSubmatrixWithPosition returns both maximum sum and the top-left position
func MaxSumSubmatrixWithPosition(matrix [][]int, size int) (int, [2]int) {
	if len(matrix) == 0 || len(matrix[0]) == 0 || size <= 0 {
		return 0, [2]int{-1, -1}
	}

	rows := len(matrix)
	cols := len(matrix[0])

	if size > rows || size > cols {
		return 0, [2]int{-1, -1}
	}

	// Build prefix sum matrix
	prefix := make([][]int, rows+1)
	for i := range prefix {
		prefix[i] = make([]int, cols+1)
	}

	for i := 1; i <= rows; i++ {
		for j := 1; j <= cols; j++ {
			prefix[i][j] = matrix[i-1][j-1] +
				prefix[i-1][j] +
				prefix[i][j-1] -
				prefix[i-1][j-1]
		}
	}

	maxSum := math.MinInt32
	bestPos := [2]int{-1, -1}

	for r := size; r <= rows; r++ {
		for c := size; c <= cols; c++ {
			currentSum := prefix[r][c] -
				prefix[r-size][c] -
				prefix[r][c-size] +
				prefix[r-size][c-size]

			if currentSum > maxSum {
				maxSum = currentSum
				bestPos = [2]int{r - size, c - size}
			}
		}
	}

	return maxSum, bestPos
}

// MaxSumSubmatrixBruteForce is the brute force solution for verification
func MaxSumSubmatrixBruteForce(matrix [][]int, size int) int {
	if len(matrix) == 0 || len(matrix[0]) == 0 || size <= 0 {
		return 0
	}

	rows := len(matrix)
	cols := len(matrix[0])

	if size > rows || size > cols {
		return 0
	}

	maxSum := math.MinInt32

	for r := 0; r <= rows-size; r++ {
		for c := 0; c <= cols-size; c++ {
			currentSum := 0
			for i := 0; i < size; i++ {
				for j := 0; j < size; j++ {
					currentSum += matrix[r+i][c+j]
				}
			}
			if currentSum > maxSum {
				maxSum = currentSum
			}
		}
	}

	return maxSum
}

// MaxSumAnySizeSubmatrix finds maximum sum submatrix of ANY size (Kadane's 2D)
func MaxSumAnySizeSubmatrix(matrix [][]int) (int, [4]int) {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return 0, [4]int{-1, -1, -1, -1}
	}

	rows := len(matrix)
	cols := len(matrix[0])

	maxSum := math.MinInt32
	bestCoords := [4]int{-1, -1, -1, -1}

	// Fix left column
	for left := 0; left < cols; left++ {
		// temp[i] = sum of elements in row i from column left to right
		temp := make([]int, rows)

		// Expand right column
		for right := left; right < cols; right++ {
			// Update temp array
			for i := 0; i < rows; i++ {
				temp[i] += matrix[i][right]
			}

			// Apply Kadane's algorithm on temp array
			currentSum := 0
			currentStart := 0
			localMax := temp[0]
			localStart := 0
			localEnd := 0

			for i := 0; i < rows; i++ {
				currentSum += temp[i]

				if currentSum > localMax {
					localMax = currentSum
					localStart = currentStart
					localEnd = i
				}

				if currentSum < 0 {
					currentSum = 0
					currentStart = i + 1
				}
			}

			if localMax > maxSum {
				maxSum = localMax
				bestCoords = [4]int{localStart, left, localEnd, right}
			}
		}
	}

	return maxSum, bestCoords
}

// GetSubmatrix extracts a submatrix from the given coordinates
func GetSubmatrix(matrix [][]int, r1, c1, r2, c2 int) [][]int {
	result := make([][]int, r2-r1+1)
	for i := r1; i <= r2; i++ {
		result[i-r1] = make([]int, c2-c1+1)
		for j := c1; j <= c2; j++ {
			result[i-r1][j-c1] = matrix[i][j]
		}
	}
	return result
}

func main() {
	// Test 1: Standard case
	matrix1 := [][]int{
		{5, 3, -1, 5},
		{-7, 3, 7, 4},
		{12, 8, 0, 0},
		{1, -8, -8, 2},
	}
	size1 := 2
	result1 := MaxSumSubmatrix(matrix1, size1)
	fmt.Printf("Test 1: size=%d\n", size1)
	fmt.Printf("  Matrix: %v\n", matrix1)
	fmt.Printf("  Max sum: %d\n", result1)
	// Expected: 18

	// Test 2: Size 1
	matrix2 := [][]int{
		{1, 2},
		{3, 4},
	}
	size2 := 1
	result2 := MaxSumSubmatrix(matrix2, size2)
	fmt.Printf("\nTest 2: size=%d\n", size2)
	fmt.Printf("  Matrix: %v\n", matrix2)
	fmt.Printf("  Max sum: %d\n", result2)
	// Expected: 4

	// Test 3: 3x3 matrix
	matrix3 := [][]int{
		{1, 2, 3},
		{4, 5, 6},
		{7, 8, 9},
	}
	size3 := 2
	result3 := MaxSumSubmatrix(matrix3, size3)
	fmt.Printf("\nTest 3: size=%d\n", size3)
	fmt.Printf("  Matrix: %v\n", matrix3)
	fmt.Printf("  Max sum: %d\n", result3)
	// Expected: 28 (5+6+8+9)

	// Test 4: All negative
	matrix4 := [][]int{
		{-1, -2},
		{-3, -4},
	}
	size4 := 2
	result4 := MaxSumSubmatrix(matrix4, size4)
	fmt.Printf("\nTest 4: size=%d\n", size4)
	fmt.Printf("  Matrix: %v\n", matrix4)
	fmt.Printf("  Max sum: %d\n", result4)
	// Expected: -10

	// Test 5: With position
	matrix5 := [][]int{
		{5, 3, -1, 5},
		{-7, 3, 7, 4},
		{12, 8, 0, 0},
		{1, -8, -8, 2},
	}
	size5 := 2
	maxSum5, pos5 := MaxSumSubmatrixWithPosition(matrix5, size5)
	fmt.Printf("\nTest 5: size=%d\n", size5)
	fmt.Printf("  Max sum: %d\n", maxSum5)
	fmt.Printf("  Position (row, col): %v\n", pos5)
	submatrix5 := GetSubmatrix(matrix5, pos5[0], pos5[1], pos5[0]+size5-1, pos5[1]+size5-1)
	fmt.Printf("  Submatrix: %v\n", submatrix5)

	// Test 6: Compare with brute force
	matrix6 := [][]int{
		{5, 3, -1, 5},
		{-7, 3, 7, 4},
		{12, 8, 0, 0},
		{1, -8, -8, 2},
	}
	size6 := 2
	fmt.Printf("\nTest 6 - Method comparison:\n")
	fmt.Printf("  Prefix sum: %d\n", MaxSumSubmatrix(matrix6, size6))
	fmt.Printf("  Brute force: %d\n", MaxSumSubmatrixBruteForce(matrix6, size6))

	// Test 7: Any size submatrix (Kadane's 2D)
	matrix7 := [][]int{
		{1, 2, -1, -4, -20},
		{-8, -3, 4, 2, 1},
		{3, 8, 10, 1, 3},
		{-4, -1, 1, 7, -6},
	}
	maxSum7, coords7 := MaxSumAnySizeSubmatrix(matrix7)
	fmt.Printf("\nTest 7 - Any size submatrix:\n")
	fmt.Printf("  Max sum: %d\n", maxSum7)
	fmt.Printf("  Coordinates (r1, c1, r2, c2): %v\n", coords7)
	if coords7[0] >= 0 {
		subm := GetSubmatrix(matrix7, coords7[0], coords7[1], coords7[2], coords7[3])
		fmt.Printf("  Submatrix: %v\n", subm)
	}

	// Test 8: Single element matrix
	matrix8 := [][]int{{42}}
	size8 := 1
	result8 := MaxSumSubmatrix(matrix8, size8)
	fmt.Printf("\nTest 8: size=%d\n", size8)
	fmt.Printf("  Matrix: %v\n", matrix8)
	fmt.Printf("  Max sum: %d\n", result8)
	// Expected: 42

	fmt.Println("\nAll tests completed!")
}
