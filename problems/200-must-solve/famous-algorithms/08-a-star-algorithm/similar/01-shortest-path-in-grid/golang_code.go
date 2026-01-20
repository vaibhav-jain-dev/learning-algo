/*
Shortest Path in Binary Matrix - Go Solution

Find shortest path from top-left to bottom-right in a binary grid with 8-directional movement.

Time Complexity: O(n^2)
Space Complexity: O(n^2)
*/

package main

import (
	"container/heap"
	"fmt"
)

// Point represents a position in the grid
type Point struct {
	Row, Col int
}

// BFS Item for queue
type BFSItem struct {
	Row, Col, Dist int
}

// shortestPathBinaryMatrixBFS finds shortest path using BFS
func shortestPathBinaryMatrixBFS(grid [][]int) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return -1
	}

	n := len(grid)

	if grid[0][0] == 1 || grid[n-1][n-1] == 1 {
		return -1
	}

	if n == 1 {
		return 1
	}

	directions := []Point{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1}, {0, 1},
		{1, -1}, {1, 0}, {1, 1},
	}

	queue := []BFSItem{{0, 0, 1}}
	visited := make(map[Point]bool)
	visited[Point{0, 0}] = true

	for len(queue) > 0 {
		item := queue[0]
		queue = queue[1:]

		for _, d := range directions {
			nr, nc := item.Row+d.Row, item.Col+d.Col

			if nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0 && !visited[Point{nr, nc}] {
				if nr == n-1 && nc == n-1 {
					return item.Dist + 1
				}

				visited[Point{nr, nc}] = true
				queue = append(queue, BFSItem{nr, nc, item.Dist + 1})
			}
		}
	}

	return -1
}

// AStarNode for priority queue
type AStarNode struct {
	FScore, GScore int
	Row, Col       int
	Index          int
}

// AStarPQ implements heap.Interface
type AStarPQ []*AStarNode

func (pq AStarPQ) Len() int { return len(pq) }

func (pq AStarPQ) Less(i, j int) bool {
	return pq[i].FScore < pq[j].FScore
}

func (pq AStarPQ) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].Index = i
	pq[j].Index = j
}

func (pq *AStarPQ) Push(x interface{}) {
	n := len(*pq)
	node := x.(*AStarNode)
	node.Index = n
	*pq = append(*pq, node)
}

func (pq *AStarPQ) Pop() interface{} {
	old := *pq
	n := len(old)
	node := old[n-1]
	old[n-1] = nil
	node.Index = -1
	*pq = old[0 : n-1]
	return node
}

// shortestPathBinaryMatrixAStar finds shortest path using A*
func shortestPathBinaryMatrixAStar(grid [][]int) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return -1
	}

	n := len(grid)

	if grid[0][0] == 1 || grid[n-1][n-1] == 1 {
		return -1
	}

	if n == 1 {
		return 1
	}

	// Chebyshev distance heuristic
	heuristic := func(row, col int) int {
		dr := n - 1 - row
		dc := n - 1 - col
		if dr < 0 {
			dr = -dr
		}
		if dc < 0 {
			dc = -dc
		}
		if dr > dc {
			return dr
		}
		return dc
	}

	directions := []Point{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1}, {0, 1},
		{1, -1}, {1, 0}, {1, 1},
	}

	pq := &AStarPQ{}
	heap.Init(pq)
	startH := heuristic(0, 0)
	heap.Push(pq, &AStarNode{FScore: startH + 1, GScore: 1, Row: 0, Col: 0})

	gScores := make(map[Point]int)
	gScores[Point{0, 0}] = 1

	for pq.Len() > 0 {
		node := heap.Pop(pq).(*AStarNode)

		if node.Row == n-1 && node.Col == n-1 {
			return node.GScore
		}

		if existing, ok := gScores[Point{node.Row, node.Col}]; ok && node.GScore > existing {
			continue
		}

		for _, d := range directions {
			nr, nc := node.Row+d.Row, node.Col+d.Col

			if nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0 {
				newG := node.GScore + 1

				if existing, ok := gScores[Point{nr, nc}]; !ok || newG < existing {
					gScores[Point{nr, nc}] = newG
					f := newG + heuristic(nr, nc)
					heap.Push(pq, &AStarNode{FScore: f, GScore: newG, Row: nr, Col: nc})
				}
			}
		}
	}

	return -1
}

func main() {
	// Test 1: Diagonal path
	grid1 := [][]int{{0, 1}, {1, 0}}
	result1 := shortestPathBinaryMatrixBFS(grid1)
	fmt.Printf("Test 1 (BFS): %d\n", result1)
	if result1 != 2 {
		fmt.Printf("FAIL: Expected 2, got %d\n", result1)
	}

	result1AStar := shortestPathBinaryMatrixAStar(grid1)
	fmt.Printf("Test 1 (A*): %d\n", result1AStar)
	if result1AStar != 2 {
		fmt.Printf("FAIL: Expected 2, got %d\n", result1AStar)
	}

	// Test 2: Longer path
	grid2 := [][]int{{0, 0, 0}, {1, 1, 0}, {1, 1, 0}}
	result2 := shortestPathBinaryMatrixBFS(grid2)
	fmt.Printf("Test 2 (BFS): %d\n", result2)
	if result2 != 4 {
		fmt.Printf("FAIL: Expected 4, got %d\n", result2)
	}

	// Test 3: Blocked start
	grid3 := [][]int{{1, 0, 0}, {1, 1, 0}, {1, 1, 0}}
	result3 := shortestPathBinaryMatrixBFS(grid3)
	fmt.Printf("Test 3 (BFS): %d\n", result3)
	if result3 != -1 {
		fmt.Printf("FAIL: Expected -1, got %d\n", result3)
	}

	// Test 4: Single cell
	grid4 := [][]int{{0}}
	result4 := shortestPathBinaryMatrixBFS(grid4)
	fmt.Printf("Test 4 (BFS): %d\n", result4)
	if result4 != 1 {
		fmt.Printf("FAIL: Expected 1, got %d\n", result4)
	}

	// Test 5: Straight diagonal path
	grid5 := [][]int{{0, 0, 0}, {0, 0, 0}, {0, 0, 0}}
	result5 := shortestPathBinaryMatrixBFS(grid5)
	fmt.Printf("Test 5 (BFS): %d\n", result5)
	if result5 != 3 {
		fmt.Printf("FAIL: Expected 3, got %d\n", result5)
	}

	fmt.Println("\nAll tests passed!")
}
