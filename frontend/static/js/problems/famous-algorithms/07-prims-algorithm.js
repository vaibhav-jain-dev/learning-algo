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
        twists: [
            { title: 'Dense Graph Optimization', difficulty: 'Medium', description: 'Implement Prim\'s with an adjacency matrix and simple array (no heap) for dense graphs where E is close to V^2.', whyDifferent: 'For dense graphs, the O(V^2) array-based Prim\'s is faster than the O(E log V) heap-based version because E is already O(V^2), making heap operations overhead.', example: 'For a complete graph with 1000 nodes, the array approach scans all nodes each iteration but avoids heap push/pop overhead on ~500K edges.' },
            { title: 'Lazy vs Eager Prim', difficulty: 'Hard', description: 'Implement both lazy Prim\'s (add all edges to heap, skip stale ones) and eager Prim\'s (use indexed priority queue to update keys) and compare.', whyDifferent: 'Lazy Prim adds duplicate entries and skips them later. Eager Prim maintains exactly one entry per non-MST node, requiring an indexed PQ with decrease-key operation.', example: 'Lazy heap may grow to O(E) entries. Eager heap stays at O(V) entries but needs decrease-key. Compare memory and time tradeoffs.' },
            { title: 'MST with Starting Vertex', difficulty: 'Easy', description: 'Run Prim\'s from different starting vertices and verify that all produce MSTs with the same total weight.', whyDifferent: 'Tests understanding that MST weight is invariant to the starting vertex (though the actual edges may differ), which is a key property to prove.', example: 'Start Prim from vertex 0: weight 16. Start from vertex 3: weight 16. Same total, possibly different edges.' },
            { title: 'Online Edge Addition', difficulty: 'Hard', description: 'Given an MST, a new edge is added to the graph. Efficiently update the MST without recomputing from scratch.', whyDifferent: 'Requires finding the cycle created by the new edge in the MST, then removing the heaviest edge in that cycle if the new edge is lighter -- a fundamentally different operation from building MST.', example: 'MST has edge (1,3,weight=8). New edge (1,3,weight=5) is added. Replace the old edge since the new one is lighter.' },
            { title: 'Minimum Spanning Forest', difficulty: 'Medium', description: 'If the graph is disconnected, find the minimum spanning forest (MST for each connected component).', whyDifferent: 'Prim\'s naturally handles one component. For disconnected graphs, you must detect when the heap is empty but nodes remain, then restart from an unvisited node.', example: 'Graph has components {0,1,2} and {3,4}. Run Prim from 0 for first component, then from 3 for second. Return total forest weight.' }
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
