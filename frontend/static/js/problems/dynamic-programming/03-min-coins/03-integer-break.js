/**
 * Integer Break
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Integer Break',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '03-min-coins',
        description: 'Given a positive integer n, break it into the sum of **at least two** positive integers and maximize the product of those integers. Return the **maximum product** you can get.',
        problem: 'Use 2D dynamic programming where dp[i][j] represents the optimal solution for subproblem (i,j). Build the table by considering all possible transitions from smaller subproblems.',
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
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
        "n": 2
},
        output: 1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=2, the result is 1.'
    },
    {
        input: {
        "n": 10
},
        output: 36,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=10, the result is 36.'
    },
    {
        input: {
        "n": 8
},
        output: 18,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=8, the result is 18.'
    }
        ],
        solutions: {
            python: `def integerBreak(data):
    """
    Integer Break

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

// IntegerBreak solves the Integer Break problem.
// Time: O(n), Space: O(n)
func IntegerBreak(data interface{}) interface{} {
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
        window.ProblemRenderer.register('dynamic-programming', '03-min-coins/03-integer-break', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/03-min-coins/03-integer-break'] = problem;

})();
