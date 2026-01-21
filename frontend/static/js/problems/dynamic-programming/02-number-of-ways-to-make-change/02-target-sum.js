/**
 * Target Sum
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Target Sum',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change',
        description: 'You are given an integer array nums and an integer target. You want to build an **expression** out of nums by adding one of the symbols \'+\' and \'-\' before each integer in nums and then concatenate all the integers. Return the number of different expressions that you can build, which evaluates to target.',
        complexity: {
            time: 'O(n * sum)',
            space: 'O(sum)'
        },
        hints: [
            'Define the state: what does dp[i][j] represent?',
            'Identify the base cases (usually dp[0][...] and dp[...][0]).',
            'Write the recurrence relation for dp[i][j].',
            'Determine the iteration order to ensure dependencies are computed first.',
            'Consider space optimization if only previous row/column is needed.'
        ],
        examples: [
    {
        input: {
        "nums": [
                1,
                1,
                1,
                1,
                1
        ],
        "target": 3
},
        output: 5,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1, 1, 1, 1, 1], target=3, the result is 5.'
    },
    {
        input: {
        "nums": [
                1
        ],
        "target": 1
},
        output: 1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1], target=1, the result is 1.'
    }
        ],
        solutions: {
            python: `def targetSum(data):
    """
    Target Sum

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

// TargetSum solves the Target Sum problem.
// Time: O(n), Space: O(n)
func TargetSum(data interface{}) interface{} {
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
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/02-target-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/02-target-sum'] = problem;

})();
