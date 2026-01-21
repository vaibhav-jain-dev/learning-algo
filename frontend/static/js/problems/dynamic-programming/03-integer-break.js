/**
 * Integer Break
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Integer Break',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        description: 'Given a positive integer n, break it into the sum of **at least two** positive integers and maximize the product of those integers. Return the **maximum product** you can get.',
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "n": 2
},
        output: 1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=2, the result is 1.'
    },
    {
        input: {
        "n": 10
},
        output: 36,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=10, the result is 36.'
    },
    {
        input: {
        "n": 8
},
        output: 18,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=8, the result is 18.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '03-integer-break', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/03-integer-break'] = problem;

})();
