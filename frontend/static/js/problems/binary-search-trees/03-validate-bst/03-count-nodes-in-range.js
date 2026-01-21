/**
 * Count Nodes in Range
 * Category: binary-search-trees
 * Difficulty: Easy
 * Algorithm: bst-range
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Nodes in Range',
        difficulty: 'Easy',
        algorithm: 'bst-range',
        description: 'Given the root node of a binary search tree and two integers low and high, return the **count of nodes** whose values are in the inclusive range [low, high]. **Variant:** Also implement a version that returns the **sum of values** of nodes in the range.',
        complexity: {
            time: 'O(n) worst, O(log n + k) average',
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
        output: {"count": 3, "sum": 32},
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 18] (length 7), low=7, high=15, the result is {\'count\': 3, \'sum\': 32}.'
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
        output: {"count": 3, "sum": 23},
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 6] (length 10), low=6, high=10, the result is {\'count\': 3, \'sum\': 23}.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/03-count-nodes-in-range', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/03-count-nodes-in-range'] = problem;

})();
