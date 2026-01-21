/**
 * Is Graph Bipartite
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-coloring
 */
(function() {
    'use strict';

    const problem = {
        name: 'Is Graph Bipartite',
        difficulty: 'Medium',
        algorithm: 'graph-coloring',
        description: 'Given an undirected graph, return true if and only if it is bipartite. A graph is bipartite if the nodes can be partitioned into two independent sets A and B such that every edge in the graph connects a node in set A and a node in set B. The graph is given as an adjacency list where graph[i] is a list of nodes connected to node i.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
        },
        examples: [
    {
        input: {
        "graph": [
                [
                        1,
                        2,
                        3
                ],
                [
                        0,
                        2
                ],
                [
                        0,
                        1,
                        3
                ],
                [
                        0,
                        2
                ]
        ]
},
        output: false,
        explanation: 'Exploring the graph structure, we find the required path or value. For input graph=[[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]], the result is false.'
    },
    {
        input: {
        "graph": [
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
        explanation: 'Exploring the graph structure, we find the required path or value. For input graph=[[1, 3], [0, 2], [1, 3], [0, 2]], the result is true.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '09-two-colorable/01-is-graph-bipartite', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/09-two-colorable/01-is-graph-bipartite'] = problem;

})();
