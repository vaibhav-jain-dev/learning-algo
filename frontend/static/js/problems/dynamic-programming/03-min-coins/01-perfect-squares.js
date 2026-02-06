/**
 * Perfect Squares
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Perfect Squares',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '03-min-coins',
        description: 'Given an integer n, return the **least number of perfect square numbers** that sum to n. A **perfect square** is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.',
        problem: 'Use 2D dynamic programming where dp[i][j] represents the optimal solution for subproblem (i,j). Build the table by considering all possible transitions from smaller subproblems.',
        complexity: {
            time: 'O(n * sqrt(n))',
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
        "n": 12
},
        output: 3,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=12, the result is 3.'
    },
    {
        input: {
        "n": 13
},
        output: 2,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=13, the result is 2.'
    }
        ],
        solutions: {
            python: `def perfectSquares(data):
    """
    Perfect Squares - Minimum perfect squares that sum to n.

    Key insight: This is similar to coin change with coins being 1, 4, 9, 16, ...
    dp[i] = minimum number of perfect squares that sum to i.

    Time: O(n * sqrt(n))
    Space: O(n)
    """
    n = data["n"]

    if n <= 0:
        return 0

    # dp[i] = minimum number of perfect squares to sum to i
    dp = [float('inf')] * (n + 1)
    dp[0] = 0  # 0 squares needed to make sum 0

    # For each number from 1 to n
    for i in range(1, n + 1):
        # Try each perfect square <= i
        j = 1
        while j * j <= i:
            dp[i] = min(dp[i], dp[i - j * j] + 1)
            j += 1

    return dp[n]


# Test
if __name__ == "__main__":
    print(perfectSquares({"n": 12}))  # Expected: 3 (4 + 4 + 4)
    print(perfectSquares({"n": 13}))  # Expected: 2 (4 + 9)`,
            go: `package main

import (
    "fmt"
    "math"
)

// PerfectSquares finds minimum perfect squares that sum to n.
// Similar to coin change with coins being 1, 4, 9, 16, ...
// Time: O(n * sqrt(n)), Space: O(n)
func PerfectSquares(data map[string]interface{}) int {
    n := int(data["n"].(float64))

    if n <= 0 {
        return 0
    }

    // dp[i] = minimum number of perfect squares to sum to i
    dp := make([]int, n+1)
    for i := range dp {
        dp[i] = math.MaxInt32
    }
    dp[0] = 0  // 0 squares needed to make sum 0

    // For each number from 1 to n
    for i := 1; i <= n; i++ {
        // Try each perfect square <= i
        for j := 1; j*j <= i; j++ {
            if dp[i-j*j]+1 < dp[i] {
                dp[i] = dp[i-j*j] + 1
            }
        }
    }

    return dp[n]
}

func main() {
    fmt.Println(PerfectSquares(map[string]interface{}{"n": 12.0}))  // Expected: 3
    fmt.Println(PerfectSquares(map[string]interface{}{"n": 13.0}))  // Expected: 2
}`
        },
        twists: [
            { id: '03-min-coins/01-perfect-squares/twist-01-recognize-this-as-coin-change', title: 'Recognize This as Coin Change', difficulty: 'Easy' },
            { id: '03-min-coins/01-perfect-squares/twist-02-bfs-shortest-path-alternative', title: 'BFS Shortest Path Alternative', difficulty: 'Hard' },
            { id: '03-min-coins/01-perfect-squares/twist-03-greedy-fails-largest-square-first', title: 'Greedy Fails: Largest Square First', difficulty: 'Medium' },
            { id: '03-min-coins/01-perfect-squares/twist-04-print-which-squares-were-used', title: 'Print Which Squares Were Used', difficulty: 'Medium' },
            { id: '03-min-coins/01-perfect-squares/twist-05-lagranges-four-square-theorem', title: 'Lagrange\'s Four-Square Theorem', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '03-min-coins/01-perfect-squares', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/03-min-coins/01-perfect-squares'] = problem;

})();
