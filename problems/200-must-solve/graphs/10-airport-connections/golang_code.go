/*
Airport Connections - Go Solution

Find minimum routes to add so all airports are reachable from starting airport.

Time Complexity: O(A * (A + R)) where A is airports, R is routes
Space Complexity: O(A + R)
*/

package main

import (
	"fmt"
	"sort"
)

// AirportConnections finds minimum number of routes to add
func AirportConnections(airports []string, routes [][]string, startingAirport string) int {
	// Build adjacency list
	graph := createAirportGraph(airports, routes)

	// Find unreachable airports from starting airport
	reachable := getReachableAirports(graph, startingAirport)
	unreachable := []string{}
	for _, airport := range airports {
		if !reachable[airport] {
			unreachable = append(unreachable, airport)
		}
	}

	if len(unreachable) == 0 {
		return 0
	}

	unreachableSet := make(map[string]bool)
	for _, airport := range unreachable {
		unreachableSet[airport] = true
	}

	// Calculate scores - number of unreachable airports reachable from each
	scores := calculateUnreachableConnections(graph, unreachableSet)

	// Sort unreachable airports by score (descending)
	sort.Slice(unreachable, func(i, j int) bool {
		return scores[unreachable[i]] > scores[unreachable[j]]
	})

	// Greedily add routes to airports that can reach the most other airports
	routesToAdd := 0
	newlyReachable := make(map[string]bool)

	for _, airport := range unreachable {
		if newlyReachable[airport] {
			continue
		}

		// Add a route to this airport
		routesToAdd++

		// Mark all airports reachable from this one as covered
		reachableFromHere := getReachableAirportsInSet(graph, airport, unreachableSet)
		for a := range reachableFromHere {
			newlyReachable[a] = true
		}
	}

	return routesToAdd
}

func createAirportGraph(airports []string, routes [][]string) map[string][]string {
	graph := make(map[string][]string)
	for _, airport := range airports {
		graph[airport] = []string{}
	}
	for _, route := range routes {
		source, dest := route[0], route[1]
		graph[source] = append(graph[source], dest)
	}
	return graph
}

func createReverseGraph(airports []string, routes [][]string) map[string][]string {
	graph := make(map[string][]string)
	for _, airport := range airports {
		graph[airport] = []string{}
	}
	for _, route := range routes {
		source, dest := route[0], route[1]
		graph[dest] = append(graph[dest], source)
	}
	return graph
}

func getReachableAirports(graph map[string][]string, start string) map[string]bool {
	reachable := make(map[string]bool)
	stack := []string{start}

	for len(stack) > 0 {
		airport := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if reachable[airport] {
			continue
		}
		reachable[airport] = true

		for _, neighbor := range graph[airport] {
			if !reachable[neighbor] {
				stack = append(stack, neighbor)
			}
		}
	}

	return reachable
}

func getReachableAirportsInSet(graph map[string][]string, start string, validSet map[string]bool) map[string]bool {
	reachable := make(map[string]bool)
	stack := []string{start}

	for len(stack) > 0 {
		airport := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if reachable[airport] || !validSet[airport] {
			continue
		}
		reachable[airport] = true

		for _, neighbor := range graph[airport] {
			if !reachable[neighbor] && validSet[neighbor] {
				stack = append(stack, neighbor)
			}
		}
	}

	return reachable
}

func calculateUnreachableConnections(graph map[string][]string, unreachable map[string]bool) map[string]int {
	scores := make(map[string]int)

	for airport := range unreachable {
		reachable := getReachableAirportsInSet(graph, airport, unreachable)
		scores[airport] = len(reachable)
	}

	return scores
}

// AirportConnectionsOptimized uses SCC-based approach
func AirportConnectionsOptimized(airports []string, routes [][]string, startingAirport string) int {
	graph := createAirportGraph(airports, routes)
	reachable := getReachableAirports(graph, startingAirport)

	unreachable := []string{}
	for _, airport := range airports {
		if !reachable[airport] {
			unreachable = append(unreachable, airport)
		}
	}

	if len(unreachable) == 0 {
		return 0
	}

	unreachableSet := make(map[string]bool)
	for _, airport := range unreachable {
		unreachableSet[airport] = true
	}

	// Find SCCs using Kosaraju's algorithm
	// Step 1: Get finish order
	visited := make(map[string]bool)
	finishOrder := []string{}

	var dfs1 func(airport string)
	dfs1 = func(airport string) {
		if visited[airport] || !unreachableSet[airport] {
			return
		}
		visited[airport] = true
		for _, neighbor := range graph[airport] {
			dfs1(neighbor)
		}
		finishOrder = append(finishOrder, airport)
	}

	for _, airport := range unreachable {
		dfs1(airport)
	}

	// Step 2: Build reverse graph
	reverseGraph := createReverseGraph(airports, routes)

	// Step 3: Find SCCs in reverse order
	visited = make(map[string]bool)
	sccs := []map[string]bool{}

	var dfs2 func(airport string, scc map[string]bool)
	dfs2 = func(airport string, scc map[string]bool) {
		if visited[airport] || !unreachableSet[airport] {
			return
		}
		visited[airport] = true
		scc[airport] = true
		for _, neighbor := range reverseGraph[airport] {
			dfs2(neighbor, scc)
		}
	}

	for i := len(finishOrder) - 1; i >= 0; i-- {
		airport := finishOrder[i]
		if !visited[airport] {
			scc := make(map[string]bool)
			dfs2(airport, scc)
			if len(scc) > 0 {
				sccs = append(sccs, scc)
			}
		}
	}

	// Step 4: Build SCC graph and find roots
	airportToSCC := make(map[string]int)
	for idx, scc := range sccs {
		for airport := range scc {
			airportToSCC[airport] = idx
		}
	}

	hasIncoming := make(map[int]bool)
	for _, airport := range unreachable {
		sccIdx := airportToSCC[airport]
		for _, neighbor := range reverseGraph[airport] {
			if unreachableSet[neighbor] {
				neighborSCC := airportToSCC[neighbor]
				if neighborSCC != sccIdx {
					hasIncoming[sccIdx] = true
				}
			}
		}
	}

	// Count root SCCs
	rootCount := len(sccs) - len(hasIncoming)

	return rootCount
}

func main() {
	// Test 1: Example from problem
	airports1 := []string{
		"BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW", "HND",
		"ICN", "JFK", "LGA", "LHR", "ORD", "SAN", "SFO", "SIN", "TLV", "BUD",
	}
	routes1 := [][]string{
		{"DSM", "ORD"}, {"ORD", "BGI"}, {"BGI", "LGA"}, {"SIN", "CDG"},
		{"CDG", "SIN"}, {"CDG", "BUD"}, {"DEL", "DOH"}, {"DEL", "CDG"},
		{"TLV", "DEL"}, {"EWR", "HND"}, {"HND", "ICN"}, {"HND", "JFK"},
		{"ICN", "JFK"}, {"JFK", "LGA"}, {"EYW", "LHR"}, {"LHR", "SFO"},
		{"SFO", "SAN"}, {"SFO", "DSM"}, {"SAN", "EYW"},
	}
	starting1 := "LGA"

	result1 := AirportConnections(airports1, routes1, starting1)
	fmt.Printf("Test 1: %d\n", result1) // Expected: 3

	// Test 2: All airports already reachable
	airports2 := []string{"A", "B", "C"}
	routes2 := [][]string{{"A", "B"}, {"B", "C"}}
	starting2 := "A"

	result2 := AirportConnections(airports2, routes2, starting2)
	fmt.Printf("Test 2 (All reachable): %d\n", result2) // Expected: 0

	// Test 3: No routes at all
	airports3 := []string{"A", "B", "C", "D"}
	routes3 := [][]string{}
	starting3 := "A"

	result3 := AirportConnections(airports3, routes3, starting3)
	fmt.Printf("Test 3 (No routes): %d\n", result3) // Expected: 3

	// Test 4: Single airport
	airports4 := []string{"A"}
	routes4 := [][]string{}
	starting4 := "A"

	result4 := AirportConnections(airports4, routes4, starting4)
	fmt.Printf("Test 4 (Single airport): %d\n", result4) // Expected: 0

	// Test 5: Chain of airports
	airports5 := []string{"A", "B", "C", "D", "E"}
	routes5 := [][]string{{"B", "C"}, {"C", "D"}, {"D", "E"}}
	starting5 := "A"

	result5 := AirportConnections(airports5, routes5, starting5)
	fmt.Printf("Test 5 (Chain): %d\n", result5) // Expected: 1

	// Test optimized version
	fmt.Println("\n--- Testing Optimized Version ---")
	resultOpt := AirportConnectionsOptimized(airports1, routes1, starting1)
	fmt.Printf("Optimized Test: %d\n", resultOpt) // Expected: 3

	fmt.Println("\nAll tests completed!")
}
