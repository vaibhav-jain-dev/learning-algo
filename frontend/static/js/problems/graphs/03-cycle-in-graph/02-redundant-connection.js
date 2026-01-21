/**
 * Redundant Connection
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Redundant Connection',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        description: 'In this problem, a tree is an undirected graph that is connected and has no cycles. You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is given as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph. Return an edge that can be removed so that the resulting',
        complexity: {
            time: 'O(N * alpha(N))',
            space: 'O(N)'
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
                        1,
                        3
                ],
                [
                        2,
                        3
                ]
        ]
},
        output: [2, 3],
        explanation: 'Exploring the graph structure, we find the required path or value. For input edges=[[1, 2], [1, 3], [2, 3]], the result is [2, 3].'
    },
    {
        input: {
        "edges": [
                [
                        1,
                        2
                ],
                [
                        2,
                        3
                ],
                [
                        3,
                        4
                ],
                [
                        1,
                        4
                ],
                [
                        1,
                        5
                ]
        ]
},
        output: [1, 4],
        explanation: 'Exploring the graph structure, we find the required path or value. For input edges=[[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]], the result is [1, 4].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/02-redundant-connection', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/02-redundant-connection'] = problem;

})();
