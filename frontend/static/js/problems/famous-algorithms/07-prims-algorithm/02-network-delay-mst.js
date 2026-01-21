/**
 * Network Delay via MST
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: prims-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Network Delay via MST',
        difficulty: 'Medium',
        algorithm: 'prims-algorithm',
        description: 'Given a network of servers, find the minimum cost to establish a connected network where all servers can communicate. Then determine the maximum latency for a signal to reach all nodes.',
        complexity: {
            time: 'O(E log V)',
            space: 'O(V + E)'
        },
        examples: [
    {
        input: {
        "n": 4,
        "connections": [
                [
                        0,
                        1,
                        1
                ],
                [
                        0,
                        2,
                        2
                ],
                [
                        1,
                        2,
                        3
                ],
                [
                        1,
                        3,
                        4
                ],
                [
                        2,
                        3,
                        5
                ]
        ]
},
        output: {"mstCost": 7, "maxDepth": 2},
        explanation: 'Processing the input data produces the output. For input n=4, connections=[[0, 1, 1], [0, 2, 2], [1, 2, 3], [1, 3, 4], [2, 3, 5]], the result is {\'mstCost\': 7, \'maxDepth\': 2}.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/02-network-delay-mst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/02-network-delay-mst'] = problem;

})();
