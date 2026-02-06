/**
 * Count Sub Islands
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Sub Islands',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes',
        description: 'You are given two m x n binary matrices grid1 and grid2 containing only 0\'s (representing water) and 1\'s (representing land). An island is a group of 1\'s connected 4-directionally. An island in grid2 is considered a **sub-island** if there is an island in grid1 that contains all the cells that make up this island in grid2. Return the number of islands in grid2 that are considered sub-islands.',
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
        "grid1": [
                [
                        1,
                        1,
                        1,
                        0,
                        0
                ],
                [
                        0,
                        1,
                        1,
                        1,
                        1
                ],
                [
                        0,
                        0,
                        0,
                        0,
                        0
                ],
                [
                        1,
                        0,
                        0,
                        0,
                        0
                ],
                [
                        1,
                        1,
                        0,
                        1,
                        1
                ]
        ],
        "grid2": [
                [
                        1,
                        1,
                        1,
                        0,
                        0
                ],
                [
                        0,
                        0,
                        1,
                        1,
                        1
                ],
                [
                        0,
                        1,
                        0,
                        0,
                        0
                ],
                [
                        1,
                        0,
                        1,
                        1,
                        0
                ],
                [
                        0,
                        1,
                        0,
                        1,
                        0
                ]
        ]
},
        output: 3,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid1=[[1, 1, 1, 0, 0], [0, 1, 1, 1, 1], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 0, 1, 1]], grid2=[[1, 1, 1, 0, 0], [0, 0, 1, 1, 1], [0, 1, 0, 0, 0], [1, 0, 1, 1, 0], [0, 1, 0, 1, 0]], the result is 3.'
    }
        ],
        solutions: {
            python: `def countSubIslands(grid1, grid2):
    """
    Count Sub Islands

    Time: O(M * N) - visit each cell at most once
    Space: O(M * N) - recursion stack in worst case

    Approach:
    - An island in grid2 is a sub-island if ALL its cells are also 1 in grid1
    - Use DFS to explore each island in grid2
    - Track if any cell in the island is 0 in grid1
    - If all cells match, count it as a sub-island
    """
    if not grid2 or not grid2[0]:
        return 0

    m, n = len(grid2), len(grid2[0])

    def dfs(i, j):
        """
        DFS to explore island and check if it's a sub-island
        Returns True if all cells of this island are also land in grid1
        """
        # Out of bounds or water
        if i < 0 or i >= m or j < 0 or j >= n or grid2[i][j] == 0:
            return True

        # Mark as visited by setting to 0
        grid2[i][j] = 0

        # Check if this cell exists in grid1
        is_sub = grid1[i][j] == 1

        # Explore all 4 directions
        # Important: Don't short-circuit! Need to mark all cells as visited
        top = dfs(i - 1, j)
        bottom = dfs(i + 1, j)
        left = dfs(i, j - 1)
        right = dfs(i, j + 1)

        return is_sub and top and bottom and left and right

    count = 0
    for i in range(m):
        for j in range(n):
            if grid2[i][j] == 1:
                if dfs(i, j):
                    count += 1

    return count


def countSubIslandsData(data):
    """Process input data"""
    grid1 = data.get('grid1', [])
    grid2 = data.get('grid2', [])
    # Make a copy since we modify grid2
    grid2_copy = [row[:] for row in grid2]
    return countSubIslands(grid1, grid2_copy)


# Test
if __name__ == "__main__":
    grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]]
    grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]
    print(countSubIslands(grid1, grid2))  # Expected: 3`,
            go: `package main

import "fmt"

// CountSubIslands counts islands in grid2 that are sub-islands of grid1
// Time: O(M * N), Space: O(M * N)
func CountSubIslands(grid1, grid2 [][]int) int {
    if len(grid2) == 0 || len(grid2[0]) == 0 {
        return 0
    }

    m, n := len(grid2), len(grid2[0])

    // DFS to explore island and check if it's a sub-island
    var dfs func(i, j int) bool
    dfs = func(i, j int) bool {
        // Out of bounds or water
        if i < 0 || i >= m || j < 0 || j >= n || grid2[i][j] == 0 {
            return true
        }

        // Mark as visited
        grid2[i][j] = 0

        // Check if this cell exists in grid1
        isSub := grid1[i][j] == 1

        // Explore all 4 directions (don't short-circuit!)
        top := dfs(i-1, j)
        bottom := dfs(i+1, j)
        left := dfs(i, j-1)
        right := dfs(i, j+1)

        return isSub && top && bottom && left && right
    }

    count := 0
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if grid2[i][j] == 1 {
                if dfs(i, j) {
                    count++
                }
            }
        }
    }

    return count
}

// CountSubIslandsWithCopy preserves original grid2
func CountSubIslandsWithCopy(grid1, grid2 [][]int) int {
    // Make a copy of grid2
    grid2Copy := make([][]int, len(grid2))
    for i := range grid2 {
        grid2Copy[i] = make([]int, len(grid2[i]))
        copy(grid2Copy[i], grid2[i])
    }
    return CountSubIslands(grid1, grid2Copy)
}

func main() {
    grid1 := [][]int{
        {1,1,1,0,0},
        {0,1,1,1,1},
        {0,0,0,0,0},
        {1,0,0,0,0},
        {1,1,0,1,1},
    }
    grid2 := [][]int{
        {1,1,1,0,0},
        {0,0,1,1,1},
        {0,1,0,0,0},
        {1,0,1,1,0},
        {0,1,0,1,0},
    }

    fmt.Println(CountSubIslandsWithCopy(grid1, grid2)) // Expected: 3
}`
        },
        twists: [
            { id: '05-river-sizes/02-count-sub-islands/twist-01-exact-island-match', name: 'Exact Island Match', difficulty: 'Hard' },
            { id: '05-river-sizes/02-count-sub-islands/twist-02-count-super-islands', name: 'Count Super Islands', difficulty: 'Medium' },
            { id: '05-river-sizes/02-count-sub-islands/twist-03-sub-island-with-tolerance', name: 'Sub-Island with Tolerance', difficulty: 'Hard' },
            { id: '05-river-sizes/02-count-sub-islands/twist-04-three-grid-sub-islands', name: 'Three Grid Sub-Islands', difficulty: 'Very Hard' },
            { id: '05-river-sizes/02-count-sub-islands/twist-05-return-sub-island-cells', name: 'Return Sub-Island Cells', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/02-count-sub-islands', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/02-count-sub-islands'] = problem;

})();
