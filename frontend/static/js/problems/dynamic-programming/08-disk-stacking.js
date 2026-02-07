/**
 * Disk Stacking
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-disk-stacking
 */
(function() {
    'use strict';

    const problem = {
        name: 'Disk Stacking',
        difficulty: 'Hard',
        algorithm: 'dp-disk-stacking',
        description: 'You are given an array of disks where each disk is represented as an array of three values: [width, depth, height]. Write a function that returns an array representing the disks in a stack that has the maximum height. A disk can only be placed on top of another disk if its width, depth, and height are all strictly less than the other disk\'s corresponding dimensions. The stack must maintain this property from bottom to top.',
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
        "disks": [
                [
                        2,
                        1,
                        2
                ],
                [
                        3,
                        2,
                        3
                ],
                [
                        2,
                        2,
                        8
                ],
                [
                        2,
                        3,
                        4
                ],
                [
                        1,
                        3,
                        1
                ],
                [
                        4,
                        4,
                        5
                ]
        ]
},
        output: [[2, 1, 2], [3, 2, 3], [4, 4, 5]],
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
    },
    {
        input: {
        "disks": [
                [
                        2,
                        1,
                        2
                ]
        ]
},
        output: [[2, 1, 2]],
        explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
    },
    {
        input: {
        "disks": [
                [
                        1,
                        1,
                        1
                ],
                [
                        2,
                        2,
                        2
                ],
                [
                        3,
                        3,
                        3
                ]
        ]
},
        output: [[1, 1, 1], [2, 2, 2], [3, 3, 3]],
        explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
    }
        ],
        twists: [
            { id: '08-disk-stacking/twist-01-maximize-number-of-disks', name: 'Maximize Number of Disks', difficulty: 'Medium' },
            { id: '08-disk-stacking/twist-02-disk-stacking-with-rotation', name: 'Disk Stacking With Rotation', difficulty: 'Hard' },
            { id: '08-disk-stacking/twist-03-two-dimensional-stacking', name: 'Two-Dimensional Stacking', difficulty: 'Medium' },
            { id: '08-disk-stacking/twist-04-minimum-disks-to-reach-height', name: 'Minimum Disks to Reach Height', difficulty: 'Hard' },
            { id: '08-disk-stacking/twist-05-count-valid-stackings', name: 'Count Valid Stackings', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '08-disk-stacking', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/08-disk-stacking'] = problem;

})();
