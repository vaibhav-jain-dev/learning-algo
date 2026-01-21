/**
 * Max Area of Island
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Area of Island',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes',
        description: 'You are given an m x n binary matrix grid. An island is a group of 1\'s (representing land) connected 4-directionally (horizontal or vertical). You may assume all four edges of the grid are surrounded by water. The area of an island is the number of cells with a value 1 in the island. Return the maximum area of an island in grid. If there is no island, return 0.',
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
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0
                ],
                [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        1,
                        1,
                        0,
                        0,
                        0
                ],
                [
                        0,
                        1,
                        1,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                ],
                [
                        0,
                        1,
                        0,
                        0,
                        1,
                        1,
                        0,
                        0,
                        1,
                        0,
                        1,
                        0,
                        0
                ],
                [
                        0,
                        1,
                        0,
                        0,
                        1,
                        1,
                        0,
                        0,
                        1,
                        1,
                        1,
                        0,
                        0
                ],
                [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0
                ],
                [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        1,
                        1,
                        0,
                        0,
                        0
                ],
                [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        1,
                        0,
                        0,
                        0,
                        0
                ]
        ]
},
        output: 6,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], ..., [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]] (length 8), the result is 6.'
    },
    {
        input: {
        "grid": [
                [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                ]
        ]
},
        output: 0,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[0, 0, 0, 0, 0, 0, 0, 0]], the result is 0.'
    }
        ],
        solutions: {
            python: `def maxAreaOfIsland(data):
    """
    Max Area of Island

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: Connected components can be explored using DFS/BFS

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

// MaxAreaOfIsland solves the Max Area of Island problem.
// Time: O(n), Space: O(n)
func MaxAreaOfIsland(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Connected components can be explored using DFS/BFS

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
        window.ProblemRenderer.register('graphs', '05-river-sizes/01-max-area-of-island', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/01-max-area-of-island'] = problem;

})();
