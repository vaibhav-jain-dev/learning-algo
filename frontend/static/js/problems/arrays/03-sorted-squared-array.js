/**
 * Sorted Squared Array
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: two-pointer-sorted-squared
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sorted Squared Array',
        difficulty: 'Easy',
        algorithm: 'two-pointer-sorted-squared',
        description: 'Write a function that takes in a non-empty array of integers that are sorted in ascending order and returns a new array of the same length with the squares of the original integers also sorted in ascending order.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                1,
                2,
                3,
                5,
                6,
                8,
                9
        ]
},
        output: [1, 4, 9, 25, 36, 64, 81],
        explanation: 'Using two pointers, we traverse the data structure to find the solution efficiently. For input array=[1, 2, ..., 9] (length 7), the result is [1, ..., 81] (length 7).'
    },
    {
        input: {
        "array": [
                -5,
                -4,
                -3,
                -2,
                -1
        ]
},
        output: [1, 4, 9, 16, 25],
        explanation: 'Using two pointers, we traverse the data structure to find the solution efficiently. For input array=[-5, -4, -3, -2, -1], the result is [1, 4, 9, 16, 25].'
    },
    {
        input: {
        "array": [
                -7,
                -3,
                1,
                9,
                22,
                30
        ]
},
        output: [1, 9, 49, 81, 484, 900],
        explanation: 'Using two pointers, we traverse the data structure to find the solution efficiently. For input array=[-7, -3, ..., 30] (length 6), the result is [1, ..., 900] (length 6).'
    }
        ],
        similar: [
    { id: '01-merge-sorted-arrays-with-squares', name: '01 Merge Sorted Arrays With Squares', difficulty: 'Medium' },
    { id: '02-sorted-squared-no-duplicates', name: '02 Sorted Squared No Duplicates', difficulty: 'Medium' },
    { id: '03-kth-smallest-squared', name: '03 Kth Smallest Squared', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array'] = problem;

})();
