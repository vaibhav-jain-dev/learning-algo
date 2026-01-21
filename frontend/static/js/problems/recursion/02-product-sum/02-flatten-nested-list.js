/**
 * Flatten Nested List
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-product-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Flatten Nested List',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        description: 'Given a nested list of integers, flatten it into a single-level list containing all the integers in the same order. This is a common operation when working with nested data structures and demonstrates recursive traversal.',
        complexity: {
            time: 'O(n)',
            space: 'O(d)'
        },
        examples: [
    {
        input: {
        "array": [
                [
                        1,
                        2
                ],
                [
                        3,
                        [
                                4,
                                5
                        ]
                ],
                6
        ]
},
        output: [1, 2, 3, 4, 5, 6],
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input array=[[1, 2], [3, [4, 5]], 6], the result is [1, ..., 6] (length 6).'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/02-flatten-nested-list', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/02-flatten-nested-list'] = problem;

})();
