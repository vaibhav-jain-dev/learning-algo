/**
 * Fibonacci with Matrix Exponentiation
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-fibonacci
 */
(function() {
    'use strict';

    const problem = {
        name: 'Fibonacci with Matrix Exponentiation',
        difficulty: 'Hard',
        algorithm: 'recursion-fibonacci',
        description: 'Given a very large number n (up to 10^18), compute the n-th Fibonacci number modulo 10^9 + 7. The standard O(n) approach is too slow for such large n. Use matrix exponentiation to achieve O(log n) time complexity.',
        complexity: {
            time: 'O(log n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "n": 10
},
        output: 55,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input n=10, the result is 55.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-matrix-fibonacci', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-matrix-fibonacci'] = problem;

})();
