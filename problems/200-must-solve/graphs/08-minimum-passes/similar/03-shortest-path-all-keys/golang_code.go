/*
Shortest Path to Get All Keys - Go Solutions

BFS with state = (position, keys_collected_bitmask)
*/

package main

import "fmt"

type State struct {
	r, c, keys, steps int
}

func shortestPathAllKeys(grid []string) int {
	rows, cols := len(grid), len(grid[0])
	var queue []State
	allKeys := 0
	visited := make(map[[3]int]bool)

	// Find start and count keys
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			ch := grid[r][c]
			if ch == '@' {
				queue = append(queue, State{r, c, 0, 0})
				visited[[3]int{r, c, 0}] = true
			} else if ch >= 'a' && ch <= 'f' {
				allKeys |= (1 << (ch - 'a'))
			}
		}
	}

	directions := [][2]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}

	for len(queue) > 0 {
		state := queue[0]
		queue = queue[1:]
		r, c, keys, steps := state.r, state.c, state.keys, state.steps

		for _, d := range directions {
			nr, nc := r+d[0], c+d[1]

			if nr >= 0 && nr < rows && nc >= 0 && nc < cols {
				ch := grid[nr][nc]

				if ch == '#' {
					continue
				}
				if ch >= 'A' && ch <= 'F' && (keys&(1<<(ch-'A'))) == 0 {
					continue
				}

				newKeys := keys
				if ch >= 'a' && ch <= 'f' {
					newKeys |= (1 << (ch - 'a'))
				}

				if newKeys == allKeys {
					return steps + 1
				}

				stateKey := [3]int{nr, nc, newKeys}
				if !visited[stateKey] {
					visited[stateKey] = true
					queue = append(queue, State{nr, nc, newKeys, steps + 1})
				}
			}
		}
	}

	return -1
}

func main() {
	grid := []string{"@.a..", "###.#", "b.A.B"}
	fmt.Printf("Shortest path: %d (expected: 8)\n", shortestPathAllKeys(grid))
}
