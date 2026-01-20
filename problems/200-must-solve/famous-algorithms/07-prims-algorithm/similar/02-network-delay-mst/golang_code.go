/*
Network Delay via MST - Go Solution

Time Complexity: O(E log V) for MST + O(V) for BFS
Space Complexity: O(V + E)
*/

package main

import (
	"container/heap"
	"fmt"
)

type Item struct {
	weight, vertex, parent int
}

type PQ []Item

func (pq PQ) Len() int            { return len(pq) }
func (pq PQ) Less(i, j int) bool  { return pq[i].weight < pq[j].weight }
func (pq PQ) Swap(i, j int)       { pq[i], pq[j] = pq[j], pq[i] }
func (pq *PQ) Push(x interface{}) { *pq = append(*pq, x.(Item)) }
func (pq *PQ) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	*pq = old[0 : n-1]
	return item
}

func networkDelayMST(n int, connections [][]int) (int, int) {
	// Build adjacency list
	graph := make([][]struct{ v, w int }, n)
	for i := range graph {
		graph[i] = []struct{ v, w int }{}
	}
	for _, conn := range connections {
		u, v, w := conn[0], conn[1], conn[2]
		graph[u] = append(graph[u], struct{ v, w int }{v, w})
		graph[v] = append(graph[v], struct{ v, w int }{u, w})
	}

	// Prim's algorithm
	inMST := make([]bool, n)
	mstAdj := make([][]int, n)
	for i := range mstAdj {
		mstAdj[i] = []int{}
	}
	totalWeight := 0

	pq := &PQ{{0, 0, -1}}
	heap.Init(pq)

	for pq.Len() > 0 {
		item := heap.Pop(pq).(Item)
		if inMST[item.vertex] {
			continue
		}

		inMST[item.vertex] = true
		totalWeight += item.weight

		if item.parent != -1 {
			mstAdj[item.parent] = append(mstAdj[item.parent], item.vertex)
			mstAdj[item.vertex] = append(mstAdj[item.vertex], item.parent)
		}

		for _, neighbor := range graph[item.vertex] {
			if !inMST[neighbor.v] {
				heap.Push(pq, Item{neighbor.w, neighbor.v, item.vertex})
			}
		}
	}

	// BFS for max depth
	depth := make([]int, n)
	for i := range depth {
		depth[i] = -1
	}
	depth[0] = 0
	queue := []int{0}
	maxDepth := 0

	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		for _, neighbor := range mstAdj[node] {
			if depth[neighbor] == -1 {
				depth[neighbor] = depth[node] + 1
				if depth[neighbor] > maxDepth {
					maxDepth = depth[neighbor]
				}
				queue = append(queue, neighbor)
			}
		}
	}

	return totalWeight, maxDepth
}

func main() {
	w1, d1 := networkDelayMST(4, [][]int{{0, 1, 1}, {0, 2, 2}, {1, 2, 3}, {1, 3, 4}, {2, 3, 5}})
	fmt.Printf("Test 1: MST weight = %d, Max depth = %d\n", w1, d1)

	w2, d2 := networkDelayMST(3, [][]int{{0, 1, 1}, {1, 2, 1}})
	fmt.Printf("Test 2: MST weight = %d, Max depth = %d\n", w2, d2)

	fmt.Println("\nAll tests completed!")
}
