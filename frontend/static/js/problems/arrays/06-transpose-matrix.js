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
        twists: [
            {
                title: 'In-Place Transpose of Square Matrix',
                difficulty: 'Medium',
                description: 'Transpose the matrix in-place without using extra space. Only works for square matrices.',
                whyDifferent: 'Removes the ability to create a new result matrix. Must swap elements across the diagonal carefully to avoid double-swapping.',
                example: 'matrix=[[1,2],[3,4]] → in-place becomes [[1,3],[2,4]]'
            },
            {
                title: 'Anti-Diagonal Transpose',
                difficulty: 'Medium',
                description: 'Instead of transposing across the main diagonal, transpose across the anti-diagonal (top-right to bottom-left).',
                whyDifferent: 'The index mapping changes from (i,j)→(j,i) to (i,j)→(n-1-j,m-1-i), requiring different loop logic.',
                example: 'matrix=[[1,2,3],[4,5,6],[7,8,9]] → [[9,6,3],[8,5,2],[7,4,1]]'
            },
            {
                title: 'Transpose with Lazy Evaluation',
                difficulty: 'Hard',
                description: 'Create a transposed view of the matrix that does not copy any data. Access to element (i,j) in the transposed view returns element (j,i) from the original.',
                whyDifferent: 'Shifts from eagerly computing the transpose to building a proxy/wrapper that redirects access, a fundamentally different design pattern.',
                example: 'view.get(i,j) returns original.get(j,i) without copying'
            },
            {
                title: 'Sparse Matrix Transpose',
                difficulty: 'Medium',
                description: 'The matrix is represented as a list of (row, col, value) tuples for non-zero elements. Transpose this sparse representation.',
                whyDifferent: 'Working with sparse representation means you swap row/col in each tuple and re-sort, rather than iterating over a full grid.',
                example: 'sparse=[(0,1,5),(1,0,3),(2,1,7)] → transposed: [(1,0,5),(0,1,3),(1,2,7)]'
            },
            {
                title: 'Recursive Block Transpose',
                difficulty: 'Hard',
                description: 'Transpose a large matrix using a cache-oblivious recursive strategy that divides the matrix into quadrants.',
                whyDifferent: 'Optimizes for cache performance by recursively transposing submatrices, requiring divide-and-conquer thinking instead of simple nested loops.',
                example: 'Recursively split 8x8 matrix into 4x4 blocks, transpose each, then combine'
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
