/**
 * Block Matrix Transpose
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Block Matrix Transpose',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Transpose a matrix where elements are grouped into blocks of size k×k.',
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
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/03-block-matrix-transpose', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/03-block-matrix-transpose'] = problem;

})();
