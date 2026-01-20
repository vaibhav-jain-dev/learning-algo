/*
Max Area of Island - Go Solutions

Find the maximum area of an island in a 2D grid.
An island is a group of 1's connected 4-directionally.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: DFS Recursive
// ============================================================================
// Time Complexity:  O(m * n) - visit each cell once
// Space Complexity: O(m * n) - recursion stack worst case
//
// WHY THIS IS BEST:
// - Clean and intuitive
// - Returns area directly from recursion
// - Natural flood-fill pattern
// ============================================================================

// MaxAreaOfIslandDFS finds max island area using recursive DFS.
func MaxAreaOfIslandDFS(grid [][]int) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return 0
	}

	rows, cols := len(grid), len(grid[0])
	maxArea := 0

	var dfs func(r, c int) int
	dfs = func(r, c int) int {
		// Boundary and water checks
		if r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != 1 {
			return 0
		}

		// Mark as visited
		grid[r][c] = 0

		// Count this cell + all connected cells
		return 1 + dfs(r+1, c) + dfs(r-1, c) + dfs(r, c+1) + dfs(r, c-1)
	}

	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == 1 {
				area := dfs(r, c)
				if area > maxArea {
					maxArea = area
				}
			}
		}
	}

	return maxArea
}

// ============================================================================
// APPROACH 2: BFS Iterative
// ============================================================================
// Time Complexity:  O(m * n)
// Space Complexity: O(min(m, n)) for queue
//
// WHEN TO USE:
// - Avoid deep recursion
// - Prefer iterative solutions
// ============================================================================

// MaxAreaOfIslandBFS finds max island area using iterative BFS.
func MaxAreaOfIslandBFS(grid [][]int) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return 0
	}

	rows, cols := len(grid), len(grid[0])
	maxArea := 0
	directions := [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}

	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == 1 {
				area := 0
				queue := [][2]int{{r, c}}
				grid[r][c] = 0

				for len(queue) > 0 {
					cell := queue[0]
					queue = queue[1:]
					cr, cc := cell[0], cell[1]
					area++

					for _, d := range directions {
						nr, nc := cr+d[0], cc+d[1]
						if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 {
							grid[nr][nc] = 0
							queue = append(queue, [2]int{nr, nc})
						}
					}
				}

				if area > maxArea {
					maxArea = area
				}
			}
		}
	}

	return maxArea
}

// ============================================================================
// APPROACH 3: DFS with Stack (Iterative DFS)
// ============================================================================
// Time Complexity:  O(m * n)
// Space Complexity: O(m * n) for stack
//
// VARIANT:
// - Same traversal order as recursive DFS
// - Uses explicit stack
// ============================================================================

// MaxAreaOfIslandStack finds max island area using iterative DFS.
func MaxAreaOfIslandStack(grid [][]int) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return 0
	}

	rows, cols := len(grid), len(grid[0])
	maxArea := 0
	directions := [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}

	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == 1 {
				area := 0
				stack := [][2]int{{r, c}}
				grid[r][c] = 0

				for len(stack) > 0 {
					cell := stack[len(stack)-1]
					stack = stack[:len(stack)-1]
					cr, cc := cell[0], cell[1]
					area++

					for _, d := range directions {
						nr, nc := cr+d[0], cc+d[1]
						if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 {
							grid[nr][nc] = 0
							stack = append(stack, [2]int{nr, nc})
						}
					}
				}

				if area > maxArea {
					maxArea = area
				}
			}
		}
	}

	return maxArea
}

// ============================================================================
// HELPER: Copy grid for testing
// ============================================================================

func copyGrid(grid [][]int) [][]int {
	result := make([][]int, len(grid))
	for i := range grid {
		result[i] = make([]int, len(grid[i]))
		copy(result[i], grid[i])
	}
	return result
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		grid     [][]int
		expected int
		desc     string
	}{
		{
			[][]int{
				{0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0},
				{0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0},
				{0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0},
				{0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0},
				{0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0},
				{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0},
				{0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0},
				{0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0},
			},
			6,
			"Complex grid",
		},
		{[][]int{{0, 0, 0, 0, 0, 0, 0, 0}}, 0, "All water"},
		{[][]int{{1}}, 1, "Single cell island"},
		{[][]int{{1, 1}, {1, 1}}, 4, "2x2 island"},
		{[][]int{{1, 0}, {0, 1}}, 1, "Diagonal (not connected)"},
	}

	fmt.Println("======================================================================")
	fmt.Println("MAX AREA OF ISLAND - TEST RESULTS")
	fmt.Println("======================================================================")

	// Test DFS approach
	fmt.Println("\nApproach 1: DFS Recursive")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		result := MaxAreaOfIslandDFS(copyGrid(tc.grid))
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, result, tc.expected)
	}

	// Test BFS approach
	fmt.Println("\nApproach 2: BFS Iterative")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		result := MaxAreaOfIslandBFS(copyGrid(tc.grid))
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, result, tc.expected)
	}

	// Test Stack approach
	fmt.Println("\nApproach 3: DFS with Stack")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		result := MaxAreaOfIslandStack(copyGrid(tc.grid))
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, result, tc.expected)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE INPUT EXAMPLES")
	fmt.Println("======================================================================")

	fmt.Println("\nExample:")
	grid := [][]int{
		{0, 1, 1, 0},
		{1, 1, 0, 0},
		{0, 0, 1, 1},
		{0, 0, 1, 1},
	}
	fmt.Println("  Grid:")
	for _, row := range grid {
		fmt.Printf("    %v\n", row)
	}
	result := MaxAreaOfIslandDFS(copyGrid(grid))
	fmt.Printf("\n  Maximum Area: %d\n", result)
	fmt.Println("  Explanation: Top-left island has area 4, bottom-right has area 4")

	fmt.Println("\nAll tests completed!")
}
