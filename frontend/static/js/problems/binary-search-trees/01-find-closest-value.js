/**
 * Find Closest Value in BST
 * Category: binary-search-trees
 * Difficulty: Easy
 * Algorithm: bst-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Closest Value in BST',
        difficulty: 'Easy',
        algorithm: 'bst-search',
        description: 'Write a function that takes in a Binary Search Tree (BST) and a target integer value and returns the closest value to that target value contained in the BST. You can assume that there will only be one closest value.',
        complexity: {
            time: 'O(log n) average, O(n) worst',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "tree": [
                10,
                5,
                15,
                2,
                5,
                13,
                22,
                1,
                null,
                null,
                null,
                null,
                14
        ],
        "target": 12
},
        output: 13,
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 14] (length 13), target=12, the result is 13.'
    }
        ],
        similar: [
    { id: '01-k-closest-values-bst', name: 'K Closest Values in BST', difficulty: 'Medium' },
    { id: '02-closest-bst-value-ii', name: 'Inorder Predecessor and Successor', difficulty: 'Medium' },
    { id: '03-two-sum-closest-bst', name: 'Two Sum Closest in BST', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value'] = problem;

})();
