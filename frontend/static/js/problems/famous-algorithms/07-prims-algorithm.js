/**
 * Minimum Spanning Tree (Prim's)
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: prims-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Spanning Tree (Prim\'s)',
        difficulty: 'Medium',
        algorithm: 'prims-algorithm',
        description: 'Given a connected, undirected, weighted graph with V vertices and E edges, find the Minimum Spanning Tree (MST) using Prim\'s algorithm. Prim\'s algorithm builds the MST by starting from a single vertex and greedily adding the minimum weight edge that connects a vertex in the MST to a vertex outside of it.',
        complexity: {
            time: 'O((V + E) log V)',
            space: 'O(V + E)'
        },
        examples: [
    {
        input: {
        "V": 5,
        "edges": [
                [
                        0,
                        1,
                        2
                ],
                [
                        0,
                        3,
                        6
                ],
                [
                        1,
                        2,
                        3
                ],
                [
                        1,
                        3,
                        8
                ],
                [
                        1,
                        4,
                        5
                ],
                [
                        2,
                        4,
                        7
                ],
                [
                        3,
                        4,
                        9
                ]
        ]
},
        output: {"mstWeight": 16, "mstEdges": [[0, 1, 2], [1, 2, 3], [1, 4, 5], [0, 3, 6]]},
        explanation: 'Processing the input data produces the output. For input V=5, edges=[[0, 1, 2], [0, 3, 6], ..., [3, 4, 9]] (length 7), the result is {\'mstWeight\': 16, \'mstEdges\': [[0, 1, 2], [1, 2, 3], [1, 4, 5], [0, 3, 6]]}.'
    }
        ],
        similar: [
    { id: '07-prims-algorithm/01-min-cost-connect-points-prim', name: 'Min Cost to Connect Points (Prim\'s)', difficulty: 'Medium' },
    { id: '07-prims-algorithm/02-network-delay-mst', name: 'Network Delay via MST', difficulty: 'Medium' },
    { id: '07-prims-algorithm/03-minimum-spanning-tree-verify', name: 'Minimum Spanning Tree Verification', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm'] = problem;

})();
