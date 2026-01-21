/**
 * Shortest Unsorted With K
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Unsorted With K',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Given an integer array, find the shortest contiguous subarray that, if sorted, would result in the whole array being sorted. Return the length of that subarray.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [2, 6, 4, 8, 10, 9, 15]"
},
        output: "5\nExplanation: Sort subarray [6, 4, 8, 10, 9] to get sorted array",
        explanation: 'Given the input, the algorithm processes it to produce 5\nExplanation: Sort subarray [6, 4, 8, 10, 9] to get sorted array'
    },
    {
        input: {
        "raw": "array = [1, 2, 3, 4]"
},
        output: "0\nExplanation: Already sorted",
        explanation: 'Given the input, the algorithm processes it to produce 0\nExplanation: Already sorted'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-shortest-unsorted-with-k', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/02-shortest-unsorted-with-k'] = problem;

})();
