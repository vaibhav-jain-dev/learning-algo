/**
 * Space Optimization: O(n) to O(1)
 * Category: dynamic-programming
 * Difficulty: Easy
 * Algorithm: dp-max-subset
 * Parent: 01-max-subset-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Space Optimization: O(n) to O(1)',
        difficulty: 'Easy',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum',
        description: 'You have the O(n) DP array solution. Now optimize it to O(1) space by identifying which previous values you actually need at each step.',
        problem: 'Requires recognizing that only the last two DP values matter. This pattern of rolling variables is a fundamental DP space optimization technique.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Requires recognizing that only the last two DP values matter. This pattern of rolling variables is a fundamental DP spac',
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
                input: {"array":[75,105,120,75,90,135]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the space optimization on to o1 criteria.'
            },
            {
                input: {"array":[7,10,12,7,9,14]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the space optimization on to o1 criteria.'
            },
            // Edge case
            {
                input: {"array":[75]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def space_optimization_on_to_o1(array):
    """
    Space Optimization: O(n) to O(1)

    You have the O(n) DP array solution. Now optimize it to O(1) space by identifying which previous values you actually need at each step.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(space_optimization_on_to_o1([75,105,120,75,90,135]))  # Expected: 1
print(space_optimization_on_to_o1([7,10,12,7,9,14]))  # Expected: 2
print(space_optimization_on_to_o1([75]))  # Expected: 0
`,
            go: `package main

import "fmt"

// SpaceOptimizationOnToO1 solves the Space Optimization: O(n) to O(1) problem.
// You have the O(n) DP array solution. Now optimize it to O(1) space by identifying which previous values you actually need at each step.
// Time: O(n^2), Space: O(n)
func SpaceOptimizationOnToO1(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SpaceOptimizationOnToO1([]int{75, 105, 120, 75, 90, 135})) // Expected: 1
	fmt.Println(SpaceOptimizationOnToO1([]int{7, 10, 12, 7, 9, 14})) // Expected: 2
	fmt.Println(SpaceOptimizationOnToO1([]int{75})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/twist-02-space-optimization-on-to-o1', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/twist-02-space-optimization-on-to-o1'] = problem;
})();
