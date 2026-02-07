/**
 * Symmetrical Tree
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-symmetry
 */
(function() {
    'use strict';

    const problem = {
        name: 'Symmetrical Tree',
        difficulty: 'Easy',
        algorithm: 'tree-symmetry',
        description: 'Write a function that takes in a Binary Tree and returns whether the tree is symmetric (a mirror of itself). A tree is symmetric if its left subtree is a mirror reflection of its right subtree. This means: - The root exists (or tree is empty, which is symmetric) - The left subtree\'s structure and values mirror the right subtree - For any node on the left, its left child mirrors the right child of the corresponding node on the right (and vice versa)',
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
                                "value": 3
                        },
                        "right": {
                                "value": 4
                        }
                },
                "right": {
                        "value": 2,
                        "left": {
                                "value": 4
                        },
                        "right": {
                                "value": 3
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
                        "right": {
                                "value": 3
                        }
                },
                "right": {
                        "value": 2,
                        "right": {
                                "value": 3
                        }
                }
        }
},
        output: false,
        explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
    }
        ],
        twists: [
            { id: '13-symmetrical-tree/twist-01-structurally-symmetric-only', name: 'Structurally Symmetric Only', difficulty: 'Easy' },
            { id: '13-symmetrical-tree/twist-02-fold-symmetry-at-any-node', name: 'Fold Symmetry at Any Node', difficulty: 'Hard' },
            { id: '13-symmetrical-tree/twist-03-make-tree-symmetric', name: 'Make Tree Symmetric', difficulty: 'Hard' },
            { id: '13-symmetrical-tree/twist-04-iterative-symmetry-check', name: 'Iterative Symmetry Check', difficulty: 'Medium' },
            { id: '13-symmetrical-tree/twist-05-quasi-symmetric-tree', name: 'Quasi-Symmetric Tree', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '13-symmetrical-tree', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/13-symmetrical-tree'] = problem;

})();
