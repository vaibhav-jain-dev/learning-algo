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
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
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
        explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
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
        explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
    }
        ],
        twists: [
            { id: '05-max-sum-increasing/twist-01-max-product-increasing-subsequence', name: 'Max Product Increasing Subsequence', difficulty: 'Hard' },
            { id: '05-max-sum-increasing/twist-02-max-sum-non-decreasing-subsequence', name: 'Max Sum Non-Decreasing Subsequence', difficulty: 'Medium' },
            { id: '05-max-sum-increasing/twist-03-max-sum-increasing-with-gap-limit', name: 'Max Sum Increasing With Gap Limit', difficulty: 'Hard' },
            { id: '05-max-sum-increasing/twist-04-minimum-sum-increasing-subsequence-of-length-k', name: 'Minimum Sum Increasing Subsequence of Length K', difficulty: 'Hard' },
            { id: '05-max-sum-increasing/twist-05-count-max-sum-increasing-subsequences', name: 'Count Max Sum Increasing Subsequences', difficulty: 'Medium' }
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
