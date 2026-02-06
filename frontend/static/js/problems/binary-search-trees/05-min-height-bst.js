/**
 * Min Height BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-construction-balanced
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Height BST',
        difficulty: 'Medium',
        algorithm: 'bst-construction-balanced',
        description: 'Write a function that takes in a non-empty sorted array of distinct integers, constructs a BST from the integers, and returns the root of the BST. The function should minimize the height of the BST. There can be more than one BST with minimum height; return any of them. A BST is a Binary Search Tree where each node\'s value is strictly greater than all values in its left subtree and less than or equal to all values in its right subtree.',
        complexity: {
            time: 'O(n)',
            space: 'O(n) for tree, O(log n) for recursion stack'
        },
        examples: [
    {
        input: {
        "array": [
                1,
                2,
                5,
                7,
                10,
                13,
                14,
                15,
                22
        ]
},
        output: [10, 2, 14, 1, 5, 13, 15, null, null, null, 7, null, null, null, 22],
        explanation: 'Processing the input data produces the output. For input array=[1, 2, ..., 22] (length 9), the result is [10, ..., 22] (length 15).'
    },
    {
        input: {
        "array": [
                1,
                2,
                3
        ]
},
        output: [2, 1, 3],
        explanation: 'Processing the input data produces the output. For input array=[1, 2, 3], the result is [2, 1, 3].'
    }
        ],
        twists: [
            { id: '05-min-height-bst/twist-01-maximum-height-bst', name: 'Maximum Height BST', difficulty: 'Easy' },
            { id: '05-min-height-bst/twist-02-min-height-bst-with-weighted-nodes', name: 'Min Height BST with Weighted Nodes', difficulty: 'Hard' },
            { id: '05-min-height-bst/twist-03-min-height-bst-with-duplicates', name: 'Min Height BST with Duplicates', difficulty: 'Medium' },
            { id: '05-min-height-bst/twist-04-construct-bst-within-height-limit', name: 'Construct BST Within Height Limit', difficulty: 'Hard' },
            { id: '05-min-height-bst/twist-05-min-height-bst-from-unsorted-array', name: 'Min Height BST from Unsorted Array', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '05-min-height-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/05-min-height-bst'] = problem;

})();
