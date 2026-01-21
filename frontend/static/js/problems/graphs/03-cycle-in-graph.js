/**
 * Cycle Detection in Graph
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Cycle Detection in Graph',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        description: 'Given a directed graph represented as an adjacency list, write a function that returns a boolean indicating whether the graph contains a cycle. A cycle exists in a graph when you can start at some node and follow a sequence of edges that eventually leads back to the starting node.',
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
                        3
                ],
                [
                        2,
                        3,
                        4
                ],
                [
                        0
                ],
                [],
                [
                        2,
                        5
                ],
                []
        ]
},
        output: true,
        explanation: 'Exploring the graph structure, we find the required path or value. For input edges=[[1, 3], [2, 3, 4], ..., []] (length 6), the result is true.'
    },
    {
        input: {
        "edges": [
                [
                        1,
                        2
                ],
                [
                        2
                ],
                []
        ]
},
        output: false,
        explanation: 'Exploring the graph structure, we find the required path or value. For input edges=[[1, 2], [2], []], the result is false.'
    }
        ],
        similar: [
    { id: '01-course-schedule', name: 'Course Schedule', difficulty: 'Medium' },
    { id: '02-redundant-connection', name: 'Redundant Connection', difficulty: 'Medium' },
    { id: '03-find-eventual-safe-states', name: 'Find Eventual Safe States', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph'] = problem;

})();
