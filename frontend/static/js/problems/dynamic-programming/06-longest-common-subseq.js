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
            { title: 'Longest Common Substring', difficulty: 'Medium', description: 'Find the longest common substring (contiguous) instead of subsequence (non-contiguous) between two strings.', whyDifferent: 'The contiguity requirement changes the DP recurrence: when characters do not match, the value resets to 0 instead of carrying forward from adjacent cells.', example: 'str1="ABCDGH", str2="ACDGHR": LCS (subsequence)=4 [A,D,G,H], but longest common substring=2 "GH".' },
            { title: 'LCS of Three Strings', difficulty: 'Hard', description: 'Find the longest common subsequence among three strings instead of two.', whyDifferent: 'Extends the 2D DP table to 3D, significantly increasing complexity and requiring you to reason about matching across three dimensions simultaneously.', example: 'str1="ABCBDAB", str2="BDCAB", str3="BADACB": LCS of all three is "BAB" or "BCB" with length 3.' },
            { title: 'Shortest Common Supersequence', difficulty: 'Hard', description: 'Find the shortest string that has both str1 and str2 as subsequences. Use LCS as a building block.', whyDifferent: 'Inverts the problem from finding what is shared to constructing a merged result. The answer length is len(str1) + len(str2) - LCS_length, but reconstructing the actual string requires careful interleaving.', example: 'str1="AGGTAB", str2="GXTXAYB": SCS is "AGGXTXAYB" with length 9, using LCS "GTAB" to merge optimally.' },
            { title: 'LCS With At Most K Mismatches', difficulty: 'Hard', description: 'Find the longest common subsequence between two strings where you are allowed up to k mismatches (positions where characters differ but are still included).', whyDifferent: 'Adds a mismatch budget to the DP state, turning it into a 3D problem where you must decide whether to spend a mismatch or skip a character.', example: 'str1="ABCDE", str2="AXCYE", k=1: standard LCS is "ACE" (length 3). With 1 mismatch: "ABCDE" matches "AXCYE" as A,B/X,C,D/Y,E giving length 5 with 2 mismatches, so with k=1 we get length 4.' },
            { title: 'Diff Output From LCS', difficulty: 'Medium', description: 'Using the LCS, produce a unified diff showing which characters were added, removed, or kept when transforming str1 into str2.', whyDifferent: 'Shifts focus from computing the LCS length to interpreting the DP table as an alignment tool, requiring backtracking and output formatting.', example: 'str1="ABCB", str2="BDCAB": diff output shows -A, B, -C, +D, +C, +A, B showing the transformation steps.' }
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
