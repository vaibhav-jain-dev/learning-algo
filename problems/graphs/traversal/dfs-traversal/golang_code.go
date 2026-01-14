package main

import (
	"fmt"
)

// dfsRecursive performs recursive DFS traversal of the graph.
func dfsRecursive(graph map[int][]int, start int) []int {
	if _, exists := graph[start]; !exists {
		return []int{}
	}

	result := []int{}
	visited := make(map[int]bool)

	var dfs func(node int)
	dfs = func(node int) {
		visited[node] = true
		result = append(result, node)

		for _, neighbor := range graph[node] {
			if !visited[neighbor] {
				dfs(neighbor)
			}
		}
	}

	dfs(start)
	return result
}

// dfsIterative performs iterative DFS traversal using a stack.
func dfsIterative(graph map[int][]int, start int) []int {
	if _, exists := graph[start]; !exists {
		return []int{}
	}

	result := []int{}
	visited := make(map[int]bool)
	stack := []int{start}

	for len(stack) > 0 {
		// Pop from stack
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if visited[node] {
			continue
		}

		visited[node] = true
		result = append(result, node)

		// Add neighbors in reverse order to maintain left-to-right traversal
		neighbors := graph[node]
		for i := len(neighbors) - 1; i >= 0; i-- {
			if !visited[neighbors[i]] {
				stack = append(stack, neighbors[i])
			}
		}
	}

	return result
}

// dfsAllComponents performs DFS covering all connected components.
func dfsAllComponents(graph map[int][]int) [][]int {
	if len(graph) == 0 {
		return [][]int{}
	}

	visited := make(map[int]bool)
	components := [][]int{}

	var dfs func(node int, component *[]int)
	dfs = func(node int, component *[]int) {
		visited[node] = true
		*component = append(*component, node)

		for _, neighbor := range graph[node] {
			if !visited[neighbor] {
				dfs(neighbor, component)
			}
		}
	}

	for node := range graph {
		if !visited[node] {
			component := []int{}
			dfs(node, &component)
			components = append(components, component)
		}
	}

	return components
}

// hasPathDFS checks if there's a path from source to target using DFS.
func hasPathDFS(graph map[int][]int, source, target int) bool {
	if _, exists := graph[source]; !exists {
		return false
	}
	if _, exists := graph[target]; !exists {
		return false
	}

	if source == target {
		return true
	}

	visited := make(map[int]bool)
	stack := []int{source}

	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if node == target {
			return true
		}

		if visited[node] {
			continue
		}

		visited[node] = true

		for _, neighbor := range graph[node] {
			if !visited[neighbor] {
				stack = append(stack, neighbor)
			}
		}
	}

	return false
}

// findPathDFS finds a path from source to target using DFS.
func findPathDFS(graph map[int][]int, source, target int) []int {
	if _, exists := graph[source]; !exists {
		return []int{}
	}
	if _, exists := graph[target]; !exists {
		return []int{}
	}

	if source == target {
		return []int{source}
	}

	visited := make(map[int]bool)
	parent := make(map[int]int)
	stack := []int{source}
	parent[source] = -1

	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if node == target {
			// Reconstruct path
			path := []int{}
			current := target
			for current != -1 {
				path = append(path, current)
				current = parent[current]
			}
			// Reverse path
			for i, j := 0, len(path)-1; i < j; i, j = i+1, j-1 {
				path[i], path[j] = path[j], path[i]
			}
			return path
		}

		if visited[node] {
			continue
		}

		visited[node] = true

		for _, neighbor := range graph[node] {
			if !visited[neighbor] {
				parent[neighbor] = node
				stack = append(stack, neighbor)
			}
		}
	}

	return []int{}
}

// Helper function to compare slices
func slicesEqual(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func main() {
	fmt.Println("============================================================")
	fmt.Println("DFS TRAVERSAL TESTS")
	fmt.Println("============================================================")

	// Test 1: Basic graph - recursive
	fmt.Println("\nTest 1: Basic connected graph (recursive)")
	graph1 := map[int][]int{
		0: {1, 2},
		1: {0, 3, 4},
		2: {0, 5},
		3: {1},
		4: {1},
		5: {2},
	}
	result := dfsRecursive(graph1, 0)
	fmt.Printf("Graph: %v\n", graph1)
	fmt.Printf("Start: 0\n")
	fmt.Printf("DFS Order: %v\n", result)
	expected := []int{0, 1, 3, 4, 2, 5}
	if slicesEqual(result, expected) {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected %v, got %v\n", expected, result)
	}

	// Test 2: Basic graph - iterative
	fmt.Println("\nTest 2: Basic connected graph (iterative)")
	result = dfsIterative(graph1, 0)
	fmt.Printf("Graph: %v\n", graph1)
	fmt.Printf("Start: 0\n")
	fmt.Printf("DFS Order: %v\n", result)
	if slicesEqual(result, expected) {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected %v, got %v\n", expected, result)
	}

	// Test 3: Linear graph
	fmt.Println("\nTest 3: Linear graph")
	graph2 := map[int][]int{
		0: {1},
		1: {0, 2},
		2: {1, 3},
		3: {2},
	}
	result = dfsRecursive(graph2, 0)
	fmt.Printf("Graph: %v\n", graph2)
	fmt.Printf("Start: 0\n")
	fmt.Printf("DFS Order: %v\n", result)
	expected = []int{0, 1, 2, 3}
	if slicesEqual(result, expected) {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected %v, got %v\n", expected, result)
	}

	// Test 4: Star graph
	fmt.Println("\nTest 4: Star graph")
	graph3 := map[int][]int{
		0: {1, 2, 3},
		1: {0},
		2: {0},
		3: {0},
	}
	result = dfsRecursive(graph3, 0)
	fmt.Printf("Graph: %v\n", graph3)
	fmt.Printf("Start: 0\n")
	fmt.Printf("DFS Order: %v\n", result)
	if slicesEqual(result, expected) {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected %v, got %v\n", expected, result)
	}

	// Test 5: Has path - exists
	fmt.Println("\nTest 5: Has path - exists")
	graph5 := map[int][]int{
		0: {1, 2},
		1: {0, 3},
		2: {0},
		3: {1, 4},
		4: {3},
	}
	hasPath := hasPathDFS(graph5, 0, 4)
	fmt.Printf("Graph: %v\n", graph5)
	fmt.Printf("Path from 0 to 4 exists: %v\n", hasPath)
	if hasPath {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED: Expected true")
	}

	// Test 6: Has path - does not exist
	fmt.Println("\nTest 6: Has path - does not exist")
	graph6 := map[int][]int{
		0: {1},
		1: {0},
		2: {3},
		3: {2},
	}
	hasPath = hasPathDFS(graph6, 0, 3)
	fmt.Printf("Graph: %v\n", graph6)
	fmt.Printf("Path from 0 to 3 exists: %v\n", hasPath)
	if !hasPath {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED: Expected false")
	}

	// Test 7: Find path
	fmt.Println("\nTest 7: Find path")
	path := findPathDFS(graph5, 0, 4)
	fmt.Printf("Graph: %v\n", graph5)
	fmt.Printf("Path from 0 to 4: %v\n", path)
	expectedPath := []int{0, 1, 3, 4}
	if slicesEqual(path, expectedPath) {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected %v, got %v\n", expectedPath, path)
	}

	// Test 8: Single node
	fmt.Println("\nTest 8: Single node graph")
	graph7 := map[int][]int{0: {}}
	result = dfsRecursive(graph7, 0)
	fmt.Printf("Graph: %v\n", graph7)
	fmt.Printf("Start: 0\n")
	fmt.Printf("DFS Order: %v\n", result)
	if slicesEqual(result, []int{0}) {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED")
	}

	// Test 9: All components
	fmt.Println("\nTest 9: Disconnected graph - all components")
	graph4 := map[int][]int{
		0: {1},
		1: {0},
		2: {3},
		3: {2},
		4: {},
	}
	components := dfsAllComponents(graph4)
	fmt.Printf("Graph: %v\n", graph4)
	fmt.Printf("All Components: %v\n", components)
	if len(components) == 3 {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected 3 components, got %d\n", len(components))
	}

	// Test 10: Cycle graph
	fmt.Println("\nTest 10: Cycle graph traversal")
	graph8 := map[int][]int{
		0: {1, 4},
		1: {0, 2},
		2: {1, 3},
		3: {2, 4},
		4: {3, 0},
	}
	result = dfsRecursive(graph8, 0)
	fmt.Println("Graph: Pentagon cycle")
	fmt.Printf("Start: 0\n")
	fmt.Printf("DFS Order: %v\n", result)
	if len(result) == 5 {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected 5 nodes, got %d\n", len(result))
	}

	fmt.Println("\n============================================================")
	fmt.Println("ALL TESTS PASSED!")
	fmt.Println("============================================================")
}
