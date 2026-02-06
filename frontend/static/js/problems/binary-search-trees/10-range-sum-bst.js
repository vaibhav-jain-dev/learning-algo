/**
 * Range Sum of BST
 * Category: binary-search-trees
 * Difficulty: Easy
 * Algorithm: bst-range
 */
(function() {
    'use strict';

    const problem = {
        name: 'Range Sum of BST',
        difficulty: 'Easy',
        algorithm: 'bst-range',
        description: 'Given the root node of a Binary Search Tree (BST) and two integers low and high, return the sum of values of all nodes with a value in the inclusive range [low, high].',
        complexity: {
            time: 'O(n) worst, O(h + k) with pruning',
            space: 'O(h)'
        },
        examples: [
    {
        input: {
        "tree": [
                10,
                5,
                15,
                3,
                7,
                null,
                18
        ],
        "low": 7,
        "high": 15
},
        output: 32,
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 18] (length 7), low=7, high=15, the result is 32.'
    },
    {
        input: {
        "tree": [
                10,
                5,
                15,
                3,
                7,
                13,
                18,
                1,
                null,
                6
        ],
        "low": 6,
        "high": 10
},
        output: 23,
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 6] (length 10), low=6, high=10, the result is 23.'
    }
        ],
        twists: [
            { id: '10-range-sum-bst/twist-01-range-count-in-bst', name: 'Range Count in BST', difficulty: 'Easy' },
            { id: '10-range-sum-bst/twist-02-range-product-in-bst', name: 'Range Product in BST', difficulty: 'Medium' },
            { id: '10-range-sum-bst/twist-03-exclusive-range-sum', name: 'Exclusive Range Sum', difficulty: 'Easy' },
            { id: '10-range-sum-bst/twist-04-range-sum-with-updates', name: 'Range Sum with Updates', difficulty: 'Hard' },
            { id: '10-range-sum-bst/twist-05-kth-smallest-in-range', name: 'Kth Smallest in Range', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '10-range-sum-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/10-range-sum-bst'] = problem;

})();
