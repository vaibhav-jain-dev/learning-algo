/*
Connecting Cities With Minimum Cost - Go Solution

Time Complexity: O(E log E)
Space Complexity: O(n)
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
	parent := make([]int, n+1)
	for i := range parent {
		parent[i] = i
	}
	return &UnionFind{parent: parent, rank: make([]int, n+1)}
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

func minimumCost(n int, connections [][]int) int {
	sort.Slice(connections, func(i, j int) bool {
		return connections[i][2] < connections[j][2]
	})

	uf := NewUnionFind(n)
	totalCost := 0
	edgesUsed := 0

	for _, conn := range connections {
		if uf.Union(conn[0], conn[1]) {
			totalCost += conn[2]
			edgesUsed++
			if edgesUsed == n-1 {
				return totalCost
			}
		}
	}

	return -1
}

func main() {
	fmt.Printf("Test 1: %d\n", minimumCost(3, [][]int{{1,2,5},{1,3,6},{2,3,1}})) // Expected: 6
	fmt.Printf("Test 2: %d\n", minimumCost(4, [][]int{{1,2,3},{3,4,4}}))          // Expected: -1
	fmt.Printf("Test 3: %d\n", minimumCost(4, [][]int{{1,2,1},{1,3,2},{3,4,3},{2,4,4}})) // Expected: 6
	fmt.Println("\nAll tests completed!")
}
