/**
 * Max Profit With K Transactions
 * Category: dynamic-programming
 * Difficulty: Very
 * Algorithm: dp-transactions
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Profit With K Transactions',
        difficulty: 'Very',
        algorithm: 'dp-transactions',
        description: 'You are given an array of positive integers representing the prices of a single stock on various days (each index represents a different day). You are also given an integer k, which represents the maximum number of transactions you are allowed to make. Write a function that returns the maximum profit you can make by buying and selling the stock at most k times. Note: - A transaction consists of buying and then selling the stock - You cannot hold more than one share of the stock at a time - You m',
        complexity: {
            time: 'O(n * k)',
            space: 'O(n * k)'
        },
        examples: [
    {
        input: {
        "prices": [
                5,
                11,
                3,
                50,
                60,
                90
        ],
        "k": 2
},
        output: 93,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input prices=[5, 11, ..., 90] (length 6), k=2, the result is 93.'
    },
    {
        input: {
        "prices": [
                3,
                2,
                5,
                7,
                1,
                3
        ],
        "k": 1
},
        output: 5,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input prices=[3, 2, ..., 3] (length 6), k=1, the result is 5.'
    },
    {
        input: {
        "prices": [
                1,
                2,
                3,
                4,
                5
        ],
        "k": 2
},
        output: 4,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input prices=[1, 2, 3, 4, 5], k=2, the result is 4.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '10-max-profit-k-transactions', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/10-max-profit-k-transactions'] = problem;

})();
