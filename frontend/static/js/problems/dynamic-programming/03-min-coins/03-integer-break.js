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

    Break integer n into at least 2 positive integers to maximize product.

    Time: O(n^2)
    Space: O(n)
    """
    n = data["n"]

    # Special cases
    if n == 2:
        return 1  # 1 + 1 = 2, product = 1
    if n == 3:
        return 2  # 1 + 2 = 3, product = 2

    # dp[i] = maximum product for integer i (can use whole number)
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    dp[3] = 3

    for i in range(4, n + 1):
        for j in range(1, i // 2 + 1):
            dp[i] = max(dp[i], dp[j] * dp[i - j])

    return dp[n]


# Test
if __name__ == "__main__":
    print(integerBreak({"n": 2}))   # Output: 1
    print(integerBreak({"n": 10}))  # Output: 36
    print(integerBreak({"n": 8}))   # Output: 18`,
            go: `package main

import "fmt"

// IntegerBreak solves the Integer Break problem.
// Break integer n into at least 2 positive integers to maximize product.
// Time: O(n^2), Space: O(n)
func IntegerBreak(data map[string]interface{}) int {
    n := int(data["n"].(float64))

    // Special cases
    if n == 2 {
        return 1 // 1 + 1 = 2, product = 1
    }
    if n == 3 {
        return 2 // 1 + 2 = 3, product = 2
    }

    // dp[i] = maximum product for integer i (can use whole number)
    dp := make([]int, n+1)
    dp[1] = 1
    dp[2] = 2
    dp[3] = 3

    for i := 4; i <= n; i++ {
        for j := 1; j <= i/2; j++ {
            if dp[j]*dp[i-j] > dp[i] {
                dp[i] = dp[j] * dp[i-j]
            }
        }
    }

    return dp[n]
}

func main() {
    fmt.Println(IntegerBreak(map[string]interface{}{"n": float64(2)}))   // 1
    fmt.Println(IntegerBreak(map[string]interface{}{"n": float64(10)}))  // 36
    fmt.Println(IntegerBreak(map[string]interface{}{"n": float64(8)}))   // 18
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
