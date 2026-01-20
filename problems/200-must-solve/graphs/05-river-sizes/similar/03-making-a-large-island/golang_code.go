/*
Making A Large Island - Go Solutions

Find the largest island after changing at most one 0 to 1.
*/

package main

import "fmt"

func largestIsland(grid [][]int) int {
	n := len(grid)
	if n == 0 {
		return 0
	}

	directions := [][2]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}
	islandID := 2
	islandSize := make(map[int]int)

	var dfs func(r, c, id int) int
	dfs = func(r, c, id int) int {
		if r < 0 || r >= n || c < 0 || c >= n || grid[r][c] != 1 {
			return 0
		}
		grid[r][c] = id
		size := 1
		for _, d := range directions {
			size += dfs(r+d[0], c+d[1], id)
		}
		return size
	}

	// Label islands
	for r := 0; r < n; r++ {
		for c := 0; c < n; c++ {
			if grid[r][c] == 1 {
				size := dfs(r, c, islandID)
				islandSize[islandID] = size
				islandID++
			}
		}
	}

	if len(islandSize) == 0 {
		return 1
	}

	maxSize := 0
	for _, size := range islandSize {
		if size > maxSize {
			maxSize = size
		}
	}

	// Check each 0
	for r := 0; r < n; r++ {
		for c := 0; c < n; c++ {
			if grid[r][c] == 0 {
				adjacent := make(map[int]bool)
				for _, d := range directions {
					nr, nc := r+d[0], c+d[1]
					if nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] > 1 {
						adjacent[grid[nr][nc]] = true
					}
				}
				newSize := 1
				for id := range adjacent {
					newSize += islandSize[id]
				}
				if newSize > maxSize {
					maxSize = newSize
				}
			}
		}
	}

	return maxSize
}

func main() {
	fmt.Printf("[[1,0],[0,1]]: %d (expected 3)\n", largestIsland([][]int{{1, 0}, {0, 1}}))
	fmt.Printf("[[1,1],[1,0]]: %d (expected 4)\n", largestIsland([][]int{{1, 1}, {1, 0}}))
	fmt.Printf("[[1,1],[1,1]]: %d (expected 4)\n", largestIsland([][]int{{1, 1}, {1, 1}}))
}
