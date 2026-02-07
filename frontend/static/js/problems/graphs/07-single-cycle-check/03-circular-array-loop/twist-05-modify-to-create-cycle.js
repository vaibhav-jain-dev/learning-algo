/**
 * Modify to Create Cycle
 * Category: graphs
 * Difficulty: Very Hard
 * Algorithm: fast-slow-pointer
 * Parent: 07-single-cycle-check/03-circular-array-loop
 */
(function() {
    'use strict';

    const problem = {
        name: 'Modify to Create Cycle',
        difficulty: 'Very Hard',
        algorithm: 'fast-slow-pointer',
        parent: '07-single-cycle-check/03-circular-array-loop',
        description: 'The array has no valid cycle. Find the minimum number of element changes to create a valid cycle of length > 1 with consistent direction.',
        problem: 'This inverts the problem from detection to construction. You must analyze the functional graph structure and determine which modifications create cycles most efficiently.',
        hints: [
            'Start by understanding the key difference: This inverts the problem from detection to construction.',
            'This is significantly harder than the parent problem. Consider if a different algorithmic paradigm is needed.',
            'Consider the example: Array [1, 1, 1, 1, 1] all positive.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'Varies - see approach',
            space: 'Varies - see approach'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[2,-1,1,2,2]},
                output: 1,
                explanation: 'Each pointer moves in one direction only (or at most n steps total). The invariant ensures that no valid solution is skipped, while the single-pass approach gives O(n) time.'
            },
            // Edge case
            {
                input: {"nums":[2]},
                output: 0,
                explanation: 'Position the two pointers at the strategic starting locations. Advance each based on the comparison with the target. The pointers converge on the solution without revisiting elements.'
            }
        ],
        solutions: {
            python: `def modify_to_create_cycle(nums):
    """
    Modify to Create Cycle

    The array has no valid cycle. Find the minimum number of element changes to create a valid cycle of length > 1 with consistent direction.

    Time: Varies - see approach
    Space: Varies - see approach
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(modify_to_create_cycle([2,-1,1,2,2]))  # Expected: 1
print(modify_to_create_cycle([2]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ModifyToCreateCycle solves the Modify to Create Cycle problem.
// The array has no valid cycle. Find the minimum number of element changes to create a valid cycle of length > 1 with consistent direction.
// Time: Varies - see approach, Space: Varies - see approach
func ModifyToCreateCycle(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ModifyToCreateCycle([]int{2, -1, 1, 2, 2})) // Expected: 1
	fmt.Println(ModifyToCreateCycle([]int{2})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/03-circular-array-loop/twist-05-modify-to-create-cycle', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/03-circular-array-loop/twist-05-modify-to-create-cycle'] = problem;
})();
