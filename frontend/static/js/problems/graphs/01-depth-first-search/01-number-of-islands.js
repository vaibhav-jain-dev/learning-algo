/**
 * Number of Islands
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Islands',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search',
        description: 'Given an m x n 2D binary grid grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands. An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are surrounded by water.',
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        hints: [
            'Start from the source node and explore as deep as possible.',
            'Use recursion or an explicit stack for DFS.',
            'Mark nodes as visited before exploring neighbors.',
            'Consider the order of exploration for the desired result.',
            'Handle disconnected components if needed.'
        ],
        examples: [
    {
        input: {
        "grid": [
                [
                        "1",
                        "1",
                        "1",
                        "1",
                        "0"
                ],
                [
                        "1",
                        "1",
                        "0",
                        "1",
                        "0"
                ],
                [
                        "1",
                        "1",
                        "0",
                        "0",
                        "0"
                ],
                [
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                ]
        ]
},
        output: 1,
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input grid=[[\'1\', \'1\', \'1\', \'1\', \'0\'], [\'1\', \'1\', \'0\', \'1\', \'0\'], [\'1\', \'1\', \'0\', \'0\', \'0\'], [\'0\', \'0\', \'0\', \'0\', \'0\']], the result is 1.'
    },
    {
        input: {
        "grid": [
                [
                        "1",
                        "1",
                        "0",
                        "0",
                        "0"
                ],
                [
                        "1",
                        "1",
                        "0",
                        "0",
                        "0"
                ],
                [
                        "0",
                        "0",
                        "1",
                        "0",
                        "0"
                ],
                [
                        "0",
                        "0",
                        "0",
                        "1",
                        "1"
                ]
        ]
},
        output: 3,
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input grid=[[\'1\', \'1\', \'0\', \'0\', \'0\'], [\'1\', \'1\', \'0\', \'0\', \'0\'], [\'0\', \'0\', \'1\', \'0\', \'0\'], [\'0\', \'0\', \'0\', \'1\', \'1\']], the result is 3.'
    }
        ],
        solutions: {
            python: `def numIslands(grid):
    """
    Number of Islands - Count connected components of '1's using DFS.

    Time: O(M * N) where M is rows, N is columns
    Space: O(M * N) for recursion stack in worst case
    """
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        # Base case: out of bounds or water
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return

        # Mark as visited by changing to '0'
        grid[r][c] = '0'

        # Explore all 4 directions
        dfs(r + 1, c)  # down
        dfs(r - 1, c)  # up
        dfs(r, c + 1)  # right
        dfs(r, c - 1)  # left

    # Iterate through every cell
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)  # Sink the entire island

    return count


# Test
if __name__ == "__main__":
    grid1 = [
        ["1","1","1","1","0"],
        ["1","1","0","1","0"],
        ["1","1","0","0","0"],
        ["0","0","0","0","0"]
    ]
    print(numIslands(grid1))  # Output: 1

    grid2 = [
        ["1","1","0","0","0"],
        ["1","1","0","0","0"],
        ["0","0","1","0","0"],
        ["0","0","0","1","1"]
    ]
    print(numIslands(grid2))  # Output: 3`,
            go: `package main

import "fmt"

// numIslands counts the number of islands in a grid using DFS.
// Time: O(M * N), Space: O(M * N)
func numIslands(grid [][]byte) int {
    if len(grid) == 0 || len(grid[0]) == 0 {
        return 0
    }

    rows, cols := len(grid), len(grid[0])
    count := 0

    var dfs func(r, c int)
    dfs = func(r, c int) {
        // Base case: out of bounds or water
        if r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != '1' {
            return
        }

        // Mark as visited
        grid[r][c] = '0'

        // Explore all 4 directions
        dfs(r+1, c) // down
        dfs(r-1, c) // up
        dfs(r, c+1) // right
        dfs(r, c-1) // left
    }

    // Iterate through every cell
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

func main() {
    grid := [][]byte{
        {'1','1','1','1','0'},
        {'1','1','0','1','0'},
        {'1','1','0','0','0'},
        {'0','0','0','0','0'},
    }
    fmt.Println(numIslands(grid)) // Output: 1
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/01-number-of-islands', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/01-number-of-islands'] = problem;

})();
