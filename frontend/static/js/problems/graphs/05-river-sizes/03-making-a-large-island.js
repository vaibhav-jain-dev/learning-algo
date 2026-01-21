/**
 * Making A Large Island
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-largest-island
 */
(function() {
    'use strict';

    const problem = {
        name: 'Making A Large Island',
        difficulty: 'Hard',
        algorithm: 'graph-largest-island',
        parent: '05-river-sizes',
        description: 'You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1. Return the size of the largest island in grid after applying this operation. An island is a 4-directionally connected group of 1s.',
        problem: 'Use flood fill (DFS/BFS) to explore connected components. Start from each unvisited cell, mark visited cells, and track the property you need (size, count, etc.). The key insight is that connected cells form a single component.',
        complexity: {
            time: 'O(N^2)',
            space: 'O(N^2)'
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
                        1,
                        0
                ],
                [
                        0,
                        1
                ]
        ]
},
        output: 3,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[1, 0], [0, 1]], the result is 3.'
    },
    {
        input: {
        "grid": [
                [
                        1,
                        1
                ],
                [
                        1,
                        0
                ]
        ]
},
        output: 4,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[1, 1], [1, 0]], the result is 4.'
    },
    {
        input: {
        "grid": [
                [
                        1,
                        1
                ],
                [
                        1,
                        1
                ]
        ]
},
        output: 4,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[1, 1], [1, 1]], the result is 4.'
    }
        ],
        solutions: {
            python: `def makingALargeIsland(data):
    """
    Making A Large Island

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

// MakingALargeIsland solves the Making A Large Island problem.
// Time: O(n), Space: O(n)
func MakingALargeIsland(data interface{}) interface{} {
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
        window.ProblemRenderer.register('graphs', '05-river-sizes/03-making-a-large-island', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/03-making-a-large-island'] = problem;

})();
