/**
 * Maximum Sum with at Least K Elements
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Sum with at Least K Elements',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm',
        description: 'Given an array of integers and an integer k, find the maximum sum of a subarray that contains at least k elements.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
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
        "nums": [
                1,
                -2,
                3,
                -1,
                5
        ],
        "k": 2
},
        output: 7,
        explanation: 'Processing the input data produces the output. For input nums=[1, -2, 3, -1, 5], k=2, the result is 7.'
    },
    {
        input: {
        "nums": [
                -1,
                -2,
                -3
        ],
        "k": 2
},
        output: -3,
        explanation: 'Processing the input data produces the output. For input nums=[-1, -2, -3], k=2, the result is -3.'
    }
        ],
        solutions: {
            python: `def maximumSumWithAtLeastKElements(data):
    """
    Maximum Sum with at Least K Elements

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

// MaximumSumWithAtLeastKElements solves the Maximum Sum with at Least K Elements problem.
// Time: O(n), Space: O(n)
func MaximumSumWithAtLeastKElements(data interface{}) interface{} {
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
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/03-max-sum-k-elements', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/03-max-sum-k-elements'] = problem;

})();
