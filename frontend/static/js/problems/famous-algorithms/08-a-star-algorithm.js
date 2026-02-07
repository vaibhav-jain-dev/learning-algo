/**
 * A* Algorithm
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: a-star
 */
(function() {
    'use strict';

    const problem = {
        name: 'A* Algorithm',
        difficulty: 'Hard',
        algorithm: 'a-star',
        description: 'Implement the A* (A-Star) search algorithm to find the shortest path between two nodes in a weighted graph or grid. A* is an informed search algorithm that uses a heuristic function to guide its search, making it more efficient than Dijkstra\'s algorithm for many problems. Given a 2D grid where: - 0 represents a walkable cell - 1 represents an obstacle Find the shortest path from the start position to the end position. You can move in 4 directions (up, down, left, right). Return the length of the.',
        problem: 'Apply a shortest path algorithm. Use a priority queue to always process the closest unvisited node first. Relax edges to update shortest distances. This achieves O(E log V) time with O(V) space.',
        hints: [
            'Choose the right algorithm: Dijkstra for non-negative weights, Bellman-Ford for negative weights.',
            'Think about what the "distance" or "cost" represents in this problem.',
            'Consider whether you need the shortest path itself or just the shortest distance.',
            'A priority queue (min-heap) is essential for efficient shortest path algorithms.'
        ],

        complexity: {
            time: 'O(E log V)',
            space: 'O(V)'
        },
        examples: [
    {
        input: {
        "grid": [
                [
                        0,
                        0,
                        0,
                        0
                ],
                [
                        0,
                        1,
                        1,
                        0
                ],
                [
                        0,
                        0,
                        0,
                        0
                ],
                [
                        0,
                        1,
                        0,
                        0
                ]
        ],
        "start": [
                0,
                0
        ],
        "end": [
                3,
                3
        ]
},
        output: 6,
        explanation: 'Initialize distances to infinity except the source (distance 0). Process the closest unvisited node first, relaxing all its outgoing edges. Continue until all reachable nodes have final distances.'
    }
        ],
        twists: [
            { id: '08-a-star-algorithm/twist-01-dijkstra-comparison', name: 'Dijkstra Comparison', difficulty: 'Medium' },
            { id: '08-a-star-algorithm/twist-02-weighted-a', name: 'Weighted A*', difficulty: 'Hard' },
            { id: '08-a-star-algorithm/twist-03-bidirectional-a', name: 'Bidirectional A*', difficulty: 'Very Hard' },
            { id: '08-a-star-algorithm/twist-04-different-heuristics', name: 'Different Heuristics', difficulty: 'Medium' },
            { id: '08-a-star-algorithm/twist-05-a-with-terrain-costs', name: 'A* with Terrain Costs', difficulty: 'Hard' }
        ],
        similar: [
    { id: '08-a-star-algorithm/01-shortest-path-in-grid', name: 'Shortest Path in Binary Grid', difficulty: 'Medium' },
    { id: '08-a-star-algorithm/02-sliding-puzzle', name: 'Sliding Puzzle', difficulty: 'Hard' },
    { id: '08-a-star-algorithm/03-word-ladder-heuristic', name: 'Word Ladder with Heuristic', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm'] = problem;

})();
