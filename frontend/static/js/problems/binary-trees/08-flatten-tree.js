/**
 * Flatten Binary Tree
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-flatten
 */
(function() {
    'use strict';

    const problem = {
        name: 'Flatten Binary Tree',
        difficulty: 'Medium',
        algorithm: 'tree-flatten',
        description: 'Write a function that takes in a Binary Tree, flattens it, and returns its leftmost node. A flattened Binary Tree is a structure that\'s nearly identical to a Doubly Linked List (except that nodes have left and right pointers instead of prev and next pointers), where nodes follow the original tree\'s left-to-right order. After flattening, each node\'s left pointer should point to the previous node in the flattened structure, and its right pointer should point to the next node.',
        problem: 'Use recursion to solve the problem for each subtree, then combine results at each node. The base case handles null nodes. Each node is visited once, giving O(n) time with O(h) space for the recursion stack.',
        hints: [
            'Think recursively: solve the problem for the left and right subtrees, then combine results.',
            'What information does each node need from its children to compute its result?',
            'Consider whether you need a top-down (preorder) or bottom-up (postorder) approach.',
            'Base case: what should happen when you reach a null/empty node?'
        ],

        complexity: {
            time: 'O(n)',
            space: 'O(h)'
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
                                "value": 5
                        }
                },
                "right": {
                        "value": 3,
                        "left": {
                                "value": 6
                        }
                }
        }
},
        output: "4 <-> 2 <-> 5 <-> 1 <-> 6 <-> 3",
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
    }
        ],
        twists: [
            { id: '08-flatten-tree/twist-01-flatten-to-right-skewed-list', name: 'Flatten to Right-Skewed List', difficulty: 'Medium' },
            { id: '08-flatten-tree/twist-02-flatten-to-circular-doubly-linked-list', name: 'Flatten to Circular Doubly Linked List', difficulty: 'Hard' },
            { id: '08-flatten-tree/twist-03-flatten-by-levels', name: 'Flatten by Levels', difficulty: 'Hard' },
            { id: '08-flatten-tree/twist-04-flatten-with-separator-nodes', name: 'Flatten with Separator Nodes', difficulty: 'Medium' },
            { id: '08-flatten-tree/twist-05-unflatten-back-to-original-tree', name: 'Unflatten Back to Original Tree', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '08-flatten-tree', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/08-flatten-tree'] = problem;

})();
