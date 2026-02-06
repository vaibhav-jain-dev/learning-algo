/**
 * Monotonic Array
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: linear-scan
 */
(function() {
    'use strict';

    const problem = {
        name: 'Monotonic Array',
        difficulty: 'Medium',
        algorithm: 'linear-scan',
        description: 'Write a function that takes in an array of integers and returns a boolean representing whether the array is monotonic. An array is said to be monotonic if its elements, from left to right, are entirely non-increasing or entirely non-decreasing. Non-increasing elements aren\'t necessarily exclusively decreasing; they simply don\'t increase. Similarly, non-decreasing elements aren\'t necessarily exclusively increasing; they simply don\'t decrease. Note that empty arrays and arrays of one element are m',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [
                -1,
                -5,
                -10,
                -1100,
                -1100,
                -1101,
                -1102,
                -9001
        ]
},
        output: true,
        explanation: 'Processing the input data produces the output. For input array=[-1, -5, ..., -9001] (length 8), the result is true.'
    },
    {
        input: {
        "array": [
                1,
                2,
                3,
                3,
                4,
                5
        ]
},
        output: true,
        explanation: 'Processing the input data produces the output. For input array=[1, 2, ..., 5] (length 6), the result is true.'
    },
    {
        input: {
        "array": [
                1,
                2,
                1
        ]
},
        output: false,
        explanation: 'Processing the input data produces the output. For input array=[1, 2, 1], the result is false.'
    }
        ],
        similar: [
    { id: '10-monotonic-array/01-longest-monotonic-subarray', name: '01 Longest Monotonic Subarray', difficulty: 'Medium' },
    { id: '10-monotonic-array/02-minimum-removals-monotonic', name: '02 Minimum Removals Monotonic', difficulty: 'Hard' },
    { id: '10-monotonic-array/03-can-become-monotonic', name: '03 Can Become Monotonic', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array'] = problem;

})();
