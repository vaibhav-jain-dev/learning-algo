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
        twists: [
            { title: 'Unlimited Transactions', difficulty: 'Medium', description: 'Remove the k-transaction limit entirely. Find the maximum profit with as many buy-sell transactions as you want (but still no overlapping holds).', whyDifferent: 'Eliminates the need for the transaction-count dimension in the DP. A simple greedy approach of capturing every upward slope becomes optimal.', example: 'prices=[5,11,3,50,60,90]: buy at 5 sell at 11 (+6), buy at 3 sell at 90 (+87), total=93. With unlimited transactions you can also just capture every increase.' },
            { title: 'Transactions With Cooldown', difficulty: 'Hard', description: 'After selling a stock, you must wait one day before buying again (cooldown period). Find the maximum profit with at most k transactions.', whyDifferent: 'Adds a state for the cooldown day, expanding the DP states from just holding/not-holding to holding/just-sold/cooldown, requiring a state machine approach.', example: 'prices=[1,2,3,0,2], k=2: buy day 0, sell day 2 (+2), cooldown day 3, buy day 3, sell day 4 (+2), total=4.' },
            { title: 'Transactions With Fee', difficulty: 'Medium', description: 'Each completed transaction (buy + sell) incurs a fixed fee. Find the maximum profit with at most k transactions after deducting all fees.', whyDifferent: 'The fee makes small gains unprofitable, so you must decide whether a transaction is worth the fee, adding a constant cost to each sell operation in the DP.', example: 'prices=[1,3,2,8,4,9], k=3, fee=2: without fee profit is 8+5+7=20 minus fees 6=14. Maybe fewer transactions yield better net profit.' },
            { title: 'Find Optimal Buy-Sell Days', difficulty: 'Medium', description: 'Return not just the maximum profit but the actual pairs of (buy_day, sell_day) for each transaction that achieves it.', whyDifferent: 'Requires backtracking through the DP table to recover which days were chosen, adding path reconstruction logic on top of the optimization.', example: 'prices=[5,11,3,50,60,90], k=2: max profit=93, transactions are [(0,1), (2,5)] meaning buy day 0/sell day 1 and buy day 2/sell day 5.' },
            { title: 'Minimum Transactions for Target Profit', difficulty: 'Hard', description: 'Given a target profit P, find the minimum number of transactions needed to achieve at least profit P. Return -1 if impossible.', whyDifferent: 'Inverts the problem: k is now the output to minimize rather than a constraint, and the DP must search for the smallest transaction count reaching the profit threshold.', example: 'prices=[5,11,3,50,60,90], target=90: 1 transaction (buy at 3, sell at 90) gives profit 87 < 90. Need 2 transactions for 93 >= 90. Answer: 2.' }
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
