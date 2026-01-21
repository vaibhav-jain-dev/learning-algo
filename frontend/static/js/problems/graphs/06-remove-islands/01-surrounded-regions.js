/**
 * Surrounded Regions
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'Surrounded Regions',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands',
        description: 'Given an m x n matrix board containing \'X\' and \'O\', capture all regions that are 4-directionally surrounded by \'X\'. A region is captured by flipping all \'O\'s into \'X\'s in that surrounded region.',
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
        "board": [
                [
                        "X",
                        "X",
                        "X",
                        "X"
                ],
                [
                        "X",
                        "O",
                        "O",
                        "X"
                ],
                [
                        "X",
                        "X",
                        "O",
                        "X"
                ],
                [
                        "X",
                        "O",
                        "X",
                        "X"
                ]
        ]
},
        output: [["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "O", "X", "X"]],
        explanation: 'Exploring the graph structure, we find the required path or value. For input board=[[\'X\', \'X\', \'X\', \'X\'], [\'X\', \'O\', \'O\', \'X\'], [\'X\', \'X\', \'O\', \'X\'], [\'X\', \'O\', \'X\', \'X\']], the result is [[\'X\', \'X\', \'X\', \'X\'], [\'X\', \'X\', \'X\', \'X\'], [\'X\', \'X\', \'X\', \'X\'], [\'X\', \'O\', \'X\', \'X\']].'
    }
        ],
        solutions: {
            python: `def surroundedRegions(data):
    """
    Surrounded Regions

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

// SurroundedRegions solves the Surrounded Regions problem.
// Time: O(n), Space: O(n)
func SurroundedRegions(data interface{}) interface{} {
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
        window.ProblemRenderer.register('graphs', '06-remove-islands/01-surrounded-regions', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/01-surrounded-regions'] = problem;

})();
