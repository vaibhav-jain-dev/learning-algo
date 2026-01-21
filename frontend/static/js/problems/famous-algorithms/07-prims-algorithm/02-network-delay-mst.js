/**
 * Network Delay via MST
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: prims-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Network Delay via MST',
        difficulty: 'Medium',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm',
        description: 'Given a network of servers, find the minimum cost to establish a connected network where all servers can communicate. Then determine the maximum latency for a signal to reach all nodes.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(E log V)',
            space: 'O(V + E)'
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
        "connections": [
                [
                        0,
                        1,
                        1
                ],
                [
                        0,
                        2,
                        2
                ],
                [
                        1,
                        2,
                        3
                ],
                [
                        1,
                        3,
                        4
                ],
                [
                        2,
                        3,
                        5
                ]
        ]
},
        output: {"mstCost": 7, "maxDepth": 2},
        explanation: 'Processing the input data produces the output. For input n=4, connections=[[0, 1, 1], [0, 2, 2], [1, 2, 3], [1, 3, 4], [2, 3, 5]], the result is {\'mstCost\': 7, \'maxDepth\': 2}.'
    }
        ],
        solutions: {
            python: `def networkDelayViaMst(data):
    """
    Network Delay via MST

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

// NetworkDelayViaMst solves the Network Delay via MST problem.
// Time: O(n), Space: O(n)
func NetworkDelayViaMst(data interface{}) interface{} {
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
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/02-network-delay-mst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/02-network-delay-mst'] = problem;

})();
