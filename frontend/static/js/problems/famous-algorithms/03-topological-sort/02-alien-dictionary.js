/**
 * Alien Dictionary
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: topological-sort
 */
(function() {
    'use strict';

    const problem = {
        name: 'Alien Dictionary',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        description: 'There is a new alien language that uses the English alphabet. The order among letters is unknown. You are given a list of strings words from the alien language\'s dictionary, where the strings are sorted lexicographically by the rules of this new language. Derive the order of letters in this language and return it. If no valid order exists, return "". If there are multiple valid orderings, return any of them.',
        complexity: {
            time: 'O(C)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "words": [
                "wrt",
                "wrf",
                "er",
                "ett",
                "rftt"
        ]
},
        output: "wertf",
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input words=[wrt, wrf, er, ett, rftt], the result is wertf.'
    },
    {
        input: {
        "words": [
                "z",
                "x"
        ]
},
        output: "zx",
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input words=[z, x], the result is zx.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/02-alien-dictionary', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/02-alien-dictionary'] = problem;

})();
