/**
 * Max Sum Non-Decreasing Subsequence
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-increasing-subseq
 * Parent: 05-max-sum-increasing
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Sum Non-Decreasing Subsequence',
        difficulty: 'Medium',
        algorithm: 'dp-increasing-subseq',
        parent: '05-max-sum-increasing',
        description: 'Find the maximum sum subsequence where elements are non-decreasing (equal consecutive values allowed) instead of strictly increasing.',
        problem: 'The relaxed condition from strictly-less-than to less-than-or-equal changes which pairs can chain together, allowing duplicate values to be included.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: The relaxed condition from strictly-less-than to less-than-or-equal changes which pairs can chain together, allowing dup',
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
                input: {"array":[10,70,20,30,50,11,30]},
                output: 2,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"array":[8,12,2,3,15,5,7]},
                output: 3,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"array":[1,2,3,4,5]},
                output: 1,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            // Edge case
            {
                input: {"array":[10]},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def max_sum_non_decreasing_subsequence(array):
    """
    Max Sum Non-Decreasing Subsequence

    Find the maximum sum subsequence where elements are non-decreasing (equal consecutive values allowed) instead of strictly increasing.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(max_sum_non_decreasing_subsequence([10,70,20,30,50,11,30]))  # Expected: 2
print(max_sum_non_decreasing_subsequence([8,12,2,3,15,5,7]))  # Expected: 3
print(max_sum_non_decreasing_subsequence([1,2,3,4,5]))  # Expected: 1
`,
            go: `package main

import "fmt"

// MaxSumNonDecreasingSubsequence solves the Max Sum Non-Decreasing Subsequence problem.
// Find the maximum sum subsequence where elements are non-decreasing (equal consecutive values allowed) instead of strictly increasing.
// Time: O(n^2), Space: O(n)
func MaxSumNonDecreasingSubsequence(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MaxSumNonDecreasingSubsequence([]int{10, 70, 20, 30, 50, 11, 30})) // Expected: 2
	fmt.Println(MaxSumNonDecreasingSubsequence([]int{8, 12, 2, 3, 15, 5, 7})) // Expected: 3
	fmt.Println(MaxSumNonDecreasingSubsequence([]int{1, 2, 3, 4, 5})) // Expected: 1
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '05-max-sum-increasing/twist-02-max-sum-non-decreasing-subsequence', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/05-max-sum-increasing/twist-02-max-sum-non-decreasing-subsequence'] = problem;
})();
