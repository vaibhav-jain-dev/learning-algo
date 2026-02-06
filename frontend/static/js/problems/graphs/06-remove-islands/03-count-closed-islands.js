/**
 * Number of Closed Islands
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Closed Islands',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands',
        description: 'Given a 2D grid consisting of 0s (land) and 1s (water), count the number of closed islands. A closed island is an island totally surrounded by water (0s surrounded by 1s that don\'t touch the boundary).',
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
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        0
                ],
                [
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        1,
                        0
                ],
                [
                        1,
                        0,
                        1,
                        0,
                        1,
                        1,
                        1,
                        0
                ],
                [
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        1
                ],
                [
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        0
                ]
        ]
},
        output: 2,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[1, 1, 1, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 1, 1, 0], [1, 0, 1, 0, 1, 1, 1, 0], [1, 0, 0, 0, 0, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 0]], the result is 2.'
    }
        ],
        solutions: {
            python: `def closedIsland(grid):
    """
    Number of Closed Islands

    Time: O(M * N) - visit each cell at most once
    Space: O(M * N) - recursion stack in worst case

    Note: In this problem, 0 = land, 1 = water (reversed from usual!)

    Approach:
    1. Use DFS to mark all land (0s) connected to boundary as water (1s)
    2. Count remaining islands of 0s (these are closed islands)

    Key insight: A closed island cannot touch the boundary
    """
    if not grid or not grid[0]:
        return 0

    m, n = len(grid), len(grid[0])

    def dfs(i, j):
        """Mark land cells as water (fill the island)"""
        if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] == 1:
            return

        grid[i][j] = 1  # Mark as water (visited)

        # Explore all 4 directions
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)

    # Step 1: Remove all islands connected to boundary
    # Process first and last row
    for j in range(n):
        dfs(0, j)
        dfs(m - 1, j)

    # Process first and last column
    for i in range(m):
        dfs(i, 0)
        dfs(i, n - 1)

    # Step 2: Count closed islands
    count = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 0:  # Found unvisited land
                count += 1
                dfs(i, j)  # Mark this island as visited

    return count


def numberOfClosedIslands(data):
    """Process input data"""
    grid = data.get('grid', [])
    # Make a copy since we modify the grid
    grid_copy = [row[:] for row in grid]
    return closedIsland(grid_copy)


# Test
if __name__ == "__main__":
    grid = [
        [1,1,1,1,1,1,1,0],
        [1,0,0,0,0,1,1,0],
        [1,0,1,0,1,1,1,0],
        [1,0,0,0,0,1,0,1],
        [1,1,1,1,1,1,1,0]
    ]
    print(closedIsland([row[:] for row in grid]))  # Expected: 2

    grid2 = [
        [0,0,1,0,0],
        [0,1,0,1,0],
        [0,1,1,1,0]
    ]
    print(closedIsland([row[:] for row in grid2]))  # Expected: 1`,
            go: `package main

import "fmt"

// ClosedIsland counts closed islands (land surrounded by water)
// Note: 0 = land, 1 = water in this problem
// Time: O(M * N), Space: O(M * N)
func ClosedIsland(grid [][]int) int {
    if len(grid) == 0 || len(grid[0]) == 0 {
        return 0
    }

    m, n := len(grid), len(grid[0])

    // DFS to mark land as water
    var dfs func(i, j int)
    dfs = func(i, j int) {
        if i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == 1 {
            return
        }

        grid[i][j] = 1 // Mark as water

        dfs(i+1, j)
        dfs(i-1, j)
        dfs(i, j+1)
        dfs(i, j-1)
    }

    // Remove islands connected to boundary
    for j := 0; j < n; j++ {
        dfs(0, j)
        dfs(m-1, j)
    }
    for i := 0; i < m; i++ {
        dfs(i, 0)
        dfs(i, n-1)
    }

    // Count closed islands
    count := 0
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j] == 0 {
                count++
                dfs(i, j)
            }
        }
    }

    return count
}

// ClosedIslandWithCopy preserves original grid
func ClosedIslandWithCopy(grid [][]int) int {
    gridCopy := make([][]int, len(grid))
    for i := range grid {
        gridCopy[i] = make([]int, len(grid[i]))
        copy(gridCopy[i], grid[i])
    }
    return ClosedIsland(gridCopy)
}

func main() {
    grid := [][]int{
        {1,1,1,1,1,1,1,0},
        {1,0,0,0,0,1,1,0},
        {1,0,1,0,1,1,1,0},
        {1,0,0,0,0,1,0,1},
        {1,1,1,1,1,1,1,0},
    }
    fmt.Println(ClosedIslandWithCopy(grid)) // Expected: 2

    grid2 := [][]int{
        {0,0,1,0,0},
        {0,1,0,1,0},
        {0,1,1,1,0},
    }
    fmt.Println(ClosedIslandWithCopy(grid2)) // Expected: 1
}`
        },
        twists: [
            { id: '06-remove-islands/03-count-closed-islands/twist-01-closed-island-areas', name: 'Closed Island Areas', difficulty: 'Medium' },
            { id: '06-remove-islands/03-count-closed-islands/twist-02-reversed-cell-meanings', name: 'Reversed Cell Meanings', difficulty: 'Easy' },
            { id: '06-remove-islands/03-count-closed-islands/twist-03-semi-closed-islands', name: 'Semi-Closed Islands', difficulty: 'Hard' },
            { id: '06-remove-islands/03-count-closed-islands/twist-04-nested-closed-islands', name: 'Nested Closed Islands', difficulty: 'Hard' },
            { id: '06-remove-islands/03-count-closed-islands/twist-05-minimum-water-to-close', name: 'Minimum Water to Close', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/03-count-closed-islands', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/03-count-closed-islands'] = problem;

})();
