/**
 * Binary Tree Level Order Traversal
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        algorithm: 'graph-bfs',
        description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values (i.e., from left to right, level by level).',
        complexity: {
            time: 'O(N)',
            space: 'O(W)'
        },
        examples: [
    {
        input: {
        "root": [
                3,
                9,
                20,
                null,
                null,
                15,
                7
        ]
},
        output: [[3], [9, 20], [15, 7]],
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input root=[3, 9, ..., 7] (length 7), the result is [[3], [9, 20], [15, 7]].'
    },
    {
        input: {
        "root": [
                1
        ]
},
        output: [[1]],
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input root=[1], the result is [[1]].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/01-level-order-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/01-level-order-traversal'] = problem;

})();
