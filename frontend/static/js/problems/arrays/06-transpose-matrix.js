/**
 * Transpose Matrix
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: matrix-transpose
 */
(function() {
    'use strict';

    const problem = {
        name: 'Transpose Matrix',
        difficulty: 'Easy',
        algorithm: 'matrix-transpose',
        description: 'You\'re given a 2D array of integers matrix. Write a function that returns the transpose of the matrix. The transpose of a matrix is a flipped version of the original matrix across its main diagonal (which runs from top-left to bottom-right); it switches the row and column indices of the original matrix.',
        problem: 'Process the matrix systematically, paying attention to the relationship between indices during transformation. Handle boundary conditions carefully to avoid index errors. This achieves O(m*n) time with O(m*n) space.',
        hints: [
            'Think about how rows and columns relate to each other in this transformation.',
            'Consider processing the matrix in a specific order: row-by-row, column-by-column, or diagonally.',
            'In-place modifications require careful ordering to avoid overwriting data you still need.',
            'Edge cases: single row/column, square vs rectangular matrices.'
        ],

        complexity: {
            time: 'O(m*n)',
            space: 'O(m*n)'
        },
        examples: [
    {
        input: {
        "matrix": [
                [
                        1,
                        2
                ],
                [
                        3,
                        4
                ],
                [
                        5,
                        6
                ]
        ]
},
        output: [[1, 3, 5], [2, 4, 6]],
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
                        4,
                        5,
                        6
                ],
                [
                        7,
                        8,
                        9
                ]
        ]
},
        output: [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
        explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
    }
        ],
        similar: [
    { id: '06-transpose-matrix/01-rotate-90-degrees', name: '01 Rotate 90 Degrees', difficulty: 'Medium' },
    { id: '06-transpose-matrix/02-spiral-matrix-transpose', name: '02 Spiral Matrix Transpose', difficulty: 'Medium' },
    { id: '06-transpose-matrix/03-block-matrix-transpose', name: '03 Block Matrix Transpose', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix'] = problem;

})();
