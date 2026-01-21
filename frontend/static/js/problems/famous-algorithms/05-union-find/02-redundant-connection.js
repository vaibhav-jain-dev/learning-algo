/**
 * Redundant Connection
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: union-find
 */
(function() {
    'use strict';

    const problem = {
        name: 'Redundant Connection',
        difficulty: 'Medium',
        algorithm: 'union-find',
        description: 'In this problem, a tree is an undirected graph that is connected and has no cycles. Given a graph that started as a tree with n nodes and n edges (one extra edge was added), find and return the edge that can be removed so the resulting graph is a tree.',
        complexity: {
            time: 'O(n * alpha(n))',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "edges": [
                [
                        1,
                        2
                ],
                [
                        1,
                        3
                ],
                [
                        2,
                        3
                ]
        ]
},
        output: [2, 3],
        explanation: 'Processing the input data produces the output. For input edges=[[1, 2], [1, 3], [2, 3]], the result is [2, 3].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/02-redundant-connection', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/02-redundant-connection'] = problem;

})();
