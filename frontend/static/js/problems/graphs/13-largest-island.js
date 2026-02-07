/**
 * Largest Island
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-largest-island
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest Island',
        difficulty: 'Hard',
        algorithm: 'graph-largest-island',
        description: 'You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1. Return the size of the largest island in grid after applying this operation. An island is a 4-directionally connected group of 1s.',
        problem: 'Model the problem as a graph traversal. Choose the appropriate traversal strategy (DFS/BFS) based on whether you need depth exploration or shortest paths. Track visited nodes to handle cycles. This achieves O(N^2) time with O(N^2) space.',
        hints: [
            'Choose the right graph representation: adjacency list vs adjacency matrix.',
            'Consider whether the graph is directed or undirected, weighted or unweighted.',
            'Track visited nodes to handle cycles and avoid infinite loops.',
            'Think about which graph traversal algorithm best fits this problem: DFS, BFS, or something else.'
        ],

        complexity: {
            time: 'O(N^2)',
            space: 'O(N^2)'
        },
        examples: [
    {
        input: {
        "grid": [
                [
                        1,
                        0
                ],
                [
                        0,
                        1
                ]
        ]
},
        output: 3,
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    },
    {
        input: {
        "grid": [
                [
                        1,
                        1
                ],
                [
                        1,
                        0
                ]
        ]
},
        output: 4,
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    },
    {
        input: {
        "grid": [
                [
                        1,
                        1
                ],
                [
                        1,
                        1
                ]
        ]
},
        output: 4,
        explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
    }
        ],
        twists: [
            { id: '13-largest-island/twist-01-multiple-flips-allowed', name: 'Multiple Flips Allowed', difficulty: 'Very Hard' },
            { id: '13-largest-island/twist-02-no-flip-allowed', name: 'No Flip Allowed', difficulty: 'Easy' },
            { id: '13-largest-island/twist-03-flip-one-to-zero', name: 'Flip One to Zero', difficulty: 'Hard' },
            { id: '13-largest-island/twist-04-diagonal-connections', name: 'Diagonal Connections', difficulty: 'Medium' },
            { id: '13-largest-island/twist-05-weighted-island', name: 'Weighted Island', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '13-largest-island', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/13-largest-island'] = problem;

})();
