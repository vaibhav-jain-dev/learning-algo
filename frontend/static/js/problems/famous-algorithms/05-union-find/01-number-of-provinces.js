/**
 * Number of Provinces
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: union-find
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Provinces',
        difficulty: 'Medium',
        algorithm: 'union-find',
        parent: '05-union-find',
        description: 'There are n cities. A province is a group of directly or indirectly connected cities. Given an n x n matrix isConnected where isConnected[i][j] = 1 if city i and city j are directly connected, return the total number of provinces.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n^2 * alpha(n))',
            space: 'O(n)'
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
        "isConnected": [
                [
                        1,
                        1,
                        0
                ],
                [
                        1,
                        1,
                        0
                ],
                [
                        0,
                        0,
                        1
                ]
        ]
},
        output: 2,
        explanation: 'Processing the input data produces the output. For input isConnected=[[1, 1, 0], [1, 1, 0], [0, 0, 1]], the result is 2.'
    }
        ],
        solutions: {
            python: `def numberOfProvinces(data):
    """
    Number of Provinces

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

// NumberOfProvinces solves the Number of Provinces problem.
// Time: O(n), Space: O(n)
func NumberOfProvinces(data interface{}) interface{} {
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
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/01-number-of-provinces', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/01-number-of-provinces'] = problem;

})();
