/**
 * Ways To Traverse Graph
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-graph-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Ways To Traverse Graph',
        difficulty: 'Medium',
        algorithm: 'dp-graph-traversal',
        description: 'You\'re given two positive integers representing the width and height of a grid-shaped, rectangular graph. Write a function that returns the number of ways to reach the bottom-right corner of the graph when starting at the top-left corner. Each move you take must either go down or right. In other words, you can never move up or left in the graph. For example, given a graph of width 2 and height 3, there are 3 ways to reach the bottom-right corner: 1. Down, Down, Right 2. Down, Right, Down 3. Righ.',
        problem: 'Build the solution using dynamic programming. Define the state, establish the base cases, and derive the recurrence relation. Fill in the DP table bottom-up (or use memoized recursion top-down). This achieves O(width * height) time with O(width * height) space.',
        hints: [
            'Identify the subproblems: what decisions do you need to make at each step?',
            'Define your DP state clearly. What parameters uniquely identify a subproblem?',
            'Write the recurrence relation: how does the current state relate to previous states?',
            'Consider whether you can optimize space by only keeping the last row/column of the DP table.'
        ],

        complexity: {
            time: 'O(width * height)',
            space: 'O(width * height)'
        },
        examples: [
    {
        input: {
        "width": 4,
        "height": 3
},
        output: 10,
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
    },
    {
        input: {
        "width": 2,
        "height": 2
},
        output: 2,
        explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
    },
    {
        input: {
        "width": 3,
        "height": 3
},
        output: 6,
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
    },
    {
        input: {
        "width": 1,
        "height": 5
},
        output: 1,
        explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
    }
        ],
        twists: [
            { id: '16-ways-to-traverse-graph/twist-01-graph-with-obstacles', name: 'Graph With Obstacles', difficulty: 'Medium' },
            { id: '16-ways-to-traverse-graph/twist-02-minimum-cost-path', name: 'Minimum Cost Path', difficulty: 'Medium' },
            { id: '16-ways-to-traverse-graph/twist-03-count-paths-with-diagonal-moves', name: 'Count Paths With Diagonal Moves', difficulty: 'Medium' },
            { id: '16-ways-to-traverse-graph/twist-04-count-paths-modulo-m', name: 'Count Paths Modulo M', difficulty: 'Medium' },
            { id: '16-ways-to-traverse-graph/twist-05-paths-through-mandatory-waypoint', name: 'Paths Through Mandatory Waypoint', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '16-ways-to-traverse-graph', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/16-ways-to-traverse-graph'] = problem;

})();
