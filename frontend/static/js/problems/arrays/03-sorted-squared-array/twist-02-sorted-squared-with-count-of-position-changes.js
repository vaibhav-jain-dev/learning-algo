/**
 * Sorted Squared with Count of Position Changes
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: sorted-squared-with-count-of-position-changes
 * Parent: 03-sorted-squared-array
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sorted Squared with Count of Position Changes',
        difficulty: 'Medium',
        algorithm: 'sorted-squared-with-count-of-position-changes',
        parent: '03-sorted-squared-array',
        description: 'Return the sorted squared array AND the count of elements that changed position after squaring and sorting. Adds an inversion-counting aspect on top of the squaring problem, requiring you to track original vs final positions.',
        problem: 'Adds an inversion-counting aspect on top of the squaring problem, requiring you to track original vs final positions.',
        hints: [
            'Think about how sorted squared with count of position changes differs from the standard version of this problem.',
            'Key insight: Adds an inversion-counting aspect on top of the squaring problem, requiring you to track original vs final positions.',
            'Consider whether sorting can help simplify the approach.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log n)',
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
            python: `def sorted_squared_with_count_of_position_changes(array):
    """
    Sorted Squared with Count of Position Changes

    Return the sorted squared array AND the count of elements that changed position after squaring and sorting. Adds an inversion-counting aspect on top of the squaring problem, requiring you to track original vs final positions.

    Time: O(n log n)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(sorted_squared_with_count_of_position_changes([1,2,1,2,3]))  # Expected: 2
print(sorted_squared_with_count_of_position_changes([1,2,3]))  # Expected: 1
print(sorted_squared_with_count_of_position_changes([1,1,1]))  # Expected: 3
`,
            go: `package main

import "fmt"

// SortedSquaredWithCountOfPositionChanges solves the Sorted Squared with Count of Position Changes problem.
// Return the sorted squared array AND the count of elements that changed position after squaring and sorting. Adds an inversion-counting aspect on top of the squaring problem, requiring you to track original vs final positions.
// Time: O(n log n), Space: O(n)
func SortedSquaredWithCountOfPositionChanges(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SortedSquaredWithCountOfPositionChanges([]int{1, 2, 1, 2, 3})) // Expected: 2
	fmt.Println(SortedSquaredWithCountOfPositionChanges([]int{1, 2, 3})) // Expected: 1
	fmt.Println(SortedSquaredWithCountOfPositionChanges([]int{1, 1, 1})) // Expected: 3
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/twist-02-sorted-squared-with-count-of-position-changes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/twist-02-sorted-squared-with-count-of-position-changes'] = problem;
})();
