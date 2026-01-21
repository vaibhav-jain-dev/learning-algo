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
        similar: [
    { id: '01-recover-bst', name: 'Recover Binary Search Tree', difficulty: 'Medium' },
    { id: '02-largest-bst-subtree', name: 'Largest BST Subtree', difficulty: 'Medium' },
    { id: '03-count-nodes-in-range', name: 'Count Nodes in Range', difficulty: 'Easy' }
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
