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
