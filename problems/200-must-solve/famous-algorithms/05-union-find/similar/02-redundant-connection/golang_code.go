/*
Redundant Connection - Go Solution

Time Complexity: O(n * alpha(n))
Space Complexity: O(n)
*/

package main

import "fmt"

type UnionFind struct {
	parent []int
	rank   []int
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

func findRedundantConnection(edges [][]int) []int {
	n := len(edges)
	uf := NewUnionFind(n)

	for _, edge := range edges {
		if !uf.Union(edge[0], edge[1]) {
			return edge
		}
	}

	return []int{}
}

func main() {
	fmt.Printf("Test 1: %v\n", findRedundantConnection([][]int{{1,2},{1,3},{2,3}})) // Expected: [2,3]
	fmt.Printf("Test 2: %v\n", findRedundantConnection([][]int{{1,2},{2,3},{3,4},{1,4},{1,5}})) // Expected: [1,4]
	fmt.Println("\nAll tests completed!")
}
