/**
 * Min Cost to Connect All Points
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kruskals-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Cost to Connect All Points',
        difficulty: 'Medium',
        algorithm: 'kruskals-algorithm',
        description: 'Given an array points representing integer coordinates of some points on a 2D-plane, return the minimum cost to make all points connected using Manhattan distance.',
        complexity: {
            time: 'O(n^2 log n)',
            space: 'O(n^2)'
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
        window.ProblemRenderer.register('famous-algorithms', '01-min-cost-to-connect', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-min-cost-to-connect'] = problem;

})();
