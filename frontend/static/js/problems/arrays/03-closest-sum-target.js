/**
 * Closest Sum Target
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Closest Sum Target',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Find one number from each of two arrays such that their sum is closest to the target.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "arr1 = [1, 3, 5], arr2 = [2, 4, 6], target = 8"
},
        output: "[3, 4] or [5, 2] (sum = 7, diff = 1)",
        explanation: 'Given the input, the algorithm processes it to produce [3, 4] or [5, 2] (sum = 7, diff = 1)'
    },
    {
        input: {
        "raw": "arr1 = [-1, 3, 8], arr2 = [2, 4, 9], target = 7"
},
        output: "[-1, 8] or [3, 4] (sum = 7, diff = 0)",
        explanation: 'Given the input, the algorithm processes it to produce [-1, 8] or [3, 4] (sum = 7, diff = 0)'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-closest-sum-target', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/03-closest-sum-target'] = problem;

})();
