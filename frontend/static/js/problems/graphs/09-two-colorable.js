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
        twists: [
            { title: 'Three-Colorable', difficulty: 'Very Hard', description: 'Determine if the graph can be colored with 3 colors such that no adjacent nodes share a color.', whyDifferent: '3-coloring is NP-complete in general. Unlike 2-coloring which uses BFS, 3-coloring requires backtracking, making the algorithmic approach fundamentally different.', example: 'A cycle of length 5 (odd cycle) is not 2-colorable but is 3-colorable: [1,2,1,2,3].' },
            { title: 'Find Odd Cycle', difficulty: 'Medium', description: 'If the graph is not two-colorable, return the shortest odd cycle as proof.', whyDifferent: 'Detection is easy (BFS coloring), but finding the actual odd cycle requires backtracking from the conflicting edge through the BFS tree to the common ancestor.', example: 'Triangle [0-1, 1-2, 2-0]. Shortest odd cycle: [0, 1, 2, 0] with length 3.' },
            { title: 'Disconnected Graph', difficulty: 'Easy', description: 'The graph may have multiple disconnected components. Check if the entire graph is two-colorable.', whyDifferent: 'You must run the coloring algorithm from each unvisited node, handling multiple components. One non-bipartite component makes the whole graph non-bipartite.', example: 'Component 1: [0-1, 1-2, 2-0] (triangle, not bipartite). Component 2: [3-4] (bipartite). Overall: not bipartite.' },
            { title: 'Maximum Bipartite Subgraph', difficulty: 'Very Hard', description: 'If the graph is not bipartite, find the maximum number of edges to keep so that the remaining graph is bipartite.', whyDifferent: 'This is an optimization problem. You need to find the minimum edge cut to make the graph bipartite, equivalent to the max-cut problem in some formulations.', example: 'Triangle with 3 edges. Remove 1 edge to make it bipartite. Maximum bipartite subgraph has 2 edges.' },
            { title: 'Two-Colorable with Weights', difficulty: 'Hard', description: 'Each node has a weight. If two-colorable, partition into two sets minimizing the absolute difference of total weights.', whyDifferent: 'Two-coloring gives exactly 2 valid colorings (swap colors). You check both and return the one with minimum weight difference, combining graph coloring with subset sum thinking.', example: 'Bipartite graph. Coloring A gives sets with weights 10 and 15 (diff=5). Coloring B gives 15 and 10. Minimum difference: 5.' }
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
