/**
 * Maximum Sum Submatrix
 * Category: dynamic-programming
 * Difficulty: Very
 * Algorithm: dp-matrix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Sum Submatrix',
        difficulty: 'Very',
        algorithm: 'dp-matrix',
        description: 'Given a 2D matrix of integers and a positive integer size, write a function that returns the maximum sum of any size x size submatrix within the given matrix.',
        problem: 'Build the solution using dynamic programming. Define the state, establish the base cases, and derive the recurrence relation. Fill in the DP table bottom-up (or use memoized recursion top-down). This achieves O(rows * cols) time with O(rows * cols) space.',
        hints: [
            'Identify the subproblems: what decisions do you need to make at each step?',
            'Define your DP state clearly. What parameters uniquely identify a subproblem?',
            'Write the recurrence relation: how does the current state relate to previous states?',
            'Consider whether you can optimize space by only keeping the last row/column of the DP table.'
        ],

        complexity: {
            time: 'O(rows * cols)',
            space: 'O(rows * cols)'
        },
        examples: [
    {
        input: {
        "matrix": [
                [
                        5,
                        3,
                        -1,
                        5
                ],
                [
                        -7,
                        3,
                        7,
                        4
                ],
                [
                        12,
                        8,
                        0,
                        0
                ],
                [
                        1,
                        -8,
                        -8,
                        2
                ]
        ],
        "size": 2
},
        output: 18,
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
    },
    {
        input: {
        "matrix": [
                [
                        1,
                        2
                ],
                [
                        3,
                        4
                ]
        ],
        "size": 1
},
        output: 4,
        explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
    },
    {
        input: {
        "matrix": [
                [
                        1,
                        2,
                        3
                ],
                [
                        4,
                        5,
                        6
                ],
                [
                        7,
                        8,
                        9
                ]
        ],
        "size": 2
},
        output: 28,
        explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
    }
        ],
        twists: [
            { id: '13-max-sum-submatrix/twist-01-max-sum-rectangle-any-size', name: 'Max Sum Rectangle (Any Size)', difficulty: 'Hard' },
            { id: '13-max-sum-submatrix/twist-02-max-sum-submatrix-no-larger-than-k', name: 'Max Sum Submatrix No Larger Than K', difficulty: 'Very Hard' },
            { id: '13-max-sum-submatrix/twist-03-min-sum-submatrix-of-given-size', name: 'Min Sum Submatrix of Given Size', difficulty: 'Medium' },
            { id: '13-max-sum-submatrix/twist-04-count-submatrices-with-target-sum', name: 'Count Submatrices With Target Sum', difficulty: 'Hard' },
            { id: '13-max-sum-submatrix/twist-05-max-sum-submatrix-with-obstacles', name: 'Max Sum Submatrix With Obstacles', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '13-max-sum-submatrix', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/13-max-sum-submatrix'] = problem;

})();
