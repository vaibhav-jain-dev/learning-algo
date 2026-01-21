/**
 * Binary Tree Zigzag Level Order Traversal
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Binary Tree Zigzag Level Order Traversal',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        description: 'Given the root of a binary tree, return the **zigzag level order traversal** of its nodes\' values. (i.e., from left to right, then right to left for the next level and alternate between).',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "tree": [
                3,
                9,
                20,
                null,
                null,
                15,
                7
        ]
},
        output: [[3], [20, 9], [15, 7]],
        explanation: 'Processing the input data produces the output. For input tree=[3, 9, ..., 7] (length 7), the result is [[3], [20, 9], [15, 7]].'
    },
    {
        input: {
        "tree": [
                1,
                2,
                3,
                4,
                5,
                6,
                7
        ]
},
        output: [[1], [3, 2], [4, 5, 6, 7]],
        explanation: 'Processing the input data produces the output. For input tree=[1, 2, ..., 7] (length 7), the result is [[1], [3, 2], [4, 5, 6, 7]].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/03-level-order-zigzag', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/03-level-order-zigzag'] = problem;

})();
