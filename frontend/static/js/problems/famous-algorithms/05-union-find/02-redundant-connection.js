/**
 * Redundant Connection
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: union-find
 */
(function() {
    'use strict';

    const problem = {
        name: 'Redundant Connection',
        difficulty: 'Medium',
        algorithm: 'union-find',
        parent: '05-union-find',
        description: 'In this problem, a tree is an undirected graph that is connected and has no cycles. Given a graph that started as a tree with n nodes and n edges (one extra edge was added), find and return the edge that can be removed so the resulting graph is a tree.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n * alpha(n))',
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
        "edges": [
                [
                        1,
                        2
                ],
                [
                        1,
                        3
                ],
                [
                        2,
                        3
                ]
        ]
},
        output: [2, 3],
        explanation: 'Processing the input data produces the output. For input edges=[[1, 2], [1, 3], [2, 3]], the result is [2, 3].'
    }
        ],
        solutions: {
            python: `def redundantConnection(data):
    """
    Redundant Connection

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

// RedundantConnection solves the Redundant Connection problem.
// Time: O(n), Space: O(n)
func RedundantConnection(data interface{}) interface{} {
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
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/02-redundant-connection', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/02-redundant-connection'] = problem;

})();
