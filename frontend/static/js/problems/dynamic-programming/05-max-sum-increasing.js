/**
 * Max Sum Increasing Subsequence
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-increasing-subseq
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Sum Increasing Subsequence',
        difficulty: 'Hard',
        algorithm: 'dp-increasing-subseq',
        description: 'Write a function that takes in a non-empty array of integers and returns the greatest sum that can be generated from a strictly increasing subsequence in the array, as well as the indices of the elements in that subsequence. A subsequence of an array is a set of numbers that are not necessarily adjacent but are in the same order as they appear in the array.',
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                10,
                70,
                20,
                30,
                50,
                11,
                30
        ]
},
        output: [110, [0, 2, 3, 4]],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[10, 70, ..., 30] (length 7), the result is [110, [0, 2, 3, 4]].'
    },
    {
        input: {
        "array": [
                8,
                12,
                2,
                3,
                15,
                5,
                7
        ]
},
        output: [35, [0, 1, 4]],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[8, 12, ..., 7] (length 7), the result is [35, [0, 1, 4]].'
    },
    {
        input: {
        "array": [
                1,
                2,
                3,
                4,
                5
        ]
},
        output: [15, [0, 1, 2, 3, 4]],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[1, 2, 3, 4, 5], the result is [15, [0, 1, 2, 3, 4]].'
    }
        ],
        twists: [
            { id: '05-max-sum-increasing/twist-01-max-product-increasing-subsequence', title: 'Max Product Increasing Subsequence', difficulty: 'Hard' },
            { id: '05-max-sum-increasing/twist-02-max-sum-non-decreasing-subsequence', title: 'Max Sum Non-Decreasing Subsequence', difficulty: 'Medium' },
            { id: '05-max-sum-increasing/twist-03-max-sum-increasing-with-gap-limit', title: 'Max Sum Increasing With Gap Limit', difficulty: 'Hard' },
            { id: '05-max-sum-increasing/twist-04-minimum-sum-increasing-subsequence-of-length-k', title: 'Minimum Sum Increasing Subsequence of Length K', difficulty: 'Hard' },
            { id: '05-max-sum-increasing/twist-05-count-max-sum-increasing-subsequences', title: 'Count Max Sum Increasing Subsequences', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '05-max-sum-increasing', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/05-max-sum-increasing'] = problem;

})();
