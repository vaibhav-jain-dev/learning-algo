/**
 * Count Sub Islands
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Sub Islands',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes',
        description: 'You are given two m x n binary matrices grid1 and grid2 containing only 0\'s (representing water) and 1\'s (representing land). An island is a group of 1\'s connected 4-directionally. An island in grid2 is considered a **sub-island** if there is an island in grid1 that contains all the cells that make up this island in grid2. Return the number of islands in grid2 that are considered sub-islands.',
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
        "grid1": [
                [
                        1,
                        1,
                        1,
                        0,
                        0
                ],
                [
                        0,
                        1,
                        1,
                        1,
                        1
                ],
                [
                        0,
                        0,
                        0,
                        0,
                        0
                ],
                [
                        1,
                        0,
                        0,
                        0,
                        0
                ],
                [
                        1,
                        1,
                        0,
                        1,
                        1
                ]
        ],
        "grid2": [
                [
                        1,
                        1,
                        1,
                        0,
                        0
                ],
                [
                        0,
                        0,
                        1,
                        1,
                        1
                ],
                [
                        0,
                        1,
                        0,
                        0,
                        0
                ],
                [
                        1,
                        0,
                        1,
                        1,
                        0
                ],
                [
                        0,
                        1,
                        0,
                        1,
                        0
                ]
        ]
},
        output: 3,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid1=[[1, 1, 1, 0, 0], [0, 1, 1, 1, 1], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 0, 1, 1]], grid2=[[1, 1, 1, 0, 0], [0, 0, 1, 1, 1], [0, 1, 0, 0, 0], [1, 0, 1, 1, 0], [0, 1, 0, 1, 0]], the result is 3.'
    }
        ],
        solutions: {
            python: `def countSubIslands(data):
    """
    Count Sub Islands

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

// CountSubIslands solves the Count Sub Islands problem.
// Time: O(n), Space: O(n)
func CountSubIslands(data interface{}) interface{} {
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
        window.ProblemRenderer.register('graphs', '05-river-sizes/02-count-sub-islands', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/02-count-sub-islands'] = problem;

})();
