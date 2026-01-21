/**
 * All Non Constructible
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Non Constructible',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Find all values up to a given limit that cannot be constructed from the given coins.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "coins = [1, 2, 5], limit = 10"
},
        output: "[] (all values 1-10 can be constructed)",
        explanation: 'Given the input, the algorithm processes it to produce [] (all values 1-10 can be constructed)'
    },
    {
        input: {
        "raw": "coins = [1, 5, 10], limit = 20"
},
        output: "[7, 8, 9, 17, 18, 19, 20]",
        explanation: 'Given the input, the algorithm processes it to produce [7, 8, 9, 17, 18, 19, 20]'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 05-non-constructible-change
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '05-non-constructible-change/03-all-non-constructible', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/05-non-constructible-change/03-all-non-constructible'] = problem;

})();
