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
        problem: 'Use two pointers: one for the main array and one for the sequence. Iterate through the main array, and whenever you find a match with the current sequence element, move the sequence pointer forward. If you reach the end of the sequence, it\'s a valid subsequence. The key insight is that elements must appear in order but don\'t need to be adjacent.',
        hints: [
            'Think about what makes a subsequence valid - elements must appear in the same relative order.',
            'You don\'t need to find all subsequences, just verify if one specific sequence exists.',
            'Use two pointers: one to track your position in the main array, another for the sequence.',
            'When you find a matching element, advance the sequence pointer. The main array pointer always advances.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [5, 1, 22, 25, 6, -1, 8, 10],
        "sequence": [1, 6, -1, 10]
        },
        output: true,
        explanation: 'Starting with pointers at index 0 for both arrays: Skip 5, match 1 (seq pointer moves), skip 22 and 25, match 6 (seq pointer moves), match -1 (seq pointer moves), skip 8, match 10. All sequence elements found in order.'
    },
    {
        input: {
        "array": [5, 1, 22, 25, 6, -1, 8, 10],
        "sequence": [5, 1, 22, 25, 6, -1, 8, 10]
        },
        output: true,
        explanation: 'The sequence is identical to the array itself. Every array is a subsequence of itself since all elements appear in the same order.'
    },
    {
        input: {
        "array": [5, 1, 22, 25, 6, -1, 8, 10],
        "sequence": [1, 6, 10, -1]
        },
        output: false,
        explanation: 'After matching 1, 6, and 10, we need to find -1. But -1 appears at index 5 in the array, which is before 10 at index 7. Since 10 was already matched, -1 cannot come after it. Order is violated.'
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
