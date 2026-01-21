/**
 * Repeated Substring Pattern
 * Category: famous-algorithms
 * Difficulty: Easy
 * Algorithm: kmp-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Repeated Substring Pattern',
        difficulty: 'Easy',
        algorithm: 'kmp-algorithm',
        description: 'Given a string s, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "s": "abab"
},
        output: true,
        explanation: 'Processing the input data produces the output. For input s=abab, the result is true.'
    },
    {
        input: {
        "s": "abcabcabcabc"
},
        output: true,
        explanation: 'Processing the input data produces the output. For input s=abcabcabcabc, the result is true.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '02-repeated-substring', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-repeated-substring'] = problem;

})();
