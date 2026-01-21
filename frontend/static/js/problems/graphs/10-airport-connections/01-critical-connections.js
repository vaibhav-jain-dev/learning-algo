/**
 * Critical Connections in a Network
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-connections
 */
(function() {
    'use strict';

    const problem = {
        name: 'Critical Connections in a Network',
        difficulty: 'Hard',
        algorithm: 'graph-connections',
        description: 'There are n servers numbered from 0 to n - 1 connected by undirected server-to-server connections forming a network where connections[i] = [ai, bi] represents a connection between servers ai and bi. A critical connection is a connection that, if removed, will make some servers unable to reach some other server. Return all critical connections in the network in any order.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
        },
        examples: [
    {
        input: {
        "n": 4,
        "connections": [
                [
                        0,
                        1
                ],
                [
                        1,
                        2
                ],
                [
                        2,
                        0
                ],
                [
                        1,
                        3
                ]
        ]
},
        output: [[1, 3]],
        explanation: 'Exploring the graph structure, we find the required path or value. For input n=4, connections=[[0, 1], [1, 2], [2, 0], [1, 3]], the result is [[1, 3]].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/01-critical-connections', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/01-critical-connections'] = problem;

})();
