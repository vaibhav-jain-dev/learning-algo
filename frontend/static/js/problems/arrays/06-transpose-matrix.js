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
        explanation: 'Processing the input data produces the output. For input matrix=[[1, 2], [3, 4], [5, 6]], the result is [[1, 3, 5], [2, 4, 6]].'
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
        explanation: 'Processing the input data produces the output. For input matrix=[[1, 2, 3], [4, 5, 6], [7, 8, 9]], the result is [[1, 4, 7], [2, 5, 8], [3, 6, 9]].'
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
