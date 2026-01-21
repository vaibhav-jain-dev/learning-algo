/**
 * Count Sub Islands
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Sub Islands',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        description: 'You are given two m x n binary matrices grid1 and grid2 containing only 0\'s (representing water) and 1\'s (representing land). An island is a group of 1\'s connected 4-directionally. An island in grid2 is considered a **sub-island** if there is an island in grid1 that contains all the cells that make up this island in grid2. Return the number of islands in grid2 that are considered sub-islands.',
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
    {
        input: {
        "grid1": [
                [
                        1,
                        1,
                        1,
                        0,
                        0
                ],
                [
                        0,
                        1,
                        1,
                        1,
                        1
                ],
                [
                        0,
                        0,
                        0,
                        0,
                        0
                ],
                [
                        1,
                        0,
                        0,
                        0,
                        0
                ],
                [
                        1,
                        1,
                        0,
                        1,
                        1
                ]
        ],
        "grid2": [
                [
                        1,
                        1,
                        1,
                        0,
                        0
                ],
                [
                        0,
                        0,
                        1,
                        1,
                        1
                ],
                [
                        0,
                        1,
                        0,
                        0,
                        0
                ],
                [
                        1,
                        0,
                        1,
                        1,
                        0
                ],
                [
                        0,
                        1,
                        0,
                        1,
                        0
                ]
        ]
},
        output: 3,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid1=[[1, 1, 1, 0, 0], [0, 1, 1, 1, 1], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 0, 1, 1]], grid2=[[1, 1, 1, 0, 0], [0, 0, 1, 1, 1], [0, 1, 0, 0, 0], [1, 0, 1, 1, 0], [0, 1, 0, 1, 0]], the result is 3.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-count-sub-islands', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-count-sub-islands'] = problem;

})();
