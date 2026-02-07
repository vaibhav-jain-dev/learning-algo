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
        problem: 'Build the solution using dynamic programming. Define the state, establish the base cases, and derive the recurrence relation. Fill in the DP table bottom-up (or use memoized recursion top-down). This achieves O(n^2) time with O(n) space.',
        hints: [
            'Identify the subproblems: what decisions do you need to make at each step?',
            'Define your DP state clearly. What parameters uniquely identify a subproblem?',
            'Write the recurrence relation: how does the current state relate to previous states?',
            'Consider whether you can optimize space by only keeping the last row/column of the DP table.'
        ],

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
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
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
        explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
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
        explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
    }
        ],
        twists: [
            { id: '12-longest-increasing-subseq/twist-01-longest-decreasing-subsequence', name: 'Longest Decreasing Subsequence', difficulty: 'Medium' },
            { id: '12-longest-increasing-subseq/twist-02-longest-bitonic-subsequence', name: 'Longest Bitonic Subsequence', difficulty: 'Hard' },
            { id: '12-longest-increasing-subseq/twist-03-lis-in-on-log-n', name: 'LIS in O(n log n)', difficulty: 'Hard' },
            { id: '12-longest-increasing-subseq/twist-04-number-of-longest-increasing-subsequences', name: 'Number of Longest Increasing Subsequences', difficulty: 'Hard' },
            { id: '12-longest-increasing-subseq/twist-05-minimum-deletions-for-sorted-array', name: 'Minimum Deletions for Sorted Array', difficulty: 'Medium' }
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
