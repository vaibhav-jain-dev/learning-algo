/**
 * Maximum Sum with at Least K Elements
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Sum with at Least K Elements',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        description: 'Given an array of integers and an integer k, find the maximum sum of a subarray that contains at least k elements.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "nums": [
                1,
                -2,
                3,
                -1,
                5
        ],
        "k": 2
},
        output: 7,
        explanation: 'Processing the input data produces the output. For input nums=[1, -2, 3, -1, 5], k=2, the result is 7.'
    },
    {
        input: {
        "nums": [
                -1,
                -2,
                -3
        ],
        "k": 2
},
        output: -3,
        explanation: 'Processing the input data produces the output. For input nums=[-1, -2, -3], k=2, the result is -3.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-max-sum-k-elements', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-max-sum-k-elements'] = problem;

})();
