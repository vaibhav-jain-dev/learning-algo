/**
 * Levenshtein Distance
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-edit-distance
 */
(function() {
    'use strict';

    const problem = {
        name: 'Levenshtein Distance',
        difficulty: 'Medium',
        algorithm: 'dp-edit-distance',
        description: 'Write a function that takes in two strings and returns the minimum number of edit operations needed to transform the first string into the second string. There are three operations permitted on a string: 1. Insert a character 2. Delete a character 3. Replace a character This is also known as the Edit Distance or the Levenshtein Distance problem.',
        problem: 'Build the solution using dynamic programming. Define the state, establish the base cases, and derive the recurrence relation. Fill in the DP table bottom-up (or use memoized recursion top-down). This achieves O(m * n) time with O(m * n) space.',
        hints: [
            'Identify the subproblems: what decisions do you need to make at each step?',
            'Define your DP state clearly. What parameters uniquely identify a subproblem?',
            'Write the recurrence relation: how does the current state relate to previous states?',
            'Consider whether you can optimize space by only keeping the last row/column of the DP table.'
        ],

        complexity: {
            time: 'O(m * n)',
            space: 'O(m * n)'
        },
        examples: [
    {
        input: {
        "str1": "abc",
        "str2": "yabd"
},
        output: 2,
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
    },
    {
        input: {
        "str1": "horse",
        "str2": "ros"
},
        output: 3,
        explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
    },
    {
        input: {
        "str1": "",
        "str2": "abc"
},
        output: 3,
        explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
    }
        ],
        twists: [
            { id: '04-levenshtein-distance/twist-01-weighted-edit-operations', name: 'Weighted Edit Operations', difficulty: 'Hard' },
            { id: '04-levenshtein-distance/twist-02-recover-edit-sequence', name: 'Recover Edit Sequence', difficulty: 'Medium' },
            { id: '04-levenshtein-distance/twist-03-edit-distance-with-transposition', name: 'Edit Distance With Transposition', difficulty: 'Hard' },
            { id: '04-levenshtein-distance/twist-04-edit-distance-with-only-insert-and-delete', name: 'Edit Distance With Only Insert and Delete', difficulty: 'Medium' },
            { id: '04-levenshtein-distance/twist-05-k-edit-distance-filter', name: 'K-Edit Distance Filter', difficulty: 'Hard' },
            { id: '04-levenshtein-distance/twist-06-substring-edit-distance', name: 'Substring Edit Distance', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '04-levenshtein-distance', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/04-levenshtein-distance'] = problem;

})();
