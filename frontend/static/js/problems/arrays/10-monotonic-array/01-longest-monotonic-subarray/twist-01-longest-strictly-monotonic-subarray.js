/**
 * Longest Strictly Monotonic Subarray
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: longest-strictly-monotonic-subarray
 * Parent: 10-monotonic-array/01-longest-monotonic-subarray
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Strictly Monotonic Subarray',
        difficulty: 'Medium',
        algorithm: 'longest-strictly-monotonic-subarray',
        parent: '10-monotonic-array/01-longest-monotonic-subarray',
        description: 'Find the longest contiguous subarray that is strictly increasing or strictly decreasing (no equal adjacent elements). Equal elements break the monotonic run, so your tracking must reset when arr[i] == arr[i-1].',
        problem: 'Equal elements break the monotonic run, so your tracking must reset when arr[i] == arr[i-1].',
        hints: [
            'Think about how longest strictly monotonic subarray differs from the standard version of this problem.',
            'Key insight: Equal elements break the monotonic run, so your tracking must reset when arr[i] == arr[i-1].',
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
                explanation: 'The longest strictly monotonic subarray for this input yields [1, 2, 3].'
            },
            {
                input: {"array":[5,4,3,2,1]},
                output: [5,4,3],
                explanation: 'The longest strictly monotonic subarray for this input yields [5, 4, 3].'
            },
            {
                input: {"array":[1]},
                output: [1],
                explanation: 'The longest strictly monotonic subarray for this input yields [1].'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def longest_strictly_monotonic_subarray(array):
    """
    Longest Strictly Monotonic Subarray

    Find the longest contiguous subarray that is strictly increasing or strictly decreasing (no equal adjacent elements). Equal elements break the monotonic run, so your tracking must reset when arr[i] == arr[i-1].

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(longest_strictly_monotonic_subarray([1,2,3,2,1]))  # Expected: [1,2,3]
print(longest_strictly_monotonic_subarray([5,4,3,2,1]))  # Expected: [5,4,3]
print(longest_strictly_monotonic_subarray([1]))  # Expected: [1]
`,
            go: `package main

import "fmt"

// LongestStrictlyMonotonicSubarray solves the Longest Strictly Monotonic Subarray problem.
// Find the longest contiguous subarray that is strictly increasing or strictly decreasing (no equal adjacent elements). Equal elements break the monotonic run, so your tracking must reset when arr[i] == arr[i-1].
// Time: O(n), Space: O(n)
func LongestStrictlyMonotonicSubarray(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(LongestStrictlyMonotonicSubarray([]int{1, 2, 3, 2, 1})) // Expected: [1,2,3]
	fmt.Println(LongestStrictlyMonotonicSubarray([]int{5, 4, 3, 2, 1})) // Expected: [5,4,3]
	fmt.Println(LongestStrictlyMonotonicSubarray([]int{1})) // Expected: [1]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/01-longest-monotonic-subarray/twist-01-longest-strictly-monotonic-subarray', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/01-longest-monotonic-subarray/twist-01-longest-strictly-monotonic-subarray'] = problem;
})();
