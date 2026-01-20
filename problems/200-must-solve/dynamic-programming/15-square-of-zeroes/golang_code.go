/*
Square of Zeroes - Go Solution

Determine if a matrix contains a square whose borders are all 0s.

Time Complexity: O(n^3)
Space Complexity: O(n^2)
*/

package main

import "fmt"

// SquareOfZeroes checks if matrix contains a square with borders of all 0s
func SquareOfZeroes(matrix [][]int) bool {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return false
	}

	n := len(matrix)

	// Precompute consecutive 0s below and to the right
	// below[i][j] = count of consecutive 0s from (i,j) going down
	// right[i][j] = count of consecutive 0s from (i,j) going right
	below := make([][]int, n)
	right := make([][]int, n)
	for i := range below {
		below[i] = make([]int, n)
		right[i] = make([]int, n)
	}

	// Fill from bottom-right to top-left
	for i := n - 1; i >= 0; i-- {
		for j := n - 1; j >= 0; j-- {
			if matrix[i][j] == 0 {
				below[i][j] = 1
				if i+1 < n {
					below[i][j] += below[i+1][j]
				}
				right[i][j] = 1
				if j+1 < n {
					right[i][j] += right[i][j+1]
				}
			}
		}
	}

	// Check all possible squares
	for r := 0; r < n; r++ {
		for c := 0; c < n; c++ {
			if matrix[r][c] != 0 {
				continue
			}

			// Try all possible square sizes
			maxSize := min(n-r, n-c)

			for size := 1; size <= maxSize; size++ {
				if hasSquareOfZeroes(below, right, r, c, size) {
					return true
				}
			}
		}
	}

	return false
}

// hasSquareOfZeroes checks if square starting at (r,c) of given size has borders of all 0s
func hasSquareOfZeroes(below, right [][]int, r, c, size int) bool {
	// Check top row: need 'size' consecutive 0s going right from (r, c)
	topRow := right[r][c] >= size

	// Check left column: need 'size' consecutive 0s going down from (r, c)
	leftCol := below[r][c] >= size

	// Check bottom row: need 'size' consecutive 0s going right from (r+size-1, c)
	bottomRow := right[r+size-1][c] >= size

	// Check right column: need 'size' consecutive 0s going down from (r, c+size-1)
	rightCol := below[r][c+size-1] >= size

	return topRow && leftCol && bottomRow && rightCol
}

// SquareOfZeroesBruteForce is the brute force solution for verification
func SquareOfZeroesBruteForce(matrix [][]int) bool {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return false
	}

	n := len(matrix)

	for r := 0; r < n; r++ {
		for c := 0; c < n; c++ {
			if matrix[r][c] != 0 {
				continue
			}

			maxSize := min(n-r, n-c)

			for size := 1; size <= maxSize; size++ {
				if isSquareOfZeroes(matrix, r, c, size) {
					return true
				}
			}
		}
	}

	return false
}

// isSquareOfZeroes checks borders by iterating through each cell
func isSquareOfZeroes(matrix [][]int, r, c, size int) bool {
	// Top row
	for j := c; j < c+size; j++ {
		if matrix[r][j] != 0 {
			return false
		}
	}

	// Bottom row
	for j := c; j < c+size; j++ {
		if matrix[r+size-1][j] != 0 {
			return false
		}
	}

	// Left column
	for i := r; i < r+size; i++ {
		if matrix[i][c] != 0 {
			return false
		}
	}

	// Right column
	for i := r; i < r+size; i++ {
		if matrix[i][c+size-1] != 0 {
			return false
		}
	}

	return true
}

// LargestSquareOfZeroes returns the size of the largest square with borders of all 0s
func LargestSquareOfZeroes(matrix [][]int) int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return 0
	}

	n := len(matrix)

	// Precompute consecutive 0s
	below := make([][]int, n)
	right := make([][]int, n)
	for i := range below {
		below[i] = make([]int, n)
		right[i] = make([]int, n)
	}

	for i := n - 1; i >= 0; i-- {
		for j := n - 1; j >= 0; j-- {
			if matrix[i][j] == 0 {
				below[i][j] = 1
				if i+1 < n {
					below[i][j] += below[i+1][j]
				}
				right[i][j] = 1
				if j+1 < n {
					right[i][j] += right[i][j+1]
				}
			}
		}
	}

	maxSize := 0

	for r := 0; r < n; r++ {
		for c := 0; c < n; c++ {
			if matrix[r][c] != 0 {
				continue
			}

			possibleSize := min(n-r, n-c)

			for size := possibleSize; size > maxSize; size-- {
				if hasSquareOfZeroes(below, right, r, c, size) {
					maxSize = size
					break
				}
			}
		}
	}

	return maxSize
}

// SquarePosition represents a square's position and size
type SquarePosition struct {
	Row  int
	Col  int
	Size int
}

// FindSquareOfZeroes finds the position and size of a square with borders of all 0s
func FindSquareOfZeroes(matrix [][]int) *SquarePosition {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return nil
	}

	n := len(matrix)

	below := make([][]int, n)
	right := make([][]int, n)
	for i := range below {
		below[i] = make([]int, n)
		right[i] = make([]int, n)
	}

	for i := n - 1; i >= 0; i-- {
		for j := n - 1; j >= 0; j-- {
			if matrix[i][j] == 0 {
				below[i][j] = 1
				if i+1 < n {
					below[i][j] += below[i+1][j]
				}
				right[i][j] = 1
				if j+1 < n {
					right[i][j] += right[i][j+1]
				}
			}
		}
	}

	for r := 0; r < n; r++ {
		for c := 0; c < n; c++ {
			if matrix[r][c] != 0 {
				continue
			}

			maxSize := min(n-r, n-c)

			for size := 1; size <= maxSize; size++ {
				if hasSquareOfZeroes(below, right, r, c, size) {
					return &SquarePosition{r, c, size}
				}
			}
		}
	}

	return nil
}

// FindLargestSquareOfZeroes finds the position and size of the largest square
func FindLargestSquareOfZeroes(matrix [][]int) *SquarePosition {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return nil
	}

	n := len(matrix)

	below := make([][]int, n)
	right := make([][]int, n)
	for i := range below {
		below[i] = make([]int, n)
		right[i] = make([]int, n)
	}

	for i := n - 1; i >= 0; i-- {
		for j := n - 1; j >= 0; j-- {
			if matrix[i][j] == 0 {
				below[i][j] = 1
				if i+1 < n {
					below[i][j] += below[i+1][j]
				}
				right[i][j] = 1
				if j+1 < n {
					right[i][j] += right[i][j+1]
				}
			}
		}
	}

	maxSize := 0
	var bestPos *SquarePosition

	for r := 0; r < n; r++ {
		for c := 0; c < n; c++ {
			if matrix[r][c] != 0 {
				continue
			}

			possibleSize := min(n-r, n-c)

			for size := possibleSize; size > maxSize; size-- {
				if hasSquareOfZeroes(below, right, r, c, size) {
					maxSize = size
					bestPos = &SquarePosition{r, c, size}
					break
				}
			}
		}
	}

	return bestPos
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func main() {
	// Test 1: Standard case with large square
	matrix1 := [][]int{
		{1, 1, 1, 0, 1, 0},
		{0, 0, 0, 0, 0, 1},
		{0, 1, 1, 1, 0, 1},
		{0, 0, 0, 1, 0, 1},
		{0, 1, 1, 1, 0, 1},
		{0, 0, 0, 0, 0, 1},
	}
	result1 := SquareOfZeroes(matrix1)
	fmt.Println("Test 1:")
	for _, row := range matrix1 {
		fmt.Printf("  %v\n", row)
	}
	fmt.Printf("  Has square of zeroes: %v\n", result1)
	// Expected: true

	// Test 2: Single 0 as square
	matrix2 := [][]int{
		{1, 1, 1},
		{1, 0, 1},
		{1, 1, 1},
	}
	result2 := SquareOfZeroes(matrix2)
	fmt.Println("\nTest 2:")
	for _, row := range matrix2 {
		fmt.Printf("  %v\n", row)
	}
	fmt.Printf("  Has square of zeroes: %v\n", result2)
	// Expected: true (single 0)

	// Test 3: No zeroes
	matrix3 := [][]int{
		{1, 1, 1},
		{1, 1, 1},
		{1, 1, 1},
	}
	result3 := SquareOfZeroes(matrix3)
	fmt.Println("\nTest 3:")
	for _, row := range matrix3 {
		fmt.Printf("  %v\n", row)
	}
	fmt.Printf("  Has square of zeroes: %v\n", result3)
	// Expected: false

	// Test 4: All zeroes
	matrix4 := [][]int{
		{0, 0, 0},
		{0, 0, 0},
		{0, 0, 0},
	}
	result4 := SquareOfZeroes(matrix4)
	fmt.Println("\nTest 4:")
	for _, row := range matrix4 {
		fmt.Printf("  %v\n", row)
	}
	fmt.Printf("  Has square of zeroes: %v\n", result4)
	// Expected: true

	// Test 5: Compare with brute force
	matrix5 := [][]int{
		{1, 1, 1, 0, 1, 0},
		{0, 0, 0, 0, 0, 1},
		{0, 1, 1, 1, 0, 1},
		{0, 0, 0, 1, 0, 1},
		{0, 1, 1, 1, 0, 1},
		{0, 0, 0, 0, 0, 1},
	}
	fmt.Println("\nTest 5 - Method comparison:")
	fmt.Printf("  Optimized: %v\n", SquareOfZeroes(matrix5))
	fmt.Printf("  Brute force: %v\n", SquareOfZeroesBruteForce(matrix5))

	// Test 6: Find largest square
	matrix6 := [][]int{
		{1, 1, 1, 0, 1, 0},
		{0, 0, 0, 0, 0, 1},
		{0, 1, 1, 1, 0, 1},
		{0, 0, 0, 1, 0, 1},
		{0, 1, 1, 1, 0, 1},
		{0, 0, 0, 0, 0, 1},
	}
	largest := LargestSquareOfZeroes(matrix6)
	pos := FindLargestSquareOfZeroes(matrix6)
	fmt.Println("\nTest 6 - Largest square:")
	fmt.Printf("  Largest size: %d\n", largest)
	if pos != nil {
		fmt.Printf("  Position (row, col, size): (%d, %d, %d)\n", pos.Row, pos.Col, pos.Size)
	}

	// Test 7: Find any square
	matrix7 := [][]int{
		{1, 1, 1},
		{1, 0, 1},
		{1, 1, 1},
	}
	square := FindSquareOfZeroes(matrix7)
	fmt.Println("\nTest 7 - Find square:")
	if square != nil {
		fmt.Printf("  Found at: (%d, %d, %d)\n", square.Row, square.Col, square.Size)
	} else {
		fmt.Println("  Not found")
	}

	// Test 8: 2x2 square
	matrix8 := [][]int{
		{0, 0, 1},
		{0, 0, 1},
		{1, 1, 1},
	}
	result8 := SquareOfZeroes(matrix8)
	fmt.Println("\nTest 8:")
	for _, row := range matrix8 {
		fmt.Printf("  %v\n", row)
	}
	fmt.Printf("  Has square of zeroes: %v\n", result8)
	// Expected: true (2x2 in top-left)

	fmt.Println("\nAll tests completed!")
}
