/**
 * Partition Equal Subset Sum
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Partition Equal Subset Sum',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        description: 'Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal, or false otherwise.',
        complexity: {
            time: 'O(n * sum)',
            space: 'O(sum)'
        },
        examples: [
    {
        input: {
        "nums": [
                1,
                5,
                11,
                5
        ]
},
        output: true,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1, 5, 11, 5], the result is true.'
    },
    {
        input: {
        "nums": [
                1,
                2,
                3,
                5
        ]
},
        output: false,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1, 2, 3, 5], the result is false.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/03-partition-equal-subset-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/03-partition-equal-subset-sum'] = problem;

})();
