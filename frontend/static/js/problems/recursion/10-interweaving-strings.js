/**
 * Interweaving Strings
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-interweaving
 */
(function() {
    'use strict';

    const problem = {
        name: 'Interweaving Strings',
        difficulty: 'Hard',
        algorithm: 'recursion-interweaving',
        description: 'Write a function that takes in three strings and returns a boolean representing whether the third string can be formed by interweaving the first two strings. To interweave strings means to merge them by alternating their characters without changing the relative order of characters within each string. For example, the strings "abc" and "123" can be interwoven as "a1b2c3", "abc123", "1a2b3c", "123abc", "a1bc23", etc.',
        complexity: {
            time: 'O(n * m)',
            space: 'O(n * m)'
        },
        examples: [
    {
        input: {
        "one": "aabcc",
        "two": "dbbca",
        "three": "aadbbcbcac"
},
        output: true,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input one=aabcc, two=dbbca, three=aadbbcbcac, the result is true.'
    }
        ],
        twists: [
            { title: 'Count Interleavings', difficulty: 'Hard', description: 'Instead of returning true/false, count the total number of distinct ways to interleave the two strings to form the third string.', whyDifferent: 'Changes from boolean DP to counting DP, where each cell accumulates the number of paths rather than just feasibility.', example: 'For one="ab", two="cd", three="acbd", there is exactly 1 way. For one="ab", two="ab", three="aabb", there are 2+ways.' },
            { title: 'Three-String Interleave', difficulty: 'Very Hard', description: 'Determine if a fourth string can be formed by interleaving three given strings while maintaining the relative order of each.', whyDifferent: 'Extends the 2D DP table to 3D, significantly increasing state space and complexity of the recurrence relation.', example: 'For strings "a", "b", "c", check if "abc" can be formed by interleaving all three (maintaining order within each).' },
            { title: 'Find One Valid Interleaving', difficulty: 'Medium', description: 'If the interleaving is possible, return one valid way to partition the third string back into the two original strings (mark which character came from which string).', whyDifferent: 'Requires path reconstruction through the DP table, backtracking from the solution to determine the assignment of each character.', example: 'For one="aabcc", two="dbbca", three="aadbbcbcac", return a mapping like "112221212 1" showing source string for each character.' },
            { title: 'Interleaving with Wildcards', difficulty: 'Hard', description: 'The third string may contain wildcard characters (*) that can match any single character from either source string.', whyDifferent: 'Wildcards add branching at matching positions -- each * can match either the next character of string one or string two, increasing the state transitions.', example: 'For one="abc", two="def", three="a*b*ef", the wildcards could match d and c, so three="adbcef" is a valid interleaving.' },
            { title: 'Minimum Edit Interleave', difficulty: 'Very Hard', description: 'Given three strings, find the minimum number of character edits needed to make the third string a valid interleaving of the first two.', whyDifferent: 'Combines interleaving logic with edit distance, requiring a 3D DP where each state tracks the cost of corrections made so far.', example: 'For one="ab", two="cd", three="axcd", one edit (change x to b at position 1) makes it a valid interleaving "abcd".' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '10-interweaving-strings', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/10-interweaving-strings'] = problem;

})();
