/*
Shortest Path in Binary Matrix - Go Solutions

Find shortest path from top-left to bottom-right in a grid
with 8-directional movement.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"container/heap"
	"fmt"
)

// ============================================================================
// APPROACH 1: BFS (Standard)
// ============================================================================
// Time Complexity:  O(N^2) - visit each cell at most once
// Space Complexity: O(N^2) - for visited tracking and queue
//
// WHY THIS IS BEST:
// - BFS guarantees shortest path in unweighted graph
// - Simple and intuitive implementation
// - Standard grid traversal pattern
// ============================================================================

// ShortestPathBFS finds shortest path using BFS.
//
// Key Insight: BFS explores cells in order of distance from source.
// First time we reach destination is guaranteed to be shortest path.
//
// 8 directions: up, down, left, right, and 4 diagonals.
func ShortestPathBFS(grid [][]int) int {
	n := len(grid)
	if n == 0 || grid[0][0] == 1 || grid[n-1][n-1] == 1 {
		return -1
	}

	if n == 1 {
		return 1
	}

	// 8 directions: including diagonals
	directions := [][2]int{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1}, {0, 1},
		{1, -1}, {1, 0}, {1, 1},
	}

	// BFS queue: (row, col)
	queue := [][2]int{{0, 0}}
	grid[0][0] = 1 // Mark visited by setting to 1
	pathLength := 1

	for len(queue) > 0 {
		// Process all cells at current distance
		levelSize := len(queue)

		for i := 0; i < levelSize; i++ {
			cell := queue[0]
			queue = queue[1:]
			r, c := cell[0], cell[1]

			// Check all 8 neighbors
			for _, d := range directions {
				nr, nc := r+d[0], c+d[1]

				// Skip invalid or blocked cells
				if nr < 0 || nr >= n || nc < 0 || nc >= n || grid[nr][nc] == 1 {
					continue
				}

				// Check if reached destination
				if nr == n-1 && nc == n-1 {
					return pathLength + 1
				}

				// Mark visited and add to queue
				grid[nr][nc] = 1
				queue = append(queue, [2]int{nr, nc})
			}
		}

		pathLength++
	}

	return -1 // No path found
}

// ============================================================================
// APPROACH 2: BFS with Separate Visited Set (Non-destructive)
// ============================================================================
// Time Complexity:  O(N^2)
// Space Complexity: O(N^2)
//
// WHEN TO USE:
// - Don't want to modify original grid
// - Need to run multiple queries on same grid
// ============================================================================

// ShortestPathBFSClean finds path without modifying grid.
func ShortestPathBFSClean(grid [][]int) int {
	n := len(grid)
	if n == 0 || grid[0][0] == 1 || grid[n-1][n-1] == 1 {
		return -1
	}

	if n == 1 {
		return 1
	}

	directions := [][2]int{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1}, {0, 1},
		{1, -1}, {1, 0}, {1, 1},
	}

	// Use separate visited set
	visited := make([][]bool, n)
	for i := range visited {
		visited[i] = make([]bool, n)
	}

	queue := [][2]int{{0, 0}}
	visited[0][0] = true
	pathLength := 1

	for len(queue) > 0 {
		levelSize := len(queue)

		for i := 0; i < levelSize; i++ {
			cell := queue[0]
			queue = queue[1:]
			r, c := cell[0], cell[1]

			for _, d := range directions {
				nr, nc := r+d[0], c+d[1]

				if nr < 0 || nr >= n || nc < 0 || nc >= n {
					continue
				}
				if grid[nr][nc] == 1 || visited[nr][nc] {
					continue
				}

				if nr == n-1 && nc == n-1 {
					return pathLength + 1
				}

				visited[nr][nc] = true
				queue = append(queue, [2]int{nr, nc})
			}
		}

		pathLength++
	}

	return -1
}

// ============================================================================
// APPROACH 3: A* Search with Manhattan Heuristic
// ============================================================================
// Time Complexity:  O(N^2 log N) - priority queue operations
// Space Complexity: O(N^2)
//
// WHEN TO USE:
// - Large grids where BFS is slow
// - Want to explore promising paths first
// ============================================================================

// Cell for priority queue
type Cell struct {
	row, col int
	dist     int // Actual distance
	priority int // dist + heuristic
}

// PriorityQueue implements heap.Interface
type PriorityQueue []*Cell

func (pq PriorityQueue) Len() int           { return len(pq) }
func (pq PriorityQueue) Less(i, j int) bool { return pq[i].priority < pq[j].priority }
func (pq PriorityQueue) Swap(i, j int)      { pq[i], pq[j] = pq[j], pq[i] }

func (pq *PriorityQueue) Push(x interface{}) {
	*pq = append(*pq, x.(*Cell))
}

func (pq *PriorityQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	x := old[n-1]
	*pq = old[0 : n-1]
	return x
}

// Chebyshev distance (8-directional)
func heuristic(r, c, n int) int {
	dr := n - 1 - r
	dc := n - 1 - c
	if dr > dc {
		return dr
	}
	return dc
}

// ShortestPathAStar uses A* search.
func ShortestPathAStar(grid [][]int) int {
	n := len(grid)
	if n == 0 || grid[0][0] == 1 || grid[n-1][n-1] == 1 {
		return -1
	}

	if n == 1 {
		return 1
	}

	directions := [][2]int{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1}, {0, 1},
		{1, -1}, {1, 0}, {1, 1},
	}

	// Distance array
	dist := make([][]int, n)
	for i := range dist {
		dist[i] = make([]int, n)
		for j := range dist[i] {
			dist[i][j] = -1
		}
	}

	// Priority queue
	pq := &PriorityQueue{}
	heap.Init(pq)
	heap.Push(pq, &Cell{0, 0, 1, 1 + heuristic(0, 0, n)})
	dist[0][0] = 1

	for pq.Len() > 0 {
		cell := heap.Pop(pq).(*Cell)
		r, c, d := cell.row, cell.col, cell.dist

		// Skip if we've found a shorter path
		if d > dist[r][c] {
			continue
		}

		// Check if reached destination
		if r == n-1 && c == n-1 {
			return d
		}

		for _, dir := range directions {
			nr, nc := r+dir[0], c+dir[1]

			if nr < 0 || nr >= n || nc < 0 || nc >= n || grid[nr][nc] == 1 {
				continue
			}

			newDist := d + 1
			if dist[nr][nc] == -1 || newDist < dist[nr][nc] {
				dist[nr][nc] = newDist
				heap.Push(pq, &Cell{nr, nc, newDist, newDist + heuristic(nr, nc, n)})
			}
		}
	}

	return -1
}

// ============================================================================
// TEST CASES
// ============================================================================

func copyGrid(grid [][]int) [][]int {
	n := len(grid)
	result := make([][]int, n)
	for i := range grid {
		result[i] = make([]int, len(grid[i]))
		copy(result[i], grid[i])
	}
	return result
}

func main() {
	testCases := []struct {
		grid     [][]int
		expected int
		desc     string
	}{
		{
			[][]int{{0, 1}, {1, 0}},
			2,
			"2x2 diagonal path",
		},
		{
			[][]int{{0, 0, 0}, {1, 1, 0}, {1, 1, 0}},
			4,
			"3x3 around obstacles",
		},
		{
			[][]int{{1, 0, 0}, {1, 1, 0}, {1, 1, 0}},
			-1,
			"Starting cell blocked",
		},
		{
			[][]int{{0, 0, 0}, {0, 1, 0}, {0, 0, 0}},
			3,
			"3x3 with center blocked",
		},
		{
			[][]int{{0}},
			1,
			"Single cell",
		},
		{
			[][]int{
				{0, 0, 0, 0},
				{1, 1, 1, 0},
				{0, 0, 0, 0},
				{0, 1, 1, 0},
			},
			5,
			"4x4 maze",
		},
	}

	fmt.Println("======================================================================")
	fmt.Println("SHORTEST PATH IN BINARY MATRIX - TEST RESULTS")
	fmt.Println("======================================================================")

	// Test BFS
	fmt.Println("\nApproach 1: BFS (Standard)")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		grid := copyGrid(tc.grid)
		result := ShortestPathBFS(grid)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, result, tc.expected)
	}

	// Test BFS Clean
	fmt.Println("\nApproach 2: BFS (Non-destructive)")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		result := ShortestPathBFSClean(tc.grid)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, result, tc.expected)
	}

	// Test A*
	fmt.Println("\nApproach 3: A* Search")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		result := ShortestPathAStar(tc.grid)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, result, tc.expected)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("DETAILED EXAMPLE")
	fmt.Println("======================================================================")

	grid := [][]int{{0, 0, 0}, {1, 1, 0}, {1, 1, 0}}
	fmt.Println("\nGrid:")
	for _, row := range grid {
		fmt.Printf("  %v\n", row)
	}
	fmt.Printf("\nShortest path: %d cells\n", ShortestPathBFSClean(grid))
	fmt.Println("Path: (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2)")

	fmt.Println("\nAll tests completed!")
}
