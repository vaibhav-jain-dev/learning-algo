/*
Prim's Algorithm - Minimum Spanning Tree - Go Solution

Find the minimum spanning tree using Prim's algorithm (greedy vertex-based approach).

Time Complexity: O((V + E) log V)
Space Complexity: O(V + E)
*/

package main

import (
	"container/heap"
	"fmt"
)

// Edge represents a weighted edge
type Edge struct {
	U, V, Weight int
}

// Item for priority queue
type Item struct {
	weight int
	vertex int
	parent int
}

// PriorityQueue implements heap.Interface
type PriorityQueue []Item

func (pq PriorityQueue) Len() int            { return len(pq) }
func (pq PriorityQueue) Less(i, j int) bool  { return pq[i].weight < pq[j].weight }
func (pq PriorityQueue) Swap(i, j int)       { pq[i], pq[j] = pq[j], pq[i] }
func (pq *PriorityQueue) Push(x interface{}) { *pq = append(*pq, x.(Item)) }
func (pq *PriorityQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	*pq = old[0 : n-1]
	return item
}

// MSTResult holds the result
type MSTResult struct {
	Edges       []Edge
	TotalWeight int
}

// primMST finds minimum spanning tree using Prim's algorithm
func primMST(v int, edges []Edge) MSTResult {
	// Build adjacency list
	graph := make([][]struct{ v, w int }, v)
	for i := range graph {
		graph[i] = []struct{ v, w int }{}
	}
	for _, e := range edges {
		graph[e.U] = append(graph[e.U], struct{ v, w int }{e.V, e.Weight})
		graph[e.V] = append(graph[e.V], struct{ v, w int }{e.U, e.Weight})
	}

	inMST := make([]bool, v)
	mstEdges := []Edge{}
	totalWeight := 0

	pq := &PriorityQueue{{0, 0, -1}}
	heap.Init(pq)

	for pq.Len() > 0 && len(mstEdges) < v-1 {
		item := heap.Pop(pq).(Item)

		if inMST[item.vertex] {
			continue
		}

		inMST[item.vertex] = true

		if item.parent != -1 {
			mstEdges = append(mstEdges, Edge{item.parent, item.vertex, item.weight})
			totalWeight += item.weight
		}

		for _, neighbor := range graph[item.vertex] {
			if !inMST[neighbor.v] {
				heap.Push(pq, Item{neighbor.w, neighbor.v, item.vertex})
			}
		}
	}

	return MSTResult{mstEdges, totalWeight}
}

// primMSTDense uses O(V^2) approach for dense graphs
func primMSTDense(adjMatrix [][]int) int {
	v := len(adjMatrix)
	const INF = 1 << 30

	inMST := make([]bool, v)
	key := make([]int, v)
	for i := range key {
		key[i] = INF
	}
	key[0] = 0

	totalWeight := 0

	for i := 0; i < v; i++ {
		// Find minimum key vertex not in MST
		minKey := INF
		minVertex := -1
		for j := 0; j < v; j++ {
			if !inMST[j] && key[j] < minKey {
				minKey = key[j]
				minVertex = j
			}
		}

		if minVertex == -1 {
			break
		}

		inMST[minVertex] = true
		totalWeight += key[minVertex]

		// Update keys of adjacent vertices
		for j := 0; j < v; j++ {
			if adjMatrix[minVertex][j] > 0 && !inMST[j] && adjMatrix[minVertex][j] < key[j] {
				key[j] = adjMatrix[minVertex][j]
			}
		}
	}

	return totalWeight
}

func main() {
	// Test 1: Basic MST
	edges1 := []Edge{{0, 1, 2}, {0, 3, 6}, {1, 2, 3}, {1, 3, 8}, {1, 4, 5}, {2, 4, 7}, {3, 4, 9}}
	result1 := primMST(5, edges1)
	fmt.Printf("Test 1: MST edges = %v, Total weight = %d\n", result1.Edges, result1.TotalWeight)

	// Test 2: Simple triangle
	edges2 := []Edge{{0, 1, 1}, {1, 2, 2}, {0, 2, 3}}
	result2 := primMST(3, edges2)
	fmt.Printf("Test 2: MST edges = %v, Total weight = %d\n", result2.Edges, result2.TotalWeight)

	// Test 3: Linear graph
	edges3 := []Edge{{0, 1, 5}, {1, 2, 3}, {2, 3, 4}}
	result3 := primMST(4, edges3)
	fmt.Printf("Test 3: MST edges = %v, Total weight = %d\n", result3.Edges, result3.TotalWeight)

	// Test 4: Dense graph using adjacency matrix
	adjMatrix := [][]int{
		{0, 2, 0, 6, 0},
		{2, 0, 3, 8, 5},
		{0, 3, 0, 0, 7},
		{6, 8, 0, 0, 9},
		{0, 5, 7, 9, 0},
	}
	weight4 := primMSTDense(adjMatrix)
	fmt.Printf("Test 4: Dense graph MST weight = %d\n", weight4)

	// Test 5: Compare with Kruskal's result
	edges5 := []Edge{{0, 1, 10}, {0, 2, 6}, {0, 3, 5}, {1, 3, 15}, {2, 3, 4}}
	result5 := primMST(4, edges5)
	fmt.Printf("Test 5: MST weight = %d\n", result5.TotalWeight)

	fmt.Println("\nAll tests completed!")
}
