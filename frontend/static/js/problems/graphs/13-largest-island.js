/**
 * Largest Island
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-largest-island
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest Island',
        difficulty: 'Hard',
        algorithm: 'graph-largest-island',
        description: 'You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1. Return the size of the largest island in grid after applying this operation. An island is a 4-directionally connected group of 1s.',
        complexity: {
            time: 'O(N^2)',
            space: 'O(N^2)'
        },
        examples: [
    {
        input: {
        "grid": [
                [
                        1,
                        0
                ],
                [
                        0,
                        1
                ]
        ]
},
        output: 3,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[1, 0], [0, 1]], the result is 3.'
    },
    {
        input: {
        "grid": [
                [
                        1,
                        1
                ],
                [
                        1,
                        0
                ]
        ]
},
        output: 4,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[1, 1], [1, 0]], the result is 4.'
    },
    {
        input: {
        "grid": [
                [
                        1,
                        1
                ],
                [
                        1,
                        1
                ]
        ]
},
        output: 4,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[1, 1], [1, 1]], the result is 4.'
    }
        ],
        twists: [
            { id: '13-largest-island/twist-01-multiple-flips-allowed', name: 'Multiple Flips Allowed', difficulty: 'Very Hard' },
            { id: '13-largest-island/twist-02-no-flip-allowed', name: 'No Flip Allowed', difficulty: 'Easy' },
            { id: '13-largest-island/twist-03-flip-one-to-zero', name: 'Flip One to Zero', difficulty: 'Hard' },
            { id: '13-largest-island/twist-04-diagonal-connections', name: 'Diagonal Connections', difficulty: 'Medium' },
            { id: '13-largest-island/twist-05-weighted-island', name: 'Weighted Island', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '13-largest-island', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/13-largest-island'] = problem;

})();
