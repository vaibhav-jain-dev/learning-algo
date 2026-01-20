/*
Two-Colorable (Bipartite Graph Check) - Go Solution

Determine if a graph can be colored with two colors such that
no adjacent nodes have the same color.

Time Complexity: O(V + E) where V is vertices, E is edges
Space Complexity: O(V) for the color array
*/

package main

import "fmt"

// TwoColorable checks if the graph is two-colorable (bipartite) using BFS
func TwoColorable(edges [][]int) bool {
	if len(edges) == 0 {
		return true
	}

	numNodes := len(edges)
	// -1 means uncolored, 0 and 1 are the two colors
	colors := make([]int, numNodes)
	for i := range colors {
		colors[i] = -1
	}

	// Start BFS from node 0
	colors[0] = 0
	queue := []int{0}

	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]

		currentColor := colors[node]
		nextColor := 1 - currentColor // Toggle between 0 and 1

		for _, neighbor := range edges[node] {
			if colors[neighbor] == -1 {
				// Uncolored - assign opposite color
				colors[neighbor] = nextColor
				queue = append(queue, neighbor)
			} else if colors[neighbor] == currentColor {
				// Same color as current node - not two-colorable
				return false
			}
			// If already colored with opposite color, it's valid
		}
	}

	return true
}

// TwoColorableDFS checks if the graph is two-colorable using recursive DFS
func TwoColorableDFS(edges [][]int) bool {
	if len(edges) == 0 {
		return true
	}

	numNodes := len(edges)
	colors := make([]int, numNodes)
	for i := range colors {
		colors[i] = -1
	}

	var dfs func(node, color int) bool
	dfs = func(node, color int) bool {
		colors[node] = color
		nextColor := 1 - color

		for _, neighbor := range edges[node] {
			if colors[neighbor] == -1 {
				if !dfs(neighbor, nextColor) {
					return false
				}
			} else if colors[neighbor] == color {
				return false
			}
		}

		return true
	}

	// Start from node 0
	return dfs(0, 0)
}

// TwoColorableIterativeDFS checks using iterative DFS
func TwoColorableIterativeDFS(edges [][]int) bool {
	if len(edges) == 0 {
		return true
	}

	numNodes := len(edges)
	colors := make([]int, numNodes)
	for i := range colors {
		colors[i] = -1
	}

	type nodeColor struct {
		node, color int
	}

	// Start from node 0
	stack := []nodeColor{{0, 0}}

	for len(stack) > 0 {
		// Pop
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		node, color := current.node, current.color

		if colors[node] != -1 {
			if colors[node] != color {
				return false
			}
			continue
		}

		colors[node] = color
		nextColor := 1 - color

		for _, neighbor := range edges[node] {
			if colors[neighbor] == -1 {
				stack = append(stack, nodeColor{neighbor, nextColor})
			} else if colors[neighbor] == color {
				return false
			}
		}
	}

	return true
}

// TwoColorableDisconnected handles potentially disconnected graphs
func TwoColorableDisconnected(edges [][]int) bool {
	if len(edges) == 0 {
		return true
	}

	numNodes := len(edges)
	colors := make([]int, numNodes)
	for i := range colors {
		colors[i] = -1
	}

	// Process each connected component
	for startNode := 0; startNode < numNodes; startNode++ {
		if colors[startNode] != -1 {
			continue
		}

		colors[startNode] = 0
		queue := []int{startNode}

		for len(queue) > 0 {
			node := queue[0]
			queue = queue[1:]

			currentColor := colors[node]
			nextColor := 1 - currentColor

			for _, neighbor := range edges[node] {
				if colors[neighbor] == -1 {
					colors[neighbor] = nextColor
					queue = append(queue, neighbor)
				} else if colors[neighbor] == currentColor {
					return false
				}
			}
		}
	}

	return true
}

func main() {
	// Test 1: Triangle (3-cycle) - not two-colorable
	edges1 := [][]int{
		{1, 2}, // Node 0 connects to 1, 2
		{0, 2}, // Node 1 connects to 0, 2
		{0, 1}, // Node 2 connects to 0, 1
	}
	result1 := TwoColorable(edges1)
	fmt.Printf("Test 1 (Triangle): %v\n", result1) // Expected: false

	// Test 2: Square (4-cycle) - two-colorable
	edges2 := [][]int{
		{1, 3}, // Node 0 connects to 1, 3
		{0, 2}, // Node 1 connects to 0, 2
		{1, 3}, // Node 2 connects to 1, 3
		{0, 2}, // Node 3 connects to 0, 2
	}
	result2 := TwoColorable(edges2)
	fmt.Printf("Test 2 (Square): %v\n", result2) // Expected: true

	// Test 3: Single node with self-loop - not two-colorable
	edges3 := [][]int{{0}} // Node 0 connects to itself
	result3 := TwoColorable(edges3)
	fmt.Printf("Test 3 (Self-loop): %v\n", result3) // Expected: false

	// Test 4: Simple path (linear graph) - two-colorable
	edges4 := [][]int{
		{1},    // Node 0 connects to 1
		{0, 2}, // Node 1 connects to 0, 2
		{1, 3}, // Node 2 connects to 1, 3
		{2},    // Node 3 connects to 2
	}
	result4 := TwoColorable(edges4)
	fmt.Printf("Test 4 (Path): %v\n", result4) // Expected: true

	// Test 5: Pentagon (5-cycle) - not two-colorable (odd cycle)
	edges5 := [][]int{
		{1, 4}, // Node 0
		{0, 2}, // Node 1
		{1, 3}, // Node 2
		{2, 4}, // Node 3
		{3, 0}, // Node 4
	}
	result5 := TwoColorable(edges5)
	fmt.Printf("Test 5 (Pentagon): %v\n", result5) // Expected: false

	// Test 6: Hexagon (6-cycle) - two-colorable (even cycle)
	edges6 := [][]int{
		{1, 5}, // Node 0
		{0, 2}, // Node 1
		{1, 3}, // Node 2
		{2, 4}, // Node 3
		{3, 5}, // Node 4
		{4, 0}, // Node 5
	}
	result6 := TwoColorable(edges6)
	fmt.Printf("Test 6 (Hexagon): %v\n", result6) // Expected: true

	// Test 7: Empty graph
	result7 := TwoColorable([][]int{})
	fmt.Printf("Test 7 (Empty): %v\n", result7) // Expected: true

	// Test DFS version
	fmt.Println("\n--- Testing DFS Version ---")
	fmt.Printf("DFS Triangle: %v\n", TwoColorableDFS(edges1))   // false
	fmt.Printf("DFS Square: %v\n", TwoColorableDFS(edges2))     // true
	fmt.Printf("DFS Self-loop: %v\n", TwoColorableDFS(edges3))  // false

	// Test iterative DFS version
	fmt.Println("\n--- Testing Iterative DFS Version ---")
	fmt.Printf("Iterative DFS Triangle: %v\n", TwoColorableIterativeDFS(edges1))   // false
	fmt.Printf("Iterative DFS Square: %v\n", TwoColorableIterativeDFS(edges2))     // true
	fmt.Printf("Iterative DFS Self-loop: %v\n", TwoColorableIterativeDFS(edges3))  // false

	fmt.Println("\nAll tests completed!")
}
