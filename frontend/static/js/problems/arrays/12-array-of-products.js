/**
 * Array of Products
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: prefix-suffix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Array of Products',
        difficulty: 'Medium',
        algorithm: 'prefix-suffix',
        description: 'Write a function that takes in a non-empty array of integers and returns an array of the same length, where each element in the output array is equal to the product of every other number in the input array. In other words, the value at output[i] is equal to the product of every number in the input array other than input[i]. **Important:** Solve this problem without using division.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                5,
                1,
                4,
                2
        ]
},
        output: [8, 40, 10, 20],
        explanation: 'Processing the input data produces the output. For input array=[5, 1, 4, 2], the result is [8, 40, 10, 20].'
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
        output: [120, 60, 40, 30, 24],
        explanation: 'Processing the input data produces the output. For input array=[1, 2, 3, 4, 5], the result is [120, 60, 40, 30, 24].'
    },
    {
        input: {
        "array": [
                -5,
                2,
                -4,
                14,
                -6
        ]
},
        output: [672, -1680, 840, -240, 560],
        explanation: 'Processing the input data produces the output. For input array=[-5, 2, -4, 14, -6], the result is [672, -1680, 840, -240, 560].'
    }
        ],
        similar: []
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '12-array-of-products', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/12-array-of-products'] = problem;

})();
