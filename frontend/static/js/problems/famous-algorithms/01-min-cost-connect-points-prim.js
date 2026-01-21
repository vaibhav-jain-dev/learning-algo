/**
 * Min Cost to Connect Points (Prim's)
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: prims-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Cost to Connect Points (Prim\'s)',
        difficulty: 'Medium',
        algorithm: 'prims-algorithm',
        description: 'Connect all points with minimum cost using Manhattan distance. Use Prim\'s algorithm instead of Kruskal\'s.',
        complexity: {
            time: 'O(n^2 log n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "points": [
                [
                        0,
                        0
                ],
                [
                        2,
                        2
                ],
                [
                        3,
                        10
                ],
                [
                        5,
                        2
                ],
                [
                        7,
                        0
                ]
        ]
},
        output: 20,
        explanation: 'Processing the input data produces the output. For input points=[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]], the result is 20.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-min-cost-connect-points-prim', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-min-cost-connect-points-prim'] = problem;

})();
