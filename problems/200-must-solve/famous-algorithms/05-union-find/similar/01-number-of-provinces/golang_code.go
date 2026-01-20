/*
Number of Provinces - Go Solution

Time Complexity: O(n^2 * alpha(n))
Space Complexity: O(n)
*/

package main

import "fmt"

type UnionFind struct {
	parent []int
	rank   []int
	count  int
}

func NewUnionFind(n int) *UnionFind {
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}
	return &UnionFind{parent: parent, rank: make([]int, n), count: n}
}

func (uf *UnionFind) Find(x int) int {
	if uf.parent[x] != x {
		uf.parent[x] = uf.Find(uf.parent[x])
	}
	return uf.parent[x]
}

func (uf *UnionFind) Union(x, y int) {
	px, py := uf.Find(x), uf.Find(y)
	if px == py {
		return
	}
	if uf.rank[px] < uf.rank[py] {
		px, py = py, px
	}
	uf.parent[py] = px
	if uf.rank[px] == uf.rank[py] {
		uf.rank[px]++
	}
	uf.count--
}

func findCircleNum(isConnected [][]int) int {
	n := len(isConnected)
	uf := NewUnionFind(n)

	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if isConnected[i][j] == 1 {
				uf.Union(i, j)
			}
		}
	}

	return uf.count
}

func main() {
	fmt.Printf("Test 1: %d\n", findCircleNum([][]int{{1,1,0},{1,1,0},{0,0,1}})) // Expected: 2
	fmt.Printf("Test 2: %d\n", findCircleNum([][]int{{1,0,0},{0,1,0},{0,0,1}})) // Expected: 3
	fmt.Printf("Test 3: %d\n", findCircleNum([][]int{{1,1,1},{1,1,1},{1,1,1}})) // Expected: 1
	fmt.Println("\nAll tests completed!")
}
