/**
 * River Sizes
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'River Sizes',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        description: 'You\'re given a two-dimensional array (matrix) of potentially unequal height and width containing only 0s and 1s. Each 0 represents land, and each 1 represents part of a river. A river consists of any number of 1s that are either horizontally or vertically adjacent (but not diagonally adjacent). The number of adjacent 1s forming a river determines its size. Write a function that returns an array of the sizes of all rivers represented in the input matrix. The sizes don\'t need to be in any particul.',
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
                        1,
                        0
                ],
                [
                        1,
                        0,
                        1,
                        0,
                        0
                ],
                [
                        0,
                        0,
                        1,
                        0,
                        1
                ],
                [
                        1,
                        0,
                        1,
                        0,
                        1
                ],
                [
                        1,
                        0,
                        1,
                        1,
                        0
                ]
        ]
},
        output: [1, 2, 2, 2, 5],
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
                        1,
                        1
                ],
                [
                        1,
                        1,
                        1
                ]
        ]
},
        output: [9],
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        twists: [
            { id: '05-river-sizes/twist-01-diagonal-rivers', name: 'Diagonal Rivers', difficulty: 'Medium' },
            { id: '05-river-sizes/twist-02-sorted-river-sizes', name: 'Sorted River Sizes', difficulty: 'Easy' },
            { id: '05-river-sizes/twist-03-k-largest-rivers', name: 'K Largest Rivers', difficulty: 'Medium' },
            { id: '05-river-sizes/twist-04-river-perimeters', name: 'River Perimeters', difficulty: 'Medium' },
            { id: '05-river-sizes/twist-05-dynamic-river-updates', name: 'Dynamic River Updates', difficulty: 'Hard' }
        ],
        similar: [
    { id: '05-river-sizes/01-max-area-of-island', name: 'Max Area of Island', difficulty: 'Medium' },
    { id: '05-river-sizes/02-count-sub-islands', name: 'Count Sub Islands', difficulty: 'Medium' },
    { id: '05-river-sizes/03-making-a-large-island', name: 'Making A Large Island', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes'] = problem;

})();
