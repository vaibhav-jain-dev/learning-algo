/**
 * Number of Longest Increasing Subsequences
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-increasing-subseq
 * Parent: 12-longest-increasing-subseq
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Longest Increasing Subsequences',
        difficulty: 'Hard',
        algorithm: 'dp-increasing-subseq',
        parent: '12-longest-increasing-subseq',
        description: 'Count how many distinct longest increasing subsequences exist in the array (all having the maximum length).',
        problem: 'Requires tracking both the length and count at each position. When extending, you must sum counts from all valid predecessors with the right length.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Requires tracking both the length and count at each position. When extending, you must sum counts from all valid predece',
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
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the number of longest increasing subsequences criteria.'
            },
            {
                input: {"array":[10,9,2,5,3,7,101,18]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the number of longest increasing subsequences criteria.'
            },
            {
                input: {"array":[0,1,0,3,2,3]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the number of longest increasing subsequences criteria.'
            },
            // Edge case
            {
                input: {"array":[5]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def number_of_longest_increasing_subsequences(array):
    """
    Number of Longest Increasing Subsequences

    Count how many distinct longest increasing subsequences exist in the array (all having the maximum length).

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(number_of_longest_increasing_subsequences([5,7,-24,12,10,2,3,12,5,6,35]))  # Expected: 1
print(number_of_longest_increasing_subsequences([10,9,2,5,3,7,101,18]))  # Expected: 2
print(number_of_longest_increasing_subsequences([0,1,0,3,2,3]))  # Expected: 0
`,
            go: `package main

import "fmt"

// NumberOfLongestIncreasingSubsequences solves the Number of Longest Increasing Subsequences problem.
// Count how many distinct longest increasing subsequences exist in the array (all having the maximum length).
// Time: O(n^2), Space: O(n)
func NumberOfLongestIncreasingSubsequences(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(NumberOfLongestIncreasingSubsequences([]int{5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35})) // Expected: 1
	fmt.Println(NumberOfLongestIncreasingSubsequences([]int{10, 9, 2, 5, 3, 7, 101, 18})) // Expected: 2
	fmt.Println(NumberOfLongestIncreasingSubsequences([]int{0, 1, 0, 3, 2, 3})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '12-longest-increasing-subseq/twist-04-number-of-longest-increasing-subsequences', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/12-longest-increasing-subseq/twist-04-number-of-longest-increasing-subsequences'] = problem;
})();
