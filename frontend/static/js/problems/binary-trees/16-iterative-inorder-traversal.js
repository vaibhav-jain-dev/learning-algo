/**
 * Iterative In-Order Traversal
 * Category: binary-trees
 * Difficulty: Very
 * Algorithm: tree-iterative
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative In-Order Traversal',
        difficulty: 'Very',
        algorithm: 'tree-iterative',
        description: 'Write a function that takes in a binary tree and returns its in-order traversal as a list of values. **The catch:** You must do this **without using recursion AND without using a stack or any other auxiliary data structure** for storing nodes. In other words, achieve O(1) space complexity (excluding the output array). This requires implementing **Morris Traversal**, a technique that temporarily modifies the tree structure using threaded binary trees.',
        problem: 'Use recursion to solve the problem for each subtree, then combine results at each node. The base case handles null nodes. Each node is visited once, giving O(n) time with O(1) space for the recursion stack.',
        hints: [
            'Think recursively: solve the problem for the left and right subtrees, then combine results.',
            'What information does each node need from its children to compute its result?',
            'Consider whether you need a top-down (preorder) or bottom-up (postorder) approach.',
            'Base case: what should happen when you reach a null/empty node?'
        ],

        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "tree": {
                "value": 4,
                "left": {
                        "value": 2,
                        "left": {
                                "value": 1
                        },
                        "right": {
                                "value": 3
                        }
                },
                "right": {
                        "value": 6,
                        "left": {
                                "value": 5
                        },
                        "right": {
                                "value": 7
                        }
                }
        }
},
        output: [1, 2, 3, 4, 5, 6, 7],
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
    },
    {
        input: {
        "tree": {
                "value": 1,
                "right": {
                        "value": 2,
                        "left": {
                                "value": 3
                        }
                }
        }
},
        output: [1, 3, 2],
        explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
    }
        ],
        twists: [
            { id: '16-iterative-inorder-traversal/twist-01-morris-preorder-traversal', name: 'Morris Preorder Traversal', difficulty: 'Hard' },
            { id: '16-iterative-inorder-traversal/twist-02-morris-postorder-traversal', name: 'Morris Postorder Traversal', difficulty: 'Very Hard' },
            { id: '16-iterative-inorder-traversal/twist-03-iterative-inorder-with-stack', name: 'Iterative Inorder with Stack', difficulty: 'Medium' },
            { id: '16-iterative-inorder-traversal/twist-04-detect-if-tree-was-modified', name: 'Detect If Tree Was Modified', difficulty: 'Hard' },
            { id: '16-iterative-inorder-traversal/twist-05-kth-inorder-element-with-o1-space', name: 'Kth Inorder Element with O(1) Space', difficulty: 'Hard' },
            { id: '16-iterative-inorder-traversal/twist-06-threaded-binary-tree-construction', name: 'Threaded Binary Tree Construction', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '16-iterative-inorder-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/16-iterative-inorder-traversal'] = problem;

})();
