/*
Sliding Puzzle (8-Puzzle Problem) - Go Solution

Solve the sliding puzzle using minimum moves with BFS or A*.

Time Complexity: O((mn)!)
Space Complexity: O((mn)!)
*/

package main

import (
	"container/heap"
	"fmt"
	"strings"
)

// slidingPuzzleBFS solves sliding puzzle using BFS
func slidingPuzzleBFS(board [][]int) int {
	goal := "123450"

	// Convert board to string
	var sb strings.Builder
	for _, row := range board {
		for _, tile := range row {
			sb.WriteByte(byte('0' + tile))
		}
	}
	start := sb.String()

	if start == goal {
		return 0
	}

	// Neighbors for each position of 0
	neighbors := map[int][]int{
		0: {1, 3},
		1: {0, 2, 4},
		2: {1, 5},
		3: {0, 4},
		4: {1, 3, 5},
		5: {2, 4},
	}

	type Item struct {
		state string
		moves int
	}

	queue := []Item{{start, 0}}
	visited := map[string]bool{start: true}

	for len(queue) > 0 {
		item := queue[0]
		queue = queue[1:]

		zeroIdx := strings.Index(item.state, "0")

		for _, neighborIdx := range neighbors[zeroIdx] {
			// Swap 0 with neighbor
			stateBytes := []byte(item.state)
			stateBytes[zeroIdx], stateBytes[neighborIdx] = stateBytes[neighborIdx], stateBytes[zeroIdx]
			newState := string(stateBytes)

			if newState == goal {
				return item.moves + 1
			}

			if !visited[newState] {
				visited[newState] = true
				queue = append(queue, Item{newState, item.moves + 1})
			}
		}
	}

	return -1
}

// AStarItem for priority queue
type AStarItem struct {
	FScore int
	Moves  int
	State  string
	Index  int
}

// AStarPQ implements heap.Interface
type AStarPQ []*AStarItem

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
	item := x.(*AStarItem)
	item.Index = n
	*pq = append(*pq, item)
}

func (pq *AStarPQ) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	old[n-1] = nil
	item.Index = -1
	*pq = old[0 : n-1]
	return item
}

// slidingPuzzleAStar solves sliding puzzle using A*
func slidingPuzzleAStar(board [][]int) int {
	goal := "123450"

	var sb strings.Builder
	for _, row := range board {
		for _, tile := range row {
			sb.WriteByte(byte('0' + tile))
		}
	}
	start := sb.String()

	if start == goal {
		return 0
	}

	// Goal positions for each tile
	goalPos := map[byte][2]int{
		'1': {0, 0}, '2': {0, 1}, '3': {0, 2},
		'4': {1, 0}, '5': {1, 1}, '0': {1, 2},
	}

	// Manhattan distance heuristic
	heuristic := func(state string) int {
		total := 0
		for i := 0; i < len(state); i++ {
			tile := state[i]
			if tile != '0' {
				currentRow, currentCol := i/3, i%3
				goalRow, goalCol := goalPos[tile][0], goalPos[tile][1]
				dr := currentRow - goalRow
				dc := currentCol - goalCol
				if dr < 0 {
					dr = -dr
				}
				if dc < 0 {
					dc = -dc
				}
				total += dr + dc
			}
		}
		return total
	}

	neighbors := map[int][]int{
		0: {1, 3}, 1: {0, 2, 4}, 2: {1, 5},
		3: {0, 4}, 4: {1, 3, 5}, 5: {2, 4},
	}

	pq := &AStarPQ{}
	heap.Init(pq)
	heap.Push(pq, &AStarItem{FScore: heuristic(start), Moves: 0, State: start})

	gScores := map[string]int{start: 0}

	for pq.Len() > 0 {
		item := heap.Pop(pq).(*AStarItem)

		if item.State == goal {
			return item.Moves
		}

		if existing, ok := gScores[item.State]; ok && item.Moves > existing {
			continue
		}

		zeroIdx := strings.Index(item.State, "0")

		for _, neighborIdx := range neighbors[zeroIdx] {
			stateBytes := []byte(item.State)
			stateBytes[zeroIdx], stateBytes[neighborIdx] = stateBytes[neighborIdx], stateBytes[zeroIdx]
			newState := string(stateBytes)
			newMoves := item.Moves + 1

			if existing, ok := gScores[newState]; !ok || newMoves < existing {
				gScores[newState] = newMoves
				f := newMoves + heuristic(newState)
				heap.Push(pq, &AStarItem{FScore: f, Moves: newMoves, State: newState})
			}
		}
	}

	return -1
}

func main() {
	// Test 1: One move
	board1 := [][]int{{1, 2, 3}, {4, 0, 5}}
	result1 := slidingPuzzleBFS(board1)
	fmt.Printf("Test 1 (BFS): %d\n", result1)
	if result1 != 1 {
		fmt.Printf("FAIL: Expected 1, got %d\n", result1)
	}

	result1AStar := slidingPuzzleAStar(board1)
	fmt.Printf("Test 1 (A*): %d\n", result1AStar)
	if result1AStar != 1 {
		fmt.Printf("FAIL: Expected 1, got %d\n", result1AStar)
	}

	// Test 2: Impossible
	board2 := [][]int{{1, 2, 3}, {5, 4, 0}}
	result2 := slidingPuzzleBFS(board2)
	fmt.Printf("Test 2 (BFS): %d\n", result2)
	if result2 != -1 {
		fmt.Printf("FAIL: Expected -1, got %d\n", result2)
	}

	// Test 3: Multiple moves
	board3 := [][]int{{4, 1, 2}, {5, 0, 3}}
	result3 := slidingPuzzleBFS(board3)
	fmt.Printf("Test 3 (BFS): %d\n", result3)
	if result3 != 5 {
		fmt.Printf("FAIL: Expected 5, got %d\n", result3)
	}

	result3AStar := slidingPuzzleAStar(board3)
	fmt.Printf("Test 3 (A*): %d\n", result3AStar)
	if result3AStar != 5 {
		fmt.Printf("FAIL: Expected 5, got %d\n", result3AStar)
	}

	// Test 4: Already solved
	board4 := [][]int{{1, 2, 3}, {4, 5, 0}}
	result4 := slidingPuzzleBFS(board4)
	fmt.Printf("Test 4 (BFS): %d\n", result4)
	if result4 != 0 {
		fmt.Printf("FAIL: Expected 0, got %d\n", result4)
	}

	fmt.Println("\nAll tests passed!")
}
