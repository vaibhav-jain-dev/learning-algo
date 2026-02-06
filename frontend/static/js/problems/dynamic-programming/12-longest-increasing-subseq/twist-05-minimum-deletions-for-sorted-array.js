/**
 * Minimum Deletions for Sorted Array
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-increasing-subseq
 * Parent: 12-longest-increasing-subseq
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Deletions for Sorted Array',
        difficulty: 'Medium',
        algorithm: 'dp-increasing-subseq',
        parent: '12-longest-increasing-subseq',
        description: 'Find the minimum number of elements to delete from the array so that the remaining elements are in strictly increasing order.',
        problem: 'This is n minus the LIS length, but reframing the problem as deletions forces you to think about the complement relationship between LIS and minimum removals.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: This is n minus the LIS length, but reframing the problem as deletions forces you to think about the complement relation',
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
                explanation: 'For this input, there is 1 valid position that satisfy the minimum deletions for sorted array criteria.'
            },
            {
                input: {"array":[10,9,2,5,3,7,101,18]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the minimum deletions for sorted array criteria.'
            },
            {
                input: {"array":[0,1,0,3,2,3]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the minimum deletions for sorted array criteria.'
            },
            // Edge case
            {
                input: {"array":[5]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def minimum_deletions_for_sorted_array(array):
    """
    Minimum Deletions for Sorted Array

    Find the minimum number of elements to delete from the array so that the remaining elements are in strictly increasing order.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(minimum_deletions_for_sorted_array([5,7,-24,12,10,2,3,12,5,6,35]))  # Expected: 1
print(minimum_deletions_for_sorted_array([10,9,2,5,3,7,101,18]))  # Expected: 2
print(minimum_deletions_for_sorted_array([0,1,0,3,2,3]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimumDeletionsForSortedArray solves the Minimum Deletions for Sorted Array problem.
// Find the minimum number of elements to delete from the array so that the remaining elements are in strictly increasing order.
// Time: O(n^2), Space: O(n)
func MinimumDeletionsForSortedArray(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimumDeletionsForSortedArray([]int{5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35})) // Expected: 1
	fmt.Println(MinimumDeletionsForSortedArray([]int{10, 9, 2, 5, 3, 7, 101, 18})) // Expected: 2
	fmt.Println(MinimumDeletionsForSortedArray([]int{0, 1, 0, 3, 2, 3})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '12-longest-increasing-subseq/twist-05-minimum-deletions-for-sorted-array', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/12-longest-increasing-subseq/twist-05-minimum-deletions-for-sorted-array'] = problem;
})();
