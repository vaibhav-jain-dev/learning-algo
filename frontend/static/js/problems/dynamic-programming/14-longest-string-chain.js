/**
 * Longest String Chain
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-string-chain
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest String Chain',
        difficulty: 'Hard',
        algorithm: 'dp-string-chain',
        description: 'Given a list of words, where each word consists of only lowercase English letters, find the longest string chain. A string chain is a sequence of words [word_1, word_2, ..., word_k] where word_i+1 can be formed by adding exactly one letter to word_i at any position. All words in the chain must be in the given list. Return the length of the longest possible string chain.',
        problem: 'Build the solution using dynamic programming. Define the state, establish the base cases, and derive the recurrence relation. Fill in the DP table bottom-up (or use memoized recursion top-down). This achieves O(n * L^2) time with O(n * L) space.',
        hints: [
            'Identify the subproblems: what decisions do you need to make at each step?',
            'Define your DP state clearly. What parameters uniquely identify a subproblem?',
            'Write the recurrence relation: how does the current state relate to previous states?',
            'Consider whether you can optimize space by only keeping the last row/column of the DP table.'
        ],

        complexity: {
            time: 'O(n * L^2)',
            space: 'O(n * L)'
        },
        examples: [
    {
        input: {
        "words": [
                "a",
                "b",
                "ba",
                "bca",
                "bda",
                "bdca"
        ]
},
        output: 4,
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
    },
    {
        input: {
        "words": [
                "xbc",
                "pcxbcf",
                "xb",
                "cxbc",
                "pcxbc"
        ]
},
        output: 5,
        explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
    },
    {
        input: {
        "words": [
                "abcd",
                "dbqca"
        ]
},
        output: 1,
        explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
    }
        ],
        twists: [
            { id: '14-longest-string-chain/twist-01-string-chain-with-deletion', name: 'String Chain With Deletion', difficulty: 'Medium' },
            { id: '14-longest-string-chain/twist-02-longest-chain-with-any-edit', name: 'Longest Chain With Any Edit', difficulty: 'Hard' },
            { id: '14-longest-string-chain/twist-03-count-longest-string-chains', name: 'Count Longest String Chains', difficulty: 'Medium' },
            { id: '14-longest-string-chain/twist-04-string-chain-forming-target', name: 'String Chain Forming Target', difficulty: 'Hard' },
            { id: '14-longest-string-chain/twist-05-minimum-words-to-bridge', name: 'Minimum Words to Bridge', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '14-longest-string-chain', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/14-longest-string-chain'] = problem;

})();
