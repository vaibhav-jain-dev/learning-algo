/**
 * Single Source Shortest Path
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: dijkstras-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Single Source Shortest Path',
        difficulty: 'Medium',
        algorithm: 'dijkstras-algorithm',
        description: 'Given a weighted graph with non-negative edge weights, find the shortest path from a source vertex to all other vertices in the graph. Dijkstra\'s algorithm is a greedy algorithm that uses a priority queue to always process the vertex with the smallest known distance first.',
        problem: 'Apply a shortest path algorithm. Use a priority queue to always process the closest unvisited node first. Relax edges to update shortest distances. This achieves O((V + E) log V) time with O(V + E) space.',
        hints: [
            'Choose the right algorithm: Dijkstra for non-negative weights, Bellman-Ford for negative weights.',
            'Think about what the "distance" or "cost" represents in this problem.',
            'Consider whether you need the shortest path itself or just the shortest distance.',
            'A priority queue (min-heap) is essential for efficient shortest path algorithms.'
        ],

        complexity: {
            time: 'O((V + E) log V)',
            space: 'O(V + E)'
        },
        examples: [
    {
        input: {
        "vertices": 5,
        "edges": [
                [
                        0,
                        1,
                        4
                ],
                [
                        0,
                        2,
                        1
                ],
                [
                        1,
                        3,
                        1
                ],
                [
                        2,
                        1,
                        2
                ],
                [
                        2,
                        3,
                        5
                ],
                [
                        3,
                        4,
                        3
                ]
        ],
        "source": 0
},
        output: [0, 3, 1, 4, 7],
        explanation: 'Initialize distances to infinity except the source (distance 0). Process the closest unvisited node first, relaxing all its outgoing edges. Continue until all reachable nodes have final distances.'
    }
        ],
        twists: [
            { id: '02-dijkstras-algorithm/twist-01-negative-weight-handling', name: 'Negative Weight Handling', difficulty: 'Hard' },
            { id: '02-dijkstras-algorithm/twist-02-proof-of-correctness', name: 'Proof of Correctness', difficulty: 'Hard' },
            { id: '02-dijkstras-algorithm/twist-03-alternative-data-structure-fibonacci-heap', name: 'Alternative Data Structure: Fibonacci Heap', difficulty: 'Very Hard' },
            { id: '02-dijkstras-algorithm/twist-04-when-does-greedy-fail-k-shortest-paths', name: 'When Does Greedy Fail: K Shortest Paths', difficulty: 'Hard' },
            { id: '02-dijkstras-algorithm/twist-05-implementation-without-priority-queue', name: 'Implementation Without Priority Queue', difficulty: 'Medium' },
            { id: '02-dijkstras-algorithm/twist-06-parallel-version-delta-stepping', name: 'Parallel Version: Delta-Stepping', difficulty: 'Very Hard' }
        ],
        similar: [
    { id: '02-dijkstras-algorithm/02-dijkstras-algorithm/01-network-delay-time', name: 'Network Delay Time', difficulty: 'Medium' },
    { id: '02-dijkstras-algorithm/02-cheapest-flights', name: 'Cheapest Flights Within K Stops', difficulty: 'Medium' },
    { id: '02-dijkstras-algorithm/03-path-with-minimum-effort', name: 'Path With Minimum Effort', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm'] = problem;

})();
