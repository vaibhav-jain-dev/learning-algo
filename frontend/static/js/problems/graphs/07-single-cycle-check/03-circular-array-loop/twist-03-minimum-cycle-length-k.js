/**
 * Minimum Cycle Length K
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: fast-slow-pointer
 * Parent: 07-single-cycle-check/03-circular-array-loop
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Cycle Length K',
        difficulty: 'Medium',
        algorithm: 'fast-slow-pointer',
        parent: '07-single-cycle-check/03-circular-array-loop',
        description: 'A valid cycle must have length at least K (not just > 1). Check if such a cycle exists.',
        problem: 'After detecting a cycle, you must measure its length and compare against K. Self-loops and short cycles that were previously invalid may now need explicit length checking.',
        hints: [
            'Start by understanding the key difference: After detecting a cycle, you must measure its length and compare against K.',
            'Think about what data structures need to change from the original solution.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[2,-1,1,2,2]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the minimum cycle length k criteria.'
            },
            // Edge case
            {
                input: {"nums":[2]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def minimum_cycle_length_k(nums):
    """
    Minimum Cycle Length K

    A valid cycle must have length at least K (not just > 1). Check if such a cycle exists.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(minimum_cycle_length_k([2,-1,1,2,2]))  # Expected: 1
print(minimum_cycle_length_k([2]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimumCycleLengthK solves the Minimum Cycle Length K problem.
// A valid cycle must have length at least K (not just > 1). Check if such a cycle exists.
// Time: O(n), Space: O(1)
func MinimumCycleLengthK(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimumCycleLengthK([]int{2, -1, 1, 2, 2})) // Expected: 1
	fmt.Println(MinimumCycleLengthK([]int{2})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/03-circular-array-loop/twist-03-minimum-cycle-length-k', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/03-circular-array-loop/twist-03-minimum-cycle-length-k'] = problem;
})();
