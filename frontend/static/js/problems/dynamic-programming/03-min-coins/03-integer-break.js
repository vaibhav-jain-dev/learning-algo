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
        twists: [
            { title: 'Minimize the Product', difficulty: 'Medium', description: 'Break integer n into at least two positive integers, but now minimize the product instead of maximizing it.', whyDifferent: 'Flips the optimization direction. The greedy instinct to use 3s no longer applies; you must think about using 1s strategically and the DP transitions reverse their comparison.', example: 'n=10: break into 1+9=9 or 1+1+8=8, minimum product is 10 broken as 1+1+...+1 = 1, but we need at least 2 parts, so 1+(n-1) gives product n-1=9.' },
            { title: 'Maximize Product With At Most K Parts', difficulty: 'Hard', description: 'Break integer n into at most k positive integers (at least 2) to maximize the product. k is given as an additional constraint.', whyDifferent: 'Adds a parts-count constraint, turning this into a 2D DP problem where state tracks both the remaining value and the number of parts used.', example: 'n=10, k=2: best is 5*5=25. n=10, k=3: best is 3*3*4=36. n=10, k=100: still 36 since more parts past optimal does not help.' },
            { title: 'Maximize Sum of Squares', difficulty: 'Hard', description: 'Break integer n into at least two positive integers. Instead of maximizing the product, maximize the sum of squares of the parts.', whyDifferent: 'Changes the objective function entirely. Larger individual parts contribute quadratically, so the strategy shifts toward fewer, larger parts rather than balanced ones.', example: 'n=10: break into 1+9 gives 1+81=82, break into 5+5 gives 50. Maximum sum of squares is 82.' },
            { title: 'Break Into Distinct Parts', difficulty: 'Hard', description: 'Break integer n into at least two distinct positive integers to maximize the product. No two parts may be equal.', whyDifferent: 'The distinctness constraint eliminates the classic strategy of repeatedly using 3s. You need a different DP formulation that tracks which values have been used.', example: 'n=10: cannot use 3+3+4. Valid: 2+3+5=10 with product 30, or 1+4+5=10 with product 20. Answer is 30.' },
            { title: 'Count Ways to Achieve Max Product', difficulty: 'Medium', description: 'Find how many different ways you can break integer n into parts that all achieve the maximum product.', whyDifferent: 'Combines optimization with counting. You first find the max product, then count all partitions that reach it, requiring a two-phase DP approach.', example: 'n=8: max product is 18 (2*3*3 or 3*3*2). Since order does not matter for partitions, there is 1 way: {2,3,3}.' }
        ],
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
