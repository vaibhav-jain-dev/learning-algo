/*
Largest Island (Making A Large Island) - Go Solution

Find the largest island after changing at most one 0 to 1.
Uses DFS for island labeling or Union-Find for efficient connectivity.

Time Complexity: O(n^2) for both approaches
Space Complexity: O(n^2) for island labels or Union-Find structures
*/

package main

import "fmt"

// Directions for 4-connectivity (up, down, left, right)
var directions = [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}

// LargestIslandDFS finds the largest island after flipping one 0 using DFS
func LargestIslandDFS(grid [][]int) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return 0
	}

	n := len(grid)
	islandID := 2 // Start from 2 to distinguish from 0 and 1
	islandSizes := make(map[int]int)

	// DFS to label island cells and count size
	var dfs func(row, col, label int) int
	dfs = func(row, col, label int) int {
		if row < 0 || row >= n || col < 0 || col >= n || grid[row][col] != 1 {
			return 0
		}

		grid[row][col] = label // Mark with island ID
		size := 1

		for _, dir := range directions {
			size += dfs(row+dir[0], col+dir[1], label)
		}

		return size
	}

	// First pass: Label all islands and compute sizes
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == 1 {
				size := dfs(i, j, islandID)
				islandSizes[islandID] = size
				islandID++
			}
		}
	}

	// Edge case: no islands exist
	if len(islandSizes) == 0 {
		return 1 // Can flip one 0 to 1
	}

	// Find max existing island size
	maxSize := 0
	for _, size := range islandSizes {
		if size > maxSize {
			maxSize = size
		}
	}

	hasZero := false

	// Second pass: Check each 0 cell
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == 0 {
				hasZero = true
				// Find unique adjacent islands
				adjacentIslands := make(map[int]bool)

				for _, dir := range directions {
					ni, nj := i+dir[0], j+dir[1]
					if ni >= 0 && ni < n && nj >= 0 && nj < n && grid[ni][nj] > 1 {
						adjacentIslands[grid[ni][nj]] = true
					}
				}

				// Calculate potential island size
				potentialSize := 1 // The flipped cell itself
				for island := range adjacentIslands {
					potentialSize += islandSizes[island]
				}

				if potentialSize > maxSize {
					maxSize = potentialSize
				}
			}
		}
	}

	// If no zeros, return largest existing island
	if !hasZero {
		return maxSize
	}

	return maxSize
}

// UnionFind data structure
type UnionFind struct {
	parent []int
	rank   []int
	size   []int
}

// NewUnionFind creates a new Union-Find structure
func NewUnionFind(n int) *UnionFind {
	parent := make([]int, n)
	rank := make([]int, n)
	size := make([]int, n)

	for i := 0; i < n; i++ {
		parent[i] = i
		size[i] = 1
	}

	return &UnionFind{parent: parent, rank: rank, size: size}
}

// Find returns the root with path compression
func (uf *UnionFind) Find(x int) int {
	if uf.parent[x] != x {
		uf.parent[x] = uf.Find(uf.parent[x])
	}
	return uf.parent[x]
}

// Union merges two sets by rank, returns true if merge happened
func (uf *UnionFind) Union(x, y int) bool {
	px, py := uf.Find(x), uf.Find(y)
	if px == py {
		return false
	}

	// Union by rank
	if uf.rank[px] < uf.rank[py] {
		px, py = py, px
	}

	uf.parent[py] = px
	uf.size[px] += uf.size[py]

	if uf.rank[px] == uf.rank[py] {
		uf.rank[px]++
	}

	return true
}

// GetSize returns the size of component containing x
func (uf *UnionFind) GetSize(x int) int {
	return uf.size[uf.Find(x)]
}

// LargestIslandUnionFind finds the largest island using Union-Find
func LargestIslandUnionFind(grid [][]int) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return 0
	}

	n := len(grid)
	uf := NewUnionFind(n * n)

	// Helper to convert 2D to 1D index
	index := func(row, col int) int {
		return row*n + col
	}

	// First pass: Union adjacent 1s
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == 1 {
				for _, dir := range directions {
					ni, nj := i+dir[0], j+dir[1]
					if ni >= 0 && ni < n && nj >= 0 && nj < n && grid[ni][nj] == 1 {
						uf.Union(index(i, j), index(ni, nj))
					}
				}
			}
		}
	}

	// Find max existing island size
	maxSize := 0
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == 1 {
				size := uf.GetSize(index(i, j))
				if size > maxSize {
					maxSize = size
				}
			}
		}
	}

	hasZero := false

	// Second pass: Check each 0 cell
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == 0 {
				hasZero = true
				// Find unique adjacent island roots
				adjacentRoots := make(map[int]bool)

				for _, dir := range directions {
					ni, nj := i+dir[0], j+dir[1]
					if ni >= 0 && ni < n && nj >= 0 && nj < n && grid[ni][nj] == 1 {
						adjacentRoots[uf.Find(index(ni, nj))] = true
					}
				}

				// Calculate potential size
				potentialSize := 1 // The flipped cell
				for root := range adjacentRoots {
					potentialSize += uf.size[root]
				}

				if potentialSize > maxSize {
					maxSize = potentialSize
				}
			}
		}
	}

	// Handle edge cases
	if maxSize == 0 {
		return 1 // No islands, flip one 0
	}
	if !hasZero {
		return maxSize // No zeros to flip
	}

	return maxSize
}

// copyGrid creates a deep copy of a 2D grid
func copyGrid(grid [][]int) [][]int {
	n := len(grid)
	copy := make([][]int, n)
	for i := range grid {
		copy[i] = make([]int, len(grid[i]))
		for j := range grid[i] {
			copy[i][j] = grid[i][j]
		}
	}
	return copy
}

func main() {
	// Test 1: Connect two islands
	grid1 := [][]int{
		{1, 0},
		{0, 1},
	}
	result1 := LargestIslandDFS(copyGrid(grid1))
	fmt.Printf("Test 1 (DFS): %d\n", result1)
	fmt.Println("Expected: 3")

	result1UF := LargestIslandUnionFind(copyGrid(grid1))
	fmt.Printf("Test 1 (Union-Find): %d\n", result1UF)

	// Test 2: Expand existing island
	grid2 := [][]int{
		{1, 1},
		{1, 0},
	}
	result2 := LargestIslandDFS(copyGrid(grid2))
	fmt.Printf("\nTest 2 (DFS): %d\n", result2)
	fmt.Println("Expected: 4")

	// Test 3: All 1s
	grid3 := [][]int{
		{1, 1},
		{1, 1},
	}
	result3 := LargestIslandDFS(copyGrid(grid3))
	fmt.Printf("\nTest 3 (DFS): %d\n", result3)
	fmt.Println("Expected: 4")

	// Test 4: Center hole
	grid4 := [][]int{
		{0, 0, 0, 0, 0},
		{0, 1, 1, 1, 0},
		{0, 1, 0, 1, 0},
		{0, 1, 1, 1, 0},
		{0, 0, 0, 0, 0},
	}
	result4 := LargestIslandDFS(copyGrid(grid4))
	fmt.Printf("\nTest 4 (DFS): %d\n", result4)
	fmt.Println("Expected: 9")

	result4UF := LargestIslandUnionFind(copyGrid(grid4))
	fmt.Printf("Test 4 (Union-Find): %d\n", result4UF)

	// Test 5: All 0s
	grid5 := [][]int{
		{0, 0},
		{0, 0},
	}
	result5 := LargestIslandDFS(copyGrid(grid5))
	fmt.Printf("\nTest 5 (DFS): %d\n", result5)
	fmt.Println("Expected: 1")

	// Test 6: Multiple separate islands
	grid6 := [][]int{
		{1, 0, 1, 0, 1},
		{0, 0, 0, 0, 0},
		{1, 0, 1, 0, 1},
		{0, 0, 0, 0, 0},
		{1, 0, 1, 0, 1},
	}
	result6 := LargestIslandDFS(copyGrid(grid6))
	fmt.Printf("\nTest 6 (DFS): %d\n", result6)
	fmt.Println("Expected: 3 (connect two adjacent islands)")

	result6UF := LargestIslandUnionFind(copyGrid(grid6))
	fmt.Printf("Test 6 (Union-Find): %d\n", result6UF)

	// Test 7: Large connected component
	grid7 := [][]int{
		{1, 1, 0, 1, 1},
		{1, 1, 0, 1, 1},
		{0, 0, 1, 0, 0},
		{1, 1, 0, 1, 1},
		{1, 1, 0, 1, 1},
	}
	result7 := LargestIslandDFS(copyGrid(grid7))
	fmt.Printf("\nTest 7 (DFS): %d\n", result7)

	result7UF := LargestIslandUnionFind(copyGrid(grid7))
	fmt.Printf("Test 7 (Union-Find): %d\n", result7UF)

	// Test 8: Single cell
	grid8 := [][]int{{0}}
	result8 := LargestIslandDFS(copyGrid(grid8))
	fmt.Printf("\nTest 8 (DFS): %d\n", result8)
	fmt.Println("Expected: 1")

	grid9 := [][]int{{1}}
	result9 := LargestIslandDFS(copyGrid(grid9))
	fmt.Printf("\nTest 9 (DFS): %d\n", result9)
	fmt.Println("Expected: 1")

	fmt.Println("\nAll tests completed!")
}
