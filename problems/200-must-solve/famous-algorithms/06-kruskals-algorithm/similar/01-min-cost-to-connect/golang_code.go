/*
Min Cost to Connect All Points - Go Solution

Time Complexity: O(n^2 log n)
Space Complexity: O(n^2)
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

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func minCostConnectPoints(points [][]int) int {
	n := len(points)
	if n <= 1 {
		return 0
	}

	// Generate edges
	type Edge struct {
		dist, u, v int
	}
	edges := []Edge{}

	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			dist := abs(points[i][0]-points[j][0]) + abs(points[i][1]-points[j][1])
			edges = append(edges, Edge{dist, i, j})
		}
	}

	sort.Slice(edges, func(i, j int) bool {
		return edges[i].dist < edges[j].dist
	})

	uf := NewUnionFind(n)
	totalCost := 0
	edgesUsed := 0

	for _, e := range edges {
		if uf.Union(e.u, e.v) {
			totalCost += e.dist
			edgesUsed++
			if edgesUsed == n-1 {
				break
			}
		}
	}

	return totalCost
}

func main() {
	fmt.Printf("Test 1: %d\n", minCostConnectPoints([][]int{{0,0},{2,2},{3,10},{5,2},{7,0}})) // Expected: 20
	fmt.Printf("Test 2: %d\n", minCostConnectPoints([][]int{{3,12},{-2,5},{-4,1}}))           // Expected: 18
	fmt.Printf("Test 3: %d\n", minCostConnectPoints([][]int{{0,0}}))                          // Expected: 0
	fmt.Println("\nAll tests completed!")
}
