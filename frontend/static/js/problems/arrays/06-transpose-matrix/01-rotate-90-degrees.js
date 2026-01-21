/**
 * Rotate 90 Degrees
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rotate 90 Degrees',
        difficulty: 'Medium',
        algorithm: 'general',
        parent: '06-transpose-matrix',
        description: 'Given an n x n 2D square matrix representing an image, rotate the matrix by 90 degrees clockwise **in-place**. You must modify the input matrix directly. Do NOT allocate another 2D matrix for the rotation.',
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
        "raw": "matrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]"
},
        output: "[\n    [7, 4, 1],\n    [8, 5, 2],\n    [9, 6, 3]\n]",
        explanation: 'Given the input, the algorithm processes it to produce [\n    [7, 4, 1],\n    [8, 5, 2],\n    [9, 6, 3]\n]'
    },
    {
        input: {
        "raw": "matrix = [\n    [1,  2,  3,  4],\n    [5,  6,  7,  8],\n    [9,  10, 11, 12],\n    [13, 14, 15, 16]\n]"
},
        output: "[\n    [13, 9,  5, 1],\n    [14, 10, 6, 2],\n    [15, 11, 7, 3],\n    [16, 12, 8, 4]\n]",
        explanation: 'Given the input, the algorithm processes it to produce [\n    [13, 9,  5, 1],\n    [14, 10, 6, 2],\n    [15, 11, 7, 3],\n    [16, 12, 8, 4]\n]'
    }
        ],
        solutions: {
            python: `def rotate90Degrees(data):
    """
    Rotate 90 Degrees

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

// Rotate90Degrees solves the Rotate 90 Degrees problem.
// Time: O(n), Space: O(n)
func Rotate90Degrees(data interface{}) interface{} {
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

    // Register with ProblemRenderer - as sub-problem of 06-transpose-matrix
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/01-rotate-90-degrees', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/01-rotate-90-degrees'] = problem;

})();
