/**
 * Negative Cycle Detection
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: bellman-ford
 */
(function() {
    'use strict';

    const problem = {
        name: 'Negative Cycle Detection',
        difficulty: 'Medium',
        algorithm: 'bellman-ford',
        description: 'Given a directed weighted graph with n vertices and a list of edges, determine if the graph contains a negative weight cycle (a cycle where the sum of edge weights is negative). Negative cycles make shortest path undefined (can always get shorter by going around the cycle again).',
        complexity: {
            time: 'O(V * E)',
            space: 'O(V)'
        },
        examples: [
    {
        input: {
        "n": 4,
        "edges": [
                [
                        0,
                        1,
                        1
                ],
                [
                        1,
                        2,
                        -3
                ],
                [
                        2,
                        3,
                        2
                ],
                [
                        3,
                        1,
                        1
                ]
        ]
},
        output: true,
        explanation: 'Processing the input data produces the output. For input n=4, edges=[[0, 1, 1], [1, 2, -3], [2, 3, 2], [3, 1, 1]], the result is true.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/03-negative-cycle-detection', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/03-negative-cycle-detection'] = problem;

})();
