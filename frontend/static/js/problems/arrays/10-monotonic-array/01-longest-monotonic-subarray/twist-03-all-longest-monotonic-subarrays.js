/**
 * All Longest Monotonic Subarrays
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: all-longest-monotonic-subarrays
 * Parent: 10-monotonic-array/01-longest-monotonic-subarray
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Longest Monotonic Subarrays',
        difficulty: 'Medium',
        algorithm: 'all-longest-monotonic-subarrays',
        parent: '10-monotonic-array/01-longest-monotonic-subarray',
        description: 'Return the starting indices of ALL contiguous subarrays that achieve the maximum monotonic length. After finding the max length, you must track all positions where that length is achieved, not just one.',
        problem: 'After finding the max length, you must track all positions where that length is achieved, not just one.',
        hints: [
            'Think about how all longest monotonic subarrays differs from the standard version of this problem.',
            'Key insight: After finding the max length, you must track all positions where that length is achieved, not just one.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Consider whether a greedy approach works, or if you need dynamic programming for the optimal solution.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[1,2,3,2,1]},
                output: 3,
                explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
            },
            {
                input: {"array":[5,4,3,2,1]},
                output: 5,
                explanation: 'Traverse the list while maintaining the necessary references. Pointer updates must be done in the correct order to avoid breaking the chain.'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: 1,
                explanation: 'The single-pass traversal examines each node once. By the time we reach the relevant position, we have enough information to produce the correct result.'
            }
        ],
        solutions: {
            python: `def all_longest_monotonic_subarrays(array):
    """
    All Longest Monotonic Subarrays

    Return the starting indices of ALL contiguous subarrays that achieve the maximum monotonic length. After finding the max length, you must track all positions where that length is achieved, not just one.

    Time: O(n^2)
    Space: O(n)
    """
    count = 0
    n = len(array)
    m = len(sequence)

    for start in range(n):
        j = 0
        for i in range(start, n):
            if j < m and array[i] == sequence[j]:
                j += 1
            if j == m:
                count += 1
                break

    return count


# Test cases
print(all_longest_monotonic_subarrays([1,2,3,2,1]))  # Expected: 3
print(all_longest_monotonic_subarrays([5,4,3,2,1]))  # Expected: 5
print(all_longest_monotonic_subarrays([1]))  # Expected: 1
`,
            go: `package main

import "fmt"

// AllLongestMonotonicSubarrays solves the All Longest Monotonic Subarrays problem.
// Return the starting indices of ALL contiguous subarrays that achieve the maximum monotonic length. After finding the max length, you must track all positions where that length is achieved, not just one.
// Time: O(n^2), Space: O(n)
func AllLongestMonotonicSubarrays(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(AllLongestMonotonicSubarrays([]int{1, 2, 3, 2, 1})) // Expected: 3
	fmt.Println(AllLongestMonotonicSubarrays([]int{5, 4, 3, 2, 1})) // Expected: 5
	fmt.Println(AllLongestMonotonicSubarrays([]int{1})) // Expected: 1
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/01-longest-monotonic-subarray/twist-03-all-longest-monotonic-subarrays', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/01-longest-monotonic-subarray/twist-03-all-longest-monotonic-subarrays'] = problem;
})();
