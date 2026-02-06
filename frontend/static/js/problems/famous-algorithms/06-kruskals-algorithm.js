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
            { title: 'Maximum Spanning Tree', difficulty: 'Easy', description: 'Find the Maximum Spanning Tree instead of the Minimum Spanning Tree by selecting the heaviest edges first.', whyDifferent: 'Simply reverses the sorting order from ascending to descending, but understanding why this produces the maximum spanning tree requires reasoning about the cut property in reverse.', example: 'For edges with weights [1,3,5,7,9], sort descending and greedily pick the heaviest non-cycle-creating edges.' },
            { title: 'Second Best MST', difficulty: 'Very Hard', description: 'Find the spanning tree with the second smallest total weight (it may share most edges with the MST).', whyDifferent: 'Requires finding the MST first, then for each non-MST edge, determining which MST edge it could replace and tracking the minimum increase in total weight.', example: 'If MST has weight 19, the second best MST might have weight 20 by swapping one edge -- find which swap gives the smallest increase.' },
            { title: 'MST Edge Classification', difficulty: 'Hard', description: 'For each edge in the graph, determine if it is always in every MST, never in any MST, or sometimes in an MST.', whyDifferent: 'Requires understanding the cut and cycle properties deeply -- an edge is mandatory if it is the unique lightest in some cut, impossible if it is the unique heaviest in some cycle.', example: 'Edge (0,1,weight=1) might be the only lightest cross-cut edge (always in MST). Edge (2,3,weight=100) might be heaviest in a cycle (never in MST).' },
            { title: 'MST with Edge Constraints', difficulty: 'Hard', description: 'Find the MST where certain edges must be included and certain edges must be excluded.', whyDifferent: 'Pre-forces some edges into the solution and removes others, then runs Kruskal on the remaining edges while respecting the forced inclusions.', example: 'Must include edge (0,1,10) and must exclude edge (2,3,1). Find MST under these constraints.' },
            { title: 'Bottleneck Spanning Tree', difficulty: 'Hard', description: 'Find the spanning tree that minimizes the maximum edge weight (bottleneck) rather than the total weight.', whyDifferent: 'The MST actually IS the bottleneck spanning tree (a non-obvious theorem), but proving this requires different reasoning than the standard greedy argument.', example: 'For a graph where MST has max edge weight 5, no other spanning tree can have all edges with weight < 5.' }
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
