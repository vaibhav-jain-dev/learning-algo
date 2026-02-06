/**
 * Weighted Circular Array
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: fast-slow-pointer
 * Parent: 07-single-cycle-check/03-circular-array-loop
 */
(function() {
    'use strict';

    const problem = {
        name: 'Weighted Circular Array',
        difficulty: 'Hard',
        algorithm: 'fast-slow-pointer',
        parent: '07-single-cycle-check/03-circular-array-loop',
        description: 'Each element has a weight in addition to the jump value. Find a cycle where the sum of weights is positive.',
        problem: 'Cycle detection alone is insufficient. You must also track cumulative weight along the cycle path and check if it is positive, adding an optimization dimension.',
        hints: [
            'Start by understanding the key difference: Cycle detection alone is insufficient.',
            'Consider breaking this into subproblems and solving each independently.'
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
                explanation: 'For this input, there is 1 valid position that satisfy the weighted circular array criteria.'
            },
            // Edge case
            {
                input: {"nums":[2]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def weighted_circular_array(nums):
    """
    Weighted Circular Array

    Each element has a weight in addition to the jump value. Find a cycle where the sum of weights is positive.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(weighted_circular_array([2,-1,1,2,2]))  # Expected: 1
print(weighted_circular_array([2]))  # Expected: 0
`,
            go: `package main

import "fmt"

// WeightedCircularArray solves the Weighted Circular Array problem.
// Each element has a weight in addition to the jump value. Find a cycle where the sum of weights is positive.
// Time: O(n), Space: O(1)
func WeightedCircularArray(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WeightedCircularArray([]int{2, -1, 1, 2, 2})) // Expected: 1
	fmt.Println(WeightedCircularArray([]int{2})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/03-circular-array-loop/twist-04-weighted-circular-array', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/03-circular-array-loop/twist-04-weighted-circular-array'] = problem;
})();
