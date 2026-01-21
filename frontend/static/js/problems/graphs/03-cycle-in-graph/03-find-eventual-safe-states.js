/**
 * Find Eventual Safe States
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Eventual Safe States',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        description: 'There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is an edge from node i to each node in graph[i]. A node is a **terminal node** if there are no outgoing edges. A node is a **safe node** if every possible path starting from that node leads to a terminal node (or another safe node). Return an array containing all the safe nodes of ',
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
                        2
                ],
                [
                        2,
                        3
                ],
                [
                        5
                ],
                [
                        0
                ],
                [
                        5
                ],
                [],
                []
        ]
},
        output: [2, 4, 5, 6],
        explanation: 'Exploring the graph structure, we find the required path or value. For input graph=[[1, 2], [2, 3], ..., []] (length 7), the result is [2, 4, 5, 6].'
    },
    {
        input: {
        "graph": [
                [
                        1,
                        2,
                        3,
                        4
                ],
                [
                        1,
                        2
                ],
                [
                        3,
                        4
                ],
                [
                        0,
                        4
                ],
                []
        ]
},
        output: [4],
        explanation: 'Exploring the graph structure, we find the required path or value. For input graph=[[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []], the result is [4].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/03-find-eventual-safe-states', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/03-find-eventual-safe-states'] = problem;

})();
