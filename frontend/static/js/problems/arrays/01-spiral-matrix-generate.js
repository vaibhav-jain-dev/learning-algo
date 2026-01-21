/**
 * Spiral Matrix Generate
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral Matrix Generate',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Given a positive integer n, generate an n x n matrix filled with elements from 1 to n^2 in spiral order.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "n = 3"
},
        output: "[\n    [1, 2, 3],\n    [8, 9, 4],\n    [7, 6, 5]\n]",
        explanation: 'Given the input, the algorithm processes it to produce [\n    [1, 2, 3],\n    [8, 9, 4],\n    [7, 6, 5]\n]'
    },
    {
        input: {
        "raw": "n = 4"
},
        output: "[\n    [1,  2,  3,  4],\n    [12, 13, 14, 5],\n    [11, 16, 15, 6],\n    [10, 9,  8,  7]\n]",
        explanation: 'Given the input, the algorithm processes it to produce [\n    [1,  2,  3,  4],\n    [12, 13, 14, 5],\n    [11, 16, 15, 6],\n    [10, 9,  8,  7]\n]'
    },
    {
        input: {
        "raw": "n = 1"
},
        output: "[[1]]",
        explanation: 'Given the input, the algorithm processes it to produce [[1]]'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-spiral-matrix-generate', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/01-spiral-matrix-generate'] = problem;

})();
