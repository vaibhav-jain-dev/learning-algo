/**
 * Space-Time Tradeoff: Return the Subarray
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 * Parent: 01-kadanes-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Space-Time Tradeoff: Return the Subarray',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm',
        description: 'Modify Kadane.',
        problem: 'Tracking indices requires careful bookkeeping of when you start fresh vs extend. The top-K extension breaks the O(n) single-pass approach and requires fundamentally different thinking about excluding previously found ranges.',
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
                input: {"nums":[-2,1,-3,4,-1,2,1,-5,4]},
                output: 1,
                explanation: 'The running maximum at each index represents the best subarray ending at that position. A negative running sum is never worth carrying forward.'
            },
            // Edge case
            {
                input: {"nums":[-2]},
                output: 0,
                explanation: 'Maintain a running sum as you scan. At each position, choose to either extend the current subarray or start fresh. Track the global maximum across all positions.'
            }
        ],
        solutions: {
            python: `def space_time_tradeoff_return_the_subarray(nums):
    """
    Space-Time Tradeoff: Return the Subarray

    Modify Kadane\\

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(space_time_tradeoff_return_the_subarray([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 1
print(space_time_tradeoff_return_the_subarray([-2]))  # Expected: 0
`,
            go: `package main

import "fmt"

// SpaceTimeTradeoffReturnTheSubarray solves the Space-Time Tradeoff: Return the Subarray problem.
// Modify Kadane\\
// Time: O(?), Space: O(?)
func SpaceTimeTradeoffReturnTheSubarray(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SpaceTimeTradeoffReturnTheSubarray([]int{-2, 1, -3, 4, -1, 2, 1, -5, 4})) // Expected: 1
	fmt.Println(SpaceTimeTradeoffReturnTheSubarray([]int{-2})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/twist-05-space-time-tradeoff-return-the-subarray', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/twist-05-space-time-tradeoff-return-the-subarray'] = problem;
})();
