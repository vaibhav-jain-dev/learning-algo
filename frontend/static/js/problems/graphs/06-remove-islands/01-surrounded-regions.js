/**
 * Surrounded Regions
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'Surrounded Regions',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        description: 'Given an m x n matrix board containing \'X\' and \'O\', capture all regions that are 4-directionally surrounded by \'X\'. A region is captured by flipping all \'O\'s into \'X\'s in that surrounded region.',
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
    {
        input: {
        "board": [
                [
                        "X",
                        "X",
                        "X",
                        "X"
                ],
                [
                        "X",
                        "O",
                        "O",
                        "X"
                ],
                [
                        "X",
                        "X",
                        "O",
                        "X"
                ],
                [
                        "X",
                        "O",
                        "X",
                        "X"
                ]
        ]
},
        output: [["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "O", "X", "X"]],
        explanation: 'Exploring the graph structure, we find the required path or value. For input board=[[\'X\', \'X\', \'X\', \'X\'], [\'X\', \'O\', \'O\', \'X\'], [\'X\', \'X\', \'O\', \'X\'], [\'X\', \'O\', \'X\', \'X\']], the result is [[\'X\', \'X\', \'X\', \'X\'], [\'X\', \'X\', \'X\', \'X\'], [\'X\', \'X\', \'X\', \'X\'], [\'X\', \'O\', \'X\', \'X\']].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/01-surrounded-regions', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/01-surrounded-regions'] = problem;

})();
