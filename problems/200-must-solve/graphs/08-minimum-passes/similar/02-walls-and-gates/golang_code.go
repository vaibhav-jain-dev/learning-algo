/*
Walls and Gates - Go Solutions

Fill empty rooms with distance to nearest gate using multi-source BFS.
*/

package main

import "fmt"

const INF = 2147483647

func wallsAndGates(rooms [][]int) {
	if len(rooms) == 0 || len(rooms[0]) == 0 {
		return
	}

	rows, cols := len(rooms), len(rooms[0])
	queue := [][2]int{}

	// Add all gates
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if rooms[r][c] == 0 {
				queue = append(queue, [2]int{r, c})
			}
		}
	}

	directions := [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}

	for len(queue) > 0 {
		cell := queue[0]
		queue = queue[1:]
		r, c := cell[0], cell[1]

		for _, d := range directions {
			nr, nc := r+d[0], c+d[1]
			if nr >= 0 && nr < rows && nc >= 0 && nc < cols && rooms[nr][nc] == INF {
				rooms[nr][nc] = rooms[r][c] + 1
				queue = append(queue, [2]int{nr, nc})
			}
		}
	}
}

func main() {
	rooms := [][]int{
		{INF, -1, 0, INF},
		{INF, INF, INF, -1},
		{INF, -1, INF, -1},
		{0, -1, INF, INF},
	}
	wallsAndGates(rooms)
	fmt.Println("Result:")
	for _, row := range rooms {
		fmt.Println(row)
	}
}
