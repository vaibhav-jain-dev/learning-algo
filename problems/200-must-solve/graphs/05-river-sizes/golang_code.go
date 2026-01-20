/*
River Sizes - Go Solution

Find the sizes of all rivers in a matrix where 1s represent water.

Time Complexity: O(n * m) where n is rows and m is columns
Space Complexity: O(n * m) for the visited set
*/

package main

import (
	"fmt"
	"sort"
)

// RiverSizes finds all river sizes using iterative DFS
func RiverSizes(matrix [][]int) []int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return []int{}
	}

	rows, cols := len(matrix), len(matrix[0])
	visited := make([][]bool, rows)
	for i := range visited {
		visited[i] = make([]bool, cols)
	}

	sizes := []int{}

	for row := 0; row < rows; row++ {
		for col := 0; col < cols; col++ {
			if !visited[row][col] && matrix[row][col] == 1 {
				size := exploreRiverDFS(matrix, visited, row, col)
				sizes = append(sizes, size)
			}
		}
	}

	return sizes
}

// exploreRiverDFS explores a river using DFS and returns its size
func exploreRiverDFS(matrix [][]int, visited [][]bool, startRow, startCol int) int {
	rows, cols := len(matrix), len(matrix[0])
	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}} // up, down, left, right

	type cell struct {
		row, col int
	}

	stack := []cell{{startRow, startCol}}
	size := 0

	for len(stack) > 0 {
		// Pop from stack
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		row, col := current.row, current.col

		if visited[row][col] {
			continue
		}

		visited[row][col] = true
		size++

		// Explore neighbors
		for _, dir := range directions {
			newRow, newCol := row+dir[0], col+dir[1]
			if newRow >= 0 && newRow < rows &&
				newCol >= 0 && newCol < cols &&
				!visited[newRow][newCol] &&
				matrix[newRow][newCol] == 1 {
				stack = append(stack, cell{newRow, newCol})
			}
		}
	}

	return size
}

// RiverSizesBFS finds all river sizes using BFS
func RiverSizesBFS(matrix [][]int) []int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return []int{}
	}

	rows, cols := len(matrix), len(matrix[0])
	visited := make([][]bool, rows)
	for i := range visited {
		visited[i] = make([]bool, cols)
	}

	directions := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	sizes := []int{}

	type cell struct {
		row, col int
	}

	for row := 0; row < rows; row++ {
		for col := 0; col < cols; col++ {
			if !visited[row][col] && matrix[row][col] == 1 {
				// BFS from this cell
				size := 0
				queue := []cell{{row, col}}
				visited[row][col] = true

				for len(queue) > 0 {
					// Dequeue
					current := queue[0]
					queue = queue[1:]
					size++

					for _, dir := range directions {
						newRow, newCol := current.row+dir[0], current.col+dir[1]
						if newRow >= 0 && newRow < rows &&
							newCol >= 0 && newCol < cols &&
							!visited[newRow][newCol] &&
							matrix[newRow][newCol] == 1 {
							visited[newRow][newCol] = true
							queue = append(queue, cell{newRow, newCol})
						}
					}
				}

				sizes = append(sizes, size)
			}
		}
	}

	return sizes
}

// RiverSizesRecursive finds all river sizes using recursive DFS
func RiverSizesRecursive(matrix [][]int) []int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return []int{}
	}

	rows, cols := len(matrix), len(matrix[0])
	visited := make([][]bool, rows)
	for i := range visited {
		visited[i] = make([]bool, cols)
	}

	sizes := []int{}

	var dfs func(row, col int) int
	dfs = func(row, col int) int {
		if row < 0 || row >= rows ||
			col < 0 || col >= cols ||
			visited[row][col] ||
			matrix[row][col] == 0 {
			return 0
		}

		visited[row][col] = true
		size := 1

		// Explore all four directions
		size += dfs(row-1, col) // up
		size += dfs(row+1, col) // down
		size += dfs(row, col-1) // left
		size += dfs(row, col+1) // right

		return size
	}

	for row := 0; row < rows; row++ {
		for col := 0; col < cols; col++ {
			if !visited[row][col] && matrix[row][col] == 1 {
				sizes = append(sizes, dfs(row, col))
			}
		}
	}

	return sizes
}

func main() {
	// Test 1: Example from problem
	matrix1 := [][]int{
		{1, 0, 0, 1, 0},
		{1, 0, 1, 0, 0},
		{0, 0, 1, 0, 1},
		{1, 0, 1, 0, 1},
		{1, 0, 1, 1, 0},
	}
	result1 := RiverSizes(matrix1)
	sort.Ints(result1)
	fmt.Printf("Test 1 (DFS): %v\n", result1) // Expected: [1, 2, 2, 2, 5]

	// Test 2: All connected
	matrix2 := [][]int{
		{1, 1, 1},
		{1, 1, 1},
		{1, 1, 1},
	}
	result2 := RiverSizes(matrix2)
	fmt.Printf("Test 2 (All connected): %v\n", result2) // Expected: [9]

	// Test 3: No rivers
	matrix3 := [][]int{
		{0, 0, 0},
		{0, 0, 0},
		{0, 0, 0},
	}
	result3 := RiverSizes(matrix3)
	fmt.Printf("Test 3 (No rivers): %v\n", result3) // Expected: []

	// Test 4: Each cell is a separate river
	matrix4 := [][]int{
		{1, 0, 1},
		{0, 1, 0},
		{1, 0, 1},
	}
	result4 := RiverSizes(matrix4)
	sort.Ints(result4)
	fmt.Printf("Test 4 (Separate rivers): %v\n", result4) // Expected: [1, 1, 1, 1, 1]

	// Test 5: Empty matrix
	result5 := RiverSizes([][]int{})
	fmt.Printf("Test 5 (Empty): %v\n", result5) // Expected: []

	// Test 6: Single cell with river
	result6 := RiverSizes([][]int{{1}})
	fmt.Printf("Test 6 (Single river cell): %v\n", result6) // Expected: [1]

	// Test 7: Single cell without river
	result7 := RiverSizes([][]int{{0}})
	fmt.Printf("Test 7 (Single land cell): %v\n", result7) // Expected: []

	// Test BFS version
	fmt.Println("\n--- Testing BFS Version ---")
	resultBFS := RiverSizesBFS(matrix1)
	sort.Ints(resultBFS)
	fmt.Printf("BFS Test: %v\n", resultBFS) // Expected: [1, 2, 2, 2, 5]

	// Test recursive version
	fmt.Println("\n--- Testing Recursive Version ---")
	resultRec := RiverSizesRecursive(matrix1)
	sort.Ints(resultRec)
	fmt.Printf("Recursive Test: %v\n", resultRec) // Expected: [1, 2, 2, 2, 5]

	fmt.Println("\nAll tests completed!")
}
