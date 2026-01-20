/*
Remove Islands - Go Solution

Remove all 1s that are not connected to the border of the matrix.

Time Complexity: O(n * m) where n is rows and m is columns
Space Complexity: O(n * m) for the recursion stack in worst case
*/

package main

import "fmt"

// RemoveIslands removes all islands (1s not connected to border) from the matrix
// Uses iterative DFS to mark border-connected 1s, then removes unmarked 1s
func RemoveIslands(matrix [][]int) [][]int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return matrix
	}

	rows, cols := len(matrix), len(matrix[0])

	// Mark all border-connected 1s with value 2
	// Process all border cells
	for row := 0; row < rows; row++ {
		if matrix[row][0] == 1 {
			markBorderConnected(matrix, row, 0)
		}
		if matrix[row][cols-1] == 1 {
			markBorderConnected(matrix, row, cols-1)
		}
	}

	for col := 0; col < cols; col++ {
		if matrix[0][col] == 1 {
			markBorderConnected(matrix, 0, col)
		}
		if matrix[rows-1][col] == 1 {
			markBorderConnected(matrix, rows-1, col)
		}
	}

	// Convert: 1 -> 0 (islands), 2 -> 1 (border-connected)
	for row := 0; row < rows; row++ {
		for col := 0; col < cols; col++ {
			if matrix[row][col] == 1 {
				matrix[row][col] = 0 // Island - remove
			} else if matrix[row][col] == 2 {
				matrix[row][col] = 1 // Border-connected - restore
			}
		}
	}

	return matrix
}

// markBorderConnected marks all 1s connected to the starting cell with value 2
func markBorderConnected(matrix [][]int, startRow, startCol int) {
	rows, cols := len(matrix), len(matrix[0])
	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	type cell struct {
		row, col int
	}

	stack := []cell{{startRow, startCol}}

	for len(stack) > 0 {
		// Pop from stack
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		row, col := current.row, current.col

		if matrix[row][col] != 1 {
			continue
		}

		matrix[row][col] = 2 // Mark as border-connected

		for _, dir := range directions {
			newRow, newCol := row+dir[0], col+dir[1]
			if newRow >= 0 && newRow < rows &&
				newCol >= 0 && newCol < cols &&
				matrix[newRow][newCol] == 1 {
				stack = append(stack, cell{newRow, newCol})
			}
		}
	}
}

// RemoveIslandsBFS removes all islands using BFS approach
func RemoveIslandsBFS(matrix [][]int) [][]int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return matrix
	}

	rows, cols := len(matrix), len(matrix[0])
	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	type cell struct {
		row, col int
	}

	queue := []cell{}

	// Collect all border 1s and add to queue
	for row := 0; row < rows; row++ {
		if matrix[row][0] == 1 {
			queue = append(queue, cell{row, 0})
			matrix[row][0] = 2
		}
		if matrix[row][cols-1] == 1 {
			queue = append(queue, cell{row, cols - 1})
			matrix[row][cols-1] = 2
		}
	}

	for col := 1; col < cols-1; col++ {
		if matrix[0][col] == 1 {
			queue = append(queue, cell{0, col})
			matrix[0][col] = 2
		}
		if matrix[rows-1][col] == 1 {
			queue = append(queue, cell{rows - 1, col})
			matrix[rows-1][col] = 2
		}
	}

	// BFS to mark all border-connected 1s
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		for _, dir := range directions {
			newRow, newCol := current.row+dir[0], current.col+dir[1]
			if newRow >= 0 && newRow < rows &&
				newCol >= 0 && newCol < cols &&
				matrix[newRow][newCol] == 1 {
				matrix[newRow][newCol] = 2
				queue = append(queue, cell{newRow, newCol})
			}
		}
	}

	// Convert: 1 -> 0 (islands), 2 -> 1 (border-connected)
	for row := 0; row < rows; row++ {
		for col := 0; col < cols; col++ {
			if matrix[row][col] == 1 {
				matrix[row][col] = 0
			} else if matrix[row][col] == 2 {
				matrix[row][col] = 1
			}
		}
	}

	return matrix
}

// RemoveIslandsWithVisited removes islands using a separate visited matrix
func RemoveIslandsWithVisited(matrix [][]int) [][]int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return matrix
	}

	rows, cols := len(matrix), len(matrix[0])
	connectedToBorder := make([][]bool, rows)
	for i := range connectedToBorder {
		connectedToBorder[i] = make([]bool, cols)
	}

	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	var dfs func(row, col int)
	dfs = func(row, col int) {
		if row < 0 || row >= rows ||
			col < 0 || col >= cols ||
			connectedToBorder[row][col] ||
			matrix[row][col] == 0 {
			return
		}

		connectedToBorder[row][col] = true
		for _, dir := range directions {
			dfs(row+dir[0], col+dir[1])
		}
	}

	// Mark all cells connected to border
	for row := 0; row < rows; row++ {
		dfs(row, 0)
		dfs(row, cols-1)
	}
	for col := 0; col < cols; col++ {
		dfs(0, col)
		dfs(rows-1, col)
	}

	// Remove islands
	for row := 0; row < rows; row++ {
		for col := 0; col < cols; col++ {
			if matrix[row][col] == 1 && !connectedToBorder[row][col] {
				matrix[row][col] = 0
			}
		}
	}

	return matrix
}

// Helper function to compare matrices
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

// Helper to deep copy a matrix
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
		{1, 0, 0, 0, 0, 0},
		{0, 1, 0, 1, 1, 1},
		{0, 0, 1, 0, 1, 0},
		{1, 1, 0, 0, 1, 0},
		{1, 0, 1, 1, 0, 0},
		{1, 0, 0, 0, 0, 1},
	}
	expected1 := [][]int{
		{1, 0, 0, 0, 0, 0},
		{0, 0, 0, 1, 1, 1},
		{0, 0, 0, 0, 1, 0},
		{1, 1, 0, 0, 1, 0},
		{1, 0, 0, 0, 0, 0},
		{1, 0, 0, 0, 0, 1},
	}
	result1 := RemoveIslands(matrix1)
	fmt.Println("Test 1 (DFS):")
	for _, row := range result1 {
		fmt.Printf("  %v\n", row)
	}
	fmt.Printf("Test 1 passed: %v\n", matricesEqual(result1, expected1))

	// Test 2: No islands (all border-connected)
	matrix2 := [][]int{
		{1, 1, 1},
		{1, 0, 1},
		{1, 1, 1},
	}
	expected2 := [][]int{
		{1, 1, 1},
		{1, 0, 1},
		{1, 1, 1},
	}
	result2 := RemoveIslands(matrix2)
	fmt.Printf("\nTest 2 (No islands): %v\n", matricesEqual(result2, expected2))

	// Test 3: All islands
	matrix3 := [][]int{
		{0, 0, 0},
		{0, 1, 0},
		{0, 0, 0},
	}
	expected3 := [][]int{
		{0, 0, 0},
		{0, 0, 0},
		{0, 0, 0},
	}
	result3 := RemoveIslands(matrix3)
	fmt.Printf("Test 3 (All islands): %v\n", matricesEqual(result3, expected3))

	// Test 4: Empty matrix
	matrix4 := [][]int{}
	result4 := RemoveIslands(matrix4)
	fmt.Printf("Test 4 (Empty): %v\n", len(result4) == 0)

	// Test 5: Single row
	matrix5 := [][]int{{1, 0, 1, 0, 1}}
	expected5 := [][]int{{1, 0, 1, 0, 1}}
	result5 := RemoveIslands(matrix5)
	fmt.Printf("Test 5 (Single row): %v\n", matricesEqual(result5, expected5))

	// Test BFS version
	fmt.Println("\n--- Testing BFS Version ---")
	matrix6 := [][]int{
		{1, 0, 0, 0, 0, 0},
		{0, 1, 0, 1, 1, 1},
		{0, 0, 1, 0, 1, 0},
		{1, 1, 0, 0, 1, 0},
		{1, 0, 1, 1, 0, 0},
		{1, 0, 0, 0, 0, 1},
	}
	result6 := RemoveIslandsBFS(matrix6)
	fmt.Printf("BFS Test: %v\n", matricesEqual(result6, expected1))

	fmt.Println("\nAll tests completed!")
}
