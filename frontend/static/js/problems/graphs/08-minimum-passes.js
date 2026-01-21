/**
 * Minimum Passes of Matrix
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-min-passes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Passes of Matrix',
        difficulty: 'Medium',
        algorithm: 'graph-min-passes',
        description: 'Write a function that takes in an integer matrix and returns the minimum number of passes required to convert all negative integers to positive integers. A negative integer in the matrix can only be converted to a positive integer if one or more of its adjacent elements (horizontally or vertically adjacent, not diagonally) is positive. A pass consists of converting all negative integers that can be converted at that time. Note that 0 is neither positive nor negative, meaning it cannot convert an',
        complexity: {
            time: 'O(N * M)',
            space: 'O(N * M)'
        },
        examples: [
    {
        input: {
        "matrix": [
                [
                        0,
                        -1,
                        -3,
                        2,
                        0
                ],
                [
                        1,
                        -2,
                        -5,
                        -1,
                        -3
                ],
                [
                        3,
                        0,
                        0,
                        -4,
                        -1
                ]
        ]
},
        output: 3,
        explanation: 'Exploring the graph structure, we find the required path or value. For input matrix=[[0, -1, -3, 2, 0], [1, -2, -5, -1, -3], [3, 0, 0, -4, -1]], the result is 3.'
    },
    {
        input: {
        "matrix": [
                [
                        1,
                        0,
                        0,
                        -2,
                        -3
                ],
                [
                        -4,
                        -5,
                        -6,
                        -2,
                        -1
                ],
                [
                        0,
                        0,
                        0,
                        0,
                        -1
                ],
                [
                        1,
                        2,
                        3,
                        0,
                        -2
                ]
        ]
},
        output: -1,
        explanation: 'Exploring the graph structure, we find the required path or value. For input matrix=[[1, 0, 0, -2, -3], [-4, -5, -6, -2, -1], [0, 0, 0, 0, -1], [1, 2, 3, 0, -2]], the result is -1.'
    }
        ],
        similar: [
    { id: '01-rotting-oranges', name: 'Rotting Oranges', difficulty: 'Medium' },
    { id: '02-walls-and-gates', name: 'Walls and Gates', difficulty: 'Medium' },
    { id: '03-shortest-path-all-keys', name: 'Shortest Path to Get All Keys', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes'] = problem;

})();
