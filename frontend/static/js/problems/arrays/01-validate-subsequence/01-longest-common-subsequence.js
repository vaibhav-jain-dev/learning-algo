/**
 * Longest Common Subsequence
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Common Subsequence',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "text1 = \"abcde\", text2 = \"ace\""
},
        output: "3\nExplanation: The longest common subsequence is \"ace\" with length 3.",
        explanation: 'Given the input, the algorithm processes it to produce 3\nExplanation: The longest common subsequence is "ace" with length 3.'
    },
    {
        input: {
        "raw": "text1 = \"abc\", text2 = \"abc\""
},
        output: "3",
        explanation: 'Given the input, the algorithm processes it to produce 3'
    },
    {
        input: {
        "raw": "text1 = \"abc\", text2 = \"def\""
},
        output: "0",
        explanation: 'Given the input, the algorithm processes it to produce 0'
    }
        ],
        similar: []
    };

    // Register with ProblemRenderer - as sub-problem of 01-validate-subsequence
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/01-longest-common-subsequence', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/01-longest-common-subsequence'] = problem;

})();
