/**
 * Number of Closed Islands
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Closed Islands',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands',
        description: 'Given a 2D grid consisting of 0s (land) and 1s (water), count the number of closed islands. A closed island is an island totally surrounded by water (0s surrounded by 1s that don\'t touch the boundary).',
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
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        0
                ],
                [
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        1,
                        0
                ],
                [
                        1,
                        0,
                        1,
                        0,
                        1,
                        1,
                        1,
                        0
                ],
                [
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        1
                ],
                [
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        0
                ]
        ]
},
        output: 2,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[1, 1, 1, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 1, 1, 0], [1, 0, 1, 0, 1, 1, 1, 0], [1, 0, 0, 0, 0, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 0]], the result is 2.'
    }
        ],
        solutions: {
            python: `def numberOfClosedIslands(data):
    """
    Number of Closed Islands

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

// NumberOfClosedIslands solves the Number of Closed Islands problem.
// Time: O(n), Space: O(n)
func NumberOfClosedIslands(data interface{}) interface{} {
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
        window.ProblemRenderer.register('graphs', '06-remove-islands/03-count-closed-islands', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/03-count-closed-islands'] = problem;

})();
