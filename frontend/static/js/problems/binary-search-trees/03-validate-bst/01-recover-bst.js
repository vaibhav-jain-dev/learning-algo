/**
 * Recover Binary Search Tree
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-repair
 */
(function() {
    'use strict';

    const problem = {
        name: 'Recover Binary Search Tree',
        difficulty: 'Medium',
        algorithm: 'bst-repair',
        description: 'You are given the root of a binary search tree (BST), where the values of **exactly two** nodes of the tree were swapped by mistake. Recover the tree without changing its structure.',
        complexity: {
            time: 'O(n)',
            space: 'O(h) with recursion, O(1) with Morris'
        },
        examples: [
    {
        input: {
        "tree": [
                1,
                3,
                null,
                null,
                2
        ]
},
        output: [3, 1, null, null, 2],
        explanation: 'Processing the input data produces the output. For input tree=[1, 3, None, None, 2], the result is [3, 1, None, None, 2].'
    },
    {
        input: {
        "tree": [
                3,
                1,
                4,
                null,
                null,
                2
        ]
},
        output: [2, 1, 4, null, null, 3],
        explanation: 'Processing the input data produces the output. For input tree=[3, 1, ..., 2] (length 6), the result is [2, ..., 3] (length 6).'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/01-recover-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/01-recover-bst'] = problem;

})();
