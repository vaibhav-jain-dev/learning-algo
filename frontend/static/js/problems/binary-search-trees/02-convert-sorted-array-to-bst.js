/**
 * Convert Sorted Array to BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-construction-balanced
 */
(function() {
    'use strict';

    const problem = {
        name: 'Convert Sorted Array to BST',
        difficulty: 'Medium',
        algorithm: 'bst-construction-balanced',
        description: 'Given an integer array nums where the elements are sorted in **ascending order**, convert it to a **height-balanced** binary search tree. A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.',
        complexity: {
            time: 'O(n)',
            space: 'O(log n) recursion stack'
        },
        examples: [
    {
        input: {
        "nums": [
                -10,
                -3,
                0,
                5,
                9
        ]
},
        output: [0, -3, 9, -10, null, 5],
        explanation: 'Processing the input data produces the output. For input nums=[-10, -3, 0, 5, 9], the result is [0, ..., 5] (length 6).'
    },
    {
        input: {
        "nums": [
                1,
                2,
                3,
                4,
                5,
                6,
                7
        ]
},
        output: [4, 2, 6, 1, 3, 5, 7],
        explanation: 'Processing the input data produces the output. For input nums=[1, 2, ..., 7] (length 7), the result is [4, ..., 7] (length 7).'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-convert-sorted-array-to-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-convert-sorted-array-to-bst'] = problem;

})();
