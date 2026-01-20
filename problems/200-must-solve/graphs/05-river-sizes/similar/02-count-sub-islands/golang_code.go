/*
Count Sub Islands - Go Solutions

Count islands in grid2 that are completely contained within islands in grid1.
*/

package main

import "fmt"

// CountSubIslands counts sub-islands using DFS.
func CountSubIslands(grid1 [][]int, grid2 [][]int) int {
	if len(grid1) == 0 || len(grid2) == 0 {
		return 0
	}

	rows, cols := len(grid1), len(grid1[0])

	var dfs func(r, c int) bool
	dfs = func(r, c int) bool {
		if r < 0 || r >= rows || c < 0 || c >= cols || grid2[r][c] != 1 {
			return true
		}

		grid2[r][c] = 0
		isSub := grid1[r][c] == 1

		// Must explore all branches
		isSub = dfs(r+1, c) && isSub
		isSub = dfs(r-1, c) && isSub
		isSub = dfs(r, c+1) && isSub
		isSub = dfs(r, c-1) && isSub

		return isSub
	}

	count := 0
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid2[r][c] == 1 {
				if dfs(r, c) {
					count++
				}
			}
		}
	}

	return count
}

func main() {
	grid1 := [][]int{
		{1, 1, 1, 0, 0},
		{0, 1, 1, 1, 1},
		{0, 0, 0, 0, 0},
		{1, 0, 0, 0, 0},
		{1, 1, 0, 1, 1},
	}
	grid2 := [][]int{
		{1, 1, 1, 0, 0},
		{0, 0, 1, 1, 1},
		{0, 1, 0, 0, 0},
		{1, 0, 1, 1, 0},
		{0, 1, 0, 1, 0},
	}

	result := CountSubIslands(grid1, grid2)
	fmt.Printf("Count Sub Islands: %d (expected: 3)\n", result)
}
