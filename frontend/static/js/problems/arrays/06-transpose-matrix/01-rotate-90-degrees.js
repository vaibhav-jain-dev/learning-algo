/**
 * Rotate 90 Degrees
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rotate 90 Degrees',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Given an n x n 2D square matrix representing an image, rotate the matrix by 90 degrees clockwise **in-place**. You must modify the input matrix directly. Do NOT allocate another 2D matrix for the rotation.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "matrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]"
},
        output: "[\n    [7, 4, 1],\n    [8, 5, 2],\n    [9, 6, 3]\n]",
        explanation: 'Given the input, the algorithm processes it to produce [\n    [7, 4, 1],\n    [8, 5, 2],\n    [9, 6, 3]\n]'
    },
    {
        input: {
        "raw": "matrix = [\n    [1,  2,  3,  4],\n    [5,  6,  7,  8],\n    [9,  10, 11, 12],\n    [13, 14, 15, 16]\n]"
},
        output: "[\n    [13, 9,  5, 1],\n    [14, 10, 6, 2],\n    [15, 11, 7, 3],\n    [16, 12, 8, 4]\n]",
        explanation: 'Given the input, the algorithm processes it to produce [\n    [13, 9,  5, 1],\n    [14, 10, 6, 2],\n    [15, 11, 7, 3],\n    [16, 12, 8, 4]\n]'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 06-transpose-matrix
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/01-rotate-90-degrees', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/01-rotate-90-degrees'] = problem;

})();
