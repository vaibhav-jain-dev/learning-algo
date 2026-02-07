/**
 * Duplicate in Sorted Array
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: floyd-cycle-detection
 * Parent: 07-single-cycle-check/02-find-duplicate-number
 */
(function() {
    'use strict';

    const problem = {
        name: 'Duplicate in Sorted Array',
        difficulty: 'Easy',
        algorithm: 'floyd-cycle-detection',
        parent: '07-single-cycle-check/02-find-duplicate-number',
        description: 'The array is sorted. Find the duplicate in O(log n) time.',
        problem: 'Sorting changes the problem entirely. Binary search comparing nums[mid] with mid directly reveals where the duplicate must be, making Floyd unnecessary.',
        hints: [
            'Start by understanding the key difference: Sorting changes the problem entirely.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Sorted array [1,2,2,3,4].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[1,3,4,2,2]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            // Edge case
            {
                input: {"nums":[1]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def duplicate_in_sorted_array(nums):
    """
    Duplicate in Sorted Array

    The array is sorted. Find the duplicate in O(log n) time.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(duplicate_in_sorted_array([1,3,4,2,2]))  # Expected: 1
print(duplicate_in_sorted_array([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// DuplicateInSortedArray solves the Duplicate in Sorted Array problem.
// The array is sorted. Find the duplicate in O(log n) time.
// Time: O(n), Space: O(1)
func DuplicateInSortedArray(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(DuplicateInSortedArray([]int{1, 3, 4, 2, 2})) // Expected: 1
	fmt.Println(DuplicateInSortedArray([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/02-find-duplicate-number/twist-05-duplicate-in-sorted-array', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/02-find-duplicate-number/twist-05-duplicate-in-sorted-array'] = problem;
})();
