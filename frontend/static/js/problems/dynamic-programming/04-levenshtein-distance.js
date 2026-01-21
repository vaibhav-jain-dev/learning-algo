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
