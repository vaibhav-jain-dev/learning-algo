/**
 * Minimum Passes of Matrix
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-min-passes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Passes of Matrix',
        difficulty: 'Medium',
        algorithm: 'graph-min-passes',
        description: 'Write a function that takes in an integer matrix and returns the minimum number of passes required to convert all negative integers to positive integers. A negative integer in the matrix can only be converted to a positive integer if one or more of its adjacent elements (horizontally or vertically adjacent, not diagonally) is positive. A pass consists of converting all negative integers that can be converted at that time. Note that 0 is neither positive nor negative, meaning it cannot convert an.',
        problem: 'Model the problem as a graph traversal. Choose the appropriate traversal strategy (DFS/BFS) based on whether you need depth exploration or shortest paths. Track visited nodes to handle cycles. This achieves O(N * M) time with O(N * M) space.',
        hints: [
            'Choose the right graph representation: adjacency list vs adjacency matrix.',
            'Consider whether the graph is directed or undirected, weighted or unweighted.',
            'Track visited nodes to handle cycles and avoid infinite loops.',
            'Think about which graph traversal algorithm best fits this problem: DFS, BFS, or something else.'
        ],

        complexity: {
            time: 'O(N * M)',
            space: 'O(N * M)'
        },
        examples: [
    {
        input: {
        "matrix": [
                [
                        0,
                        -1,
                        -3,
                        2,
                        0
                ],
                [
                        1,
                        -2,
                        -5,
                        -1,
                        -3
                ],
                [
                        3,
                        0,
                        0,
                        -4,
                        -1
                ]
        ]
},
        output: 3,
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    },
    {
        input: {
        "matrix": [
                [
                        1,
                        0,
                        0,
                        -2,
                        -3
                ],
                [
                        -4,
                        -5,
                        -6,
                        -2,
                        -1
                ],
                [
                        0,
                        0,
                        0,
                        0,
                        -1
                ],
                [
                        1,
                        2,
                        3,
                        0,
                        -2
                ]
        ]
},
        output: -1,
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        twists: [
            { id: '08-minimum-passes/twist-01-count-unconvertible-negatives', name: 'Count Unconvertible Negatives', difficulty: 'Easy' },
            { id: '08-minimum-passes/twist-02-zeros-can-also-convert', name: 'Zeros Can Also Convert', difficulty: 'Medium' },
            { id: '08-minimum-passes/twist-03-positive-decay', name: 'Positive Decay', difficulty: 'Hard' },
            { id: '08-minimum-passes/twist-04-simultaneous-negative-spread', name: 'Simultaneous Negative Spread', difficulty: 'Very Hard' },
            { id: '08-minimum-passes/twist-05-minimum-passes-for-submatrix', name: 'Minimum Passes for Submatrix', difficulty: 'Medium' }
        ],
        similar: [
    { id: '08-minimum-passes/01-rotting-oranges', name: 'Rotting Oranges', difficulty: 'Medium' },
    { id: '08-minimum-passes/02-walls-and-gates', name: 'Walls and Gates', difficulty: 'Medium' },
    { id: '08-minimum-passes/03-shortest-path-all-keys', name: 'Shortest Path to Get All Keys', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes'] = problem;

})();
