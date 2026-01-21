/**
 * Min Coins To Add
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Coins To Add',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'Given an array of coins (positive integers) and a target value, find the minimum number of coins you need to add so that you can construct every value from 1 to target (inclusive).',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "coins = [1, 3], target = 6"
},
        output: "1\nExplanation: Add coin with value 2. Now with [1, 2, 3] you can make all values 1-6.",
        explanation: 'Given the input, the algorithm processes it to produce 1\nExplanation: Add coin with value 2. Now with [1, 2, 3] you can make all values 1-6.'
    },
    {
        input: {
        "raw": "coins = [1, 5, 10], target = 20"
},
        output: "2\nExplanation: Add coins with values 2 and 4. Now you can make all values 1-20.",
        explanation: 'Given the input, the algorithm processes it to produce 2\nExplanation: Add coins with values 2 and 4. Now you can make all values 1-20.'
    },
    {
        input: {
        "raw": "coins = [1, 2, 5], target = 10"
},
        output: "0\nExplanation: With [1, 2, 5] you can already make all values 1-10.",
        explanation: 'Given the input, the algorithm processes it to produce 0\nExplanation: With [1, 2, 5] you can already make all values 1-10.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 05-non-constructible-change
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '05-non-constructible-change/01-min-coins-to-add', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/05-non-constructible-change/01-min-coins-to-add'] = problem;

})();
