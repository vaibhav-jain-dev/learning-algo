/**
 * Longest Increasing Subsequence
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-increasing-subseq
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Increasing Subsequence',
        difficulty: 'Hard',
        algorithm: 'dp-increasing-subseq',
        description: 'Given an array of integers, return the longest strictly increasing subsequence. A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. Return the actual subsequence, not just the length.',
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                5,
                7,
                -24,
                12,
                10,
                2,
                3,
                12,
                5,
                6,
                35
        ]
},
        output: [-24, 2, 3, 5, 6, 35],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[5, 7, ..., 35] (length 11), the result is [-24, ..., 35] (length 6).'
    },
    {
        input: {
        "array": [
                10,
                9,
                2,
                5,
                3,
                7,
                101,
                18
        ]
},
        output: [2, 3, 7, 18],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[10, 9, ..., 18] (length 8), the result is [2, 3, 7, 18].'
    },
    {
        input: {
        "array": [
                0,
                1,
                0,
                3,
                2,
                3
        ]
},
        output: [0, 1, 2, 3],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[0, 1, ..., 3] (length 6), the result is [0, 1, 2, 3].'
    }
        ],
        twists: [
            { title: 'Longest Decreasing Subsequence', difficulty: 'Medium', description: 'Find the longest strictly decreasing subsequence instead of increasing.', whyDifferent: 'You can either reverse the array and use LIS, or flip the comparison in the DP. Forces you to think about problem transformations and symmetry.', example: 'array=[5,7,-24,12,10,2,3,12,5,6,35]: longest decreasing is [12,10,2] or [7,5,3] with length 3.' },
            { title: 'Longest Bitonic Subsequence', difficulty: 'Hard', description: 'Find the longest subsequence that first strictly increases and then strictly decreases. The subsequence must have both an increasing and decreasing part.', whyDifferent: 'Requires two DP passes (LIS from left and LDS from right) and combining them at each position, introducing a merge-based approach.', example: 'array=[1,11,2,10,4,5,2,1]: longest bitonic is [1,2,10,4,2,1] with length 6.' },
            { title: 'LIS in O(n log n)', difficulty: 'Hard', description: 'Solve the LIS problem in O(n log n) time instead of O(n^2) using patience sorting or binary search with a tails array.', whyDifferent: 'Requires a completely different algorithmic paradigm: maintaining a tails array and using binary search for insertion points, rather than pairwise DP comparisons.', example: 'array=[10,9,2,5,3,7,101,18]: tails array evolves as [10],[9],[2],[2,5],[2,3],[2,3,7],[2,3,7,101],[2,3,7,18]. LIS length=4.' },
            { title: 'Number of Longest Increasing Subsequences', difficulty: 'Hard', description: 'Count how many distinct longest increasing subsequences exist in the array (all having the maximum length).', whyDifferent: 'Requires tracking both the length and count at each position. When extending, you must sum counts from all valid predecessors with the right length.', example: 'array=[1,3,5,4,7]: LIS length=4. Two LIS exist: [1,3,5,7] and [1,3,4,7]. Count=2.' },
            { title: 'Minimum Deletions for Sorted Array', difficulty: 'Medium', description: 'Find the minimum number of elements to delete from the array so that the remaining elements are in strictly increasing order.', whyDifferent: 'This is n minus the LIS length, but reframing the problem as deletions forces you to think about the complement relationship between LIS and minimum removals.', example: 'array=[5,7,-24,12,10,2,3,12,5,6,35]: LIS length=6, so minimum deletions=11-6=5.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '12-longest-increasing-subseq', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/12-longest-increasing-subseq'] = problem;

})();
