/**
 * Iterative Tree Traversal
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative Tree Traversal',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        description: 'Implement **in-order**, **pre-order**, and **post-order** tree traversals **iteratively** using explicit stacks (without recursion). For a binary tree, implement: 1. inorderIterative(root) - returns inorder traversal 2. preorderIterative(root) - returns preorder traversal 3. postorderIterative(root) - returns postorder traversal',
        complexity: {
            time: 'O(n)',
            space: 'O(h)'
        },
        examples: [
    {
        input: {
        "tree": [
                1,
                2,
                3,
                4,
                5,
                null,
                6
        ]
},
        output: {"inorder": [4, 2, 5, 1, 3, 6], "preorder": [1, 2, 4, 5, 3, 6], "postorder": [4, 5, 2, 6, 3, 1]},
        explanation: 'Processing the input data produces the output. For input tree=[1, 2, ..., 6] (length 7), the result is {\'inorder\': [4, 2, 5, 1, 3, 6], \'preorder\': [1, 2, 4, 5, 3, 6], \'postorder\': [4, 5, 2, 6, 3, 1]}.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-iterative-tree-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-iterative-tree-traversal'] = problem;

})();
