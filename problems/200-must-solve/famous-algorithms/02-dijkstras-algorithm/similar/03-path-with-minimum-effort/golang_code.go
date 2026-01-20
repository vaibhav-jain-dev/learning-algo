/*
Path With Minimum Effort - Go Solution

Time Complexity: O(M * N * log(M * N))
Space Complexity: O(M * N)
*/

package main

import (
	"container/heap"
	"fmt"
	"math"
)

type Cell struct {
	effort int
	row    int
	col    int
}

type CellHeap []Cell

func (h CellHeap) Len() int           { return len(h) }
func (h CellHeap) Less(i, j int) bool { return h[i].effort < h[j].effort }
func (h CellHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *CellHeap) Push(x interface{}) { *h = append(*h, x.(Cell)) }
func (h *CellHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func minimumEffortPath(heights [][]int) int {
	rows, cols := len(heights), len(heights[0])
	directions := [][2]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}

	effort := make([][]int, rows)
	for i := range effort {
		effort[i] = make([]int, cols)
		for j := range effort[i] {
			effort[i][j] = math.MaxInt32
		}
	}
	effort[0][0] = 0

	pq := &CellHeap{{0, 0, 0}}
	heap.Init(pq)

	for pq.Len() > 0 {
		cell := heap.Pop(pq).(Cell)
		currEffort, r, c := cell.effort, cell.row, cell.col

		if r == rows-1 && c == cols-1 {
			return currEffort
		}

		if currEffort > effort[r][c] {
			continue
		}

		for _, d := range directions {
			nr, nc := r+d[0], c+d[1]
			if nr >= 0 && nr < rows && nc >= 0 && nc < cols {
				newEffort := max(currEffort, abs(heights[nr][nc]-heights[r][c]))
				if newEffort < effort[nr][nc] {
					effort[nr][nc] = newEffort
					heap.Push(pq, Cell{newEffort, nr, nc})
				}
			}
		}
	}

	return effort[rows-1][cols-1]
}

func main() {
	fmt.Printf("Test 1: %d\n", minimumEffortPath([][]int{{1,2,2},{3,8,2},{5,3,5}})) // Expected: 2
	fmt.Printf("Test 2: %d\n", minimumEffortPath([][]int{{1,2,3},{3,8,4},{5,3,5}})) // Expected: 1
	fmt.Println("\nAll tests completed!")
}
