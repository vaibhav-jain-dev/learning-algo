/*
Rotting Oranges - Go Solutions

Find minimum minutes for all oranges to rot using multi-source BFS.
*/

package main

import "fmt"

func orangesRotting(grid [][]int) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return 0
	}

	rows, cols := len(grid), len(grid[0])
	queue := [][2]int{}
	fresh := 0

	// Initialize
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == 2 {
				queue = append(queue, [2]int{r, c})
			} else if grid[r][c] == 1 {
				fresh++
			}
		}
	}

	if fresh == 0 {
		return 0
	}

	directions := [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	minutes := 0

	for len(queue) > 0 && fresh > 0 {
		minutes++
		size := len(queue)
		for i := 0; i < size; i++ {
			cell := queue[0]
			queue = queue[1:]
			r, c := cell[0], cell[1]

			for _, d := range directions {
				nr, nc := r+d[0], c+d[1]
				if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 {
					grid[nr][nc] = 2
					fresh--
					queue = append(queue, [2]int{nr, nc})
				}
			}
		}
	}

	if fresh == 0 {
		return minutes
	}
	return -1
}

func main() {
	grid := [][]int{{2, 1, 1}, {1, 1, 0}, {0, 1, 1}}
	fmt.Printf("Rotting oranges: %d (expected: 4)\n", orangesRotting(grid))
}
