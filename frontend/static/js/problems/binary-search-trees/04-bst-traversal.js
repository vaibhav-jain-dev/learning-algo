/**
 * BST Traversal
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'BST Traversal',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        description: 'Write three functions that take in a Binary Search Tree (BST) and an empty array, traverse the BST, add its nodes\' values to the input array, and return that array. The three functions should traverse the BST using the in-order, pre-order, and post-order tree-traversal techniques, respectively.',
        complexity: {
            time: 'O(n)',
            space: 'O(n) for result, O(d) for call stack'
        },
        examples: [
    {
        input: {
        "tree": [
                10,
                5,
                15,
                2,
                5,
                null,
                22,
                1
        ]
},
        output: {"inorder": [1, 2, 5, 5, 10, 15, 22], "preorder": [10, 5, 2, 1, 5, 15, 22], "postorder": [1, 2, 5, 5, 22, 15, 10]},
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 1] (length 8), the result is {\'inorder\': [1, 2, 5, 5, 10, 15, 22], \'preorder\': [10, 5, 2, 1, 5, 15, 22], \'postorder\': [1, 2, 5, 5, 22, 15, 10]}.'
    }
        ],
        twists: [
            { id: '04-bst-traversal/twist-01-boundary-traversal', name: 'Boundary Traversal', difficulty: 'Hard' },
            { id: '04-bst-traversal/twist-02-vertical-order-traversal', name: 'Vertical Order Traversal', difficulty: 'Medium' },
            { id: '04-bst-traversal/twist-03-diagonal-traversal', name: 'Diagonal Traversal', difficulty: 'Medium' },
            { id: '04-bst-traversal/twist-04-traversal-with-depth-callback', name: 'Traversal with Depth Callback', difficulty: 'Easy' },
            { id: '04-bst-traversal/twist-05-reverse-postorder-without-reversing', name: 'Reverse Postorder Without Reversing', difficulty: 'Medium' }
        ],
        similar: [
    { id: '04-bst-traversal/01-iterative-tree-traversal', name: 'Iterative Tree Traversal', difficulty: 'Medium' },
    { id: '04-bst-traversal/02-morris-traversal', name: 'Morris Traversal', difficulty: 'Hard' },
    { id: '04-bst-traversal/03-level-order-zigzag', name: 'Binary Tree Zigzag Level Order Traversal', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal'] = problem;

})();
