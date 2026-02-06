/**
 * Smallest Difference
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: two-pointer-diff
 */
(function() {
    'use strict';

    const problem = {
        name: 'Smallest Difference',
        difficulty: 'Medium',
        algorithm: 'two-pointer-diff',
        description: 'Write a function that takes in two non-empty arrays of integers, finds the pair of numbers (one from each array) whose absolute difference is closest to zero, and returns an array containing these two numbers, with the number from the first array in the first position. Note that the absolute difference of two integers is the distance between them on the real number line.',
        complexity: {
            time: 'O(n log n + m log m)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "arrayOne": [
                -1,
                5,
                10,
                20,
                28,
                3
        ],
        "arrayTwo": [
                26,
                134,
                135,
                15,
                17
        ]
},
        output: [28, 26],
        explanation: 'Using two pointers, we traverse the data structure to find the solution efficiently. For input arrayOne=[-1, 5, ..., 3] (length 6), arrayTwo=[26, 134, 135, 15, 17], the result is [28, 26].'
    },
    {
        input: {
        "arrayOne": [
                10,
                1000
        ],
        "arrayTwo": [
                1001,
                11
        ]
},
        output: [1000, 1001],
        explanation: 'Using two pointers, we traverse the data structure to find the solution efficiently. For input arrayOne=[10, 1000], arrayTwo=[1001, 11], the result is [1000, 1001].'
    }
        ],
        similar: [
            { id: '08-smallest-difference/01-k-smallest-differences', name: 'K Smallest Differences', difficulty: 'Medium' },
            { id: '08-smallest-difference/02-smallest-diff-triplet', name: 'Smallest Diff Triplet', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '08-smallest-difference', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/08-smallest-difference'] = problem;

})();
