/**
 * Smallest Diff Triplet
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Smallest Diff Triplet',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Given three sorted arrays, find one element from each such that (max - min) is minimized.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "arr1 = [1, 4, 5], arr2 = [10, 20], arr3 = [14, 19]"
},
        output: "[5, 10, 14] (max-min = 14-5 = 9)",
        explanation: 'Given the input, the algorithm processes it to produce [5, 10, 14] (max-min = 14-5 = 9)'
    },
    {
        input: {
        "raw": "arr1 = [1, 2, 3], arr2 = [2, 3, 4], arr3 = [3, 4, 5]"
},
        output: "[3, 3, 3] or [3, 4, 3] (range = 0 or 1)",
        explanation: 'Given the input, the algorithm processes it to produce [3, 3, 3] or [3, 4, 3] (range = 0 or 1)'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 08-smallest-difference
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '08-smallest-difference/02-smallest-diff-triplet', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/08-smallest-difference/02-smallest-diff-triplet'] = problem;

})();
