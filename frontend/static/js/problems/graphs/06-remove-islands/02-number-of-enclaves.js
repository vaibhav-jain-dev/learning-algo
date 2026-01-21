/**
 * Number of Enclaves
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Enclaves',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands',
        description: 'You are given an m x n binary matrix grid, where 0 represents water and 1 represents land. An island is a maximal 4-directionally connected group of 1s. An **enclave** is a land cell that cannot reach any boundary cell of the grid by walking through land cells. Return the number of land cells in grid that are enclaves.',
        problem: 'Use flood fill (DFS/BFS) to explore connected components. Start from each unvisited cell, mark visited cells, and track the property you need (size, count, etc.). The key insight is that connected cells form a single component.',
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        hints: [
            'Think about how to traverse all connected cells from a starting point.',
            'Use DFS or BFS to explore all 4-directional neighbors.',
            'Mark cells as visited to avoid counting them twice.',
            'Track the metric you need (area, count) during traversal.',
            'Consider edge cases: empty grid, all water, all land.'
        ],
        examples: [
    {
        input: {
        "grid": [
                [
                        0,
                        0,
                        0,
                        0
                ],
                [
                        1,
                        0,
                        1,
                        0
                ],
                [
                        0,
                        1,
                        1,
                        0
                ],
                [
                        0,
                        0,
                        0,
                        0
                ]
        ]
},
        output: 3,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[0, 0, 0, 0], [1, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]], the result is 3.'
    }
        ],
        solutions: {
            python: `def numEnclaves(grid):
    """
    Number of Enclaves

    Time: O(M * N) - visit each cell at most once
    Space: O(M * N) - recursion stack in worst case

    Approach:
    1. Use DFS to mark all land cells connected to boundary as visited (set to 0)
    2. Count remaining land cells (these are enclaves)

    Key insight: Land cells that can reach boundary are NOT enclaves
    """
    if not grid or not grid[0]:
        return 0

    m, n = len(grid), len(grid[0])

    def dfs(i, j):
        """Mark land cells connected to boundary as water (visited)"""
        if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] == 0:
            return

        grid[i][j] = 0  # Mark as visited

        # Explore all 4 directions
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)

    # Step 1: Mark all land connected to boundary
    # Process first and last row
    for j in range(n):
        dfs(0, j)
        dfs(m - 1, j)

    # Process first and last column
    for i in range(m):
        dfs(i, 0)
        dfs(i, n - 1)

    # Step 2: Count remaining land cells (enclaves)
    count = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                count += 1

    return count


def numberOfEnclaves(data):
    """Process input data"""
    grid = data.get('grid', [])
    # Make a copy since we modify the grid
    grid_copy = [row[:] for row in grid]
    return numEnclaves(grid_copy)


# Test
if __name__ == "__main__":
    grid = [
        [0, 0, 0, 0],
        [1, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ]
    print(numEnclaves([row[:] for row in grid]))  # Expected: 3

    grid2 = [
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0]
    ]
    print(numEnclaves([row[:] for row in grid2]))  # Expected: 0`,
            go: `package main

import "fmt"

// NumEnclaves counts land cells that cannot reach boundary
// Time: O(M * N), Space: O(M * N)
func NumEnclaves(grid [][]int) int {
    if len(grid) == 0 || len(grid[0]) == 0 {
        return 0
    }

    m, n := len(grid), len(grid[0])

    // DFS to mark land connected to boundary
    var dfs func(i, j int)
    dfs = func(i, j int) {
        if i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == 0 {
            return
        }

        grid[i][j] = 0 // Mark as visited

        dfs(i+1, j)
        dfs(i-1, j)
        dfs(i, j+1)
        dfs(i, j-1)
    }

    // Mark all land connected to boundary
    for j := 0; j < n; j++ {
        dfs(0, j)
        dfs(m-1, j)
    }
    for i := 0; i < m; i++ {
        dfs(i, 0)
        dfs(i, n-1)
    }

    // Count remaining land cells
    count := 0
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j] == 1 {
                count++
            }
        }
    }

    return count
}

// NumEnclavesWithCopy preserves original grid
func NumEnclavesWithCopy(grid [][]int) int {
    gridCopy := make([][]int, len(grid))
    for i := range grid {
        gridCopy[i] = make([]int, len(grid[i]))
        copy(gridCopy[i], grid[i])
    }
    return NumEnclaves(gridCopy)
}

func main() {
    grid := [][]int{
        {0, 0, 0, 0},
        {1, 0, 1, 0},
        {0, 1, 1, 0},
        {0, 0, 0, 0},
    }
    fmt.Println(NumEnclavesWithCopy(grid)) // Expected: 3

    grid2 := [][]int{
        {0, 1, 1, 0},
        {0, 0, 1, 0},
        {0, 0, 1, 0},
        {0, 0, 0, 0},
    }
    fmt.Println(NumEnclavesWithCopy(grid2)) // Expected: 0
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/02-number-of-enclaves', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/02-number-of-enclaves'] = problem;

})();
