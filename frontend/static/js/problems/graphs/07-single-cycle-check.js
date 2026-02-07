/**
 * Single Cycle Check
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-single-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Single Cycle Check',
        difficulty: 'Medium',
        algorithm: 'graph-single-cycle',
        description: 'You\'re given an array of integers where each integer represents a jump of its value in the array. For instance, the integer 2 represents a jump of two indices forward, and -3 represents a jump of three indices backward. If a jump spills past the array\'s bounds, it wraps over to the other side. For instance, a jump of -1 at index 0 brings us to the last index in the array. Similarly, a jump of 1 at the last index brings us to index 0. Write a function that returns a boolean representing whether t.',
        problem: 'Model the problem as a graph traversal. Choose the appropriate traversal strategy (DFS/BFS) based on whether you need depth exploration or shortest paths. Track visited nodes to handle cycles. This achieves O(N) time with O(1) space.',
        hints: [
            'Choose the right graph representation: adjacency list vs adjacency matrix.',
            'Consider whether the graph is directed or undirected, weighted or unweighted.',
            'Track visited nodes to handle cycles and avoid infinite loops.',
            'Think about which graph traversal algorithm best fits this problem: DFS, BFS, or something else.'
        ],

        complexity: {
            time: 'O(N)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [
                2,
                3,
                1,
                -4,
                -4,
                2
        ]
},
        output: true,
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    },
    {
        input: {
        "array": [
                2,
                2,
                -1
        ]
},
        output: true,
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    },
    {
        input: {
        "array": [
                1,
                1,
                1,
                1,
                2
        ]
},
        output: false,
        explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
    }
        ],
        twists: [
            { id: '07-single-cycle-check/twist-01-multiple-cycles-check', name: 'Multiple Cycles Check', difficulty: 'Medium' },
            { id: '07-single-cycle-check/twist-02-cycle-length', name: 'Cycle Length', difficulty: 'Easy' },
            { id: '07-single-cycle-check/twist-03-bidirectional-jumps', name: 'Bidirectional Jumps', difficulty: 'Hard' },
            { id: '07-single-cycle-check/twist-04-minimum-modifications', name: 'Minimum Modifications', difficulty: 'Very Hard' },
            { id: '07-single-cycle-check/twist-05-single-cycle-with-visited-order', name: 'Single Cycle with Visited Order', difficulty: 'Medium' }
        ],
        similar: [
    { id: '07-single-cycle-check/01-linked-list-cycle', name: 'Linked List Cycle', difficulty: 'Easy' },
    { id: '07-single-cycle-check/02-find-duplicate-number', name: 'Find Duplicate Number', difficulty: 'Medium' },
    { id: '07-single-cycle-check/03-circular-array-loop', name: 'Circular Array Loop', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check'] = problem;

})();
