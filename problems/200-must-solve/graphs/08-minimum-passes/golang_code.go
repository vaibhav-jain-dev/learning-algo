/*
Minimum Passes of Matrix - Go Solution

Find minimum passes to convert all negatives to positives using adjacent positives.

Time Complexity: O(n * m) where n is rows and m is columns
Space Complexity: O(n * m) for the queue
*/

package main

import "fmt"

type cell struct {
	row, col int
}

// MinimumPassesOfMatrix finds minimum passes to convert all negatives to positives
// Uses multi-source BFS starting from all positive integers
func MinimumPassesOfMatrix(matrix [][]int) int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return 0
	}

	rows, cols := len(matrix), len(matrix[0])
	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	// Initialize queue with all positive positions and count negatives
	queue := []cell{}
	negativeCount := 0

	for row := 0; row < rows; row++ {
		for col := 0; col < cols; col++ {
			if matrix[row][col] > 0 {
				queue = append(queue, cell{row, col})
			} else if matrix[row][col] < 0 {
				negativeCount++
			}
		}
	}

	// If no negatives, no passes needed
	if negativeCount == 0 {
		return 0
	}

	passes := 0

	// BFS level by level
	for len(queue) > 0 && negativeCount > 0 {
		// Process all cells at current level
		levelSize := len(queue)
		convertedAny := false

		for i := 0; i < levelSize; i++ {
			current := queue[0]
			queue = queue[1:]

			// Check all adjacent cells
			for _, dir := range directions {
				newRow, newCol := current.row+dir[0], current.col+dir[1]

				if newRow >= 0 && newRow < rows &&
					newCol >= 0 && newCol < cols &&
					matrix[newRow][newCol] < 0 {
					// Convert negative to positive
					matrix[newRow][newCol] = -matrix[newRow][newCol]
					negativeCount--
					queue = append(queue, cell{newRow, newCol})
					convertedAny = true
				}
			}
		}

		if convertedAny {
			passes++
		}
	}

	// If negatives remain, conversion is impossible
	if negativeCount > 0 {
		return -1
	}
	return passes
}

// MinimumPassesAlternative uses two queues for clearer level separation
func MinimumPassesAlternative(matrix [][]int) int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return 0
	}

	rows, cols := len(matrix), len(matrix[0])
	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	currentQueue := []cell{}
	negativeCount := 0

	// Initialize
	for row := 0; row < rows; row++ {
		for col := 0; col < cols; col++ {
			if matrix[row][col] > 0 {
				currentQueue = append(currentQueue, cell{row, col})
			} else if matrix[row][col] < 0 {
				negativeCount++
			}
		}
	}

	if negativeCount == 0 {
		return 0
	}

	passes := 0

	for len(currentQueue) > 0 {
		nextQueue := []cell{}

		for _, current := range currentQueue {
			for _, dir := range directions {
				newRow, newCol := current.row+dir[0], current.col+dir[1]

				if newRow >= 0 && newRow < rows &&
					newCol >= 0 && newCol < cols &&
					matrix[newRow][newCol] < 0 {
					matrix[newRow][newCol] *= -1
					negativeCount--
					nextQueue = append(nextQueue, cell{newRow, newCol})
				}
			}
		}

		if len(nextQueue) > 0 {
			passes++
			currentQueue = nextQueue
		} else {
			break
		}
	}

	if negativeCount > 0 {
		return -1
	}
	return passes
}

// MinimumPassesWithCopy doesn't modify the input matrix
func MinimumPassesWithCopy(matrix [][]int) int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return 0
	}

	rows, cols := len(matrix), len(matrix[0])
	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	// Create a copy of the matrix
	matrixCopy := make([][]int, rows)
	for i := range matrixCopy {
		matrixCopy[i] = make([]int, cols)
		copy(matrixCopy[i], matrix[i])
	}

	queue := []cell{}
	negativePositions := make(map[cell]bool)

	for row := 0; row < rows; row++ {
		for col := 0; col < cols; col++ {
			if matrixCopy[row][col] > 0 {
				queue = append(queue, cell{row, col})
			} else if matrixCopy[row][col] < 0 {
				negativePositions[cell{row, col}] = true
			}
		}
	}

	if len(negativePositions) == 0 {
		return 0
	}

	passes := 0

	for len(queue) > 0 && len(negativePositions) > 0 {
		levelSize := len(queue)
		converted := []cell{}

		for i := 0; i < levelSize; i++ {
			current := queue[0]
			queue = queue[1:]

			for _, dir := range directions {
				neighbor := cell{current.row + dir[0], current.col + dir[1]}

				if negativePositions[neighbor] {
					delete(negativePositions, neighbor)
					if matrixCopy[neighbor.row][neighbor.col] < 0 {
						matrixCopy[neighbor.row][neighbor.col] = -matrixCopy[neighbor.row][neighbor.col]
					}
					converted = append(converted, neighbor)
				}
			}
		}

		if len(converted) > 0 {
			passes++
			queue = append(queue, converted...)
		}
	}

	if len(negativePositions) > 0 {
		return -1
	}
	return passes
}

// Helper to copy matrix for testing
func copyMatrix(matrix [][]int) [][]int {
	result := make([][]int, len(matrix))
	for i := range matrix {
		result[i] = make([]int, len(matrix[i]))
		copy(result[i], matrix[i])
	}
	return result
}

func main() {
	// Test 1: Example from problem
	matrix1 := [][]int{
		{0, -1, -3, 2, 0},
		{1, -2, -5, -1, -3},
		{3, 0, 0, -4, -1},
	}
	result1 := MinimumPassesOfMatrix(copyMatrix(matrix1))
	fmt.Printf("Test 1: %d\n", result1) // Expected: 3

	// Test 2: Impossible case
	matrix2 := [][]int{
		{1, 0, 0, -2, -3},
		{-4, -5, -6, -2, -1},
		{0, 0, 0, 0, -1},
		{1, 2, 3, 0, -2},
	}
	result2 := MinimumPassesOfMatrix(copyMatrix(matrix2))
	fmt.Printf("Test 2 (Impossible): %d\n", result2) // Expected: -1

	// Test 3: No negatives
	matrix3 := [][]int{
		{1, 2, 3},
		{4, 5, 6},
		{7, 8, 9},
	}
	result3 := MinimumPassesOfMatrix(copyMatrix(matrix3))
	fmt.Printf("Test 3 (No negatives): %d\n", result3) // Expected: 0

	// Test 4: All negatives except one corner
	matrix4 := [][]int{
		{1, -1, -1},
		{-1, -1, -1},
		{-1, -1, -1},
	}
	result4 := MinimumPassesOfMatrix(copyMatrix(matrix4))
	fmt.Printf("Test 4 (Corner spread): %d\n", result4) // Expected: 4

	// Test 5: Single cell positive
	matrix5 := [][]int{{5}}
	result5 := MinimumPassesOfMatrix(copyMatrix(matrix5))
	fmt.Printf("Test 5 (Single positive): %d\n", result5) // Expected: 0

	// Test 6: Single cell negative
	matrix6 := [][]int{{-5}}
	result6 := MinimumPassesOfMatrix(copyMatrix(matrix6))
	fmt.Printf("Test 6 (Single negative): %d\n", result6) // Expected: -1

	// Test 7: Zeros blocking
	matrix7 := [][]int{
		{1, 0, -1},
		{0, 0, 0},
		{-1, 0, 1},
	}
	result7 := MinimumPassesOfMatrix(copyMatrix(matrix7))
	fmt.Printf("Test 7 (Zeros blocking): %d\n", result7) // Expected: -1

	// Test alternative implementation
	fmt.Println("\n--- Testing Alternative Implementation ---")
	resultAlt := MinimumPassesAlternative(copyMatrix(matrix1))
	fmt.Printf("Alternative Test: %d\n", resultAlt) // Expected: 3

	fmt.Println("\nAll tests completed!")
}
