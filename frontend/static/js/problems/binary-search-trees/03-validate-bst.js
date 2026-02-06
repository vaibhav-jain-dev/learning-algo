/**
 * Validate BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-validation
 */
(function() {
    'use strict';

    const problem = {
        name: 'Validate BST',
        difficulty: 'Medium',
        algorithm: 'bst-validation',
        description: 'Write a function that takes in a potentially invalid Binary Search Tree (BST) and returns a boolean representing whether the BST is valid. Each BST node has an integer value, a left child node, and a right child node. A node is said to be a valid BST node if and only if it satisfies the BST property: its value is strictly greater than the values of every node to its left; its value is less than or equal to the values of every node to its right; and its children nodes are either valid BST nodes t',
        complexity: {
            time: 'O(n)',
            space: 'O(d) where d is depth'
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
                13,
                22,
                1,
                null,
                null,
                null,
                null,
                14
        ]
},
        output: true,
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 14] (length 13), the result is true.'
    },
    {
        input: {
        "tree": [
                10,
                5,
                15,
                2,
                5,
                10,
                22
        ]
},
        output: false,
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 22] (length 7), the result is false.'
    }
        ],
        twists: [
            {
                title: 'Count BST Violations',
                difficulty: 'Medium',
                description: 'Instead of returning true/false, count the number of nodes that violate the BST property. A node violates if it is not greater than all left descendants or not less than/equal to all right descendants.',
                whyDifferent: 'You cannot short-circuit on the first violation. Every node must be checked, and you must carefully define what counts as a violation -- is it the parent that is wrong, or the child?',
                example: 'Tree: [10,5,15,2,12,13,22] -> Node 12 in left subtree of 10 violates (12>10). Node 13 in right subtree of 15 violates (13<15 but is left child). Count=2.'
            },
            {
                title: 'Validate BST with Duplicates Allowed',
                difficulty: 'Medium',
                description: 'Validate a BST where duplicates are allowed in the left subtree (not just the right). The rule becomes: left subtree values <= node value < right subtree values.',
                whyDifferent: 'The boundary conditions change subtly. Equal values are now valid on the left side, which means the min/max bound passing must use strict vs. non-strict comparisons differently for each direction.',
                example: 'Tree: [5,5,7,3,5,6,8] -> Valid (duplicates of 5 in left subtree are OK). Tree: [5,3,5] -> Valid (5 in right subtree equals root, must be strictly greater -> Invalid).'
            },
            {
                title: 'Validate BST Iteratively Using Morris Traversal',
                difficulty: 'Hard',
                description: 'Validate the BST using O(1) extra space (no recursion stack, no explicit stack). Use Morris traversal to perform inorder traversal and check ordering.',
                whyDifferent: 'Morris traversal modifies the tree temporarily by creating threaded links. You must validate while managing thread creation and removal, and ensure the tree is restored to its original state.',
                example: 'Same boolean output as base problem, but must use Morris traversal with O(1) space.'
            },
            {
                title: 'Find the Deepest Invalid Node',
                difficulty: 'Hard',
                description: 'If the tree is not a valid BST, find the deepest node that causes a violation. If multiple violations exist at the same depth, return all of them.',
                whyDifferent: 'You must traverse the entire tree even after finding violations, tracking depth information. The definition of "causes a violation" is ambiguous -- is it the node out of range, or its ancestor that set the wrong boundary?',
                example: 'Tree: [10,5,15,2,12,8,22] -> Deepest violations at depth 2: node 12 (in left subtree of 10, value>10) and node 8 (in right subtree of 10, value<10).'
            },
            {
                title: 'Validate BST from Serialized Preorder',
                difficulty: 'Medium',
                description: 'Given only the preorder traversal of a tree (as an array), determine if it represents a valid BST without actually constructing the tree.',
                whyDifferent: 'Without building the tree, you must use stack-based simulation to track the valid range for each upcoming element. The next element must either be a left child (smaller) or a right child of some ancestor (larger than that ancestor).',
                example: 'Preorder: [10,5,2,7,15,13,22] -> Valid BST. Preorder: [10,5,12,7] -> Invalid (7 appears after 12 but is less than 10\'s right child boundary).'
            }
        ],
        similar: [
    { id: '03-validate-bst/03-validate-bst/01-recover-bst', name: 'Recover Binary Search Tree', difficulty: 'Medium' },
    { id: '03-validate-bst/03-validate-bst/02-largest-bst-subtree', name: 'Largest BST Subtree', difficulty: 'Medium' },
    { id: '03-validate-bst/03-count-nodes-in-range', name: 'Count Nodes in Range', difficulty: 'Easy' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst'] = problem;

})();
