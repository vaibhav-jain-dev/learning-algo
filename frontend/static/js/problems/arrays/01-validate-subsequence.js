/**
 * Validate Subsequence
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: two-pointer-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Validate Subsequence',
        difficulty: 'Easy',
        algorithm: 'two-pointer-subsequence',
        description: 'Given two non-empty arrays of integers, write a function that determines whether the second array is a subsequence of the first one. A subsequence of an array is a set of numbers that aren\'t necessarily adjacent in the array but that are in the same order as they appear in the array. For instance, the numbers [1, 3, 4] form a subsequence of the array [1, 2, 3, 4], and so do the numbers [2, 4]. Note that a single number in an array and the array itself are both valid subsequences of the array.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [
                5,
                1,
                22,
                25,
                6,
                -1,
                8,
                10
        ],
        "sequence": [
                1,
                6,
                -1,
                10
        ]
},
        output: true,
        explanation: 'Using two pointers, we traverse the data structure to find the solution efficiently. For input array=[5, 1, ..., 10] (length 8), sequence=[1, 6, -1, 10], the result is true.'
    },
    {
        input: {
        "array": [
                5,
                1,
                22,
                25,
                6,
                -1,
                8,
                10
        ],
        "sequence": [
                5,
                1,
                22,
                25,
                6,
                -1,
                8,
                10
        ]
},
        output: true,
        explanation: 'Using two pointers, we traverse the data structure to find the solution efficiently. For input array=[5, 1, ..., 10] (length 8), sequence=[5, 1, ..., 10] (length 8), the result is true.'
    },
    {
        input: {
        "array": [
                5,
                1,
                22,
                25,
                6,
                -1,
                8,
                10
        ],
        "sequence": [
                1,
                6,
                10,
                -1
        ]
},
        output: false,
        explanation: 'Using two pointers, we traverse the data structure to find the solution efficiently. For input array=[5, 1, ..., 10] (length 8), sequence=[1, 6, 10, -1], the result is false.'
    }
        ],
        similar: [
    { id: '01-longest-common-subsequence', name: '01 Longest Common Subsequence', difficulty: 'Medium' },
    { id: '02-count-distinct-subsequences', name: '02 Count Distinct Subsequences', difficulty: 'Hard' },
    { id: '03-minimum-window-subsequence', name: '03 Minimum Window Subsequence', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence'] = problem;

})();
