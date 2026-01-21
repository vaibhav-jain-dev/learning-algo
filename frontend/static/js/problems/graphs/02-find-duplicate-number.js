/**
 * Find Duplicate Number
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: floyd-cycle-detection
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Duplicate Number',
        difficulty: 'Medium',
        algorithm: 'floyd-cycle-detection',
        description: 'Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number in nums, return this repeated number. You must solve the problem without modifying the array and using only constant extra space.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "nums": [
                1,
                3,
                4,
                2,
                2
        ]
},
        output: 2,
        explanation: 'Processing the input data produces the output. For input nums=[1, 3, 4, 2, 2], the result is 2.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-find-duplicate-number', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-find-duplicate-number'] = problem;

})();
