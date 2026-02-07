/**
 * Online Streaming Circular
 * Category: famous-algorithms
 * Difficulty: Very Hard
 * Algorithm: kadanes-algorithm
 * Parent: 01-kadanes-algorithm/01-max-circular-subarray
 */
(function() {
    'use strict';

    const problem = {
        name: 'Online Streaming Circular',
        difficulty: 'Very Hard',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm/01-max-circular-subarray',
        description: 'Elements arrive in a stream but the array is known to be circular (the last element connects to the first). How would you maintain the maximum circular subarray sum as new elements arrive, before the circle is closed?',
        problem: 'You cannot compute the circular answer until you know the total sum, but you need to maintain partial results efficiently. Forces thinking about what information to accumulate for the eventual circular closure.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[1,-2,3,-2]},
                output: 2,
                explanation: 'The running maximum at each index represents the best subarray ending at that position. A negative running sum is never worth carrying forward.'
            },
            {
                input: {"nums":[5,-3,5]},
                output: 3,
                explanation: 'Compare extending the current subarray (running_sum + current) vs starting new (just current). The global best is updated whenever a new maximum is found.'
            },
            // Edge case
            {
                input: {"nums":[1]},
                output: 0,
                explanation: 'Maintain a running sum as you scan. At each position, choose to either extend the current subarray or start fresh. Track the global maximum across all positions.'
            }
        ],
        solutions: {
            python: `def online_streaming_circular(nums):
    """
    Online Streaming Circular

    Elements arrive in a stream but the array is known to be circular (the last element connects to the first). How would you maintain the maximum circular subarray sum as new elements arrive, before the circle is closed?

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(online_streaming_circular([1,-2,3,-2]))  # Expected: 2
print(online_streaming_circular([5,-3,5]))  # Expected: 3
print(online_streaming_circular([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// OnlineStreamingCircular solves the Online Streaming Circular problem.
// Elements arrive in a stream but the array is known to be circular (the last element connects to the first). How would you maintain the maximum circular subarray sum as new elements arrive, before the circle is closed?
// Time: O(?), Space: O(?)
func OnlineStreamingCircular(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(OnlineStreamingCircular([]int{1, -2, 3, -2})) // Expected: 2
	fmt.Println(OnlineStreamingCircular([]int{5, -3, 5})) // Expected: 3
	fmt.Println(OnlineStreamingCircular([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/01-max-circular-subarray/twist-04-online-streaming-circular', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/01-max-circular-subarray/twist-04-online-streaming-circular'] = problem;
})();
