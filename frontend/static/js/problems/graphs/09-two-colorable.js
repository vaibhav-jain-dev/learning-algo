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
        explanation: 'Exploring the graph structure, we find the required path or value. For input edges=[[1, 2], [0, 2], [0, 1]], the result is false.'
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
        explanation: 'Exploring the graph structure, we find the required path or value. For input edges=[[1, 3], [0, 2], [1, 3], [0, 2]], the result is true.'
    }
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
