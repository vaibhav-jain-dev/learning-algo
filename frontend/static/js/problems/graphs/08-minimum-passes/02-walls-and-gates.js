/**
 * Walls and Gates
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-min-passes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Walls and Gates',
        difficulty: 'Medium',
        algorithm: 'graph-min-passes',
        parent: '08-minimum-passes',
        description: 'You are given an m x n grid rooms initialized with these three possible values: - -1 - A wall or an obstacle - 0 - A gate - INF (2147483647) - An empty room Fill each empty room with the distance to its nearest gate. If impossible to reach a gate, leave as INF.',
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
        "rooms": [
                [
                        2147483647,
                        -1,
                        0,
                        2147483647
                ],
                [
                        2147483647,
                        2147483647,
                        2147483647,
                        -1
                ],
                [
                        2147483647,
                        -1,
                        2147483647,
                        -1
                ],
                [
                        0,
                        -1,
                        2147483647,
                        2147483647
                ]
        ]
},
        output: [[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, 4]],
        explanation: 'Exploring the graph structure, we find the required path or value. For input rooms=[[2147483647, -1, 0, 2147483647], [2147483647, 2147483647, 2147483647, -1], [2147483647, -1, 2147483647, -1], [0, -1, 2147483647, 2147483647]], the result is [[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, 4]].'
    }
        ],
        solutions: {
            python: `from collections import deque

def wallsAndGates(rooms):
    """
    Walls and Gates - Multi-source BFS from all gates

    Instead of BFS from each empty room to find nearest gate,
    BFS from all gates simultaneously - much more efficient.

    Time: O(M * N)
    Space: O(M * N)
    """
    if not rooms or not rooms[0]:
        return rooms

    INF = 2147483647
    rows, cols = len(rooms), len(rooms[0])
    queue = deque()

    # Initialize: add all gates to queue
    for r in range(rows):
        for c in range(cols):
            if rooms[r][c] == 0:  # Gate
                queue.append((r, c))

    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    # BFS from all gates
    while queue:
        r, c = queue.popleft()

        for dr, dc in directions:
            nr, nc = r + dr, c + dc

            # Only process empty rooms (INF)
            if (0 <= nr < rows and 0 <= nc < cols
                and rooms[nr][nc] == INF):
                rooms[nr][nc] = rooms[r][c] + 1
                queue.append((nr, nc))

    return rooms


# Test
if __name__ == "__main__":
    INF = 2147483647
    rooms = [
        [INF, -1,  0, INF],
        [INF, INF, INF, -1],
        [INF, -1, INF, -1],
        [0,   -1, INF, INF]
    ]
    result = wallsAndGates(rooms)
    for row in result:
        print(row)
    # Expected:
    # [3, -1, 0, 1]
    # [2, 2, 1, -1]
    # [1, -1, 2, -1]
    # [0, -1, 3, 4]`,
            go: `package main

import "fmt"

const INF = 2147483647

// WallsAndGates fills each room with distance to nearest gate
// Time: O(M*N), Space: O(M*N)
func WallsAndGates(rooms [][]int) [][]int {
    if len(rooms) == 0 || len(rooms[0]) == 0 {
        return rooms
    }

    rows, cols := len(rooms), len(rooms[0])
    queue := [][2]int{}

    // Initialize: add all gates to queue
    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if rooms[r][c] == 0 { // Gate
                queue = append(queue, [2]int{r, c})
            }
        }
    }

    directions := [][2]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}

    // BFS from all gates
    for len(queue) > 0 {
        cell := queue[0]
        queue = queue[1:]
        r, c := cell[0], cell[1]

        for _, d := range directions {
            nr, nc := r+d[0], c+d[1]

            // Only process empty rooms (INF)
            if nr >= 0 && nr < rows && nc >= 0 && nc < cols && rooms[nr][nc] == INF {
                rooms[nr][nc] = rooms[r][c] + 1
                queue = append(queue, [2]int{nr, nc})
            }
        }
    }

    return rooms
}

func main() {
    rooms := [][]int{
        {INF, -1, 0, INF},
        {INF, INF, INF, -1},
        {INF, -1, INF, -1},
        {0, -1, INF, INF},
    }
    result := WallsAndGates(rooms)
    for _, row := range result {
        fmt.Println(row)
    }
    // Expected: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/02-walls-and-gates', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/02-walls-and-gates'] = problem;

})();
