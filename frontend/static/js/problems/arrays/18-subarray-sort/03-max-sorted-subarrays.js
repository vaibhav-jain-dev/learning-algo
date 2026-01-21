/**
 * Max Sorted Subarrays
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Sorted Subarrays',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Given an array, find the maximum number of chunks we can make to sort the array. Each chunk can be sorted independently, and after sorting all chunks and concatenating them, the result should be a sorted array.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [1, 0, 2, 3, 4]"
},
        output: "4\nExplanation: Chunks: [1, 0], [2], [3], [4]",
        explanation: 'Given the input, the algorithm processes it to produce 4\nExplanation: Chunks: [1, 0], [2], [3], [4]'
    },
    {
        input: {
        "raw": "array = [4, 3, 2, 1, 0]"
},
        output: "1\nExplanation: Only one chunk (entire array)",
        explanation: 'Given the input, the algorithm processes it to produce 1\nExplanation: Only one chunk (entire array)'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 18-subarray-sort
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '18-subarray-sort/03-max-sorted-subarrays', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/18-subarray-sort/03-max-sorted-subarrays'] = problem;

})();
