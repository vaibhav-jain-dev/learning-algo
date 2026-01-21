/**
 * Clone Graph
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'Clone Graph',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        description: 'Given a reference to a node in a connected undirected graph, return a **deep copy** (clone) of the graph. Each node in the graph contains: - A value (val) - A list of its neighbors (neighbors) The graph is represented using an adjacency list where each node\'s neighbors list describes connections between nodes.',
        complexity: {
            time: 'O(N+E)',
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
        explanation: 'Processing the input data produces the output. For input adjList=[[2, 4], [1, 3], [2, 4], [1, 3]], the result is [[2, 4], [1, 3], [2, 4], [1, 3]].'
    },
    {
        input: {
        "adjList": [
                []
        ]
},
        output: [[]],
        explanation: 'Processing the input data produces the output. For input adjList=[[]], the result is [[]].'
    },
    {
        input: {
        "adjList": []
},
        output: [],
        explanation: 'Processing the input data produces the output. For input adjList=[], the result is [].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-clone-graph', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-clone-graph'] = problem;

})();
