/**
 * Shortest Path in Binary Grid
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: bfs-astar
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Path in Binary Grid',
        difficulty: 'Medium',
        algorithm: 'bfs-astar',
        parent: '08-a-star-algorithm',
        description: 'Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1. A clear path is a path from the top-left cell (0, 0) to the bottom-right cell (n-1, n-1) such that: - All visited cells are 0 - All adjacent cells in the path are 8-directionally connected (they share an edge or corner) The length of a path is the number of visited cells.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n^2)',
            space: 'O(n^2)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
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
    }
        ],
        solutions: {
            python: `def shortestPathInBinaryGrid(data):
    """
    Shortest Path in Binary Grid

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

// ShortestPathInBinaryGrid solves the Shortest Path in Binary Grid problem.
// Time: O(n), Space: O(n)
func ShortestPathInBinaryGrid(data interface{}) interface{} {
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
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/01-shortest-path-in-grid', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/01-shortest-path-in-grid'] = problem;

})();
