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
            {
                title: 'Recognize This as Coin Change',
                difficulty: 'Easy',
                description: 'Explain how Perfect Squares is exactly the Min Coins problem where the "denominations" are 1, 4, 9, 16, 25, ... How does this mapping work?',
                whyDifferent: 'Pattern recognition is the hardest part. Once you see this is coin change with coins = {i^2 for i >= 1}, the DP is standard. The twist tests whether you can identify the structural similarity.',
                example: 'n=12, "coins" = [1,4,9]. dp[12] = min(dp[12-1]+1, dp[12-4]+1, dp[12-9]+1) = min(dp[11]+1, dp[8]+1, dp[3]+1). Standard coin change.'
            },
            {
                title: 'BFS Shortest Path Alternative',
                difficulty: 'Hard',
                description: 'Model this as a graph where each node is a number and edges connect n to n-k^2 for valid k. Finding min perfect squares is a BFS shortest path. Implement this approach.',
                whyDifferent: 'Thinking of DP as shortest path in a DAG is a powerful reframe. BFS naturally finds the fewest steps (squares) and can be faster in practice due to early termination.',
                example: 'n=12: BFS from 12. Level 1: 12-1=11, 12-4=8, 12-9=3. Level 2: from 3, 3-1=2. Level 3: from 8, 8-4=4, 8-1=7; from 2, 2-1=1. Eventually reach 0 at level 3. Answer: 3.'
            },
            {
                title: 'Greedy Fails: Largest Square First',
                difficulty: 'Medium',
                description: 'The greedy approach always subtracts the largest perfect square. Show an input where this gives more squares than optimal.',
                whyDifferent: 'This is the coin change greedy failure applied to perfect squares. It demonstrates that even with a natural ordering of "coins," greedy is suboptimal.',
                example: 'n=12. Greedy: 12-9=3, 3-1=2, 2-1=1, 1-1=0. Uses 4 squares (9+1+1+1). Optimal: 4+4+4=12 using 3 squares.'
            },
            {
                title: 'Print Which Squares Were Used',
                difficulty: 'Medium',
                description: 'Return not just the count but the actual list of perfect squares. Track which square was chosen at each step to enable backtracking.',
                whyDifferent: 'Solution reconstruction requires maintaining a parent/choice array alongside the DP array, then tracing back from dp[n] to dp[0].',
                example: 'n=13: dp[13]=2 (4+9). Store choice[13]=4, then 13-4=9, choice[9]=9, then 9-9=0. Backtrack: [4, 9].'
            },
            {
                title: 'Lagrange\'s Four-Square Theorem',
                difficulty: 'Very Hard',
                description: 'Lagrange proved every positive integer can be represented as the sum of at most 4 perfect squares. How can you use this theorem to create an O(sqrt(n)) solution?',
                whyDifferent: 'This mathematical shortcut completely bypasses DP. You check if n is a perfect square (1), sum of two squares (2), NOT of the form 4^a(8b+7) (then 3), otherwise 4. Totally different thinking.',
                example: 'n=7: 7 = 4^0 * (8*0 + 7) matches 4^a(8b+7) form, so answer is 4. n=13 = 4+9, answer is 2. n=12 = 4+4+4, answer is 3.'
            }
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
