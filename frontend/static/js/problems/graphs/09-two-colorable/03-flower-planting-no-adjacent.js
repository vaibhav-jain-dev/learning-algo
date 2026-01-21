/**
 * Flower Planting With No Adjacent
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-coloring
 */
(function() {
    'use strict';

    const problem = {
        name: 'Flower Planting With No Adjacent',
        difficulty: 'Medium',
        algorithm: 'graph-coloring',
        description: 'You have n gardens, labeled from 1 to n, and paths[i] = [xi, yi] describes a bidirectional path between garden xi and garden yi. In each garden, you want to plant one of 4 types of flowers. All gardens have at most 3 paths coming into or leaving it. Return any valid answer such that for every garden, no two adjacent gardens have the same flower type.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
        },
        examples: [
    {
        input: {
        "n": 3,
        "paths": [
                [
                        1,
                        2
                ],
                [
                        2,
                        3
                ],
                [
                        3,
                        1
                ]
        ]
},
        output: [1, 2, 3],
        explanation: 'Exploring the graph structure, we find the required path or value. For input n=3, paths=[[1, 2], [2, 3], [3, 1]], the result is [1, 2, 3].'
    },
    {
        input: {
        "n": 4,
        "paths": [
                [
                        1,
                        2
                ],
                [
                        3,
                        4
                ]
        ]
},
        output: [1, 2, 1, 2],
        explanation: 'Exploring the graph structure, we find the required path or value. For input n=4, paths=[[1, 2], [3, 4]], the result is [1, 2, 1, 2].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '09-two-colorable/03-flower-planting-no-adjacent', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/09-two-colorable/03-flower-planting-no-adjacent'] = problem;

})();
