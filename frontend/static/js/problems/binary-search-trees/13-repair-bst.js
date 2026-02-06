/**
 * Repair BST
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-repair
 */
(function() {
    'use strict';

    const problem = {
        name: 'Repair BST',
        difficulty: 'Hard',
        algorithm: 'bst-repair',
        description: 'You are given the root of a Binary Search Tree (BST), where the values of **exactly two nodes** of the tree were swapped by mistake. Your task is to recover the tree without changing its structure. In other words, find the two nodes that were swapped and swap their values back to restore the valid BST property.',
        complexity: {
            time: 'O(n)',
            space: 'O(1) with Morris, O(h) otherwise'
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
        twists: [
            { id: '13-repair-bst/twist-01-repair-bst-with-k-swaps', name: 'Repair BST with K Swaps', difficulty: 'Very Hard' },
            { id: '13-repair-bst/twist-02-detect-swapped-nodes-only', name: 'Detect Swapped Nodes Only', difficulty: 'Medium' },
            { id: '13-repair-bst/twist-03-repair-bst-by-rotation', name: 'Repair BST by Rotation', difficulty: 'Hard' },
            { id: '13-repair-bst/twist-04-verify-single-swap-can-fix', name: 'Verify Single Swap Can Fix', difficulty: 'Medium' },
            { id: '13-repair-bst/twist-05-repair-bst-serialization', name: 'Repair BST Serialization', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '13-repair-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/13-repair-bst'] = problem;

})();
