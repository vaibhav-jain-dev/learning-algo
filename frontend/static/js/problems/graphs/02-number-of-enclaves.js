/**
 * Number of Enclaves
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Enclaves',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        description: 'You are given an m x n binary matrix grid, where 0 represents water and 1 represents land. An island is a maximal 4-directionally connected group of 1s. An **enclave** is a land cell that cannot reach any boundary cell of the grid by walking through land cells. Return the number of land cells in grid that are enclaves.',
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
    {
        input: {
        "grid": [
                [
                        0,
                        0,
                        0,
                        0
                ],
                [
                        1,
                        0,
                        1,
                        0
                ],
                [
                        0,
                        1,
                        1,
                        0
                ],
                [
                        0,
                        0,
                        0,
                        0
                ]
        ]
},
        output: 3,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[0, 0, 0, 0], [1, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]], the result is 3.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-number-of-enclaves', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-number-of-enclaves'] = problem;

})();
