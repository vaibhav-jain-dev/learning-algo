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
            python: `def wallsAndGates(data):
    """
    Walls and Gates

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: Identify the optimal data structure and algorithm

    result = None

    # Process input
    # ...

    return result


# Test
if __name__ == "__main__":
    # Add test cases
    pass`,
            go: `package main

import "fmt"

// WallsAndGates solves the Walls and Gates problem.
// Time: O(n), Space: O(n)
func WallsAndGates(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Identify the optimal data structure and algorithm

    var result interface{}

    // Process input
    // ...

    return result
}

func main() {
    // Test cases
    fmt.Println("Test")
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
