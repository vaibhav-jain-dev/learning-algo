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
        twists: [
            {
                title: 'Reconstruct from Postorder',
                difficulty: 'Medium',
                description: 'Given an array of integers representing the postorder traversal of a BST, reconstruct the original BST and return its root.',
                whyDifferent: 'Postorder is left-right-root, so the root is the last element instead of the first. You must process the array from right to left, building right subtree before left, reversing the mental model.',
                example: 'Postorder [1, 2, 5, 4, 18, 19, 17, 10]. Root is 10, right subtree from [17, 19, 18], left subtree from [4, 5, 2, 1].'
            },
            {
                title: 'Reconstruct from Level Order',
                difficulty: 'Hard',
                description: 'Given the level-order (BFS) traversal of a BST, reconstruct the BST.',
                whyDifferent: 'Level-order does not have the recursive subarray structure of preorder or postorder. You must use the BST property to assign each element to the correct parent by tracking valid ranges for each position in a queue.',
                example: 'Level order [10, 4, 17, 2, 5, 19, 1, 18]. First element 10 is root. 4 < 10 goes left, 17 > 10 goes right, etc.'
            },
            {
                title: 'Verify Valid Preorder',
                difficulty: 'Medium',
                description: 'Given an array of integers, determine if it could be a valid preorder traversal of some BST without actually constructing the tree.',
                whyDifferent: 'Instead of building the tree, you must validate the sequence using a monotonic stack approach. The key insight is tracking the lower bound that increases as you move from left subtree to right subtree.',
                example: '[10, 4, 2, 5, 17, 19, 18] is valid. [10, 17, 4] is invalid because 4 < 10 appears after 17 > 10, meaning we already moved to the right subtree.'
            },
            {
                title: 'Reconstruct from Preorder and Inorder',
                difficulty: 'Medium',
                description: 'Given both preorder and inorder traversals of a binary tree (not necessarily a BST), reconstruct the original tree.',
                whyDifferent: 'Without BST properties, you cannot determine subtree boundaries from preorder alone. You must use the inorder array to find root positions and partition left/right subtrees, requiring a hash map for efficiency.',
                example: 'Preorder [3, 9, 20, 15, 7], Inorder [9, 3, 15, 20, 7]. Root is 3, inorder splits into left=[9] and right=[15, 20, 7].'
            },
            {
                title: 'Multiple Valid BSTs from Preorder',
                difficulty: 'Very Hard',
                description: 'Given a preorder traversal, count how many distinct BSTs could produce this exact preorder if duplicate values are allowed and duplicates can go either left or right.',
                whyDifferent: 'With duplicates, the partition point between left and right subtrees becomes ambiguous. You need to count all valid split points where equal values can be assigned to either side, turning this into a combinatorial problem.',
                example: 'Preorder [5, 5, 5]. The root is 5. The remaining [5, 5] could split as left=[5,5],right=[] or left=[5],right=[5] or left=[],right=[5,5], each recursively multiplying possibilities.'
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
