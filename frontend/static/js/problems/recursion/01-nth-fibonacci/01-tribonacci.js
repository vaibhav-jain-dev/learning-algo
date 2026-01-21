/**
 * N-th Tribonacci Number
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-fibonacci
 */
(function() {
    'use strict';

    const problem = {
        name: 'N-th Tribonacci Number',
        difficulty: 'Medium',
        algorithm: 'recursion-fibonacci',
        description: 'The Tribonacci sequence Tn is defined as follows: T0 = 0, T1 = 1, T2 = 1, and Tn = Tn-1 + Tn-2 + Tn-3 for n >= 3. Given n, return the value of Tn.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "n": 4
},
        output: 4,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input n=4, the result is 4.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/01-tribonacci', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/01-tribonacci'] = problem;

})();
