/**
 * Shortest Path in Binary Matrix
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Path in Binary Matrix',
        difficulty: 'Medium',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search',
        description: 'Given an n x n binary matrix grid, return the length of the shortest **clear path** in the matrix. If there is no clear path, return -1. A **clear path** in a binary matrix is a path from the **top-left** cell (i.e., (0, 0)) to the **bottom-right** cell (i.e., (n - 1, n - 1)) such that: - All the visited cells of the path are 0 - All the adjacent cells of the path are **8-directionally** connected (i.e., they are different and they share an edge or a corner) The **length** of a clear path is the',
        problem: 'Use Breadth-First Search to explore level by level. BFS is ideal for finding shortest paths in unweighted graphs. Use a queue to process nodes in order of distance.',
        complexity: {
            time: 'O(N^2)',
            space: 'O(N^2)'
        },
        hints: [
            'Use a queue to process nodes level by level.',
            'BFS naturally finds shortest paths in unweighted graphs.',
            'Track distance or level for each node.',
            'Mark nodes as visited when adding to queue, not when processing.',
            'Consider bidirectional BFS for optimization.'
        ],
        examples: [
    {
        input: {
        "grid": [
                [
                        0,
                        1
                ],
                [
                        1,
                        0
                ]
        ]
},
        output: 2,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input grid=[[0, 1], [1, 0]], the result is 2.'
    },
    {
        input: {
        "grid": [
                [
                        0,
                        0,
                        0
                ],
                [
                        1,
                        1,
                        0
                ],
                [
                        1,
                        1,
                        0
                ]
        ]
},
        output: 4,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input grid=[[0, 0, 0], [1, 1, 0], [1, 1, 0]], the result is 4.'
    },
    {
        input: {
        "grid": [
                [
                        1,
                        0,
                        0
                ],
                [
                        1,
                        1,
                        0
                ],
                [
                        1,
                        1,
                        0
                ]
        ]
},
        output: -1,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input grid=[[1, 0, 0], [1, 1, 0], [1, 1, 0]], the result is -1.'
    }
        ],
        solutions: {
            python: `def shortestPathInBinaryMatrix(data):
    """
    Shortest Path in Binary Matrix

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: BFS explores breadth-first, ideal for shortest paths

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

// ShortestPathInBinaryMatrix solves the Shortest Path in Binary Matrix problem.
// Time: O(n), Space: O(n)
func ShortestPathInBinaryMatrix(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: BFS explores breadth-first, ideal for shortest paths

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
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/02-shortest-path-binary-matrix', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/02-shortest-path-binary-matrix'] = problem;

})();
