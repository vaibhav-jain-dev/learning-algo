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
            { title: 'Counterclockwise Spiral', difficulty: 'Medium', description: 'Traverse the matrix in a counterclockwise spiral (down first, then right, up, left) instead of the standard clockwise direction.', whyDifferent: 'The direction order reverses (down, right, up, left), requiring reordering of the boundary traversal logic.', example: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]. CCW spiral: [1, 4, 7, 8, 9, 6, 3, 2, 5].' },
            { title: 'Spiral from Center', difficulty: 'Hard', description: 'Start the spiral from the center of the matrix and expand outward in a clockwise direction.', whyDifferent: 'Direction lengths grow (1,1,2,2,3,3,...) as you expand, and boundary checks must handle going outside the matrix.', example: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]. Center-out: [5, 6, 9, 8, 7, 4, 1, 2, 3].' },
            { title: 'Spiral Layer Values', difficulty: 'Medium', description: 'Instead of returning all elements in spiral order, return the sum of elements in each spiral layer.', whyDifferent: 'The traversal structure is similar but you aggregate per layer rather than collecting individual elements.', example: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]. Layer 0 sum: 1+2+3+6+9+8+7+4 = 40, Layer 1 sum: 5.' },
            { title: 'Diagonal Spiral', difficulty: 'Hard', description: 'Traverse the matrix in a diagonal spiral pattern instead of the standard horizontal/vertical spiral.', whyDifferent: 'Movement is diagonal instead of axis-aligned, requiring completely different direction vectors and boundary logic.', example: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]. Diagonal spiral visits corners and diagonals in a spiral pattern.' },
            { title: 'Spiral with Skip', difficulty: 'Medium', description: 'Traverse in spiral order but skip every K-th element. Return only the non-skipped elements.', whyDifferent: 'Must maintain a counter during traversal and conditionally include elements, adding state to the traversal.', example: 'matrix = [[1,2,3],[4,5,6]], K = 2. Spiral: [1,2,3,6,5,4]. Skip every 2nd: [1,3,5].' }
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
