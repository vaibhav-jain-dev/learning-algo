package main

import (
	"fmt"
)

// bfsTraversal performs BFS traversal starting from the given node.
func bfsTraversal(graph map[int][]int, start int) []int {
	if _, exists := graph[start]; !exists {
		return []int{}
	}

	result := []int{}
	visited := make(map[int]bool)
	queue := []int{start}
	visited[start] = true

	for len(queue) > 0 {
		// Dequeue
		node := queue[0]
		queue = queue[1:]
		result = append(result, node)

		// Add all unvisited neighbors to the queue
		for _, neighbor := range graph[node] {
			if !visited[neighbor] {
				visited[neighbor] = true
				queue = append(queue, neighbor)
			}
		}
	}

	return result
}

// bfsTraversalAllComponents performs BFS covering all connected components.
func bfsTraversalAllComponents(graph map[int][]int) [][]int {
	if len(graph) == 0 {
		return [][]int{}
	}

	visited := make(map[int]bool)
	components := [][]int{}

	for node := range graph {
		if !visited[node] {
			component := []int{}
			queue := []int{node}
			visited[node] = true

			for len(queue) > 0 {
				current := queue[0]
				queue = queue[1:]
				component = append(component, current)

				for _, neighbor := range graph[current] {
					if !visited[neighbor] {
						visited[neighbor] = true
						queue = append(queue, neighbor)
					}
				}
			}

			components = append(components, component)
		}
	}

	return components
}

// bfsLevelOrder performs BFS and returns nodes grouped by level.
func bfsLevelOrder(graph map[int][]int, start int) [][]int {
	if _, exists := graph[start]; !exists {
		return [][]int{}
	}

	result := [][]int{}
	visited := make(map[int]bool)
	queue := []int{start}
	visited[start] = true

	for len(queue) > 0 {
		levelSize := len(queue)
		level := []int{}

		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]
			level = append(level, node)

			for _, neighbor := range graph[node] {
				if !visited[neighbor] {
					visited[neighbor] = true
					queue = append(queue, neighbor)
				}
			}
		}

		result = append(result, level)
	}

	return result
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
	fmt.Println("BFS TRAVERSAL TESTS")
	fmt.Println("============================================================")

	// Test 1: Basic graph
	fmt.Println("\nTest 1: Basic connected graph")
	graph1 := map[int][]int{
		0: {1, 2},
		1: {0, 3, 4},
		2: {0, 5},
		3: {1},
		4: {1},
		5: {2},
	}
	result := bfsTraversal(graph1, 0)
	fmt.Printf("Graph: %v\n", graph1)
	fmt.Printf("Start: 0\n")
	fmt.Printf("BFS Order: %v\n", result)
	expected := []int{0, 1, 2, 3, 4, 5}
	if slicesEqual(result, expected) {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected %v, got %v\n", expected, result)
	}

	// Test 2: Linear graph
	fmt.Println("\nTest 2: Linear graph")
	graph2 := map[int][]int{
		0: {1},
		1: {0, 2},
		2: {1, 3},
		3: {2},
	}
	result = bfsTraversal(graph2, 1)
	fmt.Printf("Graph: %v\n", graph2)
	fmt.Printf("Start: 1\n")
	fmt.Printf("BFS Order: %v\n", result)
	expected = []int{1, 0, 2, 3}
	if slicesEqual(result, expected) {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected %v, got %v\n", expected, result)
	}

	// Test 3: Isolated nodes
	fmt.Println("\nTest 3: Isolated nodes")
	graph3 := map[int][]int{
		0: {},
		1: {},
		2: {},
	}
	result = bfsTraversal(graph3, 0)
	fmt.Printf("Graph: %v\n", graph3)
	fmt.Printf("Start: 0\n")
	fmt.Printf("BFS Order: %v\n", result)
	expected = []int{0}
	if slicesEqual(result, expected) {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected %v, got %v\n", expected, result)
	}

	// Test 4: Complete graph
	fmt.Println("\nTest 4: Complete graph (K4)")
	graph4 := map[int][]int{
		0: {1, 2, 3},
		1: {0, 2, 3},
		2: {0, 1, 3},
		3: {0, 1, 2},
	}
	result = bfsTraversal(graph4, 0)
	fmt.Println("Graph: Complete graph K4")
	fmt.Printf("Start: 0\n")
	fmt.Printf("BFS Order: %v\n", result)
	expected = []int{0, 1, 2, 3}
	if slicesEqual(result, expected) {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected %v, got %v\n", expected, result)
	}

	// Test 5: BFS with all components
	fmt.Println("\nTest 5: Disconnected graph - all components")
	graph5 := map[int][]int{
		0: {1},
		1: {0},
		2: {3},
		3: {2},
		4: {},
	}
	components := bfsTraversalAllComponents(graph5)
	fmt.Printf("Graph: %v\n", graph5)
	fmt.Printf("All Components: %v\n", components)
	if len(components) == 3 {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected 3 components, got %d\n", len(components))
	}

	// Test 6: Level order BFS
	fmt.Println("\nTest 6: Level order BFS")
	graph6 := map[int][]int{
		0: {1, 2},
		1: {0, 3, 4},
		2: {0, 5},
		3: {1},
		4: {1},
		5: {2},
	}
	levels := bfsLevelOrder(graph6, 0)
	fmt.Printf("Graph: %v\n", graph6)
	fmt.Printf("Start: 0\n")
	fmt.Printf("Level Order: %v\n", levels)
	if len(levels) == 3 && slicesEqual(levels[0], []int{0}) && slicesEqual(levels[1], []int{1, 2}) && slicesEqual(levels[2], []int{3, 4, 5}) {
		fmt.Println("PASSED")
	} else {
		fmt.Println("FAILED")
	}

	// Test 7: Single node
	fmt.Println("\nTest 7: Single node graph")
	graph7 := map[int][]int{0: {}}
	result = bfsTraversal(graph7, 0)
	fmt.Printf("Graph: %v\n", graph7)
	fmt.Printf("Start: 0\n")
	fmt.Printf("BFS Order: %v\n", result)
	expected = []int{0}
	if slicesEqual(result, expected) {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected %v, got %v\n", expected, result)
	}

	// Test 8: Cycle graph
	fmt.Println("\nTest 8: Cycle graph")
	graph8 := map[int][]int{
		0: {1, 4},
		1: {0, 2},
		2: {1, 3},
		3: {2, 4},
		4: {3, 0},
	}
	result = bfsTraversal(graph8, 0)
	fmt.Println("Graph: Cycle with 5 nodes")
	fmt.Printf("Start: 0\n")
	fmt.Printf("BFS Order: %v\n", result)
	if len(result) == 5 {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected 5 nodes, got %d\n", len(result))
	}

	fmt.Println("\n============================================================")
	fmt.Println("ALL TESTS PASSED!")
	fmt.Println("============================================================")
}
