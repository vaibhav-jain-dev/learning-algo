/**
 * Number of Islands
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Islands',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search',
        description: 'Given an m x n 2D binary grid grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands. An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are surrounded by water.',
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        hints: [
            'Start from the source node and explore as deep as possible.',
            'Use recursion or an explicit stack for DFS.',
            'Mark nodes as visited before exploring neighbors.',
            'Consider the order of exploration for the desired result.',
            'Handle disconnected components if needed.'
        ],
        examples: [
    {
        input: {
        "grid": [
                [
                        "1",
                        "1",
                        "1",
                        "1",
                        "0"
                ],
                [
                        "1",
                        "1",
                        "0",
                        "1",
                        "0"
                ],
                [
                        "1",
                        "1",
                        "0",
                        "0",
                        "0"
                ],
                [
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                ]
        ]
},
        output: 1,
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input grid=[[\'1\', \'1\', \'1\', \'1\', \'0\'], [\'1\', \'1\', \'0\', \'1\', \'0\'], [\'1\', \'1\', \'0\', \'0\', \'0\'], [\'0\', \'0\', \'0\', \'0\', \'0\']], the result is 1.'
    },
    {
        input: {
        "grid": [
                [
                        "1",
                        "1",
                        "0",
                        "0",
                        "0"
                ],
                [
                        "1",
                        "1",
                        "0",
                        "0",
                        "0"
                ],
                [
                        "0",
                        "0",
                        "1",
                        "0",
                        "0"
                ],
                [
                        "0",
                        "0",
                        "0",
                        "1",
                        "1"
                ]
        ]
},
        output: 3,
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input grid=[[\'1\', \'1\', \'0\', \'0\', \'0\'], [\'1\', \'1\', \'0\', \'0\', \'0\'], [\'0\', \'0\', \'1\', \'0\', \'0\'], [\'0\', \'0\', \'0\', \'1\', \'1\']], the result is 3.'
    }
        ],
        solutions: {
            python: `def numberOfIslands(data):
    """
    Number of Islands

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: DFS explores depth-first, ideal for paths and connectivity

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

// NumberOfIslands solves the Number of Islands problem.
// Time: O(n), Space: O(n)
func NumberOfIslands(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: DFS explores depth-first, ideal for paths and connectivity

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
        window.ProblemRenderer.register('graphs', '01-depth-first-search/01-number-of-islands', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/01-number-of-islands'] = problem;

})();
