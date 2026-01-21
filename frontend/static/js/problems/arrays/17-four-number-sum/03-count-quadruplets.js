/**
 * Count Quadruplets
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Quadruplets',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Count the number of quadruplets (i, j, k, l) where i < j < k < l and array[i] + array[j] + array[k] + array[l] = target. Elements with same values but different indices are counted separately.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [1, 1, 1, 1, 2, 2], target = 5"
},
        output: "12\nExplanation: Multiple combinations of indices give sum 5",
        explanation: 'Given the input, the algorithm processes it to produce 12\nExplanation: Multiple combinations of indices give sum 5'
    },
    {
        input: {
        "raw": "array = [1, 2, 3, 4], target = 10"
},
        output: "1\nExplanation: Only (1, 2, 3, 4) = 10",
        explanation: 'Given the input, the algorithm processes it to produce 1\nExplanation: Only (1, 2, 3, 4) = 10'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 17-four-number-sum
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '17-four-number-sum/03-count-quadruplets', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/17-four-number-sum/03-count-quadruplets'] = problem;

})();
