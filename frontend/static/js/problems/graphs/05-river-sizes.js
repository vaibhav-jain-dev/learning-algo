/**
 * River Sizes
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'River Sizes',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        description: 'You\'re given a two-dimensional array (matrix) of potentially unequal height and width containing only 0s and 1s. Each 0 represents land, and each 1 represents part of a river. A river consists of any number of 1s that are either horizontally or vertically adjacent (but not diagonally adjacent). The number of adjacent 1s forming a river determines its size. Write a function that returns an array of the sizes of all rivers represented in the input matrix. The sizes don\'t need to be in any particul',
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
                        1,
                        0
                ],
                [
                        1,
                        0,
                        1,
                        0,
                        0
                ],
                [
                        0,
                        0,
                        1,
                        0,
                        1
                ],
                [
                        1,
                        0,
                        1,
                        0,
                        1
                ],
                [
                        1,
                        0,
                        1,
                        1,
                        0
                ]
        ]
},
        output: [1, 2, 2, 2, 5],
        explanation: 'Exploring the graph structure, we find the required path or value. For input matrix=[[1, 0, 0, 1, 0], [1, 0, 1, 0, 0], [0, 0, 1, 0, 1], [1, 0, 1, 0, 1], [1, 0, 1, 1, 0]], the result is [1, 2, 2, 2, 5].'
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
                        1,
                        1
                ],
                [
                        1,
                        1,
                        1
                ]
        ]
},
        output: [9],
        explanation: 'Exploring the graph structure, we find the required path or value. For input matrix=[[1, 1, 1], [1, 1, 1], [1, 1, 1]], the result is [9].'
    }
        ],
        twists: [
            { id: '05-river-sizes/twist-01-diagonal-rivers', name: 'Diagonal Rivers', difficulty: 'Medium' },
            { id: '05-river-sizes/twist-02-sorted-river-sizes', name: 'Sorted River Sizes', difficulty: 'Easy' },
            { id: '05-river-sizes/twist-03-k-largest-rivers', name: 'K Largest Rivers', difficulty: 'Medium' },
            { id: '05-river-sizes/twist-04-river-perimeters', name: 'River Perimeters', difficulty: 'Medium' },
            { id: '05-river-sizes/twist-05-dynamic-river-updates', name: 'Dynamic River Updates', difficulty: 'Hard' }
        ],
        similar: [
    { id: '05-river-sizes/01-max-area-of-island', name: 'Max Area of Island', difficulty: 'Medium' },
    { id: '05-river-sizes/02-count-sub-islands', name: 'Count Sub Islands', difficulty: 'Medium' },
    { id: '05-river-sizes/03-making-a-large-island', name: 'Making A Large Island', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes'] = problem;

})();
