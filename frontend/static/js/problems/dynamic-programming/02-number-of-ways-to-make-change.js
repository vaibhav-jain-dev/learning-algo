/**
 * Number of Ways to Make Change
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Ways to Make Change',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        description: 'Given an array of positive integers representing coin denominations and a single non-negative integer n representing a target amount of money, write a function that returns the number of ways to make change for that target amount using the given coin denominations. Note that an unlimited amount of coins is available for each denomination.',
        problem: 'Build the solution using dynamic programming. Define the state, establish the base cases, and derive the recurrence relation. Fill in the DP table bottom-up (or use memoized recursion top-down). This achieves O(n * d) time with O(n) space.',
        hints: [
            'Identify the subproblems: what decisions do you need to make at each step?',
            'Define your DP state clearly. What parameters uniquely identify a subproblem?',
            'Write the recurrence relation: how does the current state relate to previous states?',
            'Consider whether you can optimize space by only keeping the last row/column of the DP table.'
        ],

        complexity: {
            time: 'O(n * d)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "n": 6,
        "denoms": [
                1,
                5
        ]
},
        output: 2,
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
    },
    {
        input: {
        "n": 10,
        "denoms": [
                1,
                5,
                10,
                25
        ]
},
        output: 4,
        explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
    },
    {
        input: {
        "n": 0,
        "denoms": [
                1,
                2
        ]
},
        output: 1,
        explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
    }
        ],
        twists: [
            { id: '02-number-of-ways-to-make-change/twist-01-combinations-vs-permutations-why-loop-order-matters', name: 'Combinations vs Permutations: Why Loop Order Matters', difficulty: 'Hard' },
            { id: '02-number-of-ways-to-make-change/twist-02-print-all-combinations', name: 'Print All Combinations', difficulty: 'Hard' },
            { id: '02-number-of-ways-to-make-change/twist-03-conceptual-trap-base-case-dp0-1', name: 'Conceptual Trap: Base Case dp[0] = 1', difficulty: 'Medium' },
            { id: '02-number-of-ways-to-make-change/twist-04-counting-vs-optimization', name: 'Counting vs Optimization', difficulty: 'Medium' },
            { id: '02-number-of-ways-to-make-change/twist-05-trace-the-dp-table', name: 'Trace the DP Table', difficulty: 'Easy' },
            { id: '02-number-of-ways-to-make-change/twist-06-limited-supply-of-each-coin', name: 'Limited Supply of Each Coin', difficulty: 'Hard' }
        ],
        similar: [
    { id: '02-number-of-ways-to-make-change/02-number-of-ways-to-make-change/01-combination-sum-iv', name: 'Combination Sum IV', difficulty: 'Medium' },
    { id: '02-number-of-ways-to-make-change/02-target-sum', name: 'Target Sum', difficulty: 'Medium' },
    { id: '02-number-of-ways-to-make-change/03-partition-equal-subset-sum', name: 'Partition Equal Subset Sum', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change'] = problem;

})();
