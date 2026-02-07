/**
 * Invert Binary Tree
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-invert
 */
(function() {
    'use strict';

    const problem = {
        name: 'Invert Binary Tree',
        difficulty: 'Easy',
        algorithm: 'tree-invert',
        description: 'Write a function that takes in a Binary Tree and inverts it. In other words, the function should swap every left node in the tree for its corresponding right node. Inverting a binary tree means mirroring it along its vertical axis. After inversion, the left subtree becomes the right subtree and vice versa at every level.',
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
                                "value": 4,
                                "left": {
                                        "value": 8
                                },
                                "right": {
                                        "value": 9
                                }
                        },
                        "right": {
                                "value": 5
                        }
                },
                "right": {
                        "value": 3,
                        "left": {
                                "value": 6
                        },
                        "right": {
                                "value": 7
                        }
                }
        }
},
        output: {"value": 1, "left": {"value": 3, "left": {"value": 7}, "right": {"value": 6}}, "right": {"value": 2, "left": {"value": 5}, "right": {"value": 4, "left": {"value": 9}, "right": {"value": 8}}}},
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
    }
        ],
        twists: [
            { id: '03-invert-tree/twist-01-iterative-inversion-with-bfs', name: 'Iterative Inversion with BFS', difficulty: 'Easy' },
            { id: '03-invert-tree/twist-02-invert-n-ary-tree', name: 'Invert N-ary Tree', difficulty: 'Medium' },
            { id: '03-invert-tree/twist-03-invert-only-specific-levels', name: 'Invert Only Specific Levels', difficulty: 'Medium' },
            { id: '03-invert-tree/twist-04-detect-if-already-inverted', name: 'Detect If Already Inverted', difficulty: 'Medium' },
            { id: '03-invert-tree/twist-05-invert-without-modifying-original', name: 'Invert Without Modifying Original', difficulty: 'Medium' },
            { id: '03-invert-tree/twist-06-concurrent-inversion-safety', name: 'Concurrent Inversion Safety', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '03-invert-tree', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/03-invert-tree'] = problem;

})();
