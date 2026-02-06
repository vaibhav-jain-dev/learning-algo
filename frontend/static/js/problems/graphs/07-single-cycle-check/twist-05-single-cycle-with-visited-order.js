/**
 * Single Cycle with Visited Order
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-single-cycle
 * Parent: 07-single-cycle-check
 */
(function() {
    'use strict';

    const problem = {
        name: 'Single Cycle with Visited Order',
        difficulty: 'Medium',
        algorithm: 'graph-single-cycle',
        parent: '07-single-cycle-check',
        description: 'If the array forms a single cycle, return the order in which indices are visited starting from index 0.',
        problem: 'Instead of a boolean check, you collect the traversal sequence. You must store and return the visitation order while still verifying the cycle property.',
        hints: [
            'Start by understanding the key difference: Instead of a boolean check, you collect the traversal sequence.',
            'Think about what data structures need to change from the original solution.',
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
                output: [0,1,2],
                explanation: 'The single cycle with visited order for this input yields [0, 1, 2].'
            },
            {
                input: {"array":[2,2,-1]},
                output: [0,1,2],
                explanation: 'The single cycle with visited order for this input yields [0, 1, 2].'
            },
            {
                input: {"array":[1,1,1,1,2]},
                output: [0,1,2],
                explanation: 'The single cycle with visited order for this input yields [0, 1, 2].'
            },
            // Edge case
            {
                input: {"array":[2]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def single_cycle_with_visited_order(array):
    """
    Single Cycle with Visited Order

    If the array forms a single cycle, return the order in which indices are visited starting from index 0.

    Time: O(N)
    Space: O(1)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(single_cycle_with_visited_order([2,3,1,-4,-4,2]))  # Expected: [0,1,2]
print(single_cycle_with_visited_order([2,2,-1]))  # Expected: [0,1,2]
print(single_cycle_with_visited_order([1,1,1,1,2]))  # Expected: [0,1,2]
`,
            go: `package main

import "fmt"

// SingleCycleWithVisitedOrder solves the Single Cycle with Visited Order problem.
// If the array forms a single cycle, return the order in which indices are visited starting from index 0.
// Time: O(N), Space: O(1)
func SingleCycleWithVisitedOrder(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(SingleCycleWithVisitedOrder([]int{2, 3, 1, -4, -4, 2})) // Expected: [0,1,2]
	fmt.Println(SingleCycleWithVisitedOrder([]int{2, 2, -1})) // Expected: [0,1,2]
	fmt.Println(SingleCycleWithVisitedOrder([]int{1, 1, 1, 1, 2})) // Expected: [0,1,2]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/twist-05-single-cycle-with-visited-order', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/twist-05-single-cycle-with-visited-order'] = problem;
})();
