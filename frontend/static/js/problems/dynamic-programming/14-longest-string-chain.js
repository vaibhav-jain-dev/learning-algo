/**
 * Longest String Chain
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-string-chain
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest String Chain',
        difficulty: 'Hard',
        algorithm: 'dp-string-chain',
        description: 'Given a list of words, where each word consists of only lowercase English letters, find the longest string chain. A string chain is a sequence of words [word_1, word_2, ..., word_k] where word_i+1 can be formed by adding exactly one letter to word_i at any position. All words in the chain must be in the given list. Return the length of the longest possible string chain.',
        complexity: {
            time: 'O(n * L^2)',
            space: 'O(n * L)'
        },
        examples: [
    {
        input: {
        "words": [
                "a",
                "b",
                "ba",
                "bca",
                "bda",
                "bdca"
        ]
},
        output: 4,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input words=[a, b, ..., bdca] (length 6), the result is 4.'
    },
    {
        input: {
        "words": [
                "xbc",
                "pcxbcf",
                "xb",
                "cxbc",
                "pcxbc"
        ]
},
        output: 5,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input words=[xbc, pcxbcf, xb, cxbc, pcxbc], the result is 5.'
    },
    {
        input: {
        "words": [
                "abcd",
                "dbqca"
        ]
},
        output: 1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input words=[abcd, dbqca], the result is 1.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '14-longest-string-chain', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/14-longest-string-chain'] = problem;

})();
