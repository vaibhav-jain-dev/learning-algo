/**
 * Variable Step Sizes
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-staircase
 * Parent: 06-staircase-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Variable Step Sizes',
        difficulty: 'Medium',
        algorithm: 'recursion-staircase',
        parent: '06-staircase-traversal',
        description: 'Instead of steps 1 through maxSteps, you are given an arbitrary set of allowed step sizes (e.g., [1,3,5]).',
        problem: 'The sliding window optimization no longer applies since step sizes are not consecutive, requiring a direct DP approach summing over the allowed set.',
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
                input: {"height":4,"maxSteps":2},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the variable step sizes criteria.'
            },
            // Edge case
            {
                input: {"height":0,"maxSteps":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def variable_step_sizes(height, maxSteps):
    """
    Variable Step Sizes

    Instead of steps 1 through maxSteps, you are given an arbitrary set of allowed step sizes (e.g., [1,3,5]).

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(height)

    for i in range(n):
        # Check condition based on maxSteps
        j = 0
        for k in range(i, n):
            if j < len(maxSteps) and height[k] == maxSteps[j]:
                j += 1
        if j == len(maxSteps):
            count += 1

    return count


# Test cases
print(variable_step_sizes(4, 2))  # Expected: 1
print(variable_step_sizes(0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// VariableStepSizes solves the Variable Step Sizes problem.
// Instead of steps 1 through maxSteps, you are given an arbitrary set of allowed step sizes (e.g., [1,3,5]).
// Time: O(?), Space: O(?)
func VariableStepSizes(height int, maxSteps int) int {
	result := 0

	for i := 0; i < len(height); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(VariableStepSizes(4, 2)) // Expected: 1
	fmt.Println(VariableStepSizes(0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '06-staircase-traversal/twist-03-variable-step-sizes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/06-staircase-traversal/twist-03-variable-step-sizes'] = problem;
})();
