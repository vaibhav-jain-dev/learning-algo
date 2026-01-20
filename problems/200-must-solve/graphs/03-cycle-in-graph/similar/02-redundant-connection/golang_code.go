/*
Redundant Connection - Go Solutions

Find the edge that creates a cycle in an undirected graph.
The graph started as a tree with one extra edge added.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: Union-Find with Path Compression and Union by Rank
// ============================================================================
// Time Complexity:  O(n * alpha(n)) where alpha is inverse Ackermann ~ O(n)
// Space Complexity: O(n) for parent and rank arrays
//
// WHY THIS IS BEST:
// - Nearly constant time per operation
// - Elegantly detects cycles by checking if nodes already connected
// - Standard approach for dynamic connectivity problems
// ============================================================================

// UnionFind data structure with path compression and union by rank
type UnionFind struct {
	parent []int
	rank   []int
}

// NewUnionFind creates a new UnionFind with n+1 elements (1-indexed)
func NewUnionFind(n int) *UnionFind {
	parent := make([]int, n+1)
	for i := range parent {
		parent[i] = i
	}
	return &UnionFind{
		parent: parent,
		rank:   make([]int, n+1),
	}
}

// Find returns root of component with path compression
func (uf *UnionFind) Find(x int) int {
	if uf.parent[x] != x {
		uf.parent[x] = uf.Find(uf.parent[x])
	}
	return uf.parent[x]
}

// Union merges two components. Returns false if already connected (cycle).
func (uf *UnionFind) Union(x, y int) bool {
	rootX, rootY := uf.Find(x), uf.Find(y)

	if rootX == rootY {
		return false // Already connected - cycle!
	}

	// Union by rank
	if uf.rank[rootX] < uf.rank[rootY] {
		uf.parent[rootX] = rootY
	} else if uf.rank[rootX] > uf.rank[rootY] {
		uf.parent[rootY] = rootX
	} else {
		uf.parent[rootY] = rootX
		uf.rank[rootX]++
	}

	return true
}

// FindRedundantConnection finds the edge creating a cycle using Union-Find.
//
// Key insight: Process edges in order. The first edge where both
// endpoints are already in the same component creates the cycle.
func FindRedundantConnection(edges [][]int) []int {
	n := len(edges)
	uf := NewUnionFind(n)

	for _, edge := range edges {
		u, v := edge[0], edge[1]
		if !uf.Union(u, v) {
			return []int{u, v}
		}
	}

	return nil // Should never reach here
}

// ============================================================================
// APPROACH 2: DFS Cycle Detection (Educational)
// ============================================================================
// Time Complexity:  O(n^2) - DFS for each edge
// Space Complexity: O(n) for adjacency list and visited map
//
// EDUCATIONAL VALUE:
// - Shows how to detect cycles using DFS
// - Builds graph incrementally and checks connectivity
// ============================================================================

// FindRedundantConnectionDFS finds redundant edge using DFS path check.
func FindRedundantConnectionDFS(edges [][]int) []int {
	graph := make(map[int][]int)

	var hasPath func(source, target int, visited map[int]bool) bool
	hasPath = func(source, target int, visited map[int]bool) bool {
		if source == target {
			return true
		}

		visited[source] = true
		for _, neighbor := range graph[source] {
			if !visited[neighbor] {
				if hasPath(neighbor, target, visited) {
					return true
				}
			}
		}
		return false
	}

	for _, edge := range edges {
		u, v := edge[0], edge[1]

		// Check if u and v are already connected
		if len(graph[u]) > 0 && len(graph[v]) > 0 {
			if hasPath(u, v, make(map[int]bool)) {
				return []int{u, v}
			}
		}

		// Add edge to graph
		graph[u] = append(graph[u], v)
		graph[v] = append(graph[v], u)
	}

	return nil
}

// ============================================================================
// APPROACH 3: Union-Find (Simpler Implementation)
// ============================================================================
// Time Complexity:  O(n * alpha(n))
// Space Complexity: O(n)
//
// SIMPLER VERSION:
// - Inline implementation without struct
// - More compact code
// ============================================================================

// FindRedundantConnectionSimple uses inline Union-Find without struct.
func FindRedundantConnectionSimple(edges [][]int) []int {
	n := len(edges)
	parent := make([]int, n+1)
	for i := range parent {
		parent[i] = i
	}

	var find func(x int) int
	find = func(x int) int {
		if parent[x] != x {
			parent[x] = find(parent[x])
		}
		return parent[x]
	}

	for _, edge := range edges {
		u, v := edge[0], edge[1]
		rootU, rootV := find(u), find(v)

		if rootU == rootV {
			return []int{u, v}
		}

		parent[rootU] = rootV
	}

	return nil
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		edges    [][]int
		expected []int
		desc     string
	}{
		{[][]int{{1, 2}, {1, 3}, {2, 3}}, []int{2, 3}, "Triangle"},
		{[][]int{{1, 2}, {2, 3}, {3, 4}, {1, 4}, {1, 5}}, []int{1, 4}, "Square with tail"},
		{[][]int{{1, 2}, {2, 3}, {1, 3}}, []int{1, 3}, "Simple triangle"},
		{[][]int{{1, 2}, {1, 3}, {1, 4}, {3, 4}}, []int{3, 4}, "Star with extra edge"},
		{[][]int{{1, 2}, {2, 3}, {3, 4}, {4, 5}, {1, 5}}, []int{1, 5}, "Pentagon"},
	}

	fmt.Println("======================================================================")
	fmt.Println("REDUNDANT CONNECTION - TEST RESULTS")
	fmt.Println("======================================================================")

	// Test Union-Find approach
	fmt.Println("\nApproach 1: Union-Find Optimized")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		edges := copyEdges(tc.edges)
		result := FindRedundantConnection(edges)
		status := "PASS"
		if !sliceEqual(result, tc.expected) {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %v, expected %v\n", status, tc.desc, result, tc.expected)
	}

	// Test DFS approach
	fmt.Println("\nApproach 2: DFS Path Check")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		edges := copyEdges(tc.edges)
		result := FindRedundantConnectionDFS(edges)
		status := "PASS"
		if !sliceEqual(result, tc.expected) {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %v, expected %v\n", status, tc.desc, result, tc.expected)
	}

	// Test Simple approach
	fmt.Println("\nApproach 3: Union-Find Simple")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		edges := copyEdges(tc.edges)
		result := FindRedundantConnectionSimple(edges)
		status := "PASS"
		if !sliceEqual(result, tc.expected) {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %v, expected %v\n", status, tc.desc, result, tc.expected)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE INPUT EXAMPLES")
	fmt.Println("======================================================================")

	// Example 1
	fmt.Println("\nExample 1:")
	edges1 := [][]int{{1, 2}, {1, 3}, {2, 3}}
	fmt.Printf("  Input: edges = %v\n", edges1)
	result := FindRedundantConnection(edges1)
	fmt.Printf("  Output: %v\n", result)
	fmt.Println("  Explanation: Removing [2,3] leaves a valid tree: 1-2, 1-3")

	// Example 2
	fmt.Println("\nExample 2:")
	edges2 := [][]int{{1, 2}, {2, 3}, {3, 4}, {1, 4}, {1, 5}}
	fmt.Printf("  Input: edges = %v\n", edges2)
	result = FindRedundantConnection(edges2)
	fmt.Printf("  Output: %v\n", result)
	fmt.Println("  Explanation: Removing [1,4] leaves a valid tree")

	fmt.Println("\nAll tests completed!")
}

// Helper functions
func copyEdges(edges [][]int) [][]int {
	result := make([][]int, len(edges))
	for i, edge := range edges {
		result[i] = []int{edge[0], edge[1]}
	}
	return result
}

func sliceEqual(a, b []int) bool {
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
