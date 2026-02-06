/**
 * Rotting Oranges
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-min-passes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rotting Oranges',
        difficulty: 'Medium',
        algorithm: 'graph-min-passes',
        parent: '08-minimum-passes',
        description: 'You are given an m x n grid where each cell can have one of three values: - 0 representing an empty cell - 1 representing a fresh orange - 2 representing a rotten orange Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.',
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
                        2,
                        1,
                        1
                ],
                [
                        1,
                        1,
                        0
                ],
                [
                        0,
                        1,
                        1
                ]
        ]
},
        output: 4,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[2, 1, 1], [1, 1, 0], [0, 1, 1]], the result is 4.'
    }
        ],
        solutions: {
            python: `from collections import deque

def orangesRotting(grid):
    """
    Rotting Oranges - Multi-source BFS

    Start BFS from all rotten oranges simultaneously.
    Each level of BFS = 1 minute passing.

    Time: O(M * N)
    Space: O(M * N)
    """
    if not grid or not grid[0]:
        return 0

    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh_count = 0

    # Initialize: find all rotten oranges and count fresh ones
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c))
            elif grid[r][c] == 1:
                fresh_count += 1

    # No fresh oranges - nothing to rot
    if fresh_count == 0:
        return 0

    minutes = 0
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    # BFS - process level by level
    while queue:
        minutes += 1

        for _ in range(len(queue)):
            r, c = queue.popleft()

            for dr, dc in directions:
                nr, nc = r + dr, c + dc

                if (0 <= nr < rows and 0 <= nc < cols
                    and grid[nr][nc] == 1):
                    grid[nr][nc] = 2  # Mark as rotten
                    fresh_count -= 1
                    queue.append((nr, nc))

    # Return -1 if any fresh oranges remain
    return minutes - 1 if fresh_count == 0 else -1


# Test
if __name__ == "__main__":
    grid1 = [[2,1,1],[1,1,0],[0,1,1]]
    print(orangesRotting(grid1))  # 4

    grid2 = [[2,1,1],[0,1,1],[1,0,1]]
    print(orangesRotting(grid2))  # -1

    grid3 = [[0,2]]
    print(orangesRotting(grid3))  # 0`,
            go: `package main

import "fmt"

// OrangesRotting finds minimum minutes for all oranges to rot
// Time: O(M*N), Space: O(M*N)
func OrangesRotting(grid [][]int) int {
    if len(grid) == 0 || len(grid[0]) == 0 {
        return 0
    }

    rows, cols := len(grid), len(grid[0])
    queue := [][2]int{}
    freshCount := 0

    // Initialize: find all rotten oranges and count fresh ones
    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if grid[r][c] == 2 {
                queue = append(queue, [2]int{r, c})
            } else if grid[r][c] == 1 {
                freshCount++
            }
        }
    }

    // No fresh oranges - nothing to rot
    if freshCount == 0 {
        return 0
    }

    minutes := 0
    directions := [][2]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}

    // BFS - process level by level
    for len(queue) > 0 {
        minutes++
        size := len(queue)

        for i := 0; i < size; i++ {
            cell := queue[0]
            queue = queue[1:]
            r, c := cell[0], cell[1]

            for _, d := range directions {
                nr, nc := r+d[0], c+d[1]

                if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 {
                    grid[nr][nc] = 2 // Mark as rotten
                    freshCount--
                    queue = append(queue, [2]int{nr, nc})
                }
            }
        }
    }

    if freshCount == 0 {
        return minutes - 1
    }
    return -1
}

func main() {
    grid1 := [][]int{{2, 1, 1}, {1, 1, 0}, {0, 1, 1}}
    fmt.Println(OrangesRotting(grid1)) // 4

    grid2 := [][]int{{2, 1, 1}, {0, 1, 1}, {1, 0, 1}}
    fmt.Println(OrangesRotting(grid2)) // -1
}`
        },
        twists: [
            { title: 'Multiple Rot Speeds', difficulty: 'Hard', description: 'Some rotten oranges are super-rotten and can rot fresh oranges 2 cells away in one minute. Find the minimum minutes.', whyDifferent: 'Standard BFS processes one cell distance per level. Super-rotten oranges break this assumption, requiring you to add cells at distance 2 to the same BFS level.', example: 'Grid [[2,1,1,1,1]]. Normal rot: 4 minutes. With super-rot (distance 2): 2 minutes.' },
            { title: 'Rot with Immunity', difficulty: 'Medium', description: 'Some fresh oranges are immune (value 3) and can never rot. Determine if all non-immune fresh oranges can rot.', whyDifferent: 'Immune oranges act as barriers that cannot be converted. You must skip them during BFS and check only non-immune fresh oranges remain at the end.', example: 'Grid [[2,1,3,1]]. The immune orange at position 2 blocks rot from reaching the last orange. Answer: -1.' },
            { title: 'Minimum Rotten to Start', difficulty: 'Very Hard', description: 'No oranges are initially rotten. Place exactly K rotten oranges to minimize the total time for all fresh oranges to rot.', whyDifferent: 'This becomes an optimization problem. You must choose K source positions from all fresh orange locations to minimize the maximum BFS distance.', example: 'Grid 5x5 all fresh, K=2. Optimal placement at (1,1) and (3,3) minimizes total rot time.' },
            { title: 'Reversible Rot', difficulty: 'Hard', description: 'A rotten orange becomes fresh again after 2 minutes. Fresh oranges adjacent to rotten ones still get infected during the minute. Does the grid stabilize?', whyDifferent: 'The BFS is no longer monotonic. Rot waves oscillate, and you must simulate until a steady state or detect an infinite cycle.', example: 'Grid [[2,1,0,0,1]]. Minute 1: rot spreads right. Minute 2: original rotten becomes fresh. Oscillation occurs.' },
            { title: 'Weighted Rot Time', difficulty: 'Medium', description: 'Each fresh orange has a resistance value (1-3) indicating how many minutes of adjacent rot it takes before it rots.', whyDifferent: 'BFS levels no longer correspond to single minutes. You need a priority queue or track exposure time per cell, making this closer to Dijkstra than standard BFS.', example: 'Orange with resistance 3 needs 3 adjacent rotten minutes to rot, not 1.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/01-rotting-oranges', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/01-rotting-oranges'] = problem;

})();
