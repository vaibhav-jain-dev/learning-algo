/**
 * Levenshtein Distance
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-edit-distance
 */
(function() {
    'use strict';

    const problem = {
        name: 'Levenshtein Distance',
        difficulty: 'Medium',
        algorithm: 'dp-edit-distance',
        description: 'Write a function that takes in two strings and returns the minimum number of edit operations needed to transform the first string into the second string. There are three operations permitted on a string: 1. Insert a character 2. Delete a character 3. Replace a character This is also known as the Edit Distance or the Levenshtein Distance problem.',
        complexity: {
            time: 'O(m * n)',
            space: 'O(m * n)'
        },
        examples: [
    {
        input: {
        "str1": "abc",
        "str2": "yabd"
},
        output: 2,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input str1=abc, str2=yabd, the result is 2.'
    },
    {
        input: {
        "str1": "horse",
        "str2": "ros"
},
        output: 3,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input str1=horse, str2=ros, the result is 3.'
    },
    {
        input: {
        "str1": "",
        "str2": "abc"
},
        output: 3,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input str1=, str2=abc, the result is 3.'
    }
        ],
        twists: [
            { id: '04-levenshtein-distance/twist-01-weighted-edit-operations', title: 'Weighted Edit Operations', difficulty: 'Hard' },
            { id: '04-levenshtein-distance/twist-02-recover-edit-sequence', title: 'Recover Edit Sequence', difficulty: 'Medium' },
            { id: '04-levenshtein-distance/twist-03-edit-distance-with-transposition', title: 'Edit Distance With Transposition', difficulty: 'Hard' },
            { id: '04-levenshtein-distance/twist-04-edit-distance-with-only-insert-and-delete', title: 'Edit Distance With Only Insert and Delete', difficulty: 'Medium' },
            { id: '04-levenshtein-distance/twist-05-k-edit-distance-filter', title: 'K-Edit Distance Filter', difficulty: 'Hard' },
            { id: '04-levenshtein-distance/twist-06-substring-edit-distance', title: 'Substring Edit Distance', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '04-levenshtein-distance', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/04-levenshtein-distance'] = problem;

})();
