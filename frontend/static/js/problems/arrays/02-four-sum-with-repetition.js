/**
 * Four Sum With Repetition
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Four Sum With Repetition',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Given an array and a target sum, find all quadruplets where the same element can be used multiple times (with different indices treated as same).',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [1, 2], targetSum = 6"
},
        output: "[[1, 1, 2, 2]]\nExplanation: Using 1 twice and 2 twice",
        explanation: 'Given the input, the algorithm processes it to produce [[1, 1, 2, 2]]\nExplanation: Using 1 twice and 2 twice'
    },
    {
        input: {
        "raw": "array = [2, 3], targetSum = 10"
},
        output: "[[2, 2, 3, 3]]",
        explanation: 'Given the input, the algorithm processes it to produce [[2, 2, 3, 3]]'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-four-sum-with-repetition', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/02-four-sum-with-repetition'] = problem;

})();
