/**
 * Move Element Preserve Order
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Move Element Preserve Order',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Given an array of integers and a target value, move all instances of the target value to the end of the array while **preserving the relative order** of the non-target elements. The function should modify the array in place and return it.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [2, 1, 2, 3, 2, 4], toMove = 2"
},
        output: "[1, 3, 4, 2, 2, 2]\nExplanation: Order of 1, 3, 4 is preserved",
        explanation: 'Given the input, the algorithm processes it to produce [1, 3, 4, 2, 2, 2]\nExplanation: Order of 1, 3, 4 is preserved'
    },
    {
        input: {
        "raw": "array = [1, 2, 3, 4, 5], toMove = 3"
},
        output: "[1, 2, 4, 5, 3]",
        explanation: 'Given the input, the algorithm processes it to produce [1, 2, 4, 5, 3]'
    },
    {
        input: {
        "raw": "array = [2, 2, 2], toMove = 2"
},
        output: "[2, 2, 2]",
        explanation: 'Given the input, the algorithm processes it to produce [2, 2, 2]'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-move-element-preserve-order', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/01-move-element-preserve-order'] = problem;

})();
