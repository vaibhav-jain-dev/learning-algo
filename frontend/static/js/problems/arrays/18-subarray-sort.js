/**
 * Subarray Sort
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: out-of-order-bounds
 */
(function() {
    'use strict';

    const problem = {
        name: 'Subarray Sort',
        difficulty: 'Hard',
        algorithm: 'out-of-order-bounds',
        description: 'Write a function that takes in an array of at least two integers and returns an array of the starting and ending indices of the smallest subarray in the input array that needs to be sorted in place in order for the entire input array to be sorted (in ascending order). If the input array is already sorted, the function should return [-1, -1].',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [
                1,
                2,
                4,
                7,
                10,
                11,
                7,
                12,
                6,
                7,
                16,
                18,
                19
        ]
},
        output: [3, 9],
        explanation: 'Processing the input data produces the output. For input array=[1, 2, ..., 19] (length 13), the result is [3, 9].'
    },
    {
        input: {
        "array": [
                1,
                2,
                3,
                4,
                5
        ]
},
        output: [-1, -1],
        explanation: 'Processing the input data produces the output. For input array=[1, 2, 3, 4, 5], the result is [-1, -1].'
    },
    {
        input: {
        "array": [
                2,
                1
        ]
},
        output: [0, 1],
        explanation: 'Processing the input data produces the output. For input array=[2, 1], the result is [0, 1].'
    }
        ],
        similar: [
    { id: '01-minimum-swaps-to-sort', name: '01 Minimum Swaps To Sort', difficulty: 'Hard' },
    { id: '02-shortest-unsorted-with-k', name: '02 Shortest Unsorted With K', difficulty: 'Medium' },
    { id: '03-max-sorted-subarrays', name: '03 Max Sorted Subarrays', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '18-subarray-sort', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/18-subarray-sort'] = problem;

})();
