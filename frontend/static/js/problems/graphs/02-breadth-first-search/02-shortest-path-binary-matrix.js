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
        twists: [
            {
                title: 'Shortest Path with Only 4 Directions',
                difficulty: 'Easy',
                description: 'Find the shortest path but only allow horizontal and vertical movement (4 directions) instead of 8-directional movement.',
                whyDifferent: 'Reducing directions from 8 to 4 eliminates diagonal shortcuts. Paths that were short with diagonals become longer or impossible. The optimal path structure changes fundamentally.',
                example: 'Grid: [[0,0],[0,0]]. With 8-dir: shortest=2 (diagonal). With 4-dir: shortest=3 (right then down, or down then right).'
            },
            {
                title: 'Shortest Path with Weighted Cells',
                difficulty: 'Hard',
                description: 'Each cell has a cost (0 means free, higher values mean more cost). Find the path from top-left to bottom-right with minimum total cost.',
                whyDifferent: 'Standard BFS assumes uniform cost. With varying weights, you need Dijkstra\'s algorithm (priority queue) instead of a simple queue. This fundamentally changes the data structure and processing order.',
                example: 'Grid: [[0,1,4],[2,0,1],[0,3,0]]. BFS shortest path might not be cheapest. Dijkstra finds path with minimum total weight.'
            },
            {
                title: 'Bidirectional BFS for Shortest Path',
                difficulty: 'Hard',
                description: 'Optimize the shortest path search by running BFS from both the top-left and bottom-right simultaneously. Detect when the two searches meet.',
                whyDifferent: 'Bidirectional BFS explores O(b^(d/2)) nodes instead of O(b^d), dramatically reducing the search space. You must manage two frontiers and a meeting detection condition.',
                example: 'Grid 100x100. Standard BFS might explore ~10000 cells. Bidirectional BFS explores ~200 cells (two circles of radius 50 meeting in the middle).'
            },
            {
                title: 'Shortest Path with One Wall Removal',
                difficulty: 'Hard',
                description: 'Find the shortest path where you are allowed to convert at most one blocked cell (1) to a clear cell (0). The state now includes whether you have used your removal.',
                whyDifferent: 'The state space doubles: each cell has two states (wall-removal-used and wall-removal-available). This requires BFS on a 3D state space (row, col, removalsLeft), a common graph modeling trick.',
                example: 'Grid: [[0,1,0],[0,1,0],[0,0,0]]. Without removal: path goes around (length 5). With removal of (0,1): direct path (length 3).'
            },
            {
                title: 'Count All Shortest Paths',
                difficulty: 'Medium',
                description: 'Instead of finding just one shortest path, count how many distinct shortest paths exist from top-left to bottom-right.',
                whyDifferent: 'You need to track both the shortest distance to each cell and the number of ways to reach it at that distance. This combines BFS with dynamic counting, requiring careful handling of ties.',
                example: 'Grid: [[0,0,0],[0,0,0],[0,0,0]]. Multiple shortest paths of length 5 exist. Count all of them.'
            }
        ],
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
