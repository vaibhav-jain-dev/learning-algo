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
        description: 'Given an array of coin denominations coins, a target amount, and an integer k, return whether it\'s possible to make the amount using **exactly** k coins. If possible, return the coins used; otherwise return an empty list. This is a variation of the classic coin change problem where instead of minimizing coins, you must use a specific count.',
        complexity: {
            time: 'O(amount * k * len(coins))',
            space: 'O(amount * k)'
        },
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
