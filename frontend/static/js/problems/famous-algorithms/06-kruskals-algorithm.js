/**
 * Minimum Spanning Tree
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kruskals-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Spanning Tree',
        difficulty: 'Medium',
        algorithm: 'kruskals-algorithm',
        description: 'Given a connected, undirected, weighted graph with V vertices and E edges, find the Minimum Spanning Tree (MST) using Kruskal\'s algorithm. A Minimum Spanning Tree is a subset of edges that connects all vertices with the minimum total edge weight, without forming any cycles. Kruskal\'s algorithm is a greedy algorithm that: 1. Sorts all edges by weight 2. Picks edges in order, skipping those that would create a cycle',
        complexity: {
            time: 'O(E log E)',
            space: 'O(V)'
        },
        examples: [
    {
        input: {
        "V": 4,
        "E": 5,
        "edges": [
                [
                        0,
                        1,
                        10
                ],
                [
                        0,
                        2,
                        6
                ],
                [
                        0,
                        3,
                        5
                ],
                [
                        1,
                        3,
                        15
                ],
                [
                        2,
                        3,
                        4
                ]
        ]
},
        output: {"mstEdges": [[2, 3, 4], [0, 3, 5], [0, 1, 10]], "totalWeight": 19},
        explanation: 'Processing the input data produces the output. For input V=4, E=5, edges=[[0, 1, 10], [0, 2, 6], [0, 3, 5], [1, 3, 15], [2, 3, 4]], the result is {\'mstEdges\': [[2, 3, 4], [0, 3, 5], [0, 1, 10]], \'totalWeight\': 19}.'
    }
        ],
        twists: [
            { id: '06-kruskals-algorithm/twist-01-maximum-spanning-tree', name: 'Maximum Spanning Tree', difficulty: 'Easy' },
            { id: '06-kruskals-algorithm/twist-02-second-best-mst', name: 'Second Best MST', difficulty: 'Very Hard' },
            { id: '06-kruskals-algorithm/twist-03-mst-edge-classification', name: 'MST Edge Classification', difficulty: 'Hard' },
            { id: '06-kruskals-algorithm/twist-04-mst-with-edge-constraints', name: 'MST with Edge Constraints', difficulty: 'Hard' },
            { id: '06-kruskals-algorithm/twist-05-bottleneck-spanning-tree', name: 'Bottleneck Spanning Tree', difficulty: 'Hard' }
        ],
        similar: [
    { id: '06-kruskals-algorithm/01-min-cost-to-connect', name: 'Min Cost to Connect All Points', difficulty: 'Medium' },
    { id: '06-kruskals-algorithm/02-connecting-cities', name: 'Connecting Cities With Minimum Cost', difficulty: 'Medium' },
    { id: '06-kruskals-algorithm/03-optimize-water-distribution', name: 'Optimize Water Distribution in a Village', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm'] = problem;

})();
