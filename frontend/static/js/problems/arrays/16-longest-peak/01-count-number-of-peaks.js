/**
 * Count Number Of Peaks
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Number Of Peaks',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Given an array of integers, count the total number of valid peaks. A peak is an element that is strictly greater than both its neighbors. Edge elements cannot be peaks.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [1, 3, 2, 4, 1, 5, 2]"
},
        output: "3\nExplanation: Peaks at indices 1 (3), 3 (4), and 5 (5)",
        explanation: 'Given the input, the algorithm processes it to produce 3\nExplanation: Peaks at indices 1 (3), 3 (4), and 5 (5)'
    },
    {
        input: {
        "raw": "array = [1, 2, 3, 4, 5]"
},
        output: "0\nExplanation: No element is greater than both neighbors",
        explanation: 'Given the input, the algorithm processes it to produce 0\nExplanation: No element is greater than both neighbors'
    },
    {
        input: {
        "raw": "array = [5, 4, 3, 4, 5]"
},
        output: "0\nExplanation: 5 at index 4 is at the edge, not a valid peak",
        explanation: 'Given the input, the algorithm processes it to produce 0\nExplanation: 5 at index 4 is at the edge, not a valid peak'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 16-longest-peak
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '16-longest-peak/01-count-number-of-peaks', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/16-longest-peak/01-count-number-of-peaks'] = problem;

})();
