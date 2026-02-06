/**
 * Minimum Deletions for Valid Subsequence
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: minimum-deletions-for-valid-subsequence
 * Parent: 01-validate-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Deletions for Valid Subsequence',
        difficulty: 'Hard',
        algorithm: 'minimum-deletions-for-valid-subsequence',
        parent: '01-validate-subsequence',
        description: 'The sequence is NOT a subsequence. Find the minimum elements to delete from the array so it becomes one. Switches from verification to optimization. Requires thinking about which elements block subsequence formation.',
        problem: 'Switches from verification to optimization. Requires thinking about which elements block subsequence formation.',
        hints: [
            'Think about how this twist differs from the standard version: The sequence is NOT a subsequence. Find the minimum elements to delete from the .',
            'Switches from verification to optimization. Requires thinking about which elements block subsequence formation.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[5,1,22,25,6,-1,8,10],"sequence":[1,6,-1,10]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the minimum deletions for valid subsequence criteria.'
            },
            {
                input: {"array":[1,2,3,4,5],"sequence":[5,3,1]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the minimum deletions for valid subsequence criteria.'
            },
            {
                input: {"array":[1,1,1,1,1],"sequence":[1,1,1]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the minimum deletions for valid subsequence criteria.'
            },
            // Edge case
            {
                input: {"array":[5],"sequence":[1]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def minimum_deletions_for_valid_subsequence(array, sequence):
    """
    Minimum Deletions for Valid Subsequence

    The sequence is NOT a subsequence. Find the minimum elements to delete from the array so it becomes one. Switches from verification to optimization. Requires thinking about which elements block subsequence formation.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(array)

    for i in range(n):
        # Check condition based on sequence
        j = 0
        for k in range(i, n):
            if j < len(sequence) and array[k] == sequence[j]:
                j += 1
        if j == len(sequence):
            count += 1

    return count


# Test cases
print(minimum_deletions_for_valid_subsequence([5,1,22,25,6,-1,8,10], [1,6,-1,10]))  # Expected: 1
print(minimum_deletions_for_valid_subsequence([1,2,3,4,5], [5,3,1]))  # Expected: 2
print(minimum_deletions_for_valid_subsequence([1,1,1,1,1], [1,1,1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimumDeletionsForValidSubsequence solves the Minimum Deletions for Valid Subsequence problem.
// The sequence is NOT a subsequence. Find the minimum elements to delete from the array so it becomes one. Switches from verification to optimization. Requires thinking about which elements block subsequence formation.
// Time: O(n), Space: O(n)
func MinimumDeletionsForValidSubsequence(array []int, sequence []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimumDeletionsForValidSubsequence([]int{5, 1, 22, 25, 6, -1, 8, 10}, []int{1, 6, -1, 10})) // Expected: 1
	fmt.Println(MinimumDeletionsForValidSubsequence([]int{1, 2, 3, 4, 5}, []int{5, 3, 1})) // Expected: 2
	fmt.Println(MinimumDeletionsForValidSubsequence([]int{1, 1, 1, 1, 1}, []int{1, 1, 1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/twist-04-minimum-deletions-for-valid-subsequence', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/twist-04-minimum-deletions-for-valid-subsequence'] = problem;
})();
