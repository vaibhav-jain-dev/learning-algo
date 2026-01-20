/*
All Ancestors of a Node in a DAG - Go Solutions

Find all ancestors for each node in a Directed Acyclic Graph.
An ancestor of node v is any node u that can reach v.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"sort"
)

// ============================================================================
// APPROACH 1: Topological Sort + Set Propagation
// ============================================================================
// Time Complexity:  O(n^2 + n*E) - propagating sets
// Space Complexity: O(n^2) for ancestor sets
//
// WHY THIS IS BEST:
// - Process nodes in dependency order
// - Each node inherits all ancestors from parents
// - Natural for DAG problems
// ============================================================================

// GetAncestorsTopo finds ancestors using topological sort.
func GetAncestorsTopo(n int, edges [][]int) [][]int {
	// Build graph and in-degree
	parents := make([][]int, n)   // parents[child] = list of parents
	children := make([][]int, n)  // children[parent] = list of children
	inDegree := make([]int, n)

	for i := range parents {
		parents[i] = []int{}
		children[i] = []int{}
	}

	for _, edge := range edges {
		parent, child := edge[0], edge[1]
		parents[child] = append(parents[child], parent)
		children[parent] = append(children[parent], child)
		inDegree[child]++
	}

	// Topological sort using Kahn's algorithm
	queue := []int{}
	for i := 0; i < n; i++ {
		if inDegree[i] == 0 {
			queue = append(queue, i)
		}
	}

	topoOrder := []int{}
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		topoOrder = append(topoOrder, node)

		for _, child := range children[node] {
			inDegree[child]--
			if inDegree[child] == 0 {
				queue = append(queue, child)
			}
		}
	}

	// Propagate ancestors in topological order
	ancestors := make([]map[int]bool, n)
	for i := range ancestors {
		ancestors[i] = make(map[int]bool)
	}

	for _, node := range topoOrder {
		for _, parent := range parents[node] {
			ancestors[node][parent] = true
			for anc := range ancestors[parent] {
				ancestors[node][anc] = true
			}
		}
	}

	// Convert to sorted slices
	result := make([][]int, n)
	for i := 0; i < n; i++ {
		result[i] = make([]int, 0, len(ancestors[i]))
		for anc := range ancestors[i] {
			result[i] = append(result[i], anc)
		}
		sort.Ints(result[i])
	}

	return result
}

// ============================================================================
// APPROACH 2: Reverse Graph DFS
// ============================================================================
// Time Complexity:  O(n * (V + E))
// Space Complexity: O(V + E) for reverse graph
//
// WHEN TO USE:
// - When you need ancestors for specific nodes
// - Simpler to understand
// ============================================================================

// GetAncestorsDFS finds ancestors by DFS in reverse graph.
func GetAncestorsDFS(n int, edges [][]int) [][]int {
	// Build reverse graph
	reverseGraph := make([][]int, n)
	for i := range reverseGraph {
		reverseGraph[i] = []int{}
	}

	for _, edge := range edges {
		parent, child := edge[0], edge[1]
		reverseGraph[child] = append(reverseGraph[child], parent)
	}

	var findAncestors func(node int, visited map[int]bool)
	findAncestors = func(node int, visited map[int]bool) {
		for _, parent := range reverseGraph[node] {
			if !visited[parent] {
				visited[parent] = true
				findAncestors(parent, visited)
			}
		}
	}

	result := make([][]int, n)
	for node := 0; node < n; node++ {
		visited := make(map[int]bool)
		findAncestors(node, visited)

		result[node] = make([]int, 0, len(visited))
		for anc := range visited {
			result[node] = append(result[node], anc)
		}
		sort.Ints(result[node])
	}

	return result
}

// ============================================================================
// APPROACH 3: BFS from Each Source
// ============================================================================
// Time Complexity:  O(n * (V + E))
// Space Complexity: O(V + E)
//
// ALTERNATIVE VIEW:
// - Instead of finding what reaches each node
// - Find what each node can reach, then invert
// ============================================================================

// GetAncestorsBFS finds ancestors using BFS from each source.
func GetAncestorsBFS(n int, edges [][]int) [][]int {
	// Build graph
	graph := make([][]int, n)
	for i := range graph {
		graph[i] = []int{}
	}

	for _, edge := range edges {
		parent, child := edge[0], edge[1]
		graph[parent] = append(graph[parent], child)
	}

	// For each node, find all nodes it can reach
	ancestors := make([]map[int]bool, n)
	for i := range ancestors {
		ancestors[i] = make(map[int]bool)
	}

	for start := 0; start < n; start++ {
		visited := make(map[int]bool)
		queue := []int{start}

		for len(queue) > 0 {
			node := queue[0]
			queue = queue[1:]

			for _, child := range graph[node] {
				if !visited[child] {
					visited[child] = true
					ancestors[child][start] = true
					queue = append(queue, child)
				}
			}
		}
	}

	// Convert to sorted slices
	result := make([][]int, n)
	for i := 0; i < n; i++ {
		result[i] = make([]int, 0, len(ancestors[i]))
		for anc := range ancestors[i] {
			result[i] = append(result[i], anc)
		}
		sort.Ints(result[i])
	}

	return result
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		n        int
		edges    [][]int
		expected [][]int
		desc     string
	}{
		{
			8,
			[][]int{{0, 3}, {0, 4}, {1, 3}, {2, 4}, {2, 7}, {3, 5}, {3, 6}, {3, 7}, {4, 6}},
			[][]int{{}, {}, {}, {0, 1}, {0, 2}, {0, 1, 3}, {0, 1, 2, 3, 4}, {0, 1, 2, 3}},
			"Complex DAG",
		},
		{
			5,
			[][]int{{0, 1}, {0, 2}, {0, 3}, {0, 4}, {1, 2}, {1, 3}, {1, 4}, {2, 3}, {2, 4}, {3, 4}},
			[][]int{{}, {0}, {0, 1}, {0, 1, 2}, {0, 1, 2, 3}},
			"Linear chain with extra edges",
		},
		{
			3,
			[][]int{{0, 1}, {1, 2}},
			[][]int{{}, {0}, {0, 1}},
			"Simple chain",
		},
		{
			3,
			[][]int{},
			[][]int{{}, {}, {}},
			"No edges",
		},
	}

	fmt.Println("======================================================================")
	fmt.Println("ALL ANCESTORS IN DAG - TEST RESULTS")
	fmt.Println("======================================================================")

	// Test Topological Sort approach
	fmt.Println("\nApproach 1: Topological Sort")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		result := GetAncestorsTopo(tc.n, tc.edges)
		status := "PASS"
		if !slicesEqual(result, tc.expected) {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s\n", status, tc.desc)
	}

	// Test DFS approach
	fmt.Println("\nApproach 2: Reverse Graph DFS")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		result := GetAncestorsDFS(tc.n, tc.edges)
		status := "PASS"
		if !slicesEqual(result, tc.expected) {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s\n", status, tc.desc)
	}

	// Test BFS approach
	fmt.Println("\nApproach 3: BFS from Sources")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		result := GetAncestorsBFS(tc.n, tc.edges)
		status := "PASS"
		if !slicesEqual(result, tc.expected) {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s\n", status, tc.desc)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE INPUT EXAMPLES")
	fmt.Println("======================================================================")

	fmt.Println("\nExample 1:")
	fmt.Println("  n = 8")
	fmt.Println("  edges = [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]")
	result := GetAncestorsTopo(8, [][]int{{0, 3}, {0, 4}, {1, 3}, {2, 4}, {2, 7}, {3, 5}, {3, 6}, {3, 7}, {4, 6}})
	fmt.Printf("  Output: %v\n", result)

	fmt.Println("\nAll tests completed!")
}

func slicesEqual(a, b [][]int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if len(a[i]) != len(b[i]) {
			return false
		}
		for j := range a[i] {
			if a[i][j] != b[i][j] {
				return false
			}
		}
	}
	return true
}
