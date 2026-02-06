/**
 * Find Kth Largest Value in BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-kth-largest
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Kth Largest Value in BST',
        difficulty: 'Medium',
        algorithm: 'bst-kth-largest',
        description: 'Write a function that takes in a Binary Search Tree (BST) and a positive integer k, and returns the kth largest integer contained in the BST. You can assume that there will only be integer values in the BST and that k is less than or equal to the number of nodes in the tree. Duplicate values should be treated as separate values. For example, in a BST with values [5, 5, 6], the second largest would be the second 5.',
        complexity: {
            time: 'O(h + k)',
            space: 'O(h)'
        },
        examples: [
    {
        input: {
        "tree": [
                15,
                5,
                20,
                2,
                5,
                17,
                22,
                1
        ],
        "k": 3
},
        output: 17,
        explanation: 'Processing the input data produces the output. For input tree=[15, 5, ..., 1] (length 8), k=3, the result is 17.'
    },
    {
        input: {
        "tree": [
                15,
                5,
                20,
                2,
                5,
                17,
                22,
                1
        ],
        "k": 1
},
        output: 22,
        explanation: 'Processing the input data produces the output. For input tree=[15, 5, ..., 1] (length 8), k=1, the result is 22.'
    }
        ],
        twists: [
            { id: '06-find-kth-largest/twist-01-kth-largest-with-frequent-updates', name: 'Kth Largest with Frequent Updates', difficulty: 'Hard' },
            { id: '06-find-kth-largest/twist-02-kth-smallest-instead', name: 'Kth Smallest Instead', difficulty: 'Easy' },
            { id: '06-find-kth-largest/twist-03-kth-largest-in-range', name: 'Kth Largest in Range', difficulty: 'Hard' },
            { id: '06-find-kth-largest/twist-04-median-of-bst', name: 'Median of BST', difficulty: 'Medium' },
            { id: '06-find-kth-largest/twist-05-kth-largest-without-parent-pointers', name: 'Kth Largest Without Parent Pointers', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '06-find-kth-largest', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/06-find-kth-largest'] = problem;

})();
