/**
 * Min Number Of Coins For Change
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Number Of Coins For Change',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        description: 'Given an array of positive integers representing coin denominations and a single non-negative integer n representing a target amount of money, write a function that returns the smallest number of coins needed to make change for that target amount. If it\'s impossible to make change for the target amount, return -1.',
        problem: 'Create a DP array where dp[i] = minimum coins needed for amount i. Initialize dp[0] = 0 (zero coins for zero amount) and all others to infinity. For each amount from 1 to n, try each coin denomination: if coin <= amount, dp[amount] = min(dp[amount], 1 + dp[amount - coin]). The answer is dp[n] if it\'s not infinity, else -1.',
        hints: [
            'Think about the subproblem: if you knew the minimum coins for all smaller amounts, how would you find it for the current amount?',
            'For amount i, you can use any coin c where c <= i. Using coin c means you need 1 + (min coins for amount i-c).',
            'Build a DP array of size n+1. dp[i] represents minimum coins for amount i.',
            'For each amount, try all valid coins and take the minimum. Initialize with infinity to detect impossible cases.'
        ],
        complexity: {
            time: 'O(n * d)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "n": 7,
        "denoms": [1, 5, 10]
        },
        output: 3,
        explanation: 'dp[0]=0. For amount 7: using coin 1 gives 1+dp[6], using coin 5 gives 1+dp[2]. dp[5]=1 (one 5-coin), dp[2]=2 (two 1-coins). So dp[7] = min(1+6, 1+2) = 3. Optimal: 5+1+1 = 7 using 3 coins.'
    },
    {
        input: {
        "n": 6,
        "denoms": [1, 2, 4]
        },
        output: 2,
        explanation: 'For amount 6: using coin 4 gives 1+dp[2]=1+1=2, using coin 2 gives 1+dp[4]=1+1=2. Both lead to 2 coins. Optimal solutions: 4+2 or 2+2+2 (but that\'s 3 coins). Best is 4+2 = 2 coins.'
    },
    {
        input: {
        "n": 3,
        "denoms": [2]
        },
        output: -1,
        explanation: 'With only coin 2, we can make amounts 0, 2, 4, 6... (all even). Amount 3 is odd and impossible. dp[3] remains infinity, so return -1.'
    }
        ],
        twists: [
            { id: '03-min-coins/twist-01-greedy-fails-classic-counterexample', title: 'Greedy Fails: Classic Counterexample', difficulty: 'Medium' },
            { id: '03-min-coins/twist-02-print-the-actual-coins-used', title: 'Print the Actual Coins Used', difficulty: 'Medium' },
            { id: '03-min-coins/twist-03-top-down-recursive-with-memoization', title: 'Top-Down Recursive with Memoization', difficulty: 'Medium' },
            { id: '03-min-coins/twist-04-conceptual-trap-infinity-handling', title: 'Conceptual Trap: Infinity Handling', difficulty: 'Easy' },
            { id: '03-min-coins/twist-05-trace-the-dp-table-step-by-step', title: 'Trace the DP Table Step by Step', difficulty: 'Easy' },
            { id: '03-min-coins/twist-06-counting-vs-optimization-duality', title: 'Counting vs Optimization Duality', difficulty: 'Medium' }
        ],
        similar: [
    { id: '03-min-coins/03-min-coins/01-perfect-squares', name: 'Perfect Squares', difficulty: 'Medium' },
    { id: '03-min-coins/03-min-coins/02-coin-change-ii-exact-coins', name: 'Coin Change II - Exact Coins', difficulty: 'Medium' },
    { id: '03-min-coins/03-integer-break', name: 'Integer Break', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '03-min-coins', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/03-min-coins'] = problem;

})();
