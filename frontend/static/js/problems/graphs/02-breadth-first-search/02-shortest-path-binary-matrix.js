/**
 * Shortest Path in Binary Matrix
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Path in Binary Matrix',
        difficulty: 'Medium',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search',
        description: 'Given an n x n binary matrix grid, return the length of the shortest **clear path** in the matrix. If there is no clear path, return -1. A **clear path** in a binary matrix is a path from the **top-left** cell (i.e., (0, 0)) to the **bottom-right** cell (i.e., (n - 1, n - 1)) such that: - All the visited cells of the path are 0 - All the adjacent cells of the path are **8-directionally** connected (i.e., they are different and they share an edge or a corner) The **length** of a clear path is the',
        problem: 'Use Breadth-First Search to explore level by level. BFS is ideal for finding shortest paths in unweighted graphs. Use a queue to process nodes in order of distance.',
        complexity: {
            time: 'O(N^2)',
            space: 'O(N^2)'
        },
        hints: [
            'Use a queue to process nodes level by level.',
            'BFS naturally finds shortest paths in unweighted graphs.',
            'Track distance or level for each node.',
            'Mark nodes as visited when adding to queue, not when processing.',
            'Consider bidirectional BFS for optimization.'
        ],
        examples: [
    {
        input: {
        "grid": [
                [
                        0,
                        1
                ],
                [
                        1,
                        0
                ]
        ]
},
        output: 2,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input grid=[[0, 1], [1, 0]], the result is 2.'
    },
    {
        input: {
        "grid": [
                [
                        0,
                        0,
                        0
                ],
                [
                        1,
                        1,
                        0
                ],
                [
                        1,
                        1,
                        0
                ]
        ]
},
        output: 4,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input grid=[[0, 0, 0], [1, 1, 0], [1, 1, 0]], the result is 4.'
    },
    {
        input: {
        "grid": [
                [
                        1,
                        0,
                        0
                ],
                [
                        1,
                        1,
                        0
                ],
                [
                        1,
                        1,
                        0
                ]
        ]
},
        output: -1,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input grid=[[1, 0, 0], [1, 1, 0], [1, 1, 0]], the result is -1.'
    }
        ],
        solutions: {
            python: `from collections import deque

def shortestPathBinaryMatrix(grid):
    """
    Shortest Path in Binary Matrix - BFS with 8-directional movement.

    Time: O(N^2) where N is the grid dimension
    Space: O(N^2) for the queue in worst case
    """
    n = len(grid)

    # Check if start or end is blocked
    if grid[0][0] != 0 or grid[n-1][n-1] != 0:
        return -1

    # 8 directions: horizontal, vertical, and diagonal
    directions = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),           (0, 1),
        (1, -1),  (1, 0),  (1, 1)
    ]

    # BFS queue: (row, col, distance)
    queue = deque([(0, 0, 1)])
    grid[0][0] = 1  # Mark as visited

    while queue:
        row, col, dist = queue.popleft()

        # Check if reached destination
        if row == n - 1 and col == n - 1:
            return dist

        # Explore all 8 directions
        for dr, dc in directions:
            new_row, new_col = row + dr, col + dc

            # Check bounds and if cell is clear
            if 0 <= new_row < n and 0 <= new_col < n and grid[new_row][new_col] == 0:
                grid[new_row][new_col] = 1  # Mark as visited
                queue.append((new_row, new_col, dist + 1))

    return -1  # No path found


# Test
if __name__ == "__main__":
    grid1 = [[0, 1], [1, 0]]
    print(shortestPathBinaryMatrix(grid1))  # Output: 2

    grid2 = [[0, 0, 0], [1, 1, 0], [1, 1, 0]]
    print(shortestPathBinaryMatrix(grid2))  # Output: 4

    grid3 = [[1, 0, 0], [1, 1, 0], [1, 1, 0]]
    print(shortestPathBinaryMatrix(grid3))  # Output: -1`,
            go: `package main

import "fmt"

// shortestPathBinaryMatrix finds the shortest clear path using BFS.
// Time: O(N^2), Space: O(N^2)
func shortestPathBinaryMatrix(grid [][]int) int {
    n := len(grid)

    // Check if start or end is blocked
    if grid[0][0] != 0 || grid[n-1][n-1] != 0 {
        return -1
    }

    // 8 directions: horizontal, vertical, and diagonal
    directions := [][2]int{
        {-1, -1}, {-1, 0}, {-1, 1},
        {0, -1},           {0, 1},
        {1, -1},  {1, 0},  {1, 1},
    }

    // BFS queue
    type cell struct {
        row, col, dist int
    }
    queue := []cell{{0, 0, 1}}
    grid[0][0] = 1 // Mark as visited

    for len(queue) > 0 {
        curr := queue[0]
        queue = queue[1:]

        // Check if reached destination
        if curr.row == n-1 && curr.col == n-1 {
            return curr.dist
        }

        // Explore all 8 directions
        for _, dir := range directions {
            newRow, newCol := curr.row+dir[0], curr.col+dir[1]

            // Check bounds and if cell is clear
            if newRow >= 0 && newRow < n && newCol >= 0 && newCol < n && grid[newRow][newCol] == 0 {
                grid[newRow][newCol] = 1 // Mark as visited
                queue = append(queue, cell{newRow, newCol, curr.dist + 1})
            }
        }
    }

    return -1 // No path found
}

func main() {
    grid1 := [][]int{{0, 1}, {1, 0}}
    fmt.Println(shortestPathBinaryMatrix(grid1)) // Output: 2

    grid2 := [][]int{{0, 0, 0}, {1, 1, 0}, {1, 1, 0}}
    fmt.Println(shortestPathBinaryMatrix(grid2)) // Output: 4
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/02-shortest-path-binary-matrix', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/02-shortest-path-binary-matrix'] = problem;

})();
