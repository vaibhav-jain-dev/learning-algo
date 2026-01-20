/*
Number of Closed Islands - Go Solutions

Count islands (0s) that are completely surrounded by water (1s).
*/

package main

import "fmt"

func closedIsland(grid [][]int) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return 0
	}

	rows, cols := len(grid), len(grid[0])

	var dfs func(r, c int)
	dfs = func(r, c int) {
		if r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != 0 {
			return
		}
		grid[r][c] = 1
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

	// Count remaining islands
	count := 0
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == 0 {
				dfs(r, c)
				count++
			}
		}
	}
	return count
}

func main() {
	grid := [][]int{{1,1,1,1,1,1,1,0},{1,0,0,0,0,1,1,0},{1,0,1,0,1,1,1,0},{1,0,0,0,0,1,0,1},{1,1,1,1,1,1,1,0}}
	fmt.Printf("Closed islands: %d (expected: 2)\n", closedIsland(grid))
}
