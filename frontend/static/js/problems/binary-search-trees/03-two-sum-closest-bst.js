/**
 * Two Sum Closest in BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Sum Closest in BST',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        description: 'Given the root of a binary search tree and a target value, find two nodes in the BST such that their **sum is closest to the target**. Return the two values. If there are multiple pairs with the same closest sum, return any one of them.',
        complexity: {
            time: 'O(n)',
            space: 'O(n) or O(h) with iterators'
        },
        examples: [
    {
        input: {
        "tree": [
                10,
                5,
                15,
                2,
                7,
                12,
                20
        ],
        "target": 22
},
        output: [7, 15],
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 20] (length 7), target=22, the result is [7, 15].'
    },
    {
        input: {
        "tree": [
                5,
                3,
                7,
                1,
                4,
                6,
                8
        ],
        "target": 10
},
        output: [3, 7],
        explanation: 'Processing the input data produces the output. For input tree=[5, 3, ..., 8] (length 7), target=10, the result is [3, 7].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-two-sum-closest-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-two-sum-closest-bst'] = problem;

})();
