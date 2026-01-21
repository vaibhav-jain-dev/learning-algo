/**
 * Shortest Path in Binary Matrix
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Path in Binary Matrix',
        difficulty: 'Medium',
        algorithm: 'graph-bfs',
        description: 'Given an n x n binary matrix grid, return the length of the shortest **clear path** in the matrix. If there is no clear path, return -1. A **clear path** in a binary matrix is a path from the **top-left** cell (i.e., (0, 0)) to the **bottom-right** cell (i.e., (n - 1, n - 1)) such that: - All the visited cells of the path are 0 - All the adjacent cells of the path are **8-directionally** connected (i.e., they are different and they share an edge or a corner) The **length** of a clear path is the',
        complexity: {
            time: 'O(N^2)',
            space: 'O(N^2)'
        },
        examples: [
    {
        input: {
        "grid": [
                [
                        0,
                        1
                ],
                [
                        1,
                        0
                ]
        ]
},
        output: 2,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input grid=[[0, 1], [1, 0]], the result is 2.'
    },
    {
        input: {
        "grid": [
                [
                        0,
                        0,
                        0
                ],
                [
                        1,
                        1,
                        0
                ],
                [
                        1,
                        1,
                        0
                ]
        ]
},
        output: 4,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input grid=[[0, 0, 0], [1, 1, 0], [1, 1, 0]], the result is 4.'
    },
    {
        input: {
        "grid": [
                [
                        1,
                        0,
                        0
                ],
                [
                        1,
                        1,
                        0
                ],
                [
                        1,
                        1,
                        0
                ]
        ]
},
        output: -1,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input grid=[[1, 0, 0], [1, 1, 0], [1, 1, 0]], the result is -1.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-shortest-path-binary-matrix', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-shortest-path-binary-matrix'] = problem;

})();
