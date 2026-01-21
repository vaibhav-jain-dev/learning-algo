/**
 * Maximum Depth of Nested Arrays
 * Category: recursion
 * Difficulty: Easy
 * Algorithm: recursion-product-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Depth of Nested Arrays',
        difficulty: 'Easy',
        algorithm: 'recursion-product-sum',
        description: 'Given a nested array (which can contain integers or other nested arrays), return the maximum depth of nesting. The depth of a non-nested array is 1. An empty array has depth 1.',
        complexity: {
            time: 'O(n)',
            space: 'O(d)'
        },
        examples: [
    {
        input: {
        "array": [
                1,
                [
                        2,
                        [
                                3,
                                4
                        ]
                ]
        ]
},
        output: 3,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input array=[1, [2, [3, 4]]], the result is 3.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-nested-array-depth', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nested-array-depth'] = problem;

})();
