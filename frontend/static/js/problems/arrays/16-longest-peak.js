/**
 * Longest Peak
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: peak-expansion
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Peak',
        difficulty: 'Medium',
        algorithm: 'peak-expansion',
        description: 'Write a function that takes in an array of integers and returns the length of the longest peak in the array. A peak is defined as adjacent integers in the array that are strictly increasing until they reach a tip (the highest value in the peak), at which point they become strictly decreasing. At least three integers are required to form a peak.',
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
                3,
                3,
                4,
                0,
                10,
                6,
                5,
                -1,
                -3,
                2,
                3
        ]
},
        output: 6,
        explanation: 'Processing the input data produces the output. For input array=[1, 2, ..., 3] (length 13), the result is 6.'
    },
    {
        input: {
        "array": [
                1,
                3,
                2
        ]
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input array=[1, 3, 2], the result is 3.'
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
        output: 0,
        explanation: 'Processing the input data produces the output. For input array=[1, 2, 3, 4, 5], the result is 0.'
    }
        ],
        similar: [
    { id: '01-count-number-of-peaks', name: '01 Count Number Of Peaks', difficulty: 'Medium' },
    { id: '02-maximum-peak-sum', name: '02 Maximum Peak Sum', difficulty: 'Hard' },
    { id: '03-longest-bitonic-subsequence', name: '03 Longest Bitonic Subsequence', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '16-longest-peak', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/16-longest-peak'] = problem;

})();
