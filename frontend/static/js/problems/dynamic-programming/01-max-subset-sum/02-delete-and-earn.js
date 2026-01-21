/**
 * Delete and Earn
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-max-subset
 */
(function() {
    'use strict';

    const problem = {
        name: 'Delete and Earn',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum',
        description: 'You are given an integer array nums. You want to maximize the number of points you get by performing the following operation any number of times: - Pick any nums[i] and delete it to earn nums[i] points. - Afterwards, you must delete **every** element equal to nums[i] - 1 and **every** element equal to nums[i] + 1. Return the **maximum number of points** you can earn by applying the above operation some number of times.',
        problem: 'Use 2D dynamic programming where dp[i][j] represents the optimal solution for subproblem (i,j). Build the table by considering all possible transitions from smaller subproblems.',
        complexity: {
            time: 'O(n + max_val)',
            space: 'O(max_val)'
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
                3,
                4,
                2
        ]
},
        output: 6,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[3, 4, 2], the result is 6.'
    },
    {
        input: {
        "nums": [
                2,
                2,
                3,
                3,
                3,
                4
        ]
},
        output: 9,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[2, 2, ..., 4] (length 6), the result is 9.'
    }
        ],
        solutions: {
            python: `def deleteAndEarn(data):
    """
    Delete and Earn

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

// DeleteAndEarn solves the Delete and Earn problem.
// Time: O(n), Space: O(n)
func DeleteAndEarn(data interface{}) interface{} {
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
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/02-delete-and-earn', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/02-delete-and-earn'] = problem;

})();
