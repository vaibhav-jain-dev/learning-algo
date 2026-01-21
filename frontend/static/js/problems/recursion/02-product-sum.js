/**
 * Product Sum
 * Category: recursion
 * Difficulty: Easy
 * Algorithm: recursion-product-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Product Sum',
        difficulty: 'Easy',
        algorithm: 'recursion-product-sum',
        description: 'Write a function that takes in a "special" array and returns its product sum. A "special" array is a non-empty array that contains either integers or other "special" arrays. The product sum of a "special" array is the sum of its elements, where "special" arrays inside it are summed themselves and then multiplied by their level of depth. The depth of a "special" array is how far nested it is. For instance, the depth of [] is 1; the depth of the inner array in [[]] is 2; the depth of the innermost',
        complexity: {
            time: 'O(n)',
            space: 'O(d)'
        },
        examples: [
    {
        input: {
        "array": [
                5,
                2,
                [
                        7,
                        -1
                ],
                3,
                [
                        6,
                        [
                                -13,
                                8
                        ],
                        4
                ]
        ]
},
        output: 12,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input array=[5, 2, [7, -1], 3, [6, [-13, 8], 4]], the result is 12.'
    }
        ],
        similar: [
    { id: '01-nested-array-depth', name: 'Maximum Depth of Nested Arrays', difficulty: 'Easy' },
    { id: '02-flatten-nested-list', name: 'Flatten Nested List', difficulty: 'Medium' },
    { id: '03-nested-list-weighted-sum-ii', name: 'Nested List Weighted Sum II', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum'] = problem;

})();
