/**
 * Anti Spiral Traverse
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Anti Spiral Traverse',
        difficulty: 'Hard',
        algorithm: 'general',
        parent: '11-spiral-traverse',
        description: 'Given an m x n matrix, traverse it in anti-spiral order (counterclockwise from center outward or counterclockwise from outside inward, depending on interpretation). For this problem, we define anti-spiral as: Start from the center and move counterclockwise outward (left first, then down, right, up).',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
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
        "raw": "matrix = [\n    [1,  2,  3],\n    [4,  5,  6],\n    [7,  8,  9]\n]"
},
        output: "[5, 4, 7, 8, 9, 6, 3, 2, 1]\n(Center out, counterclockwise: 5->left->down->right->up)",
        explanation: 'Given the input, the algorithm processes it to produce [5, 4, 7, 8, 9, 6, 3, 2, 1]\n(Center out, counterclockwise: 5->left->down->right->up)'
    },
    {
        input: {
        "raw": "matrix = [\n    [1,  2,  3,  4],\n    [5,  6,  7,  8],\n    [9,  10, 11, 12]\n]"
},
        output: "[6, 5, 9, 10, 11, 7, 3, 2, 1, 4, 8, 12]",
        explanation: 'Given the input, the algorithm processes it to produce [6, 5, 9, 10, 11, 7, 3, 2, 1, 4, 8, 12]'
    }
        ],
        solutions: {
            python: `def antiSpiralTraverse(data):
    """
    Anti Spiral Traverse

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

// AntiSpiralTraverse solves the Anti Spiral Traverse problem.
// Time: O(n), Space: O(n)
func AntiSpiralTraverse(data interface{}) interface{} {
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

    // Register with ProblemRenderer - as sub-problem of 11-spiral-traverse
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/03-anti-spiral-traverse', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/03-anti-spiral-traverse'] = problem;

})();
