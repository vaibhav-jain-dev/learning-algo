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
