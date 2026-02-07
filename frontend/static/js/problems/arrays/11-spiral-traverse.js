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
        problem: 'Process the matrix systematically, paying attention to the relationship between indices during transformation. Handle boundary conditions carefully to avoid index errors. This achieves O(n) time with O(n) space.',
        hints: [
            'Think about how rows and columns relate to each other in this transformation.',
            'Consider processing the matrix in a specific order: row-by-row, column-by-column, or diagonally.',
            'In-place modifications require careful ordering to avoid overwriting data you still need.',
            'Edge cases: single row/column, square vs rectangular matrices.'
        ],

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
        explanation: 'The matrix transformation maps each element from its original position to its target position. Process in an order that avoids overwriting values still needed.'
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
        explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
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
