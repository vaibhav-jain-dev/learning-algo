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
        timeLimit: 500, // 500ms per test case
        examples: [
            // Basic test case - valid subsequence
            {
                input: {
                    "array": [5, 1, 22, 25, 6, -1, 8, 10],
                    "sequence": [1, 6, -1, 10]
                },
                output: true,
                explanation: 'Starting with pointers at index 0 for both arrays: Skip 5, match 1 (seq pointer moves), skip 22 and 25, match 6 (seq pointer moves), match -1 (seq pointer moves), skip 8, match 10. All sequence elements found in order.'
            },
            // Edge case: sequence equals array
            {
                input: {
                    "array": [5, 1, 22, 25, 6, -1, 8, 10],
                    "sequence": [5, 1, 22, 25, 6, -1, 8, 10]
                },
                output: true,
                explanation: 'The sequence is identical to the array itself. Every array is a subsequence of itself since all elements appear in the same order.'
            },
            // Test case: invalid order
            {
                input: {
                    "array": [5, 1, 22, 25, 6, -1, 8, 10],
                    "sequence": [1, 6, 10, -1]
                },
                output: false,
                explanation: 'After matching 1, 6, and 10, we need to find -1. But -1 appears at index 5 in the array, which is before 10 at index 7. Since 10 was already matched, -1 cannot come after it. Order is violated.'
            },
            // Edge case: single element - valid
            {
                input: {
                    "array": [1, 2, 3, 4],
                    "sequence": [2]
                },
                output: true,
                explanation: 'Single element sequence that exists in array.'
            },
            // Edge case: single element - invalid
            {
                input: {
                    "array": [1, 2, 3, 4],
                    "sequence": [5]
                },
                output: false,
                explanation: 'Single element that does not exist in array.'
            },
            // Edge case: first and last elements only
            {
                input: {
                    "array": [1, 2, 3, 4, 5],
                    "sequence": [1, 5]
                },
                output: true,
                explanation: 'First and last elements form a valid subsequence.'
            },
            // Edge case: with duplicates in array
            {
                input: {
                    "array": [1, 1, 1, 1, 1],
                    "sequence": [1, 1]
                },
                output: true,
                explanation: 'Array with duplicates - first two 1s match the sequence.'
            },
            // Edge case: negative numbers
            {
                input: {
                    "array": [-5, -1, -10, 2, 10],
                    "sequence": [-5, -10, 10]
                },
                output: true,
                explanation: 'Array and sequence with negative numbers.'
            },
            // Edge case: sequence not found at all
            {
                input: {
                    "array": [1, 2, 3, 4],
                    "sequence": [1, 2, 5]
                },
                output: false,
                explanation: 'Sequence element 5 not found in array.'
            },
            // Large input test for time complexity
            {
                input: {
                    "array": Array.from({length: 1000}, (_, i) => i),
                    "sequence": [0, 250, 500, 750, 999]
                },
                output: true,
                explanation: 'Large array (1000 elements) - testing O(n) time complexity.'
            }
        ],
        twists: [
            { id: '01-validate-subsequence/twist-01-circular-array-subsequence', name: 'Circular Array Subsequence', difficulty: 'Medium' },
            { id: '01-validate-subsequence/twist-02-count-all-valid-starting-positions', name: 'Count All Valid Starting Positions', difficulty: 'Medium' },
            { id: '01-validate-subsequence/twist-03-bidirectional-subsequence-check', name: 'Bidirectional Subsequence Check', difficulty: 'Medium' },
            { id: '01-validate-subsequence/twist-04-minimum-deletions-for-valid-subsequence', name: 'Minimum Deletions for Valid Subsequence', difficulty: 'Hard' },
            { id: '01-validate-subsequence/twist-05-subsequence-with-maximum-gap-constraint', name: 'Subsequence with Maximum Gap Constraint', difficulty: 'Hard' }
        ],
        similar: [
            { id: '01-validate-subsequence/01-longest-common-subsequence', name: 'Longest Common Subsequence', difficulty: 'Medium' },
            { id: '01-validate-subsequence/02-count-distinct-subsequences', name: 'Count Distinct Subsequences', difficulty: 'Hard' },
            { id: '01-validate-subsequence/03-minimum-window-subsequence', name: 'Minimum Window Subsequence', difficulty: 'Hard' }
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
