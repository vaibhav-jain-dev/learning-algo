/**
 * Min Cost to Connect Points
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: minimum-spanning-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Cost to Connect Points',
        difficulty: 'Medium',
        algorithm: 'minimum-spanning-tree',
        description: 'You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi]. The cost of connecting two points [xi, yi] and [xj, yj] is the Manhattan distance between them: |xi - xj| + |yi - yj|. Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.',
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
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input points=[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]], the result is 20.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-min-cost-connect-points', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-min-cost-connect-points'] = problem;

})();
