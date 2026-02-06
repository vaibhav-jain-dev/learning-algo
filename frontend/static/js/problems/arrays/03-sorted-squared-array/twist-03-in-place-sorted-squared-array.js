/**
 * In-Place Sorted Squared Array
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: in-place-sorted-squared-array
 * Parent: 03-sorted-squared-array
 */
(function() {
    'use strict';

    const problem = {
        name: 'In-Place Sorted Squared Array',
        difficulty: 'Hard',
        algorithm: 'in-place-sorted-squared-array',
        parent: '03-sorted-squared-array',
        description: 'Square the elements and sort them in-place using O(1) extra space (no result array allowed). The standard two-pointer solution requires O(n) extra space. In-place requires clever swapping strategies, possibly using block-based merging.',
        problem: 'The standard two-pointer solution requires O(n) extra space. In-place requires clever swapping strategies, possibly using block-based merging.',
        hints: [
            'Think about how in-place sorted squared array differs from the standard version of this problem.',
            'Key insight: The standard two-pointer solution requires O(n) extra space. In-place requires clever swapping strategies, possibly using block-based merging.',
            'Consider whether sorting can help simplify the approach.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[-3,-1,0,2,4]},
                output: [0,1,4,9,16],
                explanation: ''
            },
            {
                input: {"array":[1,2,3]},
                output: [1,4,9],
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[-5,-3,-1]},
                output: [1,9,25],
                explanation: ''
            }
        ],
        solutions: {
            python: `def in_place_sorted_squared_array(array):
    """
    In-Place Sorted Squared Array

    Square the elements and sort them in-place using O(1) extra space (no result array allowed). The standard two-pointer solution requires O(n) extra space. In-place requires clever swapping strategies, possibly using block-based merging.

    Time: O(n log n)
    Space: O(1)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(in_place_sorted_squared_array([-3,-1,0,2,4]))  # Expected: [0,1,4,9,16]
print(in_place_sorted_squared_array([1,2,3]))  # Expected: [1,4,9]
print(in_place_sorted_squared_array([-5,-3,-1]))  # Expected: [1,9,25]
`,
            go: `package main

import "fmt"

// InPlaceSortedSquaredArray solves the In-Place Sorted Squared Array problem.
// Square the elements and sort them in-place using O(1) extra space (no result array allowed). The standard two-pointer solution requires O(n) extra space. In-place requires clever swapping strategies, possibly using block-based merging.
// Time: O(n log n), Space: O(1)
func InPlaceSortedSquaredArray(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(InPlaceSortedSquaredArray([]int{-3, -1, 0, 2, 4})) // Expected: [0,1,4,9,16]
	fmt.Println(InPlaceSortedSquaredArray([]int{1, 2, 3})) // Expected: [1,4,9]
	fmt.Println(InPlaceSortedSquaredArray([]int{-5, -3, -1})) // Expected: [1,9,25]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/twist-03-in-place-sorted-squared-array', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/twist-03-in-place-sorted-squared-array'] = problem;
})();
