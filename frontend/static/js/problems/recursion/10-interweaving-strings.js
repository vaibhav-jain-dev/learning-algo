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
        problem: 'Break the problem into smaller subproblems recursively. Define clear base cases and recursive cases. At each step, assume the recursive call returns the correct result for smaller inputs, and combine them. This achieves O(n * m) time with O(n * m) space.',
        hints: [
            'Define your base case clearly. When should the recursion stop?',
            'For the recursive case, assume the function works for smaller inputs. How do you use that?',
            'Think about whether you need to pass additional state through parameters.',
            'Consider memoization if the same subproblems are being computed multiple times.'
        ],

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
            { id: '10-interweaving-strings/twist-01-count-interleavings', name: 'Count Interleavings', difficulty: 'Hard' },
            { id: '10-interweaving-strings/twist-02-three-string-interleave', name: 'Three-String Interleave', difficulty: 'Very Hard' },
            { id: '10-interweaving-strings/twist-03-find-one-valid-interleaving', name: 'Find One Valid Interleaving', difficulty: 'Medium' },
            { id: '10-interweaving-strings/twist-04-interleaving-with-wildcards', name: 'Interleaving with Wildcards', difficulty: 'Hard' },
            { id: '10-interweaving-strings/twist-05-minimum-edit-interleave', name: 'Minimum Edit Interleave', difficulty: 'Very Hard' }
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
