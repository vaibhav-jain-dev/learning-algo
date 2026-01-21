/**
 * Sorted Squared No Duplicates
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sorted Squared No Duplicates',
        difficulty: 'Medium',
        algorithm: 'general',
        parent: '03-sorted-squared-array',
        description: 'Given a sorted array of integers, square all elements and return a sorted array with duplicates removed.',
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
        "raw": "array = [-3, -2, -1, 1, 2, 3]"
},
        output: "[1, 4, 9]\nExplanation: -1 and 1 both give 1, -2 and 2 both give 4, etc.",
        explanation: 'Given the input, the algorithm processes it to produce [1, 4, 9]\nExplanation: -1 and 1 both give 1, -2 and 2 both give 4, etc.'
    },
    {
        input: {
        "raw": "array = [-5, -3, 0, 2, 3, 5]"
},
        output: "[0, 4, 9, 25]",
        explanation: 'Given the input, the algorithm processes it to produce [0, 4, 9, 25]'
    }
        ],
        solutions: {
            python: `def sortedSquaredNoDuplicates(data):
    """
    Sorted Squared No Duplicates

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

// SortedSquaredNoDuplicates solves the Sorted Squared No Duplicates problem.
// Time: O(n), Space: O(n)
func SortedSquaredNoDuplicates(data interface{}) interface{} {
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
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/02-sorted-squared-no-duplicates', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/02-sorted-squared-no-duplicates'] = problem;

})();
