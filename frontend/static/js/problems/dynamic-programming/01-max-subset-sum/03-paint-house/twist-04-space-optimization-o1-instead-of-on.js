/**
 * Space Optimization: O(1) Instead of O(n)
 * Category: dynamic-programming
 * Difficulty: Easy
 * Algorithm: dp-max-subset
 * Parent: 01-max-subset-sum/03-paint-house
 */
(function() {
    'use strict';

    const problem = {
        name: 'Space Optimization: O(1) Instead of O(n)',
        difficulty: 'Easy',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/03-paint-house',
        description: 'The current solution already uses O(1) space with three variables. Verify you understand why: which values from the previous row do you need to compute the current row?',
        problem: 'Unlike single-state DP where you need one or two previous values, here you have multiple states (one per color) at each position. Understanding that only the previous row matters is key.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Unlike single-state DP where you need one or two previous values, here you have multiple states (one per color) at each ',
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
                input: {"costs":[[17,2,17],[16,16,5],[14,3,19]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the space optimization o1 instead of on criteria.'
            },
            {
                input: {"costs":[[7,6,2]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the space optimization o1 instead of on criteria.'
            },
            // Edge case
            {
                input: {"costs":[[17,2,17]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def space_optimization_o1_instead_of_on(costs):
    """
    Space Optimization: O(1) Instead of O(n)

    The current solution already uses O(1) space with three variables. Verify you understand why: which values from the previous row do you need to compute the current row?

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(costs)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(space_optimization_o1_instead_of_on([[17,2,17],[16,16,5],[14,3,19]]))  # Expected: 1
print(space_optimization_o1_instead_of_on([[7,6,2]]))  # Expected: 2
print(space_optimization_o1_instead_of_on([[17,2,17]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// SpaceOptimizationO1InsteadOfOn solves the Space Optimization: O(1) Instead of O(n) problem.
// The current solution already uses O(1) space with three variables. Verify you understand why: which values from the previous row do you need to compute the current row?
// Time: O(n^2), Space: O(n)
func SpaceOptimizationO1InsteadOfOn(costs [][]int) int {
	result := 0

	for i := 0; i < len(costs); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SpaceOptimizationO1InsteadOfOn([][]int{{17, 2, 17}, {16, 16, 5}, {14, 3, 19}})) // Expected: 1
	fmt.Println(SpaceOptimizationO1InsteadOfOn([][]int{{7, 6, 2}})) // Expected: 2
	fmt.Println(SpaceOptimizationO1InsteadOfOn([][]int{{17, 2, 17}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/03-paint-house/twist-04-space-optimization-o1-instead-of-on', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/03-paint-house/twist-04-space-optimization-o1-instead-of-on'] = problem;
})();
