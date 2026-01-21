/**
 * Rotting Oranges
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-min-passes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rotting Oranges',
        difficulty: 'Medium',
        algorithm: 'graph-min-passes',
        description: 'You are given an m x n grid where each cell can have one of three values: - 0 representing an empty cell - 1 representing a fresh orange - 2 representing a rotten orange Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.',
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
    {
        input: {
        "grid": [
                [
                        2,
                        1,
                        1
                ],
                [
                        1,
                        1,
                        0
                ],
                [
                        0,
                        1,
                        1
                ]
        ]
},
        output: 4,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[2, 1, 1], [1, 1, 0], [0, 1, 1]], the result is 4.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-rotting-oranges', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/01-rotting-oranges'] = problem;

})();
