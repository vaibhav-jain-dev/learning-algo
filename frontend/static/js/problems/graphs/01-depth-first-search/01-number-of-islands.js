/**
 * Number of Islands
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Islands',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        description: 'Given an m x n 2D binary grid grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands. An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are surrounded by water.',
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
    {
        input: {
        "grid": [
                [
                        "1",
                        "1",
                        "1",
                        "1",
                        "0"
                ],
                [
                        "1",
                        "1",
                        "0",
                        "1",
                        "0"
                ],
                [
                        "1",
                        "1",
                        "0",
                        "0",
                        "0"
                ],
                [
                        "0",
                        "0",
                        "0",
                        "0",
                        "0"
                ]
        ]
},
        output: 1,
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input grid=[[\'1\', \'1\', \'1\', \'1\', \'0\'], [\'1\', \'1\', \'0\', \'1\', \'0\'], [\'1\', \'1\', \'0\', \'0\', \'0\'], [\'0\', \'0\', \'0\', \'0\', \'0\']], the result is 1.'
    },
    {
        input: {
        "grid": [
                [
                        "1",
                        "1",
                        "0",
                        "0",
                        "0"
                ],
                [
                        "1",
                        "1",
                        "0",
                        "0",
                        "0"
                ],
                [
                        "0",
                        "0",
                        "1",
                        "0",
                        "0"
                ],
                [
                        "0",
                        "0",
                        "0",
                        "1",
                        "1"
                ]
        ]
},
        output: 3,
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input grid=[[\'1\', \'1\', \'0\', \'0\', \'0\'], [\'1\', \'1\', \'0\', \'0\', \'0\'], [\'0\', \'0\', \'1\', \'0\', \'0\'], [\'0\', \'0\', \'0\', \'1\', \'1\']], the result is 3.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/01-number-of-islands', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/01-number-of-islands'] = problem;

})();
