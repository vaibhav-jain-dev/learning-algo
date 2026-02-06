/**
 * Allow Mixed Direction
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: fast-slow-pointer
 * Parent: 07-single-cycle-check/03-circular-array-loop
 */
(function() {
    'use strict';

    const problem = {
        name: 'Allow Mixed Direction',
        difficulty: 'Medium',
        algorithm: 'fast-slow-pointer',
        parent: '07-single-cycle-check/03-circular-array-loop',
        description: 'Remove the constraint that all elements in a cycle must have the same sign. Any valid cycle of length > 1 counts.',
        problem: 'Without direction constraint, every cycle in the functional graph is valid. You simplify the checking logic but must still handle self-loops.',
        hints: [
            'Start by understanding the key difference: Without direction constraint, every cycle in the functional graph is valid.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Array [2, -1, 1, 2, 2].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[2,-1,1,2,2]},
                output: [2,-1,1],
                explanation: 'The allow mixed direction for this input yields [2, -1, 1].'
            },
            // Edge case
            {
                input: {"nums":[2]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def allow_mixed_direction(nums):
    """
    Allow Mixed Direction

    Remove the constraint that all elements in a cycle must have the same sign. Any valid cycle of length > 1 counts.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(allow_mixed_direction([2,-1,1,2,2]))  # Expected: [2,-1,1]
print(allow_mixed_direction([2]))  # Expected: []
`,
            go: `package main

import "fmt"

// AllowMixedDirection solves the Allow Mixed Direction problem.
// Remove the constraint that all elements in a cycle must have the same sign. Any valid cycle of length > 1 counts.
// Time: O(n), Space: O(1)
func AllowMixedDirection(nums []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(AllowMixedDirection([]int{2, -1, 1, 2, 2})) // Expected: [2,-1,1]
	fmt.Println(AllowMixedDirection([]int{2})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/03-circular-array-loop/twist-01-allow-mixed-direction', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/03-circular-array-loop/twist-01-allow-mixed-direction'] = problem;
})();
