/*
Cheapest Flights Within K Stops
Combines: Graph Traversal + Dynamic Programming (Bellman-Ford)
*/

package main

import (
	"container/heap"
	"fmt"
	"math"
)

const INF = math.MaxInt32

// Approach 1: Modified Bellman-Ford (DP)
func findCheapestPriceBellmanFord(n int, flights [][]int, src int, dst int, k int) int {
	prices := make([]int, n)
	for i := range prices {
		prices[i] = INF
	}
	prices[src] = 0

	// k+1 relaxation rounds (k stops = k+1 edges)
	for i := 0; i <= k; i++ {
		temp := make([]int, n)
		copy(temp, prices)

		for _, flight := range flights {
			u, v, cost := flight[0], flight[1], flight[2]
			if prices[u] != INF && prices[u]+cost < temp[v] {
				temp[v] = prices[u] + cost
			}
		}
		prices = temp
	}

	if prices[dst] == INF {
		return -1
	}
	return prices[dst]
}

// Approach 2: BFS with level-by-level processing
func findCheapestPriceBFS(n int, flights [][]int, src int, dst int, k int) int {
	// Build adjacency list
	graph := make(map[int][][2]int)
	for _, flight := range flights {
		u, v, cost := flight[0], flight[1], flight[2]
		graph[u] = append(graph[u], [2]int{v, cost})
	}

	// Distance array
	dist := make([]int, n)
	for i := range dist {
		dist[i] = INF
	}
	dist[src] = 0

	// BFS queue: [node, cost]
	queue := [][2]int{{src, 0}}
	stops := 0

	for len(queue) > 0 && stops <= k {
		levelSize := len(queue)

		for i := 0; i < levelSize; i++ {
			node, cost := queue[0][0], queue[0][1]
			queue = queue[1:]

			for _, edge := range graph[node] {
				neighbor, price := edge[0], edge[1]
				newCost := cost + price

				if newCost < dist[neighbor] {
					dist[neighbor] = newCost
					queue = append(queue, [2]int{neighbor, newCost})
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

// Priority Queue for Dijkstra
type State struct {
	cost, node, stops int
}

type PriorityQueue []State

func (pq PriorityQueue) Len() int           { return len(pq) }
func (pq PriorityQueue) Less(i, j int) bool { return pq[i].cost < pq[j].cost }
func (pq PriorityQueue) Swap(i, j int)      { pq[i], pq[j] = pq[j], pq[i] }

func (pq *PriorityQueue) Push(x interface{}) {
	*pq = append(*pq, x.(State))
}

func (pq *PriorityQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	x := old[n-1]
	*pq = old[0 : n-1]
	return x
}

// Approach 3: Modified Dijkstra with state
func findCheapestPriceDijkstra(n int, flights [][]int, src int, dst int, k int) int {
	// Build adjacency list
	graph := make(map[int][][2]int)
	for _, flight := range flights {
		u, v, cost := flight[0], flight[1], flight[2]
		graph[u] = append(graph[u], [2]int{v, cost})
	}

	// Minimum stops to reach each node
	minStops := make([]int, n)
	for i := range minStops {
		minStops[i] = INF
	}

	// Priority queue
	pq := &PriorityQueue{{0, src, 0}}
	heap.Init(pq)

	for pq.Len() > 0 {
		state := heap.Pop(pq).(State)
		cost, node, stops := state.cost, state.node, state.stops

		if node == dst {
			return cost
		}

		if stops > minStops[node] || stops > k {
			continue
		}
		minStops[node] = stops

		for _, edge := range graph[node] {
			neighbor, price := edge[0], edge[1]
			heap.Push(pq, State{cost + price, neighbor, stops + 1})
		}
	}

	return -1
}

// Approach 4: 2D DP
func findCheapestPriceDP2D(n int, flights [][]int, src int, dst int, k int) int {
	// dp[flights_used][node] = minimum cost
	dp := make([][]int, k+2)
	for i := range dp {
		dp[i] = make([]int, n)
		for j := range dp[i] {
			dp[i][j] = INF
		}
	}
	dp[0][src] = 0

	for flightsUsed := 1; flightsUsed <= k+1; flightsUsed++ {
		// Carry forward
		for node := 0; node < n; node++ {
			dp[flightsUsed][node] = dp[flightsUsed-1][node]
		}

		// Try each flight
		for _, flight := range flights {
			u, v, cost := flight[0], flight[1], flight[2]
			if dp[flightsUsed-1][u] != INF {
				newCost := dp[flightsUsed-1][u] + cost
				if newCost < dp[flightsUsed][v] {
					dp[flightsUsed][v] = newCost
				}
			}
		}
	}

	if dp[k+1][dst] == INF {
		return -1
	}
	return dp[k+1][dst]
}

func main() {
	testCases := []struct {
		n        int
		flights  [][]int
		src, dst int
		k        int
		expected int
	}{
		{4, [][]int{{0, 1, 100}, {1, 2, 100}, {2, 0, 100}, {1, 3, 600}, {2, 3, 200}}, 0, 3, 1, 700},
		{3, [][]int{{0, 1, 100}, {1, 2, 100}, {0, 2, 500}}, 0, 2, 1, 200},
		{3, [][]int{{0, 1, 100}, {1, 2, 100}, {0, 2, 500}}, 0, 2, 0, 500},
		{5, [][]int{{0, 1, 5}, {1, 2, 5}, {0, 3, 2}, {3, 1, 2}, {1, 4, 1}, {4, 2, 1}}, 0, 2, 2, 7},
		{4, [][]int{{0, 1, 1}, {0, 2, 5}, {1, 2, 1}, {2, 3, 1}}, 0, 3, 1, 6},
		{3, [][]int{{0, 1, 100}, {1, 2, 100}}, 0, 2, 0, -1},
	}

	fmt.Println("Cheapest Flights Within K Stops")
	fmt.Println("============================================================")

	for i, tc := range testCases {
		fmt.Printf("\nTest %d: n=%d, src=%d, dst=%d, k=%d\n", i+1, tc.n, tc.src, tc.dst, tc.k)

		result1 := findCheapestPriceBellmanFord(tc.n, tc.flights, tc.src, tc.dst, tc.k)
		result2 := findCheapestPriceBFS(tc.n, tc.flights, tc.src, tc.dst, tc.k)
		result3 := findCheapestPriceDijkstra(tc.n, tc.flights, tc.src, tc.dst, tc.k)
		result4 := findCheapestPriceDP2D(tc.n, tc.flights, tc.src, tc.dst, tc.k)

		status := func(r, e int) string {
			if r == e {
				return "PASS"
			}
			return "FAIL"
		}

		fmt.Printf("  Bellman-Ford: %d [%s]\n", result1, status(result1, tc.expected))
		fmt.Printf("  BFS:          %d [%s]\n", result2, status(result2, tc.expected))
		fmt.Printf("  Dijkstra:     %d [%s]\n", result3, status(result3, tc.expected))
		fmt.Printf("  2D DP:        %d [%s]\n", result4, status(result4, tc.expected))
	}
}
