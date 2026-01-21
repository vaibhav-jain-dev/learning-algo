/**
 * Perfect Squares
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Perfect Squares',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        description: 'Given an integer n, return the **least number of perfect square numbers** that sum to n. A **perfect square** is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.',
        complexity: {
            time: 'O(n * sqrt(n))',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "n": 12
},
        output: 3,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=12, the result is 3.'
    },
    {
        input: {
        "n": 13
},
        output: 2,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=13, the result is 2.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '03-min-coins/01-perfect-squares', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/03-min-coins/01-perfect-squares'] = problem;

})();
