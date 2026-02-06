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
        twists: [
            {
                title: 'Iterative with Explicit Stack',
                difficulty: 'Medium',
                description: 'Solve product sum without recursion by using an explicit stack. Each stack entry must track both the element and its current depth.',
                whyDifferent: 'Converting nested recursion to an iterative stack-based approach requires explicitly managing depth state that recursion handles implicitly. You must decide how to encode depth alongside array elements.',
                example: 'Stack starts with [(array, depth=1)]. Pop an element: if integer, add value*depth to sum. If sub-array, push each child with depth+1. Process until stack is empty.'
            },
            {
                title: 'Tail Recursion Feasibility',
                difficulty: 'Medium',
                description: 'Can product sum be converted to tail recursion? Attempt to refactor it with an accumulator. Explain why nested arrays make pure tail recursion difficult.',
                whyDifferent: 'Unlike linear recursion (Fibonacci), the nested structure means you recurse into sub-arrays mid-iteration. True tail recursion requires the recursive call to be the last operation, but you have remaining siblings to process.',
                example: 'productSum([5, [7, -1], 3], depth=1, acc=0): after processing 5, you must recurse into [7,-1] but still have 3 remaining. This breaks tail-call optimization unless you use continuation-passing style.'
            },
            {
                title: 'Memoization Analysis',
                difficulty: 'Easy',
                description: 'Would memoization help for the product sum problem? Analyze whether overlapping subproblems exist. If not, explain why.',
                whyDifferent: 'This is a conceptual trap. Unlike Fibonacci, each nested array is a unique structural position - there are no overlapping subproblems. Understanding when memoization does NOT help is as important as knowing when it does.',
                example: 'In [5, [7, [3]], [7, [3]]], even though [7,[3]] appears twice, they are independent traversals. Memoization would need structural equality checks, which is more expensive than just recomputing.'
            },
            {
                title: 'Stack Overflow with Deep Nesting',
                difficulty: 'Hard',
                description: 'Given an array nested 100,000 levels deep (e.g., [[[...[[1]]...]]]), the recursive solution overflows. Design an iterative solution that handles arbitrary nesting depth.',
                whyDifferent: 'Extremely deep nesting directly maps to deep recursion. The iterative stack-based approach is essential here, and you must handle depth tracking without relying on the call stack.',
                example: 'For a 100000-level deep array containing just the value 1, the product sum is 1 * 1 * 2 * 3 * ... * 100000 = 100000!. The iterative solution processes this without stack overflow.'
            },
            {
                title: 'Product Sum with Negative Depths',
                difficulty: 'Medium',
                description: 'Modify the problem so that odd-depth arrays multiply by their depth but even-depth arrays divide by their depth (integer division). How does this change the recursive structure?',
                whyDifferent: 'The depth-dependent operation introduces conditional logic within the recursion. You must carefully track depth parity and apply the correct operation, testing your ability to modify recursive patterns.',
                example: 'For [5, [7, -1], 3] with modified rules: depth 1 (odd) multiplies: (5 + [7,-1]*depth2 + 3)*1. Depth 2 (even) divides: (7 + -1)/2 = 3. Result: (5 + 3 + 3)*1 = 11.'
            }
        ],
        similar: [
    { id: '02-product-sum/02-product-sum/01-nested-array-depth', name: 'Maximum Depth of Nested Arrays', difficulty: 'Easy' },
    { id: '02-product-sum/02-flatten-nested-list', name: 'Flatten Nested List', difficulty: 'Medium' },
    { id: '02-product-sum/03-nested-list-weighted-sum-ii', name: 'Nested List Weighted Sum II', difficulty: 'Medium' }
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
