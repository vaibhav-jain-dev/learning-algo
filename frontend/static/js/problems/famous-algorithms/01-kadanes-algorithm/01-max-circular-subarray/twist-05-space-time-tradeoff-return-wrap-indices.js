/**
 * Space-Time Tradeoff: Return Wrap Indices
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kadanes-algorithm
 * Parent: 01-kadanes-algorithm/01-max-circular-subarray
 */
(function() {
    'use strict';

    const problem = {
        name: 'Space-Time Tradeoff: Return Wrap Indices',
        difficulty: 'Hard',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm/01-max-circular-subarray',
        description: 'Return the actual indices of the maximum circular subarray. If the subarray wraps around, return [start, end] where start > end indicates wrapping (e.g., [4, 1] means elements at indices 4, 0, 1).',
        problem: 'Tracking indices for both the standard and circular cases simultaneously requires careful bookkeeping. The circular case needs you to track min subarray indices and invert them.',
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
            python: `def space_time_tradeoff_return_wrap_indices(nums):
    """
    Space-Time Tradeoff: Return Wrap Indices

    Return the actual indices of the maximum circular subarray. If the subarray wraps around, return [start, end] where start > end indicates wrapping (e.g., [4, 1] means elements at indices 4, 0, 1).

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(space_time_tradeoff_return_wrap_indices([1,-2,3,-2]))  # Expected: 2
print(space_time_tradeoff_return_wrap_indices([5,-3,5]))  # Expected: 3
print(space_time_tradeoff_return_wrap_indices([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// SpaceTimeTradeoffReturnWrapIndices solves the Space-Time Tradeoff: Return Wrap Indices problem.
// Return the actual indices of the maximum circular subarray. If the subarray wraps around, return [start, end] where start > end indicates wrapping (e.g., [4, 1] means elements at indices 4, 0, 1).
// Time: O(?), Space: O(?)
func SpaceTimeTradeoffReturnWrapIndices(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SpaceTimeTradeoffReturnWrapIndices([]int{1, -2, 3, -2})) // Expected: 2
	fmt.Println(SpaceTimeTradeoffReturnWrapIndices([]int{5, -3, 5})) // Expected: 3
	fmt.Println(SpaceTimeTradeoffReturnWrapIndices([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/01-max-circular-subarray/twist-05-space-time-tradeoff-return-wrap-indices', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/01-max-circular-subarray/twist-05-space-time-tradeoff-return-wrap-indices'] = problem;
})();
