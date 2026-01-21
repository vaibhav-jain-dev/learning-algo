/**
 * Remove Islands
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Islands',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        description: 'You\'re given a two-dimensional matrix of potentially unequal height and width containing only 0s and 1s. The matrix represents a two-toned image, where each 1 represents black and each 0 represents white. An island is defined as any number of 1s that are horizontally or vertically adjacent (but not diagonally adjacent) and that don\'t touch the border of the image. In other words, a group of horizontally or vertically adjacent 1s isn\'t an island if any of those 1s are in the first row, first colu',
        complexity: {
            time: 'O(N * M)',
            space: 'O(N * M)'
        },
        examples: [
    {
        input: {
        "matrix": [
                [
                        1,
                        0,
                        0,
                        0,
                        0,
                        0
                ],
                [
                        0,
                        1,
                        0,
                        1,
                        1,
                        1
                ],
                [
                        0,
                        0,
                        1,
                        0,
                        1,
                        0
                ],
                [
                        1,
                        1,
                        0,
                        0,
                        1,
                        0
                ],
                [
                        1,
                        0,
                        1,
                        1,
                        0,
                        0
                ],
                [
                        1,
                        0,
                        0,
                        0,
                        0,
                        1
                ]
        ]
},
        output: [[1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1], [0, 0, 0, 0, 1, 0], [1, 1, 0, 0, 1, 0], [1, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 1]],
        explanation: 'Exploring the graph structure, we find the required path or value. For input matrix=[[1, 0, 0, 0, 0, 0], [0, 1, 0, 1, 1, 1], ..., [1, 0, 0, 0, 0, 1]] (length 6), the result is [[1, 0, 0, 0, 0, 0], ..., [1, 0, 0, 0, 0, 1]] (length 6).'
    },
    {
        input: {
        "matrix": [
                [
                        1,
                        1,
                        1
                ],
                [
                        1,
                        0,
                        1
                ],
                [
                        1,
                        1,
                        1
                ]
        ]
},
        output: [[1, 1, 1], [1, 0, 1], [1, 1, 1]],
        explanation: 'Exploring the graph structure, we find the required path or value. For input matrix=[[1, 1, 1], [1, 0, 1], [1, 1, 1]], the result is [[1, 1, 1], [1, 0, 1], [1, 1, 1]].'
    }
        ],
        similar: [
    { id: '01-surrounded-regions', name: 'Surrounded Regions', difficulty: 'Medium' },
    { id: '02-number-of-enclaves', name: 'Number of Enclaves', difficulty: 'Medium' },
    { id: '03-count-closed-islands', name: 'Number of Closed Islands', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands'] = problem;

})();
