/**
 * Height Balanced Binary Tree
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-balanced
 */
(function() {
    'use strict';

    const problem = {
        name: 'Height Balanced Binary Tree',
        difficulty: 'Medium',
        algorithm: 'tree-balanced',
        description: 'Write a function that takes in a Binary Tree and returns whether it is height-balanced. A binary tree is height-balanced if for each node in the tree, the difference between the height of its left subtree and the height of its right subtree is at most 1. An empty tree is considered height-balanced.',
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
        }
},
        output: true,
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
    },
    {
        input: {
        "tree": {
                "value": 1,
                "left": {
                        "value": 2,
                        "left": {
                                "value": 4,
                                "left": {
                                        "value": 6
                                }
                        },
                        "right": {
                                "value": 5
                        }
                },
                "right": {
                        "value": 3
                }
        }
},
        output: false,
        explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
    }
        ],
        twists: [
            { id: '06-height-balanced/twist-01-weight-balanced-tree-check', name: 'Weight-Balanced Tree Check', difficulty: 'Medium' },
            { id: '06-height-balanced/twist-02-iterative-balance-check', name: 'Iterative Balance Check', difficulty: 'Medium' },
            { id: '06-height-balanced/twist-03-n-ary-tree-height-balanced', name: 'N-ary Tree Height-Balanced', difficulty: 'Medium' },
            { id: '06-height-balanced/twist-04-find-the-unbalanced-node', name: 'Find the Unbalanced Node', difficulty: 'Medium' },
            { id: '06-height-balanced/twist-05-conceptual-trap-balanced-vs-complete', name: 'Conceptual Trap: Balanced vs Complete', difficulty: 'Easy' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '06-height-balanced', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/06-height-balanced'] = problem;

})();
