/*
Optimize Water Distribution in a Village - Go Solution

Time Complexity: O((n + E) log(n + E))
Space Complexity: O(n + E)
*/

package main

import (
	"fmt"
	"sort"
)

type UnionFind struct {
	parent, rank []int
}

func NewUnionFind(n int) *UnionFind {
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}
	return &UnionFind{parent: parent, rank: make([]int, n)}
}

func (uf *UnionFind) Find(x int) int {
	if uf.parent[x] != x {
		uf.parent[x] = uf.Find(uf.parent[x])
	}
	return uf.parent[x]
}

func (uf *UnionFind) Union(x, y int) bool {
	px, py := uf.Find(x), uf.Find(y)
	if px == py {
		return false
	}
	if uf.rank[px] < uf.rank[py] {
		px, py = py, px
	}
	uf.parent[py] = px
	if uf.rank[px] == uf.rank[py] {
		uf.rank[px]++
	}
	return true
}

func minCostToSupplyWater(n int, wells []int, pipes [][]int) int {
	type Edge struct {
		cost, u, v int
	}
	edges := []Edge{}

	// Add virtual node 0 connected to each house
	for i, cost := range wells {
		edges = append(edges, Edge{cost, 0, i + 1})
	}

	for _, pipe := range pipes {
		edges = append(edges, Edge{pipe[2], pipe[0], pipe[1]})
	}

	sort.Slice(edges, func(i, j int) bool {
		return edges[i].cost < edges[j].cost
	})

	uf := NewUnionFind(n + 1)
	totalCost := 0
	edgesUsed := 0

	for _, e := range edges {
		if uf.Union(e.u, e.v) {
			totalCost += e.cost
			edgesUsed++
			if edgesUsed == n {
				break
			}
		}
	}

	return totalCost
}

func main() {
	fmt.Printf("Test 1: %d\n", minCostToSupplyWater(3, []int{1, 2, 2}, [][]int{{1, 2, 1}, {2, 3, 1}})) // Expected: 3
	fmt.Printf("Test 2: %d\n", minCostToSupplyWater(2, []int{1, 1}, [][]int{{1, 2, 1}}))              // Expected: 2
	fmt.Println("\nAll tests completed!")
}
