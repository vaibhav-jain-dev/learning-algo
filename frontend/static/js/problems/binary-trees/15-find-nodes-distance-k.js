/**
 * Find Nodes Distance K
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-distance
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Nodes Distance K',
        difficulty: 'Hard',
        algorithm: 'tree-distance',
        description: 'Write a function that takes in a binary tree, a target node contained in the tree, and a positive integer k. The function should return a list of all nodes that are exactly k distance away from the target node. The distance between two nodes is defined as the number of edges that must be traversed to go from one node to the other. The returned list can be in any order.',
        problem: 'Use recursion to solve the problem for each subtree, then combine results at each node. The base case handles null nodes. Each node is visited once, giving O(n) time with O(n) space for the recursion stack.',
        hints: [
            'Think recursively: solve the problem for the left and right subtrees, then combine results.',
            'What information does each node need from its children to compute its result?',
            'Consider whether you need a top-down (preorder) or bottom-up (postorder) approach.',
            'Base case: what should happen when you reach a null/empty node?'
        ],

        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "tree": {
                "value": 1,
                "left": {
                        "value": 2,
                        "left": {
                                "value": 4
                        },
                        "right": {
                                "value": 5,
                                "left": {
                                        "value": 7
                                },
                                "right": {
                                        "value": 8
                                }
                        }
                },
                "right": {
                        "value": 3,
                        "right": {
                                "value": 6
                        }
                }
        },
        "target": 5,
        "k": 2
},
        output: [1, 4],
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
    },
    {
        input: {
        "tree": {
                "value": 1,
                "left": {
                        "value": 2
                },
                "right": {
                        "value": 3
                }
        },
        "target": 1,
        "k": 1
},
        output: [2, 3],
        explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
    }
        ],
        twists: [
            { id: '15-find-nodes-distance-k/twist-01-nodes-at-distance-k-from-all-leaves', name: 'Nodes at Distance K from All Leaves', difficulty: 'Hard' },
            { id: '15-find-nodes-distance-k/twist-02-sum-of-nodes-at-distance-k', name: 'Sum of Nodes at Distance K', difficulty: 'Medium' },
            { id: '15-find-nodes-distance-k/twist-03-closest-node-to-target', name: 'Closest Node to Target', difficulty: 'Medium' },
            { id: '15-find-nodes-distance-k/twist-04-nodes-at-distance-k-in-a-graph', name: 'Nodes at Distance K in a Graph', difficulty: 'Hard' },
            { id: '15-find-nodes-distance-k/twist-05-all-pairs-distance-k', name: 'All Pairs Distance K', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '15-find-nodes-distance-k', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/15-find-nodes-distance-k'] = problem;

})();
