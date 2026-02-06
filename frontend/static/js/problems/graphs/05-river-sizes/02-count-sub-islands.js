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
            { title: 'Exact Island Match', difficulty: 'Hard', description: 'An island in grid2 counts only if it has the exact same shape and position as an island in grid1 (not just contained within).', whyDifferent: 'Containment is not enough. You must ensure no extra cells exist in grid1 island beyond those in grid2 island, requiring bidirectional shape comparison.', example: 'Grid1 island covers cells {(0,0),(0,1),(1,0)}. Grid2 island covers {(0,0),(0,1)}. Not an exact match even though it is a sub-island.' },
            { title: 'Count Super Islands', difficulty: 'Medium', description: 'Instead of sub-islands, count islands in grid1 that contain at least one complete island from grid2.', whyDifferent: 'You reverse the containment check. For each grid1 island, you check if any grid2 island is fully inside it, requiring you to map grid2 islands to grid1 islands.', example: 'Grid1 has one large island. Grid2 has 3 small islands, 2 inside the large one. Answer: 1 super island.' },
            { title: 'Sub-Island with Tolerance', difficulty: 'Hard', description: 'An island in grid2 is a sub-island if at most K of its cells are water in grid1.', whyDifferent: 'The boolean check becomes a counting problem. You track the number of mismatched cells during DFS and compare against threshold K.', example: 'Grid2 island has 10 cells, 2 are water in grid1. With K=2, it counts as a sub-island. With K=1, it does not.' },
            { title: 'Three Grid Sub-Islands', difficulty: 'Very Hard', description: 'Given three grids, count islands in grid3 that are sub-islands of both grid1 AND grid2 simultaneously.', whyDifferent: 'You must check containment against two reference grids simultaneously during a single DFS traversal, requiring AND logic across three matrices.', example: 'Grid3 island cells must all be 1 in both grid1 and grid2. Check both conditions per cell.' },
            { title: 'Return Sub-Island Cells', difficulty: 'Medium', description: 'Instead of counting sub-islands, return the list of all cells that belong to any sub-island in grid2.', whyDifferent: 'You must collect cell coordinates during DFS and only include them in the result if the island qualifies as a sub-island, requiring deferred output.', example: 'Sub-island at cells [(0,0),(0,1),(1,0)]. Return these coordinates as a list.' }
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
