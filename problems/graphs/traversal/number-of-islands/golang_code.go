package main

import (
	"fmt"
)

// numIslandsDFS counts number of islands using DFS.
func numIslandsDFS(grid [][]byte) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return 0
	}

	rows, cols := len(grid), len(grid[0])
	count := 0

	var dfs func(r, c int)
	dfs = func(r, c int) {
		// Check bounds and if it's water
		if r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == '0' {
			return
		}

		// Mark as visited
		grid[r][c] = '0'

		// Explore all 4 directions
		dfs(r+1, c)
		dfs(r-1, c)
		dfs(r, c+1)
		dfs(r, c-1)
	}

	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == '1' {
				count++
				dfs(r, c)
			}
		}
	}

	return count
}

// numIslandsBFS counts number of islands using BFS.
func numIslandsBFS(grid [][]byte) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return 0
	}

	rows, cols := len(grid), len(grid[0])
	count := 0
	directions := [][2]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}

	bfs := func(startR, startC int) {
		queue := [][2]int{{startR, startC}}
		grid[startR][startC] = '0'

		for len(queue) > 0 {
			cell := queue[0]
			queue = queue[1:]
			r, c := cell[0], cell[1]

			for _, dir := range directions {
				nr, nc := r+dir[0], c+dir[1]
				if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == '1' {
					grid[nr][nc] = '0'
					queue = append(queue, [2]int{nr, nc})
				}
			}
		}
	}

	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == '1' {
				count++
				bfs(r, c)
			}
		}
	}

	return count
}

// UnionFind structure for counting connected components
type UnionFind struct {
	parent []int
	rank   []int
	count  int
}

// NewUnionFind creates a new UnionFind instance
func NewUnionFind(n int) *UnionFind {
	parent := make([]int, n)
	rank := make([]int, n)
	for i := range parent {
		parent[i] = i
	}
	return &UnionFind{parent: parent, rank: rank, count: 0}
}

// Find with path compression
func (uf *UnionFind) Find(x int) int {
	if uf.parent[x] != x {
		uf.parent[x] = uf.Find(uf.parent[x])
	}
	return uf.parent[x]
}

// Union with rank
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

// numIslandsUnionFind counts number of islands using Union-Find.
func numIslandsUnionFind(grid [][]byte) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return 0
	}

	rows, cols := len(grid), len(grid[0])
	uf := NewUnionFind(rows * cols)

	// Count initial land cells
	landCount := 0
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == '1' {
				landCount++
			}
		}
	}
	uf.count = landCount

	getIndex := func(r, c int) int {
		return r*cols + c
	}

	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == '1' {
				// Only check right and down
				if c+1 < cols && grid[r][c+1] == '1' {
					uf.Union(getIndex(r, c), getIndex(r, c+1))
				}
				if r+1 < rows && grid[r+1][c] == '1' {
					uf.Union(getIndex(r, c), getIndex(r+1, c))
				}
			}
		}
	}

	return uf.count
}

// Helper to copy grid
func copyGrid(grid [][]byte) [][]byte {
	result := make([][]byte, len(grid))
	for i := range grid {
		result[i] = make([]byte, len(grid[i]))
		copy(result[i], grid[i])
	}
	return result
}

// Helper to create grid from strings
func createGrid(rows []string) [][]byte {
	grid := make([][]byte, len(rows))
	for i, row := range rows {
		grid[i] = []byte(row)
	}
	return grid
}

func main() {
	fmt.Println("============================================================")
	fmt.Println("NUMBER OF ISLANDS TESTS")
	fmt.Println("============================================================")

	// Test 1: Single island
	fmt.Println("\nTest 1: Single island")
	grid1 := createGrid([]string{
		"11110",
		"11010",
		"11000",
		"00000",
	})
	grid1Copy := copyGrid(grid1)
	result := numIslandsDFS(grid1Copy)
	fmt.Println("Grid: 4x5 with single island")
	fmt.Printf("Number of islands (DFS): %d\n", result)
	if result == 1 {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected 1, got %d\n", result)
	}

	// Test 2: Three islands
	fmt.Println("\nTest 2: Three islands")
	grid2 := createGrid([]string{
		"11000",
		"11000",
		"00100",
		"00011",
	})
	grid2Copy := copyGrid(grid2)
	result = numIslandsBFS(grid2Copy)
	fmt.Println("Grid: 4x5 with three islands")
	fmt.Printf("Number of islands (BFS): %d\n", result)
	if result == 3 {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected 3, got %d\n", result)
	}

	// Test 3: Checkerboard pattern
	fmt.Println("\nTest 3: Checkerboard pattern")
	grid3 := createGrid([]string{
		"10101",
		"01010",
		"10101",
	})
	grid3Copy := copyGrid(grid3)
	result = numIslandsUnionFind(grid3Copy)
	fmt.Println("Grid: 3x5 checkerboard")
	fmt.Printf("Number of islands (Union-Find): %d\n", result)
	if result == 8 {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected 8, got %d\n", result)
	}

	// Test 4: All water
	fmt.Println("\nTest 4: All water")
	grid4 := createGrid([]string{
		"000",
		"000",
		"000",
	})
	grid4Copy := copyGrid(grid4)
	result = numIslandsDFS(grid4Copy)
	fmt.Println("Grid: 3x3 all water")
	fmt.Printf("Number of islands: %d\n", result)
	if result == 0 {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected 0, got %d\n", result)
	}

	// Test 5: All land
	fmt.Println("\nTest 5: All land")
	grid5 := createGrid([]string{
		"111",
		"111",
		"111",
	})
	grid5Copy := copyGrid(grid5)
	result = numIslandsDFS(grid5Copy)
	fmt.Println("Grid: 3x3 all land")
	fmt.Printf("Number of islands: %d\n", result)
	if result == 1 {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected 1, got %d\n", result)
	}

	// Test 6: Single cell land
	fmt.Println("\nTest 6: Single cell land")
	grid6 := createGrid([]string{"1"})
	grid6Copy := copyGrid(grid6)
	result = numIslandsDFS(grid6Copy)
	fmt.Println("Grid: 1x1 land")
	fmt.Printf("Number of islands: %d\n", result)
	if result == 1 {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected 1, got %d\n", result)
	}

	// Test 7: Single cell water
	fmt.Println("\nTest 7: Single cell water")
	grid7 := createGrid([]string{"0"})
	grid7Copy := copyGrid(grid7)
	result = numIslandsDFS(grid7Copy)
	fmt.Println("Grid: 1x1 water")
	fmt.Printf("Number of islands: %d\n", result)
	if result == 0 {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected 0, got %d\n", result)
	}

	// Test 8: L-shaped island
	fmt.Println("\nTest 8: L-shaped island")
	grid8 := createGrid([]string{
		"100",
		"100",
		"111",
	})
	grid8Copy := copyGrid(grid8)
	result = numIslandsDFS(grid8Copy)
	fmt.Println("Grid: L-shaped island")
	fmt.Printf("Number of islands: %d\n", result)
	if result == 1 {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected 1, got %d\n", result)
	}

	// Test 9: Empty grid
	fmt.Println("\nTest 9: Empty grid")
	grid9 := [][]byte{}
	result = numIslandsDFS(grid9)
	fmt.Println("Grid: empty")
	fmt.Printf("Number of islands: %d\n", result)
	if result == 0 {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected 0, got %d\n", result)
	}

	// Test 10: Horizontal strip
	fmt.Println("\nTest 10: Horizontal strip")
	grid10 := createGrid([]string{"11111"})
	grid10Copy := copyGrid(grid10)
	result = numIslandsDFS(grid10Copy)
	fmt.Println("Grid: 1x5 horizontal strip")
	fmt.Printf("Number of islands: %d\n", result)
	if result == 1 {
		fmt.Println("PASSED")
	} else {
		fmt.Printf("FAILED: Expected 1, got %d\n", result)
	}

	fmt.Println("\n============================================================")
	fmt.Println("ALL TESTS PASSED!")
	fmt.Println("============================================================")
}
