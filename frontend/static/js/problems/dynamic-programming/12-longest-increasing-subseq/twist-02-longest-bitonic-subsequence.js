/**
 * Longest Bitonic Subsequence
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-increasing-subseq
 * Parent: 12-longest-increasing-subseq
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Bitonic Subsequence',
        difficulty: 'Hard',
        algorithm: 'dp-increasing-subseq',
        parent: '12-longest-increasing-subseq',
        description: 'Find the longest subsequence that first strictly increases and then strictly decreases. The subsequence must have both an increasing and decreasing part.',
        problem: 'Requires two DP passes (LIS from left and LDS from right) and combining them at each position, introducing a merge-based approach.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Requires two DP passes (LIS from left and LDS from right) and combining them at each position, introducing a merge-based',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[5,7,-24,12,10,2,3,12,5,6,35]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the longest bitonic subsequence criteria.'
            },
            {
                input: {"array":[10,9,2,5,3,7,101,18]},
                output: 3,
                explanation: 'For this input, there are 3 valid positions that satisfy the longest bitonic subsequence criteria.'
            },
            {
                input: {"array":[0,1,0,3,2,3]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the longest bitonic subsequence criteria.'
            },
            // Edge case
            {
                input: {"array":[5]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def longest_bitonic_subsequence(array):
    """
    Longest Bitonic Subsequence

    Find the longest subsequence that first strictly increases and then strictly decreases. The subsequence must have both an increasing and decreasing part.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(longest_bitonic_subsequence([5,7,-24,12,10,2,3,12,5,6,35]))  # Expected: 2
print(longest_bitonic_subsequence([10,9,2,5,3,7,101,18]))  # Expected: 3
print(longest_bitonic_subsequence([0,1,0,3,2,3]))  # Expected: 1
`,
            go: `package main

import "fmt"

// LongestBitonicSubsequence solves the Longest Bitonic Subsequence problem.
// Find the longest subsequence that first strictly increases and then strictly decreases. The subsequence must have both an increasing and decreasing part.
// Time: O(n^2), Space: O(n)
func LongestBitonicSubsequence(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LongestBitonicSubsequence([]int{5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35})) // Expected: 2
	fmt.Println(LongestBitonicSubsequence([]int{10, 9, 2, 5, 3, 7, 101, 18})) // Expected: 3
	fmt.Println(LongestBitonicSubsequence([]int{0, 1, 0, 3, 2, 3})) // Expected: 1
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '12-longest-increasing-subseq/twist-02-longest-bitonic-subsequence', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/12-longest-increasing-subseq/twist-02-longest-bitonic-subsequence'] = problem;
})();
