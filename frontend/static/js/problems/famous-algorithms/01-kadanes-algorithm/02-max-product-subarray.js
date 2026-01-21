/**
 * Maximum Product Subarray
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Product Subarray',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm',
        description: 'Given an integer array nums, find a contiguous subarray that has the largest product, and return the product.',
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
        "nums": [
                2,
                3,
                -2,
                4
        ]
},
        output: 6,
        explanation: 'Processing the input data produces the output. For input nums=[2, 3, -2, 4], the result is 6.'
    },
    {
        input: {
        "nums": [
                -2,
                0,
                -1
        ]
},
        output: 0,
        explanation: 'Processing the input data produces the output. For input nums=[-2, 0, -1], the result is 0.'
    }
        ],
        solutions: {
            python: `def maximumProductSubarray(data):
    """
    Maximum Product Subarray

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

// MaximumProductSubarray solves the Maximum Product Subarray problem.
// Time: O(n), Space: O(n)
func MaximumProductSubarray(data interface{}) interface{} {
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
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/02-max-product-subarray', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/02-max-product-subarray'] = problem;

})();
