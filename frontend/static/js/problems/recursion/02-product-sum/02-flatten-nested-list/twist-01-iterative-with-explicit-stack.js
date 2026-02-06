/**
 * Iterative with Explicit Stack
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-product-sum
 * Parent: 02-product-sum/02-flatten-nested-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative with Explicit Stack',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/02-flatten-nested-list',
        description: 'Flatten the nested list using an explicit stack instead of recursion. Process elements right-to-left so they come off the stack in the correct order.',
        problem: 'You must reverse the push order to maintain element ordering, which is a subtle detail that recursion handles naturally. The stack replaces the call stack but requires manual ordering management.',
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
                input: {"array":[[1,2],[3,[4,5]],6]},
                output: [[1,2],[3,[4,5]],6],
                explanation: 'The iterative with explicit stack for this input yields [1,2, 3,4,5, 6].'
            },
            // Edge case
            {
                input: {"array":[[1,2]]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def iterative_with_explicit_stack(array):
    """
    Iterative with Explicit Stack

    Flatten the nested list using an explicit stack instead of recursion. Process elements right-to-left so they come off the stack in the correct order.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(iterative_with_explicit_stack([[1,2],[3,[4,5]],6]))  # Expected: [[1,2],[3,[4,5]],6]
print(iterative_with_explicit_stack([[1,2]]))  # Expected: []
`,
            go: `package main

import "fmt"

// IterativeWithExplicitStack solves the Iterative with Explicit Stack problem.
// Flatten the nested list using an explicit stack instead of recursion. Process elements right-to-left so they come off the stack in the correct order.
// Time: O(?), Space: O(?)
func IterativeWithExplicitStack(array [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(IterativeWithExplicitStack([][]int{{1, 2}, {3, 4,5}, 6})) // Expected: [[1,2],[3,[4,5]],6]
	fmt.Println(IterativeWithExplicitStack([][]int{{1, 2}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/02-flatten-nested-list/twist-01-iterative-with-explicit-stack', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/02-flatten-nested-list/twist-01-iterative-with-explicit-stack'] = problem;
})();
