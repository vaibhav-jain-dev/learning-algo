/**
 * Path With Minimum Effort
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: dijkstras-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Path With Minimum Effort',
        difficulty: 'Medium',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm',
        description: 'You are given a 2D array of heights representing a map. You need to travel from the top-left cell (0, 0) to the bottom-right cell (rows-1, cols-1). The **effort** of a path is the maximum absolute difference in heights between two consecutive cells. Return the minimum effort required to travel from the top-left to the bottom-right.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(M * N * log(M * N))',
            space: 'O(M * N)'
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
        "heights": [
                [
                        1,
                        2,
                        2
                ],
                [
                        3,
                        8,
                        2
                ],
                [
                        5,
                        3,
                        5
                ]
        ]
},
        output: 2,
        explanation: 'Processing the input data produces the output. For input heights=[[1, 2, 2], [3, 8, 2], [5, 3, 5]], the result is 2.'
    }
        ],
        solutions: {
            python: `def pathWithMinimumEffort(data):
    """
    Path With Minimum Effort

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

// PathWithMinimumEffort solves the Path With Minimum Effort problem.
// Time: O(n), Space: O(n)
func PathWithMinimumEffort(data interface{}) interface{} {
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
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/03-path-with-minimum-effort', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/03-path-with-minimum-effort'] = problem;

})();
