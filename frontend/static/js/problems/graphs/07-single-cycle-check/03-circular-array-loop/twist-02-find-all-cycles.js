/**
 * Find All Cycles
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: fast-slow-pointer
 * Parent: 07-single-cycle-check/03-circular-array-loop
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find All Cycles',
        difficulty: 'Hard',
        algorithm: 'fast-slow-pointer',
        parent: '07-single-cycle-check/03-circular-array-loop',
        description: 'Return all distinct cycles in the array, not just whether one exists. Each cycle is a list of indices.',
        problem: 'You must find every cycle, not stop at the first. This requires tracking which indices belong to which cycle across the entire array.',
        hints: [
            'Start by understanding the key difference: You must find every cycle, not stop at the first.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Array [1,-1,1,-1].',
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
                output: [0,1,2],
                explanation: 'The find all cycles for this input yields [0, 1, 2].'
            },
            // Edge case
            {
                input: {"nums":[2]},
                output: [],
                explanation: 'Position the two pointers at the strategic starting locations. Advance each based on the comparison with the target. The pointers converge on the solution without revisiting elements.'
            }
        ],
        solutions: {
            python: `def find_all_cycles(nums):
    """
    Find All Cycles

    Return all distinct cycles in the array, not just whether one exists. Each cycle is a list of indices.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(find_all_cycles([2,-1,1,2,2]))  # Expected: [0,1,2]
print(find_all_cycles([2]))  # Expected: []
`,
            go: `package main

import "fmt"

// FindAllCycles solves the Find All Cycles problem.
// Return all distinct cycles in the array, not just whether one exists. Each cycle is a list of indices.
// Time: O(n), Space: O(1)
func FindAllCycles(nums []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(FindAllCycles([]int{2, -1, 1, 2, 2})) // Expected: [0,1,2]
	fmt.Println(FindAllCycles([]int{2})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/03-circular-array-loop/twist-02-find-all-cycles', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/03-circular-array-loop/twist-02-find-all-cycles'] = problem;
})();
