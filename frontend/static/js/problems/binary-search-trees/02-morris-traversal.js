/**
 * Morris Traversal
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Morris Traversal',
        difficulty: 'Hard',
        algorithm: 'bst-traversal',
        description: 'Implement **Morris Traversal** to perform inorder and preorder tree traversals with **O(1) space complexity** (no stack, no recursion). Morris Traversal achieves constant space by temporarily modifying the tree structure - creating threads from the rightmost node of left subtrees back to their ancestors.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "tree": [
                4,
                2,
                6,
                1,
                3,
                5,
                7
        ]
},
        output: [1, 2, 3, 4, 5, 6, 7],
        explanation: 'Processing the input data produces the output. For input tree=[4, 2, ..., 7] (length 7), the result is [1, ..., 7] (length 7).'
    },
    {
        input: {
        "tree": [
                1,
                2,
                3,
                4,
                5,
                null,
                6
        ]
},
        output: [4, 2, 5, 1, 3, 6],
        explanation: 'Processing the input data produces the output. For input tree=[1, 2, ..., 6] (length 7), the result is [4, ..., 6] (length 6).'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-morris-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-morris-traversal'] = problem;

})();
