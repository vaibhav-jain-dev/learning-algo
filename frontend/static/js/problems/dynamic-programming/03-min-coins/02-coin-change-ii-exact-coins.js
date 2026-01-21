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
    Coin Change II - Exact Coins: Can we make 'amount' using exactly 'k' coins?

    Key insight: 2D DP where dp[i][j] = True if we can make amount i using j coins.
    For each coin, we can use it to transition from dp[i-coin][j-1] to dp[i][j].

    Time: O(amount * k * len(coins))
    Space: O(amount * k)
    """
    amount = data["amount"]
    coins = data["coins"]
    k = data["k"]

    if amount == 0:
        return k == 0

    # dp[i][j] = True if we can make amount i using exactly j coins
    dp = [[False] * (k + 1) for _ in range(amount + 1)]
    dp[0][0] = True  # Can make 0 with 0 coins

    # For each coin (with unlimited use)
    for coin in coins:
        # Iterate amounts from coin to target
        for a in range(coin, amount + 1):
            # For each number of coins used
            for num_coins in range(1, k + 1):
                if dp[a - coin][num_coins - 1]:
                    dp[a][num_coins] = True

    return dp[amount][k]


# Test
if __name__ == "__main__":
    print(coinChangeIiExactCoins({"amount": 11, "coins": [1, 2, 5], "k": 3}))  # Expected: True (5+5+1)
    print(coinChangeIiExactCoins({"amount": 10, "coins": [2, 5], "k": 2}))  # Expected: True (5+5)
    print(coinChangeIiExactCoins({"amount": 7, "coins": [2, 4], "k": 3}))  # Expected: False`,
            go: `package main

import "fmt"

// CoinChangeIiExactCoins checks if we can make 'amount' using exactly 'k' coins.
// 2D DP where dp[i][j] = true if we can make amount i using j coins.
// Time: O(amount * k * len(coins)), Space: O(amount * k)
func CoinChangeIiExactCoins(data map[string]interface{}) bool {
    amount := int(data["amount"].(float64))
    coinsInterface := data["coins"].([]interface{})
    coins := make([]int, len(coinsInterface))
    for i, v := range coinsInterface {
        coins[i] = int(v.(float64))
    }
    k := int(data["k"].(float64))

    if amount == 0 {
        return k == 0
    }

    // dp[i][j] = true if we can make amount i using exactly j coins
    dp := make([][]bool, amount+1)
    for i := range dp {
        dp[i] = make([]bool, k+1)
    }
    dp[0][0] = true  // Can make 0 with 0 coins

    // For each coin (with unlimited use)
    for _, coin := range coins {
        // Iterate amounts from coin to target
        for a := coin; a <= amount; a++ {
            // For each number of coins used
            for numCoins := 1; numCoins <= k; numCoins++ {
                if dp[a-coin][numCoins-1] {
                    dp[a][numCoins] = true
                }
            }
        }
    }

    return dp[amount][k]
}

func main() {
    fmt.Println(CoinChangeIiExactCoins(map[string]interface{}{
        "amount": 11.0,
        "coins":  []interface{}{1.0, 2.0, 5.0},
        "k":      3.0,
    }))  // Expected: true
    fmt.Println(CoinChangeIiExactCoins(map[string]interface{}{
        "amount": 10.0,
        "coins":  []interface{}{2.0, 5.0},
        "k":      2.0,
    }))  // Expected: true
    fmt.Println(CoinChangeIiExactCoins(map[string]interface{}{
        "amount": 7.0,
        "coins":  []interface{}{2.0, 4.0},
        "k":      3.0,
    }))  // Expected: false
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
