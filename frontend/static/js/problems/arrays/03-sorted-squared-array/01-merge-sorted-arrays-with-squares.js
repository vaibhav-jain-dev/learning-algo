/**
 * Merge Sorted Arrays With Squares
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge Sorted Arrays With Squares',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Given two sorted arrays, square all elements and merge them into a single sorted array.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "arr1 = [-3, -1, 2], arr2 = [-2, 4]"
},
        output: "[1, 4, 4, 9, 16]",
        explanation: 'Given the input, the algorithm processes it to produce [1, 4, 4, 9, 16]'
    },
    {
        input: {
        "raw": "arr1 = [-5, 0, 3], arr2 = [1, 2, 6]"
},
        output: "[0, 1, 4, 9, 25, 36]",
        explanation: 'Given the input, the algorithm processes it to produce [0, 1, 4, 9, 25, 36]'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 03-sorted-squared-array
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/01-merge-sorted-arrays-with-squares', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/01-merge-sorted-arrays-with-squares'] = problem;

})();
