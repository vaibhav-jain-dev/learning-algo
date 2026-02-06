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
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input str1=ZXVVYZW, str2=XKYKZPW, the result is [\'X\', \'Y\', \'Z\', \'W\'].'
    },
    {
        input: {
        "str1": "ABCDGH",
        "str2": "AEDFHR"
},
        output: ["A", "D", "H"],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input str1=ABCDGH, str2=AEDFHR, the result is [\'A\', \'D\', \'H\'].'
    },
    {
        input: {
        "str1": "ABC",
        "str2": "DEF"
},
        output: [],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input str1=ABC, str2=DEF, the result is [].'
    }
        ],
        twists: [
            { id: '06-longest-common-subseq/twist-01-longest-common-substring', title: 'Longest Common Substring', difficulty: 'Medium' },
            { id: '06-longest-common-subseq/twist-02-lcs-of-three-strings', title: 'LCS of Three Strings', difficulty: 'Hard' },
            { id: '06-longest-common-subseq/twist-03-shortest-common-supersequence', title: 'Shortest Common Supersequence', difficulty: 'Hard' },
            { id: '06-longest-common-subseq/twist-04-lcs-with-at-most-k-mismatches', title: 'LCS With At Most K Mismatches', difficulty: 'Hard' },
            { id: '06-longest-common-subseq/twist-05-diff-output-from-lcs', title: 'Diff Output From LCS', difficulty: 'Medium' }
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
