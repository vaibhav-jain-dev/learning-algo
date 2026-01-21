/**
 * Target Sum
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Target Sum',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        description: 'You are given an integer array nums and an integer target. You want to build an **expression** out of nums by adding one of the symbols \'+\' and \'-\' before each integer in nums and then concatenate all the integers. Return the number of different expressions that you can build, which evaluates to target.',
        complexity: {
            time: 'O(n * sum)',
            space: 'O(sum)'
        },
        examples: [
    {
        input: {
        "nums": [
                1,
                1,
                1,
                1,
                1
        ],
        "target": 3
},
        output: 5,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1, 1, 1, 1, 1], target=3, the result is 5.'
    },
    {
        input: {
        "nums": [
                1
        ],
        "target": 1
},
        output: 1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1], target=1, the result is 1.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/02-target-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/02-target-sum'] = problem;

})();
