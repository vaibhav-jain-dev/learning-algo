/**
 * Two-Colorable
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-coloring
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two-Colorable',
        difficulty: 'Medium',
        algorithm: 'graph-coloring',
        description: 'You\'re given a list of edges representing an undirected graph. Write a function that returns a boolean indicating whether the graph is two-colorable. A graph is two-colorable (also called bipartite) if all of its nodes can be assigned one of two colors such that no two adjacent nodes have the same color. The graph will always be connected, meaning that from any node you can reach any other node.',
        problem: 'Model the problem as a graph traversal. Choose the appropriate traversal strategy (DFS/BFS) based on whether you need depth exploration or shortest paths. Track visited nodes to handle cycles. This achieves O(V + E) time with O(V) space.',
        hints: [
            'Choose the right graph representation: adjacency list vs adjacency matrix.',
            'Consider whether the graph is directed or undirected, weighted or unweighted.',
            'Track visited nodes to handle cycles and avoid infinite loops.',
            'Think about which graph traversal algorithm best fits this problem: DFS, BFS, or something else.'
        ],

        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
        },
        examples: [
    {
        input: {
        "edges": [
                [
                        1,
                        2
                ],
                [
                        0,
                        2
                ],
                [
                        0,
                        1
                ]
        ]
},
        output: false,
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    },
    {
        input: {
        "edges": [
                [
                        1,
                        3
                ],
                [
                        0,
                        2
                ],
                [
                        1,
                        3
                ],
                [
                        0,
                        2
                ]
        ]
},
        output: true,
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        twists: [
            { id: '09-two-colorable/twist-01-three-colorable', name: 'Three-Colorable', difficulty: 'Very Hard' },
            { id: '09-two-colorable/twist-02-find-odd-cycle', name: 'Find Odd Cycle', difficulty: 'Medium' },
            { id: '09-two-colorable/twist-03-disconnected-graph', name: 'Disconnected Graph', difficulty: 'Easy' },
            { id: '09-two-colorable/twist-04-maximum-bipartite-subgraph', name: 'Maximum Bipartite Subgraph', difficulty: 'Very Hard' },
            { id: '09-two-colorable/twist-05-two-colorable-with-weights', name: 'Two-Colorable with Weights', difficulty: 'Hard' }
        ],
        similar: [
    { id: '09-two-colorable/01-is-graph-bipartite', name: 'Is Graph Bipartite', difficulty: 'Medium' },
    { id: '09-two-colorable/02-possible-bipartition', name: 'Possible Bipartition', difficulty: 'Medium' },
    { id: '09-two-colorable/03-flower-planting-no-adjacent', name: 'Flower Planting With No Adjacent', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '09-two-colorable', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/09-two-colorable'] = problem;

})();
