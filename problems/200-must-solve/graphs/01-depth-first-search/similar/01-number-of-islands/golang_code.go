/*
Number of Islands - Go Solutions

Given a 2D grid of '1's (land) and '0's (water), count the number of islands.
An island is surrounded by water and formed by connecting adjacent lands.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// ============================================================================
// APPROACH 1: DFS (Recursive)
// ============================================================================
// Time Complexity:  O(m × n) - visit each cell once
// Space Complexity: O(m × n) - recursion stack in worst case
//
// WHY THIS IS BEST:
// - Clean and intuitive flood-fill pattern
// - Easy to understand and implement
// - Natural recursive structure for exploring connected components
// ============================================================================

// NumIslandsDFS counts islands using recursive DFS.
//
// Key Insight: Each unvisited '1' starts a new island.
// DFS marks all connected '1's as visited, preventing recount.
//
// Visual for 3x3 grid:
//
//	1 1 0      V V 0     (V = visited)
//	1 0 0  ->  V 0 0     One DFS from (0,0) visits all connected land
//	0 0 1      0 0 1     Cell (2,2) starts second island
//
//	Answer: 2 islands
func NumIslandsDFS(grid [][]byte) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return 0
	}

	rows, cols := len(grid), len(grid[0])
	count := 0

	// Define DFS function with closure to access grid
	var dfs func(r, c int)
	dfs = func(r, c int) {
		// Boundary and water checks
		if r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != '1' {
			return
		}

		// Mark as visited by changing to '0'
		grid[r][c] = '0'

		// Explore all 4 directions
		dfs(r+1, c) // down
		dfs(r-1, c) // up
		dfs(r, c+1) // right
		dfs(r, c-1) // left
	}

	// Scan entire grid
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == '1' {
				count++
				dfs(r, c) // Sink the entire island
			}
		}
	}

	return count
}

// ============================================================================
// APPROACH 2: BFS (Iterative)
// ============================================================================
// Time Complexity:  O(m × n)
// Space Complexity: O(min(m, n)) - queue size bounded by smaller dimension
//
// WHEN TO USE:
// - Avoid deep recursion (stack overflow risk)
// - Prefer iterative solutions
// - Level-by-level exploration needed
// ============================================================================

// NumIslandsBFS counts islands using iterative BFS.
func NumIslandsBFS(grid [][]byte) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return 0
	}

	rows, cols := len(grid), len(grid[0])
	count := 0

	// Direction vectors: down, up, right, left
	directions := [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}

	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == '1' {
				count++

				// BFS from this cell
				queue := [][2]int{{r, c}}
				grid[r][c] = '0' // Mark visited

				for len(queue) > 0 {
					// Dequeue
					cell := queue[0]
					queue = queue[1:]
					cr, cc := cell[0], cell[1]

					// Explore neighbors
					for _, d := range directions {
						nr, nc := cr+d[0], cc+d[1]
						if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == '1' {
							grid[nr][nc] = '0' // Mark visited
							queue = append(queue, [2]int{nr, nc})
						}
					}
				}
			}
		}
	}

	return count
}

// ============================================================================
// APPROACH 3: Union-Find (Disjoint Set)
// ============================================================================
// Time Complexity:  O(m × n × α(m × n)) where α is inverse Ackermann
// Space Complexity: O(m × n) for parent and rank arrays
//
// WHEN TO USE:
// - Dynamic connectivity queries
// - Need to track component sizes
// - Multiple queries on same data
// ============================================================================

// UnionFind data structure for efficient component tracking
type UnionFind struct {
	parent []int
	rank   []int
	count  int // Number of components
}

// NewUnionFind initializes union-find for grid
func NewUnionFind(grid [][]byte) *UnionFind {
	rows, cols := len(grid), len(grid[0])
	size := rows * cols

	uf := &UnionFind{
		parent: make([]int, size),
		rank:   make([]int, size),
		count:  0,
	}

	// Initialize: each land cell is its own component
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == '1' {
				idx := r*cols + c
				uf.parent[idx] = idx
				uf.count++
			}
		}
	}

	return uf
}

// Find returns root of component with path compression
func (uf *UnionFind) Find(x int) int {
	if uf.parent[x] != x {
		uf.parent[x] = uf.Find(uf.parent[x]) // Path compression
	}
	return uf.parent[x]
}

// Union merges two components using union by rank
func (uf *UnionFind) Union(x, y int) {
	rootX, rootY := uf.Find(x), uf.Find(y)

	if rootX != rootY {
		// Union by rank
		if uf.rank[rootX] < uf.rank[rootY] {
			uf.parent[rootX] = rootY
		} else if uf.rank[rootX] > uf.rank[rootY] {
			uf.parent[rootY] = rootX
		} else {
			uf.parent[rootY] = rootX
			uf.rank[rootX]++
		}
		uf.count--
	}
}

// NumIslandsUnionFind counts islands using Union-Find.
func NumIslandsUnionFind(grid [][]byte) int {
	if len(grid) == 0 || len(grid[0]) == 0 {
		return 0
	}

	rows, cols := len(grid), len(grid[0])
	uf := NewUnionFind(grid)

	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == '1' {
				idx := r*cols + c

				// Union with right neighbor
				if c+1 < cols && grid[r][c+1] == '1' {
					uf.Union(idx, idx+1)
				}

				// Union with bottom neighbor
				if r+1 < rows && grid[r+1][c] == '1' {
					uf.Union(idx, idx+cols)
				}
			}
		}
	}

	return uf.count
}

// ============================================================================
// HELPER: Create grid from string slice (for testing)
// ============================================================================

func createGrid(strs []string) [][]byte {
	grid := make([][]byte, len(strs))
	for i, s := range strs {
		grid[i] = []byte(s)
	}
	return grid
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		grid     []string
		expected int
		desc     string
	}{
		{
			[]string{
				"11110",
				"11010",
				"11000",
				"00000",
			},
			1,
			"Single large island",
		},
		{
			[]string{
				"11000",
				"11000",
				"00100",
				"00011",
			},
			3,
			"Three separate islands",
		},
		{
			[]string{"1"},
			1,
			"Single cell island",
		},
		{
			[]string{"0"},
			0,
			"Single cell water",
		},
		{
			[]string{
				"10101",
				"01010",
				"10101",
			},
			8,
			"Checkerboard pattern",
		},
		{
			[]string{
				"111",
				"010",
				"111",
			},
			1,
			"Ring island",
		},
	}

	fmt.Println("======================================================================")
	fmt.Println("NUMBER OF ISLANDS - TEST RESULTS")
	fmt.Println("======================================================================")

	// Test DFS approach
	fmt.Println("\nApproach 1: DFS (Recursive)")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		grid := createGrid(tc.grid)
		result := NumIslandsDFS(grid)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, result, tc.expected)
	}

	// Test BFS approach
	fmt.Println("\nApproach 2: BFS (Iterative)")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		grid := createGrid(tc.grid)
		result := NumIslandsBFS(grid)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, result, tc.expected)
	}

	// Test Union-Find approach
	fmt.Println("\nApproach 3: Union-Find")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		grid := createGrid(tc.grid)
		result := NumIslandsUnionFind(grid)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, result, tc.expected)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE INPUT EXAMPLES")
	fmt.Println("======================================================================")

	// Example 1
	grid1 := createGrid([]string{
		"11110",
		"11010",
		"11000",
		"00000",
	})
	fmt.Println("\nInput Grid 1:")
	for _, row := range []string{"11110", "11010", "11000", "00000"} {
		fmt.Printf("  %s\n", row)
	}
	fmt.Printf("Output: %d islands\n", NumIslandsDFS(grid1))

	// Example 2
	grid2 := createGrid([]string{
		"11000",
		"11000",
		"00100",
		"00011",
	})
	fmt.Println("\nInput Grid 2:")
	for _, row := range []string{"11000", "11000", "00100", "00011"} {
		fmt.Printf("  %s\n", row)
	}
	fmt.Printf("Output: %d islands\n", NumIslandsDFS(grid2))

	fmt.Println("\nAll tests completed!")
}
