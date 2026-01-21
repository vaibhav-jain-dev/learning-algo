/**
 * Negative Cycle Detection
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: bellman-ford
 */
(function() {
    'use strict';

    const problem = {
        name: 'Negative Cycle Detection',
        difficulty: 'Medium',
        algorithm: 'bellman-ford',
        parent: '11-detect-arbitrage',
        description: 'Given a directed weighted graph with n vertices and a list of edges, determine if the graph contains a negative weight cycle (a cycle where the sum of edge weights is negative). Negative cycles make shortest path undefined (can always get shorter by going around the cycle again).',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(V * E)',
            space: 'O(V)'
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
        "n": 4,
        "edges": [
                [
                        0,
                        1,
                        1
                ],
                [
                        1,
                        2,
                        -3
                ],
                [
                        2,
                        3,
                        2
                ],
                [
                        3,
                        1,
                        1
                ]
        ]
},
        output: true,
        explanation: 'Processing the input data produces the output. For input n=4, edges=[[0, 1, 1], [1, 2, -3], [2, 3, 2], [3, 1, 1]], the result is true.'
    }
        ],
        solutions: {
            python: `def negativeCycleDetection(data):
    """
    Negative Cycle Detection

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

// NegativeCycleDetection solves the Negative Cycle Detection problem.
// Time: O(n), Space: O(n)
func NegativeCycleDetection(data interface{}) interface{} {
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
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/03-negative-cycle-detection', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/03-negative-cycle-detection'] = problem;

})();
