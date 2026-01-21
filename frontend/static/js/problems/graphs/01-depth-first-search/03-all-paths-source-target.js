/**
 * All Paths From Source to Target
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Paths From Source to Target',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        description: 'Given a directed acyclic graph (**DAG**) of n nodes labeled from 0 to n - 1, find all possible paths from node 0 to node n - 1 and return them in **any order**. The graph is given as follows: graph[i] is a list of all nodes you can visit from node i (i.e., there is a directed edge from node i to node graph[i][j]).',
        complexity: {
            time: 'O(2^N * N)',
            space: 'O(N)'
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
                        3
                ],
                [
                        3
                ],
                []
        ]
},
        output: [[0, 1, 3], [0, 2, 3]],
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input graph=[[1, 2], [3], [3], []], the result is [[0, 1, 3], [0, 2, 3]].'
    },
    {
        input: {
        "graph": [
                [
                        4,
                        3,
                        1
                ],
                [
                        3,
                        2,
                        4
                ],
                [
                        3
                ],
                [
                        4
                ],
                []
        ]
},
        output: [[0, 4], [0, 3, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]],
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input graph=[[4, 3, 1], [3, 2, 4], [3], [4], []], the result is [[0, 4], [0, 3, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/03-all-paths-source-target', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/03-all-paths-source-target'] = problem;

})();
