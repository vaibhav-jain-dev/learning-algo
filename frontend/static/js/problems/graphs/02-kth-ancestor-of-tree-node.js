/**
 * Kth Ancestor of a Tree Node
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-ancestor
 */
(function() {
    'use strict';

    const problem = {
        name: 'Kth Ancestor of a Tree Node',
        difficulty: 'Hard',
        algorithm: 'graph-ancestor',
        description: 'You are given a tree with n nodes numbered from 0 to n - 1 in the form of a parent array parent where parent[i] is the parent of ith node. The root of the tree is node 0. Find the kth ancestor of a given node. The kth ancestor of a tree node is the kth node in the path from that node to the root node. Implement the TreeAncestor class: - TreeAncestor(int n, int[] parent) Initializes the object with the number of nodes in the tree and the parent array. - int getKthAncestor(int node, int k) Return ',
        complexity: {
            time: 'O(N log N) preprocessing, O(log K) query',
            space: 'O(N log N)'
        },
        examples: [
    {
        input: {
        "n": 7,
        "parent": [
                -1,
                0,
                0,
                1,
                1,
                2,
                2
        ],
        "queries": [
                [
                        3,
                        1
                ],
                [
                        5,
                        2
                ],
                [
                        6,
                        3
                ]
        ]
},
        output: [1, 0, -1],
        explanation: 'Exploring the graph structure, we find the required path or value. For input n=7, parent=[-1, 0, ..., 2] (length 7), queries=[[3, 1], [5, 2], [6, 3]], the result is [1, 0, -1].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-kth-ancestor-of-tree-node', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-kth-ancestor-of-tree-node'] = problem;

})();
