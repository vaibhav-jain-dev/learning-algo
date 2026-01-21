/**
 * Shortest Path in Binary Grid
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: bfs-astar
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Path in Binary Grid',
        difficulty: 'Medium',
        algorithm: 'bfs-astar',
        description: 'Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1. A clear path is a path from the top-left cell (0, 0) to the bottom-right cell (n-1, n-1) such that: - All visited cells are 0 - All adjacent cells in the path are 8-directionally connected (they share an edge or corner) The length of a path is the number of visited cells.',
        complexity: {
            time: 'O(n^2)',
            space: 'O(n^2)'
        },
        examples: [
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
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-shortest-path-in-grid', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-shortest-path-in-grid'] = problem;

})();
