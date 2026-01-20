/*
Detect Arbitrage - Go Solution

Detect if arbitrage opportunity exists in currency exchange rates.

Time Complexity: O(N^3) where N is the number of currencies
Space Complexity: O(N) for the distances array
*/

package main

import (
	"fmt"
	"math"
)

// DetectArbitrage detects if arbitrage opportunity exists using Bellman-Ford
// Converts the problem to negative cycle detection:
// - Arbitrage exists if product of rates in cycle > 1
// - log(product) > 0 means sum of log(rates) > 0
// - Equivalent to sum of -log(rates) < 0 (negative cycle)
func DetectArbitrage(exchangeRates [][]float64) bool {
	n := len(exchangeRates)
	if n == 0 {
		return false
	}

	// Initialize distances from source (0) to all nodes
	distances := make([]float64, n)
	for i := 1; i < n; i++ {
		distances[i] = math.Inf(1)
	}
	distances[0] = 0

	// Relax all edges N-1 times
	for iteration := 0; iteration < n-1; iteration++ {
		for source := 0; source < n; source++ {
			for dest := 0; dest < n; dest++ {
				if exchangeRates[source][dest] > 0 {
					weight := -math.Log(exchangeRates[source][dest])
					newDist := distances[source] + weight
					if newDist < distances[dest] {
						distances[dest] = newDist
					}
				}
			}
		}
	}

	// Check for negative cycle (one more relaxation)
	for source := 0; source < n; source++ {
		for dest := 0; dest < n; dest++ {
			if exchangeRates[source][dest] > 0 {
				weight := -math.Log(exchangeRates[source][dest])
				if distances[source]+weight < distances[dest] {
					return true // Negative cycle found = arbitrage exists
				}
			}
		}
	}

	return false
}

// DetectArbitrageFloydWarshall uses Floyd-Warshall variant
// Instead of shortest paths, we track the maximum product achievable
func DetectArbitrageFloydWarshall(exchangeRates [][]float64) bool {
	n := len(exchangeRates)
	if n == 0 {
		return false
	}

	// Create a copy to work with
	rates := make([][]float64, n)
	for i := range rates {
		rates[i] = make([]float64, n)
		copy(rates[i], exchangeRates[i])
	}

	// Floyd-Warshall to find maximum product paths
	for k := 0; k < n; k++ {
		for i := 0; i < n; i++ {
			for j := 0; j < n; j++ {
				// If going through k gives better rate
				if rates[i][k]*rates[k][j] > rates[i][j] {
					rates[i][j] = rates[i][k] * rates[k][j]
				}
			}
		}
	}

	// Check diagonal - if any rates[i][i] > 1, arbitrage exists
	for i := 0; i < n; i++ {
		if rates[i][i] > 1.0 {
			return true
		}
	}

	return false
}

// DetectArbitrageWithPath detects arbitrage and returns the cycle path if found
func DetectArbitrageWithPath(exchangeRates [][]float64) (bool, []int) {
	n := len(exchangeRates)
	if n == 0 {
		return false, nil
	}

	distances := make([]float64, n)
	predecessors := make([]int, n)
	for i := range distances {
		distances[i] = math.Inf(1)
		predecessors[i] = -1
	}
	distances[0] = 0

	// Relax all edges N-1 times
	for iteration := 0; iteration < n-1; iteration++ {
		for source := 0; source < n; source++ {
			for dest := 0; dest < n; dest++ {
				if exchangeRates[source][dest] > 0 {
					weight := -math.Log(exchangeRates[source][dest])
					if distances[source]+weight < distances[dest] {
						distances[dest] = distances[source] + weight
						predecessors[dest] = source
					}
				}
			}
		}
	}

	// Find negative cycle
	cycleNode := -1
	for source := 0; source < n; source++ {
		for dest := 0; dest < n; dest++ {
			if exchangeRates[source][dest] > 0 {
				weight := -math.Log(exchangeRates[source][dest])
				if distances[source]+weight < distances[dest] {
					cycleNode = dest
					predecessors[dest] = source
					break
				}
			}
		}
		if cycleNode != -1 {
			break
		}
	}

	if cycleNode == -1 {
		return false, nil
	}

	// Reconstruct cycle
	// Go back n times to ensure we're in the cycle
	current := cycleNode
	for i := 0; i < n; i++ {
		current = predecessors[current]
	}

	// Now trace the cycle
	cycleStart := current
	path := []int{current}
	current = predecessors[current]
	for current != cycleStart {
		path = append(path, current)
		current = predecessors[current]
	}
	path = append(path, cycleStart)

	// Reverse path
	for i, j := 0, len(path)-1; i < j; i, j = i+1, j-1 {
		path[i], path[j] = path[j], path[i]
	}

	return true, path
}

// DetectArbitrageDirect uses direct approach trying all cycles
func DetectArbitrageDirect(exchangeRates [][]float64) bool {
	n := len(exchangeRates)
	if n == 0 {
		return false
	}

	var dfs func(start, current int, product float64, visited map[int]bool, depth int) bool
	dfs = func(start, current int, product float64, visited map[int]bool, depth int) bool {
		if depth > n {
			return false
		}

		for nextCurrency := 0; nextCurrency < n; nextCurrency++ {
			newProduct := product * exchangeRates[current][nextCurrency]

			if nextCurrency == start && depth > 1 {
				if newProduct > 1.0 {
					return true
				}
			}

			if !visited[nextCurrency] {
				visited[nextCurrency] = true
				if dfs(start, nextCurrency, newProduct, visited, depth+1) {
					return true
				}
				delete(visited, nextCurrency)
			}
		}

		return false
	}

	for start := 0; start < n; start++ {
		visited := map[int]bool{start: true}
		if dfs(start, start, 1.0, visited, 1) {
			return true
		}
	}

	return false
}

func main() {
	// Test 1: Example with arbitrage
	rates1 := [][]float64{
		{1.0, 0.8631, 0.5903},
		{1.1586, 1.0, 0.6849},
		{1.6939, 1.46, 1.0},
	}
	result1 := DetectArbitrage(rates1)
	fmt.Printf("Test 1 (Has arbitrage): %v\n", result1) // Expected: true

	// Test 2: No arbitrage (consistent rates)
	rates2 := [][]float64{
		{1.0, 0.5, 0.25},
		{2.0, 1.0, 0.5},
		{4.0, 2.0, 1.0},
	}
	result2 := DetectArbitrage(rates2)
	fmt.Printf("Test 2 (No arbitrage): %v\n", result2) // Expected: false

	// Test 3: Single currency
	rates3 := [][]float64{{1.0}}
	result3 := DetectArbitrage(rates3)
	fmt.Printf("Test 3 (Single currency): %v\n", result3) // Expected: false

	// Test 4: Two currencies with arbitrage
	rates4 := [][]float64{
		{1.0, 2.0},
		{0.6, 1.0}, // 1 * 2.0 * 0.6 = 1.2 > 1
	}
	result4 := DetectArbitrage(rates4)
	fmt.Printf("Test 4 (Two currencies with arbitrage): %v\n", result4) // Expected: true

	// Test 5: Two currencies without arbitrage
	rates5 := [][]float64{
		{1.0, 2.0},
		{0.5, 1.0}, // 1 * 2.0 * 0.5 = 1.0, no arbitrage
	}
	result5 := DetectArbitrage(rates5)
	fmt.Printf("Test 5 (Two currencies, no arbitrage): %v\n", result5) // Expected: false

	// Test Floyd-Warshall version
	fmt.Println("\n--- Testing Floyd-Warshall Version ---")
	fmt.Printf("Floyd-Warshall Test 1: %v\n", DetectArbitrageFloydWarshall(rates1)) // true
	fmt.Printf("Floyd-Warshall Test 2: %v\n", DetectArbitrageFloydWarshall(rates2)) // false

	// Test with path finding
	fmt.Println("\n--- Testing Path Finding ---")
	hasArb, path := DetectArbitrageWithPath(rates1)
	fmt.Printf("Arbitrage found: %v, Path: %v\n", hasArb, path)

	// Verify the path gives profit
	if len(path) > 1 {
		product := 1.0
		for i := 0; i < len(path)-1; i++ {
			product *= rates1[path[i]][path[i+1]]
		}
		fmt.Printf("Path product: %v\n", product)
	}

	fmt.Println("\nAll tests completed!")
}
