/**
 * Number of Enclaves
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Enclaves',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands',
        description: 'You are given an m x n binary matrix grid, where 0 represents water and 1 represents land. An island is a maximal 4-directionally connected group of 1s. An **enclave** is a land cell that cannot reach any boundary cell of the grid by walking through land cells. Return the number of land cells in grid that are enclaves.',
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
                        0,
                        0,
                        0,
                        0
                ],
                [
                        1,
                        0,
                        1,
                        0
                ],
                [
                        0,
                        1,
                        1,
                        0
                ],
                [
                        0,
                        0,
                        0,
                        0
                ]
        ]
},
        output: 3,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[0, 0, 0, 0], [1, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]], the result is 3.'
    }
        ],
        solutions: {
            python: `def numberOfEnclaves(data):
    """
    Number of Enclaves

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

// NumberOfEnclaves solves the Number of Enclaves problem.
// Time: O(n), Space: O(n)
func NumberOfEnclaves(data interface{}) interface{} {
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
        window.ProblemRenderer.register('graphs', '06-remove-islands/02-number-of-enclaves', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/02-number-of-enclaves'] = problem;

})();
