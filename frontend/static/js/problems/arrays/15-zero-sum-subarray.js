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
        problem: 'Use a hash table to store seen elements for O(1) lookup. Iterate through the input, checking if the complement or required value exists in the hash table. This trades O(n) space for O(n) time.',
        hints: [
            'A hash table can give you O(1) lookup. What do you need to look up quickly?',
            'Think about what to store as keys vs values in your hash table.',
            'Consider a single pass through the data, building the hash table as you go.',
            'Watch out for duplicates and collisions. How should your algorithm handle them?'
        ],

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
        twists: [
            { name: 'Target Sum Subarray', difficulty: 'Medium', description: 'Instead of zero sum, find if there exists a contiguous subarray that sums to a given target K.', whyDifferent: 'The prefix sum check changes from looking for repeated values to looking for prefix_sum - K in the hash set.', example: 'nums = [1, 2, 3, 4, 5], K = 9. Subarray [2, 3, 4] sums to 9. Return true.' },
            { name: 'Count Zero Sum Subarrays', difficulty: 'Medium', description: 'Count the total number of contiguous subarrays that sum to zero, not just detect existence.', whyDifferent: 'Must count all occurrences of each prefix sum, not just track first occurrence. Use a hash map with counts.', example: 'nums = [0, 0, 0]. Count = 6 (each element, pairs, and full array).' },
            { name: 'Longest Zero Sum Subarray', difficulty: 'Medium', description: 'Find the length of the longest contiguous subarray that sums to zero.', whyDifferent: 'Must store the first index where each prefix sum occurs and compute maximum length, not just detect existence.', example: 'nums = [1, -1, 3, -3, 2]. Longest zero-sum: [1, -1, 3, -3] length 4.' },
            { name: 'Shortest Zero Sum Subarray', difficulty: 'Hard', description: 'Find the length of the shortest contiguous subarray that sums to zero.', whyDifferent: 'Storing the latest index of each prefix sum (not earliest) and taking minimums is the opposite strategy from longest.', example: 'nums = [1, 2, -2, 3, -3]. Shortest: [2, -2] or [3, -3], length 2.' },
            { name: 'Zero Sum Subarray in Circular Array', difficulty: 'Hard', description: 'The array is circular (wraps around). Determine if any contiguous subarray in the circular arrangement sums to zero.', whyDifferent: 'Circular subarrays can wrap around the end, requiring either doubling the array or using total-sum complement logic.', example: 'nums = [1, 2, 3, -3, -2]. Circular subarray [-2, 1, 2, 3, -3] wraps and sums to 1. Non-circular [-3, -2, 1, 2, 3] is not contiguous.' }
        ],
        similar: []
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '15-zero-sum-subarray', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/15-zero-sum-subarray'] = problem;

})();
