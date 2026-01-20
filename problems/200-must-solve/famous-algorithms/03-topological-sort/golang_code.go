/*
Topological Sort - DAG Ordering - Go Solution

Find a valid topological ordering of vertices in a DAG.

Time Complexity: O(V + E)
Space Complexity: O(V + E)
*/

package main

import "fmt"

// topologicalSortKahn performs topological sort using Kahn's Algorithm (BFS)
func topologicalSortKahn(n int, edges [][]int) []int {
	// Build adjacency list and calculate in-degrees
	graph := make([][]int, n)
	for i := range graph {
		graph[i] = []int{}
	}
	inDegree := make([]int, n)

	for _, edge := range edges {
		u, v := edge[0], edge[1]
		graph[u] = append(graph[u], v)
		inDegree[v]++
	}

	// Initialize queue with all nodes having in-degree 0
	queue := []int{}
	for i := 0; i < n; i++ {
		if inDegree[i] == 0 {
			queue = append(queue, i)
		}
	}

	result := []int{}

	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		result = append(result, node)

		for _, neighbor := range graph[node] {
			inDegree[neighbor]--
			if inDegree[neighbor] == 0 {
				queue = append(queue, neighbor)
			}
		}
	}

	// If not all nodes are processed, cycle exists
	if len(result) != n {
		return []int{}
	}
	return result
}

// topologicalSortDFS performs topological sort using DFS
func topologicalSortDFS(n int, edges [][]int) []int {
	graph := make([][]int, n)
	for i := range graph {
		graph[i] = []int{}
	}
	for _, edge := range edges {
		graph[edge[0]] = append(graph[edge[0]], edge[1])
	}

	color := make([]int, n) // 0: white, 1: gray, 2: black
	result := []int{}
	hasCycle := false

	var dfs func(node int)
	dfs = func(node int) {
		if hasCycle {
			return
		}

		color[node] = 1 // Mark as visiting

		for _, neighbor := range graph[node] {
			if color[neighbor] == 1 { // Back edge -> cycle
				hasCycle = true
				return
			}
			if color[neighbor] == 0 {
				dfs(neighbor)
			}
		}

		color[node] = 2 // Mark as visited
		result = append(result, node)
	}

	for i := 0; i < n; i++ {
		if color[i] == 0 {
			dfs(i)
			if hasCycle {
				return []int{}
			}
		}
	}

	// Reverse result
	for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
		result[i], result[j] = result[j], result[i]
	}
	return result
}

// isValidTopologicalOrder verifies if the given order is valid
func isValidTopologicalOrder(n int, edges [][]int, order []int) bool {
	if len(order) != n {
		return false
	}

	position := make(map[int]int)
	for i, node := range order {
		position[node] = i
	}

	for _, edge := range edges {
		if position[edge[0]] > position[edge[1]] {
			return false
		}
	}
	return true
}

func main() {
	// Test 1: Basic DAG
	edges1 := [][]int{{5, 2}, {5, 0}, {4, 0}, {4, 1}, {2, 3}, {3, 1}}
	result1Kahn := topologicalSortKahn(6, edges1)
	result1DFS := topologicalSortDFS(6, edges1)
	fmt.Printf("Test 1 (Kahn): %v\n", result1Kahn)
	fmt.Printf("Test 1 (DFS):  %v\n", result1DFS)

	// Test 2: Cycle detection
	edges2 := [][]int{{1, 0}, {0, 1}}
	result2 := topologicalSortKahn(2, edges2)
	fmt.Printf("Test 2 (Cycle): %v\n", result2)

	// Test 3: Linear chain
	edges3 := [][]int{{0, 1}, {1, 2}, {2, 3}}
	result3 := topologicalSortKahn(4, edges3)
	fmt.Printf("Test 3 (Linear): %v\n", result3)

	// Test 4: No edges
	result4 := topologicalSortKahn(3, [][]int{})
	fmt.Printf("Test 4 (No edges): %v\n", result4)

	// Test 5: Single node
	result5 := topologicalSortKahn(1, [][]int{})
	fmt.Printf("Test 5 (Single): %v\n", result5)

	fmt.Println("\nAll tests completed!")
}
