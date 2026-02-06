/**
 * Count Monotonic Subarrays
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: count-monotonic-subarrays
 * Parent: 10-monotonic-array
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Monotonic Subarrays',
        difficulty: 'Medium',
        algorithm: 'count-monotonic-subarrays',
        parent: '10-monotonic-array',
        description: 'Count the total number of contiguous subarrays of length >= 2 that are monotonic. Requires counting all valid subarrays, not just checking the whole array. Use math to count from run lengths.',
        problem: 'Requires counting all valid subarrays, not just checking the whole array. Use math to count from run lengths.',
        hints: [
            'Think about how count monotonic subarrays differs from the standard version of this problem.',
            'Key insight: Requires counting all valid subarrays, not just checking the whole array. Use math to count from run lengths.',
            'A hash map can help track frequencies or previously seen values efficiently.',
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
                input: {"array":[1,2,1,2,3]},
                output: 2,
                explanation: ''
            },
            {
                input: {"array":[1,2,3]},
                output: 1,
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[1,1,1]},
                output: 3,
                explanation: ''
            }
        ],
        solutions: {
            python: `def count_monotonic_subarrays(array):
    """
    Count Monotonic Subarrays

    Count the total number of contiguous subarrays of length >= 2 that are monotonic. Requires counting all valid subarrays, not just checking the whole array. Use math to count from run lengths.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_monotonic_subarrays([1,2,1,2,3]))  # Expected: 2
print(count_monotonic_subarrays([1,2,3]))  # Expected: 1
print(count_monotonic_subarrays([1,1,1]))  # Expected: 3
`,
            go: `package main

import "fmt"

// CountMonotonicSubarrays solves the Count Monotonic Subarrays problem.
// Count the total number of contiguous subarrays of length >= 2 that are monotonic. Requires counting all valid subarrays, not just checking the whole array. Use math to count from run lengths.
// Time: O(n), Space: O(n)
func CountMonotonicSubarrays(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountMonotonicSubarrays([]int{1, 2, 1, 2, 3})) // Expected: 2
	fmt.Println(CountMonotonicSubarrays([]int{1, 2, 3})) // Expected: 1
	fmt.Println(CountMonotonicSubarrays([]int{1, 1, 1})) // Expected: 3
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/twist-05-count-monotonic-subarrays', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/twist-05-count-monotonic-subarrays'] = problem;
})();
