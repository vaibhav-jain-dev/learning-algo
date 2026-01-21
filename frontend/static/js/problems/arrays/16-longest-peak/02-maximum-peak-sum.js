/**
 * Maximum Peak Sum
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Peak Sum',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Given an array of integers, find the peak with the maximum sum of elements. A peak consists of strictly increasing elements to a tip, then strictly decreasing. Return the sum of that peak.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [1, 10, 2, 100, 50, 1]"
},
        output: "153\nExplanation: Peak [2, 100, 50, 1] has sum 153",
        explanation: 'Given the input, the algorithm processes it to produce 153\nExplanation: Peak [2, 100, 50, 1] has sum 153'
    },
    {
        input: {
        "raw": "array = [1, 3, 2]"
},
        output: "6\nExplanation: Peak [1, 3, 2] has sum 6",
        explanation: 'Given the input, the algorithm processes it to produce 6\nExplanation: Peak [1, 3, 2] has sum 6'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 16-longest-peak
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '16-longest-peak/02-maximum-peak-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/16-longest-peak/02-maximum-peak-sum'] = problem;

})();
