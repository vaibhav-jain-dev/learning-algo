/*
A* Algorithm - Shortest Path with Heuristic - Go Solution

Find the shortest path between two nodes using the A* search algorithm.

Time Complexity: O(E log V)
Space Complexity: O(V)
*/

package main

import (
	"container/heap"
	"fmt"
	"math"
)

// Position represents a 2D coordinate
type Position struct {
	Row, Col int
}

// Node represents a node in the A* search
type Node struct {
	Pos    Position
	GScore int
	FScore int
	Index  int // for heap interface
}

// PriorityQueue implements heap.Interface
type PriorityQueue []*Node

func (pq PriorityQueue) Len() int { return len(pq) }

func (pq PriorityQueue) Less(i, j int) bool {
	if pq[i].FScore == pq[j].FScore {
		return pq[i].GScore > pq[j].GScore // prefer nodes closer to goal
	}
	return pq[i].FScore < pq[j].FScore
}

func (pq PriorityQueue) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].Index = i
	pq[j].Index = j
}

func (pq *PriorityQueue) Push(x interface{}) {
	n := len(*pq)
	node := x.(*Node)
	node.Index = n
	*pq = append(*pq, node)
}

func (pq *PriorityQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	node := old[n-1]
	old[n-1] = nil
	node.Index = -1
	*pq = old[0 : n-1]
	return node
}

// aStarGrid finds shortest path in a grid using A* algorithm
func aStarGrid(grid [][]int, start, end Position) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return -1
	}

	rows, cols := len(grid), len(grid[0])

	// Check if start or end is blocked
	if grid[start.Row][start.Col] == 1 || grid[end.Row][end.Col] == 1 {
		return -1
	}

	// Heuristic function (Manhattan distance)
	heuristic := func(pos Position) int {
		return abs(pos.Row-end.Row) + abs(pos.Col-end.Col)
	}

	// Get valid neighbors
	getNeighbors := func(pos Position) []Position {
		directions := []Position{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}
		neighbors := []Position{}
		for _, d := range directions {
			nr, nc := pos.Row+d.Row, pos.Col+d.Col
			if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 0 {
				neighbors = append(neighbors, Position{nr, nc})
			}
		}
		return neighbors
	}

	// Initialize priority queue
	pq := &PriorityQueue{}
	heap.Init(pq)
	heap.Push(pq, &Node{Pos: start, GScore: 0, FScore: heuristic(start)})

	// Track g-scores
	gScores := make(map[Position]int)
	gScores[start] = 0

	// Track visited nodes
	visited := make(map[Position]bool)

	for pq.Len() > 0 {
		current := heap.Pop(pq).(*Node)

		if visited[current.Pos] {
			continue
		}
		visited[current.Pos] = true

		// Check if reached goal
		if current.Pos == end {
			return current.GScore
		}

		for _, neighbor := range getNeighbors(current.Pos) {
			if visited[neighbor] {
				continue
			}

			tentativeG := current.GScore + 1

			if existingG, exists := gScores[neighbor]; !exists || tentativeG < existingG {
				gScores[neighbor] = tentativeG
				f := tentativeG + heuristic(neighbor)
				heap.Push(pq, &Node{Pos: neighbor, GScore: tentativeG, FScore: f})
			}
		}
	}

	return -1 // No path found
}

// aStarWithPath finds shortest path and returns the actual path
func aStarWithPath(grid [][]int, start, end Position) (int, []Position) {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return -1, nil
	}

	rows, cols := len(grid), len(grid[0])

	if grid[start.Row][start.Col] == 1 || grid[end.Row][end.Col] == 1 {
		return -1, nil
	}

	heuristic := func(pos Position) int {
		return abs(pos.Row-end.Row) + abs(pos.Col-end.Col)
	}

	getNeighbors := func(pos Position) []Position {
		directions := []Position{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}
		neighbors := []Position{}
		for _, d := range directions {
			nr, nc := pos.Row+d.Row, pos.Col+d.Col
			if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 0 {
				neighbors = append(neighbors, Position{nr, nc})
			}
		}
		return neighbors
	}

	pq := &PriorityQueue{}
	heap.Init(pq)
	heap.Push(pq, &Node{Pos: start, GScore: 0, FScore: heuristic(start)})

	gScores := make(map[Position]int)
	gScores[start] = 0

	cameFrom := make(map[Position]Position)
	visited := make(map[Position]bool)

	for pq.Len() > 0 {
		current := heap.Pop(pq).(*Node)

		if visited[current.Pos] {
			continue
		}
		visited[current.Pos] = true

		if current.Pos == end {
			// Reconstruct path
			path := []Position{current.Pos}
			pos := current.Pos
			for {
				prev, exists := cameFrom[pos]
				if !exists {
					break
				}
				path = append([]Position{prev}, path...)
				pos = prev
			}
			return current.GScore, path
		}

		for _, neighbor := range getNeighbors(current.Pos) {
			if visited[neighbor] {
				continue
			}

			tentativeG := current.GScore + 1

			if existingG, exists := gScores[neighbor]; !exists || tentativeG < existingG {
				gScores[neighbor] = tentativeG
				cameFrom[neighbor] = current.Pos
				f := tentativeG + heuristic(neighbor)
				heap.Push(pq, &Node{Pos: neighbor, GScore: tentativeG, FScore: f})
			}
		}
	}

	return -1, nil
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func main() {
	// Test 1: Basic grid pathfinding
	grid1 := [][]int{
		{0, 0, 0, 0},
		{0, 1, 1, 0},
		{0, 0, 0, 0},
		{0, 1, 0, 0},
	}
	result1 := aStarGrid(grid1, Position{0, 0}, Position{3, 3})
	fmt.Printf("Test 1: %d\n", result1)
	if result1 != 6 {
		fmt.Printf("FAIL: Expected 6, got %d\n", result1)
	}

	// Test 1b: With path
	length1, path1 := aStarWithPath(grid1, Position{0, 0}, Position{3, 3})
	fmt.Printf("Test 1b: Length=%d, Path=%v\n", length1, path1)
	if length1 != 6 {
		fmt.Printf("FAIL: Expected length 6, got %d\n", length1)
	}

	// Test 2: No path exists
	grid2 := [][]int{{0, 1}, {1, 0}}
	result2 := aStarGrid(grid2, Position{0, 0}, Position{1, 1})
	fmt.Printf("Test 2: %d\n", result2)
	if result2 != -1 {
		fmt.Printf("FAIL: Expected -1, got %d\n", result2)
	}

	// Test 3: Simple path
	grid3 := [][]int{{0, 0, 0}, {0, 0, 0}, {0, 0, 0}}
	result3 := aStarGrid(grid3, Position{0, 0}, Position{2, 2})
	fmt.Printf("Test 3: %d\n", result3)
	if result3 != 4 {
		fmt.Printf("FAIL: Expected 4, got %d\n", result3)
	}

	// Test 4: Start equals end
	result4 := aStarGrid(grid3, Position{0, 0}, Position{0, 0})
	fmt.Printf("Test 4: %d\n", result4)
	if result4 != 0 {
		fmt.Printf("FAIL: Expected 0, got %d\n", result4)
	}

	// Test 5: Large grid
	grid5 := make([][]int, 10)
	for i := range grid5 {
		grid5[i] = make([]int, 10)
	}
	result5 := aStarGrid(grid5, Position{0, 0}, Position{9, 9})
	fmt.Printf("Test 5: %d\n", result5)
	if result5 != 18 {
		fmt.Printf("FAIL: Expected 18, got %d\n", result5)
	}

	// Suppress unused import warning
	_ = math.Abs

	fmt.Println("\nAll tests passed!")
}
