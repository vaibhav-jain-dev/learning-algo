/*
Dijkstra's Algorithm - Single Source Shortest Path - Go Solution

Find shortest paths from source to all vertices in a weighted graph.

Time Complexity: O((V + E) log V) with binary heap
Space Complexity: O(V + E)
*/

package main

import (
	"container/heap"
	"fmt"
	"math"
)

// Edge represents a weighted edge
type Edge struct {
	To     int
	Weight int
}

// Item represents an item in the priority queue
type Item struct {
	Vertex   int
	Distance int
	Index    int
}

// PriorityQueue implements heap.Interface
type PriorityQueue []*Item

func (pq PriorityQueue) Len() int { return len(pq) }

func (pq PriorityQueue) Less(i, j int) bool {
	return pq[i].Distance < pq[j].Distance
}

func (pq PriorityQueue) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].Index = i
	pq[j].Index = j
}

func (pq *PriorityQueue) Push(x interface{}) {
	n := len(*pq)
	item := x.(*Item)
	item.Index = n
	*pq = append(*pq, item)
}

func (pq *PriorityQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	old[n-1] = nil
	item.Index = -1
	*pq = old[0 : n-1]
	return item
}

// dijkstra finds shortest paths from source to all vertices
func dijkstra(n int, edges [][3]int, source int) []int {
	// Build adjacency list
	graph := make([][]Edge, n)
	for i := range graph {
		graph[i] = []Edge{}
	}
	for _, e := range edges {
		graph[e[0]] = append(graph[e[0]], Edge{e[1], e[2]})
	}

	// Initialize distances
	INF := math.MaxInt32
	dist := make([]int, n)
	for i := range dist {
		dist[i] = INF
	}
	dist[source] = 0

	// Priority queue
	pq := &PriorityQueue{}
	heap.Init(pq)
	heap.Push(pq, &Item{Vertex: source, Distance: 0})

	for pq.Len() > 0 {
		item := heap.Pop(pq).(*Item)
		u := item.Vertex
		d := item.Distance

		// Skip if we've already found a better path
		if d > dist[u] {
			continue
		}

		// Relax all neighbors
		for _, edge := range graph[u] {
			v := edge.To
			newDist := dist[u] + edge.Weight
			if newDist < dist[v] {
				dist[v] = newDist
				heap.Push(pq, &Item{Vertex: v, Distance: newDist})
			}
		}
	}

	return dist
}

// PathResult holds distance and path
type PathResult struct {
	Distance int
	Path     []int
}

// dijkstraWithPath finds shortest path with reconstruction
func dijkstraWithPath(n int, edges [][3]int, source, target int) PathResult {
	// Build adjacency list
	graph := make([][]Edge, n)
	for i := range graph {
		graph[i] = []Edge{}
	}
	for _, e := range edges {
		graph[e[0]] = append(graph[e[0]], Edge{e[1], e[2]})
	}

	INF := math.MaxInt32
	dist := make([]int, n)
	prev := make([]int, n)
	for i := range dist {
		dist[i] = INF
		prev[i] = -1
	}
	dist[source] = 0

	pq := &PriorityQueue{}
	heap.Init(pq)
	heap.Push(pq, &Item{Vertex: source, Distance: 0})

	for pq.Len() > 0 {
		item := heap.Pop(pq).(*Item)
		u := item.Vertex
		d := item.Distance

		if d > dist[u] {
			continue
		}

		if u == target {
			break
		}

		for _, edge := range graph[u] {
			v := edge.To
			newDist := dist[u] + edge.Weight
			if newDist < dist[v] {
				dist[v] = newDist
				prev[v] = u
				heap.Push(pq, &Item{Vertex: v, Distance: newDist})
			}
		}
	}

	// Reconstruct path
	if dist[target] == INF {
		return PathResult{-1, []int{}}
	}

	path := []int{}
	current := target
	for current != -1 {
		path = append([]int{current}, path...)
		current = prev[current]
	}

	return PathResult{dist[target], path}
}

func main() {
	// Test 1: Basic directed graph
	edges1 := [][3]int{{0, 1, 4}, {0, 2, 1}, {1, 3, 1}, {2, 1, 2}, {2, 3, 5}, {3, 4, 3}}
	result1 := dijkstra(5, edges1, 0)
	fmt.Printf("Test 1: %v\n", result1)

	// Test 2: With path reconstruction
	res2 := dijkstraWithPath(5, edges1, 0, 4)
	fmt.Printf("Test 2: Distance=%d, Path=%v\n", res2.Distance, res2.Path)

	// Test 3: Unreachable vertex
	edges3 := [][3]int{{0, 1, 1}, {1, 2, 1}}
	result3 := dijkstra(4, edges3, 0)
	fmt.Printf("Test 3: %v\n", result3)

	// Test 4: Single vertex
	result4 := dijkstra(1, [][3]int{}, 0)
	fmt.Printf("Test 4: %v\n", result4)

	fmt.Println("\nAll tests completed!")
}
