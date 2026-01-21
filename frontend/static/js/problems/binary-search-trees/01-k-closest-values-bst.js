/**
 * K Closest Values in BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Closest Values in BST',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        description: 'Given the root of a binary search tree, a target value, and an integer k, return the k values in the BST that are closest to the target. You may return the answer in any order. You are guaranteed to have only one unique set of k closest values in the BST.',
        complexity: {
            time: 'O(n log k) or O(log n + k)',
            space: 'O(k + h)'
        },
        examples: [
    {
        input: {
        "tree": [
                4,
                2,
                5,
                1,
                3
        ],
        "target": 3.7,
        "k": 2
},
        output: [4, 3],
        explanation: 'Processing the input data produces the output. For input tree=[4, 2, 5, 1, 3], target=3.7, k=2, the result is [4, 3].'
    },
    {
        input: {
        "tree": [
                8,
                4,
                12,
                2,
                6,
                10,
                14,
                1,
                3,
                5,
                7
        ],
        "target": 6.5,
        "k": 4
},
        output: [6, 7, 5, 8],
        explanation: 'Processing the input data produces the output. For input tree=[8, 4, ..., 7] (length 11), target=6.5, k=4, the result is [6, 7, 5, 8].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-k-closest-values-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-k-closest-values-bst'] = problem;

})();
