/**
 * Dutch National Flag
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Dutch National Flag',
        difficulty: 'Hard',
        algorithm: 'general',
        description: 'Given an array of integers and a pivot value, partition the array into three sections: 1. All elements **less than** the pivot 2. All elements **equal to** the pivot 3. All elements **greater than** the pivot This is known as the "Dutch National Flag" problem, named after the Dutch flag which has three horizontal stripes.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "array = [2, 0, 1, 2, 1, 0], pivot = 1"
},
        output: "[0, 0, 1, 1, 2, 2]",
        explanation: 'Given the input, the algorithm processes it to produce [0, 0, 1, 1, 2, 2]'
    },
    {
        input: {
        "raw": "array = [1, 4, 2, 5, 3, 6], pivot = 3"
},
        output: "[1, 2, 3, 4, 5, 6] (or [2, 1, 3, 6, 5, 4])",
        explanation: 'Given the input, the algorithm processes it to produce [1, 2, 3, 4, 5, 6] (or [2, 1, 3, 6, 5, 4])'
    },
    {
        input: {
        "raw": "array = [3, 3, 3, 3], pivot = 3"
},
        output: "[3, 3, 3, 3]",
        explanation: 'Given the input, the algorithm processes it to produce [3, 3, 3, 3]'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-dutch-national-flag', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/03-dutch-national-flag'] = problem;

})();
