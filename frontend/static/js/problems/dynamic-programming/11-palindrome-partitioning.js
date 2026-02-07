/**
 * Palindrome Partitioning Min Cuts
 * Category: dynamic-programming
 * Difficulty: Very
 * Algorithm: dp-palindrome
 */
(function() {
    'use strict';

    const problem = {
        name: 'Palindrome Partitioning Min Cuts',
        difficulty: 'Very',
        algorithm: 'dp-palindrome',
        description: 'Given a non-empty string, write a function that returns the minimum number of cuts needed to partition the string such that each partition is a palindrome. A palindrome is a string that reads the same forwards and backwards.',
        problem: 'Build the solution using dynamic programming. Define the state, establish the base cases, and derive the recurrence relation. Fill in the DP table bottom-up (or use memoized recursion top-down). This achieves O(n^2) time with O(n^2) space.',
        hints: [
            'Identify the subproblems: what decisions do you need to make at each step?',
            'Define your DP state clearly. What parameters uniquely identify a subproblem?',
            'Write the recurrence relation: how does the current state relate to previous states?',
            'Consider whether you can optimize space by only keeping the last row/column of the DP table.'
        ],

        complexity: {
            time: 'O(n^2)',
            space: 'O(n^2)'
        },
        examples: [
    {
        input: {
        "string": "noonabbad"
},
        output: 2,
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
    },
    {
        input: {
        "string": "aab"
},
        output: 1,
        explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
    },
    {
        input: {
        "string": "aba"
},
        output: 0,
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
    },
    {
        input: {
        "string": "abcde"
},
        output: 4,
        explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
    }
        ],
        twists: [
            { id: '11-palindrome-partitioning/twist-01-return-all-minimum-partitions', name: 'Return All Minimum Partitions', difficulty: 'Hard' },
            { id: '11-palindrome-partitioning/twist-02-palindrome-partition-with-max-k-parts', name: 'Palindrome Partition With Max K Parts', difficulty: 'Hard' },
            { id: '11-palindrome-partitioning/twist-03-cost-weighted-palindrome-partitioning', name: 'Cost-Weighted Palindrome Partitioning', difficulty: 'Hard' },
            { id: '11-palindrome-partitioning/twist-04-longest-palindromic-partition-piece', name: 'Longest Palindromic Partition Piece', difficulty: 'Medium' },
            { id: '11-palindrome-partitioning/twist-05-check-if-k-palindrome', name: 'Check If K-Palindrome', difficulty: 'Medium' },
            { id: '11-palindrome-partitioning/twist-06-palindrome-partitioning-with-removals', name: 'Palindrome Partitioning With Removals', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '11-palindrome-partitioning', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/11-palindrome-partitioning'] = problem;

})();
