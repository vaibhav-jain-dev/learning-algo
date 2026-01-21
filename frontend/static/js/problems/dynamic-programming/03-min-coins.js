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
        complexity: {
            time: 'O(n * d)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "n": 7,
        "denoms": [
                1,
                5,
                10
        ]
},
        output: 3,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=7, denoms=[1, 5, 10], the result is 3.'
    },
    {
        input: {
        "n": 6,
        "denoms": [
                1,
                2,
                4
        ]
},
        output: 2,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=6, denoms=[1, 2, 4], the result is 2.'
    },
    {
        input: {
        "n": 3,
        "denoms": [
                2
        ]
},
        output: -1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=3, denoms=[2], the result is -1.'
    }
        ],
        similar: [
    { id: '01-perfect-squares', name: 'Perfect Squares', difficulty: 'Medium' },
    { id: '02-coin-change-ii-exact-coins', name: 'Coin Change II - Exact Coins', difficulty: 'Medium' },
    { id: '03-integer-break', name: 'Integer Break', difficulty: 'Medium' }
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
