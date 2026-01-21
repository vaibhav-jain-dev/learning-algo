/**
 * Count Distinct Subsequences
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Distinct Subsequences',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Given two strings s and t, return the number of distinct subsequences of s which equals t. A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "s = \"rabbbit\", t = \"rabbit\""
},
        output: "3\nExplanation: There are 3 ways to choose \"rabbit\" from \"rabbbit\"",
        explanation: 'Given the input, the algorithm processes it to produce 3\nExplanation: There are 3 ways to choose "rabbit" from "rabbbit"'
    },
    {
        input: {
        "raw": "s = \"babgbag\", t = \"bag\""
},
        output: "5\nExplanation: 5 different ways to form \"bag\" from \"babgbag\"",
        explanation: 'Given the input, the algorithm processes it to produce 5\nExplanation: 5 different ways to form "bag" from "babgbag"'
    }
        ],
        similar: []
    };

    // Register with ProblemRenderer - as sub-problem of 01-validate-subsequence
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/02-count-distinct-subsequences', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/02-count-distinct-subsequences'] = problem;

})();
