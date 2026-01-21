/**
 * Walls and Gates
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-min-passes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Walls and Gates',
        difficulty: 'Medium',
        algorithm: 'graph-min-passes',
        description: 'You are given an m x n grid rooms initialized with these three possible values: - -1 - A wall or an obstacle - 0 - A gate - INF (2147483647) - An empty room Fill each empty room with the distance to its nearest gate. If impossible to reach a gate, leave as INF.',
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
    {
        input: {
        "rooms": [
                [
                        2147483647,
                        -1,
                        0,
                        2147483647
                ],
                [
                        2147483647,
                        2147483647,
                        2147483647,
                        -1
                ],
                [
                        2147483647,
                        -1,
                        2147483647,
                        -1
                ],
                [
                        0,
                        -1,
                        2147483647,
                        2147483647
                ]
        ]
},
        output: [[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, 4]],
        explanation: 'Exploring the graph structure, we find the required path or value. For input rooms=[[2147483647, -1, 0, 2147483647], [2147483647, 2147483647, 2147483647, -1], [2147483647, -1, 2147483647, -1], [0, -1, 2147483647, 2147483647]], the result is [[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, 4]].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-walls-and-gates', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-walls-and-gates'] = problem;

})();
