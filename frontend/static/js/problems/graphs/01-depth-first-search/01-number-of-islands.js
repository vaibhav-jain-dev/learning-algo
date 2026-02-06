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
        twists: [
            {
                title: 'Count Islands with Diagonal Connections',
                difficulty: 'Medium',
                description: 'Same grid, but land cells are also connected diagonally (8 directions instead of 4). Count the number of islands.',
                whyDifferent: 'Expanding from 4-directional to 8-directional connectivity changes which cells form a single island. Two separate islands in the original might merge into one.',
                example: 'Grid: [["1","0","1"],["0","1","0"],["1","0","1"]]. With 4-dir: 5 islands. With 8-dir: 1 island (all connected through center).'
            },
            {
                title: 'Number of Islands Using BFS',
                difficulty: 'Medium',
                description: 'Solve the same problem using BFS instead of DFS. Compare the traversal pattern and discuss when BFS might be preferred.',
                whyDifferent: 'Forces you to switch from recursive flood-fill to iterative queue-based exploration. BFS avoids stack overflow on very large islands but uses more memory for wide islands.',
                example: 'Same input/output, but the internal exploration of each island radiates outward level by level instead of going deep first.'
            },
            {
                title: 'Number of Islands Using Union-Find',
                difficulty: 'Hard',
                description: 'Solve the problem using a Union-Find (Disjoint Set Union) data structure instead of DFS/BFS. Merge adjacent land cells and count distinct components.',
                whyDifferent: 'Completely different algorithmic paradigm. Instead of traversal, you process cells sequentially and merge sets. This approach generalizes better to dynamic problems where land appears over time.',
                example: 'Same grid input, same output. But internally you maintain parent[] and rank[] arrays, union adjacent 1-cells, then count unique roots.'
            },
            {
                title: 'Number of Islands in a Stream',
                difficulty: 'Hard',
                description: 'Initially the grid is all water. Land cells appear one at a time at given positions. After each addition, report the current number of islands.',
                whyDifferent: 'You cannot re-scan the entire grid after each addition. This forces an online/incremental approach (Union-Find is ideal). Adding one cell might merge multiple existing islands.',
                example: 'Positions: [(0,0),(0,1),(1,2),(2,1)]. After each: [1, 1, 2, 3]. Adding (1,1) next merges islands: count becomes 1.'
            },
            {
                title: 'Number of Islands on a 3D Grid',
                difficulty: 'Hard',
                description: 'Extend the problem to a 3D grid (layers x rows x cols). A "3D island" is a connected component of 1s connected in 6 directions (up/down/left/right/above/below).',
                whyDifferent: 'Adds a third dimension to the DFS, requiring 6-directional exploration. The mental model shifts from 2D grid to 3D space, and stack depth can grow significantly.',
                example: '3D grid with 2 layers: layer0=[[1,0],[0,1]], layer1=[[0,1],[1,0]]. Cells (0,1,1) and (1,1,1) are vertically adjacent, forming connections across layers.'
            }
        ],
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
