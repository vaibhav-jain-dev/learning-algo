/**
 * Delete and Earn
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-max-subset
 */
(function() {
    'use strict';

    const problem = {
        name: 'Delete and Earn',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        description: 'You are given an integer array nums. You want to maximize the number of points you get by performing the following operation any number of times: - Pick any nums[i] and delete it to earn nums[i] points. - Afterwards, you must delete **every** element equal to nums[i] - 1 and **every** element equal to nums[i] + 1. Return the **maximum number of points** you can earn by applying the above operation some number of times.',
        complexity: {
            time: 'O(n + max_val)',
            space: 'O(max_val)'
        },
        examples: [
    {
        input: {
        "nums": [
                3,
                4,
                2
        ]
},
        output: 6,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[3, 4, 2], the result is 6.'
    },
    {
        input: {
        "nums": [
                2,
                2,
                3,
                3,
                3,
                4
        ]
},
        output: 9,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[2, 2, ..., 4] (length 6), the result is 9.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/02-delete-and-earn', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/02-delete-and-earn'] = problem;

})();
