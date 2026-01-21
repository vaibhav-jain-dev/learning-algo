/**
 * Longest Monotonic Subarray
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Monotonic Subarray',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Given an array of integers, find the length of the longest **contiguous** subarray that is monotonic (either entirely non-increasing or entirely non-decreasing).',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [1, 4, 3, 2, 5, 6, 7]"
},
        output: "4\nExplanation: Subarray [2, 5, 6, 7] is non-decreasing with length 4",
        explanation: 'Given the input, the algorithm processes it to produce 4\nExplanation: Subarray [2, 5, 6, 7] is non-decreasing with length 4'
    },
    {
        input: {
        "raw": "array = [5, 4, 3, 2, 1]"
},
        output: "5\nExplanation: The entire array is non-increasing",
        explanation: 'Given the input, the algorithm processes it to produce 5\nExplanation: The entire array is non-increasing'
    },
    {
        input: {
        "raw": "array = [1, 2, 2, 3, 1]"
},
        output: "4\nExplanation: Subarray [1, 2, 2, 3] is non-decreasing",
        explanation: 'Given the input, the algorithm processes it to produce 4\nExplanation: Subarray [1, 2, 2, 3] is non-decreasing'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-longest-monotonic-subarray', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/01-longest-monotonic-subarray'] = problem;

})();
