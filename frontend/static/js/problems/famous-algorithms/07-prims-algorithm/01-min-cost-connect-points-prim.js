/**
 * Min Cost to Connect Points (Prim's)
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: prims-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Cost to Connect Points (Prim\'s)',
        difficulty: 'Medium',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm',
        description: 'Connect all points with minimum cost using Manhattan distance. Use Prim\'s algorithm instead of Kruskal\'s.',
        complexity: {
            time: 'O(n^2 log n)',
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
        "points": [
                [
                        0,
                        0
                ],
                [
                        2,
                        2
                ],
                [
                        3,
                        10
                ],
                [
                        5,
                        2
                ],
                [
                        7,
                        0
                ]
        ]
},
        output: 20,
        explanation: 'Processing the input data produces the output. For input points=[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]], the result is 20.'
    }
        ],
        solutions: {
            python: `def minCostToConnectPointsPrim(data):
    """
    Min Cost to Connect Points (Prim\

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

// MinCostToConnectPointsPrim solves the Min Cost to Connect Points (Prim\ problem.
// Time: O(n), Space: O(n)
func MinCostToConnectPointsPrim(data interface{}) interface{} {
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
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/01-min-cost-connect-points-prim', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/01-min-cost-connect-points-prim'] = problem;

})();
