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
        problem: 'Leverage the BST property (left < root < right) to guide your decisions. At each node, the ordering property tells you which subtree to explore or how to restructure. This achieves O(n) time with O(h) space.',
        hints: [
            'The BST property means left < root < right. Use this to guide your search direction.',
            'Think about which traversal order (inorder, preorder, postorder) best suits this problem.',
            'Consider how the height of the tree affects your algorithm\'s complexity.',
            'For balanced BSTs, operations are O(log n). What happens with skewed trees?'
        ],

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
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
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
        explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
    }
        ],
        twists: [
            { id: '07-reconstruct-bst/twist-01-reconstruct-from-postorder', name: 'Reconstruct from Postorder', difficulty: 'Medium' },
            { id: '07-reconstruct-bst/twist-02-reconstruct-from-level-order', name: 'Reconstruct from Level Order', difficulty: 'Hard' },
            { id: '07-reconstruct-bst/twist-03-verify-valid-preorder', name: 'Verify Valid Preorder', difficulty: 'Medium' },
            { id: '07-reconstruct-bst/twist-04-reconstruct-from-preorder-and-inorder', name: 'Reconstruct from Preorder and Inorder', difficulty: 'Medium' },
            { id: '07-reconstruct-bst/twist-05-multiple-valid-bsts-from-preorder', name: 'Multiple Valid BSTs from Preorder', difficulty: 'Very Hard' }
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
