/**
 * Partition Equal Subset Sum
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Partition Equal Subset Sum',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change',
        description: 'Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal, or false otherwise.',
        problem: 'Use 2D dynamic programming where dp[i][j] represents the optimal solution for subproblem (i,j). Build the table by considering all possible transitions from smaller subproblems.',
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
                5,
                11,
                5
        ]
},
        output: true,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1, 5, 11, 5], the result is true.'
    },
    {
        input: {
        "nums": [
                1,
                2,
                3,
                5
        ]
},
        output: false,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1, 2, 3, 5], the result is false.'
    }
        ],
        solutions: {
            python: `def partitionEqualSubsetSum(data):
    """
    Partition Equal Subset Sum

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

// PartitionEqualSubsetSum solves the Partition Equal Subset Sum problem.
// Time: O(n), Space: O(n)
func PartitionEqualSubsetSum(data interface{}) interface{} {
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
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/03-partition-equal-subset-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/03-partition-equal-subset-sum'] = problem;

})();
