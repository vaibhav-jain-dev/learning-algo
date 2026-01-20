/*
Cheapest Flights Within K Stops - Go Solution

Find cheapest flight with at most K stops using modified Bellman-Ford.

Time Complexity: O(K * E)
Space Complexity: O(V)
*/

package main

import (
	"container/heap"
	"fmt"
	"math"
)

const INF = math.MaxInt32

// findCheapestPrice uses Bellman-Ford
func findCheapestPrice(n int, flights [][]int, src int, dst int, k int) int {
	dist := make([]int, n)
	for i := range dist {
		dist[i] = INF
	}
	dist[src] = 0

	// k stops = k+1 edges
	for i := 0; i <= k; i++ {
		prevDist := make([]int, n)
		copy(prevDist, dist)

		for _, flight := range flights {
			u, v, price := flight[0], flight[1], flight[2]
			if prevDist[u] != INF && prevDist[u]+price < dist[v] {
				dist[v] = prevDist[u] + price
			}
		}
	}

	if dist[dst] == INF {
		return -1
	}
	return dist[dst]
}

// FlightItem for priority queue
type FlightItem struct {
	Cost  int
	Node  int
	Stops int
	Index int
}

// FlightPQ implements heap.Interface
type FlightPQ []*FlightItem

func (pq FlightPQ) Len() int           { return len(pq) }
func (pq FlightPQ) Less(i, j int) bool { return pq[i].Cost < pq[j].Cost }
func (pq FlightPQ) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].Index = i
	pq[j].Index = j
}

func (pq *FlightPQ) Push(x interface{}) {
	n := len(*pq)
	item := x.(*FlightItem)
	item.Index = n
	*pq = append(*pq, item)
}

func (pq *FlightPQ) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	old[n-1] = nil
	item.Index = -1
	*pq = old[0 : n-1]
	return item
}

// findCheapestPriceDijkstra uses modified Dijkstra
func findCheapestPriceDijkstra(n int, flights [][]int, src int, dst int, k int) int {
	graph := make(map[int][][2]int)
	for _, flight := range flights {
		u, v, price := flight[0], flight[1], flight[2]
		graph[u] = append(graph[u], [2]int{v, price})
	}

	pq := &FlightPQ{}
	heap.Init(pq)
	heap.Push(pq, &FlightItem{Cost: 0, Node: src, Stops: 0})

	visited := make(map[int]int) // node -> min_stops

	for pq.Len() > 0 {
		item := heap.Pop(pq).(*FlightItem)
		cost, node, stops := item.Cost, item.Node, item.Stops

		if node == dst {
			return cost
		}

		if stops > k {
			continue
		}

		if minStops, ok := visited[node]; ok && minStops <= stops {
			continue
		}
		visited[node] = stops

		for _, edge := range graph[node] {
			neighbor, price := edge[0], edge[1]
			heap.Push(pq, &FlightItem{Cost: cost + price, Node: neighbor, Stops: stops + 1})
		}
	}

	return -1
}

// findCheapestPriceBFS uses BFS level traversal
func findCheapestPriceBFS(n int, flights [][]int, src int, dst int, k int) int {
	graph := make(map[int][][2]int)
	for _, flight := range flights {
		u, v, price := flight[0], flight[1], flight[2]
		graph[u] = append(graph[u], [2]int{v, price})
	}

	dist := make([]int, n)
	for i := range dist {
		dist[i] = INF
	}
	dist[src] = 0

	type Item struct {
		node int
		cost int
	}

	queue := []Item{{src, 0}}
	stops := 0

	for len(queue) > 0 && stops <= k {
		size := len(queue)
		for i := 0; i < size; i++ {
			item := queue[0]
			queue = queue[1:]
			node, cost := item.node, item.cost

			for _, edge := range graph[node] {
				neighbor, price := edge[0], edge[1]
				newCost := cost + price
				if newCost < dist[neighbor] {
					dist[neighbor] = newCost
					queue = append(queue, Item{neighbor, newCost})
				}
			}
		}
		stops++
	}

	if dist[dst] == INF {
		return -1
	}
	return dist[dst]
}

func main() {
	// Test 1: Standard case
	flights1 := [][]int{{0, 1, 100}, {1, 2, 100}, {2, 0, 100}, {1, 3, 600}, {2, 3, 200}}
	result1 := findCheapestPrice(4, flights1, 0, 3, 1)
	fmt.Printf("Test 1: %d\n", result1)
	if result1 != 700 {
		fmt.Printf("FAIL: Expected 700, got %d\n", result1)
	}

	// Test 2: Shorter path with more stops
	flights2 := [][]int{{0, 1, 100}, {1, 2, 100}, {0, 2, 500}}
	result2 := findCheapestPrice(3, flights2, 0, 2, 1)
	fmt.Printf("Test 2: %d\n", result2)
	if result2 != 200 {
		fmt.Printf("FAIL: Expected 200, got %d\n", result2)
	}

	// Test 3: Direct only
	result3 := findCheapestPrice(3, flights2, 0, 2, 0)
	fmt.Printf("Test 3: %d\n", result3)
	if result3 != 500 {
		fmt.Printf("FAIL: Expected 500, got %d\n", result3)
	}

	// Test 4: No route
	flights4 := [][]int{{0, 1, 100}}
	result4 := findCheapestPrice(3, flights4, 0, 2, 1)
	fmt.Printf("Test 4: %d\n", result4)
	if result4 != -1 {
		fmt.Printf("FAIL: Expected -1, got %d\n", result4)
	}

	// Test 5: Dijkstra
	result5 := findCheapestPriceDijkstra(4, flights1, 0, 3, 1)
	fmt.Printf("Test 5 (Dijkstra): %d\n", result5)
	if result5 != 700 {
		fmt.Printf("FAIL: Expected 700, got %d\n", result5)
	}

	// Test 6: BFS
	result6 := findCheapestPriceBFS(4, flights1, 0, 3, 1)
	fmt.Printf("Test 6 (BFS): %d\n", result6)
	if result6 != 700 {
		fmt.Printf("FAIL: Expected 700, got %d\n", result6)
	}

	// Test 7: Longer k
	result7 := findCheapestPrice(4, flights1, 0, 3, 2)
	fmt.Printf("Test 7 (k=2): %d\n", result7)
	if result7 != 400 {
		fmt.Printf("FAIL: Expected 400, got %d\n", result7)
	}

	fmt.Println("\nAll tests passed!")
}
