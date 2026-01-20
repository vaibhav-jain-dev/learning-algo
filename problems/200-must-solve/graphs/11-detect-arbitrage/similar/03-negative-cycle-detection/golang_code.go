/*
Negative Cycle Detection - Go Solution

Detect negative weight cycles using Bellman-Ford algorithm.

Time Complexity: O(V * E)
Space Complexity: O(V)
*/

package main

import (
	"fmt"
	"math"
)

// hasNegativeCycle detects if graph contains a negative cycle
func hasNegativeCycle(n int, edges [][]int) bool {
	// Initialize all distances to 0 to detect cycles from any node
	dist := make([]int, n)

	// Relax all edges n-1 times
	for i := 0; i < n-1; i++ {
		for _, edge := range edges {
			u, v, w := edge[0], edge[1], edge[2]
			if dist[u]+w < dist[v] {
				dist[v] = dist[u] + w
			}
		}
	}

	// Check for negative cycle
	for _, edge := range edges {
		u, v, w := edge[0], edge[1], edge[2]
		if dist[u]+w < dist[v] {
			return true
		}
	}

	return false
}

// hasNegativeCycleFromSource detects negative cycle reachable from source
func hasNegativeCycleFromSource(n int, edges [][]int, src int) bool {
	const INF = math.MaxInt32
	dist := make([]int, n)
	for i := range dist {
		dist[i] = INF
	}
	dist[src] = 0

	// Relax n-1 times
	for i := 0; i < n-1; i++ {
		for _, edge := range edges {
			u, v, w := edge[0], edge[1], edge[2]
			if dist[u] != INF && dist[u]+w < dist[v] {
				dist[v] = dist[u] + w
			}
		}
	}

	// Check for negative cycle
	for _, edge := range edges {
		u, v, w := edge[0], edge[1], edge[2]
		if dist[u] != INF && dist[u]+w < dist[v] {
			return true
		}
	}

	return false
}

// findNegativeCycle finds and returns nodes in a negative cycle
func findNegativeCycle(n int, edges [][]int) []int {
	dist := make([]int, n)
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}

	// Relax all edges n times
	x := -1
	for i := 0; i < n; i++ {
		x = -1
		for _, edge := range edges {
			u, v, w := edge[0], edge[1], edge[2]
			if dist[u]+w < dist[v] {
				dist[v] = dist[u] + w
				parent[v] = u
				x = v
			}
		}
	}

	if x == -1 {
		return nil
	}

	// Go back n times to ensure we're in the cycle
	for i := 0; i < n; i++ {
		x = parent[x]
	}

	// Collect cycle nodes
	cycle := []int{x}
	current := parent[x]
	for current != x {
		cycle = append(cycle, current)
		current = parent[current]
	}
	cycle = append(cycle, x)

	// Reverse
	for i, j := 0, len(cycle)-1; i < j; i, j = i+1, j-1 {
		cycle[i], cycle[j] = cycle[j], cycle[i]
	}

	return cycle
}

// detectArbitrage detects arbitrage opportunity in exchange rates
func detectArbitrage(exchangeRates [][]float64) bool {
	n := len(exchangeRates)

	// Convert to negative log edges
	type FloatEdge struct {
		From, To int
		Weight   float64
	}

	var edges []FloatEdge
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if i != j && exchangeRates[i][j] > 0 {
				weight := -math.Log(exchangeRates[i][j])
				edges = append(edges, FloatEdge{i, j, weight})
			}
		}
	}

	// Bellman-Ford with float
	dist := make([]float64, n)

	for i := 0; i < n-1; i++ {
		for _, edge := range edges {
			if dist[edge.From]+edge.Weight < dist[edge.To] {
				dist[edge.To] = dist[edge.From] + edge.Weight
			}
		}
	}

	// Check for negative cycle
	for _, edge := range edges {
		if dist[edge.From]+edge.Weight < dist[edge.To] {
			return true
		}
	}

	return false
}

func main() {
	// Test 1: Has negative cycle
	edges1 := [][]int{{0, 1, 1}, {1, 2, 2}, {2, 3, -5}, {3, 1, 1}}
	result1 := hasNegativeCycle(4, edges1)
	fmt.Printf("Test 1: %v\n", result1)
	if result1 != true {
		fmt.Println("FAIL: Expected true")
	}

	// Test 2: No negative cycle
	edges2 := [][]int{{0, 1, 1}, {1, 2, 2}, {2, 0, 3}}
	result2 := hasNegativeCycle(3, edges2)
	fmt.Printf("Test 2: %v\n", result2)
	if result2 != false {
		fmt.Println("FAIL: Expected false")
	}

	// Test 3: Simple negative cycle
	edges3 := [][]int{{0, 1, -1}, {1, 0, -1}}
	result3 := hasNegativeCycle(2, edges3)
	fmt.Printf("Test 3: %v\n", result3)
	if result3 != true {
		fmt.Println("FAIL: Expected true")
	}

	// Test 4: From specific source
	result4 := hasNegativeCycleFromSource(4, edges1, 0)
	fmt.Printf("Test 4 (from source): %v\n", result4)
	if result4 != true {
		fmt.Println("FAIL: Expected true")
	}

	// Test 5: Find actual cycle
	cycle := findNegativeCycle(4, edges1)
	fmt.Printf("Test 5: Cycle found = %v\n", cycle)
	if cycle == nil {
		fmt.Println("FAIL: Expected cycle")
	}

	// Test 6: No cycle
	cycle6 := findNegativeCycle(3, edges2)
	fmt.Printf("Test 6: Cycle found = %v\n", cycle6)
	if cycle6 != nil {
		fmt.Println("FAIL: Expected nil")
	}

	// Test 7: Arbitrage detection
	rates := [][]float64{
		{1.0, 0.9, 0.75},
		{1.12, 1.0, 0.84},
		{1.35, 1.2, 1.0},
	}
	result7 := detectArbitrage(rates)
	fmt.Printf("Test 7 (Arbitrage): %v\n", result7)

	// Test 8: Empty graph
	result8 := hasNegativeCycle(3, [][]int{})
	fmt.Printf("Test 8 (Empty): %v\n", result8)
	if result8 != false {
		fmt.Println("FAIL: Expected false")
	}

	// Test 9: Single negative edge (no cycle)
	edges9 := [][]int{{0, 1, -5}}
	result9 := hasNegativeCycle(2, edges9)
	fmt.Printf("Test 9: %v\n", result9)
	if result9 != false {
		fmt.Println("FAIL: Expected false")
	}

	fmt.Println("\nAll tests passed!")
}
