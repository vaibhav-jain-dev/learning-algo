/**
 * K Sum Generalized
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Sum Generalized',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Given an array of integers and integers k and target, find all unique combinations of k numbers that sum to target.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [1, 2, 3, 4, 5], k = 3, target = 9"
},
        output: "[[1, 3, 5], [2, 3, 4]]",
        explanation: 'Given the input, the algorithm processes it to produce [[1, 3, 5], [2, 3, 4]]'
    },
    {
        input: {
        "raw": "array = [1, 0, -1, 0, -2, 2], k = 4, target = 0"
},
        output: "[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]",
        explanation: 'Given the input, the algorithm processes it to produce [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-k-sum-generalized', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/01-k-sum-generalized'] = problem;

})();
