/**
 * Circular Array Loop
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: fast-slow-pointer
 */
(function() {
    'use strict';

    const problem = {
        name: 'Circular Array Loop',
        difficulty: 'Medium',
        algorithm: 'fast-slow-pointer',
        description: 'You are playing a game involving a circular array of non-zero integers nums. Each nums[i] denotes the number of indices forward/backward you must move if you are located at index i: - If nums[i] is positive, move nums[i] steps forward - If nums[i] is negative, move |nums[i]| steps backward Since the array is circular, you may assume that moving forward from the last element puts you on the first element, and moving backwards from the first element puts you on the last element. A cycle in the arr',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "nums": [
                2,
                -1,
                1,
                2,
                2
        ]
},
        output: true,
        explanation: 'Processing the input data produces the output. For input nums=[2, -1, 1, 2, 2], the result is true.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/03-circular-array-loop', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/03-circular-array-loop'] = problem;

})();
