/**
 * Stack Overflow with Deep Nesting
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-product-sum
 * Parent: 02-product-sum/02-flatten-nested-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Stack Overflow with Deep Nesting',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/02-flatten-nested-list',
        description: 'Given an array nested 50,000 levels deep, the recursive solution will crash. Implement a purely iterative flatten that handles arbitrary depth.',
        problem: 'Deep nesting directly translates to deep recursion. The iterative stack-based approach is the only viable option, and you must carefully manage the stack to preserve element ordering.',
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
                explanation: 'The stack overflow with deep nesting for this input yields [1,2, 3,4,5, 6].'
            },
            // Edge case
            {
                input: {"array":[[1,2]]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def stack_overflow_with_deep_nesting(array):
    """
    Stack Overflow with Deep Nesting

    Given an array nested 50,000 levels deep, the recursive solution will crash. Implement a purely iterative flatten that handles arbitrary depth.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(stack_overflow_with_deep_nesting([[1,2],[3,[4,5]],6]))  # Expected: [[1,2],[3,[4,5]],6]
print(stack_overflow_with_deep_nesting([[1,2]]))  # Expected: []
`,
            go: `package main

import "fmt"

// StackOverflowWithDeepNesting solves the Stack Overflow with Deep Nesting problem.
// Given an array nested 50,000 levels deep, the recursive solution will crash. Implement a purely iterative flatten that handles arbitrary depth.
// Time: O(?), Space: O(?)
func StackOverflowWithDeepNesting(array [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(StackOverflowWithDeepNesting([][]int{{1, 2}, {3, 4,5}, 6})) // Expected: [[1,2],[3,[4,5]],6]
	fmt.Println(StackOverflowWithDeepNesting([][]int{{1, 2}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/02-flatten-nested-list/twist-04-stack-overflow-with-deep-nesting', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/02-flatten-nested-list/twist-04-stack-overflow-with-deep-nesting'] = problem;
})();
