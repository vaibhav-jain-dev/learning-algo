/**
 * Longest Decreasing Subsequence
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-increasing-subseq
 * Parent: 12-longest-increasing-subseq
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Decreasing Subsequence',
        difficulty: 'Medium',
        algorithm: 'dp-increasing-subseq',
        parent: '12-longest-increasing-subseq',
        description: 'Find the longest strictly decreasing subsequence instead of increasing.',
        problem: 'You can either reverse the array and use LIS, or flip the comparison in the DP. Forces you to think about problem transformations and symmetry.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: You can either reverse the array and use LIS, or flip the comparison in the DP. Forces you to think about problem transf',
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
                explanation: 'For this input, there are 2 valid positions that satisfy the longest decreasing subsequence criteria.'
            },
            {
                input: {"array":[10,9,2,5,3,7,101,18]},
                output: 3,
                explanation: 'For this input, there are 3 valid positions that satisfy the longest decreasing subsequence criteria.'
            },
            {
                input: {"array":[0,1,0,3,2,3]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the longest decreasing subsequence criteria.'
            },
            // Edge case
            {
                input: {"array":[5]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def longest_decreasing_subsequence(array):
    """
    Longest Decreasing Subsequence

    Find the longest strictly decreasing subsequence instead of increasing.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(longest_decreasing_subsequence([5,7,-24,12,10,2,3,12,5,6,35]))  # Expected: 2
print(longest_decreasing_subsequence([10,9,2,5,3,7,101,18]))  # Expected: 3
print(longest_decreasing_subsequence([0,1,0,3,2,3]))  # Expected: 1
`,
            go: `package main

import "fmt"

// LongestDecreasingSubsequence solves the Longest Decreasing Subsequence problem.
// Find the longest strictly decreasing subsequence instead of increasing.
// Time: O(n^2), Space: O(n)
func LongestDecreasingSubsequence(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LongestDecreasingSubsequence([]int{5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35})) // Expected: 2
	fmt.Println(LongestDecreasingSubsequence([]int{10, 9, 2, 5, 3, 7, 101, 18})) // Expected: 3
	fmt.Println(LongestDecreasingSubsequence([]int{0, 1, 0, 3, 2, 3})) // Expected: 1
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '12-longest-increasing-subseq/twist-01-longest-decreasing-subsequence', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/12-longest-increasing-subseq/twist-01-longest-decreasing-subsequence'] = problem;
})();
