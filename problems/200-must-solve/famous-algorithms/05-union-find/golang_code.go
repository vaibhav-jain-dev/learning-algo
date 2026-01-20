/*
Union-Find (Disjoint Set Union) - Go Solution

Efficiently manage disjoint sets with path compression and union by rank.

Time Complexity: O(alpha(n)) per operation (nearly constant)
Space Complexity: O(n)
*/

package main

import "fmt"

// UnionFind implements the disjoint set union data structure
type UnionFind struct {
	parent []int
	rank   []int
	count  int
}

// NewUnionFind creates a new UnionFind with n elements
func NewUnionFind(n int) *UnionFind {
	parent := make([]int, n)
	rank := make([]int, n)
	for i := 0; i < n; i++ {
		parent[i] = i
	}
	return &UnionFind{parent: parent, rank: rank, count: n}
}

// Find returns the root of the set containing x with path compression
func (uf *UnionFind) Find(x int) int {
	if uf.parent[x] != x {
		uf.parent[x] = uf.Find(uf.parent[x]) // Path compression
	}
	return uf.parent[x]
}

// Union merges the sets containing x and y
func (uf *UnionFind) Union(x, y int) bool {
	rootX := uf.Find(x)
	rootY := uf.Find(y)

	if rootX == rootY {
		return false // Already in same set
	}

	// Union by rank
	if uf.rank[rootX] < uf.rank[rootY] {
		rootX, rootY = rootY, rootX
	}

	uf.parent[rootY] = rootX

	if uf.rank[rootX] == uf.rank[rootY] {
		uf.rank[rootX]++
	}

	uf.count--
	return true
}

// Connected checks if x and y are in the same set
func (uf *UnionFind) Connected(x, y int) bool {
	return uf.Find(x) == uf.Find(y)
}

// GetCount returns the number of disjoint sets
func (uf *UnionFind) GetCount() int {
	return uf.count
}

// UnionFindBySize uses union by size instead of rank
type UnionFindBySize struct {
	parent []int
	size   []int
}

// NewUnionFindBySize creates a new UnionFindBySize with n elements
func NewUnionFindBySize(n int) *UnionFindBySize {
	parent := make([]int, n)
	size := make([]int, n)
	for i := 0; i < n; i++ {
		parent[i] = i
		size[i] = 1
	}
	return &UnionFindBySize{parent: parent, size: size}
}

// Find returns the root with path compression
func (ufs *UnionFindBySize) Find(x int) int {
	if ufs.parent[x] != x {
		ufs.parent[x] = ufs.Find(ufs.parent[x])
	}
	return ufs.parent[x]
}

// Union merges sets by size
func (ufs *UnionFindBySize) Union(x, y int) bool {
	rootX := ufs.Find(x)
	rootY := ufs.Find(y)

	if rootX == rootY {
		return false
	}

	if ufs.size[rootX] < ufs.size[rootY] {
		rootX, rootY = rootY, rootX
	}

	ufs.parent[rootY] = rootX
	ufs.size[rootX] += ufs.size[rootY]
	return true
}

// GetSize returns the size of the set containing x
func (ufs *UnionFindBySize) GetSize(x int) int {
	return ufs.size[ufs.Find(x)]
}

func main() {
	// Test 1: Basic operations
	uf := NewUnionFind(5)
	uf.Union(0, 1)
	uf.Union(2, 3)
	fmt.Printf("Test 1a: 0 and 1 connected? %v\n", uf.Connected(0, 1)) // true
	fmt.Printf("Test 1b: 0 and 2 connected? %v\n", uf.Connected(0, 2)) // false
	fmt.Printf("Test 1c: Count of sets: %d\n", uf.GetCount())          // 3

	uf.Union(1, 3)
	fmt.Printf("Test 1d: 0 and 3 connected? %v\n", uf.Connected(0, 3)) // true
	fmt.Printf("Test 1e: Count of sets: %d\n", uf.GetCount())          // 2

	// Test 2: Union by size
	ufs := NewUnionFindBySize(5)
	ufs.Union(0, 1)
	ufs.Union(2, 3)
	ufs.Union(0, 2)
	fmt.Printf("Test 2: Size of set containing 0: %d\n", ufs.GetSize(0)) // 4

	// Test 3: Self-union
	uf3 := NewUnionFind(3)
	result := uf3.Union(0, 0)
	fmt.Printf("Test 3: Self-union returns: %v\n", result) // false

	// Test 4: Repeated union
	uf4 := NewUnionFind(3)
	uf4.Union(0, 1)
	result = uf4.Union(0, 1)
	fmt.Printf("Test 4: Repeated union returns: %v\n", result) // false

	fmt.Println("\nAll tests completed!")
}
