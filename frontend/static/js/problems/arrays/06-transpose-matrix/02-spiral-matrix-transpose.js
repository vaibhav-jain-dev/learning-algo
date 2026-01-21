/**
 * Spiral Matrix Transpose
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral Matrix Transpose',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Read a matrix in spiral order and write the values in spiral order to a transposed-dimension matrix.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {},
        output: null,
        explanation: 'See problem description'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 06-transpose-matrix
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/02-spiral-matrix-transpose', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/02-spiral-matrix-transpose'] = problem;

})();
