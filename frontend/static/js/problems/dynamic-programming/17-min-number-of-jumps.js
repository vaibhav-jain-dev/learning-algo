/**
 * Min Number Of Jumps
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-jumps
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Number Of Jumps',
        difficulty: 'Hard',
        algorithm: 'dp-jumps',
        description: 'You\'re given a non-empty array of positive integers where each integer represents the maximum number of steps you can take forward from that position. For example, if the element at index 1 is 3, you can go from index 1 to index 2, 3, or 4. Write a function that returns the minimum number of jumps needed to reach the last index of the array. If it\'s not possible to reach the last index, return -1.',
        problem: 'Build the solution using dynamic programming. Define the state, establish the base cases, and derive the recurrence relation. Fill in the DP table bottom-up (or use memoized recursion top-down). This achieves O(n) time with O(1) space.',
        hints: [
            'Identify the subproblems: what decisions do you need to make at each step?',
            'Define your DP state clearly. What parameters uniquely identify a subproblem?',
            'Write the recurrence relation: how does the current state relate to previous states?',
            'Consider whether you can optimize space by only keeping the last row/column of the DP table.'
        ],

        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [
                3,
                4,
                2,
                1,
                2,
                3,
                7,
                1,
                1,
                1,
                3
        ]
},
        output: 4,
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
    },
    {
        input: {
        "array": [
                2,
                1,
                1
        ]
},
        output: 1,
        explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
    },
    {
        input: {
        "array": [
                1,
                1,
                1,
                1
        ]
},
        output: 3,
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
    },
    {
        input: {
        "array": [
                1,
                0,
                1
        ]
},
        output: -1,
        explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
    }
        ],
        twists: [
            { id: '17-min-number-of-jumps/twist-01-can-reach-end-boolean', name: 'Can Reach End (Boolean)', difficulty: 'Easy' },
            { id: '17-min-number-of-jumps/twist-02-jump-game-with-backward-jumps', name: 'Jump Game With Backward Jumps', difficulty: 'Hard' },
            { id: '17-min-number-of-jumps/twist-03-minimum-cost-jumps', name: 'Minimum Cost Jumps', difficulty: 'Medium' },
            { id: '17-min-number-of-jumps/twist-04-count-minimum-jump-paths', name: 'Count Minimum Jump Paths', difficulty: 'Hard' },
            { id: '17-min-number-of-jumps/twist-05-minimum-jumps-with-exact-landing', name: 'Minimum Jumps With Exact Landing', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '17-min-number-of-jumps', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/17-min-number-of-jumps'] = problem;

})();
