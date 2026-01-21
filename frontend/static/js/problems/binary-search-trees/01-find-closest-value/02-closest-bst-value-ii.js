/**
 * Inorder Predecessor and Successor
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'Inorder Predecessor and Successor',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        description: 'Given the root of a binary search tree and a target value, find the **inorder predecessor** and **inorder successor** of the target value. - **Inorder predecessor**: The largest value in the BST that is smaller than target - **Inorder successor**: The smallest value in the BST that is greater than target If the predecessor or successor does not exist, return -1 for that value.',
        complexity: {
            time: 'O(h)',
            space: 'O(1) iterative, O(h) recursive'
        },
        examples: [
    {
        input: {
        "tree": [
                5,
                3,
                7,
                2,
                4,
                6,
                8
        ],
        "target": 4
},
        output: {"predecessor": 3, "successor": 5},
        explanation: 'Processing the input data produces the output. For input tree=[5, 3, ..., 8] (length 7), target=4, the result is {\'predecessor\': 3, \'successor\': 5}.'
    },
    {
        input: {
        "tree": [
                5,
                3,
                7,
                2,
                4,
                6,
                8
        ],
        "target": 1
},
        output: {"predecessor": -1, "successor": 2},
        explanation: 'Processing the input data produces the output. For input tree=[5, 3, ..., 8] (length 7), target=1, the result is {\'predecessor\': -1, \'successor\': 2}.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/02-closest-bst-value-ii', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/02-closest-bst-value-ii'] = problem;

})();
