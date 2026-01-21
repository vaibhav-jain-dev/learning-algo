/**
 * Spiral Matrix Starting Point
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral Matrix Starting Point',
        difficulty: 'Medium',
        algorithm: 'general',
        description: 'You start at cell (rStart, cStart) in a rows x cols grid. You walk in a clockwise spiral pattern starting with moving right, visiting all cells in the grid. Return the coordinates of all cells in the order you visit them.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "raw": "rows = 1, cols = 4, rStart = 0, cStart = 0"
},
        output: "[[0,0], [0,1], [0,2], [0,3]]",
        explanation: 'Given the input, the algorithm processes it to produce [[0,0], [0,1], [0,2], [0,3]]'
    },
    {
        input: {
        "raw": "rows = 5, cols = 6, rStart = 1, cStart = 4"
},
        output: "[[1,4], [1,5], [2,5], [2,4], [2,3], [1,3], [0,3], [0,4], [0,5], [3,5], [3,4], [3,3], [3,2], [2,2], [1,2], [0,2], [4,5], [4,4], [4,3], [4,2], [4,1], [3,1], [2,1], [1,1], [0,1], [4,0], [3,0], [2,0], [1,0], [0,0]]",
        explanation: 'Given the input, the algorithm processes it to produce [[1,4], [1,5], [2,5], [2,4], [2,3], [1,3], [0,3], [0,4], [0,5], [3,5], [3,4], [3,3], [3,2], [2,2], [1,2], [0,2], [4,5], [4,4], [4,3], [4,2], [4,1], [3,1], [2,1], [1,1], [0,1], [4,0], [3,0], [2,0], [1,0], [0,0]]'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-spiral-matrix-starting-point', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/02-spiral-matrix-starting-point'] = problem;

})();
