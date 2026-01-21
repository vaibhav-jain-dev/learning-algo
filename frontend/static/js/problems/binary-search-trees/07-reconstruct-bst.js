/**
 * Reconstruct BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-reconstruction
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reconstruct BST',
        difficulty: 'Medium',
        algorithm: 'bst-reconstruction',
        description: 'Given an array of integers representing the preorder traversal of a BST, write a function that creates the corresponding BST and returns its root. The preorder traversal of a BST records nodes in the following order: root, left subtree, right subtree. Each value in the input array is guaranteed to be unique.',
        complexity: {
            time: 'O(n)',
            space: 'O(h)'
        },
        examples: [
    {
        input: {
        "preorderTraversalValues": [
                10,
                4,
                2,
                1,
                5,
                17,
                19,
                18
        ]
},
        output: [10, 4, 17, 2, 5, null, 19, 1, null, null, null, 18],
        explanation: 'Processing the input data produces the output. For input preorderTraversalValues=[10, 4, ..., 18] (length 8), the result is [10, ..., 18] (length 12).'
    },
    {
        input: {
        "preorderTraversalValues": [
                5,
                3,
                1,
                4,
                7,
                6,
                8
        ]
},
        output: [5, 3, 7, 1, 4, 6, 8],
        explanation: 'Processing the input data produces the output. For input preorderTraversalValues=[5, 3, ..., 8] (length 7), the result is [5, ..., 8] (length 7).'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '07-reconstruct-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/07-reconstruct-bst'] = problem;

})();
