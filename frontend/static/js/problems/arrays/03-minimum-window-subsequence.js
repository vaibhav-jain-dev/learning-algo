/**
 * Minimum Window Subsequence
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Window Subsequence',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Given strings s1 and s2, return the minimum contiguous substring of s1 such that s2 is a subsequence of that substring. If there is no such window, return an empty string. If there are multiple answer windows of the same length, return the one with the smallest starting index.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "s1 = \"abcdebdde\", s2 = \"bde\""
},
        output: "\"bcde\"\nExplanation:\n\"bcde\" is the smallest window where \"bde\" is a subsequence.\nThere's also \"bdde\" but \"bcde\" appears first.",
        explanation: 'Given the input, the algorithm processes it to produce "bcde"\nExplanation:\n"bcde" is the smallest window where "bde" is a subsequence.\nThere\'s also "bdde" but "bcde" appears first.'
    },
    {
        input: {
        "raw": "s1 = \"jmeqksfrsdcmsiwvaovztaqenprpvnbstl\", s2 = \"u\""
},
        output: "\"\"\nExplanation: There is no 'u' in s1.",
        explanation: 'Given the input, the algorithm processes it to produce ""\nExplanation: There is no \'u\' in s1.'
    },
    {
        input: {
        "raw": "s1 = \"abcdef\", s2 = \"ace\""
},
        output: "\"abcde\"\nExplanation: The window from 'a' to 'e' contains \"ace\" as subsequence.",
        explanation: 'Given the input, the algorithm processes it to produce "abcde"\nExplanation: The window from \'a\' to \'e\' contains "ace" as subsequence.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-minimum-window-subsequence', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/03-minimum-window-subsequence'] = problem;

})();
