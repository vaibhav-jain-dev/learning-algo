/**
 * Four Number Sum
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Four Number Sum',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Find all unique quadruplets in the array that sum to a target value.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [7, 6, 4, -1, 1, 2], target = 16"
},
        output: "[[7, 6, 4, -1], [7, 6, 1, 2]]",
        explanation: 'Given the input, the algorithm processes it to produce [[7, 6, 4, -1], [7, 6, 1, 2]]'
    },
    {
        input: {
        "raw": "array = [1, 0, -1, 0, -2, 2], target = 0"
},
        output: "[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]",
        explanation: 'Given the input, the algorithm processes it to produce [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 07-three-number-sum
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '07-three-number-sum/03-four-number-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/07-three-number-sum/03-four-number-sum'] = problem;

})();
