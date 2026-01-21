/**
 * Three Sum Closest
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum Closest',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Given an array of integers and a target value, find three integers in the array such that their sum is closest to the target. Return the sum of the three integers. You may assume that each input would have exactly one solution.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [-1, 2, 1, -4], target = 1"
},
        output: "2\nExplanation: The sum that is closest to target is 2 (-1 + 2 + 1 = 2)",
        explanation: 'Given the input, the algorithm processes it to produce 2\nExplanation: The sum that is closest to target is 2 (-1 + 2 + 1 = 2)'
    },
    {
        input: {
        "raw": "array = [0, 0, 0], target = 1"
},
        output: "0\nExplanation: The closest sum is 0 (0 + 0 + 0 = 0)",
        explanation: 'Given the input, the algorithm processes it to produce 0\nExplanation: The closest sum is 0 (0 + 0 + 0 = 0)'
    },
    {
        input: {
        "raw": "array = [1, 1, 1, 0], target = -100"
},
        output: "2\nExplanation: The closest sum is 2 (1 + 1 + 0 = 2)",
        explanation: 'Given the input, the algorithm processes it to produce 2\nExplanation: The closest sum is 2 (1 + 1 + 0 = 2)'
    },
    {
        input: {
        "raw": "array = [4, 0, 5, -5, 3, 3, 0, -4, -5], target = -2"
},
        output: "-2\nExplanation: The sum that equals target exactly is -2 (0 + 3 + -5 = -2)",
        explanation: 'Given the input, the algorithm processes it to produce -2\nExplanation: The sum that equals target exactly is -2 (0 + 3 + -5 = -2)'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-three-sum-closest', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/01-three-sum-closest'] = problem;

})();
