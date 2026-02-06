/**
 * Spiral Traverse
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-matrix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral Traverse',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        description: 'Write a function that takes in an n x m two-dimensional array (that can be square-shaped when n == m) and returns a one-dimensional array of all the array\'s elements in spiral order. Spiral order starts at the top left corner of the two-dimensional array, goes to the right, and proceeds in a spiral pattern all the way until every element has been visited.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "matrix": [
                [
                        1,
                        2,
                        3,
                        4
                ],
                [
                        12,
                        13,
                        14,
                        5
                ],
                [
                        11,
                        16,
                        15,
                        6
                ],
                [
                        10,
                        9,
                        8,
                        7
                ]
        ]
},
        output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        explanation: 'Processing the input data produces the output. For input matrix=[[1, 2, 3, 4], [12, 13, 14, 5], [11, 16, 15, 6], [10, 9, 8, 7]], the result is [1, ..., 16] (length 16).'
    },
    {
        input: {
        "matrix": [
                [
                        1,
                        2,
                        3
                ],
                [
                        8,
                        9,
                        4
                ],
                [
                        7,
                        6,
                        5
                ]
        ]
},
        output: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        explanation: 'Processing the input data produces the output. For input matrix=[[1, 2, 3], [8, 9, 4], [7, 6, 5]], the result is [1, ..., 9] (length 9).'
    }
        ],
        twists: [
            { id: '11-spiral-traverse/twist-01-counterclockwise-spiral', name: 'Counterclockwise Spiral', difficulty: 'Medium' },
            { id: '11-spiral-traverse/twist-02-spiral-from-center', name: 'Spiral from Center', difficulty: 'Hard' },
            { id: '11-spiral-traverse/twist-03-spiral-layer-values', name: 'Spiral Layer Values', difficulty: 'Medium' },
            { id: '11-spiral-traverse/twist-04-diagonal-spiral', name: 'Diagonal Spiral', difficulty: 'Hard' },
            { id: '11-spiral-traverse/twist-05-spiral-with-skip', name: 'Spiral with Skip', difficulty: 'Medium' }
        ],
        similar: [
    { id: '11-spiral-traverse/01-spiral-matrix-generate', name: '01 Spiral Matrix Generate', difficulty: 'Medium' },
    { id: '11-spiral-traverse/02-spiral-matrix-starting-point', name: '02 Spiral Matrix Starting Point', difficulty: 'Medium' },
    { id: '11-spiral-traverse/03-anti-spiral-traverse', name: '03 Anti Spiral Traverse', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse'] = problem;

})();
