/**
 * Largest Range
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: hash-expansion
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest Range',
        difficulty: 'Hard',
        algorithm: 'hash-expansion',
        description: 'Write a function that takes in an array of integers and returns an array of length 2 representing the largest range of integers contained in that array. The first number in the output array should be the first (smallest) number in the range, while the second number should be the last (largest) number in the range. A range of numbers is defined as a set of numbers that come right after each other in the set of real integers. For instance, the output array [2, 6] represents the range {2, 3, 4, 5, ',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                1,
                11,
                3,
                0,
                15,
                5,
                2,
                4,
                10,
                7,
                12,
                6
        ]
},
        output: [0, 7],
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input array=[1, 11, ..., 6] (length 12), the result is [0, 7].'
    },
    {
        input: {
        "array": [
                4,
                2,
                1,
                3
        ]
},
        output: [1, 4],
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input array=[4, 2, 1, 3], the result is [1, 4].'
    },
    {
        input: {
        "array": [
                8,
                4,
                2,
                10,
                3,
                6,
                7,
                9,
                1
        ]
},
        output: [6, 10],
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input array=[8, 4, ..., 1] (length 9), the result is [6, 10].'
    }
        ],
        similar: [
    { id: '19-largest-range/01-longest-consecutive-gap-k', name: 'Longest Consecutive with Gap K', difficulty: 'Medium' },
    { id: '19-largest-range/02-count-distinct-ranges', name: 'Count Distinct Ranges', difficulty: 'Medium' },
    { id: '19-largest-range/03-largest-range-after-addition', name: 'Largest Range After Addition', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '19-largest-range', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/19-largest-range'] = problem;

})();
