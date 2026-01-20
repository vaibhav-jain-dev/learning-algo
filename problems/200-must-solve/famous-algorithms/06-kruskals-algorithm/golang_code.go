/*
Kruskal's Algorithm - Minimum Spanning Tree - Go Solution

Find the minimum spanning tree of a connected, undirected, weighted graph.

Time Complexity: O(E log E)
Space Complexity: O(V)
*/

package main

import (
	"fmt"
	"sort"
)

// Edge represents a weighted edge
type Edge struct {
	U, V, Weight int
}

// UnionFind with path compression and union by rank
type UnionFind struct {
	parent []int
	rank   []int
}

// NewUnionFind creates a new UnionFind with n elements
func NewUnionFind(n int) *UnionFind {
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}
	return &UnionFind{parent: parent, rank: make([]int, n)}
}

// Find returns the root with path compression
func (uf *UnionFind) Find(x int) int {
	if uf.parent[x] != x {
		uf.parent[x] = uf.Find(uf.parent[x])
	}
	return uf.parent[x]
}

// Union merges two sets and returns true if successful
func (uf *UnionFind) Union(x, y int) bool {
	rootX := uf.Find(x)
	rootY := uf.Find(y)

	if rootX == rootY {
		return false
	}

	if uf.rank[rootX] < uf.rank[rootY] {
		rootX, rootY = rootY, rootX
	}

	uf.parent[rootY] = rootX

	if uf.rank[rootX] == uf.rank[rootY] {
		uf.rank[rootX]++
	}

	return true
}

// MSTResult holds the MST edges and total weight
type MSTResult struct {
	Edges       []Edge
	TotalWeight int
}

// kruskalMST finds minimum spanning tree using Kruskal's algorithm
func kruskalMST(v int, edges []Edge) MSTResult {
	// Sort edges by weight
	sortedEdges := make([]Edge, len(edges))
	copy(sortedEdges, edges)
	sort.Slice(sortedEdges, func(i, j int) bool {
		return sortedEdges[i].Weight < sortedEdges[j].Weight
	})

	uf := NewUnionFind(v)
	mst := []Edge{}
	totalWeight := 0

	for _, edge := range sortedEdges {
		if uf.Union(edge.U, edge.V) {
			mst = append(mst, edge)
			totalWeight += edge.Weight

			// MST has exactly V-1 edges
			if len(mst) == v-1 {
				break
			}
		}
	}

	return MSTResult{Edges: mst, TotalWeight: totalWeight}
}

// minSpanningTreeWeight returns only the total weight
func minSpanningTreeWeight(v int, edges []Edge) int {
	return kruskalMST(v, edges).TotalWeight
}

func main() {
	// Test 1: Basic MST
	edges1 := []Edge{{0, 1, 10}, {0, 2, 6}, {0, 3, 5}, {1, 3, 15}, {2, 3, 4}}
	result1 := kruskalMST(4, edges1)
	fmt.Printf("Test 1: MST edges = %v, Total weight = %d\n", result1.Edges, result1.TotalWeight)

	// Test 2: Simple triangle
	edges2 := []Edge{{0, 1, 1}, {1, 2, 2}, {0, 2, 3}}
	result2 := kruskalMST(3, edges2)
	fmt.Printf("Test 2: MST edges = %v, Total weight = %d\n", result2.Edges, result2.TotalWeight)

	// Test 3: Linear graph
	edges3 := []Edge{{0, 1, 5}, {1, 2, 3}, {2, 3, 4}}
	result3 := kruskalMST(4, edges3)
	fmt.Printf("Test 3: MST edges = %v, Total weight = %d\n", result3.Edges, result3.TotalWeight)

	// Test 4: Two vertices
	edges4 := []Edge{{0, 1, 7}}
	result4 := kruskalMST(2, edges4)
	fmt.Printf("Test 4: MST edges = %v, Total weight = %d\n", result4.Edges, result4.TotalWeight)

	// Test 5: Complete graph K4
	edges5 := []Edge{{0, 1, 1}, {0, 2, 2}, {0, 3, 3}, {1, 2, 4}, {1, 3, 5}, {2, 3, 6}}
	result5 := kruskalMST(4, edges5)
	fmt.Printf("Test 5: MST edges = %v, Total weight = %d\n", result5.Edges, result5.TotalWeight)

	fmt.Println("\nAll tests completed!")
}
