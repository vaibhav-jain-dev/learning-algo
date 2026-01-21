/**
 * Zero Sum Subarray
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: hash-prefix-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Zero Sum Subarray',
        difficulty: 'Medium',
        algorithm: 'hash-prefix-sum',
        description: 'Given an array of integers, determine whether there exists a contiguous subarray that sums to zero. A subarray is a contiguous part of an array. The subarray can be of any length, including a single element.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "nums": [
                1,
                2,
                -2,
                3
        ]
},
        output: true,
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input nums=[1, 2, -2, 3], the result is true.'
    },
    {
        input: {
        "nums": [
                1,
                2,
                3,
                4,
                5
        ]
},
        output: false,
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input nums=[1, 2, 3, 4, 5], the result is false.'
    },
    {
        input: {
        "nums": [
                -5,
                5,
                2,
                -3,
                1
        ]
},
        output: true,
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input nums=[-5, 5, 2, -3, 1], the result is true.'
    }
        ],
        similar: [
    { id: '01-longest-consecutive-gap-k', name: 'Longest Consecutive Gap K', difficulty: 'Medium' },
    { id: '02-count-distinct-ranges', name: 'Count Distinct Ranges', difficulty: 'Medium' },
    { id: '03-largest-range-after-addition', name: 'Largest Range After Addition', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '15-zero-sum-subarray', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/15-zero-sum-subarray'] = problem;

})();
