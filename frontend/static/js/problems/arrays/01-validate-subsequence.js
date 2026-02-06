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
            {
                title: 'Circular Array Subsequence',
                difficulty: 'Medium',
                description: 'What if the main array is circular? The sequence can wrap around from the end back to the beginning.',
                whyDifferent: 'You need to handle wrap-around logic with modular arithmetic and decide when to stop to avoid infinite loops.',
                example: 'array=[4,5,1,2,3], sequence=[3,4,5] → true (wraps from 3 back to 4,5)'
            },
            {
                title: 'Count All Valid Starting Positions',
                difficulty: 'Medium',
                description: 'Instead of just true/false, count how many starting positions in the array allow the sequence to be matched going forward.',
                whyDifferent: 'Changes from a single-pass check to exploring multiple potential starting points, requiring careful counting.',
                example: 'array=[1,2,1,2,3], sequence=[1,2] → 2 (can start at index 0 or index 2)'
            },
            {
                title: 'Bidirectional Subsequence Check',
                difficulty: 'Medium',
                description: 'The sequence is valid if it can be found going left-to-right OR right-to-left in the array.',
                whyDifferent: 'You must consider two traversal directions, potentially doubling the search space but also the solution space.',
                example: 'array=[1,2,3,4,5], sequence=[5,3,1] → true (valid right-to-left)'
            },
            {
                title: 'Minimum Deletions for Valid Subsequence',
                difficulty: 'Hard',
                description: 'The sequence is NOT a subsequence. Find the minimum elements to delete from the array so it becomes one.',
                whyDifferent: 'Switches from verification to optimization. Requires thinking about which elements block subsequence formation.',
                example: 'array=[5,1,3,2,4], sequence=[1,2,4] → delete 3 (1 deletion)'
            },
            {
                title: 'Subsequence with Maximum Gap Constraint',
                difficulty: 'Hard',
                description: 'The sequence must be a subsequence, but consecutive matched elements must be at most k positions apart in the original array.',
                whyDifferent: 'Adds a proximity constraint that turns the greedy approach into a more careful search, possibly requiring DP.',
                example: 'array=[1,2,3,1,4], sequence=[1,4], k=2 → false (gap between 1@index0 and 4@index4 is 4 > k=2, but 1@index3 and 4@index4 gap=1 → true)'
            }
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
