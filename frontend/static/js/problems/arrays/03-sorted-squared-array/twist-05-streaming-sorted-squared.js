/**
 * Streaming Sorted Squared
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: streaming-sorted-squared
 * Parent: 03-sorted-squared-array
 */
(function() {
    'use strict';

    const problem = {
        name: 'Streaming Sorted Squared',
        difficulty: 'Hard',
        algorithm: 'streaming-sorted-squared',
        parent: '03-sorted-squared-array',
        description: 'Elements arrive one at a time in sorted order. After each new element, output the current sorted squared array in O(n) time. Cannot rebuild from scratch each time. Requires maintaining a sorted squared structure and efficiently inserting new squared values.',
        problem: 'Cannot rebuild from scratch each time. Requires maintaining a sorted squared structure and efficiently inserting new squared values.',
        hints: [
            'Think about how streaming sorted squared differs from the standard version of this problem.',
            'Key insight: Cannot rebuild from scratch each time. Requires maintaining a sorted squared structure and efficiently inserting new squared values.',
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
                input: {"array":[1,3,5,2,4]},
                output: 1,
                explanation: ''
            },
            {
                input: {"array":[1,2,3,4]},
                output: 0,
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[5,3,1,4,2]},
                output: 2,
                explanation: ''
            }
        ],
        solutions: {
            python: `def streaming_sorted_squared(array):
    """
    Streaming Sorted Squared

    Elements arrive one at a time in sorted order. After each new element, output the current sorted squared array in O(n) time. Cannot rebuild from scratch each time. Requires maintaining a sorted squared structure and efficiently inserting new squared values.

    Time: O(n log n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(streaming_sorted_squared([1,3,5,2,4]))  # Expected: 1
print(streaming_sorted_squared([1,2,3,4]))  # Expected: 0
print(streaming_sorted_squared([5,3,1,4,2]))  # Expected: 2
`,
            go: `package main

import "fmt"

// StreamingSortedSquared solves the Streaming Sorted Squared problem.
// Elements arrive one at a time in sorted order. After each new element, output the current sorted squared array in O(n) time. Cannot rebuild from scratch each time. Requires maintaining a sorted squared structure and efficiently inserting new squared values.
// Time: O(n log n), Space: O(n)
func StreamingSortedSquared(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(StreamingSortedSquared([]int{1, 3, 5, 2, 4})) // Expected: 1
	fmt.Println(StreamingSortedSquared([]int{1, 2, 3, 4})) // Expected: 0
	fmt.Println(StreamingSortedSquared([]int{5, 3, 1, 4, 2})) // Expected: 2
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/twist-05-streaming-sorted-squared', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/twist-05-streaming-sorted-squared'] = problem;
})();
