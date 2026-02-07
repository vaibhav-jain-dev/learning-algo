/**
 * Square of Zeroes
 * Category: dynamic-programming
 * Difficulty: Very
 * Algorithm: dp-square-zeroes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Square of Zeroes',
        difficulty: 'Very',
        algorithm: 'dp-square-zeroes',
        description: 'Write a function that takes in a square matrix of only 0s and 1s and returns a boolean representing whether the matrix contains a square whose borders are made up of only 0s. Note that a square can be of size 1x1 (single 0 counts as a valid square of zeroes).',
        problem: 'Build the solution using dynamic programming. Define the state, establish the base cases, and derive the recurrence relation. Fill in the DP table bottom-up (or use memoized recursion top-down). This achieves O(n^3) time with O(n^2) space.',
        hints: [
            'Identify the subproblems: what decisions do you need to make at each step?',
            'Define your DP state clearly. What parameters uniquely identify a subproblem?',
            'Write the recurrence relation: how does the current state relate to previous states?',
            'Consider whether you can optimize space by only keeping the last row/column of the DP table.'
        ],

        complexity: {
            time: 'O(n^3)',
            space: 'O(n^2)'
        },
        examples: [
    {
        input: {
        "matrix": [
                [
                        1,
                        1,
                        1,
                        0,
                        1,
                        0
                ],
                [
                        0,
                        0,
                        0,
                        0,
                        0,
                        1
                ],
                [
                        0,
                        1,
                        1,
                        1,
                        0,
                        1
                ],
                [
                        0,
                        0,
                        0,
                        1,
                        0,
                        1
                ],
                [
                        0,
                        1,
                        1,
                        1,
                        0,
                        1
                ],
                [
                        0,
                        0,
                        0,
                        0,
                        0,
                        1
                ]
        ]
},
        output: true,
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
    },
    {
        input: {
        "matrix": [
                [
                        1,
                        1,
                        1
                ],
                [
                        1,
                        0,
                        1
                ],
                [
                        1,
                        1,
                        1
                ]
        ]
},
        output: true,
        explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
    },
    {
        input: {
        "matrix": [
                [
                        1,
                        1,
                        1
                ],
                [
                        1,
                        1,
                        1
                ],
                [
                        1,
                        1,
                        1
                ]
        ]
},
        output: false,
        explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
    }
        ],
        twists: [
            { id: '15-square-of-zeroes/twist-01-largest-square-of-zeroes', name: 'Largest Square of Zeroes', difficulty: 'Very Hard' },
            { id: '15-square-of-zeroes/twist-02-rectangle-of-zeroes', name: 'Rectangle of Zeroes', difficulty: 'Very Hard' },
            { id: '15-square-of-zeroes/twist-03-square-of-ones', name: 'Square of Ones', difficulty: 'Hard' },
            { id: '15-square-of-zeroes/twist-04-count-all-zero-bordered-squares', name: 'Count All Zero-Bordered Squares', difficulty: 'Hard' },
            { id: '15-square-of-zeroes/twist-05-zero-bordered-square-with-interior-sum', name: 'Zero-Bordered Square With Interior Sum', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '15-square-of-zeroes', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/15-square-of-zeroes'] = problem;

})();
