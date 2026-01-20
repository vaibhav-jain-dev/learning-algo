/*
Cheapest Flights Within K Stops - Go Solution

Time Complexity: O(E * K)
Space Complexity: O(N * K)
*/

package main

import (
	"container/heap"
	"fmt"
	"math"
)

type State struct {
	cost  int
	node  int
	stops int
}

type StateHeap []State

func (h StateHeap) Len() int           { return len(h) }
func (h StateHeap) Less(i, j int) bool { return h[i].cost < h[j].cost }
func (h StateHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *StateHeap) Push(x interface{}) { *h = append(*h, x.(State)) }
func (h *StateHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

func findCheapestPrice(n int, flights [][]int, src int, dst int, k int) int {
	// Build adjacency list
	graph := make(map[int][][2]int)
	for _, f := range flights {
		graph[f[0]] = append(graph[f[0]], [2]int{f[1], f[2]})
	}

	// Priority queue
	pq := &StateHeap{{0, src, k + 1}}
	heap.Init(pq)

	visited := make(map[int]int) // node -> min stops remaining

	for pq.Len() > 0 {
		state := heap.Pop(pq).(State)
		cost, node, stops := state.cost, state.node, state.stops

		if node == dst {
			return cost
		}

		if stops <= 0 {
			continue
		}

		if prevStops, ok := visited[node]; ok && prevStops >= stops {
			continue
		}
		visited[node] = stops

		for _, edge := range graph[node] {
			neighbor, price := edge[0], edge[1]
			heap.Push(pq, State{cost + price, neighbor, stops - 1})
		}
	}

	return -1
}

func main() {
	flights := [][]int{{0,1,100},{1,2,100},{2,0,100},{1,3,600},{2,3,200}}
	fmt.Printf("Test 1: %d\n", findCheapestPrice(4, flights, 0, 3, 1)) // Expected: 700
	fmt.Printf("Test 2: %d\n", findCheapestPrice(4, flights, 0, 3, 2)) // Expected: 400
	fmt.Println("\nAll tests completed!")
}
