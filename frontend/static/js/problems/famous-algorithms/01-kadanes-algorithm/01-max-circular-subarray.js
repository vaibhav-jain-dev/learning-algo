/**
 * Maximum Sum Circular Subarray
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Sum Circular Subarray',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        description: 'Given a circular integer array nums, find the maximum possible sum of a non-empty subarray. A circular array means the end of the array connects to the beginning.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "nums": [
                1,
                -2,
                3,
                -2
        ]
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input nums=[1, -2, 3, -2], the result is 3.'
    },
    {
        input: {
        "nums": [
                5,
                -3,
                5
        ]
},
        output: 10,
        explanation: 'Processing the input data produces the output. For input nums=[5, -3, 5], the result is 10.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/01-max-circular-subarray', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/01-max-circular-subarray'] = problem;

})();
