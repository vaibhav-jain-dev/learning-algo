/*
Cycle Detection in Graph - Go Solution

Detect if a directed graph contains a cycle using DFS.

Time Complexity: O(V + E) where V is vertices, E is edges
Space Complexity: O(V) for the color array and recursion stack
*/

package main

import "fmt"

// Color constants for node states
const (
	WHITE = 0 // Unvisited
	GRAY  = 1 // Currently in DFS path (being processed)
	BLACK = 2 // Fully processed
)

// CycleInGraph detects if a directed graph contains a cycle
func CycleInGraph(edges [][]int) bool {
	numNodes := len(edges)
	colors := make([]int, numNodes)

	var dfs func(node int) bool
	dfs = func(node int) bool {
		colors[node] = GRAY

		for _, neighbor := range edges[node] {
			if colors[neighbor] == GRAY {
				// Found a back edge - cycle detected
				return true
			}
			if colors[neighbor] == WHITE {
				if dfs(neighbor) {
					return true
				}
			}
		}

		colors[node] = BLACK
		return false
	}

	// Check all nodes to handle disconnected components
	for node := 0; node < numNodes; node++ {
		if colors[node] == WHITE {
			if dfs(node) {
				return true
			}
		}
	}

	return false
}

// CycleInGraphIterative detects cycle using iterative DFS with explicit stack
func CycleInGraphIterative(edges [][]int) bool {
	numNodes := len(edges)
	colors := make([]int, numNodes)

	type stackItem struct {
		node          int
		isBacktracking bool
	}

	for start := 0; start < numNodes; start++ {
		if colors[start] != WHITE {
			continue
		}

		stack := []stackItem{{start, false}}

		for len(stack) > 0 {
			// Pop from stack
			item := stack[len(stack)-1]
			stack = stack[:len(stack)-1]

			node := item.node

			if item.isBacktracking {
				colors[node] = BLACK
				continue
			}

			if colors[node] == GRAY {
				return true
			}

			if colors[node] == BLACK {
				continue
			}

			colors[node] = GRAY
			stack = append(stack, stackItem{node, true})

			for _, neighbor := range edges[node] {
				if colors[neighbor] == GRAY {
					return true
				}
				if colors[neighbor] == WHITE {
					stack = append(stack, stackItem{neighbor, false})
				}
			}
		}
	}

	return false
}

// CycleInGraphSimple uses visited and inStack maps for simpler logic
func CycleInGraphSimple(edges [][]int) bool {
	numNodes := len(edges)
	visited := make(map[int]bool)
	inStack := make(map[int]bool)

	var dfs func(node int) bool
	dfs = func(node int) bool {
		visited[node] = true
		inStack[node] = true

		for _, neighbor := range edges[node] {
			if inStack[neighbor] {
				return true
			}
			if !visited[neighbor] {
				if dfs(neighbor) {
					return true
				}
			}
		}

		delete(inStack, node)
		return false
	}

	for node := 0; node < numNodes; node++ {
		if !visited[node] {
			if dfs(node) {
				return true
			}
		}
	}

	return false
}

func main() {
	// Test 1: Graph with cycle (0 -> 1 -> 2 -> 0)
	edges1 := [][]int{
		{1, 3},    // Node 0 -> 1, 3
		{2, 3, 4}, // Node 1 -> 2, 3, 4
		{0},       // Node 2 -> 0
		{},        // Node 3 (no outgoing)
		{2, 5},    // Node 4 -> 2, 5
		{},        // Node 5 (no outgoing)
	}
	result1 := CycleInGraph(edges1)
	fmt.Printf("Test 1 (Has cycle): %v\n", result1) // Expected: true

	// Test 2: DAG - no cycle
	edges2 := [][]int{
		{1, 2}, // Node 0 -> 1, 2
		{2},    // Node 1 -> 2
		{},     // Node 2 (no outgoing)
	}
	result2 := CycleInGraph(edges2)
	fmt.Printf("Test 2 (No cycle - DAG): %v\n", result2) // Expected: false

	// Test 3: Self-loop
	edges3 := [][]int{
		{0}, // Node 0 -> 0 (self-loop)
		{2},
		{},
	}
	result3 := CycleInGraph(edges3)
	fmt.Printf("Test 3 (Self-loop): %v\n", result3) // Expected: true

	// Test 4: Disconnected graph with cycle in one component
	edges4 := [][]int{
		{1}, // Component 1: 0 -> 1 -> 2 -> 0
		{2},
		{0},
		{4}, // Component 2: 3 -> 4 -> 5 (no cycle)
		{5},
		{},
	}
	result4 := CycleInGraph(edges4)
	fmt.Printf("Test 4 (Disconnected with cycle): %v\n", result4) // Expected: true

	// Test 5: Single node, no edges
	edges5 := [][]int{{}}
	result5 := CycleInGraph(edges5)
	fmt.Printf("Test 5 (Single node): %v\n", result5) // Expected: false

	// Test 6: Two nodes, no cycle
	edges6 := [][]int{{1}, {}}
	result6 := CycleInGraph(edges6)
	fmt.Printf("Test 6 (Two nodes, no cycle): %v\n", result6) // Expected: false

	// Test 7: Two nodes with cycle
	edges7 := [][]int{{1}, {0}}
	result7 := CycleInGraph(edges7)
	fmt.Printf("Test 7 (Two nodes with cycle): %v\n", result7) // Expected: true

	// Test iterative version
	fmt.Println("\n--- Testing Iterative Version ---")
	fmt.Printf("Iterative Test 1: %v\n", CycleInGraphIterative(edges1)) // true
	fmt.Printf("Iterative Test 2: %v\n", CycleInGraphIterative(edges2)) // false
	fmt.Printf("Iterative Test 3: %v\n", CycleInGraphIterative(edges3)) // true

	// Test simple version
	fmt.Println("\n--- Testing Simple Version ---")
	fmt.Printf("Simple Test 1: %v\n", CycleInGraphSimple(edges1)) // true
	fmt.Printf("Simple Test 2: %v\n", CycleInGraphSimple(edges2)) // false
	fmt.Printf("Simple Test 3: %v\n", CycleInGraphSimple(edges3)) // true

	fmt.Println("\nAll tests completed!")
}
