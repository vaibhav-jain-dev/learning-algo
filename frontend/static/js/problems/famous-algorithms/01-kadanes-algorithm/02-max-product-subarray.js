/**
 * Maximum Product Subarray
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Product Subarray',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        description: 'Given an integer array nums, find a contiguous subarray that has the largest product, and return the product.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "nums": [
                2,
                3,
                -2,
                4
        ]
},
        output: 6,
        explanation: 'Processing the input data produces the output. For input nums=[2, 3, -2, 4], the result is 6.'
    },
    {
        input: {
        "nums": [
                -2,
                0,
                -1
        ]
},
        output: 0,
        explanation: 'Processing the input data produces the output. For input nums=[-2, 0, -1], the result is 0.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/02-max-product-subarray', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/02-max-product-subarray'] = problem;

})();
