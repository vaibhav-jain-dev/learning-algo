/**
 * Sorted Squared No Duplicates
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sorted Squared No Duplicates',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Given a sorted array of integers, square all elements and return a sorted array with duplicates removed.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [-3, -2, -1, 1, 2, 3]"
},
        output: "[1, 4, 9]\nExplanation: -1 and 1 both give 1, -2 and 2 both give 4, etc.",
        explanation: 'Given the input, the algorithm processes it to produce [1, 4, 9]\nExplanation: -1 and 1 both give 1, -2 and 2 both give 4, etc.'
    },
    {
        input: {
        "raw": "array = [-5, -3, 0, 2, 3, 5]"
},
        output: "[0, 4, 9, 25]",
        explanation: 'Given the input, the algorithm processes it to produce [0, 4, 9, 25]'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-sorted-squared-no-duplicates', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/02-sorted-squared-no-duplicates'] = problem;

})();
