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
        description: 'You are given an array of positive integers representing the prices of a single stock on various days (each index represents a different day). You are also given an integer k, which represents the maximum number of transactions you are allowed to make. Write a function that returns the maximum profit you can make by buying and selling the stock at most k times. Note: - A transaction consists of buying and then selling the stock - You cannot hold more than one share of the stock at a time - You m.',
        problem: 'Build the solution using dynamic programming. Define the state, establish the base cases, and derive the recurrence relation. Fill in the DP table bottom-up (or use memoized recursion top-down). This achieves O(n * k) time with O(n * k) space.',
        hints: [
            'Identify the subproblems: what decisions do you need to make at each step?',
            'Define your DP state clearly. What parameters uniquely identify a subproblem?',
            'Write the recurrence relation: how does the current state relate to previous states?',
            'Consider whether you can optimize space by only keeping the last row/column of the DP table.'
        ],

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
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
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
        explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
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
        explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
    }
        ],
        twists: [
            { id: '10-max-profit-k-transactions/twist-01-unlimited-transactions', name: 'Unlimited Transactions', difficulty: 'Medium' },
            { id: '10-max-profit-k-transactions/twist-02-transactions-with-cooldown', name: 'Transactions With Cooldown', difficulty: 'Hard' },
            { id: '10-max-profit-k-transactions/twist-03-transactions-with-fee', name: 'Transactions With Fee', difficulty: 'Medium' },
            { id: '10-max-profit-k-transactions/twist-04-find-optimal-buy-sell-days', name: 'Find Optimal Buy-Sell Days', difficulty: 'Medium' },
            { id: '10-max-profit-k-transactions/twist-05-minimum-transactions-for-target-profit', name: 'Minimum Transactions for Target Profit', difficulty: 'Hard' }
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
