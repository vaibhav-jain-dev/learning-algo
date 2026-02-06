/**
 * Longest Alternating Subarray
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: longest-alternating-subarray
 * Parent: 10-monotonic-array/01-longest-monotonic-subarray
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Alternating Subarray',
        difficulty: 'Medium',
        algorithm: 'longest-alternating-subarray',
        parent: '10-monotonic-array/01-longest-monotonic-subarray',
        description: 'Find the longest contiguous subarray that alternates between increasing and decreasing (zigzag pattern). Instead of one direction, each consecutive pair must switch direction, a completely different scan pattern.',
        problem: 'Instead of one direction, each consecutive pair must switch direction, a completely different scan pattern.',
        hints: [
            'Think about how longest alternating subarray differs from the standard version of this problem.',
            'Key insight: Instead of one direction, each consecutive pair must switch direction, a completely different scan pattern.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[1,2,3,2,1]},
                output: [1,2,3],
                explanation: 'The longest alternating subarray for this input yields [1, 2, 3].'
            },
            {
                input: {"array":[5,4,3,2,1]},
                output: [5,4,3],
                explanation: 'The longest alternating subarray for this input yields [5, 4, 3].'
            },
            {
                input: {"array":[1]},
                output: [1],
                explanation: 'The longest alternating subarray for this input yields [1].'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def longest_alternating_subarray(array):
    """
    Longest Alternating Subarray

    Find the longest contiguous subarray that alternates between increasing and decreasing (zigzag pattern). Instead of one direction, each consecutive pair must switch direction, a completely different scan pattern.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(longest_alternating_subarray([1,2,3,2,1]))  # Expected: [1,2,3]
print(longest_alternating_subarray([5,4,3,2,1]))  # Expected: [5,4,3]
print(longest_alternating_subarray([1]))  # Expected: [1]
`,
            go: `package main

import "fmt"

// LongestAlternatingSubarray solves the Longest Alternating Subarray problem.
// Find the longest contiguous subarray that alternates between increasing and decreasing (zigzag pattern). Instead of one direction, each consecutive pair must switch direction, a completely different scan pattern.
// Time: O(n), Space: O(n)
func LongestAlternatingSubarray(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(LongestAlternatingSubarray([]int{1, 2, 3, 2, 1})) // Expected: [1,2,3]
	fmt.Println(LongestAlternatingSubarray([]int{5, 4, 3, 2, 1})) // Expected: [5,4,3]
	fmt.Println(LongestAlternatingSubarray([]int{1})) // Expected: [1]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/01-longest-monotonic-subarray/twist-02-longest-alternating-subarray', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/01-longest-monotonic-subarray/twist-02-longest-alternating-subarray'] = problem;
})();
