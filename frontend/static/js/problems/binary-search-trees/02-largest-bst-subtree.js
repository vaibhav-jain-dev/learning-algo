/**
 * Largest BST Subtree
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-validation
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest BST Subtree',
        difficulty: 'Medium',
        algorithm: 'bst-validation',
        description: 'Given the root of a binary tree, find the largest subtree which is a Binary Search Tree (BST), where the largest means subtree has the largest number of nodes. A **Binary Search Tree (BST)** is a tree in which all the nodes follow the below properties: - The left subtree values are less than the value of their parent node - The right subtree values are greater than the value of their parent node Return the size of the largest BST subtree.',
        complexity: {
            time: 'O(n)',
            space: 'O(h)'
        },
        examples: [
    {
        input: {
        "tree": [
                10,
                5,
                15,
                1,
                8,
                null,
                7
        ]
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 7] (length 7), the result is 3.'
    },
    {
        input: {
        "tree": [
                2,
                1,
                3
        ]
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input tree=[2, 1, 3], the result is 3.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-largest-bst-subtree', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-largest-bst-subtree'] = problem;

})();
