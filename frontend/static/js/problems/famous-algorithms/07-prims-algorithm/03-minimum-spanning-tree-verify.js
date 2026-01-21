/**
 * Minimum Spanning Tree Verification
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: prims-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Spanning Tree Verification',
        difficulty: 'Medium',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm',
        description: 'Given a graph and a proposed spanning tree, verify if the proposed tree is indeed a minimum spanning tree.',
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
        "graphEdges": [
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
        ],
        "proposed": [
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
                        3,
                        4
                ]
        ]
},
        output: true,
        explanation: 'Processing the input data produces the output. For input n=4, graphEdges=[[0, 1, 1], [0, 2, 2], [1, 2, 3], [1, 3, 4], [2, 3, 5]], proposed=[[0, 1, 1], [0, 2, 2], [1, 3, 4]], the result is true.'
    }
        ],
        solutions: {
            python: `def minimumSpanningTreeVerification(data):
    """
    Minimum Spanning Tree Verification

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

// MinimumSpanningTreeVerification solves the Minimum Spanning Tree Verification problem.
// Time: O(n), Space: O(n)
func MinimumSpanningTreeVerification(data interface{}) interface{} {
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
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/03-minimum-spanning-tree-verify', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/03-minimum-spanning-tree-verify'] = problem;

})();
