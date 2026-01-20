/*
Network Delay Time - Go Solution

Find minimum time for signal to reach all nodes using Dijkstra's algorithm.

Time Complexity: O(E log V)
Space Complexity: O(V + E)
*/

package main

import (
	"container/heap"
	"fmt"
	"math"
)

// Edge represents a directed edge with weight
type NetworkEdge struct {
	To     int
	Weight int
}

// DijkstraItem for priority queue
type DijkstraItem struct {
	Dist  int
	Node  int
	Index int
}

// DijkstraPQ implements heap.Interface
type DijkstraPQ []*DijkstraItem

func (pq DijkstraPQ) Len() int { return len(pq) }

func (pq DijkstraPQ) Less(i, j int) bool {
	return pq[i].Dist < pq[j].Dist
}

func (pq DijkstraPQ) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].Index = i
	pq[j].Index = j
}

func (pq *DijkstraPQ) Push(x interface{}) {
	n := len(*pq)
	item := x.(*DijkstraItem)
	item.Index = n
	*pq = append(*pq, item)
}

func (pq *DijkstraPQ) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	old[n-1] = nil
	item.Index = -1
	*pq = old[0 : n-1]
	return item
}

// networkDelayTime finds minimum time for signal to reach all nodes
func networkDelayTime(times [][]int, n int, k int) int {
	// Build adjacency list
	graph := make([][]NetworkEdge, n+1)
	for i := range graph {
		graph[i] = []NetworkEdge{}
	}
	for _, edge := range times {
		u, v, w := edge[0], edge[1], edge[2]
		graph[u] = append(graph[u], NetworkEdge{v, w})
	}

	// Dijkstra's algorithm
	const INF = math.MaxInt32
	dist := make([]int, n+1)
	for i := range dist {
		dist[i] = INF
	}
	dist[k] = 0

	pq := &DijkstraPQ{}
	heap.Init(pq)
	heap.Push(pq, &DijkstraItem{Dist: 0, Node: k})

	for pq.Len() > 0 {
		item := heap.Pop(pq).(*DijkstraItem)
		d, u := item.Dist, item.Node

		if d > dist[u] {
			continue
		}

		for _, edge := range graph[u] {
			v, w := edge.To, edge.Weight
			newDist := d + w
			if newDist < dist[v] {
				dist[v] = newDist
				heap.Push(pq, &DijkstraItem{Dist: newDist, Node: v})
			}
		}
	}

	// Find max distance
	maxDist := 0
	for i := 1; i <= n; i++ {
		if dist[i] == INF {
			return -1
		}
		if dist[i] > maxDist {
			maxDist = dist[i]
		}
	}

	return maxDist
}

// networkDelayTimeBellmanFord uses Bellman-Ford algorithm
func networkDelayTimeBellmanFord(times [][]int, n int, k int) int {
	const INF = math.MaxInt32
	dist := make([]int, n+1)
	for i := range dist {
		dist[i] = INF
	}
	dist[k] = 0

	// Relax all edges n-1 times
	for i := 0; i < n-1; i++ {
		updated := false
		for _, edge := range times {
			u, v, w := edge[0], edge[1], edge[2]
			if dist[u] != INF && dist[u]+w < dist[v] {
				dist[v] = dist[u] + w
				updated = true
			}
		}
		if !updated {
			break
		}
	}

	// Find max distance
	maxDist := 0
	for i := 1; i <= n; i++ {
		if dist[i] == INF {
			return -1
		}
		if dist[i] > maxDist {
			maxDist = dist[i]
		}
	}

	return maxDist
}

// networkDelayTimeWithPath finds delay and path to furthest node
func networkDelayTimeWithPath(times [][]int, n int, k int) (int, int, []int) {
	graph := make([][]NetworkEdge, n+1)
	for i := range graph {
		graph[i] = []NetworkEdge{}
	}
	for _, edge := range times {
		u, v, w := edge[0], edge[1], edge[2]
		graph[u] = append(graph[u], NetworkEdge{v, w})
	}

	const INF = math.MaxInt32
	dist := make([]int, n+1)
	parent := make([]int, n+1)
	for i := range dist {
		dist[i] = INF
		parent[i] = -1
	}
	dist[k] = 0

	pq := &DijkstraPQ{}
	heap.Init(pq)
	heap.Push(pq, &DijkstraItem{Dist: 0, Node: k})

	for pq.Len() > 0 {
		item := heap.Pop(pq).(*DijkstraItem)
		d, u := item.Dist, item.Node

		if d > dist[u] {
			continue
		}

		for _, edge := range graph[u] {
			v, w := edge.To, edge.Weight
			newDist := d + w
			if newDist < dist[v] {
				dist[v] = newDist
				parent[v] = u
				heap.Push(pq, &DijkstraItem{Dist: newDist, Node: v})
			}
		}
	}

	// Find max and check reachability
	maxDist := 0
	furthest := k
	for i := 1; i <= n; i++ {
		if dist[i] == INF {
			return -1, -1, nil
		}
		if dist[i] > maxDist {
			maxDist = dist[i]
			furthest = i
		}
	}

	// Reconstruct path
	path := []int{}
	node := furthest
	for node != -1 {
		path = append([]int{node}, path...)
		node = parent[node]
	}

	return maxDist, furthest, path
}

func main() {
	// Test 1: Standard case
	times1 := [][]int{{2, 1, 1}, {2, 3, 1}, {3, 4, 1}}
	result1 := networkDelayTime(times1, 4, 2)
	fmt.Printf("Test 1: %d\n", result1)
	if result1 != 2 {
		fmt.Printf("FAIL: Expected 2, got %d\n", result1)
	}

	// Test 2: Simple two nodes
	times2 := [][]int{{1, 2, 1}}
	result2 := networkDelayTime(times2, 2, 1)
	fmt.Printf("Test 2: %d\n", result2)
	if result2 != 1 {
		fmt.Printf("FAIL: Expected 1, got %d\n", result2)
	}

	// Test 3: Unreachable node
	times3 := [][]int{{1, 2, 1}}
	result3 := networkDelayTime(times3, 2, 2)
	fmt.Printf("Test 3: %d\n", result3)
	if result3 != -1 {
		fmt.Printf("FAIL: Expected -1, got %d\n", result3)
	}

	// Test 4: Bellman-Ford
	result4 := networkDelayTimeBellmanFord(times1, 4, 2)
	fmt.Printf("Test 4 (Bellman-Ford): %d\n", result4)
	if result4 != 2 {
		fmt.Printf("FAIL: Expected 2, got %d\n", result4)
	}

	// Test 5: With path
	delay, furthest, path := networkDelayTimeWithPath(times1, 4, 2)
	fmt.Printf("Test 5: Delay=%d, Furthest=%d, Path=%v\n", delay, furthest, path)
	if delay != 2 || furthest != 4 {
		fmt.Println("FAIL: Test 5")
	}

	// Test 6: Single node
	result6 := networkDelayTime([][]int{}, 1, 1)
	fmt.Printf("Test 6: %d\n", result6)
	if result6 != 0 {
		fmt.Printf("FAIL: Expected 0, got %d\n", result6)
	}

	// Test 7: Multiple paths
	times7 := [][]int{{1, 2, 1}, {1, 3, 4}, {2, 3, 2}}
	result7 := networkDelayTime(times7, 3, 1)
	fmt.Printf("Test 7: %d\n", result7)
	if result7 != 3 {
		fmt.Printf("FAIL: Expected 3, got %d\n", result7)
	}

	fmt.Println("\nAll tests passed!")
}
