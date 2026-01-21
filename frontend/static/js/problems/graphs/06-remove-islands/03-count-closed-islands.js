/**
 * Number of Closed Islands
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Closed Islands',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        description: 'Given a 2D grid consisting of 0s (land) and 1s (water), count the number of closed islands. A closed island is an island totally surrounded by water (0s surrounded by 1s that don\'t touch the boundary).',
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
    {
        input: {
        "grid": [
                [
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        0
                ],
                [
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        1,
                        0
                ],
                [
                        1,
                        0,
                        1,
                        0,
                        1,
                        1,
                        1,
                        0
                ],
                [
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        1
                ],
                [
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        1,
                        0
                ]
        ]
},
        output: 2,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[1, 1, 1, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 1, 1, 0], [1, 0, 1, 0, 1, 1, 1, 0], [1, 0, 0, 0, 0, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 0]], the result is 2.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/03-count-closed-islands', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/03-count-closed-islands'] = problem;

})();
