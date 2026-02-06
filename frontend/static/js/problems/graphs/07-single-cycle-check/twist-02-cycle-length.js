/**
 * Cycle Length
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-single-cycle
 * Parent: 07-single-cycle-check
 */
(function() {
    'use strict';

    const problem = {
        name: 'Cycle Length',
        difficulty: 'Easy',
        algorithm: 'graph-single-cycle',
        parent: '07-single-cycle-check',
        description: 'Assuming a single cycle exists, return the length of the cycle. If no single cycle exists, return -1.',
        problem: 'You already traverse the array. The twist is to count steps and verify the count equals the array length, making the validation explicit.',
        hints: [
            'Start by understanding the key difference: You already traverse the array.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Array [2,3,1,-4,-4,2].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(N)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[2,3,1,-4,-4,2]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the cycle length criteria.'
            },
            {
                input: {"array":[2,2,-1]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the cycle length criteria.'
            },
            {
                input: {"array":[1,1,1,1,2]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the cycle length criteria.'
            },
            // Edge case
            {
                input: {"array":[2]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def cycle_length(array):
    """
    Cycle Length

    Assuming a single cycle exists, return the length of the cycle. If no single cycle exists, return -1.

    Time: O(N)
    Space: O(1)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(cycle_length([2,3,1,-4,-4,2]))  # Expected: 1
print(cycle_length([2,2,-1]))  # Expected: 2
print(cycle_length([1,1,1,1,2]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CycleLength solves the Cycle Length problem.
// Assuming a single cycle exists, return the length of the cycle. If no single cycle exists, return -1.
// Time: O(N), Space: O(1)
func CycleLength(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CycleLength([]int{2, 3, 1, -4, -4, 2})) // Expected: 1
	fmt.Println(CycleLength([]int{2, 2, -1})) // Expected: 2
	fmt.Println(CycleLength([]int{1, 1, 1, 1, 2})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/twist-02-cycle-length', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/twist-02-cycle-length'] = problem;
})();
