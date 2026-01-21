/**
 * Palindrome Partitioning Min Cuts
 * Category: dynamic-programming
 * Difficulty: Very
 * Algorithm: dp-palindrome
 */
(function() {
    'use strict';

    const problem = {
        name: 'Palindrome Partitioning Min Cuts',
        difficulty: 'Very',
        algorithm: 'dp-palindrome',
        description: 'Given a non-empty string, write a function that returns the minimum number of cuts needed to partition the string such that each partition is a palindrome. A palindrome is a string that reads the same forwards and backwards.',
        complexity: {
            time: 'O(n^2)',
            space: 'O(n^2)'
        },
        examples: [
    {
        input: {
        "string": "noonabbad"
},
        output: 2,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input string=noonabbad, the result is 2.'
    },
    {
        input: {
        "string": "aab"
},
        output: 1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input string=aab, the result is 1.'
    },
    {
        input: {
        "string": "aba"
},
        output: 0,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input string=aba, the result is 0.'
    },
    {
        input: {
        "string": "abcde"
},
        output: 4,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input string=abcde, the result is 4.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '11-palindrome-partitioning', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/11-palindrome-partitioning'] = problem;

})();
