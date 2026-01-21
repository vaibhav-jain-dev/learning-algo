/**
 * Merge Sorted Arrays With Squares
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge Sorted Arrays With Squares',
        difficulty: 'Medium',
        algorithm: 'general',
        parent: '03-sorted-squared-array',
        description: 'Given two sorted arrays, square all elements and merge them into a single sorted array.',
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
        "raw": "arr1 = [-3, -1, 2], arr2 = [-2, 4]"
},
        output: "[1, 4, 4, 9, 16]",
        explanation: 'Given the input, the algorithm processes it to produce [1, 4, 4, 9, 16]'
    },
    {
        input: {
        "raw": "arr1 = [-5, 0, 3], arr2 = [1, 2, 6]"
},
        output: "[0, 1, 4, 9, 25, 36]",
        explanation: 'Given the input, the algorithm processes it to produce [0, 1, 4, 9, 25, 36]'
    }
        ],
        solutions: {
            python: `def mergeSortedArraysWithSquares(data):
    """
    Merge Sorted Arrays With Squares

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

// MergeSortedArraysWithSquares solves the Merge Sorted Arrays With Squares problem.
// Time: O(n), Space: O(n)
func MergeSortedArraysWithSquares(data interface{}) interface{} {
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

    // Register with ProblemRenderer - as sub-problem of 03-sorted-squared-array
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/01-merge-sorted-arrays-with-squares', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/01-merge-sorted-arrays-with-squares'] = problem;

})();
