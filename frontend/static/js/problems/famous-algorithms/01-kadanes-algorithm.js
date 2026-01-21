/**
 * Maximum Subarray Sum
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Subarray Sum',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        description: 'Given an array of integers (which may contain both positive and negative numbers), find the contiguous subarray with the largest sum. Return the maximum sum. This is the classic problem solved efficiently by Kadane\'s Algorithm, which uses dynamic programming to track the maximum subarray ending at each position.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "nums": [
                -2,
                1,
                -3,
                4,
                -1,
                2,
                1,
                -5,
                4
        ]
},
        output: 6,
        explanation: 'Processing the input data produces the output. For input nums=[-2, 1, ..., 4] (length 9), the result is 6.'
    }
        ],
        similar: [
    { id: '01-max-circular-subarray', name: 'Maximum Sum Circular Subarray', difficulty: 'Medium' },
    { id: '02-max-product-subarray', name: 'Maximum Product Subarray', difficulty: 'Medium' },
    { id: '03-max-sum-k-elements', name: 'Maximum Sum with at Least K Elements', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm'] = problem;

})();
