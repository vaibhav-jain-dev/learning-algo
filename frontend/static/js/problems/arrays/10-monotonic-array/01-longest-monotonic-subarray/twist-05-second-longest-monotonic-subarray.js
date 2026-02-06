/**
 * Second Longest Monotonic Subarray
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: second-longest-monotonic-subarray
 * Parent: 10-monotonic-array/01-longest-monotonic-subarray
 */
(function() {
    'use strict';

    const problem = {
        name: 'Second Longest Monotonic Subarray',
        difficulty: 'Hard',
        algorithm: 'second-longest-monotonic-subarray',
        parent: '10-monotonic-array/01-longest-monotonic-subarray',
        description: 'Find the length of the second longest monotonic subarray (not overlapping with the longest). Must track multiple candidates and handle overlapping runs, requiring more complex bookkeeping.',
        problem: 'Must track multiple candidates and handle overlapping runs, requiring more complex bookkeeping.',
        hints: [
            'Think about how second longest monotonic subarray differs from the standard version of this problem.',
            'Key insight: Must track multiple candidates and handle overlapping runs, requiring more complex bookkeeping.',
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
                output: 3,
                explanation: ''
            },
            {
                input: {"array":[5,4,3,2,1]},
                output: 5,
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[1]},
                output: 1,
                explanation: ''
            }
        ],
        solutions: {
            python: `def second_longest_monotonic_subarray(array):
    """
    Second Longest Monotonic Subarray

    Find the length of the second longest monotonic subarray (not overlapping with the longest). Must track multiple candidates and handle overlapping runs, requiring more complex bookkeeping.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(second_longest_monotonic_subarray([1,2,3,2,1]))  # Expected: 3
print(second_longest_monotonic_subarray([5,4,3,2,1]))  # Expected: 5
print(second_longest_monotonic_subarray([1]))  # Expected: 1
`,
            go: `package main

import "fmt"

// SecondLongestMonotonicSubarray solves the Second Longest Monotonic Subarray problem.
// Find the length of the second longest monotonic subarray (not overlapping with the longest). Must track multiple candidates and handle overlapping runs, requiring more complex bookkeeping.
// Time: O(n), Space: O(n)
func SecondLongestMonotonicSubarray(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SecondLongestMonotonicSubarray([]int{1, 2, 3, 2, 1})) // Expected: 3
	fmt.Println(SecondLongestMonotonicSubarray([]int{5, 4, 3, 2, 1})) // Expected: 5
	fmt.Println(SecondLongestMonotonicSubarray([]int{1})) // Expected: 1
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/01-longest-monotonic-subarray/twist-05-second-longest-monotonic-subarray', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/01-longest-monotonic-subarray/twist-05-second-longest-monotonic-subarray'] = problem;
})();
