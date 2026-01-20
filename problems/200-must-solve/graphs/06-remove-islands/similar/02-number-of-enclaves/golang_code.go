/*
Number of Enclaves - Go Solutions

Count land cells that cannot reach the boundary.
*/

package main

import "fmt"

func numEnclaves(grid [][]int) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return 0
	}

	rows, cols := len(grid), len(grid[0])

	var dfs func(r, c int)
	dfs = func(r, c int) {
		if r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != 1 {
			return
		}
		grid[r][c] = 0
		dfs(r+1, c)
		dfs(r-1, c)
		dfs(r, c+1)
		dfs(r, c-1)
	}

	// Remove border-connected land
	for r := 0; r < rows; r++ {
		dfs(r, 0)
		dfs(r, cols-1)
	}
	for c := 0; c < cols; c++ {
		dfs(0, c)
		dfs(rows-1, c)
	}

	// Count remaining
	count := 0
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			count += grid[r][c]
		}
	}
	return count
}

func main() {
	grid := [][]int{{0, 0, 0, 0}, {1, 0, 1, 0}, {0, 1, 1, 0}, {0, 0, 0, 0}}
	fmt.Printf("Number of enclaves: %d (expected: 3)\n", numEnclaves(grid))
}
