/**
 * Longest Common Subsequence
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-lcs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Common Subsequence',
        difficulty: 'Medium',
        algorithm: 'dp-lcs',
        description: 'Write a function that takes in two strings and returns their longest common subsequence (LCS). A subsequence of a string is a set of characters that are not necessarily adjacent in the string but are in the same order as they appear in the string. If there are multiple longest common subsequences, return any one of them.',
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
        "str1": "ZXVVYZW",
        "str2": "XKYKZPW"
},
        output: ["X", "Y", "Z", "W"],
        explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
    },
    {
        input: {
        "str1": "ABCDGH",
        "str2": "AEDFHR"
},
        output: ["A", "D", "H"],
        explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
    },
    {
        input: {
        "str1": "ABC",
        "str2": "DEF"
},
        output: [],
        explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
    }
        ],
        twists: [
            { id: '06-longest-common-subseq/twist-01-longest-common-substring', name: 'Longest Common Substring', difficulty: 'Medium' },
            { id: '06-longest-common-subseq/twist-02-lcs-of-three-strings', name: 'LCS of Three Strings', difficulty: 'Hard' },
            { id: '06-longest-common-subseq/twist-03-shortest-common-supersequence', name: 'Shortest Common Supersequence', difficulty: 'Hard' },
            { id: '06-longest-common-subseq/twist-04-lcs-with-at-most-k-mismatches', name: 'LCS With At Most K Mismatches', difficulty: 'Hard' },
            { id: '06-longest-common-subseq/twist-05-diff-output-from-lcs', name: 'Diff Output From LCS', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '06-longest-common-subseq', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/06-longest-common-subseq'] = problem;

})();
