/*
Minimum Spanning Tree Verification - Go Solution

Time Complexity: O(E log V)
Space Complexity: O(V + E)
*/

package main

import (
	"container/heap"
	"fmt"
)

type PQ [][2]int

func (pq PQ) Len() int            { return len(pq) }
func (pq PQ) Less(i, j int) bool  { return pq[i][0] < pq[j][0] }
func (pq PQ) Swap(i, j int)       { pq[i], pq[j] = pq[j], pq[i] }
func (pq *PQ) Push(x interface{}) { *pq = append(*pq, x.([2]int)) }
func (pq *PQ) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	*pq = old[0 : n-1]
	return item
}

func verifyMST(n int, graphEdges [][]int, proposedEdges [][]int) bool {
	// Check edge count
	if len(proposedEdges) != n-1 {
		return false
	}

	// Check connectivity with Union-Find
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}

	var find func(x int) int
	find = func(x int) int {
		if parent[x] != x {
			parent[x] = find(parent[x])
		}
		return parent[x]
	}

	union := func(x, y int) {
		parent[find(x)] = find(y)
	}

	proposedWeight := 0
	for _, e := range proposedEdges {
		if find(e[0]) == find(e[1]) {
			return false // Cycle
		}
		union(e[0], e[1])
		proposedWeight += e[2]
	}

	// Check all connected
	root := find(0)
	for i := 0; i < n; i++ {
		if find(i) != root {
			return false
		}
	}

	// Compute actual MST weight
	graph := make([][]struct{ v, w int }, n)
	for _, e := range graphEdges {
		graph[e[0]] = append(graph[e[0]], struct{ v, w int }{e[1], e[2]})
		graph[e[1]] = append(graph[e[1]], struct{ v, w int }{e[0], e[2]})
	}

	inMST := make([]bool, n)
	mstWeight := 0
	pq := &PQ{{0, 0}}
	heap.Init(pq)

	for pq.Len() > 0 {
		item := heap.Pop(pq).([2]int)
		weight, vertex := item[0], item[1]
		if inMST[vertex] {
			continue
		}
		inMST[vertex] = true
		mstWeight += weight

		for _, neighbor := range graph[vertex] {
			if !inMST[neighbor.v] {
				heap.Push(pq, [2]int{neighbor.w, neighbor.v})
			}
		}
	}

	return proposedWeight == mstWeight
}

func main() {
	graph := [][]int{{0, 1, 1}, {0, 2, 2}, {1, 2, 3}, {1, 3, 4}, {2, 3, 5}}
	proposedValid := [][]int{{0, 1, 1}, {0, 2, 2}, {1, 3, 4}}
	proposedInvalid := [][]int{{0, 1, 1}, {1, 2, 3}, {1, 3, 4}}

	fmt.Printf("Test 1: %v\n", verifyMST(4, graph, proposedValid))   // Expected: true
	fmt.Printf("Test 2: %v\n", verifyMST(4, graph, proposedInvalid)) // Expected: false

	fmt.Println("\nAll tests completed!")
}
