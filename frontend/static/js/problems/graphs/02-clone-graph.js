/**
 * Clone Graph
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Clone Graph',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        description: 'Given a reference of a node in a **connected** undirected graph, return a **deep copy** (clone) of the graph. Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors. `` class Node {     public int val;     public List<Node> neighbors; } ``',
        complexity: {
            time: 'O(N + E)',
            space: 'O(N)'
        },
        examples: [
    {
        input: {
        "adjList": [
                [
                        2,
                        4
                ],
                [
                        1,
                        3
                ],
                [
                        2,
                        4
                ],
                [
                        1,
                        3
                ]
        ]
},
        output: [[2, 4], [1, 3], [2, 4], [1, 3]],
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input adjList=[[2, 4], [1, 3], [2, 4], [1, 3]], the result is [[2, 4], [1, 3], [2, 4], [1, 3]].'
    },
    {
        input: {
        "adjList": [
                []
        ]
},
        output: [[]],
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input adjList=[[]], the result is [[]].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-clone-graph', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-clone-graph'] = problem;

})();
