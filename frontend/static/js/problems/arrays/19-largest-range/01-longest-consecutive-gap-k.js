/**
 * Longest Consecutive with Gap K
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: hash-set
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Consecutive with Gap K',
        difficulty: 'Medium',
        algorithm: 'hash-set',
        description: 'Given an unsorted array of integers nums and a positive integer k, find the length of the longest sequence where consecutive elements differ by exactly k. Unlike the classic longest consecutive sequence problem (where the gap is 1), this variant requires finding sequences with a custom gap value.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "nums": [
                1,
                3,
                5,
                7,
                9,
                2,
                4
        ],
        "k": 2
},
        output: 5,
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input nums=[1, 3, ..., 4] (length 7), k=2, the result is 5.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 19-largest-range
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '19-largest-range/01-longest-consecutive-gap-k', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/19-largest-range/01-longest-consecutive-gap-k'] = problem;

})();
