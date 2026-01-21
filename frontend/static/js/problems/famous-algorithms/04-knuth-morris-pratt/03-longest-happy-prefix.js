/**
 * Longest Happy Prefix
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kmp-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Happy Prefix',
        difficulty: 'Hard',
        algorithm: 'kmp-algorithm',
        description: 'A string is called a happy prefix if it is a non-empty prefix which is also a suffix (excluding itself). Given a string s, return the longest happy prefix. Return an empty string if no such prefix exists.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "s": "level"
},
        output: "l",
        explanation: 'Processing the input data produces the output. For input s=level, the result is l.'
    },
    {
        input: {
        "s": "ababab"
},
        output: "abab",
        explanation: 'Processing the input data produces the output. For input s=ababab, the result is abab.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/03-longest-happy-prefix', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/03-longest-happy-prefix'] = problem;

})();
