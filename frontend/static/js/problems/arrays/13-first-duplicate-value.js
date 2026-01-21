/**
 * First Duplicate Value
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: index-marking
 */
(function() {
    'use strict';

    const problem = {
        name: 'First Duplicate Value',
        difficulty: 'Medium',
        algorithm: 'index-marking',
        description: 'Given an array of integers between 1 and n (inclusive), where n is the length of the array, write a function that returns the first integer that appears more than once (when the array is read from left to right). In other words, out of all the integers that might occur more than once in the input array, your function should return the one whose second occurrence has the minimum index. If no integer appears more than once, your function should return -1. **Note:** You\'re allowed to mutate the inp',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [
                2,
                1,
                5,
                2,
                3,
                3,
                4
        ]
},
        output: 2,
        explanation: 'Processing the input data produces the output. For input array=[2, 1, ..., 4] (length 7), the result is 2.'
    },
    {
        input: {
        "array": [
                2,
                1,
                5,
                3,
                3,
                2,
                4
        ]
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input array=[2, 1, ..., 4] (length 7), the result is 3.'
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
        output: -1,
        explanation: 'Processing the input data produces the output. For input array=[1, 2, 3, 4, 5], the result is -1.'
    },
    {
        input: {
        "array": [
                1,
                1,
                2,
                3,
                3,
                2,
                2
        ]
},
        output: 1,
        explanation: 'Processing the input data produces the output. For input array=[1, 1, ..., 2] (length 7), the result is 1.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '13-first-duplicate-value', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/13-first-duplicate-value'] = problem;

})();
