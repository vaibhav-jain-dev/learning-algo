/**
 * Max Sum Increasing Subsequence
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-increasing-subseq
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Sum Increasing Subsequence',
        difficulty: 'Hard',
        algorithm: 'dp-increasing-subseq',
        description: 'Write a function that takes in a non-empty array of integers and returns the greatest sum that can be generated from a strictly increasing subsequence in the array, as well as the indices of the elements in that subsequence. A subsequence of an array is a set of numbers that are not necessarily adjacent but are in the same order as they appear in the array.',
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                10,
                70,
                20,
                30,
                50,
                11,
                30
        ]
},
        output: [110, [0, 2, 3, 4]],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[10, 70, ..., 30] (length 7), the result is [110, [0, 2, 3, 4]].'
    },
    {
        input: {
        "array": [
                8,
                12,
                2,
                3,
                15,
                5,
                7
        ]
},
        output: [35, [0, 1, 4]],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[8, 12, ..., 7] (length 7), the result is [35, [0, 1, 4]].'
    },
    {
        input: {
        "array": [
                1,
                2,
                3,
                4,
                5
        ]
},
        output: [15, [0, 1, 2, 3, 4]],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[1, 2, 3, 4, 5], the result is [15, [0, 1, 2, 3, 4]].'
    }
        ],
        twists: [
            { title: 'Max Product Increasing Subsequence', difficulty: 'Hard', description: 'Instead of maximizing the sum, find the strictly increasing subsequence whose product of elements is maximized.', whyDifferent: 'Products behave very differently from sums: negative numbers flip signs, zeros destroy products, and the multiplication growth is non-linear, requiring careful handling of sign tracking.', example: 'array=[2,3,1,5]: max product increasing subsequence is [2,3,5] with product 30, not necessarily the same as max sum.' },
            { title: 'Max Sum Non-Decreasing Subsequence', difficulty: 'Medium', description: 'Find the maximum sum subsequence where elements are non-decreasing (equal consecutive values allowed) instead of strictly increasing.', whyDifferent: 'The relaxed condition from strictly-less-than to less-than-or-equal changes which pairs can chain together, allowing duplicate values to be included.', example: 'array=[10,10,20,30]: strictly increasing skips one 10, giving sum 60. Non-decreasing includes both: 10+10+20+30=70.' },
            { title: 'Max Sum Increasing With Gap Limit', difficulty: 'Hard', description: 'Find the max sum increasing subsequence where consecutive selected elements in the original array must be within distance d of each other (index gap at most d).', whyDifferent: 'Adds a locality constraint that limits which previous elements you can extend from, requiring a sliding window within the DP iteration.', example: 'array=[10,1,2,3,50], d=2: cannot connect 10 to 50 directly (gap=4). Must use nearby elements: best might be [1,2,3,50]=56.' },
            { title: 'Minimum Sum Increasing Subsequence of Length K', difficulty: 'Hard', description: 'Find the strictly increasing subsequence of exactly length k that has the minimum sum. Return the sum and the indices.', whyDifferent: 'Flips from maximizing to minimizing and adds a fixed-length constraint, requiring a 2D DP where state includes both position and subsequence length.', example: 'array=[10,70,20,30,50,11,30], k=3: minimum sum increasing subseq of length 3 could be [10,11,30]=51.' },
            { title: 'Count Max Sum Increasing Subsequences', difficulty: 'Medium', description: 'Find how many distinct increasing subsequences achieve the maximum sum.', whyDifferent: 'Combines optimization with counting. You must track both the max sum at each position and the number of ways to achieve it, propagating counts alongside values.', example: 'array=[1,2,3,4,5]: max sum is 15 (entire array), and there is exactly 1 such subsequence.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '05-max-sum-increasing', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/05-max-sum-increasing'] = problem;

})();
