/**
 * Can Become Monotonic
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Can Become Monotonic',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Given an array of integers, determine if it can become monotonic by changing **at most one** element to any value. An array is monotonic if it is either entirely non-increasing or entirely non-decreasing.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [1, 5, 3, 4, 5]"
},
        output: "true\nExplanation: Change 5 at index 1 to 2: [1, 2, 3, 4, 5]",
        explanation: 'Given the input, the algorithm processes it to produce true\nExplanation: Change 5 at index 1 to 2: [1, 2, 3, 4, 5]'
    },
    {
        input: {
        "raw": "array = [1, 2, 3, 4, 5]"
},
        output: "true\nExplanation: Already monotonic",
        explanation: 'Given the input, the algorithm processes it to produce true\nExplanation: Already monotonic'
    },
    {
        input: {
        "raw": "array = [4, 2, 3, 1]"
},
        output: "false\nExplanation: Need to change more than one element",
        explanation: 'Given the input, the algorithm processes it to produce false\nExplanation: Need to change more than one element'
    },
    {
        input: {
        "raw": "array = [3, 4, 2, 3]"
},
        output: "false\nExplanation: Even changing one element can't make it monotonic",
        explanation: 'Given the input, the algorithm processes it to produce false\nExplanation: Even changing one element can\'t make it monotonic'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-can-become-monotonic', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/03-can-become-monotonic'] = problem;

})();
