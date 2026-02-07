/**
 * Remove Islands
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Islands',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        description: 'You\'re given a two-dimensional matrix of potentially unequal height and width containing only 0s and 1s. The matrix represents a two-toned image, where each 1 represents black and each 0 represents white. An island is defined as any number of 1s that are horizontally or vertically adjacent (but not diagonally adjacent) and that don\'t touch the border of the image. In other words, a group of horizontally or vertically adjacent 1s isn\'t an island if any of those 1s are in the first row, first colu.',
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
                        1,
                        0,
                        0,
                        0,
                        0,
                        0
                ],
                [
                        0,
                        1,
                        0,
                        1,
                        1,
                        1
                ],
                [
                        0,
                        0,
                        1,
                        0,
                        1,
                        0
                ],
                [
                        1,
                        1,
                        0,
                        0,
                        1,
                        0
                ],
                [
                        1,
                        0,
                        1,
                        1,
                        0,
                        0
                ],
                [
                        1,
                        0,
                        0,
                        0,
                        0,
                        1
                ]
        ]
},
        output: [[1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1], [0, 0, 0, 0, 1, 0], [1, 1, 0, 0, 1, 0], [1, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 1]],
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    },
    {
        input: {
        "matrix": [
                [
                        1,
                        1,
                        1
                ],
                [
                        1,
                        0,
                        1
                ],
                [
                        1,
                        1,
                        1
                ]
        ]
},
        output: [[1, 1, 1], [1, 0, 1], [1, 1, 1]],
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        twists: [
            { id: '06-remove-islands/twist-01-keep-only-islands', name: 'Keep Only Islands', difficulty: 'Medium' },
            { id: '06-remove-islands/twist-02-count-removed-cells', name: 'Count Removed Cells', difficulty: 'Easy' },
            { id: '06-remove-islands/twist-03-preserve-original-matrix', name: 'Preserve Original Matrix', difficulty: 'Medium' },
            { id: '06-remove-islands/twist-04-islands-with-diagonal-borders', name: 'Islands with Diagonal Borders', difficulty: 'Hard' },
            { id: '06-remove-islands/twist-05-remove-islands-iteratively', name: 'Remove Islands Iteratively', difficulty: 'Medium' }
        ],
        similar: [
    { id: '06-remove-islands/01-surrounded-regions', name: 'Surrounded Regions', difficulty: 'Medium' },
    { id: '06-remove-islands/02-number-of-enclaves', name: 'Number of Enclaves', difficulty: 'Medium' },
    { id: '06-remove-islands/03-count-closed-islands', name: 'Number of Closed Islands', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands'] = problem;

})();
