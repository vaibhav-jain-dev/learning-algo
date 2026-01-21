/**
 * Max Constructible
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Constructible',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Given coins and a budget of K additional coins (each with value 1), find the maximum consecutive range starting from 1 that you can construct.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "coins = [1, 5, 10], budget = 2"
},
        output: "8\nExplanation: Add two 1s to get [1, 1, 1, 5, 10]. Can make values 1-8.",
        explanation: 'Given the input, the algorithm processes it to produce 8\nExplanation: Add two 1s to get [1, 1, 1, 5, 10]. Can make values 1-8.'
    },
    {
        input: {
        "raw": "coins = [1, 2, 4], budget = 0"
},
        output: "7\nExplanation: Without adding coins, can already make 1-7.",
        explanation: 'Given the input, the algorithm processes it to produce 7\nExplanation: Without adding coins, can already make 1-7.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 05-non-constructible-change
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '05-non-constructible-change/02-max-constructible', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/05-non-constructible-change/02-max-constructible'] = problem;

})();
