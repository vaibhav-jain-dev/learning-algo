/*
Network Delay Time - Go Solution

Time Complexity: O((V + E) log V)
Space Complexity: O(V + E)
*/

package main

import (
	"container/heap"
	"fmt"
	"math"
)

type Item struct {
	node int
	dist int
}

type MinHeap []Item

func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i].dist < h[j].dist }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x interface{}) { *h = append(*h, x.(Item)) }
func (h *MinHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

func networkDelayTime(times [][]int, n int, k int) int {
	// Build adjacency list
	graph := make(map[int][][2]int)
	for _, t := range times {
		graph[t[0]] = append(graph[t[0]], [2]int{t[1], t[2]})
	}

	// Dijkstra's algorithm
	dist := make(map[int]int)
	dist[k] = 0

	pq := &MinHeap{{k, 0}}
	heap.Init(pq)

	for pq.Len() > 0 {
		item := heap.Pop(pq).(Item)
		u, d := item.node, item.dist

		if existingDist, ok := dist[u]; ok && d > existingDist {
			continue
		}

		for _, edge := range graph[u] {
			v, w := edge[0], edge[1]
			newDist := dist[u] + w
			if existingDist, ok := dist[v]; !ok || newDist < existingDist {
				dist[v] = newDist
				heap.Push(pq, Item{v, newDist})
			}
		}
	}

	if len(dist) != n {
		return -1
	}

	maxDist := 0
	for _, d := range dist {
		if d > maxDist {
			maxDist = d
		}
	}
	return maxDist
}

func main() {
	fmt.Printf("Test 1: %d\n", networkDelayTime([][]int{{2,1,1},{2,3,1},{3,4,1}}, 4, 2)) // Expected: 2
	fmt.Printf("Test 2: %d\n", networkDelayTime([][]int{{1,2,1}}, 2, 1)) // Expected: 1
	fmt.Printf("Test 3: %d\n", networkDelayTime([][]int{{1,2,1}}, 2, 2)) // Expected: -1
	fmt.Println("\nAll tests completed!")
}
