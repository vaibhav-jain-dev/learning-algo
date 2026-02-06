/**
 * Making A Large Island
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-largest-island
 */
(function() {
    'use strict';

    const problem = {
        name: 'Making A Large Island',
        difficulty: 'Hard',
        algorithm: 'graph-largest-island',
        parent: '05-river-sizes',
        description: 'You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1. Return the size of the largest island in grid after applying this operation. An island is a 4-directionally connected group of 1s.',
        problem: 'Use flood fill (DFS/BFS) to explore connected components. Start from each unvisited cell, mark visited cells, and track the property you need (size, count, etc.). The key insight is that connected cells form a single component.',
        complexity: {
            time: 'O(N^2)',
            space: 'O(N^2)'
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
                        0
                ],
                [
                        0,
                        1
                ]
        ]
},
        output: 3,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[1, 0], [0, 1]], the result is 3.'
    },
    {
        input: {
        "grid": [
                [
                        1,
                        1
                ],
                [
                        1,
                        0
                ]
        ]
},
        output: 4,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[1, 1], [1, 0]], the result is 4.'
    },
    {
        input: {
        "grid": [
                [
                        1,
                        1
                ],
                [
                        1,
                        1
                ]
        ]
},
        output: 4,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[1, 1], [1, 1]], the result is 4.'
    }
        ],
        solutions: {
            python: `def largestIsland(grid):
    """
    Making A Large Island

    Time: O(N^2) - two passes through the grid
    Space: O(N^2) - for storing island IDs

    Approach:
    1. First pass: Label each island with unique ID and calculate sizes
    2. Second pass: For each 0 cell, check adjacent islands
       - Sum unique adjacent island sizes + 1
    3. Return maximum (handle edge case of all 1s)
    """
    if not grid or not grid[0]:
        return 0

    n = len(grid)

    # Direction vectors
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    # island_size[id] = size of island with given id
    island_size = {}
    island_id = 2  # Start from 2 to distinguish from 0 and 1

    def dfs(i, j, id):
        """Label island and return its size"""
        if i < 0 or i >= n or j < 0 or j >= n or grid[i][j] != 1:
            return 0

        grid[i][j] = id  # Mark with island ID
        size = 1

        for di, dj in directions:
            size += dfs(i + di, j + dj, id)

        return size

    # First pass: Label islands and calculate sizes
    for i in range(n):
        for j in range(n):
            if grid[i][j] == 1:
                size = dfs(i, j, island_id)
                island_size[island_id] = size
                island_id += 1

    # If no islands exist, flipping one 0 creates island of size 1
    if not island_size:
        return 1

    # Second pass: Check each 0 cell
    max_size = max(island_size.values())  # Handle all 1s case

    for i in range(n):
        for j in range(n):
            if grid[i][j] == 0:
                # Find unique adjacent islands
                adjacent_islands = set()
                for di, dj in directions:
                    ni, nj = i + di, j + dj
                    if 0 <= ni < n and 0 <= nj < n and grid[ni][nj] > 1:
                        adjacent_islands.add(grid[ni][nj])

                # Sum sizes of adjacent islands + 1
                total = 1 + sum(island_size[id] for id in adjacent_islands)
                max_size = max(max_size, total)

    return max_size


def makingALargeIsland(data):
    """Process input data"""
    grid = data.get('grid', [])
    # Make a copy since we modify the grid
    grid_copy = [row[:] for row in grid]
    return largestIsland(grid_copy)


# Test
if __name__ == "__main__":
    print(largestIsland([[1, 0], [0, 1]]))  # Expected: 3
    print(largestIsland([[1, 1], [1, 0]]))  # Expected: 4
    print(largestIsland([[1, 1], [1, 1]]))  # Expected: 4`,
            go: `package main

import "fmt"

// LargestIsland finds the largest island after changing at most one 0 to 1
// Time: O(N^2), Space: O(N^2)
func LargestIsland(grid [][]int) int {
    if len(grid) == 0 || len(grid[0]) == 0 {
        return 0
    }

    n := len(grid)
    directions := [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}

    // Map island ID to size
    islandSize := make(map[int]int)
    islandID := 2 // Start from 2

    // DFS to label island and return size
    var dfs func(i, j, id int) int
    dfs = func(i, j, id int) int {
        if i < 0 || i >= n || j < 0 || j >= n || grid[i][j] != 1 {
            return 0
        }

        grid[i][j] = id
        size := 1

        for _, d := range directions {
            size += dfs(i+d[0], j+d[1], id)
        }

        return size
    }

    // First pass: Label islands
    for i := 0; i < n; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j] == 1 {
                size := dfs(i, j, islandID)
                islandSize[islandID] = size
                islandID++
            }
        }
    }

    // If no islands, flipping one 0 creates size 1
    if len(islandSize) == 0 {
        return 1
    }

    // Find max existing island size
    maxSize := 0
    for _, size := range islandSize {
        if size > maxSize {
            maxSize = size
        }
    }

    // Second pass: Check each 0 cell
    for i := 0; i < n; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j] == 0 {
                adjacentIslands := make(map[int]bool)

                for _, d := range directions {
                    ni, nj := i+d[0], j+d[1]
                    if ni >= 0 && ni < n && nj >= 0 && nj < n && grid[ni][nj] > 1 {
                        adjacentIslands[grid[ni][nj]] = true
                    }
                }

                total := 1
                for id := range adjacentIslands {
                    total += islandSize[id]
                }

                if total > maxSize {
                    maxSize = total
                }
            }
        }
    }

    return maxSize
}

// LargestIslandWithCopy preserves original grid
func LargestIslandWithCopy(grid [][]int) int {
    gridCopy := make([][]int, len(grid))
    for i := range grid {
        gridCopy[i] = make([]int, len(grid[i]))
        copy(gridCopy[i], grid[i])
    }
    return LargestIsland(gridCopy)
}

func main() {
    fmt.Println(LargestIslandWithCopy([][]int{{1, 0}, {0, 1}})) // Expected: 3
    fmt.Println(LargestIslandWithCopy([][]int{{1, 1}, {1, 0}})) // Expected: 4
    fmt.Println(LargestIslandWithCopy([][]int{{1, 1}, {1, 1}})) // Expected: 4
}`
        },
        twists: [
            { id: '05-river-sizes/03-making-a-large-island/twist-01-flip-k-zeros', name: 'Flip K Zeros', difficulty: 'Very Hard' },
            { id: '05-river-sizes/03-making-a-large-island/twist-02-remove-one-cell', name: 'Remove One Cell', difficulty: 'Hard' },
            { id: '05-river-sizes/03-making-a-large-island/twist-03-rectangular-grid-constraint', name: 'Rectangular Grid Constraint', difficulty: 'Medium' },
            { id: '05-river-sizes/03-making-a-large-island/twist-04-weighted-cells', name: 'Weighted Cells', difficulty: 'Hard' },
            { id: '05-river-sizes/03-making-a-large-island/twist-05-no-flip-needed', name: 'No Flip Needed', difficulty: 'Easy' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/03-making-a-large-island', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/03-making-a-large-island'] = problem;

})();
