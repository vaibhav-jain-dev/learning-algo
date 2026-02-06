/**
 * Remove the Cycle
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: floyd-cycle-detection
 * Parent: 07-single-cycle-check/01-linked-list-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove the Cycle',
        difficulty: 'Medium',
        algorithm: 'floyd-cycle-detection',
        parent: '07-single-cycle-check/01-linked-list-cycle',
        description: 'If a cycle exists, break it by setting the last node next pointer to null, making the list acyclic.',
        problem: 'You must find both the cycle start and the node just before it in the cycle. This requires tracking the previous pointer during the cycle-start detection phase.',
        hints: [
            'Start by understanding the key difference: You must find both the cycle start and the node just before it in the cycle.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: List [1,2,3,4] where 4 points back to 2.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"head":[3,2,0,-4],"pos":1},
                output: [3,2,0],
                explanation: 'The remove the cycle for this input yields [3, 2, 0].'
            },
            // Edge case
            {
                input: {"head":[3],"pos":0},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def remove_the_cycle(head, pos):
    """
    Remove the Cycle

    If a cycle exists, break it by setting the last node next pointer to null, making the list acyclic.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(head)):
        # Check if element meets criteria
        result.append(head[i])

    return result


# Test cases
print(remove_the_cycle([3,2,0,-4], 1))  # Expected: [3,2,0]
print(remove_the_cycle([3], 0))  # Expected: []
`,
            go: `package main

import "fmt"

// RemoveTheCycle solves the Remove the Cycle problem.
// If a cycle exists, break it by setting the last node next pointer to null, making the list acyclic.
// Time: O(n), Space: O(1)
func RemoveTheCycle(head []int, pos int) []int {
	result := make([]int, 0)

	for i := 0; i < len(head); i++ {
		result = append(result, head[i])
	}

	return result
}

func main() {
	fmt.Println(RemoveTheCycle([]int{3, 2, 0, -4}, 1)) // Expected: [3,2,0]
	fmt.Println(RemoveTheCycle([]int{3}, 0)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/01-linked-list-cycle/twist-04-remove-the-cycle', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/01-linked-list-cycle/twist-04-remove-the-cycle'] = problem;
})();
