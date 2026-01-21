/**
 * Minimum Spanning Tree Verification
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: prims-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Spanning Tree Verification',
        difficulty: 'Medium',
        algorithm: 'prims-algorithm',
        description: 'Given a graph and a proposed spanning tree, verify if the proposed tree is indeed a minimum spanning tree.',
        complexity: {
            time: 'O(E log V)',
            space: 'O(V + E)'
        },
        examples: [
    {
        input: {
        "n": 4,
        "graphEdges": [
                [
                        0,
                        1,
                        1
                ],
                [
                        0,
                        2,
                        2
                ],
                [
                        1,
                        2,
                        3
                ],
                [
                        1,
                        3,
                        4
                ],
                [
                        2,
                        3,
                        5
                ]
        ],
        "proposed": [
                [
                        0,
                        1,
                        1
                ],
                [
                        0,
                        2,
                        2
                ],
                [
                        1,
                        3,
                        4
                ]
        ]
},
        output: true,
        explanation: 'Processing the input data produces the output. For input n=4, graphEdges=[[0, 1, 1], [0, 2, 2], [1, 2, 3], [1, 3, 4], [2, 3, 5]], proposed=[[0, 1, 1], [0, 2, 2], [1, 3, 4]], the result is true.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-minimum-spanning-tree-verify', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-minimum-spanning-tree-verify'] = problem;

})();
