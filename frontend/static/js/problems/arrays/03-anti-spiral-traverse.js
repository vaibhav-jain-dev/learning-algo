/**
 * Anti Spiral Traverse
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Anti Spiral Traverse',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Given an m x n matrix, traverse it in anti-spiral order (counterclockwise from center outward or counterclockwise from outside inward, depending on interpretation). For this problem, we define anti-spiral as: Start from the center and move counterclockwise outward (left first, then down, right, up).',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "matrix = [\n    [1,  2,  3],\n    [4,  5,  6],\n    [7,  8,  9]\n]"
},
        output: "[5, 4, 7, 8, 9, 6, 3, 2, 1]\n(Center out, counterclockwise: 5->left->down->right->up)",
        explanation: 'Given the input, the algorithm processes it to produce [5, 4, 7, 8, 9, 6, 3, 2, 1]\n(Center out, counterclockwise: 5->left->down->right->up)'
    },
    {
        input: {
        "raw": "matrix = [\n    [1,  2,  3,  4],\n    [5,  6,  7,  8],\n    [9,  10, 11, 12]\n]"
},
        output: "[6, 5, 9, 10, 11, 7, 3, 2, 1, 4, 8, 12]",
        explanation: 'Given the input, the algorithm processes it to produce [6, 5, 9, 10, 11, 7, 3, 2, 1, 4, 8, 12]'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-anti-spiral-traverse', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/03-anti-spiral-traverse'] = problem;

})();
