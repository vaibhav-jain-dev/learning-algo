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
            python: `def rottingOranges(data):
    """
    Rotting Oranges

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

// RottingOranges solves the Rotting Oranges problem.
// Time: O(n), Space: O(n)
func RottingOranges(data interface{}) interface{} {
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
        window.ProblemRenderer.register('graphs', '08-minimum-passes/01-rotting-oranges', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/01-rotting-oranges'] = problem;

})();
