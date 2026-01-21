/**
 * Coin Change II - Exact Coins
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Coin Change II - Exact Coins',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '03-min-coins',
        description: 'Given an array of coin denominations coins, a target amount, and an integer k, return whether it\'s possible to make the amount using **exactly** k coins. If possible, return the coins used; otherwise return an empty list. This is a variation of the classic coin change problem where instead of minimizing coins, you must use a specific count.',
        complexity: {
            time: 'O(amount * k * len(coins))',
            space: 'O(amount * k)'
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
        "amount": 11,
        "coins": [
                1,
                2,
                5
        ],
        "k": 3
},
        output: true,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input amount=11, coins=[1, 2, 5], k=3, the result is true.'
    },
    {
        input: {
        "amount": 10,
        "coins": [
                2,
                5
        ],
        "k": 2
},
        output: true,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input amount=10, coins=[2, 5], k=2, the result is true.'
    },
    {
        input: {
        "amount": 7,
        "coins": [
                2,
                4
        ],
        "k": 3
},
        output: false,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input amount=7, coins=[2, 4], k=3, the result is false.'
    }
        ],
        solutions: {
            python: `def coinChangeIiExactCoins(data):
    """
    Coin Change II - Exact Coins

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

// CoinChangeIiExactCoins solves the Coin Change II - Exact Coins problem.
// Time: O(n), Space: O(n)
func CoinChangeIiExactCoins(data interface{}) interface{} {
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
        window.ProblemRenderer.register('dynamic-programming', '03-min-coins/02-coin-change-ii-exact-coins', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/03-min-coins/02-coin-change-ii-exact-coins'] = problem;

})();
