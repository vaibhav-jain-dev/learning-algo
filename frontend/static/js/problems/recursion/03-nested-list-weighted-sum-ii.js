/**
 * Nested List Weighted Sum II
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-product-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Nested List Weighted Sum II',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        description: 'Given a nested list of integers, return the sum of all integers weighted by their depth. Unlike the regular product sum where deeper elements have higher weight, here the weight is the **inverse** - elements at the maximum depth have weight 1, and the weight increases as you go shallower. In other words, if the maximum depth is maxDepth, an element at depth d has weight (maxDepth - d + 1).',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                [
                        1,
                        1
                ],
                2,
                [
                        1,
                        1
                ]
        ]
},
        output: 8,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input array=[[1, 1], 2, [1, 1]], the result is 8.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-nested-list-weighted-sum-ii', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-nested-list-weighted-sum-ii'] = problem;

})();
