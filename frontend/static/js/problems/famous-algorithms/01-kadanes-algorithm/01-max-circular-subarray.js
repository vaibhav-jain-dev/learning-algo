/**
 * Maximum Sum Circular Subarray
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Sum Circular Subarray',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm',
        description: 'Given a circular integer array nums, find the maximum possible sum of a non-empty subarray. A circular array means the end of the array connects to the beginning.',
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
                1,
                -2,
                3,
                -2
        ]
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input nums=[1, -2, 3, -2], the result is 3.'
    },
    {
        input: {
        "nums": [
                5,
                -3,
                5
        ]
},
        output: 10,
        explanation: 'Processing the input data produces the output. For input nums=[5, -3, 5], the result is 10.'
    }
        ],
        solutions: {
            python: `def maximumSumCircularSubarray(data):
    """
    Maximum Sum Circular Subarray

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

// MaximumSumCircularSubarray solves the Maximum Sum Circular Subarray problem.
// Time: O(n), Space: O(n)
func MaximumSumCircularSubarray(data interface{}) interface{} {
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
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/01-max-circular-subarray', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/01-max-circular-subarray'] = problem;

})();
