/**
 * Longest Increasing Subsequence
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-increasing-subseq
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Increasing Subsequence',
        difficulty: 'Hard',
        algorithm: 'dp-increasing-subseq',
        description: 'Given an array of integers, return the longest strictly increasing subsequence. A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. Return the actual subsequence, not just the length.',
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                5,
                7,
                -24,
                12,
                10,
                2,
                3,
                12,
                5,
                6,
                35
        ]
},
        output: [-24, 2, 3, 5, 6, 35],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[5, 7, ..., 35] (length 11), the result is [-24, ..., 35] (length 6).'
    },
    {
        input: {
        "array": [
                10,
                9,
                2,
                5,
                3,
                7,
                101,
                18
        ]
},
        output: [2, 3, 7, 18],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[10, 9, ..., 18] (length 8), the result is [2, 3, 7, 18].'
    },
    {
        input: {
        "array": [
                0,
                1,
                0,
                3,
                2,
                3
        ]
},
        output: [0, 1, 2, 3],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[0, 1, ..., 3] (length 6), the result is [0, 1, 2, 3].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '12-longest-increasing-subseq', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/12-longest-increasing-subseq'] = problem;

})();
