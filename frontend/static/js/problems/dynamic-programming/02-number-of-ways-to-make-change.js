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
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=6, denoms=[1, 5], the result is 2.'
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
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=10, denoms=[1, 5, 10, 25], the result is 4.'
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
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=0, denoms=[1, 2], the result is 1.'
    }
        ],
        twists: [
            { id: '02-number-of-ways-to-make-change/twist-01-combinations-vs-permutations-why-loop-order-matters', title: 'Combinations vs Permutations: Why Loop Order Matters', difficulty: 'Hard' },
            { id: '02-number-of-ways-to-make-change/twist-02-print-all-combinations', title: 'Print All Combinations', difficulty: 'Hard' },
            { id: '02-number-of-ways-to-make-change/twist-03-conceptual-trap-base-case-dp0-1', title: 'Conceptual Trap: Base Case dp[0] = 1', difficulty: 'Medium' },
            { id: '02-number-of-ways-to-make-change/twist-04-counting-vs-optimization', title: 'Counting vs Optimization', difficulty: 'Medium' },
            { id: '02-number-of-ways-to-make-change/twist-05-trace-the-dp-table', title: 'Trace the DP Table', difficulty: 'Easy' },
            { id: '02-number-of-ways-to-make-change/twist-06-limited-supply-of-each-coin', title: 'Limited Supply of Each Coin', difficulty: 'Hard' }
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
